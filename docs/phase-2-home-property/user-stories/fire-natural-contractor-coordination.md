---
sidebar_position: 37
---

# US-HCF-008: Coordinate Contractors for Rebuild or Repair

## User Story

**As a** claims handler (skadereglerare),
**I want to** coordinate with contractors for rebuild or repair,
**so that** restoration begins promptly and meets quality standards.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md), [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Must Have** — Timely contractor engagement is critical for both partial loss repairs and total loss rebuilds. Delays in contractor coordination extend the customer's displacement and increase temporary housing costs.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has been classified as partial loss and the repair scope is approved
  **WHEN** the claims handler initiates contractor coordination
  **THEN** the system presents the approved contractor network (ramavtalspartners) and allows the claims handler to assign a contractor or the customer to choose their own

- **GIVEN** a fire/natural event claim has been classified as total loss and the customer chooses to rebuild
  **WHEN** the claims handler initiates rebuild coordination
  **THEN** the system creates a rebuild project record, tracks contractor selection, building permit status, and construction milestones

- **GIVEN** a contractor has been selected
  **WHEN** the claims handler confirms the assignment
  **THEN** the system records the contractor details, sends the approved scope of work and budget to the contractor, and notifies the customer of the contractor assignment and expected timeline

- **GIVEN** the customer prefers to use their own contractor instead of the insurer's network
  **WHEN** the customer nominates a contractor
  **THEN** the claims handler verifies the contractor's credentials and insurance, records the customer's choice, and notes that the insurer's responsibility is limited to the approved repair/rebuild cost

- **GIVEN** repair or rebuild work is in progress
  **WHEN** the contractor submits progress updates or invoices
  **THEN** the system records the progress, tracks costs against the approved budget, and alerts the claims handler if costs approach or exceed the approved amount

- **GIVEN** the repair cost exceeds the approved budget
  **WHEN** the contractor submits a cost variation
  **THEN** the system flags the variation for claims handler review and, if above the threshold, requires senior claims handler approval before authorizing additional costs

## Regulatory

- **FSA-010** — Fair and timely claims settlement: contractor coordination must not cause undue delay in the restoration process
- **FSA-004** — Consumer protection: the customer has the right to choose their own contractor; the insurer must respect this choice while managing cost expectations
- **GDPR-008** — Restoration company data sharing: personal data shared with contractors must follow data minimization; share only claim-relevant information
- **FSA-014** — Record keeping: contractor assignments, scope of work, invoices, and progress records must be retained for 10 years

## Dependencies

- Depends on US-HCF-004 (Assess Total Loss vs Partial Loss)
- Depends on US-HCF-005 (Inspect Property for Structural Integrity)
- Depends on US-HCF-006 (Check for Environmental Hazards) — remediation must be complete before repair
- Approved contractor network (ramavtalspartners)

## Notes

- For total loss rebuilds, the process can take 12-18 months; milestone tracking is essential
- The customer's right to choose their own contractor is protected, but the insurer only covers reasonable costs (up to the approved scope)
- For partial loss repairs after fire, the contractor must verify that fire-damaged materials are fully removed before new materials are installed
- Building permits (bygglov) may be required for significant structural repairs or rebuilds; the system should track permit status
