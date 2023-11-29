---
title: Migrate Spark job definition
description: Learn about how to migrate Spark job definition from Azure Synapse Spark to Fabric.
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

# Migrate Spark job definition from Azure Synapse to Fabric

To move Spark job definitions (SJD) from Azure Synapse to Fabric, you have two different options:

* Option 1: create Spark job definition manually in Fabric.
* Option 2: you can use a script to export Spark job definitions from Azure Synapse and import them in Fabric using the API.

For Spark job definition considerations, refer to [differences between Azure Synapse Spark and Fabric](comparison-between-fabric-and-azure-synapse-spark.md).

## Prerequisites

If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.

## Option 1: Create Spark job definition manually

To export a Spark job definition from Azure Synapse:

1.	**Open Synapse Studio**: Sign-in into [Azure](https://portal.azure.com). Navigate to your Azure Synapse workspace and open the Synapse Studio.
1.	**Locate the Python/Scala/R Spark job**: Find and identify the Python/Scala/R Spark job definition that you want to migrate.
1.	**Export the job definition configuration**:
    * In Synapse Studio, open the Spark Job Definition.
    * Export or note down the configuration settings, including script file location, dependencies, parameters, and any other relevant details.

To create a new Spark job definition (SJD) based on the exported SJD information in Fabric:

1.	**Access Fabric workspace**: Sign-in into [Fabric](https://app.fabric.microsoft.com) and access your workspace.
1.	**Create a new Spark job definition in Fabric**:
    * In Fabric, go to **Data Engineering homepage**.
    * Select **Spark Job Definition.**
    * Configure the job using the information you exported from Synapse, including script location, dependencies, parameters, and cluster settings.
1.	**Adapt and test**: Make any necessary adaptation to the script or configuration to suit the Fabric environment. Test the job in Fabric to ensure it runs correctly.

:::image type="content" source="media\migrate-synapse\migrate-sjd-create.png" alt-text="Screenshot showing Spark job definition creation.":::

Once the Spark job definition is created, validate dependencies:
* Ensure using the same Spark version.
* Validate the existence of the main definition file. 
* Validate the existence of the referenced files, dependencies, and resources.
* Linked services, data source connections and mount points.

Learn more about how to [create an Apache Spark job definition](create-spark-job-definition.md) in Fabric.

## Option 2: Use the Fabric API

Follow these key steps for migration:
* Prerequisites.
* Step 1: Export Spark job definition from Azure Synapse to OneLake (.json).
* Step 2: Import Spark job definition automatically into Fabric using the Fabric API.

### Prerequisites
The prerequisites include actions you need to consider before starting Spark job definition migration to Fabric.

* A Fabric workspace.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

### Step 1: Export Spark job definition from Azure Synapse workspace 

The focus of Step 1 is on exporting Spark job definition from Azure Synapse workspace to OneLake in json format. This process is as follows:

* **1.1) Import SJD migration notebook** to [Fabric](https://app.fabric.microsoft.com) workspace. [This notebook](https://github.com/microsoft/fabric-migration/tree/main/data-engineering/spark-sjd) exports all Spark job definitions from a given Azure Synapse workspace to an intermediate directory in OneLake. Synapse API is used to export SJD.
* **1.2) Configure the parameters** in the first command to export Spark job definition to an intermediate storage (OneLake). This only exports the json metadata file. The following snippet is used to configure the source and destination parameters. Ensure to replace them with your own values.

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
prefix = "" # this prefix is used during import {prefix}{sjd_name}

output_folder = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}/Files/{export_folder_name}"
```

* **1.3) Run the first two cells** of the export/import notebook to export Spark job definition metadata to OneLake. Once cells are completed, this folder structure under the intermediate output directory is created.

:::image type="content" source="media\migrate-synapse\migrate-sjd-export-api.png" alt-text="Screenshot showing Spark job definition export in OneLake.":::

### Step 2: Import Spark job definition into Fabric

Step 2 is when Spark job definitions are imported from intermediate storage into the Fabric workspace. This process is as follows:

* **2.1) Validate the configurations** in the 1.2 to ensure the right workspace and prefix are indicated to import the Spark job definitions.
* **2.2) Run the third cell** of the export/import notebook to import all Spark job definitions from intermediate location.

> [!NOTE]
> The export option outputs a json metadata file. Ensure that Spark job definition executable files, reference files, and arguments are accessible from Fabric.

## Related content

- [Migrate notebooks](migrate-synapse-notebooks.md)
- [Migrate data and pipelines](migrate-synapse-data-pipelines.md)
- [Migrate Hive Metastore metadata](migrate-synapse-hms-metadata.md)
