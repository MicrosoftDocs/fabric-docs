---
title: Cost estimation for Fabric pipelines based on Dataflow Gen1 equivalent activities in Azure Data Factory
description: This article guides you through estimation of costs for pipelines in Data Factory for Microsoft Fabric compared to their equivalent activities in an Azure Data Factory Dataflow Gen1.
author: ssabat
ms.author: susabat
ms.topic: concept-article
ms.date: 08/29/2024
---

# Cost estimation for Fabric pipelines based on Dataflow Gen1 equivalent activities in Azure Data Factory

[Azure Data Factory (ADF) billing](https://azure.microsoft.com/en-us/pricing/details/data-factory/data-pipeline/) is already understood to many existing ADF users using Dataflow Gen1 activities, who are interested to explore pipelines for Data Factory in Microsoft Fabric. Pipelines are control flows of discrete activities. You pay for data pipeline orchestration by activity run and activity execution by integration runtime hours. The integration runtime, which is serverless in Azure and self-hosted in hybrid scenarios, provides the compute resources used to execute the activities in a pipeline. Integration runtime charges are prorated by the minute and rounded up. For example, the Azure Data Factory Copy activity can move data across various data stores in a secure, reliable, performant, and scalable way.

## Azure Data Factory data pipeline pricing

Pricing for data pipelines in Azure Data Factory is calculated based on several metrics:

- Pipeline orchestration and execution
- Data flow execution and debugging
- Number of Data Factory operations, such as creating and monitoring pipelines

Below is a breakdown of the costs:

| Type                        | Azure Integration Runtime Price | Azure Managed VNET Integration Runtime Price | Self-Hosted Integration Runtime Price |
|-----------------------------|---------------------------------|---------------------------------------------|---------------------------------------|
| Orchestration (activity runs, trigger executions, and debug runs)              | $1 per 1,000 runs               | $1 per 1,000 runs                           | $1.50 per 1,000 runs                   |
| Data movement activity     | $0.25/DIU-hour                  | $0.25/DIU-hour                              | $0.10/hour                            |
| Pipeline Activity          | $0.005/hour                     | $1/hour                                     |                                       |
| (Up to 50 concurrent pipeline activities) | $0.002/hour            |                                             |                                       |
| External Pipeline Activity | $0.00025/hour                   | $1/hour                                     |                                       |
| (Up to 800 concurrent pipeline activities) | $0.0001/hour            |                                             |                                       |

There are a few additional details to consider regarding data pipeline costs:

- Use of the data movement Copy activity to move data out of an Azure data center incurs additional network bandwidth charges, which appear as a separate outbound data transfer line item on your bill.
- Pipeline activities execute on the integration runtime. Pipeline activities include Lookup, Get Metadata, Delete, and schema operations during authoring (test connection, browse folder list and table list, get schema, and preview data).
- External pipeline activities are managed on the integration runtime but execute on linked services. External activities include the Databricks, Stored Procedure, HDInsight activities, and many more.

## Azure Data Factory Dataflow Gen1 activity pricing

Read/write operations for Azure Data Factory entities include create, read, update, and delete. Entities include datasets, linked services, pipelines, integration runtime, and triggers. Monitoring operations include get and list for pipeline, activity, trigger, and debug runs. The following table shows these costs:

| Type          | Price                           | Examples                                      |
|---------------|---------------------------------|-----------------------------------------------|
| Read/Write*   | $0.50 per 50,000 modified/referenced entities | Read/write of entities in Azure Data Factory |
| Monitoring    | $0.25 per 50,000 run records retrieved        | Monitoring of pipeline, activity, trigger, and debug runs |

## Fabric pipeline cost estimation

In Fabric, the pricing model for pipelines works as follows:

| Metric                    | Data movement operation       | Activity run operation       |
|---------------------------|-------------------------------|------------------------------|
| Duration in seconds       | t in seconds                  | N/A                          |
| CU seconds                | x CU seconds                  | y CU seconds                 |
| Effective CU-hour         | x CU seconds / (60*60) = X CU-hour | y CU seconds / (60*60) = Y CU-hour |

**Total cost** (X + Y CU-hour) * (Fabric capacity per unit price)

You can find duration and capacity unitsin the Fabric Metric App report for your capacity.

## Fabric Data Flow Gen 1 pricing

Data flow Gen 1 is currently priced with Power BI premium per user (PPU) or premium capacity on second consumption normalized to an hour. The capacity is deducted from your overall capacity allocated to the tenant. Capacity can be configured to support any data flows or paginated reports, with each requiring a configurable maxsimum percentage of memory. The memory is dynamically allocated to your data flows.

FP64/P1 capacity provides a total of 8 PBI vcores and 64 capacity units. Capacity units get deducted as data flows consume CPU and memory. In Fabric, high scale compute is accounted for reducing total capacity if you have Lakehouse and warehouse as sources and destinations with staging enabled.

## Data Factory Data Flow Gen 2 pricing

In Fabric the pricing model for Data Flow Gen 2 works as follows:

| Metric                    | Standard Compute       | High Scale Compute       |
|---------------------------|------------------------|--------------------------|
| Total CUs                 | s CU seconds           | h CU seconds             |
| Effective CU-hours billed | s / (60*60) = S CU-hour| h / (60*60) = H CU-hour  |

You can find Duration and Capacity units from Fabric Matric App report for your capacity.

**Total refresh cost** = (S + H CU-hour) * (Fabric capacity per unit price)

## Converting Azure Data Factory cost estimations to Fabric

While data flow Gen 2 pricing is like Gen 1 pricing, Fabric pipelines take a different approach than Azure Data Factory. In Fabric, we do not price external pipeline activities. The following table summarizes the conversion of Azure Data Factory costs to Fabric costs:

| ADF Meter                             | Revenue   | Billed hours | ADF price | Fabric CU multiplier | Fabric CU hour | Fabric price | Fabric cost   |
|---------------------------------------|-----------|--------------|-----------|----------------------|----------------|--------------|---------------|
| Self-Hosted Data Movement             | 1688.1    | 16881        | 0.1       | 6                    | 101286         | 0.18         | 18231.48      |
| Self-Hosted External Pipeline Activity| 10.0994   | 100994       | 0.0001    |                      |                |              |               |
| Self-Hosted Orchestration Activity Run| 2005.5    | 1337         | 1.5       | 0.0056               | 7.4872         | 0.18         | 1.347696      |
| Self-Hosted Pipeline Activity         | 215.982   | 107991       | 0.002     | 0.0056               | 604.7496       | 0.18         | 108.854928    |
| Cloud Data Movement                   | 3.25      | 13           | 0.25      | 1.5                  | 19.5           | 0.18         | 3.51          |
| Cloud External Pipeline Activity      | 0.63125   | 2525         | 0.00025   |                      |                |              |               |
| Cloud Orchestration Activity Run      | 1678      | 1678         | 1         | 0.0056               | 9.3968         | 0.18         | 1.691424      |
| Cloud Pipeline Activity               | 34.275    | 6855         | 0.005     | 0.0056               | 38.388         | 0.18         | 6.90984       |
| Azure Managed VNET Data Movement      | 86.75     | 347          | 0.25      | 1.5                  | 520.5          | 0.18         | 93.69         |
| Azure Managed VNET External Pipeline Activity| 7160 | 7160         | 1         |                      |                |              |               |
| Azure Managed VNET Orchestration Activity Run| 37 | 37           | 1         | 0.0056               | 0.2072         | 0.18         | 0.037296      |
| Azure Managed VNET Pipeline Activity  | 1008      | 1008         | 1         | 0.0056               | 5.6448         | 0.18         | 1.016064      |
| **Total Revenue/Billed hours**        | **13927.588** | **246826** |           |                      | **102491.8736**|              | **18448.53725**|

The following table summarizes Fabric pricing for Data Factory Data Flows Gen 2:

| Dataflow Gen2 Engine Type       | Consumption Meters                                                                 | Fabric CU consumption rate | Consumption reporting granularity |
|---------------------------------|-------------------------------------------------------------------------------------|----------------------------|-----------------------------------|
| Standard Compute                | Based on each mashup engine query execution duration in seconds.                    | 16 CUs per hour            | Per Dataflow Gen2 item            |
| High Scale Dataflows Compute    | Based on Lakehouse/Warehouse SQL engine execution (with staging enabled) duration in seconds. | 6 CUs per hour             | Per Workspace                     |

## Making a Fabric cost estimation for Data Factory

By now, you have enough information on how legacy Azure Data Factory and Data Factory Gen 1 are metered and billed. The prior tables showed how you can take current meter data and convert to Fabric Data Factory pipeline and Data Flows Gen 2 costs to Fabric.

Here we describe the steps to estimate costs for each artifact.

- For Data Flows Gen 1, obtain the past data flow Gen 1 capacity cost from the PowerBI Metric app. Then, recalculate capacity hours for the same number of refreshes in Data Flows Gen2 as shown in the previous table. 

  On the Admin Portal's **Capacity settings**, select **See usage report**:

  :::image type="content" source="media/cost-estimation-from-azure-data-factory-to-fabric-pipeline/power-bi-capacity-usage.png" alt-text="Screenshot showing the capacity usage reported for Power BI in the Admin Portal.":::

  From there, you can find the details of the capacity usage.

  :::image type="content" source="media/cost-estimation-from-azure-data-factory-to-fabric-pipeline/power-bi-capacity-usage-report.png" alt-text="Screenshot showing the details of the capacity usage report for Power BI.":::

2. For Azure Data Factory you cab get all meter data from your current ADF subscription. Build out a table and  plugin the values for customers. Create the table as shown in the case of the sample table. Like Data Flows Gen 1, you can get pipeline Capacity Units for pipelines in Fabric Matric App. Given ADF cost, calculate Fabric cost for pay-as-you-go. You can interpolate it to one year to get discounted pricing.

  > [!NOTE]
  > In case of mapping data flow uses, we assume you will use Spark notebook or Data Flows Gen2. If you are using a Spark notebook, that is a cost you can estimate with the Data Engineering guidelines.

## Related content

- [Microsoft Fabric cost estimation](https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/)