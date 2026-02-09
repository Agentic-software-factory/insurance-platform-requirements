---
sidebar_position: 99
---

# Glossary

Swedish insurance terminology and domain-specific vocabulary used throughout the
TryggFörsäkring requirements documentation. Terms are organized by category.

## Insurance Products

| Swedish Term            | English Translation                       | Definition                                                                                                                                                                                                      |
| ----------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Helförsäkring**       | Full comprehensive insurance              | The highest tier of motor insurance (tier 3). Includes trafikförsäkring, all halvförsäkring coverages, plus collision damage (vagnskadeförsäkring).                                                             |
| **Halvförsäkring**      | Partial comprehensive insurance           | Mid-tier motor insurance (tier 2). Includes trafikförsäkring plus fire, theft, glass damage, rescue/roadside assistance, and legal expenses. Does not include collision damage.                                 |
| **Kaskoförsäkring**     | Comprehensive/collision coverage          | General term for voluntary motor insurance that goes beyond mandatory trafikförsäkring. Covers damage to the policyholder's own vehicle.                                                                        |
| **Trafikförsäkring**    | Mandatory third-party liability insurance | Legally required motor insurance under Trafikskadelagen (1975:1410). Covers personal injury to all parties and property damage to third parties. Every registered vehicle in Sweden must have trafikförsäkring. |
| **Vagnskadeförsäkring** | Collision damage insurance                | Covers damage to the policyholder's own vehicle caused by collisions, regardless of fault. Included in helförsäkring but not halvförsäkring.                                                                    |
| **Vagnskadegaranti**    | Collision damage warranty                 | Manufacturer or dealer warranty covering collision damage, typically for the first 3 years on new vehicles. Replaces vagnskadeförsäkring during the warranty period.                                            |

## Business Terms

| Swedish Term                   | English Translation                               | Definition                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bonusklass** / **Bonusgrad** | No-claims discount class                          | A scale (typically 1–7) that tracks the policyholder's claims history. Higher bonus class means a larger premium discount. A claim-free year moves the class up; a claim moves it down. |
| **Försäkrad**                  | Insured person                                    | The person or entity covered by the insurance policy. May differ from the policyholder (försäkringstagare).                                                                             |
| **Försäkringsförlängning**     | Policy renewal                                    | The process of extending an existing policy for a new term period, typically 12 months. Renewal occurs on the huvudförfallodag unless the policyholder cancels.                         |
| **Försäkringsgivare**          | Insurer                                           | The insurance company that underwrites and issues the policy. TryggFörsäkring AB is the försäkringsgivare in this platform.                                                             |
| **Försäkringstagare**          | Policyholder                                      | The person or entity that owns the insurance policy and is responsible for premium payments.                                                                                            |
| **Huvudförfallodag**           | Policy anniversary / main renewal date            | The annual date on which a policy renews. Premium adjustments, bonus class changes, and renewal terms take effect on this date.                                                         |
| **Premie**                     | Premium                                           | The amount the policyholder pays for insurance coverage, typically annually or monthly. Determined by risk factors including vehicle type, driver history, and bonus class.             |
| **Självrisk**                  | Deductible / excess                               | The amount the policyholder must pay out-of-pocket before insurance coverage applies to a claim. Different coverage types may have different deductible levels.                         |
| **Skadeanmälan**               | First notification of loss (FNOL) / claims report | The formal report submitted by the policyholder or claimant to initiate the claims process after an insured event.                                                                      |
| **Skadereglering**             | Claims settlement / claims adjustment             | The process of investigating, evaluating, and resolving an insurance claim, including determination of liability and payment of benefits.                                               |
| **Ångerrätt**                  | Right of withdrawal / cooling-off period          | The policyholder's legal right to cancel a new insurance policy within 14 days of purchase without penalty, as required by the Insurance Distribution Directive (IDD).                  |

## Regulatory and Legal

| Swedish Term                          | English Translation                           | Definition                                                                                                                                                                                     |
| ------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Finansinspektionen** / **FI**       | Swedish Financial Supervisory Authority (FSA) | The government agency responsible for supervising and regulating financial markets and firms in Sweden, including insurance companies. See [FSA Requirements](regulatory/fsa-requirements.md). |
| **Försäkringsavtalslagen** / **FAL**  | Insurance Contracts Act                       | Swedish law governing the contractual relationship between insurers and policyholders, including disclosure obligations, claims handling, and policyholder rights.                             |
| **Försäkringsrörelselagen** / **FRL** | Insurance Business Act                        | Swedish law regulating the operations of insurance companies, including solvency requirements, governance, and reporting obligations.                                                          |
| **GDPR**                              | General Data Protection Regulation            | EU regulation governing the processing of personal data. Applies to all personal data handled in insurance operations. See [GDPR Data Mapping](regulatory/gdpr-mapping.md).                    |
| **IDD**                               | Insurance Distribution Directive              | EU directive governing insurance distribution, requiring demands-and-needs assessments, product oversight, and disclosure to customers. See [IDD Compliance](regulatory/idd-compliance.md).    |
| **IPID**                              | Insurance Product Information Document        | A standardized document required by IDD that provides key information about an insurance product in a clear, concise format before purchase.                                                   |
| **Trafikskadelagen**                  | Motor Traffic Damage Act (1975:1410)          | Swedish law establishing mandatory motor insurance (trafikförsäkring) and governing liability for traffic-related injuries and property damage.                                                |

## Organizations

| Swedish Term                               | English Translation                      | Definition                                                                                                                                                                               |
| ------------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Integritetsskyddsmyndigheten** / **IMY** | Swedish Authority for Privacy Protection | The national supervisory authority for data protection and privacy in Sweden. Enforces GDPR compliance.                                                                                  |
| **Konsumentverket**                        | Swedish Consumer Agency                  | Government agency responsible for consumer rights and fair trade practices. Relevant for insurance consumer protection and marketing regulations.                                        |
| **Trafikförsäkringsföreningen** / **TFF**  | Swedish Motor Insurers                   | Industry organization that all companies selling trafikförsäkring must be members of. TFF also provides trafikförsäkring for uninsured vehicles and manages the central claims database. |
| **Transportstyrelsen**                     | Swedish Transport Agency                 | Government agency managing the vehicle registry (fordonsregistret). Insurance companies integrate with Transportstyrelsen to verify vehicle data and report insurance status.            |

## Identity and Systems

| Swedish Term            | English Translation               | Definition                                                                                                                                                                                       |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **BankID**              | Swedish electronic identification | The dominant digital identity solution in Sweden. Used for strong customer authentication, digital signing of insurance contracts, and identity verification throughout the insurance lifecycle. |
| **Organisationsnummer** | Corporate registration number     | A unique identifier assigned to Swedish legal entities by Bolagsverket. Used to identify corporate policyholders and business partners.                                                          |
| **Personnummer**        | Swedish personal identity number  | A 12-digit identifier (YYYYMMDD-XXXX) assigned to every Swedish resident. Used as the primary key for identifying individual policyholders and insured persons.                                  |
| **Registreringsnummer** | Vehicle registration number       | The license plate number assigned to vehicles by Transportstyrelsen. Used as the primary identifier for insured vehicles in motor insurance policies.                                            |
