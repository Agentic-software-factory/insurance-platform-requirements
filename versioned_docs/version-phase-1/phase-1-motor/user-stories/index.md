---
sidebar_position: 1
---

# User Stories

User stories for Phase 1 — Motor Insurance. Each user story follows the format
"As a [actor], I want to [action], so that [benefit]" and includes acceptance
criteria in Given/When/Then format, data requirements, external integration
points, and regulatory traceability.

## Quote and Bind

The [quote-and-bind user stories](quote-and-bind.md) cover the primary sales
flow from initial customer inquiry through policy issuance:

| ID     | Actor            | Summary                                   |
| ------ | ---------------- | ----------------------------------------- |
| QNB-01 | Private Customer | Get a quick quote by registration number  |
| QNB-02 | Insurance Agent  | Create a quote on behalf of a customer    |
| QNB-03 | System           | Perform demands-and-needs assessment      |
| QNB-04 | Private Customer | Compare coverage tiers side by side       |
| QNB-05 | Private Customer | Sign policy with BankID                   |
| QNB-06 | Private Customer | Receive insurance certificate immediately |
| QNB-07 | Underwriter      | Apply bonus class rules automatically     |
| QNB-08 | System           | Notify Transportstyrelsen of new policy   |
