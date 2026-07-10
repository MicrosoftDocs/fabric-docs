---
title: Observability for Fabric data agents in Microsoft Foundry
description: Learn how a Fabric data agent connected to a Foundry agent sends its logs and traces to the Application Insights resource attached to your Foundry project, how to read them, and how to control the telemetry with a tenant setting.
author: amjafari
ms.author: amjafari
ms.reviewer: amjafari
ms.service: fabric
ms.subservice: data-science
ms.topic: concept-article
ms.date: 07/07/2026
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted
---

# Observability for Fabric data agents in Microsoft Foundry

You can add a Fabric data agent as a tool to an agent you build in Microsoft Foundry. After you connect it, the Foundry agent calls the Fabric data agent to answer questions that are grounded in your enterprise data that lives in Fabric OneLake.

This article is about observability for that setup. When you build an agent in Foundry and connect a Fabric data agent to it, you want to see what the data agent did on each request, not just the final answer. Foundry Observability gives you that visibility. The data agent's logs and traces are sent to the same place your Foundry agent already reports to, so you can follow a request end to end, from the Foundry agent, into the Fabric data agent, and down to the data sources it queried.

The rest of this article explains where that telemetry is stored, how it gets there, how to read it, who can see it, and how to control it.

For a general overview, see [Observability in generative AI](/azure/foundry/concepts/observability) . To connect a Fabric data agent to Foundry, see [Consume a data agent in Microsoft Foundry](data-agent-foundry.md).

## Foundry projects and Application Insights

A Foundry project is where you build and run your agents. Foundry stores agent traces in an Azure Monitor Application Insights resource, and each project connects to one such resource.

As the agent builder, set this up once. In your Foundry project, open the **Agents** section, select **Traces**, and select **Connect**. You can create a new Application Insights resource or connect one that already exists. After you connect the resource, Foundry automatically turns on server-side tracing for the project. You don't need to make any code changes, and traces start flowing within minutes.

The relationship is straightforward: the project points to one Application Insights resource, and every agent in that project sends its traces there. The project defines where telemetry is collected; Application Insights is where it lives and where you query it.

You can view traces in the **Traces** tab of your Foundry agent, or query them directly in the connected Application Insights resource. The Foundry portal shows traces from the last 90 days.

For step-by-step setup, see [Set up tracing for AI agents in Microsoft Foundry](/azure/foundry/observability/how-to/trace-agent-setup).

## How Fabric data agent logs and traces reach your project

To connect a Fabric data agent to Foundry, work in a Foundry project. If you connect an Application Insights resource to that project, the Fabric data agent sends its logs and traces to that same resource. Your Foundry agent's telemetry and the Fabric data agent's telemetry land in one place, so you can read them together.

The flow works like this:

1. In your Foundry project, connect an Application Insights resource, as described in the previous section.
1. Add a Fabric data agent as a tool to a Foundry agent in that project.
1. When the Foundry agent runs, it calls the Fabric data agent to get insights from the enterprise data in Fabric OneLake.
1. Fabric validates the Application Insights resource connected to the project, then sends the data agent's logs and traces to it.
1. The data agent's telemetry appears alongside your Foundry agent's traces, both in the connected Application Insights resource and in the agent's **Traces** view.

The result is that the work the Fabric data agent does becomes part of the trace for the request. You see that your Foundry agent called the data agent, and you see what the data agent did to produce its answer, including which data sources it queried, how long each step took, and whether each step succeeded.

## Read the traces

Foundry Observability records each request as a trace. A trace consists of spans, and each span represents one unit of work with its own start time, duration, and status. Spans are nested, so reading a trace from top to bottom shows the path a request took and where the time was spent.

A Fabric data agent adds two kinds of spans to the trace:

- **Agent span**: the overall run of the Fabric data agent for a single request.
- **Tool span**: a single data source or tool the data agent calls while answering the request. One request can produce more than one tool span.

The following example shows a Foundry agent that calls a Fabric data agent, which queries two data sources to answer the question:

```text
Request (trace)
└─ Foundry agent run
   └─ Fabric data agent (called as a tool)
      └─ Agent span            Overall run of the Fabric data agent
         ├─ Tool span          First data source the data agent queried
         └─ Tool span          Second data source the data agent queried
```

The following table describes each level of the trace and the kind of metadata attached to it.

| Level | Emitted by | Represents | Example metadata |
|-------|------------|------------|------------------|
| Foundry agent run | Foundry | The Foundry agent that handles the user request | Conversation ID, status, duration |
| Fabric data agent (tool call) | Foundry | The point where the Foundry agent calls the Fabric data agent | Agent display name, status, duration |
| Agent span | Fabric data agent | The overall run of the Fabric data agent for the request | Agent display name, conversation ID, status, duration |
| Tool span | Fabric data agent | Each data source or tool the data agent calls to answer | Data source name, reasoning step ID, status, duration |

With this structure, you can answer the questions that matter when something looks off:

- When a response is slow, the duration on each span shows which step took the most time.
- When an answer is wrong, the tool spans show which data sources were queried and in what order.
- When a request fails, the status on each span shows where the failure occurred.

## Who can see the logs and traces

The Application Insights resource that stores the data agent's logs and traces governs access. Anyone with read access to that resource can see the telemetry. Connecting a resource to a project doesn't grant access to the data it holds.

| Where you view the data | Required access |
|-------------------------|-----------------|
| Application Insights | A role with read permissions on the connected Application Insights resource, such as Monitoring Reader or Log Analytics Reader |
| Microsoft Foundry project | Read permissions on the connected Application Insights resource, plus a Foundry project role of Foundry User or higher |

Access to a Foundry project on its own doesn't include access to the telemetry. Read permission on the Application Insights resource is always required.

## Operational metadata tenant setting

A tenant setting in the Fabric admin portal controls whether Fabric data agents send operational metadata for observability in Foundry. The setting is on by default.

The setting sends only operational metadata. This metadata includes agent display names, data source names, reasoning step IDs, and conversation IDs. Fabric doesn't send any customer content. User prompts and data agent responses stay within Fabric's compliance boundary and aren't included in this telemetry.

> [!NOTE]
> A Fabric administrator can turn it off for the tenant. Tenant setting changes can take up to one hour to take effect.

The setting reads as follows.

> **Fabric data agents can send operational metadata for observability in Microsoft Foundry**
>
> Agent creators can use operational metadata to monitor agent health, detect problems, and understand how their published agents are used across applications and services. These insights help agent creators improve agent reliability and performance.
>
> When you turn on this setting, Fabric data agents send operational metadata to a configured Application Insights resource for processing and storage. This data includes agent display names, data source names, reasoning step IDs, and conversation IDs. The Application Insights resource that processes and stores this data might be located outside your tenant's geographic region, compliance boundary, or national cloud instance.
>
> To access the operational metadata, you need a role with read permissions (such as Monitoring Reader or Log Analytics Reader) on the configured Application Insights resource. Users with this access can view the data in Application Insights. Users can also view the data through a Foundry project that connects to the configured Application Insights resource. Access through Foundry requires role-based access to the Foundry project (Foundry User or higher) in addition to read permissions on the Application Insights resource. Access to a Foundry project alone doesn't include access to the telemetry data.

> [!IMPORTANT]
> The Application Insights resource that stores this metadata might be located outside your tenant's geographic region, compliance boundary, or national cloud instance. Review your data residency and compliance requirements before you leave the setting on.

## Related content

- [Consume a data agent in Microsoft Foundry](data-agent-foundry.md)
- [Set up tracing for AI agents in Microsoft Foundry](/azure/foundry/observability/how-to/trace-agent-setup)
- [Observability in generative AI](/azure/foundry/concepts/observability)
- [Configure Fabric data agent tenant settings](data-agent-tenant-settings.md)
