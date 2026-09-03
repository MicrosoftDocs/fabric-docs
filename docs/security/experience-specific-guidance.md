---
title: Microsoft Fabric disaster recovery experience specific guidance
description: See experience-specific guidance for recovering from a regional disaster.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang, wiassaf
ms.topic: how-to
ms.date: 09/02/2026
ai-usage: ai-assisted
---

# Experience-specific disaster recovery guidance

This article provides experience-specific guidance for recovering your Fabric data in the event of a regional disaster. 

## Sample scenario

Many guidance sections in this article use the following sample scenario for purposes of explanation and illustration. Refer back to this scenario as necessary.

Let's say you have a capacity C1 in region A that has a workspace W1. If you've [turned on disaster recovery](./disaster-recovery-guide.md#disaster-recovery-capacity-setting) for capacity C1, OneLake data is replicated to a backup in region B. If region A faces disruptions, the Fabric service in C1 fails over to region B. 

> [!NOTE]
> This recovery guidance applies only when the primary region has an Azure‑paired secondary region and Fabric is supported in the paired region.

The following image illustrates this scenario. The box on the left shows the disrupted region. The box in the middle represents the continued availability of the data after failover, and the box on the right shows the fully covered situation after the customer acts to restore their services to full function.

:::image type="content" source="./media/experience-specific-guidance/disaster-recovery-scenario.png" alt-text="Diagram showing a scenario for disaster, failover, and full recovery.":::

Here's the general recovery plan:

1. Create a new Fabric capacity C2 in a new region.

1. Create a new W2 workspace in C2, including its corresponding items with same names as in C1.W1.  

1. Copy data from the disrupted C1.W1 to C2.W2.

1. Follow the dedicated instructions for each component to restore items to their full function.

This recovery plan assumes that the tenant home region remains operational. If the tenant home region experiences an outage, the steps outlined in this article are contingent on its recovery, which must be first initiated and completed by Microsoft.

## Experience-specific recovery plans

The following sections provide step-by-step guides for each Fabric experience to help you through the recovery process.
 
## Data Engineering

This guide walks you through the recovery procedures for the Data Engineering experience. It covers lakehouses, notebooks, Spark job definitions, user data functions, and GraphQL APIs.

### Lakehouse

Lakehouses from the original region remain unavailable to customers. To recover a lakehouse, customers can re-create it in workspace C2.W2. We recommend two approaches for recovering lakehouses:

#### Approach 1: Using custom script to copy Lakehouse Delta tables and files

Customers can recreate lakehouses by using a custom Scala script.

1. Create the lakehouse (for example, LH1) in the newly created workspace C2.W2.

1. Create a new notebook in the workspace C2.W2.

1. To recover the tables and files from the original lakehouse, refer to the data with OneLake paths such as abfss (see [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)). You can use the following code example (see [Introduction to Microsoft Spark Utilities](/azure/synapse-analytics/spark/microsoft-spark-utilities?pivots=programming-language-python/)) in the notebook to get the ABFS paths of files and tables from the original lakehouse. (Replace `C1.W1` with the actual workspace name)

    ```python
    notebookutils.fs.ls('abfs[s]://<C1.W1>@onelake.dfs.fabric.microsoft.com/<item>.<itemtype>/<Tables>/<fileName>')
    ```

1. Use the following code example to copy tables and files to the newly created lakehouse.

    1. For Delta tables, you need to copy table one at a time to recover in the new lakehouse. In the case of Lakehouse files, you can copy the complete file structure with all the underlying folders with a single execution.

    1. Reach out to the support team for the timestamp of failover required in the script.

    ```python
    %%spark
    val source="abfs path to original Lakehouse file or table directory"
    val destination="abfs path to new Lakehouse file or table directory"
    val timestamp= //timestamp provided by Support
    
    notebookutils.fs.cp(source, destination, true)
    
    val filesToDelete = notebookutils.fs.ls(s"$source/_delta_log")
        .filter{sf => sf.isFile && sf.modifyTime > timestamp}
     
    for(fileToDelete <- filesToDelete) {
        val destFileToDelete = s"$destination/_delta_log/${fileToDelete.name}"
        println(s"Deleting file $destFileToDelete")
        notebookutils.fs.rm(destFileToDelete, false)
    }
     
    notebookutils.fs.write(s"$destination/_delta_log/_last_checkpoint", "", true)
    ```

1. Once you run the script, the tables appear in the new lakehouse.

#### Approach 2: Use Azure Storage Explorer to copy files and tables

To recover only specific Lakehouse files or tables from the original lakehouse, use Azure Storage Explorer. Refer to [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md) for detailed steps. For large data sizes, use [Approach 1](#approach-1-using-custom-script-to-copy-lakehouse-delta-tables-and-files).

> [!NOTE]
> The two approaches described here recover both the metadata and data for Delta-formatted tables, because the metadata is co-located and stored with the data in OneLake. For non-Delta formatted tables (for example, CSV or Parquet) that you create by using Spark Data Definition Language (DDL) scripts or commands, you need to maintain and re-run the Spark DDL scripts or commands to recover them.

### Recovering Fabric materialized lake views

After failover, you can't access materialized lake views from the original region. The failover process doesn't replicate refresh schedules or execution history to the secondary region. To recover these items, complete the following steps after you recover your Lakehouse data:

-  Recover the Lakehouse tables by using **Approach 1** or **Approach 2** described earlier in this article. **Copy only the source tables.**
-  Recover the notebooks that contain your MLV definitions. For recovery steps, see the [Notebook](#notebook) section.
-  Run the recovered notebooks to recreate the MLVs in the new Lakehouse. For information about creating MLVs, see [Create a Materialized Lake View](../data-engineering/materialized-lake-views/create-materialized-lake-view.md). If you copied MLVs in the earlier step, run **CREATE OR REPLACE** when you recreate them.
-  Manually recreate the MLV refresh schedules in the new workspace. You can't recover schedule history or execution metrics.
-  If your MLVs feed semantic models or reports, verify and update the Lakehouse ID and dataset ID references as needed. Reconnect reports to the updated semantic model and validate data freshness.

> [!TIP]
> To minimize code changes when running notebooks after failover, use the same workspace and Lakehouse names in the new region. This guidance is especially important when using the Workspace or Lakehouse name in the naming conventions.
>  The refresh schedules, execution history, and operational metrics start fresh in the recovered region. Plan for a baseline period when establishing new monitoring thresholds.

### Notebook

Notebooks from the primary region remain unavailable to customers, and the code in notebooks doesn't replicate to the secondary region. To recover notebook code in the new region, use one of the following approaches.

#### Approach 1: User-managed redundancy with Git integration (in public preview)

Use Fabric Git integration to synchronize your notebook with your Azure DevOps (ADO) repo. After the service fails over to another region, use the repo to rebuild the notebook in the new workspace you created.  

1. Configure Git Integration for your workspace and select **Connect and sync** with ADO repo.

    :::image type="content" source="./media/experience-specific-guidance/notebook-connect-sync-ado-repo.png" alt-text="Screenshot showing how to connect and sync notebook with ADO repo.":::

    The following image shows the synced notebook.

    :::image type="content" source="./media/experience-specific-guidance/notebook-synced-notebook.png" alt-text="Screenshot showing notebook synced with ADO repo.":::

1. Recover the notebook from the ADO repo.

    1. In the newly created workspace, connect to your Azure ADO repo again.

        :::image type="content" source="./media/experience-specific-guidance/notebook-reconnect-to-ado-repo.png" alt-text="Screenshot showing notebook reconnected to ADO repo.":::

    1. Select the **Source control** button. Then select the relevant branch of the repo. Then select **Update all**. The original notebook appears.

        :::image type="content" source="./media/experience-specific-guidance/notebook-source-control-update-all.png" alt-text="Screenshot showing how to update all notebooks on a branch.":::

        :::image type="content" source="./media/experience-specific-guidance/notebook-original-notebook-appears.png" alt-text="Screenshot showing original note recreated.":::

    1. If the original notebook has a default lakehouse, refer to the [Lakehouse section](#lakehouse) to recover the lakehouse and then connect the newly recovered lakehouse to the newly recovered notebook.

       :::image type="content" source="./media/experience-specific-guidance/notebook-connect-recovered lakehouse-recovered-notebook.png" alt-text="Screenshot showing how to connect a recovered lakehouse to a recovered notebook.":::

    1. The Git integration doesn't support syncing files, folders, or notebook snapshots in the notebook resource explorer.

        1. If the original notebook has files in the notebook resource explorer:

            1. Save files or folders to a local disk or to another location.

            1. Re-upload the file from your local disk or cloud drives to the recovered notebook.

        1. If the original notebook has a notebook snapshot, also save the notebook snapshot to your own version control system or local disk.
        
            :::image type="content" source="./media/experience-specific-guidance/notebook-save-snapshots1.png" alt-text="Screenshot showing how to run notebook to save snapshots.":::

            :::image type="content" source="./media/experience-specific-guidance/notebook-save-snapshots2.png" alt-text="Screenshot showing how to save notebook snapshots.":::

For more information about Git integration, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

#### Approach 2: Manual approach to backing up code content

If you don't take the Git integration approach, save the latest version of your code, files in the resource explorer, and notebook snapshot in a version control system such as Git. Manually recover the notebook content after a disaster:

1. Use the **Import notebook** feature to import the notebook code you want to recover.

    :::image type="content" source="./media/experience-specific-guidance/notebook-import-notebook-code.png" alt-text="Screenshot showing how to import notebook code.":::

1. After import, go to your desired workspace (for example, "C2.W2") to access it.

1. If the original notebook has a default lakehouse, refer to the [Lakehouse section](#lakehouse). Then connect the newly recovered lakehouse (that has the same content as the original default lakehouse) to the newly recovered notebook.

1. If the original notebook has files or folders in the resource explorer, re-upload the files or folders saved in the user's version control system.

### Spark job definition

Spark job definitions (SJD) from the primary region remain unavailable, and OneLake replicates the main definition file and reference file in the notebook to the secondary region. If you want to recover the SJD in the new region, follow the manual steps described in this section. Historical runs of the SJD aren't recovered.

You can recover the SJD items by copying the code from the original region by using Azure Storage Explorer and manually reconnecting Lakehouse references after the disaster.

1. Create a new SJD item (for example, SJD1) in the new workspace C2.W2, with the same settings and configurations as the original SJD item (for example, language, environment, and so on).

1. Use Azure Storage Explorer to copy Libs, Mains, and Snapshots from the original SJD item to the new SJD item.

    :::image type="content" source="./media/experience-specific-guidance/sjd-copy-from-original-sdj-to-new-sjd.png" alt-text="Screenshot showing how to copy from the original spark job definition to the new spark job definition.":::

1. The code content appears in the newly created SJD. You need to manually add the newly recovered Lakehouse reference to the job (refer to the [Lakehouse recovery steps](#lakehouse)). Users need to reenter the original command line arguments manually.

    :::image type="content" source="./media/experience-specific-guidance/sjd-command-line-arguments.png" alt-text="Screenshot showing command line arguments to recover spark job definition.":::

Now you can run or schedule your newly recovered SJD.

For details about Azure Storage Explorer, see [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md).

### User data functions

To recover your user data functions in a healthy region, use one of the following approaches.

#### Approach 1: With Git integration (recommended)

The preferred recovery mechanism is [Fabric Git integration](../cicd/git-integration/intro-to-git-integration.md). By synchronizing user data function projects with an Azure DevOps or GitHub repository, you can quickly reconstruct them in a new workspace after failover.

##### Prepare before a disaster

1. Configure Fabric Git integration for the workspace that hosts the user data function.
1. Connect the workspace to an Azure DevOps or GitHub repository.
1. Commit all user data function to the repository and synchronize changes regularly.
1. Store environment-specific settings separately in variable libraries if required.

##### Recovery steps

After a regional disaster:

1. Create a new Fabric capacity in a healthy region, such as C2.
1. Create a new workspace, such as W2, in the new capacity.
1. Connect the workspace to the same Azure DevOps or GitHub repository.
1. Open **Source control** and synchronize the repository contents to the workspace.
1. Recreate or recover all dependent Fabric resources, such as lakehouses, SQL databases in Fabric, warehouses, and Business Events.
1. Redeploy the user data functions.
1. Validate function execution and dependency connectivity.
1. Update downstream applications, data pipelines or other integrated to refernece the recovered functions.
1. Complete End to End validation of all your scenarios.

##### Important considerations

- Git integration recovers only source code and project assets.
- Historical execution logs aren't recovered.
- Downstream systems might require endpoint rebinding.

For more information, see [User data functions source control and deployment](../data-engineering/user-data-functions/git-and-deployment-pipelines.md).

#### Approach 2: Manual recovery

If Git integration wasn't configured before the disaster, you can manually reconstruct user data functions from source code backups.

##### Prepare before a disaster

Regularly complete the following tasks, and store the items in an external source control repository or backup location:

- Export function source code to a GitHub repository.
- Document and preserve dependency information. 
- Document environment settings.

##### Recovery steps

After a regional disaster:

1. Create a new Fabric capacity in a healthy region, such as C2.
1. Create a new workspace, such as W2.
1. Recover all resources required by the function, including lakehouses, SQL databases in Fabric, warehouses, eventhouses, and external services.
1. Create a new user data function project.
1. Import or recreate the function source code.
1. Reapply runtime configuration settings.
1. Reinstall all function dependencies.
1. Redeploy the function.
1. Reconfigure authentication and authorization.
1. Recreate Business Event publishers or consumers, if used.
1. Complete end-to-end validation testing for your scenarios and integrations.

### GraphQL

GraphQL items from the primary region aren't available after a regional disaster, and GraphQL definitions and configurations aren't replicated to the secondary region. To recover GraphQL in a new region, use one of the following approaches.

#### Approach 1: User-managed redundancy with Git integration 

The best way to make this process easy and quick is to use Fabric Git integration, and then synchronize your GraphQL with your ADO repo. After the service fails over to another region, you can use the repo to rebuild the GraphQL in the new workspace you created.

1. Create a new workspace in the target capacity and region.

1. Recover all dependent data sources, such as Lakehouse, Warehouse, or SQL databases, by following their respective recovery steps.

1. Update the GraphQL definition to point to the newly recovered resources by modifying environment-specific references such as source workspace IDs, source item IDs, and connection details. This step ensures correct binding at deployment time.

1. Redeploy GraphQL items from the Git repository into the new workspace. This step recreates the API structure and configuration by using the updated definitions.

1. Reapply item settings, including roles, access controls, and authentication configuration.

1. Reapply endpoint references by updating any applications or integrations to use the newly created GraphQL endpoint.

1. Update any existing deployment pipelines that were pointing to the old workspace to reference the newly created workspace.

1. Validate end-to-end functionality of the API.

#### Approach 2: Manual approach

If you don't take the Git integration approach, you can use the following manual approach to recover GraphQL.

1. Create a new workspace in the target capacity and region.

1. Recover all dependent data sources, such as Lakehouse, Warehouse, or SQL databases.

1. Recreate the GraphQL API manually in the new workspace, including schema definitions, data source connections, and relationships.

1. Reapply item settings, including roles, access controls, and authentication configuration.

1. Reapply endpoint references by updating any applications or integrations to use the newly created GraphQL endpoint.

1. Update any existing deployment pipelines that were pointing to the old workspace to reference the newly created workspace.
   
1. Validate end-to-end functionality of the API.

#### Important considerations

1. GraphQL relies on external dependencies (such as Lakehouse, Warehouse, and SQL), which you must recover prior to GraphQL deployment.

1. GraphQL API definitions include environment-specific references (such as `sourceWorkspaceId` and `sourceItemId`). When recovering in a new region, these references might become invalid. Update them to point to newly provisioned resources.

1. Automatic rebinding of data sources isn't guaranteed in disaster recovery scenarios, especially when using saved credentials or cross-workspace connections.

1. Other item settings such as monitoring, authorization, RBAC, introspection, and more don't carry over after failover. You must re-establish these settings in the new region.

#### References

- [Overview of Fabric Git integration - Microsoft Fabric | Microsoft Learn](/fabric/cicd/git-integration/intro-to-git-integration)

- [Source control and deployment pipelines in API for GraphQL - Microsoft Fabric | Microsoft Learn](/fabric/data-engineering/graphql-source-control-and-deployment) 

### App

The system doesn't replicate Fabric Apps, including their code, configuration, and metadata, to secondary regions. If the primary region fails, the app remains unavailable. For recovery, store the app source code outside the system in GitHub, Azure DevOps, or another source control system. Recover app data separately by following the disaster recovery guidance for each underlying Fabric data store.


#### Manual approach

You can manually recover a Fabric App after a regional disaster by using the application source code and the Rayfin CLI. 

**Prerequisites** 

Before a disaster occurs: 

- Store the Fabric App source code in GitHub, Azure DevOps, or another source control repository. 

- Document the process for recovery.  

**Recovery steps** 

1. Create a new workspace in the target capacity and region. 

1. Recover dependent resources before redeploying the application.  

1. Retrieve the latest Fabric App source code from your source control repository or local backup. 

1. From the application source directory, deploy the Fabric App into the recovery workspace by using Rayfin CLI. Run `rayfin up --workspace <new workspace>`. 

1. Recover the app's child item (SQL database in Fabric) by following its respective recovery procedures.  
   
1. Reapply item level settings, including roles and access controls as needed.  

1. Validate the application functionality and ensure users have the right permissions.  


**Important** 

- Maintain Fabric App source code outside the Fabric region to enable recovery.  

- Application data in the database isn't recovered as part of the Fabric App deployment process and must be restored separately.  You can manually recover a Fabric App after a regional disaster by using the application source code and the Rayfin CLI. 

## Data Science

This guide walks you through the recovery procedures for the Data Science experience. It covers ML models and experiments.

### ML model and experiment

Data Science items from the primary region remain unavailable to customers, and the content and metadata in ML models and experiments don't replicate to the secondary region. To fully recover them in the new region, save the code content in a version control system (such as Git), and manually rerun the code content after the disaster.

1. Recover the notebook. Refer to the [Notebook recovery steps](#notebook).

1. Configuration, historically run metrics, and metadata don't replicate to the paired region. You need to rerun each version of your data science code to fully recover ML models and experiments after the disaster.

## Data Warehouse

This guide walks you through the recovery procedures for the Fabric Data Warehouse workload. It covers warehouse items.

### Warehouse

You can't access warehouses from the original region. To recover warehouses, use the following two steps.

1. Create a new interim lakehouse in workspace C2.W2 for the data you copy from the original warehouse.

1. Populate the warehouse's Delta tables by using the warehouse Explorer and the T-SQL capabilities (see [Tables in Fabric Data Warehouse](../data-warehouse/tables.md)).

> [!NOTE]
> Keep your Warehouse code (schema, table, view, stored procedure, function definitions, and security codes) [versioned and saved in a safe location, such as Git](../data-warehouse/development-deployment.md), according to your development practices.

#### Data ingestion via Lakehouse and T-SQL code

In newly created workspace C2.W2:

1. Create an interim lakehouse "LH2" in C2.W2.

1. Recover the Delta tables in the interim lakehouse from the original warehouse by following the [Lakehouse recovery steps](#lakehouse).

1. Create a new warehouse "WH2" in C2.W2.

1. Connect the interim lakehouse in your warehouse explorer.

1. Depending on how you deploy table definitions before data import, the actual T-SQL used for imports can vary. To recover Warehouse tables from lakehouses, you can use the `INSERT INTO`, `SELECT INTO`, or `CREATE TABLE AS SELECT` approach. In the following example, we use `INSERT INTO`. If you use the following code, replace samples with actual table and column names.

    ```sql
    USE WH1
    
    INSERT INTO [dbo].[aggregate_sale_by_date_city]([Date],[City],[StateProvince],[SalesTerritory],[SumOfTotalExcludingTax],[SumOfTaxAmount],[SumOfTotalIncludingTax], [SumOfProfit])
    
    SELECT [Date],[City],[StateProvince],[SalesTerritory],[SumOfTotalExcludingTax],[SumOfTaxAmount],[SumOfTotalIncludingTax], [SumOfProfit]
    FROM  [LH11].[dbo].[aggregate_sale_by_date_city] 
    GO
    ```

1. Change the connection string in applications that use your Fabric warehouse.

> [!TIP]
> For customers who need cross-regional disaster recovery and fully automated business continuity, keep two Fabric warehouses in separate Fabric regions and maintain code and data parity by regularly deploying and ingesting data to both sites.

### Mirrored database

Customers can't access mirrored databases from the primary region, and the settings don't replicate to the secondary region. To recover a mirrored database after a regional failure, you need to recreate it in another workspace from a different region.

## Data Factory

Customers can't access Data Factory items from the primary region, and the settings and configuration in pipelines or Dataflow Gen2 items don't replicate to the secondary region. To recover these items after a regional failure, you need to recreate your Data Integration items in another workspace from a different region. The following sections outline the details.

### Dataflows Gen2

To recover a Dataflow Gen2 item in the new region, export a `.pqt` file to a version control system such as Git, and then manually recover the Dataflow Gen2 content after the disaster.

1. From your Dataflow Gen2 item, in the **Home** tab of the Power Query editor, select **Export template**.

    :::image type="content" source="./media/experience-specific-guidance/dataflow-gen2-export-template.png" alt-text="Screenshot showing the Power Query editor, with the Export template option emphasized.":::

1. In the **Export template** dialog, enter a name (mandatory) and description (optional) for this template. When done, select **OK**.

    :::image type="content" source="./media/experience-specific-guidance/dataflow-gen2-export-template2.png" alt-text="Screenshot showing how to export a template.":::

1. After the disaster, create a new Dataflow Gen2 item in the new workspace "C2.W2".

1. From the current view pane of the Power Query editor, select **Import from a Power Query template**.

    :::image type="content" source="./media/experience-specific-guidance/dataflow-gen2-import-from-power-query-template.png" alt-text="Screenshot showing the current view with Import from a Power Query template emphasized.":::

1. In the **Open** dialog, browse to your default downloads folder and select the `.pqt` file you saved in the previous steps. Then select **Open**.

1. The template is then imported into your new Dataflow Gen2 item.

The **Save As** feature for Dataflows isn't supported in the event of disaster recovery.

### Pipelines

Customers can't access pipelines in the event of regional disaster, and the configurations aren't replicated to the paired region. Build your critical pipelines in multiple workspaces across different regions.

### Copy job

CopyJob users must undertake proactive measures to protect against a regional disaster. The following approach ensures that, after a regional disaster, a user's CopyJobs remain available.

#### User-managed redundancy with Git integration (in public preview)

The best way to make this process easy and quick is to use Fabric Git integration, then synchronize your CopyJob with your Azure DevOps repo. After the service fails over to another region, you can use the repository to rebuild the CopyJob in the new workspace you created.

1. Configure your workspace's Git integration and select **connect and sync** with Azure DevOps repo.

    :::image type="content" source="./media/experience-specific-guidance/copyjob-connect-sync-ado-repo.png" alt-text="Screenshot showing how to connect and sync Workspace with ADO repo.":::

    The following image shows the synced CopyJob.

    :::image type="content" source="./media/experience-specific-guidance/copyjob-synced-copyjob.png" alt-text="Screenshot showing CopyJob synced with ADO repo.":::

1. Recover the CopyJob from the Azure DevOps repo.

    1. In the newly created workspace, connect and sync to your Azure DevOps repo again. All Fabric items in this repository are automatically downloaded to your new workspace.

        :::image type="content" source="./media/experience-specific-guidance/copyjob-connect-sync-ado-repo.png" alt-text="Screenshot showing Workspace reconnected to ADO repo.":::

    1. If the original CopyJob uses a Lakehouse, users can refer to the [Lakehouse section](#lakehouse) to recover the Lakehouse and then connect the newly recovered CopyJob to the newly recovered Lakehouse.

For more information about Git integration, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

### Apache Airflow job

You must take proactive measures to protect Apache Airflow jobs in Fabric against a regional disaster.  

Manage redundancy by using Fabric Git integration. First, synchronize your Airflow job with your ADO repo. If the service fails over to another region, you can use the repository to rebuild the Airflow job in the new workspace you created. 

Follow these steps to achieve this goal:

1. Configure your workspace's Git integration and select **Connect and sync** with the ADO repo.

1. After that, you see your Airflow job synced to your ADO repo.

1. If you need to recover the Airflow job from the ADO repo, create a new workspace, connect, and sync to your Azure ADO repo again. All Fabric items, including Airflow, in this repository automatically download to your new workspace.

## Real-Time Intelligence

This guide walks you through the recovery procedures for the Real-Time Intelligence experience. It covers KQL databases, query sets, and eventstream items.

### Activator

Activator items from the primary region remain unavailable to customers, and Activator trigger definitions aren't replicated to the secondary region. Activator users must take proactive steps to prepare for regional disaster recovery.

To ensure that you can recover Activator items in the event of a regional disaster, set up [Fabric Git integration](../cicd/git-integration/intro-to-git-integration.md) to back up trigger definitions and restore them in a workspace in another region.

1. Configure Fabric Git integration for the workspace that contains your Activator item, and [synchronize](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops#connect-and-sync) your trigger definitions with your Git repository.
1. Keep your Activator trigger definitions committed and synced regularly.
1. During recovery, create a new workspace in the target region (C2.W2), connect it to the same repository, and sync to restore the trigger definitions.
1. Reconfigure and validate all Activator data sources and dependencies in the new workspace.

> [!NOTE]
> The standard Fabric failover process doesn't apply to Activator items. Recovery is limited to Git-based backup and restore of trigger definitions.

For more information about Git integration, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md).

### Graph Model/Queryset

Customers can't access Graph model and Graph queryset items from the primary region, and Fabric doesn't replicate these items to the secondary region. To recover, create or use a capacity in a different region and recreate the Graph model and Graph queryset items there.

1. Create or use an existing Fabric capacity in a different region that isn't affected by the disaster.

1. Create a new workspace or use an existing workspace in that capacity.

1. Recreate the Graph model item in the secondary workspace (referenced in step 2). Reconfigure the model definition, including nodes, edges, and others, to match the original Graph model.

1. If the original lakehouse is in the failing region, recover it first by following the [Lakehouse section](#lakehouse).

1. Connect a lakehouse as the OneLake data source for the newly created Graph model item. Use the recovered lakehouse if it was in the failing region, or reconnect to the existing lakehouse if it remains available.

1. Reconfigure any data loading schedules or connections for the Graph model in the new workspace.

1. Recreate the Graph queryset item in the secondary workspace. Manually reenter the queries and any saved query configurations from the original Graph queryset.

### KQL Database/Queryset

KQL database and queryset users must take proactive steps to protect against a regional disaster. The following approach ensures that in the event of a regional disaster, data in your KQL databases and querysets stays safe and accessible.

Use the following steps to guarantee an effective disaster recovery solution for KQL databases and querysets.

1. **Set up independent KQL databases**: Configure two or more independent KQL databases and querysets on dedicated Fabric capacities. Set up these databases across two different Azure regions (preferably Azure-paired regions) to maximize resilience.

1. **Replicate management activities**: Mirror any management action you take in one KQL database in the other. This approach keeps both databases in sync. Key activities to replicate include:

    * **Tables**: Ensure that the table structures and schema definitions are consistent across the databases.

    * **Mapping**: Duplicate any required mappings. Ensure that data sources and destinations align correctly.

    * **Policies**: Ensure that both databases have similar data retention, access, and other relevant policies.

1. **Manage authentication and authorization**: Set up the required permissions for each replica. Ensure that you establish proper authorization levels, granting access to the required personnel while maintaining security standards.

1. **Parallel data ingestion**: To keep the data consistent and ready in multiple regions, load the same dataset into each KQL database at the same time as you ingest it.

### Eventstream

An eventstream is a centralized place in the Fabric platform for capturing, transforming, and routing real-time events to various destinations (for example, lakehouses, KQL databases/querysets) with a no-code experience. As long as the destinations support disaster recovery, eventstreams don't lose data. Therefore, use the disaster recovery capabilities of those destination systems to guarantee data availability.

You can also achieve geo-redundancy by deploying identical eventstream workloads in multiple Azure regions as part of a multi-site active/active strategy. With a multi-site active/active approach, you can access your workload in any of the deployed regions. This approach is the most complex and costly approach to disaster recovery, but it can reduce the recovery time to near zero in most situations. To be fully geo-redundant:

1. Create replicas of your data sources in different regions.

1. Create eventstream items in corresponding regions.

1. Connect these new items to the identical data sources.

1. Add identical destinations for each eventstream in different regions.

### Business Events, Fabric Events, and Azure Events

Although Business Events, Fabric Events, and Azure Events share the same Real-Time hub infrastructure in Microsoft Fabric, they have distinct origins, behaviors, and recovery requirements. Understand these differences before planning for disaster recovery:

- **Fabric Events** are event subscriptions that react to activity produced by Fabric resources themselves. These events include workspace item lifecycle changes (such as creating, updating, or deleting lakehouses, notebooks, or warehouses), job executions (such as pipeline runs or notebook executions), and OneLake file and folder operations. These subscriptions are push-based and ephemeral. The subscriptions aren't replicated to the secondary region.

- **Azure Events** are event subscriptions to activity produced by Azure Blob Storage accounts. These Azure resources exist independently of any Fabric capacity or region. Although the Azure Blob Storage resource itself might remain available during a Fabric regional outage, the subscriptions configured in Real-Time hub aren't replicated to the secondary region and must be recreated.

- **Business Events** are a distinct capability in Fabric Real-Time Intelligence that allows teams to define, publish, and act on meaningful business signals. Business events are generated from within Fabric through Activator, Spark notebooks, or User Data Functions, then published to Real-Time hub where downstream consumers such as Activator, Eventhouse, or Power Automate can react to them. Event schemas are governed centrally through the Schema Registry. Eventhouse automatically stores every published business event, so its recovery directly affects the availability of business event history. None of the publisher or consumer configurations, schema definitions, or subscriptions are replicated to the secondary region.

Use the following steps to restore Business Events, Fabric Events, and Azure Events in the new workspace in the recovery region.

**For Business Events:**

1. Recreate the business event used by publishers and consumers by following the article [Create Business Events in Fabric Real-Time Hub](../real-time-hub/business-events/create-business-events.md). During the creation of the business event, you create the Event Schema Set resource. The Eventhouse resource is optional depending on the scenario. If you backed up your event schema set with Git integration, restore it first by following the [Event schema set section](#event-schema-set), then point the business event at the restored schema set.

1. Recreate any publisher items that generate business events, such as Spark notebooks or User Data Functions, in the new workspace by following the publisher articles: [Use User Data Function as a Business Events Publisher](../real-time-hub/business-events/business-events-user-data-function.md), [Use Activator as a Business Events Publisher](../real-time-hub/business-events/business-events-activator.md), [Use Notebook as a Business Events Publisher](../real-time-hub/business-events/business-events-notebook.md), and [Use Eventstream as a Business Events Publisher](../real-time-hub/business-events/business-events-event-stream-publisher.md).

1. Recreate the consumer subscriptions in Real-Time hub (for example, Activator rules, notebook triggers, or Power Automate flows) that were originally reacting to business events in the affected region by following the articles [Eventhouse and Real-Time Dashboard Integration with Business Events](../real-time-hub/business-events/business-events-eventhouse.md) and [Consume Business Events from Activator](../real-time-hub/business-events/consume-business-events-from-activator.md).

1. Validate that events are flowing end-to-end by verifying that subscriptions are active and that data is arriving at the expected destinations in the recovery region.

**For Fabric Events:**

1. Recreate the subscriptions in Real-Time hub pointing to the workspace items, jobs, or OneLake paths that you restored in the recovery region by following the article [Explore Fabric events in Fabric Real-Time hub](../real-time-hub/explore-fabric-events.md).

1. Validate that events are flowing end-to-end by verifying that subscriptions are active and that data is arriving at the expected destinations in the recovery region.

**For Azure Events:**

1. Azure Blob Storage accounts aren't affected by a Fabric regional outage. Recreate the event subscriptions in Real-Time hub pointing to the same Azure Blob Storage accounts by following the article [Set alerts on Azure Blob Storage events in Real-Time hub](../real-time-hub/set-alerts-azure-blob-storage-events.md).

1. Validate that events are flowing end-to-end by verifying that subscriptions are active and that data is arriving at the expected destinations in the recovery region.

> [!NOTE]
> Event history for Business Events depends on Eventhouse recovery. Business Events, Fabric Events, and Azure Events are push-based and ephemeral, so no historical event data is recoverable for those types. Only events produced after recovery is complete are available in the new region.

### Event schema set

An event schema set is the Fabric item that holds event type and schema definitions in Real-Time Intelligence. Other capabilities build on it: publishers write events that conform to its schemas, and consumers read against the same definitions.

Event schema sets from the primary region remain unavailable to customers, and they're not replicated to the secondary region. However, because an event schema set is a durable authored definition rather than an ephemeral subscription, you can back it up ahead of time and restore it rather than reauthoring it by hand.

#### Recommended: back up with Fabric Git integration

To recover an event schema set after a regional disaster, set up [Fabric Git integration](../cicd/git-integration/intro-to-git-integration.md) before a disaster occurs, and [synchronize](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops#connect-and-sync) the workspace containing your event schema sets with your Git repository.

1. Configure Fabric Git integration for the workspace that contains your event schema set, and synchronize it with your Git repository.

1. Keep the event schema set committed and synced regularly, particularly after adding event types or publishing new schema versions.

1. During recovery, create a new workspace in the target region (C2.W2), connect it to the same repository, and sync to restore the event schema set. Because the new workspace is empty, Git sync brings the contents from the repository into the workspace.

1. Recreate any publishers and consumers that use the schema set, following the guidance for those item types.

1. Validate that publishers can publish against the restored event types and that consumers receive events as expected.

The synchronized definition includes the event types in the schema set, the schemas, and the schema versions. It doesn't include publisher registrations, consumer subscriptions, or event history. Recover those separately, following the guidance for the item types that use the schema set.

#### Alternative: recreate manually

If you didn't configure Git integration before the disaster, recreate the event schema set in the recovery region by following [Create and manage event schema sets](../real-time-intelligence/schema-sets/create-manage-event-schema-sets.md), then add the event types and schemas that the original schema set contained by following [Create and manage event schemas in schema sets](../real-time-intelligence/schema-sets/create-manage-event-schemas.md).

> [!NOTE]
> Event schema sets are often shared across several publishers and consumers. Recover the schema set before recreating the items that depend on it, so those items have event types to bind to.

### Map

Map items from the primary region remain unavailable to customers and the Map items aren't replicated to the secondary region.

If you want to recover a Map item when a disaster happens, set up [Fabric Git integration](../cicd/git-integration/intro-to-git-integration.md), and [synchronize](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops#connect-and-sync) your Map item with your Git repo.

During the recovery, after the new region/capacity in Fabric is set up, you can use the repo to rebuild the Map item in the new workspace you created. Since the new workspace is empty, [Git sync](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops#connect-and-sync) gets the contents from the repo into the empty workspace. This step brings the Map item back to life.

> [!NOTE]
> If the original Map item has a lakehouse or KQL queryset configured, refer to the [Lakehouse section](./experience-specific-guidance.md#lakehouse) and the [KQL queryset section](./experience-specific-guidance.md#kql-databasequeryset) to recover them first. After those dependencies are taken care of, connect the newly recovered lakehouse and queryset to the newly recovered Map item.

### Ontology

Ontology users must take proactive steps to prepare for regional disaster recovery. The approach described below ensures that, following a regional disaster, your Ontology remains recoverable and can be restored quickly.

The simplest and fastest way to enable recovery is to use Fabric Git integration and synchronize your Ontology with an Azure DevOps (ADO) repository. If the service fails over to another region, you can use this repository to rebuild the Ontology in a newly created workspace.

Ontology items in the primary region are not available to customers after a regional disaster, and Ontology items are not replicated to the secondary region.

To recover an Ontology item during a disaster, configure [Fabric Git integration](../cicd/git-integration/intro-to-git-integration.md), and [synchronize](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops#connect-and-sync) the Ontology item with your ADO repository ahead of time.

During recovery, once the new region and capacity in Fabric are set up, you can use the repository to rebuild the Ontology item in a new workspace. Because the new workspace is empty, [Git sync](../cicd/git-integration/git-integration-process.md?tabs=Azure%2Cazure-devops#connect-and-sync) pulls the contents from the repository into the workspace, effectively restoring the Ontology item.

> [!NOTE]
> If the original Ontology item has a lakehouse configured, refer to the [Lakehouse section](#lakehouse) to recover the lakehouse first. After those dependencies are taken care of, connect the newly recovered lakehouse to the newly recovered Ontology item.

### Planning

This article describes the recovery procedures for the planning experience in IQ. It outlines the steps required to restore key components, including planning sheets, PowerTable sheets, intelligence sheets, InfoBridge, and related data assets.

#### Git integration to restore plan items

The preferred approach is to synchronize all plan items with an Azure DevOps (ADO) or GitHub repository by using [Fabric Git integration](../cicd/git-integration/intro-to-git-integration.md). After a failover, use the repository to restore the items in the new workspace.

Predisaster (proactive steps):

1. In workspace W1, go to **Workspace Settings** and configure Git integration.

1. Select **Connect and sync** with your ADO or GitHub repository.

1. Select the plan items to upload to the repository and select **Commit**.

    :::image type="content" source="media/experience-specific-guidance/upload-plan-git.png" alt-text="Screenshot of uploading plan items from the Fabric workspace to a Git repository.":::

1. Confirm that the **Git status** of plan items is *Synced*.

1. Establish a commit discipline - commit after every significant change to a plan definition so the repository always reflects the latest state.

Recovery steps:

1. Create a new workspace W2 inside capacity C2 in the healthy region.

1. In workspace W2, go to **Workspace Settings** and reconnect to the same ADO/GitHub repository.

1. Select **Source Control**. Select the relevant repository branch and select **Update All**. All plan items are downloaded to W2.

> [!IMPORTANT]
> Only the planning sheet structure and settings are recovered by using Git integration.
> Data entered in the planning sheet such as input values, notes, and comments aren't automatically restored. It requires Fabric SQL restore.
> Semantic model data also needs to be recovered separately.

The following components are restored after recovery:

* **PowerTable sheets:** Source table settings, column configuration, row access, visual properties (layout, formats, and more), row identification, comment settings, slowly changing dimensions (SCD), approvals, automations, and forms.
* **Planning sheets:** Sheet properties (formatting, conditional formatting, and more), comment settings, writeback settings, data input columns, data input rows, scenarios, and bookmarks.
* **InfoBridge:** InfoBridge sources, InfoBridge queries, transformation steps, writeback destinations, writeback settings, linked query mappings, query groups, visual properties (blend). These items can't be recovered: file-based sources (CSV, Excel), cross-workload sheets that use file-based sources.
* **Intelligence:** All charts and matrices.

#### Fabric SQL restore for planning

Data entered in planning sheets, tables used in PowerTable, and writeback data are stored in SQL databases and must be considered as part of your disaster recovery strategy. To recover SQL databases, see the [SQL database](#sql-database) section.

* **Restore plan metadata**: Each plan item is associated with a \_\_fabric\_plan\_sys database that stores metadata for planning features, including comments, scenarios, data inputs, and writeback configuration. The \_\_fabric\_plan\_sys database isn't restored automatically and must be explicitly recovered.

* **Restore writeback databases**: If your plan uses SQL writeback destinations, you must also recover the associated databases manually. Configured SQL writeback destinations aren't restored automatically.

* **Restore tables used in PowerTable**: Any tables created by using PowerTable are stored in a SQL database in Fabric. You must also recover these tables during DR.

### Operations agents

Operations agent users should take proactive steps to prepare for regional disaster recovery. Following the approach described in this section helps ensure that your agents can be restored quickly after a regional outage.

Use Fabric Git integration to synchronize your workspace with a repository. This approach enables you to reconstruct agent configurations in a new workspace if the service fails over to another region.

Operations agent items in the primary region are unavailable during a regional disaster. Agent configurations, behavior models, and activity logs aren't replicated to the secondary region. In-progress operations, active chat sessions, and previously ingested events at the time of the disaster are also lost.

To prepare for recovery, configure Fabric Git integration and synchronize your agent items with your ADO repository before a disaster occurs.

When recovering, set up your new region and capacity in Fabric, then use the synchronized repository to restore agent configurations into a fresh workspace. Git sync pulls the stored contents from the repository into the empty workspace, recreating your agent items.

Once configurations are restored, confirm that any referenced Eventhouse (KQL) databases or region-specific data sources are accessible in the new region. Update endpoint references in agent configurations as needed. Finally, restart your agents and have users initiate new chat sessions. Previous conversations can't be resumed.

<a id="transactional-database"></a>

## Databases

This guide describes the recovery procedures for the databases experience. 

### SQL database

To protect against a regional failure, users of SQL databases can take proactive measures to periodically export their data and use the exported data to recreate the database in a new workspace when needed.

Use the [SqlPackage](../database/sql/sqlpackage.md) CLI tool that provides database portability and facilitates database deployments.

1. Use the SqlPackage tool to export the database to a `.bacpac` file.  See [Export a database with SqlPackage](../database/sql/sqlpackage.md#export-a-database-with-sqlpackage) for more details.
1. Store the `.bacpac` file in a secure location that's in a different region than the database.  Examples include storing the `.bacpac` file in a Lakehouse that's in a different region, using a geo-redundant Azure Storage Account, or using another secure storage medium that's in a different region.
3. If the SQL database and region are unavailable, you can use the `.bacpac` file with SqlPackage to recreate the database in a workspace in a new region – Workspace C2.W2 in Region B as described in the scenario above.  Follow the steps detailed in [Import a database with SqlPackage](../database/sql/sqlpackage.md#import-a-database-with-sqlpackage) to recreate the database with your `.bacpac` file.

The recreated database is an independent database from the original database and reflects the state of the data at the time of the export operation.

#### Failback considerations

The recreated database is an independent database.  Data added to the recreated database wouldn't be reflected in the original database.  If you plan to failback to the original database when the home region becomes available, you need to consider manually reconciling data from the recreated database to the original database.

## Platform

Platform refers to the underlying shared services and architecture that apply to all workloads. This section describes recovery procedures for shared Fabric capabilities.

### Workspace monitoring

Workspace monitoring collects logs about activity in the workspace where you enable it. After you recover your workspace as C2.W2, enable workspace monitoring on W2. It starts collecting monitoring data for the recovered workspace.

Monitoring data from the original workspace (C1.W1) isn't carried over, because monitoring reflects the activity of the workspace it runs on.

### Variable library

Microsoft Fabric Variable libraries enable developers to customize and share item configurations within a workspace, streamlining content lifecycle management. From a disaster recovery standpoint, variable library users must proactively protect against a regional disaster. This protection can be done through Fabric Git integration, which ensures that after a regional disaster, a user's Variable library remains available.  To recover a variable library, follow these steps:

 - Use Fabric Git integration to synchronize your Variable library with your ADO repo. In case of disaster, you can use the repository to rebuild the Variable library in the new workspace you created. Use the following steps:

     1. Connect your workspace to Git repo as described in [here](../cicd/git-integration/git-get-started.md#connect-a-workspace-to-a-git-repo).
     2. Make sure to keep the WS and the repo synched with [Commit](../cicd/git-integration/git-get-started.md#commit-changes-to-git) and [Update](../cicd/git-integration/git-get-started.md#update-workspace-from-git).
     3. Recovery - In case of disaster, use the repository to rebuild the Variable library in a new workspace:

 - In the newly created workspace, connect and sync to your Azure ADO repo again.
 - All Fabric items in this repository are automatically downloaded to your new Workspace.
 - After syncing your items from Git, open your Variable Libraries in the new workspace and manually select the desired [active value set](../cicd/variable-library/get-started-variable-libraries.md#add-a-value-set).

### Customer-managed keys for Fabric workspaces

You can use customer-managed keys (CMK) stored in Azure Key Vault to add an extra layer of encryption on top of Microsoft-managed keys for data at rest. If Fabric becomes inaccessible or inoperable in a region, its components fail over to a backup instance. During failover, the CMK feature supports read-only operations. As long as the Azure Key Vault service remains healthy and permissions to the vault are intact, Fabric continues to connect to your key and allows you to read data normally. This means the following operations aren't supported during failover: enabling and disabling the workspace CMK setting and updating the key. 

## Fabric Migration Assistant for SQL database in Fabric

The Fabric Migration Assistant can move a SQL Server database into a SQL database in Fabric in three stages: the migration wizard creates the target database and starts the migration, the migration monitor tracks progress while the schema is deployed from a DACPAC, the Migration Assistant helps you review and fix script errors, prepare the database, copy data with a copy job, and finalize the copy.

Migration progress isn't replicated to another region, and an interrupted deployment can't be resumed. These failures don't affect the source SQL Server database, so you can run the migration assistant again. If the original region is unavailable, first follow the general recovery plan in this article to create capacity C2 and workspace W2 in the paired region, then run the migration in W2. If the original region recovers, you can retry the migration in the original workspace.

A regional disruption can cause a migration to fail in three ways:

- **The target database isn't created**

    If Fabric can't create the target database, the migration wizard displays an error and the migration doesn't start. Select **Start migration** to retry, or try again later.

    The wizard attempts to remove an incomplete database, but cleanup can fail during a disruption. Before retrying, check the workspace for a database with the target name. Confirm that it's the incomplete database from the failed attempt before deleting it.

- **The deployment fails**

    If deployment is interrupted, the migration monitor stops reporting progress, opens the target database, and displays a dialog indicating the deployment failed. You can't resume a failed deployment, and the database created by the attempt remains in the workspace.

    To recover:
    
    1. Confirm that Fabric is available and that you have the DACPAC used for the original migration.
    1. Identify the database created by the failed attempt. Delete it if it doesn't contain anything you need to keep. Otherwise, keep it and use a different name for the new database.
    1. Run a new migration from the source DACPAC. The migration creates a new database.
    
    Data is copied by a copy job in Data Factory. If you synchronized the copy job with Git before the disruption, see [Copy Job in the Data Factory guidance](#copy-job). Otherwise, create a new copy job as part of the new migration.

- **Migration history doesn't load**

    If the Migration Assistant can't retrieve migration history, it reports that migration information is no longer available. Progress saved in the current browser is preserved, and the target database isn't affected. Refresh the page to load the migration history again.

## OneLake

This section walks you through the recovery procedures for OneLake features. For more information on disaster recovery for OneLake data, see [OneLake disaster recovery](/fabric/onelake/onelake-disaster-recovery).

### Lifecycle management policies

If Fabric becomes inaccessible or inoperable in a region, you can still read and update your OneLake lifecycle policy during failover. Any data moved to the cool or cold tier stays in that tier. To apply your existing policy to your new recovery workspace, follow these steps: 
1. Call Export Policy on your original workspace and save the entire lifecycle policy. 
2. Call Import Policy on your recovered workspace, with your exported lifecycle policy as the request body. 

### Resource instance rules

Resource instance rules help you securely control access to data in OneLake by using trusted Azure resource identities. During regional failover, the system continues to enforce existing rules for read access. However, you can't create, update, or delete resource instance rules until the workspace returns to a writable state.

## Related information

* [Microsoft Fabric disaster recovery guide](./disaster-recovery-guide.md)
