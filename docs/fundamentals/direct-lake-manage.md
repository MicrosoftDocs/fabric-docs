---
title: "Manage Direct Lake semantic models"
description: "Learn about how to manage Direct Lake semantic models."
author: peter-myers
ms.author: phseamar
ms.reviewer: davidi
ms.date: 09/16/2024
ms.topic: conceptual
ms.custom: fabric-cat
---

# Manage Direct Lake semantic models

This article describes design topics relevant to managing Direct Lake semantic models.

## Post-publication tasks

After you first publish a Direct Lake semantic model ready for reporting, you should immediately complete some post-publication tasks. These tasks can also be adjusted at any time during the lifecycle of the semantic model.

- [Set up the cloud connection](#set-up-the-cloud-connection)
- [Manage security role membership](#manage-security-role-membership)
- [Set Fabric item permissions](#set-fabric-item-permissions)
- [Set up scheduled refresh](#refresh-direct-lake-semantic-models)

Optionally, you can also set up [data discovery](/power-bi/collaborate-share/service-discovery) to allow report creators to read metadata, helping them to discover data in the [OneLake data hub](../governance/onelake-catalog-overview.md) and request access to it. You can also [endorse](/power-bi/collaborate-share/service-endorsement-overview) (certified or promoted) the semantic model to communicate that it represents quality data fit for use.

## Set up the cloud connection

A Direct Lake semantic model uses a cloud connection to connect to the SQL analytics endpoint. It enables access to source data, which is either the Parquet files in OneLake (Direct Lake storage mode, which involves loading column data into memory) or the SQL analytics endpoint (when queries [fall back](direct-lake-overview.md#directquery-fallback) to DirectQuery mode).

### Default cloud connection

When you create a Direct Lake semantic model, the default cloud connection is used. It leverages single sign-on (SSO), which means that the identity that queries the semantic model (often a report user) is used to query the SQL analytics endpoint data.

### Sharable cloud connection

Optionally, you can create a sharable cloud connection (SCC) so that connections to the data source can be made with a fixed identity. It can help enterprise customers protect their organizational data stores. The IT department can manage credentials, create SCCs, and share them with the intended creators for centralized access management.

To set up a fixed identity, see [Specify a fixed identity for a Direct Lake semantic model](direct-lake-fixed-identity.md).

#### Authentication

The fixed identity can authenticate either by using _OAuth 2.0_ or _Service principal_.

> [!NOTE]
> Only Microsoft Entra authentication is supported. Therefore, _Basic_ authentication isn't supported for Direct Lake semantic models.

##### OAuth 2.0

When you use OAuth 2.0, you can authenticate with a Microsoft Entra user account. The user account must have permission to query the SQL analytics endpoint tables and views, and schema metadata.

Using a specific user account isn't a recommended practice. That's because semantic model queries will fail should the password change or the user account be deleted (like when an employee leaves the organization).

##### Service principal

Authenticating with a service principal is the recommended practice because it's not dependent on a specific user account. The security principal must have permission to query the SQL analytics endpoint tables and views, and schema metadata.

For continuity, the service principal credentials can be managed by secret/certificate rotation.

> [!NOTE]
> The Fabric tenant settings must allow service principals, and the service principal must belong to a declared security group.

### Single sign-on

When you create a sharable cloud connection, the _Single Sign-On_ checkbox is unchecked by default. That's the correct setup when using a fixed identity.

You can enable SSO when you want the identity that queries the semantic model to also query the SQL analytics endpoint. In this configuration, the Direct Lake semantic model will use the fixed identity to refresh the model and the user identity to query data.

When using a fixed identity, it's common practice to disable SSO so that the fixed identity is used for both refreshes and queries, but there's no technical requirement to do so.

### Recommended practices for cloud connections

Here are recommended practices related to cloud connections:

- When all users can access the data (and have permission to do so), there's no need to create a shared cloud connection. Instead, the default cloud connection settings can be used. In this case, the identity of the user who queries the model will be used should queries fall back to DirectQuery mode.
- Create a shared cloud connection when you want to use a fixed identity to query source data. That could be because the users who query the semantic model aren't granted permission to read the lakehouse or warehouse. This approach is especially relevant when the semantic model enforces RLS.
- If you use a fixed identity, use the _Service principal_ option because it's more secure and reliable. That's because it doesn't rely on a single user account or their permissions, and it won't require maintenance (and disruption) should they change their password or leave the organization.
- If different users must be restricted to access only subsets of data, if viable, enforce RLS at the semantic model layer only. That way, users will benefit from high performance in-memory queries.
- If possible, avoid OLS and CLS because it results in errors in report visuals. Errors can create confusion or concern for users. For summarizable columns, consider creating measures that return BLANK in certain conditions instead of CLS (if possible).

## Manage security role membership

If your Direct Lake semantic model enforces [row-level security (RLS)](../security/service-admin-row-level-security.md), you might need to manage the members that are assigned to the security roles. For more information, see [Manage security on your model](../security/service-admin-row-level-security.md#manage-security-on-your-model).

## Set Fabric item permissions

Direct Lake semantic models adhere to a layered security model. They perform permission checks via the SQL analytics endpoint to determine whether the identity attempting to access the data has the necessary data access permissions.

You must grant permissions to users so that they can use or manage the Direct Lake semantic model. In short, report consumers need _Read_ permission, and report creators need _Build_ permission. Semantic model permissions can be [assigned directly](/power-bi/connect-data/service-datasets-permissions#what-are-the-semantic-model-permissions) or [acquired implicitly via workspace roles](/power-bi/connect-data/service-datasets-permissions#permissions-acquired-implicitly-via-workspace-role). To manage the semantic model settings (for refresh and other configurations), you must be the [semantic model owner](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning#semantic-model-owner).

Depending on the cloud connection set up, and whether users need to query the lakehouse or the warehouse SQL analytics endpoint, you might need to grant other permissions (described in the table in this section).

> [!NOTE]
> Notably, users don't ever require permission to read data in OneLake. That's because Fabric grants the necessary permissions to the semantic model to read the Delta tables and associated Parquet files (to [load column data](direct-lake-overview.md#column-loading-transcoding) into memory). The semantic model also has the necessary permissions to periodically read the SQL analytics endpoint to perform permission checks to determine what data the querying user (or fixed identity) can access.

Consider the following scenarios and permission requirements.

| Scenario | Required permissions | Comments |
| --- | --- | --- |
| Users can view reports | &bull;&nbsp;Grant _Read_ permission for the reports and _Read_ permission for the semantic model. <br/>&bull;&nbsp;If the [cloud connection](#set-up-the-cloud-connection) uses SSO, grant at least _Read_ permission for the lakehouse or warehouse. | Reports don't need to belong to the same workspace as the semantic model. For more information, see [Strategy for read-only consumers](/power-bi/guidance/powerbi-implementation-planning-security-report-consumer-planning#strategy-for-read-only-consumers). |
| Users can create reports | &bull;&nbsp;Grant _Build_ permission for the semantic model. <br/>&bull;&nbsp;If the cloud connection uses SSO, grant at least _Read_ permission for the lakehouse or warehouse. | For more information, see [Strategy for content creators](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning#report-creators). |
| Users can query the semantic model but are denied querying the lakehouse or SQL analytics endpoint | &bull;&nbsp;Don't grant any permission for the lakehouse or warehouse. | Only suitable when the cloud connection uses a fixed identity. |
| Users can query the semantic model and the SQL analytics endpoint but are denied querying the lakehouse | &bull;&nbsp;Grant _Read_ and _ReadData_ permissions for the lakehouse or warehouse. | **Important**: Queries sent to the SQL analytics endpoint will bypass data access permissions enforced by the semantic model. |
| Manage the semantic model, including refresh settings | &bull;&nbsp;Requires semantic model ownership. | For more information, see [Semantic model ownership](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning#semantic-model-owner). |

> [!IMPORTANT]
> You should always thoroughly test permissions before releasing your semantic model and reports into production.

For more information, see [Semantic model permissions](/power-bi/connect-data/service-datasets-permissions).

## Refresh Direct Lake semantic models

A refresh of a Direct Lake semantic model results in a [framing](direct-lake-overview.md#framing) operation. A refresh operation can be triggered:

- Manually, by doing an [on-demand refresh](/power-bi/connect-data/refresh-data#data-refresh) in the Fabric portal, or by executing the Tabular Model Scripting Language (TMSL) [Refresh command](/analysis-services/tmsl/refresh-command-tmsl) from a script in [SQL Server Management Studio (SSMS)](/sql/ssms/sql-server-management-studio-ssms), or by using a third-party tool that connects via the XMLA endpoint.
- Automatically, by setting up a [refresh schedule](/power-bi/connect-data/refresh-data#configure-scheduled-refresh) in the Fabric portal.
- Automatically, when changes are detected in the underlying Delta tables—for more information, see [Automatic updates](#automatic-updates) (described next).
- Programmatically, by triggering a refresh by using the [Power BI REST API](/power-bi/connect-data/asynchronous-refresh) or [TOM](/analysis-services/tom/tom-pbi-datasets#refreshing-models-with-tom). You might trigger a programmatic refresh as a final step of an extract, transform, and load (ETL) process.

### Automatic updates

There's a semantic model-level setting named _Keep your Direct Lake data up to date_ that does automatic updates of Direct Lake tables. It's enabled by default. It ensures that data changes in OneLake are automatically reflected in the Direct Lake semantic model. The setting is available in the Fabric portal, in the _Refresh_ section of the semantic model settings.

When the setting is enabled, the semantic model performs a framing operation whenever data modifications in underlying Delta tables are detected. The framing operation is always specific to only those tables where data modifies are detected.

We recommend that you leave the setting on, especially when you have a small or medium-sized semantic model. It's especially useful when you have low-latency reporting requirements and Delta tables are modified regularly.

In some situations, you might want to disable automatic updates. For example, you might need to allow completion of data preparation jobs or the ETL process before exposing any new data to consumers of the semantic model. When disabled, you can trigger a refresh by using a programmatic method (described earlier).

> [!NOTE]
> Power BI suspends automatic updates when a _non-recoverable error_ is encountered during refresh. A non-recoverable error can occur, for example, when a refresh fails after several attempts. So, make sure your semantic model can be refreshed successfully. Power BI automatically resumes automatic updates when a subsequent on-demand refresh completes without errors.

## Warm the cache

A Direct Lake semantic model refresh operation might evict all resident columns from memory. That means the first queries after a refresh of a Direct Lake semantic model could experience some delay as [columns are loaded into memory](direct-lake-overview.md#column-loading-transcoding). Delays might only be noticeable when you have extremely large volumes of data.

To avoid such delays, consider warming the cache by programmatically [sending a query](/rest/api/power-bi/datasets/execute-queries) to the semantic model. A convenient way to send a query is to use [semantic link](../data-science/semantic-link-overview.md). This operation should be done immediately after the refresh operation finishes.

> [!IMPORTANT]
> Warming the cache might only make sense when delays are unacceptable. Take care not to unnecessarily load data into memory that could place pressure on other capacity workloads, causing them to throttle or become deprioritized.

## Set the Direct Lake behavior property

You can control fallback of your Direct Lake semantic models by setting its `DirectLakeBehavior` property. It can be set to:

- **Automatic**: (Default) Queries [fall back to DirectQuery mode](direct-lake-overview.md#directquery-fallback) if the required data can't be efficiently loaded into memory.
- **DirectLakeOnly**: All queries use Direct Lake storage mode only. Fall back to DirectQuery mode is disabled. If data can't be loaded into memory, an error is returned.
- **DirectQueryOnly**: All queries use DirectQuery mode only. Use this setting to test fallback performance, where, for instance, you can observe the query performance in connected reports.

You can set the property in the [web modeling experience](/power-bi/transform-model/service-edit-data-models), or by using [Tabular Object Model (TOM)](/analysis-services/tom/introduction-to-the-tabular-object-model-tom-in-analysis-services-amo) or [Tabular Model Scripting Language (TMSL)](/analysis-services/tmsl/tabular-model-scripting-language-tmsl-reference).

> [!TIP]
> Consider disabling DirectQuery fallback when you want to process queries in Direct Lake storage mode only. We recommend that you disable fallback when you don't want to fall back to DirectQuery. It can also be helpful when you want to analyze query processing for a Direct Lake semantic model to identify if and how often fallback occurs.

## Monitor Direct Lake semantic models

You can monitor a Direct Lake semantic model to determine the performance of report visual DAX queries, or to determine when it falls back to DirectQuery mode.

You can use Performance Analyzer, SQL Server Profiler, Azure Log Analytics, or an open-source, community tool, like DAX Studio.

### Performance Analyzer

You can use [Performance Analyzer](/power-bi/create-reports/desktop-performance-analyzer) in Power BI Desktop to record the processing time required to update report elements initiated as a result of any user interaction that results in running a query. If the monitoring results show a _Direct query_ metric, it means the DAX queries were processed in DirectQuery mode. In the absence of that metric, the DAX queries were processed in Direct Lake mode.

For more information, see [Analyze by using Performance Analyzer](direct-lake-analyze-query-processing.md#analyze-by-using-performance-analyzer).

### SQL Server Profiler

You can use [SQL Server Profiler](/sql/tools/sql-server-profiler/sql-server-profiler) to retrieve details about query performance by tracing query events. It's installed with [SQL Server Management Studio (SSMS)](/sql/ssms/sql-server-management-studio-ssms). Before starting, make sure you have the latest version of SSMS installed.

For more information, see [Analyze by using SQL Server Profiler](direct-lake-analyze-query-processing.md#analyze-by-using-sql-server-profiler).

> [!IMPORTANT]
> In general, Direct Lake storage mode provides fast query performance unless a fallback to DirectQuery mode is necessary. Because fallback to DirectQuery mode can impact query performance, it's important to analyze query processing for a Direct Lake semantic model to identify if, how often, and why fallbacks occur.

### Azure Log Analytics

You can use [Azure Log Analytics](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview) to collect, analyze, and act on telemetry data associated with a Direct Lake semantic model. It's a service within [Azure Monitor](https://azure.microsoft.com/services/monitor/), which Power BI uses to save activity logs.

For more information, see [Using Azure Log Analytics in Power BI](/power-bi/transform-model/log-analytics/desktop-log-analytics-overview).

## Related content

- [Direct Lake overview](direct-lake-overview.md)
- [Develop Direct Lake semantic models](direct-lake-develop.md)
- [Understand Direct Lake query performance](direct-lake-understand-storage.md)
- [Create a lakehouse for Direct Lake](direct-lake-create-lakehouse.md)
- [Analyze query processing for Direct Lake semantic models](direct-lake-analyze-query-processing.md)
- [Specify a fixed identity for a Direct Lake semantic model](direct-lake-fixed-identity.md)
