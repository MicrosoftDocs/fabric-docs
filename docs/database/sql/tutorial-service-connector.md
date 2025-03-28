---
title: Connect App Service to Azure SQL Database in Fabric
description: Tutorial showing how to connect a web app to Azure SQL Database in Microsoft Fabric using Service Connector
#customer intent: As a web app developer I want to connect an App Service resource to Azure SQL Database in Fabric so that my app can reach the SQL database in Microsoft Fabric.
author: maud-lv
ms.author: malev
ms.service: service-connector
ms.topic: tutorial
ms.date: 03/26/2025
---

# Tutorial: Connect an App Service to SQL Database in Microsoft Fabric using Service Connector

Introduction

> [!div class="checklist"]
> * Create a service connection to SQL Database in Fabric in Azure App Service
> * Share access to SQL database in Fabric

## Prerequisites

* An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/free).
* An app hosted on App Service. If you don't have one yet, [create and deploy an app to App Service](/azure/app-service/quickstart-dotnetcore)
* An Azure SQL Database in Microsoft Fabric. If you don't have one, [create an Azure SQL Database in Fabric](./create.md).

## Create a service connection in App Service

Create a new service connection to Azure SQL Database in Fabric from the App Service resource in the Azure portal.

1. Open your App Service resource in the Azure portal.
1. Select **Settings** > **Service Connector** from the left menu.
2. Select **Create**, and select or enter the following settings in the **Create connection** panel that opens.

    | Setting             | Example           | Description                                                                                                                                               |
    |---------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **Service type**    | *Fabric SQL*      | Target service type. If you don't have an App Configuration store, [create one](../azure-app-configuration/quickstart-azure-app-configuration-create.md). |
    | **Connection name** | *fabricsql_8293d* | The connection name that identifies the connection between your App Service and SQL database. Optionally edit the connection name suggested by default by Service Connector.                                                              |
    | **Workspace**       | *My Workspace*    | The Microsoft Fabric Workspace that contains the SQL database.                                                                                            |
    | **SQL database**    | *my_sql_database* | The target SQL database you want to connect to.                                                                                                           |
    | **Client type**     | *.NET*            | The application's tech stack or library.                                                                                                                  |
        
    :::image type="content" source="./media/tutorial-service-connector/basics-tab.png" alt-text="Screenshot of the Azure portal, showing the Basics tab in the Create connection pane.":::

1. Select **Next: Authentication** and select the system-assigned managed identity authentication option, available through the Azure CLI. User-assigned managed identities are also supported.
1. Select **Next: Networking** > **Review + Create** to review your connection configuration.
1. Check the box stating that you understand that additional manual steps are required to configure this service connection, and select **Create On Cloud Shell**. Alternatively, if you have the [Azure CLI installed](/azure/install-azure-cli-windows), run on your local machine the CLI commands that are now displayed right above the checkbox.
1. Once the command finishes running, close the **Create connection** pane.

## Share access to SQL database in Fabric

In this step, you grant your managed identity access to the database.

1. In the Service Connector menu, select **Refresh** to display your new connection.
1. Under Resource name, click on your connection's **SQL Database** hyperlink. This opens your SQL database in the Microsoft Fabric portal.
    :::image type="content" source="./media/tutorial-service-connector/access-security-settings.png" alt-text="Screenshot of the Azure portal, showing the SQL Database link.":::

1. Navigate to the **Security** tab and select **Manage SQL security**.

    :::image type="content" source="./media/tutorial-service-connector/fabric-portal-manage-security.png" alt-text="Screenshot of the Fabric portal, showing the security tab.":::

1. Select the role **db_ddladmin**, then **Manage access**.
1. Under **People, groups or apps in this role**, you should see the name of your managed identity with a service connection to this SQL database in Fabric. Select **Share database**. If you do not see the Share database option, you do not need to continue with the remaining steps.
1. Enter and select the name of your managed identity as it appears on the Manage access pane, select the **Read all data using SQL database** checkbox, and finally select **Grant**.

## Clean up resources

When no longer needed, delete the resource group and all related resources created for this tutorial. To do so, select the resource group or the individual resources you created and select **Delete**.

## Next step

> [!div class="nextstepaction"]
> [Service Connector internals](./concept-service-connector-internals.md)
