# Interactive demonstration

On 9 October 2026 the user explicitly selected: “Interactive demo with fictional complaints and simulated AI answers (recommended).”

This implementation is a demonstration of the agreed workflow. All demo cases, case histories, sample policy documents, correction examples and evaluation observations are fictional. Historical CGNet electricity report themes now inform the cases; source attribution is separate from the synthetic evidence. The sample registry's current/superseded labels do not verify any real government policy. No live model, government system, external message service, document upload, OCR or government record access is connected.

The source discovery kit is retained unchanged in README.md, AGENTS.md, CLAUDE.md, OPEN-QUESTIONS.md, brief.json and stations/. Unresolved production decisions remain unresolved, including approved infrastructure, data access, retention, policy ownership, identity/roles, incident accountability, maintenance and funding.

## Demonstrated workflow

- Browse, filter and search eight fictional cases in English or Hindi.
- Read fictional complainant names, full sample addresses, landmarks, non-dialable contact placeholders, service references and responsible staff.
- Use the default Actions tab to assign responsibility, choose follow-up dates, prepare unsent requests, record findings or follow-ups, review closure evidence and record an officer decision. Reopening retains the action history.
- Read sample case histories and documents.
- Ask supported questions using a deterministic simulation; unsupported questions show the simulation's limits.
- Open citations; exclude superseded and unverified sample policies from new guidance.
- Give feedback, propose a correction, then switch to a clearly labelled reviewer simulation to approve or reject it. Only approved corrections appear in subsequent simulated guidance as reviewed notes; they do not modify the policy registry.
- Record browser-tab notes and prepare a colleague question. Nothing is sent or written to a case system.
- Inspect a worked example of policy-search metrics, the underlying fictional observations, and distinct interactions from the current browser tab.

Demo state, including assignments, drafts, action records, evidence references and closure decisions, stays in sessionStorage for the current browser tab. Reset demo clears this state. There is no production retention decision or backend database. No real personal or government data should be entered.

## Development and checks

This is buildless HTML/CSS/JavaScript, served from dist/. The domain logic is in dist/demo-core.mjs. Run `node checks.mjs` for workflow and data-integrity checks. The hosting manifest and native Sites source workflow govern publication.

## Minimal interface revision

At the user's request, the interface was redesigned on 9 October 2026 to use a minimal editorial hierarchy: a single complaint list, a separate focused case view, concise navigation, black typography, white space, and restrained red accents. The persistent language bar displays हिन्दी and English. The dashboard sidebar, count cards, repeated demo banners, and decorative panels were removed. Core demo behavior and the discovery agreements are unchanged.

## CGNet-inspired fictional cases

At the user's request, eight CGNet electricity stories were reviewed and their problem themes adapted into eight new fictional scenarios. The original story references, publication dates, source regions, concise paraphrases, boundaries and case mapping are in evidence/cgnet-source-review.json. The Data plugin's source-context workflow was used for bounded original-source retrieval and attribution. This is a dataset revision to the existing product demo, not a new analytical dashboard or performance report.

Original reports range from 2012 to 2022 and are community accounts, including one reported restoration. Their present-day status and underlying claims are not independently verified. They are not Bihar grievance records, current policy or proof of real outcomes. The app's “Inspired by CGNet” link makes these distinctions visible.

The Bihar locations, case IDs, counts, amounts, dates, statuses, record histories and sample guidance are synthetic. No real person names, contact details, village names or complaint IDs were copied. No original text paragraphs are reproduced. The fictional policy-search observations remain unrelated to the CGNet stories and are not a measurement of CGNet performance.

This data revision uses a new demo session key/schema so old corrections and notes cannot silently attach to revised case scenarios. Old browser-tab demo state is not sent elsewhere or reused.

## Officer workflow correction

The user identified that the earlier demo omitted the identity, address and actionable workflow needed for a useful officer case view. On 9 October the original README, all nine station notes, OPEN-QUESTIONS.md and brief.json were re-read. The analytics requirement that evaluation does not need citizen identifiers is not a prohibition on case-detail fields. The correction adds fictional operational details while keeping routine interaction events free of complainant identifiers.

Each case now has its own three-step suggested checklist, grounded in the fictional case gaps and sample checklist. These suggestions are demo product content, not verified departmental SOPs or a newly settled production requirement. A named demo staff directory illustrates assignment. Follow-up dates are manually chosen review dates, not statutory deadlines. Phone placeholders are deliberately non-dialable; no real directory or location is represented by the invented village/address details.

The officer can accept, modify or set aside a suggested step and record a finding and reference. A request draft does not send a message, complete a step, or change case status. AI explanations do not change the workflow. Only officer form submissions change the local demo. All actions are timestamped; status changes appear in the list and filters. Closure requires reviewed steps, an evidence entry, a reason, the complainant's response and an explicit officer confirmation. This is an illustrative demo closure form, not an official rule. Reopening records the reason, keeps the history and returns the checklist for review.

Validation covers assignment, date validation, unsent drafts, evidence gates, accept/modify/reject, status filtering, manual closure, reopening, escaping, all eight case views in both languages and reset. Browser layout QA was unavailable. See BRIEF-REVIEW.md for the requirement-by-requirement assessment and remaining production gaps.
