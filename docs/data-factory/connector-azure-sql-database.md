---
title: How to create Azure SQL Database connection
description: This article provides information about how to How to create Azure SQL Database  connection.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to
---

# How to create an Azure SQL Database connection

This article outlines how to set up connection to [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview).

[!INCLUDE [df-preview-warning](includes/df-preview-warning.md)]

## Supported authentication types

The Azure SQL Database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic | √| √|
|Organizational account| √| √|
|Service Principal|√||

>[!Note]
>For the Azure SQL database connection of Dataflow Gen2, go to [Connect to Azure SQL database connector in dataflows](connector-azure-sql-database-dataflow.md).

## Prerequisites

To get started, you must complete the following prerequisites:

* A tenant account with an active subscription. Create an account for free.

- A workspace is created and that isn’t the default **My Workspace**.

## Go to Manage gateways to create a new connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](./media/connector-common/settings.png) > **Manage connections and gateways.**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page." lightbox="./media/connector-common/add-new-connection.png":::

    The **New connection** pane opens on the left side of the page.

    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up your connection

### Step 1: Specify the connection name, connection type, account, and domain

:::image type="content" source="./media/connector-azure-sql-database/configure-azure-sql-database-connection-common.png" alt-text="Screenshot showing new connection page.":::

In the **New connection** pane, choose **Cloud**, and specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **SQL Server**.
- **Server**: Enter your Azure SQL server name. You can find it in the **Overview** page of your Azure SQL server.
- **Database**: Enter your Azure SQL Database name.

### Step 2: Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. The Azure SQL Database connector supports the following authentication types.

- [Basic](#basic-authentication)
- [OAuth2](#oauth2-authentication)
- [Service Principal](#service-principal-authentication)

:::image type="content" source="./media/connector-azure-sql-database/authentication-method.png" alt-text="Screenshot showing selecting authentication method page.":::

#### Basic authentication

Select **Basic** under **Authentication method**.

:::image type="content" source="./media/connector-azure-sql-database/authentication-basic.png" alt-text="Screenshot showing Basic authentication.":::

- **Username**: Specify the user name of your Azure SQL Database.
- **Password**: Specify the password of your Azure SQL Database.

#### OAuth2 authentication

Open **Edit credentials**. You'll see the sign in interface. Enter your account and password to sign in your account. After signing in, go back to the **New connection** page.

:::image type="content" source="./media/connector-azure-sql-database/authentication-oauth2.png" alt-text="Screenshot showing OAuth2 authentication method.":::

#### Service Principal authentication

:::image type="content" source="./media/connector-azure-sql-database/authentication-service-principal.png" alt-text="Screenshot showing Service Principal authentication method page.":::

- **Tenant Id**: Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering over the upper-right corner of the Azure portal.
- **Service principal ID**: Specify the application's client ID.
- **Service principal key**: Specify your application's key.

To use service principal authentication, follow these steps:

1. [Create an Azure Active Directory application](/azure/active-directory/develop/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal) from the Azure portal. Make note of the application name and the following values that define the linked service:

    - Tenant ID
    - Application ID
    - Application key

2. [Provision an Azure Active Directory administrator](/azure/azure-sql/database/authentication-aad-configure#provision-azure-ad-admin-sql-database) for your server on the Azure portal if you haven't already done so. The Azure AD administrator must be an Azure AD user or Azure AD group, but it can't be a service principal. This step is done so that, in the next step, you can use an Azure AD identity to create a contained database user for the service principal.

3. [Create contained database users](/azure/azure-sql/database/authentication-aad-configure#create-contained-users-mapped-to-azure-ad-identities) for the service principal. Connect to the database from or to which you want to copy data by using tools like SQL Server Management Studio, with an Azure AD identity that has at least ALTER ANY USER permission. Sign in to your Azure SQL Database through Active Directory authentication and run the following T-SQL:
  
    ```sql
    CREATE USER [your application name] FROM EXTERNAL PROVIDER;
    ```

4. Grant the service principal needed permissions as you normally do for SQL users or others. Run the following code. For more options, go to [ALTER ROLE (Transact-SQL)](/sql/t-sql/statements/alter-role-transact-sql.md).

    ```sql
    ALTER ROLE [role name] ADD MEMBER [your application name];
    ```

5. Configure an Azure SQL Database linked service.

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If not correct, the creation fails with errors.

:::image type="content" source="./media/connector-azure-sql-database/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy.

|Name|Description|Required|Property|Copy|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes| |✓|
|**Connection type**|Select a type for your connection. Select **SQL Server**.|Yes| |✓|
|**Server**|Azure SQL server name.|Yes||✓|
|**Database**|Azure SQL Database name.|Yes| |✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓|

### Authentication

The following properties in the table are the supported authentication types.

|Name |Description |Required |Property |Copy |
|-----|-----|-----|-----|-----|
|**Basic**||||✓|
|- Username|The user name of your Azure SQL Database.|Yes |||
|- Password|The password of your Azure SQL Database.|Yes |||
|**OAuth2**||||✓|
|**Service Principal**||||✓|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||

## Next Steps

- [How to configure Azure SQL Database in copy activity](connector-azure-sql-database-copy-activity.md)
- [Connect to an Azure SQL database in dataflows](connector-azure-sql-database-dataflow.md)
