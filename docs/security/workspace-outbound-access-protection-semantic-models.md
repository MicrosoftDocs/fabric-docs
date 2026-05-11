---
title: Workspace outbound access protection for semantic models (preview)
description: Learn how workspace outbound access protection secures semantic model connections by enforcing allow lists on bound data connections during refresh and query operations.
author: kayu
ms.author: kayu
ms.topic: concept
ms.date: 07/10/2025
#customer intent: As a workspace admin, I want to control which external data sources my semantic models can connect to, so that I can prevent unauthorized data exfiltration and enforce network security policies.
ai-usage: ai-assisted
---

# Workspace outbound access protection for semantic models (preview)

Semantic models can pull data from sources inside and outside your organization—cloud databases, on-premises systems via gateways, other Fabric workspaces, and external services. Composite models add another dimension: filter values from one source can flow to another during DirectQuery operations, potentially exposing sensitive data in query logs you don't control.

Workspace outbound access protection addresses this risk. When you enable it, every outbound connection from the workspace is blocked by default. Semantic models can only refresh or query data sources that you explicitly allow through data connection rules.

> [!NOTE]
> This feature is in preview. Power BI reports don't support outbound access protection.

## How enforcement works

Outbound access protection evaluates the semantic model's *bound data connections* before any data moves. This enforcement point sits below Power Query transformations, M expressions, and dataset parameters, so there's no way to route around the policy through query logic.

The same enforcement applies to all storage modes:

- **Import models**: Connections are evaluated during scheduled and on-demand refresh. If any data source isn't on the allow list, the entire refresh fails.
- **DirectQuery models**: Each query is evaluated at execution time. Queries to blocked sources return an error because the data source is inaccessible.
- **Direct Lake on SQL Analytics Endpoint (DL/SQL) models**: The SQL Server connection to the SQL Analytics Endpoint is evaluated. If the workspace's SQL Analytics Endpoint isn't allowed, the model can't access the Delta tables of the lakehouses or warehouses in that workspace.
- **Direct Lake on OneLake (DL/OL) models**: The ADLS Gen2 connection to OneLake is evaluated. If the workspace's OneLake URL isn't allowed, the model can't access its Delta tables.

Policy changes propagate within about 15 minutes. Until propagation completes, existing connections might continue to work.

## Intra-workspace connections require explicit exceptions

Outbound access protection treats *all* connections as potentially cross-workspace, including connections to lakehouses and warehouses in the same workspace as your semantic model. This is by design—SQL Server connections and ADLS Gen2 connections are not "Fabric workspace-aware."

To allow a semantic model to connect to a lakehouse or warehouse in its own workspace:

1. **For Import, DirectQuery, and DL/SQL modes**: Add a SQL Server connection rule with the SQL analytics endpoint's fully qualified domain name (FQDN). Find the FQDN in the lakehouse or warehouse settings under **SQL analytics endpoint** > **SQL connection string**.

1. **For Direct Lake on OneLake mode**: Add an Azure Data Lake Storage Gen2 connection rule with the workspace's OneLake URL. To find this URL, open any Delta table's properties, copy the URL, and trim everything after the workspace GUID. For URL format details, see [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md).

## Configure outbound access protection for semantic models

1. Confirm prerequisites:
   - The workspace is assigned to a Fabric capacity (F SKU).
   - The tenant setting **Configure workspace-level outbound network rules** is enabled.
   - The workspace contains only items that support outbound access protection. Remove any reports, dashboards, or other unsupported items first.

1. Enable outbound access protection for the workspace by following the steps in [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).

1. Add data connection rules for each data source your semantic models need to reach:
   - For cloud sources, see [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md).
   - For on-premises sources, allow the appropriate virtual network or on-premises data gateway.

1. If your semantic models connect to lakehouses or warehouses in the same workspace, add the SQL Server and ADLS Gen2 exceptions described in the previous section.

1. Wait about 15 minutes for the policy to propagate.

1. Validate by refreshing an Import or Direct Lake model or querying a DirectQuery model. Connections to allowed destinations succeed. Blocked connections return an error indicating that outbound access protection policies blocked the connection. Check the [refresh history](/power-bi/connect-data/refresh-data#checking-refresh-status-and-history) for details.

## Deploy semantic models to protected workspaces

Because Power BI reports don't support outbound access protection, you can't publish .pbix files directly to a protected workspace. Use one of these alternatives to deploy the semantic model without a report:

- **Web modeling**: Create or edit the model directly in the Fabric portal.
- **Git integration**: Sync the model definition from a Git repository.
- **Fabric Deployment Pipelines**: Promote the model through deployment stages.
- **XMLA endpoint**: Use XMLA read/write with tools like Tabular Editor, ALM Toolkit, or SQL Server Management Studio.
- **REST API**: Use the [Create item with definition](/rest/api/fabric/semanticmodel/items/create-semantic-model) endpoint.
- **Semantic link**: Deploy from a Fabric notebook using the `sempy` library.

## Considerations and limitations

- **Reports and dashboards aren't supported**: You can't enable outbound access protection on a workspace that contains Power BI reports or dashboards. Remove them first, or host them in a separate workspace that connects to the semantic model remotely.
- **PBIX publish blocked**: Publishing .pbix files fails because the embedded report isn't supported. Use the deployment alternatives listed above.
- **Same-workspace connections need exceptions**: Data sources in the same workspace, including lakehouses, warehouses, and SQL databases, require explicit SQL Server and ADLS Gen2 connection rules. Some connectors, such as the connector for KQL databases in eventhouses, don't support workspace-level or endpoint-granular exceptions yet. To use those sources from a semantic model, you have to allow the entire connector type.
- **F SKU required**: Outbound access protection requires Fabric capacity. Power BI Premium (P SKUs), Embedded (EM SKUs), and Pro workspaces aren't supported.
- **Propagation delay**: Policy changes take about 15 minutes to take effect.

For general outbound access protection limitations that apply across all workloads, see [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
- [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
- [Connecting to Microsoft OneLake](../onelake/onelake-access-api.md)
