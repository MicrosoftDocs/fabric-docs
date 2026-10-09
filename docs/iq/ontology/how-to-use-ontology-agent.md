---
title: Use the Ontology Agent (Preview)
description: Learn how to use the ontology agent in Fabric to create and operate ontologies over your Fabric workspace data through a chat interface.
ms.date: 09/06/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Use the ontology agent (preview) in Fabric

The ontology agent (preview) in Fabric is an AI-powered Copilot that helps you build and operate ontologies over the data in your Microsoft Fabric workspace by using a chat interface and natural language. The agent helps you:

- [Create an ontology](#create-an-ontology-with-the-agent): The agent provides a guided, end-to-end flow that takes you from an empty ontology item to a published definition grounded in your workspace data.
- [Operate your ontology](#operate-your-ontology-with-the-agent): Once a definition exists, the agent can describe it, query the data behind it by using Data Analysis Expressions (DAX), Kusto Query Language (KQL), SQL, or Graph Query Language (GQL), and improve it as your sources evolve.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Interact with the agent inside the ontology item. The agent explains what it's doing, asks for clarification when it needs it, and previews every change before it applies anything to your ontology.

## Prepare your workspace and sources

Before you start, organize the workspace and source data so the agent can discover the right information and generate grounded proposals.

- **Keep relevant items together:** Place the ontology in the same workspace as the lakehouses, eventhouses, and semantic models you want the agent to use. If you need data from another workspace, create a shortcut to the source in the ontology workspace.
- **Remove unrelated clutter:** Move experiments, archived items, and unrelated sources to another workspace when possible. A focused workspace helps the agent identify the relevant business domain.
- **Confirm source access:** The agent uses your identity. Ensure you can read every source that you want the agent to consider, including sources reached through shortcuts.
- **Define the scope:** If the workspace includes multiple business domains, tell the agent whether to model all of them, one primary domain, or a smaller group. State any change in scope explicitly during the conversation.
- **Use descriptive source metadata:** Clear table, column, key, and relationship names help the agent infer entity types, properties, data bindings, and contextualizations. Use consistent data types and a clear UTC timestamp column for time-series data.

## Create an ontology with the agent

A new ontology item starts empty. The first time you open it, the canvas shows a **Get started** page with an option to **Start with Ontology agent**.

:::image type="content" source="media/how-to-use-ontology-agent/create-new-get-started.png" alt-text="Screenshot of an empty ontology item showing the Get started page with the Start with Ontology agent and Learn more cards." lightbox="media/how-to-use-ontology-agent/create-new-get-started.png":::

When you select **Start with Ontology agent**, the chat panel opens on the right of the canvas. The agent introduces itself and asks a few clarifying questions to scope the work, such as what the ontology should cover and which sources to prioritize. To make it easier to get going, the agent offers a few one-click suggestions above the input box. For example, jump straight into discovery, walk through the clarification dialogue first, or get an explanation of ontology concepts. The agent generates the suggestions and adapts them to the ontology and the conversation, so the exact wording and which suggestions appear can vary. Pick a suggestion or type your own message at any time.

If your request or discovered sources span unrelated business domains, the agent asks whether to include all topics, focus on one primary domain, or start with a smaller subgroup. Revise the scope at any time before you apply the draft.

:::image type="content" source="media/how-to-use-ontology-agent/create-new-agent-clarification.png" alt-text="Screenshot of the ontology agent chat panel with clarifying questions, suggestion chips, and the Plan and Act toggle." lightbox="media/how-to-use-ontology-agent/create-new-agent-clarification.png":::

From there, the agent walks you through the rest of the creation flow:

1. **Discover**: explores the workspace items you point it to (or that it discovers automatically) and samples a few rows per table.
1. **Draft**: proposes an ontology definition (entity types, relationships, data bindings, and contextualizations) grounded in the discovered evidence.
1. **Validate**: runs structural and grounding checks on the draft and shows the results, including any warnings or errors.
1. **Apply**: once you switch the agent to **Act mode**, writes the definition to the ontology item and publishes it.

When you publish the first definition, the canvas replaces the **Get started** page with the Explorer (the list of entity types) and the relationship graph. The agent then offers a **Test the ontology** suggestion that generates five representative questions and answers them by querying the bound data. You can also continue working with the agent on other day-to-day tasks.

## Operate your ontology with the agent

Once your ontology has a definition, open the ontology item any time and select **Ontology agent** on the toolbar to bring up the chat panel. The agent greets you and offers a few one-click suggestions that adapt to the current ontology. For example, ask the agent to explain the ontology, query the data behind it, or propose improvements. The agent generates the suggestions and they can vary across conversations. Pick a suggestion or type your own question in the **Say something** box.

:::image type="content" source="media/how-to-use-ontology-agent/ontology-agent-chat-greeting.png" alt-text="Screenshot of the ontology agent chat panel on an existing ontology with the greeting message, suggestion chips, and the Plan and Act toggle." lightbox="media/how-to-use-ontology-agent/ontology-agent-chat-greeting.png":::

The following section describes the day-to-day capabilities the agent supports.

### Explain the ontology

Ask the agent to walk you through the current ontology. It reads the definition, summarizes the entity types and relationships, and explains how they're grounded in your workspace data. Use this explanation when you're new to an ontology or when you inherit one from a teammate.

### Query the ontology

Ask questions over the data behind the ontology in plain language. The agent picks the right engine for each question based on the available grounding: KQL for entity types bound to eventhouse tables, SQL for entity types bound to lakehouse tables, DAX for semantic-model tables, columns, aggregations, and measures, and GQL for relationship traversals when a GraphModel exists for the ontology. The agent shows you the query it ran, bounded results, and a short explanation. KQL, SQL, and GQL return up to 1,000 rows by default; DAX returns up to 200. When a query returns no rows, the agent says so explicitly; it never invents data.

### Improve the ontology

Ask the agent to evolve the definition as your sources change: new tables, new columns, schema drift, or new relationships you want to model. The agent proposes a *patch* that shows changed and stable items side by side, runs validation, and previews the change before the agent applies anything. Patches preserve stable identifiers (IDs), so downstream queries and integrations keep working. As with the creation flow, the agent applies the patch only after you switch to **Act mode**.

## Plan mode and Act mode

The agent has two interaction modes. Use the toggle at the bottom of the chat input to switch between them:

- **Plan mode** (default): the agent can discover, draft, validate, query, explain, and preview, but it doesn't make any changes to your ontology or your workspace. Use this mode to explore and review proposals.
- **Act mode**: the agent can apply ontology changes. It always tells you what it's about to do before it does.

Plan mode is the safe default. Switch to Act mode only when you're ready to let the agent make changes.

## Preview the draft in the ontology canvas

The chat is the primary surface for working with the agent, but you don't have to read every change in the transcript. When the agent finishes building or revising a draft in Plan mode, it posts a preview action in its chat response. Selecting that action opens a read-only **draft preview** of the entire proposed ontology in the canvas, including entity types, properties, data bindings, relationships, and contextualizations. The preview works in both flows:

- **When you're creating a new ontology**: the canvas shows the full proposed structure before the agent applies anything. Browse entity types and the relationship graph just like you would for a published ontology.
- **When you're improving an existing ontology**: the canvas highlights what changed. Added, edited, and removed items carry visual indicators, and each changed item shows a short explanation of what changed and why. Removed items still appear in the preview so you can confirm the deletions before they happen.

The preview is read-only. To adjust anything, ask the agent in the chat; the agent produces a revised draft and posts a new preview action you can open. When you switch to Act mode and the agent applies, the preview becomes the published ontology definition.

## Work with the ontology agent

The agent provides a conversational experience for building and operating your ontology. You interact through chat to ask questions, share context, and review proposals in an iterative, flexible way.

As the agent works, it explains its reasoning: which workspace items it inspected, which tables it sampled, which validation rules it ran, and which evidence it relied on. This transparency helps you understand not only what the agent proposes, but why.

The conversation continues as your understanding evolves. You can ask follow-up questions to dig deeper, refine a proposal, focus on a specific source, or explore a related angle while keeping the full context of the conversation.

Give specific feedback when a proposal needs revision. Explain which entity type, relationship, binding, or source is incorrect and why. Precise feedback helps the agent produce a better proposal in the next turn.

### Add files to the conversation

Use the attachment button in the chat input to provide supporting context, such as business requirements, data dictionaries, sample mappings, or schema notes. The agent can read common text-based files, PDFs, and common image formats, and use their content to improve ontology names, entity selection, relationships, and explanations.

Each conversation supports up to 10 attached files, with a maximum size of 5 MB per file. Files are available only in the conversation where you attach them. If you want the agent to use a particular file, refer to its filename and explain how it relates to your request.

### Conversation lifetime

Each conversation belongs to a specific ontology item, and the agent keeps context across turns within that session. During preview, conversation state lives only in your current browser session: refreshing the page or closing the tab ends the conversation, and the next time you open the agent it starts fresh. Conversations also can't continue beyond 24 hours.

### Data retention

To support service operation, troubleshooting, and quality, the service might retain conversation data for up to **two days** after a conversation ends. Microsoft processes this data according to its privacy, security, and compliance policies, and doesn't use it for other purposes. Microsoft doesn't use conversation data to train foundation models. For details, see the [Privacy and compliance FAQ](resources-privacy-compliance-faq.md).

## Operational considerations

### What the agent can access

The agent uses your identity (delegated access) when it reads or writes data in your Fabric workspace. That means the agent can only see and change what you can see and change. Users with Viewer access can explain and query an existing ontology in read-only mode. Creating the first definition, improving an ontology, and applying changes require Contributor or higher permissions. The agent operates within your existing Microsoft Entra ID and Fabric role-based access control (RBAC). For details, see the [Privacy and compliance FAQ](resources-privacy-compliance-faq.md).

### Supported data sources

| Source type | What the agent does with it |
|-------------|------------------------------|
| **Lakehouse** | Discovers tables and columns; samples rows; binds entity types to lakehouse tables; executes SQL queries. |
| **Eventhouse** | Discovers databases, tables, and columns; samples rows; binds entity types to KQL tables (including time-series bindings); executes KQL queries. |
| **Semantic model** | Reads measures, tables, columns, and relationships through XML for Analysis (XMLA) for business-context grounding; executes DAX queries against grounded semantic-model content. The agent doesn't bind ontology entities directly to semantic models during preview. |
| **GraphModel** | Executes ISO GQL queries for relationship and traversal questions, when a GraphModel exists for the ontology. |

> [!NOTE]
> The semantic-model grounding that an ontology carries is available only to the ontology agent. Fabric data agent can query a Power BI semantic model that you configure directly as its data source, but it doesn't use the semantic-model grounding that an ontology carries.

### Regions

The ontology agent has the same regional availability as ontology items.

> [!NOTE]
> The ontology agent follows Copilot in Fabric regional data processing. It processes requests from US capacities in the US and requests from [EU Data Boundary](/privacy/eudb/eu-data-boundary-learn) capacities in the EU Data Boundary. If your capacity is outside these geographic areas, Fabric disables the ontology agent by default. To enable it, your Fabric admin must turn on the **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance** tenant setting. For setup instructions, see [Enable Copilot in Fabric](../../fundamentals/copilot-enable-fabric.md#enable-copilot-tenant-settings).

### Current limitations

Keep in mind these limitations during preview:

- Each conversation operates on a single ontology in a single workspace. The agent can't span multiple ontologies in one conversation.
- The ontology agent doesn't support customer-managed keys (CMK) for conversation data at this time. The service encrypts data by using Microsoft-managed keys, in alignment with Fabric data protection standards.
- Applying ontology changes adds or updates items in place. There's no built-in rollback; to restore an earlier definition, reapply it.
- Due to current known issues, these experiences are unavailable for query through the ontology agent:
    - querying the parent entity and getting the instances of the inheriting entities (also not available through MCP)
    - ask_ontology does not consider rules in the response (list rules is available through the [MCP tool](how-to-use-ontology-mcp-server.md))

### Responsible AI

Microsoft designs and operates the ontology agent in Fabric in alignment with its Responsible AI principles. For more information, see the [Responsible AI FAQ for the ontology agent](resources-responsible-ai-faq.md).

## Related content

- [What is ontology (preview)?](/fabric/iq/ontology/overview): background on the ontology item the agent works with.
- [Privacy and compliance FAQ](resources-privacy-compliance-faq.md): data handling, residency, and compliance.
- [Responsible AI FAQ](resources-responsible-ai-faq.md): how the agent is designed and what to expect.
- [Troubleshooting](resources-troubleshooting.md#troubleshoot-the-ontology-agent): common problems and fixes.
- [Billing and capacity usage](resources-capacity-usage.md): how ontology usage is billed and how to monitor ontology agent consumption.
