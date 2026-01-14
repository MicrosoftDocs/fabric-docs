---
title: What is the Fabric SKU Estimator (preview)?
description: Learn about the Microsoft Fabric SKU Estimator, a tool that helps you estimate the SKU needed for your workloads.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.date: 05/05/2025
---

# What is the Fabric SKU Estimator (preview)?

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

The Microsoft Fabric SKU Estimator helps you figure out the right resources for your workloads. It analyzes your data size, processing needs, and other factors to recommend the best SKU for your business. The Fabric SKU Estimator is a web-based calculator that recommends the appropriate capacity for your workloads based on your inputs. It simplifies planning by analyzing your data size, processing needs, and workload demands to protect you from overcommitting and underprovisioning.

## Use the Fabric SKU Estimator

To get started using the Fabric SKU Estimator, follow these steps:

1. Go to the [Microsoft Fabric SKU Estimator](https://aka.ms/fabricskuestimator).
1. Enter details about your workloads, such as:
    - Compressed data size (in GiB)
    - Number of daily batch cycles
    - Number of tables in your data sources
1. Select the workloads and features you plan to use.
1. Input any other information related to your workload selections, if prompted.
1. Select **Calculate**.

The tool provides an **estimated viable SKU** and a breakdown of resources.

:::image type="content" source="media/fabric-sku-estimator/fabric-sku-estimator.jpeg" alt-text="Screenshot showing the Fabric SKU Estimator." lightbox="media/fabric-sku-estimator/fabric-sku-estimator.jpeg":::

## Supported workloads and benefits of the Fabric SKU Estimator

The Fabric SKU Estimator supports various workloads, including:

- **Data engineering**: Process and transform data with Apache Spark.
- **Data factory**: Move and transform data with low-code tools.
- **Data warehouse**: Perform analytics with high-speed architecture.
- **Data science**: Train and deploy AI and machine learning models.
- **OneLake**: Use a managed SaaS data lake for big data workloads.
- **Power BI and Power BI Embedded**: Create interactive dashboards and reports.
- **Real-time intelligence**: Process data with low latency.
- **Fabric databases**: Manage data with scalable, unified tools.

Here are some of the benefits of the Fabric SKU Estimator:

- **Accurate recommendations**: Get precise capacity suggestions.
- **Easy to use**: Navigate with a simple interface.
- **Custom inputs**: Adjust variables like data size and ingestion rates.
- **Scalability**: Plan for future growth.
- **Power BI insights**: Compare licensing options.
- **Detailed workload breakdown**: Understand resource needs for each workload.

The Fabric SKU Estimator helps you plan effectively, save costs, and ensure your workloads run smoothly. For detailed examples of how to use the estimator, see [Scenario for the Fabric SKU Estimator](fabric-sku-estimator-scenario.md).

## Related content

- [Scenario for the Fabric SKU Estimator](fabric-sku-estimator-scenario.md)
- [Microsoft Fabric capacity quotas](fabric-quotas.md)
- [Fabric trial capacity](../fundamentals/fabric-trial.md)
