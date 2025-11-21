---
title: How to create a new project for dbt job in Data Factory
description: This article guides you through how to create a dbt job, execute it, and view the results.
ms.reviewer: whhender
ms.author: akurnala
author: abhinayakurnala1
ms.topic: how-to
ms.date: 11/20/2025
ms.search.form: dbt-job-tutorials
---

# Learn how to create a new project for dbt job in Data Factory for Microsoft Fabric

Microsoft Fabric now lets you transform data in your Data Warehouses using dbt—all within the Fabric web experience. No external adapters, no CLI, no Airflow. Just SQL, a warehouse, and a streamlined UI.

This walkthrough demonstrates how to use dbt directly within Microsoft Fabric to transform data in a warehouse—without external tools minimizing setup complexity and enabling users to leverage existing compute resources. As a result, dbt jobs make enterprise-scale data modeling more accessible to the SQL community. 

It’s designed to help data engineers and analysts:
- Import a Sample Data Warehouse in Fabric
- Build a dbt item to transform your data
- Run and validate your models—all natively in Fabric.

## Create a dbt job

Create a new dbt job item in your workspace to start building transformations.

1. Go to your Fabric workspace.
1. Select **+New item** then search for and select **dbt job** from the item creation menu.
1. Enter a name and select a location.

   :::image type="content" source="media/dbt-job/create-job.png" alt-text="Screenshot of the Fabric UI with the create job dialog." lightbox="media/dbt-job/create-job.png":::

1. Choose the target Fabric Data Warehouse connection.
1. Configure job parameters and save the new dbt job item.
1. After it's created, you can open the dbt job to view its file structure, configure settings, and run dbt commands directly from the Fabric UI.

   :::image type="content" source="media/dbt-job/landing-page.png" alt-text="Screenshot of the Fabric UI with landing page of dbt job." lightbox="media/dbt-job/landing-page.png":::

## Configure a dbt job

When you create or edit a dbt job, select the dbt configurations button to open the profile setup page. Here, you define how your dbt job connects to your data warehouse. You can also [change the adapter](#change-adapter) if needed and configure [advanced settings](#advanced-settings) to fine-tune execution behavior.

Use dbt configurations to set (or review) your dbt profile:

- **Adapter**: DataWarehouse (default in Fabric)
- **Connection name**: For example, dbtsampledemowarehouse
- **Schema (required)**: For example, jaffle_shop_demo
- **Seed data**: Optionally enable loading CSVs from /seeds as managed tables

1. Open your dbt job and select **dbt configurations**.
1. Confirm the Adapter (default is DataWarehouse).
1. Verify Connection name.
1. Enter Schema (for example, jaffle_shop_demo).
1. (Optional) Check **Seed data** if you want to load CSVs on dbt seed or dbt build.
1. Select **Apply**.

    :::image type="content" source="media/dbt-job/profile-adapter.png" alt-text="Screenshot of the Fabric UI with the dbt job profile adapter settings." lightbox="media/dbt-job/profile-adapter.png":::

### Change adapter

The **change adapter** control at the top-left of the dbt configurations page lets you change the dbt adapter used by the job's profile.

### When to use it

- Your workspace connection changes (for example, moving to a different Fabric Data Warehouse).
- You’re creating demos that contrast adapters (for example, a future PostgreSQL path), or you cloned a job and need to point it to a new target.
- You’re standardizing schemas across environments (dev → test → prod) and need a different connection behind the scenes.

### What changes when you switch

- The adapter and connection backing the pProfile.
- Dependent fields (for example, Schema) might need revalidation.
- Runtime behavior must align with the adapter’s SQL dialect and capabilities.

### Advanced settings

After you configure your dbt job's profile, select **Advanced Settings** to fine-tune execution and run behavior. The Advanced Settings panel is split into two tabs:

- [General settings](#general-settings)
- [Run settings](#run-settings)

#### General settings

Here you can adjust project-level execution options:

- **Threads**: Set the number of parallel threads for dbt execution (for example, 4 for medium workloads).
- **Fail fast**: If enabled, dbt stops immediately if any resource fails to build.
- **Full refresh**: Forces dbt to rebuild all models from scratch, ignoring incremental logic.

1. Select **Advanced Settings** > **General**.
1. Set the desired number of threads.
1. (Optional) Enable **Fail fast** or **Full refresh** as needed.
1. Select **Apply** to save.

    :::image type="content" source="media/dbt-job/advanced-settings.png" alt-text="Screenshot of the Fabric UI with the dbt job general settings." lightbox="media/dbt-job/advanced-settings.png":::

#### Run settings

This tab lets you control which models run and how to select them.

**Run mode**

- Run only selected models: Choose specific models to include in the run (for example, orders, stg_customers, etc.).
- Run with advanced selectors: Use dbt selectors for granular control (unions, intersections, exclusions).

    :::image type="content" source="media/dbt-job/run-settings.png" alt-text="Screenshot of the Fabric UI with the dbt job advanced run settings." lightbox="media/dbt-job/run-settings.png":::

**Advanced selector configuration**

- Selector: Name your selector.
- Select: Specify resources (models, tags, packages).
- Exclude: List resources to skip.

    :::image type="content" source="media/dbt-job/running-with-advance-selectors.png" alt-text="Screenshot of the Fabric UI with the dbt job advanced selector run settings." lightbox="media/dbt-job/running-with-advance-selectors.png":::

1. Select **Advanced Settings** > **Run settings**.
1. Choose your run mode:
    - For simple runs, select models from the tree.
    - For advanced runs, configure selectors for targeted execution.
1. Select **Apply** to save.

## Schedule dbt jobs

You can automate dbt job runs using the built-in schedule feature to refresh models, run tests, or keep data pipelines up to date.

1. Open your dbt job in Fabric.
1. Select the **Schedule** tab in the top panel.
1. Select **Add schedule** to configure a new scheduled run.
    - **Repeat**: Choose how often to run the job (for example, by the minute, hourly, daily, weekly).
    - **Interval**: Set the frequency (for example, every 15 minutes).
    - **Start date and time**: When the schedule should begin.
    - **End date and time**: (Optional) When the schedule should stop.
    - **Time zone**: Select your preferred time zone for scheduling.
1. Select **Save** to activate the schedule.

    :::image type="content" source="media/dbt-job/schedule-dbt.png" alt-text="Screenshot of the Fabric UI with the dbt job schedule settings." lightbox="media/dbt-job/schedule-dbt.png":::

## Project structure and job settings

Each dbt job in Fabric includes key tabs to help manage your project:

- **Explorer**: View and organize files such as models, seeds, and YAML configs.
- **Settings**: Adjust adapter configurations like schema, connection, and concurrency.
- **Output Panel**: View run logs, job output, and error messages in real time.

The project follows a standard dbt layout:

```text
my-dbt_project/ 
├── dbt_project.yml     # Project configuration 
├── models/             # SQL models for transformations 
│   ├── staging/ 
│   ├── marts/ 
│   └── analytics/ 
├── schema.yml          # Model tests, descriptions, and metadata 
└── seeds/              # Optional CSV data sources 
```

- `dbt_project.yml` defines project-level settings like model paths and configurations.
- `models/` contains your SQL files, each representing a model built on top of source data.
- `schema.yml` stores tests, documentation, and relationships.
- `seeds/` lets you upload CSVs to use as static reference data.

## Supported commands

Fabric supports the following core dbt commands directly from the dbt job interface.

| Command | Description |
|---------|-------------|
| `dbt build` | Builds all models, seeds, and tests in the project. |
| `dbt run` | Runs all SQL models in dependency order. |
| `dbt seed` | Loads CSV files from the seeds/ directory. |
| `dbt test` | Runs schema and data tests defined in schema.yml. |
| `dbt compile` | Generates compiled SQL without running transformations. |
| `dbt snapshot` | Captures and tracks slowly changing dimensions over time. |

You can selectively run or exclude specific models using selectors:

```bash
dbt run --select my_model 
dbt build --select staging.* 
dbt build --exclude deprecated_models 
```

Selectors let you target parts of your pipeline for faster iteration during development or testing.

## Monitor dbt jobs

Fabric provides several tools to help you monitor and validate your dbt jobs:

### Visual aids

- **Lineage View**: Generates a dependency graph of your models, showing how data flows between sources and transformations.
- **Compiled SQL View**: Displays the rendered SQL code that dbt runs, so you can debug or optimize queries.
- **Run Results Panel**: Shows model-level success, failure, and execution time for each dbt command.

### Monitoring and troubleshooting

- **Run Summary**: Displays total models run, runtime, and success status.
- **Error Logs**: Provide stack traces and query payloads for troubleshooting.
- **Download Logs**: Export detailed logs or payloads for offline analysis.

