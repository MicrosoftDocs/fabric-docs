---
title: Enable Azure Key Vault for Apache Airflow Backend
description: This article explains how to enable Azure Key Vault as the secret backend in Data workflows.
description: This article explains how to enable Azure Key Vault as the secret backend in Data workflows.
ms.reviewer: xupxhou
ms.author: abnarain
author: abnarain
ms.topic: how-to
ms.date: 03/25/2024
---

# Enable Azure Key Vault as a Secret Backend

## Introduction

> [!NOTE]
> Data workflows is powered by Apache Airflow. </br> [Apache Airflow](https://airflow.apache.org/) is an open-source platform used to programmatically create, schedule, and monitor complex data workflows. It allows you to define a set of tasks, called operators, that can be combined into directed acyclic graphs (DAGs) to represent data pipelines.

Apache Airflow offers various backends for securely storing sensitive information such as variables and connections. One of these options is Azure Key Vault. This article walks you through the process of configuring Key Vault as the secret backend for Data worflows in Data Factory.

## Prerequisites

- **Azure subscription**: If you don't have an Azure subscription, create a [free Azure account](https://azure.microsoft.com/free/) before you begin.
- **Azure Key Vault**: You can follow [this tutorial to create a new Key Vault instance](/azure/key-vault/general/quick-create-portal) if you don't have one.
- **Service principal**: You can [create a new service principal](/azure/active-directory/develop/howto-create-service-principal-portal) or use an existing one and grant it permission to access your Key Vault instance. For example, you can grant the **key-vault-contributor role** to the service principal name (SPN) for your Key Vault instance so that the SPN can manage it. You also need to get the service principal's **Client ID** and **Client Secret** (API Key) to add them as environment variables, as described later in this article.

## Permissions

Assign your SPN the following roles in your Key Vault instance from the [built-in roles](/azure/role-based-access-control/built-in-roles):

- Key Vault Contributor
- Key Vault Secrets User

## Configurations to enable the Azure Key Vault as a secret backend in Data workflows.

* **Airflow Requirements**: Install [apache-airflow-providers-microsoft-azure](https://airflow.apache.org/docs/apache-airflow-providers-microsoft-azure/stable/index.html) during your initial Airflow environment setup.

   :::image type="content" source="media/data-workflows/enable-akv-requirement.png" alt-text="Screenshot that shows the Airflow Environment Setup window highlighting the Airflow requirements." lightbox="media/data-workflows/enable-akv-requirement.png":::

*  **Configuration overrides**: Add the following settings for the **Airflow configuration overrides** in integration runtime properties:

   - **AIRFLOW__SECRETS__BACKEND**: `airflow.providers.microsoft.azure.secrets.key_vault.AzureKeyVaultBackend`
   - **AIRFLOW__SECRETS__BACKEND_KWARGS**: `{"connections_prefix": "airflow-connections", "variables_prefix": "airflow-variables", "vault_url": **\<your keyvault uri\>**}`

   :::image type="content" source="media/data-workflows/enable-akv-configs.png" alt-text="Screenshot that shows the configuration of the Airflow configuration overrides setting in the Airflow environment setup." lightbox="media/data-workflows/enable-akv-configs.png":::

* **Environment variables**: Add the following variables for the  configuration in the Airflow integration runtime properties:

   - **AZURE_CLIENT_ID** = \<Client ID of SPN\>
   - **AZURE_TENANT_ID** = \<Tenant Id\>
   - **AZURE_CLIENT_SECRET** = \<Client Secret of SPN\>

* With these settings you can use variables and connections inside your Airflow DAGs. The names of the connections and variables need to follow `AIRFLOW__SECRETS__BACKEND_KWARGS`, as defined previously. For example if the variable name is `sample_var`, then you should store it as `airflow-variables-sample-var`. For more information, see [Azure Key Vault as secret back end](https://airflow.apache.org/docs/apache-airflow-providers-microsoft-azure/stable/secrets-backends/azure-key-vault.html).

## Sample DAG using Key Vault as the back end

1. Create the new Python file `adf.py` with the following contents:

   ```python
   from datetime import datetime, timedelta
   from airflow.operators.python_operator import PythonOperator
   from textwrap import dedent
   from airflow.models import Variable
   from airflow import DAG
   import logging

   def retrieve_variable_from_akv():
       variable_value = Variable.get("sample-variable")
       logger = logging.getLogger(__name__)
       logger.info(variable_value)

   with DAG(
      "tutorial",
      default_args={
          "depends_on_past": False,
          "email": ["airflow@example.com"],
          "email_on_failure": False,
          "email_on_retry": False,
          "retries": 1,
          "retry_delay": timedelta(minutes=5),
       },
      description="This DAG shows how to use Azure Key Vault to retrieve variables in Apache Airflow DAG",
      schedule_interval=timedelta(days=1),
      start_date=datetime(2021, 1, 1),
      catchup=False,
      tags=["example"],
   ) as dag:

       get_variable_task = PythonOperator(
           task_id="get_variable",
           python_callable=retrieve_variable_from_akv,
       )

   get_variable_task
   ```

1. Stored variable in Azure Key Vault.

   :::image type="content" source="media/data-workflows/variable-in-akv.png" alt-text="Screenshot that shows the configuration of secrets in Azure Key Vault." lightbox="media/data-workflows/variable-in-akv.png":::

## Related Content

* Quickstart: [Create a Data workflows](../data-factory/create-data-workflows.md).