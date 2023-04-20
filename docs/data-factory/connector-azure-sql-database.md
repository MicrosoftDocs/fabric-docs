---
title: How to create Azure SQL Database connection
description: This article provides information about how to How to create Azure SQL Database  connection.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/20/2023
ms.custom: template-how-to
---

# How to create Azure SQL Database connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines how to set up connection to [Azure SQL Database](/azure/azure-sql/database/sql-database-paas-overview).

## Supported authentication types

The Azure SQL Database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic | √| √|
|Organizational account| √| √|
|Service Principal|√||

>[!Note]
>For the Azure SQL database connection of Dataflow Gen2, go to [Azure SQL database connector for dataflows](connector-azure-sql-database-dataflow.md).

## Prerequisites

To get started, you must have following prerequisites:

* A tenant account with an active subscription. Create an account for free.

* A workspace is created and that isn’t the default **My Workspace**.

## Go to Manage gateways to create a new connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHoSURBVDhPfVI9SEJRFH5q9idRghhRBoH5hgz62QyKRAqHhiZraqogMBoKgiyQnLK1IYPWFCopIY20JbSWTNOh1xL0clAqK7A0M/ue91kG0ccZzvnud+4959wjyOfzVBEBJuEI3Nw+pJyzWoTD1uNmmcSgadHQciIAfhKs+1F36G5CRyNNragDE2WfIAU/qVOBJzIKCQT+q/jC1jmcp1RGadyGwUFo3Dw7CLIFCQcuYWUv4mfiONaaPYQtRb/ZHbl9xHU2L4NQNDA6ZfMx6ffcqiuKd9UKKf90ERVikWU3nM7m7IGbHlouwIsodETTwp9TlMke9IRicPSdTcuGTkICSEB7wiibPGUSz6/vhIX65S3rWxqEgUTHhIfPy1AWekCLhYLz370SlPLrR1dwhMiurRaTa/4H+/CKF0RhSW/m49M+01cpFoFNPKcPQzFUDx/lYQZadQP8sT6lOxSz7F4KFTIJmq6tLucuoSjLSFdNlbh73gUjIeEhgEzf0SjAgE2OYA9djwmM61Sl4yLAcDa811C7L+6cc1q+afwlfgd/VOjwF0DiUmII/16N1ukdGBkXyNLVKOMf5lYtif9qb5b6mcTsUBuYRccFKgGJnSUa4Nd6I8fmvWbvU1ytmMzaCXqd0Kl+9oWivgAsYHfccfep7QAAAABJRU5ErkJggg==) > **Manage connections and gateways.**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane." lightbox="./media/connector-common/new-connection-pane.png":::

## Set up your connection

### Step 1: Specify the connection name, connection type, account, and domain

:::image type="content" source="./media/connector-azure-sql-database/configure-azure-sql-database-connection-common.png" alt-text="Screenshot showing new connection page.":::

In the **New connection** pane, choose **Cloud**, and specify the following field:
- **Connection name**: Specify a name for your connection. 
- **Connection type**: Select **SQL Server**.
- **Server**: Enter your Azure SQL server name. You can find it in the **Overview** page of your Azure SQL server.
- **Database**: Enter your Azure SQL Database name.

### Step 2: Select and set your authentication

Under **Authentication** method, select your authentication from the drop-down list and complete the related configuration. The Azure SQL Database connector supports the following authentication types.

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

3. [Create contained database users](/azure/azure-sql/database/authentication-aad-configure#create-contained-users-mapped-to-azure-ad-identities) for the service principal. Connect to the database from or to which you want to copy data by using tools like SQL Server Management Studio, with an Azure AD identity that has at least ALTER ANY USER permission. Log in your Azure SQL Database through Active Directory authentication and run the following T-SQL:
  
    ```sql
    CREATE USER [your application name] FROM EXTERNAL PROVIDER;
    ```

4. Grant the service principal needed permissions as you normally do for SQL users or others. Run the following code. For more options, see [ALTER ROLE (Transact-SQL)](/sql/t-sql/statements/alter-role-transact-sql.md).

    ```sql
    ALTER ROLE [role name] ADD MEMBER [your application name];
    ```

5. Configure an Azure SQL Database linked service.


### Step 3: Specify the privacy level that you want to apply

In the **General** tab, select the privacy level that you want apply in **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connector-azure-sql-database/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy and Dataflow Gen2.

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes| |✓/|
|**Connection type**|Select a type for your connection. Select **SQL Server**.|Yes| |✓/|
|**Server**|Azure SQL server name.|Yes||✓/|
|**Database**|Azure SQL Database name.|Yes| |✓/|
|**Authentication**|Go to [Authentication](#authentication) |Yes||Go to [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓/|

### Authentication

The following properties in the table are the supported authentication types.

|Name |Description |Required |Property |Copy/Dataflow Gen2 |
|-----|-----|-----|-----|-----|
|**Basic**||||✓/|
|- Username|The user name of your Azure SQL Database.|Yes |||
|- Password|The password of your Azure SQL Database.|Yes |||
|**OAuth2**||||✓/|
|**Service Principal**||||✓/|
|- Tenant ID|The tenant information (domain name or tenant ID).|Yes |||
|- Service Principal ID|The application's client ID.|Yes |||
|- Service Principal key|The application's key.|Yes |||
|**Organizational account**||||-/|

## Next Steps

[How to configure Azure SQL Database in copy activity](connector-azure-sql-database-copy-activity.md)
