---
title: Connect App Service to a SQL database in Fabric
description: Tutorial showing how to connect a web app to a SQL database in Microsoft Fabric using Service Connector
#customer intent: As a web app developer I want to connect an App Service resource to a SQL database in Fabric so that my app can reach the SQL database in Microsoft Fabric.
author: maud-lv
ms.author: malev
ms.custom: service-connector
ms.topic: tutorial
ai-usage: ai-assisted
ms.date: 06/24/2025
---

# Tutorial: Connect App Service to a SQL database in Fabric using Service Connector

In this guide, you learn how to connect an Azure App Service resource to a SQL database in Microsoft Fabric using Service Connector. This setup enables your web app to seamlessly interact with the SQL database in Microsoft Fabric.

> [!div class="checklist"]
> * Create a service connection between Azure App Service and a SQL database in Fabric
> * Grant database access permissions to your web app

## Prerequisites

Before you begin, ensure you have:

* An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free).
* An app hosted on App Service. If you don't have one, [create and deploy an app to App Service](/azure/app-service/quickstart-dotnetcore).
* A SQL database in Microsoft Fabric. If you don't have one, [create a SQL database in Fabric](./create.md).

## Create a service connection

Create a new service connection from App Service to a SQL database in Fabric, using the Azure CLI or the Azure portal.

### [Azure CLI](#tab/azure-cli)

1. Install the Service Connector passwordless extension for the Azure CLI.

    ```azurecli
    az extension add --name serviceconnector-passwordless --upgrade
    ```

1. Gather the required information:

   - **Subscription ID**: Found in your App Service **Overview** tab
   - **Resource group name**: Found in your App Service **Overview** tab
   - **Fabric workspace UUID (universally unique identifier) and SQL database UUID**: Found by navigating to your SQL database in the Fabric portal. The browser URL should look like this: `https://msit.powerbi.com/groups/<fabric_workspace_uuid>/sqldatabases/<fabric_sql_db_uuid>`. The first UUID in the URL is the Fabric workspace UUID, and the second UUID is the SQL database UUID.
   - **App ID** (for user-assigned managed identity authentication only): Found in the Microsoft Entra admin center under **Entra ID > Enterprise apps**. Search for your application and locate **Application ID**.


1. Create the service connection using a system-assigned managed identity or a user-assigned managed identity. In both cases, Service Connector enables a managed identity for authentication and adds a connection string named `FABRIC_SQL_CONNECTIONSTRING` to App Settings.

    **System-assigned managed identity:**

    ```azurecli
    az webapp connection create fabric-sql \
        --source-id /subscriptions/<subscription-ID>/resourceGroups/<source-resource-group>/providers/Microsoft.Web/sites/<site> \
        --target-id https://api.fabric.microsoft.com/v1/workspaces/<fabric_workspace_uuid>/SqlDatabases/<fabric_sql_db_uuid> \
        --system-identity
    ```

    **User-assigned managed identity:**

    ```azurecli
    az webapp connection create fabric-sql \
        --source-id /subscriptions/<subscription-ID>/resourceGroups/<source-resource-group>/providers/Microsoft.Web/sites/<site> \
        --target-id https://api.fabric.microsoft.com/v1/workspaces/<fabric_workspace_uuid>/SqlDatabases/<fabric_sql_db_uuid> \
        --user-identity client-id=<app-ID> "subs-id=<subscription-ID>"
    ```

For more information about these commands and more options, see [az webapp connection create](/cli/azure/webapp/connection/create#az-webapp-connection-create-fabric-sql).

#### [Azure portal](#tab/az-portal)

1. In the Azure portal, open your App Service resource.
1. In the service menu, select **Settings** > **Service Connector**.
1. Select **Create**, and configure the following settings in the **Create connection** panel that opens.

    | Setting             | Example           | Description                                                                                                                                               |
    |---------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Service type**    | *SQL database in Fabric*      | The target service type: SQL database in Fabric.                                                                                              |
    | **Connection name** | *fabricsql_8293d* | A connection name that identifies the connection between your App Service and SQL database. Optionally edit the connection name suggested by default by Service Connector. |
    | **Workspace**       | *My Workspace*    | The Microsoft Fabric Workspace that contains your SQL database.                                                                                            |
    | **SQL database**    | *my_sql_database* | The target SQL database you want to connect to.                                                                                                           |
    | **Client type**     | *.NET*            | The application's tech stack or library.                                                                                                                  |
        
    :::image type="content" source="./media/tutorial-service-connector/basics-tab.png" alt-text="Screenshot of the Azure portal, showing the Basics tab in the Create connection pane."  lightbox="media/tutorial-service-connector/basics-tab.png":::

1. Select **Next: Authentication** and choose your preferred managed identity authentication option (system-assigned or user-assigned). In both cases, Service Connector enables a managed identity for authentication and adds a connection string to App Settings named `FABRIC_SQL_CONNECTIONSTRING`.
1. Select **Next: Networking** > **Review + Create** to review your connection configuration.
1. Check the box stating that you understand that additional manual steps are required to configure this service connection, and select **Create On Cloud Shell**. The command is automatically executed in the Azure Cloud Shell. Alternatively, if you have the [Azure CLI installed](/cli/azure/install-azure-cli-windows), copy and run the provided CLI commands on your local machine.

    :::image type="content" source="./media/tutorial-service-connector/copy-command.png" alt-text="Screenshot of the Azure portal, showing CLI commands.":::

1. Once the command finishes running, close the **Create connection** pane.
---

## Configure database access permissions

After creating the service connection, you need to grant your managed identity the necessary permissions to access the SQL database.

1. In the Azure portal, go to your App Service's **Service Connector** menu and select **Refresh** to see your new connection.

    :::image type="content" source="./media/tutorial-service-connector/access-security-settings.png" alt-text="Screenshot of the Azure portal, showing the SQL database link.":::

1. Under **Resource name**, select the **SQL database** link to open your database in the Microsoft Fabric portal.

1. In the Fabric portal, navigate to the **Security** tab and select **Manage SQL security**.

    :::image type="content" source="./media/tutorial-service-connector/fabric-portal-manage-security.png" alt-text="Screenshot of the Fabric portal, showing the security tab.":::

1. Navigate to the permission management interface by selecting the **db_datareader** role, then select **Manage access**. You're not granting this role to your managed identity; this is just how you access the Fabric permission settings.
1. Look for your managed identity name under **People, groups or apps in this role**. If you see a **Share database** option, continue to the next step. Otherwise, the permissions are already configured.
1. Enter and select the name of your managed identity as it appears on the **Manage access** pane, check **Read all data using SQL database**, and select **Grant**.

## Clean up resources

When no longer needed, delete the resource group and all related resources created for this tutorial. To do so, select the resource group or the individual resources you created and select **Delete**.

## Related content

- [Connect App Service with Service Connector](/azure/service-connector/quickstart-portal-app-service-connection)
- [Integrate SQL database in Microsoft Fabric with Service Connector](/azure/service-connector/how-to-integrate-fabric-sql)
