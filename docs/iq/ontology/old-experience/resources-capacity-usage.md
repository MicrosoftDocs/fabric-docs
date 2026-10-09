---
title: Billing and Capacity Usage - Old Experience
description: Learn how ontology (preview) capacity usage is billed and reported in the old experience.
ms.date: 03/20/2026
ms.topic: concept-article
ms.search.form: Ontology Billing
---

# Capacity consumption for ontology (preview) - Old experience

[!INCLUDE [Ontology old experience note](includes/old-experience-note.md)]

This article explains how billing and reporting work for ontology (preview) capacity usage.

[!INCLUDE [Fabric feature-preview-note](../../../includes/feature-preview-note.md)]

## Consumption rates

>[!IMPORTANT]
> Billing for ontology (preview) is in effect, except where this article specifically notes that charges apply only to associated underlying Fabric items.

The following table shows how many capacity units (CU) you consume when you use an ontology (preview) item.

| Meter name | Operation name | Description | Unit of measure | Fabric consumption rate |
| --- | --- | --- | --- | --- |
| Ontology Modeling | Ontology Modeling | Measures the usage of ontology definitions, including entity types, relationships, properties, and data bindings. | Per ontology definition usage <br><br>*Usage is defined by intervals of at minimum 30 minutes, each time the API is triggered by Create/Update/Delete (CUD) operations to entity types, properties, relationship types, or bindings.* | 0.0039 CU per hour |
| Ontology Logic and Operations​ | Ontology Logic and Operations​ | Measures the usage for ontology operations, including visualizations, logic, graph creation, ontology exploration, and querying and analyzing with query endpoints, including API and SQL analytics endpoints. | Per min | 0.666667 CU per min <br><br>*This meter isn't currently in effect.* |
| Ontology AI | Ontology AI Operations | Measures the usage of AI for context-driven reasoning and query over ontology. | (Input) Per 1,000 Tokens <br><br>(Output) Per 1,000 Tokens | (Input) 400 CU seconds <br><br>(Output) 1,600 CU seconds |
| OneLake Cache | Graph cache storage | Use of graph incurs [graph cache storage](../../../graph/overview.md#pricing-and-capacity-units), which is billed at the same rate as [OneLake Cache](https://azure.microsoft.com/pricing/details/microsoft-fabric/). | [OneLake Cache usage per month](https://azure.microsoft.com/pricing/details/microsoft-fabric/) |  [OneLake Cache usage per month](https://azure.microsoft.com/pricing/details/microsoft-fabric/) |

## Capacity usage examples

This section provides more details about capacity usage calculations for each ontology (preview) operation, including examples.

### Ontology Modeling

When a create, update, or delete (CUD) operation triggers the ontology API, it starts a usage window that lasts 30 minutes. Billing starts when the first CUD operation is triggered, and the time continues for 30 minutes after the last operation is triggered.

For example, suppose you have 1,000 ontology definitions made up of a combination of entity types, properties, and relationship types. When you edit a property, the consumption is 1,000 definitions * 0.5 hours (unit of measurement for ontology definition usage; 30 minutes represented in hours) * 0.0039 CU/hr (Fabric consumption rate of this operation) = 1.95 CU hours.

Now, suppose you trigger a second operation 15 minutes later. The total time calculated is the original 30 minutes from the first operation + (no extra charge for the 15 minutes where the windows overlap) + 15 minutes at the end for the remainder of the second operation's window = 45 minutes of measured time, or 0.75 hours. This calculation avoids overlapping or restarting the window, preventing double-counting when summing usage across multiple actions.

### Ontology Logic and Operations​

You incur Ontology Logic and Operations usage when ontology actively executes compute operations. Examples of operations that contribute to this meter include changing the properties on an entity that underwent data binding, traversing the graph, querying data through the entity type overview tiles, refreshing the graph, or exploring the graph by using the ontology API or SQL. Usage is measured in minutes of CPU uptime. Each query session includes a 20-minute window after the last query.

For example, suppose you run ontology exploration and workload queries continuously for 2 hours (120 minutes) in a single session. The calculated time for this meter is 140 minutes (120 active minutes + 20-minute window) * 0.666667 CU/min (Fabric consumption rate of this operation) = 93.3 CU minutes (or 1.56 CU hours).

*This meter isn't currently in effect. Ontology users are only billed for logic and operations according to their underlying [Fabric Graph](../../../graph/overview.md#pricing-and-capacity-units) usage.*

### Ontology AI Operations

Ontology AI Operations are classified as **background jobs** that handle a higher volume of requests during peak hours.

Fabric optimizes performance by allowing operations to access more CU (capacity unit) resources than are allocated to their capacity. Fabric [smooths](../../../enterprise/throttling.md#smoothing-spread-cu-usage-across-future-timepoints), or averages, the CU usage of a *background job* over a 24-hour period. Then, per the Fabric throttling policy, the first phase of throttling begins when a capacity consumes all its CU resources that are allocated for the next 10 minutes.

For example, assume each ontology request has 2,000 input tokens and 500 output tokens. The price for one ontology request is calculated as follows: [[2,000 (number of input tokens) × 400 (Fabric consumption rate of inputs for this operation)] + [500 (number of output tokens) × 1600 (Fabric consumption rate of outputs for this operation)]] / 1,000 (unit of measurement for this operation) = 1,600.00 CU seconds, or 26.67 CU minutes.

Because ontology is a background job and usage is averaged over a 24-hour period, this example request that takes 26.67 CU minutes consumes, on average, one CU minute of each hour of a capacity. On an F64 capacity with 64 * 24 = 1,536 CU hours in a day, if each ontology job consumes 26.67 CU minutes = 0.44 CU hours, you could run more than 3,456 of these requests each day before exhausting the capacity.

## Monitor usage

The [Microsoft Fabric Capacity Metrics](../../../enterprise/metrics-app.md) app provides visibility into capacity usage for all Fabric workloads in one place. Administrators can use the app to monitor capacity, the performance of workloads, and their usage compared to purchased capacity. The Microsoft Fabric Capacity Metric app shows operations for ontology (preview).

A capacity admin must install the Microsoft Fabric Capacity Metrics app. Once the app is installed, you can grant permissions to view the app to anyone in the organization. For more information about the app, see [Install the Microsoft Fabric Capacity Metrics app](../../../enterprise/metrics-app.md#install-the-app).

## Manage usage

This section contains tips for managing your ontology (preview) capacity usage.

### Pause and resume activity

Microsoft Fabric allows administrators to [pause and resume](../../../enterprise/pause-resume.md) their capacities to enable cost savings. You can pause and resume your capacity as needed.

### Other considerations

Consider the following factors that could potentially affect cost:

* **Modeling:** Charges for the time your ontology model is running. This factor is dependent on the number of definitions, model complexity, size, and usage time.
* **Ontology logic and operations:** Charges for running queries and associated compute. Operations like indexing, refresh rates, and idle time can affect CU usage.
* **AI reasoning and query:** Charges for advanced reasoning and natural language queries powered by AI, based on the number of tokens used.
* **Associated Fabric items:** Charges from associated Fabric items that you're using through ontology, like [Fabric Graph](../../../graph/overview.md#pricing-and-capacity-units) and [Fabric Activator](../../../real-time-intelligence/data-activator/activator-capacity-usage.md).
* **Graph refresh:** The [Graph in Microsoft Fabric](../../../graph/overview.md) child item of your ontology (preview) item can be set to refresh automatically on a set schedule, and these refreshes contribute to capacity usage. If capacity usage is too high, you can edit or disable the Graph item schedule in your workspace. For more information, see [Refresh the graph model](how-to-view-entity-type-details.md#refresh-the-graph-model).

### Subject to changes in Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft provides notice of changes through email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog.
