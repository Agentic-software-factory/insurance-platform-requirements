---
sidebar_position: 1
---

# Use Cases

Use cases for Phase 2 — Home & Property Insurance. Each use case describes an
end-to-end business process with main success scenario, alternative flows,
business rules, non-functional requirements, and regulatory compliance mapping.

## Quote and Bind

The [Quote and Bind Home Insurance](quote-and-bind.md) use case (UC-HQB-001)
describes the complete flow from address entry through policy issuance. It
covers:

- Address entry and property data lookup via Lantmäteriet
- Automated property risk assessment
- Demands-and-needs assessment (IDD-011)
- BRF coverage gap analysis (for bostadsrättsförsäkring)
- Premium calculation and coverage tier comparison
- Add-on selection (allrisk/drulle, ID-skydd)
- BankID digital signing
- Policy issuance and confirmation delivery
- Agent-assisted and high-risk alternative flows

## Policy Administration (MTAs)

Mid-term adjustment and policy lifecycle use cases — see
[Policy Administration Use Cases](policy-administration.md).

| ID         | Title                                 | Primary Actor   |
| ---------- | ------------------------------------- | --------------- |
| UC-HPA-001 | Mid-Term Policy Modification          | Customer        |
| UC-HPA-002 | BRF Building Insurance Administration | BRF Board Chair |
| UC-HPA-003 | Family Member Management              | Customer        |

## Water Damage Claims (Vattenskada)

| ID                                         | Title                        | Scope                                                                                         |
| ------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------- |
| [UC-HCW-001](uc-water-damage-lifecycle.md) | Water Damage Claim Lifecycle | End-to-end flow from FNOL through emergency response, drying, repair, settlement, and closure |

## Fire & Natural Events (Brand/Naturhändelser)

| ID                                               | Title                              | Scope                                                                                                                         |
| ------------------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [UC-HCF-001](uc-fire-natural-event-lifecycle.md) | Fire/Natural Event Claim Lifecycle | End-to-end flow from emergency FNOL through structural assessment, total/partial loss determination, restoration, and closure |

## Burglary and Theft

The [Burglary Claim Processing](burglary-and-theft.md) use case (UC-HCB-001)
describes the complete flow from burglary report through settlement. It covers:

- Emergency locksmith dispatch and home security
- Police report (polisanmälan) requirements
- FNOL registration with fraud screening
- Stolen property inventory and high-value item verification
- Settlement calculation with åldersavdrag and sub-limits
- Break-in damage repair via partner network
- Allrisk/drulle simplified claims process
- Crisis support (krisstöd) for burglary victims
