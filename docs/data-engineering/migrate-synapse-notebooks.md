---
title: Migrate notebooks
description: Learn about how to migrate notebooks from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: how-to
ms.custom:
  - fabric-cat
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
---

# Migrate Notebooks from Azure Synapse to Fabric

Azure Synapse and Fabric support notebooks. Migrating a notebook from Azure Synapse to Fabric can be done in two different ways:

* Option 1: you can export notebooks from Azure Synapse (.ipynb) and import them to Fabric (manually).
* Option 2: you can use a script to export notebooks from Azure Synapse and import them to Fabric using the API.

For notebook considerations, refer to [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).

## Prerequisites

If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.

## Option 1: Export and import notebook manually

To export a notebook from Azure Synapse:

1.	**Open Synapse Studio**: Sign-in into [Azure](https://portal.azure.com). Navigate to your Azure Synapse workspace and open the Synapse Studio.
1.	**Locate the notebook**: In Synapse Studio, locate the notebook you want to export from the **Notebooks** section of your workspace.
1.	**Export notebook**:
    * Right-click on the notebook you wish to export.
    * Select **Export** > **Notebook (.ipynb).**
    * Choose a destination folder and provide a name for the exported notebook file. 
4.	Once the export is complete, you should have the notebook file available for upload.

:::image type="content" source="media\migrate-synapse\migrate-notebooks-export.png" alt-text="Screenshot showing Synapse Notebook export.":::

To import the exported notebook in Fabric:

1.	**Access Fabric workspace**: Sign-in into [Fabric](https://app.fabric.microsoft.com) and access your workspace.
1.	**Navigate to Data Engineering homepage**: Once inside your Fabric workspace, go to Data Engineering homepage.
1.	**Import notebook**: 
    * Select **Import notebook.** You can import one or more existing notebooks from your local computer to a Fabric workspace.
    * Browse for the .ipynb notebook files that you downloaded from Azure Synapse.
    * Select the notebook files and click **Upload.**
1.	**Open and use the Notebook**: Once the import is completed, you can open and use the notebook in your Fabric workspace.

Once the notebook is imported, validate notebook dependencies:
* Ensure using the same Spark version.
* If you're using referenced notebooks, you can use [msparkutils](microsoft-spark-utilities.md) also in Fabric. However, if you import a notebook that references another one, you need to import the latter as well. Fabric workspace doesn't support folders for now, so any references to notebooks in other folders should be updated. You can use [notebook resources](how-to-use-notebook.md) if needed.
* If a notebook is using pool specific libraries and configurations, you need to import those libraries and/or configurations as well.
* Linked services, data source connections, and mount points.

## Option 2: Use the Fabric API

Follow these key steps for migration:
* Prerequisites.
* Step 1: Export notebooks from Azure Synapse to OneLake (.ipynb).
* Step 2: Import notebooks automatically into Fabric using the Fabric API.

### Prerequisites
The prerequisites include actions you need to consider before starting notebook migration to Fabric.

* A Fabric workspace.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

### Step 1: Export notebooks from Azure Synapse workspace

The focus of Step 1 is on exporting the notebooks from Azure Synapse workspace to OneLake in .ipynb format. This process is as follows:

* **1.1) Import migration notebook** to [Fabric](https://app.fabric.microsoft.com) workspace. [This notebook](https://github.com/microsoft/fabric-migration/tree/main/data-engineering/spark-notebooks) exports all notebooks from a given Azure Synapse workspace to an intermediate directory in OneLake. Synapse API is used to export notebooks.
* **1.2) Configure the parameters** in the first command to export notebooks to an intermediate storage (OneLake). The following snippet is used to configure the source and destination parameters. Ensure to replace them with your own values.

```python
# Azure config
azure_client_id = "<client_id>"
azure_tenant_id = "<tenant_id>"
azure_client_secret = "<client_secret>"

# Azure Synapse workspace config
synapse_workspace_name = "<synapse_workspace_name>"

# Fabric config
workspace_id = "<workspace_id>"
lakehouse_id = "<lakehouse_id>"
export_folder_name = f"export/{synapse_workspace_name}"
prefix = "" # this prefix is used during import {prefix}{notebook_name}

output_folder = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}/Files/{export_folder_name}"
```

* **1.3) Run the first two cells** of the export/import notebook to export notebooks to OneLake. Once cells are completed, this folder structure under the intermediate output directory is created.

:::image type="content" source="media\migrate-synapse\migrate-notebooks-export-api.png" alt-text="Screenshot showing Notebook export in OneLake.":::

### Step 2: Import notebooks into Fabric

Step 2 is when notebooks are imported from intermediate storage into the Fabric workspace. This process is as follows:

* **2.1) Validate the configurations** in step 1.2 to ensure the right Fabric workspace and prefix values are indicated to import the notebooks.
* **2.2) Run the third cell** of the export/import notebook to import all notebooks from intermediate location.

## Related content

- [Migrate Spark pools](migrate-synapse-spark-pools.md)
- [Migrate Spark job definition](migrate-synapse-spark-job-definition.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)
