# Bihar Energy Grievance Workbench

An English/Hindi prototype for electricity-grievance follow-up in Bihar. Officers can review a case, find candidate service offices, prepare a request and track the evidence needed for a decision.

[Open the demo](https://cgnet.in/biharenergy/) · [Sites-hosted demo](https://bihar-energy-workbench.diptendudip.chatgpt.site)

## Workflow

1. Review the complaint, location, service reference and case history.
2. Look up candidate offices in the SBPDCL/NBPDCL public directories and confirm jurisdiction.
3. Assign the next step, prepare an editable request and record findings or follow-up.
4. Review evidence and the complainant's response before manually closing or reopening the case.

The interface supports English and Hindi. Drafts remain unsent, and case actions require an explicit form submission. Corrections have a separate review step.

## Status

The prototype includes eight fictional case scenarios and a snapshot of 1,399 official-source contact records across Bihar's 38 districts. Directory refresh, source-backed lookup and public-locality geocoding have server handlers. Locality matches are candidates; the consumer bill or service office must establish the actual service boundary.

Case activity is stored in the browser tab. The reviewer role is a demonstration, and the repository has no connected government case system, shared case database or production officer authentication. An optional internal-model adapter is implemented but disabled by default. The sample policies and policy-search measurements are illustrative.

[Implementation status](IMPLEMENTATION-STATUS.md) · [Architecture](docs/architecture.md) · [Discovery feedback and validation](docs/validation.md) · [Roadmap](docs/roadmap.md)

## Try locally

For the browser interface, Python 3 is sufficient:

```sh
python3 -m http.server 8000 --directory public
```

Open <http://localhost:8000>. This mode uses bundled cases and directory records; it does not run the server API.

For the full application, use Node.js 22.13 or later and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:5173>. Build with `pnpm build`. The application uses Vinext, Vite, React and Cloudflare Workers. The existing Sites identity in `.openai/hosting.json` is deployment metadata; use a separate identity for a new hosted project.

## Run checks

The checks use Node.js built-ins and require no dependency installation:

```sh
node checks.mjs
node server-checks.mjs
```

`npm test` runs both suites. They cover bilingual case interactions, provenance, correction review, evidence requirements, manual closure, directory matching and refresh failures, geocoding restrictions and the optional model adapter. Network and model responses are fixtures in these checks. See [implementation status](IMPLEMENTATION-STATUS.md) for verification limits.

## Configuration

`.env.example` lists the optional internal-model settings. Real complaint data and AI processing require a government-approved environment. Configure `GOVERNMENT_DEPLOYMENT_APPROVED`, `GOVERNMENT_AI_ENDPOINT`, `GOVERNMENT_AI_TOKEN` and `GOVERNMENT_AI_MODEL` only after that arrangement is established. Keep credentials server-side and out of Git.

The adapter rejects direct OpenAI, Anthropic and Google API hosts. It checks citation identifiers against supplied evidence; factual support still requires review.

## Sources

The contact snapshot and its provenance are in `public/official-directory.mjs` and `evidence/`. `scripts/build-directory.py` regenerates the module from reviewed source snapshots. CGNet Swara story references document the themes behind the fictional cases.

- [SBPDCL telephone directory](https://www.sbpdcl.co.in/frmHelplineNumbers.aspx)
- [NBPDCL telephone directory](https://www.nbpdcl.co.in/frmHelplineNumbers.aspx)
- [NBPDCL district coverage](https://www.nbpdcl.co.in/frmAbtOrganization.aspx)
- [SBPDCL supply circles](https://www.sbpdcl.co.in/frmCallPowerCut.aspx)
- [OpenStreetMap / Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/)

Third-party notices remain alongside their respective files.
