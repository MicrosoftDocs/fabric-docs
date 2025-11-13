---
title: dbt jobs in Microsoft Fabric (Preview)
description: Learn how to use dbt jobs to transform your data using SQL from within Fabric.
ms.reviewer: whhender
ms.author: akurnala
author: abhinayakurnala1
ms.date: 11/11/2025
ms.topic: overview
ms.custom:
   - dbt
---

# What is a dbt job? (Preview)

> [!NOTE]
> Currently, this feature is in [preview](/fabric/fundamentals/preview).

[dbt](https://docs.getdbt.com/) jobs in Microsoft Fabric enable SQL-based data transformations directly within the Fabric user interface. They provide a simple, no-code setup to build, test, and deploy dbt models on top of your Fabric data warehouse.

With dbt jobs, you can develop and manage your transformation logic in one place—without relying on the command line or external orchestration tools. Fabric’s integration with dbt Core allows you to schedule, monitor, and visualize dbt workflows using the same workspace where your data pipelines and reports live.

## Prerequisites

Before creating dbt jobs in Microsoft Fabric, ensure your environment is properly configured:

1. Enable dbt jobs:
    - Go to the Admin Portal in Fabric.
    - Under Tenant Settings, enable the **dbt Jobs (Preview)** feature for your organization or specific security groups.
      
      :::image type="content" source="media/dbt-job/enable_dbt.png" alt-text="Screenshot of the Fabric UI with the tenant settings to enable dbt job.":::
      
1. If you haven't already, [create a workspace](/fabric/fundamentals/create-workspaces).
1. If you haven't already, [set up a Fabric Data Warehouse](/fabric/data-warehouse/create-warehouse).

### Permissions and access

- In your Fabric workspace, assign Contributor or higher roles to users who will create or manage dbt jobs.
- For the target Fabric Data Warehouse, ensure users have read/write permissions to execute dbt transformations
- Ensure you have both build and read/write access to linked datasets and connections.

## dbt version supported

Fabric currently supports dbt Core v1.7 (subject to periodic updates). Microsoft maintains alignment with major dbt Core releases to ensure compatibility and feature parity. Updates are applied automatically, with notifications in the Fabric release notes.

## Create a dbt job

1. Navigate to your Fabric workspace.
1. Select New item > dbt job from the item creation menu.
1. Enter a name and select a location.

    :::image type="content" source="media/dbt-job/create-job.png" alt-text="Screenshot of the Fabric UI with the create job pop-up.":::

1. Choose the target Fabric Data Warehouse connection.
1. Configure job parameters and save the new dbt job item.
1. Once created, you can open the dbt job to view its file structure, configure settings, and run dbt commands directly from the Fabric UI.

   :::image type="content" source="media/dbt-job/landing-page.png" alt-text="Screenshot of the Fabric UI with landing page of dbt job.":::

## Configure a dbt job

When creating or editing a dbt job, select the dbt configurations button to open the profile setup page. Here, you’ll define how your dbt job connects to your data warehouse.

Use dbt configurations to set (or review) your dbt profile:

- **Adapter**: DataWarehouse (default in Fabric)
- **Connection name**: For example, dbtsampledemowarehouse
- **Schema (required)**: For example, jaffle_shop_demo
- **Seed data**: optionally enable loading CSVs from /seeds as managed tables

1. Open your dbt job → select dbt configurations.
1. Confirm the Adapter (default is DataWarehouse).
1. Verify Connection name.
1. Enter Schema (for example, jaffle_shop_demo).
1. (Optional) Check Seed data if you want to load CSVs on dbt seed or dbt build.
1. Select Apply.

    :::image type="content" source="media/dbt-job/profile-adapter.png" alt-text="Screenshot of the Fabric UI with the dbt job profile adapter settings.":::

## Change adapter

The **change adapter** is a control at the top‑left of the dbt configurations page that lets you change the dbt adapter used by the job’s profile.

### When to use it

- Your workspace connection changes (for example, moving to a different Fabric Data Warehouse).
- You’re creating demos that contrast adapters (for example, a future PostgreSQL path), or you cloned a job and need to point it to a new target.
- You’re standardizing schemas across environments (dev → test → prod) and need a different connection behind the scenes.

### What changes when you switch

- The Adapter and Connection backing the Profile.
- Dependent fields (for example, Schema) might need revalidation.
- Runtime behavior must align with the adapter’s SQL dialect and capabilities.

## Advanced settings

After configuring your dbt job’s Profile, select Advanced Settings to fine-tune execution and run behavior. The Advanced Settings panel is split into two tabs:

### General settings

Here you can adjust project-level execution options:

- **Threads**: Set the number of parallel threads for dbt execution (for example, 4 for medium workloads).
- **Fail fast**: If enabled, dbt stops immediately if any resource fails to build.
- **Full refresh**: Forces dbt to rebuild all models from scratch, ignoring incremental logic.

1. Select Advanced Settings → General.
1. Set the desired number of threads.
1. (Optional) Enable Fail fast or Full refresh as needed.
1. Select Apply to save.

    :::image type="content" source="media/dbt-job/advanced-settings.png" alt-text="Screenshot of the Fabric UI with the dbt job general settings.":::

### Run settings

This tab lets you control which models run and how to select them:

**Run mode**:

- Run only selected models: Choose specific models to include in the run (for example, orders, stg_customers, etc.).
- Run with advanced selectors: Use dbt selectors for granular control (unions, intersections, exclusions).

    :::image type="content" source="media/dbt-job/run-settings.png" alt-text="Screenshot of the Fabric UI with the dbt job advanced run settings.":::

**Advanced selector configuration**:

- Selector: Name your selector.
- Select: Specify resources (models, tags, packages).
- Exclude: List resources to skip.

    :::image type="content" source="media/dbt-job/running-with-advance-selectors.png" alt-text="Screenshot of the Fabric UI with the dbt job advanced selector run settings.":::

1. Select Advanced Settings → Run settings.
1. Choose your run mode:
    - For simple runs, select models from the tree.
    - For advanced runs, configure selectors for targeted execution.
1. Select Apply to save.

## Project structure

Each dbt job follows a standard project layout:

- dbt_project.yml defines project-level settings like model paths and configurations.
- models/ contains your SQL files, each representing a model built on top of source data.
- schema.yml stores tests, documentation, and relationships.
- seeds/ lets you upload CSVs to use as static reference data.

## Visual tools

Fabric provides several visual aids to help you understand and validate your dbt project:<br>

- **Lineage View**: Automatically generates a dependency graph of your models, showing how data flows between sources and transformations.<br>
- **Compiled SQL View**: Displays the rendered SQL code that dbt executes, allowing you to debug or optimize queries.<br>
- **Run Results Panel**: Shows model-level success, failure, and execution time for each dbt command.<br>

These built-in tools help ensure your transformations are transparent, reliable, and easy to maintain.

## Schedule dbt jobs in Microsoft Fabric

Microsoft Fabric lets you automate dbt job runs using the built-in Schedule feature. Automation is ideal for refreshing models, running tests, or keeping data pipelines up to date—without manual intervention.

Scheduling allows you to:

- **Automate model refreshes**: Keep your analytics up to date.
- **Support CI/CD workflows**: Schedule builds and tests after data loads.
- **Reduce manual effort**: dbt jobs run automatically at your chosen intervals.

1. Open your dbt job in Fabric.
1. Select the Schedule tab in the top panel.
1. Select Add schedule to configure a new scheduled run.
    - **Repeat**: Choose how often to run the job (for example, by the minute, hourly, daily, weekly).
    - **Interval**: Set the frequency (for example, every 15 minutes).
    - **Start date and time**: When the schedule should begin.
    - **End date and time**: (Optional) When the schedule should stop.
    - **Time zone**: Select your preferred time zone for scheduling.
1. Select Save to activate the schedule.

    :::image type="content" source="media/dbt-job/schedule-dbt.png" alt-text="Screenshot of the Fabric UI with the dbt job schedule settings.":::

## dbt job settings and commands

Each dbt job in Fabric includes key tabs to help manage your project:

```
my-dbt_project/ 
├── dbt_project.yml     # Project configuration 
├── models/             # SQL models for transformations 
│   ├── staging/ 
│   ├── marts/ 
│   └── analytics/ 
├── schema.yml          # Model tests, descriptions, and metadata 
└── seeds/              # Optional CSV data sources 
```

- **Explorer**: View and organize files such as models, seeds, and YAML configs.
- **Settings**: Adjust adapter configurations like schema, connection, and concurrency.
- **Output Panel**: View run logs, job output, and error messages in real time.

### Supported commands

Fabric supports the following core dbt commands directly from the dbt job interface.

| Command      | Description                                                   |
|-------------|---------------------------------------------------------------|
| dbt build   | Builds all models, seeds, and tests in the project.          |
| dbt run     | Executes all SQL models in dependency order.                 |
| dbt seed    | Loads CSV files from the seeds/ directory.                   |
| dbt test    | Runs schema and data tests defined in schema.yml.            |
| dbt compile | Generates compiled SQL without executing transformations.    |
| dbt snapshot | Captures and tracks slowly changing dimensions over time.   |

## Advanced Selectors

You can selectively run or exclude specific models using selectors.

``` bash
dbt run --select my_model 
dbt build --select staging.* 
dbt build --exclude deprecated_models 
```

Selectors let you target parts of your pipeline for faster iteration during development or testing.

## Adapters Supported

The following dbt adapters are supported in Microsoft Fabric:

- Fabric Data Warehouse
- PostgreSQL

Each adapter supports its respective connection parameters and SQL dialect.

## Monitoring features

You can monitor dbt job runs through the **Output Panel** and **Lineage View**:

- **Run Summary**: Displays total models executed, runtime, and success status.
- **Error Logs**: Provide stack traces and query payloads for troubleshooting.
- **Lineage and SQL View**: Inspect model dependencies and compiled SQL for validation.
- **Download Logs**: Export detailed logs or payloads for offline analysis.

These features help maintain reliability and observability across your transformation workflows.

## Limitations and best practices

- **Full Project Runs**: Current preview supports full-project executions only (no partial build caching).
- **Adapter Constraints**: Some partner adapters aren't yet supported in Fabric.
- **Incremental Models**: Ensure proper primary keys and unique constraints for incremental builds.
- **Best Practice**: Keep your models modular and test-driven for easier debugging and faster runs.

To optimize performance, avoid long dependency chains and prefer well-partitioned transformations.

## Related Content

- [dbt Official Documentation](https://docs.getdbt.com/)

