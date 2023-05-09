---
title: Compare differences between Azure Data Factory and Data Factory in Microsoft Fabric 
description: This article provides information about compare differences between Azure Data Factory and Data Factory in Microsoft Fabric 
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to
---

# Compare differences between Azure Data Factory and Data Factory in Microsoft Fabric

## Overview

Data Factory in Microsoft Fabric is the next generation of Azure Data Factory which provides cloud-scale data movement and data transformation services that allow you to solve the most complex ETL scenarios. It's intended to make your experience easy to use, powerful, and truly enterprise-grade.

In the modern experience of Data Factory in Fabric, there are some different features concepts compared to Azure Data Factory. Detail features mapping are presented as the table below.

## Feature Mapping

|Azure Data Factory |Data Factory in Fabric |Description  |
|:---|:---|:---|
|Pipeline |Data pipeline (Preview) | Data pipeline in Fabric is better integrated with the unified data platform including Lakehouse, Datawarehouse, etc.. |
|Mapping dataflow  |Dataflow gen2 (Preview) | Dataflow gen2 provides easier experience to build transformation. We are in progress of ensuring the function of mapping dataflow supported in dataflow gen2 .|
|Activities |Activities|We are in progress to make more activities of ADF supported in Data Factory in Fabric. Data Factory in Fabric also has some newly attracted activities like Office 365 Outlook activity. Details are in Activity overview of the documents.|
|Dataset |Datasets are inline|Data Factory in Fabric doesn’t have dataset concepts. Connection will be used for connecting each data source and pull data. |
|Linked Service |Connections |Connections have similar functionality as linked service, but connections in Fabric have more intuitive way to create. |
|Triggers |Schedules (Tumbling window trigger, and Event-based trigger) |Pipeline in Fabric supports to use schedule to set automatically running time. We are adding more triggers that are available in ADF.  |
|Publish |Save, Run |For pipeline in Fabric, you don’t need to publish to save the content. Instead, you can use Save button to save the content directly. When you click Run button, it will save the content if content hasn’t been saved yet. |
|Autoresolve and Azure Integration runtime |Not Applicable (only gateways - coming soon) |In Fabric, we don’t have the concept of Integration runtime. The gateway in Fabric plays a similar role with Integration runtime. |
|Self-hosted integration runtimes |On-premises Data Gateway |The capability in Fabric is still in progress of design. |
|Azure-SSIS integration runtimes |Not Applicable (only gateways - TBD) |The capability in Fabric hasn’t confirmed the roadmap and design. |
|MVNet and Private End Point |VNet Gateway |The capability in Fabric is still in progress of design.|
|Expression language |Expression language |Expression language is similar in ADF and Fabric. |
|Authentication type in linked service |Authentication kind in connection |Authentication kind in Fabric pipeline already supported popular authentication types in ADF, and more authentication kinds will be added. |
|CI/CD |CI/CD |CI/CD capability in Fabric Data Factory will be coming soon. |
|Export and Import ARM |Save as |Save as is available in Fabric pipeline to duplicate a pipeline. |
|Monitoring |Monitoring, Run history |The monitoring hub in Fabric has more advanced functions and modern experience like monitoring across different workspaces for better insights. |

## Data Pipeline of Data Factory in Microsoft Fabric

There are many exciting features of data pipeline in Data Factory of Microsoft Fabric. Leveraging these features, you can feel the power of pipeline in Fabric.  

### Lakehouse/Datawarehouse integration

Lakehouse and Data Warehouse are available as source and destination in Pipeline of Fabric, so it’s extremely convenient for you to build your own projects integrated with Lakehouse and Datawarehouse.

   :::image type="content" source="media/connector-differences/source.png" alt-text="Screenshot showing lakehouse and data warehouse source tab":::

   :::image type="content" source="media/connector-differences/destination.png" alt-text="Screenshot showing lakehouse and data warehouse destination tab":::

### Office 365 Outlook Activity

Office 365 outlook activity provides an intuitive and simple way to send customize email notification about info of pipeline and activity, and output of pipeline by easy configuration.

:::image type="content" source="media/connector-differences/0ffice-365-run.png" alt-text="Screenshot showing that office 365 outlook activity.":::

### Get Data experience

A modern and easy Get Data experience is provided in Data Factory in Fabric, so it’s super-fast for you to set up your copy pipeline and create a new connection.

:::image type="content" source="media/connector-differences/copy-data-source.png" alt-text="Screenshot showing that A modern and easy Get Data experience.":::

:::image type="content" source="media/connector-differences/create-new-connection.png" alt-text="Screenshot showing that how to create a new connection.":::

### Modern Monitoring Experience

With the combined capabilities of the monitoring hub and the artifacts of Data Factory, such as data flows and data pipelines, we can get a full view of all the workloads and drill into any activity within a data factory artifact. It’s also convenient for you to do the cross-workspace analysis through monitoring hub.

:::image type="content" source="./media/connector-differences/monitoring-hub.png" alt-text="Screenshot showing the monitoring hub and the artifacts of Data Factory.":::

The pipeline copy monitoring results provides breakdown detail of copy activity. By selecting the run details button (with the **glasses icon** highlighted) to view the run details. Expand the **Duration breakdown**, you can know the time duration of each stage in copy activity.

:::image type="content" source="./media/connector-differences/details-of-copy-activity.png" alt-text="Screenshot showing the pipeline copy monitoring results provides breakdown detail of copy activity.":::

:::image type="content" source="./media/connector-differences/duration-breakdown.png" alt-text="Screenshot showing copy data details.":::

### Save as

Save as in Fabric pipeline provides a convenient way for you to duplicate an existing pipeline for other development purposes.

:::image type="content" source="./media/connector-differences/save-as-button.png" alt-text="Screenshot showing save as in Fabric pipeline.":::

## Next steps

- [Compare Dataflow Gen1 and Dataflow Gen2](dataflows-gen2-overview.md)

- [Build your first data integration](transform-data.md)