---
sidebar_position: 24
---

# US-CLM-015: Close and Review Claims

## User Story

**As a** claims handler (skadereglerare),
**I want to** perform a final review and close a claim after all settlements and recoveries are complete,
**so that** the claim record is finalized and statistics are updated.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Actuary (Aktuarie)](../../actors/internal-actors.md#actuary)

## Priority

**Must Have** — Claim closure finalizes the financial record and feeds actuarial analysis.

## Acceptance Criteria

- **GIVEN** a claim has been settled and all payments processed
  **WHEN** the claims handler initiates claim closure
  **THEN** the system verifies that: all payments have been confirmed, all subrogation cases are resolved or written off, all required documents are attached, and the bonus class impact has been applied

- **GIVEN** all closure checks pass
  **WHEN** the claims handler closes the claim
  **THEN** the system changes the claim status to "Closed" (Stängd), records the closure date, and calculates the total claim cost (payments minus recoveries)

- **GIVEN** a claim is closed
  **WHEN** the system processes the closure
  **THEN** the claim data feeds into actuarial reporting: claim type, total cost, time to settlement, and other key metrics are updated in the reporting dataset

- **GIVEN** a closed claim needs to be reopened
  **WHEN** the claims handler reopens the claim (e.g., new information, disputed settlement, additional injury)
  **THEN** the system changes the status to "Reopened" (Återöppnad), records the reason for reopening, and allows further processing

- **GIVEN** a personal injury claim under trafikförsäkring
  **WHEN** the claims handler assesses whether to close the claim
  **THEN** the system warns if the claim is being closed within the 10-year limitation period and there may be outstanding injury developments

## Claim Closure Checklist

| Check                  | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| All payments confirmed | Settlement payments received by payees                |
| Subrogation resolved   | Recovery cases closed or written off                  |
| Documents complete     | All required documents attached to the claim          |
| Bonus impact applied   | Policyholder's bonus class updated (if applicable)    |
| Customer notified      | Customer informed of final settlement and closure     |
| No pending disputes    | No active complaints or disputes related to the claim |

## Regulatory

- **FSA-010** — Fair claims settlement: claim closure must ensure the customer has received the full settlement owed
- **FSA-014** — Record keeping: closed claim records must be retained for 10 years after closure; the record must be complete and auditable
- **FSA-006** — Supervisory reporting: closed claims data feeds into regulatory reports (claims frequency, severity, reserves)
- **GDPR-003** — Claims processing: closed claim data remains subject to GDPR retention rules; data must be deleted after the retention period expires

## Dependencies

- Depends on US-CLM-008 (Settlement) — all payments must be complete
- Depends on US-CLM-009 (Subrogation) — recovery cases must be resolved
- Depends on US-CLM-010 (Bonus Impact) — bonus class must be updated

## Notes

- Claims closed in error can be reopened with appropriate authorization
- Personal injury claims under trafikförsäkring may be reopened within the 10-year limitation period if the injured party's condition changes
- Claim closure triggers reserve release in the accounting system
