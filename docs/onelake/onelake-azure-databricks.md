---
title: Integrate OneLake with Azure Databricks
description: Learn how to connect to OneLake via Azure Databricks. After completing this tutorial, you can read and write to a lakehouse via Azure Databricks.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: how-to
ms.custom:
ms.date: 09/27/2023
#customer intent: As a data engineer, I want to learn how to integrate OneLake with Azure Databricks so that I can read and write data to a Microsoft Fabric lakehouse from my Azure Databricks workspace.
---

# Integrate OneLake with Azure Databricks

This scenario shows how to connect to OneLake via Azure Databricks. After completing this tutorial, you'll be able to read and write to a Microsoft Fabric lakehouse from your Azure Databricks workspace.

## Prerequisites

Before you connect, you must have:

- A Fabric workspace and lakehouse.
- A premium Azure Databricks workspace. Only premium Azure Databricks workspaces support Microsoft Entra credential passthrough, which you need for this scenario.

## Set up your Databricks workspace

1. Open your Azure Databricks workspace and select **Create** > **Cluster**.

1. To authenticate to OneLake with your Microsoft Entra identity, you must enable Azure Data Lake Storage (ADLS) credential passthrough on your cluster in the Advanced Options.

   :::image type="content" source="media\onelake-azure-databricks\advanced-options-create-cluster.png" alt-text="Screenshot showing where to select Create cluster in the Advanced options screen.":::

   > [!NOTE]
   > You can also connect Databricks to OneLake using a service principal. For more information about authenticating Azure Databricks using a service principal, see [Manage service principals](/azure/databricks/administration-guide/users-groups/service-principals).

1. Create the cluster with your preferred parameters. For more information on creating a Databricks cluster, see [Configure clusters - Azure Databricks](/azure/databricks/clusters/configure).

1. Open a notebook and connect it to your newly created cluster.

## Author your notebook

1. Navigate to your Fabric lakehouse and copy the Azure Blob Filesystem (ABFS) path to your lakehouse. You can find it in the **Properties** pane.

   > [!NOTE]
   > Azure Databricks only supports the Azure Blob Filesystem (ABFS) driver when reading and writing to ADLS Gen2 and OneLake: `abfss://myWorkspace@onelake.dfs.fabric.microsoft.com/`.

1. Save the path to your lakehouse in your Databricks notebook. This lakehouse is where you write your processed data later:

   ```python
   oneLakePath = 'abfss://myWorkspace@onelake.dfs.fabric.microsoft.com/myLakehouse.lakehouse/Files/'
   ```

1. Load data from a Databricks public dataset into a dataframe. You can also read a file from elsewhere in Fabric or choose a file from another ADLS Gen2 account you already own.

   ```python
   yellowTaxiDF = spark.read.format("csv").option("header", "true").option("inferSchema", "true").load("/databricks-datasets/nyctaxi/tripdata/yellow/yellow_tripdata_2019-12.csv.gz")
   ```

1. Filter, transform, or prep your data. For this scenario, you can trim down your dataset for faster loading, join with other datasets, or filter down to specific results.

   ```python
   filteredTaxiDF = yellowTaxiDF.where(yellowTaxiDF.fare_amount<4).where(yellowTaxiDF.passenger_count==4)
   display(filteredTaxiDF)
   ```

1. Write your filtered dataframe to your Fabric lakehouse using your OneLake path.

   ```python
   filteredTaxiDF.write.format("csv").option("header", "true").mode("overwrite").csv(oneLakePath)
   ```

1. Test that your data was successfully written by reading your newly loaded file.

   ```python
   lakehouseRead = spark.read.format('csv').option("header", "true").load(oneLakePath)
   display(lakehouseRead.limit(10))
   ```

This completes the setup and now you can now read and write data in Fabric using Azure Databricks.

## Connecting to OneLake using Databricks serverless compute

[Databricks serverless compute](/azure/databricks/compute/serverless/) allows you to run workloads without provisioning a cluster. As per Databricks serverless limitations, to automate the configuration of Spark on serverless compute, Databricks doesn't allow configuring [Spark properties](/azure/databricks/spark/conf#configure-spark-properties-for-serverless-notebooks-and-jobs) outside supported properties that are listed [here](/azure/databricks/spark/conf#configure-spark-properties-for-serverless-notebooks-and-jobs).

> [!NOTE]
> This limitation isn't unique to Azure Databricks. Databricks Serverless implementations on [Amazon Web Services (AWS)](https://docs.databricks.com/aws/release-notes/serverless#supported-spark-configuration-parameters) and [Google Cloud](https://docs.databricks.com/gcp/release-notes/serverless#supported-spark-configuration-parameters) exhibit the same behavior.

If you attempt to modify or set an unsupported Spark configuration in a notebook linked to Databricks serverless compute, the system returns a CONFIG_NOT_AVAILABLE error.

:::image type="content" source="media\onelake-azure-databricks\unsupported-config-error.png" alt-text="Screenshot showing error message if a user attempts to modify unsupported Spark config in serverless compute.":::

OneLake supports inbound connectivity from Databricks serverless compute. You can connect to OneLake as provided you have successfully authenticated and there's network path between Databricks serverless compute and OneLake. With Databricks serverless, you must ensure that your code doesn't modify any unsupported Spark properties.  

### Prerequisites

Before you connect, you must have:

- A Fabric workspace and lakehouse.
- A premium Azure Databricks workspace.
- A service principal with a minimum of **Contributor** workspace role assignment.
- Database secrets or Azure Key Vault (AKV) to store and retrieve secrets. This example uses Databricks secrets.

### Author your notebook

1. Create a notebook in Databricks workspace and attach it to serverless compute.

   :::image type="content" source="media\onelake-azure-databricks\connect-to-serverless.png" alt-text="Screenshot showing how to connect Databricks notebook with serverless compute.":::

1. Import Python modules - in this sample, you're using three modules:

   -  **msal** is Microsoft Authentication Library (MSAL) and it is designed to help developers integrate Microsoft identity platform authentication into their applications.
   - **requests** module is used to make HTTP requests using Python.
   - **delta lake** is used to read and write Delta Lake tables using Python.
     
   ```python
   from msal import ConfidentialClientApplication
   import requests
   from deltalake import DeltaTable
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
   storage_account_name = workspace_id
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

1. Read a delta table from OneLake
   ```python
   dt = DeltaTable(onelake_uri, storage_options={"bearer_token": f"{token_val}", "use_fabric_endpoint": "true"})
   df = dt.to_pandas()
   print(df.head())
   ```
   > [!NOTE]
   > The service principal has **Contributor** workspace role assignment and you can use it to write data back to OneLake.

This completes the setup and you can now read data from OneLake using Databricks a notebook attached to serverless compute.

## Related content

- [Integrate OneLake with Azure HDInsight](onelake-azure-hdinsight.md)
