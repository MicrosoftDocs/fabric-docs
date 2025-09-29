---
title: "Tutorial: Parameterized Dataflow Gen2"
description: Overview on how to use Fabric variable libraries inside of a Dataflow Gen2 with CI/CD.
author: ptyx507x
ms.author: miescobar
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 09/29/2025
ms.custom: dataflows
---

# Tutorial: Parameterized Dataflow Gen2

>[!NOTE]
>This article focuses on a solution architecture from [CI/CD and ALM (Application Lifecycle Management) solution architectures for Dataflow Gen2](dataflow-gen2-cicd-alm-solution-architecture.md) that relies on the [public parameters mode feature](dataflow-parameters.md) and is only applicable to Dataflow Gen2 with CI/CD support.

Parameters in Fabric Dataflow Gen2 let you define reusable inputs that shape how a dataflow is designed, and with **public parameters mode** those inputs can be set at runtime through pipelines or APIs. It makes a single dataflow highly flexible and versatile, since you can reuse the same logic across many scenarios simply by passing different values, enabling dynamic, automated workflows without ever needing to rewrite or duplicate the transformations.

This tutorial walks you through an example that shows you how to:
* **Parameterize a source**: Using a Lakehouse with the WideWorldImpoters sample dataset as the source
* **Parameterize logic**: Using the input widgets available throughout the Dataflow experience
* **Parameterize destination**: Using a Warehouse as a destination 
* **Submit a run request with parameter values**: passing parameter values through the Dataflow activity experience inside of a Fabric pipeline

:::image type="content" source="media/dataflow-gen2-tutorial-parameterized-dataflow/parameterized-dataflow-detailed-architecture.png" alt-text="Diagram of a parameterized dataflow solution architecture in Dataflow Gen2." lightbox="media/dataflow-gen2-tutorial-parameterized-dataflow/parameterized-dataflow-detailed-architecture.png":::

>[!NOTE]
> The concepts showcased in this article are universal to Dataflow Gen2 and are applicable to other sources and destinations beyond the ones shown here.

## The scenario

:::image type="content" source="media/dataflow-gen2-tutorial-parameterized-dataflow/query-scenario-diagram.png" alt-text="Diagram representation of the query for the scenario inside of Dataflow Gen2." lightbox="media/dataflow-gen2-tutorial-parameterized-dataflow/query-scenario-diagram.png":::

The dataflow used for this scenario is simple, but the core principles that are mentioned in this article apply to all kinds of dataflows.
For this particular scenario, the dataflow connects to the dimension_city table from the WideWorldImporters sample dataset that was loaded to a Lakehouse. It then does a filter over the SalesTerritory column using the value “Southeast” and the query is finally loaded to a new table (named City) to a Warehouse. Both the Lakehouse and the Warehouse are located in the same Workspace as the Dataflow.
The main objectives are to parameterize the information about the source, the filter value used, and the destination used so that a run can be triggered using specific values instead of the ones hardcoded in the Dataflow.
Before moving forward, make sure to enable the public parameters mode by selecting the Options entry from the Home tab in the ribbon. Once in the Options dialog, check the box for **Enable to be discovered and overridden for execution** in the Parameters section and enable your Dataflow to accept parameters for execution.

![Screenshot of the options dialog in Dataflow Gen2 with the Parameters section showing the "Enable to be discovered and overriden for execution" setting](media/dataflow-gen2-tutorial-parameterized-dataflow/parameters-options.png)