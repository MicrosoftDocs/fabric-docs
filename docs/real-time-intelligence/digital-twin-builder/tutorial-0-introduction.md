---
title: Digital twin builder (preview) tutorial introduction
description: Get started with digital twin builder (preview) with this tutorial covering major actions and features.
author: baanders
ms.author: baanders
ms.date: 05/01/2025
ms.topic: tutorial
---

# Digital twin builder (preview) tutorial: Introduction

Digital twin builder (preview) is a [Microsoft Fabric](../../fundamentals/microsoft-fabric-overview.md) item for building comprehensive operational analytics scenarios for physical operations. Digital twin builder's low-code/no code experience allows businesses to connect to disparate data sources through Fabric and Azure IoT Operations; build comprehensive digital twins; and generate insights without the need for highly technical specialized skilling. With digital twin builder, operations staff can explore twins based on their relationships and perform time-series analytics, all within Microsoft Fabric's all-in-one analytic platform. Customers can then use insights from these experiences for driving operational improvements such as reducing waste, improving yield, enhancing safety, and achieving sustainability targets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This tutorial walks you through building a scenario ontology in digital twin builder for the fictional company Contoso Energy. It focuses on digital twin builder's capabilities for modeling and contextualizing data from multiple sources, and finishes with a Power BI dashboard to visualize the data.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* Digital twin builder (preview) enabled on your tenant.
    - [Fabric administrators](../../admin/roles.md) can grant access to digital twin builder in the [admin portal](../../admin/admin-center.md). In the [tenant settings](../../admin/tenant-settings-index.md), enable *Digital Twin Builder (preview).*

        :::image type="content" source="media/tutorial/prereq-tenant-setting.png" alt-text="Screenshot of enabling digital twin builder in the admin portal.":::

    - The tenant can't have [Autoscale Billing for Spark](../../data-engineering/autoscale-billing-for-spark-overview.md) enabled, as digital twin builder isn't compatible with it. This setting is also managed in the [admin portal](../../admin/admin-center.md). 
* The latest Power BI desktop app on your machine (step 5 of the tutorial requires use of the desktop app, **not** the Power BI service in Fabric). You can get it here: [Download Power BI](https://www.microsoft.com/power-platform/products/power-bi/downloads?msockid=2612a5667524602e3f9bb50b74976110). 

## Understand the Contoso Energy scenario

This tutorial features the fictional company Contoso Energy.

Contoso Energy is a leading energy company that is committed to producing bioethanol, a sustainable and renewable nonfossil fuel product. To achieve their goals of improving efficiency, reducing energy consumption, and ensuring product quality, Contoso Energy decides to implement a solution using digital twin builder (preview) across their distillation sites.

Contoso Energy faces several challenges in their current distillation processes:
* **Efficiency:** The existing distillation units aren't optimized, which leads to longer processing times and higher operational costs.
* **Energy consumption:** The energy required to maintain the distillation process is substantial, impacting the company's sustainability goals.
* **Product quality:** It's challenging to ensure consistent product quality across different sites, due to variations in process parameters.

To mitigate these challenges, Contoso Energy needs to:
* Collect data and metadata from multiple sources, including sensors, control systems, and laboratory information management systems. This comprehensive data collection enables a holistic view of the distillation process.
* Relate assets by creating semantic context to represent large processes and asset details. This semantic context helps in understanding the relationships between different assets and their roles in the overall process.
* Scale semantic context to make data-driven decisions across sites.

The following diagram shows how their distillation process is structured:

:::image type="content" source="media/tutorial/contoso-diagram.png" alt-text="Flow diagram of Contoso Energy." lightbox="media/tutorial/contoso-diagram.png":::

Digital twin builder can help Contoso Energy transform their operations. The platform enables them to seamlessly integrate and contextualize data from various sources, creating a unified view of their distillation process. This holistic approach allows Contoso Energy to gain valuable insights, optimize their operations, and make informed decisions that drive efficiency, reduce energy consumption, and enhance product quality.

### Sample ontology

This tutorial deals with a subset of the distillation process outlined in the previous section. The process is seen in the following ontology:

:::image type="content" source="media/tutorial/contoso-ontology.png" alt-text="Flow diagram of Contoso Energy as an ontology." lightbox="media/tutorial/contoso-ontology.png":::

## Data sources

Contoso Energy wants to model and standardize distillation processes across their sites. To model their process on digital twin builder, they start by representing 10 sites, where each site is an instance of the *Process* entity type. 

### Raw data for tutorial

For this tutorial, you use the following data sources:

| Data type | Usage |
|---|---|
| Asset data | Asset definitions for *Distiller*, *Condenser*, and *Reboiler*. Each of those entity types has 10 instances defined in the table. |
| Time series | Wide-formatted operational data. |
| Maintenance requests | Maintenance requests associated with a particular technician and equipment. |
| Technicians | SAP data detailing technicians working at sites. |
| Distillation process data | MES / process data for multiple sites, containing start and end times and waste KPIs for each process entry. A customer brings in the MES data and contextualizes it with asset and event data, in order to isolate each process that occurred. |

### Operational data

Through an edge system, Contoso Energy receives time series data from various sites. All sites perform the same distillation process that includes the following assets:
* *Distiller*: Produces time series data for `RefluxRatio`, `MainTowerPressure`, `FeedFlowRate`, and `FeedTrayTemperature`.
* *Condenser*: Produces time series data for `Pressure`, `Power`, and `Temperature`.
* *Reboiler*: Produces time series data for `Pressure`, `InletTemperature`, and `OutletTemperature`.

These measurements help monitor and control the distillation process, ensuring efficient and safe operation.

## Tutorial steps

In this tutorial, you build the digital twin builder (preview) solution for Contoso Energy. 

Specifically, you learn how to:

> [!div class="checklist"]
>
> * Set up your environment and deploy a digital twin builder item
> * Create entity types, and map property and time series data to them
> * Define semantic relationships between entity types
> * Search and explore your ontology
> * Create a Power BI report with digital twin builder data

Here's the Power BI report you build in this tutorial.

:::image type="content" source="media/tutorial/dashboard-1.png" alt-text="Power BI dashboard page 1, showing condenser asset details over time.":::

:::image type="content" source="media/tutorial/dashboard-2.png" alt-text="Screenshot of Power BI dashboard page 2, showing relationship instance data for maintenance orders.":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 1: Set up resources](tutorial-1-set-up-resources.md)