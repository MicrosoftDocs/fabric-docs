---
title: Install a Private Package as a requirement in Apache Airflow Job
description: This tutorial shows how to install private package as a requirement in Apache Airflow Job.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
ms.custom: airflows
ms.date: 06/30/2025
---

# Install a Private Package as a requirement in Apache Airflow job

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

A python package is a way to organize related Python modules into a single directory hierarchy. A package is typically represented as a directory that contains a special file called **init**.py. Inside a package directory, you can have multiple Python module files (.py files) that define functions, classes, and variables. In the context of Apache Airflow Job, you can develop you private packages to add custom Apache Airflow operators, hooks, sensors, plugins etc.

In this tutorial, you will create a simple custom operator as a Python package, add it as a requirement in the Apache Airflow job environment, and import the private package as a module within the DAG file.

## Develop a custom operator and test with an Apache Airflow Dag

1. Create a file `sample_operator.py` and convert it to Private Package. Refer to the guide: [Creating a package in python](https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/modules_management.html#creating-a-package-in-python)

   ```python
   from airflow.models.baseoperator import BaseOperator


   class SampleOperator(BaseOperator):
       def __init__(self, name: str, **kwargs) -> None:
           super().__init__(**kwargs)
           self.name = name

       def execute(self, context):
           message = f"Hello {self.name}"
           return message

   ```

2. Create the Apache Airflow DAG file `sample_dag.py` to test the operator defined in Step 1.

   ```python
   from datetime import datetime
   from airflow import DAG

    # Import from private package
   from airflow_operator.sample_operator import SampleOperator


   with DAG(
   "test-custom-package",
   tags=["example"]
   description="A simple tutorial DAG",
   schedule_interval=None,
   start_date=datetime(2021, 1, 1),
   ) as dag:
       task = SampleOperator(task_id="sample-task", name="foo_bar")

       task
   ```

3. Create a GitHub Repository containing the `sample_dag.py` in `Dags` folder and your private package file. Common file formats include `zip`, `.whl`, or `tar.gz`. Place the file either in the 'Dags' or 'Plugins' folder, as appropriate. Synchronize your Git Repository with Apache Airflow Job or you can use preconfigured repository at [Install-Private-Package](https://github.com/ambika-garg/Install-Private-Package-Fabric).

## Add your package as a requirement

Add the package as a requirement under `Airflow requirements`. Use the format `/opt/airflow/git/<repoName>/<pathToPrivatePackage>`

For example, if your private package is located at `/dags/test/private.whl` in a GitHub repo, add the requirement `/opt/airflow/git/<repoName>/dags/test/private.whl` to the Airflow environment.

:::image type="content" source="media/apache-airflow-jobs/private-package.png" lightbox="media/apache-airflow-jobs/private-package.png" alt-text="Screenshot showing private package added as requirement.":::

## Related Content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
