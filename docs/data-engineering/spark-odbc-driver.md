---
title: Microsoft ODBC Driver for Microsoft Fabric Data Engineering
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering.
author: ms-arali
ms.reviewer: arali
ms.topic: how-to
ms.date: 09/29/2026
ai-usage: ai-assisted
---

# Microsoft ODBC driver for Microsoft Fabric Data Engineering

ODBC (Open Database Connectivity) is a widely adopted standard that enables client applications to connect to and work with data from databases and big data platforms.

The Microsoft ODBC Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Fabric with the reliability and simplicity of the ODBC standard. Built on Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your C/C++, .NET, Python, and other ODBC-compatible applications and BI tools.

## Key features

- **ODBC 3.x compliant**: Full implementation of ODBC 3.x specification
- **Microsoft Entra ID authentication**: Multiple authentication flows including Azure CLI, interactive, client credentials, certificate-based, and access token authentication
- **Spark SQL query support**: Direct execution of Spark SQL statements
- **Comprehensive data type support**: Support for all Spark SQL data types including complex types (ARRAY, MAP, STRUCT)
- **Session reuse**: Built-in session management for improved performance
- **High-concurrency mode**: Opt in to shared, warm server-side Livy sessions to reduce connection startup latency and Spark cluster sprawl
- **Large table support**: Optimized handling for large result sets with configurable page sizes
- **Async prefetch**: Background data loading for improved performance
- **Proxy support**: HTTP proxy configuration for enterprise environments
- **Multi-schema lakehouse support**: Connect to specific schema within a lakehouse
- **OneLake integration**: Access lakehouse data stored in OneLake, including tables across multiple schemas, through a unified ODBC interface without separate storage configuration
- **Environment items support**: Attach Fabric environment items during job execution to apply workspace libraries, Spark properties, and variables to each session
- **Custom Spark configuration**: Pass Spark configuration properties directly through the connection string to tune session behavior

> [!NOTE]
> In open-source Apache Spark, database and schema are used synonymously. For example, running `SHOW SCHEMAS` or `SHOW DATABASES` in a Fabric notebook returns the same result — a list of all schemas in the lakehouse.

## Prerequisites

Before using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering, ensure you have:

- **Operating System**: Windows 10/11 or Windows Server 2016+
- **Fabric Access**: Access to a Fabric workspace
- **Microsoft Entra ID credentials**: Appropriate credentials for authentication
- **Workspace and lakehouse IDs**: GUID identifiers for your Fabric workspace and lakehouse
- **Azure CLI** (optional): Required for Azure CLI authentication method

## Download and MSI installation

* [Download Microsoft ODBC Driver for Microsoft Fabric Data Engineering (zip)](https://download.microsoft.com/download/45cf93ca-d421-4295-9b2d-becb111d879b/ms-sparksql-odbc-2.0.0.zip)

1. Download the Microsoft ODBC Driver for Microsoft Fabric Data Engineering MSI package
2. Double-click `MicrosoftFabricODBCDriver-2.0.msi`.
3. Follow the installation wizard and accept the license agreement
4. Choose installation directory (default: `C:\Program Files\Microsoft ODBC Driver for Microsoft Fabric Data Engineering\`)
5. Complete the installation

### Silent installation

```powershell
# Silent installation
msiexec /i "MicrosoftFabricODBCDriver-2.0.msi" /quiet

# Installation with logging
msiexec /i "MicrosoftFabricODBCDriver-2.0.msi" /l*v install.log
```

### Verify installation

After installation, verify the driver is registered:

1. Run `odbcad32.exe` (ODBC Data Source Administrator)
2. Navigate to the **Drivers** tab
3. Verify "Microsoft ODBC Driver for Microsoft Fabric Data Engineering" is listed

## Quick start example
This example demonstrates how to connect to Fabric and execute a query using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering. Before running this code, ensure you have completed the prerequisites and installed the driver.

### C/C++ example

```cpp
#include <windows.h>
#include <sql.h>
#include <sqlext.h>
#include <iostream>

int main() {
    SQLHENV environment = SQL_NULL_HENV;
    SQLHDBC connection = SQL_NULL_HDBC;
    SQLHSTMT statement = SQL_NULL_HSTMT;

    SQLAllocHandle(SQL_HANDLE_ENV, SQL_NULL_HANDLE, &environment);
    SQLSetEnvAttr(
        environment,
        SQL_ATTR_ODBC_VERSION,
        (SQLPOINTER)SQL_OV_ODBC3,
        0);
    SQLAllocHandle(SQL_HANDLE_DBC, environment, &connection);

    const char* connectionString =
        "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
        "WorkspaceId=<workspace-id>;"
        "LakehouseId=<lakehouse-id>;"
        "AuthFlow=AZURE_CLI;";

    SQLRETURN result = SQLDriverConnectA(
        connection,
        NULL,
        (SQLCHAR*)connectionString,
        SQL_NTS,
        NULL,
        0,
        NULL,
        SQL_DRIVER_NOPROMPT);

    if (SQL_SUCCEEDED(result)) {
        SQLAllocHandle(SQL_HANDLE_STMT, connection, &statement);
        result = SQLExecDirectA(
            statement,
            (SQLCHAR*)"SELECT 'Hello from Fabric!' AS message",
            SQL_NTS);

        if (SQL_SUCCEEDED(result)) {
            char message[256];
            SQLLEN indicator;

            while (SQLFetch(statement) == SQL_SUCCESS) {
                SQLGetData(
                    statement,
                    1,
                    SQL_C_CHAR,
                    message,
                    sizeof(message),
                    &indicator);
                std::cout << message << std::endl;
            }
        }

        SQLFreeHandle(SQL_HANDLE_STMT, statement);
        SQLDisconnect(connection);
    }

    SQLFreeHandle(SQL_HANDLE_DBC, connection);
    SQLFreeHandle(SQL_HANDLE_ENV, environment);
    return 0;
}
```

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
| WorkspaceId | Fabric workspace identifier (GUID) | `xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx` |
| LakehouseId | Fabric lakehouse identifier (GUID) | `xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx` |
| AuthFlow | Authentication method | `AZURE_CLI`, `INTERACTIVE`, `CLIENT_CREDENTIAL`, `CLIENT_CERTIFICATE`, `ACCESS_TOKEN`, `FILE_TOKEN` |

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

#### With high-concurrency mode

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;SessionTag=bi-dashboard
```
See the [High-Concurrency (HC) Mode](#high-concurrency-hc-mode) section for full configuration guidance.

## Authentication

The Microsoft ODBC Driver for Microsoft Fabric Data Engineering supports multiple authentication methods through Microsoft Entra ID (formerly Azure Active Directory). Authentication is configured using the `AuthFlow` parameter in the connection string.

### Authentication methods

| AuthFlow Value | Description |
|----------------|-------------|
| `CLIENT_CREDENTIAL` (0) | Service principal with client secret. Alias: `CLIENT_SECRET_CREDENTIAL`. |
| `BROWSER_BASED` (1) | Interactive browser-based authentication. Alias: `INTERACTIVE`. |
| `AZURE_CLI` (2) | Development using Azure CLI credentials. |
| `CLIENT_CERTIFICATE_CREDENTIAL` (3) | Service principal with certificate. Alias: `CLIENT_CERTIFICATE`. |
| `AUTH_ACCESS_TOKEN` (4) | Pre-acquired bearer access token. Alias: `ACCESS_TOKEN`. |
| `FILE_TOKEN` (5) | Reads an authentication token from a file. |

You can specify authentication values in uppercase snake case, Pascal case, or numeric form. The driver also accepts short aliases such as `Browser`, `Interactive`, `CLI`, `Certificate`, `Token`, and `File`. The driver ignores underscores when it compares values.

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

### File token authentication

Use file token authentication for containerized environments and automated pipelines where another process writes a bearer token to the driver's well-known token file:

```python
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=FILE_TOKEN;"
)
```

The driver resolves the token file location on Windows and Linux.

## Cross-driver property aliases

The ODBC driver accepts selected ADO.NET and JDBC property names in addition to native ODBC names. This support can reduce connection-string changes when you move between Fabric drivers.

| ADO.NET or JDBC property | ODBC equivalent |
|--------------------------|-----------------|
| `FabricWorkspaceID` | `WorkspaceId` |
| `FabricLakehouseID` | `LakehouseId` |
| `LivySessionTimeoutSeconds` | Connection timeout |
| `LivyStatementTimeoutSeconds` | Statement timeout |
| `ConnectionPoolEnabled` | Pool enabled |

The driver resolves 17 cross-driver aliases at connection time.

## Configuration parameters

### Required parameters

These parameters must be present in every connection string:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| WorkspaceId | UUID | Fabric workspace identifier | `4bbf89a8-...` |
| LakehouseId | UUID | Fabric lakehouse identifier | `d8faa650-...` |
| AuthFlow | String | Authentication flow type | `AZURE_CLI` |

### Optional parameters

#### Connection settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| Database | String | None | Initial database for classic mode. HC mode doesn't apply it automatically; run `USE <database>` after connecting or use fully qualified table names. |
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
| LogLevel | String | `INFO` | Log level: `DEBUG`, `INFO`, `WARN`, or `ERROR`. Use `DEBUG` for detailed driver diagnostics. |
| LogFile | String | `odbc_driver.log` | Log file path (absolute or relative) |

#### Proxy settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| UseProxy | Boolean | `false` | Enable proxy |
| ProxyHost | String | None | Proxy hostname |
| ProxyPort | Integer | None | Proxy port |
| ProxyUsername | String | None | Proxy authentication username |
| ProxyPassword | String | None | Proxy authentication password |

#### High-concurrency (HC) settings

Use these parameters to enable and configure high-concurrency (HC) mode. HC mode is opt-in. If you don't set `LivyMode` or `UseHighConcurrency`, the driver uses the classic single-session path. For guidance and examples, see [High-concurrency (HC) mode](#high-concurrency-hc-mode).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LivyMode` | String | Not set | Controls session acquisition. Supported values are `Classic`, `HighConcurrency`, and `Auto`. `Auto` currently uses the classic path. |
| `UseHighConcurrency` | Boolean | `false` | Enables HC mode as an alternative to setting `LivyMode=HighConcurrency`. |
| `SessionTag` | String | None | Provides a server-side packing hint. Connections must use matching server-side configuration to share a warm Livy session. |
| `IdempotencyKey` | String | None | Provides a client-generated key for safe HC acquisition retries. The driver validates the character set and never logs the value. |
| `EnvironmentId` | String | None | Specifies the Fabric environment identifier sent as `spark.fabric.environmentDetails` in the HC acquisition configuration. |
| `HeartbeatTimeoutInSecond` | Integer | Server default | Sets the server-side HC session idle timeout, in seconds. The value must be a positive integer. |
| `AcquireTimeoutSeconds` | Integer | `300` | Sets how long the driver waits for an HC session to reach the `Idle` state, in seconds. The value must be a positive integer. |
| `conf.<key>` | String | None | Specifies a Spark configuration override sent in the HC acquisition request. For example, `conf.spark.sql.shuffle.partitions=200`. |

**Mode precedence and validation**

- `LivyMode` takes precedence over `UseHighConcurrency` when you set both parameters.
- Parameter values aren't case-sensitive.
- `UseHighConcurrency` accepts `true`, `1`, `yes`, or `on` to enable HC mode. It accepts `false`, `0`, `no`, or `off` to disable HC mode.
- For other nonempty values, `SQLDriverConnect` returns an error. DSN-only `SQLConnect` logs the validation failure and uses the classic path.

**Compatibility settings**

The driver accepts `TenantPrincipal` and `PoolMax`, including their environment-variable fallbacks, for compatibility with earlier HC configurations. The driver parses and validates these values, but they don't affect HC session matching or runtime pool capacity. Don't rely on them for tenant isolation or connection limits.

**Environment-variable fallbacks**

The driver uses the following environment variables only when the corresponding DSN or connection-string parameter isn't set:

| Environment variable | Maps to |
|----------------------|---------|
| `FABRIC_ODBC_USE_HC` | `UseHighConcurrency` |
| `FABRIC_ODBC_WORKSPACE_ID` | `WorkspaceId` |
| `FABRIC_ODBC_LAKEHOUSE_ID` | `LakehouseId` |
| `FABRIC_ODBC_ENVIRONMENT_ID` | `EnvironmentId` |
| `FABRIC_ODBC_SESSION_TAG` | `SessionTag` |
| `FABRIC_ODBC_TENANT_PRINCIPAL` | `TenantPrincipal` (compatibility only) |
| `FABRIC_ODBC_HC_HEARTBEAT_SECONDS` | `HeartbeatTimeoutInSecond` |
| `FABRIC_ODBC_HC_ACQUIRE_TIMEOUT` | `AcquireTimeoutSeconds` |
| `FABRIC_ODBC_HC_POOL_MAX` | `PoolMax` (compatibility only) |

For `FABRIC_ODBC_USE_HC`, environment-only enablement recognizes `true`, `1`, or `yes` (case-insensitive). Other values leave HC disabled. The `on` and `off` aliases apply only to DSN and connection-string values.

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


## High-concurrency (HC) mode

High-concurrency (HC) mode lets ODBC connections to the same workspace and lakehouse attach to shared, warm server-side Livy Spark sessions instead of provisioning a separate cluster for each connection. Use it for workloads such as BI dashboards, notebook kernels, and ETL fan-out that open many short-lived connections and can share server-managed Spark capacity.

HC mode is opt-in. If you don't configure an HC setting, the driver uses the classic single-session path.


### Choose a connection mode

**Use HC mode when:**

- Your workload opens many short-lived ODBC connections, such as BI dashboards, notebook kernels, or ETL fan-out.
- Connections target the same workspace and lakehouse and can share a server-managed Spark session.
- Reducing per-connection cold-start latency is important.

**Use classic mode when:**

- Each connection requires an isolated Spark session because of different Spark configurations or strict resource isolation.
- The Fabric Livy endpoint for the target workspace and lakehouse doesn't support HC mode.

### Enable high-concurrency mode

Add a high-concurrency mode parameter to the DSN or connection string.

**Recommended: Set `LivyMode`**

Use `LivyMode` to select the session-acquisition mode explicitly:

```ini
LivyMode=HighConcurrency
```

Supported values are `Classic`, `HighConcurrency`, and `Auto`. Values aren't case-sensitive. `Auto` currently selects classic mode.

**Alternative: Set `UseHighConcurrency`**

Use the Boolean setting for compatibility with existing configurations:

```ini
UseHighConcurrency=true
```

To enable high-concurrency mode, use `true`, `1`, `yes`, or `on`. To disable it, use `false`, `0`, `no`, or `off`. Values aren't case-sensitive. `SQLDriverConnect` rejects other nonempty values with SQLSTATE `HY024`. DSN-only `SQLConnect` logs the validation failure and uses classic mode.

> [!NOTE]
> If you set both parameters, `LivyMode` takes precedence over `UseHighConcurrency`.

### Required parameters in HC mode

HC activation requires the following valid identifiers:

| Parameter | Notes |
|-----------|-------|
| `WorkspaceId` | Must be a valid Fabric workspace GUID. |
| `LakehouseId` | Must be a valid Fabric lakehouse GUID. |

Include `SessionTag` because it influences server-side matching for warm sessions.

### Session matching

HC mode doesn't guarantee that every connection reuses an existing session. For each session-acquisition request, the driver sends:

- The `SessionTag` value.
- The effective Spark configuration, including `conf.*` settings and `EnvironmentId`.

The Fabric Livy service evaluates these values and decides whether to attach the connection to a warm session or create a new session. To improve session reuse, use consistent values across connections that are intended to share server-managed Spark capacity.

### Example connection strings

**Minimal HC connection (Azure CLI auth):**

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;SessionTag=bi-dashboard
```

**HC with tuned timeouts:**

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;SessionTag=etl-prod;AcquireTimeoutSeconds=180;HeartbeatTimeoutInSecond=600
```

**HC with an environment and Spark conf overrides:**

```
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;EnvironmentId=<environment-id>;SessionTag=ml-team;conf.spark.sql.shuffle.partitions=200;conf.spark.executor.memory=8g
```

**Python (`pyodbc`):**

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=AZURE_CLI;"
    "LivyMode=HighConcurrency;"
    "SessionTag=notebook-kernel"
)
```

### Configure HC mode in a DSN

You can store HC settings in a DSN instead of repeating them in each connection string. When a connection string doesn't specify a value, the driver reads these settings from the DSN:

- `LivyMode`
- `UseHighConcurrency`
- `EnvironmentId`
- `SessionTag`
- `IdempotencyKey`
- `HeartbeatTimeoutInSecond`
- `AcquireTimeoutSeconds`

The driver also reads the compatibility-only `TenantPrincipal` and `PoolMax` settings. To save these settings, edit the DSN in `odbcad32.exe` or use `SQLWritePrivateProfileString`. Use the parameter names in the [HC settings table](#high-concurrency-hc-settings).

> [!IMPORTANT]
> The driver doesn't read `conf.*` Spark configuration overrides from the DSN. Add them to the connection string at runtime or inject them before calling `SQLDriverConnect`.

### Disable HC mode

You can disable new HC session acquisitions without redeploying the driver. Use the method that corresponds to how you enabled HC mode:

| HC configuration source | How to disable HC mode |
|-------------------------|------------------------|
| Environment variable only | Set `FABRIC_ODBC_USE_HC=false`, or remove the variable. |
| DSN | Set `LivyMode=Classic`. Alternatively, remove `LivyMode` and set `UseHighConcurrency=false`. |
| Connection string | Set `LivyMode=Classic`, or remove the HC parameters. |

Connection-string and DSN settings take precedence over the environment-variable fallback. These changes affect only new connections. Existing HC sessions continue until they're released.

### Understand HC runtime behavior

- **Validation:** `SQLDriverConnect` rejects invalid HC Boolean and positive-integer values with SQLSTATE `HY024`. It rejects an invalid `LivyMode` and invalid or oversized `WorkspaceId`, `LakehouseId`, and `IdempotencyKey` values with SQLSTATE `HY000`. An oversized compatibility `TenantPrincipal` value also returns `HY000`. For DSN-only `SQLConnect`, the driver logs ordinary HC validation failures and uses classic mode. Oversized security-sensitive values still fail the connection.
- **Sensitive data:** The driver excludes or scrubs `IdempotencyKey` and other sensitive fields from HC logs and diagnostic output.
- **Cancellation:** Statement cancellation is cooperative. Server work already in progress winds down cleanly instead of being terminated immediately.
- **Circuit breakers:** HC and classic modes use separate circuit breakers. Exhausting one mode doesn't affect the other.
- **Initial database:** HC connections don't execute the initial `USE` statement for the `Database` parameter. Run `USE <database>` after connecting or use fully qualified table names.
- **Diagnostics:** Set `LogLevel=DEBUG` to log HC acquisition, polling, release, and error-mapping decisions. For focused troubleshooting, set `LIVY_HC_VERBOSE=1` to include additional scrubbed HC HTTP diagnostics.


## Configure a DSN

### Create a system DSN

1. **Open ODBC Administrator**
   ```cmd
   %SystemRoot%\System32\odbcad32.exe
   ```

1. **Create New System DSN**
   - Go to "System DSN" tab
   - Select "Add"
   - Select "Microsoft ODBC Driver for Microsoft Fabric Data Engineering"
   - Select "Finish"

1. **Configure DSN Settings**
   - **Data Source Name**: Enter a unique name (e.g., `FabricODBC`)
   - **Description**: Optional description
   - **Workspace ID**: Your Fabric workspace GUID
   - **Lakehouse ID**: Your Fabric lakehouse GUID
   - **Authentication**: Select authentication method
   - **Environment ID** (optional): Enter the GUID of the Fabric environment item to attach during session creation
   - **Livy mode** (optional): Set to `HighConcurrency` to enable HC mode
   - **Session tag** (optional): Enter a non-sensitive operational label for HC session matching
   - Configure additional settings as needed

1. **Test Connection**
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

### Execute DML statements

```cpp
bool executeDml(SQLHDBC connection, const char* sql, const char* description) {
    SQLHSTMT statement = SQL_NULL_HSTMT;
    SQLAllocHandle(SQL_HANDLE_STMT, connection, &statement);

    std::cout << "Executing: " << description << std::endl;
    SQLRETURN result = SQLExecDirectA(
        statement,
        (SQLCHAR*)sql,
        SQL_NTS);

    bool succeeded = SQL_SUCCEEDED(result);
    if (succeeded) {
        SQLLEN rowCount;
        SQLRowCount(statement, &rowCount);
        std::cout << "Rows affected: " << rowCount << std::endl;
    }

    SQLFreeHandle(SQL_HANDLE_STMT, statement);
    return succeeded;
}
```

Use `executeDml` with `INSERT`, `UPDATE`, or `DELETE` statements. The reported row count depends on whether the result contains an update count recognized by the driver.

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
| BINARY | SQL_VARBINARY | SQLCHAR* | bytes | byte[] |
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

**Problem**: Can't connect to Fabric

**Solutions**:
1. Verify workspace ID and lakehouse ID are correct GUIDs
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
- `DEBUG`: Detailed debugging information and the most verbose driver log level
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

* [Microsoft ODBC Driver for Microsoft Fabric Data Engineering on Linux](./spark-odbc-driver-linux.md)
* [Apache Spark Runtimes in Fabric](./runtime.md)
* [Fabric Runtime 1.3](./runtime-1-3.md)
* [What is the Livy API for Data Engineering](./api-livy-overview.md)
* [Microsoft JDBC Driver for Microsoft Fabric Data Engineering](./spark-jdbc-driver.md)
