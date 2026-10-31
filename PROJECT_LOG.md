# NextBorder Admin Dashboard - Project Log

## 2026-11-01
- Created feature branch: `feature/nextborder-admin-dashboard` from `main`.
- Added `AdminBlogStudioView` as the new admin-facing blog editor.
- Added article title, category, SEO excerpt, body, tags, draft saving, edit, delete, and text preview.
- Added image/video file selection with in-browser previews and remove controls.
- Routed the existing Blog Manager navigation route to the new Blog Studio.
- Preserved the existing Blog Manager source file and existing dashboard modules.

## Important implementation boundary
- Blog records continue to use the existing browser localStorage service.
- Image/video previews use temporary browser object URLs only. Media is NOT uploaded to Supabase Storage and is NOT persisted after the editor session.
- Supabase schema, credentials, production hosting, and deployment were not changed.
- No merge to main and no production promotion performed.

## Verification status
- GitHub branch creation and file commits succeeded.
- Automated build/lint has not been run in this environment. Run `npm run lint` and `npm run build` locally before merging.
