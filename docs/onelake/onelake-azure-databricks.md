---
title: Integrate OneLake with Azure Databricks
description: Learn how to connect to OneLake via Azure Databricks. After completing this tutorial, you can read and write to a lakehouse via Azure Databricks.
ms.reviewer: eloldag, mabasile
ms.author: kgremban
author: kgremban
ms.topic: how-to
ms.custom:
ms.date: 01/30/2026
#customer intent: As a data engineer, I want to learn how to integrate OneLake with Azure Databricks so that I can read and write data to a Microsoft Fabric lakehouse from my Azure Databricks workspace.
---

# Integrate OneLake with Azure Databricks

This article shows how to connect to OneLake through Azure Databricks serverless compute.

## Prerequisites

Before you connect, make sure you have:

- A Fabric workspace and lakehouse.
- A premium Azure Databricks workspace.
- A service principal with at least the **Contributor** workspace role assignment.
- Database secrets or Azure Key Vault (AKV) to store and retrieve secrets. This example uses Databricks secrets.

## Connect to OneLake by using Databricks serverless compute

By using [Databricks serverless compute](/azure/databricks/compute/serverless/), you can run workloads without provisioning a cluster. According to the Databricks serverless documentation, to automate the configuration of Spark on serverless compute, Databricks serverless only allows configuring a subset of [supported Spark properties](/azure/databricks/spark/conf#configure-spark-properties-for-serverless-notebooks-and-jobs).

> [!NOTE]
> This limitation isn't unique to Azure Databricks. Databricks serverless implementations on [Amazon Web Services (AWS)](https://docs.databricks.com/aws/release-notes/serverless#supported-spark-configuration-parameters) and [Google Cloud](https://docs.databricks.com/gcp/release-notes/serverless#supported-spark-configuration-parameters) exhibit the same behavior.

If you attempt to modify or set an unsupported Spark configuration in a notebook linked to Databricks serverless compute, the system returns a CONFIG_NOT_AVAILABLE error.

:::image type="content" source="media\onelake-azure-databricks\unsupported-config-error.png" alt-text="Screenshot showing error message if a user attempts to modify unsupported Spark config in serverless compute.":::

OneLake supports inbound connectivity from Databricks serverless compute. You can connect to OneLake from Databricks serverless compute if you have appropriate access and there's a network path between Databricks serverless compute and OneLake. With Databricks serverless, make sure your code doesn't modify any unsupported Spark properties.  

## Author your notebook

1. Create a notebook in Databricks workspace and attach it to serverless compute.

   :::image type="content" source="media\onelake-azure-databricks\connect-to-serverless.png" alt-text="Screenshot showing how to connect Databricks notebook with serverless compute.":::

1. Import Python modules - in this sample, use three modules:

   -  **msal** is Microsoft Authentication Library (MSAL) and it's designed to help developers integrate Microsoft identity platform authentication into their applications.
   - **requests** module is used to make HTTP requests by using Python.
   - **delta lake** is used to read and write Delta Lake tables by using Python.
     
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

After you complete the preceding steps, you can read data from OneLake by using Databricks a notebook attached to serverless compute.

## Related content

- [Integrate OneLake with Azure HDInsight](onelake-azure-hdinsight.md)
