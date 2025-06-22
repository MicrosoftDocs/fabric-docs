---
title: Copilot for Real-Time Intelligence
description: "Learn how Copilot in Real-Time Intelligence can help you explore your data and extract valuable insights."
author: v-hzargari
ms.author: v-hzargari
ms.reviewer: mibar
ms.topic: conceptual
ms.custom:
ms.date: 11/19/2024
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---
# Copilot for Real-Time Intelligence

Copilot for Real-Time Intelligence is an advanced AI tool designed to help you explore your data and extract valuable insights. It streamlines the process of analyzing data for both experienced users and citizen data scientists.

For billing information about Copilot, see [Announcing Copilot in Fabric pricing](https://blog.fabric.microsoft.com/en-us/blog/announcing-fabric-copilot-pricing-2/).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* Read or write access to a [KQL queryset](../real-time-analytics/create-query-set.md)

[!INCLUDE [copilot-note-include](../includes/copilot-note-include.md)]

## Accessing the Real-Time Intelligence Copilot

Copilot for Real-Time Intelligence currently offers two main capabilities:

- **Copilot for KQL Queryset**  
    Explore and analyze your data using natural language in a [KQL queryset](/real-time-intelligence/kusto-query-set.md).  
    [Learn more &rarr;](copilot-kusto-query-set.md)

- **Copilot for Real-Time Dashboard**  
    Interact with your data and generate insights directly within a [Real-Time Dashboard](/real-time-intelligence/dashboard-real-time-create.md).  
    [Learn more &rarr;](copilot-real-time-dashboard.md)

> [!NOTE]
>* Copilot doesn't generate control commands.
>* Copilot doesn't automatically run the generated KQL query. Users are advised to run the queries at their own discretion.

### Limitations

* Copilot might suggest potentially inaccurate or misleading suggested KQL queries due to:
  * Complex and long user input.
  * User input that directs to database entities that aren't KQL Database tables or materialized views (for example KQL function.)
* More than 10,000 concurrent users within an organization can result in failure or a major performance hit.

## Related content

* [Privacy, security, and responsible use of Copilot for Real-Time Intelligence (preview)](copilot-real-time-intelligence-privacy-security.md)
* [Copilot for Microsoft Fabric: FAQ](copilot-faq-fabric.yml)
* [Overview of Copilot in Fabric (preview)](copilot-fabric-overview.md)
* [Query data in a KQL queryset](/real-time-intelligence/kusto-query-set.md)
