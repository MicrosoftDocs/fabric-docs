---
title: Billing and capacity usage
description: Learn how ontology (preview) capacity usage is billed and reported.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 11/17/2025
ms.topic: concept-article
---

# Capacity consumption for ontology (preview)

This article contains information about how ontology (preview) capacity usage is billed and reported.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Consumption rates

>[!NOTE]
> The ontology meters are in preview and subject to change. Billing start date is estimate end Q1 2026. The implementation of Ontology item (preview) billing is estimated for end Q1 of 2026. Until then, there is no billing for Ontology Item, unless otherwise specified for associated underlying Fabric items that are being used.

The following table defines how many capacity units (CU) are consumed when an ontology (preview) is used.

| Meter Name | Operation Name | Description | Unit of measure | Fabric consumption rate |
| --- | --- | --- | --- | --- |
| Ontology Modeling | Ontology AI | Measures the usage of Ontology definitions (e.g. entity types, relationships, properties, bindings, actions and rules). | Per Ontology definition usage <br><br>*Usage is defined as minimum 30 mins interval each time the API is triggered by CRUD definitions such as entity types, relationships, properties, bindings, actions, and rules etc.* |
| 0.0039 CU per hour |
| Ontology Logic and Operations​ | Ontology Logic and Operations​ | Measures the usage for ontology operations, including visualizations, logic, graph creation, ontology exploration, querying and analyzing with query endpoints (e.g. API, SQL endpoint) | Per hour | *40 CU per hour <br><br>Until Ontology item (preview) billing starts, users will be billed as per [Fabric Graph](https://learn.microsoft.com/fabric/graph/overview#pricing-and-capacity-units) usage.* |
| Ontology AI | Ontology AI Operations | Measures the usage of AI for context driven reasoning and query over Ontology | (Input) Per 1000 Tokens <br><br>(Output) Per 1000 Tokens|
| (Input) 400 CU seconds <br><br>(Output) 1600 CU seconds <br><br>*Until Ontology billing starts, users will be billed as per [Copilot in Fabric](https://learn.microsoft.com/fabric/fundamentals/copilot-fabric-consumption) usage.* |

## Monitoring usage

The [Microsoft Fabric Capacity Metrics](https://learn.microsoft.com/fabric/enterprise/metrics-app) app provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity.

A capacity admin needs to install the Microsoft Fabric Capacity Metrics app. Once the app is installed, anyone in the organization can be granted permissions to view the app. For more information about the app, see [Install the Microsoft Fabric Capacity Metrics app](https://learn.microsoft.com/fabric/enterprise/metrics-app#install-the-app).

In the Fabric Capacity Metric app, you see operations for ontology (preview).

>[!NOTE]
> The ontology meters are in preview and subject to change. Billing start date is estimate end Q1 2026. The implementation of Ontology item (preview) billing is estimated for end Q1 of 2026. Until then, there is no billing for Ontology Item, unless otherwise specified for associated underlying Fabric items that are being used.

## Managing usage

### Pause and Resume Activity

Microsoft Fabric allows administrators to [pause and resume](https://learn.microsoft.com/fabric/enterprise/pause-resume) their capacities to enable cost savings. You can resume your capacity when needed.

## Considerations

* **Model Uptime:** Charges for the time your ontology model is running which is dependent on the number of definitions, model complexity, size and usage time.

* **Ontology logic and operations:** Charges for running queries and associated compute. Operations like indexing, refresh rates, and idle time can affect CU usage.

* **AI Reasoning & Query:** Charges for advanced reasoning and natural language queries powered by AI based on number of tokens used.

###  Subject to changes in Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft provides notice of changes through email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog.