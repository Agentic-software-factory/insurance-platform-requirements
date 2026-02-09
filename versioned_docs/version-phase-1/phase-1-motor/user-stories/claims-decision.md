---
sidebar_position: 16
---

# US-CLM-007: Approve or Deny a Claim

## User Story

**As a** claims handler (skadereglerare),
**I want to** make an informed decision to approve, deny, or refer a claim for further investigation,
**so that** claims are resolved fairly and in accordance with policy terms and regulations.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)

## Priority

**Must Have** — The claims decision is the central step in the claims lifecycle.

## Acceptance Criteria

- **GIVEN** coverage has been verified, liability determined, and damage assessed
  **WHEN** the claims handler reviews all claim evidence
  **THEN** the system presents a decision summary showing: coverage status, liability split, damage assessment, fraud screening result, deductible amount, and calculated settlement amount

- **GIVEN** a claims handler approves a claim
  **WHEN** the handler records the approval
  **THEN** the system changes the claim status to "Approved" (Godkänd), records the approved settlement amount, and advances the claim to settlement processing

- **GIVEN** a claims handler denies a claim
  **WHEN** the handler records the denial
  **THEN** the system requires a denial reason from a predefined list (plus free text explanation), changes the claim status to "Denied" (Avslagen), and generates a denial letter to the customer

- **GIVEN** a claim is denied
  **WHEN** the denial notification is sent to the customer
  **THEN** the notification includes: the specific reason for denial, the relevant policy terms or exclusions, information about the complaints procedure (FSA-011), and reference to external dispute resolution (ARN)

- **GIVEN** a claim exceeds the handler's settlement authority
  **WHEN** the handler attempts to approve the claim
  **THEN** the system routes the claim to a senior handler or manager for approval based on configurable authority limits

- **GIVEN** a claims handler refers a claim for further investigation
  **WHEN** the handler records the referral
  **THEN** the system changes the claim status to "Under investigation" (Under utredning) and notifies the appropriate team

## Claims Decision Authority

| Decision Level | Maximum Settlement Amount                        | Approver                                         |
| -------------- | ------------------------------------------------ | ------------------------------------------------ |
| Level 1        | Up to configurable threshold (e.g., SEK 50,000)  | Claims handler                                   |
| Level 2        | Up to configurable threshold (e.g., SEK 250,000) | Senior claims handler                            |
| Level 3        | Above Level 2 threshold                          | Claims manager                                   |
| Total loss     | Any amount                                       | Requires adjuster report + Level 2 or 3 approval |

## Denial Reason Categories

| Category                | Example                                                         |
| ----------------------- | --------------------------------------------------------------- |
| Policy not active       | Policy had lapsed before the incident date                      |
| Coverage not applicable | Claim type not covered by the policy tier                       |
| Exclusion applies       | Excluded use, unlicensed driver, intoxication                   |
| Fraudulent claim        | Fraud investigation confirmed                                   |
| Insufficient evidence   | Unable to verify the claim with available evidence              |
| Late reporting          | Claim reported beyond reasonable timeframe without valid reason |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: decisions must be made promptly; denial reasons must be clear and justified
- **FSA-004** — Consumer protection: denial notifications must use plain language
- **FSA-011** — Complaints handling: denial notifications must inform the customer of the complaints procedure and external dispute resolution options (ARN, Personförsäkringsnämnden)
- **FSA-014** — Record keeping: all claims decisions, rationale, and supporting evidence must be retained for 10 years
- **GDPR-003** — Claims processing: decision records containing personal data must follow retention and access control requirements

## Dependencies

- Depends on US-CLM-003 (Coverage Verification)
- Depends on US-CLM-004 (Liability Determination)
- Depends on US-CLM-005 (Damage Assessment)
- Depends on US-CLM-006 (Fraud Screening)

## Notes

- Customers must be informed of the decision within a reasonable timeframe as defined by internal SLAs
- All decision records must be auditable for regulatory inspection
