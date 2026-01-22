---
title: Scenario for the Fabric SKU Estimator (preview)
description: Follow a multipart scenario for using the Microsoft Fabric SKU Estimator to estimate the SKU needed for various workloads.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.date: 05/05/2025
---

# Scenario for the Fabric SKU Estimator (preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The [Microsoft Fabric SKU Estimator](fabric-sku-estimator.md) is a powerful tool designed to help organizations estimate the appropriate stock-keeping units (SKUs) for their workloads. With this tool, businesses can plan and budget effectively for their analytics and data platform needs. Get started with the [Fabric SKU Estimator](https://aka.ms/FabricSKUEstimator).

In this article, we explore a real-world scenario that demonstrates how the Fabric SKU Estimator might be used. This multipart scenario highlights the tool's versatility in addressing diverse requirements, from modernizing analytics platforms to supporting data science migrations and enabling API-driven insights.

## Scenario details: Contoso Manufacturing

Let's take a look at a fictional company, Contoso Manufacturing. Contoso is a global leader in industrial and consumer manufacturing, known for its innovative solutions and commitment to sustainability. The company specializes in producing high-quality goods across industries such as automotive, electronics, and healthcare. Headquartered in the United Kingdom, Contoso operates a worldwide network of facilities and offices, ensuring seamless global operations and customer support.

Henri Marquis is a solutions architect at Contoso who is tasked with estimating the SKU needed for the company's workloads. Henri uses the Fabric SKU Estimator to save time and provide the most accurate estimates possible.

### Current solution metrics

- **Source systems**: 50, batch processed twice daily
- **Entities and tables**: 1,500 in extract-transform-load (ETL) pipelines
- **Data storage**: 50 TB estimated over five years
- **IoT sensors**: 4,000, sending telemetry every 10 seconds (600 bytes per message)
- **Plant workers**: 10,000, generating eight data points per worker daily
- **Power BI users**: 1,300 daily dashboard and report users, 150 report authors
- **Semantic model size**: 25 GB (maximum)

## Scenario part 1: Create an AI-ready analytics platform

Contoso aims to modernize its enterprise analytics platform and corporate reporting solution to create an AI-ready analytics platform. This platform provides data-driven insights to support operations, maximize efficiency, and enhance productivity.

After a few discoveries and design workshop, Henri has come up with the following high-level architecture:

:::image type="content" source="media/fabric-sku-estimator/high-level-architecture.png" alt-text="High-level architecture diagram for the Fabric SKU Estimator scenario." lightbox="media/fabric-sku-estimator/high-level-architecture.png":::

To begin his budget estimation proposal, Henri decides to use the Fabric SKU Estimator. To get started, he first needs to extract the required high-level inputs and work load specific inputs based on these high-level metrics. He calculates that the total of the data in the architecture will be approximately 8,533 GB, based on an estimated 6:1 compression ratio. Henri deduces that the platform will have two batch cycles processing 1,500 tables and data sets across all 50 source systems.

He enters these values in the **Data information** section of the Fabric SKU Estimator:

- **Total size of the data when compressed (GiB)**: 8,533
- **Number of daily batch cycles**: 2
- **Number of tables across all data sources**: 1,500

Next, Henri selects all workloads that need to be included in the estimate: *Data Factory*, *Spark Jobs*, *Power BI*, *Eventstream*, *Eventhouse*, and *Data Activator*.

:::image type="content" source="media/fabric-sku-estimator/fabric-workload-selections-part-1.png" alt-text="Screenshot showing workload selections in the Fabric SKU Estimator." lightbox="media/fabric-sku-estimator/fabric-workload-selections-part-1.png":::

He then specifies the workload-specific inputs:

- **Data Factory**
  - Number of hours for daily Dataflow Gen2 ETL operations: 0
- **Power BI**
  - Number of daily Power BI report viewers: 1,300
  - Number of individuals creating Power BI reports daily: 150
  - Power BI model size (GB): 25
- **Eventstream**
  - Daily event ingestion (GB): 19
  - Number of eventstreams: 1
  - Total number of destinations: 5
  - Eventstream source connectors: 0
- **Activator**
  - Number of daily ingested events: 80,000
  - Number of alert rules used: 5
- **Eventhouse**
  - Daily telemetry data (GB): 14
  - Hot data (days): 30
  - Retention days: 90
  - Duty cycle (hours): 24

Finally, Henri selects the **Calculate** button and gets the following result:

:::image type="content" source="media/fabric-sku-estimator/scenario-1-estimation.png" alt-text="Screenshot showing detailed estimation results for Scenario 1 using the Fabric SKU Estimator." lightbox="media/fabric-sku-estimator/scenario-1-estimation.png":::

The estimator provides a viable SKU, workload breakdown, storage consumption, and Power BI Pro license requirements. Henri inputs the results into the [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/) to generate an estimate for his proposal.

## Scenario part 2: Migrate more workloads to Microsoft Fabric

The Contoso data science team wants to migrate its workloads from Azure Synapse Analytics to Microsoft Fabric. The current platform includes:

- **Dedicated SQL pool**: DWU2500c SKU with 2 TB of data
- **Source tables**: 300 daily
- **Data scientists**: 20, operating 15 predictive models
- **Daily model training jobs**: 3

Henri has to add this information to the estimate. Because there's a decade of business logic tied up in the Synapse dedicated SQL pool, he needs to make sure the data science team minimizes risk to the business. To preserve existing business logic and minimize risk in outcomes, Henri opts for a lift-and-shift approach.

He adjusts the values in the **Data information** section of the Fabric SKU Estimator:

- **Total size of the data when compressed (GiB)**: 10,581
- **Number of daily batch cycles**: 2
- **Number of tables across all data sources**: 1,650

Next, he selects the workloads he needs to add to the previous estimate: *Data Warehouse* and *Data Science*.

:::image type="content" source="media/fabric-sku-estimator/fabric-workload-selections-part-2.png" alt-text="Screenshot showing workload selections in the Fabric SKU Estimator for part 2 of the scenario." lightbox="media/fabric-sku-estimator/fabric-workload-selections-part-2.png":::

He then specifies the workload-specific inputs:

- **Data Warehouse**
  - Selects **Use migrate to Fabric experience** option
  - Synapse SQL dedicated pool size: DWU2500c
- **Data Science**
  - Number of data scientists: 20
  - Number of daily model training jobs: 3

Finally, he selects the **Calculate** button and gets the following result:

:::image type="content" source="media/fabric-sku-estimator/scenario-2-estimation.png" alt-text="Screenshot showing detailed estimation results for Scenario 2 using the Fabric SKU Estimator." lightbox="media/fabric-sku-estimator/scenario-2-estimation.png":::

The estimator provides a viable SKU, workload breakdown, storage consumption, and Power BI Pro license requirements. Henri now has enough information to amend his previous estimate.

## Scenario part 3: Increase capacity to include customer and partner data APIs

Contoso asks Henri to include capacity for customer and partner data APIs, along with the following support:

- **API sessions**: 500 daily
- **Ad-hoc SQL Analytics users**: 200 daily
- **Embedded Power BI sessions**: 800 daily

Without changing the values in the **Data information** section of the Fabric SKU Estimator, Henri selects the extra workloads that need to be included in his estimate: *Ad-hoc SQL Analytics* and *Power BI Embedded*.

:::image type="content" source="media/fabric-sku-estimator/fabric-workload-selections-part-3.png" alt-text="Screenshot showing workload selections in the Fabric SKU Estimator for part 3 of the scenario." lightbox="media/fabric-sku-estimator/fabric-workload-selections-part-3.png":::

He then specifies the workload-specific inputs:

- **Ad-hoc SQL Analytics**
  - Number of SQL Analytics users: 500
- **Power BI Embedded**
  - Daily Power BI Embedded report viewers: 800

Finally, he selects the **Calculate** button and gets the following result:

:::image type="content" source="media/fabric-sku-estimator/scenario-3-estimation.png" alt-text="Screenshot showing detailed estimation results for Scenario 3 using the Fabric SKU Estimator." lightbox="media/fabric-sku-estimator/scenario-3-estimation.png":::

Henri reviews the results to be sure his final estimate includes all workloads and is ready for submission.

## Summary

The [Microsoft Fabric SKU Estimator](https://aka.ms/FabricSKUEstimator) helped Henri simplify complex estimation tasks quickly, so he could provide Contoso with a standardized framework built on best practices and real-world telemetry. With Henri's detailed and accurate proposal, Contoso can efficiently plan and budget for its modernized analytics platform.

## Related content

- [Overview of the Fabric SKU Estimator](fabric-sku-estimator.md)
- [Microsoft Fabric capacity quotas](fabric-quotas.md)
- [Fabric trial capacity](../fundamentals/fabric-trial.md)
