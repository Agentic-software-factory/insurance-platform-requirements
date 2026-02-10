---
sidebar_position: 30
---

# US-CAN-001: Cancel Policy Within Cooling-Off Period (Ångerrätt)

## User Story

**As a** customer (privatkund),
**I want to** cancel my motor insurance policy within 14 days of purchase and receive a full refund,
**so that** I can exercise my statutory right of withdrawal (ångerrätt) without penalty.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [System Administrator](../../actors/internal/system-administrator.md), [Payment Provider](../../actors/external/payment-provider.md)

## Priority

**Must Have** — Ångerrätt is a statutory consumer right under Distansavtalslagen; the platform must support it.

## Acceptance Criteria

- **GIVEN** a customer purchased a motor insurance policy via distance sale (online or phone)
  **WHEN** the customer requests cancellation within 14 calendar days of the contract conclusion date
  **THEN** the system identifies the request as an ångerrätt cancellation and processes it without requiring a reason

- **GIVEN** the customer is within the 14-day cooling-off period
  **WHEN** the cancellation is confirmed
  **THEN** the system calculates a full refund of the premium paid (minus any days of coverage already used, if the customer requested the policy to start before the cooling-off period expired)

- **GIVEN** a customer requests cancellation outside the 14-day cooling-off period
  **WHEN** the system evaluates the request
  **THEN** the system routes the request to the standard cancellation flow (not ångerrätt)

- **GIVEN** the cancelled policy included trafikförsäkring
  **WHEN** the ångerrätt cancellation is processed
  **THEN** the system verifies that replacement trafikförsäkring is in place or that the vehicle has been deregistered before finalising the cancellation (see [US-CAN-005](cancellation-replacement-coverage.md))

- **GIVEN** an ångerrätt cancellation has been completed
  **WHEN** the refund is processed
  **THEN** the system refunds the premium to the original payment method within 30 days and sends the customer a cancellation confirmation

## Business Rules

| Rule       | Description                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- |
| BR-CAN-001 | The 14-day period starts from the contract conclusion date, not the coverage start date   |
| BR-CAN-002 | If the customer requested early coverage start, a deduction for days covered is permitted |
| BR-CAN-003 | No administrative fees may be charged for ångerrätt cancellations                         |
| BR-CAN-004 | Ångerrätt applies only to distance sales and off-premises contracts                       |

## Regulatory

- **FSA-013** — Cancellation and cooling-off rights: the platform must track the contract conclusion date and calculate the ångerrätt window correctly
- **FSA-004** — Consumer protection and fair treatment: no barriers or penalties for exercising ångerrätt
- **GDPR-002** — Policy administration: personal data from the cancelled policy must be retained per retention policy, not immediately deleted
- **IDD-003** — Pre-contractual information: the customer must have been informed about ångerrätt before purchase

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Payment Provider integration for refund processing
- Replacement coverage verification for trafikförsäkring (see [US-CAN-005](cancellation-replacement-coverage.md))

## Notes

- Ångerrätt does not apply to policies purchased in person at a physical office
- The EU Consumer Rights Directive underpins the Swedish ångerrätt; the 14-day period is a minimum
- If the customer gave explicit consent for coverage to start during the cooling-off period, a proportional deduction is allowed
