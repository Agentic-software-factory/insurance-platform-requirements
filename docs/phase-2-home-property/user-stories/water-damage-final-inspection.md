---
sidebar_position: 23
---

# US-HCW-014: Verify Restoration via Final Inspection

## User Story

**As a** claims handler (skadereglerare),
**I want to** verify that restoration is complete via a final inspection,
**so that** the claim can be closed with confidence that the property has been properly restored.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md), [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md)

## Priority

**Should Have** — Final inspection ensures quality and prevents reopened claims, though not all claims require a formal inspection.

## Acceptance Criteria

- **GIVEN** repairs have been completed by the contractor
  **WHEN** the contractor reports completion
  **THEN** the system updates the claim status to "Repair Complete — Pending Verification" and prompts the claims handler to schedule or waive final inspection

- **GIVEN** a final inspection is required
  **WHEN** the claims handler or besiktningsman completes the inspection
  **THEN** the system records the inspection results including restoration quality assessment, any remaining deficiencies, and photos of the completed restoration

- **GIVEN** the final inspection identifies deficiencies
  **WHEN** the inspector reports incomplete or substandard restoration
  **THEN** the system flags the deficiencies, notifies the contractor, and keeps the claim in "Repair in Progress" until the issues are resolved

- **GIVEN** the final inspection confirms satisfactory restoration
  **WHEN** the claims handler approves the inspection results
  **THEN** the system updates the claim status to "Restoration Verified" and the claim can proceed to closure

- **GIVEN** the customer confirms they are satisfied with the restoration
  **WHEN** the customer provides sign-off (digitally or verbally recorded by the claims handler)
  **THEN** the system records the customer acceptance as part of the claim closure documentation

## Final Inspection Triggers

| Condition                                     | Inspection Required          |
| --------------------------------------------- | ---------------------------- |
| Total claim cost exceeds SEK 100,000          | Yes                          |
| BRF/individual split claim                    | Recommended                  |
| Customer reports dissatisfaction with repairs | Yes                          |
| Routine low-value claim                       | Customer sign-off sufficient |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: final verification must not cause undue delay to claim closure and payment
- **FSA-014** — Record keeping: final inspection reports and customer sign-off must be retained for 10 years
- **FSA-011** — Complaints handling: if the customer is dissatisfied with the restoration quality, the complaints process must be accessible

## Dependencies

- Depends on US-HCW-009 (Approve Repair Scope and Contractor)
- Depends on US-HCW-008 (Submit Drying Protocol) — drying must be complete before repairs

## Notes

- For smaller claims, a phone call or photo submission from the customer may substitute for a formal inspection
- The saneringsfirma typically provides a completion report and warranty for their work
- Quality issues discovered after claim closure may result in the claim being reopened
