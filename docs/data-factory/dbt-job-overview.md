---
title: dbt job in Microsoft Fabric (preview)
description: Learn how to use dbt job in Microsoft Fabric to transform your data with SQL.
ms.reviewer: whhender
ms.author: akurnala
author: abhinayakurnala1
ms.date: 11/18/2025
ms.topic: overview
ms.custom:
   - dbt
ai-usage: ai-assisted
---

# dbt job in Microsoft Fabric (preview)

> [!NOTE]
> This feature is in [preview](/fabric/fundamentals/preview).

[dbt](https://docs.getdbt.com/) job in Microsoft Fabric brings the power of dbt (Data Build Tool) directly into the Fabric experience. You can transform data with SQL in a familiar, unified environment. Build, test, and deploy dbt models on top of your Fabric data warehouse or other supported warehouses—no need to install local tools or manage external orchestration.

You can develop and manage transformation logic entirely within Fabric. Author your models, define dependencies, and run tests in one place while you use Fabric's enterprise-grade security and governance.

Fabric integrates with dbt Core to provide:

- No-code setup for onboarding and configuration
- Native scheduling and monitoring to keep workflows reliable and transparent
- Visual insights into dbt runs, tests, and lineage—all within the same workspace as your pipelines and reports

This approach combines the flexibility of code-first development with the simplicity of low-code orchestration so analytics and engineering teams can collaborate and scale transformations across the organization.

## Prerequisites

Before you create a dbt job in Microsoft Fabric, make sure your environment is set up correctly:

- [Enable dbt jobs](#enable-dbt-jobs)
- [Set up your workspace and warehouse](#set-up-your-workspace-and-warehouse)
- [Set permissions and access](#permissions-and-access)

 ### Adapters Supported
 
 You can connect a dbt job to multiple data sources using supported adapters. This enables dbt models to run transformations directly on your chosen platform. Currently supported adapters are listed below, with plans to expand support for more adapters in future releases.
 - Microsoft Fabric Warehouse
 - Snowflake
 - PostgreSQL
 - Azure SQL Server

### How to enable dbt jobs preview

1. Go to the [admin portal](/fabric/admin/admin-center) in Fabric.
1. Under **Tenant settings**, enable the **dbt jobs (preview)** feature for your organization or specific security groups.

   :::image type="content" source="media/dbt-job/enable-dbt.png" alt-text="Screenshot of the Fabric UI with the tenant settings to enable dbt job." lightbox="media/dbt-job/enable-dbt.png":::

### Set up your workspace and warehouse

- [Create a workspace](/fabric/fundamentals/create-workspaces) if you don't have one.
- [Set up a Fabric Data Warehouse](/fabric/data-warehouse/create-warehouse) if you don't have one.

### Permissions and access

- In your Fabric workspace, you need a [Contributor role](/fabric/fundamentals/roles-workspaces) or higher to create or manage dbt jobs.
- For the target Fabric Data Warehouse, you need [read/write permissions](/fabric/data-warehouse/share-warehouse-manage-permissions#manage-permissions) to run dbt transformations.
- You need both build and read/write access to linked datasets and connections.

You can find the links to tutorials on how to create a new project or import an exisiting project in the related content section below.

## dbt job runtime

In Microsoft Fabric, a dbt Job Runtime is a managed execution environment that provides a consistent and secure way to run dbt jobs. It simplifies execution by offering a versioned environment that includes dbt capabilities, ensuring reliability and performance across workloads. 

Currently, when you create a dbt job, by default it uses **Runtime v1.0**, which supports **dbt Core v1.9** and includes adapters for **Microsoft Fabric Warehouse**, **Azure SQL Database**, **PostgreSQL**, and **Snowflake**.

## Limitations and best practices

- **Full project runs**: Currently, preview supports full-project runs only (no partial build caching).
- **Incremental models**: Make sure you have proper primary keys and unique constraints for incremental builds.
- **Adapter constraints**: Some partner adapters aren't yet supported in Fabric. See [dbt job runtime](#dbt-job-runtime) for supported adapters.

### Best practices

- Keep your models modular and test-driven for easier debugging and faster runs.
- To optimize performance, avoid long dependency chains and prefer well-partitioned transformations.

## Related content

- [dbt Official Documentation](https://docs.getdbt.com/)
- [Step-by-step-tutorial-using-jaffle-shop-project](How-to-practice-with-a-sample-project-for-dbt-job.md/)
