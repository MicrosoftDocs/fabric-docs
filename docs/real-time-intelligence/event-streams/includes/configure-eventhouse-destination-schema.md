---
title: Configure destinations for schema-enabled sources
description: Include file with instructions on how to configure supported destinations for schema-enabled sources.
ms.topic: include
ms.date: 09/27/2025
---

1. Select **Transform events or add destination**, and then select **Eventhouse**.

1. On the **Eventhouse** pane, configure the following schema-related settings:

    1. For **Input schema**, select one or more schemas from the dropdown list.

        :::image type="content" source="./media/configure-destinations-schema-enabled-sources/extended-eventhouse-input-schema.png" alt-text="Screenshot that shows the eventhouse configuration pane with an input schema selected." lightbox="./media/configure-destinations-schema-enabled-sources/extended-eventhouse-input-schema.png":::

        > [!NOTE]
        > If you selected the **Dynamic schema via headers** option when configuring an Event Hubs source, you might have configured multiple schemas for the source and mapped them to various properties and their values.

    1. For **Table creation method**, select **A single table with all schemas combined** or **Separate tables for each schema**, depending on your requirements.

        :::image type="content" source="./media/configure-destinations-schema-enabled-sources/table-creation-methods.png" alt-text="Screenshot that shows the eventhouse configuration pane with table creation methods." lightbox="./media/configure-destinations-schema-enabled-sources/table-creation-methods.png":::

    1. For **Write data with**, select one of the following options:

        - **Payload only**: Write extracted payload data to the table. If there are multiple input schemas, data is sent to multiple tables.
        - **Metadata and payload**: Write metadata and payload data to a single table. Example columns include `source` , `subject`, `type`, and `data`.

        :::image type="content" source="./media/configure-destinations-schema-enabled-sources/write-data.png" alt-text="Screenshot that shows the eventhouse configuration pane with the options for writing data." lightbox="./media/configure-destinations-schema-enabled-sources/write-data.png":::

For detailed steps on configuring an eventhouse destination, see [Add an eventhouse destination to an eventstream](../add-destination-kql-database.md).
