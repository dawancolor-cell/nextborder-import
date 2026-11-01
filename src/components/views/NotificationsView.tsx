import React, { useMemo, useState } from 'react';
import { Bell, CheckCheck, Clock3, FileText, GraduationCap, Search, ShieldAlert } from 'lucide-react';
import { NOTIFICATIONS } from '../../data/mockData';

export const NotificationsView: React.FC<{ language: 'en' | 'bn' }> = ({ language }) => {
  const [items, setItems] = useState(() => NOTIFICATIONS.map(item => ({ ...item })));
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [query, setQuery] = useState('');
  const isBn = language === 'bn';
  const unread = items.filter(item => !item.read).length;
  const visible = useMemo(() => items.filter(item => (filter === 'all' || !item.read) && (item.title + item.studentName).toLowerCase().includes(query.toLowerCase())), [items, filter, query]);
  const markAll = () => setItems(current => current.map(item => ({ ...item, read: true })));
  return <section className="space-y-5">
    <header className="glass-panel rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-2xl bg-amber-300/10 border border-amber-200/20 grid place-items-center"><Bell className="text-amber-200"/></div><div><p className="text-[10px] uppercase tracking-[.2em] text-amber-200/65">Admin / Workspace</p><h1 className="text-2xl font-semibold text-white">{isBn ? 'নোটিফিকেশন সেন্টার' : 'Notification Center'}</h1><p className="text-xs text-white/50">{unread} {isBn ? 'টি অপঠিত' : 'unread alerts'}</p></div></div><button onClick={markAll} className="rounded-xl px-4 py-2.5 bg-amber-300 text-[#20180b] text-xs font-semibold flex items-center gap-2"><CheckCheck size={15}/>{isBn ? 'সব পড়া হয়েছে' : 'Mark all read'}</button></header>
    <div className="glass-panel rounded-2xl p-3 flex flex-wrap items-center gap-3"><div className="flex gap-2"><button onClick={()=>setFilter('all')} className="rounded-lg px-3 py-2 text-xs bg-white/10 text-white">All</button><button onClick={()=>setFilter('unread')} className="rounded-lg px-3 py-2 text-xs bg-white/10 text-white">Unread</button></div><div className="flex items-center gap-2 flex-1 min-w-[180px]"><Search size={15} className="text-white/40"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search notifications" className="bg-transparent outline-none text-sm text-white flex-1"/></div></div>
    <div className="space-y-2">{visible.map(item=><button key={item.id} onClick={()=>setItems(current=>current.map(n=>n.id===item.id?{...n,read:true}:n))} className="w-full text-left glass-panel rounded-2xl p-4 flex items-center gap-3 hover:bg-white/10 transition"><div className="w-10 h-10 rounded-xl bg-white/5 text-amber-200 grid place-items-center shrink-0">{item.type==='mock_test'?<GraduationCap size={17}/>:item.type==='visa'?<FileText size={17}/>:<ShieldAlert size={17}/>}</div><div className="flex-1 min-w-0"><p className="text-sm text-white font-medium">{item.title}</p><p className="text-xs text-white/50 mt-1">{item.studentName}</p></div><span className="text-[10px] text-white/40 flex items-center gap-1"><Clock3 size={12}/>{item.time}</span>{!item.read&&<span className="w-2 h-2 rounded-full bg-amber-300"/>}</button>)}</div>
    <p className="text-[11px] text-amber-200/65">{isBn?'এগুলো ডেমো নোটিফিকেশন। লাইভ ডেটা সংযোগ এখনো করা হয়নি।':'These are demo notifications. Live event integration is not connected yet.'}</p>
  </section>;
};