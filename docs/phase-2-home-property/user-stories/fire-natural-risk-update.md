---
sidebar_position: 41
---

# US-HCF-012: Flag Property for Updated Risk Assessment

## User Story

**As the** system,
**I want to** flag the property and area for updated risk assessment after a fire or natural event,
**so that** underwriting reflects the new risk data and reserves are adjusted accordingly.

## Actors

- **Primary:** System
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Fire and natural event claims data is essential for catastrophe risk modeling and underwriting accuracy. Without updated risk data, the insurer cannot price risk correctly or maintain adequate reserves.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has been closed
  **WHEN** the system records the claim for risk assessment
  **THEN** the system captures: event type, cause, total claim cost, property type, property age, geographic location (municipality and postal code), restoration duration, and loss classification (total/partial)

- **GIVEN** a natural event claim is linked to a catastrophe event record
  **WHEN** the system updates risk data
  **THEN** the system aggregates all claims for the event and records: total number of claims, total cost, geographic spread, event severity category, and peril type for catastrophe reserve reporting

- **GIVEN** the claim data has been recorded
  **WHEN** the renewal cycle approaches for the affected policy
  **THEN** the underwriting system can access the claims history to assess whether a premium adjustment is warranted based on the fire/natural event

- **GIVEN** a geographic area has experienced a significant natural event
  **WHEN** the system detects a cluster of claims in a postal code or municipality
  **THEN** the system generates a risk alert for underwriting review, flagging the area for potential portfolio-wide reassessment

- **GIVEN** the claim data is available for risk modeling
  **WHEN** the actuarial team accesses the data
  **THEN** the system provides aggregated and anonymized claim data by: peril type, geographic zone, property type, property age, and loss severity for use in catastrophe models and pricing

## Risk Assessment Data

| Data Point           | Description                                    | Use in Underwriting                    |
| -------------------- | ---------------------------------------------- | -------------------------------------- |
| Event type           | Fire, storm, flood, lightning, explosion       | Risk factor by peril type              |
| Cause                | Electrical fault, arson, weather, etc.         | Cause-based risk modeling              |
| Total claim cost     | All costs including rebuild, temporary housing | Loss ratio and severity analysis       |
| Property type        | Villa, bostadsrätt, hyresrätt                  | Risk segmentation                      |
| Property age         | Construction year                              | Age-related risk curves                |
| Geographic location  | Municipality and postal code                   | Regional risk and catastrophe mapping  |
| Restoration duration | Days from FNOL to closure                      | Claims efficiency and severity metrics |
| Loss classification  | Total loss or partial loss                     | Severity distribution                  |
| Catastrophe link     | Whether part of a multi-claim event            | Catastrophe reserve adequacy           |

## Regulatory

- **FSA-018** — Natural disaster reserves: claims data by peril type and geography must support catastrophe reserve calculations and FSA reporting
- **FSA-005** — Product governance: claims data must be available for product reviews to ensure products continue to meet customer needs and are priced adequately
- **FSA-003** — Solvency II compliance: catastrophe risk exposure data supports SCR calculations for natural catastrophe risk
- **FSA-014** — Record keeping: risk assessment data derived from claims must be retained for 10 years
- **GDPR-003** — Claims processing: claims data used for risk assessment should use aggregated or anonymized data where possible for statistical analysis

## Dependencies

- Depends on all prior user stories in the fire/natural event claims lifecycle
- Underwriting risk model integration
- Actuarial catastrophe modeling tools
- Geographic information system (GIS) for regional risk mapping

## Notes

- Fire and natural event claims data is particularly valuable for catastrophe risk modeling due to their high severity and geographic correlation
- Climate change is increasing the frequency of storm and flood events in Sweden; historical data must be supplemented with forward-looking climate risk models
- The Gävle 2021 flooding demonstrated the importance of aggregate exposure monitoring; a single event caused hundreds of claims
- Risk updates should be available at both individual property level (for renewals) and portfolio level (for catastrophe reserves)
