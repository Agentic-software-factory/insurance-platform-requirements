<!-- delivery-factory:v1.4.0 -->
# CLAUDE.md

## ⚠️ Regulated Insurance Domain

This project documents business requirements for a regulated insurance platform. All content must maintain **regulatory traceability** to FSA (Finansinspektionen), GDPR, and IDD (Insurance Distribution Directive). Every user story and use case must reference applicable regulatory obligations.

**Do not** create, modify, or remove regulatory mappings without explicit approval from the compliance team.

---

## 🛑 STOP - READ FIRST

> **These checklists apply ALWAYS, regardless of how the task was given.**

### Before git push

- [ ] **Tested locally** - no surprises in CI
- [ ] **All tests green** locally
- [ ] **Linters pass** with ZERO warnings
- [ ] **Tests included** for new/changed code

### Before claiming cause/solution

- [ ] **Read actual logs** or error messages
- [ ] **Verified with data** (not assumptions)
- [ ] **Can show evidence** for the claim

### Before implementation

- [ ] **Got explicit approval** from the user
- [ ] **Asked about uncertainties**
- [ ] **Understood existing patterns**

### After implementation is complete

**Complete the FULL flow without stopping:**

```
test locally → commit → push → PR → wait for CI green → merge
```

- [ ] **Do NOT stop** to ask about next steps

---

## Autonomy Level

**Current level: 2 (Auto-PR)**

| Level | Description | Behavior |
|-------|-------------|----------|
| 0 | Manual | Ask before every action |
| 1 | Semi-Auto | Auto-commit, ask before push |
| **2** | **Auto-PR** | **Auto push + create PR, ask before merge** |
| 3 | Auto-Merge | Auto merge after green CI |
| 4 | Full Auto | Fully autonomous |

---

## ⛔ Critical Rules

| Rule | Action |
|------|--------|
| **Never push to main** | Feature branch → PR → merge |
| **Never merge without green CI** | Wait for ✓ |
| **All changes require tests** | TDD: test first |
| **Test locally before push** | Not via CI/CD pipeline |
| **Zero linter warnings** | See Commands below |
| **Never guess** | Read logs/data first |
| **Complete full workflow** | test → commit → push → PR → CI → merge (no pausing) |

### Linter Commands (ZERO warnings required)

| Technology | Command |
|------------|---------|
| Markdown | `npx markdownlint docs/ versioned_docs/` |
| Formatting | `npx prettier --check .` |
| Build validation | `npm run build` |

---

## 🎯 Code Craftsmanship

| Principle | Meaning |
|-----------|---------|
| **KISS** | No unnecessary complexity |
| **YAGNI** | Only what is needed now |
| **Remove, Don't Skip** | Remove unused code entirely |
| **TDD** | RED → GREEN → REFACTOR |

---

## Project

**TryggFörsäkring — Insurance Platform Requirements**

Business requirements documentation for TryggFörsäkring AB, a mid-size Swedish insurance company replacing a 15+ year old legacy policy administration system. The output is a **Docusaurus documentation site** — no code delivery.

**Problem:** Legacy policy admin system is undocumented. Business rules are tribal knowledge held by senior staff. Internal dev teams cannot build the replacement without formalized, structured requirements.

**Users:**
- Business analysts and product owners (primary authors)
- Internal development teams (primary consumers)
- Compliance and legal team (reviewers)
- Underwriters and claims handlers (domain experts, reviewers)

**Success criteria:**
- All business processes documented as Actors, Personas, User Stories, and Use Cases
- Phased delivery: Phase 1 (Motor), Phase 2 (Home & Property), Phase 3 (Commercial)
- Documentation is dev-consumable (clear acceptance criteria, data models, flow diagrams)
- Regulatory traceability — each requirement maps to FSA/GDPR/IDD obligations

**Constraints:**
- Documentation only — no code delivery
- Insurance domain with complex regulatory landscape
- Content authors are non-technical business stakeholders
- Regulatory traceability is mandatory

---

## Commands

### Build & Test

```bash
npm run build                          # Validates links, frontmatter, broken references
npx markdownlint docs/ versioned_docs/ # Lint markdown files
npx prettier --check .                 # Check formatting
```

### Run Locally

```bash
npm start              # Start Docusaurus dev server
```

---

## Structure

Each delivery phase is a Docusaurus version. The `versioned_docs/` directory holds frozen
snapshots; `docs/` is the working directory for the next phase (hidden until that phase starts).

```
versioned_docs/
└── version-phase-1/          # Frozen Phase 1 snapshot (served by default)
    ├── intro.md
    ├── actors/
    ├── personas/
    ├── phase-1-motor/
    │   ├── user-stories/
    │   └── use-cases/
    ├── regulatory/
    │   ├── fsa-requirements.md
    │   ├── gdpr-mapping.md
    │   └── idd-compliance.md
    └── glossary.md
versioned_sidebars/
└── version-phase-1-sidebars.json
versions.json                 # ["phase-1"]
docs/                         # WIP for next phase (includeCurrentVersion: false)
```

---

## Regulatory Traceability

Every user story and use case MUST include a `Regulatory` field linking to applicable regulations:

| Regulation | Scope |
|------------|-------|
| **FSA (Finansinspektionen)** | Solvency, consumer protection, reporting |
| **GDPR** | Personal data handling, right to erasure, data portability, consent |
| **IDD (Insurance Distribution Directive)** | Product oversight, demands-and-needs assessment, disclosure |

---

## Business Phases

| Phase | Scope |
|-------|-------|
| **Phase 1 — Motor Insurance** | Personal motor policies, claims handling, underwriting rules, trafikförsäkring |
| **Phase 2 — Home & Property** | Homeowner policies, property damage claims, natural disaster coverage |
| **Phase 3 — Commercial** | Business policies, liability coverage, fleet insurance, commercial property |

---

## Skills & Agents

### Skills (use proactively)

| Trigger | Skill |
|---------|-------|
| Next task | `/next` |
| Document lesson | `/lesson` |
| Initialize project | `/factory-init` |
| Upgrade factory | `/factory-upgrade` |

---

## Git Workflow

**Branch naming**: `<type>/<issue-number>-<slug>`
**Types**: feature, fix, refactor, docs, test, chore

```bash
git checkout -b feature/123-add-user-auth
git add .
git commit -m "feat(#123): Add user authentication"
TESTED_LOCALLY=1 git push -u origin feature/123-add-user-auth
gh pr create --title "feat(#123): Add user authentication"
```

---

## Reference

- **Tech stack:** Docusaurus 3.x, TypeScript (config), Markdown/MDX (content)
- **Hosting:** GitHub Pages or Azure Static Web Apps
- **CI/CD:** GitHub Actions
- **Linting:** markdownlint + Prettier
- **Review:** PR-based by domain experts and compliance team
