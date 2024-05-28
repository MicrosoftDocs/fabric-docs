---
title: Orchestrating dbt Jobs with Data workflows
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

# Orchestrate DBT Jobs with Data Workflows

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

This tutorial guides you through orchestrating DBT jobs within an Airflow environment in Data Workflows. We walk you through the following steps:

1. Create a DBT project in Data Workflows.
2. To orchestrate DBT jobs, create an Apache Airflow DAG.
3. Run and Monitor the DAG run.

## Introduction

The [DBT](https://www.getdbt.com/product/what-is-dbt), short for "Data Build Tool," is an open-source command-line interface (CLI) that revolutionizes data transformation and modeling within data warehouses. It addresses a critical challenge of managing complex SQL code in a structured and maintainable way in data pipelines. DBT empowers data teams to build robust, reliable, and testable data transformations that form the core of their analytical pipelines. When integrated with Apache Airflow, a popular workflow management system, DBT becomes a powerful tool for orchestrating data transformations. Airflow's scheduling and task management capabilities allow data teams to automate DBT runs, ensuring regular data updates and maintaining a consistent flow of high-quality data for analysis and reporting. This combined approach, using DBT's transformation expertise with Airflow's workflow management, delivers efficient and robust data pipelines, ultimately leading to faster and more insightful data-driven decisions.


## Prerequisites

To get started, you must complete the following prerequisites:

- Enable Data workflows in your Tenant.

  > [!NOTE]
  > Since Data workflows is in preview state, you need to enable it through your tenant admin. If you already see Data workflows, your tenant admin may have already enabled it.

  1. Go to Admin Portal -> Tenant Settings -> Under Microsoft Fabric -> Expand "Users can create and use Data workflows (preview)" section.

  2. Select Apply.

  :::image type="content" source="media/data-workflows/enable-data-workflow-tenant.png" lightbox="media/data-workflows/enable-data-workflow-tenant.png" alt-text="Screenshot to enable Apache Airflow in tenant.":::

- [Create the Service Principal](/entra/identity-platform/howto-create-service-principal-portal). Add the service prinipal as the `Contributor` in the workspace where you create data warehouse.

- If you don't have one, [Create a Fabric warehouse](../data-warehouse/create-warehouse.md). Ingest the sample data into the warehouse using data pipeline. For this tutorial, we use the <strong>NYC Taxi-Green</strong> sample.

- [Create the "Data workflows" in the workspace.](../data-factory/create-data-workflows.md)

## Create a DBT project in Data Workflows.

1. Add the following packages as Apache Airflow requirements.
  - apache-airflow-providers-microsoft-azure
  - dbt-fabric

:::image type="content" source="media/data-workflows/dbt-requirements.png" lightbox="media/data-workflows/dbt-requirements.png" alt-text="Screenshot shows Apache Airflow requirements needed for the DBT.":::

2. In this section, we create a sample dbt project in the Data workflows for the dataset nyc-taxi green with the following directory structure.

```bash
  dags
  |-- dbt_dag.py
  |-- nyc_taxi_green
  |  |-- profiles.yml
  |  |-- dbt_project.yml
  |  |-- models
  |  |   |-- nyc_trip_count.sql
  |  |-- target
```

2.1 Create the folder `nyc_taxi_green` under `dags` with `profiles.yml` file.

:::image type="content" source="media/data-workflows/dbt-profiles.png" lightbox="media/data-workflows/dbt-profiles.png" alt-text="Screenshot shows create files for the dbt project.":::

2.2 Copy the following contents into the `profiles.yml`. This configuration file contains database connection details and profiles used by dbt.
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

2.2 Create the `dbt_project.yml` file and copy the following contents. This file specifies the project-level configuration.
```yaml
name: 'nyc_taxi_green'

config-version: 2
version: '0.1'

profile: 'nyc_taxi_green'

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
      staging:
        materialized: view
```

2.3 Create the `models` folder with `nyc_trip_count.sql` file in dbt folder. For this tutorial, we create the sample model that creates the table showing number of trips per day per vendor. Copy the following contents of the file.
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

:::image type="content" source="media/data-workflows/dbt_models.png" lightbox="media/data-workflows/dbt_models.png" alt-text="Screenshot shows create models for the dbt project.":::

## Create an Apache Airflow DAG to orchestrate DBT jobs.

- Create the following dag containing the BashOperator that runs the `dbt run` command. Create the file named `dbt_dag.py` in `Dags` folder and Paste the following contents in it.
```python
import os
from pathlib import Path
from datetime import datetime
from airflow import DAG
from airflow.operators.bash import BashOperator

DEFAULT_DBT_ROOT_PATH = Path(__file__).parent.parent / "dags" / "nyc_taxi_green"
DBT_ROOT_PATH = Path(os.getenv("DBT_ROOT_PATH", DEFAULT_DBT_ROOT_PATH))

# Define the default arguments for the DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2023, 5, 1),
    'email_on_failure': False,
    'email_on_retry': False,
}

# Instantiate the DAG object
with DAG(
    'orchestrate_dbt_jobs',
    default_args=default_args,
    description='A DAG that runs the DBT jobs.',
    schedule_interval=None,
    catchup=False
) as dag:

    dbt_debug = BashOperator(
      task_id='dbt_run',
      bash_command=f'dbt run  --profiles-dir {DBT_ROOT_PATH} --project-dir {DBT_ROOT_PATH}'
    )

    # Set the task dependencies
    dbt_debug
```

## Run and Monitor the DAGs.
1. Run the DAG from Data workflows.
:::image type="content" source="media/data-workflows/dbt_successful.png" lightbox="media/data-workflows/dbt_successful.png" alt-text="Screenshot shows successful dbt dag.":::

2. To see your DAGs loaded in the Apache Airflow UI, Click on Monitor in Apache Airflow.

3. You can now see the new table named 'nyc_trip_count.sql' created in your Fabric data warehouse.

:::image type="content" source="media/data-workflows/run-directed-acyclic-graph.png" lightbox="media/data-workflows/run-directed-acyclic-graph.png" alt-text="Screenshot shows run dag.":::

## Related Content

[Quickstart: Create a Data workflow](../data-factory/create-data-workflows.md)
