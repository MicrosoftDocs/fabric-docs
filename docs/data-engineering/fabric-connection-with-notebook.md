---
title: Fabric Connection with Notebook
description: Learn about how you can use a Fabric Connection to access external data sources directly in notebooks.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom:
ms.date: 9/19/2025
ms.search.form: Fabric Connection 
---

# What is Fabric connection inside Notebook

> [!IMPORTANT]
> The Fabric Connection integration with Notebook is currently in preview.

The integration with Fabric Connection lets you use external data sources directly from notebooks. You can reuse existing connections and credentials, which makes it easier to work with different data sources and gives you a smooth coding experience inside notebooks.

To use a fabric connection in notebooks, you need to explicitly enable the connection to be used in notebooks from the Fabric data source management page. There's a specific toggle to enable the connection to be used in notebooks, named **"Allow this connection to be used in Code-First Artifact"**. This toggle can only be set during the creation of the connection, and can't be modified later.

Here are the supported authentication methods for Fabric Connection in notebooks:

- **Basic Authentication**: Supported for Azure SQL Database and other databases that support basic authentication.
- **Account Key Authentication**: Supported for REST API data sources that require Account key authentication.
- **Token Authentication**: Supported for data sources that require token-based authentication.
- **Workspace Identity Authentication**: Supported for Fabric workspace identity authentication.
- **Service Principal Authentication(SPN)**: Supported for data sources that require SPN-based authentication.

> [!IMPORTANT]
> OAuth2.0 isn't supported for Fabric Connection in notebooks. If you choose workspace identity authentication or SPN, make sure to grant the necessary permissions to the Fabric workspace identity to access the data source. For the detail setup of each connector, please refer to [Data source management](../data-factory/connector-overview.md) article.

There's a tenant level setting that allows the tenant admin to control whether this feature is enabled for the entire tenant. If the setting is disabled, users can't use Fabric Connection in notebooks. By default, this feature is enabled.

   :::image type="content" source="media\fabric-connection-notebook\tenant-setting-connection.png" alt-text="Screenshot of tenant setting for Fabric Connection in notebooks. "lightbox="media\fabric-connection-notebook\tenant-setting-connection.png":::

## How to create Fabric Connection for Notebook

There are two ways to create Fabric Connection for Notebook.

### Create Fabric Connection within Notebook

Inside a notebook, you can create a Fabric Connection by selecting the **"Add connection"** button in the **"Connections"** pane.

:::image type="content" source="media\fabric-connection-notebook\add-connection-notebook.png" alt-text="Screenshot of adding connection within notebook. "lightbox="media\fabric-connection-notebook\add-connection-notebook.png":::

This opens the **"Add connection"** pane where you can select the data source type. Provide the connection details and choose the authentication method.

For the connection created within a notebook, the state of **"Allow Code-First Artifacts like Notebooks to access this connection(Preview)"** toggle is enabled by default. After the connection is created, it's automatically bound to the current notebook and appears in the **"Current Notebook"** node in the **"Connections"** pane.

:::image type="content" source="media\fabric-connection-notebook\current-notebook-connection.png" alt-text="Screenshot of current notebook connection. "lightbox="media\fabric-connection-notebook\current-notebook-connection.png":::

### Create Fabric Connection from Data Source Management page

You can create a Fabric Connection from the existing Data Source Management page. To do this, navigate to the **"Data Source Management"** page, and select the **"New"** button. You can find more details about how to create a Fabric Connection from the Data Source Management page in[Data source management](../data-factory/data-source-management.md) article.

When creating the connection, make sure to enable the **"Allow this connection to be used in Code-First Artifact"** toggle, so that the connection can be used in notebooks. After the connection is created, it appears in the **"Global Permissions"** node in the **"Connections"** pane inside notebook.

:::image type="content" source="media\fabric-connection-notebook\global-permission-connection.png" alt-text="Screenshot of global permission connection. "lightbox="media\fabric-connection-notebook\global-permission-connection.png":::

For the connection under the **"Global Permissions"** node, you need to explicitly bind the connection to the current notebook by selecting the **"Connect"** button in the connection context menu.

:::image type="content" source="media\fabric-connection-notebook\bind-connection.png" alt-text="Screenshot of binding connection to current notebook. "lightbox="media\fabric-connection-notebook\bind-connection.png":::

After you bind the connection to the current notebook, it appears in the **"Current Notebook"** node in the **"Connections"** pane.


### Connection status

Over time, the status of a Fabric Connection may change due to various reasons, such as credential expiration or permission changes. You can check the connection status by selecting the **"Check status"** button from the context menu. 

:::image type="content" source="media\fabric-connection-notebook\connection-check-status.png" alt-text="Screenshot of check status option. "lightbox="media\fabric-connection-notebook\connection-check-status.png":::

If there are any issues with the connection, an offline icon is displayed next to the connection name. Following are some comon scenarios that may cause a connection to go offline:
- **Credential Expiration**: If the credential used for the connection is expired, then the connection goes offline. You need to update the credentials to bring the connection back online.
- **Permission Changes**: If the permission for the data source change and the connection no longer has access, then the connection goes offline. You need to restore the necessary permissions to bring the connection back online. For example, if you're using Workspace Identity Authentication or SPN, ensure that the Fabric workspace identity or SPN has the required permissions to access the data source.
- **Network Issues**: If there are network issues preventing access to the data source, the connection goes offline. You need to resolve the network issues to bring the connection back online.
- **Connection deleted**: If the connection is deleted after being bound to the notebook, it goes offline with **Unavailable** detail error. You can't generate code snippets from an offline connection.


:::image type="content" source="media\fabric-connection-notebook\connection-offline.png" alt-text="Screenshot of connection offline status. "lightbox="media\fabric-connection-notebook\connection-offline.png":::


For the offline connection under the **"Current Notebook"** node, the **"Check status"** and **"Disconnect"** options are available in the context menu. You can't generate code snippets from an offline connection. If the **Check status** is also disabled, it indicates that the connection is deleted. You can either recreate the connection and bind it to the notebook again, or update the code snippets to use a different connection that's available.

For the offline connection under the **"Global Permissions"** node, the **"Check status"** option is available in the context menu. You can't connect an offline connection to the current notebook. The **"Delete"** option is only available if the current user has the owner permission for the connection.


> [!IMPORTANT]
> If Workspace Identity Authentication is used to create the connection, the **"Check status"** option can’t validate if the connection is online or offline given the test connection can’t support workspace identity authentication.

## How to use Fabric Connection in notebook code

Once the Fabric Connection is created and bound to the current notebook, you can generate code snippets to access the data source directly from the notebook. 

1. Find the connection in the **"Current Notebook"** node.
1. Select the ellipsis (...) and then select **"Add as code cell"** from the context menu.

    :::image type="content" source="media\fabric-connection-notebook\add-as-code-cell.png" alt-text="Screenshot of adding a connection as a code cell in the notebook."lightbox="media\fabric-connection-notebook\add-as-code-cell.png":::

The code gets the connection's credential details, uses those credentials to set up a client for the data source, and then runs a query to get data. You can adapt the generated snippet for your query needs. If the required packages aren't present in the runtime, a preceding code cell with a pip install command appears—run that cell before running the query.

The following is an example of code snippet generated for an Azure SQL Cosmos DB connection:

```python
from azure.cosmos import CosmosClient
import json
import pandas as pd

connection_id = '9d405da3-3d11-481a-9022-xxxxxxxxxxx' # connection name: "neweventdb qixwang"
connection_credential = notebookutils.connections.getCredential(connection_id)
credential_dict = json.loads(connection_credential['credential'])
key = next(item['value'] for item in credential_dict['credentialData'] if item['name'] == 'key')
endpoint = 'https://userevent.documents.azure.com:443/'

client = CosmosClient(endpoint, credential=key)
databases = list(client.list_databases())
database = databases[0]
database_client = client.get_database_client(database['id'])
containers = list(database_client.list_containers())
container = containers[0]
container_name = container['id']
container_client = database_client.get_container_client(container_name)

query = f"SELECT * FROM {container_name} p"
items = list(container_client.query_items(query=query, enable_cross_partition_query=True))

df = pd.DataFrame(items)
display(df)
```

Run the code cell with the `pip install` command first to install the required packages, then run the code cell to get data from the data source.

### Connection permission requirements

When you run the notebook, a permission check makes sure you have the permissions needed to use the connection. If you don't have permission, the notebook shows an error message.

If you share the notebook with other users, they also need the right permissions to use the connection and run the code cell. Learn more about managing connection permissions in [Data source management](../data-factory/data-source-management.md).

If workspace identity authentication or SPN is used for the connection, make sure that the Fabric workspace identity or SPN has the necessary permissions to access the data source.

For Azure Key Vault connections, following are the permission requirements if SPN or workspace identity authentication is used:
- The SPN or Fabric workspace identity must have Admin/Contributor role on the Key Vault to access the secrets.
- The SPN or Fabric workspace identity must have Azure Resource Owner/Contributor role on the Key Vault.
- Update access policies in the Key Vault to grant secret access to the SPN or Fabric workspace identity
- Enable **"Vault access policy"** in the Key Vault's access policies and grant **"Get"** and **"List"** permissions for secrets to the SPN or Fabric workspace identity.


## Connect or disconnect Fabric Connection from notebook

To connect or disconnect a Fabric Connection from the current notebook:
1. Select the connection in the **"Current Notebook"** node.
1. Select the ellipsis (...) and then select **"Disconnect"** or **"Connect"** from the context menu.

If the same connection is disconnected and reconnected, the connection ID changes. For any existing code cells that reference the connection, you need to update the connection ID in the code cell to the new connection ID. You can find the connection ID with context menu of the connection by selecting **"Copy ID"**.

:::image type="content" source="media\fabric-connection-notebook\copy-connection-id.png" alt-text="Screenshot of copying the connection ID in the context menu. "lightbox="media\fabric-connection-notebook\copy-connection-id.png":::

## Known issues and limitations

- OAuth2.0 authentication isn't supported for Fabric Connection in notebooks.

## Related content

- [Data source management](../data-factory/data-source-management.md)
