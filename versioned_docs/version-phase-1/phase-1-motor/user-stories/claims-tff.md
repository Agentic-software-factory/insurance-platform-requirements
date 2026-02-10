---
sidebar_position: 20
---

# US-CLM-011: Process TFF Claims

## User Story

**As a** claims handler (skadereglerare),
**I want to** process claims involving uninsured, unknown, or foreign vehicles via TFF,
**so that** victims are compensated even when the at-fault vehicle lacks valid Swedish insurance.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [TFF](../../actors/external-actors.md#trafikförsäkringsföreningen-tff), [Police (Polis)](../../actors/external-actors.md#police-polis)

## Priority

**Should Have** — TFF claims are a regulatory requirement for trafikförsäkring participation, though volume is lower than standard claims.

## Acceptance Criteria

- **GIVEN** a claim involves a vehicle that is not insured with any Swedish insurer
  **WHEN** the claims handler identifies the vehicle as uninsured
  **THEN** the system allows the claim to be flagged as a TFF claim and routes it through the TFF claims process

- **GIVEN** a claim involves an unidentified vehicle (hit-and-run, smitning)
  **WHEN** the claims handler records the claim
  **THEN** the system allows the claim to be registered without an opposing party's vehicle details and flags it for TFF processing, requiring a police report reference

- **GIVEN** a claim involves a foreign-registered vehicle
  **WHEN** the claims handler identifies the vehicle as foreign
  **THEN** the system supports recording the foreign vehicle details and insurer (if known), and routes the claim through TFF's international claims coordination (green card system)

- **GIVEN** a TFF claim has been processed
  **WHEN** the claims handler submits the claim to TFF
  **THEN** the system transmits the claim data to TFF in the required format and tracks the TFF response (acceptance, request for additional information, or rejection)

- **GIVEN** TFF has settled a claim
  **WHEN** TFF communicates the settlement decision
  **THEN** the system records the TFF settlement details and closes the claim accordingly

## TFF Claim Scenarios

| Scenario                              | Description                                                  | Special Requirements                                     |
| ------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| Uninsured vehicle (oförsäkrat fordon) | At-fault vehicle has no valid trafikförsäkring               | Police report recommended; TFF covers the victim         |
| Unidentified vehicle (okänt fordon)   | Hit-and-run where the vehicle cannot be identified           | Police report required; TFF covers personal injury only  |
| Foreign vehicle                       | Vehicle registered abroad, involved in an incident in Sweden | Green card or other international insurance coordination |
| TFF cost recovery                     | TFF recovers costs from the uninsured vehicle owner          | Not handled by TryggFörsäkring -- TFF pursues directly   |

### TFF Claims Processing Flow

| Step | Actor          | Action                                                                 | System Response                                   |
| ---- | -------------- | ---------------------------------------------------------------------- | ------------------------------------------------- |
| 1    | Claims Handler | Identifies claim as TFF-eligible during registration                   | System flags claim as TFF type                    |
| 2    | Claims Handler | Verifies TFF eligibility (uninsured, unidentified, or foreign vehicle) | System validates against Transportstyrelsen data  |
| 3    | Claims Handler | Completes standard claims processing (coverage, liability, damage)     | System records all standard claim data            |
| 4    | Claims Handler | Prepares TFF submission with required data fields                      | System generates TFF-format claim package         |
| 5    | System         | Transmits claim data to TFF via integration                            | System records submission timestamp and reference |
| 6    | Claims Handler | Monitors TFF response and provides additional data if requested        | System tracks TFF status updates                  |
| 7    | Claims Handler | Records TFF settlement decision and payment                            | System closes TFF claim and updates statistics    |

### TFF Data Reporting Requirements

| Field                         | Required    | Description                               |
| ----------------------------- | ----------- | ----------------------------------------- |
| Claim number                  | Yes         | TryggFörsäkring internal claim reference  |
| Incident date and location    | Yes         | When and where the incident occurred      |
| Claimant details              | Yes         | Injured party or damaged vehicle owner    |
| At-fault vehicle registration | Conditional | If known (not available for hit-and-run)  |
| Police report reference       | Conditional | Required for hit-and-run and theft        |
| Damage or injury description  | Yes         | Details of the loss                       |
| Claimed amount                | Yes         | Settlement amount sought from TFF         |
| Coverage type                 | Yes         | Personal injury, property damage, or both |

### TFF Settlement Rules

- TFF covers personal injury for all traffic incidents involving uninsured or unidentified vehicles
- TFF covers property damage only when the at-fault vehicle is identified but uninsured (not for hit-and-run)
- TFF settlement follows the same compensation schedules as standard trafikförsäkring claims
- TFF may request additional documentation before accepting the claim
- TFF's response time target is 30 days from submission

## Regulatory

- **FSA-007** — Mandatory trafikförsäkring: the TFF system exists to ensure victims are always compensated, even when the at-fault vehicle is uninsured
- **FSA-008** — TFF membership: TryggFörsäkring must participate in TFF's claims coordination as a condition of selling trafikförsäkring
- **FSA-010** — Fair claims settlement: TFF claims must be handled with the same fairness and timeliness standards as standard claims
- **FSA-014** — Record keeping: TFF claim records, communications, and outcomes must be retained for 10 years
- **GDPR-003** — Claims processing: personal data shared with TFF must follow data minimization; share only required fields
- **GDPR-004** — TFF reporting: data exchange with TFF is based on legal obligation under Trafikskadelagen

## Dependencies

- Depends on US-CLM-002 (Claim Registration)
- Depends on US-CLM-004 (Liability Determination)
- TFF system integration for claim submission and response handling

## Notes

- TFF claims can take longer to resolve due to the inter-organization coordination
- For hit-and-run claims where the vehicle is unidentified, TFF only covers personal injury (not vehicle damage)
- Foreign vehicle claims may involve correspondence with the vehicle's home-country insurer through the green card system
