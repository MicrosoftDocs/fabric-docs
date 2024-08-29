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

## Fabric data pipeline pricing

Pricing for data pipelines in Microsoft Fabric is calculated based on several metric:

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

## Costs for Azure Data Factory Dataflow Gen1 equivalent activities

Read/write operations for Azure Data Factory entities include create, read, update, and delete. Entities include datasets, linked services, pipelines, integration runtime, and triggers. Monitoring operations include get and list for pipeline, activity, trigger, and debug runs. The following table shows these costs:

| Type          | Price                           | Examples                                      |
|---------------|---------------------------------|-----------------------------------------------|
| Read/Write*   | $0.50 per 50,000 modified/referenced entities | Read/write of entities in Azure Data Factory |
| Monitoring    | $0.25 per 50,000 run records retrieved        | Monitoring of pipeline, activity, trigger, and debug runs |

