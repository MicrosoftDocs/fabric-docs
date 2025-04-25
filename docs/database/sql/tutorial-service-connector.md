---
title: Connect App Service to a SQL database in Fabric
description: Tutorial showing how to connect a web app to a SQL database in Microsoft Fabric using Service Connector
#customer intent: As a web app developer I want to connect an App Service resource to a SQL database in Fabric so that my app can reach the SQL database in Microsoft Fabric.
author: maud-lv
ms.author: malev
ms.custom: service-connector
ms.topic: tutorial
ms.date: 04/23/2025
---

# Tutorial: Connect an App Service to a SQL database in Fabric using Service Connector

In this guide, you learn how to connect an Azure App Service to a SQL database in Microsoft Fabric using Service Connector. This setup enables your web app to seamlessly interact with the SQL database in Microsoft Fabric.

> [!div class="checklist"]
> * Create a service connection to a SQL database in Fabric in Azure App Service
> * Share access to a SQL database in Fabric

## Prerequisites

* An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free).
* An app hosted on App Service. If you don't have one yet, [create and deploy an app to App Service](/azure/app-service/quickstart-dotnetcore)
* A SQL database in Microsoft Fabric. If you don't have one, [create a SQL database in Fabric](./create.md).

## Create a service connection

Create a new service connection from App Service to a SQL database in Fabric, using the Azure CLI or the Azure platform.

### [Azure CLI](#tab/azure-cli)

1. Install the service connector passwordless extension for Azure CLI.

    ```azurecli
    az extension add --name serviceconnector-passwordless --upgrade
    ```

1. Add a service connector for SQL database in Fabric with the `az webapp connection create fabric-sql` command. A connection string is used to authenticate the web app to the database resource.

    ```azurecli
    az webapp connection create fabric-sql \
        --source-id /subscriptions/<subscription>/resourceGroups/<source-resource-group>/providers/Microsoft.Web/sites/<site> \
        --target-id https://api.fabric.microsoft.com/v1/workspaces/<fabric_workspace_uuid>/SqlDatabases/<fabric_sql_db_uuid> \
        --system-identity
    ```

    In the background, Service Connector enables a system-assigned managed identity for the app hosted by Azure App Service and adds a connection string to App Settings named `FABRIC_SQL_CONNECTIONSTRING`.

    For more information about this command and more options, see [az webapp connection create](/cli/azure/webapp/connection/create#az-webapp-connection-create-postgres-flexible).

#### [Azure portal](#tab/az-portal)

1. Open your App Service resource in the Azure portal.
1. Select **Settings** > **Service Connector** from the left menu.
2. Select **Create**, and select or enter the following settings in the **Create connection** panel that opens.

    | Setting             | Example           | Description                                                                                                                                               |
    |---------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Service type**    | *SQL database in Fabric*      | Target service type: SQL database in Fabric. |
    | **Connection name** | *fabricsql_8293d* | The connection name that identifies the connection between your App Service and SQL database. Optionally edit the connection name suggested by default by Service Connector. |
    | **Workspace**       | *My Workspace*    | The Microsoft Fabric Workspace that contains the SQL database.                                                                                            |
    | **SQL database**    | *my_sql_database* | The target SQL database you want to connect to.                                                                                                           |
    | **Client type**     | *.NET*            | The application's tech stack or library.                                                                                                                  |
        
    :::image type="content" source="./media/tutorial-service-connector/basics-tab.png" alt-text="Screenshot of the Azure portal, showing the Basics tab in the Create connection pane.":::

1. Select **Next: Authentication** and select the system-assigned managed identity authentication option, available through the Azure CLI. User-assigned managed identities are also supported.
1. Select **Next: Networking** > **Review + Create** to review your connection configuration.
1. Check the box stating that you understand that additional manual steps are required to configure this service connection, and select **Create On Cloud Shell**. Alternatively, if you have the [Azure CLI installed](/cli/azure/install-azure-cli-windows), copy and run on your local machine the CLI commands that are now displayed right above the checkbox.

    :::image type="content" source="./media/tutorial-service-connector/copy-CLI-command.png" alt-text="Screenshot of the Azure portal, showing the Basics tab in the Create connection pane.":::

1. Once the command finishes running, close the **Create connection** pane.
---

## Share access to SQL database in Fabric

In this step, you grant your managed identity access to the database.

1. In the Azure portal, in the Service Connector menu of your App Service resource, select **Refresh** to display your new connection.

    :::image type="content" source="./media/tutorial-service-connector/access-security-settings.png" alt-text="Screenshot of the Azure portal, showing the SQL database link.":::

1. Under Resource name, select your connection's **SQL database** hyperlink. This opens your SQL database in the Microsoft Fabric portal.

1. Navigate to the **Security** tab and select **Manage SQL security**.

    :::image type="content" source="./media/tutorial-service-connector/fabric-portal-manage-security.png" alt-text="Screenshot of the Fabric portal, showing the security tab.":::

1. Select the role **db_ddladmin**, then **Manage access**.
1. Under **People, groups or apps in this role**, you should see the name of your managed identity with a service connection to this SQL database in Fabric. Select **Share database**. If you don't see the Share database option, you don't need to continue with the remaining steps.
1. Enter and select the name of your managed identity as it appears on the **Manage access** pane, select the **Read all data using SQL database** checkbox, and finally select **Grant**.

## Clean up resources

When no longer needed, delete the resource group and all related resources created for this tutorial. To do so, select the resource group or the individual resources you created and select **Delete**.

## Related content

- [Connect App Services with Service Connector](/azure/service-connector/quickstart-portal-app-service-connection)
- [Service Connector internals](/azure/service-connector/concept-service-connector-internals) <!--to be replaced with new SQL database in Fabric article in azure-docs-pr repo when feature documentation is released-->
