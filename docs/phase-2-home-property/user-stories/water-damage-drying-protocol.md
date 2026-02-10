---
sidebar_position: 17
---

# US-HCW-008: Submit Drying Protocol (Torkprotokoll)

## User Story

**As a** saneringsfirma (restoration company),
**I want to** submit torkprotokoll (drying protocols) digitally to the insurer,
**so that** the claims handler can monitor drying progress and approve the next steps.

## Actors

- **Primary:** [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Drying protocols are the primary documentation for the restoration process and form the basis for cost approval.

## Acceptance Criteria

- **GIVEN** a saneringsfirma has an active drying assignment
  **WHEN** the technician performs a scheduled moisture measurement
  **THEN** the system accepts the torkprotokoll submission via API or web portal, including measurement date, moisture levels per room, equipment status, and technician notes

- **GIVEN** a torkprotokoll has been submitted
  **WHEN** the system processes the submission
  **THEN** the system stores the protocol linked to the claim and restoration order, updates the drying progress timeline, and notifies the claims handler

- **GIVEN** the torkprotokoll shows moisture levels have reached acceptable limits
  **WHEN** the saneringsfirma marks drying as complete
  **THEN** the system alerts the claims handler to review the final protocol and approve transition to the repair phase

- **GIVEN** the torkprotokoll shows unexpected moisture increase or stalled progress
  **WHEN** the system detects an anomaly in the moisture trend
  **THEN** the system flags the claim for claims handler review and potential reassessment of the drying plan

- **GIVEN** multiple torkprotokoll have been submitted for a claim
  **WHEN** the claims handler reviews the drying history
  **THEN** the system displays a timeline view showing moisture level trends across all measurement points

## Torkprotokoll Data Model

| Field                | Type      | Required       | Description                                            |
| -------------------- | --------- | -------------- | ------------------------------------------------------ |
| Protocol ID          | String    | Auto-generated | Unique identifier                                      |
| Restoration order ID | Reference | Yes            | Link to the active restoration order                   |
| Measurement date     | Date      | Yes            | When measurements were taken                           |
| Technician name      | String    | Yes            | Name of the technician performing measurement          |
| Moisture levels      | Object[]  | Yes            | Room-by-room moisture readings (location, value, unit) |
| Equipment status     | Object[]  | Yes            | List of equipment (type, operating status, placement)  |
| Drying assessment    | Enum      | Yes            | On track, delayed, complete, or requires reassessment  |
| Technician notes     | Text      | No             | Observations, concerns, or recommendations             |
| Photos               | File[]    | No             | Updated damage and equipment photos                    |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: regular drying documentation ensures the restoration process is monitored and not unduly delayed
- **FSA-014** — Record keeping: all torkprotokoll must be retained as part of the claims file for 10 years
- **GDPR-003** — Claims processing: torkprotokoll may contain property details; data minimization applies to any personal data

## Dependencies

- Depends on US-HCW-002 (Dispatch Restoration Company)
- Saneringsfirma API integration for digital protocol submission

## Notes

- Torkprotokoll are typically submitted weekly during active drying
- Industry standard moisture measurement units: relative humidity (RH%), wood moisture content (%), concrete moisture (RH%)
- Acceptable drying thresholds vary by material: concrete < 85% RH, wood < 16% moisture content
