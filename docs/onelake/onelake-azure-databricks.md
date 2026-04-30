---
title: Integrate OneLake with Azure Databricks
description: Learn how to connect to OneLake from Azure Databricks. After completing this tutorial, you can read and write to a lakehouse from Azure Databricks.
ms.reviewer: eloldag, mabasile # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ai-usage: ai-assisted
ms.date: 03/23/2026
#customer intent: As a data engineer, I want to learn how to integrate OneLake with Azure Databricks so that I can read and write data to a Microsoft Fabric lakehouse from my Azure Databricks workspace.
---

# Integrate OneLake with Azure Databricks

This article shows how to read and write data in OneLake from an Azure Databricks notebook. Both approaches use service principal authentication and the OneLake ABFS endpoint. Choose the section that matches your Databricks compute type:

- **Standard or job cluster**: Use the Spark ABFS driver with OAuth configuration to read and write data directly through Spark DataFrames.
- **Serverless compute**: Serverless runtimes don't allow you to set custom Spark configuration properties. Instead, use the Microsoft Authentication Library (MSAL) and the Python `deltalake` library to authenticate and read or write Delta tables.

For other Databricks integration scenarios, see the following resources:

| Scenario | Documentation |
| -------- | ------------- |
| Configure read-only access to OneLake data for Unity Catalog | [Enable OneLake catalog federation](/azure/databricks/query-federation/onelake) |
| Bring Unity Catalog data into OneLake | [Mirroring Azure Databricks Unity Catalog](../mirroring/azure-databricks.md) |

## Prerequisites

Before you connect, make sure you have:

- A Fabric workspace and lakehouse.
- A premium Azure Databricks workspace.
- A service principal with at least the **Contributor** workspace role assignment.
- Databricks secrets or Azure Key Vault (AKV) to store and retrieve secrets. The examples in this article use Databricks secrets.

## Connect to OneLake with a standard cluster

### Use the correct OneLake ABFS path format

Use one of the following URI formats:

- `abfss://<workspace_id_or_name>@onelake.dfs.fabric.microsoft.com/<lakehouse_id_or_name>.lakehouse/Files/<path>`
- `abfss://<workspace_id_or_name>@onelake.dfs.fabric.microsoft.com/<lakehouse_id_or_name>.lakehouse/Tables/<path>`

You can use IDs or names. If you use names, avoid special characters and whitespace in workspace and lakehouse names.

### Use service principal authentication

Use this option for automated jobs and centralized secret rotation.

```python
workspace_name = "<workspace_name>"
lakehouse_name = "<lakehouse_name>"
tenant_id = dbutils.secrets.get(scope="<scope-name>", key="<tenant-id-key>")
service_principal_id = dbutils.secrets.get(scope="<scope-name>", key="<client-id-key>")
service_principal_secret = dbutils.secrets.get(scope="<scope-name>", key="<client-secret-key>")

spark.conf.set("fs.azure.account.auth.type", "OAuth")
spark.conf.set(
   "fs.azure.account.oauth.provider.type",
   "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider",
)
spark.conf.set("fs.azure.account.oauth2.client.id", service_principal_id)
spark.conf.set("fs.azure.account.oauth2.client.secret", service_principal_secret)
spark.conf.set(
   "fs.azure.account.oauth2.client.endpoint",
   f"https://login.microsoftonline.com/{tenant_id}/oauth2/token",
)

# Read
df = spark.read.format("parquet").load(
   f"abfss://{workspace_name}@onelake.dfs.fabric.microsoft.com/{lakehouse_name}.lakehouse/Files/data"
)
df.show(10)

# Write
df.write.format("delta").mode("overwrite").save(
   f"abfss://{workspace_name}@onelake.dfs.fabric.microsoft.com/{lakehouse_name}.lakehouse/Tables/dbx_delta_spn"
)
```

## Connect to OneLake with serverless compute

[Databricks serverless compute](/azure/databricks/compute/serverless/) lets you run workloads without provisioning a cluster, but it only allows a subset of [supported Spark properties](/azure/databricks/spark/conf#configure-spark-properties-for-serverless-notebooks-and-jobs). You can't set the `fs.azure.*` Spark configuration used on standard clusters.

> [!NOTE]
> This limitation isn't unique to Azure Databricks. Databricks serverless implementations on [Amazon Web Services (AWS)](https://docs.databricks.com/aws/release-notes/serverless#supported-spark-configuration-parameters) and [Google Cloud](https://docs.databricks.com/gcp/release-notes/serverless#supported-spark-configuration-parameters) have the same behavior.

If you attempt to set an unsupported Spark configuration in a serverless notebook, the system returns a CONFIG_NOT_AVAILABLE error.

:::image type="content" source="media\onelake-azure-databricks\unsupported-config-error.png" alt-text="Screenshot showing error message if a user attempts to modify unsupported Spark config in serverless compute.":::

Instead, use MSAL to acquire an OAuth token and the Python `deltalake` library to read or write Delta tables with that token.

### Set up a serverless notebook

1. Create a notebook in Databricks workspace and attach it to serverless compute.

   :::image type="content" source="media\onelake-azure-databricks\connect-to-serverless.png" alt-text="Screenshot showing how to connect Databricks notebook with serverless compute.":::

1. Import Python modules. In this sample, use two modules:

   - **msal** authenticates with the Microsoft identity platform.
   - **deltalake** reads and writes Delta Lake tables with Python.

   ```python
   from msal import ConfidentialClientApplication
   from deltalake import DeltaTable, write_deltalake
   ```

1. Declare variables for Microsoft Entra tenant including application ID. Use the tenant ID of the tenant where Microsoft Fabric is deployed.

   ```python
   # Fetch from Databricks secrets.
   tenant_id = dbutils.secrets.get(scope="<replace-scope-name>",key="<replace value with key value for tenant _id>")
   client_id = dbutils.secrets.get(scope="<replace-scope-name>",key="<replace value with key value for client _id>")
   client_secret = dbutils.secrets.get(scope="<replace-scope-name>",key="<replace value with key value for secret>")
   ```

1. Declare Fabric workspace variables.

   ```python
   workspace_id = "<replace with workspace name>"
   lakehouse_id = "<replace with lakehouse name>"
   table_to_read = "<name of lakehouse table to read>"
   onelake_uri = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}.lakehouse/Tables/{table_to_read}"
   ```

1. Initialize client to acquire token.

   ```python
   authority = f"https://login.microsoftonline.com/{tenant_id}"

   app = ConfidentialClientApplication(
       client_id,
       authority=authority,
       client_credential=client_secret
   )

   result = app.acquire_token_for_client(scopes=["https://onelake.fabric.microsoft.com/.default"])

   if "access_token" in result:
       access_token = result["access_token"]
       print("Access token acquired.")
       token_val = result['access_token']
   ```

1. Read a Delta table from OneLake.

   ```python
   dt = DeltaTable(onelake_uri, storage_options={"bearer_token": f"{token_val}", "use_fabric_endpoint": "true"})
   df = dt.to_pandas()
   print(df.head())
   ```

1. Write a Delta table to OneLake.

   ```python
   target_uri = f"abfss://{workspace_id}@onelake.dfs.fabric.microsoft.com/{lakehouse_id}.lakehouse/Tables/<target_table_name>"
   write_deltalake(
       target_uri,
       df,
       mode="overwrite",
       storage_options={"bearer_token": f"{token_val}", "use_fabric_endpoint": "true"}
   )
   ```

## Design considerations

- Use one writer pattern per table path where possible. Writing to the same storage paths from multiple compute engines or runtime versions can cause conflicts.
- Use secrets management for service principal credentials.
- Use [OneLake shortcuts](onelake-shortcuts.md) when you need virtualized access instead of physically writing data into another lakehouse location.

## Related content

- [Use OneLake with Azure Databricks](/azure/databricks/query-federation/onelake)
- [Mounting cloud object storage on Azure Databricks](/azure/databricks/dbfs/mounts)
- [Integrate OneLake with Azure HDInsight](onelake-azure-hdinsight.md)
