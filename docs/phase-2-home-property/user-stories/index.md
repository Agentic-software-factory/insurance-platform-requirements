---
sidebar_position: 1
---

# User Stories

User stories for Phase 2 — Home & Property Insurance. Each user story follows
the format "As a [actor], I want to [action], so that [benefit]" and includes
acceptance criteria in Given/When/Then format, data requirements, external
integration points, and regulatory traceability.

## Quote and Bind

The [quote-and-bind user stories](quote-and-bind.md) cover the primary sales
flow from initial customer inquiry through policy issuance:

| ID     | Actor                  | Summary                                                             |
| ------ | ---------------------- | ------------------------------------------------------------------- |
| HQB-01 | Customer               | Get a home insurance quote by entering address and living situation |
| HQB-02 | Customer               | Compare coverage tiers (bas/standard/premium)                       |
| HQB-03 | BRF Member             | Understand BRF building insurance vs personal coverage              |
| HQB-04 | Customer               | Add allrisk/drulle coverage to the policy                           |
| HQB-05 | Customer               | Sign the policy with BankID                                         |
| HQB-06 | Customer Service Agent | Create a home quote on behalf of a phone customer                   |
| HQB-07 | Underwriter            | Auto-assess risk based on property data                             |
| HQB-08 | Underwriter            | Review flagged high-risk quotes                                     |
| HQB-09 | System                 | Verify property address via Lantmäteriet                            |
| HQB-10 | System                 | Calculate premium based on rating factors                           |

## Water Damage Claims (Vattenskada)

Water damage is the most common home insurance claim in Sweden (~100,000 per
year). These user stories cover the complete water damage claim lifecycle from
emergency FNOL through restoration and settlement.

### FNOL and Emergency

| ID                                         | Title                                         | Priority  |
| ------------------------------------------ | --------------------------------------------- | --------- |
| [US-HCW-001](water-damage-fnol.md)         | Report Water Damage Emergency (24/7)          | Must Have |
| [US-HCW-002](water-damage-dispatch.md)     | Dispatch Restoration Company (Saneringsfirma) | Must Have |
| [US-HCW-003](water-damage-registration.md) | Register FNOL With Damage Classification      | Must Have |

### Investigation and Assessment

| ID                                               | Title                                      | Priority    |
| ------------------------------------------------ | ------------------------------------------ | ----------- |
| [US-HCW-004](water-damage-moisture-report.md)    | Receive Moisture Measurement Report        | Must Have   |
| [US-HCW-005](water-damage-brf-responsibility.md) | Determine BRF vs Individual Responsibility | Must Have   |
| [US-HCW-006](water-damage-inspection.md)         | Document Damage With Inspection            | Should Have |

### Restoration Process

| ID                                              | Title                                         | Priority    |
| ----------------------------------------------- | --------------------------------------------- | ----------- |
| [US-HCW-007](water-damage-drying-progress.md)   | Track Drying Progress                         | Should Have |
| [US-HCW-008](water-damage-drying-protocol.md)   | Submit Drying Protocol (Torkprotokoll)        | Must Have   |
| [US-HCW-009](water-damage-repair-approval.md)   | Approve Repair Scope and Contractor           | Must Have   |
| [US-HCW-010](water-damage-temporary-housing.md) | Arrange Temporary Housing (Evakueringsboende) | Must Have   |

### Settlement

| ID                                        | Title                                           | Priority  |
| ----------------------------------------- | ----------------------------------------------- | --------- |
| [US-HCW-011](water-damage-settlement.md)  | Calculate Settlement With Age Deduction         | Must Have |
| [US-HCW-012](water-damage-deductible.md)  | View Deductible (Självrisk) for Claim           | Must Have |
| [US-HCW-013](water-damage-cross-claim.md) | Coordinate Cross-Claim Payment (BRF/Individual) | Must Have |

### Closure

| ID                                             | Title                                      | Priority    |
| ---------------------------------------------- | ------------------------------------------ | ----------- |
| [US-HCW-014](water-damage-final-inspection.md) | Verify Restoration via Final Inspection    | Should Have |
| [US-HCW-015](water-damage-closure.md)          | Close Claim and Record for Risk Assessment | Must Have   |

## Fire & Natural Events (Brand/Naturhändelser)

Fire, storm, flood, lightning, and other natural event claims are low-frequency but
high-severity. These user stories cover the complete fire/natural event claim
lifecycle including emergency FNOL, structural inspection, total/partial loss
assessment, environmental hazard remediation, rebuild or repair coordination,
temporary housing, multi-unit coordination, and subrogation.

### Emergency & FNOL

| ID                                                 | Title                                    | Priority  |
| -------------------------------------------------- | ---------------------------------------- | --------- |
| [US-HCF-001](fire-natural-fnol.md)                 | Report Fire or Natural Event Emergency   | Must Have |
| [US-HCF-002](fire-natural-incident-report.md)      | Obtain Räddningstjänsten Incident Report | Must Have |
| [US-HCF-003](fire-natural-event-classification.md) | Classify Event Type and Coverage         | Must Have |

### Assessment

| ID                                                  | Title                                     | Priority    |
| --------------------------------------------------- | ----------------------------------------- | ----------- |
| [US-HCF-004](fire-natural-total-loss-assessment.md) | Assess Total Loss vs Partial Loss         | Must Have   |
| [US-HCF-005](fire-natural-structural-inspection.md) | Inspect Property for Structural Integrity | Must Have   |
| [US-HCF-006](fire-natural-environmental-hazards.md) | Check for Environmental Hazards           | Should Have |

### Settlement & Restoration

| ID                                                    | Title                                              | Priority  |
| ----------------------------------------------------- | -------------------------------------------------- | --------- |
| [US-HCF-007](fire-natural-valuation.md)               | Explain Rebuild Cost vs Market Value Settlement    | Must Have |
| [US-HCF-008](fire-natural-contractor-coordination.md) | Coordinate Contractors for Rebuild or Repair       | Must Have |
| [US-HCF-009](fire-natural-temporary-housing.md)       | Provide Continued Temporary Housing During Rebuild | Must Have |
| [US-HCF-010](fire-natural-multi-unit.md)              | Manage Multi-Unit Claims                           | Must Have |

### Closure

| ID                                        | Title                                               | Priority    |
| ----------------------------------------- | --------------------------------------------------- | ----------- |
| [US-HCF-011](fire-natural-subrogation.md) | Process Subrogation Against Responsible Third Party | Should Have |
| [US-HCF-012](fire-natural-risk-update.md) | Flag Property for Updated Risk Assessment           | Must Have   |

## Burglary and Theft

The [burglary-and-theft user stories](burglary-and-theft.md) cover claims
processing for break-ins, stolen property, allrisk/drulle claims, and
post-burglary support:

| ID     | Actor          | Summary                                                          |
| ------ | -------------- | ---------------------------------------------------------------- |
| HCB-01 | Customer       | Report a burglary and get emergency locksmith dispatch           |
| HCB-02 | Customer       | Get guidance on filing a polisanmälan                            |
| HCB-03 | Claims Handler | Register burglary FNOL with police report number                 |
| HCB-04 | Claims Handler | Request stolen property inventory from the customer              |
| HCB-05 | Claims Handler | Verify high-value items against prior declarations               |
| HCB-06 | Claims Handler | Screen burglary claim for fraud indicators                       |
| HCB-07 | Claims Handler | Calculate replacement cost with åldersavdrag                     |
| HCB-08 | Customer       | Understand sub-limits for property categories                    |
| HCB-09 | Claims Handler | Arrange lock replacement and window repair                       |
| HCB-10 | Customer       | Claim for accidentally damaged or lost property (allrisk/drulle) |
| HCB-11 | Claims Handler | Process drulle claims with simplified assessment                 |
| HCB-12 | Customer       | Access krisstöd (crisis support) after a burglary                |
