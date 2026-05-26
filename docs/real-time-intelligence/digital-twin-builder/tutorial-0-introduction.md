---
title: Digital Twin Builder (Preview) Tutorial Introduction
description: Get an introduction to the digital twin builder (preview) tutorial scenario and review the prerequisites. Part 0 of the digital twin builder (preview) tutorial.
ms.date: 05/18/2026
ms.topic: tutorial
ai-usage: ai-assisted
#customer intent: As an operations analyst, I want to understand the digital twin builder (preview) tutorial scenario and prerequisites so that I can build an ontology and Power BI report for a sample distillation process.
---

# Digital twin builder (preview) tutorial: Introduction

Digital twin builder (preview) is a [Microsoft Fabric](../../fundamentals/microsoft-fabric-overview.md) item for building operational analytics scenarios for physical operations. Digital twin builder provides a low-code/no-code experience that connects disparate data sources through Fabric and Azure IoT Operations, builds digital twins, and generates insights without specialized technical skills. Operations staff can explore twins based on their relationships and run time-series analytics within Fabric. Use the resulting insights to reduce waste, improve yield, enhance safety, and meet sustainability targets.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

This tutorial walks you through building a scenario ontology in digital twin builder for the fictional energy company Contoso, Ltd. It covers modeling and contextualizing data from multiple sources, and finishes with a Power BI report that visualizes the data.

<!--## Prerequisites (title in include)-->
[!INCLUDE [Prerequisites for digital twin builder](../includes/digital-twin-builder-prerequisites.md)]

* The latest [Power BI Desktop](https://www.microsoft.com/power-platform/products/power-bi/downloads) app installed on your machine. Tutorial part 5 (Create a Power BI report) requires Power BI Desktop and **doesn't** work with the Power BI service in Fabric.

## Tutorial scenario: Contoso, Ltd. bioethanol distillation

This tutorial features the fictional energy company Contoso, Ltd., a bioethanol producer that wants to use digital twin builder (preview) across its distillation sites to improve efficiency, reduce energy consumption, and ensure product quality.

Contoso, Ltd. faces three challenges in its current distillation processes:

* **Efficiency:** Existing distillation units aren't optimized, which leads to longer processing times and higher operational costs.
* **Energy consumption:** The energy required to maintain the distillation process is substantial, which affects sustainability goals.
* **Product quality:** Variations in process parameters make it hard to ensure consistent product quality across different sites.

To address these challenges, Contoso, Ltd. needs to:

* Collect data and metadata from multiple sources, including sensors, control systems, and laboratory information management systems.
* Relate assets by creating semantic context that represents large processes and asset details.
* Scale semantic context to make data-driven decisions across sites.

The following diagram shows how the Contoso, Ltd. distillation process is structured:

:::image type="content" source="media/tutorial/contoso-diagram.png" alt-text="Diagram showing the structure of Contoso, Ltd.'s distillation process across sites, including the Distiller, Condenser, and Reboiler assets and their data flows." lightbox="media/tutorial/contoso-diagram.png":::

Digital twin builder integrates and contextualizes data from these sources into a unified view of the distillation process, so Contoso, Ltd. can optimize operations, reduce energy consumption, and improve product quality.

### Sample ontology used in this tutorial

This tutorial uses a subset of the Contoso, Ltd. distillation process. The following ontology represents that subset:

:::image type="content" source="media/tutorial/contoso-ontology.png" alt-text="Diagram showing the Contoso, Ltd. distillation process represented as an ontology, with entity types such as Process, Distiller, Condenser, and Reboiler and the semantic relationships between them." lightbox="media/tutorial/contoso-ontology.png":::

## Tutorial data summary

Contoso, Ltd. models and standardizes distillation processes across 10 sites in digital twin builder. Each site is an instance of the *Process* entity type.

### Raw data sources used in this tutorial

For this tutorial, you use the following data sources:

| Data type | Usage |
|---|---|
| Asset data | Asset definitions for *Distiller*, *Condenser*, and *Reboiler*. Each of those entity types has 10 instances defined in the table. |
| Time series | Wide-formatted operational data. |
| Maintenance requests | Maintenance requests associated with a particular technician and equipment. |
| Technicians | SAP data detailing technicians working at sites. |
| Distillation process data | MES / process data for multiple sites, containing start and end times and waste KPIs for each process entry. A customer brings in the MES data and contextualizes it with asset and event data, in order to isolate each process that occurred. |

### Operational time series data

Through an edge system, Contoso, Ltd. receives time series data from its sites. All sites perform the same distillation process, which includes the following assets:

* *Distiller*: Produces time series data for `RefluxRatio`, `MainTowerPressure`, `FeedFlowRate`, and `FeedTrayTemperature`.
* *Condenser*: Produces time series data for `Pressure`, `Power`, and `Temperature`.
* *Reboiler*: Produces time series data for `Pressure`, `InletTemperature`, and `OutletTemperature`.

These measurements help monitor and control the distillation process, ensuring efficient and safe operation.

## What you build in this tutorial

In this tutorial, you:

> [!div class="checklist"]
>
> * Set up your environment and deploy a digital twin builder item.
> * Create entity types, and map property and time series data to them.
> * Define semantic relationships between entity types.
> * Search and explore your ontology.
> * Create a Power BI report with digital twin builder data.

The following images show the Power BI report you build in tutorial part 5.

:::image type="content" source="media/tutorial/dashboard-1.png" alt-text="Power BI report page 1, showing condenser asset details over time.":::

:::image type="content" source="media/tutorial/dashboard-2.png" alt-text="Power BI report page 2, showing relationship instance data for maintenance orders.":::

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 1: Set up resources](tutorial-1-set-up-resources.md)