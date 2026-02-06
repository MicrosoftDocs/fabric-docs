---
title: Azure HDInsight activity
description: Learn how to transform data by running an Azure HDInsight activity in a pipeline in Data Factory for Microsoft Fabric.
ms.reviewer: xupxhou
ms.topic: how-to
ms.custom: pipelines
ms.date: 06/06/2025
---

# Transform data by running an Azure HDInsight activity

The Azure HDInsight activity in Data Factory for Microsoft Fabric allows you to orchestrate the following Azure HDInsight job types:

- Execute Hive queries
- Invoke a MapReduce program
- Execute Pig queries
- Execute a Spark program
- Execute a Hadoop Stream program

This article provides a step-by-step walkthrough that describes how to create an Azure HDInsight activity using the Data Factory interface.

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- A workspace is created.

## Add an Azure HDInsight (HDI) activity to a pipeline with UI

1. Create a new pipeline in your workspace.
1. Select the **Pipeline activity** card, or select the **Activities** tab, and select Azure HDInsight.

   - Creating the activity from the home screen card:

     :::image type="content" source="media/azure-hdinsight-activity/create-activity-from-home-screen-card.png" lightbox="media/azure-hdinsight-activity/create-activity-from-home-screen-card.png" alt-text="Screenshot showing where to create a new Azure HDInsight activity.":::

   - Creating the activity from the Activities bar:
  
     :::image type="content" source="media/azure-hdinsight-activity/create-activity-from-activities-bar.png" alt-text="Screenshot showing where to create a new Azure HDInsight activity from the Activities bar in the pipeline editor window.":::

1. Select the new Azure HDInsight activity on the pipeline editor canvas if it isn't already selected.

   :::image type="content" source="media/azure-hdinsight-activity/azure-hdinsight-activity.png" alt-text="Screenshot showing the Azure HDInsight activity on the pipeline editor canvas.":::

   Refer to the [General settings](activity-overview.md#general-settings) guidance to configure the options found in the **General settings** tab.

## Configure the HDI cluster

1. Select the **HDI Cluster** tab. Then you can choose an existing or create a new **HDInsight connection**.
1. For the **Resource connection**, choose the Azure Blob Storage that references your Azure HDInsight cluster. You can choose an existing Blob store or create a new one.

   :::image type="content" source="media/azure-hdinsight-activity/hdi-cluster-properties.png" alt-text="Screenshot showing the HDI Cluster properties for the Azure HDInsight activity.":::

## Configure settings

Select the **Settings** tab to see the advanced settings for the activity.

:::image type="content" source="media/azure-hdinsight-activity/settings.png" alt-text="Screenshot showing the Settings tab of the Azure HDInsight activity properties in the pipeline editor window.":::

All advanced cluster properties and dynamic expressions supported in the [Azure Data Factory and Synapse Analytics HDInsight linked service](/azure/data-factory/compute-linked-services#azure-hdinsight-linked-service) are now also supported in the Azure HDInsight activity for Data Factory in Microsoft Fabric, under the **Advanced** section in the UI. These properties all support easy-to-use custom parameterized expressions with dynamic content.

### Cluster type

To configure settings for your HDInsight cluster, first choose its **Type** from the available options, including [_Hive_](#hive), [_Map Reduce_](#map-reduce), [_Pig_](#pig), [_Spark_](#spark), and [_Streaming_](#streaming).

#### Hive

If you choose _Hive_ for **Type**, the activity executes a Hive query. You can optionally specify the **Script connection** referencing a storage account that holds the Hive type. By default, the storage connection you specified in the **HDI Cluster** tab are used. You need to specify the **File path** to be executed on Azure HDInsight. Optionally, you can specify more configurations in the **Advanced** section, **Debug information**, **Query timeout**, **Arguments**, **Parameters**, and **Variables**.

:::image type="content" source="media/azure-hdinsight-activity/hive-cluster-type.png" alt-text="Screenshot showing the cluster type of Hive.":::

#### Map Reduce

If you choose _Map Reduce_ for **Type**, the activity invokes a Map Reduce program. You can optionally specify in the Jar connection referencing a storage account that holds the Map Reduce type. By default, the storage connection you specified in the HDI Cluster tab is used. You need to specify the **Class name** and **File path** to be executed on Azure HDInsight. Optionally you can specify more configuration details, such as importing Jar libraries, debug information, arguments, and parameters under the **Advanced** section.

:::image type="content" source="media/azure-hdinsight-activity/map-reduce-cluster-type.png" alt-text="Screenshot showing the selection of Map Reduce for the HDInsight cluster type.":::

#### Pig

If you choose _Pig_ for **Type**, the activity invokes a Pig query. You can optionally specify the **Script connection** setting that references the storage account that holds the Pig type. By default, the storage connection that you specified in the HDI Cluster tab is used. You need to specify the **File path** to be executed on Azure HDInsight. Optionally you can specify more configurations, such as debug information, arguments, parameters, and variables under the **Advanced** section.

:::image type="content" source="media/azure-hdinsight-activity/pig-cluster-type.png" alt-text="Screenshot showing the selection of the Pig type for the HDInsight cluster.":::

#### Spark

If you choose _Spark_ for **Type**, the activity invokes a Spark program. Select either _Script_ or _Jar_ for the **Spark type**. You can optionally specify the **Job connection** referencing the storage account that holds the Spark type. By default, the storage connection you specified in the HDI Cluster tab is used. You need to specify the **File path** to be executed on Azure HDInsight. Optionally you can specify more configurations, such as class name, proxy user, debug information, arguments, and spark configuration under the Advanced section.

:::image type="content" source="media/azure-hdinsight-activity/spark-cluster-type.png" alt-text="Screenshot showing the selection of the Spark type for the HDInsight cluster.":::

#### Streaming

If you choose _Streaming_ for **Type**, the activity invokes a Streaming program. Specify the **Mapper** and **Reducer** names, and you can optionally specify the **File connection** referencing the storage account that holds the Streaming type. By default, the storage connection that you specified in the HDI Cluster tab is used. You need to specify the **File path for Mapper** and **File path for Reducer** to be executed on Azure HDInsight. Include the **Input** and **Output** options as well for the WASB path. Optionally you can specify more configurations, such as debug information, arguments, and parameters under the Advanced section.

:::image type="content" source="media/azure-hdinsight-activity/streaming-cluster-type.png" alt-text="Screenshot showing the selection of the Streaming type for the HDInsight cluster.":::

### Property reference

| Property        | Description                                                                                                                             | Required |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|----------|
| type            | For Hadoop Streaming Activity, the activity type is HDInsightStreaming                                                                  | Yes      |
| mapper          | Specifies the name of the mapper executable                                                                                             | Yes      |
| reducer         | Specifies the name of the reducer executable                                                                                            | Yes      |
| combiner        | Specifies the name of the combiner executable                                                                                           | No       |
| file connection | Reference to an Azure Storage Linked Service used to store the Mapper, Combiner, and Reducer programs to be executed.                   | No       |
|                 | Only Azure Blob Storage and ADLS Gen2 connections are supported here. If you don't specify this connection, the storage connection defined in the HDInsight connection is used. |          |
| filePath        | Provide an array of path to the Mapper, Combiner, and Reducer programs stored in the Azure Storage referred to by the file connection.         | Yes      |
| input           | Specifies the WASB path to the input file for the Mapper.                                                                               | Yes      |
| output          | Specifies the WASB path to the output file for the Reducer.                                                                             | Yes      |
| getDebugInfo    | Specifies when the log files are copied to the Azure Storage used by HDInsight cluster (or) specified by scriptLinkedService.          | No       |
|                 | Allowed values: None, Always, or Failure. Default value: None.                                                                          |          |
| arguments       | Specifies an array of arguments for a Hadoop job. The arguments are passed as command-line arguments to each task.                       | No       |
| defines         | Specify parameters as key/value pairs for referencing within the Hive script.                                                         | No       |

## Save and run or schedule the pipeline

After you configure any other activities required for your pipeline, switch to the Home tab at the top of the pipeline editor, and select the save button to save your pipeline. Select **Run** to run it directly, or **Schedule** to schedule it. You can also view the run history here or configure other settings.

:::image type="content" source="media/azure-hdinsight-activity/save-run-schedule.png" alt-text="Screenshot showing the Home tab of the pipeline editor, highlighting the Save, Run, and Schedule buttons.":::

## Related content

[How to monitor pipeline runs](monitor-pipeline-runs.md)
