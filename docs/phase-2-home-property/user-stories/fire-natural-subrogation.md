---
sidebar_position: 40
---

# US-HCF-011: Process Subrogation Against Responsible Third Party

## User Story

**As a** claims handler (skadereglerare),
**I want to** process subrogation against a responsible third party (e.g., arsonist, negligent neighbor),
**so that** costs are recovered from the party that caused the damage.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** System

## Priority

**Should Have** — Subrogation recovers claim costs from responsible third parties, improving the insurer's loss ratio. It is a standard insurance practice but does not block the customer's settlement.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim investigation identifies a responsible third party
  **WHEN** the claims handler determines that subrogation may apply
  **THEN** the system creates a subrogation record linked to the claim, recording: the third party's identity (if known), the basis of liability (arson, negligence, product defect, etc.), and the estimated recovery amount

- **GIVEN** a subrogation record exists
  **WHEN** the customer's claim is settled
  **THEN** the system ensures the customer receives their full settlement regardless of subrogation status; subrogation is pursued separately by the insurer

- **GIVEN** the incident report indicates arson or criminal activity
  **WHEN** the claims handler reviews the subrogation opportunity
  **THEN** the system records the police report reference, tracks the criminal investigation status, and notes that civil recovery depends on the criminal proceedings outcome

- **GIVEN** the cause is a negligent neighbor (e.g., fire spread from adjacent property)
  **WHEN** the claims handler initiates subrogation
  **THEN** the system records the neighbor's insurer details and initiates a subrogation demand to the neighbor's liability insurance

- **GIVEN** the cause is a product defect (e.g., faulty electrical appliance causing fire)
  **WHEN** the claims handler identifies the manufacturer or seller
  **THEN** the system creates a product liability subrogation record with the manufacturer/seller details, product identification, and applicable product liability legislation

- **GIVEN** subrogation recovery is received
  **WHEN** the third party or their insurer pays the subrogation demand
  **THEN** the system records the recovery amount, updates the claim's net cost, and closes the subrogation record

## Subrogation Basis

| Cause                   | Liable Party                   | Legal Basis                             | Typical Recovery |
| ----------------------- | ------------------------------ | --------------------------------------- | ---------------- |
| Arson (mordbrand)       | Perpetrator                    | Skadeståndslagen (Tort law)             | Low (criminal)   |
| Negligent neighbor      | Neighbor / neighbor's insurer  | Skadeståndslagen, grannelagsrätt        | Medium to high   |
| Product defect          | Manufacturer / seller          | Produktansvarslagen (Product liability) | Medium to high   |
| Contractor negligence   | Contractor / contractor's ins. | Skadeståndslagen, contract law          | High             |
| Electrical fault (grid) | Grid operator (elnätsföretag)  | Ellagen (Electricity Act)               | Medium           |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the customer's settlement must not be delayed pending subrogation; the insurer settles first and recovers later
- **FSA-014** — Record keeping: subrogation records, demands, and recoveries must be retained for 10 years
- **GDPR-003** — Claims processing: third-party personal data collected for subrogation must follow data minimization principles
- **GDPR-006** — Fraud detection: arson-related subrogation intersects with fraud investigation; data handling must comply with both fraud and claims processing requirements

## Dependencies

- Depends on US-HCF-002 (Obtain Räddningstjänsten Incident Report) — incident report determines cause
- Depends on US-HCF-004 (Assess Total Loss vs Partial Loss) — settlement amount determines subrogation value
- Legal team or external counsel for complex subrogation cases
- Police investigation outcome for arson cases

## Notes

- Subrogation is the insurer's right, not the customer's obligation; the customer should not be burdened with the recovery process
- Recovery rates vary widely: arson subrogation against convicted arsonists typically yields low recovery; negligent neighbor subrogation through liability insurance has higher success rates
- The claims handler should identify subrogation potential early in the claims process to preserve evidence
- For large claims, the subrogation amount can be significant and materially affect the claim's impact on the loss ratio
