---
title: Simba ODBC Data Connector for Data Engineering (Preview) 
description: Learn about the Simba ODBC Data Connector for Microsoft Fabric Data Engineering, detailing its features, installation, and configuration processes.
ms.reviewer: snehagunda
ms.author: sngun
author: SnehaGunda
ms.topic: how-to
ms.date: 05/04/2025
ms.devlang: python
#customer intent: As a Microsoft Fabric user I want to learn about the Simba ODBC Data Connector for Microsoft Fabric Data Engineering, detailing its features, installation, and configuration processes.
---

# Simba ODBC Data Connector for Microsoft Fabric data engineering (Public preview)

The Simba Open Database Connector (ODBC) Data Connector for Microsoft Fabric Data Engineering (Spark) is used for direct SQL and SparkSQL access to Microsoft Fabric Spark or Azure Synapse Spark, enabling Business Intelligence (BI), analytics, and reporting on Spark-based data.
The connector efficiently transforms an application’s SQL query into the equivalent form in SparkSQL, which is a subset of SQL-92.

If an application is Spark-aware, then the connector is configurable to pass the query through to the database for processing. The connector interrogates Spark to obtain schema information to present to a SQL-based application. The Simba ODBC Data Connector for Microsoft Fabric Data Engineering complies with the ODBC 3.80 data standard and adds important functionality such as Unicode and 32-bit and 64-bit support for high- performance computing environments. ODBC is one of the most established and widely supported APIs for connecting to and working with databases. At the heart of the technology, is the ODBC connector, which connects an application to the database.

For more information about ODBC, see: [What is ODBC?](https://insightsoftware.com/blog/what-is-odbc/).
For complete information about the ODBC specification, see the [ODBC API Reference from the Microsoft documentation](/sql/odbc/reference/syntax/odbc-api-reference).

> [!NOTE]
> The Simba ODBC Data Connector for Microsoft Fabric Spark is available for Microsoft® Windows® platform.

## Here's a quick example of how it works

Review this example of how this process works.

:::image type="content" source="media/simba-odbc-data-connector/animated.gif" alt-text="Animated example showing the Simba ODBC connector." lightbox="media/simba-odbc-data-connector/animated.gif":::

## System requirements

Install the connector on client machines where the client application is installed. Before installing the connector, make sure that you have:

- Administrator rights on your machine.
- A machine that meets these system requirements:
  - Windows 10 or 11
  - Windows Server 2025, 2022, 2019, or 2016
  - 150 MB of available disk space

The Simba ODBC Data Connector for Microsoft Fabric Spark supports Spark versions 3.5 and later for Microsoft Fabric Spark and version 3.4 and later for Azure Synapse.

## Authentication

You can download the Simba ODBC Data Connector for Microsoft Fabric Spark from Simba landing page: [Custom ODBC Driver SDK](https://insightsoftware.com/drivers/simba-sdk)

On 64-bit Windows operating systems, you can execute both 32-bit and 64-bit applications. However, 64-bit applications must use 64-bit connectors, and 32-bit applications must use 32-bit connectors. Make sure that you use a connector whose bitness matches the bitness of the client application:

- Simba Fabric Spark 0.9 32-bit.msi for 32-bit applications
- Simba Fabric Spark 0.9 64-bit.msi for 64-bit applications

To install the Simba ODBC Data Connector for Microsoft Fabric Spark on Windows:

1. Depending on the bitness of your client application, double-click to run Simba Fabric Spark 0.9 32-bit.msi or Simba Fabric Spark 0.9 64-bit.msi.
1. Select Next.
1. Select the check box to accept the terms of the License Agreement if you agree, and then select Next.
1. To change the installation location, select Change, then browse to the desired folder, and then select OK. To accept the installation location, select Next.
1. Select Install.
1. When the installation completes, select Finish.

## Creating a data source name

Typically, after installing the Simba ODBC Data Connector for Microsoft Fabric Spark, you need to create a Data Source Name (DSN). A DSN is a data structure that stores connection information used by the connector to connect to Spark.
Alternatively, you can specify connection settings in a connection string. Settings in the connection string take precedence over settings in the DSN.
The following instructions describe how to create a DSN. For information about specifying settings in a connection string, see Using a Connection String section of this documentation.
To create a Data Source Name on Windows:

> [!NOTE]
> Make sure to select the ODBC Data Source Administrator that has the same bitness as the client application that you're using to connect to Spark.

> [!NOTE]
> We recommended you create a System DSN instead of a User DSN. Some applications load the data using a different user account and might not be able to detect User DSNs that are created under another user account.

1. From the Start menu, go to ODBC Data Sources.
1. In the ODBC Data Source Administrator, select the Drivers tab, and then scroll down as needed to confirm that the Simba ODBC Data Connector for Microsoft Fabric Spark appears in the alphabetical list of ODBC drivers that are installed on your system.
1. Choose one:

    - To create a DSN that only the user currently logged into Windows can use, select the User DSN tab.
    - Or, to create a DSN that all users who log into Windows can use, select the System DSN tab.

1. Select Add.
1. In the Create New Data Source dialog box, select Simba ODBC Data Connector for Microsoft Fabric Spark and then select Finish. The Simba ODBC Data Connector for Microsoft Fabric Spark DSN Setup dialog box opens.
1. In the Data Source Name field, type a name for your DSN.
1. Optionally, in the Description field, type relevant details about the DSN.
1. From the Spark Server Type drop-down list, select the appropriate server type for the version of Spark that you're running:

    - If you're connecting to Microsoft Fabric, then select FABRIC.
    - If you're connecting to Azure Synapse, then select SYNAPSE.

1. In the Host(s), type in the hostname corresponding to the server.
1. In the HTTP Path, type in the partial URL corresponding to the server.
1. Optionally, in the Environment ID, type in the Environment ID that you wish to use. This is applicable to Microsoft Fabric only.
1. In the Authentication area, configure authentication as needed. For more information, see Configuring Authentication on Windows.
1. To configure the connector to connect to Spark through a proxy server, select Proxy Options. For more information, see Configuring a Proxy Connection on Windows.
1. To configure client-server verification over SSL, select SSL Options. For more information, see Configuring SSL Verification on Windows.
1. To configure advanced connector options, select Advanced Options. For more information, see Configuring Advanced Options on Windows.
1. To configure server-side properties, select Advanced Options and then select Server Side Properties. For more information, see Configuring Server-Side Properties on Windows.
1. To configure logging behavior for the connector, select Logging Options. For more information, see Configuring Logging Options on Windows.
1. To test the connection, select Test. Review the results as needed, and then select OK.
1. To save your settings and close the Simba ODBC Data Connector for Microsoft Fabric Spark DSN Setup dialog box, select OK.
1. To close the ODBC Data Source Administrator, select OK.

> [!NOTE]
> If the connection fails, then confirm that the settings in the Simba Spark ODBC Driver DSN Setup dialog box are correct. Contact your Spark server administrator as needed.

## Client credentials

This authentication mechanism requires SSL to be enabled.
You can use client secret as the client credentials.

To configure OAuth 2.0 client credentials authentication using the client secret:

1. To access authentication options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, and then select Configure.
1. From the Spark Server Type drop-down list\select SYNAPSE.
1. Select OAuth Options, and then do the following:
    1. From the Authentication Flow drop-down list, select Client Credentials.
    1. In the Client ID field, type your client ID.
    1. In the Client Secret field, type your client secret.
    1. In the Tenant ID field, type your tenant ID.
    1. In the OAuth Scope field, type:

    ```html
    https://dev.azuresynapse.net/.default
    ```

1. Optionally, select Encryption Options and choose the encryption password for Current User Only or All Users of this Machine. Then select OK.
1. To save your settings and close the OAuth Options dialog box, select OK.
1. To save your settings and close the DSN Setup dialog box, select OK.

### Browser based authorization Code

This authentication mechanism requires SSL to be enabled.

To configure OAuth 2.0 browser-based authentication:

1. To access authentication options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, and then select Configure.
1. From the Spark Server Type drop-down list, select FABRIC.
1. Select OAuth Options, and then do the following:
    1. From the Authentication Flow drop-down list, select Browser Based Authorization Code.
    1. In the Tenant ID field, type your tenant ID.
    1. In the Client ID field, type your client ID.
    1. In the OAuth Scope field, type (spaces are required between scopes, or the scopes that are appropriate for your case):

    ```html
    https://analysis.windows.net/powerbi/api/Code.AccessStorage.All
    https://analysis.windows.net/powerbi/api/Item.Execute.All
    https://analysis.windows.net/powerbi/api/Item.ReadWrite.All
    ```

1. Optionally, select the Ignore SQL_DRIVER_NOPROMPT check box. When the application is making a SQLDriverConnect call with a SQL_DRIVER_NOPROMPT flag, this option displays the web browser used to complete the browser-based authentication flow.

1. To save your settings and close the OAuth Options dialog box, select OK.

1. To save your settings and close the DSN Setup dialog box, select OK.

> [!NOTE]
> When the browser-based authentication flow completes, the access token and refresh token are saved in the token cache, and the connector doesn't need to authenticate again.

## Configuring advanced options

You can configure advanced options to modify the behavior of the connector.

The following instructions describe how to configure advanced options in a DSN and in the connector configuration tool. You can specify the connection settings described below in a DSN, in a connection string, or as connector-wide settings. Settings in the connection string take precedence over settings in the DSN, and settings in the DSN take precedence over connector-wide settings.
To configure advanced options on Windows:

> [!IMPORTANT]
> When this option is enabled, the connector can't execute parameterized queries.
> By default, the connector applies transformations to the queries emitted by an application to convert the queries into an equivalent form in SparkSQL. If the application is Spark-aware and already emits SparkSQL, then turning off the translation avoids the additional overhead of query transformation.

1. To access advanced options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then select Configure, and then select Advanced Options.
1. To disable the SQL Connector feature, select the Use Native Query check box.
1. To enable the connector to return SQL_WVARCHAR instead of SQL_VARCHAR for STRING and VARCHAR columns, and SQL_WCHAR instead of SQL_CHAR for CHAR columns, select the Unicode SQL Character Types check box.
1. In the Max Bytes Per Fetch Request field, type the maximum number of bytes to be fetched.
1. In the Default String Column Length field, type the maximum data length for STRING columns.
1. In the Binary Column Length field, type the maximum data length for BINARY columns.
1. In the Async Exec Poll Interval field, type the time in milliseconds between each poll for the query execution status.
1. In the Query Timeout field, type the number of seconds that an operation can remain idle before it's closed.
1. To save your settings and close the Advanced Options dialog box, select OK.

>[!NOTE]
> In the  Max Bytes Per Fetch Request field this option is applicable only when connecting to a server that supports result set data serialized in Arrow format.
> The value must be specified in one of the following:

- B (bytes)
- KB (kilobytes)
- MB (megabytes)
- GB (gigabytes)
- By default, the file size is in B (bytes).

## Configuring a proxy connection

If you're connecting to the data source through a proxy server, you must provide connection information for the proxy server.

To configure a proxy server connection on Windows:

1. To access proxy server options, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then select Configure, and then select Proxy Options.
1. Select the Use Proxy check box.
1. In the Proxy Host field, type the host name or IP address of the proxy server.
1. In the Proxy Port field, type the number of the TCP port that the proxy server uses to listen for client connections.
1. In the Proxy Username field, type your username for accessing the proxy server.
1. In the Proxy Password field, type the password corresponding to the username.
1. To encrypt your credentials, select Password Options and then select one of the following:

    - If the credentials are used only by the current Windows user, select Current User Only.
    - Or, if the credentials are used by all users on the current Windows machine, select All Users Of This Machine.

1. To confirm your choice and close the Password Options dialog box, select OK.
1. In the Hosts Not Using Proxy field, type the list of hosts or domains that don't use a proxy.
1. To save your settings and close the HTTP Proxy Options dialog box, select OK.

## Configuring SSL verification

If you're connecting to a Spark server that has Secure Sockets Layer (SSL) enabled, you can configure the connector to connect to an SSL-enabled socket.

When using SSL to connect to a server, the connector supports identity verification between the client (the connector itself) and the server.
The following instructions describe how to configure SSL in a DSN. You can specify the connection settings described below in a DSN, or in a connection string. Settings in the connection string take precedence over settings in the DSN.

> [!IMPORTANT]
> If you are using the Windows trust store, make sure to import the trusted CA certificates into the trust store.
> If the trusted CA supports certificate revocation, select the Check Certificate Revocation check box.

To configure SSL verification on Windows:

1. To access SSL options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then select Configure, and then select SSL Options.
1. Select the Enable SSL check box.
1. To allow authentication using self-signed certificates that haven't been added to the list of trusted certificates, select the Allow Self-signed Server Certificate check box.
1. To allow the common name of a CA-issued SSL certificate to not match the host name of the Spark server, select the Allow Common Name Host Name Mismatch check box.
1. To specify the CA certificates that you want to use to verify the server, do one of the following:

    - To verify the server using the trusted CA certificates from a specific .pem file, specify the full path to the file in the Trusted Certificates field and clear the Use System Trust Store check box.
    - Or, to use the trusted CA certificates .pem file that is installed with the connector, leave the Trusted Certificates field empty, and clear the Use System Trust Store check box.
    - Or, to use the Windows trust store, select the Use System Trust Store check box.

1. From the Minimum TLS Version drop-down list, select the minimum version of TLS to use when connecting to your data store.
1. To configure two-way SSL verification, select the Two-Way SSL check box and then do the following:
    1. In the Client Certificate File field, specify the full path of the PEM file containing the client's certificate.
    1. In the Client Private Key File field, specify the full path of the file containing the client's private key.
    1. If the private key file is protected with a password, type the password in the Client Private Key Password field.
    1. To encrypt your credentials, select Password Options and then select one of the following:
    1. If the credentials are used only by the current Windows user, select Current User Only.
    1. Or, if the credentials are used by all users on the current Windows machine, select All Users Of This Machine. To confirm your choice and close the Password Options dialog box, select OK.
    1. To save your settings and close the SSL Options dialog box, select OK.

> [!IMPORTANT]
> The password is obscured, that is, not saved in plain text. However, it's still possible for the encrypted password to be copied and used.

## Configuring server-side properties

You can use the connector to apply configuration properties to the Spark server.

The following instructions describe how to configure server-side properties in a DSN. You can specify the connection settings described below in a DSN, or in a connection string. Settings in the connection string take precedence over settings in the DSN.

> [!NOTE]
> For a list of all Hadoop and Spark server-side properties that your implementation supports, type set -v at the Spark CLI command line. You can also execute the set -v query after connecting using the connector.

To configure server-side properties on Windows:

1. To configure server-side properties for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then select Configure, then select Advanced Options, and then select Server Side Properties.
1. To create a server-side property, select Add, then type appropriate values in the Key and Value fields, and then select OK.
1. To edit a server-side property, select the property from the list, then select Edit, then update the Key and Value fields as needed, and then select OK.
1. To delete a server-side property, select the property from the list, and then select Remove. In the confirmation dialog box, select Yes.
1. To configure the connector to convert server-side property key names to all lower- case characters, select the Convert Key Name To Lower Case check box.
1. To change the method that the connector uses to apply server-side properties, do one of the following:

    - To configure the connector to apply each server-side property by executing a query when opening a session to the Spark server, select the Apply Server Side Properties With Queries check box.
    - Or, to configure the connector to use a more efficient method for applying server-side properties that doesn't involve additional network round-tripping, clear the Apply Server Side Properties With Queries check box.

1. To save your settings and close the Server Side Properties dialog box, select OK.

## Configuring logging options

To help troubleshoot issues, you can enable logging. In addition to the functionality provided in the Simba ODBC Data Connector for Microsoft Fabric Spark, the ODBC Data Source Administrator provides tracing functionality.

> [!IMPORTANT]
> Only enable logging or tracing long enough to capture an issue. Logging or tracing decreases performance and can consume a large quantity of disk space.

## Configuring connector-wide logging options

The settings for logging apply to every connection that uses the Simba ODBC Data Connector for Microsoft Fabric Spark, so make sure to disable the feature after you're done using it.

> [!NOTE]
> After the maximum number of log files is reached, each time an additional file is created, the connector deletes the oldest log file.

To enable connector-wide logging on Windows:

1. To access logging options, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then select Configure, and then select Logging Options.
1. From the Log Level drop-down list, select the logging level corresponding to the amount of information that you want to include in log files:

| Logging Level | Description |
|---------|---------|
| OFF | Disables all logging.                  |
| FATAL | Logs severe error events that lead the connector to abort.                  |
| ERROR | Logs error events that might allow the connector to continue running.                  |
| WARNING | Logs events that might result in an error if action isn't taken.                  |
| INFO | Logs general information that describes the progress of the connector.                  |
| DEBUG | Logs detailed information that is useful for debugging the connector.                  |
| TRACE | Logs all connector activity.     |

1. In the Log Path field, specify the full path to the folder where you want to save log files.
1. In the Max Number Files field, type the maximum number of log files to keep.
1. In the Max File Size field, type the maximum size of each log file in megabytes (MB).
1. Select OK.
1. Restart your ODBC application to make sure that the new settings take effect.

> [!NOTE]
> After the maximum file size is reached, the connector creates a new file and continues logging.

The Simba ODBC Data Connector for Microsoft Fabric Spark produces the following log files at the location you specify in the Log Path field:

- A simbaodbcdataconnectorformicrosoftfabricspark.log file that logs connector activity that isn't specific to a connection.
- A simbaodbcdataconnectorformicrosoftfabricspark_connection_[Number].log file for each connection made to the database, where [Number] is a number that identifies each log file. This file logs connector activity that is specific to the connection.

To disable connector logging on Windows:

1. Open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then select Configure, and then select Logging Options.
1. From the Log Level drop-down list, select LOG_OFF.
1. Select OK.
1. Restart your ODBC application to make sure that the new settings take effect.

### Using a connection string

For some applications, you might need to use a connection string to connect to your data source.
For detailed information about how to use a connection string in an ODBC application, refer to the documentation for the application that you're using.

The connection strings in the following sections are examples showing the minimum set of connection attributes that you must specify to successfully connect to the data source.

### DSN connection string example

The following is an example of a connection string for a connection that uses a DSN:

DSN=[DataSourceName]

[DataSourceName] is the DSN that you're using for the connection.

You can set additional configuration options by appending key-value pairs to the connection string.

> [!NOTE]
> Configuration options that are passed in using a connection string take precedence over configuration options that are set in the DSN.

## DSN-less connection string examples

Some applications provide support for connecting to a data source using a connector without a DSN. To connect to a data source without using a DSN, use a connection string instead.

The placeholders in the examples are defined as follows, in alphabetical order:

- [Auth_Client_ID] is your Authentication Client ID.
- [Auth_Client_Secret] is your Authentication Client Secret (Synapse only).
- [Auth_Flow] is the authentication workflow: 1 for Client Credentials, 2 for Browser Based.
- [Auth_Tenant_ID] is your Authentication Tenant ID.
- [Auth_Scope] is your Authentication Scopes.
- [Host] is the IP address or host name of the Synapse or Fabric service to which you're connecting.
- [HTTP_Path] is the partial URL corresponding to the server to which you're connecting.
- [Lakehouse_ID] is the ID of the Lakehouse being accessed (Fabric only).
- [Spark_Pool] is the name of the Spark Pool being accessed (Synapse only).
- [SparkServerType] is the server type to which you're connecting: 5 for Synapse, 6 for Fabric.
- [Workspace_ID] is the ID of the Workspace being accessed (Fabric only)

The following is the format of a DSN-less connection string that connects to Microsoft Fabric:

```html
Driver={Simba ODBC Data Connector for Microsoft Fabric Spark}; Host=[Host]; Auth_Flow=2; Auth_Scope=[Auth_Scope]; SparkServerType=6; Auth_Client_ID=[Auth_Client_ID]; Auth_Tenant_ID=[Auth_Tenant_ID]; HTTPPath=[HTTP_Path]
```

For example:

```html
Driver={Simba ODBC Data Connector for Microsoft Fabric Spark}; Host=api.fabric.microsoft.com; Auth_Flow=2; Auth_Scope={https://analysis.windows.net/powerbi/api/Code.AccessStorage.All https://analysis.windows.net/powerbi/api/Item.Execute.All https://analysis.windows.net/powerbi/api/Item.ReadWrite.All}; SparkServerType=6; Auth_Client_ID=[Auth_Client_ID]; Auth_Tenant_ID=[Auth_Tenant_ID]; HTTPPath=v1/Workspaces/[Workspace_ID]/lakehouses/[Lakehouse_ID]/livyapi/versions/2024-07-30
```

The following is the format of a DSN-less connection string that connects to Azure Synapse:

```html
Driver={Simba ODBC Data Connector for Microsoft Fabric Spark}; Host=[Host]; Auth_Flow=1; Auth_Scope=[Auth_Scope]; SparkServerType=5; Auth_Client_ID=[Auth_Client_ID]; Auth_Tenant_ID=[Auth_Tenant_ID]; HTTPPath=[HTTP_Path]; Auth_Client_Secret=[Auth_Client_Secret]
```

For example:

```html
Driver={Simba ODBC Data Connector for Microsoft Fabric Spark}; Host=[Synapse workspace name].dev.azuresynapse.net; Auth_Flow=1; Auth_Scope=https://dev.azuresynapse.net/.default; SparkServerType=5; Auth_Client_ID=[Auth_Client_ID]; Auth_Tenant_ID=[Auth_Tenant_ID]; HTTPPath=livyApi/versions/2024-09-20/sparkPools/[Spark_Pool]; Auth_Client_Secret=[Auth_Client_Secret]
```

## Connecting to Fabric Spark with Python

The following is an example of connecting to Microsoft Fabric Spark using Python/pyodbc. Replace all bold/italic placeholders (e.g. {your-client-id}) with your specific details.

```python
import pyodbc
# Define your connection string
connection_string = (
"Driver={ Simba ODBC Data Connector for Microsoft Fabric Spark};"
"Host=api.fabric.microsoft.com;"
"Auth_Flow=2;"
"Auth_Scope={https://analysis.windows.net/powerbi/api/Code.AccessStorage.All https://analysis.windows.net/powerbi/api/Item.Execute.All https://analysis.windows.net/powerbi/api/Item.ReadWrite.All};"
"SparkServerType=6;"
"Auth_Client_ID={your-client-id};"
"Auth_Tenant_ID={your-tenant-id};"
"HTTPPath=v1/Workspaces/{your-workspace-id}/lakehouses/{your-lakehouse-id}/livyapi/versions/2024-07-30;"
)

# Define the query to be executed
query = "SELECT * FROM {your-table-name}"

try:
    # Establish connection to the database
    with pyodbc.connect(connection_string, autocommit=True) as conn:
        print("Connection established successfully.")
        # Create a cursor object
        cursor = conn.cursor()
        
        # Execute the query
        cursor.execute(query)
        
        # Get column names and retrieve the results
        columns = [column[0] for column in cursor.description]  
        rows = cursor.fetchall()
        
        # Display results
        print("Query Results:")
        print(columns)
        for row in rows:
            print(row)
            
except pyodbc.Error as e:
    print("Error:", e)

finally:
    # Ensure the connection is properly closed
    if 'conn' in locals() and conn is not None:
        conn.close()
        print("Connection closed.")     
```
