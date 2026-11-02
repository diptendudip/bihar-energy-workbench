# Product roadmap

The workbench is intended to reduce repetitive administrative work for grievance-handling staff and officers in Bihar's electricity distribution system: locating guidance, reconstructing case history, identifying a responsible office and preparing follow-up. Better resolution rates and more time for substantive work are goals to evaluate, not demonstrated outcomes.

The current prototype uses fictional complaints, sample policies and public-office directories. [Architecture](architecture.md) describes what the code currently implements. The proposed pilot and production work below remain dependent on data access, approvals, operating decisions and funding. [Validation](validation.md) distinguishes discovery feedback from direct prototype testing and measured outcomes.

## Product requirements

- Use an easy, approachable English/Hindi web application that helps staff understand complaint history, policies and administrative processes. Keep the interface engaging without obscuring evidence or responsibilities.
- Show the complaint, case history, relevant policy/SOP documents and comparable decisions alongside explanations and citations. Complaint and policy answers need an evidence-based explanation; brief answers are appropriate for general questions, but must still be grounded in data.
- Verify that a policy or SOP is current before using it in an answer. A document date alone is insufficient. Missing record facts must remain explicitly unknown; the assistant must not invent them or decide a grievance.
- Keep decisions and actions with officers. Provide suggested next steps, editable drafts and evidence review without acting on an officer's behalf.
- Support manual corrections with higher-officer or peer review before reuse. Allow staff to check related documents and seek a colleague's explanation through an approved email or messaging workflow.
- Integrate with an existing departmental website, email and case-management workflow where feasible. A separate interface remains an option; actual integrations have not been agreed or connected.
- Extend beyond text to images, documents, PDFs and scanned documents, including Hindi, when an approved ingestion and processing arrangement is available. Upload, OCR and document understanding are not implemented in the current prototype.
- Keep government complaint records in a government-approved environment for hosting and AI processing, including during prototyping. Do not send them to an outside AI company. Government data remains government-owned; the development team does not seek to access or own it.
- Use existing grievance IDs, timestamps, categories, workflow status and aggregated indicators for routine evaluation where possible. New collection of citizen names, phone numbers or other identifiers is not needed for evaluation. Operational case fields and evaluation exports have different purposes.

## Proposed pilot and evaluation

The planning scope is 10–30 grievance-handling staff and officers over a 12-month project. This is a proposed scope, not a confirmed deployment, recruited cohort or funded commitment.

Compare the existing workflow with the assisted workflow when staff locate government policies, regulations, circulars and previous instructions. The provisional target is at least a 25% reduction in median search time, assessed alongside citation correctness and grievance outcomes. The prototype's invented observations do not measure this target.

| Area | Intended measurement |
| --- | --- |
| Efficiency | Policy-search time, staff time per grievance and manual follow-up effort |
| Accuracy | Citation correctness, answer relevance, officer usefulness ratings and flagged errors |
| Case progression | Registration, assignment, first action, follow-up and resolution times; unattended and overdue cases |
| Human oversight | Acceptance, modification and rejection of suggestions; corrections; usability and officer confidence |
| Reliability | Response times, system errors and failures to retrieve case records |

Early failure thresholds, evaluation ownership and a detailed measurement protocol still need to be defined. Faster search alone is insufficient evidence of success.

## Decisions before a government-data pilot

| Workstream | Decision or evidence still needed |
| --- | --- |
| Problem validation | Establish whether complaints commonly reach legislative members before the department and whether that creates the administrative bottleneck this workflow should address. Existing accounts do not establish its prevalence or the need on their own. |
| Access and source suitability | Establish authorized access to the existing case system. Departmental staff may have access to complaints, policies and prior decisions; the project does not yet have case-system access. Assess suitable public Bihar case records and electricity-related CGNet reports, their access methods, provenance and currency before using them beyond the current fictional examples. |
| Policy governance | Identify authoritative policy/SOP owners, approved versions, update checks and the process for withdrawing stale guidance. Decide what constraints besides policy documents, SOPs and citations should accompany explanations. |
| Approved infrastructure and AI | Establish government-approved hosting and processing, select the internal model gateway and estimate AI-use costs without compromising data protection. Configuring the prototype adapter does not supply these approvals. |
| Identity and correction review | Define real officer/reviewer identities, permissions and review accountability. Replace the local reviewer simulation before shared operational use. |
| Records and retention | The pilot design anticipates copying some complaint records and reading from the case system when needed; decide which records may be copied and where. Retaining questions, answers and corrections indefinitely is conditional on a government decision permitting it. No such retention permission is established. |
| Sensitive data and safety | Define sensitive-data handling, plausible harmful outputs, prevention and response controls, and who is accountable when an answer or workflow fails. Current prototype safeguards do not settle production safety governance. |
| Integrations and service failures | Decide feasible website, email, case-system and colleague-messaging integrations; what other systems may request through an API; and behavior under slow services, rate limits and outages. Public lookup fallbacks do not establish a plan for future case-system dependencies. |
| Monitoring and maintenance | Assign responsibility for monitoring, incident response and ongoing maintenance; determine operating and maintenance costs. These owners and budgets have not been assigned. |
| Learning from the project | Specify which artifacts the team may study and how learning can occur without accessing or owning government data. |
| Funding and payments | Decide whether anyone pays, who the paying stakeholder would be, how work remains funded after launch and whether a payment system is needed. No pricing or payment commitment has been established. |

## Delivery capabilities

Moving to a government-data pilot requires product/UX and frontend work; backend and approved infrastructure; source preparation, retrieval and AI integration; evaluation and data analysis; and privacy/safety review. These are capabilities to cover, not an assigned team or a requirement to hire a separate person for every role.

Implementation can continue on fictional fixtures and public-source lookup while production decisions remain open. Features that depend on government data, approved processing, live communications or operating commitments require those specific arrangements before activation.
