---
title: Tenant settings index
description: Index to Fabric tenant settings.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.collection: ce-skilling-ai-copilot
ms.date: 01/29/2025
---

<!--WARNING! DO NOT MANUALLY EDIT THIS DOCUMENT - MANUAL EDITS WILL BE LOST. This document is automatically generated weekly from the tenant settings of the PROD version of Microsoft Fabric. Manual edits will be overwritten with the tenant settings content as it appears to customers in the current PROD Fabric UI.-->

# Tenant settings index

This article lists all Fabric tenant settings, along with a brief description of each, and links to relevant documentation, if available. For more information about tenant settings in general, see [About tenant settings](about-tenant-settings.md).

If you want to get to the tenant settings in the Fabric portal, see [How to get to the tenant settings](./about-tenant-settings.md#how-to-get-to-the-tenant-settings).

## [Microsoft Fabric](fabric-switch.md)

| Setting name | Description |
|------|-------|
|[Users can create Fabric items](fabric-switch.md)|Users can use production-ready features to create Fabric items. Turning off this setting doesn't impact users’ ability to create Power BI items. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2247554)|
|Users can create and use ADF Mount items (preview)|Users can connect and test existing ADF pipelines in Microsoft Fabric. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2250738)|
|[Users can create Healthcare Cohort items (preview)](/industry/healthcare/healthcare-data-solutions/discover-and-build-cohorts-overview)|Users can explore and create healthcare cohorts using natural language from the multi-modal healthcare data estate provided by the Healthcare solutions item. The data may contain Protected Health Information (PHI). Collaborators with workspace access can view, build on, and modify the healthcare cohort items within that workspace.<br><br>By turning this setting on, you agree to the  [Preview Terms](https://go.microsoft.com/fwlink/?linkid=2257737).|
|[Retail data solutions (preview)](/industry/retail/retail-data-solutions/overview-retail-data-solutions)|With Retail data solutions, manage retail data at scale to improve customer experience and drive operational efficiency across the organization. [Learn More](https://go.microsoft.com/fwlink/?linkid=2263806)|
|[Users can create and use Apache Airflow jobs (preview)](../data-factory/create-apache-airflow-jobs.md)|Apache Airflow jobs offer an integrated runtime environment, enabling users to author, execute, and schedule Python DAGs. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://aka.ms/fabricairflowintrodoc)|
|[API for GraphQL (preview)](../data-engineering/api-graphql-overview.md)|Select the admins who can view and change this setting, including any security group selections you've made.|
|[SQL database (preview)​](../database/sql/overview.md)|Users can create SQL databases​.  [Learn More](https://aka.ms/fabricsqldb)|
|[Users can discover and create org apps (preview)​](/power-bi/consumer/org-app-items/org-app-items)|Turn on this setting to let users create org apps as items. Users with access will be able to view them. By turning on this setting, you agree to the  [Preview Terms](https://aka.ms/orgapps_previewterms).<br><br>If turned off, any org app items created will be hidden until this setting is turned on again. The prior version of workspace apps will still be available.  [Learn More](https://aka.ms/orgapps_learnmore)|
|[Product Feedback](../fundamentals/feedback.md)|This setting allows Microsoft to prompt users for feedback through in-product surveys within Microsoft Fabric and Power BI. Microsoft will use this feedback to help improve product features and services. User participation is voluntary.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2272840)|
|[Copy Job (preview)](../data-factory/what-is-copy-job.md)|Users can simply move data from any sources into any destinations without creating a pipeline or dataflow. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2272307)|
|[Users can create and share AI skill item types (preview)](../data-science/concept-ai-skill.md)|Users can create natural language data question and answer (Q&amp;A) experiences using generative AI and then save them as AI skill items. AI skill items can be shared with others in the organization.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2276218)|
|[Users can discover and use metrics (preview)](./service-admin-portal-goals-settings.md#metric-sets-setting-preview)|Turn on this setting to let users in the organization search for, view, and use metrics. They can use metrics to create new items, such as reports, across Fabric. By turning this setting on, you agree to the  [Preview Terms](https://go.microsoft.com/fwlink/?linkid=2262241).<br><br>If turned off, any metrics and metric sets created will be hidden until this setting is turned on again. Semantic models underlying metric sets and downstream items created from metrics will always be visible.|
|Graph Intelligence (preview)|Explore data and build algorithms with Graph​.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2282471)|
|[Mirrored Azure Databricks Catalog (preview)](../database/mirrored-database/azure-databricks.md)|Turn on this setting to allow users to add Azure Databricks catalogs, schemas, and tables to Fabric workspaces and explore data from Fabric without needing to move data.  [Learn More](https://aka.ms/adbfabricdoc)|
|Users can be informed of upcoming conferences featuring Microsoft Fabric|Attending conferences can help your data teams learn in-depth about how to best use the Fabric platform for your business needs and build professional relationships with community members, Microsoft engineering and product teams, and the Fabric Customer Advisory Team (CAT). These conferences may be organized and hosted by third parties.|

## [Help and support settings](service-admin-portal-help-support.md)

| Setting name | Description |
|------|-------|
|[Publish "Get Help" information](service-admin-portal-help-support.md#publish-get-help-information)|Users in the organization can go to internal help and support resources from the Power BI help menu.|
|[Receive email notifications for service outages or incidents](../admin/service-interruption-notifications.md#enable-notifications-for-service-outages-or-incidents)|Mail-enabled security groups will receive email notifications if this tenant is impacted by a service outage or incident.|
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
|[Domain admins can set default sensitivity labels for their domains (preview)](../governance/domain-default-sensitivity-label.md)|Domain admins can set a default sensitivity label for their domains. The label they set will override your organization's default labels in Microsoft Purview, as long as it has a higher priority than the existing default labels set for your tenant. A domain's default label will automatically apply to new Fabric items created within the domain. Reports, semantic models, dataflows, dashboards, scorecards, and some additional item types aren't currently supported.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256829)|

## [Export and sharing settings](service-admin-portal-export-sharing.md)

| Setting name | Description |
|------|-------|
|[External data sharing](../governance/external-data-sharing-overview.md)|Users can share a read-only link to data stored in OneLake with collaborators outside your organization. When you grant them permission to do so, users can share a link to data in lakehouses and additional Fabric items. Collaborators who receive the link can view, build on, and share the data both within and beyond their own Fabric tenants, using their organization's licenses and capacities. [Learn More](https://go.microsoft.com/fwlink/?linkid=2264947)|
|[Users can accept external data shares](../governance/external-data-sharing-overview.md)|Users can accept a read-only link to data from another organization’s Fabric tenant. Users who accept an external share link can view, build on, and share the data, both inside and outside of your organization’s tenant. For more information about the security limitations of this preview feature, view the feature documentation. [Learn More](https://go.microsoft.com/fwlink/?linkid=2264947)|
|[Guest users can access Microsoft Fabric](/power-bi/enterprise/service-admin-azure-ad-b2b)|Guest users who've been added to your Microsoft Entra directory can access Microsoft Fabric and any Fabric items they have permissions to.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2257019)|
|[Users can invite guest users to collaborate through item sharing and permissions](/power-bi/enterprise/service-admin-azure-ad-b2b#invite-guest-users)|Users can collaborate with people outside the organization by sharing Fabric items with them and granting them permission to access those items. After external users accept an invitation, they're added to your Microsoft Entra directory as guest users.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256936)|
|[Guest users can browse and access Fabric content](/power-bi/enterprise/service-admin-azure-ad-b2b)|Users can invite guest users to browse and request access to Fabric content.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2038485)|
|[Users can see guest users in lists of suggested people](service-admin-portal-export-sharing.md#users-can-see-guest-users-in-lists-of-suggested-people)|With this setting on, users will see both users in your organization and guest users who've been added to your Microsoft Entra directory in lists of suggested people. With this setting off, users will see only users in your organization.<br><br>Users can still share items with guests by providing their full email address.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256937)|
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
|[Endorse master data (preview)](../governance/endorsement-overview.md)|Choose whether people in your org or specific security groups can endorse items (like lakehouses, warehouses, or datamarts) as one of the core sources for your organization's data records.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2265090)<br><br>Note: When someone endorses an item as master data, their name and email will show with the endorsement badge.|
|[Users can set up email subscriptions](/power-bi/collaborate-share/end-user-subscribe)|Users can create email subscriptions to reports and dashboards.|
|[B2B guest users can set up and be subscribed to email subscriptions](service-admin-portal-export-sharing.md#b2b-guest-users-can-set-up-and-be-subscribed-to-email-subscriptions)|B2B guest users can set up and be subscribed to email subscriptions. B2B guest users are external users that have been added to your Microsoft Entra ID. Turn this setting off to prevent B2B guest users from setting up or being subscribed to email subscriptions.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256373)|
|[Users can send email subscriptions to external users](./service-admin-portal-export-sharing.md#users-can-send-email-subscriptions-to-guest-users)|Users can send email subscriptions to external users. External users are users you've not added to your Microsoft Entra ID. Turn this setting off to prevent users from subscribing external users to email subscriptions.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2256884)|
|[Featured content](/power-bi/collaborate-share/service-featured-content)|Users in the organization can promote their published content to the Featured section of Power BI Home.|
|[Allow connections to featured tables](/power-bi/collaborate-share/service-excel-featured-tables)|Users in the organization can access and perform calculations on data from featured tables. Featured tables are defined in the modeling view in Power BI Desktop and made available through data types gallery of Excel.|
|[Allow shareable links to grant access to everyone in your organization](./service-admin-portal-export-sharing.md#allow-shareable-links-to-grant-access-to-everyone-in-your-organization)|This setting will grant access to anyone in your organization with the link. It won't work for external users.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2153738)|
|[Enable Microsoft Teams integration](/power-bi/collaborate-share/service-collaborate-microsoft-teams)|This setting allows people in the organization to access features associated with the Microsoft Teams and Power BI integration. This includes launching Teams experiences from the Power BI service like chats, the Power BI app for Teams, and receiving Power BI notifications in Teams. To completely enable or disable Teams integration, work with your Teams admin.|
|[Install Power BI app for Microsoft Teams automatically](service-admin-portal-export-sharing.md#install-power-bi-app-for-microsoft-teams-automatically)|The Power BI app for Microsoft Teams is installed automatically for users when they use Microsoft Fabric. The app is installed for users if they have Microsoft Teams and the Power BI app is allowed in the Teams Admin Portal. When the app is installed, users receive notifications in Teams and can more easily discover and collaborate with colleagues. The Power BI app for Teams provides users with the ability to open all Fabric content.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2171149).|
|[Enable Power BI add-in for PowerPoint](service-admin-portal-export-sharing.md#enable-power-bi-add-in-for-powerpoint)|Let people in your org embed Power BI data into their PowerPoint presentations. This integration requires that your organization's Microsoft Office admin has enabled support for add-ins.|
|[Allow DirectQuery connections to Power BI semantic models](service-admin-portal-export-sharing.md#allow-directquery-connections-to-power-bi-semantic-models)|DirectQuery connections allow users to make changes to existing semantic models or use them to build new ones.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2179788)|
|[Guest users can work with shared semantic models in their own tenants](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-guest-users-to-work-with-shared-datasets-in-their-own-tenants)|Authorized guest users can discover semantic models shared with them in the OneLake data hub (in Power BI Desktop), and then work with these semantic models in their own Power BI tenants.|
|[Allow specific users to turn on external data sharing](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-specific-users-to-turn-on-external-data-sharing)|Turn off this setting to prevent all users from turning on external data sharing. If this setting is on, all or specific users can turn on the external data sharing option, allowing them to share data with authorized guest users. Authorized guest users can then discover, connect to, and work with these shared semantic models in their own Power BI tenants.|

## [Discovery settings](service-admin-portal-discovery.md)

| Setting name | Description |
|------|-------|
|[Make promoted content discoverable](/power-bi/collaborate-share/service-discovery)|Allow users in this org who can promote content to make content they promote discoverable by users who don't have access to it.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2156467)|
|[Make certified content discoverable](/power-bi/collaborate-share/service-discovery)|Allow users in the org who can certify content to make content they certify discoverable by users who don't have access to it.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2156467)|
|[Discover content](../governance/onelake-catalog-overview.md)|Allow users to find and request access to content they don't have access to if it was made discoverable by its owners.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2156467)|

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
|[Users can share links to Power BI files stored in OneDrive and SharePoint through Power BI Desktop (preview)](service-admin-portal-integration.md#users-can-share-links-to-power-bi-files-stored-in-onedrive-and-sharepoint-through-power-bi-desktop)|Users who have saved Power BI files (.pbix) to OneDrive and SharePoint can share links to those files using Power BI Desktop. [Learn More](https://go.microsoft.com/fwlink/?linkid=2227462)|
|Enable granular access control for all data connections|Enforce strict access control for all data connection types. When this is turned on, shared items will be disconnected from data sources if they’re edited by users who don’t have permission to use the data connections.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2226159)|
|[Semantic models can export data to OneLake](/power-bi/enterprise/onelake-integration-overview)|Semantic models configured for OneLake integration can send import tables to OneLake. Once the data is in OneLake, users can include the exported tables in Fabric items, including lakehouses and warehouses.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2252165)|
|[Semantic model owners can choose to automatically update semantic models from files imported from OneDrive or SharePoint](/power-bi/connect-data/refresh-desktop-file-onedrive)|Semantic model owners can choose to allow semantic models to be automatically updated with changes made to the corresponding Power BI files (.pbix) stored in OneDrive or SharePoint. File changes can include new and modified data connections.<br><br>Turn off this setting to prevent automatic updates to semantic models.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2240760)|

## [Power BI visuals](/power-bi/admin/organizational-visuals)

| Setting name | Description |
|------|-------|
|[Allow visuals created using the Power BI SDK](/power-bi/admin/organizational-visuals#visuals-from-appsource-or-a-file)|Users in the organization can add, view, share, and interact with visuals imported from AppSource or from a file. Visuals allowed in the "Organizational visuals" page are not affected by this setting.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2121300)|
|[Add and use certified visuals only (block uncertified)](/power-bi/admin/organizational-visuals#certified-power-bi-visuals)|Users in the organization with permissions to add and use visuals can add and use certified visuals only. Visuals allowed in the "Organizational visuals" page are not affected by this setting, regardless of certification.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2036068)|
|[Allow downloads from custom visuals](/power-bi/admin/organizational-visuals#export-data-to-file)|Enabling this setting will let custom visuals download any information available to the visual (such as summarized data and visual configuration) upon user consent. It is not affected by download restrictions applied in your organization's Export and sharing settings.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2185233&amp;clcid=0x409)|
|[AppSource Custom Visuals SSO](./organizational-visuals.md#appsource-custom-visuals-sso)|Enable SSO capability for AppSource custom visuals. This feature allows custom visuals from AppSource to get Microsoft Entra ID access tokens for signed-in users through the Authentication API. Microsoft Entra ID access tokens include personal information, including users’ names and email addresses, and may be sent across regions and compliance boundaries.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2236555)|
|[Allow access to the browser's local storage](./organizational-visuals.md#appsource-custom-visuals-sso)|When this setting is on, custom visuals can store information on the user's browser's local storage.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2195648)|

## [R and Python visuals settings](service-admin-portal-r-python-visuals.md)

| Setting name | Description |
|------|-------|
|[Interact with and share R and Python visuals](service-admin-portal-r-python-visuals.md#interact-with-and-share-r-and-python-visuals)|Users in the organization can interact with and share visuals created with R or Python scripts.|

## [Audit and usage settings](service-admin-portal-audit-usage.md)

| Setting name | Description |
|------|-------|
|[Usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics)|Users in the organization can see usage metrics for dashboards, reports and semantic models that they have appropriate permissions to.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2152884)|
|[Per-user data in usage metrics for content creators](/power-bi/collaborate-share/service-modern-usage-metrics#exclude-user-information-from-usage-metrics-reports)|Usage metrics for content creators will expose display names and email addresses of users who are accessing content.|
|[Show user data in the Fabric Capacity Metrics app and reports](/fabric/enterprise/metrics-app)|With this setting on, active user data, including names and email addresses, are displayed in the Capacity Metrics app and reports.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2281580)|
|[Azure Log Analytics connections for workspace administrators](/power-bi/transform-model/log-analytics/desktop-log-analytics-configure)|NO DESCRIPTION IN UI|
|[Workspace admins can turn on monitoring for their workspaces (preview)](../fundamentals/enable-workspace-monitoring.md)|Workspace admins can turn on monitoring for their workspaces. When a workspace admin turns on monitoring, a read-only Eventhouse that includes a KQL database is created. After the Eventhouse and KQL database are added to the workspace, logging is turned on and data is sent to the database.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2245715)|
|[Microsoft can store query text to aid in support investigations](./query-text-storage.md)|Query text for some items, including semantic models, is securely stored for usage during support investigations. Turn off this setting to stop the service from storing query text.<br><br>Turning off this setting might negatively impact Microsoft's ability to provide support for the Fabric service.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2262696)|

## [Dashboard settings](service-admin-portal-dashboard.md)

| Setting name | Description |
|------|-------|
|[Web content on dashboard tiles](/power-bi/create-reports/service-dashboard-add-widget#add-web-content)|Users in the organization can add and view web content tiles on Power BI dashboards. Note: This may expose your org to security risks via malicious web content.|

## [Developer settings](service-admin-portal-developer.md)

| Setting name | Description |
|------|-------|
|[Embed content in apps](/power-bi/developer/embedded/embedded-analytics-power-bi)|Users in the organization can embed Power BI dashboards and reports in Web applications using "Embed for your customers" method.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2141877)|
|[Service principals can use Fabric APIs](/power-bi/developer/embedded/embed-service-principal)|Web apps registered in Microsoft Entra ID can use service principals, rather than user credentials, to authenticate to Fabric APIs. To allow an app to use a service principal as an authentication method, the service principal must be added to an allowed security group.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2055030)|
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
|[Azure Private Link](/power-bi/enterprise/service-security-private-links)|Increase security by allowing people to use a Private Link to access your Fabric tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email.  [Learn More](https://aka.ms/PrivateLinksLearnMore)  [Set-up instructions](https://aka.ms/PrivateLinksSetupInstructions)<br><br>Review the  [considerations and limitations](https://aka.ms/PrivateLinksConsiderationsAndLimitations) section before enabling private endpoints.|
|[Block Public Internet Access](/power-bi/enterprise/service-security-private-links)|For extra security, block access to your Fabric tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. Keep in mind, turning this on could take 10 to 20 minutes to take effect. [Learn More](https://aka.ms/PrivateLinksLearnMore) [Set-up instructions](https://aka.ms/PrivateLinksSetupInstructions)|

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

## [Scale-out settings](service-admin-portal-scale-out.md)

| Setting name | Description |
|------|-------|
|[Scale out queries for large semantic models](/power-bi/enterprise/service-premium-scale-out)|For semantic models that use the large semantic model storage format, Power BI Premium can automatically distribute queries across additional semantic model replicas when query volume is high.|

## [OneLake settings](service-admin-portal-onelake.md)

| Setting name | Description |
|------|-------|
|[Users can access data stored in OneLake with apps external to Fabric](../onelake/security/fabric-onelake-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake)|Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse. [Learn More](https://go.microsoft.com/fwlink/?linkid=2231198)|
|[Use short-lived user-delegated SAS tokens (preview)](../onelake/onelake-shared-access-signature-overview.md)|OneLake SAS tokens enable applications to access data in OneLake through short-lived SAS tokens, based on a Microsoft Fabric user’s Entra identity. These token’s permissions can be further limited to provide least privileged access and cannot exceed a lifetime of one hour.   [Learn More](https://go.microsoft.com/fwlink/?linkid=2268260)|
|[Authenticate with OneLake user-delegated SAS tokens (preview)](../onelake/onelake-shared-access-signature-overview.md)|Allow applications to authenticate using a OneLake SAS token. Fabric users can create OneLake SAS by requesting a user delegation key. The tenant setting, Use short-lived user delegated SAS tokens, must be turned on to generate user delegation keys. The lifetimes of the user delegation keys and SAS tokens cannot exceed one hour.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2268260)<br><br>Note: This setting controls functionality that will be available in future. This setting is turned off by default, and when the functionality is available, workspace admins can turn on SAS authentication for their workspace.|
|[Users can sync data in OneLake with the OneLake File Explorer app](../onelake/onelake-file-explorer.md)|Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive. [Learn More](https://go.microsoft.com/fwlink/?linkid=2231052)|

## [Git integration](git-integration-admin-settings.md)

| Setting name | Description |
|------|-------|
|[Users can synchronize workspace items with their Git repositories](../cicd/git-integration/intro-to-git-integration.md)|Users can import and export workspace items to Git repositories for collaboration and version control. Turn off this setting to prevent users from syncing workspace items with their Git repositories. [Learn More](https://go.microsoft.com/fwlink/?linkid=2240844)|
|[Users can export items to Git repositories in other geographical locations](git-integration-admin-settings.md#users-can-export-items-to-git-repositories-in-other-geographical-locations)|The workspace and the Git repository may reside in different geographies. Turn on this setting to allow users to export items to Git repositories in other geographies.|
|[Users can export workspace items with applied sensitivity labels to Git repositories](git-integration-admin-settings.md#users-can-export-workspace-items-with-applied-sensitivity-labels-to-git-repositories)|Turn on this setting to allow users to export items with applied sensitivity labels to their Git repositories.|
|[Users can sync workspace items with GitHub repositories](./git-integration-admin-settings.md#users-can-sync-workspace-items-with-github-repositories)|Users can select GitHub as their Git provider and sync items in their workspaces with GitHub repositories.|

## Copilot and Azure OpenAI Service​

| Setting name | Description |
|------|-------|
|[Users can use Copilot and other features powered by Azure OpenAI](../fundamentals/copilot-fabric-overview.md#enable-copilot)|When this setting is enabled, users can access the features powered by Azure OpenAI, including Copilot. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2262239)<br><br>For customers in the EU Data Boundary, this setting adheres to Microsoft Fabric's EU Data Boundary commitments.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2262243)<br><br>By enabling this setting, you agree to the  [Preview Terms](https://go.microsoft.com/fwlink/?linkid=2262241).|
|[Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance](../fundamentals/copilot-fabric-overview.md#enable-copilot)|This setting is only applicable for customers who want to use Copilot and AI features in Fabric powered by Azure OpenAI, and whose capacity's geographic region is outside of EU Data Boundary and US.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2262085)<br><br>When this setting is enabled, data sent to Azure OpenAI can be processed outside your capacity's geographic boundary or national cloud boundary. This setting can be managed at both the tenant and the capacity levels.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2262242)<br><br>By enabling this setting, you agree to the  [Preview Terms](https://go.microsoft.com/fwlink/?linkid=2262241).|
|Capacities can be designated as Fabric Copilot capacities|With this setting on, capacity admins can designate capacities as Fabric Copilot capacities. Copilot capacities are special capacity types that allow your organization to consolidate users' Copilot usage and billing on a single capacity.  [Learn More](https://aka.ms/fcctenant)<br><br>When users use Copilot features, capacity admins can see the names of the items associated with users' Copilot activity.  [Learn More](https://aka.ms/fccusage)|

## Additional workloads

| Setting name | Description |
|------|-------|
|[Capacity admins and contributors can add and remove additional workloads](../workload-development-kit/environment-setup.md#enable-the-development-tenant-setting)|Capacity admins or individuals granted Contributor permissions in Capacity settings can add and remove additional workloads in capacities. If a workload is removed, users will no longer be able to work with items created with the workload.<br><br>When users interact with a workload, their data and access tokens, including name and email, are sent to the publisher. Sensitivity labels and protection settings including encryption aren't applied to items created with workloads.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2268082)|
|[Workspace admins can develop partner workloads](/fabric/workload-development-kit/environment-setup#enable-the-development-tenant-setting)|Workspace admins can develop partner workloads with a local machine development environment. Turning off this feature will prevent developers from uploading to this workspace.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2268434)|
|[Users can see and work with additional workloads not validated by Microsoft](../workload-development-kit/publish-workload-requirements.md)|Turn on this setting to allow users to see and work with additional workloads not validated by Microsoft. Make sure that you only add workloads from publishers that you trust to meet your organization’s policies.  [Learn More](https://go.microsoft.com/fwlink/?linkid=2282060)|

## Related content

- [What is the admin portal?](admin-center.md)
- [About tenant settings](about-tenant-settings.md)