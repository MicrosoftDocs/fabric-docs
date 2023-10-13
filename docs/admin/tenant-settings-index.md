---
title: Fabric tenant settings index
description: This article is an index page for all Fabric tenant settings.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom: build-2023
ms.date: 09/05/2023
---

# Fabric tenant settings index

| Name | Description |
|------|-------|
| **[Microsoft Fabric (Preview)](./fabric-switch.md)** |  |
| Users can create Fabric items (public preview) | Users can create Fabric items with new capabilities in Microsoft Fabric. This setting can be managed at both the tenant and the capacity levels. By using Microsoft Fabric, you accept the [Preview Terms of Use](https://azure.microsoft.com/support/legal/preview-supplemental-terms). |
| **[Help and support settings](service-admin-portal-help-support.md)** |  |
| [Publish "Get Help" information](service-admin-portal-help-support.md#publish-get-help-information) | Users in the organization can go to internal help and support resources from the Power BI help menu. |
| [Receive email notifications for service outages or incidents](../enterprise/service-interruption-notifications.md#enable-notifications-for-service-outages-or-incidents) | Mail-enabled security groups receive email notifications if this tenant is impacted by a service outage or incident. |
| [Users can try Microsoft Fabric paid features](service-admin-portal-help-support.md#users-can-try-microsoft-fabric-paid-features) | When users [sign up for a Microsoft Fabric trial](/power-bi/fundamentals/service-self-service-signup-purchase-for-power-bi), they can try Fabric paid features for free for 60 days. |
| [Show a custom message before publishing reports](service-admin-portal-help-support.md#show-a-custom-message-before-publishing-reports) | When people attempt to publish a report, they see a custom message before it gets published. |
| **[Workspace settings](portal-workspace.md)** |  |
| [Create workspaces (new workspace experience)](portal-workspace.md#create-workspaces-new-workspace-experience) | Users in the organization can create app workspaces to collaborate on dashboards, reports, and other content. Even if this setting is disabled, an upgraded workspace is created when a template app is installed. |
| [Use datasets across workspaces](portal-workspace.md#use-datasets-across-workspaces) | Users in the organization can use datasets across workspaces if they have the required Build permission. |
| [Block users from reassigning personal workspaces (My Workspace)](portal-workspace.md#block-users-from-reassigning-personal-workspaces-my-workspace) | Turn on this setting to prevent users from reassigning their personal workspaces (My workspace) from Premium capacities to shared capacities. |
| **[Information protection](service-admin-portal-information-protection.md)** |  |
| [Allow users to apply sensitivity labels for content](service-admin-portal-information-protection.md#allow-users-to-apply-sensitivity-labels-for-content) | This setting lets you add sensitivity labels from Microsoft Purview Information Protection in Power BI.|
| [Apply sensitivity labels from data sources to their data in Power BI](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources) | When this setting is enabled, Power BI datasets that connect to sensitivity-labeled data in supported data sources can inherit those labels, so that the data remains classified and secure when brought into Power BI. Only sensitivity labels from supported data sources are applied. |
| [Automatically apply sensitivity labels to downstream content](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance) | With this setting enabled, whenever a sensitivity label is changed or applied to Fabric content, the label is also applied to its eligible downstream content. |
| [Allow workspace admins to override automatically applied sensitivity labels](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement#relaxations-to-accommodate-automatic-labeling-scenarios) | With this setting enabled, workspace admins can change or remove sensitivity labels that were applied automatically by Fabric, for example, as a result of label inheritance. |
| [Restrict content with protected labels from being shared via link with everyone in your organization](service-admin-portal-information-protection.md#restrict-content-with-protected-labels-from-being-shared-via-link-with-everyone-in-your-organization) | This setting prevents content with protection settings in the sensitivity label from being shared via link with everyone in your organization. |
| **[Export and sharing settings](service-admin-portal-export-sharing.md)** |  |
| [Allow Azure Active Directory guest users to access Microsoft Fabric](/power-bi/enterprise/service-admin-azure-ad-b2b) | Azure AD business-to-business (B2B) guest users can access Microsoft Fabric content. |
| [Invite external users to your organization](/power-bi/enterprise/service-admin-azure-ad-b2b#invite-guest-users) | Users with the Azure AD guest inviter role can invite external users to the organization through sharing, permissions, and subscription experiences. Once invited, external users become Azure AD B2B guest users. This setting only controls the ability to invite through Fabric. |
| [Allow Azure Active Directory guest users to edit and manage content in the organization](/power-bi/enterprise/service-admin-azure-ad-b2b) | Users can invite Azure AD B2B guest users to have the browse experience and request access to content. |
| [Show Azure Active Directory guests in lists of suggested people](service-admin-portal-export-sharing.md#show-azure-active-directory-guests-in-lists-of-suggested-people) | When you search for people in Fabric, the suggestions include Azure AD members and guests. If this setting is disabled, guest users aren't shown in the suggested people list. |
| [Publish to web](service-admin-portal-export-sharing.md#publish-to-web) | With this setting enabled, users can create embed codes to publish reports to the web. This functionality makes the reports and their data available to anyone on the internet. |
| Copy and paste visuals | Users in the organization can copy visuals from a tile or report visual and paste them as static images into external applications. |
| [Export to Excel](/power-bi/visuals/power-bi-visualization-export-data) | Users in the organization can export the data from a visualization or paginated report to an Excel file.  |
| [Export to .csv](/power-bi/paginated-reports/report-builder/export-csv-file-report-builder) | Users in the organization can export data from a tile, visualization, or paginated report to a .csv file.  |
| [Download reports](/power-bi/create-reports/service-export-to-pbix) | Users in the organization can download .pbix files and paginated reports. |
| [Users can work with datasets in Excel using a live connection](/power-bi/collaborate-share/service-analyze-in-excel) | Users can export data to Excel from a report visual or dataset, or export a dataset to an Excel workbook with Analyze in Excel, both options with a live connection to the XMLA endpoint. |
| Export reports as [PowerPoint presentations](/power-bi/collaborate-share/end-user-powerpoint) or [PDF documents](/power-bi/collaborate-share/end-user-pdf) | Users in the organization can export reports as PowerPoint files or PDF documents. |
| Export reports as MHTML documents | Users in the organization can export paginated reports as MHTML documents. |
| [Export reports as Word documents](/power-bi/paginated-reports/report-builder/export-microsoft-word-report-builder) | Users in the organization can export paginated reports as Word documents. |
| [Export reports as XML documents](/power-bi/paginated-reports/report-builder/export-xml-report-builder) | Users in the organization can export paginated reports as XML documents. |
| [Export reports as image files](/power-bi/paginated-reports/report-builder/export-image-file-report-builder) | Users in the organization can use the export report to file API to export reports as image files. |
| [Print dashboards and reports](/power-bi/consumer/end-user-print) | Users in the organization can print dashboards and reports. |
| [Certification](/power-bi/admin/service-admin-setup-certification) | Allow users in your organization or security groups to certify items like apps, reports, or datamarts as trusted sources for the wider organization. |
| [Users can set up email subscriptions](/power-bi/collaborate-share/end-user-subscribe) | Users can create email subscriptions to reports and dashboards. |
| [B2B guest users can set up and be subscribed to email subscriptions](service-admin-portal-export-sharing.md#b2b-guest-users-can-set-up-and-be-subscribed-to-email-subscriptions) | Authorized guest users can set up and subscribe to email subscriptions. Authorized guest users are external users you've added to your Azure AD.  |
| Users can send email subscriptions to external users | Users can send email subscriptions to external users. External users are users outside of the organization that haven't been added as Azure AD B2B guest users.  |
| [Featured content](/power-bi/collaborate-share/service-featured-content) | Users in the organization can promote their published content to the **Featured** section of Power BI Home. |
| [Allow connections to featured tables](/power-bi/collaborate-share/service-excel-featured-tables) | Users in the organization can access and perform calculations on data from featured tables. Connections to featured tables are disabled if the **Allow live connections** setting is disabled. |
| [Allow shareable links to grant access to everyone in your organization](/power-bi/collaborate-share/service-share-dashboards#link-settings) | This setting grants access to anyone in your organization with the link. If this setting is turned off for a user with share permissions to a report, that user can only share the report via link to **Specific people** or **People with existing access**. |
| [Enable Microsoft Teams integration](/power-bi/collaborate-share/service-collaborate-microsoft-teams) | Users can access features associated with the Microsoft Teams and Power BI integration. This includes launching Teams experiences from the Power BI service like chats, the Power BI app for Teams, and receiving Power BI notifications in Teams. |
| [Install Power BI app for Microsoft Teams automatically](service-admin-portal-export-sharing.md#install-power-bi-app-for-microsoft-teams-automatically) | The Power BI app for Microsoft Teams is installed automatically for users when they use Microsoft Fabric. |
| [Enable Power BI add-in for PowerPoint](service-admin-portal-export-sharing.md#enable-power-bi-add-in-for-powerpoint) | Let people in your organization embed live, interactive data from Power BI into their PowerPoint presentations. |
| [Allow DirectQuery connections to Power BI datasets](service-admin-portal-export-sharing.md#allow-directquery-connections-to-power-bi-datasets) | DirectQuery connections allow users to make changes to existing datasets or use them to build new ones. |
| [Guest users can work with shared datasets in their own tenants](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-guest-users-to-work-with-shared-datasets-in-their-own-tenants) | Authorized guest users of datasets shared with them by users in your organization can access and build on those datasets in their own tenant. |
| [Allow specific users to turn on external data sharing](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-specific-users-to-turn-on-external-data-sharing) | If this setting is on, all or specific users can turn on the external data sharing option, allowing them to share data with authorized guest users. |
| **[Discovery settings](service-admin-portal-discovery.md)** |  |
| [Make promoted content discoverable](/power-bi/collaborate-share/service-discovery) | Allow users you specify who have permissions to [promote content](/power-bi/collaborate-share/service-endorse-content#promote-content) to also mark that content as discoverable. |
| [Make certified content discoverable](/power-bi/collaborate-share/service-discovery)  | Allow users who can [certify content](/power-bi/collaborate-share/service-endorse-content#certify-content) to make that content discoverable by users who don't have access to it. |
| [Discover content](../get-started/onelake-data-hub.md#find-recommended-items) | Allow specified users to find endorsed content that's marked as discoverable, even if they don't yet have access to it. |
| **[Content pack and app settings](service-admin-portal-content-pack-app.md)** |  |
| [Create template organizational content packs and apps](/power-bi/connect-data/service-template-apps-create) | Users in the organization can create template content packs and apps that use datasets built on one data source in Power BI Desktop. |
| [Push apps to end users](/power-bi/collaborate-share/service-create-distribute-apps#automatically-install-apps-for-end-users) | Report creators can share apps directly with end users without requiring installation from [AppSource](https://appsource.microsoft.com). |
| [Publish content packs and apps to the entire organization](/power-bi/collaborate-share/service-create-distribute-apps#publish-the-app-to-your-entire-organization) | This setting lets you choose which users can publish content packs and apps to the entire organization. |
| **[Integration settings](service-admin-portal-integration.md)** |  |
| [Allow XMLA endpoints and Analyze in Excel with on-premises datasets](/power-bi/collaborate-share/service-analyze-in-excel) | Users in the organization can use Excel to view and interact with on-premises Power BI datasets. This also allows connections to [XMLA endpoints](/power-bi/enterprise/service-premium-connect-tools). |
| [Dataset Execute Queries REST API](/rest/api/power-bi/datasets/execute-queries) | Users in the organization can query datasets by using Data Analysis Expressions (DAX) through Power BI REST APIs. |
| [Use ArcGIS Maps for Power BI](/power-bi/visuals/power-bi-visualizations-arcgis) | Users in the organization can use the ArcGIS Maps for Power BI visualization provided by Esri. |
| [Use global search for Power BI](/power-bi/consumer/end-user-search-sort) | Users in the organization can use external search features that rely on Azure Search. |
| [Use Azure Maps visual](/azure/azure-maps/power-bi-visual-get-started) | Users in the organization can use the Azure Maps visual for Power BI. |
| [Map and filled map visuals](/power-bi/visuals/power-bi-visualization-filled-maps-choropleths) | Allow people in your organization to use the map and filled map visuals in their reports.<br><br>Note: In a future release, Power BI plans to deprecate older map visuals and migrate existing reports to Azure Maps. Learn about [converting to Azure Maps](/azure/azure-maps/power-bi-visual-conversion). |
| [Integration with SharePoint and Microsoft Lists](service-admin-portal-integration.md#integration-with-sharepoint-and-microsoft-lists) | Users in the organization can launch Fabric from SharePoint lists and Microsoft Lists. Then they can build Fabric reports on the data in those lists and publish them back to the lists. |
| [Dremio SSO](https://powerquery.microsoft.com/blog/azure-ad-based-single-sign-on-for-dremio-cloud-and-power-bi) | This setting enables single sign-on capability for Dremio. User access token information, including name and email, are sent to Dremio for authentication. |
| [Snowflake SSO](/power-bi/connect-data/service-connect-snowflake) | This setting allows single sign-on capability for Snowflake. Azure AD credentials are sent to Snowflake for authentication. |
| [Redshift SSO](/power-bi/connect-data/service-gateway-sso-overview) | This setting allows single sign-on capability for Amazon Redshift. Azure AD credentials are sent to Redshift for authentication. |
| [Google BigQuery SSO](/power-query/connectors/google-bigquery-aad) | This setting allows single sign-on capability for Google BigQuery. User access token information, including name and email, are sent to Google BigQuery for authentication. |
| [Oracle SSO](/power-bi/connect-data/service-gateway-sso-overview) | This setting allows single sign-on capability for Oracle. User access token information, including name and email, are sent to Oracle for authentication. |
| [Azure AD Single Sign-On (SSO) for Gateway](service-admin-portal-integration.md#azure-ad-single-sign-on-sso-for-gateway) | Enable Azure AD SSO via the on-premises data gateway for applicable data sources. User access token information, including name and email, are sent to these data sources for authentication via the on-premises data gateway. |
| [Power Platform Solutions Integration (Preview)](service-admin-portal-integration.md#power-platform-solutions-integration-preview) | This setting allows Power BI/Power Platform Solutions integration from the Power BI side. |
| [Users can view Power BI items saved in OneDrive and SharePoint (Preview)](service-admin-portal-integration.md#users-can-view-power-bi-files-saved-in-onedrive-and-sharepoint-preview) | **Currently in effect. This setting will be removed from the admin portal the first week of October 2023.** Users in the organization can view Power BI items they save in OneDrive for Business or SharePoint document libraries |
| [Users can view Power BI items saved in OneDrive and SharePoint (Preview) - UPDATE](service-admin-portal-integration.md#users-can-view-power-bi-files-saved-in-onedrive-and-sharepoint-preview---update) | **This setting will be **on** by default starting the first week of October 2023**. Users in the organization can view Power BI items they save in OneDrive for Business or SharePoint document libraries |
| [Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop](service-admin-portal-integration.md#users-can-share-links-to-power-bi-files-stored-in-onedrive-and-sharepoint-through-power-bi-desktop) | Users who save Power BI files (.pbix) to OneDrive and SharePoint can share links to those files using Power BI Desktop. |
| **[Power BI visuals](/power-bi/admin/organizational-visuals)** |  |
| [Allow visuals created using the Power BI SDK](/power-bi/admin/organizational-visuals#visuals-from-appsource-or-a-file) | Users in the organization can add, view, share, and interact with visuals imported from [AppSource or from a file](/power-bi/developer/visuals/import-visual). Visuals allowed in the *Organizational visuals* page aren't affected by this setting. |
| [Add and use certified visuals only (block uncertified)](/power-bi/admin/organizational-visuals#certified-power-bi-visuals) | Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the *Organizational visuals* page aren't affected by this setting, regardless of certification. |
| [Allow downloads from custom visuals](/power-bi/admin/organizational-visuals#export-data-to-file) | This setting lets [custom visuals](/power-bi/developer/visuals/power-bi-custom-visuals) download any information available to the visual (such as summarized data and visual configuration) upon user consent. |
| **[R and Python visuals settings](service-admin-portal-r-python-visuals.md)** |  |
| [Interact with and share R and Python visuals](service-admin-portal-r-python-visuals.md#interact-with-and-share-r-and-python-visuals) | Users in the organization can interact with and share visuals created with R or Python scripts. |
| **[Audit and usage settings](service-admin-portal-audit-usage.md)** |  |
| [Usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics) | Users in the organization can see usage metrics for dashboards, reports, and datasets for which they have appropriate permissions. |
| [Per-user data in usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics#exclude-user-information-from-usage-metrics-reports) | Usage metrics for content creators expose display names and email addresses of users who access content. |
| [Azure Log Analytics connections for workspace administrators](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure) | Users can connect their Premium workspaces to Azure Log Analytics to monitor the connected workspaces. |
| **[Dashboard settings](service-admin-portal-dashboard.md)** |  |
| [Web content on dashboard tiles](/power-bi/create-reports/service-dashboard-add-widget#add-web-content) | Users in the organization can add and view web content tiles on Power BI dashboards. Note: This could expose your organization to security risks via malicious web content. |
| **[Developer settings](service-admin-portal-developer.md)** |  |
| [Embed content in apps](/power-bi/developer/embedded/embedded-analytics-power-bi) | Users in the organization can embed Power BI dashboards and reports in Web applications using the *Embed for your customers* method. |
| [Allow service principals to use Power BI APIs](/power-bi/developer/embedded/embed-service-principal) | Web apps registered in Azure AD use an assigned service principal to access Power BI APIs without a signed-in user. To allow an app to use service principal authentication, its service principal must be included in an allowed security group. |
| [Allow service principals to create and use profiles](/power-bi/developer/embedded/embed-multi-tenancy) | Allow service principals in your organization to create and use profiles. |
| [Block ResourceKey Authentication](service-admin-portal-developer.md#block-resourcekey-authentication) | For extra security, block using resource key based authentication. This means users aren't allowed to use streaming datasets API using resource key. |
| **[Admin API settings](service-admin-portal-admin-api-settings.md)** |  |
| [Allow service principals to use read-only admin APIs](/power-bi/enterprise/read-only-apis-service-principal-authentication) | Allow apps to use service principal authentication for read-only access to all the information available through admin APIs. |
| [Enhance admin APIs responses with detailed metadata](service-admin-portal-admin-api-settings.md#enhance-admin-apis-responses-with-detailed-metadata) | Users and service principals allowed to call Power BI admin APIs can get detailed metadata about Power BI items. |
| [Enhance admin APIs responses with DAX and mashup expressions](service-admin-portal-admin-api-settings.md#enhance-admin-apis-responses-with-dax-and-mashup-expressions) | Users and service principals eligible to call Power BI admin APIs can get detailed metadata about queries and expressions comprising Power BI items. |
| **[Gen1 dataflow settings](service-admin-portal-dataflow.md)** |  |
| [Create and use Gen1 dataflows](/power-bi/transform-model/dataflows/dataflows-introduction-self-service) | Users in the organization can create and use Gen1 dataflows. To enable dataflows in a Premium capacity, see [Configure workloads](/power-bi/enterprise/service-admin-premium-workloads). |
| **[Template app settings](service-admin-portal-template-app.md)** |  |
| [Publish template apps](/power-bi/connect-data/service-template-apps-overview) | Users in the organization can publish template apps for distribution to clients outside of the organization. |
| [Install template apps](service-admin-portal-template-app.md#install-template-apps) | Users in the organization can install template apps from [Microsoft AppSource](https://appsource.microsoft.com). When a template app is installed, an upgraded workspace is created. |
| Install template apps not listed in AppSource | Users in the organization can install template apps that were **not** published to Microsoft AppSource. |
| **[Q&amp;A settings](service-admin-portal-qa.md)** |  |
| Review questions | Allow dataset owners to review questions people asked about their data. |
| [Synonym sharing](/power-bi/natural-language/q-and-a-tooling-intro#field-synonyms) | Allow people to share Q&amp;A synonyms with your organization. |
| **[Dataset security](service-admin-portal-dataset-security.md)** |  |
| Block republish and disable package refresh | Disable package refresh, and only allow the dataset owner to publish updates. |
| **[Advanced networking](service-admin-portal-advanced-networking.md)** |  |
| [Azure Private Link](/power-bi/enterprise/service-security-private-links) | Increase security by allowing people to use a [Private Link](/azure/private-link) to access your Power BI tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email. |
| [Block Public Internet Access](/power-bi/enterprise/service-security-private-links) | For extra security, block access to your Power BI tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. |
| **[Metrics settings](service-admin-portal-goals-settings.md)** |  |
| [Create and use Metrics](/power-bi/create-reports/service-goals-introduction) | Users in the organization can create and use metrics in Power BI. |
| **[User experience experiments](service-admin-portal-user-experience-experiments.md)** |  |
| Help Power BI optimize your experience | Users in this organization get minor user experience variations that the Power BI team is experimenting with, including content, layout, and design, before they go live for all users. |
| **[Share data with your Microsoft 365 services](admin-share-power-bi-metadata-microsoft-365-services.md)** |  |
| [Users can see Microsoft Fabric metadata in Microsoft 365](admin-share-power-bi-metadata-microsoft-365-services.md#how-to-turn-sharing-with-microsoft-365-services-on-and-off) | Turn on this setting to store and display certain Microsoft Fabric metadata in Microsoft 365 services. Users might see Microsoft Fabric metadata (including content titles and types or open and sharing history) in Microsoft 365 services like search results and recommended content lists. Metadata from Microsoft Fabric datasets will not be displayed.<br><br>This setting is automatically enabled only if your Microsoft Fabric and Microsoft 365 tenants are in the same [geographical region](/power-bi/admin/service-admin-where-is-my-tenant-located). |
| **[Insights settings](service-admin-portal-insights.md)** |  |
| [Receive notifications for top insights (preview)](/power-bi/create-reports/insights) | Users in the organization can enable notifications for top insights in report settings. |
| Show entry points for insights (preview) | Users in the organization can use entry points for requesting insights inside reports. |
| **[Datamart settings](service-admin-portal-datamart.md)** |  |
| [Create Datamarts (Preview)](/power-bi/transform-model/datamarts/datamarts-administration) | Users in the organization can create Datamarts. |
| **[Data model settings](service-admin-portal-data-model.md)** |  |
| [Users can edit data models in the Power BI service (preview)](/power-bi/transform-model/service-edit-data-models#enabling-data-model-editing-in-the-admin-portal) | Turn on this setting to allow users to edit data models in the service. This setting doesn't apply to DirectLake datasets or editing a dataset through an API or XMLA endpoint. |
| **[Quick measure suggestions](service-admin-portal-quick-measure-suggestions-settings.md)** |  |
| [Allow quick measure suggestions (preview)](/power-bi/transform-model/quick-measure-suggestions) | Allow users to use natural language to generate suggested measures. |
| [Allow user data to leave their geography](/power-bi/transform-model/quick-measure-suggestions#limitations-and-considerations) | Quick measure suggestions are currently processed in the US. When this setting is enabled, users get quick measure suggestions for data outside the US. |
| **[Scale-out settings](service-admin-portal-scale-out.md)** |  |
| [Scale out queries for large datasets (Preview)](/power-bi/enterprise/service-premium-scale-out) | For datasets that use the large dataset storage format, Power BI Premium can automatically distribute queries across additional dataset replicas when query volume is high. |
| **[OneLake settings](service-admin-portal-onelake.md)** |  |
| [Users can access data stored in OneLake with apps external to Fabric](../onelake/onelake-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake) | Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse. |
| [Users can sync data in OneLake with the OneLake File Explorer app](../onelake/onelake-file-explorer.md) | Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive. |
| **[Git integration](git-integration-admin-settings.md)** |  |
| [Users can synchronize workspace items with their Git repositories (Preview)](../cicd/git-integration/intro-to-git-integration.md) | Users can import and export workspace items to Git repositories for collaboration and version control. Turn off this setting to prevent users from syncing workspace items with their Git repositories. |
| [Users can export items to Git repositories in other geographical locations (Preview)](git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview) | The workspace and the Git repository might reside in different geographies. Turn on this setting to allow users to export items to Git repositories in other geographies. |
| Users can export workspace items with applied sensitivity labels to Git repositories (Preview) | Turn on this setting to allow users to export items with applied sensitivity labels to their Git repositories. |

## Next steps

> [!div class="nextstepaction"]
> [About the Admin portal](/power-bi/admin/service-admin-portal)
