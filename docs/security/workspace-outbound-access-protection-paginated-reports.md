---
title: Workspace outbound access protection for paginated reports
description: Learn how paginated reports connect to data sources, semantic models, maps, and images, and how workspace outbound access protection controls those connections.
author: shivamprasad
ms.author: shivamprasad
ms.topic: concept-article
ms.date: 11/05/2026
#customer intent: As a workspace admin or report author, I want to configure outbound access protection for paginated reports so that their data sources and external resources follow workspace network policies.
ai-usage: ai-assisted
---

# Workspace outbound access protection for paginated reports

Workspace outbound access protection (OAP) controls outbound connections from paginated reports in a protected workspace. Use workspace OAP settings to restrict which data sources, Power BI semantic models, and external resources, such as maps and images, your reports can access.

Paginated reports use different connection rules from interactive Power BI reports. For interactive reports, see [Workspace outbound access protection for Power BI reports](workspace-outbound-access-protection-power-bi-reports.md).

## How paginated reports make outbound connections

A report definition language (`.rdl`) file defines the report's data sources, dataset queries, and references to external resources. When the Power BI service processes and renders the report, it retrieves the data and content needed to produce the report. Hosting the report in a Fabric workspace doesn't mean that all of this data and content resides in that workspace.

Paginated reports can make outbound connections through the following paths:

- **Data sources**: The service uses the report's data source connection information to connect to a source and run dataset queries. Depending on the source, it connects directly, uses a configured data gateway, or delegates the query to Power Query Online (PQO). For example, Azure SQL can use a direct connection, while Snowflake queries use PQO. The results supply the data displayed in the report.
- **Power BI semantic models**: The report connects to a semantic model and queries it for report data, rather than querying the model's underlying data sources directly. To respect workspace OAP settings, the RDL report's connection string should use the XMLA format to connect to the semantic model.
- **Maps and external images**: Rendering a report can require requests to external map services or image URLs referenced by the RDL. These requests retrieve content for the report, even though they aren't database queries. Images embedded in the RDL don't require an external image request.

## How workspace OAP protects these connections

When you enable OAP for the workspace that contains the paginated report, it blocks outbound connections by default. Configure exceptions to allow only the destinations that the report needs. Workspace OAP settings govern both data retrieval and requests for external content, not just connections to databases.

For example, if a report queries Azure SQL and displays an external image, allowing the SQL Server connection doesn't also allow the image URL. You must separately allow the image destination through the Web connector. Similarly, a report that queries a semantic model needs an Analysis Services exception for that connection.

This approach helps you prevent reports from accessing unapproved destinations while retaining access to approved data sources and content. Data connection rules are the mechanism for defining these exceptions. The following section maps each connection path to its connector.

If OAP blocks a required data source connection, the report can't retrieve that data. For external content, the affected resource is blocked: an external image is omitted or map tiles show an error, while the rest of the report can continue rendering.

The report-to-model connection and the semantic model's own data source connections are separate. Allowing a paginated report to query a semantic model doesn't configure outbound access for the model's underlying sources. The OAP settings of the workspace that contains the semantic model govern those connections. For more information, see [Workspace outbound access protection for semantic models](workspace-outbound-access-protection-semantic-models.md).

Workspace OAP covers these service-side requests. It doesn't control a reader clicking a hyperlink in the rendered report and navigating to a website in their browser.

> [!IMPORTANT]
> AIXL-based semantic model connections don't follow workspace OAP settings. Convert them to XMLA before relying on OAP to protect the report-to-model connection. See [Considerations and limitations](#considerations-and-limitations).

## Data connection rules

Configure exceptions by selecting the connector that corresponds to each report data source or external resource.

| Data source or resource | Connector to use in workspace OAP settings |
|---|---|
| Azure SQL | **SQL Server** |
| Power BI semantic model | **Analysis Services** |
| Power Query Online (PQO) | The PQO connector. |
| Snowflake | **Snowflake** |
| Other database sources | The connector specific to the data source. |
| Maps and external images | **Web** |

For instructions on adding connector rules and endpoint exceptions, see [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md).

> [!IMPORTANT]
> For paginated reports that connect to Power BI semantic models, use the **Analysis Services** connector in workspace OAP settings. The **Power BI semantic model** connector doesn't work for these connections. To respect the workspace OAP settings, the RDL report's connection string should use the XMLA format to connect to the semantic model.

## Configure outbound access protection for paginated reports

1. Review the prerequisites and enable OAP for the workspace by following [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).

1. For each semantic model data source in your report definition language (`.rdl`) file, check the connection string. If it uses the Analyze in Excel (AIXL) format, convert the connection to the XML for Analysis (XMLA) format so that it follows workspace OAP settings. For XMLA connection information, see [Connect to semantic models with client applications and tools](../enterprise/powerbi/service-premium-connect-tools.md).

1. Add data connection rules for the report's data sources, maps, and external images, using the connectors in the preceding table.

1. Allow up to 30 minutes for workspace OAP settings to propagate to paginated reports.

1. Run the report in the protected workspace. Verify that approved data sources, semantic models, maps, and external images are accessible, and that destinations without an exception remain blocked.

## Considerations and limitations

- **AIXL connection strings aren't compliant**: Paginated reports with AIXL-based connection strings don't follow workspace OAP settings. To make a report with a semantic model data source follow these settings, convert its connection to the XMLA format. Don't rely on workspace OAP settings to govern an AIXL-based connection.
- **Semantic models require the Analysis Services connector**: Use **Analysis Services** when defining data connection rules for a paginated report's semantic model data source. The **Power BI semantic model** connector doesn't work for this scenario.
- **Dynamic dataset binding isn't supported**: [Dynamic dataset binding](/javascript/api/overview/powerbi/bind-report-datasets) isn't currently supported for paginated reports in workspaces with OAP enabled.
- **Propagation can take up to 30 minutes**: Changes to workspace OAP settings can take up to 30 minutes to take effect for paginated reports. Allow for this delay before validating policy changes.

For limitations that apply across workloads, see [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md).
- [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).
- [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md).
- [Workspace outbound access protection for semantic models](workspace-outbound-access-protection-semantic-models.md).
