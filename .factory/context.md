# Project Context

> **Shared project knowledge** — committed to the repo so all team members and sessions have the same context.
>
> Updated by workers through PRs. Intake reads this file but never writes to it directly.

## Domain

### Domain Description

TryggFörsäkring AB is a mid-size Swedish insurance company replacing a 15+ year old legacy policy administration system. This project documents business requirements as a Docusaurus documentation site — no code delivery.

### Key Terms

| Term             | Definition                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| Trafikförsäkring | Mandatory Swedish motor third-party liability insurance                        |
| FSA              | Finansinspektionen — Swedish Financial Supervisory Authority                   |
| IDD              | Insurance Distribution Directive — EU directive on insurance product oversight |
| GDPR             | General Data Protection Regulation — EU data privacy regulation                |

### Stakeholders

| Role               | Responsibility                                    |
| ------------------ | ------------------------------------------------- |
| Business analysts  | Primary authors of requirements documentation     |
| Product owners     | Define priorities and acceptance criteria         |
| Internal dev teams | Primary consumers of requirements                 |
| Compliance team    | Regulatory review and approval                    |
| Underwriters       | Domain expertise for motor and property insurance |
| Claims handlers    | Domain expertise for claims processes             |

## Constraints

- Documentation only — no code delivery
- Insurance domain with complex regulatory landscape (FSA, GDPR, IDD)
- Content authors are non-technical business stakeholders
- Regulatory traceability is mandatory for every user story and use case
- Phased delivery: Phase 1 (Motor), Phase 2 (Home & Property), Phase 3 (Commercial)

## Architecture Decisions

| Decision                         | Rationale                             | Date       |
| -------------------------------- | ------------------------------------- | ---------- |
| Docusaurus 3.x for documentation | Dev-consumable, versioned, searchable | 2026-02-01 |
| Phases as Docusaurus versions    | Clean separation of delivery phases   | 2026-02-01 |
| Mermaid for diagrams             | Native Docusaurus support, text-based | 2026-02-01 |

## Backlog Status

> Last updated: 2026-02-10

- **Open issues:** See `gh issue list --label task --state open`
- **In progress:** See `gh issue list --label task --state open` with `worker:` labels
- **Completed:** See `gh issue list --label task --state closed`

### Recently Completed

- Phase 1 (Motor) and Phase 2 (Home & Property) requirements documented
- CI validation (markdownlint, prettier, build, regulatory checks)
- Mermaid diagrams for process flows
- Evidence package for Phase 1 & 2 delivery

### Known Blockers

- None currently

## Lessons Learned

| #   | Lesson                                                                       | Impact  |
| --- | ---------------------------------------------------------------------------- | ------- |
| 1   | Stale git index causes build failures — always run `git status` before build | Time    |
| 2   | Intake must never run `/next` or start workers — separate concerns           | Quality |
| 3   | Intake must never write files — read-only process, output to GitHub Issues   | Quality |
