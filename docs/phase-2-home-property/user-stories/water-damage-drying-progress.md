---
sidebar_position: 16
---

# US-HCW-007: Track Drying Progress

## User Story

**As a** customer (privatkund),
**I want to** track the drying progress of my property,
**so that** I know when repairs can begin and I can plan accordingly.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md), [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Should Have** — Transparency into the drying process reduces customer anxiety and support calls during what is typically a 2-8 week waiting period.

## Acceptance Criteria

- **GIVEN** drying is in progress at the customer's property
  **WHEN** the customer views the claim status in the web portal or mobile app
  **THEN** the system displays the current drying phase, latest moisture readings, estimated completion date, and next scheduled measurement

- **GIVEN** the saneringsfirma has submitted a new drying measurement
  **WHEN** the system receives the updated moisture data
  **THEN** the system updates the claim timeline and notifies the customer that a new measurement is available

- **GIVEN** the drying process is taking longer than initially estimated
  **WHEN** the estimated completion date is revised
  **THEN** the system notifies the customer of the new timeline and the reason for the extension

- **GIVEN** the drying phase is complete (moisture levels within acceptable range)
  **WHEN** the saneringsfirma submits the final measurement
  **THEN** the system updates the claim status to "Drying Complete" and notifies the customer that the repair phase can begin

## Drying Status Information

| Field                    | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| Current phase            | Emergency response, active drying, monitoring, or complete |
| Drying start date        | When drying equipment was installed                        |
| Latest moisture readings | Most recent measurement per room                           |
| Trend                    | Improving, stable, or concerning                           |
| Estimated completion     | Expected date based on current progress                    |
| Next measurement date    | When the saneringsfirma will take new readings             |
| Equipment installed      | Types and count of drying equipment                        |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: keeping the customer informed of progress is part of fair claims handling
- **FSA-004** — Consumer protection: the customer must receive clear, understandable status information throughout the claims process

## Dependencies

- Depends on US-HCW-002 (Dispatch Restoration Company)
- Depends on US-HCW-004 (Receive Moisture Measurement Report)
- Saneringsfirma API for automated status updates

## Notes

- Typical drying duration: 2-8 weeks depending on damage extent, material types, and season
- Customers frequently call to ask about drying progress — self-service tracking reduces call volume
- Drying equipment (dehumidifiers, fans) increases electricity costs; some policies cover this
