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
| TFF cost recovery                     | TFF recovers costs from the uninsured vehicle owner          | Not handled by TryggFörsäkring — TFF pursues directly    |

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
