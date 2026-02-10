---
sidebar_position: 10
---

# US-HCW-001: Report Water Damage Emergency (24/7)

## User Story

**As a** customer (privatkund),
**I want to** report a water damage emergency at any time of day or night,
**so that** the response process starts immediately and further damage is minimized.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Water damage is the most common home insurance claim in Sweden (~100,000 per year). Rapid FNOL is critical to minimize damage through early drying intervention.

## Acceptance Criteria

- **GIVEN** a customer has an active home insurance policy (hemförsäkring, villahemförsäkring, or bostadsrättsförsäkring)
  **WHEN** the customer opens the water damage reporting form via web, mobile app, or phone at any time
  **THEN** the system accepts the report 24/7 and creates a claim record with status "Emergency Reported"

- **GIVEN** a customer is reporting a water damage emergency
  **WHEN** the customer selects the damage type
  **THEN** the system displays water damage cause categories: burst pipe (sprucket rör), appliance leak (maskinläckage), bathroom membrane failure (tätskiktsbrott), frozen pipes (frysskada), and other

- **GIVEN** a customer is filling out the water damage FNOL form
  **WHEN** the customer enters damage details (affected rooms, water source, whether water is still flowing)
  **THEN** the system validates that the incident date falls within the policy's active coverage period

- **GIVEN** a customer has completed the water damage FNOL
  **WHEN** the customer submits the report
  **THEN** the system creates a claim record with a unique claim number (skadenummer), links it to the policy, and sends the customer a confirmation with the claim number and expected next steps

- **GIVEN** a water damage claim has been submitted outside business hours
  **WHEN** the system processes the emergency report
  **THEN** the system routes the claim to the 24/7 emergency service for immediate saneringsfirma dispatch

- **GIVEN** a customer must verify their identity for the claim
  **WHEN** the customer signs in
  **THEN** the system authenticates the customer via [BankID](../../actors/external/bankid.md)

## Data Captured at FNOL

| Field                    | Required    | Description                                                       |
| ------------------------ | ----------- | ----------------------------------------------------------------- |
| Incident date and time   | Yes         | When the water damage was discovered                              |
| Property address         | Yes         | Address of the affected property                                  |
| Property type            | Yes         | Villa, bostadsrätt, or hyresrätt                                  |
| Damage cause category    | Yes         | Burst pipe, appliance leak, membrane failure, frozen pipes, other |
| Affected rooms           | Yes         | List of rooms with water damage                                   |
| Water still flowing      | Yes         | Whether the water source is still active                          |
| Emergency measures taken | No          | What the customer has done (shut off water, moved belongings)     |
| Photos                   | No          | Damage photos taken at discovery                                  |
| BRF contact information  | Conditional | Required for bostadsrätt claims                                   |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the claims process must begin promptly upon FNOL; 24/7 availability ensures no undue delay for emergency claims
- **FSA-014** — Record keeping: the FNOL and all associated data must be retained for 10 years
- **GDPR-003** — Claims processing: personal data collected at FNOL must follow data minimization principles; collect only what is necessary for the claim
- **FSA-004** — Consumer protection: the customer must receive clear confirmation and next-step information

## Dependencies

- Active home insurance policy must exist
- Actor definitions (Customer, Claims Handler)
- BankID integration for identity verification
- 24/7 emergency service integration

## Notes

- Water damage is time-critical: every hour of delay increases damage scope and cost significantly
- Customers should be guided to shut off the water supply (avstängningsventil) as an immediate step
- Phone-reported FNOL follows the same registration process as online, with the claims handler entering details on behalf of the customer
