---
title: Fabric OneLake events connector for Fabric event streams
description: The include files has the common content for configuring Fabric OneLake events connector for Fabric event streams and Real-Time hub. 
ms.reviewer: robece
ms.topic: include
ms.date: 11/13/2024
---

1. On the **Connect** page, for **Event types**, select the event types that you want to monitor.

    :::image type="content" source="./media/fabric-onelake-source-connector/select-event-types.png" alt-text="Screenshot that shows the selection of OneLake event types on the Connect page." lightbox="./media/fabric-onelake-source-connector/select-event-types.png":::
1. This step is optional. To see the schemas for event types,  select **View selected event type schemas**. If you select it, browse through schemas for the events, and then navigate back to previous page by selecting the backward arrow button at the top. 
1. Select **Add a OneLake source** under **Select data source for events**. 

    :::image type="content" source="./media/fabric-onelake-source-connector/add-onelake-source-button.png" alt-text="Screenshot that shows the selection the Add a OneLake source button." lightbox="./media/fabric-onelake-source-connector/add-onelake-source-button.png":::    
1. On the **Choose the data you want to connect** page:
    1. View all available data sources or only your data sources (My data) or your favorite data sources by using the category buttons at the top. You can use the **Filter by keyword** text box to search for a specific source. You can also use the **Filter** button to filter based on the type of the resource (KQL Database, Lakehouse, SQL Database, Warehouse). The following example uses the **My data** option.  
    1. Select the data source from the list. 
    1. Select **Next** at the bottom of the page. 
    
        :::image type="content" source="./media/fabric-onelake-source-connector/select-data-source.png" alt-text="Screenshot that shows the selection of a specific OneLake data source." lightbox="./media/fabric-onelake-source-connector/select-data-source.png":::       
1. Select all tables or a specific table that you're interested in, and then select **Add**. 

    :::image type="content" source="./media/fabric-onelake-source-connector/select-tables.png" alt-text="Screenshot that shows the selection of all tables." lightbox="./media/fabric-onelake-source-connector/select-tables.png":::       
1. Now, on the **Configure connection settings** page, you can add filters to set the filter conditions by selecting fields to watch and the alert value. To add a filter:
    1. Select **+ Filter**. 
    1. Select a field.
    1. Select an operator.
    1. Select one or more values to match. 
 
        :::image type="content" source="./media/fabric-onelake-source-connector/set-filters.png" alt-text="Screenshot that shows the addition of a filter." lightbox="./media/fabric-onelake-source-connector/set-filters.png":::       
1. Then, select **Next** at the bottom of the page.

    :::image type="content" source="./media/fabric-onelake-source-connector/next-button.png" alt-text="Screenshot that shows the selection of the Next button." lightbox="./media/fabric-onelake-source-connector/next-button.png":::
1. On the **Review + connect** page, review settings, and select **Add**.

    :::image type="content" source="./media/fabric-onelake-source-connector/review-create-page.png" alt-text="Screenshot that shows the Review and create page." lightbox="./media/fabric-onelake-source-connector/review-create-page.png":::
