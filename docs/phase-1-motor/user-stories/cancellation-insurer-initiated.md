---
sidebar_position: 39
---

# US-CAN-010: Insurer-Initiated Cancellation

## User Story

**As an** operations staff member,
**I want to** cancel a customer's policy when they fail to pay premiums, commit fraud, or make material misrepresentations,
**so that** TryggFörsäkring can manage its risk exposure and enforce policy terms in accordance with Swedish insurance law.

## Actors

- **Primary:** [Operations Staff](../../actors/internal/system-administrator.md)
- **Supporting:** [Underwriter (Riskbedömare)](../../actors/internal/underwriter.md), [Customer (Privatkund)](../../actors/internal/customer.md), [Transportstyrelsen](../../actors/external/transportstyrelsen.md)

## Priority

**Must Have** — Insurer-initiated cancellations are legally regulated and require strict procedural compliance under Försäkringsavtalslagen.

## Acceptance Criteria

### Non-Payment

- **GIVEN** a customer's premium payment is overdue beyond the grace period
  **WHEN** the system detects the overdue payment
  **THEN** the system generates a written cancellation warning (uppsägning) sent via registered mail with a 14-day remediation period

- **GIVEN** a cancellation warning has been sent for non-payment
  **WHEN** the customer pays the outstanding premium within 14 days
  **THEN** the cancellation is aborted and the policy remains active

- **GIVEN** a cancellation warning has been sent for non-payment
  **WHEN** 14 days pass without payment
  **THEN** the system flags the policy for insurer-initiated cancellation, requiring operations staff approval before execution

### Fraud and Material Misrepresentation

- **GIVEN** an investigation has established that a customer committed insurance fraud or made material misrepresentations at underwriting
  **WHEN** operations staff initiate cancellation with reason "Fraud" or "Material misrepresentation"
  **THEN** the system requires underwriter approval and records the evidence supporting the cancellation

- **GIVEN** an insurer-initiated cancellation for fraud is approved
  **WHEN** the cancellation is processed
  **THEN** the system sends written notification to the customer explaining the reason and their right to dispute via ARN (Allmänna reklamationsnämnden) or court

### General

- **GIVEN** an insurer-initiated cancellation is finalised
  **WHEN** the policy includes trafikförsäkring
  **THEN** the system notifies Transportstyrelsen and TFF, and the vehicle becomes uninsured (TFF penalty coverage may apply)

- **GIVEN** an insurer-initiated cancellation is finalised
  **WHEN** a refund is applicable
  **THEN** the system calculates any refund (prepaid premium minus outstanding amounts) and processes the payment (see [US-CAN-007](cancellation-refund.md))

## Business Rules

| Rule       | Description                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| BR-CAN-031 | Non-payment cancellation requires a 14-day written warning per Försäkringsavtalslagen                     |
| BR-CAN-032 | The warning must be sent via registered mail (rekommenderat brev) to be legally valid                     |
| BR-CAN-033 | Fraud cancellation requires documented evidence and underwriter approval                                  |
| BR-CAN-034 | Material misrepresentation cancellation must follow the proportionality principle (väsentlighetsrekvisit) |
| BR-CAN-035 | The customer must be informed of their right to dispute via ARN or court                                  |
| BR-CAN-036 | Outstanding premiums may be offset against any refund before payment                                      |
| BR-CAN-037 | For trafikförsäkring, TFF is notified so that penalty coverage (trafikförsäkringsavgift) applies          |

## Regulatory

- **FSA-013** — Cancellation rights: insurer-initiated cancellations must follow statutory notice and warning requirements
- **FSA-004** — Consumer protection and fair treatment: the customer must be treated fairly even in adverse actions; proportionality must be applied
- **FSA-007** — Mandatory trafikförsäkring: TFF must be notified when trafikförsäkring is cancelled by the insurer so penalty coverage activates
- **FSA-009** — Transportstyrelsen notification: all policy terminations must be reported to the Transport Agency
- **FSA-014** — Record keeping: all insurer-initiated cancellation records, warnings, and evidence must be retained for 10 years
- **FSA-012** — Insurance contract disclosure: the customer must be informed of the consequences of non-payment at policy inception
- **GDPR-002** — Policy administration: personal data must be retained per retention policy after cancellation
- **GDPR-006** — Fraud investigations: personal data may be processed for fraud prevention purposes under legitimate interest

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Premium payment tracking system
- Transportstyrelsen and TFF integration for mandatory coverage notifications
- Refund calculation (see [US-CAN-007](cancellation-refund.md))

## Notes

- Non-payment is the most common insurer-initiated cancellation reason
- Fraud cancellations are rare and require a documented investigation trail
- Material misrepresentation (e.g., undeclared drivers, false mileage) must meet the proportionality test under Försäkringsavtalslagen — minor errors do not justify cancellation
- When trafikförsäkring is cancelled by the insurer, TFF penalty coverage activates automatically but at a significantly higher cost to the vehicle owner
