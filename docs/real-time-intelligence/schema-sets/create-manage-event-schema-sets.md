---
title: Create Event Schema Sets in Fabric Real-Time Intelligence
description: Learn how to create and manage event schema sets in Microsoft Fabric Real-Time Intelligence to streamline your streaming analytics workflows.
#customer intent: As a user, I want to learn how to create an event schema set in Real-Time Intelligence.
ms.topic: how-to
ms.custom:
  - ai-gen-docs-bap
  - ai-gen-description
  - ai-seo-date:08/07/2025
ms.date: 09/08/2026
ms.search.form: Schema Registry
ai-usage: ai-assisted
---

# Create and manage event schema sets in Microsoft Fabric

In this article, you learn how to create and manage event schema sets in Microsoft Fabric Real-Time Intelligence. Event schema sets help you organize and standardize data structures (schemas) for your real-time analytics workflows, making it easier to process and analyze streaming data consistently.

## Prerequisites

To create an event schema set, you need the **Admin**, **Member**, or **Contributor** role on the workspace. Users with the **Viewer** role can view an existing schema set but can't create or modify one. For more information, see [Permissions](schema-registry-overview.md#permissions).

## Create a schema set

1. Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
1. Open the workspace where you want to create the schema set.
1. Select **+ New item** on the command bar.
1. On the **New item** page, search for **Event schema set**, and then select **Event schema set**.

    :::image type="content" source="./media/create-manage-event-schema-sets/new-item-event-schema-set.png" alt-text="Screenshot of the New item page with Event schema set selected." lightbox="./media/create-manage-event-schema-sets/new-item-event-schema-set.png":::

1. In the **New event schema set** window, enter a **name** for the schema set, such as `Fabrikam device telemetry`, and then select **Create**. The name must contain fewer than **256 UTF-8 characters**.

    :::image type="content" source="./media/create-manage-event-schema-sets/new-schema-set-window.png" alt-text="Screenshot that shows the New event schema set window." lightbox="./media/create-manage-event-schema-sets/new-schema-set-window.png":::

1. Wait for creation to finish. The schema set page opens. You can [create a schema](create-manage-event-schemas.md) or [import existing Avro schemas](import-event-schemas.md).

    :::image type="content" source="./media/create-manage-event-schema-sets/editor.png" alt-text="Screenshot that shows a newly created schema set and options to add schemas." lightbox="./media/create-manage-event-schema-sets/editor.png":::

## Explore a schema set

Open the event schema set from its workspace or from the **Event schema registry** page in Real-Time hub. The schema set page lists the schemas in that set.

- Search for a schema by name.
- Preview a schema to inspect its definition without leaving the list.
- Open a schema to view its definition and [version history](manage-event-schema-versions.md).
- Select multiple schemas to download their definitions.

The schema set page and the individual schema page are separate views. Use the containing schema set link when you want to return to the group of related schemas.

<!-- Screenshot: media/create-manage-event-schema-sets/schema-set-list.png; capture the populated schema set, preview, and navigation. -->

## Configure settings for a schema set

Open the schema set settings to manage its name and description. Fabric governance settings, such as sensitivity labels and endorsement, apply to the schema set item. For access requirements, see [Permissions](schema-registry-overview.md#permissions).

:::image type="content" source="./media/create-manage-event-schema-sets/schema-set-settings.png" alt-text="Screenshot that shows the settings for a schema set." lightbox="./media/create-manage-event-schema-sets/schema-set-settings.png":::

## Related content

- [Create and manage event schemas in schema sets](create-manage-event-schemas.md).
- [Import event schemas](import-event-schemas.md).
- [Manage event schema versions](manage-event-schema-versions.md).
