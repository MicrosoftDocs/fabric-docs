---
title: Data science tutorials - prepare your system
description: Before you begin following the data science end-to-end scenario, learn about prerequisites, the sample dataset, and the lakehouse and notebooks you need.
ms.reviewer: amjafari
ms.author: jburchel
author: jonburchel
ms.topic: tutorial
ms.custom:
ms.date: 01/10/2025
---

# Prepare your system for data science tutorials

Before you begin the data science end-to-end tutorial series, learn about prerequisites, how to import notebooks, and how to attach a lakehouse to those notebooks.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Create a notebook

Each tutorial in the Get Started end-to-end series is available as a Jupyter notebook file in GitHub.  Many additional tutorials are also available as samples in the Data Science workload.  Use one of the following methods to access the tutorials:

* [Create a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks), then copy and paste the code from the tutorial.
   
* <a name="import-tutorial-notebooks"></a> Import the notebook from GitHub to your workspace:

    1. Download your notebook(s).  Make sure to download the files by using the "Raw" file link in GitHub.
        * For the **Get started** notebooks, download the notebook(.ipynb) files from the parent folder: [data-science-tutorial](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/data-science-tutorial). The Get Started tutorial series uses the following notebooks:
            * [Ingest data into Fabric lakehouse using Apache Spark](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/1-ingest-data.ipynb)
            * [Explore and clean data](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/2-explore-cleanse-data.ipynb)
            * [Train and register a machine learning model](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/3-train-evaluate.ipynb)
            * [Score the trained model](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/4-predict.ipynb)

        * For the **Tutorials** notebooks, download the notebooks(.ipynb) files from the parent folder [ai-samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-science/ai-samples).

    1. On the left navigation for the Fabric homepage, select your workspace.
    1. Select **Import** > **Notebook** > **From this computer**.

        :::image type="content" source="media\tutorial-data-science-prepare-system\select-import-notebook.png" alt-text="Screenshot showing where to select Import notebook on the Data science home page." lightbox="media\tutorial-data-science-prepare-system\select-import-notebook.png":::

    1. Select Upload and select the downloaded notebook file.

        :::image type="content" source="media\tutorial-data-science-prepare-system\import-status-upload.png" alt-text="Screenshot of Import status dialog box, showing where to select Upload." lightbox="media\tutorial-data-science-prepare-system\import-status-upload.png":::

    1. Once the notebooks are imported, select **Go to workspace** in the import dialog box.

        :::image type="content" source="media\tutorial-data-science-prepare-system\import-success-workspace.png" alt-text="Screenshot of the import success dialog box, showing where to select Go to workspace." lightbox="media\tutorial-data-science-prepare-system\import-success-workspace.png":::

    1. The imported notebooks are now available in your workspace for use.

    1. If the imported notebook includes output, select the **Edit** menu, then select **Clear all outputs**.

    :::image type="content" source="media\tutorial-data-science-prepare-system\clear-outputs.png" alt-text="Screenshot shows the edit menu option to clear all outputs." lightbox="media\tutorial-data-science-prepare-system\clear-outputs.png":::

* <a name="open-sample-notebook"></a> Open the sample notebook (when available) in the Data Science workload:

    1. From the left pane, select **Workloads**.
    1. Select **Data Science**.
    1. From the **Explore a sample** card, select **Select**.
    1. Select the corresponding sample:
    
        * From the default **End-to-end workflows (Python)** tab, if the sample is for a Python tutorial.
        * From the **End-to-end workflows (R)** tab, if the sample is for an R tutorial.
        * From the **Quick tutorials** tab, if the sample is for a quick tutorial.

## Attach a lakehouse to the notebooks

To demonstrate Fabric lakehouse features, many of the tutorials require attaching a default lakehouse to the notebooks. The following steps show how to add a lakehouse to a notebook in a Fabric-enabled workspace.

> [!NOTE]
> Before executing each notebook, you need to perform these steps on that notebook. 

1. Open the notebook in the workspace.

1. Select **Add lakehouse** in the left pane.

    :::image type="content" source="media\tutorial-data-science-prepare-system\attach-lakehouse-process.png" alt-text="Diagram of the process steps to attach a lakehouse to a notebook." lightbox="media\tutorial-data-science-prepare-system\attach-lakehouse-process.png":::

1. Create a new lakehouse or use an existing lakehouse.
    1. To create a new lakehouse, select **New**. Give the lakehouse a name and select **Create**.
    1. To use an existing lakehouse, select **Existing lakehouse** to open the **Data hub** dialog box. Select the lakehouse you want to use and then select **Add**.

1. Once a lakehouse is added, it's visible in the lakehouse pane and you can view tables and files stored in the lakehouse.


## Next step

> [!div class="nextstepaction"]
> [Part 1: Ingest data into Fabric lakehouse using Apache Spark](tutorial-data-science-ingest-data.md)
