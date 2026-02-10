---
sidebar_position: 33
---

# US-CAN-004: Cancel Due to Vehicle Scrapped or Deregistered

## User Story

**As a** customer (privatkund) whose vehicle has been scrapped or permanently deregistered,
**I want to** cancel my motor insurance policy and receive a pro-rata refund,
**so that** I stop paying for coverage on a vehicle that no longer exists or is off the road.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [System Administrator](../../actors/internal/system-administrator.md), [Transportstyrelsen](../../actors/external/transportstyrelsen.md)

## Priority

**Must Have** — Vehicle deregistration removes the legal requirement for trafikförsäkring, enabling straightforward cancellation.

## Acceptance Criteria

- **GIVEN** a customer's vehicle has been scrapped or permanently deregistered with Transportstyrelsen
  **WHEN** the customer requests cancellation and provides the deregistration reference
  **THEN** the system records the cancellation with reason "Vehicle scrapped/deregistered" and the deregistration date

- **GIVEN** the vehicle has been deregistered
  **WHEN** the system processes the cancellation
  **THEN** the system verifies the deregistration status against Transportstyrelsen records (where available via integration)

- **GIVEN** the cancellation is confirmed for a deregistered vehicle
  **WHEN** the effective date is set
  **THEN** the system sets the cancellation date to the deregistration date

- **GIVEN** the cancellation is finalised
  **WHEN** the refund is calculated
  **THEN** the system calculates a pro-rata refund for the remaining prepaid period (see [US-CAN-007](cancellation-refund.md))

- **GIVEN** a temporarily deregistered vehicle (avställning)
  **WHEN** the customer requests cancellation
  **THEN** the system allows cancellation of voluntary coverage (hel-/halvförsäkring) but warns that trafikförsäkring may still be required depending on the avställning type

## Business Rules

| Rule       | Description                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| BR-CAN-013 | Permanent deregistration (skrotning) removes all insurance obligations                                                 |
| BR-CAN-014 | Temporary deregistration (avställning) removes the trafikförsäkring obligation only while the vehicle remains off-road |
| BR-CAN-015 | Pro-rata refund applies from the deregistration date                                                                   |
| BR-CAN-016 | The system must distinguish between permanent and temporary deregistration                                             |

## Regulatory

- **FSA-013** — Cancellation rights: deregistration is a valid ground for immediate cancellation
- **FSA-007** — Mandatory trafikförsäkring: the trafikförsäkring obligation ceases when the vehicle is permanently deregistered
- **FSA-009** — Transportstyrelsen notification: the cancellation must be recorded in the Transport Agency's systems
- **GDPR-002** — Policy administration: policy data must be retained per retention policy after cancellation

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Transportstyrelsen integration for deregistration verification
- Refund calculation (see [US-CAN-007](cancellation-refund.md))

## Notes

- Avställning (temporary deregistration) is common when vehicles are stored off-road during winter; customers may want to cancel voluntary coverage while keeping the vehicle registered
- Skrotning (scrapping) triggers automatic deregistration and removes all insurance obligations
