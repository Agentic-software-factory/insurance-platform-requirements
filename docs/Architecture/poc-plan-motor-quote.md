---
sidebar_position: 2
---

# PoC Plan — Motor Quote Scenario

Defines the bounded Proof of Concept (PoC) that the two RFP finalists will
implement to demonstrate their platform's fitness for TryggFörsäkring. The PoC
scenario is based on the existing Phase 1 Motor Quote & Bind use case
([UC-QNB-001](../phase-1-motor/use-cases/quote-and-bind.md)).

## Purpose

After the RFP evaluation narrows the field to two finalists, each vendor
implements a bounded PoC to prove technical and functional fit. The PoC uses
real business requirements already documented in Phase 1 so that the evaluation
team can assess each vendor's ability to model Swedish motor insurance
correctly.

## Scope

The PoC covers the motor insurance quote flow
([UC-QNB-001](../phase-1-motor/use-cases/quote-and-bind.md)) with the following
subset of the full use case.

### In Scope

| Step | Description                                                              |
| ---- | ------------------------------------------------------------------------ |
| 1    | Customer enters vehicle registration number (registreringsnummer)        |
| 2    | System retrieves vehicle data (simulated Transportstyrelsen integration) |
| 3    | System calculates premium based on rating factors                        |
| 4    | Customer reviews quote with coverage details and premium breakdown       |
| 5    | Customer signs with BankID (simulated)                                   |
| 6    | System creates policy and returns confirmation                           |

### Out of Scope

The following parts of the full UC-QNB-001 flow are **excluded** from the PoC:

- Agent-assisted and broker-assisted quote flows (extensions 3a, 3b)
- Demands-and-needs assessment (step 3 of UC-QNB-001) — simplified to coverage
  tier selection only
- Real Transportstyrelsen integration — vendors use a mock API
- Real BankID integration — vendors use a signing simulator
- Payment setup and premium collection
- Real-time Transportstyrelsen notification after binding
- Policy document generation beyond a simple confirmation response

## PoC Scenario Detail

### 1. Customer Enters Registration Number

The customer provides a Swedish registreringsnummer. The PoC system validates
the format (three letters + three digits, or the new six-character format) and
passes it to the vehicle lookup mock.

**Reference:**
[QNB-01](../phase-1-motor/user-stories/quote-and-bind.md#qnb-01-get-a-quick-quote)

### 2. Vehicle Data Retrieval (Mock)

The system calls a Transportstyrelsen mock API that returns:

- Make, model, and year
- VIN (chassinummer)
- Registered owner
- Current insurance status

The mock returns a pre-configured set of test vehicles. If the registration
number is not in the test data, the system returns a "vehicle not found"
response so vendors can demonstrate the error handling path.

**Reference:**
[UC-QNB-001 step 1](../phase-1-motor/use-cases/quote-and-bind.md#1-customer-identification),
[Transportstyrelsen actor](../actors/external/transportstyrelsen.md)

### 3. Premium Calculation

The system calculates the annual premium using the following rating factors
from the documented underwriting rules:

| Factor                      | Values                                                     | Reference                                                                                                                  |
| --------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Coverage tier               | Trafikförsäkring / Halvförsäkring / Helförsäkring          | [Coverage tier definitions](../phase-1-motor/user-stories/underwriting-bonus.md#coverage-tier-definitions)                 |
| Vehicle type and model year | Risk classification group (simplified to 5 groups for PoC) | [UWB-03 rating factors](../phase-1-motor/user-stories/underwriting-bonus.md#uwb-03-calculate-premium-using-rating-factors) |
| Driver age                  | 18–25, 26–65, 66+                                          | [UWB-03 rating factors](../phase-1-motor/user-stories/underwriting-bonus.md#uwb-03-calculate-premium-using-rating-factors) |
| Postal code                 | Risk zone 1–5                                              | [UWB-03 rating factors](../phase-1-motor/user-stories/underwriting-bonus.md#uwb-03-calculate-premium-using-rating-factors) |
| Bonus class                 | 1–15 (discount 0 %–70 %)                                   | [UWB-01 bonus table](../phase-1-motor/user-stories/underwriting-bonus.md#uwb-01-bonus-class-table-and-progression-rules)   |
| Deductible (självrisk)      | 1 500, 3 000, 5 000, 7 500, 10 000 SEK                     | [Coverage tier definitions](../phase-1-motor/user-stories/underwriting-bonus.md#coverage-tier-definitions)                 |

The PoC uses a simplified subset (six factors) of the full 13-factor rating
model. Vendors must demonstrate that the remaining factors can be added via
configuration rather than code changes.

**Reference:**
[UC-QNB-001 step 4](../phase-1-motor/use-cases/quote-and-bind.md#4-premium-calculation-and-coverage-comparison),
[UWB-03](../phase-1-motor/user-stories/underwriting-bonus.md#uwb-03-calculate-premium-using-rating-factors)

### 4. Quote Presentation

The system presents the quote to the customer showing:

- Premium for all three coverage tiers (trafikförsäkring, halvförsäkring,
  helförsäkring)
- Coverage details per tier
- Premium breakdown showing each rating factor's contribution
- Deductible options per tier

**Reference:**
[QNB-04](../phase-1-motor/user-stories/quote-and-bind.md#qnb-04-compare-coverage-tiers),
[UWB-05](../phase-1-motor/user-stories/underwriting-bonus.md#uwb-05-premium-calculation-transparency)

### 5. BankID Signing (Mock)

The customer selects a coverage tier and initiates signing. The PoC uses a
BankID signing simulator that:

- Accepts a personnummer and returns a signed response
- Simulates a 5-second signing delay
- Can be configured to return success or failure for testing

**Reference:**
[QNB-05](../phase-1-motor/user-stories/quote-and-bind.md#qnb-05-sign-policy-with-bankid),
[BankID actor](../actors/external/bankid.md)

### 6. Policy Creation

Upon successful signing, the system:

- Generates a unique policy number
- Stores the policy record with all binding details
- Returns a confirmation response with the policy number, coverage summary,
  and premium

**Reference:**
[QNB-06](../phase-1-motor/user-stories/quote-and-bind.md#qnb-06-receive-insurance-certificate-immediately)

## Technical Requirements

| #   | Requirement                               | Purpose                              | Acceptance                                                                                                                                |
| --- | ----------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| T1  | REST API for quote creation               | Validate API-first architecture      | OpenAPI 3.x specification published; endpoints accept and return JSON                                                                     |
| T2  | Configurable rating factors               | Validate underwriting rules engine   | Rating factors changed via configuration, not code deployment                                                                             |
| T3  | Bonus class table (1–15)                  | Validate domain-specific rules       | Full 15-class table with correct discount percentages per [UWB-01](../phase-1-motor/user-stories/underwriting-bonus.md#bonus-class-table) |
| T4  | Coverage tier configuration               | Validate product configurability     | Three tiers (trafik/halv/hel) with coverage details and deductible options configurable by business users                                 |
| T5  | External system mock (Transportstyrelsen) | Validate integration capability      | Mock API returns vehicle data; system handles both success and "not found" responses                                                      |
| T6  | BankID signing mock                       | Validate Swedish authentication flow | Mock accepts personnummer; system handles success, failure, and timeout scenarios                                                         |
| T7  | Policy document generation (Swedish)      | Validate localization                | Confirmation response and any generated documents use Swedish text and formatting (SEK currency, Swedish date format)                     |
| T8  | Audit trail and regulatory logging        | Validate compliance capability       | Every API call and state transition is logged with timestamp, actor, and action; logs are queryable                                       |

## Evaluation Criteria

| Criterion                 | Weight | What We Assess                                                                                                                 |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Implementation speed      | 25 %   | How quickly vendor delivers working PoC (target: 4–6 weeks)                                                                    |
| Configuration vs code     | 20 %   | How much was configured (low-code) vs custom coded                                                                             |
| API quality               | 15 %   | REST API design, auto-generated documentation, developer experience                                                            |
| Swedish-specific handling | 15 %   | Personnummer validation, BankID flow, Swedish text, SEK formatting, regulatory fields                                          |
| Rules engine flexibility  | 15 %   | Ease of changing rating factors, bonus table, coverage tiers without redeployment                                              |
| Data model fit            | 10 %   | How well platform data model maps to our [documented domain model](../phase-1-motor/user-stories/quote-and-bind.md#data-model) |

### Scoring Guide

Each criterion is scored on a 1–5 scale:

| Score | Meaning                                            |
| ----- | -------------------------------------------------- |
| 1     | Does not meet requirement                          |
| 2     | Partially meets requirement with significant gaps  |
| 3     | Meets requirement with minor gaps                  |
| 4     | Fully meets requirement                            |
| 5     | Exceeds requirement, demonstrates additional value |

The weighted score is calculated as: `score x weight` per criterion, summed
to a total out of 5.00.

## Timeline

| Week | Activity                                                               |
| ---- | ---------------------------------------------------------------------- |
| 1    | Vendor kickoff, requirements walkthrough, environment setup            |
| 2–3  | Core implementation (quote flow, rating engine, product configuration) |
| 4    | Integration mocks (Transportstyrelsen, BankID), Swedish localization   |
| 5    | Demo preparation, documentation, edge-case testing                     |
| 6    | **PoC Demo Day** — vendor presents to TryggFörsäkring evaluation team  |

### Week 1 — Kickoff

- TryggFörsäkring provides the input document package (see below)
- Vendor sets up development and demo environments
- Joint walkthrough of UC-QNB-001 and underwriting rules
- Vendor confirms understanding and raises clarification questions

### Weeks 2–3 — Core Implementation

- Quote creation API with premium calculation
- Rating engine with the six PoC factors
- Bonus class table (1–15) with correct discount percentages
- Coverage tier configuration (trafik/halv/hel)

### Week 4 — Integration and Localization

- Transportstyrelsen mock integration (vehicle lookup)
- BankID signing mock integration
- Swedish text, personnummer validation, SEK currency formatting
- Audit trail logging

### Week 5 — Preparation

- End-to-end testing of the full PoC flow
- API documentation (OpenAPI specification)
- Demo script preparation
- Edge-case and error-handling testing

### Week 6 — Demo Day

- Vendor demonstrates end-to-end flow to evaluation team
- Live walkthrough of configuration changes (add a rating factor, modify bonus
  table)
- Q&A session with technical and business evaluators
- Vendor submits final documentation package

## Input Documents for Vendors

Vendors receive the following existing Phase 1 documentation:

| Document                  | Description                                                           | Location                                                                                                   |
| ------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| UC-QNB-001                | Motor Quote & Bind use case — main scenario and alternative flows     | [Use case: Quote and Bind](../phase-1-motor/use-cases/quote-and-bind.md)                                   |
| QNB user stories          | Quote and bind user stories (QNB-01 through QNB-08)                   | [User stories: Quote and Bind](../phase-1-motor/user-stories/quote-and-bind.md)                            |
| UWB user stories          | Underwriting rules and bonus system (UWB-01 through UWB-07)           | [User stories: Underwriting and Bonus](../phase-1-motor/user-stories/underwriting-bonus.md)                |
| Rating factors table      | 13 rating factors with value bands and impact types                   | [UWB-03 rating factor catalog](../phase-1-motor/user-stories/underwriting-bonus.md#rating-factor-catalog)  |
| Bonus class table         | 15-class table with discount percentages                              | [UWB-01 bonus class table](../phase-1-motor/user-stories/underwriting-bonus.md#bonus-class-table)          |
| Coverage tier definitions | Trafikförsäkring, halvförsäkring, helförsäkring scope and deductibles | [Coverage tier definitions](../phase-1-motor/user-stories/underwriting-bonus.md#coverage-tier-definitions) |
| Glossary                  | Swedish insurance term definitions                                    | [Glossary](../glossary.md)                                                                                 |
| Actor definitions         | Relevant actors (Customer, Transportstyrelsen, BankID)                | [Actors](../actors/index.md)                                                                               |

## Test Data

Vendors receive a pre-configured test data set for the Transportstyrelsen mock:

| Registreringsnummer | Make       | Model   | Year | Owner           |
| ------------------- | ---------- | ------- | ---- | --------------- |
| ABC 123             | Volvo      | XC60    | 2022 | Test Testsson   |
| DEF 456             | Volkswagen | Golf    | 2019 | Anna Andersson  |
| GHI 789             | Tesla      | Model 3 | 2023 | Erik Eriksson   |
| JKL 012             | Toyota     | Corolla | 2015 | Maria Johansson |
| MNO 345             | BMW        | 320d    | 2020 | Karl Karlsson   |

Each test vehicle maps to a different risk classification group to exercise the
rating engine across vehicle types.

## Success Criteria

A PoC is considered **successful** if:

- [ ] End-to-end quote flow works (registration number entry, vehicle lookup,
      premium calculation, quote presentation, BankID signing, policy creation)
- [ ] Rating factors are configurable without code changes
- [ ] Bonus class table (1–15) is maintainable by business users
- [ ] API documentation is auto-generated and developer-friendly (OpenAPI 3.x)
- [ ] Swedish text and personnummer handled correctly throughout
- [ ] Regulatory audit trail captured for all state transitions
- [ ] Delivered within the 6-week timeframe

A PoC is considered **failed** if any of the following apply:

- End-to-end flow does not complete without manual intervention
- Rating factor changes require code deployment
- Bonus class table cannot be modified by a non-technical user
- No API documentation is produced
- Swedish localization is incomplete or incorrect
- Audit trail is missing or not queryable

## Deliverables

Each vendor submits the following at the end of the PoC:

| #   | Deliverable             | Format                                                                              |
| --- | ----------------------- | ----------------------------------------------------------------------------------- |
| D1  | Working PoC environment | Cloud-hosted or local demo                                                          |
| D2  | API specification       | OpenAPI 3.x (YAML or JSON)                                                          |
| D3  | Configuration guide     | Document showing how rating factors, bonus table, and coverage tiers are configured |
| D4  | Architecture overview   | Diagram and description of the PoC solution architecture                            |
| D5  | Demo script             | Step-by-step script used during Demo Day                                            |
| D6  | Lessons learned         | Vendor's observations on fit, gaps, and recommendations                             |

## Regulatory Considerations

Although the PoC uses mocked integrations, vendors must demonstrate awareness
of the regulatory requirements that apply to the full production system:

| Regulation   | PoC Expectation                                                                      |
| ------------ | ------------------------------------------------------------------------------------ |
| **FSA-004**  | Premium calculation is transparent; breakdown is visible to the customer             |
| **FSA-007**  | Trafikförsäkring is offered as the mandatory minimum tier                            |
| **FSA-012**  | Pre-contractual information is presented before signing                              |
| **GDPR-001** | Personnummer and personal data are handled securely; audit trail records data access |
| **IDD-001**  | The PoC flow acknowledges the demands-and-needs step (simplified for PoC scope)      |
| **IDD-002**  | Coverage details per tier are presented before binding                               |

**Reference:**
[FSA requirements](../regulatory/fsa-requirements.md),
[GDPR mapping](../regulatory/gdpr-mapping.md),
[IDD compliance](../regulatory/idd-compliance.md)

## Dependencies

- RFP evaluation must be complete with two finalists selected
- Input document package must be finalized and approved for external
  distribution
- Test data set for Transportstyrelsen mock must be prepared
- Evaluation team members must be identified and available for Demo Day
