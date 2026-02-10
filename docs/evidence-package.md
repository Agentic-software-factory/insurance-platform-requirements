---
sidebar_position: 100
---

# Evidence Package

Delivery evidence for the TryggFörsäkring Insurance Platform Requirements project,
covering Phase 1 (Motor Insurance), Phase 2 (Home & Property), platform evaluation,
and CI/CD infrastructure.

## 1. Working Increment

**Live site:**
[agentic-software-factory.github.io/insurance-platform-requirements](https://agentic-software-factory.github.io/insurance-platform-requirements/)

### Content Summary

| Metric           | Count                                |
| ---------------- | ------------------------------------ |
| Markdown files   | 229 (146 docs/ + 83 versioned_docs/) |
| User stories     | 67 (33 Phase 1 + 34 Phase 2)         |
| Use cases        | 24 (14 Phase 1 + 10 Phase 2)         |
| Personas         | 11                                   |
| Glossary terms   | 110                                  |
| Mermaid diagrams | 47                                   |

### Phase 1 — Motor Insurance (7 epics)

| Epic               | User Stories | Use Cases                                                          |
| ------------------ | ------------ | ------------------------------------------------------------------ |
| Cancellation       | 12           | 2 (processing, refund calculation)                                 |
| Claims             | 15           | 7 (lifecycle, FNOL, damage, liability, fraud, settlement, closure) |
| Policy admin       | 1            | 1                                                                  |
| Quote & bind       | 1            | 1                                                                  |
| Renewals           | 1            | 1                                                                  |
| Trafikförsäkring   | 2            | 1                                                                  |
| Underwriting/bonus | 1            | 1                                                                  |

### Phase 2 — Home & Property (9 epics)

| Epic                  | User Stories | Use Cases                           |
| --------------------- | ------------ | ----------------------------------- |
| Burglary & theft      | 1            | 1                                   |
| Cancellations         | 1            | 1                                   |
| Fire & natural events | 11           | 1                                   |
| Home renewals         | 1            | 1                                   |
| Liability & legal     | 1            | 2 (liability claim, legal expenses) |
| Policy admin          | 1            | 1                                   |
| Quote & bind          | 1            | 1                                   |
| Underwriting rules    | 1            | 1                                   |
| Water damage          | 15           | 1                                   |

### Platform Evaluation

| Document                        | Purpose                                                 |
| ------------------------------- | ------------------------------------------------------- |
| Market analysis (core platform) | Vendor landscape and evaluation criteria                |
| RFP (core platform)             | Request for proposal covering 4 shortlisted vendors     |
| PoC plan (motor quote)          | Proof-of-concept plan for motor quote vendor evaluation |

### Supporting Artefacts

- **Actors & personas:** 11 personas covering policyholders, agents, underwriters,
  claims handlers, compliance officers, and system integrations
- **Regulatory framework:** FSA requirements, GDPR mapping, IDD compliance
- **Glossary:** 110 Swedish insurance terms with English translations and definitions

## 2. Architecture Decisions

| Decision                                  | Rationale                                                                                                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Docusaurus versioning for phased delivery | Each insurance phase is a frozen documentation version, enabling parallel work on future phases while preserving approved baselines                                  |
| Hybrid platform recommendation            | Commercial core system with custom Swedish integrations (BankID, Transportstyrelsen, Trafikförsäkringsföreningen) balances time-to-market with regulatory compliance |
| Inline CI validation scripts              | Organisation policy prohibits third-party GitHub Actions marketplace actions; all 7 validators are self-contained Node.js scripts                                    |

## 3. Test Evidence

### CI Pipeline

| Metric            | Value        |
| ----------------- | ------------ |
| Total CI runs     | 109          |
| Content failures  | 0            |
| Avg PR check time | ~2–3 minutes |

### Custom Validators (7 scripts)

| Validator               | What It Checks                                                                 |
| ----------------------- | ------------------------------------------------------------------------------ |
| `validate-regulatory`   | Every user story references FSA, GDPR, or IDD                                  |
| `validate-frontmatter`  | Required frontmatter fields present and valid                                  |
| `validate-use-cases`    | Use case structure follows template (actors, preconditions, flows)             |
| `validate-user-stories` | User story structure follows template (acceptance criteria, data requirements) |
| `validate-links`        | Internal cross-references resolve to existing files                            |
| `validate-glossary`     | Glossary terms referenced in content exist in glossary                         |
| `validate-version-sync` | docs/ and versioned_docs/ stay in sync                                         |

### Build Validation

- `npm run build` — Docusaurus build validates all links and frontmatter
- `npx markdownlint docs/ versioned_docs/` — zero warnings
- `npx prettier --check .` — formatting consistency

## 4. Security & Compliance

### Regulatory Traceability

| Metric                     | Value                             |
| -------------------------- | --------------------------------- |
| Files with regulatory refs | 213                               |
| Total regulatory mentions  | 2,384 (FSA + GDPR + IDD combined) |

### Key Regulations Covered

| Regulation                                 | Coverage                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------------------- |
| **FSA (Finansinspektionen)**               | Solvency requirements, consumer protection rules, reporting obligations          |
| **GDPR**                                   | Personal data handling, consent management, right to erasure, data portability   |
| **IDD (Insurance Distribution Directive)** | Product oversight, demands-and-needs assessment, cooling-off periods, disclosure |
| **Trafikskadelagen (1975:1410)**           | Mandatory motor third-party liability, injury compensation                       |
| **FAL (Försäkringsavtalslagen)**           | Insurance contract obligations, policyholder rights                              |

### Security Posture

- No PII or credentials stored in repository
- All sensitive integrations (BankID, Transportstyrelsen) documented as interface
  specifications only — no secrets or connection strings

## 5. Factory Metrics

| Metric           | Value                                           |
| ---------------- | ----------------------------------------------- |
| Issues completed | 53                                              |
| Issues open      | 1 (this evidence package)                       |
| Commits          | 55                                              |
| PRs merged       | 53                                              |
| Files changed    | 286                                             |
| Lines added      | 61,413                                          |
| Wall-clock time  | ~18 hours (2026-02-09 16:46 → 2026-02-10 11:01) |

## 6. Lessons Learned

| ID         | Title                                       | Key Insight                                                                                            |
| ---------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| LESSON-001 | Stale git index causes local build failures | Run `git reset --hard origin/main` at session start to avoid stale index state from parallel worktrees |

Additional operational insights:

- **GitHub API 502 errors:** The API can return 502 while still executing the merge.
  Always check PR state after receiving a server error before retrying.
- **Worktree branch conflicts:** `--delete-branch` on `gh pr merge` can fail when
  other worktrees reference the branch. Use `gh pr merge --squash` without
  `--delete-branch` and clean up manually.

## 7. Recommendations

### Immediate Next Steps

1. **Start Phase 3 (Commercial Insurance)** — business policies, liability coverage,
   fleet insurance, commercial property
2. **Stakeholder review of platform evaluation** — the market analysis, RFP, and PoC
   plan are in Draft status and need business sign-off
3. **Issue RFP to shortlisted vendors** — four vendors identified; procurement process
   can begin once evaluation criteria are approved

### Enhancements

1. **Add Mermaid diagrams to Phase 2 use cases** — Phase 1 use cases all have flow
   diagrams; Phase 2 use cases should match
2. **Data migration risk assessment** — legacy system data mapping and migration
   strategy needed before platform implementation begins
3. **Expand glossary** — add commercial insurance terminology for Phase 3 readiness
