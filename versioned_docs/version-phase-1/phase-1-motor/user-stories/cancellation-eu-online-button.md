---
sidebar_position: 40
---

# US-CAN-011: EU Online Cancellation Button (EU 2023/2673)

## User Story

**As a** customer (privatkund),
**I want to** cancel my motor insurance policy using a clear "Cancel my contract" function on the TryggFörsäkring website or app,
**so that** I can exercise my cancellation rights easily in compliance with EU Directive 2023/2673.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [System Administrator](../../actors/internal/system-administrator.md)

## Priority

**Must Have** — EU Directive 2023/2673 mandates that insurers provide a clearly visible online cancellation function from June 2026. Non-compliance risks regulatory sanctions.

## Acceptance Criteria

- **GIVEN** a customer is logged in to the TryggFörsäkring website or mobile app
  **WHEN** they navigate to their policy overview
  **THEN** a clearly labelled "Cancel my contract" (Säg upp mitt avtal) button or link is visible and accessible

- **GIVEN** the "Cancel my contract" function is displayed
  **WHEN** the customer clicks it
  **THEN** the system opens the standard cancellation wizard (see [UC-CAN-001](../use-cases/uc-cancellation-processing.md)) without requiring phone calls, physical mail, or in-person visits

- **GIVEN** a customer is using the online cancellation function
  **WHEN** they complete the cancellation flow
  **THEN** they receive an electronic confirmation of the cancellation request immediately (on-screen and via email)

- **GIVEN** the online cancellation function is implemented
  **WHEN** a compliance officer audits the digital channels
  **THEN** the "Cancel my contract" button is no more than two clicks from any authenticated page (policy overview, dashboard, account settings)

- **GIVEN** the online cancellation function is available
  **WHEN** any customer-facing digital channel is updated or redesigned
  **THEN** the cancellation function remains prominently placed and is not hidden or made harder to find

## Business Rules

| Rule       | Description                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| BR-CAN-038 | The cancellation button must use clear, unambiguous language: "Säg upp mitt avtal" / "Cancel my contract"                                  |
| BR-CAN-039 | The button must be reachable within two clicks from any authenticated page                                                                 |
| BR-CAN-040 | The cancellation flow must not impose barriers beyond those required by law (e.g., replacement coverage verification for trafikförsäkring) |
| BR-CAN-041 | The customer must not be required to call, write, or visit in person to complete the cancellation                                          |
| BR-CAN-042 | An electronic confirmation must be provided immediately upon submission                                                                    |

## Regulatory

- **EU 2023/2673** — Requires financial service providers (including insurers) to offer a clear, easily accessible online cancellation function from June 2026
- **FSA-013** — Cancellation rights: the online function must comply with all existing cancellation rules (ångerrätt, notice periods, trafikförsäkring verification)
- **FSA-004** — Consumer protection and fair treatment: the cancellation process must not include dark patterns or unnecessary friction
- **IDD-003** — Pre-contractual information: the availability of online cancellation should be disclosed in pre-contractual documentation

## Dependencies

- Cancellation processing workflow must exist (see [UC-CAN-001](../use-cases/uc-cancellation-processing.md))
- Authenticated customer portal (BankID login)
- All existing cancellation rules and validations apply (replacement coverage, notice periods, etc.)

## Notes

- EU Directive 2023/2673 was adopted to ensure consumers can cancel financial service contracts as easily as they can sign up for them
- The directive applies to all distance contracts for financial services, including insurance
- The implementation deadline is June 2026; TryggFörsäkring should plan for compliance well in advance
- The "Cancel my contract" function must be available on all customer-facing digital channels (web and mobile app)
- This requirement is about the availability and accessibility of the cancellation function — the underlying cancellation business rules remain unchanged
