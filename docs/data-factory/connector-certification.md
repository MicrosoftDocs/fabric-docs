---
title: Data Factory Connector Certification
description: Guidelines on connector certification and implementation requirements for the Data Factory Connector Certification Program
author: ptyx507x
ms.topic: conceptual
ms.date: 5/13/2025
ms.author: miescobar
ms.custom:
  - intro-internal
  - connectors
---

# Data Factory Connector Certification

> [!IMPORTANT]
> The connector certification program is currently undergoing changes and the registration for new connector certifications is currently on hold. This article will be updated once the connector certification program opens up again for new partners. 

Data source owners who develop a custom connector for their data source might want to distribute their custom connector more broadly to Data Factory users. Once a custom connector is created, used, and validated by end users, the data source owner can submit it for Microsoft certification.

Certifying a Data Factory connector makes the connector available publicly, out-of-box, Microsoft Fabric Data Factory and Microsoft Power BI in the following experiences:
* Microsoft Fabric Dataflow Gen2
* Microsoft Power BI Dataflow Gen1
* Microsoft Power BI Datamart
* Microsoft Power BI semantic model (in the Power BI Service)
* Microsoft Power BI Desktop
* On-premises data gateway for Microsoft Fabric and Microsoft Power BI

Certified connectors are:

* Maintained by the partner developer

* Supported by the partner developer

* Certified by Microsoft

* Distributed by Microsoft

We work with partners to try to make sure that they have support in maintenance, but customer issues with the connector itself are directed to the partner developer.

>[!NOTE]
>Today you can leverage the [Power Query SDK](/power-query/install-sdk) to create a connector that can be certified through the Data Factory connector certification program. Head over to the [Power Query SDK overview](/power-query/power-query-sdk-vs-code) to learn more about this tool.

## Certification Overview

### Prerequisites

To ensure the best experience for our customers, we only consider connectors that meet a set of prerequisites for certification:

* **The connector must be for a public product**.

* **The connector must be considered code-complete for an initial release version**. The program allows for frequent iterations and updates. Microsoft doesn't offer technical assistance or custom connector development consulting. We recommend using public resources such as our SDK documentation and samples repository. If you require further assistance, we can share a list of known 3rd-party industry custom connector development consultants that you might want to engage directly, separate from any Microsoft program or partnership. Microsoft isn't affiliated with any of these consultants and isn't responsible for your use of their services. Microsoft provides the list for your convenience and without any assurances, recommendations, or guarantees. To learn more, reach out to your Microsoft certification contact.

* **The developer must provide an estimate for current and future usage**. 

* **The connector must be already made available to customers directly to fulfill a user need or business scenario**. This criteria can be fulfilled using a preview program by distributing the completed connector directly to end users and organizations. We suggest that developers of connectors to use a [self-distribution mechanism](/power-query/install-sdk#self-distribution) and run internal testing of their own connectors to iterate over their connectors under a controlled group. Each user or organization should be able to provide feedback and validation that there's a business need for the connector and that the connector is working successfully to fulfill their business requirements.

* **The connector must be working successfully at an anticipated level of usage by customers**.

* **There must be a thread in the [Fabric Ideas forum](https://aka.ms/FabricIdeas) driven by customers to indicate demand to make the connector publicly available in Data Factory and / or Power BI**. There's no set threshold of engagement. However the more engagement, the stronger the evidenced demand for the connector.

These prerequisites exist to ensure that connectors undergoing certification have significant customer and business need to be used to and supported post-certification.

## Certification Requirements

We have a certain set of requirements for certification. We recognize that not every developer can meet these requirements, and we're hoping to introduce a feature set that will handle developer needs in short order.
  
### Features and Style

The connector must follow a set of feature and style rules to meet a usability standard consistent with other certified connectors.

* The connector MUST:

  * Use Section document format.
  * Contain a [version header/adornment](/power-query/handling-versioning) above the section document.
  * Provide [function documentation metadata](/power-query/handling-documentation).
  * Have [TestConnection handler](/power-query/handling-gateway-support).
  * Follow naming conventions (for example, `DataSourceKind.FunctionName`). It shouldn't include words like "Fabric", "Power BI", "Connector", or "API".
  * Return data in tabular format, organized into tables with columns, as for a relational data source. Multidimensional formats based on cubes, dimensions, and measures aren't supported.
  * Behave the same in Import and DirectQuery mode, returning identical results.
  * Have the Beta flag set to True on initial release.

* The ```FunctionName``` should make sense for the domain (for example "Contents", "Tables", "Document", "Databases", and so on).

* The connector SHOULD:
  * Have icons.
  * Provide a navigation table.
  * Place strings in a `resources.resx` file. URLs and values should be hardcoded in the connector code and not be placed in the `resources.resx` file.

### Security

There are specific security considerations that your connector must handle.

* If `Extension.CurrentCredentials()` is used:
  * Is the usage required? If so, where do the credentials get sent to?
  * Are the requests guaranteed to be made through HTTPS?
    * You can use the [HTTPS enforcement helper function](/power-query/helper-functions#validateurlscheme).
  * If the credentials are sent using `Web.Contents()` via GET:
    * Can it be turned into a POST?
    * If GET is required, the connector MUST use the `CredentialQueryString` record in the `Web.Contents()` options record to pass in sensitive credentials.

* If [Diagnostics.* functions](/powerquery-m/diagnostics-trace) are used:
  * Validate what is being traced; data **must not contain PII or large amounts of unnecessary data**.
  * If you implemented significant tracing in development, you should implement a variable or feature flag that determines if tracing should be on. This tracing must be **turned off** prior to submitting for certification.

* If ```Expression.Evaluate()``` is used:
  * Validate where the expression is coming from and what it is (that is, can dynamically construct calls to `Extension.CurrentCredentials()`, and so on).
  * The ```Expression``` shouldn't be user provided nor take user input.
  * The ```Expression``` shouldn't be dynamic (that is, retrieved from a web call).

## After Certification

After your connector is certified and released through Microsoft Fabric and Microsoft Power BI experiences, there are a few things that you should do to ensure you can correctly use the production-deployed publicly available certified connector.

* You and end users should use the certified connector version included in environments prior to certification (such as Power BI Desktop and the Data Gateway) and remove any existing .mez or .pqx files (custom connectors) used prior to certification. Failure to do so might result in your testing custom connector being used by Power Query inadvertently instead of the newly certified connector.
* Custom connectors should only be used to test new versions of the connector.
* When working with end users and customers, ensure that they understand the custom connector version used in testing prior to certification should be removed after testing is complete and the new certified connector version is available.
