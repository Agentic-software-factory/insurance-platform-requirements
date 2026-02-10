# Project Context

> **Shared project knowledge** — committed to the repo so all team members and sessions have the same context.
>
> Updated by workers through PRs. Intake reads this file but never writes to it directly.

## Domain

### Domain Description

TryggFörsäkring AB is a mid-size Swedish insurance company replacing a 15+ year old legacy policy administration system. This project documents the business requirements for the new platform as a Docusaurus documentation site. Business rules are tribal knowledge held by senior staff and must be formalized into structured requirements.

### Key Terms

| Term             | Definition                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| Trafikförsäkring | Mandatory Swedish motor third-party liability insurance                        |
| FSA              | Finansinspektionen — Swedish Financial Supervisory Authority                   |
| IDD              | Insurance Distribution Directive — EU directive on insurance product oversight |
| GDPR             | General Data Protection Regulation — EU data privacy regulation                |

### Stakeholders

| Role                 | Responsibility                                |
| -------------------- | --------------------------------------------- |
| Business analysts    | Primary authors of requirements documentation |
| Product owners       | Prioritize and approve requirements           |
| Internal dev teams   | Primary consumers of the documentation        |
| Compliance and legal | Review regulatory traceability                |
| Underwriters         | Domain experts for insurance rules            |
| Claims handlers      | Domain experts for claims processes           |

## Constraints

- Documentation only — no code delivery
- Insurance domain with complex regulatory landscape (FSA, GDPR, IDD)
- Content authors are non-technical business stakeholders
- Regulatory traceability is mandatory for all user stories and use cases
- Phased delivery: Phase 1 (Motor), Phase 2 (Home & Property), Phase 3 (Commercial)

## Architecture Decisions

| Decision                                | Rationale                                                   | Date        |
| --------------------------------------- | ----------------------------------------------------------- | ----------- |
| Docusaurus for documentation site       | Developer-friendly, versioning support, Markdown/MDX        | Pre-project |
| Versioned phases as Docusaurus versions | Clean separation of delivery phases                         | Pre-project |
| Mermaid for diagrams                    | Native Docusaurus support, text-based, version-controllable | Phase 1     |

## Backlog Status

> Last updated: 2026-02-10

- **Open issues:** See GitHub issue tracker
- **In progress:** See `worker:` labels
- **Completed:** See closed issues

### Recently Completed

- Phase 1 (Motor Insurance) documentation
- Phase 2 (Home & Property) documentation
- CI validators for document structure and cross-references
- Sequence diagrams and state diagrams

### Known Blockers

- None currently

## Lessons Learned

| #   | Lesson                                                                            | Impact                                          |
| --- | --------------------------------------------------------------------------------- | ----------------------------------------------- |
| 1   | Stale git index causes build failures — always use `git status` before operations | Time: avoided repeated CI failures              |
| 2   | Intake process must never run `/next` or start workers                            | Quality: prevents process corruption            |
| 3   | Intake process must never write files directly                                    | Quality: maintains clean separation of concerns |
