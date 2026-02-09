---
sidebar_position: 31
---

# US-CAN-002: Cancel at Huvudförfallodag

## User Story

**As a** customer (privatkund),
**I want to** cancel my motor insurance policy at the annual renewal date (huvudförfallodag),
**so that** I can switch to another insurer or stop coverage at the natural policy anniversary.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)
- **Supporting:** [System Administrator](../../actors/internal-actors.md#system-administrator), [Transportstyrelsen](../../actors/external-actors.md#transportstyrelsen)

## Priority

**Must Have** — Cancellation at huvudförfallodag is the standard cancellation path under Försäkringsavtalslagen.

## Acceptance Criteria

- **GIVEN** a customer has an active motor insurance policy
  **WHEN** the customer submits a cancellation request at least 1 month before the huvudförfallodag
  **THEN** the system records the cancellation effective at the end of the current policy period

- **GIVEN** a customer submits a cancellation request less than 1 month before huvudförfallodag
  **WHEN** the system evaluates the notice period
  **THEN** the system informs the customer that cancellation will take effect at the next huvudförfallodag (one year later) unless an exception applies

- **GIVEN** the policy includes trafikförsäkring
  **WHEN** the cancellation effective date arrives
  **THEN** the system verifies that replacement trafikförsäkring is in place or that the vehicle has been deregistered before finalising (see [US-CAN-005](cancellation-replacement-coverage.md))

- **GIVEN** a cancellation at huvudförfallodag is confirmed
  **WHEN** the effective date is reached
  **THEN** the system terminates the policy, notifies Transportstyrelsen (see [US-CAN-006](cancellation-transportstyrelsen.md)), and sends the customer a confirmation

- **GIVEN** a customer has been sent a renewal reminder
  **WHEN** the customer responds with a cancellation request before the notice deadline
  **THEN** the system processes the cancellation without requiring a separate reason

## Business Rules

| Rule       | Description                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| BR-CAN-005 | The statutory notice period is 1 month before huvudförfallodag                                              |
| BR-CAN-006 | If the customer misses the notice deadline, the policy auto-renews for another period                       |
| BR-CAN-007 | No refund applies for huvudförfallodag cancellations since coverage runs to the end of the period           |
| BR-CAN-008 | The system must send a renewal reminder at least 1 month before huvudförfallodag per Försäkringsavtalslagen |

## Regulatory

- **FSA-013** — Cancellation and cooling-off rights: ordinary cancellation rules and notice periods must be enforced
- **FSA-007** — Mandatory trafikförsäkring: cancellation of trafikförsäkring requires proof of replacement coverage or vehicle deregistration
- **FSA-009** — Transportstyrelsen notification: the Transport Agency must be notified of policy termination
- **IDD-003** — Pre-contractual information: cancellation terms must have been disclosed to the customer before purchase

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Transportstyrelsen integration for cancellation notification (see [US-CAN-006](cancellation-transportstyrelsen.md))
- Replacement coverage verification for trafikförsäkring (see [US-CAN-005](cancellation-replacement-coverage.md))

## Notes

- Renewal reminders (påminnelse om förnyelse) are legally required and serve as the trigger for many huvudförfallodag cancellations
- Some customers cancel at huvudförfallodag after receiving a competing offer from another insurer
