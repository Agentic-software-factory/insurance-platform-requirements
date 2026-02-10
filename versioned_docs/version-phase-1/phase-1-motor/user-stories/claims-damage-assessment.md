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

## Assessment Workflow

| Step | Actor           | Action                                          | Next Step |
| ---- | --------------- | ----------------------------------------------- | --------- |
| 1    | Claims Handler  | Assigns damage assessment to adjuster           | 2         |
| 2    | Claims Adjuster | Contacts customer to schedule inspection        | 3         |
| 3    | Claims Adjuster | Inspects vehicle (on-site or at repair shop)    | 4         |
| 4    | Claims Adjuster | Documents damage with photos and description    | 5         |
| 5    | Claims Adjuster | Obtains or prepares repair estimate             | 6         |
| 6    | Claims Adjuster | Evaluates repair vs. total loss                 | 7a or 7b  |
| 7a   | Claims Adjuster | Approves repair estimate (if repair is viable)  | 8         |
| 7b   | Claims Adjuster | Declares total loss and calculates market value | 8         |
| 8    | Claims Adjuster | Submits assessment report to claims handler     | 9         |
| 9    | Claims Handler  | Reviews and accepts or requests re-assessment   | Done      |

### Total Loss Evaluation Criteria

- A vehicle is declared a total loss (totalförlust) when repair cost exceeds the total loss threshold
- Total loss threshold: repair cost > 75% of vehicle market value (configurable)
- Market value is determined using industry valuation tools (e.g., Bilpriser.se, Glass's Guide equivalent)
- Salvage value is assessed separately if the customer wishes to retain the vehicle
- The customer may dispute the market valuation — an independent valuation can be requested

### Remote Assessment (Minor Damage)

- For claims with estimated damage below a configurable threshold (e.g., SEK 15,000), remote assessment via customer-submitted photos and video may be used
- Remote assessment requires a minimum of 6 photos: front, rear, both sides, damage close-up, odometer
- If the adjuster cannot determine the damage extent from photos, an in-person inspection is scheduled

## Damage Assessment Data

| Field                   | Type      | Required       | Description                                             |
| ----------------------- | --------- | -------------- | ------------------------------------------------------- |
| Assessment ID           | String    | Auto-generated | Unique identifier for the assessment                    |
| Claim number            | String    | Yes            | Link to the parent claim                                |
| Assigned adjuster       | Reference | Yes            | The claims adjuster performing the assessment           |
| Inspection date         | Date      | Yes            | When the inspection was performed                       |
| Inspection type         | Enum      | Yes            | On-site, repair shop, or remote                         |
| Damage description      | Text      | Yes            | Detailed description of damage observed                 |
| Affected components     | String[]  | Yes            | List of damaged vehicle parts                           |
| Photos                  | File[]    | Yes            | Minimum 4 photos of damage                              |
| Repair estimate (parts) | Decimal   | Yes            | Cost of replacement parts                               |
| Repair estimate (labor) | Decimal   | Yes            | Cost of labor hours                                     |
| Repair estimate (paint) | Decimal   | Yes            | Cost of paint and finishing                             |
| Repair estimate (total) | Decimal   | Calculated     | Sum of parts + labor + paint                            |
| Repair shop name        | String    | Conditional    | If estimate is from a repair shop                       |
| Repair vs. total loss   | Enum      | Yes            | Adjuster's recommendation                               |
| Vehicle market value    | Decimal   | Conditional    | Required if total loss is being considered              |
| Salvage value           | Decimal   | Conditional    | Required if vehicle is a total loss                     |
| Consistency check       | Boolean   | Yes            | Whether damage is consistent with the reported incident |
| Consistency notes       | Text      | Conditional    | Required if consistency check fails                     |
| Assessment status       | Enum      | Auto-set       | Draft, Submitted, Accepted, Rejected                    |

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
