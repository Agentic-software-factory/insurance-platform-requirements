---
sidebar_position: 12
---

# US-CLM-003: Verify Coverage and Check Exclusions

## User Story

**As a** claims handler (skadereglerare),
**I want to** verify that the policy was active at the time of the incident and that no exclusions apply,
**so that** I can confirm or deny coverage before proceeding with the claim.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Coverage verification is a prerequisite for all claims decisions.

## Acceptance Criteria

- **GIVEN** a claim has been registered
  **WHEN** the claims handler initiates coverage verification
  **THEN** the system checks that the policy was active on the incident date and displays the result (covered / not covered / partially covered)

- **GIVEN** a claim type is selected
  **WHEN** the system verifies coverage
  **THEN** it checks the policy's coverage tier against the claim type and confirms whether the specific coverage applies (e.g., collision damage requires helförsäkring)

- **GIVEN** the policy has exclusions
  **WHEN** the system performs coverage verification
  **THEN** it evaluates applicable exclusions (e.g., racing, commercial use, unlicensed driver) and flags any that may apply to the reported circumstances

- **GIVEN** a coverage verification is complete
  **WHEN** the system displays the result
  **THEN** the result includes: policy status at incident date, applicable coverage, deductible amount (självrisk), any flagged exclusions, and the coverage tier details

- **GIVEN** coverage is denied due to exclusion or lapsed policy
  **WHEN** the claims handler records the denial
  **THEN** the system requires a documented denial reason and generates a denial notification to the customer explaining the reason in clear language

## Common Exclusion Categories

| Exclusion                  | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| Policy not active          | Policy had not yet started or had been cancelled before the incident              |
| Coverage tier insufficient | Claim type not covered by the policy's tier (e.g., collision on halvförsäkring)   |
| Excluded use               | Vehicle was being used for an excluded purpose (racing, taxi without endorsement) |
| Unlicensed driver          | Driver at the time of the incident did not hold a valid license                   |
| Alcohol or drugs           | Driver was under the influence at the time of the incident                        |
| Intentional damage         | Damage was caused intentionally by the policyholder or insured                    |
| Waiting period             | Incident occurred during a waiting period after policy inception                  |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: coverage verification must be performed promptly; denial reasons must be clearly communicated
- **FSA-004** — Consumer protection: denial notifications must use plain language and inform the customer of their right to dispute the decision
- **FSA-011** — Complaints handling: denial notifications must include information about the complaints procedure
- **GDPR-003** — Claims processing: coverage verification decisions and their rationale must be documented and retained

## Dependencies

- Depends on US-CLM-002 (Claim Registration) — claim must be registered before coverage can be verified
- Requires policy data including coverage tier, active dates, and exclusion rules

## Notes

- Trafikförsäkring claims have special rules: even if the policyholder's own policy has exclusions, third parties injured by the vehicle are always covered under trafikförsäkring (Trafikskadelagen)
- Coverage verification for TFF claims follows a different process (see [US-CLM-011](claims-tff.md))
