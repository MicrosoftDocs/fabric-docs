---
title: Billing and Capacity Usage for the New Ontology Experience
description: Learn how the new ontology experience in Microsoft Fabric consumes capacity, how operations are billed, and how to monitor usage.
ms.date: 09/29/2026
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
| Ontology Discovery | `Ontology Discovery` | Read requests that retrieve ontology definition from all interfaces like UI, MCP, Ontology Agent or cache definition through the ontology UI and supported ontology interfaces. | 1,000 CU-seconds per Ontology Discovery |
| Ontology Logic and Operations | `Ontology Logic and Operations - <child operation name>` | Usage of the ontology's child Eventhouse and Graph items. | The same rate as the child item |
| Ontology AI | `Ontology AI Reasoning` | Usage of the ontology MCP server and ontology agent. | Dynamic consumption |

## Ontology Discovery

Ontology Discovery is billed for each read call that retrieves the ontology definition through the ontology item interface or ontology MCP server. The ontology item interface caches the definition and reuses it as you navigate among entities, relationships, rules, bindings, properties, and metrics.

When the cached definition is available and current, browsing and selecting items doesn't generate another Discovery call. The ontology item interface retrieves the definition again when the cached copy is missing or out of date, after a successful save, or during an automatic or manual refresh.

### Estimate Discovery usage in the ontology item interface

For a typical session that starts without a current cached definition, estimate one initial definition access, caching after successful changes, and any automatic or manual refresh operations.

> **Estimated Discovery calls = 1 initial read + post-save caches + automatic or manual refresh reads**

Multiply the number of successfully completed Ontology Discovery requests by 1,000 CU-seconds to estimate Discovery consumption. This calculation is a planning estimate, not a fixed charge for each click or save.

| Action in the ontology item interface | Discovery usage |
| --- | --- |
| Open or reload an ontology | Usually one call |
| Browse, select items, search, or move among ontology pages | Usually no additional calls when the cached definition is available and current. A missing or out-of-date definition can require a read. |
| Create, update, or delete metadata and save | Normally one follow-up read to retrieve the saved definition |
| Save a binding without changes | No post-save Discovery read |
| Keep the ontology item open | Automatic refreshes occur approximately every 20 minutes while the ontology item interface is open. Each successfully completed Ontology Discovery request adds consumption. |
| Manually refresh or retry | Each successful metered request adds one call. One click doesn't necessarily result in a fixed number of completed requests. |

Actual usage can vary based on cache state, refresh timing, overlapping saves, and retries. Ontology Discovery usage can occur while the ontology experience remains open because the service may refresh the cached definition automatically. Close the ontology item interface when you finish to avoid extra refreshes.

### How UI updates affect Ontology Discovery usage

After you save a change, the ontology item interface normally retrieves the updated definition from the service. This request confirms the saved result and updates the ontology item interface's cached definition.

Applications that write directly through an API don't automatically trigger this ontology item interface refresh request. Any metered definition reads that an application makes are counted separately. Metering behavior can differ among definition-access APIs and depends on the operation used.

### Discovery usage examples

The following examples assume an initial open without a cached definition and successfully completed Ontology Discovery requests. Unless otherwise stated, they exclude overlapping requests, retries, and other workflows.

#### Review an ontology without making changes

You open an ontology, inspect several entities and relationships, and close it before the next automatic refresh:

- Initial open: one call
- Navigation in the ontology item interface: no additional calls
- Estimated total: **one Ontology Discovery call, or 1,000 CU-seconds**

#### Navigate an ontology

You open an ontology item and navigate immediately to entities, relationships, and properties without making changes:

- Initial open: one call
- Navigation to three ontology pages: no additional calls
- Estimated total: **one Ontology Discovery call, or 1,000 CU-seconds**

#### Make three changes in the ontology item

You open an ontology item and complete three separate successful saves through the interface before the next automatic refresh. Each save is followed by one successful definition read:

- Initial open: one call
- Three post-save caches: three calls
- Estimated total: **four Ontology Discovery calls, or 4,000 CU-seconds**

#### Leave the ontology item open for one hour

You open an ontology item and leave the ontology item interface open for approximately one hour without making changes. If three automatic refreshes complete during that period:

- Initial open: one call
- Automatic refreshes: three calls
- Estimated total: **about four Ontology Discovery calls, or 4,000 CU-seconds**

Refresh timing can vary.

## Ontology Logic and Operations

Ontology Logic and Operations usage is based on metered work performed by these ontology child items:

- Eventhouse
- Graph

> **Estimated Logic and Operations usage = total applicable child-item consumption attributed to the ontology**

The operation name in usage reporting includes the child operation name, such as **Ontology Logic and Operations - &lt;child operation name&gt;**. The underlying consumption is attributed to Ontology at the child item's rate.

For more information, see [Eventhouse and KQL Database consumption](../../real-time-intelligence/real-time-intelligence-consumption.md) and [Fabric Graph pricing and capacity units](../../graph/overview.md#pricing-and-capacity-units).

## Ontology AI Reasoning

Ontology AI Reasoning measures usage of the ontology MCP server and ontology agent. Consumption is based on the tokens and resources used to complete an AI task.

### Dynamic AI capacity consumption

The amount of capacity consumed by an impacted AI task can vary based on the work required to complete it. For example, a request that summarizes a narrow dataset with a smaller model can consume a different amount of capacity than a request that retrieves broad business context, uses deeper reasoning, calls multiple services, generates queries, and runs longer.

Capacity consumption can vary based on these factors:

- The AI model used and the reasoning effort required for the task.
- The context and complexity of the request, including instructions, data sources, conversation history, and business metadata.
- The tools and services used to complete the request.
- The orchestration and processing required to run the task from start to finish.

This change doesn't introduce a new billing currency or change how you purchase and manage Fabric capacity. It changes how select AI activity is translated into CU consumption so that consumption more closely reflects the resources required by each task.

### Example ontology AI modeling estimates

Ontology AI Reasoning consumption varies based on ontology size, workspace items, model usage, tool calls, validation, and retries. The following values are example estimates:

| Scenario | Example request | Estimated Ontology AI Reasoning usage |
| --- | --- | ---: |
| Light improvement | Add `client` and `buyer` as synonyms for Customer, leaving everything else unchanged. | About **0.5–1 CU-hours** |
| Heavy generation | Draft an ontology from the workspace, including entities, relationships, measures, and business definitions. | About **20 CU-hours**, depending on ontology complexity |

## Storage

You pay standard OneLake storage and read/write operation charges when you use those services, including for ontology definitions stored in OneLake. These charges are separate from Ontology Discovery, Logic and Operations, and AI Reasoning consumption.

## Monitor usage

Use the [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md) to monitor ontology consumption alongside other workloads on your capacity. A capacity administrator installs the app and grants access to other users.

Look for **Ontology Discovery** to review Discovery consumption for the ontology item. Review **Ontology Logic and Operations - &lt;child operation name&gt;** and **Ontology AI Reasoning** separately for child-item and AI consumption. OneLake usage is also separate from the per-call Discovery unit.

## Changes to Microsoft Fabric workload consumption rates

Consumption rates can change at any time. Microsoft uses reasonable efforts to provide notice through email or in-product notifications. Changes are effective on the date stated in the [Microsoft Fabric release notes](https://aka.ms/fabricrm) or the [Microsoft Fabric blog](https://blog.fabric.microsoft.com/blog/). If a change materially increases the Capacity Units (CU) required to use a workload, you can use the cancellation options available for your chosen payment method.
