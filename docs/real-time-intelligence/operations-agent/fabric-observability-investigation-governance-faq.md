---
title: Data, privacy, and governance FAQ for Fabric Observability Investigation
description: Answers common questions about data handling, privacy, compliance, governance controls, and model use for Fabric observability investigation.
ms.topic: faq
ms.service: fabric
ms.collection: ce-skilling-ai-copilot
ms.reviewer: ilanawaitser
ms.date: 09/03/2026
# Customer intent: As an administrator or security professional, I want to understand the governance, data privacy, compliance, and AI model controls for Fabric observability investigation so I can evaluate it for enterprise use.
---

# Data, privacy, and governance FAQ for Fabric observability investigation

Use this FAQ for data handling, privacy, compliance, residency, access, and guardrails for Fabric observability investigation.

For transparency behavior, reliability interpretation, limitations, and user-facing AI output expectations, see [Responsible AI FAQ for Fabric observability investigation](fabric-observability-investigation-responsible-use.md).

Fabric observability investigation runs as an interactive workflow: the agent runs by using the signed-in user's identity and workspace permissions, scoped to the failed job run you start from.

## Data retention and access

### How does Fabric observability investigation retain data?

During the preview, investigations are ephemeral. The service handles two categories of data:

- **Conversation data:**
  - Includes your questions and the agent's responses during an investigation.
  - Not retained after the session ends. Refreshing the page or closing the tab clears the conversation.
- **Monitoring data:**
  - The agent doesn't retain extra copies of your telemetry.
  - It reads the monitoring data already stored in your workspace, based on your permissions.

### Who can access an investigation?

An investigation is scoped to the session in which you run it, under your identity. It isn't shared with other users and isn't preserved after the session ends.

## Compliance and data residency

### Is Fabric observability investigation compliant with enterprise standards?

Fabric observability investigation follows Microsoft's [Responsible AI principles and approach](https://www.microsoft.com/ai/principles-and-approach). Microsoft also publishes the [Microsoft Responsible AI Standard](https://aka.ms/RAIStandardPDF), which describes its framework for building and reviewing AI systems.

For Azure AI workloads, see [Responsible AI guidance for Microsoft Foundry](/azure/foundry/responsible-use-of-ai-overview) and [Transparency Note for Azure OpenAI in Microsoft Foundry Models](/azure/foundry/responsible-ai/openai/transparency-note).

### Can I control where my data is processed?

Data processing follows Fabric's regional and compliance frameworks. Fabric observability investigation is available in the same regions as the Operations agent.

## Model use and controls

### What AI models does the agent use?

Fabric observability investigation uses Azure OpenAI Service models to analyze monitoring data and generate investigation insights.

Model processing occurs in Microsoft-managed infrastructure and follows Azure security and compliance practices.

### Is my data used to train models?

No. The service doesn't use customer data to train models.

### Can I control which data is shared with the model?

Yes, you control data sharing through scope and permissions rather than per-field filtering.

The investigation is scoped to the specific failed job run you start from, and the initiating user's workspace permissions constrain what data the model can see.

You can't selectively exclude individual monitoring tables or fields from an otherwise in-scope run.

## Governance controls

### What permissions does the agent use?

Investigations run under the signed-in user's identity and workspace permissions, and require at least the **Contributor** role on the workspace. Microsoft Entra ID issues short-lived tokens for each call the investigation makes, and the agent can access only data the user is already authorized to view.

### Can I enforce guardrails on what the agent is allowed to do?

Yes. Investigations are read-only during the preview: the agent analyzes the failure and recommends next steps, but it doesn't change your pipeline, rerun jobs, or modify any workspace item.

- System controls define the intended operating behavior.
- Organizational controls, including workspace roles and scope, define what the agent can access.

### Can I control access to Fabric observability investigation?

Access depends on the availability of an Operations agent in the workspace and on workspace roles. Users without the required role don't see the **Investigate** action.

## Related content

- [Responsible AI FAQ for Fabric observability investigation](fabric-observability-investigation-responsible-use.md)
- [Fabric observability investigation](fabric-observability-investigation-overview.md)
- [Run a Fabric observability investigation](fabric-observability-investigation-run.md)
