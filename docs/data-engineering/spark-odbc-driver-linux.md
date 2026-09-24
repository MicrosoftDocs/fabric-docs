---
title: Microsoft ODBC Driver for Microsoft Fabric Data Engineering on Linux
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric on Linux using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering.
author: avinandac
ms.reviewer: avinandac
ms.topic: how-to
ms.date: 08/12/2026
ai-usage: ai-assisted
---

# Microsoft ODBC driver for Microsoft Fabric Data Engineering on Linux (Preview)

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

ODBC (Open Database Connectivity) is a widely adopted standard that enables client applications to connect to and work with data from databases and big data platforms.

The Microsoft ODBC Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Fabric with the reliability and simplicity of the ODBC standard. Built on Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your C/C++, .NET, Python, and other ODBC-compatible applications on Linux.

## Key features

- **ODBC 3.x compliant**: Full implementation of the ODBC 3.x specification.
- **Microsoft Entra ID authentication**: Multiple authentication flows, including Azure CLI, client credentials, certificate-based, and access token authentication.
- **Spark SQL query support**: Direct execution of Spark SQL statements.
- **Comprehensive data type support**: Support for all Spark SQL data types, including complex types (`ARRAY`, `MAP`, and `STRUCT`).
- **Session reuse**: Built-in session management for improved performance.
- **Large table support**: Optimized handling for large result sets with configurable page sizes.
- **Async prefetch**: Background data loading for improved performance.
- **Proxy support**: HTTP proxy configuration for enterprise environments.
- **Multi-schema lakehouse support**: Connect to a specific schema within a lakehouse.

> [!NOTE]
> In open-source Apache Spark, database and schema are used synonymously. For example, running `SHOW SCHEMAS` or `SHOW DATABASES` in a Fabric notebook returns the same result: a list of all schemas in the lakehouse.

## Prerequisites

Before you use the Microsoft ODBC Driver for Microsoft Fabric Data Engineering on Linux, ensure you have the following prerequisites:

- **Operating system**: Ubuntu 22.04 or later, Debian 11 or later, or Red Hat Enterprise Linux (RHEL) 8 or later on x86-64.
- **unixODBC**: The ODBC driver manager for Linux. Install the `unixodbc` and `unixodbc-dev` packages.
- **Fabric access**: Access to a Fabric workspace.
- **Microsoft Entra ID credentials**: Appropriate credentials for authentication.
- **Workspace and lakehouse IDs**: The GUID identifiers for your Fabric workspace and lakehouse.
- **Azure CLI** (optional): Required when you use Azure CLI authentication.

## Download and install on Linux

Microsoft ODBC Driver for Microsoft Fabric Data Engineering version 1.0.0 is available in public preview.

* [Download Microsoft ODBC Driver for Microsoft Fabric Data Engineering on Linux (zip)](https://download.microsoft.com/download/585deab5-c832-4a27-aeff-dd4022e09204/ms-sparksql-odbc-linux-1.0.0.zip)

To install the driver:

1. Extract `ms-sparksql-odbc-linux-1.0.0.zip`.
1. Open a terminal in the extracted directory.
1. Install the Debian package:

   ```bash
   sudo dpkg -i microsoft-fabric-odbc-driver-1.0.0-Linux.deb
   ```

The package installs the following files:

| File | Installed location |
|------|--------------------|
| Driver library | `/usr/lib/libmicrosoftfabricodbc.so` |
| Driver registration template | `/usr/share/microsoft-fabric-odbc-driver/odbcinst.ini.template` |
| DSN configuration template | `/usr/share/microsoft-fabric-odbc-driver/odbc.ini.template` |
| License | `/usr/share/doc/microsoft-fabric-odbc-driver/LICENSE` |
| Usage guide | `/usr/share/doc/microsoft-fabric-odbc-driver/USAGE_Linux.md` |

### Register driver manually

The package automatically registers the driver with unixODBC. To register the driver manually, run:

```bash
sudo odbcinst -i -d -f /usr/share/microsoft-fabric-odbc-driver/odbcinst.ini.template
```

### Verify the installation

Verify that the driver is registered and that the library is installed:

```bash
odbcinst -q -d
ls -la /usr/lib/libmicrosoftfabricodbc.so
```

The `odbcinst` command should list `[Microsoft ODBC Driver for Microsoft Fabric Data Engineering]`.

### Uninstall the driver
To uninstall the driver, run the following command:

```bash
sudo dpkg -r microsoft-fabric-odbc-driver
```

This command removes the driver files and unregisters the driver from unixODBC.

## Quick start example

The following examples connect to Fabric and run a Spark SQL query. Complete the prerequisites and install the driver before you run an example.

### Python example

```python
import pyodbc

connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
)

conn = pyodbc.connect(connection_string, timeout=30)
cursor = conn.cursor()

cursor.execute("SELECT 'Hello from Fabric!' AS message")
row = cursor.fetchone()
print(row.message)

conn.close()
```

### C/C++ example

```cpp
#include <sql.h>
#include <sqlext.h>
#include <iostream>

int main() {
    SQLHENV henv = SQL_NULL_HENV;
    SQLHDBC hdbc = SQL_NULL_HDBC;
    SQLHSTMT hstmt = SQL_NULL_HSTMT;

    SQLAllocHandle(SQL_HANDLE_ENV, SQL_NULL_HANDLE, &henv);
    SQLSetEnvAttr(henv, SQL_ATTR_ODBC_VERSION, (SQLPOINTER)SQL_OV_ODBC3, 0);
    SQLAllocHandle(SQL_HANDLE_DBC, henv, &hdbc);

    const char* connectionString =
        "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
        "WorkspaceId=<workspace-id>;"
        "LakehouseId=<lakehouse-id>;"
        "AuthFlow=AZURE_CLI;";

    SQLRETURN result = SQLDriverConnect(
        hdbc,
        NULL,
        (SQLCHAR*)connectionString,
        SQL_NTS,
        NULL,
        0,
        NULL,
        SQL_DRIVER_NOPROMPT);

    if (SQL_SUCCEEDED(result)) {
        std::cout << "Connected successfully!" << std::endl;

        SQLAllocHandle(SQL_HANDLE_STMT, hdbc, &hstmt);
        result = SQLExecDirect(
            hstmt,
            (SQLCHAR*)"SELECT 'Hello from Fabric!' AS message",
            SQL_NTS);

        if (SQL_SUCCEEDED(result)) {
            char message[256];
            SQLLEN indicator;

            while (SQLFetch(hstmt) == SQL_SUCCESS) {
                SQLGetData(
                    hstmt,
                    1,
                    SQL_C_CHAR,
                    message,
                    sizeof(message),
                    &indicator);
                std::cout << message << std::endl;
            }
        }

        SQLFreeHandle(SQL_HANDLE_STMT, hstmt);
        SQLDisconnect(hdbc);
    }

    SQLFreeHandle(SQL_HANDLE_DBC, hdbc);
    SQLFreeHandle(SQL_HANDLE_ENV, henv);
    return 0;
}
```

Build and run the example:

```bash
g++ -o fabric_test fabric_test.cpp -lodbc -std=c++17
./fabric_test
```

### .NET example

```csharp
using System.Data.Odbc;

string connectionString =
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};" +
    "WorkspaceId=<workspace-id>;" +
    "LakehouseId=<lakehouse-id>;" +
    "AuthFlow=AZURE_CLI;";

using var connection = new OdbcConnection(connectionString);
await connection.OpenAsync();

Console.WriteLine("Connected successfully!");

using var command = new OdbcCommand(
    "SELECT 'Hello from Fabric!' AS message",
    connection);
using var reader = await command.ExecuteReaderAsync();

if (await reader.ReadAsync())
{
    Console.WriteLine(reader.GetString(0));
}
```

## Connection string format

### Basic connection string

Use the following connection string format:

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};<parameter1>=<value1>;<parameter2>=<value2>;...
```

### Connection string components

| Component | Description | Example |
|-----------|-------------|---------|
| `DRIVER` | ODBC driver identifier | `{Microsoft ODBC Driver for Microsoft Fabric Data Engineering}` |
| `WorkspaceId` | Fabric workspace identifier (GUID) | `4bbf89a8-66bb-443f-91af-df31e6a7560b` |
| `LakehouseId` | Fabric lakehouse identifier (GUID) | `d8faa650-1343-496b-b9cc-d4168a676f90` |
| `AuthFlow` | Authentication method | `AZURE_CLI`, `CLIENT_CREDENTIAL`, `CLIENT_CERTIFICATE`, or `ACCESS_TOKEN` |

### Example connection strings

#### Basic connection

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI
```

#### Connection with performance options

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;ReuseSession=true;LargeTableSupport=true;PageSizeBytes=18874368
```

#### Connection with logging

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LogLevel=DEBUG;LogFile=/tmp/odbc_driver.log
```

## Authentication

The Microsoft ODBC Driver for Microsoft Fabric Data Engineering supports multiple authentication methods through Microsoft Entra ID. Configure authentication by using the `AuthFlow` parameter in the connection string or DSN.

### Authentication methods

| `AuthFlow` value | Description |
|------------------|-------------|
| `AZURE_CLI` | Development using Azure CLI credentials |
| `CLIENT_CREDENTIAL` | Service principal with a client secret |
| `CLIENT_CERTIFICATE` | Service principal with a certificate |
| `ACCESS_TOKEN` | Pre-acquired bearer access token |

> [!NOTE]
> Interactive browser authentication isn't available on headless Linux servers. Use Azure CLI, client credentials, certificate-based, or access token authentication instead.

### Azure CLI authentication

Use Azure CLI authentication for development and interactive applications.

```python
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
    "Scope=https://api.fabric.microsoft.com/.default;"
)
conn = pyodbc.connect(connection_string)
```

Before you connect, verify that Azure CLI is installed and sign in:

```bash
az --version
az login
```

To install Azure CLI on Debian or Ubuntu, use the package manager:

```bash
sudo apt-get update
sudo apt-get install -y azure-cli
```

### Client credentials authentication

Use client credentials authentication for automated services and background jobs.

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

Provide the following parameters:

- `TenantId`: The Microsoft Entra tenant ID.
- `ClientId`: The application (client) ID.
- `ClientSecret`: The client secret.

Store secrets in a secure secret store or environment variables. Don't store secrets in plain-text connection strings or INI files.

### Certificate-based authentication

Use certificate-based authentication for enterprise applications that require certificate credentials.

```python
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=CLIENT_CERTIFICATE;"
    "TenantId=<tenant-id>;"
    "ClientId=<client-id>;"
    "CertificatePath=/path/to/cert.pfx;"
    "CertificatePassword=<password>;"
)
```

Provide the following parameters:

- `TenantId`: The Microsoft Entra tenant ID.
- `ClientId`: The application (client) ID.
- `CertificatePath`: The path to the PFX or PKCS12 certificate file.
- `CertificatePassword`: The certificate password.

### Access token authentication

Use access token authentication when your application acquires a token through another mechanism.

```python
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

Include these parameters in every connection string:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `WorkspaceId` | UUID | Fabric workspace identifier | `4bbf89a8-...` |
| `LakehouseId` | UUID | Fabric lakehouse identifier | `d8faa650-...` |
| `AuthFlow` | String | Authentication flow type | `AZURE_CLI` |

### Optional parameters

#### Connection settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `Database` | String | None | Specific database to connect to |
| `Scope` | String | `https://api.fabric.microsoft.com/.default` | OAuth scope |

#### Performance settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ReuseSession` | Boolean | `true` | Reuse an existing Spark session |
| `LargeTableSupport` | Boolean | `false` | Enable optimizations for large result sets |
| `EnableAsyncPrefetch` | Boolean | `false` | Enable background data prefetching |
| `PageSizeBytes` | Integer | `18874368` (18 MB) | Page size for result pagination from 1 through 18 MB |

#### Logging settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LogLevel` | String | `INFO` | Log level: `TRACE`, `DEBUG`, `INFO`, `WARN`, or `ERROR` |
| `LogFile` | String | `odbc_driver.log` | Absolute or relative log file path |

#### Proxy settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `UseProxy` | Boolean | `false` | Enable a proxy |
| `ProxyHost` | String | None | Proxy host name |
| `ProxyPort` | Integer | None | Proxy port |
| `ProxyUsername` | String | None | Proxy authentication user name |
| `ProxyPassword` | String | None | Proxy authentication password |

## DSN configuration

On Linux, configure data source names (DSNs) in INI files instead of the Windows registry.

| File | Scope | Access |
|------|-------|--------|
| `/etc/odbc.ini` | System-wide DSNs | Requires `sudo` |
| `~/.odbc.ini` | User-specific DSNs | Current user only |

### Create a DSN

Copy the installed template:

```bash
cp /usr/share/microsoft-fabric-odbc-driver/odbc.ini.template ~/.odbc.ini
```

Edit `~/.odbc.ini` with your Fabric workspace details:

```ini
[FabricDSN]
Description    = Microsoft Fabric Data Engineering
Driver         = Microsoft ODBC Driver for Microsoft Fabric Data Engineering
WorkspaceId    = <workspace-id>
LakehouseId    = <lakehouse-id>
AuthFlow       = AZURE_CLI
LogLevel       = INFO
# LogFile      = /tmp/fabric_odbc.log
# LargeTableSupport = true
# ReuseSession = true
```

### Verify the DSN

List the configured DSNs, and then test the connection:

```bash
odbcinst -q -s
isql -v FabricDSN
```

The `isql` command requires the unixODBC command-line tools.

### Use a DSN in applications

```python
conn = pyodbc.connect("DSN=FabricDSN")
```

```csharp
using var connection = new OdbcConnection("DSN=FabricDSN");
await connection.OpenAsync();
```

```cpp
SQLRETURN result = SQLConnect(
    hdbc,
    (SQLCHAR*)"FabricDSN",
    SQL_NTS,
    NULL,
    0,
    NULL,
    0);
```

## Usage examples

### Test a connection with isql

Start an interactive SQL session:

```bash
isql -v FabricDSN
```

Run a single query:

```bash
echo "SELECT 1 AS test" | isql -v FabricDSN -b
```

### Work with large result sets

```python
import pyodbc

connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
    "LargeTableSupport=true;"
    "PageSizeBytes=18874368;"
    "EnableAsyncPrefetch=1;"
)

conn = pyodbc.connect(connection_string)
cursor = conn.cursor()
cursor.execute("SELECT * FROM large_table")

row_count = 0
while True:
    rows = cursor.fetchmany(1000)
    if not rows:
        break

    for row in rows:
        row_count += 1

    if row_count % 10000 == 0:
        print(f"Processed {row_count} rows")

print(f"Total rows processed: {row_count}")
conn.close()
```

### Discover schemas and tables

```python
import pyodbc

conn = pyodbc.connect(connection_string)
cursor = conn.cursor()

cursor.execute("SHOW TABLES")
for table in cursor.fetchall():
    print(table)

cursor.execute("DESCRIBE employees")
for column in cursor.fetchall():
    print(column)

cursor.execute("SHOW SCHEMAS")
for schema in cursor.fetchall():
    print(schema)

conn.close()
```

## Data type mapping

The driver maps Spark SQL data types to ODBC SQL types:

| Spark SQL type | ODBC SQL type | C/C++ type | Python type | .NET type |
|----------------|---------------|------------|-------------|-----------|
| `BOOLEAN` | `SQL_BIT` | `SQLCHAR` | `bool` | `bool` |
| `BYTE` | `SQL_TINYINT` | `SQLSCHAR` | `int` | `sbyte` |
| `SHORT` | `SQL_SMALLINT` | `SQLSMALLINT` | `int` | `short` |
| `INT` | `SQL_INTEGER` | `SQLINTEGER` | `int` | `int` |
| `LONG` | `SQL_BIGINT` | `SQLBIGINT` | `int` | `long` |
| `FLOAT` | `SQL_REAL` | `SQLREAL` | `float` | `float` |
| `DOUBLE` | `SQL_DOUBLE` | `SQLDOUBLE` | `float` | `double` |
| `DECIMAL` | `SQL_DECIMAL` | `SQLCHAR*` | `decimal.Decimal` | `decimal` |
| `STRING` | `SQL_VARCHAR` | `SQLCHAR*` | `str` | `string` |
| `VARCHAR(n)` | `SQL_VARCHAR` | `SQLCHAR*` | `str` | `string` |
| `CHAR(n)` | `SQL_CHAR` | `SQLCHAR*` | `str` | `string` |
| `BINARY` | `SQL_BINARY` | `SQLCHAR*` | `bytes` | `byte[]` |
| `DATE` | `SQL_TYPE_DATE` | `SQL_DATE_STRUCT` | `datetime.date` | `DateTime` |
| `TIMESTAMP` | `SQL_TYPE_TIMESTAMP` | `SQL_TIMESTAMP_STRUCT` | `datetime.datetime` | `DateTime` |
| `ARRAY` | `SQL_VARCHAR` | `SQLCHAR*` | JSON string | `string` |
| `MAP` | `SQL_VARCHAR` | `SQLCHAR*` | JSON string | `string` |
| `STRUCT` | `SQL_VARCHAR` | `SQLCHAR*` | JSON string | `string` |

## Platform differences

| Feature | Windows | Linux |
|---------|---------|-------|
| Driver manager | Microsoft ODBC Driver Manager | unixODBC |
| Driver binary | `microsoftfabricodbc.dll` | `libmicrosoftfabricodbc.so` |
| DSN configuration | Windows registry and GUI | `/etc/odbc.ini` and `~/.odbc.ini` |
| Driver registration | Registry and `odbcad32.exe` | `odbcinst -i -d -f` |
| HTTP client | WinHTTP | libcurl |
| TLS | Windows built-in support | OpenSSL |
| Certificate authentication | Windows CryptoAPI | OpenSSL with RS256 and PEM or PFX files |
| Interactive authentication | Browser window | Not available on headless servers |
| Packaging | MSI installer | Linux package |

## Troubleshooting

### Driver not found

**Problem**: The connection fails with `[IM002] Data source name not found and no default driver specified`.

**Solutions**:

1. Verify the driver registration by running `odbcinst -q -d`.
1. Verify that `/usr/lib/libmicrosoftfabricodbc.so` exists.
1. Register the driver by running `sudo odbcinst -i -d -f /usr/share/microsoft-fabric-odbc-driver/odbcinst.ini.template`.
1. Reinstall the package by running `sudo dpkg -i microsoft-fabric-odbc-driver-1.0.0-Linux.deb`.

### DSN not found

**Problem**: The connection fails with `[IM002] Data source name not found`.

**Solutions**:

1. Verify the DSN configuration by running `odbcinst -q -s`.
1. Verify that `~/.odbc.ini` or `/etc/odbc.ini` contains the DSN section.
1. Make sure the `Driver` value exactly matches the registered driver name.

### Connection failures

**Problem**: The driver can't connect to Fabric.

**Solutions**:

1. Verify that the workspace ID and lakehouse ID are valid GUIDs.
1. Check Azure CLI authentication by running `az account show`.
1. Make sure you have the required Fabric workspace permissions.
1. Check network connectivity and proxy settings.

### Authentication errors

**Problem**: Azure CLI authentication fails.

**Solutions**:

1. Run `az login` to refresh your credentials.
1. Set the correct subscription by running `az account set --subscription <subscription-id>`.
1. Check the token by running `az account get-access-token --resource https://api.fabric.microsoft.com`.
1. Ensure your account has the required Fabric workspace permissions.

### Shared library errors

**Problem**: The driver reports `error while loading shared libraries: libmicrosoftfabricodbc.so`.

**Solutions**:

1. Reinstall the package by running `sudo dpkg -i microsoft-fabric-odbc-driver-1.0.0-Linux.deb`.
1. Verify that `/usr/lib/libmicrosoftfabricodbc.so` exists.
1. Run `sudo ldconfig` to refresh the shared library cache.

### Query timeouts

**Problem**: Queries time out on large tables.

**Solutions**:

1. Add `LargeTableSupport=true` to the connection string.
1. Adjust `PageSizeBytes` for the result size.
1. Add `EnableAsyncPrefetch=1` to the connection string.
1. Use a `LIMIT` clause to restrict the result size.

### Enable logging

Enable detailed logging in a DSN:

```ini
[FabricDSN]
LogLevel = DEBUG
LogFile  = /tmp/fabric_odbc_debug.log
```

Alternatively, add logging parameters to the connection string:

```text
LogLevel=DEBUG;LogFile=/tmp/fabric_odbc_debug.log;
```

The driver supports the following log levels:

- `TRACE`: Includes all API calls.
- `DEBUG`: Includes detailed debugging information.
- `INFO`: Includes general information and is the default.
- `WARN`: Includes warnings only.
- `ERROR`: Includes errors only.

### Enable unixODBC tracing

For low-level ODBC call diagnostics, add the following configuration to `/etc/odbcinst.ini`:

```ini
[ODBC]
Trace     = yes
TraceFile = /tmp/odbc_trace.log
```

Turn off tracing when you finish troubleshooting to avoid unnecessary performance overhead.

## Related content

- [Microsoft ODBC Driver for Microsoft Fabric Data Engineering](./spark-odbc-driver.md)
- [Apache Spark runtimes in Fabric](./runtime.md)
- [Fabric Runtime 1.3](./runtime-1-3.md)
- [What is the Livy API for Data Engineering](./api-livy-overview.md)
- [Microsoft JDBC Driver for Microsoft Fabric Data Engineering](./spark-jdbc-driver.md)
- [unixODBC](http://www.unixodbc.org/)
