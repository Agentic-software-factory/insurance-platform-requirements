---
sidebar_position: 30
---

# US-HCF-001: Report Fire or Natural Event Emergency

## User Story

**As a** customer (privatkund),
**I want to** report a fire or natural event and get immediate help with temporary housing,
**so that** my family is safe and the claims process begins without delay.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Fire and natural event claims are high-severity emergencies requiring immediate response. Rapid FNOL triggers evacuation support and secures the property.

## Acceptance Criteria

- **GIVEN** a customer has an active home insurance policy (hemförsäkring, villahemförsäkring, or bostadsrättsförsäkring)
  **WHEN** the customer reports a fire or natural event via web, mobile app, or phone at any time
  **THEN** the system accepts the report 24/7, creates a claim record with status "Emergency Reported", and routes it as high-priority

- **GIVEN** a customer is reporting a fire or natural event
  **WHEN** the customer selects the event type
  **THEN** the system displays event categories: fire (brand), storm (storm), flood (översvämning), lightning (blixtnedslag), and other natural event (annan naturhändelse)

- **GIVEN** a customer is filling out the fire/natural event FNOL form
  **WHEN** the customer enters event details (event type, affected areas, whether property is habitable, whether emergency services have responded)
  **THEN** the system validates that the incident date falls within the policy's active coverage period

- **GIVEN** a customer has completed the fire/natural event FNOL
  **WHEN** the customer submits the report
  **THEN** the system creates a claim record with a unique claim number (skadenummer), links it to the policy, and sends the customer confirmation with the claim number, emergency contact numbers, and expected next steps

- **GIVEN** a fire/natural event claim indicates the property is uninhabitable
  **WHEN** the system processes the emergency report
  **THEN** the system immediately flags the claim for temporary housing (evakueringsboende) and notifies the claims handler

- **GIVEN** a customer must verify their identity for the claim
  **WHEN** the customer signs in
  **THEN** the system authenticates the customer via [BankID](../../actors/external/bankid.md)

## Data Captured at FNOL

| Field                        | Required    | Description                                            |
| ---------------------------- | ----------- | ------------------------------------------------------ |
| Incident date and time       | Yes         | When the fire/natural event occurred or was discovered |
| Property address             | Yes         | Address of the affected property                       |
| Property type                | Yes         | Villa, bostadsrätt, or hyresrätt                       |
| Event type                   | Yes         | Fire, storm, flood, lightning, other natural event     |
| Property habitable           | Yes         | Whether the property is safe for occupancy             |
| Emergency services contacted | Yes         | Whether räddningstjänsten has been called              |
| Affected areas               | Yes         | Which parts of the property are damaged                |
| Injuries reported            | No          | Whether any personal injuries occurred                 |
| Emergency measures taken     | No          | What the customer has done (evacuated, shut utilities) |
| Photos                       | No          | Damage photos if safely obtainable                     |
| BRF contact information      | Conditional | Required for bostadsrätt claims                        |
| Räddningstjänsten ref number | No          | Fire department incident reference if available        |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the claims process must begin promptly upon FNOL; 24/7 availability ensures no undue delay for emergency claims
- **FSA-014** — Record keeping: the FNOL and all associated data must be retained for 10 years
- **GDPR-003** — Claims processing: personal data collected at FNOL must follow data minimization principles; collect only what is necessary for the claim
- **FSA-004** — Consumer protection: the customer must receive clear confirmation, emergency contacts, and next-step information

## Dependencies

- Active home insurance policy must exist
- Actor definitions (Customer, Claims Handler)
- BankID integration for identity verification
- 24/7 emergency service integration

## Notes

- Fire and natural event claims are typically high-severity with significant property damage; priority routing is essential
- Customers should be guided to ensure personal safety first, then contact räddningstjänsten before filing the claim
- Phone-reported FNOL follows the same registration process as online, with the claims handler entering details on behalf of the customer
- For multi-unit events (e.g., apartment building fire), each affected unit generates a separate claim linked to a parent event
