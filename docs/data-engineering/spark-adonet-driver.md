---
title: Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric using the Microsoft ADO.NET Driver for Microsoft Fabric Data Engineering.
ms.reviewer: arali
ms.topic: how-to
ms.date: 09/22/2026
ai-usage: ai-assisted
---

# Microsoft ADO.NET driver for Microsoft Fabric Data Engineering


ADO.NET is a widely adopted data access technology in the .NET ecosystem that enables applications to connect to and work with data from databases and big data platforms.

The Microsoft ADO.NET Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Fabric with the reliability and simplicity of standard ADO.NET patterns. Built on Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your .NET applications using familiar `DbConnection`, `DbCommand`, and `DbDataReader` abstractions.

## Key features

- **ADO.NET APIs**: Familiar `DbConnection`, `DbCommand`, `DbDataReader`, `DbParameter`, and `DbProviderFactory` abstractions for Spark SQL connectivity
- **Microsoft Entra ID Authentication**: Multiple authentication flows including Azure CLI, interactive browser, client credentials, certificate-based, and access token authentication
- **Spark SQL Native Query Support**: Direct execution of Spark SQL statements with parameterized queries
- **Comprehensive Data Type Support**: Support for all Spark SQL data types including complex types (ARRAY, MAP, STRUCT)
- **Connection Pooling**: Built-in connection pool management for improved performance
- **Session Reuse**: Efficient Spark session management to reduce startup latency
- **High-concurrency sessions**: Opt in to shared Fabric Livy capacity with separate REPLs for simultaneously leased HC sessions
- **Async Prefetch**: Background data loading for improved performance with large result sets
- **Auto-reconnect**: Classic-session recovery after connection failures; HC failures are surfaced for application-controlled retry

> [!NOTE]
> In open-source Apache Spark, database and schema are used synonymously. For example, running `SHOW SCHEMAS` or `SHOW DATABASES` in a Fabric notebook returns the same result — a list of all schemas in the lakehouse.

## Prerequisites

Before using the Microsoft ADO.NET Driver for Fabric Data Engineering, ensure you have:

- **.NET Runtime**: .NET 8.0 or later
- **Fabric Access**: Access to a Fabric workspace with Data Engineering capabilities
- **Azure Entra ID Credentials**: Appropriate credentials for authentication
- **Workspace and Lakehouse IDs**: GUID identifiers for your Fabric workspace and lakehouse
- **Azure CLI** (optional): Required for Azure CLI authentication method

## Download, include, reference, and verify

### Download NuGet package

* [Download Microsoft ADO.NET Driver for Fabric Data Engineering (zip)](https://download.microsoft.com/download/201a4cad-3dbf-406f-9547-d0a302610c89/ms-sparksql-adonet-2.0.1.zip)
* [Download Microsoft ADO.NET Driver for Fabric Data Engineering (tar)](https://download.microsoft.com/download/201a4cad-3dbf-406f-9547-d0a302610c89/ms-sparksql-adonet-2.0.1.tar.gz)

> [!IMPORTANT]
> The quoted multi-value `HcConfOverrides` syntax documented in this article requires the 2.0.1 NuGet package or later.

### Reference NuGet package in your project

Include the downloaded NuGet package in your project and add a reference of the package to your project file:

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Spark.Livy.AdoNet" Version="2.0.1" />
</ItemGroup>
```

### Verify installation

After inclusion and reference, verify the package is available in your project:

```csharp
using Microsoft.Spark.Livy.AdoNet;

// Verify the provider is registered
var factory = LivyProviderFactory.Instance;
Console.WriteLine($"Provider: {factory.GetType().Name}");
```

## Quick start example

```csharp
using Microsoft.Spark.Livy.AdoNet;

// Connection string with required parameters
string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
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

## Connection string format

### Basic format

The Microsoft ADO.NET Driver uses standard ADO.NET connection string format:

```
Parameter1=Value1;Parameter2=Value2;...
```

### Required parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `Server` | Microsoft Fabric API endpoint. Specify the host without an API version suffix. | `https://api.fabric.microsoft.com` |
| `SparkServerType` | Server type identifier | `Fabric` |
| `FabricWorkspaceID` | Microsoft Fabric workspace identifier (GUID) | `4bbf89a8-66bb-443f-91af-df31e6a7560b` |
| `FabricLakehouseID` | Microsoft Fabric lakehouse identifier (GUID) | `d8faa650-1343-496b-b9cc-d4168a676f90` |
| `AuthFlow` | Authentication method | `AzureCli`, `BrowserBased`, `ClientSecretCredential`, `ClientCertificateCredential`, `AuthAccessToken`, `FileToken` |

### Optional parameters

#### Connection settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LivyStatementTimeoutSeconds` | Integer | `600` | Time in seconds to wait for statement execution |
| `HttpConnectionTimeoutInSeconds` | Integer | `30` | Time to wait for an HTTP connection and, when the client pool is exhausted, for an eligible pooled connection. |
| `SessionName` | String | (auto) | Custom name for the Spark session |
| `EnvironmentID` | UUID | (none) | Optional Fabric environment identifier for classic and HC sessions. |
| `AutoReconnect` | Boolean | `false` | Enable classic-session recovery. In HC mode, a stale-session failure is returned to the application and isn't transparently replayed. |

#### Connection pool settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ConnectionPoolEnabled` | Boolean | `true` | Enable connection pooling |
| `MinPoolSize` | Integer | `1` | Accepted for compatibility but not currently enforced as a preallocated or maintained pool minimum. |
| `MaxPoolSize` | Integer | `50` | Maximum pooled Livy sessions per pool key. |
| `ValidateConnections` | Boolean | `true` | Validate pooled sessions remotely when they're checked out. |
| `ValidationTimeoutMs` | Integer | `5000` | Maximum validation duration in milliseconds. |

#### High concurrency settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `HcEnabled` | Boolean | `false` | Enable Fabric Livy High Concurrency mode. Requires `SparkServerType=Fabric` and routes session, statement, cancel, and cleanup operations through HC endpoints. |
| `HcSessionTag` | String | (none) | Optional shared-session packing hint. If you omit the value or enter an empty or whitespace-only value, the driver doesn't send a tag. |
| `HcConfOverrides` | String | (none) | Semicolon-delimited allowlisted Spark configuration overrides for HC session creation. Quote the complete value when it contains multiple overrides. |
| `hcAcquireTimeoutSeconds` | Integer | `300` | HC acquire/session-ready timeout in seconds (120..3600). |
| `hcAcquirePollingIntervalMs` | Integer | `1000` | HC acquire polling interval in milliseconds (50..30000 accepted, runtime clamp 100..5000). |
#### Logging settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LogLevel` | String | `Information` | Log level: `Trace`, `Debug`, `Information`, `Warning`, `Error` |
| `LogFilePath` | String | `%LOCALAPPDATA%\FabricSparkAdoNet\Logs` on Windows | Path for file-based logging. |

> **Cross-driver aliases:** The driver accepts JDBC and ODBC property names in addition to native ADO.NET names (e.g., `WorkspaceId` maps to `FabricWorkspaceID`, `LakehouseId` maps to `FabricLakehouseID`). All property names are case-insensitive.

### Example connection strings

#### Basic connection (Azure CLI authentication)

```
Server=https://api.fabric.microsoft.com;SparkServerType=Fabric;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=AzureCli
```

#### High concurrency connection

High concurrency is available for Microsoft Fabric connections. Set `HcEnabled=true`; the standard ADO.NET connection and command APIs remain unchanged. Use the unversioned Fabric API host for `Server`; the driver uses `FabricVersion=v1` and `LivyApiVersion=2023-12-01` by default when it builds the HC endpoint.

```csharp
using Microsoft.Spark.Livy.AdoNet;

string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=AzureCli;" +
    "HcEnabled=true;";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();

using var command = connection.CreateCommand();
command.CommandText = "SELECT 1 AS value";

object? result = await command.ExecuteScalarAsync();
Console.WriteLine($"Result: {result}");
```

For full configuration guidance, see the [High-Concurrency (HC) Mode](#high-concurrency-hc-mode) section.

#### With connection pooling options

```
Server=https://api.fabric.microsoft.com;SparkServerType=Fabric;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=AzureCli;ConnectionPoolEnabled=true;MaxPoolSize=10
```

#### With auto-reconnect and logging

```
Server=https://api.fabric.microsoft.com;SparkServerType=Fabric;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=AzureCli;AutoReconnect=true;LogLevel=Debug
```

## Authentication

The Microsoft ADO.NET Driver supports multiple authentication methods through Microsoft Entra ID (formerly Azure Active Directory). Authentication is configured using the `AuthFlow` parameter in the connection string.

### Authentication methods

| AuthFlow Value | Description | Best For |
|----------------|-------------|----------|
| `AzureCli` | Uses Azure CLI cached credentials | Development and testing |
| `BrowserBased` | Interactive browser-based authentication | User-facing applications |
| `ClientSecretCredential` | Service principal with client secret | Automated services, background jobs |
| `ClientCertificateCredential` | Service principal with certificate | Enterprise applications |
| `AuthAccessToken` | Pre-acquired bearer access token | Custom authentication scenarios |

### Azure CLI authentication

**Best for**: Development and testing

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
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

### Interactive browser authentication

**Best for**: User-facing applications

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
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
    "Server=https://api.fabric.microsoft.com;" +
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

### Certificate-based authentication

**Best for**: Enterprise applications requiring certificate-based authentication

```csharp
string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
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

### Access token authentication

**Best for**: Custom authentication scenarios

```csharp
// Acquire token through your custom mechanism
string accessToken = await AcquireTokenFromCustomSourceAsync();

string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
    "SparkServerType=Fabric;" +
    "FabricWorkspaceID=<workspace-id>;" +
    "FabricLakehouseID=<lakehouse-id>;" +
    "AuthFlow=AuthAccessToken;" +
    $"AuthAccessToken={accessToken};";

using var connection = new LivyConnection(connectionString);
await connection.OpenAsync();
```

## Usage examples

### Basic connection and query

```csharp
using Microsoft.Spark.Livy.AdoNet;

string connectionString =
    "Server=https://api.fabric.microsoft.com;" +
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

### Parameterized queries

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

### ExecuteScalar for single values

```csharp
using var command = connection.CreateCommand();
command.CommandText = "SELECT COUNT(*) FROM customers";

var count = await command.ExecuteScalarAsync();
Console.WriteLine($"Total customers: {count}");
```

### ExecuteNonQuery for DML operations

```csharp
// INSERT
using var insertCommand = connection.CreateCommand();
insertCommand.CommandText = @"
    INSERT INTO employees (id, name, department, salary)
    VALUES (100, 'John Doe', 'Engineering', 85000)";

int rowsAffected = await insertCommand.ExecuteNonQueryAsync();
Console.WriteLine(rowsAffected >= 0
    ? $"Inserted {rowsAffected} row(s)"
    : "The insert completed, but the driver didn't return an update count.");

// UPDATE
using var updateCommand = connection.CreateCommand();
updateCommand.CommandText = "UPDATE employees SET salary = 90000 WHERE id = 100";

rowsAffected = await updateCommand.ExecuteNonQueryAsync();
Console.WriteLine(rowsAffected >= 0
    ? $"Updated {rowsAffected} row(s)"
    : "The update completed, but the driver didn't return an update count.");

// DELETE
using var deleteCommand = connection.CreateCommand();
deleteCommand.CommandText = "DELETE FROM employees WHERE id = 100";

rowsAffected = await deleteCommand.ExecuteNonQueryAsync();
Console.WriteLine(rowsAffected >= 0
    ? $"Deleted {rowsAffected} row(s)"
    : "The delete completed, but the driver didn't return an update count.");
```

### Working with large result sets

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

### Schema discovery

```csharp
// List all tables
using var showTablesCommand = connection.CreateCommand();
showTablesCommand.CommandText = "SHOW TABLES";

using var tablesReader = await showTablesCommand.ExecuteReaderAsync();
Console.WriteLine("Available tables:");
while (await tablesReader.ReadAsync())
{
    int tableNameOrdinal = tablesReader.GetOrdinal("tableName");
    Console.WriteLine($"  {tablesReader.GetString(tableNameOrdinal)}");
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

// Show databases
using var dbCommand = connection.CreateCommand();
dbCommand.CommandText = "SHOW DATABASES";

using var dbReader = await dbCommand.ExecuteReaderAsync();
Console.WriteLine("\nAvailable databases:");
while (await dbReader.ReadAsync())
{
    Console.WriteLine($"  {dbReader.GetString(0)}");
}
```

### Using LivyConnectionStringBuilder

```csharp
using Microsoft.Spark.Livy.AdoNet;

var builder = new LivyConnectionStringBuilder
{
    Server = "https://api.fabric.microsoft.com",
    SparkServerType = "Fabric",
    FabricWorkspaceID = "<workspace-id>",
    FabricLakehouseID = "<lakehouse-id>",
    AuthFlow = "AzureCli",
    ConnectionPoolingEnabled = true,
    MaxPoolSize = 10
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

## High-concurrency (HC) mode

High-concurrency (HC) mode helps .NET applications run concurrent Spark SQL workloads without provisioning a separate classic Spark session for every ADO.NET connection. Fabric can place compatible connections in the same server-managed Livy session while providing each connection with an isolated Read-Eval-Print Loop (REPL) for statement execution.

This model can reduce connection startup time, avoid repeated Spark session provisioning, and use Fabric Spark capacity more efficiently. Your application continues to use standard ADO.NET APIs, including `DbConnection`, `DbCommand`, `DbDataReader`, `OpenAsync`, and `Close`.

HC mode is opt-in. If you don't enable it, the driver uses the classic Livy session path.

### Choose between HC and classic mode

**Use HC mode when:**

- An ASP.NET service handles concurrent requests that open connections and run Spark SQL.
- A worker service, scheduled job, or parallel data pipeline creates bursts of ADO.NET connections.
- Multiple connections target the same Fabric workspace and lakehouse and use compatible Spark configurations.
- Reducing connection startup time and repeated Spark session provisioning is important.
- Your workload can use shared, server-managed Spark capacity while keeping statement execution isolated by REPL.

**Use classic mode when:**

- Your application uses only one or a few long-lived connections.
- Each connection requires a dedicated Spark session for strict workload or resource isolation.
- Connections require substantially different Spark configurations that shouldn't share an underlying session.
- The Fabric Livy endpoint for the target workspace and lakehouse doesn't support HC mode.

### How HC connections work

When your application calls `Open` or `OpenAsync` and no compatible pooled connection is available, the driver:

1. Requests an HC session from Fabric.
1. Waits for the session to become ready, up to the configured acquisition timeout.
1. Connects the ADO.NET connection to the assigned HC session and REPL.
1. Routes commands, queries, cancellation requests, and cleanup operations through the HC endpoints.

Separate simultaneously leased HC sessions use separate REPLs. Commands on one connection share that connection's HC session and REPL.

Client-side pooling is enabled by default. Closing or disposing an eligible connection normally returns its physical HC session and REPL to the process-local pool for reuse; it doesn't necessarily release the assignment remotely. With pooling disabled, closing the physical connection performs HC cleanup. Continue to use `using` statements so logical connections return promptly.

### Enable HC mode

HC mode is opt-in. If you omit **`hcEnabled`** or set it to false, the driver uses the classic Livy session path.

Set property **`hcEnabled`** to true to acquire an HC session:

```ini
hcEnabled=true;
```
> [!IMPORTANT]
> 1. For HC connections, use the unversioned Fabric API host for `Server`. The driver applies the default Fabric and Livy API versions when it builds the HC endpoint.
> 1. Property names aren't case-sensitive.

### Configure session packing

`HcSessionTag` provides a server-side hint for packing compatible HC sessions into an underlying Livy session. A matching tag doesn't guarantee placement in the same underlying session.

If you omit the tag or provide an empty or whitespace-only value, the driver doesn't send it in the acquire request. Omitting the tag doesn't disable HC mode or service-side packing. Set an explicit tag when related application instances or workloads should be considered for shared capacity. Use a stable, non-sensitive operational label, such as `reporting-service` or `nightly-etl`. Don't include secrets, access tokens, personal data, customer identifiers, or query text.

Spark configuration also affects session compatibility. Use `HcConfOverrides` to provide allowlisted Spark settings for HC session creation:

```text
Server=https://api.fabric.microsoft.com;SparkServerType=Fabric;AuthFlow=AzureCli;HcEnabled=true;HcConfOverrides="spark.executor.memory=8g;spark.executor.cores=4";
```

For multiple overrides, quote the entire `HcConfOverrides` value. An unquoted semicolon starts another outer connection-string property; it doesn't extend `HcConfOverrides`. The parser accepts single- or double-quoted values, preserves semicolons and equals signs inside quoted values, and decodes doubled matching quotes (`''` or `""`). Whitespace around property names and at the outer edges of unquoted values is ignored. Whitespace within unquoted values and all whitespace inside quoted values is preserved. Empty values override environment defaults, and the last duplicate property wins.

You can also let `LivyConnectionStringBuilder` handle quoting:

```csharp
var builder = new Microsoft.Spark.Livy.AdoNet.LivyConnectionStringBuilder
{
    Server = "https://api.fabric.microsoft.com",
    SparkServerType = "Fabric",
    FabricWorkspaceID = "<workspace-id>",
    FabricLakehouseID = "<lakehouse-id>",
    AuthFlow = "AzureCli",
    HcEnabled = true,
    HcConfOverrides = "spark.executor.memory=8g;spark.executor.cores=4"
};

string connectionString = builder.ConnectionString;
```

These examples require Microsoft ADO.NET Driver version 2.0.1 or later. Add your workspace and lakehouse identifiers before opening a connection. Both overrides are sent in the HC create-session request as separate `conf` entries. Each override must use one of these case-sensitive keys:

- `spark.sql.shuffle.partitions`
- `spark.executor.memory`
- `spark.executor.cores`
- `spark.driver.memory`
- `spark.sql.ansi.enabled`
- `spark.sql.legacy.timeParserPolicy`
- `spark.sql.session.timeZone`
- `livy.rsc.client.connect.timeout`
- `livy.rsc.server.idle-timeout`

Malformed quotes are rejected without including connection-string contents in the parse error.

Use consistent tags and configuration values across connections that are intended to share capacity. Fabric determines whether a request can use an existing session or requires another session.

### Configure acquisition timing

Use the following settings to control how long the driver waits for an HC session:

| Parameter | Default | Valid input | Behavior |
|-----------|---------|-------------|----------|
| `hcAcquireTimeoutSeconds` | `300` | 120 through 3,600 seconds | Maximum time to wait for the HC session to become ready. |
| `hcAcquirePollingIntervalMs` | `1000` | 50 through 30,000 milliseconds | Interval between status checks. At runtime, the driver clamps the value to 100 through 5,000 milliseconds. |

For most workloads, keep the default values. Increase the acquisition timeout only when capacity startup regularly takes longer than five minutes.

### Use HC mode with connection pooling

HC mode and ADO.NET connection pooling address different layers:

- **HC mode** manages shared Fabric Spark capacity and Livy sessions on the server.
- **ADO.NET connection pooling** reuses driver-managed connection resources in the client application.

You can enable both features. Connection pooling reduces repeated client-side connection setup, while HC mode reduces repeated server-side Spark session provisioning. Size the connection pool for the application's expected concurrency instead of using a large pool to create unnecessary parallel work.

In HC mode, `AutoReconnect=true` doesn't transparently replay a failed command after a stale-session error. The application receives the exception and must decide whether retrying the operation is safe.

### Disable HC mode

To use classic mode for new connections, remove `HcEnabled` from the connection string or set it to `false`:

```ini
HcEnabled=false
```

The change affects new connections and doesn't flush existing pooled HC sessions. Close or dispose of logical connections normally; eligible physical sessions can remain in the client pool until they're retired.

## ADO.NET limitations

- Transactions aren't supported.
- Commands support only text command mode. Stored-procedure and table-direct command modes aren't supported.
- `Prepare` does nothing.
- A command must contain one statement; multi-statement command text is rejected.
- Use separate, simultaneously open connections for concurrent workloads. Commands on one connection share its session and REPL.

## Data type mapping

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
| ARRAY&lt;T&gt; | `string` | Object |
| MAP&lt;K,V&gt; | `string` | Object |
| STRUCT | `string` | Object |

### Working with complex types

The HC result path doesn't reliably serialize native nested ARRAY, MAP, or STRUCT values as JSON. Project complex values to JSON strings in Spark SQL before deserializing them:

```csharp
using System.Text.Json;
using System.Collections.Generic;

using var command = connection.CreateCommand();
command.CommandText = """
    SELECT
        to_json(array_column) AS array_json,
        to_json(map_column) AS map_json,
        to_json(struct_column) AS struct_json
    FROM complex_table
    LIMIT 1
    """;

using var reader = await command.ExecuteReaderAsync();
if (await reader.ReadAsync())
{
    string arrayJson = reader.GetString(0);
    string mapJson = reader.GetString(1);
    string structJson = reader.GetString(2);

    var array = JsonSerializer.Deserialize<int[]>(arrayJson);
    var map = JsonSerializer.Deserialize<Dictionary<string, string>>(mapJson);
}
```

## Troubleshooting

This section provides guidance for resolving common issues you might encounter when using the Microsoft ADO.NET Driver for Fabric Data Engineering.

### Common issues

The following sections describe common problems and their solutions:

#### Connection failures

**Problem**: Can't connect to Fabric

**Solutions**:
1. Verify `FabricWorkspaceID` and `FabricLakehouseID` are correct GUIDs
2. Check Azure CLI authentication: `az account show`
3. Ensure you have appropriate Fabric workspace permissions
4. Verify network connectivity to `api.fabric.microsoft.com`

#### Authentication errors

**Problem**: Authentication fails with Azure CLI

**Solutions**:
- Run `az login` to refresh credentials
- Verify correct tenant: `az account set --subscription <subscription-id>`
- Check token validity: `az account get-access-token --resource https://api.fabric.microsoft.com`

#### Query timeouts

**Problem**: Queries timing out on large tables

**Solutions**:
- Increase statement timeout: `LivyStatementTimeoutSeconds=1200`.  
- Use `LIMIT` clause to restrict result size during development
- Ensure Spark cluster has adequate resources

#### Connection or HC acquisition timeout

**Problem**: A connection times out while waiting for a pooled connection or an HC session

**Solutions**:
- For client-pool wait and HTTP connection establishment, review `HttpConnectionTimeoutInSeconds`.  
- For HC acquisition, increase `hcAcquireTimeoutSeconds` within the supported 120 through 3,600 second range.  
- Check Fabric capacity availability
- Verify workspace hasn't reached session limits

### Enable logging

When troubleshooting issues, detailed logging can help you identify the root cause. Configure logging through the connection string:

To enable detailed logging via connection string:

```
LogLevel=Debug;LogFilePath=<path-to-log-file>
```

If you don't set `LogFilePath` or a global logging configuration, the driver writes logs under `%LOCALAPPDATA%\FabricSparkAdoNet\Logs` on Windows.

Log levels:
- `Trace`: Most verbose, includes all API calls
- `Debug`: Detailed debugging information
- `Information`: General information (default)
- `Warning`: Warnings only
- `Error`: Errors only

## Related content

* [Apache Spark Runtimes in Fabric](./runtime.md)
* [Fabric Runtime 1.3](./runtime-1-3.md)
* [What is the Livy API for Data Engineering](./api-livy-overview.md)
* [Microsoft JDBC Driver for Fabric Data Engineering](./spark-jdbc-driver.md)
* [Microsoft ODBC Driver for Fabric Data Engineering](./spark-odbc-driver.md)
