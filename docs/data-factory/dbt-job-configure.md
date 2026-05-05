---
title: How to configure dbt jobs in Microsoft Fabric
description: This article outlines the options for configuring a dbt job, including adapter settings and advanced execution parameters.
ms.reviewer: akurnala
ms.topic: how-to
ms.date: 11/20/2025
ms.search.form: dbt-job-tutorials
---

# Configure a dbt job in Microsoft Fabric

When you create or edit a dbt job, select the dbt configurations button to open the profile setup page. Here, you define how your dbt job connects to your data warehouse. You can also [change the adapter](#change-adapter) if needed and configure [advanced settings](#advanced-settings) to fine-tune execution behavior.

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

## Configure profile settings

Use dbt configurations to set or review your dbt profile:

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

## Change adapter

The **change adapter** control at the top-left of the dbt configurations page lets you change the dbt adapter used by the job's profile.

### When to use it

- Your workspace connection changes (for example, moving to a different Fabric Data Warehouse).
- You're creating demos that contrast adapters (for example, a future PostgreSQL path), or you cloned a job and need to point it to a new target.
- You're standardizing schemas across environments (dev → test → prod) and need a different connection behind the scenes.

### What changes when you switch

- The adapter and connection that back the profile.
- Dependent fields (for example, Schema) might need revalidation.
- Runtime behavior must align with the adapter’s SQL dialect and capabilities.

## Advanced settings

After you configure your dbt job's profile, select **Advanced Settings** to fine-tune execution and run behavior. The Advanced Settings panel is split into two tabs:

- [General settings](#general-settings)
- [Run settings](#run-settings)

### General settings

Here you can adjust project-level execution options:

- **Threads**: Set the number of parallel threads for dbt execution (for example, 4 for medium workloads).
- **Fail fast**: If enabled, dbt stops immediately if any resource fails to build.
- **Full refresh**: Forces dbt to rebuild all models from scratch, ignoring incremental logic.

1. Select **Advanced Settings** > **General**.
1. Set the desired number of threads.
1. (Optional) Enable **Fail fast** or **Full refresh** as needed.
1. Select **Apply** to save.

    :::image type="content" source="media/dbt-job/advanced-settings.png" alt-text="Screenshot of the Fabric UI with the dbt job general settings." lightbox="media/dbt-job/advanced-settings.png":::

### Run settings

The run settings tab lets you control which models run and how to select them. There are two settings:

- [Run mode](#run-mode)
- [Advanced selector configuration](#advanced-selector-configuration)

#### Run mode

- Run only selected models: Choose specific models to include in the run (for example, orders, stg_customers, and so on).
- Run with advanced selectors: Use dbt selectors for granular control (unions, intersections, exclusions).

    :::image type="content" source="media/dbt-job/run-settings.png" alt-text="Screenshot of the Fabric UI with the dbt job advanced run settings." lightbox="media/dbt-job/run-settings.png":::

#### Advanced selector configuration

Selectors let you target parts of your pipeline for faster iteration during development or testing.

1. Select **Advanced Settings** > **Run settings**.
1. Choose your run mode:
    - For simple runs, select models from the tree.
    - For advanced runs, configure selectors for targeted execution.
1. Select **Apply** to save.

You can selectively run or exclude specific models by using [selectors](dbt-job-configure.md#advanced-selector-configuration).

For example:

```bash
dbt run --select my_model 
dbt build --select staging.* 
dbt build --exclude deprecated_models 
```

Build custom selectors by specifying:

- Selector: Name your selector.
- Select: Specify resources (models, tags, packages).
- Exclude: List resources to skip.

    :::image type="content" source="media/dbt-job/running-with-advance-selectors.png" alt-text="Screenshot of the Fabric UI with the dbt job advanced selector run settings." lightbox="media/dbt-job/running-with-advance-selectors.png":::

## Related content

* [dbt job in Microsoft Fabric overview](dbt-job-overview.md)
* [Step-by-step dbt job tutorial](dbt-job-how-to.md)
* [How to create a new dbt job](dbt-job-how-to.md)
