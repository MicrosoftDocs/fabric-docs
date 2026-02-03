---
title: Ontology (preview) required tenant settings
description: Enable settings on your Fabric tenant before using ontology (preview) features.
author: baanders
ms.author: baanders
ms.reviewer: baanders
ms.date: 12/01/2025
ms.topic: concept-article
---

# Required tenant settings for ontology (preview)

Before you can use all the features of ontology (preview), you must enable certain settings on your Fabric tenant. This article describes required and optional tenant settings for using ontology.

[Fabric administrators](../../admin/roles.md) can grant access to these settings in the [admin portal](../../admin/admin-center.md) under [tenant settings](../../admin/tenant-settings-index.md).

## Ontology item (preview)

This setting is **required** to create ontology (preview) items: *Enable Ontology item (preview)*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-ontology.png" alt-text="Screenshot of enabling ontology in the admin portal.":::

If you don't enable this setting, you get errors when creating a new ontology item.

## Graph (preview)

This setting is **required** to enable the graphs associated with ontology (preview): *User can create Graph (preview)*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-graph.png" alt-text="Screenshot of enabling graph in the admin portal.":::

If you don't enable this setting, you get errors when accessing a newly created ontology item. You might see the error message *Unable to create the Ontology (preview) item. Please try again or contact support if the issue persists.*

:::image type="content" source="media/overview-tenant-settings/graph-error.png" alt-text="Screenshot of the error from missing graph permissions.":::

## Data agent item types (preview)

This setting is optional, but required if you want to use ontology (preview) with a Fabric data agent: *Users can create and share Data agent item types (preview)*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-data-agent.png" alt-text="Screenshot of enabling data agents in the admin portal.":::

If you don't enable this setting, you see errors when creating a new data agent item.

## Copilot and Azure OpenAI Service

These settings are optional, but required if you want to use ontology (preview) with a Fabric data agent:
* *Users can use Copilot and other features powered by Azure OpenAI*
* *Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance*
* *Data sent to Azure OpenAI can be stored outside your capacity's geographic region, compliance boundary, or national cloud instance*

:::image type="content" source="media/overview-tenant-settings/prerequisite-open-ai.png" alt-text="Screenshot of enabling multiple OpenAI settings in the admin portal.":::

If you don't enable these settings, you might see the `403 Forbidden - Disallowed` error when trying to use data agent.

## Next steps

Now that your tenant is ready to work with ontology (preview), get started with the [Ontology (preview) tutorial](tutorial-0-introduction.md).
