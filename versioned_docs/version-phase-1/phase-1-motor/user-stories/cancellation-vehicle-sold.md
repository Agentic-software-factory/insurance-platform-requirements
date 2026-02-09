---
sidebar_position: 32
---

# US-CAN-003: Cancel Due to Vehicle Sold

## User Story

**As a** customer (privatkund) who has sold my vehicle,
**I want to** cancel my motor insurance policy and receive a pro-rata refund for the unused period,
**so that** I do not pay for coverage on a vehicle I no longer own.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)
- **Supporting:** [System Administrator](../../actors/internal-actors.md#system-administrator), [Transportstyrelsen](../../actors/external-actors.md#transportstyrelsen)

## Priority

**Must Have** — Vehicle ownership changes are a frequent cancellation trigger and require timely processing to avoid TFF penalties.

## Acceptance Criteria

- **GIVEN** a customer has sold their insured vehicle
  **WHEN** the customer requests cancellation and provides proof of ownership transfer (e.g., confirmation from Transportstyrelsen or sales contract)
  **THEN** the system records the cancellation with reason "Vehicle sold" and the date of ownership transfer

- **GIVEN** the vehicle has been sold
  **WHEN** the system processes the cancellation
  **THEN** the system verifies the ownership change against Transportstyrelsen records (where available via integration)

- **GIVEN** the cancellation is confirmed for a sold vehicle
  **WHEN** the effective cancellation date is set
  **THEN** the system sets the cancellation date to the date of ownership transfer (or the date the new owner's insurance takes effect, whichever is earlier)

- **GIVEN** a sold vehicle had trafikförsäkring
  **WHEN** the cancellation is processed
  **THEN** the system verifies that the new owner has registered trafikförsäkring before finalising, or that Transportstyrelsen shows a new policy linked to the vehicle

- **GIVEN** the cancellation is finalised for a sold vehicle
  **WHEN** the refund is calculated
  **THEN** the system calculates a pro-rata refund for the remaining prepaid period and processes the refund (see [US-CAN-007](cancellation-refund.md))

## Business Rules

| Rule       | Description                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-CAN-009 | Cancellation effective date is the date of ownership transfer                                                                                  |
| BR-CAN-010 | Pro-rata refund applies from the cancellation date to the end of the paid period                                                               |
| BR-CAN-011 | The seller remains responsible for trafikförsäkring until the new owner registers coverage or 14 days have passed since the ownership transfer |
| BR-CAN-012 | If no replacement coverage is registered within 14 days, TFF may charge the former owner                                                       |

## Regulatory

- **FSA-013** — Cancellation rights: vehicle ownership change is a valid ground for immediate cancellation
- **FSA-007** — Mandatory trafikförsäkring: coverage continuity must be maintained until new owner's policy is active
- **FSA-009** — Transportstyrelsen notification: the cancellation must be reported to the Transport Agency
- **GDPR-002** — Policy administration: the former owner's policy data must be retained per retention policy after cancellation

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Transportstyrelsen integration for ownership verification and notification
- Refund calculation (see [US-CAN-007](cancellation-refund.md))

## Notes

- In Sweden, vehicle ownership transfers are registered with Transportstyrelsen; the platform should integrate with this registry to verify ownership changes
- The 14-day rule for seller liability on trafikförsäkring is a key business rule that affects the cancellation effective date
