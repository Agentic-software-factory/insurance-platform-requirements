---
sidebar_position: 13
---

# US-CLM-004: Determine Liability

## User Story

**As a** claims handler (skadereglerare),
**I want to** determine liability for a motor incident based on evidence and applicable rules,
**so that** settlement responsibility is correctly assigned between parties.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Police (Polis)](../../actors/external-actors.md#police-polis)

## Priority

**Must Have** — Liability determination drives settlement calculations and subrogation.

## Acceptance Criteria

- **GIVEN** a claim involves a collision between two or more vehicles
  **WHEN** the claims handler assesses liability
  **THEN** the system allows the handler to record liability as a percentage split (e.g., 100/0, 50/50, 70/30) for each party involved

- **GIVEN** a claim involves a single-vehicle incident (e.g., driving off the road)
  **WHEN** the claims handler assesses liability
  **THEN** the system records the policyholder as fully liable and calculates settlement based on policy coverage and deductible

- **GIVEN** a claim involves a third-party claimant under trafikförsäkring
  **WHEN** the claims handler assesses liability
  **THEN** the system records the policyholder's liability to the third party and flags the claim for potential subrogation if the third party was partially at fault

- **GIVEN** a police report is available
  **WHEN** the claims handler uploads or links the report
  **THEN** the system attaches the report to the claim record and allows the handler to reference it in the liability determination

- **GIVEN** liability has been determined
  **WHEN** the handler records the decision
  **THEN** the system stores the liability decision with the rationale, evidence references, and the handler's identity, and advances the claim to the next stage

- **GIVEN** a multi-party incident involves another insurer
  **WHEN** liability is shared
  **THEN** the system records the other insurer's details (company name, claim reference) for inter-company settlement coordination

## Liability Scenarios

| Scenario                     | Typical Liability Split    | Notes                                               |
| ---------------------------- | -------------------------- | --------------------------------------------------- |
| Rear-end collision           | 100% rear driver           | Presumption under Swedish traffic law               |
| Intersection collision       | Varies (50/50 or assessed) | Based on right-of-way rules                         |
| Single-vehicle accident      | 100% policyholder          | Collision coverage applies if helförsäkring         |
| Parked vehicle hit           | 100% striking vehicle      | Third-party liability claim                         |
| Animal collision (viltskada) | No fault                   | Covered as a natural hazard                         |
| Unknown third party          | Special handling           | May involve TFF if the other driver is unidentified |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: liability decisions must be evidence-based and documented; the claimant must be informed of the outcome
- **FSA-014** — Record keeping: liability determinations and supporting evidence must be retained for 10 years
- **GDPR-003** — Claims processing: police reports and third-party personal data must follow data minimization and purpose limitation
- **GDPR-001** — Third-party personal data (names, registration numbers) collected during liability assessment must have a lawful basis

## Dependencies

- Depends on US-CLM-002 (Claim Registration)
- Depends on US-CLM-003 (Coverage Verification) — coverage must be confirmed before liability impacts settlement

## Notes

- Under Trafikskadelagen, personal injury liability for trafikförsäkring is strict — the insurer pays regardless of fault, though recovery from the at-fault party may follow (see [US-CLM-009](claims-subrogation.md))
- Animal collisions (viltskada) are treated as no-fault events and do not affect the policyholder's bonus class
