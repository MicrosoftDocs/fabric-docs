---
title: Microsoft ODBC Driver for Microsoft Fabric Data Engineering
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering.
author: ms-arali
ms.reviewer: arali
ms.topic: how-to
ms.date: 03/18/2026
ai-usage: ai-assisted
---

# Microsoft ODBC driver for Microsoft Fabric Data Engineering (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

ODBC (Open Database Connectivity) is a widely adopted standard that enables client applications to connect to and work with data from databases and big data platforms.

The Microsoft ODBC Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Microsoft Fabric with the reliability and simplicity of the ODBC standard. Built on Microsoft Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your .NET, Python, and other ODBC-compatible applications and BI tools.

## Key features

- **ODBC 3.x Compliant**: Full implementation of ODBC 3.x specification
- **Microsoft Entra ID Authentication**: Multiple authentication flows including Azure CLI, interactive, client credentials, certificate-based, and access token authentication
- **Spark SQL Query Support**: Direct execution of Spark SQL statements
- **Comprehensive Data Type Support**: Support for all Spark SQL data types including complex types (ARRAY, MAP, STRUCT)
- **Session Reuse**: Built-in session management for improved performance
- **Large Table Support**: Optimized handling for large result sets with configurable page sizes
- **Async Prefetch**: Background data loading for improved performance
- **Proxy Support**: HTTP proxy configuration for enterprise environments
- **Multi-Schema Lakehouse Support**: Connect to specific schema within a Lakehouse
- **OneLake Integration**: Access Lakehouse data stored in Microsoft OneLake, including tables across multiple schemas, through a unified ODBC interface without separate storage configuration
- **Environment Items Support**: Attach Fabric environment items during job execution to apply workspace libraries, Spark properties, and variables to each session
- **Custom Spark Configuration**: Pass Spark configuration properties directly through the connection string to tune session behavior

> [!NOTE]
> In open-source Apache Spark, database and schema are used synonymously. For example, running `SHOW SCHEMAS` or `SHOW DATABASES` in a Fabric Notebook returns the same result — a list of all schemas in the Lakehouse.

## Prerequisites

Before using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering, ensure you have:

- **Operating System**: Windows 10/11 or Windows Server 2016+
- **Microsoft Fabric Access**: Access to a Microsoft Fabric workspace
- **Microsoft Entra ID credentials**: Appropriate credentials for authentication
- **Workspace and Lakehouse IDs**: GUID identifiers for your Fabric workspace and lakehouse
- **Azure CLI** (optional): Required for Azure CLI authentication method

## Download and MSI installation

Microsoft ODBC Driver for Microsoft Fabric Data Engineering version 1.0.0 is in public preview which you can download from this download center link.

* [Download Microsoft ODBC Driver for Microsoft Fabric Data Engineering (zip)](https://download.microsoft.com/download/c45e0c46-5f56-4568-89ea-8966da47abdd/ms-sparksql-odbc-1.0.0.zip)

1. Download the Microsoft ODBC Driver for Microsoft Fabric Data Engineering MSI package
2. Double-click `MicrosoftFabricODBCDriver-1.0.msi`
3. Follow the installation wizard and accept the license agreement
4. Choose installation directory (default: `C:\Program Files\Microsoft ODBC Driver for Microsoft Fabric Data Engineering\`)
5. Complete the installation

### Silent installation

```powershell
# Silent installation
msiexec /i "MicrosoftFabricODBCDriver-1.0.msi" /quiet

# Installation with logging
msiexec /i "MicrosoftFabricODBCDriver-1.0.msi" /l*v install.log
```

### Verify installation

After installation, verify the driver is registered:

1. Run `odbcad32.exe` (ODBC Data Source Administrator)
2. Navigate to the **Drivers** tab
3. Verify "Microsoft ODBC Driver for Microsoft Fabric Data Engineering" is listed

## Quick start example
This example demonstrates how to connect to Microsoft Fabric and execute a query using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering. Before running this code, ensure you have completed the prerequisites and installed the driver.

### Python example

```python
import pyodbc

# Connection string with required parameters
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
)

# Connect and execute query
conn = pyodbc.connect(connection_string, timeout=30)
cursor = conn.cursor()

cursor.execute("SELECT 'Hello from Fabric!' as message")
row = cursor.fetchone()
print(row.message)

conn.close()
```

### .NET example

```csharp
using System.Data.Odbc;

// Connection string with required parameters
string connectionString = 
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};" +
    "WorkspaceId=<workspace-id>;" +
    "LakehouseId=<lakehouse-id>;" +
    "AuthFlow=AZURE_CLI;";

using var connection = new OdbcConnection(connectionString);
await connection.OpenAsync();

Console.WriteLine("Connected successfully!");

using var command = new OdbcCommand("SELECT 'Hello from Fabric!' as message", connection);
using var reader = await command.ExecuteReaderAsync();

if (await reader.ReadAsync())
{
    Console.WriteLine(reader.GetString(0));
}
```

## Connection string format

### Basic connection string

The Microsoft ODBC Driver for Microsoft Fabric Data Engineering uses the following connection string format:

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};<parameter1>=<value1>;<parameter2>=<value2>;...
```

### Connection string components

| Component | Description | Example |
|-----------|-------------|---------|
| DRIVER | ODBC driver identifier | `{Microsoft ODBC Driver for Microsoft Fabric Data Engineering}` |
| WorkspaceId | Microsoft Fabric workspace identifier (GUID) | `xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx` |
| LakehouseId | Microsoft Fabric lakehouse identifier (GUID) | `xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx` |
| AuthFlow | Authentication method | `AZURE_CLI`, `INTERACTIVE`, `CLIENT_CREDENTIAL`, `CLIENT_CERTIFICATE`, `ACCESS_TOKEN` |

### Example connection strings

#### Basic connection (Azure CLI authentication)

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI
```

#### With performance options

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;ReuseSession=true;LargeTableSupport=true;PageSizeBytes=18874368
```

#### With logging

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LogLevel=DEBUG;LogFile=odbc_driver.log
```

## Authentication

The Microsoft ODBC Driver for Microsoft Fabric Data Engineering supports multiple authentication methods through Microsoft Entra ID (formerly Azure Active Directory). Authentication is configured using the `AuthFlow` parameter in the connection string.

### Authentication methods

| AuthFlow Value | Description |
|----------------|-------------|
| `AZURE_CLI` | Development using Azure CLI credentials |
| `INTERACTIVE` | Interactive browser-based authentication |
| `CLIENT_CREDENTIAL` | Service principal with client secret |
| `CLIENT_CERTIFICATE` | Service principal with certificate |
| `ACCESS_TOKEN` | Pre-acquired bearer access token |

### Azure CLI authentication

**Best for**: Development and interactive applications

```python
# Python Example
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
    "Scope=https://api.fabric.microsoft.com/.default;"
)
conn = pyodbc.connect(connection_string)
```

**Prerequisites**:
- Azure CLI installed: `az --version`
- Logged in: `az login`

### Interactive browser authentication

**Best for**: User-facing applications


```python
# Python Example
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=INTERACTIVE;"
    "TenantId=<tenant-id>;"
    "Scope=https://api.fabric.microsoft.com/.default;"
)
conn = pyodbc.connect(connection_string)
```


**Behavior**:
- Opens a browser window for user authentication
- Credentials are cached for subsequent connections

### Client credentials (service principal) authentication

**Best for**: Automated services and background jobs

```python
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=CLIENT_CREDENTIAL;"
    f"TenantId={tenant_id};"
    f"ClientId={client_id};"
    f"ClientSecret={client_secret};"
)
```

**Required parameters**
- `TenantId`: Azure tenant ID
- `ClientId`: Application (client) ID from Microsoft Entra ID
- `ClientSecret`: Client secret from Microsoft Entra ID
 
**Best practices**
- Store secrets securely (Azure Key Vault, environment variables)
- Use managed identities when possible
- Rotate secrets regularly

### Certificate-based authentication

**Best for**: Enterprise applications requiring certificate-based authentication

```python
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=CLIENT_CERTIFICATE;"
    "TenantId=<tenant-id>;"
    "ClientId=<client-id>;"
    "CertificatePath=C:\\certs\\mycert.pfx;"
    "CertificatePassword=<password>;"
)
```

**Required parameters**:
- `TenantId`: Azure tenant ID
- `ClientId`: Application (client) ID
- `CertificatePath`: Path to PFX/PKCS12 certificate file
- `CertificatePassword`: Certificate password

### Access token authentication

**Best for**: Custom authentication scenarios

```python
# Acquire token through custom mechanism
access_token = acquire_token_from_custom_source()

connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=ACCESS_TOKEN;"
    f"AccessToken={access_token};"
)
```

## Configuration parameters

### Required parameters

These parameters must be present in every connection string:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| WorkspaceId | UUID | Microsoft Fabric workspace identifier | `4bbf89a8-...` |
| LakehouseId | UUID | Microsoft Fabric lakehouse identifier | `d8faa650-...` |
| AuthFlow | String | Authentication flow type | `AZURE_CLI` |

### Optional parameters

#### Connection settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| Database | String | None | Specific database to connect to |
| Scope | String | `https://api.fabric.microsoft.com/.default` | OAuth scope |

#### Performance settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| ReuseSession | Boolean | `true` | Reuse existing Spark session |
| LargeTableSupport | Boolean | `false` | Enable optimizations for large result sets |
| EnableAsyncPrefetch | Boolean | `false` | Enable background data prefetching |
| PageSizeBytes | Integer | `18874368` (18 MB) | Page size for result pagination (1-18 MB) |

#### Logging settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| LogLevel | String | `INFO` | Log level: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR` |
| LogFile | String | `odbc_driver.log` | Log file path (absolute or relative) |

#### Proxy settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| UseProxy | Boolean | `false` | Enable proxy |
| ProxyHost | String | None | Proxy hostname |
| ProxyPort | Integer | None | Proxy port |
| ProxyUsername | String | None | Proxy authentication username |
| ProxyPassword | String | None | Proxy authentication password |

#### Environment settings

You can attach a Fabric environment item to the Spark session started by the driver. The selected environment's libraries, Spark properties, and variables are automatically applied when the session is created.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| EnvironmentId | UUID | None | Fabric environment item identifier (GUID) to apply during Spark session creation |

**Example connection string with an environment item:**

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;EnvironmentId=<environment-id>
```

> [!NOTE]
> The environment is applied when the Spark session starts. If you also specify custom Spark configuration properties, session-level properties take precedence over the environment defaults.

#### Custom Spark configuration

You can pass Spark configuration properties directly in the connection string. Any parameter prefixed with `spark.` is automatically applied to the Spark session at creation time, allowing you to override workspace or runtime defaults.

**Example Spark configurations:**

```
spark.sql.shuffle.partitions=200
spark.sql.adaptive.enabled=true
spark.sql.autoBroadcastJoinThreshold=10485760
```

**Example connection string with custom Spark properties:**

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;spark.sql.shuffle.partitions=200;spark.sql.adaptive.enabled=true
```

> [!NOTE]
> Spark configuration properties are applied when the session is created. They apply to all queries run within that session and override environment or runtime defaults for the same properties.

## DSN configuration

### Create a system DSN

1. **Open ODBC Administrator**
   ```cmd
   %SystemRoot%\System32\odbcad32.exe
   ```

2. **Create New System DSN**
   - Go to "System DSN" tab
   - Select "Add"
   - Select "Microsoft ODBC Driver for Microsoft Fabric Data Engineering"
   - Select "Finish"

3. **Configure DSN Settings**
   - **Data Source Name**: Enter a unique name (e.g., `FabricODBC`)
   - **Description**: Optional description
   - **Workspace ID**: Your Fabric workspace GUID
   - **Lakehouse ID**: Your Fabric lakehouse GUID
   - **Authentication**: Select authentication method
   - **Environment ID** (optional): Enter the GUID of the Fabric environment item to attach during session creation
   - Configure additional settings as needed

4. **Test Connection**
   - Select "Test Connection" to verify settings
   - Select "OK" to save

### Use DSN in applications

```python
# Python - Connect using DSN
conn = pyodbc.connect("DSN=FabricODBC")
```

```csharp
// .NET - Connect using DSN
using var connection = new OdbcConnection("DSN=FabricODBC");
await connection.OpenAsync();
```

## Usage examples

### Basic connection and query

#### Python

```python
import pyodbc

def main():
    connection_string = (
        "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
        "WorkspaceId=<workspace-id>;"
        "LakehouseId=<lakehouse-id>;"
        "AuthFlow=AZURE_CLI;"
        "ReuseSession=true;"
    )
    
    conn = pyodbc.connect(connection_string, timeout=30)
    cursor = conn.cursor()
    
    print("Connected successfully!")
    
    # Show available tables
    print("\nAvailable tables:")
    cursor.execute("SHOW TABLES")
    for row in cursor.fetchall():
        print(f"  {row}")
    
    # Query data
    print("\nQuery results:")
    cursor.execute("SELECT * FROM employees LIMIT 10")
    
    # Print column names
    columns = [desc[0] for desc in cursor.description]
    print(f"Columns: {columns}")
    
    # Print rows
    for row in cursor.fetchall():
        print(row)
    
    conn.close()

if __name__ == "__main__":
    main()
```

#### .NET

```csharp
using System.Data.Odbc;

class Program
{
    static async Task Main(string[] args)
    {
        string connectionString = 
            "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};" +
            "WorkspaceId=<workspace-id>;" +
            "LakehouseId=<lakehouse-id>;" +
            "AuthFlow=AZURE_CLI;" +
            "ReuseSession=true;";

        using var connection = new OdbcConnection(connectionString);
        await connection.OpenAsync();
        
        Console.WriteLine("Connected successfully!");

        // Show available tables
        Console.WriteLine("\nAvailable tables:");
        using (var cmd = new OdbcCommand("SHOW TABLES", connection))
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                Console.WriteLine($"  {reader.GetString(0)}");
            }
        }

        // Query data
        Console.WriteLine("\nQuery results:");
        using (var cmd = new OdbcCommand("SELECT * FROM employees LIMIT 10", connection))
        using (var reader = await cmd.ExecuteReaderAsync())
        {
            // Print column names
            var columns = new List<string>();
            for (int i = 0; i < reader.FieldCount; i++)
            {
                columns.Add(reader.GetName(i));
            }
            Console.WriteLine($"Columns: {string.Join(", ", columns)}");

            // Print rows
            while (await reader.ReadAsync())
            {
                var values = new object[reader.FieldCount];
                reader.GetValues(values);
                Console.WriteLine(string.Join("\t", values));
            }
        }
    }
}
```

### Working with large result sets

```python
import pyodbc

connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
    "LargeTableSupport=true;"
    "PageSizeBytes=18874368;"  # 18 MB pages
    "EnableAsyncPrefetch=1;"
)

conn = pyodbc.connect(connection_string)
cursor = conn.cursor()

# Execute large query
cursor.execute("SELECT * FROM large_table")

# Process in batches
row_count = 0
while True:
    rows = cursor.fetchmany(1000)  # Fetch 1000 rows at a time
    if not rows:
        break
    
    for row in rows:
        # Process row
        row_count += 1
        
    if row_count % 10000 == 0:
        print(f"Processed {row_count} rows")

print(f"Total rows processed: {row_count}")
conn.close()
```

### Schema discovery

```python
import pyodbc

conn = pyodbc.connect(connection_string)
cursor = conn.cursor()

# List all tables
print("Tables in current default schema / database:")
cursor.execute("SHOW TABLES")
tables = cursor.fetchall()
for table in tables:
    print(f"  {table}")

# Describe table structure
print("\nTable structure for 'employees':")
cursor.execute("DESCRIBE employees")
for col in cursor.fetchall():
    print(f"  {col}")

# List schemas (for multi-schema Lakehouses)
print("\nAvailable schemas:")
cursor.execute("SHOW SCHEMAS")
for db in cursor.fetchall():
    print(f"  {db}")

conn.close()
```

## Data type mapping

The driver maps Spark SQL data types to ODBC SQL types:

| Spark SQL Type | ODBC SQL Type | C/C++ Type | Python Type | .NET Type |
|----------------|---------------|------------|-------------|-----------|
| BOOLEAN | SQL_BIT | SQLCHAR | bool | bool |
| BYTE | SQL_TINYINT | SQLSCHAR | int | sbyte |
| SHORT | SQL_SMALLINT | SQLSMALLINT | int | short |
| INT | SQL_INTEGER | SQLINTEGER | int | int |
| LONG | SQL_BIGINT | SQLBIGINT | int | long |
| FLOAT | SQL_REAL | SQLREAL | float | float |
| DOUBLE | SQL_DOUBLE | SQLDOUBLE | float | double |
| DECIMAL | SQL_DECIMAL | SQLCHAR* | decimal.Decimal | decimal |
| STRING | SQL_VARCHAR | SQLCHAR* | str | string |
| VARCHAR(n) | SQL_VARCHAR | SQLCHAR* | str | string |
| CHAR(n) | SQL_CHAR | SQLCHAR* | str | string |
| BINARY | SQL_BINARY | SQLCHAR* | bytes | byte[] |
| DATE | SQL_TYPE_DATE | SQL_DATE_STRUCT | datetime.date | DateTime |
| TIMESTAMP | SQL_TYPE_TIMESTAMP | SQL_TIMESTAMP_STRUCT | datetime.datetime | DateTime |
| ARRAY | SQL_VARCHAR | SQLCHAR* | str (JSON) | string |
| MAP | SQL_VARCHAR | SQLCHAR* | str (JSON) | string |
| STRUCT | SQL_VARCHAR | SQLCHAR* | str (JSON) | string |

## BI tool integration

### Microsoft Excel

1. Open Excel -> Data -> Get Data -> From Other Sources -> From ODBC
2. Select your configured DSN (e.g., `FabricODBC`)
3. Authenticate if prompted
4. Browse and select tables
5. Load data into Excel worksheet

### Power BI Desktop

1. Open Power BI Desktop -> Get Data -> ODBC
2. Select your configured DSN
3. Browse data catalog and select tables
4. Transform data as needed
5. Create visualizations

### SQL Server Management Studio (Linked Server)

```sql
-- Create linked server
EXEC sp_addlinkedserver 
    @server = 'FABRIC_LINKED_SERVER',
    @srvproduct = 'Microsoft Fabric',
    @provider = 'MSDASQL',
    @datasrc = 'FabricODBC'

-- Configure RPC
EXEC master.dbo.sp_serveroption 
    @server = N'FABRIC_LINKED_SERVER',
    @optname = N'rpc out',
    @optvalue = N'true';

-- Query via linked server
SELECT * FROM OPENQUERY(FABRIC_LINKED_SERVER, 'SHOW TABLES');
SELECT * FROM OPENQUERY(FABRIC_LINKED_SERVER, 'SELECT * FROM employees LIMIT 20');

-- Execute statements
EXEC('SELECT * FROM employees LIMIT 10') AT FABRIC_LINKED_SERVER;
```

## Troubleshooting

This section provides guidance for resolving common issues you might encounter when using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering.

### Common issues

The following sections describe common problems and their solutions:

#### Connection failures

**Problem**: Can't connect to Microsoft Fabric

**Solutions**:
1. Verify Workspace ID and Lakehouse ID are correct GUIDs
2. Check Azure CLI authentication: `az account show`
3. Ensure you have appropriate Fabric workspace permissions
4. Check network connectivity and proxy settings

#### Authentication errors

**Problem**: Authentication fails with Azure CLI

**Solutions**:
- Run `az login` to refresh credentials
- Verify correct tenant: `az account set --subscription <subscription-id>`
- Check token validity: `az account get-access-token --resource https://api.fabric.microsoft.com`

#### Query timeouts

**Problem**: Queries timing out on large tables

**Solutions**:
- Enable `LargeTableSupport=true`
- Adjust `PageSizeBytes` for optimal chunk size
- Enable async prefetch: `EnableAsyncPrefetch=1`
- Use `LIMIT` clause to restrict result size

### Enable logging

When troubleshooting issues, enabling detailed logging can help you identify the root cause of problems. You can enable logging through the connection string.

To enable detailed logging:

```
LogLevel=DEBUG;LogFile=C:\temp\odbc_driver_debug.log;
```

Log levels:
- `TRACE`: Most verbose, includes all API calls
- `DEBUG`: Detailed debugging information
- `INFO`: General information (default)
- `WARN`: Warnings only
- `ERROR`: Errors only

### ODBC tracing

For low-level diagnostics, you can enable Windows ODBC tracing to capture detailed ODBC API calls and driver behavior. Remember to turn off tracing when not needed to maintain optimal performance.

To enable ODBC tracing:

1. Open `odbcad32.exe`
2. Go to "Tracing" tab
3. Set trace file path (e.g., `C:\temp\odbctrace.log`)
4. Select "Start Tracing Now"
5. Reproduce the issue
6. Select "Stop Tracing Now"

## Related content

* [Apache Spark Runtimes in Fabric](./runtime.md)
* [Fabric Runtime 1.3](./runtime-1-3.md)
* [What is the Livy API for Data Engineering](./api-livy-overview.md)
* [Microsoft JDBC Driver for Microsoft Fabric Data Engineering](./spark-jdbc-driver.md)
