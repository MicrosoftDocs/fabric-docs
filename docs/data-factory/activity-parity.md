---
title: Activity Continuity between Azure Data Factory (ADF) and Data Factory in Fabric
description: This documentation provides an overview of the activity continuity between Azure Data Factory (ADF) and Data Factory in Fabric.
author: lrtoyou1223 
ms.author: lle
ms.topic: how-to 
ms.date: 10/02/2025
ms.custom: pipelines
---

# Activity continuity between Azure Data Factory (ADF) and Data Factory in Fabric

This documentation provides an overview of the activity continuity between Azure Data Factory (ADF) and Data Factory in Fabric. As you plan your data integration and orchestration workflows, it's essential to understand which activities are available on each platform. Data Factory in Fabric aims to offer comprehensive capabilities while maintaining compatibility with ADF.

## Activity comparison

With Data Factory in Microsoft Fabric, we continue to maintain a high degree of continuity with Azure Data Factory. Approximately 90% of activities accessible in ADF are already available under Data Factory in Fabric. Here's a breakdown of the activities and their availability in both ADF and Data Factory in Fabric:

|**Activity**|**ADF**|**Data Factory in Fabric**|
|:---|:---|:---|
|ADX/KQL|Y|Y|
|Append Variable|Y|Y|
|Azure Batch|Y|Y|
|Azure Databricks|Notebook activity<br>Jar activity<br>Python activity<br> Job activity |Azure databricks activity|
|Azure Machine Learning|Y|Y|
|Azure Machine Learning Batch Execution|Deprecated|N/A|
|Azure Machine Learning Update Resource|Deprecated|N/A|
|Copy|Copy data|Copy activity|
|Dataflow Gen2|N/A|Y|
|Delete|Y|Y|
|Execute/Invoke Pipeline|Execute pipeline|Invoke pipeline|
|Fabric Notebooks|N/A|Y|
|Fail|Y|Y|
|Filter|Y|Y|
|For Each|Y|Y|
|Functions|Azure function|Function activity|
|Get Metadata|Y|Y|
|HDInsight|Hive activity<br>Pig activity<br>MapReduce activity<br>Spark activity<br>Streaming activity|HDInsight activity|
|If condition|Y|Y|
|Lookup|Y|Y|
|Mapping Data Flow|Y|Dataflow Gen2|
|Office 365 Outlook|N/A|Y|
|Power Query (ADF only - Wrangling Dataflow)|Deprecated|N/A|
|Script|Y|Y|
|Semantic model refresh|N/A|Y|
|Set Variable|Y|Y|
|Sproc|Y|Y|
|SSIS|Y|N|
|Stored procedure|Y|Y|
|Switch|Y|Y|
|Synapse Notebook and SJD activities|Y|N/A|
|Teams|N/A|Y|
|Until|Y|Y|
|Validation|Y|N|
|Wait|Y|Y|
|Web|Y|Y|
|Webhook|Y|Y|
|Wrangling Data Flow|Y|Dataflow Gen2|

## New activities in Fabric Data Factory

In addition to maintaining activity continuity, Data Factory in Fabric introduces some new activities to meet your richer orchestration needs. These new activities are:

1. **Outlook**: Available in Fabric Data Factory to facilitate integration with Outlook services.
1. **Teams**: Available in Fabric Data Factory to enable orchestration of Microsoft Teams activities.
1. **Semantic model refresh**: Available in Fabric Data Factory to enhance Power BI semantic model refresh capabilities.
1. **Dataflow Gen2**: Available in Fabric Data Factory to empower data orchestration with advanced dataflow capabilities.

## Conclusion

With Data Factory in Fabric, you can confidently transition from Azure Data Factory while maintaining a high degree of activity continuity and benefiting from new capabilities. Refer to this documentation [Activity overview](activity-overview.md) when planning your data integration and orchestration workflows in Fabric Data Factory.
