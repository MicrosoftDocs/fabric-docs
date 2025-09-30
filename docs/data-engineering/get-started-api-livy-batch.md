---
title: Submit Spark batch jobs using the Livy API
description: Learn how to submit Spark batch jobs using the Livy API.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.search.form: Get started with batch jobs with the Livy API for Data Engineering
ms.date: 03/14/2025
ms.custom: sfi-image-nochange
---

# Use the Livy API to submit and execute Livy batch jobs

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Learn how to submit Spark batch jobs using the Livy API for Fabric Data Engineering. The Livy API currently doesn't support Azure Service Principal (SPN).

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Prerequisites

* Fabric [Premium](/power-bi/enterprise/service-premium-per-user-faq) or [Trial capacity](../fundamentals/fabric-trial.md) with a Lakehouse.

* A remote client such as [Visual Studio Code](https://code.visualstudio.com/) with [Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), [PySpark](https://code.visualstudio.com/docs/python/python-quick-start), and the [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/).

* A Microsoft Entra app token is required to access the Fabric Rest API. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

* Some data in your lakehouse, this example uses [NYC Taxi & Limousine Commission](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page#:~:text=TLC%20Trip%20Record%20Data.%20Yellow%20and%20green%20taxi%20trip%20records) green_tripdata_2022_08 a parquet file loaded to the lakehouse.

The Livy API defines a unified endpoint for operations. Replace the placeholders {Entra_TenantID}, {Entra_ClientID}, {Fabric_WorkspaceID}, and {Fabric_LakehouseID} with your appropriate values when you follow the examples in this article.

## Configure Visual Studio Code for your Livy API Batch

1. Select **Lakehouse Settings** in your Fabric Lakehouse.

    :::image type="content" source="media/livy-api/Lakehouse-settings.png" alt-text="Screenshot showing Lakehouse settings." lightbox="media/livy-api/Lakehouse-settings.png" :::

1. Navigate to the **Livy endpoint** section.

    :::image type="content" source="media/livy-api/Lakehouse-settings-livy-endpoint.png" alt-text="screenshot showing Lakehouse Livy endpoint and Session job connection string." lightbox="media/livy-api/Lakehouse-settings-livy-endpoint.png" :::

1. Copy the Batch job connection string (second red box in the image) to your code.

1. Navigate to [Microsoft Entra admin center](https://entra.microsoft.com/) and copy both the Application (client) ID and Directory (tenant) ID to your code.

    :::image type="content" source="media/livy-api/entra-app-overview.png" alt-text="Screenshot showing Livy API app overview in the Microsoft Entra admin center." lightbox="media/livy-api/entra-app-overview.png" :::

## Create a Spark payload and upload to your Lakehouse

1. Create an `.ipynb` notebook in Visual Studio Code and insert the following code

    ```python
    import sys
    import os

    from pyspark.sql import SparkSession
    from pyspark.conf import SparkConf
    from pyspark.sql.functions import col

    if __name__ == "__main__":

    #Spark session builder
    spark_session = (SparkSession
        .builder
        .appName("livybatchdemo") 
        .getOrCreate())

    spark_context = spark_session.sparkContext
    spark_context.setLogLevel("DEBUG")  
 
    targetLakehouse = spark_context.getConf().get("spark.targetLakehouse")

    if targetLakehouse is not None:
        print("targetLakehouse: " + str(targetLakehouse))
    else:
        print("targetLakehouse is None")

    df_valid_totalPrice = spark_session.sql("SELECT * FROM <YourLakeHouseDataTableName>.transactions where TotalPrice > 0")
    df_valid_totalPrice_plus_year = df_valid_totalPrice.withColumn("transaction_year", col("TransactionDate").substr(1, 4))

    deltaTablePath = "abfss:<YourABFSSpath>"+str(targetLakehouse)+".Lakehouse/Tables/CleanedTransactions"
    df_valid_totalPrice_plus_year.write.mode('overwrite').format('delta').save(deltaTablePath)
    ```

1. Save the Python file locally. This Python code payload contains two Spark statements that work on data in a Lakehouse and needs to be uploaded to your Lakehouse.  You'll need the ABFS path of the payload to reference in your Livy API batch job in Visual Studio Code and your Lakehouse table name in the Select SQL statement..

    :::image type="content" source="media\livy-api\Livy-batch-payload.png" alt-text="Screenshot showing the Python payload cell." lightbox="media\livy-api\Livy-batch-payload.png" :::

1. Upload the Python payload to the files section of your Lakehouse. > Get data > Upload files > click in the Files/ input box.

    :::image type="content" source="media\livy-api\Livy-batch-payload-in-lakehouse-files.png" alt-text="Screenshot showing payload in Files section of the Lakehouse." lightbox="media\livy-api\Livy-batch-payload-in-lakehouse-files.png" :::

1. After the file is in the Files section of your Lakehouse, click on the three dots to the right of your payload filename and select Properties.

    :::image type="content" source="media\livy-api\Livy-batch-ABFS-path.png" alt-text="Screenshot showing payload ABFS path in the Properties of the file in the Lakehouse." lightbox="media\livy-api\Livy-batch-ABFS-path.png" :::

1. Copy this ABFS path to your Notebook cell in step 1.

## Create a Livy API Spark batch session

1. Create an `.ipynb` notebook in Visual Studio Code and insert the following code.

    ```python
    from msal import PublicClientApplication
    import requests
    import time

    tenant_id = "<Entra_TenantID>"
    client_id = "<Entra_ClientID>"

    workspace_id = "<Fabric_WorkspaceID>"
    lakehouse_id = "<Fabric_LakehouseID>"

    app = PublicClientApplication(
        client_id,
        authority="https://login.microsoftonline.com/43a26159-4e8e-442a-9f9c-cb7a13481d48"
    )

    result = None

    # If no cached tokens or user interaction needed, acquire tokens interactively
    if not result:
        result = app.acquire_token_interactive(scopes=["https://api.fabric.microsoft.com/Lakehouse.Execute.All", "https://api.fabric.microsoft.com/Lakehouse.Read.All", "https://api.fabric.microsoft.com/Item.ReadWrite.All", "https://api.fabric.microsoft.com/Workspace.ReadWrite.All", "https://api.fabric.microsoft.com/Code.AccessStorage.All", "https://api.fabric.microsoft.com/Code.AccessAzureKeyvault.All", 
        "https://api.fabric.microsoft.com/Code.AccessAzureDataExplorer.All", "https://api.fabric.microsoft.com/Code.AccessAzureDataLake.All", "https://api.fabric.microsoft.com/Code.AccessFabric.All"])

    # Print the access token (you can use it to call APIs)
    if "access_token" in result:
        print(f"Access token: {result['access_token']}")
    else:
        print("Authentication failed or no access token obtained.")

    if "access_token" in result:
        access_token = result['access_token']
        api_base_url ='https://api.fabric.microsoft.com/v1'
        livy_base_url = api_base_url + "/workspaces/"+workspace_id+"/lakehouses/"+lakehouse_id +"/livyApi/versions/2023-12-01/batches"
            headers = {"Authorization": "Bearer " + access_token}
    ```

1. Run the notebook cell, a popup should appear in your browser allowing you to choose the identity to sign-in with.

    :::image type="content" source="media/livy-api/entra-logon-user.png" alt-text="Screenshot showing logon screen to Microsoft Entra app." lightbox="media/livy-api/entra-logon-user.png" :::

1. After you choose the identity to sign-in with, you'll also be asked to approve the Microsoft Entra app registration API permissions.

    :::image type="content" source="media/livy-api/entra-logon.png" alt-text="Screenshot showing Microsoft Entra app API permissions." lightbox="media/livy-api/entra-logon.png" :::

1. Close the browser window after completing authentication.

    :::image type="content" source="media\livy-api\entra-authentication-complete.png" alt-text="Screenshot showing authentication complete." lightbox="media\livy-api\entra-authentication-complete.png" :::

1. In Visual Studio Code you should see the Microsoft Entra token returned.

    :::image type="content" source="media/livy-api/Livy-session-entra-token.png" alt-text="Screenshot showing the Microsoft Entra token returned after running cell and logging in." lightbox="media/livy-api/Livy-session-entra-token.png":::

1. Add another notebook cell and insert this code.

    ```python
    # call get batch API

    get_livy_get_batch = livy_base_url
    get_batch_response = requests.get(get_livy_get_batch, headers = headers)
    if get_batch_response.status_code == 200:
        print("API call successful")
        print(get_batch_response.json())
    else:
        print(f"API call failed with status code: {get_batch_response.status_code}")
        print(get_batch_response.text)
    ```

1. Run the notebook cell, you should see two lines printed as the Livy batch job is created.

    :::image type="content" source="media\livy-api\Livy-batch.png" alt-text="Screenshot showing the results of the batch session creation." lightbox="media\livy-api\Livy-batch.png" :::

## Submit a spark.sql statement using the Livy API batch session

1. Add another notebook cell and insert this code.

    ```python
    # submit payload to existing batch session

    print('Submit a spark job via the livy batch API to ') 

    newlakehouseName = "YourNewLakehouseName"
    create_lakehouse = api_base_url + "/workspaces/" + workspace_id + "/items"
    create_lakehouse_payload = {
        "displayName": newlakehouseName,
        "type": 'Lakehouse'
        }

    create_lakehouse_response = requests.post(create_lakehouse, headers = headers, json = create_lakehouse_payload)
    print(create_lakehouse_response.json())

    payload_data = {
        "name":"livybatchdemo_with"+ newlakehouseName,
        "file":"abfss://YourABFSPathToYourPayload.py", 
        "conf": {
            "spark.targetLakehouse": "Fabric_LakehouseID"
            }
        }

    get_batch_response = requests.post(get_livy_get_batch, headers = headers, json = payload_data)

    print("The Livy batch job submitted successful")
    print(get_batch_response.json())
    ```

1. Run the notebook cell, you should see several lines printed as the Livy Batch job is created and run.

    :::image type="content" source="media\livy-api\Livy-batch-job-submission.png" alt-text="Screenshot showing results in Visual Studio Code after Livy Batch Job has been successfully submitted." lightbox="media\livy-api\Livy-batch-job-submission.png" :::

1. Navigate back to your Lakehouse to see the changes.

## Integration with Fabric Environments

By default, this Livy API session runs against the default starter pool for the workspace.  Alternatively you can use Fabric Environments [Create, configure, and use an environment in Microsoft Fabric](/fabric/data-engineering/create-and-use-environment) to customize the Spark pool that the Livy API session uses for these Spark jobs.  To use your Fabric Environment, simply update the prior notebook cell with this one line line change.

```python
payload_data = {
    "name":"livybatchdemo_with"+ newlakehouseName,
    "file":"abfss://YourABFSPathToYourPayload.py", 
    "conf": {
        "spark.targetLakehouse": "Fabric_LakehouseID",
        "spark.fabric.environmentDetails" : "{\"id\" : \""EnvironmentID"\"}"  # remove this line to use starter pools instead of an environment, replace "EnvironmentID" with your environment ID
        }
    }
```

## View your jobs in the Monitoring hub

You can access the Monitoring hub to view various Apache Spark activities by selecting Monitor in the left-side navigation links.

1. When the batch job is completed state, you can view the session status by navigating to Monitor.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub.png" alt-text="Screenshot showing previous Livy API submissions in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub.png":::

1. Select and open most recent activity name.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub-last-run.png" alt-text="Screenshot showing most recent Livy API activity in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub-last-run.png":::

1. In this Livy API session case, you can see your previous batch submission, run details, Spark versions, and configuration. Notice the stopped status on the top right.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub-last-activity-details.png" alt-text="Screenshot showing most recent Livy API activity details in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub-last-activity-details.png":::

To recap the whole process, you need a remote client such as [Visual Studio Code](https://code.visualstudio.com/), a Microsoft Entra app token, Livy API endpoint URL, authentication against your Lakehouse, a Spark payload in your Lakehouse, and finally a batch Livy API session.

## Related content

* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Submit session jobs using the Livy API](get-started-api-livy-session.md)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)