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
