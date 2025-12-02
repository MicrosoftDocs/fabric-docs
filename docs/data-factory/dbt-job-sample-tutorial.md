---
title: Practice with a sample dbt project in Microsoft Fabric
description: Learn how to create and run a dbt job using the sample Jaffle Shop project in Microsoft Fabric.
author: abhinayakurnala1
ms.author: akurnala
ms.service: fabric
ms.topic: tutorial
ms.date: 11/20/2025
ms.search.form: dbt-job-sample-project-tutorial
ms.custom: 

#customer intent: As a data engineer, I want to practice with a sample dbt project so that I can learn how to use dbt jobs in Microsoft Fabric.

---

# Tutorial: Practice with a sample dbt project in Microsoft Fabric

The dbt Job in Microsoft Fabric makes it easy to run dbt transformations without complex setup. You can orchestrate model builds, tests, and deployments directly in Fabric, leveraging built-in capabilities for scheduling and monitoring. This tutorial guides you through working with a sample project to learn dbt job capabilities.

In this tutorial, you:

> [!div class="checklist"]
> * Create a dbt job with a sample project
> * Configure a Fabric warehouse for sample data
> * Run dbt transformations
> * Monitor and verify the results

If you don't have a Fabric subscription, create a [free trial account](https://aka.ms/fabric-trial).

## Prerequisites

Before you begin this tutorial, ensure you have:

* Access to a Microsoft Fabric workspace
* Permissions to create items in the workspace
* Basic familiarity with dbt concepts (models, tests, and transformations)

## Create a dbt job with a sample project

Create a new dbt job item in your workspace to start building transformations.

1. Go to your Fabric workspace.
1. Select **+New item** then search for and select **dbt job** from the item creation menu.
1. Enter a name, select location and click on create.

    :::image type="content" source="media/dbt-job/create-job.png" alt-text="Screenshot of the Fabric UI with the create job dialog." lightbox="media/dbt-job/create-job.png":::

1. You will see three options for starting a dbt project. Select **Practice with Sample Project** to explore and work with a pre-built example.

    :::image type="content" source="media/dbt-job/landing-page-with-three-options.png" alt-text="Screenshot of the Fabric UI with three options to start dbt project.":::

1. Click on the jaffle shop sample project which allows us to look at data with orders, payments and customer datasets.

    :::image type="content" source="media/dbt-job/jaffle-shop.png" alt-text="Screenshot of the Fabric UI with jaffle shop sample project.":::

1. Select an adapter profile to run the dbt project against.

    :::image type="content" source="media/dbt-job/select-profile-jaffle-shop.png" alt-text="Screenshot of the Fabric UI with selecting profile.":::

1. Create a new warehouse in which your sample data will be stored, or select an existing warehouse.

    :::image type="content" source="media/dbt-job/select-warehouse.png" alt-text="Screenshot of the Fabric UI with selecting fabric datawarehouse":::

1. Enter a name for the warehouse and click on "create and connect". This step ensures that a dedicated destination is created to store the data we plan to transform.

    :::image type="content" source="media/dbt-job/name-a-warehouse.png" alt-text="Screenshot of the Fabric UI with naming fabric datawarehouse":::

1. By default, the schema is set to jaffle_shop, and the option to seed data is selected. This ensures that sample data is available within the schema inside the datawarehouse we created earlier for our project. If you prefer to seed the data later, simply clear the checkbox before proceeding to click on connect.

    :::image type="content" source="media/dbt-job/jaffle-shop-schema.png" alt-text="Screenshot of the jaffle shop schema and seed data":::

1. The project setup completes in a few seconds as the files are imported. Once finished, verify that the sample data has been seeded by checking the data warehouse and schema. You can also confirm this in the output panel at the bottom of the screen. If the data is not present in the warehouse, run the seed command from the UI to move it to warehouse.

    :::image type="content" source="media/dbt-job/setup-seed-success.png" alt-text="Screenshot of the jaffle shop project being imported and seed data being successful" lightbox="media/dbt-job/setup-seed-success.png":::

## Run dbt job

Execute the dbt transformations to build models, run tests, and create snapshots.

1. The top panel provides options to Build, Compile, or Run your project. By default, the operation is set to Build, which executes all models, tests, and snapshots together for a complete workflow.

    Fabric supports the following core dbt commands directly from the dbt job interface:

    [!INCLUDE [Supported commands for dbt jobs](dbt-job-supported-commands.md)]

1. (Optional) You can choose to run or exclude specific models using advanced selectors. To do this, go to **Advanced Settings** in the top panel, select **Run Settings**, and then choose **Run with Advanced Selectors**.

    ```bash
    dbt run --select my_model 
    dbt build --select staging.* 
    dbt build --exclude deprecated_models 
    ```

    Selectors let you target parts of your pipeline for faster iteration during development or testing.

    :::image type="content" source="media/dbt-job/advanced-selectors.png" alt-text="Screenshot of the selecting advanced selectors":::

1. Select **Build** and Click on **Run**.

    :::image type="content" source="media/dbt-job/build-run-command.png" alt-text="Screenshot of the running build command":::

## Monitor and verify the results

Review the execution results and verify that transformations completed successfully.

1. Once the dbt job starts, you can monitor its progress in the Output tab at the bottom of the screen. The run typically completes in a few minutes, depending on the size and complexity of your project.

1. Confirm a successful run by checking the Output tab. The status will be shown as succeeded in case the run is successful.

    :::image type="content" source="media/dbt-job/run-success.png" alt-text="Screenshot of the running build command being successful":::

1. Verify the output by checking the transformed data in the Fabric Warehouse under the sample_dbt_project → jaffle_shop schema.

    :::image type="content" source="media/dbt-job/fabric-dw-success.png" alt-text="Screenshot of the data being transformed in fabric dw":::

1. Open the **Compiled SQL** on the bottom tab to review the rendered SQL code that dbt executed. This helps you debug issues or optimize queries.

    :::image type="content" source="media/dbt-job/compiled-sql.png" alt-text="Screenshot of the compiled sql in the bottom panel":::

1. Open the **Lineage view** to visualize the dependency graph of your models. This view shows how data flows between sources and transformations, helping you understand relationships, assess downstream impact, and troubleshoot issues effectively.

    :::image type="content" source="media/dbt-job/lineage-view.png" alt-text="Screenshot of the lineage in the bottom panel":::

## Clean up resources

## Related content

* [dbt job concepts in Microsoft Fabric](apache-airflow-jobs-concepts.md)
* [Create a new dbt project](dbt-job-how-to-create-new-project.md)
* [Import an existing dbt project](dbt-job-how-to-import-existing-project.md)

