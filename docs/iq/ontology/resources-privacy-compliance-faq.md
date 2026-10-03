---
title: Privacy and Compliance FAQ for the Ontology Agent (Preview)
description: Find answers to common data access, privacy, compliance, regional processing, AI model, and control questions for the ontology agent in Fabric.
ms.date: 09/06/2026
ms.topic: faq
---

# Privacy and compliance FAQ for the ontology agent (preview) in Fabric

This article answers common data access, privacy, compliance, regional processing, AI model, reliability, and control questions for the ontology agent (preview) in Fabric.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Data and privacy

This section answers questions about data access, retention, and permissions for the ontology agent.

### What data does the agent use?

The agent reads:

- **Workspace metadata**: the list of items in the workspace (lakehouses, eventhouses, semantic models, ontology items).
- **Schema metadata**: table, column, and relationship information from lakehouses (via SQL), eventhouses (via the Kusto Query Language, KQL), and semantic models (via XML for Analysis, XMLA).
- **Sample data**: a few rows per table during discovery, to understand value shapes.
- **The ontology definition itself**: the current entity types, relationships, mappings, and contextualizations.
- **Query results**: when you ask the agent to run a query in Data Analysis Expressions (DAX), KQL, SQL, or Graph Query Language (GQL), it sees the rows returned by that query.
- **Files you attach**: the agent can read files that you explicitly add to the current conversation and use their content as supporting context.

The agent uses *your* identity and works within your Microsoft Entra ID and Fabric role-based access control (RBAC) permissions. The agent can't access any resource or data that you can't access.

### Is my workspace data and chat conversation data sent outside my tenant?

Microsoft-managed services process workspace data and conversation content. Microsoft Entra ID and Microsoft Fabric workspace RBAC govern access, so the agent can access only the resources and data the initiating user can view. The [Privacy and data management overview](/compliance/assurance/assurance-privacy) and the Microsoft Fabric data protection guidance describe Microsoft's privacy and data-processing commitments for commercial services.

### What permissions does the agent use to access the data?

The agent accesses data by using your identity. Microsoft Entra ID issues short-lived access tokens for each Fabric API call the agent makes. The agent never escalates privileges or impersonates another user.

### How does the agent retain data?

The agent might retain limited service data to support the service and user interactions. Any retention is scoped, access-controlled, and time-bound. The agent handles three categories of data (conversation data, ontology data, and telemetry data), each with different retention behavior.

- **Conversation data** (chat messages, drafts, validation results, evidence cache, uploaded files):

  - Includes user prompts, agent responses, the in-progress draft, validation summaries, cached discovery evidence, and uploaded file content.

  - Stored regionally and retained for up to **two days** after the conversation ends.

  - Automatically deleted after two days.

- **Ontology data** (entity types, relationships, mappings, contextualizations):

  - Stored as the definition of the ontology item itself, in your workspace.

  - Lives as long as the ontology item lives; deletion of the ontology item deletes the definition.

  - The agent doesn't keep a separate copy.

- **Source data** (lakehouse rows, eventhouse events, semantic model values, query results):

  - The agent doesn't retain extra copies of source data.

  - It only reads data that already exists in your Fabric workspace, based on your permissions (RBAC).

### Who can access conversations and applied ontology changes?

Conversations are private to the user who starts them. Other users can't see another user's chat.

Applied ontology changes are part of the ontology item and follow the workspace's standard RBAC model. Users with Viewer access can explain and query an existing ontology, but they can't create the first definition, improve the ontology, or apply changes. Only users with Contributor or higher permissions can modify the ontology item.

## Compliance and data residency

This section covers enterprise compliance standards and data residency controls.

### Is the agent compliant with enterprise standards?

Yes. The ontology agent follows Microsoft's [Responsible AI principles and approach](https://www.microsoft.com/ai/principles-and-approach). Microsoft also publishes the [Microsoft Responsible AI Standard, v2](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Responsible-AI-Standard-General-Requirements.pdf). It describes the company's framework for building and reviewing AI systems. The framework covers:

- Privacy and security
- Transparency
- Reliability and safety
- Inclusiveness
- Fairness
- Accountability

For the AI components, Microsoft also provides [Responsible AI guidance for Microsoft Foundry](/azure/foundry/responsible-use-of-ai-overview) and [transparency notes for Azure OpenAI](/azure/foundry/responsible-ai/openai/transparency-note).

### Can I control where my data is processed?

Yes. The ontology agent follows Copilot in Fabric regional data processing. It processes requests from US capacities in the US and requests from [EU Data Boundary](/privacy/eudb/eu-data-boundary-learn) capacities in the EU Data Boundary. If your capacity is outside these geographic areas, the ontology agent is disabled by default. To enable it, your Fabric admin must turn on the **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance** tenant setting. For setup instructions, see [Enable Copilot in Fabric](../../fundamentals/copilot-enable-fabric.md#enable-copilot-tenant-settings). For supported regions, see [Regions](how-to-use-ontology-agent.md#regions).

## Model and data usage

This section covers the AI models the agent uses and how the agent handles your data during processing.

### What AI models does the agent use?

**Azure OpenAI Service** provides the large language models the agent uses to plan its work, draft ontology proposals, and write queries. Model processing occurs within Microsoft-managed infrastructure and follows Azure security and compliance practices. The specific model version might evolve over time. The team prefers the latest supported model that meets quality and latency targets.

### Is my data used to train models?

The service doesn't use customer data to train models.

### Can I control which data is shared with the model?

Yes, you can control data sharing implicitly through the agent's scope. The agent only sends to the model:

- The conversation messages (your prompts, the agent's prior turns).
- Schema metadata it discovered (table names, column names, relationship names).
- A few sample rows per table during discovery.
- Query results returned by tools the agent invoked.
- The content of files you attach when the agent reads those files for the conversation.

It doesn't send the entire contents of your lakehouses or eventhouses to the model. When the agent reads a file that you explicitly attach, it can send that file in full. You can further limit scope by:

- Restricting your own workspace permissions (your access bounds the agent).
- Choosing which sources to discover, rather than letting the agent discover everything automatically.
- Attaching only files that are relevant to the current task.

You can't selectively exclude specific tables or columns from a source that the agent already has permission to read. If you need that level of control, restrict access at the source level.

## Reliability and safety

This section addresses questions about the accuracy, security, and guardrails of the agent.

### How do I prevent the model from producing incorrect ontology proposals?

The agent follows several layered controls:

- **Grounding**: Every proposal cites the workspace items, tables, and columns it derived from. The agent's instructions explicitly prohibit fabricating entities or relationships.
- **Validation**: Before any apply, the agent runs structural and grounding validation on the draft, then surfaces the results. Validation checks the name format, missing bindings, duplicate names, and contextualization completeness.
- **Quality checks**: The agent reviews its own work against grounding and scope rules before presenting findings to you, and revises if those checks fail.
- **Plan/Act mode**: You control changes through an explicit mode toggle. The agent can't apply changes in Plan mode, period.

### What guarantees do I have on the accuracy of the results?

Results are AI-generated and might not always be correct or complete. Review and validate proposals before applying changes, and treat the agent's recommendations as assistive guidance rather than definitive conclusions. Microsoft continuously improves the system through testing and validation. Report issues or inaccuracies through in-product feedback.

### How can I validate or verify the agent's conclusions?

The agent surfaces:

- The workspace items it inspected and the tables it sampled.
- The validation results for every draft and patch.
- The tool calls it made, including the queries it ran when answering your questions.
- The per-item status of every change the agent applied.

You can rerun queries the agent showed you to verify them independently.

### How is the model secured from misuse or malicious prompts?

The agent operates within Microsoft Fabric service boundaries and existing access controls. It can only access data and perform actions that you already have permission to use. **Plan/Act mode** gates the agent: in Plan mode, it can't make changes to your ontology; it can only discover, draft, validate, preview, query, and explain. Changes are only possible after you explicitly switch to Act mode. The service aligns with Microsoft's Responsible AI initiative to reduce misuse and the impact of malicious prompts.

### Is there formal documentation describing how the agent is secured?

Responsible AI and security guidance for the ontology agent aligns with Microsoft's broader [Responsible AI approach](https://www.microsoft.com/ai/principles-and-approach), [Responsible AI guidance for Microsoft Foundry](/azure/foundry/responsible-use-of-ai-overview), and the [Transparency Note for Azure OpenAI in Microsoft Foundry Models](/azure/foundry/responsible-ai/openai/transparency-note). For data handling, privacy, and model-use details, see [Data, privacy, and security for Azure Direct Models in Microsoft Foundry](/azure/foundry/responsible-ai/openai/data-privacy).

### Can I enforce guardrails on what the agent is allowed to do or say?

Built-in service controls, Responsible AI practices, and Fabric platform governance govern the agent's behavior.

- System-level controls define how the agent operates (Plan/Act mode gating, grounding rules, structural validation, and internal quality checks).
- Organizational controls (workspace RBAC, capacity settings, tenant Copilot controls) define what data the agent can access and what changes it can make.

## Access and control

This section covers agent permissions, disabling the agent, and customer responsibilities.

### What permissions does the agent use?

In interactive scenarios, the agent runs under your identity and Fabric workspace RBAC permissions. There are no autonomous scenarios for the ontology agent today; every action requires an in-conversation user driving it.

### What is my responsibility when using the agent?

You're responsible for configuring access, validating results, and governing usage within your environment.

- Manage access control through Fabric workspace RBAC and Microsoft Entra ID.

- Review and validate ontology drafts, patches, and query results before acting on them.

- Use Plan mode to preview, and switch to Act mode only when you're ready to apply changes.

- Align usage with your organization's internal policies and compliance requirements.

### Are results deterministic?

Not always. The agent uses AI and might produce different drafts, patches, or queries on different runs against the same data. Validation, grounding rules, and internal quality checks keep results within bounded shapes, but expect natural variation between runs.

## Related content

- [Use the ontology agent in Fabric](how-to-use-ontology-agent.md)
- [Responsible AI FAQ](resources-responsible-ai-faq.md)
- [Troubleshooting](resources-troubleshooting.md#troubleshoot-the-ontology-agent)
- [Manage Copilot in Microsoft Fabric](/fabric/get-started/copilot-fabric-overview)
