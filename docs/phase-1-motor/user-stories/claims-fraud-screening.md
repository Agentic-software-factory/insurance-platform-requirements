---
sidebar_position: 15
---

# US-CLM-006: Screen Claims for Fraud

## User Story

**As a** claims handler (skadereglerare),
**I want** the system to flag potential fraud indicators on incoming claims,
**so that** I can investigate suspicious claims before settlement.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Claims Adjuster (Värderare)](../../actors/internal-actors.md#claims-adjuster-värderare)

## Priority

**Should Have** — Fraud screening protects the insurance portfolio and is an industry expectation, though manual investigation can serve as an interim process.

## Acceptance Criteria

- **GIVEN** a new claim is registered
  **WHEN** the system processes the claim
  **THEN** it runs automated fraud screening rules and assigns a fraud risk score or flag (low / medium / high)

- **GIVEN** a claim is flagged as medium or high fraud risk
  **WHEN** the claims handler views the claim
  **THEN** the system displays the specific fraud indicators that triggered the flag, allowing the handler to review and either escalate for investigation or clear the flag with documented rationale

- **GIVEN** a claims handler escalates a claim for fraud investigation
  **WHEN** the handler marks the claim for investigation
  **THEN** the system records the escalation reason, pauses settlement processing, and notifies the designated fraud investigation team

- **GIVEN** a fraud investigation is complete
  **WHEN** the investigator records the outcome (confirmed fraud / cleared)
  **THEN** the system updates the claim status accordingly and, if fraud is confirmed, records the decision for potential criminal referral to police

## Fraud Indicators

The following indicators should be evaluated during automated screening:

| Indicator                        | Description                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Recent policy inception          | Claim filed shortly after policy was purchased                                       |
| Coverage upgrade before claim    | Coverage tier was increased shortly before the incident                              |
| Multiple recent claims           | Policyholder has filed multiple claims in a short period                             |
| Inconsistent incident details    | Details in the FNOL conflict with known facts (e.g., location, time)                 |
| Claim amount disproportionate    | Claimed damage amount is disproportionate to the incident description                |
| Known fraud network              | Policyholder, vehicle, or linked parties appear in the industry fraud database (GSR) |
| Total loss on high-value vehicle | Vehicle declared total loss with suspicious circumstances                            |
| Late reporting                   | Significant delay between incident date and FNOL                                     |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: fraud investigation must not unreasonably delay settlement of legitimate claims
- **GDPR-006** — Fraud detection and prevention: fraud screening must follow data minimization; access full claims details only for flagged cases; automated screening should use pseudonymized data where possible
- **GDPR-003** — Claims processing: fraud investigation data is sensitive and must be protected with strict access controls
- **FSA-014** — Record keeping: fraud investigation records must be retained for 10 years from investigation closure

## Dependencies

- Depends on US-CLM-002 (Claim Registration) — claim must be registered before screening
- Integration with GSR (Gemensamt skadeanmälningsregister) — industry fraud database

## Notes

- Automated fraud screening supplements but does not replace the claims handler's professional judgment
- If a claim is referred to police for criminal investigation, the insurer must have a lawful basis under GDPR to share personal data with law enforcement
- Fraud detection results must never be disclosed to the claimant during an active investigation
