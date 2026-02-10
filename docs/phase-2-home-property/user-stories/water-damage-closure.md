---
sidebar_position: 24
---

# US-HCW-015: Close Claim and Record for Risk Assessment

## User Story

**As the** system,
**I want to** record the completed water damage claim for future risk assessment,
**so that** underwriting can adjust premiums and risk models based on claims experience.

## Actors

- **Primary:** System
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Claims data feeds into underwriting risk models and pricing, which is essential for portfolio sustainability.

## Acceptance Criteria

- **GIVEN** a water damage claim has been fully settled and restoration verified
  **WHEN** the claims handler initiates claim closure
  **THEN** the system performs a final validation that all required documentation is complete: FNOL, moisture reports, torkprotokoll, settlement calculation, payment confirmation, and customer sign-off

- **GIVEN** all closure validations pass
  **WHEN** the system closes the claim
  **THEN** the system sets the claim status to "Closed" (Avslutad), records the total claim cost (drying + repair + temporary housing), and updates the property's claims history

- **GIVEN** a claim has been closed
  **WHEN** the system updates risk assessment data
  **THEN** the system records: claim cause category, total cost, property type, property age, BRF vs individual, restoration duration, and geographic location for use in underwriting risk models

- **GIVEN** the claim data has been recorded
  **WHEN** the renewal cycle approaches for the affected policy
  **THEN** the underwriting system can access the claims history to assess whether a premium adjustment is warranted

- **GIVEN** a closed claim is reopened due to recurrence or quality issue
  **WHEN** the claims handler reopens the claim
  **THEN** the system reverts the status, links the reopening to the original claim, and retains the original closure record

## Claims Data for Risk Assessment

| Data Point           | Description                                           | Use in Underwriting          |
| -------------------- | ----------------------------------------------------- | ---------------------------- |
| Cause category       | Burst pipe, appliance leak, membrane failure, etc.    | Risk factor by cause type    |
| Total claim cost     | All costs including drying, repair, temporary housing | Loss ratio analysis          |
| Property type        | Villa, bostadsrätt, hyresrätt                         | Risk segmentation            |
| Property age         | Construction year                                     | Age-related risk curves      |
| Geographic location  | Municipality and postal code                          | Regional risk mapping        |
| Restoration duration | Days from FNOL to closure                             | Claims efficiency metrics    |
| BRF involvement      | Whether the claim involved BRF coordination           | Multi-party claim complexity |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: claim closure must be communicated to the customer with a clear summary
- **FSA-014** — Record keeping: the complete claims file must be retained for 10 years after closure
- **FSA-005** — Product governance: claims data must be available for product reviews to ensure products continue to meet customer needs
- **GDPR-003** — Claims processing: claims data used for risk assessment must follow data minimization; use aggregated or anonymized data where possible for statistical analysis

## Dependencies

- Depends on US-HCW-011 (Calculate Settlement With Age Deduction) — settlement must be processed
- Depends on US-HCW-014 (Verify Restoration via Final Inspection) — restoration must be verified
- Underwriting risk model integration

## Notes

- Water damage claims data is particularly valuable for underwriting because of the high frequency and significant variation in costs
- Property age and type are strong predictors of water damage risk
- Claims history affects the individual customer's premium at renewal but also feeds into portfolio-level risk assessment
