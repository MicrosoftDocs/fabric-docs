---
title: Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric using the Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering.
author: ms-arali
ms.author: arali
ms.reviewer: arali
ms.topic: how-to
ms.date: 03/10/2026
---

# Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

ADO.NET is a widely adopted data access technology in the .NET ecosystem that enables applications to connect to and work with data from databases and big data platforms.

The Microsoft ADO.NET Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Microsoft Fabric with the reliability and simplicity of standard ADO.NET patterns. Built on Microsoft Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your .NET applications using familiar `DbConnection`, `DbCommand`, and `DbDataReader` abstractions.

## Key Features

- **ADO.NET Compliant**: Full implementation of ADO.NET abstractions (`DbConnection`, `DbCommand`, `DbDataReader`, `DbParameter`, `DbProviderFactory`)
- **Microsoft Entra ID Authentication**: Multiple authentication flows including Azure CLI, interactive browser, client credentials, certificate-based, and access token authentication
- **Spark SQL Native Query Support**: Direct execution of Spark SQL statements with parameterized queries
- **Comprehensive Data Type Support**: Support for all Spark SQL data types including complex types (ARRAY, MAP, STRUCT)
- **Connection Pooling**: Built-in connection pool management for improved performance
- **Session Reuse**: Efficient Spark session management to reduce startup latency
- **Async Prefetch**: Background data loading for improved performance with large result sets
- **Auto-Reconnect**: Automatic session recovery after connection failures

> [!NOTE]
> In open-source Apache Spark, database and schema are used synonymously. For example, running `SHOW SCHEMAS` or `SHOW DATABASES` in a Fabric Notebook returns the same result — a list of all schemas in the Lakehouse.

## Prerequisites

Before using the Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering, ensure you have:

- **.NET Runtime**: .NET 8.0 or later
- **Microsoft Fabric Access**: Access to a Microsoft Fabric workspace with Data Engineering capabilities
- **Azure Entra ID Credentials**: Appropriate credentials for authentication
- **Workspace and Lakehouse IDs**: GUID identifiers for your Fabric workspace and lakehouse
- **Azure CLI** (optional): Required for Azure CLI authentication method

## Download, Include, Reference and Verify

### Download NuGet Package

Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering version 1.0.0 is in public preview which you can download from these download center links.

* [Download Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering (zip)](https://download.microsoft.com/download/22fad6c0-9764-458e-913d-678aa8e9b239/ms-sparksql-adonet-1.0.0.zip)
* [Download Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering (tar)](https://download.microsoft.com/download/22fad6c0-9764-458e-913d-678aa8e9b239/ms-sparksql-adonet-1.0.0.tar)

### Reference NuGet package in your project

Include the downloaded NuGet package in your project and add a reference of the package to your project file:

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Spark.Livy.AdoNet" Version="1.0.0" />
</ItemGroup>
```

### Verify Installation

After inclusion and reference, verify the package is available in your project:

```csharp
using Microsoft.Spark.Livy.AdoNet;

// Verify the provider is registered
var factory = LivyProviderFactory.Instance;
Console.WriteLine($"Provider: {factory.GetType().Name}");
```

## Quick Start Example

```csharp
using Microsoft.Spark.Livy.AdoNet;

// Connection string with required parameters
string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=AzureCli;";

// Create and open connection
using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();

Console.WriteLine("Connected successfully!");

// Execute a query
using var command = connection.CreateCommand();
command.CommandText = "SELECT 'Hello from Fabric!' as message";

using var reader = await command.ExecuteReaderAsync();
if (await reader.ReadAsync())
{
    Console.WriteLine(reader.GetString(0));
}
```

## Connection String Format

### Basic Format

The Microsoft ADO.NET Driver uses standard ADO.NET connection string format:

```
Parameter1=Value1;Parameter2=Value2;...
```

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `Server` | Microsoft Fabric API endpoint | `https://api.fabric.microsoft.com/v1` |
| `SparkServerType` | Server type identifier | `Fabric` |
| `FabricWorkspaceID` | Microsoft Fabric workspace identifier (GUID) | `<workspace-id>` |
| `FabricLakehouseID` | Microsoft Fabric lakehouse identifier (GUID) | `<lakehouse-id>` |
| `AuthFlow` | Authentication method | `AzureCli`, `BrowserBased`, `ClientSecretCredential`, `ClientCertificateCredential`, `AuthAccessToken`, `FileToken` |

### Optional Parameters

#### Connection Settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LivySessionTimeoutSeconds` | Integer | `60` | Time in seconds to wait for session creation |
| `LivyStatementTimeoutSeconds` | Integer | `600` | Time in seconds to wait for statement execution |
| `SessionName` | String | (auto) | Custom name for the Spark session |
| `AutoReconnect` | Boolean | `false` | Enable automatic session recovery |

#### Connection Pool Settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ConnectionPoolEnabled` | Boolean | `true` | Enable connection pooling |
| `MinPoolSize` | Integer | `1` | Minimum connections in the pool |
| `MaxPoolSize` | Integer | `20` | Maximum connections in the pool |
| `ConnectionMaxIdleTimeMs` | Integer | `1800000` | Maximum idle time before connection is recycled (30 min) |
| `MaxLifetimeMs` | Integer | `3600000` | Maximum lifetime of a pooled connection (60 min) |
| `ValidateConnections` | Boolean | `true` | Validate connections before use |
| `ValidationTimeoutMs` | Integer | `5000` | Timeout for connection validation |

#### Logging Settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LogLevel` | String | `Information` | Log level: `Trace`, `Debug`, `Information`, `Warning`, `Error` |
| `LogFilePath` | String | (none) | Path for file-based logging |

> **Cross-driver aliases:** The driver accepts JDBC and ODBC property names in addition to native ADO.NET names (e.g., `WorkspaceId` maps to `FabricWorkspaceID`, `LakehouseId` maps to `FabricLakehouseID`). All property names are case-insensitive.

### Example Connection Strings

#### Basic Connection (Azure CLI Authentication)

```
Server=https://api.fabric.microsoft.com/v1;SparkServerType=Fabric;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=AzureCli
```

#### With Connection Pooling Options

```
Server=https://api.fabric.microsoft.com/v1;SparkServerType=Fabric;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=AzureCli;ConnectionPoolEnabled=true;MinPoolSize=2;MaxPoolSize=10
```

#### With Auto-Reconnect and Logging

```
Server=https://api.fabric.microsoft.com/v1;SparkServerType=Fabric;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=AzureCli;AutoReconnect=true;LogLevel=Debug
```

## Authentication

The Microsoft ADO.NET Driver supports multiple authentication methods through Microsoft Entra ID (formerly Azure Active Directory). Authentication is configured using the `AuthFlow` parameter in the connection string.

### Authentication Methods

| AuthFlow Value | Description | Best For |
|----------------|-------------|----------|
| `AzureCli` | Uses Azure CLI cached credentials | Development and testing |
| `BrowserBased` | Interactive browser-based authentication | User-facing applications |
| `ClientSecretCredential` | Service principal with client secret | Automated services, background jobs |
| `ClientCertificateCredential` | Service principal with certificate | Enterprise applications |
| `AuthAccessToken` | Pre-acquired bearer access token | Custom authentication scenarios |

### Azure CLI Authentication

**Best for**: Development and testing

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=AzureCli;";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();
```

**Prerequisites**:
- Azure CLI installed: `az --version`
- Logged in: `az login`

### Interactive Browser Authentication

**Best for**: User-facing applications

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=BrowserBased;" +
    "AuthTenantID=<tenant-id>;";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync(); // Opens browser for authentication
```

**Behavior**:
- Opens a browser window for user authentication
- Credentials are cached for subsequent connections

### Client Credentials (Service Principal) Authentication

**Best for**: Automated services and background jobs

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=ClientSecretCredential;" +
    "AuthTenantID=<tenant-id>;" +
    "AuthClientID=<client-id>;" +
    "AuthClientSecret=<client-secret>;";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();
```

**Required Parameters**:
- `AuthTenantID`: Azure tenant ID
- `AuthClientID`: Application (client) ID from Microsoft Entra ID
- `AuthClientSecret`: Client secret from Microsoft Entra ID

### Certificate-Based Authentication

**Best for**: Enterprise applications requiring certificate-based authentication

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=ClientCertificateCredential;" +
    "AuthTenantID=<tenant-id>;" +
    "AuthClientID=<client-id>;" +
    "AuthCertificatePath=C:\\certs\\mycert.pfx;" +
    "AuthCertificatePassword=<password>;";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();
```

**Required Parameters**:
- `AuthTenantID`: Azure tenant ID
- `AuthClientID`: Application (client) ID
- `AuthCertificatePath`: Path to PFX/PKCS12 certificate file
- `AuthCertificatePassword`: Certificate password

### Access Token Authentication

**Best for**: Custom authentication scenarios

```csharp
// Acquire token through your custom mechanism
string accessToken = await AcquireTokenFromCustomSourceAsync();

string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=AuthAccessToken;" +
    $"AuthAccessToken={accessToken};";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();
```

> [!NOTE]
> We strongly recommend avoiding hard‑coding credentials such as passwords, keys, secrets, tokens, or certificates in your code. Instead, use Azure Key Vault to securely store these values and retrieve them at runtime.

## Usage Examples

### Basic Connection and Query

```csharp
using Microsoft.Spark.Livy.AdoNet;

string connectionString =
    "Server=https://api.fabric.microsoft.com/v1;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=AzureCli;";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();

Console.WriteLine($"Connected! Server version: {connection.ServerVersion}");

// Execute a query
using var command = connection.CreateCommand();
command.CommandText = "SELECT * FROM employees LIMIT 10";

using var reader = await command.ExecuteReaderAsync();

// Print column names
for (int i = 0; i < reader.FieldCount; i++)
{
    Console.Write($"{reader.GetName(i)}\t");
}
Console.WriteLine();

// Print rows
while (await reader.ReadAsync())
{
    for (int i = 0; i < reader.FieldCount; i++)
    {
        Console.Write($"{reader.GetValue(i)}\t");
    }
    Console.WriteLine();
}
```

### Parameterized Queries

```csharp
using var command = connection.CreateCommand();
command.CommandText = "SELECT * FROM orders WHERE order_date >= @startDate AND status = @status";

// Add parameters
command.Parameters.AddWithValue("@startDate", new DateTime(2024, 1, 1));
command.Parameters.AddWithValue("@status", "completed");

using var reader = await command.ExecuteReaderAsync();
while (await reader.ReadAsync())
{
    Console.WriteLine($"Order: {reader["order_id"]}, Total: {reader["total"]:C}");
}
```

### ExecuteScalar for Single Values

```csharp
using var command = connection.CreateCommand();
command.CommandText = "SELECT COUNT(*) FROM customers";

var count = await command.ExecuteScalarAsync();
Console.WriteLine($"Total customers: {count}");
```

### ExecuteNonQuery for DML Operations

```csharp
// INSERT
using var insertCommand = connection.CreateCommand();
insertCommand.CommandText = @"
    INSERT INTO employees (id, name, department, salary)
    VALUES (100, 'John Doe', 'Engineering', 85000)";

int rowsAffected = await insertCommand.ExecuteNonQueryAsync();
Console.WriteLine($"Inserted {rowsAffected} row(s)");

// UPDATE
using var updateCommand = connection.CreateCommand();
updateCommand.CommandText = "UPDATE employees SET salary = 90000 WHERE id = 100";

rowsAffected = await updateCommand.ExecuteNonQueryAsync();
Console.WriteLine($"Updated {rowsAffected} row(s)");

// DELETE
using var deleteCommand = connection.CreateCommand();
deleteCommand.CommandText = "DELETE FROM employees WHERE id = 100";

rowsAffected = await deleteCommand.ExecuteNonQueryAsync();
Console.WriteLine($"Deleted {rowsAffected} row(s)");
```

### Working with Large Result Sets

```csharp
using var command = connection.CreateCommand();
command.CommandText = "SELECT * FROM large_table";

using var reader = await command.ExecuteReaderAsync();

int rowCount = 0;
while (await reader.ReadAsync())
{
    // Process each row
    ProcessRow(reader);
    rowCount++;

    if (rowCount % 10000 == 0)
    {
        Console.WriteLine($"Processed {rowCount} rows...");
    }
}

Console.WriteLine($"Total rows processed: {rowCount}");
```

### Schema Discovery

```csharp
// List all tables
using var showTablesCommand = connection.CreateCommand();
showTablesCommand.CommandText = "SHOW TABLES";

using var tablesReader = await showTablesCommand.ExecuteReaderAsync();
Console.WriteLine("Available tables:");
while (await tablesReader.ReadAsync())
{
    Console.WriteLine($"  {tablesReader.GetString(0)}");
}

// Describe table structure
using var describeCommand = connection.CreateCommand();
describeCommand.CommandText = "DESCRIBE employees";

using var schemaReader = await describeCommand.ExecuteReaderAsync();
Console.WriteLine("\nTable structure for 'employees':");
while (await schemaReader.ReadAsync())
{
    Console.WriteLine($"  {schemaReader["col_name"]}: {schemaReader["data_type"]}");
}

```

### Using LivyConnectionStringBuilder

```csharp
using Microsoft.Spark.Livy.AdoNet;

var builder = new LivyConnectionStringBuilder
{
    Server = "https://api.fabric.microsoft.com/v1",
    SparkServerType = "Fabric",
    FabricWorkspaceID = "<workspace-id>",
    FabricLakehouseID = "<lakehouse-id>",
    AuthFlow = "AzureCli",
    ConnectionPoolingEnabled = true,
    MinPoolSize = 2,
    MaxPoolSize = 10,
    ConnectionTimeout = 60
};

using var connection = new LivyConnection(builder.ConnectionString);
await connection.OpenAsync();
```

### Using DbProviderFactory

```csharp
using System.Data.Common;
using Microsoft.Spark.Livy.AdoNet;

// Register the provider factory (typically done at application startup)
DbProviderFactories.RegisterFactory("Microsoft.Spark.Livy.AdoNet", LivyProviderFactory.Instance);

// Create connection using factory
var factory = DbProviderFactories.GetFactory("Microsoft.Spark.Livy.AdoNet");

using var connection = factory.CreateConnection();
connection.ConnectionString = connectionString;

await connection.OpenAsync();

using var command = factory.CreateCommand();
command.Connection = connection;
command.CommandText = "SELECT * FROM employees LIMIT 5";

using var reader = await command.ExecuteReaderAsync();
// Process results...
```

## Data Type Mapping

The driver maps Spark SQL data types to .NET types:

| Spark SQL Type | .NET Type | DbType |
|----------------|-----------|--------|
| BOOLEAN | `bool` | Boolean |
| TINYINT | `sbyte` | SByte |
| SMALLINT | `short` | Int16 |
| INT | `int` | Int32 |
| BIGINT | `long` | Int64 |
| FLOAT | `float` | Single |
| DOUBLE | `double` | Double |
| DECIMAL(p,s) | `decimal` | Decimal |
| STRING | `string` | String |
| VARCHAR(n) | `string` | String |
| CHAR(n) | `string` | String |
| BINARY | `byte[]` | Binary |
| DATE | `DateTime` | Date |
| TIMESTAMP | `DateTime` | DateTime |
| ARRAY&lt;T&gt; | `T[]` or `string` (JSON) | Object |
| MAP&lt;K,V&gt; | `Dictionary<K,V>` or `string` (JSON) | Object |
| STRUCT | `object` or `string` (JSON) | Object |

### Working with Complex Types

Complex types (ARRAY, MAP, STRUCT) are returned as JSON strings by default:

```csharp
using System.Text.Json;
using System.Collections.Generic;

using var command = connection.CreateCommand();
command.CommandText = "SELECT array_column, map_column, struct_column FROM complex_table LIMIT 1";

using var reader = await command.ExecuteReaderAsync();
if (await reader.ReadAsync())
{
    // Complex types returned as JSON strings
    string arrayJson = reader.GetString(0);  // e.g., "[1, 2, 3]"
    string mapJson = reader.GetString(1);    // e.g., "{\"key\": \"value\"}"
    string structJson = reader.GetString(2); // e.g., "{\"field1\": 1, \"field2\": \"text\"}"

    // Parse with System.Text.Json
    var array = JsonSerializer.Deserialize<int[]>(arrayJson);
    var map = JsonSerializer.Deserialize<Dictionary<string, string>>(mapJson);
}
```

## Troubleshooting

### Common Issues

#### Connection Failures

**Problem**: Cannot connect to Microsoft Fabric

**Solutions**:
1. Verify `FabricWorkspaceID` and `FabricLakehouseID` are correct GUIDs
2. Check Azure CLI authentication: `az account show`
3. Ensure you have appropriate Fabric workspace permissions
4. Verify network connectivity to `api.fabric.microsoft.com`

#### Authentication Errors

**Problem**: Authentication fails with Azure CLI

**Solutions**:
1. Run `az login` to refresh credentials
2. Verify correct tenant: `az account set --subscription <subscription-id>`
3. Check token validity: `az account get-access-token --resource https://api.fabric.microsoft.com`

#### Query Timeouts

**Problem**: Queries timing out on large tables

**Solutions**:
1. Increase statement timeout: `LivyStatementTimeoutSeconds=300`
2. Use `LIMIT` clause to restrict result size during development
3. Ensure Spark cluster has adequate resources

#### Session Creation Timeout

**Problem**: Connection times out during session creation

**Solutions**:
1. Increase session timeout: `LivySessionTimeoutSeconds=120`
2. Check Fabric capacity availability
3. Verify workspace hasn't reached session limits

### Enable Logging

For troubleshooting, enable detailed logging via connection string:

```
LogLevel=Debug
```

Or configure programmatically:

```csharp
using Microsoft.Extensions.Logging;

var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.AddConsole();
    builder.SetMinimumLevel(LogLevel.Debug);
});

// Logging is automatically integrated with the connection
```

Log levels:
- `Trace`: Most verbose, includes all API calls
- `Debug`: Detailed debugging information
- `Information`: General information (default)
- `Warning`: Warnings only
- `Error`: Errors only

## Related Content

* [Apache Spark Runtimes in Fabric](./runtime.md)
* [Fabric Runtime 1.3](./runtime-1-3.md)
* [What is the Livy API for Data Engineering](./api-livy-overview.md)
* [Microsoft JDBC Driver for Microsoft Fabric Data Engineering](./spark-jdbc-driver.md)
* [Microsoft ODBC Driver for Microsoft Fabric Data Engineering](./spark-odbc-driver.md)
