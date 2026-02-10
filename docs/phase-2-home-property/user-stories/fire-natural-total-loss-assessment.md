---
sidebar_position: 33
---

# US-HCF-004: Assess Total Loss vs Partial Loss

## User Story

**As a** claims handler (skadereglerare),
**I want to** assess whether the damage is total loss (totalskada) or partial loss (delskada),
**so that** the correct settlement path is followed.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Property Inspector (Besiktningsman)](../../actors/external/property-inspector.md)

## Priority

**Must Have** — The total loss vs partial loss determination is the most critical decision in fire/natural event claims. It determines whether the customer receives a rebuild/cash settlement or a repair-based settlement.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has been classified
  **WHEN** the claims handler evaluates the damage extent
  **THEN** the system presents the loss classification options: total loss (totalskada) — property is destroyed or damaged beyond economic repair, or partial loss (delskada) — property can be repaired to pre-damage condition

- **GIVEN** the claims handler classifies the damage as total loss
  **WHEN** the system records the determination
  **THEN** the system activates the total loss settlement path: calculate settlement based on rebuild cost (nybyggnadsvärde) or sum insured, and check for underinsurance (underförsäkring)

- **GIVEN** the claims handler classifies the damage as partial loss
  **WHEN** the system records the determination
  **THEN** the system activates the partial loss settlement path: approve repair scope, engage contractors, and calculate settlement based on repair cost minus age deduction

- **GIVEN** the damage extent is uncertain
  **WHEN** the claims handler cannot determine total vs partial loss without expert assessment
  **THEN** the system creates an inspection order for a besiktningsman to assess structural integrity and produce a determination recommendation

- **GIVEN** a total loss determination for a villa
  **WHEN** the system calculates the preliminary settlement range
  **THEN** the system displays: estimated rebuild cost (nybyggnadsvärde), current sum insured (försäkringsbelopp), market value (marknadsvärde), and any underinsurance gap

- **GIVEN** a total loss determination for a bostadsrätt
  **WHEN** the claims handler reviews the claim
  **THEN** the system identifies that BRF building insurance covers the structural damage while the individual policy covers interior fixtures and personal property

## Total Loss Decision Criteria

| Factor                      | Total Loss Indicator                                          | Partial Loss Indicator                             |
| --------------------------- | ------------------------------------------------------------- | -------------------------------------------------- |
| Structural integrity        | Load-bearing structures compromised                           | Structure intact, damage is cosmetic or localized  |
| Repair cost vs rebuild cost | Repair cost exceeds 70-80% of rebuild cost                    | Repair cost is substantially below rebuild cost    |
| Safety assessment           | Property condemned or unsafe for habitation                   | Property habitable after targeted repairs          |
| Environmental contamination | Extensive asbestos or hazardous material requiring demolition | Localized contamination manageable during repair   |
| Building code compliance    | Repair would not bring building to current code               | Repair can meet current building code requirements |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the total loss vs partial loss determination must be made promptly and fairly, based on documented evidence
- **FSA-016** — Building valuation: the settlement must reflect adequate building valuation; underinsurance rules (proportional settlement) apply if the sum insured is below rebuild cost
- **FSA-004** — Consumer protection: the customer must understand the determination and its implications for their settlement
- **FSA-014** — Record keeping: the determination rationale, inspection reports, and cost estimates must be retained for 10 years

## Dependencies

- Depends on US-HCF-001 (Report Fire or Natural Event Emergency)
- Depends on US-HCF-003 (Classify Event Type and Coverage)
- Property inspector (besiktningsman) availability
- Building valuation data (rebuild cost estimates)

## Notes

- Total loss determinations are rare but high-value; they typically involve senior claims handler review
- The 70-80% repair-to-rebuild cost threshold is an industry guideline, not a statutory requirement; each case must be assessed individually
- For older buildings, total loss may be triggered by building code requirements that make repair impractical (e.g., fire safety, energy efficiency upgrades)
- Environmental contamination (asbestos in pre-1980 buildings) can shift a partial loss to total loss due to cleanup costs
