# Contributing to Bihar Energy Grievance Workbench

Read [README.md](README.md) for setup, [docs/architecture.md](docs/architecture.md) for the current implementation, and [docs/roadmap.md](docs/roadmap.md) for product requirements and open decisions.

## Code and checks

- Browser code and fictional fixtures: `public/`.
- API logic: `server/workbench.mjs`; framework routes: `app/`.
- Public source snapshots and attribution: `evidence/`; directory generator: `scripts/build-directory.py`.
- Run `node checks.mjs` and `node server-checks.mjs` after workflow, fixture, lookup or API changes. These checks need no package installation.
- Use the Node and pnpm versions in `package.json`; run `pnpm dev` for development and `pnpm build` for a production bundle.
- Keep Hindi and English behavior aligned. Preserve source links, attribution and third-party notices.

## Product constraints

- This is a prototype with fictional complaints and sample policy documents. Do not present demo observations as measured outcomes or sample guidance as official policy.
- Officers decide cases. Suggestions remain read-only; drafts do not send messages or alter government records. Preserve evidence review and explicit human closure confirmation.
- Corrections require higher-officer or peer review before reuse. The current role switch is a local demonstration, not production access control.
- Public directory matches and map points do not establish service boundaries. Preserve jurisdiction confirmation and honest snapshot/stale/error states.
- Government complaint records must stay in a government-approved environment, including during prototyping and AI processing. Do not send them to an outside AI company. Government data remains government-owned; this repository must not contain real complaint records.
- Keep credentials server-side and out of Git. Leave the model adapter disabled unless the required deployment approval and approved internal gateway configuration exist. A configuration flag does not itself establish institutional approval.
- Production data access, retention, identity, policy verification, operating ownership and funding remain open as recorded in the roadmap. Do not imply that they have been approved or supplied.
- `.openai/hosting.json` identifies the existing hosted project. Preserve it for this project; do not reuse its identity for a separate deployment.
