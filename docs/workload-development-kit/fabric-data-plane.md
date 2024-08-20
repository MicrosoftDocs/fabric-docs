---
title: Work with customer data in Microsoft Fabric (preview)
description: Learn about how to work with customer data in Microsoft Fabric.
author: KesemSharabi
ms.author: kesharab
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

### API permissions

Some methods of accessing customer data require the use of other services outside of Fabric such as Azure Storage or Azure SQL Database. For example, in the Microsoft Fabric Developer kit sample, the API permission Azure Storage `user_impersonation` is used in conjunction with the Power BI service *Lakehouse.Read.All* permission to access data from Lakehouses.

You can use Azure SQL Database to access table data from Warehouse items. In this case, configure your app with Azure SQL Database `user_impersonation` to query the database on behalf of the user and Power BI service Warehouse.Read.All to query the Fabric REST API Get Warehouse endpoint.

Make sure that you configure your Microsoft Entra ID app according to your development needs.

### Authentication 

Before you can begin using the Fabric REST APIs or other services, such as Azure Storage and Azure SQL Database, on behalf of the user, you need to authenticate using a token. This token can be obtained through a token exchange process.

The Fabric Workload Development Kit SDK provides a method for acquiring an access token in the workload front end. For example, see [Sample Workload Controller](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Frontend/src/controller/SampleWorkloadController.ts).

 This client token must be passed to the workload back end and exchanged by using the on-behalf-of flow for a token with the necessary scopes to access the resources you need, such as OneLake. For example, to access and read from a Lakehouse, a user must authorize the application to make API calls on their behalf by using the Azure Storage `user_impersonation` permission. Then, in the back end, the access token must be obtained with the delegated scope `https://storage.azure.com/user_impersonation` to use Azure Storage.

If you decide to use SQL to access your customer data, the access token must be obtained with the scope `https://database.windows.net//user_impersonation` to use Azure SQL Database and the Microsoft.Data.SqlClient namespace. The access token must be used as written, with two forward slashes before `user_impersonation`, to be validated by the SQLConnection class.
For more examples of token authentication, see the Microsoft Fabric Developer kit sample.

More details on how to obtain a token can be found in the [Microsoft Fabric Workload Development REST API documentation](https://go.microsoft.com/fwlink/?linkid=2271986).

### Read metadata

Fabric REST APIs provide a way to access item properties. For example, querying the [Get Lakehouse API](/rest/api/fabric/lakehouse/items/get-lakehouse) provides you with the metadata for a certain Lakehouse, including useful properties such as OneLake paths and the SQL connection string.
Another useful endpoint is the [Get Warehouse API](/rest/api/fabric/warehouse/items/get-warehouse), which returns the following information:

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

Here, the "ConnectionInfo" property is the Fully Qualified Domain Name (FQDN) of the Warehouse SQL Server. With this FQDN, you can establish an SQL connection. For more information, see [Connectivity to Data Warehousing in Microsoft Fabric](../data-warehouse/connectivity.md).
For implementation examples, see the [Microsoft Fabric Workload Development Kit](./index.yml).

### Reading data

Once you authenticate, you can connect to OneLake using [Azure Data Lake Storage REST APIs](/rest/api/storageservices/data-lake-storage-gen2) to read different types of data. We recommend utilizing the [Delta Lake protocol](https://github.com/delta-io/delta/blob/master/PROTOCOL.md) in order to read tables.

Alternatively, if you choose to utilize Azure SQL Database, you can implement the following procedure to read data from a Warehouse.

1. Create an authorization context. For an example of creating an authorization context, see the [AuthenticateDataPlaneCall method](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthenticationService.cs).
1. Acquire a token with the *Warehouse.Read.All* scope on behalf of the user using the bearer token passed from the front end.
1. Use the *Fabric* token to call the [Get Warehouse API](/rest/api/fabric/warehouse/items/get-warehouse). It's required to access the Connection info and the display name of the Warehouse, which is the initial catalog of the server.
1. Acquire a token with SQL scopes on behalf of the user. To successfully establish an SQL connection, use the scope `https://database.windows.net//user_impersonation`.
1. Use the SQL token and connection information to open an SQL connection:

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

1. This connection can now be queried to access data from the Warehouse. For more information on utilizing the *Microsoft.Data.SqlClient* namespace, see [Microsoft.Data.SqlClient Namespace Documentation](/dotnet/api/microsoft.data.sqlclient).

### Writing data 

In addition to reading data using the token, you can also use ADLS APIs to write data into tables as described by the [Delta Lake protocol](https://github.com/delta-io/delta/blob/master/PROTOCOL.md).

You can also use the APIs to create files and directories.

Alternatively, you can use other Fabric workloads to write data to the platform. For example, you can use Fabric's Lakehouse workload API to efficiently [load common file types to an optimized Delta table](../data-engineering/load-to-tables.md). This is done by sending a POST request to the [Tables - Load Table API endpoint](/rest/api/fabric/lakehouse/tables/load-table).

The SQL connection can also be used to carry out commands that insert data into tables.

## Related content

* [Microsoft Fabric Workload Development Kit](./index.yml)