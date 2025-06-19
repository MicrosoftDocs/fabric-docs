---
title: "Implement medallion architecture with materialized lake views"
description: This tutorial outlines the steps and considerations for implementing a medallion architecture for a sales analytics pipeline materialized lake views.
ms.author: rkottackal 
author: rkottackal 
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 06/06/2025
# customer intent: As a data engineer, I want to implement a medallion architecture using materialized lake views in Microsoft Fabric so that I can automate data transformation workflows and gain actionable insights into sales analytics.
---

# Implement medallion architecture with materialized lake views

This tutorial outlines the steps and considerations for implementing a medallion architecture using materialized lake views. By the end of this tutorial, you learn the key features and capabilities of materialized lake views and be able to create an automated data transformation workflow. This tutorial isn't intended to be a reference architecture, an exhaustive list of features and functionality, or a recommendation of specific best practices.

## Prerequisites

As prerequisites to this tutorial, complete the following steps:

1. [Sign into your Power BI](https://powerbi.com/) account, or if you don't have an account yet, sign up for a free trial.
1. [Enable Microsoft Fabric](../../admin/fabric-switch.md) in your tenant. Select the default Power BI icon at the bottom left of the screen and select Fabric.
1. [Create a Microsoft Fabric enabled Workspace](../../fundamentals/create-workspaces.md).
1. Select a workspace from the Workspaces tab, then select **+ New** item, and choose **Data pipeline**. Provide a name for your pipeline and select **Create**.
1. [Create a Lakehouse with schemas](../lakehouse-schemas.md#create-a-lakehouse-schema) enabled. Name it **SalesLakehouse** and load sample data files into the Lakehouse. For more information, see [Lakehouse tutorial](/fabric/data-engineering/tutorial-build-lakehouse).

## Scenario overview

In this tutorial, you'are going to take an example of a fictional retail organization, Contoso, which uses a medallion architecture for data analytics to gain actionable insights into its retail sales operations. It aims to streamline the analysis process and generate deeper insights into business performance by organizing their data into three layers—bronze (raw data), silver (cleaned and enriched data), and gold (aggregated and analyzed data).

The following diagram represents different entities in each layer of medallion architecture in SalesLakehouse:

:::image type="content" source="./media/tutorial/sales-lakehouse.png" alt-text="Screenshot showing medallion architecture." border="true" lightbox="./media/tutorial/sales-lakehouse.png":::

**Entities**

1. **Orders**: This entity includes details about each customer order, such as order date, shipment details, product category, and subcategory. Insights can be drawn to optimize shipping strategies, identify popular product categories, and improve order management.

1. **Sales**: By analyzing sales data, Contoso can assess key metrics like total revenue, profit margins, order priorities, and discounts. Correlations between these factors provide a clearer understanding of customer purchasing behaviors and the efficiency of discount strategies.

1. **Location**: This captures the geographical dimension of sales and orders, including cities, states, regions, and customer segments. It helps Contoso identify high-performing regions, address low-performing areas, and personalize strategies for specific customer segments.

1. **Agent performance**: With details on agents managing transactions, their commissions, and sales data, Contoso can evaluate individual agent performance, incentivize top performers, and design effective commission structures.

1. **Agent commissions**: Incorporating commission data ensures transparency and enables better cost management. Understanding the correlation between commission rates and agent performance helps refine incentive systems.

**Sample dataset**

Contoso maintains its retail operations raw data in CSV format within ADLS Gen2. We utilize this data to create the bronze layer, and then use the bronze layer to create the materialized lake views which form the silver and gold layers of the medallion architecture. First download the sample CSV files from the [Fabric samples repo](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-engineering/MaterializedLakeViews/tutorial).

## Create the pipeline

The high-level steps are as follows:

1. **Bronze Layer**: Ingest raw data in the form of CSV files into the lakehouse.
1. **Silver Layer**: Cleanse data using materialized lake views.
1. **Gold Layer**: Curate data for analytics and reporting using materialized lake views.

### Create bronze layer of sales analytics medallion architecture

1. Load the CSV files corresponding to different entities from the downloaded data into the Lakehouse. To do so, navigate to your lakehouse and upload the downloaded data into the **Files** section of the lakehouse. It creates a folder named **tutorial**.

1. Next create a shortcut to it from the *Tables* section. Select **...** next to the *Tables* section, and select **New schema shortcut** and then **Microsoft OneLake**. Choose the *SalesLakehouse* from the data source types. Expand the **Files** section and choose the **tutorial** folder and select **Create**. You can also use other alternate [options to get data into the Lakehouse](/fabric/data-engineering/load-data-lakehouse).

   :::image type="content" source="./media/tutorial/create-schema-shortcut.png" alt-text="Screenshot showing how to create a shortcut to get the data into tables." border="true" lightbox="./media/tutorial/create-schema-shortcut.png":::

1. From the *Tables* section, rename the **tutorial** folder as **bronze**.

   :::image type="content" source="./media/tutorial/create-bronze-layer.png" alt-text="Screenshot showing creating bronze layer." border="true" lightbox="./media/tutorial/create-bronze-layer.png":::

### Create silver and gold layers of medallion architecture

1. Upload the downloaded the notebook file to your workspace.

   :::image type="content" source="./media/tutorial/create-silver-layer.png" alt-text="Screenshot showing silver materialized lake view creation." border="true" lightbox="./media/tutorial/create-silver-layer.png":::

1. Open the Notebook from the Lakehouse. For more information, see [Explore the lakehouse data with a notebook](/fabric/data-engineering/lakehouse-notebook-explore).

1. Run all cells of the notebook using Spark SQL to create materialized lake views with data quality constraints. Once all cells are successfully executed, **Refresh** the SalesLakehouse source to view the newly created materialized lake views for **silver** and **gold** schema.

   :::image type="content" source="./media/tutorial/run-notebook.png" alt-text="Screenshot showing run notebook." border="true" lightbox="./media/tutorial/run-notebook.png":::

## Schedule the pipeline

1. Once the materialized lake views for silver and gold layers are created, navigate to the lakehouse and select **Managed materialized lake view** to see the lineage view. It's autogenerated based on dependencies, each dependent materialized lake view forms the nodes of the lineage.

   :::image type="content" source="./media/tutorial/manage-materialized-lake-view-1.png" alt-text="Screenshot showing materialized lake view." border="true" lightbox="./media/tutorial/manage-materialized-lake-view-1.png":::

   :::image type="content" source="./media/tutorial/manage-materialized-lake-view-2.png" alt-text="Screenshot showing creation of lineage." border="true" lightbox="./media/tutorial/manage-materialized-lake-view-2.png":::

1. Select **Schedule** from the navigation ribbon. Turn **On** the refresh and configure schedule.

   :::image type="content" source="./media/tutorial/run-lineage.png" alt-text="Screenshot showing scheduling run the materialized lake views." border="true" lightbox="./media/tutorial/run-lineage.png":::

## Monitoring and troubleshooting

1. The dropdown menu lists the current and historical runs. 

   :::image type="content" source="./media/tutorial/dropdown-menu.png" alt-text="Screenshot showing scheduling execution." border="true" lightbox="./media/tutorial/dropdown-menu.png":::

1. By selecting any of the runs, you can find the materialized lake view details on right side panel. The bottom activity panel provides a high-level overview of node execution status.

   :::image type="content" source="./media/tutorial/execution details.png" alt-text="Screenshot showing execution details." border="true" lightbox="./media/tutorial/execution details.png":::

1. Select any node in the lineage to see the node execution details and link to detailed logs. If the node status is *Failed*, then an error message will also be displayed.

   :::image type="content" source="./media/tutorial/execution-detail-logs.png" alt-text="Screenshot showing execution detail logs." border="true" lightbox="./media/tutorial/execution-detail-logs.png":::

1. Selecting the **Detailed logs** link will redirect you to the *Monitor Hub* from where you can access Spark error logs for further troubleshooting.

   :::image type="content" source="./media/tutorial/spark-logs.png" alt-text="Screenshot showing spark logs." border="true" lightbox="./media/tutorial/spark-logs.png":::

1. Select the **Data quality report** button on the ribbon of materialized lake views page, to create or view an autogenerated data quality report.

## Related articles

* [Microsoft Fabric materialized lake views overview](overview-materialized-lake-view.md)
* [Microsoft Fabric materialized lake views tutorial](tutorial.md)
* [Create materialized lake views](./create-materialized-lake-view.md)