---
title: "Tutorial: Run Snowflake SQL with Apache Airflow jobs"
description: Learn how to install the public Apache Airflow Snowflake provider, configure a secure Snowflake connection, and run SQL from an Apache Airflow job in Microsoft Fabric.
author: makromer
ms.author: makromer
ms.topic: tutorial
ms.date: 09/15/2026
ms.service: fabric
ms.subservice: data-factory
ms.custom: airflows
ai-usage: ai-assisted
---

# Tutorial: Run Snowflake SQL with Apache Airflow jobs

[!INCLUDE[apache-airflow-note](includes/apache-airflow-note.md)]

The [Apache Airflow provider for Snowflake](https://pypi.org/project/apache-airflow-providers-snowflake/) is a public Python package that adds Snowflake connections, hooks, and operators to Apache Airflow. In this tutorial, you install the provider in an Apache Airflow job in Microsoft Fabric, configure key-pair authentication, and run a SQL query against Snowflake.

In this tutorial, you learn how to:

> [!div class="checklist"]
> * Install a version of the Snowflake provider that's compatible with the Fabric Airflow runtime
> * Configure a Snowflake connection with key-pair authentication
> * Create and run a DAG that executes SQL in Snowflake

## Prerequisites

- A Fabric workspace with an assigned capacity. Free and Premium Per User (PPU) workspaces don't support Apache Airflow jobs.
- An Apache Airflow job item in your Fabric workspace. See [Create an Apache Airflow job](create-apache-airflow-jobs.md).
- A Snowflake account that you can reach through its public endpoint. Fabric Apache Airflow jobs don't support private networks or virtual networks.
- A Snowflake user configured for [key-pair authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth).
- A Snowflake role with the privileges required by your queries. For the example in this tutorial, the role needs `USAGE` on the warehouse. For queries against Snowflake objects, grant the role `USAGE` on the database and schema and the required object privileges. Follow the principle of least privilege.

## Install the Snowflake provider

Fabric Apache Airflow jobs currently use Apache Airflow 2.10.5. Version 6.6.0 is the newest Snowflake provider release that supports this Airflow version. Snowflake provider versions 6.7.0 and later require Apache Airflow 2.11.0 or later.

1. Open your Apache Airflow job.
1. Select **Settings**, and then select **Environment configuration**.
1. Under **Apache Airflow requirements**, add the following requirement:

   ```text
   apache-airflow-providers-snowflake==6.6.0
   ```

1. Select **Apply** and wait for the environment update to finish.

> [!IMPORTANT]
> Keep the version constraint until Fabric supports an Airflow version that meets the [current Snowflake provider requirements](https://airflow.apache.org/docs/apache-airflow-providers-snowflake/stable/index.html). An unpinned installation currently resolves to a provider version that isn't compatible with Airflow 2.10.5.

## Prepare the private key

The Airflow Snowflake connection accepts the private key content as a Base64-encoded value. On a secure computer, run the following Python code and replace the path with the path to your PKCS #8 private key:

```python
import base64

with open("path/to/rsa_key.p8", "rb") as key_file:
    private_key_content = base64.b64encode(key_file.read()).decode("utf-8")

print(private_key_content)
```

Copy the output to a secure location. You use it when you create the Airflow connection.

> [!CAUTION]
> Don't add the private key, its passphrase, or the encoded value to a DAG file or source control. Store these values only in the Airflow connection.

## Configure the Snowflake connection

1. In your Apache Airflow job, select **View Airflow connections**.
1. Select **Add a new record**.
1. Enter the following values:

   | Field | Value |
   |---|---|
   | Connection ID | `snowflake_default` |
   | Connection type | **Snowflake** |
   | Login | The Snowflake user name configured for key-pair authentication |
   | Password | The private key passphrase. Leave this field blank if the private key isn't encrypted. |
   | Schema | The default Snowflake schema for the queries |

1. In **Extra**, enter the following JSON. Replace each placeholder with your Snowflake value:

   ```json
   {
     "account": "<organization-name>-<account-name>",
     "database": "<database-name>",
     "warehouse": "<warehouse-name>",
     "role": "<role-name>",
     "private_key_content": "<base64-encoded-private-key>"
   }
   ```

   Use the preferred Snowflake account identifier for clients and drivers: the organization name and account name separated by a hyphen. For example, `contoso-dataengineering`.

1. Select **Save**.

For all supported connection options, see [Snowflake connection](https://airflow.apache.org/docs/apache-airflow-providers-snowflake/6.6.0/connections/snowflake.html) in the provider documentation.

## Create an Apache Airflow DAG

1. In your Apache Airflow job, select the **New DAG file** card.
1. Name the file `snowflake_provider_example.py`, and then select **Create**.
1. Add the following code:

   ```python
   from datetime import datetime

   from airflow import DAG
   from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator

   with DAG(
       dag_id="snowflake_provider_example",
       start_date=datetime(2026, 1, 1),
       schedule=None,
       catchup=False,
       tags=["snowflake"],
   ) as dag:
       run_snowflake_query = SQLExecuteQueryOperator(
           task_id="run_snowflake_query",
           conn_id="snowflake_default",
           sql="""
               SELECT
                   CURRENT_ACCOUNT() AS account_name,
                   CURRENT_USER() AS user_name,
                   CURRENT_ROLE() AS role_name,
                   CURRENT_WAREHOUSE() AS warehouse_name;
           """,
       )
   ```

1. Select **Save**.

The common SQL package installed as a dependency of the Snowflake provider supplies `SQLExecuteQueryOperator`. The Snowflake provider supplies the hook that the operator uses when `conn_id` references a Snowflake connection.

## Run and monitor the DAG

1. Select **Monitor in Apache Airflow**.
1. In the Airflow UI, select the `snowflake_provider_example` DAG.
1. Select **Trigger DAG**.
1. Open the DAG run and select the `run_snowflake_query` task to monitor its status and view its logs.

The task succeeds when Airflow authenticates to Snowflake and Snowflake completes the query. You can replace the sample `SELECT` statement with the SQL that your workflow requires.

## Troubleshooting

- **The environment update reports a dependency conflict:** Confirm that the requirement is pinned to `apache-airflow-providers-snowflake==6.6.0`.
- **Snowflake reports an authentication error:** Confirm that you Base64 encoded the complete PKCS #8 private key file, assigned the corresponding public key to the Snowflake user, and set the Airflow connection password to match the private key passphrase.
- **Snowflake reports that no active warehouse is selected:** Confirm that `warehouse` is present in **Extra** and that the configured role has `USAGE` privilege on that warehouse.
- **The connection type doesn't include Snowflake:** Confirm that the environment update completed successfully, and then reload the Airflow connections page.

## Related content

- [Apache Airflow jobs concepts](apache-airflow-jobs-concepts.md)
- [Create an Apache Airflow job](create-apache-airflow-jobs.md)
- [Snowflake provider package documentation](https://airflow.apache.org/docs/apache-airflow-providers-snowflake/6.6.0/index.html)
- [Snowflake key-pair authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth)
