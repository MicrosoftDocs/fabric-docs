---
title: dbt job
description: Learn how to use dbt job to transform your data using SQL.
ms.reviewer: whhender
ms.author: akurnala
author: 
ms.topic: A dbt job runs SQL-based data transformations in Fabric, scheduled and managed natively.
ms.date: 10/11/2025
ms.custom:
   - dbt
---
# What is dbt job ?

 dbt jobs in Microsoft Fabric enable SQL-based data transformations directly within the Fabric user interface. They provide a simple, no-code setup to build, test, and deploy dbt models on top of 
 your Fabric data warehouse.
 
 With dbt jobs, you can develop and manage your transformation logic in one place—without relying on the command line or external orchestration tools. Fabric’s integration with dbt Core allows you to schedule,
 monitor, and visualize dbt workflows using the same workspace where your data pipelines and reports live.
 
 This native experience simplifies collaboration, improves governance, and ensures that every transformation aligns with your organization’s security and compliance policies.

 # Prerequisites
 # Setup Requirements
 
 Before creating dbt jobs in Microsoft Fabric, ensure your environment is properly configured:
 1. Enable dbt Jobs:
- Go to the Admin Portal in Fabric.
- Under Tenant Settings, enable the dbt Jobs (Preview) feature for your organization or specific security groups.
  
 2. Create a Workspace:
 - In the Fabric portal, select Workspaces > New workspace.
 - Assign the appropriate permissions (Contributor or higher) for users who will create or edit dbt jobs.
   
 3. Set Up a Fabric Data Warehouse:
 - dbt jobs require a connection to a Fabric Data Warehouse.
 - Verify that your workspace includes at least one warehouse and that you have write access.
   
 4. Permissions and Access:
 - Ensure you have both build and read/write access to linked datasets and connections.
 - Check that your Fabric environment supports the latest dbt Core version supported by Fabric.

# Create dbt Job
# Overview
 1. Navigate to your Fabric workspace.
 2. Select New item > dbt job from the item creation menu.
 3. Enter a name and select a location.
    :::image type="content" source="media/dbt-activity/create_job.png" alt-text="Screenshot of the Fabric UI with the create job pop up .":::
    
 4. Choose the target Fabric Data Warehouse connection.
 5. Configure job parameters and save the new dbt job item.
    
  Once created, you can open the dbt job to view its file structure, configure settings, and run dbt commands directly from the Fabric UI.

   :::image type="content" source="media/dbt-activity/landing_page.png" alt-text="Screenshot of the Fabric UI with landing page of dbt job":::

 # Configuring dbt Job
 When creating or editing a dbt job, click the dbt configurations button to open the profile setup
 page. Here, you’ll define how your dbt job connects to your data warehouse.

 Use dbt configurations to set (or review) your dbt Profile:<br>
 - **Adapter**: DataWarehouse (default in Fabric) <br>
 - **Connection name**: e.g., dbtsampledemowarehouse<br>
 - **Schema (required)**: e.g., jaffle_shop_demo<br>
 - **Seed data**: optionally enable to load CSVs from /seeds as managed tables <br>
 
  **Steps**
 1. Open your dbt job → click dbt configurations.
 2. Confirm the Adapter (default is DataWarehouse).
 3. Verify Connection name.
 4. Enter Schema (e.g., jaffle_shop_demo).
 5. (Optional) Check Seed date if you want to load CSVs on dbt seed or dbt build.
 6. Click Apply.

:::image type="content" source="media/dbt-activity/profile_adapter.png" alt-text="Screenshot of the Fabric UI with the dbt job profile adapter settings.":::

 **Change adapter (when and how)**
 
 **What it is**: A control at the top‑left of the dbt configurations page that lets you change the dbt
 adapter used by the job’s Profile.
 
 **When to use it**:
 - Your workspace connection changes (e.g., moving to a different Fabric Data Warehouse).
 - You’re creating demos that contrast adapters (e.g., a future PostgreSQL path), or you cloned a job and need to point it to a new target.
 - You’re standardizing schemas across environments (dev → test → prod) and need a different connection behind the scenes.
   
 **What changes when you switch**:
 - The Adapter and Connection backing the Profile.
 - Dependent fields (e.g., Schema) may need re‑validation.
 - Runtime behavior must align with the adapter’s SQL dialect and capabilities.

 # Advanced Settings
 
 After configuring your dbt job’s Profile, click Advanced Settings to fine-tune execution and run
 behavior. The Advanced Settings panel is split into two tabs:
 
 **General Settings**:<br>
 Here you can adjust project-level execution options:<br>
 
 - **Threads**: Set the number of parallel threads for dbt execution (e.g., 4 for medium workloads).<br>
 - **Fail fast**: If enabled, dbt will stop immediately if any resource fails to build.<br>
 - **Full refresh**: Forces dbt to rebuild all models from scratch, ignoring incremental logic.<br>

 **How to use**:
 1. Click Advanced Settings → General.
 2. Set the desired number of threads.
 3. (Optional) Enable Fail fast or Full refresh as needed.
 4. Click Apply to save.

:::image type="content" source="media/dbt-activity/advanced_settings.png alt-text="Screenshot of the Fabric UI with the dbt job advanced run settings.":::

 **Run Settings**
 
 This tab lets you control which models to run and how to select them:
 **Run mode**:
 - Run only selected models: Choose specific models to include in the run (e.g., orders, stg_customers, etc.).
 - Run with advanced selectors: Use dbt selectors for granular control (unions, intersections, exclusions).
   :::image type="content" source="media/dbt-activity/run_settings.png alt-text="Screenshot of the Fabric UI with the dbt job advanced run settings.":::
   
 **Advanced selector configuration**:
 - Selector: Name your selector.
 - Select: Specify resources (models, tags, packages).
 - Exclude: List resources to skip.
   :::image type="content" source="media/dbt-activity/running_with_advance_selectors.png alt-text="Screenshot of the Fabric UI with the dbt job advanced selector run settings.":::

**How to use**
 1. Click Advanced Settings → Run settings.
 2. Choose your run mode:
 For simple runs, select models from the tree.
 For advanced runs, configure selectors for targeted execution.
 3. Click Apply to save.

# Project Structure
 Each dbt job follows a standard project layout:
 
 - dbt_project.yml defines project-level settings like model paths and configurations.
 - models/ contains your SQL files, each representing a model built on top of source data.
 - schema.yml stores tests, documentation, and relationships.
 - seeds/ lets you upload CSVs to use as static reference data.

# Visual Tools
 Fabric provides several visual aids to help you understand and validate your dbt project:<br>
 
 - **Lineage View**: Automatically generates a dependency graph of your models, showing how data flows between sources and transformations.<br>
 - **Compiled SQL View**: Displays the rendered SQL code that dbt executes, allowing you to debug or optimize queries.<br>
 - **Run Results Panel**: Shows model-level success, failure, and execution time for each dbtcommand.<br>
 
 These built-in tools help ensure your transformations are transparent, reliable, and easy to maintain.

# Scheduling dbt Jobs in Microsoft Fabric
 Microsoft Fabric lets you automate dbt job runs using the built-in Schedule feature. This is ideal for refreshing models, running tests, or keeping data pipelines up to date—without manual intervention.
 
 **How to schedule a dbt job**
 1. Open your dbt job in Fabric.
 2. Click the Schedule tab in the top panel.
 3. Click Add schedule to configure a new scheduled run.
    
 **Scheduling options**:
 - **Repeat**: Choose how often to run the job (e.g., by the minute, hourly, daily, weekly).
 - **Interval**: Set the frequency (e.g., every 15 minutes).
 - **Start date and time**: When the schedule should begin.
 - **End date and time**: (Optional) When the schedule should stop.
 - **Time zone**: Select your preferred time zone for scheduling.
 4. Click Save to activate the schedule.
   
 **Screenshot reference**: 
 :::image type="content" source="media/dbt-activity/schedule_dbt.png alt-text="Screenshot of the Fabric UI with the dbt job schedule settings.":::

 **Why use scheduling?** <br>
 
 - **Automate model refreshes**: Keep your analytics up to date.<br>
 - **Support CI/CD workflows**: Schedule builds and tests after data loads.<br>
 - **Reduce manual effort**: dbt jobs run automatically at your chosen intervals.<br>

# dbt Job Settings and Commands

 **Settings and Tabs**:<br>
 Each dbt job in Fabric includes key tabs to help manage your project:
 ```
my_dbt_project/ 
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
 This layout mirrors the dbt developer workflow but provides a streamlined, UI-based experience for Fabric users.
 
 **Supported Commands**<br>
 Fabric supports the following core dbt commands directly from the dbt job interface.

| Command      | Description                                                   |
|-------------|---------------------------------------------------------------|
| dbt build   | Builds all models, seeds, and tests in the project.          |
| dbt run     | Executes all SQL models in dependency order.                 |
| dbt seed    | Loads CSV files from the seeds/ directory.                   |
| dbt test    | Runs schema and data tests defined in schema.yml.            |
| dbt compile | Generates compiled SQL without executing transformations.    |
| dbt snapshot | Captures and tracks slowly changing dimensions over time.   |

 # Advanced Selectors
  You can selectively run or exclude specific models using selectors.
  ``` bash
 dbt run --select my_model 
 dbt build --select staging.* 
 dbt build --exclude deprecated_models 
  ```
  Selectors let you target parts of your pipeline for faster iteration during development or testing.

# dbt Version Supported
 Fabric currently supports dbt Core v1.7 (subject to periodic updates). Microsoft maintains alignment with major dbt Core releases to ensure compatibility and feature parity. Updates are applied automatically, 
 with notifications in the Fabric release notes.

# Adapters Supported
 The following dbt adapters are supported in Microsoft Fabric: <br>
 - Fabric Data Warehouse
 - PostgreSQL
   
 **Upcoming adapter support:**
 - Snowflake
 - SQL Server
 - databricks
 
 Each adapter supports its respective connection parameters and SQL dialect.

# Monitoring Features

 You can monitor dbt job runs through the **Output Panel** and **Lineage View**:
 
 - **Run Summary**: Displays total models executed, runtime, and success status.
 - **Error Logs**: Provide stack traces and query payloads for troubleshooting.
 - **Lineage and SQL View**: Inspect model dependencies and compiled SQL for validation.
 - **Download Logs**: Export detailed logs or payloads for offline analysis.
 These features help maintain reliability and observability across your transformation workflows.

# Considerations
 # Limitations and Best Practices
 - **Full Project Runs**: Current preview supports full-project executions only (no partial build
 caching).
 - **Adapter Constraints**: Some third-party adapters are not yet supported in Fabric.
 - **Incremental Models**: Ensure proper primary keys and unique constraints for incremental builds.
 - **Best Practice**: Keep your models modular and test-driven for easier debugging and faster runs.
   
 To optimize performance, avoid long dependency chains and prefer well-partitioned transformations.

 # Next Steps
 **Explore Advanced Features**
 Once you’ve created and validated your dbt job, explore the following to enhance your workflow:
 
 - Use advanced selectors for modular runs.
 - Add snapshots to track historical changes.
 - Schedule automated dbt runs to refresh models regularly.
 - Integrate with Fabric pipelines for multi-step orchestration.
   
 # Related Content
 # Learn More <br>
 [Microsoft Fabric Documentation](https://learn.microsoft.com/en-us/fabric/) <br>
 [dbt Official Documentation](https://docs.getdbt.com/) <br>
 [Fabric Data Factory Overview](https://learn.microsoft.com/en-us/fabric/data-factory/) <br>
 [Getting Started with dbt in Fabric (Tutorial)](https://statics.teams.cdn.office.net/evergreen-assets/safelinks/2/atp-safelinks.html)
