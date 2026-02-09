---
sidebar_position: 1
---

# Use Cases

Use cases for Phase 1 — Motor Insurance. Each use case describes an end-to-end
business process with main success scenario, alternative flows, business rules,
non-functional requirements, and regulatory compliance mapping.

## Quote and Bind

The [Quote and Bind Motor Insurance](quote-and-bind.md) use case (UC-QNB-001)
describes the complete flow from customer identification through policy
issuance and Transportstyrelsen notification. It covers:

- Customer identification and vehicle data lookup
- Demands-and-needs assessment (IDD-001)
- Premium calculation and coverage comparison
- BankID digital signing
- Policy issuance and insurance certificate delivery
- Transportstyrelsen notification
- Agent-assisted and broker-assisted alternative flows

## Policy Administration (MTAs)

Mid-term adjustment and policy lifecycle use cases — see [Policy Administration Use Cases](policy-administration.md).

| ID        | Title                                     | Primary Actor |
| --------- | ----------------------------------------- | ------------- |
| UC-PA-001 | Process Mid-Term Vehicle Change           | Customer      |
| UC-PA-002 | Process Coverage Tier Change              | Customer      |
| UC-PA-003 | Process Named Driver Change               | Customer      |
| UC-PA-004 | Manage Policy Status Transitions          | System        |
| UC-PA-005 | Recalculate Premium After Amendment       | System        |
| UC-PA-006 | Underwriter Review of High-Risk Amendment | Underwriter   |
