---
sidebar_position: 4
---

# LESSON-003: Intake Must Never Write Files to the Repository

**Date:** 2026-02-10

**Type:** Mistake

**Impact:** Quality

**Severity:** High

---

## Summary

An intake session used the Write tool to create a file directly in the repository, bypassing the issue → branch → PR → CI → merge workflow that all repo changes must follow.

---

## Background

### Context

The project uses a strict delivery workflow: all repository changes must go through GitHub Issues, be implemented by workers on feature branches, pass CI, and merge via PR. Intake sessions exist to gather information, analyze the codebase, and create issues — never to modify the repository.

### Assumptions

- The intake skill instructions stating "Never write files — intake is read-only on the repo" would be sufficient to prevent file writes
- The assistant would distinguish between "gathering deliverable content" and "writing deliverable files"

---

## What Happened

### Event description

During an intake session, the user requested an evidence package. The assistant gathered metrics from git log, GitHub CLI, and file counts. Instead of creating a GitHub Issue describing the evidence package to be produced by a worker, the assistant used the Write tool to create `EVIDENCE-PACKAGE.md` directly in the repository root.

### Timeline

- User requested an evidence package during intake
- Intake gathered metrics from git log, gh CLI, and file counts
- Intake used the Write tool to create `EVIDENCE-PACKAGE.md` in the repo root
- User flagged the violation: "Varför skapar du filer, när allt skall gå via issues?"
- File was removed and a proper issue (#107) was created instead

### Evidence

- `EVIDENCE-PACKAGE.md` was written directly to the repository root during an intake session
- No branch, no PR, no CI check — the file bypassed the entire delivery workflow
- Issue #107 was created after the user caught the mistake

---

## Root Cause

### Five Whys

1. **Why was the file written directly to the repo?**
   The assistant treated the evidence package as a deliverable to produce immediately rather than an issue to be implemented by a worker.

2. **Why did the assistant confuse gathering with producing?**
   Intake gathered all the data needed for the evidence package, making the final Write step feel like a natural continuation of the same task.

3. **Why didn't the intake read-only rule prevent this?**
   The rule exists in the intake skill instructions but was not followed — the assistant prioritized completing the user's request over respecting the workflow boundary.

4. **Why is there a workflow boundary between intake and workers?**
   Because all repo changes must go through branches, CI, and PR review to maintain quality, traceability, and prevent unreviewed changes.

5. **Why is this boundary critical?**
   Without it, files can enter the repo without linting, build validation, or peer review — undermining the entire CI/CD pipeline.

### True root cause

The assistant did not respect the separation of concerns between intake (read-only analysis → issue creation) and workers (issue → branch → implementation → PR → merge). The Write tool should never be invoked during an intake session for repository files.

---

## Lesson

### What we learned

- Intake sessions are strictly **read-only** on the repository
- The only output mechanism for intake is `gh issue create`
- Gathering data and producing deliverables are separate responsibilities — intake gathers, workers produce
- Even when all the data is available, intake must not shortcut the delivery workflow
- The Write, Edit, and NotebookEdit tools must never be used on repo files during intake

### Key insight

**Intake has exactly one output: GitHub Issues.** If you find yourself reaching for Write, Edit, git commit, or any file-modifying tool during intake — STOP. Create an issue instead and let the worker handle the implementation through the proper branch → PR → CI → merge workflow.

---

## Actions

### Immediate fixes

- [x] Removed `EVIDENCE-PACKAGE.md` from the repository root
- [x] Created issue #107 for the evidence package to be produced by a worker

### Long-term changes

- [x] Documented this lesson in `docs/lessons-learned/`
- [x] Updated MEMORY.md with intake read-only rule

### Documentation updates

- [x] Created this lesson file
- [x] Updated lessons-learned index

---

## Prevention

### How to avoid in future

### During intake sessions

1. **Read-only tools only**: Read, Glob, Grep, git log, gh CLI queries
2. **Never use**: Write, Edit, NotebookEdit, git add, git commit, git push
3. **One output**: `gh issue create` — nothing else modifies the repo

### Self-check before any file operation during intake

1. Am I in an intake session? → Do NOT write files
2. Do I have data that should become a file? → Create an issue describing what the worker should produce
3. Am I tempted to "just quickly write this"? → STOP. Create an issue.

### For workers receiving intake-created issues

1. Workers implement on feature branches
2. All changes go through CI and PR review
3. The delivery workflow is never bypassed, regardless of how "simple" the change seems

---

## Related Lessons

- [LESSON-001](./LESSON-001-stale-git-index-build-failure.md) — Stale Git Index Causes Local Build Failures

---

## References

- Issue [#107](https://github.com/Agentic-software-factory/insurance-platform-requirements/issues/107) — Evidence package issue created after the mistake
- Issue [#110](https://github.com/Agentic-software-factory/insurance-platform-requirements/issues/110) — This lesson documentation

---

**Template version:** 1.0
**Last updated:** 2026-02-10
