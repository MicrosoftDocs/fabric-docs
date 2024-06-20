---
title: Transform data using dbt
description: This tutorial guides you through orchestrating dbt jobs using Data workflows.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
ms.custom:
  - build-2024
# ms.custom:
#   - ignite-2023
ms.date: 05/24/2024
---

# Transform data using dbt

> [!NOTE]
> Data workflows is powered by Apache Airflow.
>
> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

The [dbt](https://www.getdbt.com/product/what-is-dbt), short for "Data Build Tool," is an open-source command-line interface (CLI) that revolutionizes data transformation and modeling within data warehouses. It addresses a critical challenge of managing complex SQL code in a structured and maintainable way in data pipelines. dbt empowers data teams to build robust, reliable, and testable data transformations that form the core of their analytical pipelines. When integrated with Apache Airflow, a popular workflow management system, dbt becomes a powerful tool for orchestrating data transformations. Airflow's scheduling and task management capabilities allow data teams to automate dbt runs. It ensures regular data updates and maintains a consistent flow of high-quality data for analysis and reporting. This combined approach, using dbt's transformation expertise with Airflow's workflow management, delivers efficient and robust data pipelines, ultimately leading to faster and more insightful data-driven decisions.

## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Data workflows (preview)" section.

  2. Select Apply.
     :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" lightbox="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

- [Create the Service Principal](/entra/identity-platform/howto-create-service-principal-portal). Add the service principal as the `Contributor` in the workspace where you create data warehouse.

- If you don't have one, [Create a Fabric warehouse](../data-warehouse/create-warehouse.md). Ingest the sample data into the warehouse using data pipeline. For this tutorial, we use the <strong>NYC Taxi-Green</strong> sample.

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md)

## Transform the data stored in Fabric warehouse using dbt

This section walks you through the following steps:

1. [Specify the requirements.](#specify-the-requirements)
2. [Create a dbt project in Fabric managed storage](#create-a-dbt-project-in-fabric-managed-storage).
3. [Create an Apache Airflow DAG to orchestrate dbt jobs](#create-an-apache-airflow-dag-to-orchestrate-dbt-jobs)

### [Specify the requirements](#specify-the-requirements)

Create a file `requirements.txt` in the `dags` folder. Add the following packages as Apache Airflow requirements.

- [astronomer-cosmos](https://www.astronomer.io/cosmos/): This package is used to run your dbt core projects as Apache Airflow dags and Task groups.
- [dbt-fabric](https://pypi.org/project/dbt-fabric/): This package is used to create dbt project, which can then be deployed to a [Fabric Synapse Data Warehouse](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup)

  ```bash
     astronomer-cosmos==1.0.3
     dbt-fabric==1.5.0
  ```

### [Create a dbt project in Fabric managed storage](#create-a-dbt-project-in-fabric-managed-storage)

1. In this section, we create a sample dbt project in the Data workflows for the dataset `nyc_taxi_green` with the following directory structure.

    ```bash
       dags
       |-- my_cosmos_dag.py
       |-- nyc_taxi_green
       |  |-- profiles.yml
       |  |-- dbt_project.yml
       |  |-- models
       |  |   |-- nyc_trip_count.sql
       |  |-- target
    ```

2. Create the folder named `nyc_taxi_green` in the `dags` folder with `profiles.yml` file. This folder contains all the files required for dbt project.
   :::image type="content" source="media/data-workflows/dbt-profiles.png" lightbox="media/data-workflows/dbt-profiles.png" alt-text="Screenshot shows create files for the dbt project.":::

3. Copy the following contents into the `profiles.yml`. This configuration file contains database connection details and profiles used by dbt.
   Update the placeholder values and save the file.

    ```yaml
    config:
      partial_parse: true
    nyc_taxi_green:
      target: fabric-dev
      outputs:
        fabric-dev:
          type: fabric
          driver: "ODBC Driver 18 for SQL Server"
          server: <sql endpoint of your data warehouse>
          port: 1433
          database: "<name of the database>"
          schema: dbo
          threads: 4
          authentication: ServicePrincipal
          tenant_id: <Tenant ID of your service principal>
          client_id: <Client ID of your service principal>
          client_secret: <Client Secret of your service principal>
    ```

5. Create the `dbt_project.yml` file and copy the following contents. This file specifies the project-level configuration.

    ```yaml
    name: "nyc_taxi_green"
    
    config-version: 2
    version: "0.1"
    
    profile: "nyc_taxi_green"
    
    model-paths: ["models"]
    seed-paths: ["seeds"]
    test-paths: ["tests"]
    analysis-paths: ["analysis"]
    macro-paths: ["macros"]
    
    target-path: "target"
    clean-targets:
      - "target"
      - "dbt_modules"
      - "logs"
    
    require-dbt-version: [">=1.0.0", "<2.0.0"]
    
    models:
      nyc_taxi_green:
        materialized: table
    ```

6. Create the `models` folder in the `nyc_taxi_green` folder. For this tutorial, we create the sample model in the file named `nyc_trip_count.sql` that creates the table showing number of trips per day per vendor. Copy the following contents in the file.

    ```SQL
       with new_york_taxis as (
           select * from nyctlc
       ),
       final as (
         SELECT
           vendorID,
           CAST(lpepPickupDatetime AS DATE) AS trip_date,
           COUNT(*) AS trip_count
         FROM
             [contoso-data-warehouse].[dbo].[nyctlc]
         GROUP BY
             vendorID,
             CAST(lpepPickupDatetime AS DATE)
         ORDER BY
             vendorID,
             trip_date;
       )
       select * from final
    ```
    :::image type="content" source="media/data-workflows/dbt-models.png" lightbox="media/data-workflows/dbt-models.png" alt-text="Screenshot shows models for the dbt project.":::
  
  ### [Create an Apache Airflow DAG to orchestrate dbt jobs](#create-an-apache-airflow-dag-to-orchestrate-dbt-jobs)

  Create the file named `my_cosmos_dag.py` in `dags` folder and Paste the following contents in it.
  
    ```python
     import os
     from pathlib import Path
     from datetime import datetime
     from cosmos import DbtDag, ProjectConfig, ProfileConfig, ExecutionConfig
    
     DEFAULT_DBT_ROOT_PATH = Path(__file__).parent.parent / "dags" / "nyc_taxi_green"
     DBT_ROOT_PATH = Path(os.getenv("DBT_ROOT_PATH", DEFAULT_DBT_ROOT_PATH))
     profile_config = ProfileConfig(
         profile_name="nyc_taxi_green",
         target_name="fabric-dev",
         profiles_yml_filepath=DBT_ROOT_PATH / "profiles.yml",
     )
    
     dbt_fabric_dag = DbtDag(
         project_config=ProjectConfig(DBT_ROOT_PATH,),
         operator_args={"install_deps": True},
         profile_config=profile_config,
         schedule_interval="@daily",
         start_date=datetime(2023, 9, 10),
         catchup=False,
         dag_id="dbt_fabric_dag",
     )
    ```

## Run your DAG

1. Run the DAG within Data workflows.
   :::image type="content" source="media/data-workflows/run-directed-acyclic-graph.png" lightbox="media/data-workflows/run-directed-acyclic-graph.png" alt-text="Screenshot shows run dag.":::

1. To see your dag loaded in the Apache Airflow UI, Click on `Monitor in Apache Airflow.`
   :::image type="content" source="media/data-workflows/monitor-directed-acyclic-graph.png" lightbox="media/data-workflows/monitor-directed-acyclic-graph.png" alt-text="Screenshot shows how to monitor dbt dag.":::
   :::image type="content" source="media/data-workflows/dag-run-success.png" lightbox="media/data-workflows/dag-run-success.png" alt-text="Screenshot shows successful dag run.":::

## Validate your data

After a successful run, to validate your data, you can see the new table named 'nyc_trip_count.sql' created in your Fabric data warehouse.
:::image type="content" source="media/data-workflows/dbt-successful.png" lightbox="media/data-workflows/dbt-successful.png" alt-text="Screenshot shows successful dbt dag.":::

## Related content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
