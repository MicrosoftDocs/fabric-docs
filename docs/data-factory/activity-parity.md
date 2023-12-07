---
title: Activity Parity between Azure Data Factory (ADF) and Fabric Data Factory
description: This documentation provides an overview of the activity parity between Azure Data Factory (ADF) and Fabric Data Factory.
author: Leo Li 
ms.author: Leo Li 
ms.topic: how-to (need confirm content)
ms.date: 12/07/2023
ms.custom: template-how-to, build-2023 (need confirm content)
---

# Activity Parity between Azure Data Factory (ADF) and Fabric Data Factory

This documentation provides an overview of the activity parity between Azure Data Factory (ADF) and Fabric Data Factory. As you plan your data integration and orchestration workflows, it's essential to understand which activities are available on each platform. Fabric Data Factory aims to offer comprehensive capabilities while maintaining compatibility with ADF. Below, you'll find a detailed comparison of the Y activities on both platforms.

## Activity Parity Overview

In Fabric Data Factory, we have strived to achieve a high level of parity with Azure Data Factory. Effective Fabric GA, you can anticipate that around 90% of activities available in ADF to be available in Fabric Data Factory. Here is a breakdown of the activities and their availability in both ADF and Fabric Data Factory:

|Activity|ADF|Fabric Data Factory|
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
|Azure Function|Y|Y|
|ADX/KQL|Y|Y|
|Azure ML|Y|Y|
|Azure Batch|Y|Y|
|Azure Databricks (3 activities in ADF)|Y|N|
|Validation|Y|N|
|HDInsight (5 activities in ADF)|Y|N|
|SSIS|Y|N|
|Mapping Dataflow|Y|N|
|Dataflow Gen2|N/A|Y|
|Office 365 Outlook|N/A|Y|
|Teams|N/A|Y|
|Dataset Refresh|N/A|N|
|Azure ML Batch Execution|Deprecated|N/A|
|Azure ML Update Resource|Deprecated|N/A|
|Power Query (ADF only - Wrangling Dataflow)|Deprecated|N/A|
|USQL|Deprecated|N/A|

## New Activities in Fabric Data Factory

In addition to maintaining activity parity, Fabric Data Factory introduces some new activities to meet your richer orchestration needs. These new activities are:

1. **Outlook**: Available in Fabric Data Factory to facilitate integration with Outlook services.
1. **Teams**: Available in Fabric Data Factory to enable orchestration of Microsoft Teams activities.
1. **Dataset Refresh**: In progress in Fabric Data Factory to enhance dataset refresh capabilities.
1. **Dataflow Gen2**: Available in Fabric Data Factory to empower data orchestration with advanced dataflow capabilities.

## Conclusion

With Fabric Data Factory, you can confidently transition from Azure Data Factory while maintaining a high degree of activity parity and benefiting from new capabilities. Please refer to this documentation [Activity overview](activity-overview.md) when planning your data integration and orchestration workflows in Fabric Data Factory.
