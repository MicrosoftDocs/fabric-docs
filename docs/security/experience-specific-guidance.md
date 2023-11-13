---
title: Microsoft Fabric disaster recovery experience specific guidance
description: See experience-specific guidance for recovering from a regional disaster.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom: build-2023
ms.date: 11/12/2023
---

# Experience-specific disaster recovery guidance

This document describes a disaster recovery plan for Fabric that is designed to help organizations keep their data safe and accessible if an unplanned regional disaster occurs. It covers strategy, features, and recovery steps. 

## How can I prepare for disaster?

While Fabric provides disaster recovery features to support data resilience, customers **must** follow certain manual steps to maximize data protection during disruptions. This section details the actions and methods customers should take to prepares for potential disruptions.

### Phase 1: Prepare

* **Activate the Disaster Recovery capacity settings**: Regularly review and set the **[Disaster Recovery](./disaster-recovery-guide.md#disaster-recovery-capacity-setting)** to make sure they meet your protection and performance needs.

Create data backups: Copy critical data stored outside of OneLake to another region at a frequency based on your disaster recovery plan.

### Phase 2: Disaster failover

When a major disaster renders the primary region unrecoverable, Microsoft Fabric initiate a regional failover. Access to the Fabric portal will be unavailable until the failover is complete. A notification will be posted on the [Microsoft Fabric support page](https://support.fabric.microsoft.com/support/).

The time it takes for failover to complete after being initiated can vary, although it typically takes less than one hour. Once failover is complete, the Fabric platform and Power BI will be in read-only mode. Other Fabric items will remain unavailable to customers. Here's what you can expect:

* **Fabric portal**: You can access the portal, and read operations such as browsing existing workspaces and items will continue to work. All write operations, such as creating or modifying a workspace, will be paused.

* **Power BI**: You can perform read operations, such as displaying dashboards and reports. Refreshes, report publish operations, dashboard and report modifications, and other operations that require changes to metadata are not supported.

* **Lakehouse/Warehouse**: You can't open these items, but files can be accessed via OneLake APIs or tools.

* **Spark Job Definition**: You can't open Spark Job Definition items, but code files can be accessed via OneLake APIs or tools. Any metadata or configuration will be saved after failover.  

* **Notebook**: You can't open Notebooks, and code content **won't** be saved after the disaster.

* **ML Model/Experiment**: You can't open the ML model or Experiment. Code content and metadata such as run metrics and configurations will not be saved after the disaster.

* **Dataflow Gen2/Pipeline/Eventstream**: You can't open these items, but you can use supported disaster recovery destinations (Lakehouse or Warehouse) to protect data.

* **Kusto**: You won’t be able to access Kusto after failover. Additional prerequisite steps are required to protect Kusto data.

Although the Fabric platform and Power BI will be in read-only mode and other Fabric items will be unavailable, customers can access their data stored in OneLake using APIs or third-party tools, and they retain the ability to perform read-write operations on that data. This ensures that critical data remains accessible and modifiable, and mitigates potential disruption of your business operations.

OneLake data remains accessible through multiple channels:

* OneLake ADLS Gen2 API: See [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)

    Examples of tools that can connect to OneLake data:

    * Azure Storage Explorer: See [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md)

    * OneLake File Explorer: See [Use OneLake file explorer to access Fabric data](../onelake/onelake-file-explorer.md)

### Phase 3: Recovery plan

While Fabric ensures that data remains accessible after a disaster, customers can also act to fully restore their services to the state before the incident. This section provides a step-by-step guide to help customers through the recovery process, ensuring a swift return to regular operations.

#### Common steps

1. Create a new Fabric capacity in your primary region's paired region after a disaster. Buy a Microsoft Fabric subscription.

1. Create workspaces in the newly created capacity. If necessary, use the same names as the old workspaces.

1. Create items with the same names as the ones you want to recover. This is important if your code or business processes rely on a particular naming convention.

1. Restore the items. For each item, follow the relevant guidance section below to restore the item.

##### Sample Scenario

Let's say you have a capacity C1 in region A that has a workspace W1. If you've turned on disaster recovery for capacity C1, OneLake data will be replicated to a backup in region B. If region A faces disruptions, C1 shifts to its backup in region B. Here's a recovery guide:

1. Create a new Fabric capacity C2 in a new region.

1. Create a new W2 workspace in C2, including its corresponding items with same names as in C1.W1.  

1. Copy data from the disrupted C1.W1 to C2.W2.

1. Follow the dedicated instructions for each component to restore items to their full function.

The following image illustrates this scenario. The box on the left shows the disrupted region. The box in the middle represents the continued availability of the data after failover, and the box on the right shows the fully covered situation after the customer acts to restore their services to full function.

:::image type="content" source="./media/experience-specific-guidance/disaster-recovery-scenario.png" alt-text="Diagram showing a scenario for disaster, failover, and full recovery.":::

## Dedicated Fabric experience plans

This section provides dedicated step-by-step guides for each Fabric experience to help customers through the recovery process.
 
## Data Engineering

This guide walks you through the recovery procedures for the Data Engineering experience. It covers Lakehouse, Notebook, and Spark Job Definition.

### Lakehouse 

Lakehouse items from the original region remain unavailable to customers. To recover the functionality of an item, customers can re-create it in a new Lakehouse item in workspace C2.W2. We recommend two main approaches for recovering Lakehouse:

#### Approach 1: Using custom script to copy Lakehouse delta tables and files

Customers can recreate Lakehouses by using a custom Scala script.

1. Create the Lakehouse item (e.g., LH1) in the newly created workspace C2.W2.

1. Create a new Notebook in the workspace C2.W2.

1. To recover the tables and files from the original Lakehouse, you need to use the ABFS path to access the data (see [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)). You can use the code example (see [Introduction to Microsoft Spark Utilities](/azure/synapse-analytics/spark/microsoft-spark-utilities?pivots=programming-language-python/)) in the Notebook to get the ABFS paths of files and tables from the original Lakehouse.

    ```
    mssparkutils.fs.ls('abfs[s]://<workspace>@onelake.dfs.fabric.microsoft.com/<item>.<itemtype>/<Tables>/<fileName>')
    ```

1. Use the following code example to copy tables and files to the newly created Lakehouse.

    1. For delta tables, you need to copy table one at a time to recover in the new Lakehouse. In the case of Lakehouse files, you can copy the complete file structure with all the underlying folders with a single execution.
    1. Reach out to the support team for the timestamp of failover required in the script.

    ```
    %%spark
    val source="abfs path to original Lakehouse file or table directory"
    val destination="abfs path to new Lakehouse file or table directory"
    val timestamp= //timestamp provided by Support
    
    mssparkutils.fs.cp(source, destination, true)
    
    val filesToDelete = mssparkutils.fs.ls(s"$source/_delta_log")
        .filter{sf => sf.isFile && sf.modifyTime > timestamp}
     
    for(fileToDelte <- filesToDelete) {
        val destFileToDelete = s"$destination/_delta_log/${fileToDelte.name}"
        println(s"Deleting file $destFileToDelete")
        mssparkutils.fs.rm(destFileToDelete, false)
    }
     
    mssparkutils.fs.write(s"$destination/_delta_log/_last_checkpoint", "", true)
    ```

1. Once you run the script, the table will appear in the new Lakehouse item.

#### Approach 2: Use Azure Storage Explorer to copy files and tables

To recover only specific Lakehouse files or tables from the original lakehouse, use Azure Storage Explorer to copy the specific files and tables from the Lakehouse item you want to recover.  Refer to [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md) for detailed steps. For large data sizes, use [Approach 1].(#approach-1-using-custom-script-to-copy-lakehouse-delta-tables-and-files).

> [!NOTE]
> The two approaches described above recover both the metadata and data for Delta-formatted tables, because the metadata is co-located and stored with the data in OneLake. For non-Delta formatted tables (e.g. CSV, Parquet, etc.) that are created using Spark Data Definition Language (DDL) scripts/commands, the user is responsible for maintaining and re-running the Spark DDL scripts/commands to recover non-Delta table metadata.

### Notebook 

Notebook items from the primary region remain unavailable to customers and the code in the notebook will not be replicated to the secondary region. To recover the Notebook code in the new region, there are two main approaches to recovering Notebook code content.

#### Approach 1: User-managed redundancy with Git integration (in public preview)

The best way to make this easy and quick is to integrate your existing live Fabric workspace with your ADO Git repo, then synchronize your notebook with your ADO repo. This way, you can failover to another workspace in another region and then use the repo to rebuild the notebook in the new workspace region by using the "Git integration" feature.  

1. Setup Git integration and click **Connect and sync** with ADO repo.

    :::image type="content" source="./media/experience-specific-guidance/notebook-connect-sync-ado-repo.png" alt-text="Screenshot showing how to connect and sync notebook with ADO repo.":::

    The following image shows the synced notebook.

    :::image type="content" source="./media/experience-specific-guidance/notebook-synced-notebook.png" alt-text="Screenshot showing notebook synced with ADO repo.":::

1. Recover the notebook by ADO repo with simple clicks.

    1. In the newly created workspace, connect to your Azure ADO repo again.

        :::image type="content" source="./media/experience-specific-guidance/notebook-reconnect-to-ado-repo.png" alt-text="Screenshot showing notebook reconnected to ADO repo.":::

    1. Click the Source control button. Then click the relevant branch of the repo. Then click update all. The original notebook will appear.
    
        :::image type="content" source="./media/experience-specific-guidance/notebook-source-control-update-all.png" alt-text="Screenshot showing how to update all notebooks on a branch.":::

        :::image type="content" source="./media/experience-specific-guidance/notebook-original-notebook-appears.png" alt-text="Screenshot showing original note recreated.":::

    1. If the original notebook has a default lakehouse, users can refer to the [Lakehouse section](#lakehouse) to recover the lakehouse and then connect the newly recovered lakehouse to the newly recovered notebook.
    
       :::image type="content" source="./media/experience-specific-guidance/notebook-connect-recovered lakehouse-recovered-notebook.png" alt-text="Screenshot showing how to connect a recovered lakehouse to a recovered notebook.":::

    1. The Git integration does not support syncing files, folders, or Notebook snapshots in Resources explorer.

        1. If the original notebook has files in Resources explorer.
    
            1. Be sure to save files or folders to a local disk or to some other place.
            1. Re-upload the file from your local disk or cloud drives to the recovered notebook.
        
        1. If the original notebook has Notebook snapshots. also save the notebook snapshots to your own version control system or local disk.
        
            :::image type="content" source="./media/experience-specific-guidance/notebook-save-snapshots1.png" alt-text="Screenshot showing how to run notebook to save snapshots.":::
            
            :::image type="content" source="./media/experience-specific-guidance/notebook-save-snapshots2.png" alt-text="Screenshot showing how to save notebook snapshots.":::

For more information about Git integration, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

#### Approach 2: Manual approach to backup code content

If you don't take the Git integration approach, you can save the latest version of your code, files in Resources explorer and notebook snapshots in a version control system (e.g., Git) or in an external repository, and manually recover the Notebook content after a disaster:

1. Use the "Import Notebook" feature to import the notebook code you want to recover.

    :::image type="content" source="./media/experience-specific-guidance/notebook-import-notebook-code.png" alt-text="Screenshot showing how to import notebook code.":::

1. After import, go to your desired workspace (e.g., "C2.W2") to access it.

1. If the original notebook has a default lakehouse, refer to the [Lakehouse section](#lakehouse). Then connect the newly recovered lakehouse (that has the same content as the original default lakehouse) to the newly recovered notebook.

1. If the original notebook has files or folders in Resources explorer, re-upload the files or folders saved in the user's version control system.

### Spark Job Definition

Spark Job Definition (SJD) items from the primary region remain unavailable to customers, and the main definition file and Reference file in the notebook will be replicated to the secondary region via OneLake. If you want to recover the SJD in the new region, there are two main approaches you call follow. Note that historical runs of SJD will not be recovered.

#### Manual approach to backup code content

You can recover the SJD items by copying the code from the original region by using Azure Storage Explorer and manually reconnecting Lakehouse references after the disaster.

1. Create a new SJD item (e.g., SJD1) in the new workspace C2.W2, with the same settings and configurations as the original SJD item (e.g. language, environment, etc.).

1. Use Azure Storage Explorer to copy Libs, Mains and Snapshots from the original SJD item to the new SJD item.

    :::image type="content" source="./media/experience-specific-guidance/sjd-copy-from-original-sdj-to-new-sjd.png" alt-text="Screenshot showing how to copy from the original spark job defintion to the new spark job defintion.":::

1. The code content will appear in the newly created SJD. You'll need to manually add  the newly recovered Lakehouse reference to the job (Refer to the [Lakehouse recovery steps](#lakehouse)). Users will need to re-enter the original command line arguments manually.

    :::image type="content" source="./media/experience-specific-guidance/sjd-command-line-arguments.png" alt-text="Screenshot showing command line arguments to recover spark job definition.":::

Now you can run or schedule your newly recovered SJD.

For details about Azure Storage Explorer, see [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md).

### Data Science 

#### ML Model and Experiment

Data Science items from the primary region remain unavailable to customers, and the content and metadata in ML models/experiments will not be replicated to the secondary region. To fully recover them in the new region, save the code content in a version control system (e.g., Git) or in an external repository, and manually rerun the code content after the disaster.

1. Recover the ML model or experiment in a notebook. Refer to the [Notebook recovery steps](#notebook).

1. Configuration, historically run metrics, and metadata will not be replicated to the paired region. You'll have to re-run each version of your data science code to fully recover ML models and experiments after the disaster.

### Data Warehouse

#### Warehouse

Warehouse items from the original region remain unavailable to customers. To recover warehouses, use the following two steps.

1. Create a new interim lakehouse in workspace C2.W2 to copy data to from the original warehouse.

1. Populate the warehouse's delta tables by leveraging Warehouse Object Explorer and 3rd party naming conventions in the T-SQL area.

> [!NOTE]
> It's recommended that you keep your Warehouse code (schema, table, view, stored procedure, function definitions, and security codes) versioned and saved in a safe location such as Git or an external repository according to your development practices.

##### Data ingestion via Lakehouse and T-SQL code

In newly created Workspace C2.W2:

1. Create an interim lakehouse "LH2" in C2.W2.

1. Recover the delta tables in the interim lakehouse from the original warehouse by following the [Lakehouse recovery steps](#lakehouse).

1. Create a new Warehouse item "WH2" in C2.W2.

1. Connect the interim Lakehouse item in your Warehouse explorer.

    :::image type="content" source="./media/experience-specific-guidance/connect-temp-lakehouse-to-warehouse.png" alt-text="Screenshot of Warehouse Explorer during warehouse recovery.":::

1. Depending on how you are going to deploy table definitions prior to data import, the actual T-SQL used for imports can vary. You can use INSERT INTO, SELECT INTO or CREATE TABLE AS SELECT approach to recover Warehouse tables from Lakehouse. Further in the example, we would be using INSERT INTO flavor.

    ```
    USE WH1
    
    INSERT INTO [dbo].[aggregate_sale_by_date_city]([Date],[City],[StateProvince],[SalesTerritory],[SumOfTotalExcludingTax],[SumOfTaxAmount],[SumOfTotalIncludingTax], [SumOfProfit])
    
    SELECT [Date],[City],[StateProvince],[SalesTerritory],[SumOfTotalExcludingTax],[SumOfTaxAmount],[SumOfTotalIncludingTax], [SumOfProfit]
    FROM  [LH11].[dbo].[aggregate_sale_by_date_city] 
    GO
    ```

1. Lastly, change the connection string in applications using your Fabric Warehouse.

> [!NOTE]
> For customers who need cross-regional disaster recovery and fully automated business continuity, we recommend keeping two Fabric Warehouse setups in separate Fabric regions and maintaining code and data parity by doing regular deployments and data ingestion to both sites.

### Data Factory

Data Factory items from the primary region remain unavailable to customers and the settings and configuration in data pipelines or dataflow gen2s will not be replicated to the secondary region. To achieve disaster recovery in the event of a whole region failure, you'll need to recreate your Data Integration items in another workspace from a different region. The following sections outline the details.

#### Dataflows Gen2

If you want to recover a Dataflow Gen2 item in the new region, you need to export a PQT file to a version control system such as Git, or save it in an external repository, and then manually recover the Dataflow Gen2 content after the disaster.

1. From your Dataflow Gen2 item, in the Home tab of the Power Query editor, select **Export template**.

    :::image type="content" source="./media/experience-specific-guidance/dataflow-gen2-export-template.png" alt-text="Screenshot showing the Power Query editor, with the Export template option emphasized.":::

1. In the Export template dialog, enter a name (mandatory) and description (optional) for this template. When done, select **OK**.

    :::image type="content" source="./media/experience-specific-guidance/dataflow-gen2-export-template2.png" alt-text="Screenshot showing how to export a template.":::

1. After the disaster, create a new Dataflow Gen2 item in the new workspace "C2.W2".

1. From the current view pane of the Power Query editor, select **Import from a Power Query template**.

    :::image type="content" source="./media/experience-specific-guidance/dataflow-gen2-import-from-power-query-template.png" alt-text="Screenshot showing the current view with Import from a Power Query template emphasized.":::

1. In the Open dialog, browse to your default downloads folder and select the *.pqt* file you saved in the previous steps. Then select **Open**.

1. The template is then imported into your new Dataflow Gen2 item.

#### Data Pipelines

Customers can't access data pipelines in the event of regional disaster, and the configurations are not replicated to the paired region. We recommend building your critical data pipelines in multiple workspaces across different regions. 

### Real-time analytics

#### KQL Database  

KQL Database users must undertake proactive measures to protect against a regional disaster. The following approach ensures that, in the event of a regional disaster, your KQL Database data remains safe and accessible.

Use the following steps to guarantee an effective disaster recovery solution for KQL Database.

1. **Establish independent KQL databases**: Configure two or more independent KQL databases on dedicated Fabric capacities. These should be set up across two different Azure regions (preferably Azure-paired regions) to maximize resilience.

1. **Replicate management activities**: Any management action taken in one KQL Database cluster should be mirrored in the other. This ensures that both clusters remain in sync. Key activities to replicate include:

    * **Tables**: Make sure that the table structures and schema definitions are consistent across both clusters.

    * **Mapping**: Duplicate any required mappings. Make sure that data sources and destinations align correctly.

    * **Policies**: Make sure that both clusters have similar data retention, access, and other relevant policies.

1. **Manage Authentication and Authorization**: For each replica, set up the required permissions. Make sure that proper authorization levels are established, granting access to the required personnel while maintaining security standards.

1. **Parallel Data Ingestion**: As you import or ingest data into one KQL database, make sure that the same dataset is ingested into the other KQL database concurrently. This guarantees data uniformity and timely availability across both clusters.

#### Eventstream

An eventstream is a centralized place in the Fabric platform for capturing, transforming, and routing real-time events to various destinations (e.g., lakehouses, KQL databases) with a no-code experience. So long as the destinations are supported by disaster recovery, eventstreams will not lose data. Therefore, customers could use disaster recovery supported destinations to guarantee data availability.

Customers can also achieve geo-redundancy by deploying identical Eventstream workloads in multiple Azure regions as part of a multi-site active/active strategy. With a multi-site active/active approach, customers can access their workload in any of the deployed regions. This approach is the most complex and costly approach to disaster recovery, but it can reduce the recovery time to near zero in most situations. To be fully geo-redundant, customers can

1. Create replicas of their data sources in different regions.

1. Create Eventstream items in corresponding regions.

1. Connect these new items to the identical data sources.

1. Add identical destinations for each Eventstream item in different regions.

## Next steps

* [Resiliency in Azure](/azure/availability-zones/overview)
* [Microsoft Fabric disaster recovery guide](./disaster-recovery-guide.md)