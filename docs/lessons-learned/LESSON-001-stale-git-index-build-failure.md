---
sidebar_position: 2
---

# LESSON-001: Stale Git Index Causes Local Build Failures

**Date:** 2026-02-10

**Type:** Pattern

**Impact:** Time

**Severity:** Medium

---

## Summary

A stale git index from a previous `git stash pop` caused local `npm run build` to fail with broken link errors, while CI passed on every recent merge to main.

---

## Background

### Context

Multiple workers running in parallel, merging PRs to main via auto-next. An intake session was running concurrently, reading from the repo. Previous sessions had used `git stash` and `git pull` to handle dirty working trees.

### Assumptions

- `git checkout -- .` would restore the working tree to match HEAD
- `git clean -fd` would remove any leftover files causing issues
- If CI passes, the codebase is correct and local issues are environmental

---

## What Happened

### Event description

Local `npm run build` failed with broken markdown link errors:

- `docs/Architecture/poc-plan-motor-quote.md` referenced `../phase-1-motor/use-cases/quote-and-bind.md` (deleted)
- `versioned_docs/version-phase-1/Architecture/poc-plan-motor-quote.md` referenced `../actors/external/transportstyrelsen.md` (moved by actors-split PR)

Meanwhile, CI showed all green — `npm run build` passed on every recent merge to main.

### Timeline

- Noticed local build failure with broken link errors
- Attempted `git checkout -- .` — did not fix the issue
- Attempted `git clean -fd` — did not fix the issue
- Ran `git status` — revealed ~150 staged modifications and deletions, residual from a previous `git stash pop` or merge conflict
- Ran `git reset --hard HEAD` — resolved the mismatch
- Build succeeded after reset

### Evidence

- `git status` output showed ~150 staged changes not present on HEAD
- CI green on all recent PRs to main
- Local build failed with broken link errors referencing files deleted or moved in merged PRs

---

## Root Cause

### Five Whys

1. **Why did the local build fail with broken links?**
   Working tree had files that don't exist on HEAD (deleted actors, deleted Phase 2 files).

2. **Why did the working tree have files not on HEAD?**
   Git index had staged changes from a previous session's `git stash pop`.

3. **Why didn't `git checkout -- .` fix it?**
   `git checkout -- .` only resets the working tree, not the index.

4. **Why didn't `git clean -fd` fix it?**
   `git clean -fd` only removes untracked files, not staged deletions in the index.

5. **Why was the index stale?**
   A previous session used `git stash pop` which left partially merged changes staged in the index, and no subsequent `git reset` was performed.

### True root cause

The git index (staging area) retained changes from a previous `git stash pop` session. Common git cleanup commands (`checkout -- .`, `clean -fd`) only affect the working tree and untracked files respectively — neither touches the index.

---

## Lesson

### What we learned

- `git checkout -- .` resets the working tree but does NOT reset the index
- `git clean -fd` removes untracked files but does NOT affect staged changes
- `git status` is the essential first diagnostic when local builds diverge from CI
- `git reset --hard HEAD` is the only single command that aligns both index and working tree with the current commit
- In multi-worker environments, `git stash` is risky because stash-pop can leave partial state

### Key insight

When local build fails but CI passes, the **first diagnostic step** is `git status`. If it shows unexpected staged changes, the local state is corrupted relative to HEAD. Only `git reset --hard HEAD` aligns both index and working tree with the current commit.

---

## Actions

### Immediate fixes

- [x] Ran `git reset --hard HEAD` to fix the stale index
- [x] Verified local build passes after reset

### Long-term changes

- [x] Added troubleshooting pattern to MEMORY.md
- [x] Documented this lesson in `docs/lessons-learned/`

### Documentation updates

- [x] Created this lesson file
- [x] Updated lessons-learned index

---

## Prevention

### How to avoid in future

### Before starting a work session

1. Run `git reset --hard origin/main` instead of just `git pull`
2. Run `npm ci` (not `npm install`) to match CI's dependency resolution

### When local build fails but CI passes

1. Run `git status --short` — check for unexpected changes
2. If stale index detected: `git reset --hard HEAD`
3. Run `npm ci` to ensure clean dependencies
4. Rebuild and verify

### In multi-worker environments

- Avoid `git stash` — prefer clean clones or `git reset --hard`
- Treat local checkouts as ephemeral
- Always start sessions with a hard reset to the remote branch

---

## Related Lessons

- _(none yet)_

---

## References

- [Git documentation: git-reset](https://git-scm.com/docs/git-reset)
- [Git documentation: git-stash](https://git-scm.com/docs/git-stash)

---

**Template version:** 1.0
**Last updated:** 2026-02-10
