---
title: Billing and capacity usage
description: Learn how ontology (preview) capacity usage is billed and reported.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 11/21/2025
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
| Ontology Logic and Operations​ | Ontology Logic and Operations​ | Measures the usage for ontology operations, including visualizations, logic, graph creation, ontology exploration, and querying and analyzing with query endpoints (including API and SQL endpoint) | Per hour | 40 CU per hour <br><br>*While ontology (preview) billing isn't in effect, users are billed according to their [Fabric Graph](../../graph/overview.md#pricing-and-capacity-units) usage.* |
| Ontology AI | Ontology AI Operations | Measures the usage of AI for context driven reasoning and query over ontology | (Input) Per 1,000 Tokens <br><br>(Output) Per 1,000 Tokens | (Input) 400 CU seconds <br><br>(Output) 1,600 CU seconds <br><br>*While ontology (preview) billing isn't in effect, users are billed according to their [Copilot in Fabric](../../fundamentals/copilot-fabric-consumption.md) usage.* |

## Monitor usage

The [Microsoft Fabric Capacity Metrics](../../enterprise/metrics-app.md) app provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity. The Microsoft Fabric Capacity Metric app shows operations for ontology (preview).

The Microsoft Fabric Capacity Metrics app must be installed by a capacity admin. Once the app is installed, anyone in the organization can be granted permissions to view the app. For more information about the app, see [Install the Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md#install-the-app).

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