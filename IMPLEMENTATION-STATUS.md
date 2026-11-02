# Bihar Energy Grievance Workbench — current implementation

Updated 9 October 2026 following the request to replace the scripted response and connect addresses to real-world offices. This status supersedes the simulation-only implementation notes for the capabilities listed below. The original discovery brief and its unresolved decisions remain unchanged.

## Implemented and published behavior

- A public-office lookup covers the 38 Bihar districts and uses 1,399 contact records extracted from official SBPDCL and NBPDCL public telephone directories. Names, roles, posting locations, division/circle labels and phone numbers come from the retrieved source, not invented fixtures. Some records describe the same office under different published designations; this is a contact-record count, not a count of unique offices.
- English and Hindi locality queries select the DISCOM and rank directory matches. An ambiguous district, conflicting address, out-of-state location or PIN alone does not establish a local jurisdiction. All service-section matches require officer confirmation from the consumer bill or office; geographic points are never treated as official service boundaries.
- Each fictional complaint now displays its real public-office matches. The former “outside this simulation” answer is replaced by a source-backed office/case lookup with provenance, case facts, gaps and a next officer step. The UI identifies this as a directory lookup, not a language-model response.
- An officer can select a listed office and record the basis of confirmation in the browser tab. Requests are editable drafts addressed to that office and contain the fictional representative, address, service/asset reference and requested evidence. Creating, saving or copying a draft does not send it or change a government record.
- Server endpoints provide connection status, directory refresh, case-question lookup and public-locality geocoding. Refresh re-parses the company’s current public HTML and updates unambiguous posting/role contacts. Changed, missing or conflicting contacts retain explicit snapshot/stale status; unavailable sources are never reported as live verified.
- A click-triggered Nominatim lookup shows Bihar location candidates for selection and a locality map with OpenStreetMap attribution. Household/phone/numeric-address input is rejected by that geocoding endpoint. The existing sample-case workflow sends only its public block/district, never the fictional household or representative.
- Existing human-led assignment, action/evidence entry, follow-up, manual closure/reopening, pending correction review and bilingual navigation are preserved. All local case activity remains a rehearsal, with browser-tab storage.

## Connections still required

There are no production runtime secrets and no connected government case system. The Site has not been established as a government-approved processing environment. No live language-model request was made and no government complaint data was ingested.

The server supports an OpenAI-compatible **government-approved internal gateway**, with these runtime settings configured only after approved hosting is established:

- `GOVERNMENT_DEPLOYMENT_APPROVED=true`
- `GOVERNMENT_AI_ENDPOINT` — full HTTPS chat-completions endpoint
- `GOVERNMENT_AI_TOKEN` — server-side secret
- `GOVERNMENT_AI_MODEL` — approved model identifier

The default is disabled. Direct external OpenAI, Anthropic and Google API hosts are rejected under the standing brief restriction. The adapter gives a brief evidence-based explanation and validates citation IDs against the supplied source set; it has no action tools. Invalid or failed model responses fall back to the explicitly labelled source lookup. Model-produced facts still require officer review; citation ID validation alone does not prove factual correctness.

Current government policy/SOP versions, live case access, approved storage/retention, operational ownership, accountability, costs and production reviewer identity remain open where the original brief says so. Fictional SAMPLE documents are not presented as verified policies in source-backed answers.

## Verification

The updated DOM/form checks pass for all cases and English/Hindi pages, including the exact previously failing question, office confirmation, addressed drafts and the full existing officer workflow. Server checks cover district ambiguity, mixed-language input, source outages, updated contacts, public geocoding restrictions, government-model configuration and invalid citation rejection. The parser was also checked against the actual retrieved SBPDCL HTML, verifying 650 contact records. The full application build passes.

Browser visual/layout QA is unavailable in this managed environment because the required browser skill is not exposed. Actual hosted model inference, government case-system access and a real externally sent request are unverified/unconnected. No production-integration success is inferred from fixture checks or the build.

## Public sources

- [SBPDCL telephone directory](https://www.sbpdcl.co.in/frmHelplineNumbers.aspx)
- [NBPDCL telephone directory](https://www.nbpdcl.co.in/frmHelplineNumbers.aspx)
- [NBPDCL district coverage](https://www.nbpdcl.co.in/frmAbtOrganization.aspx)
- [SBPDCL supply circles](https://www.sbpdcl.co.in/frmCallPowerCut.aspx)
- [Nominatim search API](https://nominatim.org/release-docs/latest/api/Search/)
- [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/)

Source markdown snapshots are retained under `evidence/`; `scripts/build-directory.py` regenerates the contact module from them. Replacing the sources requires source review, not just changing a date label.
