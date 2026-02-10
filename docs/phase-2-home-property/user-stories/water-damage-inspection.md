---
sidebar_position: 15
---

# US-HCW-006: Document Damage With Inspection

## User Story

**As a** besiktningsman (property inspector),
**I want to** document the water damage cause and extent with photos and measurements,
**so that** the claim assessment is evidence-based and the correct restoration scope is established.

## Actors

- **Primary:** [Property Inspector (Besiktningsman)](../../actors/external/property-inspector.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Should Have** — Independent inspection is not required for every water damage claim but is critical for complex, high-value, or disputed claims.

## Acceptance Criteria

- **GIVEN** a claims handler has determined that a besiktningsman inspection is needed
  **WHEN** the claims handler requests an inspection
  **THEN** the system creates an inspection order linked to the claim and dispatches it to a contracted besiktningsman

- **GIVEN** a besiktningsman has completed the inspection
  **WHEN** the besiktningsman submits the inspection report
  **THEN** the system stores the report linked to the claim, including cause determination, damage extent, affected structural elements, photos, and any identified construction defects (dolda fel)

- **GIVEN** the inspection report identifies a construction defect (dolda fel) as the cause
  **WHEN** the claims handler reviews the report
  **THEN** the system flags the claim for potential subrogation against the seller or builder and records the defect details

- **GIVEN** the inspection report is complete
  **WHEN** the claims handler reviews all evidence
  **THEN** the system provides a consolidated view of the moisture report (from saneringsfirma) and the inspection report side by side for informed decision-making

## Inspection Triggers

| Condition                                    | Inspection Required |
| -------------------------------------------- | ------------------- |
| Estimated cost exceeds SEK 200,000           | Yes                 |
| Cause is disputed between BRF and individual | Yes                 |
| Suspected construction defect (dolda fel)    | Yes                 |
| Suspected fraud indicators                   | Yes                 |
| Routine low-value claim with clear cause     | No                  |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: inspection findings must be considered promptly; inspections should not cause undue delay
- **FSA-014** — Record keeping: inspection reports are part of the claims file and must be retained for 10 years
- **GDPR-003** — Claims processing: inspection reports may contain personal data (property owner identity, photos of property interior); data minimization applies

## Dependencies

- Depends on US-HCW-004 (Receive Moisture Measurement Report)
- Contracted besiktningsman network

## Notes

- Besiktningsman inspections are typically needed for only 20-30% of water damage claims
- The inspection report may support or contradict the saneringsfirma's initial assessment
- For dolda fel cases, the inspection report becomes key evidence for subrogation claims
