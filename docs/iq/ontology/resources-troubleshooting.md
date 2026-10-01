---
title: Troubleshoot Ontology (Preview)
description: This article provides troubleshooting suggestions for ontology (preview).
ms.date: 09/06/2026
ms.topic: troubleshooting-general
ai-usage: ai-assisted
---

# Troubleshoot ontology (preview)

This article contains troubleshooting suggestions for ontology (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

For ontology known issues, see [Microsoft Fabric known issues](https://support.fabric.microsoft.com/known-issues/) and filter to **IQ**.

## Troubleshoot ontology item creation

The following table describes common issues when creating a new ontology (preview) item.

| Issue | Recommendation |
|---|---|
| Fabric is unable to create the ontology (preview) item | The most common cause of failure when creating a new ontology item is failure to enable a required tenant setting. If you see this error, make sure that you've enabled all the required tenant settings described in [Required tenant settings for ontology (preview)](overview-tenant-settings.md). |

### Troubleshoot ontology generated from a semantic model

The following table describes common issues when generating a new ontology (preview) item [from a semantic model](how-to-generate-from-semantic-models.md).

| Issue | Recommendation |
|---|---|
| The ontology item fails to generate | Make sure you've enabled all [required tenant settings](overview-tenant-settings.md) for generating an ontology from a semantic model. <br><br>Make sure the semantic model is in a different workspace than **My workspace** (ontology generation isn't supported in **My workspace**). |
| The ontology item is created but there are no entity types | Make sure your semantic model is published, the tables in the semantic model are visible (not hidden), and relationships are defined. |
| The ontology item is created but some entity types are missing | Make sure the data tables in the semantic model meet the [data requirements for semantic model generation](concepts-generate.md#data-requirements). For example, you can only duplicate property names across entities for properties of the same type (you can't have one entity type with a string `ID` property and another entity type with an integer `ID` property, but you can have two entity types that both have a string `ID` property). Resolve data issues and regenerate the ontology. |
| The ontology item is created but entity types have no data bindings | Ontology data binding is [not supported](concepts-generate.md#support-for-semantic-model-modes) for source semantic models in **Import mode**, or semantic models in **Direct Lake mode** while the backing lakehouse is in a workspace with **inbound public access disabled**. Try changing these settings and regenerating the ontology. |
| Queries return null values for `Decimal` properties | Graph in Fabric doesn't currently support the `Decimal` type. As a result, if you generate an ontology from a semantic model with tables that include `Decimal` type columns, all queries return null values for those properties. `Double` type is supported, however, so recreating the property as a `Double` type in ontology and binding it to the source data allows the data to show up in queries. |
| General troubleshooting | Make sure the ontology operation you're trying to complete is [supported for your semantic model mode](concepts-generate.md#support-for-semantic-model-modes). |

## Troubleshoot capacity usage

The following table describes common capacity issues with an ontology (preview) item.

| Issue | Recommendation |
|---|---|
| The canvas and entity type list don't load and you see a message that *Your organization's Fabric compute capacity has exceeded its limits*. | Refreshes of ontology (preview)'s underlying [Graph in Microsoft Fabric](../../graph/overview.md) child item contribute to your capacity usage. If you set a graph refresh schedule and capacity usage becomes too high, reduce or disable the graph item schedule in your workspace. For more information, see [Refresh the graph model](how-to-use-ontology-graph.md#refresh-the-graph-model). |

## Troubleshoot data binding

The following table describes common issues when binding data to an ontology (preview) item.

| Issue | Recommendation |
| --- | --- |
| Issue with keys while binding relationship types | If you don't see any keys for an entity type, make sure your source and target entity types have keys defined. |
| Can't bind data from a semantic model | Make sure you have both [Read and Build permissions](/power-bi/connect-data/service-datasets-permissions#what-are-the-semantic-model-permissions) on the semantic model. |

## Troubleshoot entity type details

The following table describes common issues when using the entity type details view of an ontology (preview) item.

| Issue | Recommendation |
|---|---|
| Entity type details shows error `403 Forbidden` | This error might indicate that you don't have access to the lakehouse that contains the source data for the ontology's data bindings. Contact your administrator to obtain access to the lakehouse. |
| Entity type details graph doesn't load | This error indicates an issue with the underlying graph. One possible cause is having column mapping enabled on the underlying delta tables, which isn't supported. You can enable column mapping manually, or Fabric enables it automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables. | 
| Entity type details shows no data | This error might happen because your ontology instance can't access the underlying graph. Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location. Changing the table name after you create mappings might also break the connection that the entity type details rely on. |
| No entity instances shown | This behavior indicates an error accessing the data bindings. Confirm that the source data tables exist in OneLake with matching column names, and that your Fabric identity has data access. |
| Graph is sparse or missing data | Check that you defined keys for each entity type, and verify that you bound the source data properly to those keys. |
| Preview page becomes unresponsive | This issue might occur when you have insufficient permissions to Fabric resources. Ensure that you have at least **Contributor** access (not just **Viewer**) in your Fabric workspace, and at least **read** access to the data source used for bindings in the ontology. |

## Troubleshoot ontology as data agent source

The following table describes common issues when using ontology (preview) as a source for [Fabric data agent](../../data-science/concept-data-agent.md).

| Issue | Recommendation |
|---|---|
| Can't find the data agent item type, or the data agent can't be created | Make sure you've enabled all [required tenant settings](overview-tenant-settings.md) for using ontology and data agent, including **Data agent item types (preview)**. |
| First queries fail | If you experience failures with the first few queries after you create the data agent, try waiting a few minutes to give the agent more time to initialize. Then, run the queries again. |
| Query results don't aggregate correctly | There's a known issue affecting aggregation in queries. To enable better aggregation, add the instruction `Support group by in GQL` to the agent's instructions as described in [Provide agent instructions](tutorial-4-create-data-agent.md#provide-agent-instructions). |
| Query results are vague or generic | Make sure that the agent includes the ontology as a knowledge source. Also, make sure that entity and relationship names are meaningful and documented in the ontology. |
| Natural language query errors | Due to a known issue affecting duplicate relationship names, ensure relationship names are unique. |

>[!NOTE]
> Due to a current known issue, data agent doesn't work with an ontology that uses semantic models for binding.

## Troubleshoot the ontology agent

The following sections describe common issues when you use the [ontology agent in Fabric](how-to-use-ontology-agent.md).

### Troubleshoot authorization and access

| Issue | Recommendation |
|---|---|
| The agent can't access a lakehouse, eventhouse, or semantic model | The agent uses your identity to read workspace data. If it can't read a source, check the following conditions: <br>- Confirm that your workspace role grants at least read access to the lakehouse, eventhouse, or semantic model. If the source is in a different workspace through a shortcut, check your role on that workspace too. <br>- Confirm that the source is in the ontology workspace or available there through a shortcut. The agent only discovers items in the workspace where the ontology is located. |
| I can query an ontology but can't create, improve, or apply changes | These conditions might indicate that you have Viewer access. Viewers can explain and query an existing ontology, but creating the first definition, improving the ontology, and applying changes require Contributor or higher permissions. Ask a workspace administrator to update your role if you need to make changes. |

### Troubleshoot file uploads

| Issue | Recommendation |
|---|---|
| A file won't attach | Check the following limits: <br>- Each file must be no larger than 5 MB. <br>- A conversation can contain up to 10 attached files. <br>- The filename must be 60 characters or fewer and can't contain path separators, `..`, or control characters. <br>- The file must use a supported text-based, PDF, or image format. |
| The agent doesn't use an attached file | Refer to the exact filename in your prompt and explain what information the agent should use from it. Files are scoped to the current conversation. If you refresh the page or start a new conversation, attach the file again. |

### Troubleshoot ontology drafts

| Issue | Recommendation |
|---|---|
| The draft has too few or too many entity types | - **Too few:** Tell the agent which other entities or relationships matter for your scenario. <br>- **Too many:** Tell the agent which entities are out of scope. Ask it to merge entities that share an identity or to fold a telemetry table into a time-series property on an existing entity type instead of creating a separate entity type. |
| The agent doesn't propose the requested change | Specify which entity, relationship, or binding you want to change. Ask the agent to summarize its current view of the schema. If its view is stale, ask it to refresh. If you recently changed source schemas, tell the agent that it might need to rediscover them. |
| The agent proposes a patch instead of a full rewrite | This behavior is intentional. Patches preserve stable identifiers (IDs) and minimize the scope of changes. If you need a rewrite, request it explicitly and confirm the impact before applying. Rewriting can break downstream queries that depend on stable entity or relationship IDs. |

### Troubleshoot ontology queries

| Issue | Recommendation |
|---|---|
| A query returns no results | - Confirm that the table or graph contains data in the requested time range. <br>- If the query returns zero rows, ask the agent to broaden the time window, remove a filter, or inspect the schema again. The agent explicitly reports an empty result and doesn't invent data. <br>- For Graph Query Language (GQL), the agent uses ISO GQL rather than openCypher. Use ISO GQL syntax when you verify the query. |

### Troubleshoot Plan and Act modes

| Issue | Recommendation |
|---|---|
| Nothing happens when I ask the agent to apply changes | You might be in **Plan mode**, which prevents the agent from making changes. Switch the chat to **Act mode** and ask again. The agent explains what it will apply before it makes the change. If you have Viewer access, the service blocks write operations even when you select Act mode. |

### Troubleshoot AI responses

| Issue | Recommendation |
|---|---|
| The agent stops responding or returns an error | Send *Try again* as a new message in the same chat. The agent preserves the conversation context and retries the failed turn. If the failure persists, wait a few minutes before you retry. During preview, conversation state exists only in your current browser session, so refreshing the page clears the chat and any in-progress draft. Changes already applied in Act mode remain part of the ontology item. |
| The output is low quality or off topic | - Explain what's wrong and why in the chat. Specific feedback helps the agent improve its next response. <br>- Restate your goal with more detail. <br> - If quality is consistently low, use the in-chat feedback control. |

## Troubleshoot ontology MCP server

| Issue | Recommendation |
|---|---|
| Can't use Service Principal to access the ontology MCP | This feature is currently unavailable due to a known issue. |
| Can't query a parent entity and get the instances of the inheriting entities | This feature is currently unavailable due to a known issue. |


## Troubleshoot migration to new experience

| Issue | Recommendation |
|---|---|
| Migration fails | Check whether your old ontology meets either of these failure conditions: <br>- The old ontology contains properties configured as *Defined at Binding* <br>- The old ontology contains entities that use composite keys <br><br> Both of these conditions cause migration to fail. Remove the problematic properties or keys and retry the migration. |