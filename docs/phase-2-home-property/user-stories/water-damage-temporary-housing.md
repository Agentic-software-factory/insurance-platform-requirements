---
sidebar_position: 19
---

# US-HCW-010: Arrange Temporary Housing (Evakueringsboende)

## User Story

**As a** customer (privatkund),
**I want** temporary housing (evakueringsboende) if my home is uninhabitable during water damage restoration,
**so that** my family has a place to stay while repairs are completed.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Temporary housing is a core coverage component of Swedish home insurance when the property is uninhabitable.

## Acceptance Criteria

- **GIVEN** a water damage claim has rendered the customer's home uninhabitable
  **WHEN** the claims handler or customer requests temporary housing
  **THEN** the system creates a temporary housing order linked to the claim and initiates the booking process

- **GIVEN** a temporary housing request has been approved
  **WHEN** the system arranges accommodation
  **THEN** the system records the accommodation details (type, location, daily cost, start date) and notifies the customer with booking confirmation

- **GIVEN** temporary housing is in effect
  **WHEN** the daily cost exceeds the policy's coverage limit for temporary accommodation
  **THEN** the system alerts the claims handler and notifies the customer of the coverage limit and any excess cost they must bear

- **GIVEN** the customer's home has been restored to habitable condition
  **WHEN** the claims handler confirms restoration is complete
  **THEN** the system ends the temporary housing period, records the total cost, and includes it in the claim settlement

- **GIVEN** the drying and repair process extends beyond the initially estimated timeline
  **WHEN** the temporary housing period needs extension
  **THEN** the claims handler can extend the housing order, and the system updates the cost projection and notifies the customer

## Temporary Housing Coverage

| Accommodation Type          | Typical Daily Cost | Notes                      |
| --------------------------- | ------------------ | -------------------------- |
| Hotel                       | SEK 1,000 -- 2,000 | Short-term (up to 2 weeks) |
| Furnished apartment         | SEK 500 -- 1,500   | Medium-term (2-8 weeks)    |
| Extended-stay accommodation | SEK 400 -- 1,000   | Long-term (8+ weeks)       |

## Temporary Housing Data Model

| Field              | Type      | Required       | Description                               |
| ------------------ | --------- | -------------- | ----------------------------------------- |
| Housing ID         | String    | Auto-generated | Unique identifier                         |
| Claim ID           | Reference | Yes            | Link to the water damage claim            |
| Start date         | Date      | Yes            | When temporary housing begins             |
| End date           | Date      | No             | When housing ends (updated on completion) |
| Accommodation type | Enum      | Yes            | Hotel, furnished apartment, extended-stay |
| Daily cost         | Currency  | Yes            | Daily accommodation cost                  |
| Total cost         | Currency  | Calculated     | Accumulated cost over housing period      |
| Coverage limit     | Currency  | Yes            | Policy maximum for temporary housing      |
| Provider           | String    | No             | Accommodation provider name               |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: temporary housing must be arranged promptly when the home is uninhabitable
- **FSA-004** — Consumer protection: the customer must be informed of their temporary housing entitlement and any coverage limits
- **FSA-012** — Insurance contract disclosure: temporary housing coverage terms must be clearly stated in the policy

## Dependencies

- Depends on US-HCW-001 (Water Damage FNOL)
- Temporary housing provider agreements or booking integration

## Notes

- Temporary housing is typically covered for the duration of restoration, subject to policy limits
- For families with children or pets, accommodation suitability is an important consideration
- The customer may choose to stay with friends or family and receive a reduced daily allowance instead
- Temporary housing costs can be a significant portion of the total claim cost for large water damage claims
