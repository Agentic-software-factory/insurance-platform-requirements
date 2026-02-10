---
sidebar_position: 36
---

# US-CAN-007: Calculate and Process Premium Refund

## User Story

**As a** customer (privatkund),
**I want to** see my refund amount before confirming cancellation and receive the refund promptly,
**so that** I can make an informed decision and receive money I am owed for unused coverage.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [System Administrator](../../actors/internal/system-administrator.md), [Payment Provider](../../actors/external/payment-provider.md)

## Priority

**Must Have** — Premium refunds on cancellation are a statutory right and a key part of the customer experience.

## Acceptance Criteria

- **GIVEN** a customer initiates a cancellation
  **WHEN** the cancellation details are confirmed (reason, effective date)
  **THEN** the system calculates and displays the estimated refund amount before the customer confirms

- **GIVEN** the refund has been calculated
  **WHEN** the customer reviews the refund amount
  **THEN** the system shows the calculation breakdown: premium paid, period used, period remaining, refund amount, and any deductions

- **GIVEN** an ångerrätt cancellation (cooling-off)
  **WHEN** the refund is calculated
  **THEN** the system applies a full refund minus any deduction for days of coverage used (if early start was requested)

- **GIVEN** a standard cancellation (vehicle sold, scrapped, or other mid-term reason)
  **WHEN** the refund is calculated
  **THEN** the system applies a pro-rata refund for the remaining unused portion of the prepaid period

- **GIVEN** a huvudförfallodag cancellation
  **WHEN** the refund is evaluated
  **THEN** the system confirms no refund is due since coverage runs to the end of the policy period

- **GIVEN** the customer confirms the cancellation
  **WHEN** the refund is processed
  **THEN** the system issues the refund to the original payment method within 30 days and sends the customer a refund confirmation

- **GIVEN** a refund has been processed
  **WHEN** operations staff reviews the refund record
  **THEN** the system provides a complete audit trail of the refund calculation, approval, and payment

## Refund Calculation Rules

| Cancellation Type               | Refund Rule                                                  | Example                                                      |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Ångerrätt (cooling-off)         | Full refund, minus days of coverage if early start requested | 14-day policy used = small deduction; no usage = full refund |
| Vehicle sold                    | Pro-rata from ownership transfer date                        | 6 months of 12 prepaid → 50% refund                          |
| Vehicle scrapped/deregistered   | Pro-rata from deregistration date                            | 9 months of 12 prepaid → 25% refund                          |
| Huvudförfallodag                | No refund (coverage runs to period end)                      | N/A                                                          |
| Insurer-initiated (non-payment) | Pro-rata minus outstanding premiums                          | Refund offset against unpaid amounts                         |

## Business Rules

| Rule       | Description                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------- |
| BR-CAN-025 | Pro-rata calculation: refund = (remaining days / total days) × annual premium               |
| BR-CAN-026 | No administrative fees may be deducted from the refund                                      |
| BR-CAN-027 | Refund must be issued to the original payment method unless the customer requests otherwise |
| BR-CAN-028 | Refund processing must complete within 30 calendar days of cancellation                     |
| BR-CAN-029 | The refund amount must be displayed to the customer before cancellation is confirmed        |

## Regulatory

- **FSA-013** — Cancellation and cooling-off rights: refund calculations must follow statutory rules; no punitive deductions
- **FSA-004** — Consumer protection and fair treatment: transparent refund calculations; no hidden fees
- **GDPR-002** — Policy administration: refund and payment records must be retained per data retention policy
- **IDD-003** — Pre-contractual information: cancellation refund rules must have been disclosed before purchase

## Dependencies

- Payment Provider integration for refund processing
- All cancellation user stories feed into this refund calculation
- Policy premium records from Quote and Bind (Issue #10)

## Notes

- The refund display before confirmation is an important consumer experience requirement and aligns with the issue's acceptance criteria
- Monthly payment customers may have a different refund calculation (no refund if paying monthly and coverage consumed equals payments made)
- The upcoming EU 2023/2673 regulation (effective June 2026) will require a clear online cancellation function with upfront refund information
