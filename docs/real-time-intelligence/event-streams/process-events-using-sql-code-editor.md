---
title: Process events using SQL code editor
description: Learn how to use the SQL code editor to process events flowing through eventstreams. 
ms.reviewer: spelluru
ms.author: vashriva
author: vaibhav3sh
ms.topic: how-to
ms.custom:
ms.date: 06/18/2025
ms.search.form: Event Processor
---

# Process events using SQL code editor (preview) 
SQL operator (preview) is a new data transformation capability within Fabric Eventstream. SQL operators provide code editing experience where you can easily define your own custom data transformation logic using simple SQL expressions. This article describes how to use SQL code editor for data transformations in Eventstream.  

## Prerequisites 
Before you start, you must complete the following prerequisites: 

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions.

## Add SQL code editor to an eventstream
To perform stream processing operations on your data streams using SQL operator, add a SQL operator to your eventstream using the following instructions. 

1. Add SQL operator to your event stream by using one of the following options:
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
1. To add an output destination, navigate to the output section in the left panel, select the green **+** button, and select your desired destination from the available options. 

      :::image type="content" source="./media/process-events-using-sql-code-editor/select-destination.png" alt-text="Screenshot that shows the Outputs window with the + button selected." lightbox="./media/process-events-using-sql-code-editor/select-destination.png":::    
1. In this window, you can perform operations such as the following ones:
    1. Select the text in the **Outputs** section, and enter a name for the destination node. 
    1. Test the SQL query. 
    1. Copy the SQL query to the clipboard.
1. When you're done, select **Save** on the ribbon at the top to get back to the eventstream canvas.  
1. Configure the destination.

    :::image type="content" source="./media/process-events-using-sql-code-editor/complete.png" alt-text="Screenshot that shows the completed eventstream." lightbox="./media/process-events-using-sql-code-editor/complete.png":::        

## SQL queries
Once the basic setup is complete, you can add your SQL query for the required data transformation. Eventstream is built on top of Azure Stream Analytics and it supports the same query semantics of Stream Analytics query language. To learn more about the syntax and usage, see [Stream Analytics Query Language Reference - Stream Analytics Query | Microsoft Learn](/stream-analytics-query/stream-analytics-query-language-reference).

### Basic query structure

```sql
SELECT 

    column1, column2, ... 

INTO 

    [output alias] 

FROM 

    [input alias] 
```

### Query examples

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
```

## Related content

- [Add and manage destinations in an eventstream](./add-manage-eventstream-destinations.md).
