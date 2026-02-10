---
sidebar_position: 34
---

# US-HCF-005: Inspect Property for Structural Integrity

## User Story

**As a** besiktningsman (property inspector),
**I want to** inspect the property for structural integrity after fire or storm,
**so that** safety is confirmed before re-entry and the damage extent is documented.

## Actors

- **Primary:** [Property Inspector (Besiktningsman)](../../actors/external/property-inspector.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Structural inspection after fire or severe storm is a safety requirement. Re-entry without inspection can endanger occupants and expose the insurer to liability.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim requires structural assessment
  **WHEN** the claims handler requests a structural inspection
  **THEN** the system creates an inspection order with the property address, event type, and known damage details, and assigns it to an available besiktningsman

- **GIVEN** an inspection order has been created
  **WHEN** the besiktningsman schedules the inspection
  **THEN** the system records the scheduled date and notifies the customer of the inspection appointment

- **GIVEN** the besiktningsman has completed the inspection
  **WHEN** the besiktningsman submits the inspection report
  **THEN** the system records the report with: structural integrity assessment (safe/unsafe/conditional), load-bearing structure status, roof integrity, utility systems status (electrical, plumbing, gas), and a recommendation for total loss or partial loss classification

- **GIVEN** the inspection report indicates the property is unsafe for re-entry
  **WHEN** the claims handler reviews the report
  **THEN** the system confirms that temporary housing is in effect and records the safety restriction on the claim

- **GIVEN** the inspection report identifies environmental hazards (asbestos, chemicals)
  **WHEN** the claims handler reviews the report
  **THEN** the system flags the claim for specialized environmental cleanup and notifies the claims handler that remediation must occur before further assessment or repair

- **GIVEN** the inspection is complete and the report submitted
  **WHEN** the claims handler reviews the results
  **THEN** the system updates the claim with the inspection findings and advances the claim to the appropriate settlement path (total loss or partial loss)

## Inspection Report Data

| Field                        | Type     | Required | Description                                              |
| ---------------------------- | -------- | -------- | -------------------------------------------------------- |
| Inspection date              | Date     | Yes      | Date of the on-site inspection                           |
| Inspector name and cert. no. | String   | Yes      | Besiktningsman identity and SBR certification            |
| Structural integrity         | Enum     | Yes      | Safe, unsafe, conditionally safe                         |
| Load-bearing assessment      | Text     | Yes      | Status of foundation, walls, beams, and roof structure   |
| Roof integrity               | Enum     | Yes      | Intact, partially damaged, destroyed                     |
| Utility systems              | Object   | Yes      | Status of electrical, plumbing, gas, and heating systems |
| Environmental hazards        | Boolean  | Yes      | Whether asbestos, chemicals, or other hazards were found |
| Hazard details               | Text     | Cond.    | Description of environmental hazards if found            |
| Loss classification          | Enum     | Yes      | Inspector's recommendation: total loss or partial loss   |
| Estimated damage cost        | Currency | No       | Preliminary cost estimate if determinable                |
| Photos and documentation     | Files    | Yes      | Photographic evidence of structural condition            |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: structural inspection must not cause undue delay; inspections should be scheduled within 48 hours for fire claims
- **FSA-014** — Record keeping: inspection reports must be retained as part of the claim file for 10 years
- **GDPR-008** — Restoration company data sharing: property details shared with the besiktningsman must be limited to what is necessary for the inspection
- **FSA-016** — Building valuation: the inspection informs the rebuild cost assessment for total loss scenarios

## Dependencies

- Depends on US-HCF-001 (Report Fire or Natural Event Emergency)
- Depends on US-HCF-003 (Classify Event Type and Coverage)
- Property inspector (besiktningsman) availability
- Räddningstjänsten clearance for site access (for fire-damaged properties)

## Notes

- After a fire, räddningstjänsten must clear the property before any inspection can take place; this can take hours to days
- Structural inspections after storms focus on roof damage, water ingress points, and foundation stability
- In older buildings (pre-1980), the inspector should specifically check for asbestos-containing materials disturbed by the event
- The inspection report is a key input for the total loss vs partial loss determination (US-HCF-004)
