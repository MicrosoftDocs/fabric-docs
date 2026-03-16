---
title: Set up your Azure SQL Database connection
description: This article provides information about how to set up an Azure SQL Database connection.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 10/31/2025
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your Azure SQL Database connection

This article outlines how to set up a connection to [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview) for pipelines and Dataflow Gen2 in Microsoft Fabric.

## Supported authentication types

The Azure SQL Database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic | √| √|
|Organizational account| √| √|
|Service Principal|√||

## Set up your connection for Dataflow Gen2

You can connect Dataflow Gen2 to Azure SQL database from Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Set up any Azure SQL Database prerequisites](/power-query/connectors/azure-sql-database#prerequisites) before connecting to the Azure SQL Database connector.
1. [Connect to Azure SQL database](/power-query/connectors/azure-sql-database#connect-to-azure-sql-database-from-power-query-online).

### Learn more about this connector

- [Supported capabilities](/power-query/connectors/azure-sql-database#capabilities-supported)
- [Connect using advanced options](/power-query/connectors/azure-sql-database#connect-using-advanced-options)
- [Troubleshooting](/power-query/connectors/azure-sql-database#troubleshooting)

## Set up your connection for a pipeline

The following table contains a summary of the properties needed for a pipeline connection:

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes| |✓|
|**Connection type**|Select a type for your connection. Select **SQL Server**.|Yes| |✓|
|**Server**|Azure SQL server name.|Yes||✓|
|**Database**|Azure SQL Database name.|Yes| |✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓|

For specific instructions to set up your connection in a pipeline, follow these steps:

1. From the page header in the Data Factory service, select **Settings** :::image type="icon" source="./media/connector-common/settings.png"::: > **Manage connections and gateways.**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage connections and gateways.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane opens on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up your connection

1. In the **New connection** pane, choose **Cloud**, and specify the following fields:

    - **Connection name**: Specify a name for your connection.
    - **Connection type**: Select **SQL Server**.
    - **Server**: Enter your Azure SQL server name. You can find it in the **Overview** page of your Azure SQL server.
    - **Database**: Enter your Azure SQL Database name.

    :::image type="content" source="./media/connector-azure-sql-database/configure-azure-sql-database-connection-common.png" alt-text="Screenshot showing new connection page.":::

1. Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The Azure SQL Database connector supports the following authentication types.

    - [Basic](#basic-authentication)
    - [OAuth2](#oauth2-authentication)
    - [Service Principal](#service-principal-authentication)

    :::image type="content" source="./media/connector-azure-sql-database/authentication-method.png" alt-text="Screenshot showing selecting authentication method page.":::

1. Optionally, set the privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, and **Public**. For more information, see [privacy levels in the Power Query documentation](/power-query/privacy-levels).

1. Select **Create** to create your connection. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

    :::image type="content" source="./media/connector-azure-sql-database/connection.png" alt-text="Screenshot showing connection page.":::

## Authentication

The Azure SQL Database connector supports the following authentication types:

|Name |Description |Required |Property |Copy |
|-----|-----|-----|-----|-----|
|[Basic](#basic-authentication)||||✓|
|- Username|The user name of your Azure SQL Database.|Yes |||
|- Password|The password of your Azure SQL Database.|Yes |||
|[OAuth2](#oauth2-authentication)||||✓|
|[Service Principal](#service-principal-authentication)||||✓|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||

### Basic authentication

Select **Basic** under **Authentication method**.

:::image type="content" source="./media/connector-azure-sql-database/authentication-basic.png" alt-text="Screenshot showing Basic authentication.":::

- **Username**: Specify the user name of your Azure SQL Database.
- **Password**: Specify the password of your Azure SQL Database.

### OAuth2 authentication

Open **Edit credentials**. You notice the sign in interface. Enter your account and password to sign in your account. After signing in, go back to the **New connection** page.

:::image type="content" source="./media/connector-azure-sql-database/authentication-oauth2.png" alt-text="Screenshot showing OAuth2 authentication method.":::

### Service Principal authentication

:::image type="content" source="./media/connector-azure-sql-database/authentication-service-principal.png" alt-text="Screenshot showing Service Principal authentication method page.":::

- **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
- **Service principal ID**: Specify the application's client ID.
- **Service principal key**: Specify your application's key.

To use service principal authentication, follow these steps:

1. [Create a Microsoft Entra application](/entra/identity-platform/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal) from the Azure portal. Make note of the application name and the following values that define the connection:

    - Tenant ID
    - Application ID
    - Application key

1. [Provision a Microsoft Entra administrator](/azure/azure-sql/database/authentication-aad-configure#provision-azure-ad-admin-sql-database) for your server on the Azure portal if you haven't already done so. The Microsoft Entra administrator must be a Microsoft Entra user or Microsoft Entra group, but it can't be a service principal. This step is done so that, in the next step, you can use a Microsoft Entra identity to create a contained database user for the service principal.

1. [Create contained database users](/azure/azure-sql/database/authentication-aad-configure#create-contained-users-mapped-to-azure-ad-identities) for the service principal. Connect to the database from or to which you want to copy data by using tools like SQL Server Management Studio, with a Microsoft Entra identity that has at least ALTER ANY USER permission. Sign in to your Azure SQL Database through Microsoft Entra ID authentication and run the following T-SQL:
  
    ```sql
    CREATE USER [your application name] FROM EXTERNAL PROVIDER;
    ```

1. Grant the service principal needed permissions as you normally do for SQL users or others. Run the following code. For more options, go to [ALTER ROLE (Transact-SQL)](/sql/t-sql/statements/alter-role-transact-sql).

    ```sql
    ALTER ROLE [role name] ADD MEMBER [your application name];
    ```

1. Configure an Azure SQL Database connection.

## Related content

- [Configure Azure SQL Database in a copy activity](connector-azure-sql-database-copy-activity.md)
