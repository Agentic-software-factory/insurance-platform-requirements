---
sidebar_position: 1
---

# Introduction

Business requirements documentation for **TryggFörsäkring AB**, a mid-size
Swedish insurance company replacing a 15+ year old legacy policy administration
system. This site formalizes the business rules, processes, and regulatory
obligations that internal development teams need to build the new platform.

## Why This Documentation Exists

The current policy administration system has been in production for over 15
years. Business rules are undocumented and exist as tribal knowledge held by
senior staff. Without formalized requirements, the internal development teams
cannot design or build a replacement with confidence. This documentation bridges
that gap.

## Target Audiences

This documentation serves four audiences. Each interacts with the content
differently.

### Business Analysts and Product Owners

**Role:** Primary authors of user stories and use cases.

Use this site to draft and maintain requirements using the structured hierarchy
described below. Ensure every user story includes acceptance criteria and
regulatory references.

### Internal Development Teams

**Role:** Primary consumers of the requirements.

Use this site as the single source of truth for what the platform must do. Each
user story contains acceptance criteria in Given/When/Then format, and use cases
provide detailed interaction flows. Regulatory identifiers (e.g., FSA-001,
GDPR-003) link each requirement to its compliance obligation.

### Compliance and Legal Team

**Role:** Reviewers of regulatory traceability.

Every requirement maps to applicable regulations from
[FSA](regulatory/fsa-requirements.md), [GDPR](regulatory/gdpr-mapping.md), and
[IDD](regulatory/idd-compliance.md). Use the regulatory section to verify
coverage and identify gaps.

### Underwriters and Claims Handlers

**Role:** Domain experts who validate business rules.

Review user stories and use cases for accuracy against current business
practices. Flag any rules that are missing, outdated, or incorrectly captured.

## Documentation Structure

Requirements follow a four-level hierarchy:

```text
Actors → Personas → User Stories → Use Cases
```

| Level            | Purpose                                                                              | Example                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Actors**       | External entities that interact with the system                                      | Customer, Transportstyrelsen, Claims Adjuster                                                    |
| **Personas**     | Named representations of actors with specific goals and contexts                     | "Erik, 35, first-time car buyer comparing policies online"                                       |
| **User Stories** | High-level needs in _"As a \<persona\>, I want \<goal\> so that \<benefit\>"_ format | "As Erik, I want to get a motor insurance quote so that I can compare prices"                    |
| **Use Cases**    | Detailed interaction flows with preconditions, steps, and postconditions             | Quote creation flow: vehicle lookup → risk assessment → premium calculation → offer presentation |

Each level builds on the previous one. Actors define _who_, personas add _why_,
user stories capture _what_, and use cases describe _how_.

## Phased Delivery

The platform replacement is delivered in three phases, each expanding the
product scope.

| Phase                         | Scope                           | Key Topics                                                                                                     |
| ----------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Phase 1 — Motor Insurance** | Personal motor policies         | Quotes, policy administration, claims, renewals, cancellations, trafikförsäkring, underwriting and bonus rules |
| **Phase 2 — Home & Property** | Homeowner and property policies | Quotes, policy administration, water damage, fire/natural events, burglary/theft claims                        |
| **Phase 3 — Commercial**      | Business insurance              | Liability coverage, fleet insurance, commercial property                                                       |

Phase 1 is complete. Phase 2 documentation is in progress — quote and bind,
policy administration, and claims handling (water damage, fire/natural events,
burglary/theft) are documented. Phase 3 will be documented as the project
progresses.

## Regulatory Traceability

All requirements include traceability to applicable Swedish and EU regulations.
Three regulatory frameworks apply:

| Regulation                                 | Scope                                                                    | Reference                                          |
| ------------------------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------- |
| **FSA (Finansinspektionen)**               | Solvency, consumer protection, reporting, conduct of business            | [FSA Requirements](regulatory/fsa-requirements.md) |
| **GDPR**                                   | Personal data handling, consent, right to erasure, data portability      | [GDPR Data Mapping](regulatory/gdpr-mapping.md)    |
| **IDD (Insurance Distribution Directive)** | Product governance, demands-and-needs assessment, disclosure obligations | [IDD Compliance](regulatory/idd-compliance.md)     |

Every user story and use case includes a **Regulatory** field that references
the applicable requirement IDs (e.g., FSA-001, GDPR-003, IDD-007). This ensures
that no regulatory obligation is overlooked during implementation.

## How to Navigate This Site

- **Start here** to understand the project context and documentation approach.
- **Actors and Personas** define the people and systems involved.
- **[Phase 1 — Motor](phase-1-motor/index.md)** covers personal motor
  insurance policies.
- **[Phase 2 — Home & Property](phase-2-home-property/index.md)** covers
  hemförsäkring, villahemförsäkring, bostadsrättsförsäkring, and
  fritidshusförsäkring.
- **Regulatory section** provides the full compliance requirements that user
  stories reference.
- **Glossary** defines Swedish insurance terms and domain-specific vocabulary.
