---
sidebar_position: 16
---

# UC-CLM-007: Claims Closure

## Overview

This use case describes the claims closure process, from the final review checklist through reserve release, bonus class recalculation trigger, customer notification, and archival rules. Claims closure is the final step in the claims lifecycle and ensures that all financial, regulatory, and administrative requirements are satisfied before a claim is finalized.

## Use Case Summary

| Field                | Value                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| **Use Case ID**      | UC-CLM-007                                                                                          |
| **Name**             | Claims Closure                                                                                      |
| **Primary Actor**    | Claims Handler (Skadereglerare)                                                                     |
| **Secondary Actors** | Actuary, Customer                                                                                   |
| **Goal**             | Finalize and close a claim after all settlements, recoveries, and administrative tasks are complete |
| **Preconditions**    | Claim is settled (all payments confirmed) or denied (with notification sent)                        |
| **Postconditions**   | Claim is closed, reserves released, statistics updated, records archived                            |
| **Trigger**          | All settlement payments are confirmed and all subrogation cases are resolved                        |

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Actuary (Aktuarie)](../../actors/internal-actors.md#actuary), [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)

## Preconditions

1. The claim has been settled and all payments have been confirmed, or the claim has been denied and the customer has been notified
2. All subrogation cases linked to the claim are resolved (recovered, written off, or not applicable)
3. Bonus class recalculation has been triggered (or confirmed as not applicable)

## Postconditions

**Success:**

- Claim status is "Closed" (Stängd)
- Outstanding claim reserves are released to accounting
- Total claim cost is calculated (payments minus recoveries)
- Claim data feeds into actuarial reporting
- Customer has been notified of claim closure
- All documents are verified complete for the claim record

**Failure:**

- One or more closure checklist items fail validation
- The claims handler is informed of the blocking item and the claim remains open

## Main Success Scenario: Standard Closure

| Step | Actor          | Action                                           | System Response                                                     |
| ---- | -------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| 1    | Claims Handler | Initiates claim closure                          | System runs the automated closure checklist                         |
| 2    | System         | Validates all payments are confirmed             | System checks payment status for all settlement transactions        |
| 3    | System         | Validates subrogation cases are resolved         | System checks all linked subrogation records                        |
| 4    | System         | Validates bonus class impact has been applied    | System confirms bonus recalculation is complete or not applicable   |
| 5    | System         | Validates all required documents are attached    | System checks minimum document set for the claim type               |
| 6    | System         | Validates no pending disputes or complaints      | System checks complaints register for linked cases                  |
| 7    | System         | All checks pass                                  | System presents the closure summary to the claims handler           |
| 8    | Claims Handler | Reviews the closure summary and total claim cost | System displays: total paid, total recovered, net claim cost        |
| 9    | Claims Handler | Confirms closure                                 | System changes status to "Closed", records closure date             |
| 10   | System         | Releases outstanding reserves                    | System triggers reserve release in accounting                       |
| 11   | System         | Updates actuarial reporting data                 | System records claim type, total cost, cycle time, and other KPIs   |
| 12   | System         | Sends closure notification to the customer       | Customer receives email with closure confirmation and final summary |

## Alternative Flow: Denied Claim Closure

| Step | Actor          | Action                                                                        | System Response                                                      |
| ---- | -------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1    | Claims Handler | Initiates closure of a denied claim                                           | System checks the denial requirements                                |
| 2    | System         | Validates denial notification was sent to the customer                        | System confirms notification with complaints procedure was delivered |
| 3    | System         | Checks that the 30-day complaint window has passed (or complaint is resolved) | System validates the timeline                                        |
| 4    | Claims Handler | Confirms closure of the denied claim                                          | System changes status to "Closed" with denial reason recorded        |
| 5    | System         | Updates statistics (denied claim count, denial reasons)                       | System feeds denial data into reporting                              |

## Alternative Flow: Partial Closure (Personal Injury)

| Step | Actor          | Action                                                                        | System Response                                               |
| ---- | -------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1    | Claims Handler | Reviews a personal injury claim for possible closure                          | System displays the injury claim details and treatment status |
| 2    | System         | Warns that the claim is within the 10-year limitation period                  | System displays the limitation expiry date                    |
| 3    | Claims Handler | Confirms that all treatment is complete and final medical assessment received | System records the medical closure confirmation               |
| 4    | Claims Handler | Proceeds with closure                                                         | Standard closure flow continues from main step 7              |

## Alternative Flow: Claim Reopening

| Step | Actor          | Action                                                                    | System Response                                                |
| ---- | -------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 1    | Claims Handler | Requests reopening of a closed claim                                      | System prompts for reopening reason                            |
| 2    | Claims Handler | Enters the reason (new evidence, disputed settlement, worsened condition) | System validates the reopening authorization                   |
| 3a   | System         | Claim is less than 1 year old: standard handler can reopen                | System changes status to "Reopened" and records the reason     |
| 3b   | System         | Claim is more than 1 year old: senior handler approval required           | System routes the reopening request for approval               |
| 4    | System         | Re-establishes reserves if needed                                         | System reverses the previous reserve release                   |
| 5    | Claims Handler | Continues processing the reopened claim                                   | Claim follows the standard claims flow from the relevant stage |

## Exception Flow: Checklist Validation Failure

| Step | Actor          | Action                                                                                           | System Response                                             |
| ---- | -------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| 1    | System         | One or more closure checklist items fail                                                         | System displays the specific failures to the claims handler |
| 2    | Claims Handler | Reviews the blocking items                                                                       | System highlights what needs to be resolved                 |
| 3    | Claims Handler | Resolves the outstanding items (e.g., follows up on pending payment, attaches missing documents) | System tracks resolution progress                           |
| 4    | Claims Handler | Retries closure                                                                                  | System re-runs the checklist (returns to main flow step 1)  |

## Closure Checklist (Automated Validation)

| Check                  | Validation Rule                                               | Blocking                 |
| ---------------------- | ------------------------------------------------------------- | ------------------------ |
| All payments confirmed | Every settlement payment has status "Confirmed"               | Yes                      |
| Subrogation resolved   | All linked subrogation cases are "Recovered" or "Written off" | Yes                      |
| Documents complete     | Minimum document set attached per claim type                  | Yes                      |
| Bonus impact applied   | Bonus recalculation processed or marked "Not applicable"      | Yes                      |
| Customer notified      | Closure notification prepared                                 | Yes                      |
| No pending disputes    | No open complaints linked to the claim                        | Yes                      |
| Reserve amount set     | Reserve exists to be released                                 | No (warning only)        |
| Denial window elapsed  | For denied claims: 30 days since denial notification          | Yes (denied claims only) |

### Minimum Document Set by Claim Type

| Claim Type            | Required Documents                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Collision (vagnskada) | FNOL record, damage photos, repair estimate or total loss valuation, liability determination, settlement calculation |
| Theft (stöld)         | FNOL record, police report, waiting period confirmation, settlement calculation                                      |
| Glass (glasskada)     | FNOL record, glass shop invoice                                                                                      |
| Animal (viltskada)    | FNOL record, viltolycksrapport, damage photos, repair estimate                                                       |
| Personal injury       | FNOL record, medical documentation, compensation calculation, consent records                                        |
| Third-party liability | FNOL record, third-party details, liability determination, settlement calculation                                    |

## Validation Rules

| Rule       | Description                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| VR-CLS-001 | Claim cannot be closed if any payment has status "Pending" or "Failed"                                                    |
| VR-CLS-002 | Claim cannot be closed if any linked subrogation case is "Open"                                                           |
| VR-CLS-003 | Denied claims cannot be closed within 30 days of denial notification                                                      |
| VR-CLS-004 | Personal injury claims display a warning if closed within the 10-year limitation period with documented ongoing treatment |
| VR-CLS-005 | Reopened claims require a documented reason                                                                               |
| VR-CLS-006 | Claims older than 1 year require senior handler approval to reopen                                                        |
| VR-CLS-007 | Reserve release is blocked until claim status changes to "Closed"                                                         |

## Data Model

### Claim Closure Record

| Field                      | Type      | Required       | Description                               |
| -------------------------- | --------- | -------------- | ----------------------------------------- |
| Closure ID                 | String    | Auto-generated | Unique identifier for the closure action  |
| Claim number               | String    | Yes            | Link to the parent claim                  |
| Closure type               | Enum      | Yes            | Standard, Denied, Reopened-and-reclosed   |
| Checklist result           | Object    | Auto-set       | Pass/fail for each checklist item         |
| Total paid                 | Decimal   | Calculated     | Sum of all settlement payments            |
| Total recovered            | Decimal   | Calculated     | Sum of all subrogation recoveries         |
| Net claim cost             | Decimal   | Calculated     | Total paid minus total recovered          |
| Reserve released           | Decimal   | Calculated     | Outstanding reserve amount released       |
| Closure date               | Timestamp | Auto-set       | When the claim was closed                 |
| Closed by                  | Reference | Yes            | Claims handler who performed closure      |
| Customer notification sent | Boolean   | Yes            | Whether the closure notification was sent |
| Retention expiry           | Date      | Calculated     | Closure date + 10 years                   |

### Claim Reopening Record

| Field                  | Type      | Required       | Description                                       |
| ---------------------- | --------- | -------------- | ------------------------------------------------- |
| Reopening ID           | String    | Auto-generated | Unique identifier                                 |
| Claim number           | String    | Yes            | Link to the claim being reopened                  |
| Reason                 | Text      | Yes            | Why the claim is being reopened                   |
| Approved by            | Reference | Conditional    | Senior handler (required for claims > 1 year old) |
| Reopened date          | Timestamp | Auto-set       | When the claim was reopened                       |
| Reserve re-established | Decimal   | Conditional    | New reserve amount set                            |

## Business Rules

| Rule       | Description                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| BR-CLS-001 | Claim closure triggers reserve release in the accounting system                                                                             |
| BR-CLS-002 | Closed claim data feeds into actuarial reporting for claims frequency and severity analysis                                                 |
| BR-CLS-003 | Denied claims must wait 30 days after denial notification before closure (to allow complaints)                                              |
| BR-CLS-004 | Personal injury claims under trafikförsäkring may be reopened within 10 years of the original injury                                        |
| BR-CLS-005 | Reopening a claim reverses the reserve release and re-establishes an appropriate reserve                                                    |
| BR-CLS-006 | Claim records are retained for 10 years from closure date (FSA-014)                                                                         |
| BR-CLS-007 | After the retention period, claim data is anonymized or deleted per GDPR requirements                                                       |
| BR-CLS-008 | The customer closure notification must include: final settlement amount, claim number, complaints procedure, and data retention information |

## Non-functional Requirements

| Requirement              | Target                                                        |
| ------------------------ | ------------------------------------------------------------- |
| Closure processing       | Complete within 1 business day of all prerequisites being met |
| Reserve release          | Processed within 1 hour of claim closure                      |
| Actuarial data update    | Within 24 hours of claim closure                              |
| Customer notification    | Sent within 1 business day of closure                         |
| Archived claim retrieval | Retrievable within 5 seconds for audit purposes               |

## Regulatory Compliance Summary

| Regulation   | Requirements Addressed                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| **FSA-010**  | Fair claims settlement: closure ensures the customer has received the full settlement owed                 |
| **FSA-014**  | Record keeping: closed claim records retained for 10 years; the record must be complete and auditable      |
| **FSA-006**  | Supervisory reporting: closed claims data feeds into regulatory reports (frequency, severity, reserves)    |
| **FSA-011**  | Complaints handling: denied claims cannot be closed until the complaint window has elapsed                 |
| **GDPR-003** | Claims processing: closed claim data subject to GDPR retention rules; deleted after retention period       |
| **GDPR-005** | Right to erasure: after the retention period, personal data in closed claims must be erasable upon request |

## Related User Stories

- [US-CLM-015](../user-stories/claims-closure.md) -- Close and Review Claims
- [US-CLM-008](../user-stories/claims-settlement.md) -- Calculate and Process Settlement
- [US-CLM-009](../user-stories/claims-subrogation.md) -- Recover Costs Through Subrogation
- [US-CLM-010](../user-stories/claims-bonus-impact.md) -- Update Bonus Class After Claim
- [US-CLM-013](../user-stories/claims-tracking.md) -- Track Claim Status
