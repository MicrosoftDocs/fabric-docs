---
title: Migrate Spark Job Definition
description: Learn about how to migrate Spark Job Definition from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: aimurg
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate Spark Job Definition from Azure Synapse to Fabric

To move Spark Job Definitions (SJD) from Azure Synapse to Fabric, you have two different options:

* Option 1: create SJD manually in Fabric.
* Option 2: you can use a script to export SJDs from Azure Synapse and import them in Fabric using the API.

For SJD considerations, refer to [differences between Azure Synapse Spark and Fabric](NEEDLINK).

## Option 1: Create SJD manually

To export a SJD from Azure Synapse:

1.	**Open Synapse Studio**: Sign-in into the Azure portal. Navigate to your Azure Synapse workspace and open the Synapse Studio.
1.	**Locate the Python/Scala/R Spark Job**: Find and identify the Python/Scala/R Spark job definition that you want to migrate.
1.	**Export the Job Definition Configuration**:
    * In Synapse Studio, open the Spark Job Definition.
    * Export or note down the configuration settings, including script file location, dependencies, parameters, and any other relevant details.

To create a new SJD based on the exported SJD information in Fabric:

1.	**Access Fabric workspace**: Sign-in into Fabric and access your workspace.
1.	**Create a new SJD in Fabric**:
    * In Fabric, go to **Data Engineering homepage**.
    * Select **Spark Job Definition.**
    * Configure the job using the information you exported from Synapse, including script location, dependencies, parameters, and cluster settings.
1.	**Adapt and Test**: Make any necessary adaptation to the script or configuration to suit the Fabric environment. Test the job in Fabric to ensure it runs correctly.

:::image type="content" source="media\migrate-synapse\migrate-sjd-create.png" alt-text="Screenshot showing SJD creation.":::

Learn more about how to [create an Apache Spark job definition](create-spark-job-definition.md) in Fabric.

Once the SJD is created, validate dependencies:
* Ensure using the same Spark version while creating the custom Spark pool in Fabric.
* Validate the existence of the main definition file. 
* Validate the existence of the referenced files and resources.
* Linked services, data source connections and mount points.

## Option 2: Use the Fabric API

Follow these key steps for migration:
* Pre-migration steps
* Step 1: Export SJD from Synapse to OneLake (json) 
* Step 2: Import SJD automatically into Fabric using the Fabric API

### Pre-migration steps
The pre-migration steps include actions you need to consider before starting SJD migration to Fabric.

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

### Step 1: Export SJD from Azure Synapse workspace 

The focus of Step 1 is on exporting SJD from Azure Synapse workspace to OneLake in json format. This process is as follows:

* **1.1) Import SJD migration notebook** to Fabric workspace. [This notebook](NEEDLINK) exports all SJDs from a given Azure Synapse workspace to an intermediate directory in OneLake. Synapse API is used to export SJD.
* **1.2) Configure the parameters** in the first command to export SJD to an intermediate storage (OneLake). This only exports the json metadata file.

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
prefix = "<>" # this prefix is used during import {prefix}{sjd_name}

output_folder = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}/Files/{export_folder_name}"
```

* **1.3) Run the first two cells** of the `nt-sjd-export-import-json.ipynb` to export SJD metadata to OneLake. Once cells are completed, this folder structure under the intermediate output directory is created.

:::image type="content" source="media\migrate-synapse\migrate-sjd-export-api.png" alt-text="Screenshot showing SJD export in OneLake.":::

### Step 2: Import SJD into Fabric

Step 2 is when SJDs are imported from intermediate storage into the Fabric workspace. This process is as follows:

* **2.1) Validate the configurations** in the 1.2 to ensure the right workspace and prefix are indicated to import the SJDs.
* **2.2) Run the third cell** of the `nt-sjd-export-import-json.ipynb` to import all SJDs from intermediate location.

> [!NOTE]
> The export option outputs a json metadata file. Ensure that SJD executable files, reference files, and arguments are accessible from Fabric.

## Next steps

- [Migrate Spark pools](migrate-synapse-spark-pools.md)
- [Migrate data and pipelines](NEEDLINK)
- [Migrate notebooks](migrate-synapse-notebooks.md)