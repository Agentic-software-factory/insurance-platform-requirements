---
sidebar_position: 14
---

# US-CLM-005: Assess Vehicle Damage

## User Story

**As a** claims adjuster (värderare),
**I want to** record damage assessment results with photos and repair estimates,
**so that** the settlement is well-documented and based on accurate valuations.

## Actors

- **Primary:** [Claims Adjuster (Värderare)](../../actors/internal-actors.md#claims-adjuster-värderare)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare), [Repair Shop (Verkstad)](../../actors/external-actors.md#repair-shop-verkstad)

## Priority

**Must Have** — Damage assessment determines whether the vehicle is repaired or declared a total loss, and drives settlement amounts.

## Acceptance Criteria

- **GIVEN** a claim requires damage assessment
  **WHEN** the claims handler assigns the assessment
  **THEN** the system assigns the assessment to a claims adjuster and notifies the adjuster with the claim details and customer contact information

- **GIVEN** a claims adjuster inspects the vehicle
  **WHEN** the adjuster records the assessment
  **THEN** the system captures: damage description, affected components, repair estimate (parts and labor), photos of damage, and the adjuster's assessment of whether the damage is consistent with the reported incident

- **GIVEN** a repair shop provides a repair estimate
  **WHEN** the adjuster reviews the estimate
  **THEN** the system allows the adjuster to upload the repair shop estimate, compare it against market rates, and approve or adjust the estimate

- **GIVEN** repair costs exceed a configurable percentage of the vehicle's market value
  **WHEN** the adjuster records the assessment
  **THEN** the system flags the vehicle for total loss evaluation and calculates the vehicle's current market value

- **GIVEN** a vehicle is assessed as a total loss (totalförlust)
  **WHEN** the adjuster records the total loss decision
  **THEN** the system calculates the settlement amount as the vehicle's market value minus the deductible (självrisk) and minus any salvage value

- **GIVEN** the assessment is complete
  **WHEN** the adjuster submits the assessment report
  **THEN** the system attaches the report to the claim record and notifies the claims handler that the assessment is ready for review

## Damage Assessment Data

| Field                 | Required    | Description                                             |
| --------------------- | ----------- | ------------------------------------------------------- |
| Damage description    | Yes         | Detailed description of damage observed                 |
| Affected components   | Yes         | List of damaged vehicle parts                           |
| Repair estimate       | Yes         | Cost breakdown: parts, labor, paint                     |
| Photos                | Yes         | Minimum required photos of damage                       |
| Repair vs. total loss | Yes         | Adjuster's recommendation                               |
| Market value          | Conditional | Required if total loss is being considered              |
| Salvage value         | Conditional | Required if vehicle is a total loss                     |
| Consistency check     | Yes         | Whether damage is consistent with the reported incident |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: damage assessment must be performed promptly and objectively; the assessment must support fair settlement
- **FSA-014** — Record keeping: assessment reports, photos, and estimates must be retained for 10 years
- **GDPR-003** — Claims processing: photos must capture damage only; incidental capture of bystanders or non-relevant personal data should be avoided
- **GDPR-001** — Customer and third-party data processed during assessment must follow data minimization principles

## Dependencies

- Depends on US-CLM-002 (Claim Registration) and US-CLM-003 (Coverage Verification)
- Repair shop integration for estimates and repair authorization

## Notes

- For glass-only claims (glasskada), a simplified assessment process may apply where the customer goes directly to an authorized glass repair shop without a separate adjuster inspection
- Remote assessment via customer-submitted photos and video may be used for minor damage to reduce cycle time
