---
title: Practice with a sample dbt project in Microsoft Fabric
description: Learn how to create and run a dbt job using the sample Jaffle Shop project in Microsoft Fabric.
author: abhinayakurnala1
ms.author: akurnala
ms.service: fabric
ms.topic: tutorial
ms.date: 12/02/2024
ms.search.form: dbt-job-sample-project-tutorial
ai-usage: ai-assisted

#customer intent: As a data engineer, I want to practice with a sample dbt project so that I can learn how to use dbt jobs in Microsoft Fabric.

---

# Tutorial: Practice with a sample dbt project in Microsoft Fabric

The dbt Job in Microsoft Fabric lets you run dbt transformations without complex setup. You can orchestrate model builds, tests, and deployments directly in Fabric using built-in capabilities for scheduling and monitoring. This tutorial walks you through working with a sample project to learn dbt job capabilities.

In this tutorial, you:

> [!div class="checklist"]
> * Create a dbt job with a sample project
> * Run dbt transformations
> * Monitor and verify the results

If you don't have a Fabric subscription, create a [free trial account](https://aka.ms/fabric-trial).

## Prerequisites

Before you begin this tutorial, you need:

- Access to a Microsoft Fabric workspace
- Permissions to create items in the workspace
- Basic familiarity with dbt concepts (models, tests, and transformations)

## Create a dbt job with a sample project

Create a new dbt job item in your workspace to start building transformations.

1. Go to your Fabric workspace.
1. Select **+New item**, then search for and select **dbt job** from the item creation menu.
1. Enter a name, select a location, and select **Create**.

    :::image type="content" source="media/dbt-job/create-job.png" alt-text="Screenshot of the create job dialog in the Fabric UI." lightbox="media/dbt-job/create-job.png":::

1. You'll see three options for starting a dbt project. Select **Practice with Sample Project** to explore and work with a pre-built example.

    :::image type="content" source="media/dbt-job/landing-page-with-three-options.png" alt-text="Screenshot showing three options to start a dbt project.":::

1. Select the Jaffle Shop sample project, which lets you work with data that includes orders, payments, and customer datasets.

    :::image type="content" source="media/dbt-job/jaffle-shop.png" alt-text="Screenshot showing the Jaffle Shop sample project option.":::

1. Select an adapter profile to run the dbt project against.

    :::image type="content" source="media/dbt-job/select-profile-jaffle-shop.png" alt-text="Screenshot showing the profile selection for the Jaffle Shop project.":::

1. Create a new warehouse to store your sample data, or select an existing warehouse.

    :::image type="content" source="media/dbt-job/select-warehouse.png" alt-text="Screenshot showing the Fabric warehouse selection.":::

1. Enter a name for the warehouse and select **Create and connect**. This step creates a dedicated destination to store the data you'll transform.

    :::image type="content" source="media/dbt-job/name-a-warehouse.png" alt-text="Screenshot showing the warehouse naming dialog.":::

1. By default, the schema is set to jaffle_shop, and the option to seed data is selected. This loads sample data into the schema inside the warehouse you created. If you want to seed the data later, clear the checkbox before you select **Connect**.

    :::image type="content" source="media/dbt-job/jaffle-shop-schema.png" alt-text="Screenshot showing the Jaffle Shop schema and seed data options.":::

1. The project setup completes in a few seconds as the files are imported. After it finishes, verify that the sample data was seeded by checking the warehouse and schema. You can also confirm this in the output panel at the bottom of the screen. If the data isn't in the warehouse, run the seed command from the UI to load it.

    :::image type="content" source="media/dbt-job/setup-seed-success.png" alt-text="Screenshot showing the successful import of the Jaffle Shop project and seeded data." lightbox="media/dbt-job/setup-seed-success.png":::

## Run the dbt job

Execute the dbt transformations to build models, run tests, and create snapshots.

1. The top panel provides options to Build, Compile, or Run your project. By default, the operation is set to Build, which runs all models, tests, and snapshots together for a complete workflow.

    Fabric supports the following core dbt commands directly from the dbt job interface:

    [!INCLUDE [Supported commands for dbt jobs](includes/dbt-job-supported-commands.md)]

1. (Optional) You can run or exclude specific models using advanced selectors. To do this, go to **Advanced Settings** in the top panel, select **Run Settings**, and then select **Run with Advanced Selectors**.

    ```bash
    dbt run --select my_model 
    dbt build --select staging.* 
    dbt build --exclude deprecated_models 
    ```

    Selectors let you target parts of your pipeline for faster iteration during development or testing.

    :::image type="content" source="media/dbt-job/advanced-selectors.png" alt-text="Screenshot showing the advanced selectors option.":::

1. Select **Build**, then select **Run**.

    :::image type="content" source="media/dbt-job/build-run-command.png" alt-text="Screenshot showing the Build command and Run command buttons.":::

## Monitor and verify the results

Review the execution results and verify that transformations completed successfully.

1. After the dbt job starts, you can monitor its progress in the Output tab at the bottom of the screen. The run typically completes in a few minutes, depending on the size and complexity of your project.

1. Confirm a successful run by checking the Output tab. The status shows as succeeded when the run completes successfully.

    :::image type="content" source="media/dbt-job/run-success.png" alt-text="Screenshot showing a successful build command execution.":::

1. Verify the output by checking the transformed data in the Fabric Warehouse under the sample_dbt_project → jaffle_shop schema.

    :::image type="content" source="media/dbt-job/fabric-dw-success.png" alt-text="Screenshot showing the transformed data in the Fabric warehouse.":::

1. Open the **Compiled SQL** tab at the bottom to review the rendered SQL code that dbt ran. This helps you debug issues or optimize queries.

    :::image type="content" source="media/dbt-job/compiled-sql.png" alt-text="Screenshot showing the compiled SQL in the bottom panel.":::

1. Open the **Lineage view** to visualize the dependency graph of your models. This view shows how data flows between sources and transformations, helping you understand relationships, assess downstream impact, and troubleshoot issues.

    :::image type="content" source="media/dbt-job/lineage-view.png" alt-text="Screenshot showing the lineage view in the bottom panel.":::

## Clean up resources

## Related content

* [dbt job in Microsoft Fabric overview](dbt-job-overview.md)
* [Create a new dbt project](dbt-job-how-to-create-a-new-project.md)

