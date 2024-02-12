---
title: Integrate Unity Catalog with OneLake
description: Learn how to sync Unity Catalog Delta tables to OneLake using shortcuts.
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
- If you don’t have one already, create a [Fabric lakehouse](../data-engineering/tutorial-build-lakehouse.md) in your workspace.
- Unity Catalog schemas and tables created within your Azure Databricks workspace. 


## Set up your Cloud Storage connection

First, examine which storage locations in Azure Data Lake Storage Gen2 (ADLS Gen2) your Unity Catalog tables are using. This Cloud storage connection is used by OneLake shortcuts. To create a Cloud connection to the appropriate Unity Catalog storage location:

1. Create a Cloud storage connection used by your Unity Catalog tables. See how to set up a [ADLS Gen2 connection](../data-factory/connector-azure-data-lake-storage-gen2-overview.md).

2. Once you create the connection, obtain the connection ID by selecting  **Manage connections and gateways** > **Connections** > **Settings**.

## Sync Unity Catalog Delta tables to OneLake

Once the Cloud connection ID is obtained, sync Unity Catalog tables to Fabric lakehouse as follows:

1. **Import sync notebook** to Fabric workspace.  [This notebook](./onelake-unity-catalog.md) exports all Unity Catalog tables metadata from a given catalog and schemas in your Unity Catalog. The Databricks API, authenticated through PAT token, is utilized for exporting tables.

2. **Configure the parameters** in the first cell to export Unity Catalog tables. The following snippet is used to configure the source (Unity Catalog) and destination (OneLake) parameters. Ensure to replace them with your own values.

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
    # If False, the operation will generate a new unique name for the new shortcut. If True, shortcut creation will be skipped. 
    'skip_if_shortcut_exists': False,
    # Use {catalog}, {schema} or {table} if you want to use UC names
    'shortcut_name': "uc_{schema}_{table}"
}
```

3. **Run all cells** of the sync notebook to start synchronizing Unity Catalog Delta tables to OneLake using shortcuts. Once notebook is completed, shortcuts to Unity Catalog Delta tables are available in the Lakehouse explorer, SQL endpoint and semantic model.

:::image type="content" source="media\onelake-unity-catalog\notebook-output.png" alt-text="Screenshot showing notebook output.":::

### Notes

- The sync notebook works with both managed and external Delta tables. If you’re using multiple Cloud storage locations for your Unity Catalog tables (i.e. more than one ADLS Gen2), the recommendation is to run the notebook separately by each Cloud connection.
- Views and non-Delta tables are skipped.
- Access policies (grants) defined in Unity Catalog aren't inherited into Fabric. Only tables are synced.


## Related content

- [Integrate OneLake with Azure Databricks](onelake-azure-databricks.md)
- [Migrate Hive Metastore metadata](../data-engineering/migrate-synapse-hms-metadata.md)
