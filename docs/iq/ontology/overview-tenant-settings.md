---
title: Ontology (preview) required tenant settings
description: Enable settings on your Fabric tenant before using ontology (preview) features.
ms.date: 04/30/2026
ms.topic: concept-article
---

# Required tenant settings for ontology (preview)

Before you can use all the features of ontology (preview), you must enable certain settings on your Fabric tenant. This article describes required and optional tenant settings for using ontology and plan.

[Fabric administrators](../../admin/roles.md) can grant access to these settings in the [admin portal](../../admin/admin-center.md) under [tenant settings](../../admin/tenant-settings-index.md).

## Ontology item (preview)

This setting is **required** to create ontology (preview) items: *Enable Ontology item (preview)*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-ontology.png" alt-text="Screenshot of enabling ontology in the admin portal." lightbox="media/overview-tenant-settings/prerequisite-ontology.png":::

If you don't enable this setting, you get errors when creating a new ontology item.

## Graph (preview)

This setting is **required** to enable the graphs associated with ontology (preview): *User can create Graph (preview)*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-graph.png" alt-text="Screenshot of enabling graph in the admin portal.":::

If you don't enable this setting, you get errors when accessing a newly created ontology item. You might see the error message *Unable to create the Ontology (preview) item. Please try again or contact support if the issue persists.*

:::image type="content" source="media/overview-tenant-settings/graph-error.png" alt-text="Screenshot of the error from missing graph permissions.":::

## Data agent tenant settings

If you want to use ontology (preview) with a Fabric data agent, make sure to configure the required [Fabric data agent tenant settings](../../data-science/data-agent-tenant-settings.md).

If you don't enable this setting, you might see errors when creating a new data agent item.

## Next steps

Now that your tenant is ready to work with ontology (preview), get started with the [Ontology (preview) tutorial](tutorial-0-introduction.md).


