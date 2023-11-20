---
title: About tenant settings
description: Learn how to enable and disable Fabric tenant settings.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/02/2023
---

# About tenant settings

**Tenant settings** enable fine-grained control over the features that are made available to your organization. If you have concerns around sensitive data, some of our features might not be right for your organization, or you might only want a particular feature to be available to a specific group.

Tenant settings that control the availability of features in the Power BI user interface can help to establish governance policies, but they're not a security measure. For example, the **Export data** setting doesn't restrict the permissions of a Power BI user on a semantic model. Power BI users with read access to a semantic model have the permission to query this semantic model and might be able to persist the results without using the **Export data** feature in the Power BI user interface.

> [!NOTE]
> It can take up to 15 minutes for a setting change to take effect for everyone in your organization.

## New tenant settings

To help you quickly identify changes and respond, a message at the top of the tenant settings page appears when there's a change. The message lists new tenant settings and changes to existing ones.

You can identify new settings according to their *new* icon.  

## How to get to the tenant settings

Go to the admin portal and select **Tenant settings**.

:::image type="content" source="media/tenant-settings-index/admin-portal-tenant-settings.png" alt-text="Screenshot of how to get to the tenant settings":::

## How to use the tenant settings

Many of the settings can have one of three states:

* **Disabled for the entire organization**: No one in your organization can use this feature.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-disabled-all.png" alt-text="Screenshot of disabled all state tenant setting.":::

* **Enabled for the entire organization**: Everyone in your organization can use this feature.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-all.png" alt-text="Screenshot of enabled all state tenant setting.":::

* **Enabled for the entire organization except for certain groups**: Everyone in your organization can use this feature except for users who belong to the specified groups.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-all-except.png" alt-text="Screenshot of enabled all except state tenant setting.":::

* **Enabled for a subset of the organization**: Specific security groups in your organization are allowed to use this feature.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-specific.png" alt-text="Screenshot of enabled subset state tenant setting.":::

* **Enabled for specific groups except for certain groups**: Members of the specified security groups are allowed to use this feature, unless they also belong to an excluded group. This approach ensures that certain users don't have access to the feature even if they're in the allowed group. The most restrictive setting for a user applies.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-specific-except.png" alt-text="Screenshot of enabled except state tenant setting.":::

## Tenant settings index

| Name | Description |
|------|-------|
| **[Microsoft Fabric (Preview)](fabric-switch.md)** |  |
| Users can create Fabric items (public preview) | Users can create Fabric items with new capabilities in Microsoft Fabric. This setting can be managed at both the tenant and the capacity levels. By using Microsoft Fabric, you accept the [Preview Terms of Use](https://azure.microsoft.com/support/legal/preview-supplemental-terms). |
| **[Help and support settings](service-admin-portal-help-support.md)** |  |
| [Publish "Get Help" information](service-admin-portal-help-support.md#publish-get-help-information) | Users in the organization can go to internal help and support resources from the Power BI help menu. |
| [Receive email notifications for service outages or incidents](../enterprise/service-interruption-notifications.md#enable-notifications-for-service-outages-or-incidents) | Mail-enabled security groups receive email notifications if this tenant is impacted by a service outage or incident. |
| [Users can try Microsoft Fabric paid features](service-admin-portal-help-support.md#users-can-try-microsoft-fabric-paid-features) | When users [sign up for a Microsoft Fabric trial](/power-bi/fundamentals/service-self-service-signup-purchase-for-power-bi), they can try Fabric paid features for free for 60 days. |
| [Show a custom message before publishing reports](service-admin-portal-help-support.md#show-a-custom-message-before-publishing-reports) | When people attempt to publish a report, they see a custom message before it gets published. |
| **[Workspace settings](portal-workspace.md)** |  |
| [Create workspaces (new workspace experience)](portal-workspace.md#create-workspaces-new-workspace-experience) | Users in the organization can create app workspaces to collaborate on dashboards, reports, and other content. Even if this setting is disabled, an upgraded workspace is created when a template app is installed. |
| [Use semantic models across workspaces](portal-workspace.md#use-semantic-models-across-workspaces) | Users in the organization can use semantic models across workspaces if they have the required Build permission. |
| [Block users from reassigning personal workspaces (My Workspace)](portal-workspace.md#block-users-from-reassigning-personal-workspaces-my-workspace) | Turn on this setting to prevent users from reassigning their personal workspaces (My workspace) from Premium capacities to shared capacities. |
| **[Information protection](service-admin-portal-information-protection.md)** |  |
| [Allow users to apply sensitivity labels for content](service-admin-portal-information-protection.md#allow-users-to-apply-sensitivity-labels-for-content) | This setting lets you add sensitivity labels from Microsoft Purview Information Protection in Power BI.|
| [Apply sensitivity labels from data sources to their data in Power BI](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources) | When this setting is enabled, Power BI semantic models that connect to sensitivity-labeled data in supported data sources can inherit those labels, so that the data remains classified and secure when brought into Power BI. Only sensitivity labels from supported data sources are applied. |
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
| [Users can work with semantic models in Excel using a live connection](/power-bi/collaborate-share/service-analyze-in-excel) | Users can export data to Excel from a report visual or semantic model, or export a semantic model to an Excel workbook with Analyze in Excel, both options with a live connection to the XMLA endpoint. |
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
| [Allow DirectQuery connections to Power BI semantic models](service-admin-portal-export-sharing.md#allow-directquery-connections-to-power-bi-semantic-models) | DirectQuery connections allow users to make changes to existing semantic models or use them to build new ones. |
| [Guest users can work with shared semantic models in their own tenants](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-guest-users-to-work-with-shared-datasets-in-their-own-tenants) | Authorized guest users of semantic models shared with them by users in your organization can access and build on those semantic models in their own tenant. |
| [Allow specific users to turn on external data sharing](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-specific-users-to-turn-on-external-data-sharing) | If this setting is on, all or specific users can turn on the external data sharing option, allowing them to share data with authorized guest users. |
| **[Discovery settings](service-admin-portal-discovery.md)** |  |
| [Make promoted content discoverable](/power-bi/collaborate-share/service-discovery) | Allow users you specify who have permissions to [promote content](/power-bi/collaborate-share/service-endorse-content#promote-content) to also mark that content as discoverable. |
| [Make certified content discoverable](/power-bi/collaborate-share/service-discovery)  | Allow users who can [certify content](/power-bi/collaborate-share/service-endorse-content#certify-content) to make that content discoverable by users who don't have access to it. |
| [Discover content](../get-started/onelake-data-hub.md#find-recommended-items) | Allow specified users to find endorsed content that's marked as discoverable, even if they don't yet have access to it. |
| **[Content pack and app settings](service-admin-portal-content-pack-app.md)** |  |
| [Create template organizational content packs and apps](/power-bi/connect-data/service-template-apps-create) | Users in the organization can create template content packs and apps that use semantic models built on one data source in Power BI Desktop. |
| [Push apps to end users](/power-bi/collaborate-share/service-create-distribute-apps#automatically-install-apps-for-end-users) | Report creators can share apps directly with end users without requiring installation from [AppSource](https://appsource.microsoft.com). |
| [Publish content packs and apps to the entire organization](/power-bi/collaborate-share/service-create-distribute-apps#publish-the-app-to-your-entire-organization) | This setting lets you choose which users can publish content packs and apps to the entire organization. |
| **[Integration settings](service-admin-portal-integration.md)** |  |
| [Allow XMLA endpoints and Analyze in Excel with on-premises datasets](/power-bi/collaborate-share/service-analyze-in-excel) | Users in the organization can use Excel to view and interact with on-premises Power BI semantic models. This also allows connections to [XMLA endpoints](/power-bi/enterprise/service-premium-connect-tools). |
| [Dataset Execute Queries REST API](/rest/api/power-bi/datasets/execute-queries) | Users in the organization can query semantic models by using Data Analysis Expressions (DAX) through Power BI REST APIs. |
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
| [Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop](service-admin-portal-integration.md#users-can-share-links-to-power-bi-files-stored-in-onedrive-and-sharepoint-through-power-bi-desktop) | Users who save Power BI files (.pbix) to OneDrive and SharePoint can share links to those files using Power BI Desktop. |
| **[Power BI visuals](/power-bi/admin/organizational-visuals)** |  |
| [Allow visuals created using the Power BI SDK](/power-bi/admin/organizational-visuals#visuals-from-appsource-or-a-file) | Users in the organization can add, view, share, and interact with visuals imported from [AppSource or from a file](/power-bi/developer/visuals/import-visual). Visuals allowed in the *Organizational visuals* page aren't affected by this setting. |
| [Add and use certified visuals only (block uncertified)](/power-bi/admin/organizational-visuals#certified-power-bi-visuals) | Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the *Organizational visuals* page aren't affected by this setting, regardless of certification. |
| [Allow downloads from custom visuals](/power-bi/admin/organizational-visuals#export-data-to-file) | This setting lets [custom visuals](/power-bi/developer/visuals/power-bi-custom-visuals) download any information available to the visual (such as summarized data and visual configuration) upon user consent. |
| **[R and Python visuals settings](service-admin-portal-r-python-visuals.md)** |  |
| [Interact with and share R and Python visuals](service-admin-portal-r-python-visuals.md#interact-with-and-share-r-and-python-visuals) | Users in the organization can interact with and share visuals created with R or Python scripts. |
| **[Audit and usage settings](service-admin-portal-audit-usage.md)** |  |
| [Usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics) | Users in the organization can see usage metrics for dashboards, reports, and semantic models for which they have appropriate permissions. |
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
| Review questions | Allow semantic model owners to review questions people asked about their data. |
| [Synonym sharing](/power-bi/natural-language/q-and-a-tooling-intro#field-synonyms) | Allow people to share Q&amp;A synonyms with your organization. |
| **[Semantic model security](service-admin-portal-dataset-security.md)** |  |
| Block republish and disable package refresh | Disable package refresh, and only allow the semantic model owner to publish updates. |
| **[Advanced networking](service-admin-portal-advanced-networking.md)** |  |
| [Azure Private Link](/power-bi/enterprise/service-security-private-links) | Increase security by allowing people to use a [Private Link](/azure/private-link) to access your Power BI tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email. |
| [Block Public Internet Access](/power-bi/enterprise/service-security-private-links) | For extra security, block access to your Power BI tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. |
| **[Metrics settings](service-admin-portal-goals-settings.md)** |  |
| [Create and use Metrics](/power-bi/create-reports/service-goals-introduction) | Users in the organization can create and use metrics in Power BI. |
| **[User experience experiments](service-admin-portal-user-experience-experiments.md)** |  |
| Help Power BI optimize your experience | Users in this organization get minor user experience variations that the Power BI team is experimenting with, including content, layout, and design, before they go live for all users. |
| **[Share data with your Microsoft 365 services](admin-share-power-bi-metadata-microsoft-365-services.md)** |  |
| [Users can see Microsoft Fabric metadata in Microsoft 365](admin-share-power-bi-metadata-microsoft-365-services.md#how-to-turn-sharing-with-microsoft-365-services-on-and-off) | Turn on this setting to store and display certain Microsoft Fabric metadata in Microsoft 365 services. Users might see Microsoft Fabric metadata (including content titles and types or open and sharing history) in Microsoft 365 services like search results and recommended content lists. Metadata from Microsoft Fabric semantic models will not be displayed.<br><br>This setting is automatically enabled only if your Microsoft Fabric and Microsoft 365 tenants are in the same [geographical region](/power-bi/admin/service-admin-where-is-my-tenant-located). |
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
| [Scale out queries for large semantic models (Preview)](/power-bi/enterprise/service-premium-scale-out) | For semantic models that use the large semantic model storage format, Power BI Premium can automatically distribute queries across additional semantic model replicas when query volume is high. |
| **[OneLake settings](service-admin-portal-onelake.md)** |  |
| [Users can access data stored in OneLake with apps external to Fabric](../onelake/onelake-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake) | Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse. |
| [Users can sync data in OneLake with the OneLake File Explorer app](../onelake/onelake-file-explorer.md) | Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive. |
| **[Git integration](git-integration-admin-settings.md)** |  |
| [Users can synchronize workspace items with their Git repositories (Preview)](../cicd/git-integration/intro-to-git-integration.md) | Users can import and export workspace items to Git repositories for collaboration and version control. Turn off this setting to prevent users from syncing workspace items with their Git repositories. |
| [Users can export items to Git repositories in other geographical locations (Preview)](git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview) | The workspace and the Git repository might reside in different geographies. Turn on this setting to allow users to export items to Git repositories in other geographies. |
| Users can export workspace items with applied sensitivity labels to Git repositories (Preview) | Turn on this setting to allow users to export items with applied sensitivity labels to their Git repositories. |

## Test table

| Name | Description |
|------|-------|
|**Microsoft Fabric**||
|Data Activator (preview)|Turn on Data Activator Preview to allow users to define a specific set of conditions about their data, and then receive notifications when those conditions are met. After they receive notifications, users can take action to correct the change in conditions. This setting can be managed at both the tenant and the capacity levels. Data Activator is currently available in &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2250213" target="_blank">these regions</a>. When you turn on Data Activator, you agree to the &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2244647" target="_blank">Data Activator Preview terms</a>. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2237360" target="_blank">Learn more</a>|
|Users can create Fabric items|Users can use production-ready features to create Fabric items. Turning off this setting doesn't impact users’ ability to create Power BI items. This setting can be managed at both the tenant and the capacity levels. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2247554" target="_blank">Learn More</a>|
|**Help and support settings**||
|Publish "Get Help" information|Users in the organization can go to internal help and support resources from the Power BI help menu.|
|Receive email notifications for service outages or incidents|Mail-enabled security groups will receive email notifications if this tenant is impacted by a service outage or incident.|
|Users can try Microsoft Fabric paid features|When users sign up for a Microsoft Fabric trial, they can try Fabric paid features for free for 60 days from the day they signed up. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2227896" target="_blank">Learn More</a>|
|Show a custom message before publishing reports|When people attempt to publish a report, they'll see a custom message before it gets published.|
|**Workspace settings**||
|Create workspaces (new workspace experience)|Users in the organization can create app workspaces to collaborate on dashboards, reports, and other content. Even if this setting is disabled, an upgraded workspace will be created when a template app is installed.|
|Use datasets across workspaces|Users in the organization can use datasets across workspaces if they have the required Build permission.|
|Block users from reassigning personal workspaces (My Workspace)|Turn on this setting to prevent users from reassigning their personal workspaces (My Workspace) from Premium capacities to shared capacities. &nbsp;<a href="https://aka.ms/RestrictMyFolderCapacity" target="_blank">Learn More</a>|
|Define workspace retention period|Turn on this setting to define a retention period during which you can restore a deleted workspace and recover items in it. At the end of the retention period, the workspace is permanently deleted. By default, workspaces are always retained for a minimum of 7 days before they're permanently deleted.<br><br>Turn off this setting to accept the minimum retention period of 7 days. After 7 days the workspace and items in it will be permanently deleted.<br><br>Enter the number of days to retain a workspace before it's permanently deleted. My Workspace workspaces will be retained for 30 days automatically. Other workspaces can be retained for up to 90 days.|
|**Information protection**||
|Allow users to apply sensitivity labels for content|With this setting enabled, Microsoft Purview Information Protection sensitivity labels published to users by your organization can be applied. All &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2144840" target="_blank">prerequisite steps</a> must be completed before enabling this setting.<br><br>Note: Sensitivity label settings, such as encryption and content marking for files and emails, are not applied to content. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2143053" target="_blank">Learn More</a><br><br>Visit the &nbsp;<a href="https://protection.officeppe.com/sensitivity?flight=EnableMIPLabels" target="_blank">Microsoft Purview compliance portal</a> to view sensitivity label settings for your organization.<br><br>Note: Sensitivity labels and protection are only applied to files exported to Excel, PowerPoint, or PDF files, that are controlled by "Export to Excel" and "Export reports as PowerPoint presentation or PDF documents" settings. All other export and sharing options do not support the application of sensitivity labels and protection.|
|Apply sensitivity labels from data sources to their data in Power BI|Only sensitivity labels from supported data sources will be applied. Please see the documentation for details about supported data sources and how their sensitivity labels are applied in Power BI. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2149746" target="_blank">Learn about supported data sources</a>|
|Automatically apply sensitivity labels to downstream content|With this setting enabled, whenever a sensitivity label is changed or applied to Fabric content, the label will also be applied to its eligible downstream content. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2153971" target="_blank">Learn More</a>|
|Allow workspace admins to override automatically applied sensitivity labels|With this setting enabled, workspace admins can change or remove sensitivity labels that were applied automatically by Fabric, for example, as a result of label inheritance. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2154646" target="_blank">Learn More</a>|
|Restrict content with protected labels from being shared via link with everyone in your organization|This setting will prevent content with protection settings in the sensitivity label from being shared via link with everyone in your organization. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2160554" target="_blank">Learn More</a>|
|**Export and sharing settings**||
|Allow Azure Active Directory guest users to access Microsoft Fabric|Azure Active Directory business-to-business (B2B) guest users can access Microsoft Fabric and Fabric contents that they have permissions to.|
|Invite external users to your organization|Users can invite external users to the organization through Power BI sharing and permission experiences for reports, dashboards, and apps. Once invited, external users will become Azure Active Directory business-to-business (B2B) guest users. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2038485" target="_blank">Learn More</a>|
|Allow Azure Active Directory guest users to edit and manage content in the organization|Users can invite Azure Active Directory business-to-business (B2B) guest users to have the browse experience and request access to content. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2038485" target="_blank">Learn More</a>.|
|Show Azure Active Directory guests in lists of suggested people|When searching for people in Microsoft Fabric, you see a list of suggested people that includes Azure Active Directory (Azure AD) members and guests. When disabled, guests aren't shown in the suggested people list (it's still possible to share with guests by providing their full email address).|
|Publish to web|People in your org can publish public reports on the web. Publicly published reports don't require authentication to view them.<br><br>Go to &nbsp;<a href="/admin-portal/embedCodes" target="_blank">Embed Codes</a> in the admin portal to review and manage public embed codes. If any of the codes contain private or confidential content remove them.<br><br>Review embed codes regularly to make sure no confidential information is live on the web. &nbsp;<a href="https://go.microsoft.com/fwlink/?LinkID=859242" target="_blank">Learn more about Publish to web</a>|
|Copy and paste visuals|Users in the organization can copy visuals from a tile or report visual and paste them as static images into external applications.|
|Export to Excel|Users in the organization can export the data from a visualization or paginated report to an Excel file. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2143053" target="_blank">Learn More</a>|
|Export to .csv|Users in the organization can export data from a tile, visualization, or paginated report to a .csv file. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2143055" target="_blank">Learn More</a>|
|Download reports|Users in the organization can download .pbix files and paginated reports. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2143210" target="_blank">Learn More</a>|
|Users can work with datasets in Excel using a live connection|Users can export data to Excel from a report visual or dataset, or export a dataset to an Excel workbook with Analyze in Excel, both options with a live connection to the XMLA endpoint. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2143211" target="_blank">Learn More</a>|
|Export reports as PowerPoint presentations or PDF documents|Users in the organization can export reports as PowerPoint files or PDF documents.|
|Export reports as MHTML documents|Users in the organization can export Paginated reports as MHTML documents.|
|Export reports as Word documents|Users in the organization can export Paginated reports as Word documents.|
|Export reports as XML documents|Users in the organization can export Paginated reports as XML documents.|
|Export reports as image files|Users in the organization can use the export report to file API to export reports as image files.|
|Print dashboards and reports|Users in the organization can print dashboards and reports.|
|Certification|Choose whether people in your org or specific security groups can certify items (like apps, reports, or datamarts) as trusted sources for the wider organization.<br><br>Note: When a user certifies an item, their contact details will be visible along with the certification badge.|
|Users can set up email subscriptions|Users can create email subscriptions to reports and dashboards.|
|B2B guest users can set up and be subscribed to email subscriptions|Authorized B2B guest users can set up and be subscribed to email subscriptions. Authorized B2B guest users are external users you've added to your Azure Active Directory. Turn off this setting to prevent B2B users from setting up or being subscribed to email subscriptions.|
|Users can send email subscriptions to external users|Users can send email subscriptions to external users. External users are users you've not added to your Azure Active Directory. Turn off this setting to prevent users from subscribing external users to subscription emails.|
|Featured content|Users in the organization can promote their published content to the Featured section of Power BI Home.|
|Allow connections to featured tables|Users in the organization can access and perform calculations on data from featured tables. Featured tables are defined in the modeling view in Power BI Desktop and made available through data types gallery of Excel.|
|Allow shareable links to grant access to everyone in your organization|This setting will grant access to anyone in your organization with the link. It won't work for external users. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2153738" target="_blank">Learn More</a>|
|Enable Microsoft Teams integration|This setting allows people in the organization to access features associated with the Microsoft Teams and Power BI integration. This includes launching Teams experiences from the Power BI service like chats, the Power BI app for Teams, and receiving Power BI notifications in Teams. To completely enable or disable Teams integration, work with your Teams admin.|
|Install Power BI app for Microsoft Teams automatically|The Power BI app for Microsoft Teams is installed automatically for users when they use Microsoft Fabric. The app is installed for users if they have Microsoft Teams and the Power BI app is allowed in the Teams Admin Portal. When the app is installed, users receive notifications in Teams and can more easily discover and collaborate with colleagues. The Power BI app for Teams provides users with the ability to open all Fabric content. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2171149" target="_blank">Learn More</a>.|
|Enable Power BI add-in for PowerPoint|Let people in your org embed Power BI data into their PowerPoint presentations. This integration requires that your organization's Microsoft Office admin has enabled support for add-ins.|
|Allow DirectQuery connections to Power BI datasets|DirectQuery connections allow users to make changes to existing datasets or use them to build new ones. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2179788" target="_blank">Learn More</a>|
|Guest users can work with shared datasets in their own tenants|Authorized guest users can discover datasets shared with them in the OneLake data hub (in Power BI Desktop), and then work with these datasets in their own Power BI tenants.|
|Allow specific users to turn on external data sharing|Turn off this setting to prevent all users from turning on external data sharing. If this setting is on, all or specific users can turn on the external data sharing option, allowing them to share data with authorized guest users. Authorized guest users can then discover, connect to, and work with these shared datasets in their own Power BI tenants.|
|**Discovery settings**||
|Make promoted content discoverable|Allow users in this org who can promote content to make content they promote discoverable by users who don't have access to it. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2156467" target="_blank">Learn More</a>|
|Make certified content discoverable|Allow users in the org who can certify content to make content they certify discoverable by users who don't have access to it. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2156467" target="_blank">Learn More</a>|
|Discover content|Allow users to find and request access to content they don't have access to if it was made discoverable by its owners. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2156467" target="_blank">Learn More</a>|
|**Content pack and app settings**||
|Create template organizational content packs and apps|Users in the organization can create template content packs and apps that use datasets built on one data source in Power BI Desktop.|
|Push apps to end users|Users can share apps directly with end users without requiring installation from AppSource.|
|Publish content packs and apps to the entire organization|Users in the organization can publish content packs and apps to the entire organization.|
|**Integration settings**||
|Allow XMLA endpoints and Analyze in Excel with on-premises datasets|Users in the organization can use Excel to view and interact with on-premises Power BI datasets. This also allows connections to XMLA endpoints.|
|Dataset Execute Queries REST API|Users in the organization can query datasets by using Data Analysis Expressions (DAX) through Power BI REST APIs.|
|Use ArcGIS Maps for Power BI|Users in the organization can use the ArcGIS Maps for Power BI visualization provided by Esri.|
|Use global search for Power BI|NO DESCRIPTION IN UI|
|Use Azure Maps visual|Users in the organization can use the Azure Maps visualization.|
|Map and filled map visuals|Allow people in your org to use the map and filled map visualizations in their reports.|
|Integration with SharePoint and Microsoft Lists|Users in the organization can launch Power BI from SharePoint lists and Microsoft Lists. Then they can build Power BI reports on the data in those lists and publish them back to the lists.|
|Dremio SSO|Enable SSO capability for Dremio. By enabling, user access token information, including name and email, will be sent to Dremio for authentication.|
|Snowflake SSO|Enable SSO capability for Snowflake. By enabling, user access token information, including name and email, will be sent to Snowflake for authentication. &nbsp;<a href="https://aka.ms/snowflakesso" target="_blank">Learn More</a>|
|Redshift SSO|Enable SSO capability for Redshift. By enabling, user access token information, including name and email, will be sent to Redshift for authentication.|
|Google BigQuery SSO|Enable SSO capability for Google BigQuery. By enabling, user access token information, including name and email, will be sent to Google BigQuery for authentication.|
|Oracle SSO|Enable SSO capability for Oracle. By enabling, user access token information, including name and email, will be sent to Oracle for authentication.|
|Azure AD Single Sign-On (SSO) for Gateway|Enable AAD SSO via the on-premises data gateway for applicable data sources. By enabling user access token information including name and email will be sent to these data sources for authentication via the on-premises data gateway. &nbsp;<a href="https://aka.ms/AADSSOForGatewayLearnMore" target="_blank">Learn More</a>|
|Power Platform Solutions Integration (preview)|Allow integration with Power Platform solutions. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2194433" target="_blank">Learn More</a>|
|Users can view Power BI files saved in OneDrive and SharePoint (preview)|Users in the organization can view Power BI files saved in OneDrive for Business or SharePoint document libraries. The permissions to save and share Power BI files in OneDrive and SharePoint document libraries are controlled by permissions managed in OneDrive and SharePoint.&nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2224280" target="_blank">Learn More</a>|
|Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop|Users who have saved Power BI files (.pbix) to OneDrive and SharePoint can share links to those files using Power BI Desktop.&nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2227462" target="_blank">Learn More</a>|
|Enable granular access control for all data connections|Enforce strict access control for all data connection types. When this is turned on, shared items will be disconnected from data sources if they’re edited by users who don’t have permission to use the data connections. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2226159" target="_blank">Learn More</a>|
|Datasets can export data to OneLake (preview)|Datasets configured for OneLake integration can send import tables to OneLake. Once the data is in OneLake, users can include the exported tables in Fabric items, including lakehouses and warehouses.|
|Users can store dataset tables in OneLake (preview)|When users turn on OneLake integration for their datasets, data imported into dataset tables can be stored in OneLake. To allow users to turn on OneLake integration for their datasets, you'll also need to turn on the "Datasets can export data to OneLake" tenant setting.|
|Dataset owners can choose to automatically update datasets from files imported from OneDrive or SharePoint|Dataset owners can choose to allow datasets to be automatically updated with changes made to the corresponding Power BI files (.pbix) stored in OneDrive or SharePoint. File changes can include new and modified data connections.<br><br>Turn off this setting to prevent automatic updates to datasets. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2240760" target="_blank">Learn More</a>|
|**Power BI visuals**||
|Allow visuals created using the Power BI SDK|Users in the organization can add, view, share, and interact with visuals imported from AppSource or from a file. Visuals allowed in the "Organizational visuals" page are not affected by this setting. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2121300" target="_blank">Learn More</a>|
|Add and use certified visuals only (block uncertified)|Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the "Organizational visuals" page are not affected by this setting, regardless of certification. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2036068" target="_blank">Learn More</a>|
|Allow downloads from custom visuals|Enabling this setting will let custom visuals download any information available to the visual (such as summarized data and visual configuration) upon user consent. It is not affected by download restrictions applied in your organization's Export and sharing settings. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2185233&amp;clcid=0x409" target="_blank">Learn More</a>|
|**R and Python visuals settings**||
|Interact with and share R and Python visuals|Users in the organization can interact with and share visuals created with R or Python scripts.|
|**Audit and usage settings**||
|Usage metrics for content creators|Users in the organization can see usage metrics for dashboards, reports and datasets that they have appropriate permissions to. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2152884" target="_blank">Learn More</a>|
|Per-user data in usage metrics for content creators|Usage metrics for content creators will expose display names and email addresses of users who are accessing content.|
|Azure Log Analytics connections for workspace administrators|NO DESCRIPTION IN UI|
|**Dashboard settings**||
|Web content on dashboard tiles|Users in the organization can add and view web content tiles on Power BI dashboards. Note: This may expose your org to security risks via malicious web content.|
|**Developer settings**||
|Embed content in apps|Users in the organization can embed Power BI dashboards and reports in Web applications using "Embed for your customers" method. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2141877" target="_blank">Learn More</a>|
|Allow service principals to use Power BI APIs|Web apps registered in Azure Active Directory (Azure AD) will use an assigned service principal to access Power BI APIs without a signed in user. To allow an app to use service principal authentication its service principal must be included in an allowed security group. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2055030" target="_blank">Learn More</a>|
|Allow service principals to create and use profiles|Allow service principals in your organization to create and use profiles.|
|Block ResourceKey Authentication|For extra security, block using resource key based authentication. This means users not allowed to use streaming datasets API using resource key.|
|**Admin API settings**||
|Allow service principals to use read-only admin APIs|Web apps registered in Azure Active Directory (Azure AD) will use an assigned service principal to access read-only admin APIs without a signed in user. To allow an app to use service principal authentication, its service principal must be included in an allowed security group. By including the service principal in the allowed security group, you're giving the service principal read-only access to all the information available through admin APIs (current and future). For example, user names and emails, dataset and report detailed metadata. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2110545" target="_blank">Learn More</a>|
|Enhance admin APIs responses with detailed metadata|Users and service principals allowed to call Power BI admin APIs may get detailed metadata about Power BI items. For example, responses from GetScanResult APIs will contain the names of dataset tables and columns. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2153790" target="_blank">Learn More</a><br><br>Note: For this setting to apply to service principals, make sure the tenant setting allowing service principals to use read-only admin APIs is enabled. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2110545" target="_blank">Learn More</a>|
|Enhance admin APIs responses with DAX and mashup expressions|Users and service principals eligible to call Power BI admin APIs will get detailed metadata about queries and expressions comprising Power BI items. For example, responses from GetScanResult API will contain DAX and mashup expressions. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2153889" target="_blank">Learn More</a><br><br>Note: For this setting to apply to service principals, make sure the tenant setting allowing service principals to use read-only admin APIs is enabled. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2110545" target="_blank">Learn More</a>|
|**Gen1 dataflow settings**||
|Create and use Gen1 dataflows|Users in the organization can create and use Gen1 dataflows. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=869491" target="_blank">Learn More</a>|
|**Template app settings**||
|Publish template apps|Users in the organization can publish template apps for distribution to clients outside of the organization. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2091856" target="_blank">Learn More</a>.|
|Install template apps|Users in the organization can install template apps created outside the organization. When a template app is installed, an upgraded workspace is created. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2091014" target="_blank">Learn More</a>|
|Install template apps not listed in AppSource|Users in the organization who have been granted permission to install template apps which were not published to Microsoft AppSource. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2091200" target="_blank">Learn More</a>.|
|**Q&amp;A settings**||
|Review questions|Allow dataset owners to review questions people asked about their data.|
|Synonym sharing|Allow people to share Q&amp;A synonyms with your organization. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2163449" target="_blank">Learn More</a>|
|**Dataset Security**||
|Block republish and disable package refresh|Disable package refresh, and only allow the dataset owner to publish updates.|
|**Advanced networking**||
|Azure Private Link|Increase security by allowing people to use a Private Link to access your Power BI tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email. &nbsp;<a href="https://aka.ms/PrivateLinksLearnMore" target="_blank">Learn More</a> | &nbsp;<a href="https://aka.ms/PrivateLinksSetupInstructions" target="_blank">Set-up instructions</a>|
|Block Public Internet Access|For extra security, block access to your Power BI tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. Keep in mind, turning this on could take 10 to 20 minutes to take effect.&nbsp;<a href="https://aka.ms/PrivateLinksLearnMore" target="_blank">Learn More</a>&nbsp;<a href="https://aka.ms/PrivateLinksSetupInstructions" target="_blank">Set-up instructions</a>|
|**Metrics settings**||
|Create and use Metrics|Users in the organization can create and use Metrics|
|**User experience experiments**||
|Help Power BI optimize your experience|Users in this organization will get minor user experience variations that the Power BI team is experimenting with, including content, layout, and design, before they go live for all users.|
|**Share data with your Microsoft 365 services**||
|Users can see Microsoft Fabric metadata in Microsoft 365|Turn on this setting to store and display certain Microsoft Fabric metadata in Microsoft 365 services. Users might see Microsoft Fabric metadata (including content titles and types or open and sharing history) in M365 services like search results and recommended content lists. Metadata from Microsoft Fabric datasets will not be displayed.<br><br>Users can browse or get recommendations only for content they have access to. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2202379" target="_blank">Learn More</a><br><br>This setting is automatically enabled only if your Microsoft Fabric and M365 tenants are in the same geographical region. You may disable this setting.&nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2237979" target="_blank">Where is my Microsoft Fabric tenant located?</a>|
|**Insights settings**||
|Receive notifications for top insights (preview)|Users in the organization can enable notifications for top insights in report settings|
|Show entry points for insights (preview)|Users in the organization can use entry points for requesting insights inside reports|
|**Datamart settings**||
|Create Datamarts (preview)|Users in the organization can create Datamarts|
|**Data model settings**||
|Users can edit data models in the Power BI service (preview)|Turn on this setting to allow users to edit data models in the service. This setting doesn't apply to DirectLake datasets or editing a dataset through an API or XMLA endpoint. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2227332" target="_blank">Learn More</a>|
|**Quick measure suggestions**||
|Allow quick measure suggestions (preview)|Allow users to use natural language to generate suggested measures. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2177910" target="_blank">Learn More</a>|
|Allow user data to leave their geography|Quick measure suggestions are currently processed in the US. When this setting is enabled, users will get quick measure suggestions for data outside the US. &nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2177910" target="_blank">Learn More</a>|
|**Scale-out settings**||
|Scale out queries for large datasets (preview)|For datasets that use the large dataset storage format, Power BI Premium can automatically distribute queries across additional dataset replicas when query volume is high.|
|**OneLake settings**||
|Users can access data stored in OneLake with apps external to Fabric|Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse.&nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2231198" target="_blank">Learn More</a>|
|Users can sync data in OneLake with the OneLake File Explorer app|Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive.&nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2231052" target="_blank">Learn More</a>|
|**Git integration**||
|Users can synchronize workspace items with their Git repositories (preview)|Users can import and export workspace items to Git repositories for collaboration and version control. Turn off this setting to prevent users from syncing workspace items with their Git repositories.&nbsp;<a href="https://go.microsoft.com/fwlink/?linkid=2240844" target="_blank">Learn More</a>|
|Users can export items to Git repositories in other geographical locations (preview)|The workspace and the Git repository may reside in different geographies. Turn on this setting to allow users to export items to Git repositories in other geographies.|
|Users can export workspace items with applied sensitivity labels to Git repositories (preview)|Turn on this setting to allow users to export items with applied sensitivity labels to their Git repositories.|


## Next steps

- [What is the admin portal?](admin-center.md)
