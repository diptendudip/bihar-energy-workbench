# Bihar Energy Grievance Workflow — Discovery brief

Written in Kitchenlab. Version 1, 9 Oct 2026.

This brief records current decisions and unresolved questions. Prompt coverage describes discovery progress; implementation and release readiness still need review.

## Summary

The Bihar Energy Grievance Workflow is an AI-assisted web application for Bihar Energy Department staff who receive complaints and officers who resolve them. It will explain current policies and case history, flag relevant policies, and show source documents and citations to help users assess its answers. The pilot will involve 10–30 staff and officers in Bihar’s electricity distribution system and assess whether it reduces time spent locating relevant guidance while maintaining citation correctness and tracking grievance outcomes. The AI must not invent facts absent from the record, decide grievances for officers, or take action on their behalf. Government data must remain in a government-approved environment for AI processing.

## The Menu (required · 4 of 4 covered · 1 undecided)

- Build an AI-assisted workflow to help Bihar Energy Department staff who receive complaints and officers responsible for resolving them handle grievances.
- Officers report that villagers raise complaints with local legislative members before those complaints reach the Bihar Energy Department. The user does not yet have enough evidence to establish the need.
- If the workflow succeeds, staff and officers might resolve more grievances and spend more of their time on work they find exciting.

## Experience (required · 4 of 4 covered · 2 undecided)

- The workflow should be very easy to use and help staff and officers understand relevant policies, complaint background, and bureaucratic processes with less uncertainty. It should also include an element of fun.
- Use a web application as the primary surface for Bihar Energy Department staff and officers. Integrate it with their existing website, email, and case management workflow where possible, while remaining open to an intuitive interface built from scratch.
- Staff and officers can ask the AI to explain existing policies, and the system can flag policies relevant to received complaints. To help them judge an explanation, show the relevant policy document, SOP, and citation alongside it; other types of constraints to show remain undecided.
- Staff and officers should be able to seek another officer's explanation via WhatsApp, email, or messaging apps, and look for similar documents when checking an AI response.
- When the AI is wrong, staff and officers can correct its output manually. A higher officer or peer should review a correction before it is used to answer future complaints, so corrections can help the system improve over time.

## Knowledge (required · 4 of 4 covered · 1 undecided)

- Ground the AI in the complaint itself, its case history, relevant policy documents and SOPs, and previous decisions on similar grievances. Staff can currently access all of these sources.
- Before using a policy or SOP in an answer, the AI should check that it is the current version rather than relying on the document's date for staff to judge.
- For the prototype, the AI may explain current policies and case history, but must not claim to know facts absent from the record or decide a grievance for an officer.
- Government data must be hosted within a government-approved environment, including for the prototype. The government owns the data; the team does not want to access or own it.
- For a sample built without access to the existing case system, use researched Bihar government case records and electricity-related CGNet Swara data. Whether these sources contain suitable records, and how their provenance and currency will be verified, remain to be determined.

## The Base Model (optional · 4 of 4 covered · 2 undecided)

- For complaint and policy questions, the AI should explain its reasoning. Quick answers are appropriate only for general queries, and all answers must be backed by data.
- The AI should handle images, documents, PDFs, images of documents, and Hindi. It must never take action on behalf of an officer.
- The developers will estimate the AI-use budget without compromising data protection.
- Complaint records and other government data must always remain within a government-approved environment for AI processing; they must not be sent to an outside AI company.
- The team wants to gain learning from this work by understanding its artifacts, without accessing or owning the government data. Which artifacts and how the team can learn from them remain unspecified.

## Analytics (optional · 3 of 4 covered)

- Begin with a small pilot involving grievance-handling staff and officers in Bihar’s electricity distribution system. Compare time spent locating relevant government policies, regulations, circulars, and previous instructions under existing and AI-assisted workflows.
- Track the correctness of policy citations and officers’ ratings of AI recommendations’ usefulness. Officers can flag incorrect or irrelevant answers.
- Measure time from complaint registration through assignment, first action, follow-up, and resolution, including the number of unattended or overdue complaints.
- Track manual follow-ups, staff time per grievance, and whether repetitive administrative work declines.
- Record how often officers accept, modify, or reject AI suggestions, and gather short feedback on usability and confidence to understand actual use and human oversight.
- For routine evaluation, use existing grievance IDs, timestamps, complaint categories, workflow status, and aggregated performance indicators wherever possible rather than collecting new personal information. Citizens’ names, phone numbers, and other identifiable details are not required.
- For the pilot, use a provisional success target of at least a 25% reduction in median time spent locating relevant policies, regulations, circulars, and previous instructions compared with the existing workflow. Check this alongside citation correctness and grievance outcomes rather than treating search speed alone as success.

## Safety (optional · 0 of 4 covered)

_No current decisions recorded. This area remains unresolved._

## Infrastructure (optional · 3 of 4 covered · 2 undecided)

- Plan for 10–30 staff and officers to use the pilot throughout the 12-month project.
- Monitor response times, system errors, and failures to retrieve complaint records so the team can detect when the pilot is slow or not working.
- For the pilot, keep copies of complaint records and read from the existing case system when needed; which records to copy remains undecided. Retain officers’ questions, AI answers, and corrections indefinitely if the government decides that retention is permitted.
- Who will maintain the pilot and what maintenance will cost remain undecided; no one has been assigned to settle these questions.

## APIs (optional · 1 of 4 covered · 1 undecided)

- The user does not have access to the existing case system. For the pilot, the AI should research publicly available Bihar government case records to make a sample and pull electricity-related data from CGNet Swara; access and connection methods remain to be determined.

## The Bill (optional · 0 of 4 covered)

_No current decisions recorded. This area remains unresolved._

## Open questions

These are unanswered discovery prompts, not a complete list of unresolved decisions. Explicit unknowns or deferred details in the recorded notes remain open even when every prompt is covered. Decisions recorded as still open are listed under their station.

### The Menu

Still open in the decisions:

- Establish whether complaints commonly reach local legislative members before the Bihar Energy Department and whether this creates a need for the workflow.

### Experience

Still open in the decisions:

- Determine which existing website, email, and case management integrations are possible and whether an interface must be built from scratch.
- Decide which constraints, beyond policy documents, SOPs, and citations, should appear alongside AI explanations.

### Knowledge

Still open in the decisions:

- Determine whether the proposed public sources contain suitable records and how their provenance and currency will be verified.

### The Base Model

Still open in the decisions:

- Estimate the AI-use budget without compromising data protection. (developers)
- Specify which artifacts the team can learn from and how it can do so without accessing or owning government data.

### Analytics
- [ ] What tells you early that it is failing?

### Safety
- [ ] How do you keep users safe?
- [ ] Worst plausible output, and what stops it?
- [ ] What happens with sensitive data?
- [ ] Who is accountable when it goes wrong?

### Infrastructure
- [ ] Who maintains it, and at what cost?

Still open in the decisions:

- Decide which complaint records to copy for the pilot.
- Assign responsibility for deciding who will maintain the pilot and what maintenance will cost.

### APIs
- [ ] What should other systems be able to ask of yours, if anything?
- [ ] What happens when a connected service is slow or limits you?
- [ ] What breaks if a connected service goes down?

Still open in the decisions:

- Determine access and connection methods for publicly available Bihar government case records and electricity-related CGNet Swara data.

### The Bill
- [ ] Do you expect anyone to pay for the service?
- [ ] If so, do all users pay, or one particular stakeholder?
- [ ] What keeps it funded after launch?
- [ ] Does it need a payment system built in?

## Who you may need to hire

These are skills to cover. One person may cover several roles.

### Design
- **UX/UI Designer** — Design an easy-to-use workflow that reduces uncertainty about policies and complaint history while including the requested element of fun.

### AI & Data
- **AI/ML Engineer** — Build grounded policy and case-history explanations with citations, check policy and SOP currency, support Hindi and document inputs, and prevent the AI from deciding grievances or acting for officers.
- **Data Scientist** — Prepare complaint, policy, SOP, and prior-decision sources for retrieval, and evaluate citation correctness and policy-search time using pilot workflow data.

### Engineering
- **Frontend Engineer** — Build the web application where staff and officers review cited explanations, find similar documents, flag errors, and submit corrections for review.
- **Backend Engineer** — Build the government-approved hosting, record retrieval, correction review, and integrations with the existing website, email, and case workflow where possible.

### Safety & Compliance
- **Trust and Safety Specialist** — Review privacy and data-handling rules for government complaint records, including approved-environment processing and the proposed retention of officers’ questions, AI answers, and corrections.
