---
title: Simba ODBC Data Connector for Data Engineering (Preview) 
description: Learn about the Simba ODBC Data Connector for Microsoft Fabric Data Engineering, detailing its features, installation, and configuration processes.
ms.reviewer: snehagunda
ms.author: sngun
author: SnehaGunda
ms.topic: how-to
ms.date: 05/02/2025
ms.devlang: python, scala
#customer intent: As a Microsoft Fabric user I want to learn about the Simba ODBC Data Connector for Microsoft Fabric Data Engineering, detailing its features, installation, and configuration processes.
---

# Simba ODBC Data Connector for Microsoft Fabric Data Engineering (Public Preview)

The Simba ODBC Data Connector for Microsoft Fabric Data Engineering (Spark) is used for direct SQL and SparkSQL access to Microsoft Fabric Spark or Azure Synapse Spark, enabling Business Intelligence (BI), analytics, and reporting on Spark-based data.
The connector efficiently transforms an application’s SQL query into the equivalent form in SparkSQL, which is a subset of SQL-92. If an application is Spark-aware, then the connector is configurable to pass the query through to the database for processing. The connector interrogates Spark to obtain schema information to present to a SQL-based application. The Simba ODBC Data Connector for Microsoft Fabric Data Engineering complies with the ODBC 3.80 data standard and adds important functionality such as Unicode and 32- and 64-bit support for high- performance computing environments. ODBC is one of the most established and widely supported APIs for connecting to and working with databases. At the heart of the technology is the ODBC connector, which connects an application to the database.
For more information about ODBC, see: [What is ODBC?](https://insightsoftware.com/blog/what-is-odbc/).
For complete information about the ODBC specification, see the [ODBC API Reference from the Microsoft documentation](https://docs.microsoft.com/sql/odbc/reference/syntax/odbc-api-reference).

> [!NOTE]
> The Simba ODBC Data Connector for Microsoft Fabric Spark is available for Microsoft® Windows® platform.

## Here is a quick example of how it works

Review this example of how this process works.

:::image type="content" source="media\simba-odbc-data-connector\example.gif" alt-text="Animated example showing the Simba ODBC connector.":::

### System Requirements

Install the connector on client machines where the client application is installed. Before installing the connector, make sure that you have the following:

- Administrator rights on your machine.
- A machine that meets the following system requirements:
  - Windows 10 or 11
  - Windows Server 2025, 2022, 2019, or 2016
  - 150 MB of available disk space

The Simba ODBC Data Connector for Microsoft Fabric Spark supports Spark versions 3.5 and later for Microsoft Fabric Spark and version 3.4 and later for Azure Synapse.

### Authentication

You can download the Simba ODBC Data Connector for Microsoft Fabric Spark from Simba landing page: [Custom ODBC Driver SDK](https://insightsoftware.com/drivers/simba-sdk)

On 64-bit Windows operating systems, you can execute both 32-bit and 64-bit applications. However, 64-bit applications must use 64-bit connectors, and 32-bit applications must use 32-bit connectors. Make sure that you use a connector whose bitness matches the bitness of the client application:

- Simba Fabric Spark 0.9 32-bit.msi for 32-bit applications
- Simba Fabric Spark 0.9 64-bit.msi for 64-bit applications

To install the Simba ODBC Data Connector for Microsoft Fabric Spark on Windows:

1. Depending on the bitness of your client application, double-click to run Simba Fabric Spark 0.9 32-bit.msi or Simba Fabric Spark 0.9 64-bit.msi.
1. Click Next.
1. Select the check box to accept the terms of the License Agreement if you agree, and then click Next.
1. To change the installation location, click Change, then browse to the desired folder, and then click OK. To accept the installation location, click Next.
1. Click Install.
1. When the installation completes, click Finish.

### Creating a Data Source Name on Windows

Typically, after installing the Simba ODBC Data Connector for Microsoft Fabric Spark, you need to create a Data Source Name (DSN). A DSN is a data structure that stores connection information so that it can be used by the connector to connect to Spark.
Alternatively, you can specify connection settings in a connection string. Settings in the connection string take precedence over settings in the DSN.
The following instructions describe how to create a DSN. For information about specifying settings in a connection string, see Using a Connection String section of this documentation.
To create a Data Source Name on Windows:

> [!NOTE]
> Make sure to select the ODBC Data Source Administrator that has the same bitness as the client application that you are using to connect to Spark.

1. From the Start menu, go to ODBC Data Sources.
1. In the ODBC Data Source Administrator, click the Drivers tab, and then scroll down as needed to confirm that the Simba ODBC Data Connector for Microsoft Fabric Spark appears in the alphabetical list of ODBC drivers that are installed on your system.
1. Choose one:

- To create a DSN that only the user currently logged into Windows can use, click the User DSN tab.
- Or, to create a DSN that all users who log into Windows can use, click the System DSN tab.

> [!NOTE]
> It is recommended that you create a System DSN instead of a User DSN. Some applications load the data using a different user account and might not be able to detect User DSNs that are created under another user account.

1. Click Add.
1. In the Create New Data Source dialog box, select Simba ODBC Data Connector for Microsoft Fabric Spark and then click Finish. The Simba ODBC Data Connector for Microsoft Fabric Spark DSN Setup dialog box opens.
1. In the Data Source Name field, type a name for your DSN.
1. Optionally, in the Description field, type relevant details about the DSN.
1. From the Spark Server Type drop-down list, select the appropriate server type for the version of Spark that you are running:

- If you are connecting to Microsoft Fabric, then select FABRIC.
- If you are connecting to Azure Synapse, then select SYNAPSE.

1. In the Host(s), type in the hostname corresponding to the server.
1. In the HTTP Path, type in the partial URL corresponding to the server.
1. Optionally, in the Environment ID, type in the Environment ID that you wish to use. This is applicable to Microsoft Fabric only.
1. In the Authentication area, configure authentication as needed. For more information, see Configuring Authentication on Windows.
1. To configure the connector to connect to Spark through a proxy server, click Proxy Options. For more information, see Configuring a Proxy Connection on Windows.
1. To configure client-server verification over SSL, click SSL Options. For more information, see Configuring SSL Verification on Windows.
1. To configure advanced connector options, click Advanced Options. For more information, see Configuring Advanced Options on Windows.
1. To configure server-side properties, click Advanced Options and then click Server Side Properties. For more information, see Configuring Server-Side Properties on Windows.
1. To configure logging behavior for the connector, click Logging Options. For more information, see Configuring Logging Options on Windows.
1. To test the connection, click Test. Review the results as needed, and then click OK.

> [!NOTE]
> If the connection fails, then confirm that the settings in the Simba Spark ODBC Driver DSN Setup dialog box are correct. Contact your Spark server administrator as needed.

1. To save your settings and close the Simba ODBC Data Connector for Microsoft Fabric Spark DSN Setup dialog box, click OK.
1. To close the ODBC Data Source Administrator, click OK.

### Client credentials

This authentication mechanism requires SSL to be enabled.
You can use client secret as the client credentials.

To configure OAuth 2.0 client credentials authentication using the client secret:

1. To access authentication options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, and then click Configure.
1. From the Spark Server Type drop-down list\select SYNAPSE.
1. Click OAuth Options, and then do the following:
    1. From the Authentication Flow drop-down list, select Client Credentials.
    1. In the Client ID field, type your client ID.
    1. In the Client Secret field, type your client secret.
    1. In the Tenant ID field, type your tenant ID.
    1. In the OAuth Scope field, type <https://dev.azuresynapse.net/.default>
    1. Optionally, select Encryption Options… and choose the encryption password for Current User Only or All Users of this Machine. Then click OK.
    1. To save your settings and close the OAuth Options dialog box, click OK.
1. To save your settings and close the DSN Setup dialog box, click OK.

### Browser Based Authorization Code

This authentication mechanism requires SSL to be enabled.

To configure OAuth 2.0 browser-based authentication:

1. To access authentication options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, and then click Configure.
1. From the Spark Server Type drop-down list, select FABRIC.
1. Click OAuth Options, and then do the following:
    1. From the Authentication Flow drop-down list, select Browser Based Authorization Code.
    1. In the Tenant ID field, type your tenant ID.
    1. In the Client ID field, type your client ID.
    1. In the OAuth Scope field, type (spaces are required between scopes):

```html
https://analysis.windows.net/powerbi/api/Code.AccessStorage.All
https://analysis.windows.net/powerbi/api/Item.Execute.All
https://analysis.windows.net/powerbi/api/Item.ReadWrite.All
```

(or the scopes that are appropriate for your case).

1. Optionally, select the Ignore SQL_DRIVER_NOPROMPT check box. When the application is making a SQLDriverConnect call with a SQL_DRIVER_NOPROMPT flag, this option displays the web browser used to complete the browser-based authentication flow.

1. To save your settings and close the OAuth Options dialog box, click OK.

1. To save your settings and close the DSN Setup dialog box, click OK.

> [!NOTE]
> When the browser-based authentication flow completes, the access token and refresh token are saved in the token cache, and the connector does not need to authenticate again.

### Configuring Advanced Options on Windows

You can configure advanced options to modify the behavior of the connector.

The following instructions describe how to configure advanced options in a DSN and in the connector configuration tool. You can specify the connection settings described below in a DSN, in a connection string, or as connector-wide settings. Settings in the connection string take precedence over settings in the DSN, and settings in the DSN take precedence over connector-wide settings.
To configure advanced options on Windows:

1. To access advanced options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then click Configure, and then click Advanced Options.
2. To disable the SQL Connector feature, select the Use Native Query check box.

>[!IMPORTANT]
> When this option is enabled, the connector cannot execute parameterized queries.
> By default, the connector applies transformations to the queries emitted by an application to convert the queries into an equivalent form in SparkSQL. If the application is Spark-aware and already emits SparkSQL, then turning off the translation avoids the additional overhead of query transformation.

1. To enable the connector to return SQL_WVARCHAR instead of SQL_VARCHAR for STRING and VARCHAR columns, and SQL_WCHAR instead of SQL_CHAR for CHAR columns, select the Unicode SQL Character Types check box.
1. In the Max Bytes Per Fetch Request field, type the maximum number of bytes to be fetched.

>[!NOTE]
> This option is applicable only when connecting to a server that supports result set data serialized in Arrow format.
> The value must be specified in one of the following:

- B (bytes)
- KB (kilobytes)
- MB (megabytes)
- GB (gigabytes)
- By default, the file size is in B (bytes).

1. In the Default String Column Length field, type the maximum data length for STRING columns.
1. In the Binary Column Length field, type the maximum data length for BINARY columns.
1. In the Async Exec Poll Interval field, type the time in milliseconds between each poll for the query execution status.
1. In the Query Timeout field, type the number of seconds that an operation can remain idle before it is closed.
1. To save your settings and close the Advanced Options dialog box, click OK.

### Configuring a Proxy Connection on Windows

If you are connecting to the data source through a proxy server, you must provide connection information for the proxy server.

To configure a proxy server connection on Windows:

1. To access proxy server options, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then click Configure, and then click Proxy Options.
1. Select the Use Proxy check box.
1. In the Proxy Host field, type the host name or IP address of the proxy server.
1. In the Proxy Port field, type the number of the TCP port that the proxy server uses to listen for client connections.
1. In the Proxy Username field, type your username for accessing the proxy server.
1. In the Proxy Password field, type the password corresponding to the username.
1. To encrypt your credentials, click Password Options and then select one of the following:

- If the credentials are used only by the current Windows user, select Current User Only.
- Or, if the credentials are used by all users on the current Windows machine, select All Users Of This Machine.

1. To confirm your choice and close the Password Options dialog box, click OK.
1. In the Hosts Not Using Proxy field, type the list of hosts or domains that do not use a proxy.
1. To save your settings and close the HTTP Proxy Options dialog box, click OK.

### Configuring SSL Verification on Windows

If you are connecting to a Spark server that has Secure Sockets Layer (SSL) enabled, you can configure the connector to connect to an SSL-enabled socket.

When using SSL to connect to a server, the connector supports identity verification between the client (the connector itself) and the server.
The following instructions describe how to configure SSL in a DSN. You can specify the connection settings described below in a DSN, or in a connection string. Settings in the connection string take precedence over settings in the DSN.
To configure SSL verification on Windows:

1. To access SSL options for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then click Configure, and then click SSL Options.
1. Select the Enable SSL check box.
1. To allow authentication using self-signed certificates that have not been added to the list of trusted certificates, select the Allow Self-signed Server Certificate check box.
1. To allow the common name of a CA-issued SSL certificate to not match the host name of the Spark server, select the Allow Common Name Host Name Mismatch check box.
1. To specify the CA certificates that you want to use to verify the server, do one of the following:

- To verify the server using the trusted CA certificates from a specific .pem file, specify the full path to the file in the Trusted Certificates field and clear the Use System Trust Store check box.
- Or, to use the trusted CA certificates .pem file that is installed with the connector, leave the Trusted Certificates field empty, and clear the Use System Trust Store check box.
- Or, to use the Windows trust store, select the Use System Trust Store check box.

> [!IMPORTANT]

> - If you are using the Windows trust store, make sure to import the trusted CA certificates into the trust store.
> - If the trusted CA supports certificate revocation, select the Check Certificate Revocation check box.

1. From the Minimum TLS Version drop-down list, select the minimum version of TLS to use when connecting to your data store.
1. To configure two-way SSL verification, select the Two-Way SSL check box and then do the following:

    1. In the Client Certificate File field, specify the full path of the PEM file containing the client's certificate.
    1. In the Client Private Key File field, specify the full path of the file containing the client's private key.
    1. If the private key file is protected with a password, type the password in the Client Private Key Password field.

> [!IMPORTANT]
> The password is obscured, that is, not saved in plain text. However, it is still possible for the encrypted password to be copied and used.

   1. To encrypt your credentials, click Password Options and then select one of the following:
    1. If the credentials are used only by the current Windows user, select Current User Only.
    1. Or, if the credentials are used by all users on the current Windows machine, select All Users Of This Machine. To confirm your choice and close the Password Options dialog box, click OK.
    1. To save your settings and close the SSL Options dialog box, click OK.

### Configuring Server-Side Properties on Windows

You can use the connector to apply configuration properties to the Spark server.

The following instructions describe how to configure server-side properties in a DSN. You can specify the connection settings described below in a DSN, or in a connection string. Settings in the connection string take precedence over settings in the DSN.

To configure server-side properties on Windows:

1. To configure server-side properties for a DSN, open the ODBC Data Source Administrator where you created the DSN, then select the DSN, then click Configure, then click Advanced Options, and then click Server Side Properties.
1. To create a server-side property, click Add, then type appropriate values in the Key and Value fields, and then click OK.

> [!NOTE]
> For a list of all Hadoop and Spark server-side properties that your implementation supports, type set -v at the Spark CLI command line. You can also execute the set -v query after connecting using the connector.

1. To edit a server-side property, select the property from the list, then click Edit, then update the Key and Value fields as needed, and then click OK.
1. To delete a server-side property, select the property from the list, and then click Remove. In the confirmation dialog box, click Yes.
1. To configure the connector to convert server-side property key names to all lower- case characters, select the Convert Key Name To Lower Case check box.
1. To change the method that the connector uses to apply server-side properties, do one of the following:

- To configure the connector to apply each server-side property by executing a query when opening a session to the Spark server, select the Apply Server Side Properties With Queries check box.
- Or, to configure the connector to use a more efficient method for applying server-side properties that does not involve additional network round-tripping, clear the Apply Server Side Properties With Queries check box.

1. save your settings and close the Server Side Properties dialog box, click OK.










# [Scala](#tab/scala)

```scala
import com.esri.geoanalytics._
import com.esri.geoanalytics.sql.{functions => ST}
```
---

## ArcGIS capabilities

ArcGIS provides extensive geospatial capabilities for various applications. Esri is integrating the ArcGIS spatial analytics capabilities into Microsoft Fabric, offering ArcGIS GeoAnalytics functions and tools in the Fabric Spark environment. This integration to help you analyze events, visualize spatial relationships, and gain insights from your data. These capabilities enable the following tasks:

| Task type | Description |
|---------|---------|
| Access or create spatial data | Access spatial data files saved in OneLake or as feature services in your Esri environment. Convert x and y coordinates into point geometries, or translate between well-defined text and binary representations (For example, well-known text, well-known binary, [GeoJSON](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_geom_from_geojson/) etc.) into a geometry. See the [ArcGIS GeoAnalytics developer documentation](https://developers.arcgis.com/geoanalytics-fabric/data/data-sources/) for more information on supported data sources. |
| Prepare data                  | Clean, transform, enrich, extract, and load your data for analysis and modeling tasks. ArcGIS GeoAnalytics provides more than [160 functions](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/) for manipulating your spatial data.                                                      |
| Enrich data based on location      | Add key attributes to your datasets based on shared location or proximity. For instance, add national census-collected sociodemographic data using spatial relationship predicates. This includes identifying if the customer location is inside an area of interest (containment) or within a specified [distance](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_dwithin/). |
| Proximity analysis            | Generate insights based on the distance between features, such as the [nearest neighbors](https://developers.arcgis.com/geoanalytics-fabric/tools/nearest-neighbors/), all locations within a [distance of interest](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_dwithin/), or create [groups of features based on proximity](https://developers.arcgis.com/geoanalytics-fabric/tools/group-by-proximity/).                                               |
| Analyze movement              | Understand patterns across space and time for tracks of moving entities (for example, GPS data tracking vehicle movement), such as [calculating motion statistics](https://developers.arcgis.com/geoanalytics-fabric/tools/calculate-motion-statistics/) or [finding dwell locations](https://developers.arcgis.com/geoanalytics-fabric/tools/find-dwell-locations/).                                                |
| Identify clusters and hotspots| Find [statistically significant groupings](https://developers.arcgis.com/geoanalytics-fabric/tools/find-hot-spots/) within your data according to their attributes and location in space and time.                                                                                                             |
| Find similar locations        | Identify locations that are [similar](https://developers.arcgis.com/geoanalytics-fabric/tools/find-similar-locations/) to one another based on location and attributes, or calculate similarity between line features.                                                                                     |
| Aggregation for business intelligence | [Aggregate data](https://developers.arcgis.com/geoanalytics-fabric/tools/aggregate-points/) and write results back into OneLake for use in Power BI, or schedule your workflows to drive automated updates.                                                                                                 |

### Usage examples

* **Data engineering and transformations** – Automate data cleaning, transformation, and loading using notebooks in Data Science and Data Engineering or pipelines in Data Factory:

  :::image type="content" source="media\spark-arcgis-geoanalytics\spatial-analytics-pipelines.png" alt-text="Screenshot showing spatial analytics in pipelines.":::

* **Hotspot and clustering analysis** – Identify significant spatial clusters of [high (hot spots) and low values (cold spots)](https://developers.arcgis.com/geoanalytics-fabric/tools/find-hot-spots/), [spatial outliers](https://developers.arcgis.com/geoanalytics-fabric/tools/find-point-clusters/), or similar feature groupings:
  
  :::image type="content" source="media\spark-arcgis-geoanalytics\cluster-analysis.jpg" alt-text="Screenshot showing hotspot and clustering analysis.":::

* **Spatial pattern identification and analysis** – Gain insights into the distribution and [patterns](https://developers.arcgis.com/geoanalytics-fabric/tools/aggregate-points/) of features and data trends across areas or time periods:

  :::image type="content" source="media\spark-arcgis-geoanalytics\pattern-identification.png" alt-text="Screenshot showing spatial pattern identification and analysis.":::

* **[Spatial joins](https://developers.arcgis.com/geoanalytics-fabric/core-concepts/spatial-joins/) for data enrichment and location analytics** – Add location-based context based on spatial proximity or proximity across both space and time.

* **[Track and movement analysis](https://developers.arcgis.com/geoanalytics-fabric/trk-functions/)** – Analyze patterns in GPS or other types of tracking data to [detect incidents](https://developers.arcgis.com/geoanalytics-fabric/tools/detect-incidents/), [calculate motion statistics](https://developers.arcgis.com/geoanalytics-fabric/tools/calculate-motion-statistics/), and understand change in location over time:

  :::image type="content" source="media\spark-arcgis-geoanalytics\movement-analysis.png" alt-text="Screenshot showing track and movement analysis.":::

* **[Aggregation](https://developers.arcgis.com/geoanalytics-fabric/tools/aggregate-points/) and enrichment for use in Power BI dashboards** – Write results back into OneLake for use in Power BI.  Schedule your workflows to drive automated updates:

  :::image type="content" source="media\spark-arcgis-geoanalytics\aggregation-power-bi.png" alt-text="Screenshot showing spatial data aggregation in Power BI.":::

For more information on all functions and tools, see [ArcGIS GeoAnalytics Developer Documentation](https://developers.arcgis.com/geoanalytics-fabric).

Beyond ArcGIS GeoAnalytics, you can enhance your spatial data in Fabric using [ArcGIS for Power BI](https://doc.arcgis.com/en/microsoft-365/latest/power-bi/get-started-with-arcgis-for-power-bi.htm). It enables custom data visualization and spatial insights in reports and dashboards.

These capabilities help organizations use geographic context for better decision-making and efficiency. Learn more about Esri’s ArcGIS product suite at the [ArcGIS Architecture Center](https://architecture.arcgis.com/en/overview/introduction-to-arcgis/arcgis-capabilities.html) and [ArcGIS and Fabric integrations](https://www.esri.com/en-us/c/product/spatial-analytics-in-microsoft-fabric) site.

## Code templates and examples

You can find code templates and examples in the [ArcGIS GeoAnalytics Developer Documentation](https://developers.arcgis.com/geoanalytics-fabric/), the [Esri Community for GeoAnalytics for Fabric](https://community.esri.com/t5/arcgis-geoanalytics-for-microsoft-fabric/ct-p/arcgis-geoanalytics-for-microsoft-fabric), and Fabric Data Engineering samples.

Here's an example showing how to do hot spot analysis by importing the *FinfHotSopts* library and setting the parameters:

```python
# import the Find Hot Spots tool
from geoanalytics_fabric.tools import FindHotSpots

# Use Find Hot Spots to evaluate the data using bins of 0.1 mile size, and compare to a neighborhood of 0.5 mile around each bin
result_service_calls = FindHotSpots() \
            .setBins(bin_size=0.1, bin_size_unit="Miles") \
            .setNeighborhood(distance=0.5, distance_unit="Miles") \
            .run(dataframe=df)
```

The results can be further analyzed and visualized as shown below:

:::image type="content" source="media\spark-arcgis-geoanalytics\hot-spot-analysis.png" alt-text="Screenshot showing hot spot analysis to evaluate the data.":::

### Get started with spatial data from ArcGIS

The [ArcGIS Living Atlas of the World](https://livingatlas.arcgis.com/en/home/) offers various spatial datasets to start working with the ArcGIS GeoAnalytics library. The Living Atlas is the foremost collection of geographic information from around the globe, including data layers that can be used to support your work with ArcGIS GeoAnalytics. Feature services from the Living Atlas can be read into a dataframe using the ArcGIS GeoAnalytics library to enrich your spatial data. For example, you can read data containing [geometry and attributes for US States](https://www.arcgis.com/home/item.html?id=8c2d6d7df8fa4142b0a1211c8dd66903):

```python

# read a feature service hosted in the Living Atlas of the World 

myFS="https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized_Boundaries/FeatureServer/0" 

df = spark.read.format('feature-service').load(myFS) 

```

This data is now in a dataframe for use with the ArcGIS GeoAnalytics functions, tools, or with other libraries in your Fabric notebooks. For instance, you could enrich a point dataset with state details using a spatial join relationship (for example, using [ST_Contains](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_contains/) to identify which state polygon contains each point).

The dataframe can be visualized as a table or used to generate a map with ArcGIS GeoAnalytics.

```python

# plot a dataframe with geometry from a feature service 

df.st.plot(basemap="light", geometry="shape", facecolor="yellow", edgecolor="black", alpha=0.5) 

```

:::image type="content" source="media\spark-arcgis-geoanalytics\dataframe-analysis.png" alt-text="Screenshot showing how to plot a dataframe with geometry.":::

### Supportability

Support for ArcGIS GeoAnalytics can be found through the [Esri Community](https://community.esri.com/t5/arcgis-geoanalytics-for-microsoft-fabric/ct-p/arcgis-geoanalytics-for-microsoft-fabric), and the [Developer Documentation](https://developers.arcgis.com/geoanalytics-fabric/).

### Current limitations

Currently, this integrated library has the following known limitations:

* ArcGIS GeoAnalytics doesn't currently work with [Native Execution Engine (NEE)](native-execution-engine-overview.md)

* During the public preview, Scala support is available for ArcGIS GeoAnalytics functions but not tools.

* There's read/write support for spatial data as geometries, however, not all output formats support geometry type.

  * For formats without native geometry support, convert geometries to string or binary types (for example, well-known binary, well-known text, GeoJSON) using functions like [ST_AsText](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_as_text/) and [ST_AsBinary](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_as_binary/).

  * When writing to Delta, ArcGIS GeoAnalytics converts geometry to a well-known binary format. When reading these Delta tables, check the column type and use functions like [ST_GeomFromBinary](https://developers.arcgis.com/geoanalytics-fabric/sql-functions/st_geom_from_binary/) to convert back to geometry.

### Related content

* [Apache Spark runtime in Fabric](runtime.md)
* [How to use notebooks](how-to-use-notebook.md)
* [ArcGIS for Microsoft Fabric](https://go.esri.com/geoanalytics-in-ms-fabric-overview)
* [Developer documentation for ArcGIS GeoAnalytics for Microsoft Fabric](https://developers.arcgis.com/geoanalytics-fabric)
* [ArcGIS GeoAnalytics for Microsoft Fabric Community](https://community.esri.com/t5/arcgis-geoanalytics-for-microsoft-fabric/ct-p/arcgis-geoanalytics-for-microsoft-fabric)