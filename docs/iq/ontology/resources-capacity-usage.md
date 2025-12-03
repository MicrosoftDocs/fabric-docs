---
title: Billing and capacity usage
description: Learn how ontology (preview) capacity usage is billed and reported.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/03/2025
ms.topic: concept-article
ms.search.form: Ontology Billing
---

# Capacity consumption for ontology (preview)

This article contains information about how ontology (preview) capacity usage is billed and reported.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Consumption rates

>[!IMPORTANT]
> Billing for ontology (preview) is not currently in effect, except where otherwise noted for associated underlying Fabric items that are being used. The information provided in this article is for informational purposes and is subject to change.

The following table defines how many capacity units (CU) are consumed when an ontology (preview) item is used.

| Meter name | Operation name | Description | Unit of measure | Fabric consumption rate |
| --- | --- | --- | --- | --- |
| Ontology Modeling | Ontology Modeling | Measures the usage of ontology definitions (including entity types, relationships, properties, and bindings). | Per ontology definition usage <br><br>*Usage is defined by intervals of at minimum 30 minutes, each time the API is triggered by CRUD definitions like entity types, relationships, properties, or bindings.* | 0.0039 CU per hour |
| Ontology Logic and Operations​ | Ontology Logic and Operations​ | Measures the usage for ontology operations, including visualizations, logic, graph creation, ontology exploration, and querying and analyzing with query endpoints (including API and SQL endpoints) | Per min | 0.666667 CU per min <br><br>*While ontology (preview) billing isn't in effect, users are billed according to their [Fabric Graph](../../graph/overview.md#pricing-and-capacity-units) usage.* |
| Ontology AI | Ontology AI Operations | Measures the usage of AI for context driven reasoning and query over ontology | (Input) Per 1,000 Tokens <br><br>(Output) Per 1,000 Tokens | (Input) 400 CU seconds <br><br>(Output) 1,600 CU seconds <br><br>*While ontology (preview) billing isn't in effect, users are billed according to their [Copilot in Fabric](../../fundamentals/copilot-fabric-consumption.md) usage.* |

## Capacity Usage example
**Ontology Modeling**
Billing starts with the first action and the time will continue for 30 mins from the last activity.

For example, assume there are 1000 Ontology definitions of a combination of entity types, relationships, properties. User makes an edit to  a property, the consumption is 1000 * 0.5 * 0.0039 = 1.95 CU hours.  

When an ontology modelling action (e.g. create, update, delete) is done, it initiates a usage window of 30 minutes. This starting point can be labeled as "X." If a second action is trigger at X + 15 minutes, you add the 30-minute block from the first plus the 15-minute interval before the next, totaling 45 minutes of measured. Rather than overlapping or restarting the window., this avoids double-counting and provides a straightforward way to sum usage across multiple actions.

  
**Ontology Logic and Operations​**
This measures ontology operations including visualizations, ontology exploration, and querying and analyzing with query endpoints. Usage is measured in minutes of CPU uptime.

*While ontology (preview) billing isn't in effect, users are billed according to their [Fabric Graph](../../graph/overview.md#pricing-and-capacity-units) usage.*

**Ontology AI Operations**

Ontology AI Operations are classified as "background jobs" to handle a higher volume of requests during peak hours. 

Fabric is designed to provide fast performance by allowing operations to access more CU (Capacity Units) resources than are allocated to capacity. Fabric [smooths](https://learn.microsoft.com/fabric/enterprise/throttling#smoothing) or averages the CU usage of an "interactive job" over a minimum of 5 minutes and a "background job" over a 24-hour period. According to the Fabric throttling policy, the first phase of throttling begins when a capacity has consumed all its available CU resources for the next 10 minutes.

For example, assume each Ontology request has 2,000 input tokens and 500 output tokens. The price for one Ontolgy request is calculated as follows: (2,000 × 400 + 500 × 1600) / 1,000 = 1,600.00 CU seconds = 26.67 CU minutes.

Since Ontology is a background job, each request (~26.67 CU minute job) consumes only one CU minute of each hour of a capacity. For a customer on F64 who has 64 * 24 CU Hours (1,536) in a day, and each Ontology job consumes (26.67 CU mins / 60 mins) = 0.44 CU Hours, customers can run over 3456 requests before they exhaust the capacity. However, once the capacity is exhausted, all operations will shut down.

*While ontology (preview) billing isn't in effect, users are billed according to their [Copilot in Fabric](../../fundamentals/copilot-fabric-consumption.md) usage.*

## Monitor usage

The [Microsoft Fabric Capacity Metrics](../../enterprise/metrics-app.md) app provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity. The Fabric Capacity Metric app shows operations for ontology (preview).

The Microsoft Fabric Capacity Metrics app must be installed by a capacity admin. Once the app is installed, anyone in the organization can be granted permissions to view the app. For more information about the app, see [Install the Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md#install-the-app).

>[!IMPORTANT]
> Billing for ontology (preview) is not currently in effect, except where otherwise noted for associated underlying Fabric items that are being used. The information provided in this article is for informational purposes and is subject to change.

## Manage usage

This section contains tips for managing your ontology (preview) capacity usage.

### Pause and resume activity

Microsoft Fabric allows administrators to [pause and resume](../../enterprise/pause-resume.md) their capacities to enable cost savings. You can pause and resume your capacity as needed.

### Other considerations

Consider the following factors that could potentially affect cost:

* **Model uptime:** Charges for the time your ontology model is running. This factor is dependent on the number of definitions, model complexity, size, and usage time.
* **Ontology logic and operations:** Charges for running queries and associated compute. Operations like indexing, refresh rates, and idle time can affect CU usage.
* **AI reasoning and query:** Charges for advanced reasoning and natural language queries powered by AI, based on the number of tokens used.

### Subject to changes in Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft provides notice of changes through email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog.