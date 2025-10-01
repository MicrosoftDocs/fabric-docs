---
title: Activity Continuity between Azure Data Factory (ADF) and Data Factory in Fabric
description: This documentation provides an overview of the activity continuity between Azure Data Factory (ADF) and Data Factory in Fabric.
author: lrtoyou1223 
ms.author: lle
ms.topic: how-to 
ms.date: 12/18/2024
ms.custom: pipelines
---

# Activity continuity between Azure Data Factory (ADF) and Data Factory in Fabric

This documentation provides an overview of the activity continuity between Azure Data Factory (ADF) and Data Factory in Fabric. As you plan your data integration and orchestration workflows, it's essential to understand which activities are available on each platform. Data Factory in Fabric aims to offer comprehensive capabilities while maintaining compatibility with ADF.

## Activity parity overview

With Data Factory in Microsoft Fabric, we continue to maintain a high degree of continuity with Azure Data Factory. Approximately 90% of activities accessible in ADF are already available under Data Factory in Fabric. Here's a breakdown of the activities and their availability in both ADF and Data Factory in Fabric:

|Activity|ADF| Data Factory in Fabric|
|:---|:---|:---|
|Append Variable|Y|Y|
|Copy|Y|Y|
|Delete|Y|Y|
|Execute/Invoke Pipeline|Y|Y|
|Fail|Y|Y|
|Filter|Y|Y|
|For Each|Y|Y|
|GetMetadata|Y|Y|
|If|Y|Y|
|Lookup|Y|Y|
|Script|Y|Y|
|Set Variable|Y|Y|
|Sproc|Y|Y|
|Switch|Y|Y|
|Until|Y|Y|
|Wait|Y|Y|
|Web|Y|Y|
|Webhook|Y|Y|
|Synapse Notebook|Y|Y|
|Azure Function/Functions|Y|Y|
|ADX/KQL|Y|Y|
|Azure Machine Learning|Y|Y|
|Azure Batch|Y|Y|
|Azure Databricks (3 activities in ADF)|Y|Y|
|Validation|Y|N|
|HDInsight (5 activities in ADF)|Y|N|
|SSIS|Y|N|
|Mapping Dataflow|Y|N|
|Dataflow Gen2|N/A|Y|
|Office 365 Outlook|N/A|Y|
|Teams|N/A|Y|
|Semantic model refresh|N/A|Y|
|Azure Machine Learning Batch Execution|Deprecated|N/A|
|Azure Machine Learning Update Resource|Deprecated|N/A|
|Power Query (ADF only - Wrangling Dataflow)|Deprecated|N/A|
|USQL|Deprecated|N/A|

## Activity name comparison

| **ADF Activity** | **Fabric Activity** |
|------------------|--------------------|
| Copy Data | Copy Activity |
| Mapping Data Flow | Dataflow Gen2 |
| Wrangling Data Flow | Dataflow Gen2 |
| Execute Pipeline | Invoke Pipeline |
| Stored Procedure | Stored Procedure |
| Lookup | Lookup |
| ForEach | ForEach |
| If Condition | If Condition |
| Until | Until |
| Web | Web |
| Azure Function | Function Activity |
| Azure Databricks Notebook / Jar / Python / Jobs Activities | Azure Databricks combined activity |
| Synapse Notebook and SJD activities | NA |
| NA | Fabric Notebooks |
| Get Metadata | Get Metadata |
| Delete | Delete |
| Wait | Wait |
| Script | Script |
| HDInsight individual activities (Hive, Pig, MapReduce, Spark, Streaming) | HDInsight single activity |


## New activities in Fabric Data Factory

In addition to maintaining activity continuity, Data Factory in Fabric introduces some new activities to meet your richer orchestration needs. These new activities are:

1. **Outlook**: Available in Fabric Data Factory to facilitate integration with Outlook services.
1. **Teams**: Available in Fabric Data Factory to enable orchestration of Microsoft Teams activities.
1. **Semantic model refresh**: Available in Fabric Data Factory to enhance Power BI semantic model refresh capabilities.
1. **Dataflow Gen2**: Available in Fabric Data Factory to empower data orchestration with advanced dataflow capabilities.

## Conclusion

With Data Factory in Fabric, you can confidently transition from Azure Data Factory while maintaining a high degree of activity continuity and benefiting from new capabilities. Refer to this documentation [Activity overview](activity-overview.md) when planning your data integration and orchestration workflows in Fabric Data Factory.
