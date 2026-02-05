---
title: Add a Kubernetes secret to pull an image from a private container registry
description: This article explains how to add a Kubernetes secret to pull container image from a private container registry.
ms.reviewer: xupxhou, abnarain
ms.topic: how-to
ms.custom: airflows, sfi-image-nochange
ms.date: 03/25/2024
---

# Add a Kubernetes secret in Apache Airflow job

> [!NOTE]
> Apache Airflow job is powered by [Apache Airflow](https://airflow.apache.org/).

A Kubernetes secret is an object designed to securely store sensitive information, such as passwords, tokens, or keys. By utilizing secrets, you avoid embedding confidential data directly in your application code.

This guide walks you through adding a Kubernetes secret in an Apache Airflow environment hosted on Microsoft Fabric to pull container images from private registries. For this example, we’ll use Azure Container Registry to create a custom image, which will then be pulled within an Airflow DAG.

## Prerequisites

- **Azure Container Registry**: Configure an [Azure Container Registry](/azure/container-registry/container-registry-get-started-portal?tabs=azure-cli) with the custom image you want to use in the directed acyclic graph (DAG). For more information on push and pull container images, see [Push and pull container image - Azure Container Registry](/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli).

### Add a Kubernetes secret.

1. Navigate to the `Environment configuration` page by clicking on `Configure Airflow`.
2. Under `Kubernetes secrets` section, click on `New` button.
   :::image type="content" source="media/apache-airflow-jobs/kubernetes-new-secret.png" lightbox="media/apache-airflow-jobs/kubernetes-new-secret.png" alt-text="Screenshot that shows button to add new Kubernetes secret." :::
3. Fill out the fields that appear in the dialog box:
   - <strong>Name</strong>: Name of the Kubernetes secret.
   - <strong>Namespace</strong>: The namespace to run within Kubernetes. By default: Fill the field as `adf`.
   - <strong>Secret type</strong>: Choose the type of the secret between the values: `Private registry credential` and `Basic auth credential`.
   - <strong>Registry server url</strong>: URL of your private container registry, for example, `\registry_name\>.azurecr.io`.
   - <strong>Username</strong>: Username of your private container registry.
   - <strong>Password</strong>: Password to access the private container registry.
   :::image type="content" source="media/apache-airflow-jobs/kubernetes-new-secret-form.png" lightbox="media/apache-airflow-jobs/kubernetes-new-secret-form.png" alt-text="Screenshot that shows form to add new Kubernetes secret." :::
4. Once all the fields are filled, click on the `Create` button to finalize the creation of the Kubernetes secret.

### A sample DAG that uses stored Kubernetes secret to pull a custom image from ACR.

```python
from datetime import datetime, timedelta
from airflow import DAG
from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator
from kubernetes.client import models as kubernetes

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

acr_kubernetes = KubernetesPodOperator(
    task_id="task-one",
    namespace="adf",
    image="<docker_image_you_wish_to_launch>",
    image_pull_secrets=[kubernetes.V1LocalObjectReference("<stored_kubernetes_password")],
    cmds=["echo", "10"],
    labels={"foo": "bar"},
    name="private-image-pod",
    in_cluster=True,
    dag=dag,
)
```

## Related Content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
