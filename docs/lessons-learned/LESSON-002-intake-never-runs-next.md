---
sidebar_position: 3
---

# LESSON-002: Intake Must Never Run /next or Start Workers

**Date:** 2026-02-10

**Type:** Mistake

**Impact:** Quality

**Severity:** High

---

## Summary

An intake session created an issue and then attempted to run `/next` and launch a worker agent to implement it — violating the separation between intake (creates issues) and workers (implement issues).

---

## Background

### Context

The delivery factory uses a separation of concerns between intake sessions and worker sessions. Intake sessions read the codebase, talk to the user, and create GitHub issues. Worker sessions pick up issues via `/next` or `auto-next.sh` and implement them autonomously.

### Assumptions

- Intake sessions understand their scope is limited to issue creation
- The `/next` command is clearly a worker-only concept
- Session boundaries are self-enforcing

---

## What Happened

### Event description

1. User asked the intake session to create an evidence package
2. Intake correctly created issue #107
3. Intake then incorrectly asked "Ska jag köra `/next`?" (Should I run `/next`?)
4. Intake attempted to launch a `delivery-factory:code-test` agent to implement #107 directly
5. User rejected the action and flagged the violation

### Timeline

- Intake session created issue #107 for the evidence package
- Immediately after, intake suggested running `/next` to implement the issue
- User intervened and stopped the execution
- Violation was identified and documented

### Evidence

- Issue #107 was created correctly by intake
- Intake session log showed attempt to invoke worker agent
- User rejection prevented any implementation from occurring

---

## Root Cause

### Five Whys

1. **Why did intake try to run /next?**
   The assistant saw an actionable issue and attempted to be helpful by implementing it immediately.

2. **Why did it think implementing was appropriate?**
   No explicit boundary rule prevented intake from invoking worker commands.

3. **Why was there no boundary rule?**
   The separation between intake and worker roles was implicit, not codified in instructions.

4. **Why was it implicit?**
   The delivery factory pattern was new, and role boundaries had not yet been tested in practice.

5. **Why hadn't it been tested?**
   This was the first time intake created an issue complex enough to trigger the "helpful implementation" instinct.

### True root cause

The intake/worker role boundary was assumed but not explicitly enforced. Without a clear rule stating "intake NEVER runs `/next` or implementation agents," the assistant defaulted to being maximally helpful — which in this case meant crossing the role boundary.

---

## Lesson

### What we learned

- Intake and worker roles must have explicit, codified boundaries
- "Be helpful" instincts can violate architectural boundaries if those boundaries are implicit
- The `/next` command and all implementation agents belong exclusively to worker sessions
- Intake sessions are READ-ONLY on the repository — their only output is GitHub issues
- Role separation must be stated as a hard rule, not assumed as convention

### Key insight

**Intake creates issues. Workers implement issues. Never cross that boundary.** This must be an explicit rule in intake session instructions, not an assumed convention. After creating issues, intake should report what was created and stop — never suggest or attempt implementation.

---

## Actions

### Immediate fixes

- [x] User rejected the `/next` invocation, preventing any damage
- [x] Violation identified and flagged for documentation

### Long-term changes

- [x] Documented this lesson in `docs/lessons-learned/`
- [x] Updated lessons-learned index

### Documentation updates

- [x] Created this lesson file
- [x] Updated lessons-learned index

---

## Prevention

### How to avoid in future

### Intake session rules

1. Intake is READ-ONLY on the repository
2. Intake output = GitHub Issues only
3. `/next` is a worker command — never suggest or run it from intake
4. Implementation agents (`code-test`, `platform-release`, etc.) are worker-only
5. After creating issues, intake reports what was created and stops

### Correct intake completion message

After creating issues, the intake session should say:

> "Intake complete. N issues created. The worker will handle implementation."

### Incorrect intake behavior (never do this)

- "Shall I run `/next`?"
- "Let me implement this now."
- "I'll launch a worker agent to handle this."
- Any invocation of `/next`, `auto-next.sh`, or implementation agents

### Enforcement

- Intake session instructions must explicitly forbid `/next` and worker agent invocation
- Code review of intake session prompts should verify this boundary
- If intake attempts to cross the boundary, the user should reject and flag it

---

## Related Lessons

- [LESSON-001](./LESSON-001-stale-git-index-build-failure.md) — Stale Git Index Causes Local Build Failures

---

## References

- [Issue #107](https://github.com/Agentic-software-factory/insurance-platform-requirements/issues/107) — Evidence package issue created by intake
- [Issue #109](https://github.com/Agentic-software-factory/insurance-platform-requirements/issues/109) — This lesson's tracking issue

---

**Template version:** 1.0
**Last updated:** 2026-02-10
