---
title: "Quickstart: Create a Copy job in Data Factory"
description: "Copy data in Data Factory without creating a Fabric data pipeline."
author: KrishnakumarRukmangathan
ms.author: krirukm
ms.reviewer: whhender
ms.topic: quickstart  #Don't change
ms.date: 04/29/2025

#customer intent: As a Data Factory user I want to quickly try the Copy job functionality so that I can evaluate it for my own environment and start learning the tool.

---

# Quickstart: Create a Copy job

With Copy Job in Data Factory within Microsoft Fabric, you can ingest data without the need to create a Fabric data pipeline. It brings together various copy patterns such as bulk or batch, incremental or continuous copy into a single, unified experience.  

This guide walks you through how to copy data incrementally from a Fabric Warehouse table to a Fabric Lakehouse table using Copy job.  

## Prerequisites

Before starting, ensure you have completed the following prerequisites:

A Microsoft Fabric tenant with an active subscription. You can [create a free account](https://www.microsoft.com/fabric).

A Microsoft Fabric workspace. [Learn how to create a workspace](../fundamentals/create-workspaces.md).

A Fabric Warehouse with a table that includes an incremental column, such as a timestamp or an increasing integer column, that can serve as a watermark for change detection. [Learn how to create a warehouse](../data-warehouse/overview.md).

For this guide, we'll use a sample Employee table that is created and populated using the following SQL.

Create the employee table:

```sql
CREATE TABLE dbo.Employee 

( 
    EmployeeID INT NOT NULL, 
    FirstName VARCHAR(40), 
    LastName VARCHAR(40), 
    Position VARCHAR(60), 
    ModifiedDate DATETIME2(3) 
); 
```

Insert sample data:

```sql
INSERT INTO dbo.Employee (EmployeeID, FirstName, LastName, Position, ModifiedDate) 
VALUES  
(1, 'Alice', 'Smith', 'Data Analyst', SYSDATETIME()), 
(2, 'Bob', 'Johnson', 'Engineer', SYSDATETIME()), 
(3, 'Carol', 'Lee', 'Manager', SYSDATETIME()), 
(4, 'David', 'Wong', 'Data Scientist', SYSDATETIME()), 
(5, 'Eve', 'Garcia', 'Product Owner', SYSDATETIME());
```

:::image type="content" source="media/quickstart-copy-job/sample-table.png" alt-text="Screenshot of the created employee table.":::

## Create a Copy Job

[Create a new workspace](../fundamentals/create-workspaces.md) or use an existing **workspace**.

1. Select **+ New Item**, and under **Get data** choose **Copy Job**.

    :::image type="content" source="media/quickstart-copy-job/new-item.png" alt-text="Screenshot of the Fabric workspace with the new item button selected, and the copy job highlighted under get data.":::

1. Name your Copy job, and select **Create**.

    :::image type="content" source="media/quickstart-copy-job/name-copy-job.png" alt-text="Screenshot of the named copy job with the create button highlighted.":::

## Configure Incremental Copy

1. In the **Choose data source** page of the Copy Job wizard, select the preconfigured Fabric Warehouse.

    :::image type="content" source="media/quickstart-copy-job/choose-data-source.png" alt-text="Screenshot of the choose data source page of the copy job creation wizard with a warehouse selected.":::

1. In the **Choose data** page, select the source Warehouse table that includes the incremental column. Select **Next**.

    :::image type="content" source="media/quickstart-copy-job/select-warehouse-table.png" alt-text="Screenshot of the choose data page with the employee SQL table selected.":::

1. In the **Choose data destination** page, select **Lakehouse** under New Fabric item.

    :::image type="content" source="media/quickstart-copy-job/choose-data-destination.png" alt-text="Screenshot of the choose data destination page, with Lakehouse selected.":::

1. Provide a name for the new Lakehouse and select **Create and connect**.

    :::image type="content" source="media/quickstart-copy-job/create-new-lakehouse.png" alt-text="Screenshot of the naming window for the new lakehouse with create and connect selected.":::

1. On the **Map to destination** page, choose **Tables**, optionally rename the destination table, and select **Next**.

    :::image type="content" source="media/quickstart-copy-job/map-to-destination.png" alt-text="Screenshot of the map to destination page with the employee table selected.":::

1. In the **Settings** step, choose **Incremental copy** as the Copy Job mode. Select the column that serves as the incremental column, in our guide **ModifiedDate**.

    :::image type="content" source="media/quickstart-copy-job/select-incremental-copy.png" alt-text="Screenshot of the settings page with incremental copy selected and the incremental column set to ModifiedDate.":::

## Run and monitor the Copy job

1. On the **Review + save** page, verify your settings. Leave the default option to **Start data transfer immediately** and optionally set the Copy job run every 1 minute for faster change tracking.
1. Save the Copy Job and start the first execution by selecting the **Save + Run** button.

    :::image type="content" source="media/quickstart-copy-job/schedule-runs.png" alt-text="Screenshot of the review and save page, with the run options set to run on schedule every one minute.":::

1. Once the Copy job artifact is saved successfully, it starts the first run to bring in the initial data from the source table.

1. Use the **Copy Job panel** or **Monitoring Hub** to monitor progress. [Learn more about monitoring Copy Jobs](monitor-copy-job.md).

    :::image type="content" source="media/quickstart-copy-job/monitor-first-run.png" alt-text="Screenshot of the monitoring hub, showing the successful job with five rows read and five rows written.":::

## Simulate changes with new data

1. Use the following SQL query to insert new rows into the Source Fabric Warehouse table. Create the Employee table:

    ```sql
    INSERT INTO dbo.Employee (EmployeeID, FirstName, LastName, Position, ModifiedDate) VALUES (6, 'John', 'Miller', 'QA Engineer', SYSDATETIME()); 
    INSERT INTO dbo.Employee (EmployeeID, FirstName, LastName, Position, ModifiedDate) VALUES (7, 'Emily', 'Clark', 'Business Analyst', SYSDATETIME()); 
    INSERT INTO dbo.Employee (EmployeeID, FirstName, LastName, Position, ModifiedDate) VALUES (8, 'Michael', 'Brown', 'UX Designer', SYSDATETIME()); 
    ```

1. These new rows are detected by the Copy Job during its next scheduled run.

    :::image type="content" source="media/quickstart-copy-job/monitor-second-run.png" alt-text="Screenshot of the monitoring page showing the successful job with three rows read and three rows written.":::

1. Querying the target Fabric Lakehouse table to confirm the table was moved.

    :::image type="content" source="media/quickstart-copy-job/review-lakehouse-table.png" alt-text="Screenshot of the Fabric Lakehouse table, showing all rows written into the table.":::

## Related content

- [What is Copy job in Data Factory](what-is-copy-job.md)
- [How to monitor a Copy job in Data Factory](monitor-copy-job.md)
- [CI/CD for copy job in Data Factory](cicd-copy-job.md)
