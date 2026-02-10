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

## Liability Decision Matrix

| Scenario                              | Evidence Required                                         | Typical Liability Split                 | Settlement Impact                                                              | Subrogation                              |
| ------------------------------------- | --------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------- |
| Rear-end collision                    | Police report, photos, witness statements                 | 100% rear driver                        | Full settlement to front driver; rear driver's insurer pays                    | Yes — recover from rear driver's insurer |
| Intersection collision (right-of-way) | Police report, traffic camera footage, witness statements | Varies (50/50 or assessed per evidence) | Settlement adjusted by non-fault percentage                                    | Yes — partial recovery based on split    |
| Single-vehicle accident               | Police report (if available), photos                      | 100% policyholder                       | Covered under helförsäkring minus deductible; no coverage under halvförsäkring | No                                       |
| Parked vehicle hit                    | Police report, photos, witness statements                 | 100% striking vehicle                   | Third-party liability claim against striking vehicle's insurer                 | Yes — full recovery                      |
| Animal collision (viltskada)          | Police report (viltolycksrapport), photos                 | No fault                                | Covered under halvförsäkring or helförsäkring; no bonus impact                 | No                                       |
| Unknown third party (hit-and-run)     | Police report (required), witness statements              | Special handling via TFF                | Personal injury via TFF; vehicle damage under own coverage                     | TFF pursues if vehicle identified        |
| Multi-party collision (3+ vehicles)   | Police report, all parties' statements, photos            | Assessed per party based on evidence    | Each party's share calculated separately                                       | Yes — cross-recovery between insurers    |
| Parking lot incident (no witnesses)   | Photos, parking lot CCTV (if available)                   | Often 50/50 if fault unclear            | Each party bears own damage minus deductible                                   | Depends on determination                 |

### Liability Percentage Rules

- Liability is recorded as a percentage split across all involved parties (must total 100%)
- Minimum granularity is 10% increments
- A liability split of 0% means the policyholder is not at fault (full recovery via subrogation)
- A liability split of 100% means the policyholder is fully at fault (no subrogation)
- Partial liability (e.g., 30/70) adjusts the settlement proportionally

### Police Report Requirements

| Incident Type                          | Police Report | Notes                                               |
| -------------------------------------- | ------------- | --------------------------------------------------- |
| Multi-vehicle collision with injury    | Mandatory     | Police attend the scene                             |
| Multi-vehicle collision without injury | Recommended   | Parties may file jointly                            |
| Hit-and-run (smitning)                 | Mandatory     | Required for TFF claims and for own-damage coverage |
| Theft                                  | Mandatory     | Required before claim is processed                  |
| Animal collision (viltskada)           | Mandatory     | Viltolycksrapport must be filed                     |
| Single-vehicle, no injury              | Optional      | Supports liability determination                    |
| Vandalism                              | Recommended   | Supports fraud screening                            |

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
