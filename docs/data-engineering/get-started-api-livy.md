---
title: Create and run Spark Session jobs using the Livy API
description: Learn how to submit and run Spark session jobs in Fabric using the Livy API.
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.search.form: Get started with the Livy API for Data Engineering
ms.date: 11/05/2025
---

# Use the Livy API to submit and execute Spark session jobs with user credentials

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Get started with Livy API for Fabric Data Engineering by creating a Lakehouse; authenticating with a Microsoft Entra token; discover the Livy API endpoint; submit either batch or session jobs from a remote client to Fabric Spark compute; and monitor the results.

## Prerequisites

* Fabric Premium or Trial capacity with a LakeHouse

* Enable the [Tenant Admin Setting](/fabric/admin/about-tenant-settings) for Livy API (preview)

* A remote client such as Visual Studio Code with Jupyter notebook support, PySpark, and [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/)

* Either a Microsoft Entra app token. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app)

* Or a Microsoft Entra SPN token. [Add and manage application credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials?tabs=client-secret)

## Choosing a REST API client

You can use various programming languages or GUI clients to interact with REST API endpoints. In this article, we use [Visual Studio Code](https://code.visualstudio.com/). Visual Studio Code needs to be configured with [Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), [PySpark](https://code.visualstudio.com/docs/python/python-quick-start), and the [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/)

## How to authorize the Livy API requests with an Entra SPN Token

To work with Fabric APIs including the Livy API, you first need to create a Microsoft Entra application and create a secret and use that secret in your code. Your application needs to be registered and configured adequately to perform API calls against Fabric. For more information, see [Add and manage application credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials?tabs=client-secret)

After creating the app registration, create a client secret.

:::image type="content" source="media\livy-api\entra-spn-add-client-secret.png" alt-text="Screenshot showing Entra app registration and adding a client secret." lightbox="media/livy-api/Entra-spn-add-client-secret.png":::

1. As you create the client secret, make sure to copy the value. You need this later in the code, and the secret can't be seen again. You'll also need the Application (client) ID and the Directory (tenant ID) in addition to the secret in your code.

1. Next we need to add the client secret to our workspace.

    :::image type="content" source="media\livy-api\livy-manage-access-spn.png" alt-text="Screenshot showing Manage access options Lakehouse settings." lightbox="media\livy-api\Livy-manage-access-spn.png":::

1. Search for the Entra client secret, and add that secret to the workspace, and make sure the newly added secret has Admin permissions.

    :::image type="content" source="media\livy-api\entra-spn-add-people.png" alt-text="Screenshot showing adding the new SPN service principal to the workspace." lightbox="media\livy-api\Entra-spn-add-people.png":::

## How to authorize the Livy API requests with an Entra app token

To work with Fabric APIs including the Livy API, you first need to create a Microsoft Entra application and obtain a token. Your application needs to be registered and configured adequately to perform API calls against Fabric. For more information, see [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

There are many Microsoft Entra scope permissions required to execute Livy jobs. This example uses simple Spark code + storage access + SQL:

* Code.AccessAzureDataExplorer.All
* Code.AccessAzureDataLake.All
* Code.AccessAzureKeyvault.All
* Code.AccessFabric.All
* Code.AccessStorage.All
* Item.ReadWrite.All
* Lakehouse.Execute.All
* Workspace.ReadWrite.All

    :::image type="content" source="media/livy-api/entra-app-API-permissions.png" alt-text="Screenshot showing Livy API permissions in the Microsoft Entra admin center." lightbox="media/livy-api/entra-app-API-permissions.png" :::

> [!NOTE]
> During public preview these scopes may change as we add a few more granular scopes. When these scope changes happen your Livy app may break. Check this list as it will be updated with the additional scopes.

Some customers want more granular permissions than the prior list. You could remove Item.ReadWrite.All and replacing with these more granular scope permissions:

* Code.AccessAzureDataExplorer.All
* Code.AccessAzureDataLake.All
* Code.AccessAzureKeyvault.All
* Code.AccessFabric.All
* Code.AccessStorage.All
* Lakehouse.Execute.All
* Lakehouse.ReadWrite.All
* Workspace.ReadWrite.All
* Notebook.ReadWrite.All
* SparkJobDefinition.ReadWrite.All
* MLModel.ReadWrite.All
* MLExperiment.ReadWrite.All
* Dataset.ReadWrite.All

When you register your application, you will need both the Application (client) ID and the Directory (tenant) ID.

:::image type="content" source="media/livy-api/entra-app-overview.png" alt-text="Screenshot showing Livy API app overview in the Microsoft Entra admin center." lightbox="media/livy-api/entra-app-overview.png":::

The authenticated user calling the Livy API needs to be a workspace member where both the API and data source items are located with a Contributor role. For more information, see [Give users access to workspaces](../fundamentals/give-access-workspaces.md).

## How to discover the Fabric Livy API endpoint

A Lakehouse artifact is required to access the Livy endpoint. Once the Lakehouse is created, the Livy API endpoint can be located within the settings panel.

:::image type="content" source="media/livy-api/Lakehouse-settings-livy-endpoint.png" alt-text="Screenshot showing Livy API endpoints in Lakehouse settings." lightbox="media/livy-api/Lakehouse-settings-livy-endpoint.png":::

The endpoint of the Livy API would follow this pattern:

`https://api.fabric.microsoft.com/v1/workspaces/><ws_id>/lakehouses/<lakehouse_id>/livyapi/versions/2023-12-01/`

The URL is appended with either \<sessions> or \<batches> depending on what you choose.

## Download the Livy API Swagger files

The full swagger files for the Livy API are available here.

* [Livy API Swagger JSON](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/Livy-API-swagger/swagger.json)
* [Livy API Swagger YAML](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-engineering/Livy-API-swagger/swagger.yaml)

## Submit a Livy API jobs

Now that setup of the Livy API is complete, you can choose to submit either batch or session jobs.

* [Submit Session jobs using the Livy API](get-started-api-livy-session.md)
* [Submit Batch jobs using the Livy API](get-started-api-livy-batch.md)

### Integration with Fabric Environments

By default, this Livy API session runs against the default starter pool for the workspace. Alternatively you can use Fabric Environments [Create, configure, and use an environment in Microsoft Fabric](/fabric/data-engineering/create-and-use-environment) to customize the Spark pool that the Livy API session uses for these Spark jobs.

To use a Fabric Environment in a Livy Spark session, simply update the json to include this payload.

```python
create_livy_session = requests.post(livy_base_url, headers = headers, json={
    "conf" : {
        "spark.fabric.environmentDetails" : "{\"id\" : \""EnvironmentID""}"}
    }
)
```

To use a Fabric Environment in a Livy Spark batch session, simply update the json payload as shown below.

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

## How to monitor the request history

You can use the Monitoring Hub to see your prior Livy API submissions, and debug any submissions errors.

:::image type="content" source="media\livy-api\livy-monitoring-hub.png" alt-text="Screenshot showing previous Livy API submissions in the Monitoring hub." lightbox="media/livy-api/livy-monitoring-hub.png" :::

## Related content

* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Get Started with Admin settings for your Fabric Capacity](capacity-settings-overview.md)
* [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
* [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app)
* [Microsoft Entra permission and consent overview](/entra/identity-platform/permissions-consent-overview)
* [Fabric REST API Scopes](/rest/api/fabric/articles/scopes)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)
