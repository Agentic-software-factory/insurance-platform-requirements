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
