---
sidebar_position: 12
---

# US-HCW-003: Register FNOL With Damage Classification

## User Story

**As a** claims handler (skadereglerare),
**I want to** register the water damage FNOL with damage type, location, and suspected cause,
**so that** the claim is properly categorized and routed for efficient handling.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Must Have** — Proper claim categorization at registration determines the investigation path, restoration approach, and coverage assessment.

## Acceptance Criteria

- **GIVEN** a water damage FNOL has been received (online or by phone)
  **WHEN** the claims handler opens the claim for registration
  **THEN** the system displays the FNOL details and a structured registration form with water damage-specific fields

- **GIVEN** the claims handler is registering the claim
  **WHEN** the claims handler selects the damage cause category
  **THEN** the system provides subcategories: burst pipe (sprucket rör), appliance leak (maskinläckage — dishwasher, washing machine, refrigerator), bathroom membrane failure (tätskiktsbrott), frozen pipes (frysskada), roof leak (takläckage), and external water ingress (yttre vatten)

- **GIVEN** the claims handler has entered all required fields
  **WHEN** the claims handler submits the registration
  **THEN** the system validates completeness, assigns a claims handler based on workload and specialization, and sets the claim status to "Registered"

- **GIVEN** a claim involves a bostadsrätt property
  **WHEN** the claims handler registers the claim
  **THEN** the system flags the claim for BRF/individual responsibility determination and prompts the handler to record the BRF's building insurance details

- **GIVEN** a claim involves multiple affected apartments in a BRF
  **WHEN** the claims handler identifies additional affected units
  **THEN** the system allows creating linked claims for each affected apartment while maintaining a parent claim for coordination

## Damage Cause Categories

| Category                  | Swedish Term   | Typical Coverage                              |
| ------------------------- | -------------- | --------------------------------------------- |
| Burst pipe                | Sprucket rör   | Hemförsäkring / Villahemförsäkring            |
| Appliance leak            | Maskinläckage  | Hemförsäkring / Villahemförsäkring            |
| Bathroom membrane failure | Tätskiktsbrott | Depends on age and BRF/individual boundary    |
| Frozen pipes              | Frysskada      | Hemförsäkring / Villahemförsäkring            |
| Roof leak                 | Takläckage     | Villahemförsäkring / BRF fastighetsförsäkring |
| External water ingress    | Yttre vatten   | Varies by policy terms                        |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: proper registration ensures claims are not delayed by misclassification
- **FSA-014** — Record keeping: the complete registration record must be retained for 10 years
- **GDPR-003** — Claims processing: personal data collected at registration must follow data minimization; collect only what is necessary

## Dependencies

- Depends on US-HCW-001 (Water Damage FNOL)
- BRF building insurance lookup capability

## Notes

- The damage cause category directly influences the investigation path and coverage determination
- For BRF claims, the claims handler must record both the individual's policy number and the BRF's building insurance policy number
- Multi-apartment claims require a coordinated approach with a single lead claims handler
