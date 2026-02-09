---
title: Transform data using dbt
description: This tutorial guides you through orchestrating dbt jobs using Apache Airflow Job.
ms.reviewer: xupxhou, abnarain
ms.topic: how-to
ms.custom: airflows
ms.date: 09/08/2025
ai-usage: ai-assisted
---

# Transform data using dbt

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

[dbt (Data Build Tool)](https://www.getdbt.com/product/what-is-dbt) is an open-source command-line interface (CLI) that helps you transform and model data in data warehouses. It manages complex SQL code in a structured, maintainable way, so data teams can create reliable, testable transformations for their analytical pipelines.

When you combine dbt with Apache Airflow, you get the best of both worlds. dbt handles the transformations while Airflow manages scheduling, orchestration, and task management. This approach creates efficient and robust pipelines that lead to faster, more insightful data-driven decisions.

This tutorial shows you how to create an Apache Airflow DAG that uses dbt to transform data stored in Microsoft Fabric Data Warehouse.

## Prerequisites

Before you begin, complete these prerequisites:

- [Create the Service Principal](/entra/identity-platform/howto-create-service-principal-portal). Add the service principal as the `Contributor` in the workspace where you create data warehouse.

- If you don't have one, [Create a Fabric warehouse](../data-warehouse/create-warehouse.md). Ingest the sample data into the warehouse using a pipeline. For this tutorial, we use the **NYC Taxi-Green** sample.

- [Create the "Apache Airflow Job" in the workspace.](../data-factory/create-apache-airflow-jobs.md)

## Transform data in Fabric warehouse using dbt

Follow these steps to set up your dbt transformation:

1. [Specify the requirements](#specify-the-requirements)
1. [Create a dbt project in the Fabric managed storage provided by the Apache Airflow job](#create-a-dbt-project-in-the-fabric-managed-storage-provided-by-the-apache-airflow-job)
1. [Create an Apache Airflow DAG for orchestration](#create-an-apache-airflow-dag-for-orchestration)

### Specify the requirements

1. Create a file called `requirements.txt` in the `dags` folder.

1. Add the following packages as Apache Airflow requirements:

   - [astronomer-cosmos](https://www.astronomer.io/cosmos/): This package runs your dbt core projects as Apache Airflow dags and Task groups.
   - [dbt-fabric](https://pypi.org/project/dbt-fabric/): This package creates dbt projects that you can deploy to a [Fabric Data Warehouse](https://docs.getdbt.com/docs/core/connect-data-platform/fabric-setup).

   ```bash
   astronomer-cosmos==1.10.1
   dbt-fabric==1.9.5   
   ```

### Create a dbt project in the Fabric managed storage provided by the Apache Airflow job

1. Create a sample dbt project in the Apache Airflow Job for the dataset `nyc_taxi_green` with this directory structure:

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

1. Create a folder named `nyc_taxi_green` in the `dags` folder with a `profiles.yml` file. This folder contains all the files you need for your dbt project.
   :::image type="content" source="media/apache-airflow-jobs/dbt-profiles.png" lightbox="media/apache-airflow-jobs/dbt-profiles.png" alt-text="Screenshot of creating files for the dbt project.":::

1. Copy the following contents into the `profiles.yml` file. This configuration file contains database connection details and profiles that dbt uses. Update the placeholder values and save the file.

   ```yaml
   config:
     partial_parse: true
   nyc_taxi_green:
     target: fabric-dev
     outputs:
       fabric-dev:
         type: fabric
         driver: "ODBC Driver 18 for SQL Server"
         server: <sql connection string of your data warehouse>
         port: 1433
         database: "<name of the database>"
         schema: dbo
         threads: 4
         authentication: ServicePrincipal
         tenant_id: <Tenant ID of your service principal>
         client_id: <Client ID of your service principal>
         client_secret: <Client Secret of your service principal>
   ```

1. Create the `dbt_project.yml` file and copy the following contents. This file specifies the project-level configuration.

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

1. Create the `models` folder in the `nyc_taxi_green` folder. For this tutorial, create a sample model in a file named `nyc_trip_count.sql` that creates a table showing the number of trips per day per vendor. Copy the following contents into the file.

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

   :::image type="content" source="media/apache-airflow-jobs/dbt-models.png" lightbox="media/apache-airflow-jobs/dbt-models.png" alt-text="Screenshot of models for the dbt project.":::

### Create an Apache Airflow DAG for orchestration

1. Create a file named `my_cosmos_dag.py` in the `dags` folder and paste the following contents into it:

   ```python
    import os
    from pathlib import Path
    from datetime import datetime
    from cosmos import DbtDag, ProjectConfig, ProfileConfig, ExecutionConfig
    from airflow import DAG

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

1. Run the DAG within Apache Airflow Job.
   :::image type="content" source="media/apache-airflow-jobs/run-directed-acyclic-graph.png" lightbox="media/apache-airflow-jobs/run-directed-acyclic-graph.png" alt-text="Screenshot of running the dag.":::

1. To see your dag loaded in the Apache Airflow UI, select **Monitor in Apache Airflow**.
   :::image type="content" source="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" lightbox="media/apache-airflow-jobs/monitor-directed-acyclic-graph.png" alt-text="Screenshot of monitoring the dbt dag.":::
   :::image type="content" source="media/apache-airflow-jobs/dag-run-success.png" lightbox="media/apache-airflow-jobs/dag-run-success.png" alt-text="Screenshot of a successful dag run.":::

1. After a successful run, validate your data by checking the new table named 'nyc_trip_count.sql' in your Fabric data warehouse.
   :::image type="content" source="media/apache-airflow-jobs/dbt-successful.png" lightbox="media/apache-airflow-jobs/dbt-successful.png" alt-text="Screenshot of a successful dbt dag.":::

## Related content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
