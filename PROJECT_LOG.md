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

## 2026-11-01 - Admin workspace update
- Grouped sidebar navigation into Overview, CRM, Insights, Content, and Workspace.
- Added a Notification Center with search, unread filtering, mark-all-read, and read-on-open interactions using existing demo notification data.
- Fixed Blog Studio object URL cleanup to avoid revoking active previews on each media state update.
- Live notification integration, Supabase upload, schema changes, tests, merge, and production deployment remain pending/not performed.

## 2026-11-06 - SEO Auto-Blog Automation Verification Checkpoint
- Make scenario: `NextBorder AI Blog Writer - SEO Review & Auto Publish` (scenario ID `8362380`), configured as an active daily scheduled scenario at 06:00.
- Scenario pipeline: Gemini generates 3 articles (2 English + 1 Bangla); a separate Gemini editorial/SEO reviewer gates publication; Supabase duplicate-slug check prevents repeated slugs; only AI-approved items scoring at least 85 are inserted as `PUBLISHED` with `AI_APPROVED`.
- Connections checked healthy at verification time: Gemini connection `NextBorder_Gemini`; Supabase connection to project `jgxgzwoediekyeiysgwo`.
- Make Free plan observed: 1,000 operations/month; 60 used and 940 remaining at the time checked. No paid API or Make plan was enabled.
- Execution evidence: one successful run completed 11 operations and inserted 3 articles; another successful run completed 10 operations and inserted 2 articles. A separate rapid manual test hit Gemini Free-tier HTTP 429 rate limiting. Do not repeatedly trigger manual runs in a short burst.
- Database verification found 5 AI-created articles in `PUBLISHED` + `AI_APPROVED` state and 3 AI-created drafts. SEO title and description were populated for the five published rows.
- Known issue: all 5 AI-published rows had `published_at = NULL`. This must be fixed in the Make Supabase insert mapping before treating the publishing workflow as fully clean. Existing rows were not backfilled.
- Not yet verified: exact Make scheduler timezone for the 06:00 run, public availability/rendering of every generated article URL, Google indexing/ranking, article image attachment, and sustained daily 3-article delivery.
- One earlier public test article returned HTTP 200 but displayed Markdown escape characters in its body; investigate rendering separately.
- Manual admin review is still recommended. The current Make route auto-publishes after AI review, so admin review is post-publication, not a pre-publication approval gate.
- Safety boundary: no frontend/source-code changes, no merge, no production promotion, no secrets inspection, no paid API calls, and no Make paid-plan upgrade were performed for this automation checkpoint.
- Next verification/fix priorities: (1) resolve Make scheduler timezone and confirm Asia/Dhaka 06:00; (2) fix `published_at` mapping; (3) verify public article rendering; (4) monitor daily execution counts and Gemini quota failures; (5) decide whether admin approval should happen before publication.

## 2026-11-06 - Canonical Admin Login URL
- Confirmed canonical NextBorder Admin Panel login URL: `https://admin.nextborder.online/`.
- This is the only admin login URL to provide in future project guidance, setup notes, and documentation unless the user explicitly changes it.
- Permanently mark the previously suggested `https://www.nextborder.online/admin` URL as rejected/obsolete; do not recommend or reuse it.
- Scope clarification: this log entry updates the project's canonical URL reference only. It does not delete or modify any website route, DNS record, hosting configuration, or source code.

## 2026-11-06 03:25:43 (Asia/Dhaka, UTC+06:00) - Consolidated Project Status
This entry consolidates the work, decisions, and verification status recorded for the NextBorder / NORA website project up to this timestamp. It distinguishes implemented work from design direction and items that still need verification.

### 1. Repository and admin dashboard work
- Working GitHub repository: `dawancolor-cell/nextborder-import`.
- Working branch: `feature/nextborder-admin-dashboard`; the branch was created from `main` on 2026-11-01.
- Added `AdminBlogStudioView` with article title, category, SEO excerpt, body, tags, draft save, edit, delete, text preview, and image/video selection with temporary browser previews.
- Routed the existing Blog Manager navigation to the new Blog Studio and preserved the prior Blog Manager source file and other dashboard modules.
- Grouped sidebar navigation into Overview, CRM, Insights, Content, and Workspace.
- Added a Notification Center with search, unread filtering, mark-all-read, and read-on-open interactions using demo notification data.
- Fixed Blog Studio object URL cleanup.
- Current implementation limitations: blog records still use browser localStorage; selected media previews are temporary object URLs and are not persisted or uploaded to Supabase Storage. Notification data is still demo data.
- Build/lint and broader automated tests have not been confirmed. Run `npm run lint` and `npm run build` locally before any merge.
- No merge to `main` or production promotion is recorded.

### 2. Canonical admin login address
- **Canonical Admin Panel login URL:** `https://admin.nextborder.online/`.
- This is the single approved admin login URL for future instructions and project documentation.
- The previously suggested `https://www.nextborder.online/admin` address is explicitly rejected/obsolete and must not be recommended again.
- This is a documentation and instruction decision only. No route, DNS record, hosting configuration, or source code was deleted or changed as part of this URL correction.

### 3. SEO auto-blog system
- Make scenario: `NextBorder AI Blog Writer - SEO Review & Auto Publish`, scenario ID `8362380`; last verified active.
- Intended daily content mix: 2 English articles and 1 Bangla article, using simple natural language on study, universities, student life, scholarships, new subjects, and AI.
- Workflow: Gemini generation -> separate Gemini editorial/SEO review -> duplicate slug check in Supabase -> insert only when AI reviewer approves with score >=85.
- Supabase project: `jgxgzwoediekyeiysgwo`; Gemini and Supabase Make connections were healthy at the last verification.
- Make Free plan was observed at 1,000 operations/month, with 60 used and 940 remaining at the time of that check. No paid API or Make upgrade was enabled.
- Recorded successful executions: one 11-operation run inserted 3 articles; one 10-operation run inserted 2 articles. A rapid manual test separately encountered Gemini Free-tier HTTP 429 rate limiting.
- Supabase verification found 5 AI-created rows in `PUBLISHED` + `AI_APPROVED` state and 3 AI-created drafts. SEO title and description were present on the five published rows.
- Known issue: the 5 verified published rows had `published_at = NULL`; the Make insert mapping needs correction. Existing rows were not backfilled.
- A public test article returned HTTP 200 but displayed Markdown escape characters. Rendering of all article URLs, Google indexing/ranking, image attachment, and sustained daily delivery remain unverified.
- Make scenario schedule showed 06:00, but its scheduler timezone was not confirmed. Do not assume the schedule is Asia/Dhaka until checked.
- Current route publishes after AI approval. Admin review is therefore post-publication, not a pre-publication approval gate.

### 4. Monitoring automation
- ChatGPT daily monitoring automation: `NextBorder Blog Morning Check`.
- Schedule: daily at 08:00, Asia/Dhaka; enabled at the time it was created.
- It is intended to report Make scenario status/latest run/operation count, Supabase article counts and language split, review and SEO fields, missing `published_at`, duplicate checks, and Gemini 429 errors.
- The monitor is read-only and must not modify articles, database records, Make scenarios, code, or project files.

### 5. Design direction and prior design checkpoints
- The project direction is a premium, human-designed website rather than generic AI-generated styling.
- Requested experience includes purposeful animation, smooth scrolling, micro-interactions, interactive storytelling, and subtle 3D only where useful.
- A reusable NextBorder / SpaceEdu animated hero HTML reference (`nextborder_spaceedu_hero.html`) was previously established as a preferred hero-section reference; preserve its responsive, accessibility, planet-switching, video-asset, and single-file implementation decisions unless explicitly changed.
- The American Dream typography direction was recorded as: exact text `MAKING YOUR AMERICAN DREAMS ALIVE.` in three lines (`MAKING YOUR` / `AMERICAN` / `DREAMS ALIVE.`), using a large refined editorial serif such as Cormorant Garamond, regular/medium weight, and tight typography.
- Additional USA-page visual direction recorded: use the supplied image in the foreground and as part of the background treatment, glassmorphism, slow/smooth popup animation, a prominent NextBorder USA call-to-action, and a golden bridge with restrained multicolour glow while retaining the main website palette.
- These are design decisions/reference directions. This log does not claim that every requested visual has been implemented or deployed.
- Previously identified high-priority visual/automation work includes fixing the 3D bookshelf and stabilizing automatic written-article publishing (not video/vlog publishing).

### 6. Hosting and deployment context
- The user stated that the website is also hosted through SiteChai. The exact hosting package, DNS arrangement, origin server, and deployment workflow have not yet been independently verified.
- Public website reference: `https://www.nextborder.online`.
- Do not assume that GitHub branch commits automatically deploy to the SiteChai-hosted website.
- No hosting migration, DNS change, production deployment, or SiteChai configuration change is recorded in this checkpoint.

### 7. Safety and change-control boundaries
- Keep future work free-first and avoid paid API calls or paid-plan upgrades unless the user explicitly approves.
- Do not use Lovable.
- Do not inspect or expose secrets.
- Do not merge to `main`, promote to production, or change live hosting/DNS without explicit authorization.
- Keep changes documented in `PROJECT_LOG.md` with evidence and clearly label verified, pending, and unverified items.
- Current status is a consolidated documentation checkpoint, not a claim that all planned features are finished.



## 2026-11-06 - Sidebar company logo visibility fix
- Replaced the hand-drawn placeholder SVG in the sidebar branding slot with the repository's existing `/company-logo.png` asset.
- Kept the circular gold frame and added restrained hover/glow feedback; the logo scales down with the collapsed sidebar.
- Removed the duplicate text brand lockup beneath the emblem because the supplied badge already contains the NextBorder wordmark.
- Source change committed to `feature/nextborder-admin-dashboard`: `5fc7eea90c615bbda1bd0457db2f515548511502`.
- Not yet verified in a browser or on the live admin host. This branch commit does not establish that SiteChai or the live admin subdomain has deployed it.
- Functional audit finding: current dashboard records use browser localStorage and some analytics/notifications are demo-derived. The Settings screen also exposes a client-side passcode field, which is not secure authentication. These must not be represented as production-ready CRM/authentication.
- Next implementation work: inspect all CRUD views and existing backend schema, replace mock/local-only persistence with authenticated backend operations where the data model and access policies are verified, add validation/error/loading states, and run build/lint plus end-to-end smoke tests before any production promotion.
