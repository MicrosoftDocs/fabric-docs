---
title: Add a Kubernetes secret to pull an image from a private container registry.
description: This article explains how to add a Kubernetes secret to pull a custom image from a private container registry.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
ms.date: 03/25/2024
---

# Add a Kubernetes secret in Data workflows.

## Introduction

> [!NOTE]
> Data workflows is powered by Apache Airflow.</br>[Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

This article shows how to add a Kubernetes secret in Apache Airflow environment in Fabric to pull a custom image from an Azure Container Registry.

## Prerequisites
- **Azure Container Registry**: Configure an [Azure Container Registry](/azure/container-registry/container-registry-get-started-portal?tabs=azure-cli) with the custom image you want to use in the directed acyclic graph (DAG). For more information on push and pull container images, see [Push and pull container image - Azure Container Registry](/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli).

### Add a Kubernetes secret.

1. Navigate to the `Environment configuration` page by clicking on `Configure Airflow`.
2. Under `Kubernetes secrets` section, click on `New` button.
:::image type="content" source="media/data-workflows/K8s-new-secret.png" alt-text="Screenshot that shows button to add new K8s secret." :::
3. Fill out the fields that appear in Dialog box:
    * <strong>Name</strong>: Name of the Kubernetes secret.
    * <strong>Namespace</strong>: The namespace to run within kubernetes. By default: Fill the field as `adf`.
    * <strong>Secret type</strong>: Choose the type of the secret between the values: `Private registry credential` and `Basic auth credential`.
    * <strong>Registry server url</strong>: URL of your private container registry, for example, ```\registry_name\>.azurecr.io```.
    * <strong>Username</strong>: Username of your private container registry.
    * <strong>Password</strong>: Password to access the private container registry.
:::image type="content" source="media/data-workflows/K8s-new-secret-form.png" alt-text="Screenshot that shows form to add new K8s secret." :::
4. Once all the fields are filled, click on the `Create` button to finalize the creation of the Kubernetes secret.

### A sample DAG using stored Kubernetes secret to pull a custom image from ACR.

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator
from kubernetes.client import models as k8s

default_args = {
    "retries": 1,
    "retry_delay": timedelta(minutes=3),
}

dag = DAG(
    dag_id="pull_custom_image_from_acr",
    start_date=datetime(2022, 5, 14),
    schedule_interval="@daily",
    catchup=False,
    default_args=default_args,
)

acr_k8s = KubernetesPodOperator(
    task_id="task-one",
    namespace="adf",
    image="<docker_image_you_wish_to_launch>",
    image_pull_secrets=[k8s.V1LocalObjectReference("<stored_k8s_password")],
    cmds=["echo", "10"],
    labels={"foo": "bar"},
    name="private-image-pod",
    in_cluster=True,
    dag=dag,
)

```


## Related Content

* Quickstart: [Create a Data workflows](../data-factory/create-data-workflows.md).
