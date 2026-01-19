---
title: Build Event-Driven Pipelines with OneLake events and Azure Blob Storage events
description: Build real-time, event-driven pipelines in Microsoft Fabric using Azure and Fabric events to process data instantly from OneLake or Azure Blob Storage. Learn how to automate workflows.
author: spelluru
ms.author: spelluru
ms.reviewer: george-guirguis
ms.date: 12/18/2025
ms.topic: tutorial
---

# Build event-driven Pipelines with OneLake events and Azure Blob Storage events

Today’s organizations demand real-time responsiveness from their analytics platforms. When data processing relies on scheduled job runs, insights and actions are delayed, and decisions are based on stale data. Whether your data lands in Azure Blob Storage or Fabric OneLake, it should be processed the moment it arrives to ensure timely decisions and continuous data freshness. Fabric events and Azure events make that possible by enabling event-driven data workflows that react in real-time to new data, without manual triggers or schedules.  
 
In this article, you learn how to configure an event-driven pipeline that automatically gets triggered when a new file lands in OneLake or Azure Blob Storage, to ingest and transform the new file. 


## Why event-driven workflows? 

Fabric jobs, like pipelines and notebooks, can be scheduled to run at fixed intervals, but data doesn’t always arrive on a predictable schedule. This mismatch can lead to stale data and delayed insights. Fabric events and Azure events solve this problem by emitting events when a file is created, updated, or deleted in OneLake or Azure blob storage. These events can be consumed by Activator that can trigger Fabric items (for example, pipelines or notebooks) or Power Automate workflows. 

This event-driven workflow enables:

- Faster time-to-insight with real-time data processing
- Reduced cost by eliminating unnecessary job (that is, pipeline or notebook) runs
- Greater automation and responsiveness in your data workflows

## Automatically ingest and process files with an event-driven pipeline

In this tutorial you develop a solution that performs the following operations: 

1. Monitors a folder in OneLake for new CSV files
1. Triggers a Fabric pipeline when a file is created
1. Processes and loads the data into a Lakehouse table, without any manual intervention or a schedule.

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/architecture.png" alt-text="Screenshot of a diagram showing the architecture of the solution." lightbox="media/tutorial-build-event-driven-data-pipelines/architecture.png":::

## Create a lakehouse 

First, Let’s create a lakehouse where you can upload the CSV files and have the resulting table. 

1. Open another web browser tab, sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
1. Select **My workspace** on the left navigation bar.
1. On the workspace page, select **New item**.
1. In the **New item** pane, select **Lakehouse** in the **Store data** section. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/new-lakehouse.png" alt-text="Screenshot of the New item pane with Lakehouse selected." lightbox="media/tutorial-build-event-driven-data-pipelines/new-lakehouse.png":::
1.  In the **New lakehouse** window, enter **TutorialLakehouse** for the **name**, and select **Create** 
1.  Right-click on the **Files** folder, then select **New subfolder** 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/new-sub-folder-menu.png" alt-text="Screenshot of the lakehouse page with the New subfolder menu highlighted." lightbox="media/tutorial-build-event-driven-data-pipelines/new-sub-folder-menu.png":::
1. Name the subfolder **Source** and select **Create** 

## Build your pipeline 

Next, configure a pipeline to ingest, transform, and deliver the data in your Lakehouse. 

1. Open another web browser tab, sign in to [Microsoft Fabric](https://fabric.microsoft.com/) using the same account.
1. Select **My workspace** on the left navigation bar.
1. On the workspace page, select **New item**.
1. In the **New item** pane, select **Pipeline** in the **Get data** section.
1. Name it **TutorialPipeline** and select **Create** 
1. In the Pipeline, select **Pipeline activity**, and then select **Copy data**. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/copy-data-menu.png" alt-text="Screenshot of the Pipeline page with the Copy Pipeline activity." lightbox="media/tutorial-build-event-driven-data-pipelines/copy-data-menu.png":::    
1. **Copy data** with these properties:
   1. In the **General** tab, enter **CSVtoTable** for **Name**.
   
        :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/pipeline-general-tab.png" alt-text="Screenshot of the General tab for the Copy activity." lightbox="media/tutorial-build-event-driven-data-pipelines/pipeline-general-tab.png":::           
   1. In the **Source** tab, do these steps:
      1. For **Connection**, select the **TutorialLakehouse** you created earlier. 
      
        :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/pipeline-source-select-lakehouse.png" alt-text="Screenshot of the Source tab for the Copy activity with TutorialLakehouse selected." lightbox="media/tutorial-build-event-driven-data-pipelines/pipeline-source-select-lakehouse.png":::                   
      1. For **Root folder**, select **Files**. 
      1. For **File path**, select **Source** for the Directory.
      1. For **File format**, select **DelimitedText**.

        :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/pipeline-source-tab.png" alt-text="Screenshot of the Source tab for the Copy activity with all the fields filled." lightbox="media/tutorial-build-event-driven-data-pipelines/pipeline-source-tab.png":::
   1. In the **Destination** tab:
      1. For **Connection**, select **TutorialLakehouse**.
      1. For **Root folder**, select **Tables**.
      1. For **Table**, select **+ New**, and enter **Sales** for the table name.

        :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/pipeline-destination-tab.png" alt-text="Screenshot of the Destination tab for the Copy activity with all the fields filled." lightbox="media/tutorial-build-event-driven-data-pipelines/pipeline-destination-tab.png":::        
   1. In the **Mapping** tab:
      1. Add two mappings:
         1. date -> Date
         1. total -> SalesValue
         
            :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/pipeline-mapping-tab.png" alt-text="Screenshot of the Mapping tab for the Copy activity." lightbox="media/tutorial-build-event-driven-data-pipelines/pipeline-mapping-tab.png":::                    
1. Save the pipeline using **Save** button on the toolbar at the top. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/pipeline.png" alt-text="Screenshot of pipeline editor." lightbox="media/tutorial-build-event-driven-data-pipelines/pipeline.png" :::

## Set up an alert using Fabric Activator

1. Open another web browser tab, and sign in to [Microsoft Fabric](https://fabric.microsoft.com/) using the same account.   
1. On the left navigation var, select **Real-Time**. 
1. In Real-Time hub, select **Fabric Events**.     
1.  Hover over OneLake events to, and select **Set Alert** button (or) select **... (ellipsis)**, and then select **Set alert** to start configuring your alert. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/set-alerts.png" alt-text="Screenshot of the Real-Time hub with Set alert menu option selected for OneLake events." lightbox="media/tutorial-build-event-driven-data-pipelines/set-alerts.png" :::    
1. In the **Set alert** window, for **Source**, choose **Select events**. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/select-events.png" alt-text="Screenshot of the Set alert window." lightbox="media/tutorial-build-event-driven-data-pipelines/select-events.png" :::     
1. In the **Configure connection settings** window, for **Event type**, select **Microsoft.Fabric.OneLake.FileCreated** and **Microsoft.Fabric.OneLake.FileDeleted** events. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/file-created-deleted-events.png" alt-text="Screenshot of the Configure connection settings window with the File Created and File Deleted events selected." lightbox="media/tutorial-build-event-driven-data-pipelines/file-created-deleted-events.png" :::     
1. In the **Select data source for events** section, select **Add a OneLake source**. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/add-onelake-source-button.png" alt-text="Screenshot of the Configure connection settings window with the Add a OneLake source button highlighted." lightbox="media/tutorial-build-event-driven-data-pipelines/add-onelake-source-button.png" :::     
1. In the **OneLake catalog** window, select **TutorialLakehouse**, and then select **Next**. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/select-tutorial-lakehouse.png" alt-text="Screenshot of the OneLake catalog window with the TutorialLakehouse selected." lightbox="media/tutorial-build-event-driven-data-pipelines/select-tutorial-lakehouse.png" :::   
1. On the next page, expand **Files**, select **Source**, and then select **Next**.

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/select-source.png" alt-text="Screenshot of the OneLake catalog window with Source folder selected." lightbox="media/tutorial-build-event-driven-data-pipelines/select-source.png" :::          
1. On the **Configure connection settings** page, select **Next**.
1. On the **Review + connect** page, select **Save**. 
1. Now, in the **Set alert** pane, follow these steps:
    1. For **Action**, select **Run a Fabric item**. 
    1. For **Workspace**, select the workspace where you created the pipeline.
    1. For **Item**, select **TutorialPipeline**. 
    1. In the **Save location** section, select the workspace where you want to create a Fabric activator item with the alert. 
    1. For **Item**, select **Create a new item**.
    1. For **New item name**, enter **TutorialActivator**. 
    1. Select **Create**. 
  
        :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/run-fabric-item.png" alt-text="Screenshot of the Set alert window with Run a fabric item option selected for the action." lightbox="media/tutorial-build-event-driven-data-pipelines/run-fabric-item.png" :::

*This setup ensures your pipeline runs instantly whenever a new file appears in the source folder.*

:::image type="content" source="media/tutorial-build-event-driven-data-pipelines/configure-connection-settings.png" alt-text="Screenshot of the Configure Connection Settings window." lightbox="media/tutorial-build-event-driven-data-pipelines/configure-connection-settings.png":::

## Test the workflow
To test your workflow:

- Upload [this CSV file](https://raw.githubusercontent.com/microsoft/fabric-samples/refs/heads/main/docs-samples/real-time-intelligence/fabric-events/event-driven-pipeline-tutorial/Sales.csv) to the **Source** folder in your **TutorialLakehouse**. Close the **Upload files** pane after you uploaded the file. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/upload-files.png" alt-text="Screenshot of the OneLake page with the Upload files menu selected." lightbox="media/tutorial-build-event-driven-data-pipelines/upload-files.png":::
- A **FileCreated** event is emitted to trigger the **TutorialPipeline** through **TutorialActivator**. 
- After processing, you’ll see the **Sales** table that includes the newly ingested and transformed data ready for use. As it's the first time you dropped a file, give it a few minutes to see the table with data. 

    :::image type="content" source="media/tutorial-build-event-driven-data-pipelines/sales-table-lakehouse.png" alt-text="Screenshot of the Lakehouse with Sales table highlighted." lightbox="media/tutorial-build-event-driven-data-pipelines/sales-table-lakehouse.png":::

*No manual refresh. No waiting for the next scheduled run. Your pipeline runs in real-time.*

The result is  Seamless automation With just a few steps, you built a responsive, event-driven workflow.
Every time data lands in your Lakehouse as a file, it’s automatically ingested, transformed, and ready for downstream analytics. 

While this tutorial focused on OneLake Events, you can achieve the same scenario using Azure Blob Storage events. 

## More use cases for event-driven scenarios 

Beyond the use case we explored, here are more scenarios where you can use **OneLake** and **Azure Blob Storage events** in Microsoft Fabric: 

- Trigger a **Notebook** through **Activator** for advanced data science preprocessing  
- Forward events to **webhook** through **Eventstreams** for custom compliance and data quality scans. 
- Get alerted when critical datasets are modified through **Activator’s Teams and E-mail notifications.** 

## Related content
- [Azure and Fabric events Overview](fabric-events-overview.md)
OneLake Events:
- [Explore Fabric Onelake events](explore-fabric-onelake-events.md)
- [Set alerts on Onelake events](set-alerts-fabric-onelake-events.md)
- [Get Onelake events](create-streams-fabric-onelake-events.md)
Azure Blob Storage events:
- [Explore Azure Blob Storage events](explore-azure-blob-storage-events.md)
- [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md)
- [Get Azure Blob Storage events](get-azure-blob-storage-events.md)