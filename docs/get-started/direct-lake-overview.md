---
title: Learn about Direct Lake in Power BI and Microsoft Fabric
description: Describes using Direct Lake to analyze very large semantic models in Power BI and Microsoft Fabric.
author: kfollis
ms.author: kfollis
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.custom:
  - ignite-2023-fabric
ms.topic: concept-article
ms.date: 05/14/2024
LocalizationGroup: Admin
---
# Direct Lake

*Direct Lake* mode is a semantic model capability for analyzing very large data volumes in Power BI. Direct Lake is based on loading parquet-formatted files directly from a data lake without having to query a lakehouse or warehouse endpoint, and without having to import or duplicate data into a Power BI model. Direct Lake is a fast-path to load the data from the lake straight into the Power BI engine, ready for analysis. The following diagram shows how classic import and DirectQuery modes compare with Direct Lake mode.

:::image type="content" source="media/direct-lake-overview/direct-lake-diagram.png" border="false" alt-text="Diagram of Direct Lake features.":::

In DirectQuery mode, the Power BI engine queries the data at the source, which can be slow but avoids having to copy the data like with import mode. Any changes at the data source are immediately reflected in the query results.

On the other hand, with import mode, performance can be better because the data is cached and optimized for DAX and MDX report queries without having to translate and pass SQL or other types of queries to the data source. However, the Power BI engine must first copy any new data into the model during refresh. Any changes at the source are only picked up with the next model refresh.

Direct Lake mode eliminates the import requirement by loading the data directly from OneLake. Unlike DirectQuery, there's no translation from DAX or MDX to other query languages or query execution on other database systems, yielding performance similar to import mode. Because there's no explicit import process, it's possible to pick up any changes at the data source as they occur, combining the advantages of both DirectQuery and import modes while avoiding their disadvantages. Direct Lake mode can be the ideal choice for analyzing very large models and models with frequent updates at the data source.

Direct Lake also supports [row-level security](../security/service-admin-object-level-security.md) and [object-level](../security/service-admin-row-level-security.md) security so users only see the data they have permission to see.

## Prerequisites

Direct Lake is supported on Microsoft Premium (P) SKUs and Microsoft Fabric (F) SKUs only.

> [!IMPORTANT]
> For new customers, Direct Lake is supported on Microsoft Fabric (F) SKUs only. Existing customers can continue to use Direct Lake with Premium (P) SKUs, but transitioning to a Fabric capacity SKU is recommended. See the licensing announcement for more information about [Power BI Premium licensing](https://powerbi.microsoft.com/blog/important-update-coming-to-power-bi-premium-licensing/).

### Lakehouse

Before using Direct Lake, you must provision a lakehouse (or a warehouse) with one or more Delta tables in a workspace hosted on a supported Microsoft Fabric capacity. The lakehouse is required because it provides the storage location for your parquet-formatted files in OneLake. The lakehouse also provides an access point to launch the Web modeling feature to create a Direct Lake model.

To learn how to provision a lakehouse, create a Delta table in the lakehouse, and create a basic model for the lakehouse, see [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md).

### SQL endpoint

As part of provisioning a lakehouse, a SQL endpoint for SQL querying and a default model for reporting are created and updated with any tables added to the lakehouse. While Direct Lake mode doesn't query the SQL endpoint when loading data directly from OneLake, it's required when a Direct Lake model must seamlessly fall back to DirectQuery mode, such as when the data source uses specific features like advanced security or views that can't be read through Direct Lake. Direct Lake mode also queries the SQL endpoint for schema- and security-related information.

### Data Warehouse

As an alternative to a lakehouse with SQL endpoint, you can also provision a warehouse and add tables by using SQL statements or data pipelines. The procedure to provision a standalone data warehouse is almost identical to the procedure for a lakehouse.

## Model write support with XMLA endpoint

Direct Lake models support write operations through the XMLA endpoint by using tools such as SQL Server Management Studio (19.1 and higher), and the latest versions of external BI tools like Tabular Editor and DAX studio. Model write operations through the XMLA endpoint support:

- Customizing, merging, scripting, debugging, and testing Direct Lake model metadata.

- Source and version control, continuous integration, and continuous deployment (CI/CD) with Azure DevOps and GitHub.

- Automation tasks like refreshing, and applying changes to Direct Lake models by using PowerShell and REST APIs.

Direct Lake tables created using XMLA applications will initially be in an unprocessed state until the application issues a refresh command. Unprocessed tables fall back to DirectQuery mode. When creating a new semantic model, make sure to refresh your semantic model to process your tables.

### Enable XMLA read-write

Before performing write operations on Direct Lake models through the XMLA endpoint, XMLA read-write must be enabled for the capacity.

For **Fabric trial** capacities, the trial user has the admin privileges necessary to enable XMLA read-write.

1. In the Admin portal, select **Capacity settings**.

1. Select the **Trial** tab.

1. Select the capacity with **Trial** and your username in the capacity name. 

1. Expand **Power BI workloads**, and then in the **XMLA Endpoint** setting, select **Read Write**.

    :::image type="content" source="media/direct-lake-overview/fabric-enable-xmla-read-write.png" alt-text="Screenshot of the XMLA Endpoint read-write setting for a Fabric trial capacity.":::

Keep in mind, the XMLA Endpoint setting applies to all workspaces and models assigned to the capacity.

### Direct Lake model metadata

When connecting to a standalone Direct Lake model through the XMLA endpoint, the metadata looks like any other model. However, Direct Lake models show the following differences:

- The `compatibilityLevel` property of the database object is 1604 or higher.

- The `Mode` property of Direct Lake partitions is set to `directLake`.

- Direct Lake partitions use shared expressions to define data sources. The expression points to the SQL endpoint of a lakehouse or warehouse. Direct Lake uses the SQL endpoint to discover schema and security information but loads the data directly from the Delta tables (unless Direct Lake must fall back to DirectQuery mode for any reason).

Here's an example XMLA query in SSMS: 

:::image type="content" source="media/direct-lake-dataset-metadata.png" alt-text="Screenshot an XMLA query in SSMS.":::

To learn more about tool support through the XMLA endpoint, see [Semantic model connectivity with the XMLA endpoint](/power-bi/enterprise/service-premium-connect-tools).

## Fallback

Power BI semantic models in Direct Lake mode read Delta tables directly from OneLake. However, if a DAX query on a Direct Lake model exceeds limits for the SKU, or uses features that don’t support Direct Lake mode, like SQL views in a warehouse, the query can fall back to DirectQuery mode. In DirectQuery mode, queries use SQL to retrieve the results from the SQL endpoint of the lakehouse or warehouse, which can impact query performance. You can [disable fallback](#fallback-behavior) to DirectQuery mode if you want to process DAX queries in pure Direct Lake mode only. Disabling fallback is recommended if you don’t need fallback to DirectQuery. It can also be helpful when analyzing query processing for a Direct Lake model to identify if and how often fallbacks occur. To learn more about DirectQuery mode, see [Semantic model modes in Power BI](/power-bi/connect-data/service-dataset-modes-understand#directquery-mode).

***Guardrails*** define resource limits for Direct Lake mode beyond which a fallback to DirectQuery mode is necessary to process DAX queries. For details about how to determine the number of parquet files and row groups for a Delta table, refer to the [Delta table properties reference](/azure/databricks/delta/table-properties#delta-table-properties).

For Direct Lake semantic models, **Max Memory** represents the upper memory resource limit for how much data can be paged in. In effect, it's not a guardrail because exceeding it doesn't cause a fallback to DirectQuery; however, it can have a performance impact if the amount of data is large enough to cause paging in and out of the model data from the OneLake data.

The following table lists both resource guardrails and Max Memory:

| Fabric SKUs |Parquet files per table | Row groups per table | Rows per table (millions) | Max model size on disk/OneLake<sup>[1](#mm)</sup> (GB) | Max memory (GB) |
|-------------|-------------------------|-------------------------|------------------------|-------------------------|-------------------------|
| F2          | 1,000                   | 1,000                | 300                       | 10                       |3                       |
| F4          | 1,000                   | 1,000                | 300                       | 10                       |3                       |
| F8          | 1,000                   | 1,000                | 300                       | 10                       |3                       |
| F16         | 1,000                   | 1,000                | 300                       | 20                       |5                       |
| F32         | 1,000                   | 1,000                | 300                       | 40                       |10                      |
| F64/FT1/P1  | 5,000                   | 5,000                | 1,500                     | Unlimited                |25                      |
| F128/P2     | 5,000                   | 5,000                | 3,000                     | Unlimited                |50                      |
| F256/P3     | 5,000                   | 5,000                | 6,000                     | Unlimited                |100                     |
| F512/P4     | 10,000                  | 10,000               | 12,000                    | Unlimited                |200                     |
| F1024/P5    | 10,000                  | 10,000               | 24,000                    | Unlimited                |400                     |
| F2048       | 10,000                  | 10,000               | 24,000                    | Unlimited                |400                     |

<a name="mm">1</a> - If exceeded, Max model size on disk/Onelake causes all queries to the model to fall back to DirectQuery, unlike other guardrails that are evaluated per query.

Depending on your Fabric SKU, additional **Capacity unit** and **Max memory per query** limits also apply to Direct Lake models. To learn more, see [Capacities and SKUs](/power-bi/enterprise/service-premium-what-is#capacities-and-skus).

### Fallback behavior

Direct Lake models include the **DirectLakeBehavior** property, which has three options:

**Automatic** - (Default) Specifies queries fall back to *DirectQuery* mode if data can't be efficiently loaded into memory.

**DirectLakeOnly** - Specifies all queries use Direct Lake mode only. Fallback to DirectQuery mode is disabled. If data can't be loaded into memory, an error is returned. Use this setting to determine if DAX queries fail to load data into memory, forcing an error to be returned.

**DirectQueryOnly** - Specifies all queries use DirectQuery mode only. Use this setting to test fallback performance.

The DirectLakeBehavior property can be configured by using Tabular Object Model (TOM) or Tabular Model Scripting Language (TMSL).

The following example specifies all queries use Direct Lake mode only:

```csharp
// Disable fallback to DirectQuery mode.
//
database.Model.DirectLakeBehavior = DirectLakeBehavior.DirectLakeOnly = 1;
database.Model.SaveChanges();
```

## Analyze query processing

To determine if a report visual's DAX queries to the data source are providing the best performance by using Direct Lake mode, or falling back to DirectQuery mode, you can use Performance analyzer in Power BI Desktop, SQL Server Profiler, or other third-party tools to analyze queries. To learn more, see [Analyze query processing for Direct Lake models](direct-lake-analyze-query-processing.md).

## Refresh

By default, data changes in OneLake are automatically reflected in a Direct Lake model. You can change this behavior by disabling **Keep your Direct Lake data up to date** in the model's settings.

:::image type="content" source="media/direct-lake-overview/direct-lake-refresh.png" alt-text="Screenshot of the Direct Lake refresh option in model settings.":::

You might want to disable if, for example, you need to allow completion of data preparation jobs before exposing any new data to consumers of the model. When disabled, you can invoke refresh manually or by using the refresh APIs. Invoking a refresh for a Direct Lake model is a low cost operation where the model analyzes the metadata of the latest version of the Delta Lake table and is updated to reference the latest files in the OneLake.

Note that Power BI can pause automatic updates of Direct Lake tables if a nonrecoverable error is encountered during refresh, so make sure your semantic model can be refreshed successfully. Power BI automatically resumes automatic updates when a subsequent user-invoked refresh completes without errors.


## Single sign-on (SSO) enabled by default

By default, Direct Lake models rely on **Microsoft Entra Single Sign-On (SSO)** to access Fabric Lakehouse and Warehouse data sources and use the identity of the user currently interacting with the model. You can check the configuration in the Direct Lake model settings by expanding the **Gateway and cloud connections** section, shown in the following screenshot. The Direct Lake model doesn't require an explicit data connection since the Lakehouse or Warehouse is directly accessible, and SSO eliminates the need for stored connection credentials.

:::image type="content" source="media/direct-lake-overview/direct-lake-overview-01.png" alt-text="Screenshot of the gateway and cloud connections configuration settings.":::

You can also explicitly bind the Lakehouse or Warehouse data source to a sharable cloud connection (SCC) in cases where you want to use stored credentials, and thereby disable SSO for that data source connection. To explicitly bind the data source, select the SCC from the **Maps to:** list box in the **Gateway and cloud connections** section. You can also create a new connection by selecting **Create a connection**, then follow the steps to provide a connection name. Next, select **OAuth 2.0** as the authentication method for the new connection, enter the desired credentials and clear the **Single sign-on** checkbox, then bind the Lakehouse or Warehouse data source to the new SCC connection you just created.

The **Default: Single Sign-On (Entra ID)** connection configuration simplifies the Direct Lake model configuration, however, if you already have a personal cloud connection (PCC) to the Lakehouse or Warehouse data source, the Direct Lake model binds to the matching PCC automatically so that the connection settings you already defined for the data source are immediately applied. You should confirm the connection configuration of your Direct Lake models to ensure the models access their Fabric data sources with the correct settings.

Semantic models can use the **Default: Single Sign-On (Entra ID)** connection configuration for Fabric Lakehouses and Warehouses in Direct Lake, Import, and DirectQuery mode. All other data sources require explicitly defined data connections. 


## Layered data access security

Direct Lake models created on top of lakehouses and warehouses adhere to the layered security model that lakehouses and warehouses support by performing permission checks through the T-SQL Endpoint to determine if the identity trying to access the data has the required data access permissions. By default, Direct Lake models use single sign-on (SSO), so the effective permissions of the interactive user determine if the user is allowed or denied access to the data. If the Direct Lake model is configured to use a fixed identity, the effective permission of the fixed identity determines if users interacting with the semantic model can access the data. The T-SQL Endpoint returns Allowed or Denied to the Direct Lake model based on the combination of [OneLake security](/fabric/onelake/security/data-access-control-model) and SQL permissions.

For example, a warehouse administrator can grant a user SELECT permissions on a table so that the user can read from that table even if the user has no OneLake security permissions. The user was authorized at the lakehouse/warehouse level. Conversely, a warehouse administrator can also DENY a user read access to a table. The user will then not be able to read from that table even if the user has OneLake security Read permissions. The DENY statement overrules any granted OneLake security or SQL permissions. Refer to the following table for the effective permissions a user can have given any combination of OneLake security and SQL permissions.

| OneLake security permissions | SQL permissions | Effective permissions |
|-------------------------|-----------------|-----------------------|
| Allow                   | None            | Allow                 |
| None                    | Allow           | Allow                 |
| Allow                   | Deny            | Deny                  |
| None                    | Deny            | Deny                  |

## Known issues and limitations

- By design, only tables in the semantic model derived from tables in a Lakehouse or Warehouse support Direct Lake mode. Although tables in the model can be derived from SQL views in the Lakehouse or Warehouse, queries using those tables will fall back to DirectQuery mode.

- Direct Lake semantic model tables can only be derived from tables and views from a single Lakehouse or Warehouse.

- Direct Lake tables can't currently be mixed with other table types, such as Import, DirectQuery, or Dual, in the same model. Composite models are currently not supported.

- DateTime relationships aren't supported in Direct Lake models.

- Calculated columns and calculated tables aren't supported.

- Some data types might not be supported, such as high-precision decimals and money types.

- Direct Lake tables don't support complex Delta table column types. Binary and Guid semantic types are also unsupported. You must convert these data types into strings or other supported data types.

- Table relationships require the data types of their key columns to coincide. Primary key columns must contain unique values. DAX queries will fail if duplicate primary key values are detected.

- The length of string column values is limited to 32,764 Unicode characters.

- The floating point value ‘NaN’ (Not A Number) isn't supported in Direct Lake models.

- Embedded scenarios that rely on embedded entities aren't supported yet.

- Validation is limited for Direct Lake models. User selections are assumed correct and no queries will validate cardinality and cross filter selections for relationships, or for the selected date column in a date table.

- The Direct Lake tab in the Refresh history only lists Direct Lake-related refresh failures. Successful refreshes are currently omitted. 

## Get started

The best way to get started with a Direct Lake solution in your organization is to create a Lakehouse, create a Delta table in it, and then create a basic semantic model for the lakehouse in your Microsoft Fabric workspace. To learn more, see [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md).

## Related content

- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)  
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)  
