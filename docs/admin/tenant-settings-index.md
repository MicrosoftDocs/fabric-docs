---
title: Tenant settings index
description: Index to Fabric tenant settings.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/10/2024
---

# Tenant settings index

This article lists all Fabric tenant settings, along with a brief description of each. For more information about tenant settings in general, see [About tenant settings](about-tenant-settings.md).

## [Microsoft Fabric](fabric-switch.md)

| Setting name | Description |
|------|-------|
|[Data Activator (preview)](../data-activator/data-activator-get-started.md)|Turn on Data Activator Preview to allow users to define a specific set of conditions about their data, and then receive notifications when those conditions are met. After they receive notifications, users can take action to correct the change in conditions. This setting can be managed at both the tenant and the capacity levels. Data Activator is currently available in  [these regions](https://go.microsoft.com/fwlink/?linkid=2250213). When you turn on Data Activator, you agree to the  [Data Activator Preview terms](https://go.microsoft.com/fwlink/?linkid=2244647).  [Learn More](https://go.microsoft.com/fwlink/?linkid=2237360)|
|[Users can create Fabric items](fabric-switch.md)|Users can use production-ready features to create Fabric items. Turning off this setting doesn't impact users’ ability to create Power BI items. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2247554)|
|Users can create Fabric environments to save and apply Spark settings (preview)|In Synapse Data Engineering and Data Science, users can select specific Spark runtimes, configure compute resources, and install libraries, and then save their choices as an environment. Environments can be attached to workspaces, notebooks, and Spark job definitions.|
|[Sustainability solutions (preview)](/industry/sustainability/sustainability-data-solutions-overview)|Turn on this setting to give your tenant users the permission to deploy the Sustainability solutions (preview) and its associated capabilities.  [Learn More](https://aka.ms/learn-about-sustainability-solutions)|
|Retail data solutions (preview)|With Retail data solutions, manage retail data at scale to improve customer experience and drive operational efficiency across the organization. [Learn More](https://aka.ms/Retail_data_solutions)|
|Healthcare data solutions (preview)|Use advanced AI analytics to help generate new insights, enhance patient care, and improve outcomes.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2248375)|
|[Create Eventhouse (preview)](../real-time-analytics/eventhouse.md)|Users in the organization can use Eventhouse|

## [Help and support settings](service-admin-portal-help-support.md)

| Setting name | Description |
|------|-------|
|[Publish "Get Help" information](service-admin-portal-help-support.md#publish-get-help-information)|Users in the organization can go to internal help and support resources from the Power BI help menu.|
|[Receive email notifications for service outages or incidents](../enterprise/service-interruption-notifications.md#enable-notifications-for-service-outages-or-incidents)|Mail-enabled security groups will receive email notifications if this tenant is impacted by a service outage or incident.|
|[Users can try Microsoft Fabric paid features](service-admin-portal-help-support.md#users-can-try-microsoft-fabric-paid-features)|When users sign up for a Microsoft Fabric trial, they can try Fabric paid features for free for 60 days from the day they signed up.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2227896)|
|[Show a custom message before publishing reports](service-admin-portal-help-support.md#show-a-custom-message-before-publishing-reports)|When people attempt to publish a report, they'll see a custom message before it gets published.|

## Domain management settings

| Setting name | Description |
|------|-------|
|[Allow tenant and domain admins to override workspace assignments (preview)](./service-admin-portal-domain-management-settings.md#allow-tenant-and-domain-admins-to-override-workspace-assignments-preview)|Tenant and domain admins can reassign workspaces that were previously assigned to one domain to another domain.|

## [Workspace settings](portal-workspace.md)

| Setting name | Description |
|------|-------|
|[Create workspaces](portal-workspace.md#create-workspaces-new-workspace-experience)|Users in the organization can create app workspaces to collaborate on dashboards, reports, and other content. Even if this setting is disabled, a workspace will be created when a template app is installed.|
|[Use semantic models across workspaces](portal-workspace.md#use-semantic-models-across-workspaces)|Users in the organization can use semantic models across workspaces if they have the required Build permission.|
|[Block users from reassigning personal workspaces (My Workspace)](portal-workspace.md#block-users-from-reassigning-personal-workspaces-my-workspace)|Turn on this setting to prevent users from reassigning their personal workspaces (My Workspace) from Premium capacities to shared capacities.  [Learn More](https://aka.ms/RestrictMyFolderCapacity)|
|[Define workspace retention period](portal-workspaces.md#workspace-retention)|Turn on this setting to define a retention period during which you can restore a deleted workspace and recover items in it. At the end of the retention period, the workspace is permanently deleted. By default, workspaces are always retained for a minimum of 7 days before they're permanently deleted.<br><br>Turn off this setting to accept the minimum retention period of 7 days. After 7 days the workspace and items in it will be permanently deleted.<br><br>Enter the number of days to retain a workspace before it's permanently deleted. My Workspace workspaces will be retained for 30 days automatically. Other workspaces can be retained for up to 90 days.|

## [Information protection](service-admin-portal-information-protection.md)

| Setting name | Description |
|------|-------|
|[Allow users to apply sensitivity labels for content](service-admin-portal-information-protection.md#allow-users-to-apply-sensitivity-labels-for-content)|With this setting enabled, Microsoft Purview Information Protection sensitivity labels published to users by your organization can be applied. All  [prerequisite steps](https://go.microsoft.com/fwlink/?linkid=2144840) must be completed before enabling this setting.<br><br>Note: Sensitivity label settings, such as encryption and content marking for files and emails, are not applied to content.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2143053)<br><br>Visit the  [Microsoft Purview compliance portal](https://protection.officeppe.com/sensitivity?flight=EnableMIPLabels) to view sensitivity label settings for your organization.<br><br>Note: Sensitivity labels and protection are only applied to files exported to Excel, PowerPoint, or PDF files, that are controlled by "Export to Excel" and "Export reports as PowerPoint presentation or PDF documents" settings. All other export and sharing options do not support the application of sensitivity labels and protection.|
|[Apply sensitivity labels from data sources to their data in Power BI](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources)|Only sensitivity labels from supported data sources will be applied. Please see the documentation for details about supported data sources and how their sensitivity labels are applied in Power BI.  [Learn about supported data sources](https://go.microsoft.com/fwlink/?linkid=2149746)|
|[Automatically apply sensitivity labels to downstream content](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance)|With this setting enabled, whenever a sensitivity label is changed or applied to Fabric content, the label will also be applied to its eligible downstream content.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2153971)|
|[Allow workspace admins to override automatically applied sensitivity labels](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement#relaxations-to-accommodate-automatic-labeling-scenarios)|With this setting enabled, workspace admins can change or remove sensitivity labels that were applied automatically by Fabric, for example, as a result of label inheritance.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2154646)|
|[Restrict content with protected labels from being shared via link with everyone in your organization](service-admin-portal-information-protection.md#restrict-content-with-protected-labels-from-being-shared-via-link-with-everyone-in-your-organization)|This setting will prevent content with protection settings in the sensitivity label from being shared via link with everyone in your organization.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2160554)|
|[Increase the number of users who can edit and republish encrypted PBIX files (preview)](./service-admin-portal-information-protection.md#increase-the-number-of-users-who-can-edit-and-republish-encrypted-pbix-files-preview)|Turn on this setting to allow users who've been assigned restrictive sensitivity permissions in the Microsoft Purview compliance portal to open, edit, and publish encrypted PBIX files in Power BI Desktop. Some limitations apply. [Learn More](https://go.microsoft.com/fwlink/?linkid=2247658)|

## [Export and sharing settings](service-admin-portal-export-sharing.md)

| Setting name | Description |
|------|-------|
|[Guest users can access Microsoft Fabric](/power-bi/enterprise/service-admin-azure-ad-b2b)|Guest users who've been added to your Microsoft Entra directory can access Microsoft Fabric and any Fabric items they have permissions to.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2257019)|
|[Users can invite guest users to collaborate through item sharing and permissions](/power-bi/enterprise/service-admin-azure-ad-b2b#invite-guest-users)|Users can collaborate with people outside the organization by sharing Fabric items with them and granting them permission to access those items. After external users accept an invitation, they're added to your Microsoft Entra directory as guest users.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256936)|
|[Guest users can browse and access Fabric content](/power-bi/enterprise/service-admin-azure-ad-b2b)|Users can invite guest users to browse and request access to Fabric content.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2038485)|
|[Users can see guest users in lists of suggested people](service-admin-portal-export-sharing.md#show-microsoft-entra-guests-in-lists-of-suggested-people)|With this setting on, users will see both users in your organization and guest users who've been added to your Microsoft Entra directory in lists of suggested people. With this setting off, users will see only users in your organization.<br><br>Users can still share items with guests by providing their full email address.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256937)|
|[Publish to web](service-admin-portal-export-sharing.md#publish-to-web)|People in your org can publish public reports on the web. Publicly published reports don't require authentication to view them.<br><br>Go to [Embed codes](./service-admin-portal-embed-codes.md) in the admin portal to review and manage public embed codes. If any of the codes contain private or confidential content remove them.<br><br>Review embed codes regularly to make sure no confidential information is live on the web.  [Learn more about Publish to web](https://go.microsoft.com/fwlink/?LinkID=859242)|
|Copy and paste visuals|Users in the organization can copy visuals from a tile or report visual and paste them as static images into external applications.|
|[Export to Excel](/power-bi/visuals/power-bi-visualization-export-data)|Users in the organization can export the data from a visualization or paginated report to an Excel file.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2143053)|
|[Export to .csv](/power-bi/paginated-reports/report-builder/export-csv-file-report-builder)|Users in the organization can export data from a tile, visualization, or paginated report to a .csv file.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2143055)|
|[Download reports](/power-bi/create-reports/service-export-to-pbix)|Users in the organization can download .pbix files and paginated reports.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2143210)|
|[Users can work with semantic models in Excel using a live connection](/power-bi/collaborate-share/service-analyze-in-excel)|Users can export data to Excel from a report visual or semantic model, or export a semantic model to an Excel workbook with Analyze in Excel, both options with a live connection to the XMLA endpoint.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2143211)|
|[Export reports as PowerPoint presentations or PDF documents](service-admin-portal-export-sharing.md#export-reports-as-powerpoint-presentations-or-pdf-documents)|Users in the organization can export reports as PowerPoint files or PDF documents.|
|Export reports as MHTML documents|Users in the organization can export Paginated reports as MHTML documents.|
|[Export reports as Word documents](/power-bi/paginated-reports/report-builder/export-microsoft-word-report-builder)|Users in the organization can export Paginated reports as Word documents.|
|[Export reports as XML documents](/power-bi/paginated-reports/report-builder/export-xml-report-builder)|Users in the organization can export Paginated reports as XML documents.|
|[Export reports as image files](/power-bi/paginated-reports/report-builder/export-image-file-report-builder)|Users in the organization can use the export report to file API to export reports as image files.|
|[Print dashboards and reports](/power-bi/consumer/end-user-print)|Users in the organization can print dashboards and reports.|
|[Certification](/power-bi/admin/service-admin-setup-certification)|Choose whether people in your org or specific security groups can certify items (like apps, reports, or datamarts) as trusted sources for the wider organization.<br><br>Note: When a user certifies an item, their contact details will be visible along with the certification badge.|
|[Users can set up email subscriptions](/power-bi/collaborate-share/end-user-subscribe)|Users can create email subscriptions to reports and dashboards.|
|[Guest users can set up and subscribe to email subscriptions](service-admin-portal-export-sharing.md#b2b-guest-users-can-set-up-and-be-subscribed-to-email-subscriptions)|Guest users can set up and subscribe to email subscriptions. With this setting off, only users in your organization can set up and subscribe to email subscriptions.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256373)|
|[Users can send email subscriptions to guest users](./service-admin-portal-export-sharing.md#users-can-send-email-subscriptions-to-guest-users)|Users can send email subscriptions to guest users. With this setting off, users in your organization can't subscribe guest users to subscription emails.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256884)|
|[Featured content](/power-bi/collaborate-share/service-featured-content)|Users in the organization can promote their published content to the Featured section of Power BI Home.|
|[Allow connections to featured tables](/power-bi/collaborate-share/service-excel-featured-tables)|Users in the organization can access and perform calculations on data from featured tables. Featured tables are defined in the modeling view in Power BI Desktop and made available through data types gallery of Excel.|
|[Allow shareable links to grant access to everyone in your organization](./service-admin-portal-export-sharing.md#allow-shareable-links-to-grant-access-to-everyone-in-your-organization)|This setting will grant access to anyone in your organization with the link. It won't work for external users.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2153738)|
|[Enable Microsoft Teams integration](/power-bi/collaborate-share/service-collaborate-microsoft-teams)|This setting allows people in the organization to access features associated with the Microsoft Teams and Power BI integration. This includes launching Teams experiences from the Power BI service like chats, the Power BI app for Teams, and receiving Power BI notifications in Teams. To completely enable or disable Teams integration, work with your Teams admin.|
|[Install Power BI app for Microsoft Teams automatically](service-admin-portal-export-sharing.md#install-power-bi-app-for-microsoft-teams-automatically)|The Power BI app for Microsoft Teams is installed automatically for users when they use Microsoft Fabric. The app is installed for users if they have Microsoft Teams and the Power BI app is allowed in the Teams Admin Portal. When the app is installed, users receive notifications in Teams and can more easily discover and collaborate with colleagues. The Power BI app for Teams provides users with the ability to open all Fabric content.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2171149).|
|[Enable Power BI add-in for PowerPoint](service-admin-portal-export-sharing.md#enable-power-bi-add-in-for-powerpoint)|Let people in your org embed Power BI data into their PowerPoint presentations. This integration requires that your organization's Microsoft Office admin has enabled support for add-ins.|
|[Allow DirectQuery connections to Power BI semantic models](service-admin-portal-export-sharing.md#allow-directquery-connections-to-power-bi-semantic-models)|DirectQuery connections allow users to make changes to existing semantic models or use them to build new ones.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2179788)|
|[Guest users can work with shared semantic models in their own tenants](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-guest-users-to-work-with-shared-datasets-in-their-own-tenants)|Authorized guest users can discover semantic models shared with them in the OneLake data hub (in Power BI Desktop), and then work with these semantic models in their own Power BI tenants.|
|[Allow specific users to turn on external data sharing](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-specific-users-to-turn-on-external-data-sharing)|Turn off this setting to prevent all users from turning on external data sharing. If this setting is on, all or specific users can turn on the external data sharing option, allowing them to share data with authorized guest users. Authorized guest users can then discover, connect to, and work with these shared semantic models in their own Power BI tenants.|
|Users can deliver reports to OneDrive and SharePoint in Power BI|Users can deliver reports to OneDrive or SharePoint. If the **Users can set up subscriptions** setting is also turned on, users can use subscriptions to schedule delivery of these reports to OneDrive or SharePoint. [Learn More](./tenant-settings-index.md#export-and-sharing-settings)|

## [Discovery settings](service-admin-portal-discovery.md)

| Setting name | Description |
|------|-------|
|[Make promoted content discoverable](/power-bi/collaborate-share/service-discovery)|Allow users in this org who can promote content to make content they promote discoverable by users who don't have access to it.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2156467)|
|[Make certified content discoverable](/power-bi/collaborate-share/service-discovery)|Allow users in the org who can certify content to make content they certify discoverable by users who don't have access to it.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2156467)|
|[Discover content](../get-started/onelake-data-hub.md#find-recommended-items)|Allow users to find and request access to content they don't have access to if it was made discoverable by its owners.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2156467)|

## App settings

| Setting name | Description |
|------|-------|
|[Create template organizational apps](/power-bi/connect-data/service-template-apps-create)|Users in the organization can create template apps that use semantic models built on one data source in Power BI Desktop.|
|[Push apps to end users](/power-bi/collaborate-share/service-create-distribute-apps#automatically-install-apps-for-end-users)|Users can share apps directly with end users without requiring installation from AppSource.|
|[Publish apps to the entire organization](/power-bi/collaborate-share/service-create-distribute-apps#publish-the-app-to-your-entire-organization)|Users in the organization can publish apps to the entire organization.|

## [Integration settings](service-admin-portal-integration.md)

| Setting name | Description |
|------|-------|
|[Allow XMLA endpoints and Analyze in Excel with on-premises semantic models](/power-bi/collaborate-share/service-analyze-in-excel)|Users in the organization can use Excel to view and interact with on-premises Power BI semantic models. This also allows connections to XMLA endpoints.|
|[Semantic Model Execute Queries REST API](/rest/api/power-bi/datasets/execute-queries)|Users in the organization can query semantic models by using Data Analysis Expressions (DAX) through Power BI REST APIs.|
|[Use ArcGIS Maps for Power BI](/power-bi/visuals/power-bi-visualizations-arcgis)|Users in the organization can use the ArcGIS Maps for Power BI visualization provided by Esri.|
|[Use global search for Power BI](/power-bi/consumer/end-user-search-sort)|NO DESCRIPTION IN UI|
|[Use Azure Maps visual](/azure/azure-maps/power-bi-visual-get-started)|Users in the organization can use the Azure Maps visualization.|
|[Map and filled map visuals](/power-bi/visuals/power-bi-visualization-filled-maps-choropleths)|Allow people in your org to use the map and filled map visualizations in their reports.|
|[Integration with SharePoint and Microsoft Lists](service-admin-portal-integration.md#integration-with-sharepoint-and-microsoft-lists)|Users in the organization can launch Power BI from SharePoint lists and Microsoft Lists. Then they can build Power BI reports on the data in those lists and publish them back to the lists.|
|[Dremio SSO](https://powerquery.microsoft.com/blog/azure-ad-based-single-sign-on-for-dremio-cloud-and-power-bi)|Enable SSO capability for Dremio. By enabling, user access token information, including name and email, will be sent to Dremio for authentication.|
|[Snowflake SSO](/power-bi/connect-data/service-connect-snowflake)|Enable SSO capability for Snowflake. By enabling, user access token information, including name and email, will be sent to Snowflake for authentication.  [Learn More](https://aka.ms/snowflakesso)|
|[Redshift SSO](/power-bi/connect-data/service-gateway-sso-overview)|Enable SSO capability for Redshift. By enabling, user access token information, including name and email, will be sent to Redshift for authentication.|
|[Google BigQuery SSO](/power-query/connectors/google-bigquery-aad)|Enable SSO capability for Google BigQuery. By enabling, user access token information, including name and email, will be sent to Google BigQuery for authentication.|
|[Microsoft Entra single sign-on for data gateway](service-admin-portal-integration.md#azure-ad-single-sign-on-sso-for-gateway)|Users can use Microsoft Entra single sign-on (SSO) to authenticate to on-premises data gateways and access data sources.<br><br>With this setting on, user access token information, including names and emails, is sent to data sources to authenticate to the  on-premises data gateway service.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256374)|
|[Power Platform Solutions Integration (preview)](service-admin-portal-integration.md#power-platform-solutions-integration-preview)|Allow integration with Power Platform solutions.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2194433)|
|[Users can view Power BI files saved in OneDrive and SharePoint (preview)](/power-bi/collaborate-share/service-sharepoint-viewer)|Users in the organization can view Power BI files saved in OneDrive for Business or SharePoint document libraries. The permissions to save and share Power BI files in OneDrive and SharePoint document libraries are controlled by permissions managed in OneDrive and SharePoint. [Learn More](https://go.microsoft.com/fwlink/?linkid=2224280)|
|[Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop](service-admin-portal-integration.md#users-can-share-links-to-power-bi-files-stored-in-onedrive-and-sharepoint-through-power-bi-desktop)|Users who have saved Power BI files (.pbix) to OneDrive and SharePoint can share links to those files using Power BI Desktop. [Learn More](https://go.microsoft.com/fwlink/?linkid=2227462)|
|Enable granular access control for all data connections|Enforce strict access control for all data connection types. When this is turned on, shared items will be disconnected from data sources if they’re edited by users who don’t have permission to use the data connections.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2226159)|
|[Semantic models can export data to OneLake (preview)](/power-bi/enterprise/onelake-integration-overview#admin-portal)|Semantic models configured for OneLake integration can send import tables to OneLake. Once the data is in OneLake, users can include the exported tables in Fabric items, including lakehouses and warehouses.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2252165)|
|[Users can store semantic model tables in OneLake (preview)](/power-bi/enterprise/onelake-integration-overview#admin-portal)|When users turn on OneLake integration for their semantic models, data imported into semantic model tables can be stored in OneLake. To allow users to turn on OneLake integration for their semantic models, you'll also need to turn on the "Semantic models can export data to OneLake" tenant setting.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2252165)|
|[Semantic model owners can choose to automatically update semantic models from files imported from OneDrive or SharePoint](/power-bi/connect-data/refresh-desktop-file-onedrive)|Semantic model owners can choose to allow semantic models to be automatically updated with changes made to the corresponding Power BI files (.pbix) stored in OneDrive or SharePoint. File changes can include new and modified data connections.<br><br>Turn off this setting to prevent automatic updates to semantic models.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2240760)|

## [Power BI visuals](/power-bi/admin/organizational-visuals)

| Setting name | Description |
|------|-------|
|[Allow visuals created using the Power BI SDK](/power-bi/admin/organizational-visuals#visuals-from-appsource-or-a-file)|Users in the organization can add, view, share, and interact with visuals imported from AppSource or from a file. Visuals allowed in the "Organizational visuals" page are not affected by this setting.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2121300)|
|[Add and use certified visuals only (block uncertified)](/power-bi/admin/organizational-visuals#certified-power-bi-visuals)|Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the "Organizational visuals" page are not affected by this setting, regardless of certification.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2036068)|
|[Allow downloads from custom visuals](/power-bi/admin/organizational-visuals#export-data-to-file)|Enabling this setting will let custom visuals download any information available to the visual (such as summarized data and visual configuration) upon user consent. It is not affected by download restrictions applied in your organization's Export and sharing settings.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2185233&amp;clcid=0x409)|
|[Custom visuals can get users' Microsoft Entra access tokens](./organizational-visuals.md#obtain-microsoft-entra-access-token)|Custom visuals can get the Microsoft Entra access tokens of signed-in users.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2236555)|
|[Allow access to the browser's local storage](./organizational-visuals.md#obtain-microsoft-entra-access-token)|When this setting is on, custom visuals can store information on the user's browser's local storage.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2195648)|

## [R and Python visuals settings](service-admin-portal-r-python-visuals.md)

| Setting name | Description |
|------|-------|
|[Interact with and share R and Python visuals](service-admin-portal-r-python-visuals.md#interact-with-and-share-r-and-python-visuals)|Users in the organization can interact with and share visuals created with R or Python scripts.|

## [Audit and usage settings](service-admin-portal-audit-usage.md)

| Setting name | Description |
|------|-------|
|[Usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics)|Users in the organization can see usage metrics for dashboards, reports and semantic models that they have appropriate permissions to.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2152884)|
|[Per-user data in usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics#exclude-user-information-from-usage-metrics-reports)|Usage metrics for content creators will expose display names and email addresses of users who are accessing content.|
|[Azure Log Analytics connections for workspace administrators](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure)|NO DESCRIPTION IN UI|

## [Dashboard settings](service-admin-portal-dashboard.md)

| Setting name | Description |
|------|-------|
|[Web content on dashboard tiles](/power-bi/create-reports/service-dashboard-add-widget#add-web-content)|Users in the organization can add and view web content tiles on Power BI dashboards. Note: This may expose your org to security risks via malicious web content.|

## [Developer settings](service-admin-portal-developer.md)

| Setting name | Description |
|------|-------|
|[Embed content in apps](/power-bi/developer/embedded/embedded-analytics-power-bi)|Users in the organization can embed Power BI dashboards and reports in Web applications using "Embed for your customers" method.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2141877)|
|[Service principals can use Fabric APIs](/power-bi/developer/embedded/embed-service-principal)|Web apps registered in Microsoft Entra ID can use service principals, rather than user credentials, to authenticate to Fabric APIs.<br><br>To allow an app to use a service principal as an authentication method, the service principal must be added to an allowed security group. Service principals included in allowed security groups will have read-only access to all the information available through admin APIs, which can include user names and emails, and detailed metadata about semantic models and reports.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2055030)|
|[Allow service principals to create and use profiles](/power-bi/developer/embedded/embed-multi-tenancy)|Allow service principals in your organization to create and use profiles.|
|[Block ResourceKey Authentication](service-admin-portal-developer.md#block-resourcekey-authentication)|For extra security, block using resource key based authentication. This means users not allowed to use streaming semantic models API using resource key.|

## [Admin API settings](service-admin-portal-admin-api-settings.md)

| Setting name | Description |
|------|-------|
|[Service principals can access read-only admin APIs](/power-bi/enterprise/read-only-apis-service-principal-authentication)|Web apps registered in Microsoft Entra ID can use service principals, rather than user credentials, to authenticate to read-only admin APIs.<br><br>To allow an app to use a service principal as an authentication method, the service principal must be added to an allowed security group. Service principals included in allowed security groups will have read-only access to all the information available through admin APIs, which can include users' names and emails, and detailed metadata about semantic models and reports.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2110545)|
|[Enhance admin APIs responses with detailed metadata](service-admin-portal-admin-api-settings.md#enhance-admin-apis-responses-with-detailed-metadata)|Users and service principals allowed to call Power BI admin APIs may get detailed metadata about Power BI items. For example, responses from GetScanResult APIs will contain the names of semantic model tables and columns.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2153790)<br><br>Note: For this setting to apply to service principals, make sure the tenant setting allowing service principals to use read-only admin APIs is enabled.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2110545)|
|[Enhance admin APIs responses with DAX and mashup expressions](service-admin-portal-admin-api-settings.md#enhance-admin-apis-responses-with-dax-and-mashup-expressions)|Users and service principals eligible to call Power BI admin APIs will get detailed metadata about queries and expressions comprising Power BI items. For example, responses from GetScanResult API will contain DAX and mashup expressions.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2153889)<br><br>Note: For this setting to apply to service principals, make sure the tenant setting allowing service principals to use read-only admin APIs is enabled.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2110545)|

## [Gen1 dataflow settings](service-admin-portal-dataflow.md)

| Setting name | Description |
|------|-------|
|[Create and use Gen1 dataflows](/power-bi/transform-model/dataflows/dataflows-introduction-self-service)|Users in the organization can create and use Gen1 dataflows.  [Learn More](https://go.microsoft.com/fwlink/?linkid=869491)|

## [Template app settings](service-admin-portal-template-app.md)

| Setting name | Description |
|------|-------|
|[Publish template apps](/power-bi/connect-data/service-template-apps-overview)|Users in the organization can publish template apps for distribution to clients outside of the organization.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2091856).|
|[Install template apps](service-admin-portal-template-app.md#install-template-apps)|Users in the organization can install template apps created outside the organization. When a template app is installed, an upgraded workspace is created.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2091014)|
|Install template apps not listed in AppSource|Users in the organization who have been granted permission to install template apps which were not published to Microsoft AppSource.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2091200).|

## [Q&amp;A settings](service-admin-portal-qa.md)

| Setting name | Description |
|------|-------|
|Review questions|Allow semantic model owners to review questions people asked about their data.|
|[Synonym sharing](/power-bi/natural-language/q-and-a-tooling-intro#field-synonyms)|Allow people to share Q&amp;A synonyms with your organization.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2163449)|

## Semantic Model Security

| Setting name | Description |
|------|-------|
|Block republish and disable package refresh|Disable package refresh, and only allow the semantic model owner to publish updates.|

## [Advanced networking](service-admin-portal-advanced-networking.md)

| Setting name | Description |
|------|-------|
|[Azure Private Link](/power-bi/enterprise/service-security-private-links)|Increase security by allowing people to use a Private Link to access your Power BI tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email.  [Learn More](https://aka.ms/PrivateLinksLearnMore)  [Set-up instructions](https://aka.ms/PrivateLinksSetupInstructions)<br><br>Review the  [considerations and limitations](https://aka.ms/PrivateLinksConsiderationsAndLimitations) section before enabling private endpoints.|
|[Block Public Internet Access](/power-bi/enterprise/service-security-private-links)|For extra security, block access to your Power BI tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. Keep in mind, turning this on could take 10 to 20 minutes to take effect. [Learn More](https://aka.ms/PrivateLinksLearnMore) [Set-up instructions](https://aka.ms/PrivateLinksSetupInstructions)|

## [Metrics settings](service-admin-portal-goals-settings.md)

| Setting name | Description |
|------|-------|
|[Create and use Metrics](/power-bi/create-reports/service-goals-introduction)|Users in the organization can create and use Metrics|

## [User experience experiments](service-admin-portal-user-experience-experiments.md)

| Setting name | Description |
|------|-------|
|Help Power BI optimize your experience|Users in this organization will get minor user experience variations that the Power BI team is experimenting with, including content, layout, and design, before they go live for all users.|

## [Share data with your Microsoft 365 services](admin-share-power-bi-metadata-microsoft-365-services.md)

| Setting name | Description |
|------|-------|
|[Users can see Microsoft Fabric metadata in Microsoft 365](admin-share-power-bi-metadata-microsoft-365-services.md#how-to-turn-sharing-with-microsoft-365-services-on-and-off)|Turn on this setting to store and display certain Microsoft Fabric metadata in Microsoft 365 services. Users might see Microsoft Fabric metadata (including content titles and types or open and sharing history) in Microsoft 365 services like search results and recommended content lists. Metadata from Microsoft Fabric semantic models will not be displayed.<br><br>Users can browse or get recommendations only for content they have access to.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2202379)<br><br>This setting is automatically enabled only if your Microsoft Fabric and Microsoft 365 tenants are in the same geographical region. You may disable this setting. [Where is my Microsoft Fabric tenant located?](https://go.microsoft.com/fwlink/?linkid=2237979)|

## [Insights settings](service-admin-portal-insights.md)

| Setting name | Description |
|------|-------|
|[Receive notifications for top insights (preview)](/power-bi/create-reports/insights)|Users in the organization can enable notifications for top insights in report settings|
|Show entry points for insights (preview)|Users in the organization can use entry points for requesting insights inside reports|

## [Datamart settings](service-admin-portal-datamart.md)

| Setting name | Description |
|------|-------|
|[Create Datamarts (preview)](/power-bi/transform-model/datamarts/datamarts-administration)|Users in the organization can create Datamarts|

## [Data model settings](service-admin-portal-data-model.md)

| Setting name | Description |
|------|-------|
|[Users can edit data models in the Power BI service (preview)](/power-bi/transform-model/service-edit-data-models#enabling-data-model-editing-in-the-admin-portal)|Turn on this setting to allow users to edit data models in the service. This setting doesn't apply to DirectLake semantic models or editing a semantic model through an API or XMLA endpoint.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2227332)|

## [Quick measure suggestions](service-admin-portal-quick-measure-suggestions-settings.md)

| Setting name | Description |
|------|-------|
|[Allow quick measure suggestions (preview)](/power-bi/transform-model/quick-measure-suggestions)|Allow users to use natural language to generate suggested measures.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2177910)|
|[Allow user data to leave their geography](/power-bi/transform-model/quick-measure-suggestions#limitations-and-considerations)|Quick measure suggestions are currently processed in the US. When this setting is enabled, users will get quick measure suggestions for data outside the US.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2177910)|

## [Scale-out settings](service-admin-portal-scale-out.md)

| Setting name | Description |
|------|-------|
|[Scale out queries for large semantic models](/power-bi/enterprise/service-premium-scale-out)|For semantic models that use the large semantic model storage format, Power BI Premium can automatically distribute queries across additional semantic model replicas when query volume is high.|

## [OneLake settings](service-admin-portal-onelake.md)

| Setting name | Description |
|------|-------|
|[Users can access data stored in OneLake with apps external to Fabric](../onelake/security/fabric-and-onelake-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake)|Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse. [Learn More](https://go.microsoft.com/fwlink/?linkid=2231198)|
|[Users can sync data in OneLake with the OneLake File Explorer app](../onelake/onelake-file-explorer.md)|Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive. [Learn More](https://go.microsoft.com/fwlink/?linkid=2231052)|

## [Git integration](git-integration-admin-settings.md)

| Setting name | Description |
|------|-------|
|[Users can synchronize workspace items with their Git repositories (preview)](../cicd/git-integration/intro-to-git-integration.md)|Users can import and export workspace items to Git repositories for collaboration and version control. Turn off this setting to prevent users from syncing workspace items with their Git repositories. [Learn More](https://go.microsoft.com/fwlink/?linkid=2240844)|
|[Users can export items to Git repositories in other geographical locations (preview)](git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations-preview)|The workspace and the Git repository may reside in different geographies. Turn on this setting to allow users to export items to Git repositories in other geographies.|
|[Users can export workspace items with applied sensitivity labels to Git repositories (preview)](git-integration-admin-settings.md#users-can-export-workspace-items-with-applied-sensitivity-labels-to-git-repositories-preview)|Turn on this setting to allow users to export items with applied sensitivity labels to their Git repositories.|

## Copilot and Azure OpenAI Service (preview)​

| Setting name | Description |
|------|-------|
|[Users can use a preview of Copilot and other features powered by Azure OpenAI](../get-started/copilot-fabric-overview.md#enable-copilot)|When this setting is on, users can access a preview and use preview features powered by Azure OpenAI, including Copilot.<br><br>Your data, such as prompts, augmented data included with prompts, and AI outputs, will be processed and temporarily stored by Microsoft and may be reviewed by Microsoft employees for abuse monitoring.  [Learn More](https://aka.ms/fabric/aoai)<br><br>By turning this setting on, you agree to the  [Preview Terms](https://azure.microsoft.com/support/legal/preview-supplemental-terms/#AzureOpenAI-PoweredPreviews).|
|[​​​Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance](../get-started/copilot-fabric-overview.md#enable-copilot)|Azure OpenAI is currently available in a limited number of regions and geographies. When this setting is on, data sent to Azure OpenAI can be processed in a region where the service is available, which might be outside your tenant's geographic region, compliance boundary, or national cloud instance.  [Learn More](https://aka.ms/fabric/aoai/region)<br><br>By turning this setting on, you agree to the  [Preview Terms](https://azure.microsoft.com/support/legal/preview-supplemental-terms/#AzureOpenAI-PoweredPreviews).|

## Related content

- [What is the admin portal?](admin-center.md)
- [About tenant settings](about-tenant-settings.md)