---
title: Data science tutorials - prepare your system
description: Before you begin following the data science end-to-end scenario, learn about prerequisites, the sample dataset, and the lakehouse and notebooks you need.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom: build-2023
ms.date: 5/4/2023
---

# Prepare your system for data science tutorials

Before you begin the data science end-to-end tutorial series, learn about prerequisites, how to import notebooks, and how to attach a lakehouse to those notebooks.

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Import tutorial notebooks

We utilize the notebook item in the Data Science experience to demonstrate various Fabric capabilities. The notebooks are available as Jupyter notebook files that can be imported to your Fabric-enabled workspace.

1. Download your notebook(s).  Make sure to download the files by using the "Raw" file link in GitHub.
    * For the **Get started** notebooks, download the notebook(.ipynb) files from the parent folder: [data-science-tutorial](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-science-tutorial). 
    * For the **Tutorials** notebooks, download the notebooks(.ipynb) files from the parent folder [data-science-ai-samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-science-ai-samples).

1. On the Data science experience homepage, select **Import notebook** and upload the notebook files that you downloaded in step 1.

   :::image type="content" source="media\tutorial-data-science-prepare-system\select-import-notebook.png" alt-text="Screenshot showing where to select Import notebook on the Data science home page." lightbox="media\tutorial-data-science-prepare-system\select-import-notebook.png":::

   :::image type="content" source="media\tutorial-data-science-prepare-system\import-status-upload.png" alt-text="Screenshot of Import status dialog box, showing where to select Upload." lightbox="media\tutorial-data-science-prepare-system\import-status-upload.png":::

1. Once the notebooks are imported, select **Go to workspace** in the import dialog box.

   :::image type="content" source="media\tutorial-data-science-prepare-system\import-success-workspace.png" alt-text="Screenshot of the import success dialog box, showing where to select Go to workspace." lightbox="media\tutorial-data-science-prepare-system\import-success-workspace.png":::

1. The imported notebooks are now available in your workspace for use.

   :::image type="content" source="media\tutorial-data-science-prepare-system\imported-notebook-list.png" alt-text="Screenshot showing a list of available notebooks in a workspace." lightbox="media\tutorial-data-science-prepare-system\imported-notebook-list.png":::

## Attach a lakehouse to the notebooks

To demonstrate Fabric lakehouse features, many of the tutorials require attaching a default lakehouse to the notebooks. The following steps show how to add an existing lakehouse to a notebook in a Fabric-enabled workspace.

1. Open the notebook in the workspace.

1. Select **Add lakehouse** in the left pane and select **Existing lakehouse** to open the **Data hub** dialog box.

1. Select the workspace and the lakehouse you intend to use with these tutorials and select **Add**.

1. Once a lakehouse is added, it's visible in the lakehouse pane in the notebook UI where tables and files stored in the lakehouse can be viewed.

> [!NOTE]
> Before executing each notebooks, you need to perform these steps on that notebook.

:::image type="content" source="media\tutorial-data-science-prepare-system\attach-lakehouse-process.png" alt-text="Diagram of the process steps to attach a lakehouse to a notebook." lightbox="media\tutorial-data-science-prepare-system\attach-lakehouse-process.png":::

## Next steps

- [Part 1: Ingest data into Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md)
