# Project Context

> **Shared project knowledge** — committed to the repo so all team members and sessions have the same context.
>
> Updated by workers through PRs. Intake reads this file but never writes to it directly.

## Domain

### Domain Description

TryggFörsäkring AB is a mid-size Swedish insurance company replacing a 15+ year old legacy policy administration system. This project documents business requirements as a Docusaurus documentation site. No code delivery — the output is structured requirements for internal development teams.

### Key Terms

| Term                     | Definition                                                                     |
| ------------------------ | ------------------------------------------------------------------------------ |
| Trafikförsäkring         | Mandatory third-party motor liability insurance required by Swedish law        |
| FSA (Finansinspektionen) | Swedish Financial Supervisory Authority                                        |
| IDD                      | Insurance Distribution Directive — EU directive on insurance product oversight |
| GDPR                     | General Data Protection Regulation — EU data privacy regulation                |
| Motor Insurance          | Personal motor vehicle insurance policies (Phase 1 scope)                      |
| Home & Property          | Homeowner and property insurance (Phase 2 scope)                               |
| Commercial               | Business policies, liability, fleet insurance (Phase 3 scope)                  |

### Stakeholders

| Role                 | Responsibility                                     |
| -------------------- | -------------------------------------------------- |
| Business analysts    | Primary authors of requirements documentation      |
| Product owners       | Prioritize and approve requirements                |
| Internal dev teams   | Primary consumers — build the replacement platform |
| Compliance and legal | Review regulatory traceability                     |
| Underwriters         | Domain experts for pricing and risk assessment     |
| Claims handlers      | Domain experts for claims processes                |

## Constraints

- Documentation only — no code delivery
- Insurance domain with complex regulatory landscape (FSA, GDPR, IDD)
- Content authors are non-technical business stakeholders
- Regulatory traceability is mandatory for every user story and use case
- Phased delivery: Phase 1 (Motor), Phase 2 (Home & Property), Phase 3 (Commercial)
- Both `versioned_docs/` and `docs/` directories must be kept in sync

## Architecture Decisions

| Decision                        | Rationale                                                   | Date              |
| ------------------------------- | ----------------------------------------------------------- | ----------------- |
| Docusaurus for documentation    | Developer-friendly, versioned docs, MDX support             | Project inception |
| Phased versioning               | Each business phase = Docusaurus version snapshot           | Project inception |
| Mermaid for diagrams            | Native Docusaurus support, text-based, version-controllable | 2026-02           |
| CI validators for doc structure | Automated cross-reference, sync, and structure validation   | 2026-02           |

## Backlog Status

> Last updated: 2026-02-10

- **Phase 1 (Motor):** Complete — user stories, use cases, regulatory mapping, diagrams
- **Phase 2 (Home & Property):** Complete — actors, personas, user stories, use cases, regulatory
- **Supporting docs:** Glossary, regulatory framework, architecture docs, lessons learned

### Recently Completed

- Sequence diagrams and state diagrams for key flows
- Cross-reference and sync validation in CI
- Document structure validators in CI
- Evidence package for Phase 1 & 2 delivery
- Lessons learned (LESSON-001 through LESSON-003)

### Known Blockers

- None currently

## Lessons Learned

| #   | Lesson                                                            | Impact                           |
| --- | ----------------------------------------------------------------- | -------------------------------- |
| 1   | Stale git index can cause build failures — always use fresh index | Time — wasted CI cycles          |
| 2   | Intake must never run /next or start workers                      | Process — separation of concerns |
| 3   | Intake must never write files — output is GitHub Issues only      | Process — read-only intake       |
