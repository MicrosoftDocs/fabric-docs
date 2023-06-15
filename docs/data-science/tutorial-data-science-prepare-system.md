---
title: Data science tutorial series - prepare your system
description: Before you begin following the data science end-to-end scenario, learn about prerequisites, the sample dataset, and the lakehouse and notebooks you need.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Prepare your system for the data science tutorial series

Before you begin the data science end-to-end tutorial series, learn about prerequisites, the sample dataset, which notebooks to import, and how to attach a lakehouse to those notebooks.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* An existing Microsoft Fabric lakehouse. Create a lakehouse by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Sample dataset

In this tutorial, we use the [NYC Taxi and Limousine yellow dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=pyspark), which is a large-scale dataset containing taxi trips in the city from 2009 to 2018. The dataset includes various features such as pick-up and drop-off dates, times, locations, fares, payment types, and passenger counts. The dataset can be used for various purposes such as analyzing traffic patterns, demand trends, pricing strategies, and driver behavior.

## Import tutorial notebooks

We utilize the notebook item in the Data Science experience to demonstrate various Fabric capabilities. The notebooks are available as Jupyter notebook files that can be imported to your Fabric-enabled workspace.

1. Download the notebooks(.ipynb) files for this tutorial from the parent folder [Data Science Tutorial Source Code](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-science-tutorial).

1. Switch to the Data Science experience using the experience switcher icon at the left corner of your homepage.

   :::image type="content" source="media\tutorial-data-science-prepare-system\switch-to-data-science.png" alt-text="Screenshot of the experience switcher menu, showing where to select Data Science." lightbox="media\tutorial-data-science-prepare-system\switch-to-data-science.png":::

1. On the Data science experience homepage, select **Import notebook** and upload the notebook files for parts 1- 5 that you downloaded in step 1.

   :::image type="content" source="media\tutorial-data-science-prepare-system\select-import-notebook.png" alt-text="Screenshot showing where to select Import notebook on the Data science home page." lightbox="media\tutorial-data-science-prepare-system\select-import-notebook.png":::

   :::image type="content" source="media\tutorial-data-science-prepare-system\import-status-upload.png" alt-text="Screenshot of Import status dialog box, showing where to select Upload." lightbox="media\tutorial-data-science-prepare-system\import-status-upload.png":::

1. Once the notebooks are imported, select **Go to workspace** in the import dialog box.

   :::image type="content" source="media\tutorial-data-science-prepare-system\import-success-workspace.png" alt-text="Screenshot of the import success dialog box, showing where to select Go to workspace." lightbox="media\tutorial-data-science-prepare-system\import-success-workspace.png":::

1. The imported notebooks are now available in your workspace for use.

   :::image type="content" source="media\tutorial-data-science-prepare-system\imported-notebook-list.png" alt-text="Screenshot showing a list of available notebooks in a workspace." lightbox="media\tutorial-data-science-prepare-system\imported-notebook-list.png":::

## Attach a lakehouse to the notebooks

To demonstrate Fabric lakehouse features, the first five parts in this tutorial require attaching a default lakehouse to the notebooks. The following steps show how to add an existing lakehouse to a notebook in a Fabric-enabled workspace.

1. Open the notebook for the first part **01 Ingest data into Lakehouse using Apache Spark** in the workspace.

1. Select **Add lakehouse** in the left pane and select **Existing lakehouse** to open the **Data hub** dialog box.

1. Select the workspace and the lakehouse you intend to use with these tutorials and select **Add**.

1. Once a lakehouse is added, it's visible in the lakehouse pane in the notebook UI where tables and files stored in the lakehouse can be viewed.

> [!NOTE]
> Before executing all notebooks, you need to perform these steps for each notebook in this tutorial.

:::image type="content" source="media\tutorial-data-science-prepare-system\attach-lakehouse-process.png" alt-text="Diagram of the process steps to attach a lakehouse to a notebook." lightbox="media\tutorial-data-science-prepare-system\attach-lakehouse-process.png":::

## Next steps

- [Part 1: Ingest data into Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md)
