---
sidebar_position: 38
---

# US-HCF-009: Provide Continued Temporary Housing During Rebuild

## User Story

**As a** customer (privatkund),
**I want** continued temporary housing coverage during the rebuild period,
**so that** my family has stability while our home is being restored.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Fire and natural event rebuilds can take 6-18 months. Continuous temporary housing is a core coverage component that ensures the customer is not left without shelter.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has rendered the customer's home uninhabitable
  **WHEN** the claims handler or customer requests temporary housing
  **THEN** the system creates a temporary housing order linked to the claim, records the start date, and initiates accommodation booking

- **GIVEN** temporary housing has been arranged
  **WHEN** the system tracks the housing duration
  **THEN** the system monitors the housing period against the policy's coverage limit and displays: current duration, daily cost, accumulated cost, remaining coverage, and estimated restoration completion date

- **GIVEN** the rebuild or repair extends beyond 6 months
  **WHEN** the temporary housing period needs extension
  **THEN** the claims handler can extend the housing order, the system checks the extension against policy limits, and the customer is notified of the extension and any coverage implications

- **GIVEN** the policy's temporary housing coverage limit is approaching
  **WHEN** the accumulated cost reaches 80% of the coverage limit
  **THEN** the system alerts the claims handler and notifies the customer of the remaining coverage, so that alternative arrangements can be planned if needed

- **GIVEN** the customer prefers to arrange their own temporary housing
  **WHEN** the customer opts for a daily allowance (traktamente) instead of insurer-arranged accommodation
  **THEN** the system records the customer's choice, calculates the daily allowance amount per policy terms, and tracks payments against the coverage limit

- **GIVEN** the customer's home has been restored to habitable condition
  **WHEN** the claims handler confirms restoration is complete
  **THEN** the system ends the temporary housing period, records the total cost, and includes it in the claim settlement

## Temporary Housing Coverage

| Accommodation Type            | Typical Daily Cost | Use Case                          |
| ----------------------------- | ------------------ | --------------------------------- |
| Hotel                         | SEK 1,000 -- 2,500 | Immediate evacuation (first days) |
| Furnished apartment           | SEK 500 -- 1,500   | Short to medium term (weeks)      |
| Extended-stay accommodation   | SEK 400 -- 1,200   | Long-term rebuild (months)        |
| Daily allowance (traktamente) | Per policy terms   | Customer arranges own housing     |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: temporary housing must be arranged promptly; the customer must not be left without shelter due to insurer delays
- **FSA-004** — Consumer protection: the customer must be informed of their temporary housing entitlement, coverage limits, and the option of a daily allowance
- **FSA-012** — Insurance contract disclosure: temporary housing coverage terms, limits, and duration must be clearly stated in the policy
- **FSA-014** — Record keeping: all temporary housing arrangements, costs, and customer communications must be retained for 10 years

## Dependencies

- Depends on US-HCF-001 (Report Fire or Natural Event Emergency)
- Depends on US-HCF-004 (Assess Total Loss vs Partial Loss)
- Temporary housing provider agreements or booking integration
- Policy configuration with temporary housing coverage limits

## Notes

- Fire and natural event claims often require longer temporary housing periods than water damage claims due to the severity of structural damage
- For families with children in school, accommodation should be arranged as close to the original property as feasible
- The customer may choose to stay with relatives and receive a reduced daily allowance; this option should be communicated clearly
- Total loss rebuilds may require temporary housing for 12-18 months; the claims handler should set realistic expectations early
- If the policy coverage limit is insufficient, the claims handler should discuss options with the customer proactively
