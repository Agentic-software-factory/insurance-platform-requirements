---
sidebar_position: 11
---

# US-HCW-002: Dispatch Restoration Company (Saneringsfirma)

## User Story

**As a** customer (privatkund),
**I want** the insurer to dispatch a saneringsfirma directly after I report water damage,
**so that** professional drying starts within hours and further damage is prevented.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md), [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Rapid restoration company dispatch is essential to minimize water damage extent and total claim cost.

## Acceptance Criteria

- **GIVEN** a water damage claim has been registered
  **WHEN** the system processes the emergency report
  **THEN** the system automatically dispatches the nearest available saneringsfirma under the framework agreement (Polygon, BELFOR, or other contracted partner)

- **GIVEN** a saneringsfirma has been dispatched
  **WHEN** the restoration company accepts the assignment
  **THEN** the system records the dispatch time, estimated arrival time, and assigned company, and notifies the customer with the expected arrival window

- **GIVEN** the customer has reported that water is still flowing
  **WHEN** the system triages the emergency
  **THEN** the system marks the dispatch as urgent (akut) with a target response time of 2 hours

- **GIVEN** a saneringsfirma has arrived at the property
  **WHEN** the restoration company begins work
  **THEN** the system records the actual arrival time and updates the claim status to "Emergency Response in Progress"

- **GIVEN** the property is a bostadsrätt in a BRF
  **WHEN** the damage may affect shared areas (gemensamma utrymmen)
  **THEN** the system notifies the claims handler to coordinate with the [BRF Board (BRF-styrelse)](../../actors/external/brf-board.md) regarding building access and shared area assessment

## Dispatch Priority Rules

| Condition                                    | Priority      | Target Response Time |
| -------------------------------------------- | ------------- | -------------------- |
| Water still flowing                          | Urgent (Akut) | 2 hours              |
| Water stopped but significant standing water | High          | 4 hours              |
| Water stopped, limited damage                | Normal        | 24 hours             |
| Slow leak discovered, no emergency           | Scheduled     | Next business day    |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: prompt dispatch of restoration services is part of the insurer's obligation to handle claims without undue delay
- **GDPR-003** — Claims processing: sharing customer address and contact details with the saneringsfirma requires a data processing agreement and must be limited to data necessary for the restoration work

## Dependencies

- Depends on US-HCW-001 (Water Damage FNOL)
- Saneringsfirma API integration (Polygon/BELFOR) for automated dispatch
- Framework agreements with restoration companies

## Notes

- The customer should not need to find and contact a saneringsfirma themselves — the insurer manages this as part of the claims service
- For after-hours reports, the 24/7 emergency service handles dispatch directly
- Multiple restoration companies may be needed for large-scale damage (e.g., entire apartment building)
