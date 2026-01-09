---
title: Troubleshooting ontology (preview)
description: This article provides troubleshooting suggestions for ontology (preview).
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/16/2025
ms.topic: concept-article
---

# Troubleshooting ontology (preview)

This article contains troubleshooting suggestions for ontology (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Troubleshoot ontology item creation

The table below describes common issues when creating a new ontology (preview) item.

| Issue | Recommendation |
|---|---|
| Fabric is unable to create the ontology (preview) item | The most common cause of failure when creating a new ontology item is failure to enable a required tenant setting. If you see this error, make sure that you've enabled all the required tenant settings described in [Required tenant settings for ontology (preview)](overview-tenant-settings.md). |

### Troubleshoot ontology generated from a semantic model

The table below describes common issues when generating a new ontology (preview) item [from a semantic model](concepts-generate.md).

| Issue | Recommendation |
|---|---|
| The ontology item fails to generate | Make sure you've enabled all [required tenant settings](overview-tenant-settings.md) for generating an ontology from a semantic model, including **XMLA endpoints**. <br><br>Make sure the semantic model is in a different workspace than **My workspace** (ontology generation isn't supported in **My workspace**). |
| The ontology item is created but there are no entity types | Make sure your semantic model is published, the tables in the semantic model are visible (not hidden), and relationships are defined. |
| The ontology item is created but entity types have no data bindings | Ontology data binding is [not supported](concepts-generate.md#support-for-semantic-model-modes) for source semantic models in **Import mode**, or semantic models in **Direct Lake mode** while the backing lakehouse is in a workspace with **inbound public access disabled**. Try changing these settings and regenerating the ontology. |
| Queries return null values for `Decimal` properties | Fabric Graph does not currently support the `Decimal` type. As a result, if you generate an ontology from a semantic model with tables that include `Decimal` type columns, you see null values returned for those properties on all queries. `Double` type is supported, however, so recreating the property as a `Double` type in ontology and binding it to the source data will allow the data to show up in queries. |
| General troubleshooting | Make sure the ontology operation you're trying to complete is [supported for your semantic model mode](concepts-generate.md#support-for-semantic-model-modes). |

## Troubleshoot data binding

The table below describes common issues when binding data to an ontology (preview) item.

| Issue | Recommendation |
|---|---|
| Lakehouse not available as data source when creating a binding | Check to make sure **OneLake security** is not enabled on your lakehouse. Lakehouses with OneLake security enabled are not supported as data sources for bindings. |
| Issue with keys while binding relationship types | If you don't see any keys for an entity type, make sure your source and target entity types have keys defined. | 

## Troubleshoot preview experience

The table below describes common issues when using the preview experience of an ontology (preview) item.

| Issue | Recommendation |
|---|---|
| Preview experience shows error `403 Forbidden` | This error might indicate that you don't have access to the lakehouse that contains the source data for the ontology's data bindings. Contact your administrator to obtain access to the lakehouse. |
| Preview experience graph doesn't load | This indicates an issue with the underlying graph. One possible cause is having column mapping enabled on the underlying delta tables, which is not supported. Column mapping can be enabled manually, or is enabled automatically on lakehouse tables where column names have certain special characters, including `,`, `;`, `{}`, `()`, `\n`, `\t`, `=`, and space. It also happens automatically on the delta tables that store data for import mode semantic model tables. | 
| Preview experience shows no data | This might happen because your ontology instance can't access the underlying Fabric Graph. Ontology only supports **managed** lakehouse tables (located in the same OneLake directory as the lakehouse), not **external** tables that show in the lakehouse but reside in a different location. Changing the table name after mappings are created may also break the connection relied on by the preview experience. |
| No entity instances shown | This behavior indicates an error accessing the data bindings. Confirm that the source data tables exist in OneLake with matching column names, and that your Fabric identity has data access. |
| Graph is sparse or missing data | Check that entity type keys are defined for each entity type, and verify that the source data is properly bound to those keys. |

## Troubleshoot ontology as data agent source

The table below describes common issues when using ontology (preview) as a source for [Fabric data agent (preview)](../../data-science/concept-data-agent.md)

| Issue | Recommendation |
|---|---|
| Can't find the data agent item type, or the data agent can't be created | Make sure you've enabled all [required tenant settings](overview-tenant-settings.md) for using ontology and data agent, including **Data agent item types (preview)**. |
| First queries fail | If you experience failures with the first few queries run after the data agent is created, try waiting a few minutes to give the agent more time to initialize. Then, run the queries again. |
| Query results don't aggregate correctly | There is a known issue affecting aggregation in queries. To enable better aggregation, add the instruction `Support group by in GQL` to the agent's instructions as described in [Provide agent instructions](tutorial-4-create-data-agent.md#provide-agent-instructions). |
| Query results are vague or generic | Make sure that the agent includes the ontology as a knowledge source. Also, make sure that entity and relationship names are meaningful and documented in the ontology. |