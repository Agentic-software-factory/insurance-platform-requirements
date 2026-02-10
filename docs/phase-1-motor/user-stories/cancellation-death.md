---
sidebar_position: 38
---

# US-CAN-009: Cancel Due to Death of Policyholder

## User Story

**As an** estate representative (dödsbo) of a deceased policyholder,
**I want to** cancel the deceased's motor insurance policies and receive a pro-rata refund to the estate,
**so that** the estate does not continue paying for coverage that is no longer needed.

## Actors

- **Primary:** Estate Representative (via [Operations Staff](../../actors/internal/system-administrator.md))
- **Supporting:** [Operations Staff](../../actors/internal/system-administrator.md), [Transportstyrelsen](../../actors/external/transportstyrelsen.md), [Payment Provider](../../actors/external/payment-provider.md)

## Priority

**Must Have** — Handling the death of a policyholder is a legally required process that must be handled sensitively and correctly.

## Acceptance Criteria

- **GIVEN** a policyholder has died
  **WHEN** an estate representative contacts TryggFörsäkring with a death certificate
  **THEN** operations staff create a cancellation case with reason "Death of policyholder" and link all active policies for the deceased

- **GIVEN** operations staff are processing a death cancellation
  **WHEN** they verify the death certificate and the representative's authority to act on behalf of the estate
  **THEN** the system allows cancellation to proceed for all identified policies

- **GIVEN** the deceased's policies include trafikförsäkring
  **WHEN** the cancellation is processed
  **THEN** the system verifies that the vehicle has been deregistered or transferred to a new owner with replacement coverage (see [US-CAN-005](cancellation-replacement-coverage.md))

- **GIVEN** the death cancellation is confirmed
  **WHEN** the refund is calculated
  **THEN** the system calculates a pro-rata refund from the date of death and processes the refund to the estate's designated bank account (see [US-CAN-007](cancellation-refund.md))

- **GIVEN** multiple policies exist for the deceased
  **WHEN** the estate representative requests cancellation
  **THEN** the system allows batch cancellation of all policies in a single process

- **GIVEN** the death cancellation is finalised
  **WHEN** notifications are sent
  **THEN** the system notifies Transportstyrelsen and sends a cancellation confirmation to the estate representative

## Business Rules

| Rule       | Description                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| BR-CAN-025 | Death cancellations require a verified death certificate and proof of representative authority          |
| BR-CAN-026 | The effective cancellation date is the date of death                                                    |
| BR-CAN-027 | Refunds are payable to the estate (dödsbo), not to individual heirs, until estate distribution          |
| BR-CAN-028 | All active policies for the deceased must be identified and presented for batch cancellation            |
| BR-CAN-029 | If the vehicle is inherited, the heir must register their own insurance before the estate policy lapses |
| BR-CAN-030 | Outstanding premiums may be offset against refunds before payment to the estate                         |

## Regulatory

- **FSA-013** — Cancellation rights: death of the policyholder is a valid ground for immediate cancellation
- **FSA-004** — Consumer protection and fair treatment: the process must be handled with sensitivity and minimal burden on the estate
- **FSA-007** — Mandatory trafikförsäkring: coverage continuity must be ensured for vehicles that remain registered
- **FSA-009** — Transportstyrelsen notification: the cancellation must be reported to the Transport Agency
- **FSA-014** — Record keeping: all death-related cancellation records must be retained for 10 years
- **GDPR-002** — Policy administration: the deceased's personal data must be handled according to retention policy; GDPR rights generally do not apply to deceased persons, but Swedish supplementary rules may apply

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Transportstyrelsen integration for vehicle status updates
- Refund calculation (see [US-CAN-007](cancellation-refund.md))
- Replacement coverage verification for trafikförsäkring (see [US-CAN-005](cancellation-replacement-coverage.md))

## Notes

- Death cancellations are always handled by operations staff — this is not a self-service flow
- The estate representative must provide a death certificate (dödsbevis) and proof of authority (bouppteckning or fullmakt)
- If the vehicle is to remain in use by a household member, they must arrange their own policy before the estate cancellation takes effect
- Claims in progress at the time of death continue to be processed to completion
