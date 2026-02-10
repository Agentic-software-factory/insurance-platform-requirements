---
sidebar_position: 35
---

# US-HCF-006: Check for Environmental Hazards

## User Story

**As a** claims handler (skadereglerare),
**I want to** check for environmental hazards (asbestos, chemicals) at the damaged property,
**so that** cleanup is safe and compliant with environmental regulations.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Property Inspector (Besiktningsman)](../../actors/external/property-inspector.md), [Restoration Company (Saneringsfirma)](../../actors/external/restoration-company.md)

## Priority

**Should Have** — Environmental hazard assessment is critical for pre-1980 buildings and properties with known hazardous materials. It ensures worker and occupant safety during restoration.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim involves a property built before 1980
  **WHEN** the claims handler reviews the claim
  **THEN** the system automatically flags the claim for environmental hazard assessment, noting that pre-1980 buildings may contain asbestos in insulation, roofing, or pipe lagging

- **GIVEN** the structural inspection (US-HCF-005) identifies environmental hazards
  **WHEN** the claims handler reviews the inspection report
  **THEN** the system records the hazard type (asbestos, lead paint, chemical contamination, other), location within the property, and estimated remediation scope

- **GIVEN** environmental hazards have been confirmed
  **WHEN** the claims handler arranges remediation
  **THEN** the system creates a specialized remediation order, assigns a certified environmental cleanup contractor, and blocks standard repair work until remediation is completed and certified

- **GIVEN** environmental remediation has been completed
  **WHEN** the contractor submits the remediation certification
  **THEN** the system records the certification, unblocks the repair phase, and includes the remediation cost in the claim total

- **GIVEN** no environmental hazards are identified
  **WHEN** the claims handler confirms the property is clear
  **THEN** the system records the assessment result as "No hazards found" and allows the claim to proceed to the repair phase without remediation

## Common Environmental Hazards

| Hazard               | Prevalence in Swedish Buildings         | Impact on Claims Process                                                |
| -------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| Asbestos (asbest)    | Common in buildings built before 1977   | Must be removed by certified contractor before any demolition or repair |
| Lead paint (blyfärg) | Found in pre-1970 buildings             | Requires safe removal procedures during restoration                     |
| PCB (in sealants)    | Used in buildings from 1956--1973       | Environmental reporting required; specialized disposal                  |
| Radon                | Varies by region and building material  | May require mitigation during rebuild                                   |
| Chemical spill       | From damaged household/industrial items | Cleanup depends on substance; fire department may handle                |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: environmental remediation should not cause undue delay; the claims handler must communicate the timeline impact to the customer
- **FSA-014** — Record keeping: hazard assessments, remediation orders, and certifications must be retained for 10 years
- **GDPR-008** — Restoration company data sharing: property details shared with remediation contractors must follow data minimization principles

## Dependencies

- Depends on US-HCF-005 (Inspect Property for Structural Integrity)
- Certified environmental cleanup contractors
- Environmental regulations (Arbetsmiljöverket guidelines on asbestos handling)

## Notes

- Asbestos assessment is strongly recommended for any demolition or significant structural repair in pre-1980 buildings, even if not immediately visible
- Environmental remediation costs can be substantial and are typically covered under the policy as a necessary part of the restoration
- The customer should be informed that environmental remediation may extend the overall timeline but is essential for safety
- Fire can disturb previously encapsulated asbestos, creating airborne exposure risk
