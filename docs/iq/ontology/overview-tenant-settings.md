---
title: Ontology (Preview) Required Tenant Settings
description: Enable settings on your Fabric tenant before using ontology (preview) features.
ms.date: 09/30/2026
ms.topic: concept-article
---

# Required tenant settings for ontology (preview)

Before you can use all the features of ontology (preview), you must enable certain settings on your Fabric tenant. This article describes required and optional tenant settings for using ontology.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

[Fabric administrators](../../admin/roles.md) can grant access to these settings in **OneLake catalog** > **Govern** > **Configurations** > [**Tenant settings**](../../admin/tenant-settings-index.md).

## Users can create Fabric items

This setting is **required** to create ontology (preview) items with the new experience: *Users can create Fabric items*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-fabric-items.png" alt-text="Screenshot of enabling Fabric items in the admin portal." lightbox="media/overview-tenant-settings/prerequisite-fabric-items.png":::

If you don't enable this setting, you get errors when creating a new ontology item, including while [migrating from the old experience to the new experience](overview.md#migrate-from-old-experience).

## Users can create ontology (preview) items

This setting is **required** to create ontology (preview) items: *Users can create ontology (preview) items*.

:::image type="content" source="media/overview-tenant-settings/prerequisite-ontology.png" alt-text="Screenshot of enabling ontology in the admin portal." lightbox="media/overview-tenant-settings/prerequisite-ontology.png":::

If you don't enable this setting, you get errors when creating a new ontology item.

## Data agent tenant settings

If you want to use ontology (preview) with a Fabric data agent, make sure to configure the required [Fabric data agent tenant settings](../../data-science/data-agent-tenant-settings.md).

If you don't enable these settings, you might see errors when creating a new data agent item.

## Operations agent tenant settings

If you want to use ontology (preview) with a Fabric operations agent, make sure to configure the tenant settings listed in the [Fabric operations agent prerequisites](../../real-time-intelligence/operations-agent.md#prerequisites).

If you don't enable these settings, you might see errors when creating a new operations agent item.

## Next steps

Now that your tenant is ready to work with ontology (preview), get started with the [Ontology (preview) tutorial](tutorial-0-introduction.md).
