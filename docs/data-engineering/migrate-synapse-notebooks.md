---
title: Migrate notebooks
description: Learn about how to migrate notebooks from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate Notebooks

Migrating a notebook from Azure Synapse to Fabric can be done in two different ways.

* Option 1: you can export a Notebook from Azure Synapse (ipynb) and import it in Fabric (manually).
* Option 2: you can use a script to export notebooks from Azure Synapse and import them in Fabric using the API.

For notebook considerations, refer to [differences between Azure Synapse Spark and Fabric](NEEDLINK).

## Option 1: Import/Export Notebook

To export a notebook from Azure Synapse:

1.	**Access Azure Synapse Studio**: Sign-in into the Azure portal, navigate to your Azure Synapse workspace, and open Azure Synapse Studio.
1.	**Locate the Notebook**: In Azure Synapse Studio, locate the notebook you want to export from the "Notebooks" section of your workspace.
1.	**Export the Notebook**:
    * Right-click on the notebook you wish to export.
    * Select "Export."
    * Choose a destination folder and provide a name for the exported notebook file. By default, the file has an ipynb extension, which is compatible with Fabric.
4.	**Download the Exported Notebook**: Once the export is complete, you should have the notebook file available for upload.

:::image type="content" source="media\migrate-synapse\migrate-notebooks-export.png" alt-text="Screenshot showing Synapse Notebook export.":::

To import the exported notebook in Fabric:

1.	**Access Fabric Workspace**: Sign-in into Fabric and access your workspace.
1.	**Navigate to Data Engineering homepage**: Once inside your Fabric workspace, go to Data Engineering or the Data Science homepage.
1.	**Import the Notebook**: 
    * Select "Import notebook." You can import one or more existing notebooks from your local computer to a Microsoft Fabric workspace.
    * Browse for the ipynb notebook files that you downloaded from Azure Synapse.
    * Select the notebook files and click "Upload."
1.	**Open and Use the Notebook**: Once the import is completed, you can now open and use the notebook in your Fabric workspace.

Once the notebook is imported, validate notebook dependencies:
* Spark version – ensure using the same Spark version while creating the custom Spark pool in Fabric.
* Referenced notebooks - you can use msparkutils (for example for notebook chaining) also in Fabric. However, if you import a notebook that references another one, you need to import the latter as well. Fabric workspace doesn't support folders for now, so any references to notebooks in other folders should be updated. You can use notebooks resources if needed.
* Referenced libraries and configurations – remember that if a notebook is using pool specific libraries and configurations, you need to import those libraries and/or configurations as well.
* Linked services, data source connections, and mount points.

## Option 2: Use the Fabric API

Follow these two key steps for migration:
* Pre-migration steps
* Step 1: Export notebooks from Synapse to OneLake (ipynb) 
* Step 2: Import notebooks automatically into Fabric using the Fabric API

### Pre-migration steps
The pre-migration steps include actions you need to consider before starting notebook migration to Fabric.

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

### Step 1: Export notebooks from Azure Synapse workspace

The focus of Step 1 is on exporting the notebooks from Azure Synapse workspace to OneLake in ipynb format. This process is as follows:

* **1.1) Import migration notebook** to Fabric workspace. [This notebook](NEEDLINK) exports all notebooks from a given Azure Synapse workspace to an intermediate directory in OneLake. Synapse API is used to export notebooks.
* **1.2) Configure the parameters** in the first command to export notebooks to an intermediate storage (OneLake).

```python
# Azure config
azure_client_id = "<>"
azure_tenant_id = "<>"
azure_client_secret = "<>"

# Azure Synapse workspace config
synapse_workspace_name = "<>"

# Fabric config
workspace_id = "<>"
lakehouse_id = "<>"
export_folder_name = f"export/{synapse_workspace_name}"
prefix = "<>" # this prefix is used during import {prefix}{notebook_name}

output_folder = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}/Files/{export_folder_name}"
```

* **1.3) Run the first two cells** to export notebooks to OneLake. Once cells are completed, this folder structure under the intermediate output directory is created.

:::image type="content" source="media\migrate-synapse\migrate-notebooks-export-api.png" alt-text="Screenshot showing Notebook export in OneLake.":::

### Step 2: Import notebooks into Fabric

Step 2 is when notebooks are imported from intermediate storage into the Fabric workspace. This process is as follows:

* **2.1) Validate the configurations** in step 1.2) to ensure the right workspace and prefix are indicated to import the notebooks.
* **2.2) Run the third cell** to import all notebooks from intermediate location.

## Next steps

- [Migrate Spark pools](migrate-synapse-spark-pools.md)
- [Migrate data and pipelines](NEEDLINK)
- [Migrate Spark Job Definitions](migrate-synapse-hms-metadata.md)