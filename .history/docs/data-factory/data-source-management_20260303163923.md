---
title: Data source management
description: Learn how to add and remove data sources, and how to manage users.
ms.reviewer: abnarain
ms.topic: how-to
ms.date: 08/21/2025
ms.custom: connectors
ai-usage: ai-assisted
---

# Data source management

[!INCLUDE [product-name](../includes/product-name.md)] works with many data sources, both on-premises and in the cloud. Each data source has specific setup requirements. This article shows you how to add an Azure SQL Server as a cloud data source as an example - and the process is similar for other sources. If you need help with on-premises data sources, see [Add or remove a gateway data source](/power-bi/connect-data/service-gateway-data-sources).

> [!NOTE]
> Right now, cloud connections work with pipelines and Kusto. For datasets, datamarts, and dataflows, you need to use Power Query Online's "get data" experience to create personal cloud connections.

## Add a data source

Here's how to add a new data source:

1. Open the [!INCLUDE [product-name](../includes/product-name.md)] service and select the **Settings** icon in the header. Then select **Manage connections and gateways**.

   :::image type="content" source="media/data-source-management/manage-connections-gateways.png" alt-text="Screenshot showing where to select Manage connections and gateways.":::

1. On the **Connections** tab, select **New** at the top of the screen.

1. In the **New connection** screen:
   * Select **Cloud**
   * Enter a descriptive **Connection name**
   * Choose your **Connection Type** (we use **SQL server** in this example)

1. Fill in the data source details. For SQL server, you need:
   * **Server** name
   * **Database** name

   :::image type="content" source="media/data-source-management/new-connection.png" alt-text="Screenshot showing examples of details in New connection screen.":::

1. Choose your **Authentication method**:
   * **Basic**
   * **OAuth2**
   * **Service Principal**

   :::image type="content" source="media/data-source-management/authentication-method.png" alt-text="Screenshot showing where to select an authentication method.":::

   > [!NOTE]
   > If you use **OAuth2**:
   > * Long-running queries might fail if they exceed the OAuth token expiration
   > * Cross-tenant Microsoft Entra accounts aren't supported

1. Optional: Set up a [privacy level](https://support.office.com/article/Privacy-levels-Power-Query-CC3EDE4D-359E-4B28-BC72-9BEE7900B540) under **General** > **Privacy level**. This setting doesn't affect [DirectQuery](/power-bi/connect-data/desktop-directquery-about) connections.

   :::image type="content" source="media/data-source-management/privacy-level.png" alt-text="Screenshot showing privacy level options.":::

1. Select **Create**. You see a **Created new connection** message under **Settings** when successful.

   :::image type="content" source="media/data-source-management/settings.png" alt-text="Screenshot of new connection success message.":::

Once created, you can use this data source to work with Azure SQL data in supported [!INCLUDE [product-name](../includes/product-name.md)] items.

### Allow cloud connection usage on gateway

When creating a connection, you see a setting labeled **This connection can be used with on-premise data gateways and VNet data gateways**. This setting controls whether your connection can work with gateways:

* When unchecked: The connection can't be used with gateway-based evaluations
* When checked: The connection can work with gateway-based evaluations

>[!CAUTION]
> While this setting appears when creating cloud connections through Dataflow Gen2, it isn't currently enforced. All shareable cloud connections work through a gateway if one is present.

## Remove a data source

To remove a data source that's no longer needed, follow these steps:

1. Go to the **Data** screen in **Manage connections and gateways**
1. Select your data source
1. Select **Remove** from the top ribbon

>[!IMPORTANT]
> When you remove a data source, any items that depend on it stop working.

:::image type="content" source="media/data-source-management/remove-data-source.png" alt-text="Screenshot of where to select Remove.":::

## Get a data source connection ID

To retrieve a connection ID for use in Microsoft Fabric items or REST APIs, use one of these methods:

* [Use the service interface](#use-the-service-interface)
* [Use the REST API](#use-the-rest-api)

### Use the service interface

1. Go to **Manage connections and gateways**

   :::image type="content" source="media/data-source-management/settings-data-source.png" alt-text="Screenshot of where to select Settings.":::

1. Under the connection **Settings** screen, copy the connection ID of the data source.

   :::image type="content" source="media/data-source-management/retrieve-data-source-connection-id.png" alt-text="Screenshot of retrieving connection ID from the connection settings.":::

### Use the REST API

Use the [List Connections](/rest/api/fabric/core/connections/list-connections) endpoint to retrieve your connection information:

1. Send an HTTP GET to the Fabric Connections API, including your token in the `Authorization` header:
  
    ```bash
    curl -X GET https://api.fabric.microsoft.com/v1/connections \
    -H "Authorization: Bearer $ACCESS_TOKEN"
    ```

1. A successful response returns a JSON payload similar to:

   ```json
    {
    "value": [
       {
          "id": "bbbbbbbb-1111-2222-3333-cccccccccccc",
          "displayName": "ContosoConnection1",
          …
       },
       {
          "id": "cccccccc-2222-3333-4444-dddddddddddd",
          "displayName": "ContosoConnection2",
          …
       }
    ],
    "continuationToken": "…",
    "continuationUri": "…"
    }
    ```

1. Each object’s `id` property under the `value` array is the connection ID. Extract the `id` property from the response as needed.

   > [!NOTE]
   > If you have more than 100 connections, use the `continuationToken` query parameter on subsequent requests to page through all results.

Here's a sample Python snippet that uses `requests` and Microsoft Authentication Library (`msal`) to call the `GET /v1/connections` endpoint and parse connection IDs:

```python
import requests
import msal

# 1. Acquire token
app = msal.ConfidentialClientApplication(
   client_id="YOUR_CLIENT_ID",
   client_credential="YOUR_CLIENT_SECRET",
   authority="https://login.microsoftonline.com/YOUR_TENANT_ID"
)
result = app.acquire_token_for_client(scopes=["https://api.fabric.microsoft.com/.default"])
token = result["access_token"]

# 2. Call API
headers = {"Authorization": f"Bearer {token}"}
resp = requests.get("https://api.fabric.microsoft.com/v1/connections", headers=headers)
resp.raise_for_status()

# 3. Parse IDs
for conn in resp.json().get("value", []):
   print(f"{conn['displayName']}: {conn['id']}")
```

## Manage users

After you add a cloud data source, you give users and security groups access to the specific data source. The access list for the data source controls only who is allowed to use the data source in items that include data from the data source.  

> [!NOTE]
> Sharing connections with other users risks unauthorized changes and potential data loss. Users with access to the data source can write to the data source, and connect, based on either the stored credentials or SSO you selected while creating a data source. Before you share a data source connection, always ensure the user or group account you’re sharing are trusted and has only the privileges it needs (ideally a service account with narrowly scoped rights).

## Add users to a data source

1. Select the **Settings** icon, and open **Manage connections and gateways**

1. Find your data source in the list. Use the filter or search in the top ribbon to locate cloud connections quickly.

   :::image type="content" source="media/data-source-management/add-users-data-source.png" alt-text="Screenshot showing where to find all cloud connections." lightbox="media/data-source-management/add-users-data-source.png":::

1. Select **Manage users** from the top ribbon

1. In the **Manage users** screen:
   * Add users or security groups from your organization
   * Select the new user name
   * Choose their role: **User**, **User with resharing**, or **Owner**

1. Select **Share** to give them access

   :::image type="content" source="media/data-source-management/manage-users.png" alt-text="Screenshot showing the Manage users screen." lightbox="media/data-source-management/manage-users.png":::

> [!NOTE]
> You need to add users to each data source separately - each one has its own access list.

## Remove users from a data source

To remove access, go to the **Manage Users** tab and remove the user or security group from the list.

## Manage sharing permissions

Control who can share connections in your organization. By default, users can share connections if they are:

* Connection owners or admins
* Users with sharing permissions

Connection sharing helps teams collaborate while keeping credentials secure. Shared connections only work within Fabric.

### Restrict connection sharing

As a tenant admin, you can limit who can share connections:

1. You need Power BI Service Administrator privileges

1. Open Power BI or Fabric settings and go to **Manage connections and gateways**

1. Turn on the tenant administration toggle in the top right

   :::image type="content" source="media/data-source-management/tenant-administration.png" alt-text="Screenshot showing the tenant administration toggle in the Manage connections and gateways page.":::

1. Select **Blocking shareable cloud connections** and turn it on.
   * When off (default): Any user can share connections
   * When on: Sharing is blocked tenant-wide

   :::image type="content" source="media/data-source-management/manage-cloud-connection-sharing.png" alt-text="Screenshot showing the manage cloud connection sharing feature.":::

1. Optional: Add specific users to an allowlist:
   * Search for users and select **Add**
   * Listed users can still share connections
   * Everyone else is blocked from sharing

   :::image type="content" source="media/data-source-management/manage-cloud-connection-sharing-on.png" alt-text="Screenshot showing the manage cloud connection sharing feature toggled on.":::

> [!NOTE]
>
> * Blocking sharing could limit collaboration between users
> * Existing shared connections stay shared when you turn on the restriction

## Related content

* [Connectors overview](connector-overview.md)
