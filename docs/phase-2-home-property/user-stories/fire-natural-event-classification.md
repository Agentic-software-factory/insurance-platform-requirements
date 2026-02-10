---
sidebar_position: 32
---

# US-HCF-003: Classify Event Type and Coverage

## User Story

**As a** claims handler (skadereglerare),
**I want to** classify the event type (fire, storm, flood, or lightning),
**so that** the correct coverage and claims process apply.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** System

## Priority

**Must Have** — Correct event classification determines which coverage terms, deductibles, and settlement paths apply. Misclassification leads to incorrect settlements.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has been registered
  **WHEN** the claims handler classifies the event
  **THEN** the system presents the event categories: fire (brand), storm (storm), flood (översvämning), lightning (blixtnedslag), explosion (explosion), and other natural event (annan naturhändelse)

- **GIVEN** the claims handler selects an event type
  **WHEN** the system applies the classification
  **THEN** the system retrieves the applicable policy coverage terms, deductible (självrisk), and any event-specific sub-limits or exclusions for that event type

- **GIVEN** the event type is classified as flood (översvämning)
  **WHEN** the system checks coverage
  **THEN** the system verifies whether the policy includes flood coverage, as some basic policies exclude flood from natural perils, and alerts the claims handler if coverage is excluded or sub-limited

- **GIVEN** the event may involve multiple peril types (e.g., storm causes flooding, lightning causes fire)
  **WHEN** the claims handler classifies the event
  **THEN** the system allows a primary and secondary event type to be recorded, with the primary type determining the settlement path

- **GIVEN** a large-scale natural event affects multiple policyholders
  **WHEN** the claims handler classifies the event
  **THEN** the system allows linking the claim to a catastrophe event record (katastrof) so that all related claims are grouped for monitoring and reserve management

- **GIVEN** the classification is complete
  **WHEN** the system updates the claim record
  **THEN** the claim status advances to "Classified" and the applicable coverage terms are attached to the claim for reference during assessment and settlement

## Event Type Reference

| Event Type          | Swedish Term        | Typical Coverage        | Common Sub-limits             |
| ------------------- | ------------------- | ----------------------- | ----------------------------- |
| Fire                | Brand               | Always covered          | None (standard coverage)      |
| Storm               | Storm               | Covered if wind >21 m/s | May have higher deductible    |
| Flood               | Översvämning        | Varies by policy tier   | Often sub-limited or excluded |
| Lightning           | Blixtnedslag        | Always covered          | Electrical damage sub-limit   |
| Explosion           | Explosion           | Always covered          | None (standard coverage)      |
| Other natural event | Annan naturhändelse | Per policy terms        | Case-by-case assessment       |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: correct classification ensures the right coverage terms are applied, supporting a fair outcome
- **FSA-004** — Consumer protection: the customer must be informed which event type classification has been applied and how it affects their coverage
- **FSA-018** — Natural disaster reserves: event classification feeds into catastrophe reserve reporting by peril type
- **FSA-014** — Record keeping: the classification rationale must be documented and retained

## Dependencies

- Depends on US-HCF-001 (Report Fire or Natural Event Emergency)
- Policy product configuration with coverage terms per event type
- Catastrophe event register for large-scale events

## Notes

- Classification should be based on the primary cause of loss, consistent with the räddningstjänsten incident report when available
- For catastrophe events (e.g., Gävle 2021 flooding), the system should support bulk classification and grouping
- Some policies have different deductibles for different natural perils — the classification directly affects the customer's out-of-pocket cost
- The claims handler may reclassify the event if new information (e.g., incident report) changes the determination
