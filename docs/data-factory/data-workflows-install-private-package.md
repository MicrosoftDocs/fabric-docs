---
title: Install a Private Package as a requirement in Data workflows.
description: This tutorial helps to install a Private Package as a requirement in Data workflows.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
# ms.custom:
#   - ignite-2023
ms.date: 03/25/2024
---


# Install a Private Package as a Requirement in Data workflows.

> [!NOTE]
> Data workflows is powered by Apache Airflow.

> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.


## Introduction
A python package is a way to organize related Python modules into a single directory hierarchy. A package is typically represented as a directory that contains a special file called __init__.py. Inside a package directory, you can have multiple Python module files (.py files) that define functions, classes, and variables. In the context of Data workflows, you can create packages to add your custom code.

This guide provides step-by-step instructions on installing `.whl` (Wheel) file, which serves as a binary distribution format for Python package in Data workflows.

For illustration purpose, I create a simple custom operator as python package that can be imported as a module inside dag file.

### Step 1: Develop a custom operator to convert it to private package and an Apache Airflow Dag to test it.

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

3. Create a GitHub Repository containing the `sample_dag.py` in `Dags` folder and your private package file. Common file formats include `zip`, `.whl`, or `tar.gz`. Place the file either in the 'Dags' or 'Plugins' folder, as appropriate. Synchronize your Git Repository with Data workflows or you can use preconfigured repository(Install-Private-Package)[https://github.com/ambika-garg/Install-Private-Package-Fabric]

### Step 2: Add your package as a requirement.

* Add the package as a requirement under `Airflow requirements`. Use the format `/opt/airflow/git/<repoName>.git/<pathToPrivatePackage>`

* For example, if your private package is located at `/dags/test/private.whl` in a GitHub repo, add the requirement `/opt/airflow/git/<repoName>.git/dags/test/private.whl` to the Airflow environment.

    :::image type="content" source="media/data-workflows/private-package.png" alt-text="Screenshot showing private package added as requirement.":::

## Related Content

* [Quickstart: Create a Data workflows](../data-factory/create-data-workflows.md).
