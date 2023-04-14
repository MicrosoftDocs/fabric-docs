---
title: Share your warehouse
description: Learn about sharing your warehouse.
author: jacindaeng
ms.author: jacindaeng
ms.reviewer: wiassaf
ms.date: 04/13/2023
ms.topic: how-to
---

# Share your Synapse Data Warehouse

**Applies to:** [!INCLUDE[fabric-dw](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

Sharing is a convenient way to provide users access to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] for downstream consumption. This allows downstream users in your organization to consume the warehouse using T-SQL, Spark, or Power BI. You can customize the level of permissions that the shared recipient receives.

> [!NOTE]  
> You must be an Admin or Member in your workspace to share a [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Contributors and Viewers do not have permissions to share. 

## Get started

1. After identifying the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] you would like to share with another user in your Fabric workspace, select the **More Options** button ("…") to open the context menu for that specific warehouse and select **Share**.

    :::image type="content" source="media\share-warehouse\workspace-context-menu-share.png" alt-text="Screenshot of the Share button in the context menu within the workspace." lightbox="media\share-warehouse\workspace-context-menu-share.png":::

1. You can also share your warehouse from the **Data Hub** by selecting the context menu and choose **Share**.

    :::image type="content" source="media\share-warehouse\data-hub-share.png" alt-text="Screenshot of the Share button in the context menu within the Data Hub." lightbox="media\share-warehouse\data-hub-share.png":::

1. You will be prompted with options to select who you would like to share the warehouse with, what permission(s) to grant them, and whether you would like them to be notified by email. 

    Here's more detail about each of the permissions provided:
    
    - **If no additional permissions are selected** - The shared recipient will by default receive "Read" permissions, which will only allow the user to connect to the warehouse SQL Endpoint. This is the equivalent of Connect permissions in SQL Server. The shared recipient will not be able to query any table or view or execute any function or stored procedure unless they are provided access to objects within the warehouse using T-SQL GRANT statement. 
    - **"Read all SQL Endpoint data" is selected ("ReadData" permissions)** - The shared recipient can read all the database objects within the warehouse. This is the equivalent of db_datareader role in SQL Server. The shared recipient can read data from all tables and views within the warehouse. If you want to further restrict and provide granular access to some objects within the warehouse, you can do this using T-SQL `REVOKE` statement. With ReadData permissions, a user can open the warehouse editor in read-only mode and view the warehouse's data. The user can copy the SQL Endpoint provided and connect to a client tool to run queries. 
    - **"Read all data using Apache Spark" is selected ("ReadAll" permissions)** - The shared recipient has full read access to the raw parquet files in One Lake, which can be consumed using Spark. This should be provided only if the shared recipient wants complete access to your warehouse's files to access this using the Spark engine. A user with ReadAll permissions can find the `abfss` path to the specific file in OneLake to read using a Spark Notebook. 
    - **"Build reports on the default checkbox" is selected ("Build" permissions)** - The shared recipient can build reports on top of the default Power BI dataset that is connected to your warehouse. This should be provided if the shared recipient wants "Build" permissions on the default dataset and wants this to create Power BI reports against this dataset. This checkbox is selected by default but can be unchecked. 

    When you have filled in all the required fields, select **Grant**. 

    :::image type="content" source="media\share-warehouse\grant-permissions.png" alt-text="Screenshot of the Grant Permissions pop-up." lightbox="media\share-warehouse\grant-permissions.png":::

1. When your recipients receive the email, they can select **Open this warehouse** and automatically get access to the warehouse through the shareable link. 

    :::image type="content" source="media\share-warehouse\shared-this-warehouse-email-notification.png" alt-text="Screenshot of the email notification a share recipient receives when warehouse is shared." lightbox="media\share-warehouse\shared-this-warehouse-email-notification.png":::

1. Depending on the level of access the shared recipient has to the warehouse, they'll see a landing page providing them access to query the warehouse, build reports, and/or connect to the SQL Endpoint. 

    :::image type="content" source="media\share-warehouse\sharing-landing-page.png" alt-text="Screenshot of the landing page from the email notification a share recipient receives when warehouse is shared." lightbox="media\share-warehouse\sharing-landing-page.png":::

## Limitations

- Shared recipients only have access to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] they receive and not any other items within the same workspace as the warehouse. If you want to provide permissions for other users in your team to collaborate on the warehouse, add them as Workspace roles such as "Member" or "Contributor". 
- Currently, when you share a warehouse and choose **Read all SQL endpoint data**, the shared recipient can access the warehouse editor in a read-only mode. These shared recipients can create queries but not save their queries at this point. 
- Shared recipients do not have permission to reshare the warehouse they are given permission to. 

## Next steps

- [View data using the Data preview in Microsoft Fabric](data-preview.md)
- [Define relationships in data models for data warehousing](data-modeling-defining-relationships.md)
- [Data modeling in the default Power BI dataset](model-default-power-bi-dataset.md)