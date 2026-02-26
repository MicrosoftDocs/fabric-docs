---
title: Set up your Oracle database connection
description: This article provides information about how to create an Oracle database connection in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/14/2025
ms.custom:
- template-how-to
- connectors
- sfi-image-nochange
---

# Set up your Oracle database connection

This article outlines the steps to create an Oracle database connection.

## Supported authentication types

The Oracle database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √| √|

## Prerequisites

- Install an on-premises data gateway by following this [guidance](/data-integration/gateway/service-gateway-install?toc=%2Ffabric%2Fdata-factory%2Ftoc.json).  

- To use Oracle database connector, install Oracle Client for Microsoft Tools (OCMT) on the computer running on-premises data gateway. Here are the steps:

    1. Download 64-bit OCMT from the [Oracle Client for Microsoft Tools page](https://www.oracle.com/database/technologies/appdev/ocmt.html).
    1. Open the downloaded .exe to start the installation.
        1. Select **Next** button.

            :::image type="content" source="./media/connector-oracle-database/start-install.png" alt-text="Screenshot showing the install start page.":::

        1. Choose the **Default** Oracle Client setup type.

            :::image type="content" source="./media/connector-oracle-database/setup-type-default.png" alt-text="Screenshot showing the Oracle Client setup type page.":::

        1. Enter the **Destination Folder** where the Oracle Client will be installed on your machine.
        
            :::image type="content" source="./media/connector-oracle-database/choose-destination-location.png" alt-text="Screenshot showing the Choose Destination Location page.":::        

        1. Enter the directory where ODP.NET can find its Oracle Client configuration files.

            :::image type="content" source="./media/connector-oracle-database/oracle-configuration-file-directory.png" alt-text="Screenshot showing the Oracle Configuration File Directory page."::: 

        1. Select **Install** button to proceed.

            :::image type="content" source="./media/connector-oracle-database/click-install.png" alt-text="Screenshot showing the Install page."::: 

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Oracle database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Oracle database prerequisites](/power-query/connectors/oracle-database#prerequisites).
1. Check [Oracle database known issues and limitations](/power-query/connectors/oracle-database#known-issues-and-limitations) to make sure your scenario is supported.
1. [Connect to an Oracle database (from Power Query Online)](/power-query/connectors/oracle-database#connect-to-an-on-premises-oracle-database-from-power-query-online).

## Set up your connection in a pipeline

Browse to the **Connect data source** for the Data Factory pipeline to configure the connection details and create the connection.

:::image type="content" source="./media/connector-oracle-database/oracle-new-connection-page.png" alt-text="Screenshot showing the new connection page.":::

You have two ways to browse to this page:

- In copy assistant, browse to this page after selecting the connector.
- In a pipeline, browse to this page after selecting **More** in Connection section and selecting the connector.

### Step 1: Specify the server, connection, connection name, and data gateway

   :::image type="content" source="media/connector-oracle-database/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **Connect data source** pane, specify the following field:

- **Server**: Specify the location of Oracle database that you want to connect to. You can specify this property in one of the following three ways:
    
    | Way | Example|
    | --- | --- |
    |[Oracle Net Services Name (TNS Alias)](https://docs.oracle.com/en/database/oracle/oracle-database/23/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-12C94B15-2CE1-4B98-9D0C-8226A9DDF4CB)|sales|
    |[Connect Descriptor](https://docs.oracle.com/en/database/oracle/oracle-database/23/netag/identifying-and-accessing-database.html#GUID-8D28E91B-CB72-4DC8-AEFC-F5D583626CF6)|	(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=sales-server)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=sales.us.acme.com)))|
    |[Easy Connect (Plus) Naming](https://download.oracle.com/ocomdocs/global/Oracle-Net-Easy-Connect-Plus.pdf)|salesserver1:1521/sales.us.example.com|

    >[!Note]
    >The Oracle Net Services Name (TNS Alias) is the predefined address name in the *tnsnames.ora* file. So, when using it, the *tnsnames.ora* should be correctly configured and placed in the Oracle Client configuration files' directory specified during the previous [installation of OCMT](#prerequisites). Whereas, when using the Connect Descriptor or the Easy Connect (Plus) Naming, you do not need to configure the *tnsnames.ora* file on your machine.
    
- **Connection**: Select **Create new connection**.
- **Connection name**: Specify a name for your connection.
- **Data gateway**: Select your on-premises data gateway. 

### Step 2:  Select and set your authentication

Under **Authentication kind**, select your authentication kind from the drop-down list and complete the related configuration. The Oracle database connector supports the following authentication type:

- [Basic](#basic-authentication)

#### Basic authentication

- **User name**: Specify your Oracle database username.
- **Password**: Specify your Oracle database password.

:::image type="content" source="media/connector-oracle-database/basic-authentication.png" alt-text="Screenshot showing the access key authentication kind for Amazon S3.":::

### Step 3: Create your connection

Select **Create**. Your creation is successfully tested and saved if all the credentials are correct. If the credentials aren't correct, the creation fails with errors.

## Table summary

The following table contains connector properties that are supported in a pipeline copy.

|Name|Description|Required|Copy|
|:---|:---|:---:|:---|
|**Server**|The Oracle net service name, full connect descriptor or Easy Connect Plus connection string.|Yes|✓|
|**Connection**| Whether to create a new connection or use the existing one.|Yes|✓|
|**Connection name**|A name for your connection.|Yes|✓|
|**Data gateway**|The data gateway used for the connection.|Yes|✓|
|**Authentication**|Go to [Authentication](#authentication) |Yes|Go to [Authentication](#authentication)|

### Authentication

The following table contains properties for the supported authentication type.

|Name|Description|Required|Copy|
|:---|:---|:---:|:---|
|**Basic**|||✓|
|- User name |The Oracle database user name.|Yes ||
|- Password |The Oracle database password.|Yes ||

## Related content

- [Configure in a pipeline copy activity](connector-oracle-database-copy-activity.md)
