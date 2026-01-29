---
title: Microsoft JDBC Driver for Microsoft Fabric Data Engineering
description: Learn how to connect, query, and manage Spark workloads in Microsoft Fabric using the Microsoft JDBC Driver for Microsoft Fabric Data Engineering.
author: ms-arali
ms.author: arali
ms.reviewer: arali
ms.topic: how-to
ms.date: 12/05/2025
---

# Microsoft JDBC driver for Microsoft Fabric Data Engineering (preview)

>[!NOTE]
> This feature is in preview. 

JDBC (Java Database Connectivity) is a widely adopted standard that enables client applications to connect to and work with data from databases and big data platforms.

The Microsoft JDBC Driver for Fabric Data Engineering lets you connect, query, and manage Spark workloads in Microsoft Fabric with the reliability and simplicity of the JDBC standard. Built on Microsoft Fabric's Livy APIs, the driver provides secure and flexible Spark SQL connectivity to your Java applications and BI tools. This integration allows you to submit and execute Spark code directly without needing to create separate Notebook or Spark Job Definition artifacts.

## Key Features

- **JDBC 4.2 Compliant**: Full implementation of JDBC 4.2 specification
- **Microsoft Entra ID Authentication**: Multiple authentication flows including interactive, client credentials, and certificate-based authentication
- **Enterprise Connection Pooling**: Built-in connection pooling with health monitoring and automatic recovery
- **Spark SQL Native Query Support**: Direct execution of Spark SQL statements without translation
- **Comprehensive Data Type Support**: Support for all Spark SQL data types including complex types (ARRAY, MAP, STRUCT)
- **Asynchronous Result Set Prefetching**: Background data loading for improved performance
- **Circuit Breaker Pattern**: Protection against cascading failures with automatic retry
- **Auto-Reconnection**: Transparent session recovery on connection failures
- **Proxy Support**: HTTP and SOCKS proxy configuration for enterprise environments

## Prerequisites

Before using the Microsoft JDBC Driver for Microsoft Fabric Data Engineering, ensure you have:

- **Java Development Kit (JDK)**: Version 11 or higher (Java 21 recommended)
- **Microsoft Fabric Access**: Access to a Microsoft Fabric workspace
- **Azure Entra ID Credentials**: Appropriate credentials for authentication
- **Workspace and Lakehouse IDs**: GUID identifiers for your Fabric workspace and lakehouse

## Download and Installation

Microsoft JDBC Driver for Microsoft Fabric Data Engineering version 1.0.0 is the public preview version and supports Java 11, 17 and 21. We're continually improving Java connectivity support and recommend that you work with the latest version of the Microsoft JDBC driver.

* [Download Microsoft JDBC Driver for Microsoft Fabric Data Engineering (zip)](https://download.microsoft.com/download/5e763393-274e-48c5-a55a-0375340bc520/ms-sparksql-jdbc-1.0.0.zip)
* [Download Microsoft JDBC Driver for Microsoft Fabric Data Engineering (tar)](https://download.microsoft.com/download/5e763393-274e-48c5-a55a-0375340bc520/ms-sparksql-jdbc-1.0.0.tar)

1. Download either the zip or tar file from the links above.
1. Extract the downloaded file to access the driver JAR files.
1. Select the JAR file that matches your JRE version:
   - For Java 11: `ms-sparksql-jdbc-1.0.0.jre11.jar`
   - For Java 17: `ms-sparksql-jdbc-1.0.0.jre17.jar`
   - For Java 21: `ms-sparksql-jdbc-1.0.0.jre21.jar`
1. Add the selected JAR file to your application's classpath.
1. For JDBC clients, configure the JDBC driver class: `com.microsoft.spark.livy.jdbc.LivyDriver`

## Quick Start Example

This example demonstrates how to connect to Microsoft Fabric and execute a query using the Microsoft JDBC Driver for Microsoft Fabric Data Engineering. Before running this code, ensure you have completed the prerequisites and installed the driver.

```java
import java.sql.*;

public class QuickStartExample {
    public static void main(String[] args) {
        // Connection string with required parameters
        String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
                     "FabricWorkspaceID=<workspace-id>;" +
                     "FabricLakehouseID=<lakehouse-id>;" +
                     "AuthFlow=2;" +  // Azure CLI based authentication
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

The Microsoft JDBC Driver for Microsoft Fabric Data Engineering uses the following connection string format:

```
jdbc:fabricspark://<hostname>[:<port>][;<parameter1>=<value1>;<parameter2>=<value2>;...]
```

### Connection String Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Protocol** | JDBC URL protocol identifier | `jdbc:fabricspark://` |
| **Hostname** | Microsoft Fabric endpoint hostname | `api.fabric.microsoft.com` |
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

---

## Authentication

The Microsoft JDBC Driver for Microsoft Fabric Data Engineering supports multiple authentication methods through Microsoft Entra ID (formerly Azure Active Directory). Authentication is configured using the `AuthFlow` parameter in the connection string.

### Authentication Flows

| AuthFlow | Authentication Method | Use Case |
|----------|----------------------|----------|
| **1** | Interactive Browser | Interactive user authentication using OAuth 2.0|
| **2** | Azure CLI | Development using Azure CLI |
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
             "AuthTenantID=<tenant-id>;" +  // Optional
             "LogLevel=INFO";

Connection conn = DriverManager.getConnection(url);
```

**Parameters:**
- `AuthFlow=1`: Specifies interactive browser authentication
- `AuthTenantID` (optional): Azure tenant ID
- `AuthClientID` (optional): Application (client) ID

**Behavior:**
- Opens a browser window for user authentication
- Credentials are cached for subsequent connections until it's expired
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
- `AuthTenantID`: Azure tenant ID

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
             "AuthCertificatePath=/path/to/certificate.pfx;" +
             "AuthCertificatePassword=<certificate-password>;" +
             "AuthTenantID=<tenant-id>;" +
             "LogLevel=INFO";

Connection conn = DriverManager.getConnection(url);
```

**Required Parameters:**
- `AuthFlow=4`: Specifies certificate-based authentication
- `AuthClientID`: Application (client) ID
- `AuthCertificatePath`: Path to PFX/PKCS12 certificate file
- `AuthCertificatePassword`: Certificate password
- `AuthTenantID`: Azure tenant ID

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

### Authentication Caching

The driver automatically caches authentication tokens to improve performance:

```java
// Enable/disable caching (enabled by default)
String url = "jdbc:fabricspark://api.fabric.microsoft.com;" +
             "FabricWorkspaceID=<workspace-id>;" +
             "FabricLakehouseID=<lakehouse-id>;" +
             "AuthFlow=2;" +
             "AuthEnableCaching=true;" +  // Enable token caching
             "AuthCacheTTLMS=3600000";    // Cache TTL: 1 hour

Connection conn = DriverManager.getConnection(url);
```
---

## Configuration Parameters

### Required Parameters

These parameters must be present in every connection string:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `FabricWorkspaceID` | UUID | Microsoft Fabric workspace identifier | `<workspace-id>` |
| `FabricLakehouseID` | UUID | Microsoft Fabric lakehouse identifier | `<lakehouse-id>` |
| `AuthFlow` | Integer | Authentication flow type (1-5) | `2` |

### Optional Parameters

#### API Version Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `FabricVersion` | String | `v1` | Microsoft Fabric API version |
| `LivyApiVersion` | String | `2023-12-01` | Livy API version |

#### Environment Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `FabricEnvironmentID` | UUID | None | Fabric environment identifier for referencing environment item for Spark session |

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

**Example:**
```
DriverCores=4;DriverMemory=4g;ExecutorCores=4;ExecutorMemory=8g;NumExecutors=2
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

### HTTP Connection Pool Configuration

Configure HTTP connection pooling for optimal network performance:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `HttpMaxTotalConnections` | Integer | 100 | Maximum total HTTP connections |
| `HttpMaxConnectionsPerRoute` | Integer | 50 | Maximum connections per route |
| `HttpConnectionTimeoutInSeconds` | Integer | 30 | Connection timeout |
| `HttpSocketTimeoutInSeconds` | Integer | 60 | Socket read timeout |
| `HttpReadTimeoutInSeconds` | Integer | 60 | HTTP read timeout |
| `HttpConnectionRequestTimeoutSeconds` | Integer | 30 | Connection request timeout from pool |
| `HttpEnableKeepAlive` | Boolean | true | Enable HTTP keep-alive |
| `HttpKeepAliveTimeoutSeconds` | Integer | 60 | Keep-alive timeout |
| `HttpFollowRedirects` | Boolean | true | Follow HTTP redirects |
| `HttpUseAsyncIO` | Boolean | false | Use asynchronous HTTP I/O |

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
| `LogLevel` | String | `INFO` | Logging level: TRACE, DEBUG, INFO, WARN, ERROR |

**Example:**
```
LogLevel=DEBUG
```

**Default Log Location:**
```
${user.home}/.microsoft/livy-jdbc-driver/driver.log
```

**Custom Log Configuration:**
Use a custom `log4j2.xml` or `logback.xml` file on your classpath.

---


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

#### Navigating Result Sets

```java
public void navigateResultSet(Connection conn) throws SQLException {
    String sql = "SELECT id, name, amount FROM orders";
    
    try (Statement stmt = conn.createStatement(
            ResultSet.TYPE_SCROLL_INSENSITIVE,
            ResultSet.CONCUR_READ_ONLY);
         ResultSet rs = stmt.executeQuery(sql)) {
        
        // Move to first row
        if (rs.first()) {
            System.out.println("First row: " + rs.getString("name"));
        }
        
        // Move to last row
        if (rs.last()) {
            System.out.println("Last row: " + rs.getString("name"));
            System.out.println("Total rows: " + rs.getRow());
        }
        
        // Move to specific row
        if (rs.absolute(5)) {
            System.out.println("Row 5: " + rs.getString("name"));
        }
    }
}
```

#### Processing Large Result Sets

```java
public void processLargeResultSet(Connection conn) throws SQLException {
    String sql = "SELECT * FROM large_table";
    
    try (Statement stmt = conn.createStatement()) {
        // Set fetch size for efficient memory usage
        stmt.setFetchSize(1000);
        
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

```java
public void executeBatchInsert(Connection conn) throws SQLException {
    String sql = "INSERT INTO logs (timestamp, level, message) VALUES (?, ?, ?)";
    
    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
        conn.setAutoCommit(false);  // Disable auto-commit for batch
        
        // Add multiple statements to batch
        for (int i = 0; i < 1000; i++) {
            pstmt.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
            pstmt.setString(2, "INFO");
            pstmt.setString(3, "Log message " + i);
            pstmt.addBatch();
            
            // Execute batch every 100 statements
            if (i % 100 == 0) {
                pstmt.executeBatch();
                pstmt.clearBatch();
            }
        }
        
        // Execute remaining statements
        pstmt.executeBatch();
        conn.commit();
        
        System.out.println("Batch insert completed successfully");
    } catch (SQLException e) {
        conn.rollback();
        throw e;
    } finally {
        conn.setAutoCommit(true);
    }
}
```
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
| `ARRAY` | `VARCHAR` | `String` | Serialized as JSON |
| `MAP` | `VARCHAR` | `String` | Serialized as JSON |
| `STRUCT` | `VARCHAR` | `String` | Serialized as JSON |


## Related content

* [Apache Spark Runtimes in Fabric](./runtime.md)
* [Fabric Runtime 1.3](./runtime-1-3.md)
* [What is the Livy API for Data Engineering](./api-livy-overview.md)
