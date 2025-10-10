---
title: Process Events Using SQL Operator
description: Learn how to use a SQL operator to process events flowing through eventstreams. 
ms.reviewer: spelluru
ms.author: vashriva
author: vaibhav3sh
ms.topic: how-to
ms.custom:
ms.date: 06/18/2025
ms.search.form: Event Processor
---

# Process events by using a SQL operator (preview)

A SQL operator (preview), also called a SQL code editor, is a new data transformation capability within Microsoft Fabric eventstreams. SQL operators provide a code editing experience where you can easily define your own custom data transformation logic by using simple SQL expressions. This article describes how to use a SQL operator for data transformations in an eventstream.

> [!NOTE]
> Eventstream artifact names that include an underscore (_) or dot (.) are not compatible with SQL operators. For the best experience, create a new eventstream without using underscores or dots in the artifact name.

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the trial license mode with Contributor or higher permissions.

## Add a SQL operator to an eventstream

To perform stream processing operations on your data streams by using a SQL operator, add a SQL operator to your eventstream using the following instructions.

1. Create a new eventstream and add SQL operator to it by using one of the following options:
    - Add SQL operator using the **Transform Events** button at the top ribbon.

      :::image type="content" source="./media/process-events-using-sql-code-editor/transform-sql-menu.png" alt-text="Screenshot that shows the selection SQL operator in the Transfor events menu." lightbox="./media/process-events-using-sql-code-editor/transform-sql-menu.png":::
    - Add SQL operator through the **Add destination** button in the canvas.

      :::image type="content" source="./media/process-events-using-sql-code-editor/transform-sql-inline.png" alt-text="Screenshot that shows the selection of SQL operator in the Transform operator list in the canvas." lightbox="./media/process-events-using-sql-code-editor/transform-sql-inline.png":::

1. Once selected, a new SQL node is added to your eventstream. Select the **pencil** icon to complete the SQL Operator set up.  

      :::image type="content" source="./media/process-events-using-sql-code-editor/sql-configure-button.png" alt-text="Screenshot that shows the selection of the pencil icon on the SQL operator node." lightbox="./media/process-events-using-sql-code-editor/sql-configure-button.png":::

1. In the **SQL Code** window, specify a unique name for the SQL operator node in the eventstream.

1. Edit the query in the Query window or select **Edit query** to enter the full screen code editor view.  

      :::image type="content" source="./media/process-events-using-sql-code-editor/operation-name-edit-query.png" alt-text="Screenshot that shows the Operation name text box and Edit query button in the SQL Code window." lightbox="./media/process-events-using-sql-code-editor/operation-name-edit-query.png":::

1. The full-screen code editor mode features an input/output explorer panel on the left side. The code editor section is adjustable, allowing you to resize it according to your preferences. The preview section at the bottom enables you to view both your input data and query test results.

      :::image type="content" source="./media/process-events-using-sql-code-editor/sql-full-editor.png" alt-text="Screenshot that shows the SQL full editor." lightbox="./media/process-events-using-sql-code-editor/sql-full-editor.png":::

1. Select the text in the **Outputs** section, and enter a name for the destination node. SQL operator supports all Real-Time Intelligence destinations: Eventhouse, Lakehouse, Activator, Stream, etc.

    :::image type="content" source="./media/process-events-using-sql-code-editor/select-destination.png" alt-text="Screenshot that shows the Outputs window with the + button selected." lightbox="./media/process-events-using-sql-code-editor/select-destination.png":::

1. Specify an alias or **name** for the output destination where the data processed through SQL operator is written.

    :::image type="content" source="./media/process-events-using-sql-code-editor/output-alias.png" alt-text="Screenshot that shows the name for the output." :::

1. Add **SQL query** for the required data transformation.

    An eventstream is built on top of Azure Stream Analytics and it supports the same query semantics of Stream Analytics query language. To learn more about the syntax and usage, see [Stream Analytics Query Language Reference - Stream Analytics Query | Microsoft Learn](/stream-analytics-query/stream-analytics-query-language-reference).

    **Basic query structure:**

    ```sql
    SELECT 
    
        column1, column2, ... 
    
    INTO 
    
        [output alias] 
    
    FROM 
    
        [input alias] 
    ```

    **Query examples:**

    Detecting high temperatures in a room every minute:

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

    Use CASE Statement to categorize temperature:

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

1. Use the **Test query** button from the top ribbon to validate the transformation logic. Test query result appears under the test-result section at the bottom.

    :::image type="content" source="./media/process-events-using-sql-code-editor/test-results.png" alt-text="Screenshot that shows the test results." lightbox="./media/process-events-using-sql-code-editor/test-results.png":::

1. When you're done, select **Save** on the ribbon at the top to get back to the eventstream canvas.  

    :::image type="content" source="./media/process-events-using-sql-code-editor/ribbon.png" alt-text="Screenshot that shows the ribbon for the query with save and test query buttons." lightbox="./media/process-events-using-sql-code-editor/ribbon.png":::  

1. In the **SQL Code** window, if the **Save** button is enabled, select it to save the settings.

    :::image type="content" source="./media/process-events-using-sql-code-editor/save-query.png" alt-text="Screenshot that shows SQL Code window." lightbox="./media/process-events-using-sql-code-editor/save-query.png":::  

1. Configure the destination.

    :::image type="content" source="./media/process-events-using-sql-code-editor/complete.png" alt-text="Screenshot that shows the completed eventstream." lightbox="./media/process-events-using-sql-code-editor/complete.png":::        

## Limitations

- The SQL operator is designed to centralize all your transformation logic in one place. As a result, it cannot be used alongside other built-in operators within the same processing path. Chaining multiple SQL operators in a single path is also not supported. Additionally, the SQL operator can only output data to the destination node in the topology.

- Currently, authoring eventstream topologies is only supported through the user interface (UX). REST API support for the SQL operator is planned and will be available in upcoming releases.

## Related content

- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)
