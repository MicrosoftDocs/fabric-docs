---
title: Integrate Databricks Unity Catalog with OneLake
description: Learn how to sync external Unity Catalog Delta tables created within your Azure Databricks workspace to OneLake using shortcuts.
ms.reviewer: preshah
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
  - fabric-cat
ms.date: 02/06/2026
ROBOTS: NOINDEX
#customer intent: As a data engineer, I want to learn how to integrate Databricks Unity Catalog with OneLake using shortcuts so that I can automatically sync my external Unity Catalog Delta tables to a Microsoft Fabric lakehouse.
---

# Integrate Databricks Unity Catalog with OneLake

> [!NOTE]
> This article describes a manual approach using shortcuts to sync Unity Catalog tables to OneLake. Instead of this approach, we recommend using [Mirroring Azure Databricks Unity Catalog](../mirroring/azure-databricks.md) to bring Databricks tables into OneLake with automatic synchronization and minimal setup.

This scenario shows how to integrate Unity Catalog external Delta tables to OneLake using shortcuts. After completing this tutorial, you can automatically sync your Unity Catalog external Delta tables to a Microsoft Fabric lakehouse.

## Prerequisites

Before you connect, make sure you have:

- A [Fabric workspace](../fundamentals/create-workspaces.md).
- A [Fabric lakehouse](../data-engineering/tutorial-build-lakehouse.md) in your workspace.
- [External Unity Catalog Delta tables](/azure/databricks/sql/language-manual/sql-ref-external-tables) created within your Azure Databricks workspace.

## Set up your Cloud storage connection

First, check which storage locations in Azure Data Lake Storage Gen2 (ADLS Gen2) your Unity Catalog tables use. OneLake shortcuts use this Cloud storage connection. To create a Cloud connection to the right Unity Catalog storage location:

1. Create a Cloud storage connection used by your Unity Catalog tables. See how to set up a [ADLS Gen2 connection](../data-factory/connector-azure-data-lake-storage-gen2.md).

1. After you create the connection, get the connection ID by selecting **Settings** :::image type="icon" source="../data-factory/media/connector-common/settings.png"::: > **Manage connections and gateways** > **Connections** > **Settings**.

:::image type="content" source="media\onelake-unity-catalog\adlsgen2-connection.png" alt-text="Screenshot showing ADLS Gen2 connection ID.":::

> [!NOTE]
> Granting users direct storage level access to external location storage in ADLS Gen2 does not honor any permissions granted or audits maintained by Unity Catalog.  Direct access will bypass auditing, lineage, and other security/monitoring features of Unity Catalog including access control and permissions. You are responsible for managing direct storage access through ADLS Gen2 and ensuring that users have the appropriate permissions granted via Fabric.
Avoid all scenarios granting direct storage level write access for buckets storing Databricks managed tables. Modifying, deleting, or evolving any objects directly through storage which were originally managed by Unity Catalog can result in data corruption.

## Run the notebook

After you get the Cloud connection ID, add Unity Catalog tables to your Fabric lakehouse:

:::image type="content" source="media\onelake-unity-catalog\unity-catalog-fabric-flow.png" alt-text="Screenshot showing Unity Catalog to Fabric shortcuts flow.":::

1. **Import sync notebook** to your Fabric workspace.  [This notebook](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/onelake/unity-catalog/nb-sync-uc-fabric-onelake.ipynb) exports all Unity Catalog tables metadata from a given catalog and schemas in your metastore.

1. **Configure the parameters** in the first cell of the notebook to integrate Unity Catalog tables. The Databricks API, authenticated through PAT token, is utilized for exporting Unity Catalog tables. The following snippet is used to configure the source (Unity Catalog) and destination (OneLake) parameters. Ensure to replace them with your own values.

    ```python
    # Databricks workspace
    dbx_workspace = "<databricks_workspace_url>"
    dbx_token = "<pat_token>"
    # Unity Catalog
    dbx_uc_catalog = "catalog1"
    dbx_uc_schemas = '["schema1", "schema2"]'

    # Fabric
    fab_workspace_id = "<workspace_id>"
    fab_lakehouse_id = "<lakehouse_id>"
    fab_shortcut_connection_id = "<connection_id>"
    # If True, UC table renames and deletes will be considered
    fab_consider_dbx_uc_table_changes = True
    ```

1. **Run all cells** of the notebook to start synchronizing Unity Catalog Delta tables to OneLake using shortcuts. When the notebook finishes, shortcuts to Unity Catalog Delta tables are available in the lakehouse, SQL analytics endpoint, and semantic model.

### Schedule the notebook

If you want to execute the notebook at regular intervals to integrate Unity Catalog Delta tables into OneLake without manual resync or rerun, you can either [schedule the notebook](../data-engineering/how-to-use-notebook.md) or use a [notebook activity](../data-factory/notebook-activity.md) in a pipeline within Fabric Data Factory.

In the latter scenario, if you intend to pass parameters from the pipeline, designate the first cell of the notebook as a [toggle parameter cell](../data-engineering/author-execute-notebook.md) and provide the appropriate parameters in the pipeline.

:::image type="content" source="media\onelake-unity-catalog\pipeline-parameters-zoom.png" alt-text="Screenshot showing notebook activity parameters." lightbox="media\onelake-unity-catalog\pipeline-parameters.png":::

### Other considerations

- For production scenarios, use [Databricks OAuth](/azure/databricks/dev-tools/auth/oauth-m2m) for authentication and Azure Key Vault to manage secrets. For example, you can use the [MSSparkUtils](../data-engineering/microsoft-spark-utilities.md) credentials utilities to access Key Vault secrets.
- The notebook works with Unity Catalog external Delta tables. If you're using multiple Cloud storage locations for your Unity Catalog tables, such as more than one ADLS Gen2, run the notebook separately for each Cloud connection.
- Unity Catalog managed Delta tables, views, materialized views, streaming tables, and non-Delta tables aren't supported.
- Changes to Unity Catalog table schemas, like adding or deleting columns, automatically update the shortcuts. However, some updates, like Unity Catalog table rename and deletion, require a notebook resync or rerun. This behavior is controlled by the `fab_consider_dbx_uc_table_changes` parameter.
- For writing scenarios, using the same storage layer across different compute engines can result in unintended consequences. Understand the implications when using different Apache Spark compute engines and runtime versions.

## Related content

- [Integrate OneLake with Azure Databricks](onelake-azure-databricks.md)
- [OneLake shortcuts](onelake-shortcuts.md)
