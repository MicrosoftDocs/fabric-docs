---
title: Fabric Connection with Notebook
description: Learn about the integration between Fabric Connection and Notebook, enabling user to access external data sources directly from notebooks with Fabric Connection.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
ms.date: 09/16/2025
ms.search.form: Fabric Connection 
---

# What is Fabric Connection inside Notebook

> [!IMPORTANT]
> The Fabric Connection integration with Notebook is currently in preview.

The integration with Fabric Connection enables consistent Get Data experiences from external data sources directly from notebooks with Fabric Connection. It allows users to reuse existing connections and credentials, simplifying the process of working with diverse data sources with smooth coding experience inside notebooks.

For a fabric connection being able to be used in notebooks, user need to explicitly enable the connection to be used in notebooks from the Fabric data source management page. There's a specific toggle to enable the connection to be used in notebooks, named **"Allow this connection to be used in Code-First Artifact"**. This toggle can only be set during the creation of the connection, and can't be modified later.

Following are the supported authentication methods for Fabric Connection in notebooks:

- **Basic Authentication**: Supported for Azure SQL Database and other databases that support basic authentication.
- **Account Key Authentication**: Supported for REST API data sources that require Account key authentication.
- **Service Principal Authentication**: Supported for Azure services that support Service Principal authentication.

> [!Note]
> you may notice some issue when creating the connection with SPN , this is a known issue and we are working on fixing it.

- **Token Authentication**: Supported for data sources that require token-based authentication.
- **Workspace Identity Authentication**: Support for Fabric Workspace identity authentication.

> [!IMPORTANT]
> OAuth2.0 isn't supported for Fabric Connection in notebooks. If you choose SPN or workspace identity authentication, make sure to grant the necessary permissions to the SPN or Fabric workspace identity to access the data source.

There's a tenant level setting that allows tenant admin to control whether this feature is enabled for the entire tenant. If the setting is disabled, users can't use Fabric Connection in notebooks. By default, this feature is enabled.

   :::image type="content" source="media\fabric-connection-notebook\tenant-setting-connection.png" alt-text="Screenshot of tenant setting for Fabric Connection in notebooks.":::

## How to create Fabric Connection for Notebook

There are two ways to create Fabric Connection for Notebook.

### Create Fabric Connection within Notebook

Inside notebook, user can create a Fabric Connection by clicking the **"Add connection"** button in the **"Connections"** pane.

:::image type="content" source="media\fabric-connection-notebook\add-connection-notebook.png" alt-text="Screenshot of adding connection within notebook.":::

This opens the **"Add connection"** pane, where user can select the data source type, provide connection details, and choose the authentication method.

For the connection created within notebook, the state of **"Allow this connection to be used in Code-First Artifact"** toggle is enabled by default, after the connection is created, it would be automatically bound to the current notebook and appears in the **"Current Notebook"** node in the **"Connections"** pane.

:::image type="content" source="media\fabric-connection-notebook\current-notebook-connection.png" alt-text="Screenshot of current notebook connection.":::

### Create Fabric Connection from Data Source Management page

User can create a Fabric Connection from the existing Data Source Management page. To do this, navigate to the **"Data Source Management"** page, and click the **"New"** button. You can find more details about how to create Fabric Connection from Data Source Management page in[Data source management](../data-factory/data-source-management.md) article.

When creating the connection, make sure to enable the **"Allow this connection to be used in Code-First Artifact"** toggle, so that the connection can be used in notebooks. After the connection is created, it appears in the **"Global Permissions"** node in the **"Connections"** pane inside notebook.

:::image type="content" source="media\fabric-connection-notebook\global-permission-connection.png" alt-text="Screenshot of global permission connection.":::

For the connection under the **"Global Permissions"** node, user need to explicitly bind the connection to the current notebook by clicking the **"Connect"** button in the connection context menu.

:::image type="content" source="media\fabric-connection-notebook\bind-connection.png" alt-text="Screenshot of binding connection to current notebook.":::

After the connection is bound to the current notebook, it will appear in the **"Current Notebook"** node in the **"Connections"** pane.

## How to use Fabric Connection in notebook code

Once the Fabric Connection is created and bound to the current notebook, user can generate code snippets to access the data source directly from the notebook. To do this, right-click on the connection in the **"Current Notebook"** node, and select **"Add as code cell"** from the context menu.

:::image type="content" source="media\fabric-connection-notebook\add-as-code-cell.png" alt-text="Screenshot of adding connection as code cell.":::

In the code, it firstly gets the credential detail from the connection, then use the credential information to create a connection to the data source, and finally execute a query to fetch data from the data source. The generated code snippet can be modified as needed to fit the specific query requirements. If the required packages aren't already installed in the default runtime, a code cell with pip install command is generated to install the required packages.

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

Make sure to execute the code cell with pip install command first to install the required packages, then execute the code cell to fetch data from the data source.

### Connection Permission requirements

During the execution of the notebook, there is a permission check to ensure the current user who triggers the execution has the necessary permissions to access the connection. If the user doesn't have permission, the execution fails with an error message indicating the lack of permission.

If the notebook is shared with other users, those users also need to have the necessary permissions to access the connection in order to successfully execute the code cell. Find more details about managing connection permissions in the [Data source management](../data-factory/data-source-management.md) article.

> [!IMPORTANT]
> All the credential details are redacted with some following updates.

## Connect or disconnect Fabric Connection from notebook

To connect or disconnect a Fabric Connection from the current notebook, right-click on the connection in the **"Current Notebook"** node, and select **"Disconnect"** or **"Connect"** from the context menu.

If the same connection is disconnected and reconnected, the connection ID will change. For any existing code cells that reference the connection, user need to update the connection ID in the code cell to the new connection ID. You can find the connection ID with context menu of the connection by selecting **"Copy ID"**.

:::image type="content" source="media\fabric-connection-notebook\copy-connection-id.png" alt-text="Screenshot of copying connection ID.":::

## Known issues and limitations

- OAuth2.0 authentication isn't supported for Fabric Connection in notebooks.
- For the SPN authentication, you might notice some issue when creating the connection, it is a known issue and we're working on fixing it.

## Related content

- [Data source management](../data-factory/data-source-management.md)
