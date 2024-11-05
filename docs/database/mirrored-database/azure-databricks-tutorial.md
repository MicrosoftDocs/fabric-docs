---
title: Microsoft Fabric mirrored databases from Azure Databricks (Preview) Tutorial
description: Learn how to create a mirrored database from Azure Databricks in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sheppardshep, whhender
ms.date: 09/26/2024
ms.topic: overview
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks (Preview)

[Database mirroring in Microsoft Fabric](overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. This guide helps you establish a mirrored database from Azure Databricks, which creates a read-only, continuously replicated copy of your Azure Databricks data in OneLake.

## Prerequisites

- Create or use an existing Azure Databricks workspace with Unity Catalog enabled.
- You must have the `EXTERNAL USE SCHEMA` privilege on the schema in Unity Catalog that contains the tables that will be accessed from Fabric. For more information, see [Control external access to data in Unity Catalog](/azure/databricks/data-governance/unity-catalog/access-open-api).

- You need to use Fabric's permissions model to set access controls for catalogs, schemas, and tables in Fabric.
- Azure Databricks workspaces shouldn't be behind a private endpoint.
- Storage accounts containing Unity Catalog data can't be behind a firewall.

## Create a mirrored database from Azure Databricks

Follow these steps to create a new mirrored database from your Azure Databricks Unity Catalog.

1. Navigate to https://powerbi.com.
1. Select **+ New** and then **Mirrored Azure Databricks catalog**.

   :::image type="content" source="media/azure-databricks-tutorial/mirrored-item.png" alt-text="Screenshot from the Fabric portal of a new Azure Databricks mirrored item.":::

1. Select an existing connection if you have one configured.
   - If you don't have an existing connection, create a new connection and enter all the details. You can authenticate to your Azure Databricks workspace using 'Organizational account' or "Service principal". To create a connection, you must be either a user or an admin of the Azure Databricks workspace.
1. Once you connect to an Azure Databricks workspace, on the **Choose tables from a Databricks catalog** page, you're able to select the catalog, schemas, and tables via the inclusion/exclusion list that you want to add and access from Microsoft Fabric. Pick the catalog and its related schemas and tables that you want to add to your Fabric workspace.
   - You can only see the catalogs/schemas/tables that you have access to as per the privileges that are granted to them as per the privilege model described at [Unity Catalog privileges and securable objects](/azure/databricks/data-governance/unity-catalog/manage-privileges/privileges).
   - By default, the **Automatically sync future catalog changes for the selected schema** is enabled. For more information, see [Mirroring Azure Databricks Unity Catalog (Preview)](azure-databricks.md#metadata-sync).
   - When you have made your selections, select **Next**.
1. By default, the name of the item will be the name of the catalog you're trying to add to Fabric. On the **Review and create** page, you can review the details and optionally change the mirrored database item name, which must be unique in your workspace. Select **Create**.
1. A Databricks catalog item is created and for each table, a corresponding Databricks type shortcut is also created.
   - Schemas that don't have any tables won't be shown.
1. You can also see a preview of the data when you access a shortcut by selecting the SQL analytics endpoint. Open the SQL analytics endpoint item to launch the Explorer and Query editor page. You can query your mirrored Azure Databricks tables with T-SQL in the SQL Editor.

## Create Lakehouse shortcuts to the Databricks catalog item

You can also create shortcuts from your Lakehouse to your Databricks catalog item to use your Lakehouse data and use Spark Notebooks.

1. First, we create a lakehouse. If you already have a lakehouse in this workspace, you can use an existing lakehouse.
   1. Select your workspace in the navigation menu.
   1. Select **+ New** > **Lakehouse**.
   1. Provide a name for your lakehouse in the **Name** field, and select **Create**.
1. In the **Explorer** view of your lakehouse, in the **Get data in your lakehouse** menu, under **Load data in your lakehouse**, select the **New shortcut** button.
1. Select **Microsoft OneLake**. Select a catalog. This is the data item that you created in the previous steps. Then select **Next**.
1. Select tables within the schema, and select **Next**.
1. Select **Create**.
1. Shortcuts are now available in your Lakehouse to use with your other Lakehouse data. You can also use Notebooks and Spark to perform data processing on the data for these catalog tables that you added from your Azure Databricks workspace.

## Create a Semantic Model

> [!TIP]
> For the best experience, it's recommended that you use Microsoft Edge Browser for Semantic Modeling Tasks.

Learn more about the [default Power BI semantic model](../../data-warehouse/semantic-models.md#understand-whats-in-the-default-power-bi-semantic-model).

In addition to the default Power BI semantic model, you have the option of updating the default Power BI semantic model if you choose to add/remove tables from the model or create a new Semantic Model. To update the Default semantic model:

1. Navigate to your Mirrored Azure Databricks item in your workspace.
1. Select the **SQL analytics endpoint** from the dropdown list in the toolbar.
1. Under **Reporting**, select **Manage default semantic model**.

### Manage your semantic model relationships

1. Select **Model Layouts** from the **Explorer** in your workspace.
1. Once Model layouts are selected, you are presented with a graphic of the tables that were included as part of the Semantic Model.
1. To create relationships between tables, drag a column name from one table to another column name of another table. A popup is presented to identify the relationship and cardinality for the tables.

## Related content

- [Secure Fabric mirrored databases from Azure Databricks](azure-databricks-security.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Databricks (Preview)](azure-databricks-limitations.md)
- [Review the FAQ](azure-databricks-faq.yml)
- [Mirroring Azure Databricks Unity Catalog (Preview)](azure-databricks.md)
