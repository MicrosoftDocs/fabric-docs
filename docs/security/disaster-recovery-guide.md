---
title: Microsoft Fabric disaster recovery guide
description: Find out about Microsoft Fabric's recovery plan in the event of a disaster.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom: build-2023
ms.date: 11/06/2023
---

# Microsoft Fabric disaster recovery guide

This document describes a disaster recovery plan for Fabric that is designed to help organizations keep their data safe and accessible if an unplanned regional disaster occurs. It covers strategy, features, and recovery steps. 

## What does the Fabric disaster recovery plan include?

The goal of the Fabric disaster recovery plan is to keep your organization's data safe and accessible. Power BI, now a part of the Fabric platform, has a solid disaster recovery system in place. This means your services stay protected. For other Fabric items, while a full disaster recovery system isn't currently supported, we've ensured that data stored in OneLake is backed up across regions. This means that even if there's a regional disaster, you can still access your data. This document contains guides to help you get back on track. 

### Power BI

Power BI, as a core service of Fabric, has an integrated disaster recovery function designed to ensure service continuity and data protection. Key features of this framework include: 

* **BCDR as default**: Power BI automatically includes disaster recovery capabilities in its default offering. This means users don't need to opt-in or activate this feature separately. 

* **Cross-region replication**: Power BI uses [Azure storage geo-redundant replication](/azure/storage/common/storage-redundancy-grs/) and [Azure SQL geo-redundant replication](/azure/sql-database/sql-database-active-geo-replication/) to guarantee that backup instances exist in other regions and can be used. This means that data is duplicated across different regions, enhancing its availability, and reducing the risks associated with regional outages.

* **Continued services and access after disaster**: Even during disruptive events, Power BI items remain accessible in read-only mode. This includes semantic models, reports, and dashboards, ensuring that businesses can continue their analysis and decision-making processes without significant hindrance.

For more information, see the [Power BI high availability, failover, and disaster recovery FAQ](/power-bi/enterprise/service-admin-failover/)

### Other Fabric experiences

While customers continue to have full disaster recovery support in Power BI, the disaster plan described here is designed to make sure your data stays safe and can be accessed or restored if something unexpected happens. To help protect your data, the plan offers:

* **Cross-region replication**: Fabric offers cross-region replication for customer data stored in OneLake. Customers can opt in or out of this feature based on their requirements.

* **Data access after disaster**: In the event of a regional disaster, Fabric guarantees data access, albeit in a limited capacity. While the creation or modification of new items is restricted after failover, the primary focus remains on ensuring that existing data remains accessible and intact.

* **Guidance for recovery**: Fabric provides a structured set of instructions to guide users through the recovery process. This makes it easier for them to transition back to regular operations.

### Cross-region replication

#### Disaster recovery capacity setting

Fabric provides a disaster recovery switch on the capacity settings page. It is available where Azure regional pairings align with Fabric's service presence. Here are the specifics of this switch:

* **Role access**: Only users with the [capacity admin]() role or higher can use this switch.
* **Granularity**: The granularity of the switch is the capacity Level. It is only available for Premium or Fabric capacities.
* **Data scope**: The disaster recovery toggle specifically addresses OneLake data, which includes Lakehouse and Warehouse data. **The switch does not influence customers data stored outside OneLake.**
* **BCDR continuity for Power BI**: While disaster recovery for OneLake data can be toggled on and off, BCDR for Power BI is always supported, regardless of this toggle's state.
* **Frequency**: To maintain stability and prevent constant toggling, once a customer changes the disaster recovery capacity setting, they need to wait 30 days before being able to alter it again.

:::image type="content" source="./media/disaster-recovery-guide/disaster-recovery-capacity-setting.png" alt-text="Screenshot of the Disaster Recovery tenant setting.":::

> [!NOTE]
> After turning on the setting, it can take up to 72 hours for the data to start replicating.

#### Data replication

When Fabric customers turn on the disaster recovery capacity setting, cross-region replication is enabled as a disaster recovery capability for OneLake data. Geo-redundancy storage (GRS) is provisioned as the default storage by the Fabric platform at the capacity level. The Fabric platform aligns with Azure regions to provision the geo-redundancy pairs. However, note that some regions do not have an Azure pair region, or the pair region does not support Fabric. For these regions, GRS is not be available. For more information, see [Regions with availability zones and no region pair](/azure/reliability/cross-region-replication-azure#regions-with-availability-zones-and-no-region-pair/) and [Fabric region availability](../admin/region-availability.md).

> [!NOTE]
> While Fabric offers a data replication solution in OneLake to support disaster recovery, there are notable limitations. For instance, Kusto data is stored externally to OneLake, which means that a separate disaster recovery approach is needed. Please refer to following sections for the details of the disaster recovery approach for each Fabric item.

#### Billing

The disaster recovery feature in Fabric enables geo-replication of your data for enhanced security and reliability. This feature consumes additional storage and transactions, which are billed as BCDR Storage and BCDR Operations respectively. You can monitor and manage these costs in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md), where they appear as separate line items.

For more information about the pricing and consumption rates of disaster recovery, see [OneLake compute and storage consumption](../onelake/onelake-consumption.md). You'll find there an exhaustive breakdown of all associated disaster recovery costs to help you plan and budget accordingly.

## How can I prepare for disaster?

While Fabric provides disaster recovery features to support data resilience, customers **must** follow certain manual steps to maximize data protection during disruptions. This section details the actions and methods customers should take to prepares for potential disruptions.

### Phase 1: Prepare

* **Activate the Disaster Recovery capacity settings**: Regularly review and set the **[Disaster Recovery](#disaster-recovery-capacity-setting)** to make sure they meet your protection and performance needs.

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

:::image type="content" source="./media/disaster-recovery-guide/disaster-recovery-scenario.png" alt-text="Diagram showing a scenario for disaster, failover, and full recovery.":::

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

    :::code language="{language}" source="{source}" range="{range}":::

    The following image shows the synced notebook.

    :::image type="content" source="{source}" alt-text="{alt-text}":::

1. Recover the notebook by ADO repo with simple clicks.

    1. In the newly created workspace, connect to your Azure ADO repo again.

        :::image type="content" source="{source}" alt-text="{alt-text}":::

    1. Click the Source control button. Then click the relevant branch of the repo. Then click update all. The original notebook will appear.
    
        :::image type="content" source="{source}" alt-text="{alt-text}":::

    1. If the original notebook has a default lakehouse, users can refer to the [Lakehouse section](#lakehouse) to recover the lakehouse and then connect the newly recovered lakehouse to the newly recovered notebook.
    
       :::image type="content" source="{source}" alt-text="{alt-text}":::

    1. The Git integration does not support syncing files, folders, or Notebook snapshots in Resources explorer.

        1. If the original notebook has files in Resources explorer.
    
            1. Be sure to save files or folders to a local disk or to some other place.
            1. Re-upload the file from your local disk or cloud drives to the recovered notebook.
        
        1. If the original notebook has Notebook snapshots. also save the notebook snapshots to your own version control system or local disk.
        
            :::image type="content" source="{source}" alt-text="{alt-text}":::
            
            :::image type="content" source="{source}" alt-text="{alt-text}":::

For more information about Git integration, see [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration).

#### Approach 2: Manual approach to backup code content

If you don't take the Git integration approach, you can save the latest version of your code, files in Resources explorer and notebook snapshots in a version control system (e.g., Git) or in an external repository, and manually recover the Notebook content after a disaster:

1. Use the "Import Notebook" feature to import the notebook code you want to recover.

    :::image type="content" source="{source}" alt-text="{alt-text}":::

1. After import, go to your desired workspace (e.g., “C2.W2”) to access it.

1. If the original notebook has a default lakehouse, refer to the [Lakehouse section](#lakehouse). Then connect the newly recovered lakehouse (that has the same content as the original default lakehouse) to the newly recovered notebook.

1. If the original notebook has files or folders in Resources explorer, re-upload the files or folders saved in the user's version control system.

### Spark Job Definition

Spark Job Definition (SJD) items from the primary region remain unavailable to customers, and the main definition file and Reference file in the notebook will be replicated to the secondary region via OneLake. If you want to recover the SJD in the new region, there are two main approaches you call follow. Note that historical runs of SJD will not be recovered.

#### Manual approach to backup code content

You can recover the SJD items by copying the code from the original region by using Azure Storage Explorer and manually reconnecting Lakehouse references after the disaster.

1. Create a new SJD item (e.g., SJD1) in the new workspace C2.W2, with the same settings and configurations as the original SJD item (e.g. language, environment, etc.).

1. Use Azure Storage Explorer to copy Libs, Mains and Snapshots from the original SJD item to the new SJD item.

    :::image type="content" source="{source}" alt-text="{alt-text}":::

1. The code content will appear in the newly created SJD. You'll need to manually add  the newly recovered Lakehouse reference to the job (Refer to the [Lakehouse recovery steps](#lakehouse)). Users will need to re-enter the original command line arguments manually.

    :::image type="content" source="{source}" alt-text="{alt-text}":::

Now you can run or schedule your newly recovered SJD.

For details about Azure Storage Explorer, see [Integrate OneLake with Azure Storage Explorer](../onelake/onelake-azure-storage-explorer.md).

### Data Science 

ML Model and Experiment 

Data Science items from the primary region remain unavailable to customers and the content and metadata in the ML Model/Experiment will not be replicated to the secondary. If customers want to fully recover them in the new region, they will need to save the code content in a version control system (e.g., GIT) or in an external repository and manually rerun the code content after disaster:  

Recover ML model or Experiment in Notebook. Please refer to the Notebook recovery steps. 

Configuration, historically run metrics and metadata will not be replicated to the paired region. You will have to re-run each version of your data science code to fully recover ML model and Experiment after disaster.  

## Next steps

* [Resiliency in Azure](/azure/availability-zones/overview)