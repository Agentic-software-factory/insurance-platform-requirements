---
sidebar_position: 13
---

# US-HCW-004: Receive Moisture Measurement Report

## User Story

**As a** claims handler (skadereglerare),
**I want to** receive the saneringsfirma's moisture measurement report digitally,
**so that** I can assess the damage scope and approve the restoration plan.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md)

## Priority

**Must Have** — Moisture measurement data is the foundation for assessing water damage scope, planning restoration, and estimating costs.

## Acceptance Criteria

- **GIVEN** a saneringsfirma has completed the initial emergency response
  **WHEN** the restoration company submits the moisture measurement report
  **THEN** the system receives and stores the report linked to the claim, including moisture levels by room, affected materials, and recommended drying plan

- **GIVEN** a moisture measurement report has been received
  **WHEN** the claims handler reviews the report
  **THEN** the system displays the report with moisture readings, affected area measurements (square meters), material types affected, and the saneringsfirma's cost estimate for drying

- **GIVEN** a moisture measurement report indicates extensive damage
  **WHEN** the estimated restoration cost exceeds a configurable threshold
  **THEN** the system flags the claim for senior claims handler review and potential besiktningsman inspection

- **GIVEN** a claims handler has reviewed the moisture measurement report
  **WHEN** the claims handler approves the drying plan
  **THEN** the system updates the claim status to "Drying Approved" and notifies the saneringsfirma to proceed

- **GIVEN** a claims handler questions the moisture measurement findings
  **WHEN** the claims handler requests additional assessment
  **THEN** the system notifies the saneringsfirma and optionally dispatches a [Property Inspector (Besiktningsman)](../../actors/external/property-inspector.md) for an independent assessment

## Moisture Report Data

| Field                     | Type      | Description                                          |
| ------------------------- | --------- | ---------------------------------------------------- |
| Report date               | Date      | When measurements were taken                         |
| Rooms assessed            | List      | Each room with moisture readings                     |
| Moisture levels           | Numeric[] | Readings per measurement point (relative humidity %) |
| Affected materials        | List      | Concrete, wood, plaster, insulation, etc.            |
| Affected area (m²)        | Numeric   | Total area requiring drying                          |
| Drying equipment needed   | List      | Dehumidifiers, fans, heat panels                     |
| Estimated drying duration | Text      | Expected time in weeks                               |
| Estimated drying cost     | Currency  | Cost estimate for drying phase                       |
| Photos                    | File[]    | Damage documentation photos                          |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: timely review of the moisture report prevents delays in the restoration process
- **FSA-014** — Record keeping: moisture measurement reports must be retained as part of the claims file for 10 years
- **GDPR-003** — Claims processing: reports may contain property owner details; data minimization applies

## Dependencies

- Depends on US-HCW-002 (Dispatch Restoration Company)
- Saneringsfirma API integration for digital report submission

## Notes

- Moisture measurement technology includes pin-type moisture meters, non-destructive capacitance meters, and thermal imaging cameras
- Initial moisture readings serve as the baseline for tracking drying progress
- The saneringsfirma's report is the primary input for estimating total claim cost
