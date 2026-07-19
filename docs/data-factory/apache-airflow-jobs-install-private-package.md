---
title: Install a Private Package as a requirement in Apache Airflow Job
description: This tutorial shows how to install private package as a requirement in Apache Airflow Job.
ms.reviewer: xupxhou, makromer
ms.topic: how-to
ms.custom: airflows
ms.date: 06/30/2026
---

# Install a Private Package as a requirement in Apache Airflow job

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

A Python package lets you organize related Python modules into a single directory hierarchy. A package is typically represented as a directory that contains a special file called **init**.py. Inside a package directory, you can have multiple Python module files (.py files) that define functions, classes, and variables. With Apache Airflow Jobs, you can develop your own private packages to add custom Apache Airflow operators, hooks, sensors, plugins, and more.

In this tutorial, you'll build a simple custom operator as a Python package, add it as a requirement in your Apache Airflow job, and import your private package as a module in your DAG file.

## Develop a custom operator and test with an Apache Airflow Dag

1. Create a file called `sample_operator.py` and turn it into a private package. If you need help, check out this guide: [Creating a package in python](https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/modules_management.html#creating-a-package-in-python)

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

2. Next, create an Apache Airflow DAG file called `sample_dag.py` to test the operator you made in the first step.

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

1. Set up a GitHub repository with your `sample_dag.py` file in the `dags` folder. Then put your private package file in `plugins`. You can use formats like `zip`, `.whl`, or `tar.gz`. Connect your Git repository to your Apache Airflow job, or try the ready-made example at [Install-Private-Package](https://github.com/ambika-garg/Install-Private-Package-Fabric).

## Add your package as a requirement

Add the package under `Airflow requirements` using the format `/opt/airflow/git/<repoName>/<pathToPrivatePackage>`

For example, if your private package sits at `/dags/test/private.whl` in your GitHub repo, just add `/opt/airflow/git/<repoName>/dags/test/private.whl` to your Airflow environment.

:::image type="content" source="media/apache-airflow-jobs/private-package.png" lightbox="media/apache-airflow-jobs/private-package.png" alt-text="Screenshot showing private package added as requirement.":::

> [!NOTE]
> Be sure to use the `plugins` folder and not the `dags` folder for hosting your own packages.

## Install a private library from the plugins/libs folder

If you don't use a connected Git repository, you can upload a wheel file directly to your Apache Airflow job's `plugins/libs` folder and reference it as a requirement. This approach doesn't require an external repository.

1. Upload your `.whl` file to the `plugins/libs` folder in your Apache Airflow job's file storage.

1. Add the wheel file as a requirement using the relative path format `plugins/libs/<your-wheel-file>.whl`.

   For example:

   ```
   plugins/libs/apache_airflow_providers_microsoft_fabric-0.1.0-py3-none-any.whl
   ```

1. Restart your Apache Airflow job for the requirement to take effect.

## Related Content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
