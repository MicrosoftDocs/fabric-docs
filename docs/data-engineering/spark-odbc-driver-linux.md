---
title: Microsoft ODBC Driver for Microsoft Fabric Data Engineering on Linux
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric on Linux using the Microsoft ODBC Driver for Microsoft Fabric Data Engineering.
author: avinandac
ms.reviewer: avinandac
ms.topic: how-to
ms.date: 09/29/2026
ai-usage: ai-assisted
---

# Microsoft ODBC driver for Microsoft Fabric Data Engineering on Linux

ODBC (Open Database Connectivity) is a widely adopted standard that enables client applications to connect to and work with data from databases and big data platforms.

The Microsoft ODBC Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Fabric with the reliability and simplicity of the ODBC standard. Built on Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your C/C++, .NET, Python, and other ODBC-compatible applications on Linux.

## Key features

- **ODBC 3.x compliant**: Full implementation of the ODBC 3.x specification.
- **Microsoft Entra ID authentication**: Multiple authentication flows, including Azure CLI, client credentials, certificate-based, and access token authentication.
- **Spark SQL query support**: Direct execution of Spark SQL statements.
- **Comprehensive data type support**: Support for all Spark SQL data types, including complex types (`ARRAY`, `MAP`, and `STRUCT`).
- **Session reuse**: Built-in session management for improved performance.
- **High-concurrency mode**: Opt in to shared, warm server-side Livy sessions to reduce connection startup latency and Spark cluster sprawl.
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
- **libcurl**: The HTTP runtime dependency, such as `libcurl4` or the equivalent package for your distribution.
- **OpenSSL**: The TLS and cryptography runtime dependency, such as `openssl` and `libssl3` or equivalent packages.
- **Fabric access**: Access to a Fabric workspace.
- **Microsoft Entra ID credentials**: Appropriate credentials for authentication.
- **Workspace and lakehouse IDs**: The GUID identifiers for your Fabric workspace and lakehouse.
- **Azure CLI** (optional): Required when you use Azure CLI authentication.

## Download and install on Linux

* [Download Microsoft ODBC Driver for Microsoft Fabric Data Engineering on Linux (tar)](https://download.microsoft.com/download/681e0870-8a4a-4dad-8c59-6b2d26357bf5/ms-sparksql-odbc-linux-2.0.0.tar)

To install the driver:

1. Extract `ms-sparksql-odbc-linux-2.0.0.tar`.
1. Open a terminal in the extracted directory.
1. Install the Debian package:

   ```bash
   sudo dpkg -i microsoft-fabric-odbc-driver-2.0.0-Linux.deb
   ```

The package installs the following files:

| File | Installed location |
|------|--------------------|
| Driver library | `/usr/lib/libmicrosoftfabricodbc.so` |
| Driver registration template | `/usr/share/microsoft-fabric-odbc-driver/odbcinst.ini.template` |
| DSN configuration template | `/usr/share/microsoft-fabric-odbc-driver/odbc.ini.template` |
| License | `/usr/share/doc/microsoft-fabric-odbc-driver/LICENSE` |
| Usage guide | `/usr/share/doc/microsoft-fabric-odbc-driver/USAGE_Linux.md` |

### Install an RPM package

On RHEL, Fedora, or CentOS, install the RPM package from the extracted driver archive:

```bash
sudo dnf install ./microsoft-fabric-odbc-driver-*.x86_64.rpm
```

Alternatively, use `rpm`:

```bash
sudo rpm -i microsoft-fabric-odbc-driver-*.x86_64.rpm
```

Verify that the RPM registered the driver:

```bash
odbcinst -q -d | grep "Microsoft"
```

To uninstall the RPM package, run:

```bash
sudo dnf remove microsoft-fabric-odbc-driver
```

### Install a tarball

For distributions without Debian or RPM package support, or for a custom installation location, extract the `.tar.gz` package and run its installation script:

```bash
tar -xzf microsoft-fabric-odbc-driver-2.0.0-linux-x86_64.tar.gz
cd microsoft-fabric-odbc-driver-2.0.0

# Install to /opt/microsoft/fabricodbc.
sudo ./install.sh

# Or install to a custom writable location.
./install.sh --prefix=$HOME/fabricodbc
```

The installation script supports these options:

| Option | Description |
|--------|-------------|
| `--prefix=<path>` | Install to a custom directory. The default is `/opt/microsoft/fabricodbc`. |
| `--no-register` | Skip unixODBC driver registration. |
| `--dry-run` | Show the planned changes without installing files. |
| `--uninstall` | Remove the installed files and unregister the driver. |
| `--help` | Show command help. |

To verify the default tarball installation, run:

```bash
odbcinst -q -d
ls -la /opt/microsoft/fabricodbc/lib/libmicrosoftfabricodbc.so
```

To uninstall it, run `sudo ./install.sh --uninstall` from the extracted package directory.

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

#### Connection with high-concurrency mode

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;SessionTag=bi-dashboard
```

For complete configuration guidance, see [High-concurrency (HC) mode](#high-concurrency-hc-mode).

## Authentication

The Microsoft ODBC Driver for Microsoft Fabric Data Engineering supports multiple authentication methods through Microsoft Entra ID. Configure authentication by using the `AuthFlow` parameter in the connection string or DSN.

### Authentication methods

| `AuthFlow` value | Description |
|------------------|-------------|
| `AZURE_CLI` | Development using Azure CLI credentials |
| `CLIENT_CREDENTIAL` | Service principal with a client secret |
| `CLIENT_CERTIFICATE` | Service principal with a certificate |
| `ACCESS_TOKEN` | Pre-acquired bearer access token |
| `FILE_TOKEN` | Reads an authentication token from a file |

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

### File token authentication

Use file token authentication in containerized environments and automated pipelines where another process writes a bearer token to the driver's well-known token file:

```python
connection_string = (
    "DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};"
    "WorkspaceId=<workspace-id>;"
    "LakehouseId=<lakehouse-id>;"
    "AuthFlow=FILE_TOKEN;"
)
```

For supported cross-driver property aliases, see [Cross-driver property aliases](spark-odbc-driver.md#cross-driver-property-aliases).

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
| `Database` | String | None | Initial database for classic mode. HC mode doesn't apply it automatically; run `USE <database>` after connecting or use fully qualified table names. |
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
| `LogLevel` | String | `INFO` | Log level: `DEBUG`, `INFO`, `WARN`, or `ERROR`. Use `DEBUG` for detailed driver diagnostics. |
| `LogFile` | String | `odbc_driver.log` | Absolute or relative log file path |

#### Proxy settings

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `UseProxy` | Boolean | `false` | Enable a proxy |
| `ProxyHost` | String | None | Proxy host name |
| `ProxyPort` | Integer | None | Proxy port |
| `ProxyUsername` | String | None | Proxy authentication user name |
| `ProxyPassword` | String | None | Proxy authentication password |

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

**Environment variable fallbacks**

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

For `FABRIC_ODBC_USE_HC`, environment-only enablement recognizes `true`, `1`, or `yes` (case-insensitive). Other values leave HC mode disabled. The `on` and `off` aliases apply only to DSN and connection-string values.

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

You can also enable high-concurrency mode for the current shell by using environment variables:

```bash
export FABRIC_ODBC_USE_HC=true
export FABRIC_ODBC_WORKSPACE_ID=<workspace-id>
export FABRIC_ODBC_LAKEHOUSE_ID=<lakehouse-id>
export FABRIC_ODBC_SESSION_TAG=bi-dashboard
```

### Required parameters in HC mode

HC activation requires the following valid identifiers:

| Parameter | Notes |
|-----------|-------|
| `WorkspaceId` | Must be a valid Fabric workspace GUID. |
| `LakehouseId` | Must be a valid Fabric lakehouse GUID. |

`SessionTag` is strongly recommended because it influences server-side matching for warm sessions.

### Session matching

HC mode doesn't guarantee that every connection reuses an existing session. For each session-acquisition request, the driver sends:

- The `SessionTag` value.
- The effective Spark configuration, including `conf.*` settings and `EnvironmentId`.

The Fabric Livy service evaluates these values and decides whether to attach the connection to a warm session or create a new session. To improve session reuse, use consistent values across connections that are intended to share server-managed Spark capacity.

### Example connection strings

**Minimal HC connection with Azure CLI authentication:**

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;SessionTag=bi-dashboard
```

**HC connection with tuned timeouts:**

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;SessionTag=etl-prod;AcquireTimeoutSeconds=180;HeartbeatTimeoutInSecond=600
```

**HC connection with an environment and Spark configuration overrides:**

```text
DRIVER={Microsoft ODBC Driver for Microsoft Fabric Data Engineering};WorkspaceId=<workspace-id>;LakehouseId=<lakehouse-id>;AuthFlow=AZURE_CLI;LivyMode=HighConcurrency;EnvironmentId=<environment-id>;SessionTag=ml-team;conf.spark.sql.shuffle.partitions=200;conf.spark.executor.memory=8g
```

**Python with `pyodbc`:**

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

### Configure HC mode in a Linux DSN

You can store HC settings in `~/.odbc.ini` for a user-specific DSN or `/etc/odbc.ini` for a system-wide DSN instead of repeating them in each connection string:

```ini
[FabricHCDSN]
Description               = Microsoft Fabric Data Engineering with HC mode
Driver                    = Microsoft ODBC Driver for Microsoft Fabric Data Engineering
WorkspaceId               = <workspace-id>
LakehouseId               = <lakehouse-id>
AuthFlow                  = AZURE_CLI
LivyMode                  = HighConcurrency
SessionTag                = bi-dashboard
AcquireTimeoutSeconds     = 300
HeartbeatTimeoutInSecond  = 600
```

After you save the DSN, verify it and test the connection:

```bash
odbcinst -q -s
isql -k -v "DSN=FabricHCDSN;"
```

When a connection string doesn't specify a value, the driver reads these settings from the DSN:

- `LivyMode`
- `UseHighConcurrency`
- `EnvironmentId`
- `SessionTag`
- `IdempotencyKey`
- `HeartbeatTimeoutInSecond`
- `AcquireTimeoutSeconds`

The driver also reads the compatibility-only `TenantPrincipal` and `PoolMax` settings. Use the parameter names in the [HC settings table](#high-concurrency-hc-settings).

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

- **Validation:** `SQLDriverConnect` rejects invalid HC Boolean and positive-integer values with SQLSTATE `HY024`. It rejects an invalid `LivyMode` and invalid or oversized `WorkspaceId`, `LakehouseId`, and `IdempotencyKey` values with SQLSTATE `HY000`. An oversized compatibility `TenantPrincipal` value also returns `HY000`. For DSN-only `SQLConnect`, ordinary HC validation failures are logged and the driver uses classic mode. Oversized security-sensitive values still fail the connection.
- **Sensitive data:** The driver excludes or scrubs `IdempotencyKey` and other sensitive fields from HC logs and diagnostic output.
- **Cancellation:** Statement cancellation is cooperative. Server work already in progress winds down cleanly instead of being terminated immediately.
- **Circuit breakers:** HC and classic modes use separate circuit breakers. Exhausting one mode doesn't affect the other.
- **Initial database:** HC connections don't execute the initial `USE` statement for the `Database` parameter. Run `USE <database>` after connecting or use fully qualified table names.
- **Diagnostics:** Set `LogLevel=DEBUG` to log HC acquisition, polling, release, and error-mapping decisions. For focused troubleshooting, set `LIVY_HC_VERBOSE=1` to include additional scrubbed HC HTTP diagnostics.

## DSN configuration

On Linux, configure data source names (DSNs) in INI files instead of the Windows registry.

| File | Scope | Access |
|------|-------|--------|
| `/etc/odbc.ini` | System-wide DSNs | Requires `sudo` |
| `~/.odbc.ini` | User-specific DSNs | Current user only |

### Create a DSN

If `~/.odbc.ini` exists, add the new DSN section without replacing the existing file. Copy the installed template only when you create the file:

```bash
if [ -e "$HOME/.odbc.ini" ]; then
    echo "Preserve ~/.odbc.ini and add the new DSN section manually."
else
    cp /usr/share/microsoft-fabric-odbc-driver/odbc.ini.template "$HOME/.odbc.ini"
fi
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
isql -k -v "DSN=FabricDSN;"
```

The `isql` command requires the unixODBC command-line tools. The `-k` option uses `SQLDriverConnect`, which lets the driver process DSN connection attributes.

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
isql -k -v "DSN=FabricDSN;"
```

Run a single query:

```bash
echo "SELECT 1 AS test" | isql -k -v "DSN=FabricDSN;" -b
```

Use `-k` for Fabric DSNs so `isql` connects through `SQLDriverConnect` instead of `SQLConnect`.

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
| `BINARY` | `SQL_VARBINARY` | `SQLCHAR*` | `bytes` | `byte[]` |
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
| Packaging | MSI installer | `.deb`, `.rpm`, or `.tar.gz` package |

## Troubleshooting

### Driver not found

**Problem**: The connection fails with `[IM002] Data source name not found and no default driver specified`.

**Solutions**:

1. Verify the driver registration by running `odbcinst -q -d`.
1. Verify that `/usr/lib/libmicrosoftfabricodbc.so` exists.
1. Register the driver by running `sudo odbcinst -i -d -f /usr/share/microsoft-fabric-odbc-driver/odbcinst.ini.template`.
1. Reinstall the package by running `sudo dpkg -i microsoft-fabric-odbc-driver-2.0.0-Linux.deb`.

### Driver not found after a tarball installation

**Problem**: The driver is registered, but the shared library isn't present at the registered path.

**Solutions**:

1. Verify that `/opt/microsoft/fabricodbc/lib/libmicrosoftfabricodbc.so` exists.
1. Rerun `sudo ./install.sh --prefix=/opt/microsoft/fabricodbc`.
1. If you used a custom prefix, verify that the registered driver path uses the same prefix.

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

1. Reinstall the package by running `sudo dpkg -i microsoft-fabric-odbc-driver-2.0.0-Linux.deb`.
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

- `DEBUG`: Includes detailed debugging information and is the most verbose driver log level.
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
