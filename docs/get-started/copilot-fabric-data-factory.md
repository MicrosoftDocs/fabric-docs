---
title: Copilot for Data Factory overview
description: "Learn how Copilot in Data Factory empowers customers to use natural language to articulate their requirements for creating data integration solutions."
author: maggiesMSFT
ms.author: maggies
ms.reviewer: alpowers
ms.topic: conceptual
ms.date: 01/16/2024
ms.custom: 
---
# Copilot for Data Factory overview

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

Copilot in Fabric enhances productivity, unlocks profound insights, and facilitates the creation of custom AI experiences tailored to your data. As a component of the Copilot in Fabric experience, Copilot in Data Factory empowers customers to use natural language to articulate their requirements for creating data integration solutions using [Dataflow Gen2](../data-factory/data-factory-overview.md#dataflows).  Essentially, Copilot in Data Factory operates like a subject-matter expert (SME) collaborating with you to design your dataflows.

Copilot for Data Factory is an AI-enhanced toolset that supports both citizen and professional data wranglers in streamlining their workflow. It provides intelligent [Mashup](/powerquery-m/m-spec-introduction) code generation to transform data using natural language input and generates code explanations to help you better understand earlier generated complex queries and tasks.

> [!NOTE]
>
> - Your administrator needs to enable the tenant switch before you start using Copilot. See the article [Copilot tenant settings](/admin/service-admin-portal-copilot.md) for details. 
> - Your F64 or P1 capacity needs to be in one of the regions listed in this article, [Fabric region availability](/admin/region-availability.md).
> - Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F64 or higher, or P1 or higher) are supported.
> Copilot in Fabric is currently rolling out in public preview and is expected to be available for all customers by end of March 2024. 
> - See the article [Overview of Copilot in Fabric and Power BI](copilot-fabric-overview.md) for more information.

## Supported capabilities

With Dataflow Gen2, you can:

- Generate new transformation steps for an existing query.
- Provide a summary of the query and the applied steps.
- Generate a new query that may include sample data or a reference to an existing query.

## Get started

1. Create a new [Dataflows Gen2](../data-factory/tutorial-end-to-end-dataflow.md).
1. On the Home tab in Dataflows Gen2, select the **Copilot** button.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-home-tab.png" alt-text="Screenshot showing Copilot icon on the Home tab.":::

1. In the bottom left of the Copilot pane, select the starter prompt icon, then the **Get data from** option.

    :::image type="content" source="media/copilot-fabric-data-factory/get-data-from-starter-prompt.png" alt-text="Screenshot showing Get data from the starter prompt.":::

1. In the **Get data** window, search for OData and select the **OData** connector.

    :::image type="content" source="media/copilot-fabric-data-factory/search-odata-connector.png" alt-text="Screenshot showing Select the OData connector.":::

1. In the Connect to data source for the OData connector, input the following text into the URL field:

    ```
    https://services.odata.org/V4/Northwind/Northwind.svc/
    ```

    :::image type="content" source="media/copilot-fabric-data-factory/connect-data-source.png" alt-text="Screenshot showing Connect to the data source.":::

1. From the navigator, select the Orders table and then **Select related tables**. Then select **Create** to bring multiple tables into the Power Query editor.
 
    :::image type="content" source="media/copilot-fabric-data-factory/choose-data-orders-related-tables.png" alt-text="Screenshot showing Choose the data orders table and related tables." lightbox="media/copilot-fabric-data-factory/choose-data-orders-related-tables.png":::

1. Select the Customers query, and in the Copilot pane type this text: ```Only keep European customers```, then press <kbd>Enter</kbd> or select the **Send message** icon. 

    Your input is now visible in the Copilot pane along with a returned response card. You can validate the step with the corresponding step title in the **Applied steps** list and review the formula bar or the data preview window for accuracy of your results.
 
    :::image type="content" source="media/copilot-fabric-data-factory/copilot-filter-rows.png" alt-text="Screenshot showing Filter rows." lightbox="media/copilot-fabric-data-factory/copilot-filter-rows.png":::

1. Select the Employees query, and in the Copilot pane type this text: ```Count the total number of employees by City```, then press <kbd>Enter</kbd> or select the **Send message** icon. Your input is now visible in the Copilot pane along with a returned response card and an **Undo** button.
1. Select the column header for the Total Employees column and choose the option **Sort descending**. The **Undo** button disappears because you modified the query.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-group-by.png" alt-text="Screenshot showing the Copilot pane and Power Query Online user interface." lightbox="media/copilot-fabric-data-factory/copilot-group-by.png":::
 
1. Select the Order_Details query, and in the Copilot pane type this text: ```Only keep orders whose quantities are above the median value```, then press <kbd>Enter</kbd> or select the **Send message** icon. Your input is now visible in the Copilot pane along with a returned response card. 
1. Either select the **Undo** button or type the text ```Undo``` (any text case) and press **Enter** in the Copilot pane to remove the step.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-undo-action.png" alt-text="Screenshot showing the undo button." lightbox="media/copilot-fabric-data-factory/copilot-undo-action.png":::
 
1. To leverage the power of Azure Open AI when creating or transforming your data, ask Copilot to create sample data by typing this text:

    ```Create a new query with sample data that lists all the Microsoft OS versions and the year they were released```

    Copilot adds a new query to the Queries pane list, containing the results of your input. At this point, you can either transform data in the user interface, continue to edit with Copilot text input, or delete the query with an input such as ```Delete my current query```.

    :::image type="content" source="media/copilot-fabric-data-factory/copilot-create-new-query.png" alt-text="Screenshot showing a new query being created." lightbox="media/copilot-fabric-data-factory/copilot-create-new-query.png":::

## Next steps


