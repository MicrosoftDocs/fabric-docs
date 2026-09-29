---
title: Billing and Capacity Usage for the New Ontology Experience
description: Learn how the new ontology experience in Microsoft Fabric consumes capacity, how operations are billed, and how to monitor usage.
ms.date: 09/22/2026
ms.topic: concept-article
ms.search.form: Ontology Billing
---

# Billing and capacity usage for the new ontology experience

This article applies to the new ontology experience in Microsoft Fabric.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Consumption rates

A single action can use more than one operation. For example, an agent answering a question might read the ontology, query a child graph or eventhouse item, and use AI to produce a response. Each operation measures a different part of that work.

| Meter name | Operation name | Description | Rate |
| --- | --- | --- | --- |
| Ontology Discovery | `Ontology Discovery` | Read calls that retrieve ontology definitions through the UI or ontology MCP server. | 1,000 CU-seconds per read call |
| Ontology Logic and Operations | `Ontology Logic and Operations - <child operation name>` | Usage of the ontology's child Eventhouse and Graph items. | The same rate as the child item |
| Ontology AI | `Ontology AI Reasoning` | Usage of the ontology MCP server and ontology agent. | Token-based model usage |

## Variable AI capacity consumption

Starting October 1, 2026, the amount of capacity consumed by an impacted AI task can vary based on the work required to complete it. For example, a request that summarizes a narrow dataset with a smaller model can consume a different amount of capacity than a request that retrieves broad business context, uses deeper reasoning, calls multiple services, generates queries, and runs longer.

Capacity consumption can vary based on these factors:

- The AI model used and the reasoning effort required for the task.
- The context and complexity of the request, including instructions, data sources, conversation history, and business metadata.
- The tools and services used to complete the request.
- The orchestration and processing required to run the task from start to finish.

This change doesn't introduce a new billing currency or change how you purchase and manage Fabric capacity. It changes how select AI activity is translated into CU consumption so that consumption more closely reflects the resources required by each task.

## Storage

Standard OneLake storage and read/write operation charges apply when you use those services, including for ontology definitions stored in OneLake.

## Monitor usage

Use the [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md) to monitor ontology consumption alongside other workloads on your capacity. A capacity administrator installs the app and grants access to other users.

## Subject to changes in Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft provides notice of changes through email and in-product notifications. Changes are effective on the date stated in the release notes and the Microsoft Fabric blog.
