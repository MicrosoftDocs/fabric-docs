---
title: Migrate items
description: Learn about how to migrate items from Azure Synapse Spark to Fabric.
ms.reviewer: snehagunda
ms.author: murggu
author: murggu
ms.topic: migration
ms.custom: ignite-2023
ms.date: 11/03/2023
---

# Migrate items

In Azure Synapse, users can create and utilize various Spark artifacts, including Spark pools, notebooks, configurations, libraries, and Spark Job Definitions (SJD). These items have corresponding counterparts in Fabric, allowing users to migrate one or multiple items from an existing Azure Synapse workspace to Fabric. 

This section outlines the available options for migrating Spark pools, configurations, libraries, notebooks, and SJDs to Fabric.

## Spark pools

While Azure Synapse provides various Spark pools, Fabric offers [Starter pools](configure-starter-pools.md) and [Custom pools](create-custom-spark-pools.md). If you're looking to migrate existing Spark pools from Azure Synapse to Fabric, the Starter pool can be a good choice if you have a single pool with no custom configurations or libraries, and if the [Medium node size](spark-compute.md) meets your requirements. However, if you seek more flexibility with your Spark pool configurations, it's advisable to opt for *Custom pools*. There are two options here: 

* Option 1: Move your Spark pool to a workspace default environment.
* Option 2: Move your Spark pool to a custom environment in Fabric. 

If you have more than one Spark pool and you plan to move those to the same Fabric workspace, the recommended approach is to use Option 2, creating multiple custom environments (one environment per Apache Spark pool).

### Option 1: From Spark Pool to Workspace Default Environment

You can create custom Spark pools from your Fabric workspace and use them as the default environment. The default environment is used by all notebooks and SJD in the same workspace. 

To move from an existing Spark pool in Synapse PaaS to a workspace default environment:

1. **Access Azure Synapse workspace**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and go to Analytics Pools.
1.	**Locate the Spark pool**: In Analytics Pools, locate the Spark pool you want to move to Fabric and check the pool properties. 
1.	**Get the properties**: Get the Spark pool properties such as Apache Spark version, node size family, node size or auto-scale. Please refer to [Spark pool considerations](TBC) to see any differences.
1.	**Create a custom Spark pool in Fabric**
    * Go to your Fabric workspace and click on “Workspace settings”
    * Go to “Data Engineering/Science” and click on “Spark settings”
    * Go to “Pool” tab and in “Default pool for workspace” section, first click on the dropdown menu and click on create “New pool”
    * [Create your custom pool](create-custom-spark-pools.md) with corresponding target values. Complete the name, node family, node size, autoscaling and dynamic executor allocation options
5.	**Select a runtime version**
    * Go to “Environment” tab, and select the required “Runtime Version”
    * Keep “Set default environment” disabled

:::image type="content" source="media\migrate-synapse-items\migrate-spark-pool-default-environment.png" alt-text="Screenshot showing default environment.":::

> [!NOTE]
> In this option, pool level libraries or configurations are not supported. Users can adjust compute configuration for individual items such as notebooks and Spark Job Definition, and add inline libraries though. If you need to add custom libraries and configurations to an environment, consider a [custom environment](TBC).

### Option 2: From Spark Pool to Custom Environment

With custom environments, you will be able to set up custom Spark properties and libraries. To create a custom environment:

1.	**Access Azure Synapse workspace**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and go to Analytics Pools.
1.	**Locate the Spark pool**: In Analytics Pools, locate the Spark pool you want to move to Fabric and check the pool properties. 
1.	**Get the properties**: Get the Spark pool properties such as Apache Spark version, node size family, node size or auto-scale. Please refer to [Spark pool considerations](TBC) to see any differences.
1.	**Create a custom Spark pool**
    * Go to your Fabric workspace and click on “Workspace settings”
    * Go to “Data Engineering/Science” and click on “Spark settings”
    * Go to “Pool” tab and in “Default pool for workspace” section click on create “New pool”
    * [Create your custom pool](create-custom-spark-pools.md) with corresponding target values. Complete the name, node family, node size, autoscaling and dynamic executor allocation options
1.	**[Create an Environment](TBC)** item if you don’t have one
1.	**Configure the Spark pool**
    * Within the Environment, go to “Spark Compute” > “Compute”
    * Select the newly created pool for the new environment
    * You can configure driver and executors cores and memory 
1.	Click on “Save” and “Publish” changes

:::image type="content" source="media\migrate-synapse-items\migrate-spark-pool-custom-environment.png" alt-text="Screenshot showing custom environment.":::

## Spark configurations

### Option 1: Adding Spark Configurations to Custom Environment

Within an environment, you can set Spark properties and those will be applied to the environment pool.

1.	**Open Synapse Studio**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and open the Synapse Studio
1.	**Locate Spark configurations**
    * Go “Manage” area and click on “Apache Spark pools”
    * Find the Apache Spark pool, click on “Apache Spark configuration” and locate the Spark configuration name for the pool
1.	**Get Spark configurations**: You can either obtain those by clicking “View configurations” or exporting the configuration file name from “Configurations + libraries” > “Apache Spark configurations”
1.	Once you have Spark configurations, **add custom Spark properties to your Environment** in Fabric
    * Within the Environment, go to “Spark Compute” > “Spark properties”
    * Add Spark configurations. You can either add each manually or import from .yml.
1.	Click on “Save” and “Publish” changes

:::image type="content" source="media\migrate-synapse-items\migrate-spark-configurations.png" alt-text="Screenshot showing Spark configurations.":::

## Spark libraries

### Option 1: Adding Spark Libraries to Custom Environment

You can move libraries to an environment as follows:

1.	**Open Synapse Studio**: Log in to the Azure portal, navigate to your Azure Synapse workspace, and open the Synapse Studio.
1.	**Locate Spark libraries**
    * Go “Manage” area and click on “Apache Spark pools”
    * Find the Apache Spark pool, click on “Packages” and locate the Spark libraries for the pool
1.	**Get Spark libraries**: Locate the requirements.txt, environment.yml or workspace packages installed in the pool. Get the list of installed libraries on the pool.
1.	Once you have Spark libraries, **add custom Spark libraries to the Environment**
    * Within the Environment, go to “Libraries” and add libraries
        * From “Public libraries” you can upload a .yml file. You can also install libraries using PyPI and Conda
        * From “Custom libraries”, you can install libraries by using .jar, .whl or .tar.gz files
1.	Click on “Save” and “Publish” changes

:::image type="content" source="media\migrate-synapse-items\migrate-spark-libraries.png" alt-text="Screenshot showing Spark libraries.":::

> [!NOTE]
> Note that library installation may take some time.

## Notebooks

Migrating a notebook from Azure Synapse to Fabric can be done in two different ways.

* Option 1: you can export a Notebook from Azure Synapse (.ipynb) and import it in Fabric (manually)
* Option 2: you can use a script to export notebooks from Azure Synapse and import them in Fabric using the API

### Option 1: Import/Export Notebook

To export a notebook from Azure Synapse:

1.	Access Azure Synapse Studio: Log in to the Azure portal, navigate to your Azure Synapse workspace, and open Azure Synapse Studio.
1.	Locate the Notebook: In Azure Synapse Studio, locate the notebook you want to export from the "Notebooks" section of your workspace.
1.	Export the Notebook:
    * Right-click on the notebook you wish to export.
    * Select "Export."
    * Choose a destination folder and provide a name for the exported notebook file. By default, the file will have a .ipynb extension, which is compatible with Fabric.
4.	Download the Exported Notebook: Once the export is complete, you should have the notebook file available for upload.

:::image type="content" source="media\migrate-synapse-items\migrate-notebooks-export.png" alt-text="Screenshot showing Synapse Notebook export.":::

To import the exported notebook in Fabric:

1.	**Access Fabric Workspace**: Log in to the Azure portal and access your Fabric workspace.
1.	**Navigate to Data Engineering homepage**: Once inside your Fabric workspace, go to Data Engineering or the Data Science homepage.
1.	**Import the Notebook**: 
    * Select “Import notebook”. You can import one or more existing notebooks from your local computer to a Microsoft Fabric workspace.
    * Browse for the .ipynb notebook file(s) that you downloaded from Azure Synapse.
    * Select the notebook file(s) and click "Upload."
1.	**Open and Use the Notebook**: Once the import is completed, you can now open and use the notebook in your Fabric workspace. Simply click on the notebook's name to open it.

Once the notebook is imported, validate notebook dependencies:
* Spark version – ensure using the same Spark version while creating the custom Spark pool in Fabric.
* Referenced notebooks - you can use msparkutils (e.g. notebook chaining) also in Fabric. However, if you import a notebook that references another one, you will need to import the latter as well. Fabric workspaces doesn't support folders for now, so any references to notebooks in other folders should be updated. You can use notebooks resources if needed.
* Referenced libraries and configurations – remember that if a notebook is using pool specific libraries and configurations, you will need to import those as well.
* Linked services, data source connections and mount points.

### Option 2: Use the Fabric API

Follow these two key steps for migration:
* Pre-migration steps
* Step 1: Export notebooks from Synapse to OneLake (ipynb) 
* Step 2: Import notebooks automatically into Fabric using the Fabric API

#### Pre-migration steps
The pre-migration steps include actions you need to consider prior to notebook migration to Fabric. These involves:

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

#### Step 1: Export notebooks from Azure Synapse workspace

The focus of Step 1 is on exporting the notebooks from Azure Synapse workspace to OneLake in ipynb format. This process is as follows:

* **1.1) Import migration notebook** to Fabric workspace. [This notebook](TBC) exports all notebooks from a given Azure Synapse workspace to an intermediate directory in OneLake. Synapse API is used to export notebooks.
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

* **1.3) Run the first two cells** to export notebooks to OneLake. Once cells are completed, you will be able to see this folder structure under the intermediate output directory.

:::image type="content" source="media\migrate-synapse-items\migrate-notebooks-export-api.png" alt-text="Screenshot showing Notebook export in OneLake.":::

#### Step 2: Import notebooks into Fabric

Step 2 is when notebooks are imported from intermediate storage into the Fabric workspace. This process is as follows:

•	**2.1) Validate the configurations** in step 1.2) to ensure the right workspace and prefix are indicated to import the notebooks.
•	**2.2) Run the third cell** to import all notebooks from intermediate location.

## Spark Job Definition

To move Spark Job Definitions (SJD) from Azure Synapse to Fabric, you have two different options:

* Option 1: create SJD manually in Fabric
* Option 2: you can use a script to export SJD from Azure Synapse and import them in Fabric using the API

### Option 1: Create SJD manually

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

:::image type="content" source="media\migrate-synapse-items\migrate-sjd-create.png" alt-text="Screenshot showing SJD creation.":::

Learn more about how to [create an Apache Spark job definition](create-spark-job-definition.md) in Fabric.

Once the SJD is created, validate dependencies:
* Spark version – ensure using the same Spark version while creating the custom Spark pool in Fabric.
* Validate the existence of the main definition file. 
* Validate the existence of the referenced files and resources.
* Linked services, data source connections and mount points.

### Option 2: Use the Fabric API

Follow these two key steps for migration:
* Pre-migration steps
* Step 1: Export SJD from Synapse to OneLake (json) 
* Step 2: Import SJD automatically into Fabric using the Fabric API

#### Pre-migration steps
The pre-migration steps include actions you need to consider prior to notebook migration to Fabric. These involves:

* If you don’t have one already, create a [Fabric workspace](../get-started/create-workspaces.md) in your tenant.
* If you don’t have one already, create a [Fabric lakehouse](tutorial-build-lakehouse.md) in your workspace. 

#### Step 1: Export SJD from Azure Synapse workspace 

The focus of Step 1 is on exporting the SJD from Azure Synapse workspace to OneLake in json format. This process is as follows:

* **1.1) Import SJD migration notebook** to Fabric workspace. [This notebook](TBC) exports all SJDs from a given Azure Synapse workspace to an intermediate directory in OneLake. Synapse API is used to export SJD.
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

:::image type="content" source="media\migrate-synapse-items\migrate-sjd-export-api.png" alt-text="Screenshot showing SJD export in OneLake.":::

#### Step 2: Import SJD into Fabric

Step 2 is when SJD are imported from intermediate storage into the Fabric workspace. This process is as follows:

* **2.1) Validate the configurations** in the 1.2) to ensure the right workspace and prefix are indicated to import the SJDs.
* **2.2) Run the third cell** to import all notebooks from intermediate location.

> [!NOTE]
> The export option outputs a json metadata file. Ensure that SJD executable files, reference files, and arguments are accessible in Fabric.
