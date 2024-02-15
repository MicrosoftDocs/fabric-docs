---
title: Integrate Databricks Unity Catalog with OneLake
description: Learn how to sync Databricks Unity Catalog Delta tables to OneLake using shortcuts.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: how-to
ms.custom:
  - fabric-cat
ms.date: 02/15/2024
---

# Integrate Unity Catalog with OneLake

This scenario shows how to integrate Unity Catalog Delta tables to OneLake using shortcuts. After completing this tutorial, you’ll be able to automatically sync your Unity Catalog Delta tables to a Microsoft Fabric lakehouse.

## Prerequisites

Before you connect, you must have:

- A [Fabric workspace](../get-started/create-workspaces.md).
- A [Fabric lakehouse](../data-engineering/tutorial-build-lakehouse.md) in your workspace.
- Unity Catalog schemas and tables created within your Azure Databricks workspace. 


## Set up your Cloud Storage connection

First, examine which storage locations in Azure Data Lake Storage Gen2 (ADLS Gen2) your Unity Catalog tables are using. This Cloud storage connection is used by OneLake shortcuts. To create a Cloud connection to the appropriate Unity Catalog storage location:

1. Create a Cloud storage connection used by your Unity Catalog tables. See how to set up a [ADLS Gen2 connection](../data-factory/connector-azure-data-lake-storage-gen2.md).

2. Once you create the connection, obtain the connection ID by selecting  **Manage connections and gateways** > **Connections** > **Settings**.

## Run the notebook

Once the Cloud connection ID is obtained, integrate Unity Catalog tables to Fabric lakehouse as follows:

1. **Import sync notebook** to Fabric your workspace.  [This notebook](./onelake-unity-catalog.md) exports all Unity Catalog tables metadata from a given catalog and schemas in your Unity Catalog. The Databricks API, authenticated through PAT token, is utilized for exporting Unity Catalog tables.

2. **Configure the parameters** in the first cell to integrate Unity Catalog tables. The following snippet is used to configure the source (Unity Catalog) and destination (OneLake) parameters. Ensure to replace them with your own values.

```python
databricks_config = {
    # Databricks workspace
    'dbx_workspace': "<databricks_workspace_url>",
    'dbx_token': "<pat_token>",
    # Unity Catalog
    'dbx_uc_catalog': "catalog1",
    'dbx_uc_schemas': ["schema1", "schema2"]
}

fabric_config = {
    'workspace_id': "<workspace_id>",
    'lakehouse_id': "<lakehouse_id>",
    'shortcut_connection_id': "<connection_id>",
    # If True, UC table renames and deletes will be considered
    "consider_dbx_uc_table_changes": True
}
```

3. **Run all cells** of the sync notebook to start synchronizing Unity Catalog Delta tables to OneLake using shortcuts. Once notebook is completed, shortcuts to Unity Catalog Delta tables are available in the Lakehouse explorer, SQL endpoint, and semantic model.

:::image type="content" source="media\onelake-unity-catalog\notebook-output.png" alt-text="Screenshot showing notebook output.":::

### Schedule the notebook

If you want to execute the notebook at regular intervals to integrate Unity Catalog Delta tables into OneLake without manual resync / rerun, you can either [schedule the notebook](../data-engineering/how-to-use-notebook.md) or utilize a [notebook activity](../data-factory/notebook-activity.md) in a data pipeline within Fabric Data Factory.

For the latter scenario, if you intend to pass parameters from the pipeline, designate the first cell of the notebook as a [toggle parameter cell](../data-engineering/author-execute-notebook.md).

### Other considerations

- The notebook works with both Unity Catalog managed and external Delta tables. If you’re using multiple Cloud storage locations for your Unity Catalog tables, i.e. more than one ADLS Gen2, the recommendation is to run the notebook separately by each Cloud connection.
- Views and non-Delta tables are skipped.
- Security and governance metadata need to be redefined within Fabric explicitly as they are in Unity Catalog.
- Changes to Unity Catalog table schemas like add / delete columns will be reflected automatically in the shortcuts. However, some updates like Unity Catalog table rename and deletion require a notebook resync / rerun. 
- For production scenarios, we recommend using [Databricks OAuth](https://learn.microsoft.com/azure/databricks/dev-tools/auth/oauth-m2m) for authentication and Azure Key Vault to manage secrets. You can use the [MSSparkUtils](../data-engineering/microsoft-spark-utilities.md) credentials utilities to access Key Vault secrets.


## Related content

- [Integrate OneLake with Azure Databricks](onelake-azure-databricks.md)
- [OneLake shortcuts](onelake-shortcuts.md)