---
title: Configure destinations for schema enabled sources
description: Include file with instructions on how to configure supported destinations for schema enabled sources.
ms.author: spelluru
author: spelluru 
ms.topic: include
ms.custom:
ms.date: 09/27/2025
---

1. Select **Transform events or add destination**, and then select **Eventhouse**.
1. On the **Eventhouse** page, configure the following schema-related settings:
    1. For **Input schema**, select one or more schemas from the drop-down list.

        :::image type="content" source="./media/configure-destinations-schema-enabled-sources/extended-eventhouse-input-schema.png" alt-text="Screenshot that shows the Eventhouse configuration page with an input schema selected." lightbox="./media/configure-destinations-schema-enabled-sources/extended-eventhouse-input-schema.png":::

        > [!NOTE]
        > If you selected **Dynamic schema via headers** option when configuring an Event Hubs source, you might have configured multiple schemas for the source and map them to different properties and their values.
    1. For **Table creation method**, select one of the options depending on your requirements: **A single table with all schemas combined** or **Separate tables for each schema**. 
    
        :::image type="content" source="./media/configure-destinations-schema-enabled-sources/table-creation-methods.png" alt-text="Screenshot that shows the Eventhouse configuration page with table creation methods." lightbox="./media/configure-destinations-schema-enabled-sources/table-creation-methods.png"::: 
    1. For **Write data with**, select one of the following options:
        - **Payload only**: To write extracted payload data to the table. If there are multiple input schemas, data is sent to multiple tables. 
        - **Metadata and payload**: Write metadata and payload data to a single table. Example columns: `source` , `subject`, `type`, `data`, etc.
        
            :::image type="content" source="./media/configure-destinations-schema-enabled-sources/write-data.png" alt-text="Screenshot that shows the Eventhouse configuration page with the write data options." lightbox="./media/configure-destinations-schema-enabled-sources/write-data.png":::         


        For detailed steps on configuring an Eventhouse destination, see [Add an Eventhouse destination to an eventstream](../add-destination-kql-database.md).
