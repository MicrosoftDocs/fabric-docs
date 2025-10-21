---
title: Process Events Using a SQL Operator
description: Learn how to use a SQL operator to process events that flow through eventstreams. 
ms.reviewer: spelluru
ms.author: vashriva
author: vaibhav3sh
ms.topic: how-to
ms.custom:
ms.date: 06/18/2025
ms.search.form: Event Processor
---

# Process events by using a SQL operator (preview)

A SQL operator (preview), also called a SQL code editor, is a new data transformation capability in Microsoft Fabric eventstreams. SQL operators provide a code editing experience where you can easily define your own custom data transformation logic by using simple SQL expressions. This article describes how to use a SQL operator for data transformations in an eventstream.

> [!NOTE]
> Eventstream artifact names that include an underscore (_) or dot (.) are not compatible with SQL operators. For the best experience, create a new eventstream without using underscores or dots in the artifact name.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the trial license mode with Contributor or higher permissions.

## Add a SQL operator to an eventstream

To perform stream processing operations on your data streams by using a SQL operator, add a SQL operator to your eventstream by using the following instructions:

1. Create a new eventstream. Then add a SQL operator to it by using one of the following options:
    - On the ribbon, select **Transform events**, and then select **SQL**.

      :::image type="content" source="./media/process-events-using-sql-code-editor/transform-sql-menu.png" alt-text="Screenshot that shows the selection of a SQL operator on the menu for transforming events." lightbox="./media/process-events-using-sql-code-editor/transform-sql-menu.png":::
    - On the canvas, select **Transform events or add destination**, and then select **SQL Code**.

      :::image type="content" source="./media/process-events-using-sql-code-editor/transform-sql-inline.png" alt-text="Screenshot that shows the selection of a SQL operator in the list for transforming events on the canvas." lightbox="./media/process-events-using-sql-code-editor/transform-sql-inline.png":::

1. A new SQL node is added to your eventstream. Select the pencil icon to continue setting up the SQL operator.  

      :::image type="content" source="./media/process-events-using-sql-code-editor/sql-configure-button.png" alt-text="Screenshot that shows the selection of the pencil icon on the SQL operator node." lightbox="./media/process-events-using-sql-code-editor/sql-configure-button.png":::

1. On the **SQL Code** pane, specify a unique name for the SQL operator node in the eventstream.

1. Edit the query in the query area, or select **Edit query** to enter the full-screen code editor view.  

      :::image type="content" source="./media/process-events-using-sql-code-editor/operation-name-edit-query.png" alt-text="Screenshot that shows the box for entering an operation name and the button for editing a query on the SQL Code pane." lightbox="./media/process-events-using-sql-code-editor/operation-name-edit-query.png":::

1. The full-screen code editor mode features an input/output explorer pane on the left side. The code editor section is adjustable, so you can resize it according to your preferences. The preview section at the bottom enables you to view both your input data and your query's test result.

      :::image type="content" source="./media/process-events-using-sql-code-editor/sql-full-editor.png" alt-text="Screenshot that shows the SQL full editor." lightbox="./media/process-events-using-sql-code-editor/sql-full-editor.png":::

1. Select the text in the **Outputs** section, and then enter a name for the destination node. The SQL operator supports all Real-Time Intelligence destinations, including an eventhouse, lakehouse, activator, or stream.

    :::image type="content" source="./media/process-events-using-sql-code-editor/select-destination.png" alt-text="Screenshot that shows the Outputs area with the plus button selected." lightbox="./media/process-events-using-sql-code-editor/select-destination.png":::

1. Specify an alias or name for the output destination where the data processed through the SQL operator is written.

    :::image type="content" source="./media/process-events-using-sql-code-editor/output-alias.png" alt-text="Screenshot that shows the name for an output." :::

1. Add **SQL query** for the required data transformation.

    An eventstream is built on top of Azure Stream Analytics, and it supports the same query semantics of the Stream Analytics query language. To learn more about the syntax and usage, see [Azure Stream Analytics and Eventstream Query Language Reference](/stream-analytics-query/stream-analytics-query-language-reference).

    Here's the basic query structure:

    ```sql
    SELECT 
    
        column1, column2, ... 
    
    INTO 
    
        [output alias] 
    
    FROM 
    
        [input alias] 
    ```

    This query example shows the detection of high temperatures in a room every minute:

    ```sql
    
        SELECT 
        System.Timestamp AS WindowEnd, 
        roomId, 
        AVG(temperature) AS AvgTemp 
    INTO 
        output 
    FROM 
        input 
    GROUP BY 
        roomId, 
        TumblingWindow(minute, 1) 
    HAVING 
        AVG(temperature) > 75 
    ```

    This query example shows a `CASE` statement to categorize temperature:

    ```sql
    SELECT
        deviceId, 
        temperature, 
        CASE  
            WHEN temperature > 85 THEN 'High' 
            WHEN temperature BETWEEN 60 AND 85 THEN 'Normal' 
            ELSE 'Low' 
        END AS TempCategory 
    INTO 
        CategorizedTempOutput 
    FROM 
        SensorInput 
    ````

1. On the ribbon, use the **Test query** command to validate the transformation logic. Test query results appear on the **Test result** tab.

    :::image type="content" source="./media/process-events-using-sql-code-editor/test-results.png" alt-text="Screenshot that shows a test result." lightbox="./media/process-events-using-sql-code-editor/test-results.png":::

1. When you finish testing, select **Save** on the ribbon  to get back to the eventstream canvas.  

    :::image type="content" source="./media/process-events-using-sql-code-editor/ribbon.png" alt-text="Screenshot that shows the ribbon for a query, including commands for testing the query and saving." lightbox="./media/process-events-using-sql-code-editor/ribbon.png":::  

1. On the **SQL Code** pane, if the **Save** button is enabled, select it to save the settings.

    :::image type="content" source="./media/process-events-using-sql-code-editor/save-query.png" alt-text="Screenshot that shows the SQL Code pane and the Save button." lightbox="./media/process-events-using-sql-code-editor/save-query.png":::  

1. Configure the destination.

    :::image type="content" source="./media/process-events-using-sql-code-editor/complete.png" alt-text="Screenshot that shows a completed eventstream." lightbox="./media/process-events-using-sql-code-editor/complete.png":::

## Limitations

- The SQL operator is designed to centralize all your transformation logic. As a result, you can't use it alongside other built-in operators within the same processing path. Chaining multiple SQL operators in a single path is also not supported. Additionally, the SQL operator can send output data to only the destination node in the topology.

- Currently, authoring eventstream topologies is supported only through the user interface. REST API support for the SQL operator isn't available yet.

## Related content

- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
