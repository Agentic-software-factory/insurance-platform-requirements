---
sidebar_position: 24
---

# US-CLM-015: Close and Review Claims

## User Story

**As a** claims handler (skadereglerare),
**I want to** perform a final review and close a claim after all settlements and recoveries are complete,
**so that** the claim record is finalized and statistics are updated.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Actuary (Aktuarie)](../../actors/internal/actuary.md)

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

| Check                  | Description                                           | System Validation                                      |
| ---------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| All payments confirmed | Settlement payments received by payees                | System verifies all payment statuses are "Confirmed"   |
| Subrogation resolved   | Recovery cases closed or written off                  | System checks no open subrogation cases exist          |
| Documents complete     | All required documents attached to the claim          | System validates minimum document set per claim type   |
| Bonus impact applied   | Policyholder's bonus class updated (if applicable)    | System confirms bonus recalculation has been processed |
| Customer notified      | Customer informed of final settlement and closure     | System confirms closure notification has been sent     |
| No pending disputes    | No active complaints or disputes related to the claim | System checks complaints register for linked cases     |
| Reserve released       | Outstanding reserves are released to accounting       | System triggers reserve release upon closure           |

### Closure Conditions by Claim Type

| Claim Type                         | Additional Closure Conditions                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Standard repair                    | Repair completed and confirmed by repair shop or customer                                              |
| Total loss                         | Salvage disposition completed (sold or retained by customer)                                           |
| Personal injury (trafikförsäkring) | Final medical assessment received; no further treatment expected; or 10-year limitation period reached |
| TFF claim                          | TFF settlement confirmed and recorded                                                                  |
| Subrogation-eligible               | Recovery case closed (paid, written off, or abandoned)                                                 |
| Glass-only                         | Repair/replacement completed; invoice received from glass shop                                         |

### Reopening Rules

- A closed claim may be reopened if new evidence emerges, the settlement is disputed, or the claimant's condition worsens (personal injury)
- Reopening requires claims handler authorization (standard claims) or senior handler approval (claims older than 1 year)
- The system records the reopening reason and creates an audit trail entry
- Reopened claims return to "Under Review" status and follow the standard claims flow
- Personal injury claims under trafikförsäkring may be reopened within 10 years of the original injury date

### Archival Rules

- Closed claim records are retained for 10 years from the closure date (FSA-014)
- Personal injury claim records are retained for 10 years from the final closure (which may be up to 20 years from the original injury)
- After the retention period, claim data is anonymized or deleted per GDPR requirements
- Archived claims remain searchable for actuarial analysis and regulatory reporting

## Regulatory

- **FSA-010** — Fair claims settlement: claim closure must ensure the customer has received the full settlement owed
- **FSA-014** — Record keeping: closed claim records must be retained for 10 years after closure; the record must be complete and auditable
- **FSA-006** — Supervisory reporting: closed claims data feeds into regulatory reports (claims frequency, severity, reserves)
- **GDPR-003** — Claims processing: closed claim data remains subject to GDPR retention rules; data must be deleted after the retention period expires
- **IDD-010** — If customer disputes claim decision, distribution-related complaints must follow IDD complaints procedure

## Dependencies

- Depends on US-CLM-008 (Settlement) — all payments must be complete
- Depends on US-CLM-009 (Subrogation) — recovery cases must be resolved
- Depends on US-CLM-010 (Bonus Impact) — bonus class must be updated

## Notes

- Claims closed in error can be reopened with appropriate authorization
- Personal injury claims under trafikförsäkring may be reopened within the 10-year limitation period if the injured party's condition changes
- Claim closure triggers reserve release in the accounting system
