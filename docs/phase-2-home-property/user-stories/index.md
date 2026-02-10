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

## Home Renewals (Förnyelse)

The [home-renewals user stories](home-renewals.md) cover annual renewal of home
and property insurance policies, including index adjustment, premium
recalculation, renewal notices, and coverage modifications:

| ID     | Actor                  | Summary                                                                 |
| ------ | ---------------------- | ----------------------------------------------------------------------- |
| HRN-01 | Customer               | Receive a renewal notice showing changes in premium and coverage        |
| HRN-02 | Customer               | View year-over-year comparison of coverage and premium                  |
| HRN-03 | Customer               | Modify coverage at renewal (upgrade/downgrade tier, add/remove add-ons) |
| HRN-04 | Customer               | Opt out of automatic renewal before the deadline                        |
| HRN-05 | System                 | Recalculate building sum insured using byggkostnadsindex                |
| HRN-06 | System                 | Recalculate contents sum insured using konsumentprisindex               |
| HRN-07 | System                 | Apply premium adjustments based on claims history and risk changes      |
| HRN-08 | Customer Service Agent | Process renewal modifications for phone customers                       |
| HRN-09 | Underwriter            | Review renewals flagged for significant risk changes                    |
| HRN-10 | System                 | Generate and send renewal notice 30 days before huvudförfallodag        |
