---
title: Microsoft JDBC Driver for Microsoft Fabric Data Engineering
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric using the Microsoft JDBC Driver for Microsoft Fabric Data Engineering.
ms.reviewer: arali
ms.topic: how-to
ms.date: 09/22/2026
ai-usage: ai-assisted
---

# Microsoft JDBC driver for Microsoft Fabric Data Engineering

JDBC (Java Database Connectivity) is a widely adopted standard that enables client applications to connect to and work with data from databases and big data platforms.

The Microsoft JDBC Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Fabric with the reliability and simplicity of the JDBC standard. Built on Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your Java applications and BI tools. This integration allows you to submit and execute Spark code directly without needing to create separate notebook or Spark job definition items. The driver is compatible with popular JDBC clients such as DbVisualizer and DBeaver, as well as BI tools that support JDBC connectivity, including Tableau.

## Key Features

- **JDBC 4.2 APIs**: Implements JDBC 4.2 APIs for Spark SQL connectivity, with Spark and Livy limitations such as no JDBC transactions and forward-only, read-only result sets
- **Microsoft Entra ID Authentication**: Multiple authentication flows including interactive, client credentials, and certificate-based authentication
- **High-concurrency sessions**: Opt-in Fabric session sharing for concurrent workloads
- **Explicit connection pooling**: Choose HikariCP, a standard pool manager, or `LivyBuiltInPooledDataSource`; direct entry points never pool
- **Spark SQL Native Query Support**: Direct execution of Spark SQL statements without translation
- **Comprehensive Data Type Support**: Support for all Spark SQL data types including complex types (ARRAY, MAP, STRUCT)
- **Asynchronous Result Set Prefetching**: Background data loading for improved performance
- **Circuit Breaker Pattern**: Protection against cascading failures with automatic retry
- **Auto-Reconnection**: Transparent session recovery on connection failures
- **Advanced Retry Logic**: Retry with exponential backoff and session recovery for improved resilience
- **Proxy Support**: HTTP and SOCKS proxy configuration for enterprise environments

## Prerequisites

Before using the Microsoft JDBC Driver for Fabric Data Engineering, ensure you have:

- **Java Development Kit (JDK)**: Java 11, 17, and 21 (Java 21 recommended)
- **Fabric Access**: Access to a Fabric workspace
- **Microsoft Entra ID credentials**: Appropriate credentials for authentication
- **Workspace and Lakehouse IDs**: GUID identifiers for your Fabric workspace and lakehouse

## Download and Installation

Microsoft JDBC Driver for Fabric Data Engineering version 2.0.0 supports Java 11, 17, and 21. We recommend that you use the latest available version.

* [Download Microsoft JDBC Driver for Fabric Data Engineering (zip)](https://download.microsoft.com/download/30b58e33-0ac2-40ae-a764-da8d2c79f672/ms-sparksql-jdbc-2.0.0.zip)
* [Download Microsoft JDBC Driver for Fabric Data Engineering (tar)](https://download.microsoft.com/download/30b58e33-0ac2-40ae-a764-da8d2c79f672/ms-sparksql-jdbc-2.0.0.tar)

1. Download either the zip or tar file from the links above.
1. Extract the downloaded file to access the driver JAR files.
1. Select the JAR file that matches your JRE version:
   - For Java 11: `ms-sparksql-jdbc-2.0.0.jre11.jar`
   - For Java 17: `ms-sparksql-jdbc-2.0.0.jre17.jar`
   - For Java 21: `ms-sparksql-jdbc-2.0.0.jre21.jar`
1. Add the selected JAR file to your application's classpath.
1. For JDBC clients, configure the JDBC driver class: `com.microsoft.spark.livy.jdbc.LivyDriver`

## Quick Start Example

This example demonstrates how to connect to Fabric and execute a query using the Microsoft JDBC Driver for Fabric Data Engineering. Before running this code, ensure you have completed the prerequisites and installed the driver. With `AuthFlow=2`, the driver uses `DefaultAzureCredential`. To use Azure CLI as the credential source, install Azure CLI and run `az login`.

```java
import java.sql.*;

public class QuickStartExample {
    public static void main(String[] args) {
        // Connection string with required parameters
        String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
                     "FabricWorkspaceID=<workspace-id>;" +
                     "FabricLakehouseID=<lakehouse-id>;" +
                     "AuthFlow=2;" +  // DefaultAzureCredential; Azure CLI can be one source
                     "LogLevel=INFO";
        
        try (Connection conn = DriverManager.getConnection(url)) {
            // Execute a simple query
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT 'Hello from Fabric!' as message")) {
                
                if (rs.next()) {
                    System.out.println(rs.getString("message"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

## Connection String Format

### Basic Connection String

The Microsoft JDBC Driver for Fabric Data Engineering uses the following connection string format:

```
jdbc:fabricspark://<hostname>[:<port>][;<parameter1>=<value1>;<parameter2>=<value2>;...]
```

### Connection String Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Protocol** | JDBC URL protocol identifier | `jdbc:fabricspark://` |
| **Hostname** | Fabric endpoint hostname | `api.fabric.microsoft.com` |
| **Port** | Optional port number (default: 443) | `:443` |
| **Parameters** | Semicolon-separated key=value pairs | `FabricWorkspaceID=<guid>` |

### Example Connection Strings

#### Basic Connection (Interactive Browser Based Authentication)
```
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=1
```

#### With Spark Resource Configuration
```
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;DriverCores=4;DriverMemory=4g;ExecutorCores=4;ExecutorMemory=8g;NumExecutors=2;AuthFlow=2
```

#### With Spark Session Properties
```
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;spark.sql.adaptive.enabled=true;spark.sql.shuffle.partitions=200;AuthFlow=2
```

#### With high-concurrency mode

High-concurrency (HC) mode is available for Microsoft Fabric connections in driver version 1.1.0 and later. Add `hcEnabled=true` to acquire an HC session instead of a classic Livy session:

```
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=2;hcEnabled=true
```

You can optionally identify the workload with a session tag and select a Fabric environment:

```
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=2;hcEnabled=true;sessionTag=orders_etl;FabricEnvironmentID=<environment-id>
```

HC mode is opt-in. If `hcEnabled` is omitted or set to `false`, the driver uses the classic Livy session path.

See the [High-Concurrency (HC) Mode](#high-concurrency-hc-mode) section for full configuration guidance.

---

## Authentication

The Microsoft JDBC Driver for Fabric Data Engineering supports multiple authentication methods through Microsoft Entra ID (formerly Azure Active Directory). Authentication is configured using the `AuthFlow` parameter in the connection string.

### Authentication Flows

| AuthFlow | Authentication Method | Use Case |
|----------|----------------------|----------|
| **1** | Interactive Browser | Interactive user authentication using OAuth 2.0|
| **2** | Default Azure credential chain | Development and managed application authentication; Azure CLI can be one credential source |
| **3** | Client Secret Credentials (Service Principal) | Automated/service-to-service authentication |
| **4** | Client Certificate Credential | Certificate-based service principal authentication |
| **5** | Access Token | Pre-acquired bearer access token |

### Interactive Browser Authentication

Best for: **Development and interactive applications**

```java
String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
             "FabricWorkspaceID=<workspace-id>;" +
             "FabricLakehouseID=<lakehouse-id>;" +
             "AuthFlow=1;" +
             "LogLevel=INFO";

Connection conn = DriverManager.getConnection(url);
```

**Parameters:**
- `AuthFlow=1`: Specifies interactive browser authentication

**Behavior:**
- Opens a browser window for user authentication
- Credentials are cached for subsequent connections until they expire
- Suitable for single-user applications

### Client Credentials or Service Principal Authentication

Best for: **Automated services and background jobs**

```java
String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
             "FabricWorkspaceID=<workspace-id>;" +
             "FabricLakehouseID=<lakehouse-id>;" +
             "AuthFlow=3;" +  
             "AuthClientID=<client-id>;" +
             "AuthClientSecret=<client-secret>;" +
             "AuthTenantID=<tenant-id>;" +
             "LogLevel=INFO";

Connection conn = DriverManager.getConnection(url);
```

**Required Parameters:**
- `AuthFlow=3`: Specifies client credentials authentication
- `AuthClientID`: Application (client) ID from Microsoft Entra ID
- `AuthClientSecret`: Client secret from Microsoft Entra ID
- `AuthTenantID`: Microsoft Entra tenant ID

**Best Practices:**
- Store secrets securely (Azure Key Vault, environment variables)
- Use managed identities when possible
- Rotate secrets regularly

### Certificate-Based Authentication

Best for: **Enterprise applications requiring certificate-based authentication**

```java
String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
             "FabricWorkspaceID=<workspace-id>;" +
             "FabricLakehouseID=<lakehouse-id>;" +
             "AuthFlow=4;" +  
             "AuthClientID=<client-id>;" +
             "AuthCertificatePath=/path/to/certificate.pem;" +
             "AuthCertificatePassword=<certificate-password>;" +
             "AuthTenantID=<tenant-id>;" +
             "LogLevel=INFO";

Connection conn = DriverManager.getConnection(url);
```

**Required Parameters:**
- `AuthFlow=4`: Specifies certificate-based authentication
- `AuthClientID`: Application (client) ID
- `AuthCertificatePath`: Path to a PEM certificate file
- `AuthCertificatePassword`: Certificate password
- `AuthTenantID`: Microsoft Entra tenant ID

### Access Token Authentication

Best for: **Custom authentication scenarios**

```java
// Acquire token through custom mechanism
String accessToken = acquireTokenFromCustomSource();

String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
             "FabricWorkspaceID=<workspace-id>;" +
             "FabricLakehouseID=<lakehouse-id>;" +
             "AuthFlow=5;" +  // Access token authentication
             "AuthAccessToken=" + accessToken + ";" +
             "LogLevel=INFO";

Connection conn = DriverManager.getConnection(url);
```

### Authentication caching

The driver caches authentication tokens and refreshes them based on token expiration. The parsed `AuthEnableCaching` and `AuthCacheTTLMS` properties don't control this behavior in version 2.0.0.
---

## Configuration Parameters

### Required Parameters

These parameters must be present in every connection string:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `FabricWorkspaceID` | UUID | Fabric workspace identifier | `<workspace-id>` |
| `FabricLakehouseID` | UUID | Fabric lakehouse identifier | `<lakehouse-id>` |
| `AuthFlow` | Integer | Authentication flow type (1-5) | `2` |

### Optional Parameters

#### API Version Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `FabricVersion` | String | `v1` | Fabric API version |
| `LivyApiVersion` | String | `2023-12-01` | Livy API version |

#### Environment Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `FabricEnvironmentID` | UUID | None | Fabric environment identifier for referencing environment item for Spark session |

### High-concurrency session configuration

Set `hcEnabled=true` to use HC mode. The remaining HC properties are used only when HC mode is enabled.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `hcEnabled` | Boolean | `false` | Uses a Fabric high-concurrency session. |
| `sessionTag` | String | None | Optional server-side session tag. Use 1 through 64 letters, digits, underscores, or hyphens. |
| `hcAcquireTimeoutSeconds` | Integer | `300` | Maximum time to wait for the HC session to become ready. Valid values range from 120 through 3,600 seconds. |
| `hcAcquirePollingIntervalMs` | Integer | `1000` | Interval between HC session status checks. Accepted values range from 50 through 30,000 milliseconds and are clamped at runtime to 100 through 5,000 milliseconds. |

**Example:**

```
hcEnabled=true;sessionTag=interactive_reporting;hcAcquireTimeoutSeconds=600;hcAcquirePollingIntervalMs=2000;FabricEnvironmentID=<environment-id>
```

- `FabricEnvironmentID` applies to both HC and classic sessions
- `EnvironmentID` is also accepted as a cross-driver alias. Property names are case-insensitive.

> [!IMPORTANT]
> Use `sessionTag` only for non-sensitive operational labels. Don't include secrets, access tokens, personal data, customer identifiers, or query text.

See the [High-Concurrency (HC) Mode](#high-concurrency-hc-mode) section for full configuration guidance.

### Spark Configuration

#### Session Resource Configuration

Configure Spark session resources for optimal performance:

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| `DriverCores` | Integer | Spark default | Number of CPU cores for driver | `4` |
| `DriverMemory` | String | Spark default | Memory allocation for driver | `4g` |
| `ExecutorCores` | Integer | Spark default | Number of CPU cores per executor | `4` |
| `ExecutorMemory` | String | Spark default | Memory allocation per executor | `8g` |
| `NumExecutors` | Integer | Spark default | Number of executors | `2` |
| `SessionName` | String | Auto-generated | Custom session name | `MySparkSession` |

**Example:**
```
DriverCores=4;DriverMemory=4g;ExecutorCores=4;ExecutorMemory=8g;NumExecutors=2; SessionName=MySparkSession
```

#### Custom Spark Session Properties

Any parameter with the prefix `spark.` is automatically applied to the Spark session:

**Example Spark Configurations:**
```
spark.sql.adaptive.enabled=true
spark.sql.adaptive.coalescePartitions.enabled=true
spark.sql.shuffle.partitions=200
spark.sql.autoBroadcastJoinThreshold=10485760
spark.dynamicAllocation.enabled=true
spark.dynamicAllocation.minExecutors=1
spark.dynamicAllocation.maxExecutors=10
spark.executor.memoryOverhead=1g
```

**Native Execution Engine (NEE):**
```
spark.nee.enabled=true
```

**Complete Example:**
```
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<guid>;FabricLakehouseID=<guid>;DriverMemory=4g;ExecutorMemory=8g;NumExecutors=2;spark.sql.adaptive.enabled=true;spark.nee.enabled=true;AuthFlow=2
```

### HTTP client connection settings

Configure the driver's HTTP transport connections for optimal network performance. These settings don't configure or manage JDBC connection pooling:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `HttpMaxTotalConnections` | Integer | 100 | Maximum total HTTP connections |
| `HttpMaxConnectionsPerRoute` | Integer | 20 | Maximum connections per route |
| `HttpConnectionTimeoutInSeconds` | Integer | 30 | Connection timeout |
| `HttpSocketTimeoutInSeconds` | Integer | 60 | Socket read timeout |
| `HttpReadTimeoutInSeconds` | Integer | 60 | HTTP read timeout |
| `HttpConnectionRequestTimeoutSeconds` | Integer | 10 | Connection request timeout from pool |
| `HttpEnableKeepAlive` | Boolean | true | Enable HTTP keep-alive |
| `HttpKeepAliveTimeoutSeconds` | Integer | 60 | Keep-alive timeout |
| `HttpFollowRedirects` | Boolean | true | Follow HTTP redirects |
| `HttpUseAsyncIO` | Boolean | true | Use asynchronous HTTP I/O |

**Example:**
```
HttpMaxTotalConnections=200;HttpMaxConnectionsPerRoute=100;HttpConnectionTimeoutInSeconds=60
```

### Proxy Configuration

Configure HTTP and SOCKS proxy settings for enterprise environments:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `UseProxy` | Boolean | false | Enable proxy |
| `ProxyTransport` | String | `http` | Proxy transport type (http/tcp) |
| `ProxyHost` | String | None | Proxy hostname |
| `ProxyPort` | Integer | None | Proxy port |
| `ProxyAuthEnabled` | Boolean | false | Enable proxy authentication |
| `ProxyUsername` | String | None | Proxy authentication username |
| `ProxyPassword` | String | None | Proxy authentication password |
| `ProxyAuthScheme` | String | `basic` | Auth scheme (basic/digest/ntlm) |
| `ProxySocksVersion` | Integer | 5 | SOCKS version (4/5) |

**HTTP Proxy Example:**
```
UseProxy=true;ProxyTransport=http;ProxyHost=proxy.company.com;ProxyPort=8080;ProxyAuthEnabled=true;ProxyUsername=user;ProxyPassword=pass
```

**SOCKS Proxy Example:**
```
UseProxy=true;ProxyTransport=tcp;ProxyHost=socks.company.com;ProxyPort=1080;ProxySocksVersion=5
```

### Logging Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `LogLevel` | String | `WARN` | Logging level: TRACE, DEBUG, INFO, WARN, ERROR |

**Example:**
```
LogLevel=DEBUG
```

**Default Log Location:**
```
${user.home}/.microsoft/livy-jdbc-driver/logs/driver.log
```

**Custom Log Configuration:**
Use a custom `log4j2.xml` or `logback.xml` file on your classpath.


## High-concurrency (HC) mode

High-concurrency (HC) mode is designed for JDBC applications that open multiple connections to the same Fabric workspace and lakehouse. Instead of provisioning a separate classic Spark session for every connection, Fabric serves those connections with shared, server-managed Spark capacity.

HC mode can reduce connection startup time, avoid repeated Spark session provisioning, and use available capacity more efficiently for concurrent workloads. Each JDBC connection continues to execute statements through its assigned context within the HC session.

HC mode is opt-in and complements JDBC connection pooling. HC mode manages Fabric Spark sessions on the server, while JDBC connection pooling manages connections in the client application. If you don't enable HC mode, the driver creates a classic Livy session.

### Choose between HC and classic mode

**Use HC mode when:**

- An application service handles concurrent requests that run Spark SQL through multiple JDBC connections.
- A BI or reporting tool opens several connections to the same workspace and lakehouse.
- Parallel ETL tasks or scheduled jobs create bursts of JDBC connections.
- Connections use compatible Spark configurations and can share server-managed Spark capacity.
- Reducing connection startup time and repeated Spark session provisioning is important.

**Use classic mode when:**

- Your application uses only one or a few long-lived JDBC connections.
- Each connection requires a dedicated Spark session for strict workload or resource isolation.
- Connections require substantially different Spark configurations or Fabric environments.
- The Fabric Livy endpoint for the target workspace and lakehouse doesn't support HC mode.

### Enable high-concurrency mode

HC mode is opt-in. If you omit **`hcEnabled`** or set it to false, the driver uses the classic Livy session path. Set **`hcEnabled`** to true to acquire an HC session:

```ini
hcEnabled=true;
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

### Disable HC mode

You can disable new HC session acquisitions without redeploying the driver by setting the HC connection string to false or by removing the HC parameters:

```ini
hcEnabled=false;
```

**Emergency rollbacks:**
For emergency rollback, start the JVM with `-Dcom.microsoft.fabric.jdbc.hc.disable=true`. This JVM-wide switch forces classic mode even when a connection string contains `hcEnabled=true`.

### Understand HC runtime behavior
- HC session acquisition blocks until the session is ready or `hcAcquireTimeoutSeconds` expires.
- Closing a connection while acquisition is in progress interrupts acquisition and triggers best-effort HC session cleanup.
- Authentication, query execution, cancellation, prepared statements, result handling, and `FabricEnvironmentID` work through the standard JDBC interfaces in both modes.


## Usage Examples

### Basic Connection

```java
import java.sql.*;

public class BasicConnectionExample {
    public static void main(String[] args) {
        String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
                     "FabricWorkspaceID=<workspace-id>;" +
                     "FabricLakehouseID=<lakehouse-id>;" +
                     "AuthFlow=2";
        
        try (Connection conn = DriverManager.getConnection(url)) {
            System.out.println("Connected successfully!");
            System.out.println("Database: " + conn.getMetaData().getDatabaseProductName());
            System.out.println("Driver: " + conn.getMetaData().getDriverName());
            System.out.println("Driver Version: " + conn.getMetaData().getDriverVersion());
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

### High-concurrency mode connection

The following example opens a JDBC connection in HC mode, runs a query, and releases the connection automatically:

```java
String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
             "FabricWorkspaceID=<workspace-id>;" +
             "FabricLakehouseID=<lakehouse-id>;" +
             "AuthFlow=2;" +
             "hcEnabled=true;" +
             "sessionTag=dashboard_queries;" +
             "FabricEnvironmentID=<environment-id>";

try (Connection conn = DriverManager.getConnection(url);
     Statement stmt = conn.createStatement();
     ResultSet rs = stmt.executeQuery("SELECT current_timestamp()")) {
    while (rs.next()) {
        System.out.println(rs.getTimestamp(1));
    }
}
```

### Executing Queries

#### Simple Query

```java
public void executeSimpleQuery(Connection conn) throws SQLException {
    String sql = "SELECT current_timestamp() as now";
    
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        
        if (rs.next()) {
            Timestamp now = rs.getTimestamp("now");
            System.out.println("Current timestamp: " + now);
        }
    }
}
```

#### Query with Filter

```java
public void executeQueryWithFilter(Connection conn) throws SQLException {
    String sql = "SELECT * FROM sales WHERE amount > 1000 ORDER BY amount DESC";
    
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        
        while (rs.next()) {
            int id = rs.getInt("id");
            double amount = rs.getDouble("amount");
            Date date = rs.getDate("sale_date");
            
            System.out.printf("ID: %d, Amount: %.2f, Date: %s%n", 
                            id, amount, date);
        }
    }
}
```

#### Query with Limit

```java
public void executeQueryWithLimit(Connection conn) throws SQLException {
    String sql = "SELECT * FROM customers LIMIT 10";
    
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();
        
        // Print column names
        for (int i = 1; i <= columnCount; i++) {
            System.out.print(metaData.getColumnName(i) + "\t");
        }
        System.out.println();
        
        // Print rows
        while (rs.next()) {
            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rs.getString(i) + "\t");
            }
            System.out.println();
        }
    }
}
```

### Working with Result Sets

#### Traverse result sets

```java
public void navigateResultSet(Connection conn) throws SQLException {
    String sql = "SELECT id, name, amount FROM orders";
    
    try (Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {

        while (rs.next()) {
            System.out.printf(
                "Order %d: %s, %.2f%n",
                rs.getInt("id"),
                rs.getString("name"),
                rs.getDouble("amount"));
        }
    }
}
```

Result sets are forward-only and read-only. Methods such as `first()`, `last()`, and `absolute()` aren't supported.

#### Processing Large Result Sets

The driver paginates results by response size. Configure `LivyStatementPageSize` in the JDBC URL to set the requested page size in bytes; `Statement.setFetchSize()` doesn't control retrieval or memory usage.

```text
jdbc:fabricspark://api.fabric.microsoft.com;FabricWorkspaceID=<workspace-id>;FabricLakehouseID=<lakehouse-id>;AuthFlow=2;LivyStatementPageSize=1048576
```

```java
public void processLargeResultSet(Connection conn) throws SQLException {
    String sql = "SELECT * FROM large_table";
    
    try (Statement stmt = conn.createStatement()) {
        try (ResultSet rs = stmt.executeQuery(sql)) {
            int rowCount = 0;
            while (rs.next()) {
                // Process row
                processRow(rs);
                rowCount++;
                
                if (rowCount % 10000 == 0) {
                    System.out.println("Processed " + rowCount + " rows");
                }
            }
            System.out.println("Total rows processed: " + rowCount);
        }
    }
}

private void processRow(ResultSet rs) throws SQLException {
    // Process individual row
}
```

### Using Prepared Statements

```java
public void usePreparedStatement(Connection conn) throws SQLException {
    String sql = "SELECT * FROM products WHERE category = ? AND price > ?";
    
    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
        // Set parameters
        pstmt.setString(1, "Electronics");
        pstmt.setDouble(2, 100.0);
        
        try (ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                String name = rs.getString("name");
                double price = rs.getDouble("price");
                System.out.printf("Product: %s, Price: $%.2f%n", name, price);
            }
        }
    }
}
```

### Batch Operations

The driver doesn't support JDBC transactions. Batch execution is nontransactional and can partially succeed; a later failure doesn't roll back earlier successful statements.

```java
public void executeBatchInsert(Connection conn) throws SQLException {
    String sql = "INSERT INTO logs (timestamp, level, message) VALUES (?, ?, ?)";
    int pendingStatements = 0;
    
    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
        // Add multiple statements to batch
        for (int i = 0; i < 1000; i++) {
            pstmt.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
            pstmt.setString(2, "INFO");
            pstmt.setString(3, "Log message " + i);
            pstmt.addBatch();
            pendingStatements++;
            
            // Execute batch every 100 statements
            if ((i + 1) % 100 == 0) {
                pstmt.executeBatch();
                pstmt.clearBatch();
                pendingStatements = 0;
            }
        }
        
        if (pendingStatements > 0) {
            pstmt.executeBatch();
        }
        
        System.out.println("Batch insert completed successfully");
    }
}
```

### Choose a connection owner

Choose one component to own the connection lifecycle. Don't place one connection pool inside another.

| Usage model | Entry point | Pool owner | Closing a borrowed `Connection` | Shutdown owner |
|-------------|-------------|------------|---------------------------------|----------------|
| Direct | `DriverManager`, `LivyDriver`, or `LivyDataSource` | None | Physically closes its independent Livy connection and session. | The application closes every connection. A direct `LivyDataSource` has no separate close lifecycle. |
| External HikariCP | `HikariDataSource` backed by a JDBC URL or `LivyDataSource` | HikariCP only | Returns the Hikari proxy connection to HikariCP. | The application closes its retained `HikariDataSource`. |
| Explicit built-in pool | `LivyBuiltInPooledDataSource` | One lazily created `LivyConnectionPool` for each configured data source generation | Retires the logical lease and reuses the physical session only after safe cleanup. | The application closes its retained built-in data source. |
| Standard pooling SPI | `LivyConnectionPoolDataSource` creates `PooledConnection` objects for a middle-tier pool manager | The middle-tier pool manager, not the factory | Closes the logical handle and synchronously notifies the manager after cleanup. | The manager calls `PooledConnection.close()` to destroy each physical connection. |

`ConnectionPoolEnabled` defaults to `false` in both the driver code and the shipped properties. It isn't an opt-in switch for the current entry points. Use `LivyBuiltInPooledDataSource` when the driver should own the pool, or configure an external pool such as HikariCP. The other entry points create direct, non-pool-owning connections.

### Connection pooling with HikariCP

HikariCP can create connections from either `LivyDataSource` or the JDBC URL through `LivyDriver`. Create one HikariCP instance, reuse it for the application lifetime, and use only one connection pool in either configuration.

#### Maven dependency

```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.0.1</version>
</dependency>
```

#### Use `LivyDataSource`

`LivyDataSource` creates independent physical connections and doesn't own a connection pool or a separate close lifecycle. Supply it to HikariCP directly so that HikariCP is the only pool owner:

```java
import com.microsoft.spark.livy.jdbc.LivyDataSource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public final class ConnectionPoolExample implements AutoCloseable {
    private final HikariDataSource hikariDataSource;

    public ConnectionPoolExample(String url) {
        LivyDataSource configuredDataSource = new LivyDataSource();
        configuredDataSource.setUrl(url);

        HikariConfig config = new HikariConfig();
        config.setDataSource(configuredDataSource);
        config.setMaximumPoolSize(2);
        config.setMinimumIdle(0);
        config.setConnectionTimeout(900000);     // Wait up to 15 minutes for a connection
        config.setInitializationFailTimeout(-1); // Connect on demand
        config.setIdleTimeout(600000);           // 10 minutes
        config.setMaxLifetime(1800000);          // 30 minutes
        config.setPoolName("FabricSparkPool");

        hikariDataSource = new HikariDataSource(config);
    }

    public Connection getConnection() throws SQLException {
        return hikariDataSource.getConnection();
    }

    @Override
    public void close() {
        hikariDataSource.close();
    }

    public static void main(String[] args) throws SQLException {
        String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
                     "FabricWorkspaceID=<workspace-id>;" +
                     "FabricLakehouseID=<lakehouse-id>;" +
                     "AuthFlow=AZURE_CLI;" +
                     "hcEnabled=true;" +
                     "sessionTag=pooled_app;" +
                     "hcAcquireTimeoutSeconds=600";

        try (ConnectionPoolExample pool = new ConnectionPoolExample(url);
             Connection conn = pool.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT 'Pooled connection!' as message")) {

            if (rs.next()) {
                System.out.println(rs.getString("message"));
            }
        }
    }
}
```

The example enables HC mode in the JDBC URL. HikariCP manages client-side connections, while HC mode manages shared Spark sessions in Fabric. Remove `hcEnabled` and `sessionTag` if the application requires classic sessions.

#### Use `LivyDriver` directly

Configure the JDBC URL and driver class so that HikariCP creates physical connections through `LivyDriver`. Setting the driver class explicitly is optional when JDBC service-provider auto-discovery is available. This configuration doesn't instantiate `LivyDataSource`, so its built-in pool isn't involved:

```java
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public final class DriverConnectionPoolExample {
    public static HikariDataSource createPool(String url) {
        HikariConfig config = new HikariConfig();
        config.setDriverClassName("com.microsoft.spark.livy.jdbc.LivyDriver");
        config.setJdbcUrl(url);

        // Keep pool sizes small: each classic-mode physical connection owns a Livy session.
        config.setMaximumPoolSize(2);
        config.setMinimumIdle(0);
        config.setConnectionTimeout(900000);     // Wait up to 15 minutes to borrow a connection
        config.setInitializationFailTimeout(-1); // Skip startup validation; connect on demand
        config.setIdleTimeout(600000);           // 10 minutes
        config.setMaxLifetime(1800000);          // 30 minutes
        config.setPoolName("FabricSparkDriverPool");

        return new HikariDataSource(config);
    }

    public static void main(String[] args) throws SQLException {
        String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
                     "FabricWorkspaceID=<workspace-id>;" +
                     "FabricLakehouseID=<lakehouse-id>;" +
                     "AuthFlow=AZURE_CLI;" +            // Uses the DefaultAzureCredential chain
                     "hcEnabled=true;" +
                     "sessionTag=pooled_app;" +
                     "hcAcquireTimeoutSeconds=600";  // Poll up to 10 minutes for HC readiness

        // Reuse this pool for the application lifetime; main closes it at process exit.
        try (HikariDataSource pool = createPool(url);
             Connection conn = pool.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT 'Pooled LivyDriver connection!' as message")) {

            if (rs.next()) {
                System.out.println(rs.getString("message"));
            }
        }
    }
}
```

Use the following guidance when you configure the pool:

| Setting or behavior | Guidance |
|---------------------|----------|
| Pool ownership | `LivyDataSource` is direct-only. When you supply it to HikariCP, HikariCP owns the pool. Use `LivyBuiltInPooledDataSource` instead when the driver should own the pool. |
| Pool size | Start with a small pool and increase it only after measuring workload concurrency and capacity usage. In classic mode, each physical connection owns a Livy session. In HC mode, connections can share server-managed Spark capacity. |
| `connectionTimeout` | Controls how long a caller waits to borrow a connection, but doesn't cancel a connection attempt already in progress. For HC URLs, allow for `hcAcquireTimeoutSeconds`; for classic mode, allow for `LivySessionTimeoutSeconds`, authentication, HTTP retries, and validation. HikariCP expresses this setting in milliseconds. |
| `initializationFailTimeout` | A negative value skips the startup connection and validation attempt. Connectivity failures then surface when the application first requests a connection. Use a positive value if the application must verify connectivity during startup. |
| Connection validation | HikariCP uses `Connection.isValid()`. Its effective duration is controlled by the driver's HTTP timeout and retry/backoff settings, not HikariCP's `validationTimeout`. Don't configure a connection test query because it replaces the lighter validation check with a Spark statement. |

For the complete list of HikariCP configuration options, see:

- [HikariConfig API reference](https://javadoc.io/static/com.zaxxer/HikariCP/3.2.0/com/zaxxer/hikari/HikariConfig.html)
- [HikariCP configuration options](https://github.com/brettwooldridge/HikariCP#gear-configuration-knobs-baby)




## Data Type Mapping

The driver maps Spark SQL data types to JDBC SQL types and Java types:

| Spark SQL Type | JDBC SQL Type | Java Type | Notes |
|----------------|---------------|-----------|-------|
| `BOOLEAN` | `BOOLEAN` | `Boolean` | |
| `BYTE` | `TINYINT` | `Byte` | |
| `SHORT` | `SMALLINT` | `Short` | |
| `INT` | `INTEGER` | `Integer` | |
| `LONG` | `BIGINT` | `Long` | |
| `FLOAT` | `FLOAT` | `Float` | |
| `DOUBLE` | `DOUBLE` | `Double` | |
| `DECIMAL` | `DECIMAL` | `BigDecimal` | Precision and scale preserved |
| `STRING` | `VARCHAR` | `String` | |
| `VARCHAR(n)` | `VARCHAR` | `String` | |
| `CHAR(n)` | `CHAR` | `String` | |
| `BINARY` | `BINARY` | `byte[]` | |
| `DATE` | `DATE` | `java.sql.Date` | |
| `TIMESTAMP` | `TIMESTAMP` | `java.sql.Timestamp` | |
| `ARRAY` | `ARRAY` | `String` | Retrieved as JSON text; metadata type doesn't guarantee complete `java.sql.Array` accessor support |
| `MAP` | `JAVA_OBJECT` | `String` | Retrieved as JSON text |
| `STRUCT` | `STRUCT` | `String` | Retrieved as JSON text; metadata type doesn't guarantee complete `java.sql.Struct` accessor support |


## Related content

* [Apache Spark Runtimes in Fabric](./runtime.md)
* [Fabric Runtime 1.3](./runtime-1-3.md)
* [What is the Livy API for Data Engineering](./api-livy-overview.md)
