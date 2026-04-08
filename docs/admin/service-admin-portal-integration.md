---
title: Integration admin settings
description: Learn how to configure integration admin settings in Fabric.
author: msmimart
ms.author: mimart
ms.custom:
  - tenant-setting
ms.topic: concept-article
ms.date: 04/08/2026
LocalizationGroup: Administration
---

# Integration tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Allow XMLA endpoints and Analyze in Excel with on-premises semantic models

When enabled, users in the organization can use Excel to view and interact with on-premises Power BI semantic models. This also allows connections to [XMLA endpoints](/power-bi/enterprise/service-premium-connect-tools).

To learn more, see [Create Excel workbooks with refreshable Power BI data](/power-bi/collaborate-share/service-analyze-in-excel).

## Semantic Model Execute Queries REST API

When enabled, users in the organization can query semantic models by using Data Analysis Expressions (DAX) through Power BI REST APIs.

To learn more, see [Datasets - Execute Queries](/rest/api/power-bi/datasets/execute-queries).

## Users can use the Power BI Model Context Protocol server endpoint (preview)

When enabled, the Power BI Model Context Protocol (MCP) server endpoint allows users to connect MCP clients to Power BI and use MCP tools to interact with Power BI artifacts they have permission to access. GitHub Copilot in Visual Studio operates by default. Other MCP clients should be configured with service principals.

To allow service principals to connect to the MCP server, also turn on **Service principals can call Fabric public APIs**.

For more information, see [Power BI Model Context Protocol server endpoint](https://go.microsoft.com/fwlink/?linkid=2338916).

## Use ArcGIS Maps for Power BI

When enabled, users in the organization can use the ArcGIS Maps for Power BI visualization provided by Esri.

To learn more, see [Create ArcGIS maps in Power BI](/power-bi/visuals/power-bi-visualizations-arcgis).

## Use global search for Power BI

When enabled, users in the organization can use external search features that rely on Azure Search.

To learn more, see [Navigation for Power BI business users: global search](/power-bi/consumer/end-user-search-sort).

## Users can use the Azure Maps visual

When enabled, users in the organization can create and view reports that use the Azure Maps visual.

- Microsoft temporarily stores and processes your data for essential services like translating locations into latitudes and longitudes.
- If Azure Maps services are unavailable in your region, your data can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance.

To learn more, see [Get started with Azure Maps Power BI visual](/azure/azure-maps/power-bi-visual-get-started).

## Data sent to Azure Maps can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance

Azure Maps services aren't available in all regions and geographies. When this setting is on, data sent to Azure Maps can be processed in a region where the service is available, which can be outside your tenant's geographic region, compliance boundary, or national cloud instance.

For more information, see [Azure Maps geographic scope](https://go.microsoft.com/fwlink/?linkid=2289253).

## Data sent to Azure Maps can be processed by Microsoft Online Services Subprocessors

Some Azure Maps visual services, including the selection tool and processing location names in some regions, require mapping capabilities provided in part by Microsoft Online Services subprocessors. Microsoft shares only the data needed to provide those services.

For more information, see [Azure Maps subprocessors](https://go.microsoft.com/fwlink/?linkid=2289928).

:::image type="content" source="media/tenant-settings/admin-integration-use-azure-maps-visual-setting.png" alt-text="Screenshot of the Use Azure Maps visual admin setting.":::

## Map and filled map visuals

When enabled, users in the organization can use map and filled map visualizations in their reports.

:::image type="content" source="media/tenant-settings/admin-integration-map-filled-map-visuals-setting.png" alt-text="Screenshot of the map and filled map visuals admin setting.":::

>[!Note]
>In a future release, Power BI plans to deprecate older map visuals and migrate existing reports to Azure Maps. Learn about [converting to Azure Maps](/azure/azure-maps/power-bi-visual-conversion).

## Integration with SharePoint and Microsoft Lists

Users in the organization can create Fabric reports directly from SharePoint and Microsoft Lists. Then they can build Fabric reports on the data in those lists and publish them back to the lists, to be visible to others who can access the list.

This setting is enabled by default. Even if the feature is disabled, in SharePoint and Microsoft Lists users can still see **Power BI** > **Visualize the list**, and any existing reports, on the **Integrate** menu. If they select **Visualize the list**, they go to an error page explaining that their admin disabled the feature.

Learn more about [creating reports from SharePoint and Microsoft Lists](/power-bi/create-reports/service-quick-create-sharepoint-list).

## Dremio SSO

Enable SSO capability for Dremio. By enabling, user access token information, including name and email, is sent to Dremio for authentication.

To learn more, see [Microsoft Entra ID-based Single Sign-On for Dremio Cloud and Power BI](https://powerquery.microsoft.com/blog/azure-ad-based-single-sign-on-for-dremio-cloud-and-power-bi).

## Snowflake SSO

For semantic model owners to be able to enable single sign-on for DirectQuery connections to Snowflake in semantic model settings, a Fabric admin must enable the **Snowflake SSO** setting. This setting approves sending Microsoft Entra credentials to Snowflake for authentication for the entire organization.

To learn more, see [Connect to Snowflake in the Power BI Service](/power-bi/connect-data/service-connect-snowflake).

## Redshift SSO

Enable SSO capability for Redshift. By enabling, user access token information, including name and email, is sent to Redshift for authentication.

To learn more, see [Overview of single sign-on for on-premises data gateways in Power BI](/power-bi/connect-data/service-gateway-sso-overview).

## Google BigQuery SSO

Enable SSO capability for Google BigQuery. By enabling, user access token information, including name and email, is sent to Google BigQuery for authentication.

To learn more, see [Google BigQuery (Azure AD)](/power-query/connectors/google-bigquery-aad).

<a name='azure-ad-single-sign-on-sso-for-gateway'></a>

## Microsoft Entra Single Sign-On (SSO) for Gateway

This setting enables Microsoft Entra SSO through on-premises data gateways to cloud data sources that rely on Microsoft Entra ID-based authentication. It gives seamless Microsoft Entra SSO connectivity to Azure-based data sources, such as Azure Synapse Analytics (SQL DW), Azure Data Explorer, Snowflake on Azure, and Azure Databricks through an on-premises data gateway.

This feature is important for users who work with reports that require SSO connectivity in DirectQuery mode to data sources deployed in an Azure virtual network (Azure VNet). When you configure SSO for an applicable data source, queries execute under the Microsoft Entra identity of the user that interacts with the Power BI report.

An important security-related consideration is that gateway owners have full control over their on-premises data gateways. This means that it's theoretically possible for a malicious gateway owner to intercept Microsoft Entra SSO tokens as they flow through an on-premises data gateway (this isn't a concern for VNet data gateways because they're maintained by Microsoft).

Because of this possible threat, the Microsoft Entra SSO feature is disabled by default for on-premises data gateways. As a Fabric admin, you must enable the **Microsoft Entra Single Sign-On (SSO) for Gateway** tenant setting in the Fabric admin portal before data sources can be enabled for Microsoft Entra SSO on an on-premises data gateway. Before enabling the feature, make sure to restrict the ability to deploy on-premises data gateways in your organization to appropriate administrators.  

To learn more, see [Microsoft Entra SSO](/power-bi/connect-data/service-gateway-azure-active-directory-sso).

## Users can view Power BI files saved in OneDrive and SharePoint (Preview)

This setting allows users to view Power BI files saved in OneDrive for Business and SharePoint Online document libraries in their browser without needing to download the file and open in Power BI Desktop on their local machine. When enabled, the setting applies to all users in your organization. This setting is on by default.

:::image type="content" source="media/service-admin-portal-integration/admin-integration-viewer.png" alt-text="Screenshot of admin setting called: Users can view Power BI items saved in OneDrive and SharePoint.":::

Learn more about [viewing Power BI files saved in OneDrive and SharePoint](/power-bi/collaborate-share/service-sharepoint-viewer).

## Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop (preview)

Users can share links to Power BI Desktop files (.pbix) saved to OneDrive and SharePoint through Power BI Desktop. Sharing uses standard OneDrive and SharePoint sharing functionality. When enabled, this setting applies to all users in your organization.

:::image type="content" source="media/service-admin-portal-integration/admin-integration-desktop-sharing.png" alt-text="Screenshot of admin setting called  Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop.":::

During public preview, if a user enables share through the Power BI Desktop menu, but the admin setting is disabled for the tenant, a **Share** button still appears in Power BI Desktop, but the user is notified that the capability is disabled when they attempt to share.

Learn more about [sharing links through Power BI Desktop](/power-bi/create-reports/desktop-sharepoint-save-share).

## Enable granular access control for all data connections

Turn on this setting to enforce strict access control for all data connection types. When this setting is on, shared items are disconnected from data sources if they're edited by users who don't have permission to use those data connections.

For more information, see [Manage semantic model credentials and connections](/power-bi/connect-data/service-connect-cloud-data-sources).

## Semantic models can export data to OneLake

Semantic models configured for OneLake integration can export tables in import mode to OneLake. Once exported, users can use the data in other Fabric items, including lakehouses and warehouses.

For more information, see [OneLake integration overview](/power-bi/enterprise/onelake-integration-overview).

## Semantic model owners can choose to automatically update semantic models from files imported from OneDrive or SharePoint

Turn on this setting to let semantic model owners choose to automatically update semantic models with changes made to corresponding Power BI files stored in OneDrive or SharePoint.

For more information, see [Refresh from OneDrive or SharePoint](/power-bi/connect-data/refresh-desktop-file-onedrive).

## ArcGIS GeoAnalytics for Fabric Runtime

Users in your organization can use Esri's ArcGIS GeoAnalytics for Fabric Runtime in Microsoft Fabric Spark Runtime.

For more information, see [ArcGIS GeoAnalytics for Fabric Runtime](https://go.microsoft.com/fwlink/?linkid=2281344).

## Allow non-Entra ID auth in Eventstream

This setting lets users keep key-based authentication enabled in Eventstream custom endpoints. Turning it off restricts Eventstream custom endpoint authentication to Microsoft Entra ID only.

## Related content

* [About tenant settings](about-tenant-settings.md)
* [Tenant settings index](tenant-settings-index.md)
