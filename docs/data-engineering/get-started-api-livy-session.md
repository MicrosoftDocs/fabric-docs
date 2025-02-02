---
title: Submit Spark session jobs using the Livy API
description: Learn how to submit Spark session jobs using the Livy API.
ms.reviewer: sngun
ms.author: guyhay
author: GuyHay
ms.topic: how-to
ms.search.form: Get started with Session jobs with the Livy API for Data Engineering
ms.date: 11/19/2024
---

# Use the Livy API to submit and execute session jobs

> [!NOTE]
> The Livy API for Fabric Data Engineering is in preview.

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Submit Spark batch jobs using the Livy API for Fabric Data Engineering.

## Prerequisites

* Fabric [Premium](/power-bi/enterprise/service-premium-per-user-faq) or [Trial capacity](../fundamentals/fabric-trial.md) with a Lakehouse.

* A remote client such as [Visual Studio Code](https://code.visualstudio.com/) with [Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), [PySpark](https://code.visualstudio.com/docs/python/python-quick-start), and the [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/).

* A Microsoft Entra app token is required to access the Fabric Rest API. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

* Some data in your lakehouse, this example uses [NYC Taxi & Limousine Commission](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page#:~:text=TLC%20Trip%20Record%20Data.%20Yellow%20and%20green%20taxi%20trip%20records) green_tripdata_2022_08 a parquet file loaded to the lakehouse.

The Livy API defines a unified endpoint for operations. Replace the placeholders {Entra_TenantID}, {Entra_ClientID}, {Fabric_WorkspaceID}, and {Fabric_LakehouseID} with your appropriate values when you follow the examples in this article.

## Configure Visual Studio Code for your Livy API Session

1. Select **Lakehouse Settings** in your Fabric Lakehouse.

    :::image type="content" source="media/livy-api/Lakehouse-settings.png" alt-text="Screenshot showing Lakehouse settings." lightbox="media/livy-api/Lakehouse-settings.png" :::

1. Navigate to the **Livy endpoint** section.

    :::image type="content" source="media/livy-api/Lakehouse-settings-livy-endpoint.png" alt-text="screenshot showing Lakehouse Livy endpoint and Session job connection string." lightbox="media/livy-api/Lakehouse-settings-livy-endpoint.png" :::

1. Copy the Session job connection string (first red box in the image) to your code.

1. Navigate to [Microsoft Entra admin center](https://entra.microsoft.com/) and copy both the Application (client) ID and Directory (tenant) ID to your code.

    :::image type="content" source="media/livy-api/entra-app-overview.png" alt-text="Screenshot showing Livy API app overview in the Microsoft Entra admin center." lightbox = "media/livy-api/entra-app-overview.png" :::

## Create a Livy API Spark session

1. Create an `.ipynb` notebook in Visual Studio Code and insert the following code.

    ```python
    from msal import PublicClientApplication
    import requests
    import time

    tenant_id = "Entra_TenantID"
    client_id = "Entra_ClientID"

    workspace_id = "Fabric_WorkspaceID"
    lakehouse_id = "Fabric_LakehouseID"

    app = PublicClientApplication(
        client_id,
        authority="https://login.microsoftonline.com/43a26159-4e8e-442a-9f9c-cb7a13481d48"
    )

    result = None

    # If no cached tokens or user interaction needed, acquire tokens interactively
    if not result:
        result = app.acquire_token_interactive(scopes=["https://api.fabric.microsoft.com/Lakehouse.Execute.All", "https://api.fabric.microsoft.com/Lakehouse.Read.All", "https://api.fabric.microsoft.com/Item.ReadWrite.All", 
                                                   "https://api.fabric.microsoft.com/Workspace.ReadWrite.All", "https://api.fabric.microsoft.com/Code.AccessStorage.All", "https://api.fabric.microsoft.com/Code.AccessAzureKeyvault.All", 
                                                   "https://api.fabric.microsoft.com/Code.AccessAzureDataExplorer.All", "https://api.fabric.microsoft.com/Code.AccessAzureDataLake.All", "https://api.fabric.microsoft.com/Code.AccessFabric.All"])
    
    # Print the access token (you can use it to call APIs)
    if "access_token" in result:
        print(f"Access token: {result['access_token']}")
    else:
        print("Authentication failed or no access token obtained.")

    if "access_token" in result:
        access_token = result['access_token']
        api_base_url_mist='https://api.fabric.microsoft.com/v1'
        livy_base_url = api_base_url_mist + "/workspaces/"+workspace_id+"/lakehouses/"+lakehouse_id +"/livyApi/versions/2023-12-01/sessions"
        headers = {"Authorization": "Bearer " + access_token}
    ```

1. Run the notebook cell, a popup should appear in your browser allowing you to choose the identity to sign-in with.

    :::image type="content" source="media/livy-api/entra-logon-user.png" alt-text="Screenshot showing logon screen to Microsoft Entra app." lightbox="media/livy-api/entra-logon-user.png" :::

1. After you choose the identity to sign-in with, you'll also be asked to approve the Microsoft Entra app registration API permissions.

    :::image type="content" source="media/livy-api/entra-logon.png" alt-text="Screenshot showing Microsoft Entra app API permissions." lightbox="media/livy-api/entra-logon.png" :::

1. Close the browser window after completing authentication.

    :::image type="content" source="media\livy-api\entra-authentication-complete.png" alt-text="Screenshot showing authentication complete." lightbox="media\livy-api\entra-authentication-complete.png" :::

1. In Visual Studio Code, you should see the Microsoft Entra token returned.

    :::image type="content" source="media/livy-api/Livy-session-entra-token.png" alt-text="Screenshot showing the Microsoft Entra token returned after running cell and logging in." lightbox= "media/livy-api/Livy-session-entra-token.png":::

1. Add another notebook cell and insert this code.

    ```python
    create_livy_session = requests.post(livy_base_url, headers=headers, json={})
    print('The request to create the Livy session is submitted:' + str(create_livy_session.json()))

    livy_session_id = create_livy_session.json()['id']
    livy_session_url = livy_base_url + "/" + livy_session_id
    get_session_response = requests.get(livy_session_url, headers=headers)
    print(get_session_response.json())
    ```

1. Run the notebook cell, you should see one line printed as the Livy session is created.

    :::image type="content" source="media\livy-api\livy-api-session-start.png" alt-text="Screenshot showing the results of the first notebook cell execution." lightbox="media\livy-api\livy-api-session-start.png" :::

1. You can verify that the Livy session is created by using the [View your jobs in the Monitoring hub](#View your jobs in the Monitoring hub).

### Submit a spark.sql statement using the Livy API Spark session

1. Add another notebook cell and insert this code.

    ```python
    # call get session API
    livy_session_id = create_livy_session.json()['id']
    livy_session_url = livy_base_url + "/" + livy_session_id
    get_session_response = requests.get(livy_session_url, headers=headers)
    print(get_session_response.json())
    while get_session_response.json()["state"] != "idle":
        time.sleep(5)
        get_session_response = requests.get(livy_session_url, headers=headers)

    execute_statement = livy_session_url + "/statements"
    payload_data =    {
        "code": "spark.sql(\"SELECT * FROM green_tripdata_2022_08 where fare_amount = 60\").show()",
        "kind": "spark"
        }
    execute_statement_response = requests.post(execute_statement, headers=headers, json=payload_data)
    print('the statement code is submitted as: ' + str(execute_statement_response.json()))

    statement_id = str(execute_statement_response.json()['id'])
    get_statement = livy_session_url+ "/statements/" + statement_id
    get_statement_response = requests.get(get_statement, headers=headers)

    while get_statement_response.json()["state"] != "available":
        # Sleep for 5 seconds before making the next request
        time.sleep(5)
        print('the statement code is submitted and running : ' + str(execute_statement_response.json()))

        # Make the next request
        get_statement_response = requests.get(get_statement, headers=headers)

    rst = get_statement_response.json()['output']['data']['text/plain']
    print(rst)
    ```

1. Run the notebook cell, you should see several incremental lines printed as the job is submitted and the results returned.

    :::image type="content" source="media\livy-api\livy-api-session-1-results.png" alt-text="Screenshot showing the results of the first notebook cell with Spark.sql execution." lightbox="media\livy-api\livy-api-session-1-results.png" :::

### Submit a second spark.sql statement using the Livy API Spark session

1. Add another notebook cell and insert this code.

    ```python
    # call get session API

    livy_session_id = create_livy_session.json()['id']
    livy_session_url = livy_base_url + "/" + livy_session_id
    get_session_response = requests.get(livy_session_url, headers=headers)
    print(get_session_response.json())
    while get_session_response.json()["state"] != "idle":
        time.sleep(5)
        get_session_response = requests.get(livy_session_url, headers=headers)

    execute_statement = livy_session_url + "/statements"
    payload_data = {
        "code": "spark.sql(\"SELECT * FROM green_tripdata_2022_08 where tip_amount = 10\").show()",
        "kind": "spark"
    }
    execute_statement_response = requests.post(execute_statement, headers=headers, json=payload_data)
    print('the statement code is submitted as: ' + str(execute_statement_response.json()))

    statement_id = str(execute_statement_response.json()['id'])
    get_statement = livy_session_url+ "/statements/" + statement_id
    get_statement_response = requests.get(get_statement, headers=headers)

    while get_statement_response.json()["state"] != "available":
    # Sleep for 5 seconds before making the next request
        time.sleep(5)
        print('the statement code is submitted and running : ' + str(execute_statement_response.json()))

        # Make the next request
        get_statement_response = requests.get(get_statement, headers=headers)

    rst = get_statement_response.json()['output']['data']['text/plain']
    print(rst)
    ```

1. Run the notebook cell, you should see several incremental lines printed as the job is submitted and the results returned.

    :::image type="content" source="media\livy-api\livy-api-session-2-results.png" alt-text="Screenshot showing the results of the second notebook cell execution." lightbox="media\livy-api\livy-api-session-2-results.png" :::

### Close the Livy session with a third statement

1. Add another notebook cell and insert this code.

    ```python
    # call get session API with a delete session statement

    get_session_response = requests.get(livy_session_url, headers=headers)
    print('Livy statement URL ' + livy_session_url)

    response = requests.delete(livy_session_url, headers=headers)
    print (response)
    ```

## View your jobs in the Monitoring hub

You can access the Monitoring hub to view various Apache Spark activities by selecting Monitor in the left-side navigation links.

1. When the session is in progress or in completed state, you can view the session status by navigating to Monitor.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub.png" alt-text="Screenshot showing previous Livy API submissions in the Monitoring hub." :::

1. Select and open most recent activity name.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub-last-run.png" alt-text="Screenshot showing most recent Livy API activity in the Monitoring hub." :::

1. In this Livy API session case, you can see your previous sessions submissions, run details, Spark versions, and configuration. Notice the stopped status on the top right.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub-last-activity-details.png" alt-text="Screenshot showing most recent Livy API activity details in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub-last-activity-details.png" :::

To recap the whole process, you need a remote client such as [Visual Studio Code](https://code.visualstudio.com/), an Microsoft Entra app token, Livy API endpoint URL, authentication against your Lakehouse, and finally a Session Livy API.

## Related content

* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Submit Spark batch jobs using the Livy API](get-started-api-livy-batch.md)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)
