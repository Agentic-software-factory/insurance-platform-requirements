---
sidebar_position: 41
---

# US-CAN-012: View Refund Amount Before Confirming Cancellation

## User Story

**As a** customer (privatkund),
**I want to** see the exact refund amount and calculation breakdown before confirming my cancellation,
**so that** I can make an informed decision about whether to proceed with the cancellation.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)
- **Supporting:** System

## Priority

**Must Have** — Transparent refund information before confirmation is required by consumer protection rules and the upcoming EU 2023/2673 directive.

## Acceptance Criteria

- **GIVEN** a customer has initiated a cancellation and the cancellation type and effective date have been determined
  **WHEN** the system calculates the refund
  **THEN** the system displays a detailed refund breakdown before the customer confirms the cancellation

- **GIVEN** the refund breakdown is displayed
  **WHEN** the customer reviews it
  **THEN** the breakdown includes: annual premium, period start date, cancellation effective date, days used, days remaining, gross refund amount, any deductions, and net refund amount

- **GIVEN** a cancellation where no refund is applicable (e.g., huvudförfallodag)
  **WHEN** the system displays the cancellation summary
  **THEN** the system clearly states that no refund applies and explains why (coverage runs to the end of the paid period)

- **GIVEN** the customer has reviewed the refund breakdown
  **WHEN** they decide not to proceed
  **THEN** the system allows the customer to cancel the cancellation request without any penalty or change to their policy

- **GIVEN** the customer confirms the cancellation after reviewing the refund
  **WHEN** the cancellation is processed
  **THEN** the refund amount matches the amount shown in the preview (unless the effective date changes due to processing delays)

- **GIVEN** the refund preview is displayed via the online cancellation function
  **WHEN** the customer views the summary on a mobile device or desktop
  **THEN** the refund information is clearly formatted and accessible, meeting EU 2023/2673 transparency requirements

## Business Rules

| Rule       | Description                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| BR-CAN-043 | The refund amount must be displayed before the customer can confirm a cancellation              |
| BR-CAN-044 | The refund breakdown must show the calculation method so the customer can verify the amount     |
| BR-CAN-045 | If the refund amount changes between preview and processing, the customer must be notified      |
| BR-CAN-046 | The cancellation request can be abandoned at any point before confirmation without consequences |

## Regulatory

- **FSA-004** — Consumer protection and fair treatment: transparent refund information enables informed decision-making
- **FSA-013** — Cancellation and cooling-off rights: refund terms must be clearly communicated before the customer commits
- **IDD-003** — Pre-contractual information: refund rules should have been disclosed before purchase; the preview reinforces transparency at point of cancellation
- **EU 2023/2673** — Online cancellation function: the cancellation flow (including refund preview) must be clear and accessible on digital channels

## Dependencies

- Refund calculation logic (see [US-CAN-007](cancellation-refund.md))
- Cancellation processing workflow (see [UC-CAN-001](../use-cases/uc-cancellation-processing.md))
- Refund calculation use case (see [UC-CAN-002](../use-cases/uc-refund-calculation.md))
- Online cancellation button (see [US-CAN-011](cancellation-eu-online-button.md))

## Notes

- This story focuses on the customer-facing refund preview experience; the underlying calculation logic is defined in [US-CAN-007](cancellation-refund.md) and [UC-CAN-002](../use-cases/uc-refund-calculation.md)
- The refund preview is a key step in the cancellation wizard (UC-CAN-001, Step 6–7) and must not be skippable
- For insurer-initiated cancellations, the refund preview is shown to operations staff rather than the customer
