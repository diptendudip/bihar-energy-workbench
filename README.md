# Bihar Energy Grievance Workbench

A bilingual, officer-led electricity grievance workbench for Bihar. It brings case background, public-office lookup, follow-up drafts and evidence tracking into one interface, while keeping decisions and actions with a human officer.

**[Live demonstration](https://cgnet.in/biharenergy/)** · **[Sites-hosted demonstration](https://bihar-energy-workbench.diptendudip.chatgpt.site)**

## What the code does

- English and Hindi case review, search and workflow navigation.
- Eight fictional complaint scenarios, with links to the public CGNet Swara stories that inspired their themes.
- Office lookup across Bihar's 38 districts using a snapshot of 1,399 public SBPDCL/NBPDCL contact records, with source links and optional server-side refresh.
- Human-led assignment, editable request drafts, evidence entry, follow-up, manual closure and reopening.
- Review of corrections before they can inform subsequent local answers.
- Optional public-locality mapping with OpenStreetMap attribution.
- A disabled-by-default adapter for a government-approved internal AI gateway, including citation-ID validation and fallback to labelled source lookup.

## Current boundaries

The cases and sample policy documents are fictional. Public contact records are source snapshots; matching a locality does not establish an official electricity service boundary. Officers must confirm jurisdiction. Drafting, saving and copying do not send a request or modify a government record. Rehearsal activity is stored in the browser tab.

No government case system or live language model is connected by default. The hosted demonstration has not been established as a government-approved environment for real complaint processing. The internal AI adapter is implemented, but production model inference and government integration remain unverified. See [IMPLEMENTATION-STATUS.md](IMPLEMENTATION-STATUS.md).

## Run the interface without installing dependencies

From this directory, using Python 3:

```sh
python3 -m http.server 8000 --directory public
```

Open <http://localhost:8000>. This serves the browser interface, fictional cases and bundled directory lookup. Server-backed directory refresh, geocoding and optional model inference require the full application below.

## Run the full application

Requirements: Node.js 22.13 or later and pnpm 11.25.0 (the version pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The portable development configuration serves at <http://localhost:5173>. The full app uses Vinext, React, Vite and the Cloudflare Workers runtime. The tracked `.openai/hosting.json` records the existing Sites project identity; it contains no credentials. Do not reuse that identity to publish a separate deployment.

For a production bundle:

```sh
pnpm build
```

## Checks

These existing checks run with Node.js and do not require package installation:

```sh
node checks.mjs
node server-checks.mjs
```

They exercise source provenance, bilingual interaction flows, correction review, evidence and closure requirements, jurisdiction ambiguity, refresh failures, geocoding restrictions and the model approval/citation gates. Model responses in the server checks are fixtures; passing them does not establish a live integration.

## Source map

| Path | Purpose |
| --- | --- |
| `public/` | Browser UI, case fixtures, officer workflow and source-backed office lookup |
| `server/workbench.mjs` | API handlers, directory refresh, public-locality geocoding and optional internal-model adapter |
| `app/` | Vinext routes serving the workbench and its API |
| `evidence/` | Public-source snapshots and CGNet story provenance |
| `scripts/build-directory.py` | Regenerates the directory module from reviewed source snapshots |
| `build/`, `scripts/` | Sites/Vinext build and local-runtime support |
| `DISCOVERY-BRIEF.md`, `stations/`, `OPEN-QUESTIONS.md` | Original discovery decisions, qualifications and unresolved questions |

## Optional AI configuration

`.env.example` documents setting names with blank credentials. Configure runtime values only after a government-approved deployment and processing arrangement are established:

| Variable | Purpose |
| --- | --- |
| `GOVERNMENT_DEPLOYMENT_APPROVED` | Defaults to `false`; explicit approval gate |
| `GOVERNMENT_AI_ENDPOINT` | Full HTTPS chat-completions URL of the approved internal gateway |
| `GOVERNMENT_AI_TOKEN` | Server-side credential; never commit its value |
| `GOVERNMENT_AI_MODEL` | Approved model identifier |

Direct external OpenAI, Anthropic and Google API hosts are rejected by the current adapter. Citation-ID validation checks references against supplied evidence; an officer still has to assess factual correctness.

## Public sources

- [SBPDCL telephone directory](https://www.sbpdcl.co.in/frmHelplineNumbers.aspx)
- [NBPDCL telephone directory](https://www.nbpdcl.co.in/frmHelplineNumbers.aspx)
- [NBPDCL district coverage](https://www.nbpdcl.co.in/frmAbtOrganization.aspx)
- [SBPDCL supply circles](https://www.sbpdcl.co.in/frmCallPowerCut.aspx)
- [OpenStreetMap / Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/)

This is a source export of Sites version 5, source commit `05543d0f7132db4db9c5bd2dd0fea3fe2d434240`, with repository setup documentation added. Third-party notices remain with their respective files.
