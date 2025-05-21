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

1. Add a service connector for SQL database in Fabric with the `az webapp connection create fabric-sql` command, using a system-assigned managed identity or a user-assigned managed identity. A connection string is used to authenticate the web app to the database resource.
   
    To use a system-assigned managed identity, when running the code below:
    
   1. Replace `<subscription-ID>` with the subscription ID associated with your App Service and `<source-resource-group>` with the name of the resource group containing your App Service. You can find this information in the **Overview** tab of your App Service resource in the Azure portal.
   1. Replace `<fabric_workspace_uuid>` and `<fabric_sql_db_uuid>` with the universally unique identifier (UUID) of your Microsoft Fabric workspace and the UUID of your SQL database. To find these values, navigate to your SQL database in the Fabric portal. The browser URL should look like this: `https://msit.powerbi.com/groups/<fabric_workspace_uuid>/sqldatabases/<fabric_sql_db_uuid>`. The first UUID in the URL is the Fabric workspace UUID, and the second UUID is the SQL database UUID.

    ```azurecli
    az webapp connection create fabric-sql \
        --source-id /subscriptions/<subscription-ID>/resourceGroups/<source-resource-group>/providers/Microsoft.Web/sites/<site> \
        --target-id https://api.fabric.microsoft.com/v1/workspaces/<fabric_workspace_uuid>/SqlDatabases/<fabric_sql_db_uuid> \
        --system-identity
    ```

    In the background, Service Connector enables a system-assigned managed identity for the app hosted by Azure App Service and adds a connection string to App Settings named `FABRIC_SQL_CONNECTIONSTRING`.

    To use a user-assigned managed identity, when running the code below:
    
   1. Replace `<subscription-ID>` with the subscription ID associated with your App Service and `<source-resource-group>` with the name of the resource group containing your App Service. You can find this information in the **Overview** tab of your App Service resource in the Azure portal.
   1. Replace `<fabric_workspace_uuid>` and `<fabric_sql_db_uuid>` with the universally unique identifier (UUID) of your Microsoft Fabric workspace and the UUID of your SQL database. To find these values, navigate to your SQL database in the Fabric portal. The browser URL should look like this: `https://msit.powerbi.com/groups/<fabric_workspace_uuid>/sqldatabases/<fabric_sql_db_uuid>`. The first UUID in the URL is the Fabric workspace UUID, and the second UUID is the SQL database UUID.
   1. Replace `<app-ID>` with the application ID you want to use, and `<your-subscription-id>` with your subscription ID. To find the application ID, sign in to the Microsoft Entra admin center, browse to **Entra ID > Enterprise apps**, search for your application and locate **Application ID**.

    ```azurecli
    az webapp connection create fabric-sql \
        --source-id /subscriptions/<subscription-ID>/resourceGroups/<source-resource-group>/providers/Microsoft.Web/sites/<site> \
        --target-id https://api.fabric.microsoft.com/v1/workspaces/<fabric_workspace_uuid>/SqlDatabases/<fabric_sql_db_uuid> \
        --user-identity client-id=<app-ID> "subs-id=<subscription-ID>"
    ```

    For more information about this command and more options, see [az webapp connection create](/cli/azure/webapp/connection/create#az-webapp-connection-create-fabric-sql).

#### [Azure portal](#tab/az-portal)

1. Open your App Service resource in the Azure portal.
1. Select **Settings** > **Service Connector** from the left menu.
1. Select **Create**, and select or enter the following settings in the **Create connection** panel that opens.

    | Setting             | Example           | Description                                                                                                                                               |
    |---------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Service type**    | *SQL database in Fabric*      | Target service type: SQL database in Fabric. |
    | **Connection name** | *fabricsql_8293d* | The connection name that identifies the connection between your App Service and SQL database. Optionally edit the connection name suggested by default by Service Connector. |
    | **Workspace**       | *My Workspace*    | The Microsoft Fabric Workspace that contains the SQL database.                                                                                            |
    | **SQL database**    | *my_sql_database* | The target SQL database you want to connect to.                                                                                                           |
    | **Client type**     | *.NET*            | The application's tech stack or library.                                                                                                                  |
        
    :::image type="content" source="./media/tutorial-service-connector/basics-tab.png" alt-text="Screenshot of the Azure portal, showing the Basics tab in the Create connection pane."  lightbox="media/tutorial-service-connector/basics-tab.png":::

1. Select **Next: Authentication** and select the system-assigned managed identity authentication option, available through the Azure CLI. User-assigned managed identities are also supported.
1. Select **Next: Networking** > **Review + Create** to review your connection configuration.
1. Check the box stating that you understand that additional manual steps are required to configure this service connection, and select **Create On Cloud Shell**. The command is automatically executed in the Azure Cloud Shell. Alternatively, if you have the [Azure CLI installed](/cli/azure/install-azure-cli-windows), copy and run the provided CLI commands on your local machine.

    :::image type="content" source="./media/tutorial-service-connector/copy-command.png" alt-text="Screenshot of the Azure portal, showing CLI commands.":::

1. Once the command finishes running, close the **Create connection** pane.
---

## Share access to SQL database in Fabric

In this step, you grant your managed identity access to the database.

1. In the Azure portal, in the Service Connector menu of your App Service resource, select **Refresh** to display your new connection.

    :::image type="content" source="./media/tutorial-service-connector/access-security-settings.png" alt-text="Screenshot of the Azure portal, showing the SQL database link.":::

1. Under **Resource name**, select your connection's **SQL database** hyperlink. This opens your SQL database in the Microsoft Fabric portal.

1. Navigate to the **Security** tab and select **Manage SQL security**.

    :::image type="content" source="./media/tutorial-service-connector/fabric-portal-manage-security.png" alt-text="Screenshot of the Fabric portal, showing the security tab.":::

1. Select the role **db_ddladmin**, then **Manage access**.
1. Under **People, groups or apps in this role**, you should see the name of your managed identity with a service connection to this SQL database in Fabric. Select **Share database**. If you don't see the Share database option, you don't need to continue with the remaining steps.
1. Enter and select the name of your managed identity as it appears on the **Manage access** pane, select the **Read all data using SQL database** checkbox, and finally select **Grant**.

## Clean up resources

When no longer needed, delete the resource group and all related resources created for this tutorial. To do so, select the resource group or the individual resources you created and select **Delete**.

## Related content

- [Connect App Services with Service Connector](/azure/service-connector/quickstart-portal-app-service-connection)
- [Integrate SQL database in Microsoft Fabric with Service Connector](/azure/service-connector/how-to-integrate-fabric-sql)
