---
title: Data science tutorial - prepare your system
description: Learn about the Data science tutorial, including an overview of the steps you follow through the modules and details about the end-to-end scenario.
ms.reviewer: mopeakande
ms.author: mopeakande
author: msakande
ms.topic: tutorial
ms.date: 5/4/2023
---

# Prepare your system for the Data science tutorial

Intro paragraph

## Prerequisites

1. Power BI Premium subscription. For more information, *How to purchase Power BI Premium*.

1. A Power BI Workspace with assigned premium capacity.

1. An existing trident lakehouse. Create a lakehouse by following How to Create a lakehouse

## Sample Dataset

In this tutorial we will use the [NYC Taxi and Limousine yellow dataset](/azure/open-datasets/dataset-taxi-yellow?tabs=pyspark), which is a large-scale dataset containing taxi trips in the city from 2009 to 2018. The dataset includes various features such as pick-up and drop-off dates, times, locations, fares, payment types, and passenger counts. The dataset can be used for various purposes such as analyzing traffic patterns, demand trends, pricing strategies, and driver behavior.

## Import tutorial notebooks

We will utilize the notebook artifact in the Data Science experience to demonstrate various Trident capabilities. The notebooks are available as jupyter notebook files that can be imported to your trident-enabled workspace.

1. Download the notebooks(.ipynb) files for this tutorial from the parent folder [Data Science Tutorial Source Code](https://microsoft.sharepoint.com/:f:/t/TridentOnboardingCoreTeam/Enus9uwaC9BLpMuVH5cCMfsB1ApXh5eUEh9DjVTZ8psiig?e=zLgmFf).
1. Switch to the Data Science experience using the workload switcher icon at the left corner of your homepage.

   IMAGE

1. On the Data science experience homepage click on the **Import Notebook** button and upload the notebook files for modules 1- 5 downloaded in step 1. Once the notebooks are imported, click on the **Go to workspace** link in the import dialog box.

   IMAGE

   IMAGE

- IMAGE
- The imported notebooks would now be available in your workspace for use.

IMAGE

## Attach a lakehouse to the notebooks

To demonstrate trident lakehouse features, the first five modules in this tutorial require attaching a default lakehouse to the notebooks. Below are the steps to add an existing lakehouse to a notebook in a trident-enabled workspace.

1. Open the notebook for the first module “01 Ingest data into Lakehouse using Apache Spark” in the workspace.

1. Click on the add lakehouse button on the left pane and select **Existing lakehouse** to open the **Data hub** dialog box.

1. Select the workspace and the lakehouse you intend to use with these tutorials and click the add button.

1. Once a lakehouse is added it will be visible in the lakehouse pane on notebook UI where **Tables** and **Files** stored in the lakehouse can be viewed.

> [!NOTE]
> Before executing all notebooks, you need to perform these steps for each notebook in this tutorial.

IMAGE

## Next steps

- Module 1: Ingest data into Fabric lakehouse using Apache Spark
