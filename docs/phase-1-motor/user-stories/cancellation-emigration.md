---
sidebar_position: 37
---

# US-CAN-008: Cancel Due to Emigration

## User Story

**As a** customer (privatkund) who is permanently emigrating from Sweden,
**I want to** cancel my motor insurance policy and receive a pro-rata refund,
**so that** I do not continue paying for Swedish motor coverage after I leave the country.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)
- **Supporting:** [Operations Staff](../../actors/internal-actors.md#system-administrator), [Transportstyrelsen](../../actors/external-actors.md#transportstyrelsen)

## Priority

**Should Have** — Emigration cancellations are infrequent but require a distinct flow with documentation verification by operations staff.

## Acceptance Criteria

- **GIVEN** a customer has permanently emigrated or is emigrating from Sweden
  **WHEN** the customer requests cancellation and provides proof of emigration (e.g., deregistration from Skatteverket/folkbokföring)
  **THEN** the system records the cancellation with reason "Emigration" and requires operations staff review

- **GIVEN** operations staff are reviewing an emigration cancellation
  **WHEN** they verify the emigration documentation
  **THEN** the system allows the cancellation to proceed with the emigration date as the effective cancellation date

- **GIVEN** the emigrating customer's policy includes trafikförsäkring
  **WHEN** the cancellation is processed
  **THEN** the system verifies that the vehicle has been deregistered, exported, or that replacement coverage is in place (see [US-CAN-005](cancellation-replacement-coverage.md))

- **GIVEN** the emigration cancellation is confirmed
  **WHEN** the refund is calculated
  **THEN** the system calculates a pro-rata refund for the unused period and processes the refund (see [US-CAN-007](cancellation-refund.md))

- **GIVEN** the emigration cancellation is finalised
  **WHEN** notifications are sent
  **THEN** the system notifies Transportstyrelsen and sends the customer a cancellation confirmation

## Business Rules

| Rule       | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- |
| BR-CAN-021 | Emigration cancellations require manual verification of emigration evidence by operations staff   |
| BR-CAN-022 | Acceptable proof of emigration: Skatteverket deregistration, embassy registration abroad          |
| BR-CAN-023 | The effective cancellation date is the emigration date or the date of request, whichever is later |
| BR-CAN-024 | If the vehicle is exported, proof of vehicle export may substitute for replacement coverage       |

## Regulatory

- **FSA-013** — Cancellation rights: emigration is a valid ground for immediate cancellation outside normal notice periods
- **FSA-007** — Mandatory trafikförsäkring: the vehicle must be deregistered or exported if no replacement coverage exists
- **FSA-009** — Transportstyrelsen notification: the cancellation must be reported to the Transport Agency
- **GDPR-002** — Policy administration: personal data from the cancelled policy must be retained per retention policy
- **GDPR-005** — Data portability: the emigrating customer may request their data before departure

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Transportstyrelsen integration for vehicle deregistration verification
- Refund calculation (see [US-CAN-007](cancellation-refund.md))
- Replacement coverage verification for trafikförsäkring (see [US-CAN-005](cancellation-replacement-coverage.md))

## Notes

- Emigration cancellations are typically handled by operations staff due to the need for manual document verification
- Customers emigrating within the EU/EEA may need their Swedish motor insurance history for bonus transfer to a new insurer abroad
- If the vehicle is being exported with the customer, Transportstyrelsen export deregistration serves as proof
