# Architecture

The workbench combines a bilingual browser interface with a small API layer. Case administration is demonstrated with fictional records; public-office lookup uses attributed SBPDCL and NBPDCL directory snapshots. A live government case system and production language model are not connected.

## Components

| Location | Responsibility |
| --- | --- |
| `server/workbench.html`, `app/route.ts` | HTML shell served by the Vinext route |
| `public/app.mjs`, `public/styles.css` | English/Hindi list, case detail, evidence, correction review and evaluation interface |
| `public/cgnet-cases.mjs` | Eight fictional scenarios and their historical CGNet story references |
| `public/demo-core.mjs` | Sample policy registry, correction review, search and illustrative evaluation calculations |
| `public/officer-workflow.mjs`, `public/workflow-ui.mjs` | Assignment, follow-up dates, unsent drafts, evidence, action history, closure and reopening |
| `public/official-directory.mjs`, `public/real-world.mjs`, `public/real-world-ui.mjs` | Public directory records, district/locality matching, source-backed answers and office confirmation |
| `server/workbench.mjs`, `app/api/[...path]/route.ts` | API handlers and Cloudflare runtime bindings |
| `evidence/`, `scripts/build-directory.py` | Public-source snapshots, provenance and directory regeneration |
| `vite.config.ts`, `build/`, `scripts/` | Vinext/Vite/Cloudflare build and local development support |

The full application uses Vinext, React, Vite and Cloudflare Workers. The workbench interface itself uses HTML, CSS and JavaScript modules. Serving `public/` through a static HTTP server supports local interface review; API-backed refresh, geocoding and model requests require the full application.

## Case state and human decisions

`public/app.mjs` stores assignments, drafts, notes, corrections, evidence and action history in `sessionStorage` for the current browser tab. Reset clears this rehearsal state. There is no shared case database or production identity/reviewer system; the D1 and R2 hosting bindings are unused.

The officer assigns responsibility, chooses review dates and records findings or follow-ups. Suggested steps can be accepted, modified or set aside. Saving or copying a request does not send it, complete a step or change an external record. Closure requires reviewed steps, evidence, a reason, the complainant's response and explicit officer confirmation. Reopening preserves action history. Review dates and closure requirements illustrate a workflow; they are not statutory deadlines or departmental rules.

Corrections stay pending until the local reviewer simulation approves or rejects them. Approved notes can appear in subsequent local answers for the same case; they do not rewrite source documents or retrain a model. Officer-entered updates and corrections are kept distinct from the original fictional record. Local case edits are not sent to the model adapter; the browser adds relevant local notes to the displayed answer.

## Public-office lookup

The bundled snapshot contains 1,399 contact records across Bihar's 38 districts, drawn from official SBPDCL and NBPDCL public directories and checked on 9 October 2026. This counts published contact records, not unique offices. The district mapping contains 21 NBPDCL and 17 SBPDCL districts.

English and Hindi locality matching ranks candidate offices within the selected company. Ambiguous districts, conflicting locations, a PIN alone and out-of-state locations do not establish a service office. The officer confirms the consumer's service area from a bill or office response. Neither a locality name match nor a map point proves jurisdiction.

Server refresh parses current public directory HTML without executing it. It updates a contact when the posting/role has one unambiguous phone match. Missing or conflicting entries remain unverified. Results expose snapshot, stale or live-refresh status; an unavailable source does not become a verified result. Successful directory results are cached in server memory for one hour.

## API

| Endpoint | Behavior |
| --- | --- |
| `GET /api/status` | Reports directory snapshot metadata and whether model configuration is enabled; reports no case-system connection |
| `POST /api/resolve` | Resolves a public locality/district to office candidates, optionally refreshing the relevant company directory |
| `POST /api/answer` | Looks up a known fictional case, refreshes its public-office evidence and returns a source-backed answer; optionally calls the configured internal model gateway |
| `POST /api/geocode` | Requests public-locality candidates in Bihar from Nominatim; returns attribution and does not claim a verified service boundary |

The API rejects unknown case IDs, malformed or oversized requests, unsupported methods and a supplied cross-origin request origin. These checks do not replace production authentication, authorization or operational abuse controls.

Public-locality geocoding is click-triggered. The endpoint rejects numeric, phone-like, household-address, email and URL input; the case workflow supplies a public block/district rather than household details. Nominatim requests use attribution, an identifying user agent, a per-process rate guard and an in-memory cache. Selecting a result opens an attributed OpenStreetMap locality map. These are prototype controls, not a production privacy approval.

## Optional model adapter

The default answer engine is a source-backed directory/case lookup. The server calls an OpenAI-compatible internal gateway only when `GOVERNMENT_DEPLOYMENT_APPROVED=true` and an HTTPS endpoint, server-side token and model identifier are configured. Direct OpenAI, Anthropic and Google API hosts are blocked by the adapter. This configuration check cannot verify that an endpoint or deployment has actually received government approval.

The adapter supplies a fictional case, candidate offices and source references, and requests short explanations in the selected language. It exposes no action tools. Returned sections must cite IDs in the supplied source set. Invalid output or a failed request falls back to the labelled lookup. Valid citation IDs alone do not establish factual correctness; an officer still reviews the evidence. No live hosted inference is verified.

## Evidence and evaluation

Historical CGNet reports from 2012–2022 provide problem themes, with source links and mappings in `evidence/cgnet-source-review.json`. They are community accounts whose current status is not independently verified. They are not Bihar grievance records, current policy or evidence of this prototype's impact. The adapted people, complaint details, service references and histories are fictional; phone placeholders are non-dialable.

The sample policy registry demonstrates current, superseded and unverified states. It does not verify actual Bihar policies or SOPs. The evaluation view uses 12 invented paired policy-search observations; it is an example calculation, not a pilot result. Browser interaction counts are tab-local activity and are kept separate from those invented observations. Workflow dates and overdue checks use a fixed demonstration reference date.

## Verification

`node checks.mjs` covers provenance, fictional fixtures, citation eligibility, correction gates, workflow evidence and closure requirements, Hindi/English form journeys, escaping and reset. `node server-checks.mjs` covers jurisdiction ambiguity, contact refresh, source outages, geocoding input restrictions, model configuration gates and citation rejection. Server checks use mocked external responses. These checks do not establish production integration or visual browser coverage.

Setup commands are in [README.md](../README.md). Planned features and unresolved production decisions are in [roadmap.md](roadmap.md). The evidence and limits of external discovery feedback are recorded in [validation.md](validation.md).
