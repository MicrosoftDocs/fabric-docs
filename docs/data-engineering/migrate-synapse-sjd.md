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

# Migrate Spark Job Definition

To move Spark Job Definitions (SJD) from Azure Synapse to Fabric, you have two different options:

* Option 1: create SJD manually in Fabric
* Option 2: you can use a script to export SJD from Azure Synapse and import them in Fabric using the API

For SJD considerations, please refer to [differences between Azure Synapse Spark and Fabric](NEEDLINK).

## Option 1: Create SJD manually

To export a SJD from Azure Synapse:

1.	**Access Azure Synapse Studio**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and open Azure Synapse Studio.
1.	**Locate the Python/Scala/R Spark Job**: Find and identify the Python/Scala/R Spark job definition that you want to migrate. These should be listed in your Spark job definitions in Synapse.
1.	**Export the Job Definition Configuration**:
    * In Synapse Studio, open the Spark job definition.
    * Export or note down the configuration settings, including script file location, dependencies, parameters, and any other relevant details.

To create a new SJD based on the exported SJD information:
1.	**Access Fabric Workspace**: Log in to Fabric and access your workspace.
1.	**Create a New Job in Fabric**:
    * In Fabric, go to Data Engineering homepage.
    * Click "Spark Job Definition."
    * Configure the job using the information you exported from Synapse, including script location, dependencies, parameters, and cluster settings.
1.	**Adapt and Test**: Make any necessary adaptations to the script or configuration to suit the Fabric environment. Test the job in Fabric to ensure it runs correctly.

:::image type="content" source="media\migrate-synapse\migrate-sjd-create.png" alt-text="Screenshot showing SJD creation.":::

Learn more about how to [create an Apache Spark job definition](create-spark-job-definition.md) in Fabric.

Once the SJD is created, validate dependencies:
* Spark version – ensure using the same Spark version while creating the custom Spark pool in Fabric.
* Validate the existence of the main definition file. 
* Validate the existence of the referenced files and resources.
* Linked services, data source connections and mount points.

## Option 2: Use the Fabric API

Follow these two key steps for migration:
* Pre-migration steps
* Step 1: Export SJD from Synapse to OneLake (json) 
* Step 2: Import SJD automatically into Fabric using the Fabric API

### Pre-migration steps
The pre-migration steps include actions you need to consider prior to notebook migration to Fabric. These involves:

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

### Step 1: Export SJD from Azure Synapse workspace 

The focus of Step 1 is on exporting the SJD from Azure Synapse workspace to OneLake in json format. This process is as follows:

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
prefix = "<>" # this prefix is used during import {prefix}{notebook_name}

output_folder = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}/Files/{export_folder_name}"
```

* **1.3) Run the first two cells** to export SJD to OneLake. Once cells are completed, you will be able to see this folder structure under the intermediate output directory.

:::image type="content" source="media\migrate-synapse\migrate-sjd-export-api.png" alt-text="Screenshot showing SJD export in OneLake.":::

### Step 2: Import SJD into Fabric

Step 2 is when SJD are imported from intermediate storage into the Fabric workspace. This process is as follows:

* **2.1) Validate the configurations** in the 1.2) to ensure the right workspace and prefix are indicated to import the SJDs.
* **2.2) Run the third cell** to import all notebooks from intermediate location.

> [!NOTE]
> The export option outputs a json metadata file. Ensure that SJD executable files, reference files, and arguments are accessible in Fabric.

## Next steps

- [Migrate Spark pools](migrate-synapse-spark-pools.md)
- [Migrate data and pipelines](NEEDLINK)
- [Migrate notebooks](migrate-synapse-notebooks.md)