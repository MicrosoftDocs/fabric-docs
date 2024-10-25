---
title: Create and run Spark jobs using the Livy API
description: Learn how to submit and run Spark jobs in Fabric using the Livy API.
ms.reviewer: sngun
ms.author: guyhay
author: GuyHay
ms.topic: conceptual
ms.search.form: Get started with the Livy API for Data Engineering
ms.date: 08/23/2024
---

# Use the Livy API to submit and execute Spark jobs

> [!NOTE]
> The Livy API for Fabric Data Engineering is in preview.

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Get started with Livy API for Fabric Data Engineering by creating a Lakehouse, authenticating with an Entra app token, and then submit either batch or session jobs from a remote client to Fabric Spark compute.  You'll also need to discover the Livy API endpoint, submit jobs, and monitor the results.

## Prerequisites

* Fabric Premium or Trial capacity with a LakeHouse

* Enable the [Tenant Admin Setting](/fabric/admin/about-tenant-settings) for Livy API (preview)

* A remote client such as Visual Studio Code with Jupyter notebook support, PySpark, and [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/)

* A Microsoft Entra app token is required to access the Fabric Rest API. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app)

## Choosing a REST API client

You can use various programming languages or GUI clients to interact with REST API endpoints. In this article we will leverage [Visual Studio Code](https://code.visualstudio.com/). Visual Studio Code will also need to be configured with [Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), [PySpark](https://code.visualstudio.com/docs/python/python-quick-start), and the [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/)

## How to authorize the Livy API requests

To work with Fabric APIs including the Livy API, you first need to create an Entra application and obtain a token. Your application needs to be registered and configured adequately to perform API calls against Fabric. For more information, see [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

There are a number of Scope permissions required to execute Livy jobs, below is an example of simple Spark code + storage access + SQL:

* Code.AccessAzureDataExplorer.All
* Code.AccessAzureDataLake.All
* Code.AccessAzureKeyvault.All
* Code.AccessFabric.All
* Code.AccessStorage.All
* Item.ReadWrite.All
* Lakehouse.Execute.All
* Lakehouse.Read.All
* Workspace.ReadWrite.All

:::image type="content" source="media/livy-API/Entra-app-API-permissions.png" alt-text="Screenshot showing Livy API permissions in the Entra admin center" lightbox="media/livy-API/Entra-app-API-permissions.png" :::

> [!NOTE]
> During public preview we will be adding a few additional granular scopes, and if you use this approach, when we add these additional scopes your Livy app will break.  Please check this list as it will be updated with the additional scopes.

Some customers may want a more granular permissions than this list above.  You could remove Item.ReadWrite.All and replacing with these more granular Scope permisions:  

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

After you've regisitered your application, you will need both the Application (client) ID and the Directory (tenant) ID.

:::image type="content" source="media/livy-API/Entra-app-overview.png" alt-text="Screenshot showing Livy API app overview in the Entra admin center":::

The authenticated user calling the Livy API needs to be a workspace member where both the API and data source items are located with a Contributor role. For more information, see [Give users access to workspaces](../get-started/give-access-workspaces.md).

## How to discover the Fabric Livy API endpoint

A Lakehouse artifact is required to access the Livy endpoint.  Once the Lakehouse has been created, the Livy API endpoint can be located within the settings panel by adding the string <?experience=power-bi&lhLivyEndpoint=1> to the end of your browser URL sring when opening your Lakehouse.

:::image type="content" source="media/livy-API/Livy-endpoint.png" alt-text="Screenshot showing Livy API endpoints in Lakehouse settings." lightbox="media/livy-API/Livy-endpoint.png":::

The endpoint of the Livy API would follow this pattern:

https://api.fabric.microsoft.com/v1/workspaces/<ws_id>/lakehouses/<lakehouse_id>/livyapi/versions/2023-12-01/

The URL will be appended with either \<sessions> or \<batches> depending on what you choose.

## Download the Livy API swagger files

The full swagger files for the Livy API are available below.

:::code language="yaml" source="Livy-api-swagger\swagger.yaml" range="1-5":::
:::code language="json" source="Livy-api-swagger\swagger.json" range="1-7":::

## Integration with Fabric Environments

For each Fabric workspace, a default starter pool is provisioned, the execution of all the spark code use this starter pool by default. You can use Fabric Environments to customize the Livy API Spark jobs.

## Submit a Livy API jobs

Now that you've completed the setup of the Livy API you can choose to submit either batch or session jobs.

* [Submit Session jobs using the Livy API](get-started-api-livy-session.md)
* [Submit Batch jobs using the Livy API](get-started-api-livy-batch.md)

## How to monitor the request history

You can use the Monitoring Hub to see your prior Livy API submissions, and debug any submissions errors.

:::image type="content" source="media\Livy-API\Livy-monitoring-hub.png" alt-text="Screenshot showing previous Livy API submissions in the Monitoring hub":::

## Related content

* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Get Started with Admin settings for your Fabric Capacity](capacity-settings-overview.md)
* [Apache Spark workspace administration settings in Microsoft Fabric](workspace-admin-settings.md)
* [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app)
* [Entra permission and consent overview](/entra/identity-platform/permissions-consent-overview)
* [Fabric REST API Scopes](/rest/api/fabric/articles/scopes)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)
