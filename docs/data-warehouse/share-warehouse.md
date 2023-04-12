---
title: Share your warehouse
description: Learn about sharing your warehouse.
ms.reviewer: wiassaf
ms.author: jacindaeng
author: jacindaeng
ms.topic: conceptual
ms.date: 04/11/2023
---

# HowTo: Share your warehouse

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse 

> [!NOTE]  
> You must be an Admin or Member in your workspace to share a warehouse. Contributors and Viewers do not have permissions to share. 

Sharing is a convenient way to provide users access to your Warehouse(s) for downstream consumption. 
This allows downstream users in your organization to consume the Warehouse using SQL, Spark or Power BI. 
You can customize the level of permissions that the shared recipient gets to provide just the right level of access

## Getting started
After identifying the Warehouse you would like to share with another user in your Fabric workspace, 
click on the More Options button (“…”) to open the context menu for that specific Warehouse and select **Share**.

:::image type="content" source="media\share-warehouse\Workspace_Context_Menu_Share.png" alt-text="Screenshot of the Share button in the Context Menu within the Workspace" lightbox="media\share-warehouse\Workspace_Context_Menu_Share.png":::

You can also share your Warehouse from the Data Hub by selecting the context menu and choosing **Share**.

:::image type="content" source="media\share-warehouse\Data_Hub_Share.png" alt-text="Screenshot of the Share button in the Context Menu within the Data Hub" lightbox="media\share-warehouse\Data_Hub_Share.png":::

You will be prompted with the following options to select who you would like to share the warehouse with, what permission(s) to grant them, and whether you would like them to be notified by email. 
When you have filled in all the required fields, click on **Grant access**. 

Here’s more detail about each of the permissions provided:

- **If no additional permissions are selected** - the shared recipient will by default receive “Read” permissions, which will only allow the user to connect to the Warehouse SQL endpoint. This is the equivalent of Connect permissions in SQL. The shared recipient will not be able to query any table or view or execute any function or stored procedure unless he/she is provided access to objects within the Warehouse using T-SQL GRANT statement. 
- **“Read all SQL endpoint data” is selected (“ReadAllSQL” permissions)** - the shared recipient can read all the database objects within the warehouse. This is the equivalent of db_datareader role in SQL. The shared recipient can read data from all tables and views within the Warehouse. If you want to further restrict and provide granular access to some objects within the Warehouse, you can do this using T-SQL REVOKE statement. 
- **“Read all data using Apache Spark” is selected (“ReadAllApacheSpark” permissions)** - the shared recipient has full read access to the raw parquet files in One Lake which can be consumed using Spark.  This should be provided only if the shared recipient wants complete access to your Warehouse’s files to access this using the Spark engine.
- **“Build reports on the default checkbox” is selected (“Build” permissions)** - the shared recipient can build reports on top of the default dataset that is connected to your Warehouse. This should be provided if the shared recipient wants “build” permissions on the default dataset and wants this to create Power BI reports against this dataset. This checkbox is selected by default but can be unchecked.   

:::image type="content" source="media\share-warehouse\Grant_Permissions.png" alt-text="Screenshot of the Grant Permissions pop-up" lightbox="media\share-warehouse\Grant_Permissions.png":::

When your recipients receive the email, they can select **Open this warehouse** and automatically get access to the warehouse through the shareable link. 

:::image type="content" source="media\share-warehouse\Share_Email_Notification.png" alt-text="Screenshot of the email notification a share recipient receives when warehouse is shared" lightbox="media\share-warehouse\Share_Email_Notification.png":::

Depending on the level of access the shared recipient has to the warehouse, they’ll see a landing page similar to the one below providing them access to query the warehouse, build reports, and/or connect to the SQL endpoint. 

:::image type="content" source="media\share-warehouse\Sharing_L2.png" alt-text="Screenshot of the landing page from the email notification a share recipient receives when warehouse is shared" lightbox="media\share-warehouse\Sharing_L2.png":::

## ReadAllSQL Permissions
With ReadALLSQL permissions, a user can open the warehouse editor in read-only mode and view the warehouse’s data. The user can copy the SQL endpoint provided and connect to a client tool to run queries. 

:::image type="content" source="media\share-warehouse\SQL_Endpoint.png" alt-text="Screenshot of the SQL endpoint on the landing page" lightbox="media\share-warehouse\SQL_Endpoint.png":::

## ReadAllApacheSpark Permissions
A user with ReadAllApacheSpark permissions can find the ABFSS path to the specific file in OneLake to read using a Spark Notebook. 

## Considerations and Limitations
- Shared recipients only have access to the Warehouse they receive and not any other artifacts within the same workspace as the warehouse. If you want to provide permissions for other users in your team to collaborate on the Warehouse, please add them as Workspace roles such as “Member” or “Contributor”. 
- Currently, when you share a Warehouse and choose “Read all SQL endpoint data”, the shared recipient can access the Warehouse editor in a read-only mode. These shared recipients can create queries but not save their queries at this point. (will be available in the future)
- Shared recipients do not have permission to reshare the warehouse they are given permission to. 

