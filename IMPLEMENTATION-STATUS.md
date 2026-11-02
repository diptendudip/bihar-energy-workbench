# Implementation status

Updated 2 November 2026. This page describes the repository. The hosted demo may run an earlier commit until it is redeployed.

## Capabilities

| Area | Current implementation | Remaining work |
| --- | --- | --- |
| Case workflow | Eight fictional cases; assignment, drafts, action/evidence entry, follow-up, manual closure and reopening | Departmental workflow validation and case-system integration |
| Language | English/Hindi navigation, case records and workflow forms | Officer review of terminology and usability |
| Office lookup | 1,399 public-source contact records covering 38 Bihar districts; ranked locality matches | Confirmation of service jurisdiction from an authoritative record or office |
| Directory refresh | Server-side retrieval and parsing, with live, stale and bundled-snapshot states | Continued monitoring of upstream directory changes |
| Location | Public-locality lookup through Nominatim, with OpenStreetMap attribution | No household geocoding or official service-boundary inference |
| Answers | Source-backed case/office lookup; optional internal-model adapter with citation-ID checks | Approved model connection and factual-quality evaluation |
| Corrections | Browser-local officer/reviewer demonstration; approved notes can inform local lookup answers | Authenticated roles, independent reviewers and shared persistence |
| Storage | Browser-tab rehearsal state | Approved shared case storage, audit history and retention rules |
| Documents | Readable text examples | File upload, PDF/image understanding and OCR |

## Data and integration

The case details, sample policy registry and policy-search observations are fictional. The directory snapshot comes from the official SBPDCL and NBPDCL public websites and records its source date. A contact match does not verify the electricity service boundary.

No government case system or live language model is connected by default. Production processing requires approved hosting, access arrangements and operating responsibilities. The internal-model adapter remains disabled until its required runtime settings are supplied. A configuration flag is a technical gate, not evidence of departmental approval.

The adapter has no action tools. It rejects direct external OpenAI, Anthropic and Google API hosts and validates citation identifiers against the provided source set. These controls do not establish factual correctness or replace officer review.

## Verification

| Check | Coverage | Limit |
| --- | --- | --- |
| `node checks.mjs` | Source provenance, case data, bilingual interaction flows, correction review, evidence gates, manual closure/reopening and reset | Uses a DOM fixture; does not establish rendered-browser compatibility |
| `node server-checks.mjs` | Jurisdiction ambiguity, directory parsing/refresh, source outages, geocoding restrictions and internal-model approval/citation gates | Uses network and model fixtures; does not establish live integration quality |

Directory freshness is checked across successful refresh, subsequent source failure and recovery. Cached contact details remain available during an outage with their earlier check time, while the response and interface report the stale state.

A full framework build, visual browser testing and live model/case-system evaluation have not been rerun as part of this repository cleanup. Measured officer effectiveness is tracked separately in [validation](docs/validation.md).

## Source maintenance

Public-source snapshots and story provenance are retained in `evidence/`. Review replacement sources and ambiguous directory matches before regenerating `public/official-directory.mjs` with `scripts/build-directory.py`. Changing a date label does not refresh the underlying evidence.

See [architecture](docs/architecture.md) for the code map and [roadmap](docs/roadmap.md) for pilot requirements and unresolved decisions.
