---
title: Work with customer data in Microsoft Fabric (preview)
description: Learn about how to work with customer data in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: concept-article
ms.custom:
ms.date: 05/21/2024
#customer intent:
---

# Work with customer data in Fabric (preview)

[Microsoft Fabric OneLake](../onelake/index.yml) is a unified, logical data lake for the entire organization, designed to be the single place for all analytics data. It comes automatically with every Microsoft Fabric tenant and is built on top of Azure Data Lake Storage (ADLS) Gen2. OneLake supports any type of file, structured or unstructured, and stores all tabular data in Delta Parquet format. It allows for collaboration across different business groups by providing a single data lake that is governed by default with distributed ownership for collaboration within a tenant's boundaries. Workspaces within a tenant enable different parts of the organization to distribute ownership and access policies, and all data in OneLake can be accessed through data items such as [Lakehouses and Warehouses](../data-warehouse/data-warehousing.md).

In terms of data stores, OneLake serves as the common storage location for ingestion, transformation, real-time insights, and Business Intelligence visualizations. It centralizes the different Fabric services and is the storage for data items consumed by all workloads in Fabric.

## How to read and write data in Microsoft Fabric 

Microsoft Fabric is a platform that enables the storage and management of customer data. In order to read and write data in Fabric, you need to use the [Fabric REST APIs](/rest/api/fabric/articles/) and the appropriate authentication methods.

### API Permissions

Some methods of accessing customer data require the use of other services outside of Fabric such as Azure Storage or Azure SQL Database. For example, in the Microsoft Fabric Developer kit sample, the API permission Azure Storage user_impersonation is used in conjunction with the PowerBI Service Lakehouse.Read.All permission in order to access data from Lakehouses.

You may choose to use Azure SQL Database in order to access table data from Warehouse items. In this case you would configure your app with Azure SQL Database user_impersonation in order to query the database on behalf of the user and PowerBI Service Warehouse.Read.All in order to query the Fabric REST API Get Warehouse endpoint.

Make sure you configure your Microsoft Entra ID app according to your development needs.

### Authentication 

Before you can begin using the Fabric REST APIs or other services, you need to authenticate using a token. This token can be obtained through a token exchange process.

The Fabric Workload Development Kit SDK provides a method for acquiring an access token in the workload frontend. An example of usage can be found in the frontend [Sample Workload Controller](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Frontend/src/controller/SampleWorkloadController.ts).

 This client token must be passed to the workload backend and exchanged using the on-behalf-of flow for a token with the necessary scopes to access your desired resource, such as OneLake. For example, in order to access and read from a Lakehouse, a user must authorize the application to make API calls on their behalf using the Azure Storage user_impersonation permission. Then, in the backend, the access token must be obtained with the delegated scope `https://storage.azure.com/user_impersonation` in order to use Azure Storage.

If you decide to use SQL to access your customer data, the access token must be obtained with the scope `https://database.windows.net//user_impersonation` in order to use Azure SQL Database and the Microsoft.Data.SqlClient namespace. The access token can be obtained without the extra forward slash in the scope from Azure SQL Database, *however* the access token won't be validated by the SQLConnection class, and so we recommend using the scope as written here.
For more examples of token authentication, refer to the Microsoft Fabric Developer kit sample.

More details on how to obtain a token can be found in the [Microsoft Fabric Workload Development REST API documentation](https://go.microsoft.com/fwlink/?linkid=2271986).

### Read Metadata

Fabric REST APIs also provide you with a way to access the different properties of items. For example, querying the [Get Lakehouse API](/rest/api/fabric/lakehouse/items/get-lakehouse?tabs=HTTP) provides you with the metadata for a certain Lakehouse, including useful properties such as OneLake paths and the SQL connection string.
Another useful endpoint is the [Get Warehouse API](https://learn.microsoft.com/rest/api/fabric/warehouse/items/get-warehouse?tabs=HTTP), which returns the following information:

```
    {
        Id: Guid
        Type: string
        DisplayName: string
        Description: string
        WorkspaceId: Guid
        Properties {
            ConnectionInfo: string
            CreatedDate: DateTime
            LastUpdatedTime: DateTime
        }
    }
```

Here, the "ConnectionInfo" property is the FQDN (Fully Qualified Domain Name) of the Warehouse SQL Server. With this FQDN, we'll be able to establish a SQL connection. For more information, see [Connectivity to Data Warehousing in Microsoft Fabric](https://learn.microsoft.com/fabric/data-warehouse/connectivity).
For implementation examples, refer to the [Microsoft Fabric Workload Development Kit](./index.yml).

### Reading data

Once you authenticate, you can connect to OneLake using [Azure Data Lake Storage REST APIs](/rest/api/storageservices/data-lake-storage-gen2) to read different types of data. We recommend utilizing the [Delta Lake protocol](https://github.com/delta-io/delta/blob/master/PROTOCOL.md) in order to read tables.

Alternatively, if you choose to utilize Azure SQL Database you can implement the following instructions in order to read data from a Warehouse.

1. Create an authorization context. For an example of creating an authorization context, see the [AuthenticateDataPlaneCall method](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthenticationService.cs).
1. Acquire a token with the Warehouse.Read.All scope on behalf of the user using the bearer token passed from the Frontend.
1. Using the "Fabric" token, call the "Get Warehouse" API that was previously referenced.
    -This is required in order to access the Connection info and the display name of the Warehouse, which is the initial catalog of the server.
1. Acquire a token with SQL scopes on behalf of the user. Again, in order to successfully establish a SQLConnection, you must use the scope https://database.windows.net//user_impersonation.
1. Use the SQL token and connection information to open a SQL Connection:

    ```csharp
    private SqlConnection GetSqlConnection(string token, string databaseFqdn, string initialCatalog)
            {
                var builder = new SqlConnectionStringBuilder();
                builder.DataSource = databaseFqdn; // ConnectionInfo from Get Warehouse API
                builder.InitialCatalog = initialCatalog; //display name of the Warehouse
                builder.ConnectTimeout = 120;
    
                var connection = new SqlConnection();
                connection.AccessToken = token; // SQL token acquired with the Azure SQL Database user_impersonation scope
                connection.ConnectionString = builder.ConnectionString;
                connection.Open();
                return connection;
            }
    ```

1. This connection can now be queried in order to access data from the Warehouse. For more information on utilizing the Microsoft.Data.SqlClient namespace, reference the[Microsoft.Data.SqlClient Namespace Documentation](https://learn.microsoft.com/dotnet/api/microsoft.data.sqlclient)

### Writing data 

In addition to reading data using the token, you can also use ADLS APIs to write data into tables as described by the [Delta Lake protocol](https://github.com/delta-io/delta/blob/master/PROTOCOL.md).

You can also use the APIs to create files and directories.

Alternatively, you can use other Fabric workloads to write data to the platform. For example, you can use Fabric's Lakehouse workload API to efficiently [load common file types to an optimized Delta table](../data-engineering/load-to-tables.md). This is done by sending a [POST or PUT request](/rest/api/fabric/lakehouse/tables/load-table?tabs=HTTP) to the appropriate API endpoint. For detailed information on how to load data to table using the Lakehouse, you can refer to the Fabric API reference.

The SQL Connection previously described can also be used to carry out commands that insert data into tables.

## Related content

* [Microsoft Fabric Workload Development Kit](./index.yml)