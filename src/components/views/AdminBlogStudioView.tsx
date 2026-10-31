import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Plus, Search, ImagePlus, Video, Eye, Save, Trash2, X, FileText } from 'lucide-react';
import { BlogArticle, storageService } from '../../services/storageService';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal';

type MediaPreview = { file: File; url: string; kind: 'image' | 'video' };

const categories: BlogArticle['category'][] = ['IELTS Preparation', 'Student Visa', 'Scholarships', 'Immigration', 'General'];

export const AdminBlogStudioView: React.FC<{ language: 'en' | 'bn' }> = ({ language }) => {
  const [articles, setArticles] = useState<BlogArticle[]>(() => storageService.getBlogs());
  const [editing, setEditing] = useState<BlogArticle | null>(null);
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState(false);
  const [media, setMedia] = useState<MediaPreview[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<BlogArticle | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BlogArticle['category']>('IELTS Preparation');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const isBn = language === 'bn';
  const filtered = useMemo(() => articles.filter(a => [a.title, a.excerpt, ...a.tags].join(' ').toLowerCase().includes(query.toLowerCase())), [articles, query]);

  useEffect(() => () => media.forEach(item => URL.revokeObjectURL(item.url)), [media]);

  const resetEditor = () => {
    setEditing(null); setTitle(''); setCategory('IELTS Preparation'); setExcerpt(''); setBody(''); setTags(''); setPreview(false);
    media.forEach(item => URL.revokeObjectURL(item.url)); setMedia([]);
  };

  const openNew = () => { resetEditor(); setEditing({} as BlogArticle); };

  const openEdit = (article: BlogArticle) => {
    resetEditor(); setEditing(article); setTitle(article.title); setCategory(article.category);
    setExcerpt(article.excerpt); setBody(article.content); setTags(article.tags.join(', '));
  };

  const saveDraft = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    const now = new Date().toLocaleDateString('en-GB');
    const article: BlogArticle = {
      id: editing?.id || `blog_${Date.now()}`,
      title: title.trim(),
      slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category, excerpt, content: body, author: 'NextBorder Admin', status: 'Draft',
      isAIGenerated: false, humanApproved: false,
      createdAt: editing?.createdAt || now, updatedAt: now,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean), views: editing?.views || 0
    };
    const next = editing?.id ? storageService.updateBlog(article.id, article) : storageService.addBlog(article);
    setArticles(next); resetEditor();
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const added = Array.from(list).filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'))
      .map(file => ({ file, url: URL.createObjectURL(file), kind: file.type.startsWith('video/') ? 'video' as const : 'image' as const }));
    setMedia(prev => [...prev, ...added]);
  };

  const removeArticle = () => {
    if (!deleteTarget) return;
    setArticles(storageService.deleteBlog(deleteTarget.id)); setDeleteTarget(null);
  };

  return <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
    <header className="glass-panel rounded-3xl p-5 md:p-7 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-300/25 grid place-items-center"><BookOpen className="w-5 h-5 text-amber-200" /></div>
        <div><p className="text-[10px] uppercase tracking-[.24em] text-amber-200/70">NextBorder / Content</p><h1 className="text-xl md:text-2xl font-semibold text-white">{isBn ? 'ব্লগ স্টুডিও' : 'Blog Studio'}</h1><p className="text-xs text-white/55 mt-1">{isBn ? 'লিখুন, মিডিয়া যোগ করুন, ড্রাফট সংরক্ষণ করুন' : 'Write articles, add media, and manage drafts'}</p></div>
      </div>
      <button onClick={openNew} className="rounded-xl px-4 py-2.5 bg-amber-300 text-[#20180b] text-sm font-semibold flex items-center gap-2 hover:bg-amber-200 transition"><Plus size={16}/> {isBn ? 'নতুন আর্টিকেল' : 'New article'}</button>
    </header>

    {editing && <form onSubmit={saveDraft} className="glass-panel rounded-3xl p-5 md:p-7 space-y-4 border border-amber-200/20">
      <div className="flex items-center justify-between"><h2 className="font-semibold text-white">{editing.id ? 'Edit article' : 'Create article'}</h2><button type="button" onClick={resetEditor} className="p-2 text-white/60 hover:text-white" aria-label="Close editor"><X size={18}/></button></div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="text-xs text-white/65 space-y-1">Article title<input required value={title} onChange={e=>setTitle(e.target.value)} className="glass-input w-full rounded-xl p-3 text-sm" placeholder="A useful, specific headline"/></label>
        <label className="text-xs text-white/65 space-y-1">Category<select value={category} onChange={e=>setCategory(e.target.value as BlogArticle['category'])} className="glass-input w-full rounded-xl p-3 text-sm">{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
      </div>
      <label className="block text-xs text-white/65 space-y-1">SEO excerpt<input required value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="glass-input w-full rounded-xl p-3 text-sm" placeholder="Short summary for search and article cards"/></label>
      <label className="block text-xs text-white/65 space-y-1">Article body<textarea required rows={8} value={body} onChange={e=>setBody(e.target.value)} className="glass-input w-full rounded-xl p-3 text-sm leading-relaxed" placeholder="Write your article..."/></label>
      <label className="block text-xs text-white/65 space-y-1">Tags, comma separated<input value={tags} onChange={e=>setTags(e.target.value)} className="glass-input w-full rounded-xl p-3 text-sm" placeholder="USA, Scholarship, IELTS"/></label>
      <div className="rounded-2xl border border-dashed border-white/20 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-sm text-white font-medium">Article media</p><p className="text-[11px] text-white/45">Images and videos can be previewed here.</p></div><div className="flex gap-2">
          <label className="cursor-pointer rounded-lg px-3 py-2 bg-white/10 text-xs text-white flex items-center gap-2"><ImagePlus size={15}/> Photo<input type="file" accept="image/*" multiple hidden onChange={e=>handleFiles(e.target.files)}/></label>
          <label className="cursor-pointer rounded-lg px-3 py-2 bg-white/10 text-xs text-white flex items-center gap-2"><Video size={15}/> Video<input type="file" accept="video/*" multiple hidden onChange={e=>handleFiles(e.target.files)}/></label>
        </div></div>
        {media.length > 0 && <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{media.map((item,i)=><div key={item.url} className="relative rounded-xl overflow-hidden bg-black/30 aspect-video">{item.kind==='image'?<img src={item.url} alt={item.file.name} className="w-full h-full object-cover"/>:<video src={item.url} controls className="w-full h-full object-cover"/>}<button type="button" onClick={()=>{URL.revokeObjectURL(item.url);setMedia(prev=>prev.filter((_,n)=>n!==i));}} className="absolute top-1 right-1 rounded-full bg-black/70 p-1 text-white" aria-label="Remove media"><X size={13}/></button></div>)}</div>}
        <p className="text-[11px] text-amber-200/75">Local preview only. Cloud upload is not connected yet, so media files are not uploaded to Supabase or published.</p>
      </div>
      <div className="flex justify-end gap-2"><button type="button" onClick={()=>setPreview(v=>!v)} className="rounded-xl px-3 py-2 border border-white/15 text-white/80 text-xs flex items-center gap-2"><Eye size={14}/>{preview?'Hide preview':'Preview text'}</button><button type="submit" className="rounded-xl px-4 py-2 bg-amber-300 text-[#20180b] font-semibold text-xs flex items-center gap-2"><Save size={14}/> Save draft</button></div>
      {preview && <div className="rounded-2xl bg-black/20 border border-white/10 p-4"><p className="text-xs text-amber-200">{category}</p><h3 className="text-lg text-white font-semibold mt-1">{title || 'Article title'}</h3><p className="text-sm text-white/60 mt-2">{excerpt}</p><p className="text-sm text-white/80 whitespace-pre-wrap mt-4">{body}</p></div>}
    </form>}

    <div className="glass-panel rounded-2xl p-3 flex items-center gap-3"><Search size={16} className="text-white/45"/><input value={query} onChange={e=>setQuery(e.target.value)} className="bg-transparent outline-none text-sm text-white flex-1" placeholder="Search articles..."/><span className="text-xs text-white/45">{filtered.length} articles</span></div>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{filtered.map(article=><article key={article.id} className="glass-panel rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between gap-2"><span className="text-[10px] uppercase tracking-wider text-amber-200/80">{article.category}</span><span className="text-[10px] rounded-full px-2 py-1 bg-amber-300/10 text-amber-100 border border-amber-200/20">{article.status}</span></div>
      <h3 className="text-base font-semibold text-white">{article.title}</h3><p className="text-xs text-white/55 line-clamp-3">{article.excerpt}</p>
      <div className="flex items-center justify-between pt-2 border-t border-white/10"><span className="text-[10px] text-white/40">{article.updatedAt}</span><div className="flex gap-1"><button onClick={()=>openEdit(article)} className="p-2 rounded-lg hover:bg-white/10 text-white/70" aria-label="Edit article"><FileText size={15}/></button><button onClick={()=>setDeleteTarget(article)} className="p-2 rounded-lg hover:bg-red-500/15 text-red-200/70" aria-label="Delete article"><Trash2 size={15}/></button></div></div>
    </article>)}</div>
    <ConfirmDeleteModal isOpen={!!deleteTarget} title="Delete draft?" message="This removes the article from this browser's saved blog records." itemName={deleteTarget?.title} onConfirm={removeArticle} onCancel={()=>setDeleteTarget(null)}/>
  </motion.section>;
};
