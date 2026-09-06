# anime-character-analyzer · CHANGELOG

所有對 `anime-character-analyzer` 規格 / 部署 / 測試的版本變更紀錄。

---

## v3.0.2 — 2026-09-06（repo-fleet 升級）

> v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet
> 由 repo-fleet Batch 2E 自動駕駛：Sean Li / Mavis worker agent

### Added
- `PRD/SPEC.md` v3.0.2 等級規格書（10 個 FR、5 個 NFR、雙軌部署契約、明確 Non-Goals）
- `PRD/CHANGELOG.md` 本檔
- `.github/workflows/ci.yml` GHA 4-job workflow（lint / test / build / deploy to Vercel）
- `tests/analyzers.test.ts` Vitest 13 案例（DEFAULT_ANALYZERS 結構、normalizeAnalyzer 7 條路徑）
- `vitest.config.ts` Vitest 設定
- `package.json` 加 `test` script + vitest 2.1.9 / @vitest/coverage-v8 devDeps

### Changed
- `app/create/page.tsx` — `<a href="/...">` 4 處全改 `<Link>` from `next/link`（Next.js 16 內部導航規範）
- `app/leaderboard/page.tsx` — `<a href="/...">` 4 處全改 `<Link>`；`useEffect → setCustomAnalyzers` 改為 `useState(readCustomAnalyzers)` lazy init（消除 React 19 `set-state-in-effect` 警告）
- `app/HomeContent.tsx` — 3 處 `<a href="/...">` 改 `<Link>`；`useEffect` 內 `setCustomAnalyzers` / `setSelectedAnalyzerId` 加 `eslint-disable react-hooks/set-state-in-effect` 區塊標註（localStorage 必須在 mount 後讀取，無可避免）
- `eslint.config.mjs` — 加 `test-app.js` 到 globalIgnores（Playwright E2E 腳本、非 TS、非構建目標）
- `package.json` — `lint` script 仍走 `eslint`，新增 `test` script 走 `vitest run`

### Removed
- 無（純增量；無刪除）

### Validation
- `npm run lint`：0 error, 6 pre-existing warnings（非阻塞）
- `npm run build`：10 routes（4 static + 4 dynamic API + 2 metadata）、0 type error
- `npm test`（Vitest 2.1.9）：13/13 案例全綠
- `npm install --legacy-peer-deps`：363 packages, 0 install error

### Notes
- 預設分支為 `master`（不是 `main`），GHA workflow 同時觸發 `[main, master]`
- 部署目標：Vercel（Next.js 16 + vercel.json 既有設定），GitHub Pages 僅作為 `dashboard.html` 靜態備援
- 原始 v2.2.1 SPEC 內容（已 1009+ 行）保留在 git history，未刪除；本檔 v3.0.2 為精簡版，明確列出目標狀態

---

## v2.2.1 — 2026-07-19（sweet-spot-driven rewrite）

> 原始版本，詳細內容見 git history。
> Sweet spot 評分：2/10；建議動作：kill（先驗證再開發）。
> 本次 v3.0.2 升級以 v2.2.1 為基礎，補強測試 / CI / 部署契約，但保留 v2.2.1 的 10 個預設分析器與核心 hash-based 配對演算法。
