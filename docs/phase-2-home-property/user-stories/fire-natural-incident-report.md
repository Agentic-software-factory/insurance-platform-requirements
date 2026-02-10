---
sidebar_position: 31
---

# US-HCF-002: Obtain Räddningstjänsten Incident Report

## User Story

**As a** claims handler (skadereglerare),
**I want** the räddningstjänsten incident report (insatsrapport),
**so that** the cause and extent of the fire or natural event are officially documented.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Fire Department (Räddningstjänsten)](../../actors/external/fire-department.md)

## Priority

**Must Have** — The fire department incident report is the primary official record of cause and extent for fire and natural event claims. It is essential for liability determination and settlement.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has been registered
  **WHEN** the claims handler requests the räddningstjänsten incident report
  **THEN** the system creates a document request linked to the claim and records the request date

- **GIVEN** an incident report request has been sent
  **WHEN** the fire department provides the insatsrapport
  **THEN** the claims handler uploads the report to the claim file, and the system records: incident cause, extent of damage, actions taken by räddningstjänsten, and whether a fire cause investigation (brandorsaksutredning) is pending

- **GIVEN** the incident report indicates the fire cause is under investigation
  **WHEN** the claims handler reviews the report
  **THEN** the system flags the claim as "Pending Cause Investigation" and prevents final settlement until the investigation is concluded

- **GIVEN** the incident report has been received and reviewed
  **WHEN** the claims handler classifies the event based on the report
  **THEN** the system validates that the reported cause is a covered peril under the customer's policy terms

- **GIVEN** the incident report indicates suspected arson or criminal activity
  **WHEN** the claims handler reviews the report
  **THEN** the system flags the claim for fraud investigation and records the police report reference number

## Incident Report Data

| Field                     | Type    | Description                                                  |
| ------------------------- | ------- | ------------------------------------------------------------ |
| Incident reference number | String  | Räddningstjänsten's reference number                         |
| Incident date and time    | Date    | Official date and time of the incident                       |
| Incident type             | Enum    | Fire, storm, flood, lightning, explosion, other              |
| Cause determination       | Text    | Determined or suspected cause of the event                   |
| Extent of damage          | Text    | Description of damage scope                                  |
| Actions taken             | Text    | Fire department response actions                             |
| Fire cause investigation  | Boolean | Whether a brandorsaksutredning is pending                    |
| Criminal suspicion        | Boolean | Whether criminal activity (e.g., arson) is suspected         |
| Police report reference   | String  | Reference number for any associated police report            |
| Environmental hazards     | Boolean | Whether hazardous materials were identified (asbestos, etc.) |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the incident report is a key evidence document; delays in obtaining it must not cause undue delay in the overall claims process
- **FSA-014** — Record keeping: the incident report must be retained as part of the claim file for 10 years
- **GDPR-003** — Claims processing: personal data in the incident report must be processed under data minimization principles
- **GDPR-008** — Restoration company data sharing: incident report details may be shared with contractors only as needed for restoration

## Dependencies

- Depends on US-HCF-001 (Report Fire or Natural Event Emergency)
- Fire department actor definition
- Integration or manual process for requesting and receiving insatsrapporter

## Notes

- Räddningstjänsten incident reports are public documents (offentlig handling) but may take days to weeks to become available
- For large-scale events (storms, flooding), incident reports may cover multiple properties; the claims handler must extract the relevant portions
- Fire cause investigations (brandorsaksutredning) are conducted by the fire department or police and may take several weeks or months
- The claims handler should begin the assessment process in parallel while waiting for the incident report, to avoid unnecessary delays
