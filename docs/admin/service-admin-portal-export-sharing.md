---
title: Export and sharing tenant settings
description: Learn how to configure export and sharing settings in Fabric.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
ms.topic: how-to
ms.date: 03/16/2024
LocalizationGroup: Administration
---

# Export and sharing tenant settings

The export and sharing settings allow the Fabric administrator the flexibility to determine and allow Power BI content to export to formats within their organization's security and compliance guidelines. These settings also allow you to keep unauthorized export formats from being exported by users.

Sharing settings are also managed through these settings. You can determine how and who can share Power BI content in your organization, as well as determine settings for sharing content with users outside your organization. These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## External data sharing (preview)

When you turn on this setting, the users you specify will be able to share read-only links to data stored in your organization's OneLake storage with collaborators both outside and inside your organization. Collaborators who receive the link will be able to view, build on, and share the data both within and beyond their own Fabric tenants, using their organization's licenses and capacities.

External data sharing has important [security considerations](../governance/external-data-sharing-overview.md#security-considerations). For more information about external data sharing, see [External data sharing](../governance/external-data-sharing-overview.md).

To turn on external data sharing:

1. Go to the [admin portal](./admin-center.md#how-to-get-to-the-admin-portal) and open the **Tenant settings** tab.

1. Under the **Export and sharing settings** section, find and expand the **External data sharing (preview)** setting.

1. Set the toggle to **Enabled**.

1. Specify which users you want to be able to create external data shares.

## Users can accept external data shares (preview)

When you turn on this setting, the users you specify will be able to accept read-only links to data from another organization’s Fabric tenant. Users who accept an external share link can view, build on, and share this data, both inside and outside of your organization. For more information about external data sharing and its security considerations, see [External data sharing](../governance/external-data-sharing-overview.md).

To allow users to accept external data shares:

1. Go to the [admin portal](./admin-center.md#how-to-get-to-the-admin-portal) and open the **Tenant settings** tab.

1. Under the **Export and sharing settings** section, find and expand the **Users can accept external data shares (preview)** setting.

1. Set the toggle to **Enabled**.

1. Specify which users you want to be able to accept external data shares.

> [!NOTE]
> This setting is unrelated to the setting **Allow specific users to turn on external data sharing**, which refers to sharing Power BI semantic models via Entra B2B.

## Guest users can access Microsoft Fabric

When you turn on this setting, Microsoft Entra Business-to-Business (Microsoft Entra B2B) guest users can access Fabric. If you turn off this setting, B2B guest users receive an error when trying to access Fabric and any Fabric items they have permissions to. Disabling this setting for the entire organization also prevents users from inviting guests to your organization. Use the specific security groups option to control which B2B guest users can access Fabric.

To learn more, see [Distribute Power BI content to external guest users with Microsoft Entra B2B](/power-bi/enterprise/service-admin-azure-ad-b2b).

## Users can invite guest users to collaborate through item sharing and permissions

This setting helps organizations choose whether new guest users can be invited to the organization through Fabric sharing, permissions, and subscription experiences.

To invite external users to your organization, the user must also have the Microsoft Entra Guest Inviter role. Once invited, external users become Microsoft Entra B2B guest users. This setting only controls the ability to invite through Fabric.

To learn more, see [Invite guest users](/power-bi/enterprise/service-admin-azure-ad-b2b#invite-guest-users).

> [!IMPORTANT]
> This setting was previously called **Share content with external users**.

## Guest users can browse and access Fabric content

This setting allows Microsoft Entra B2B guest users to have full access to the browsing experience using the left-hand navigation pane in the organization. Guest users who have been assigned workspace roles or specific item permissions continue to have those roles and/or permissions, even if this setting is disabled.

To learn more about sending Fabric content to Microsoft Entra B2B guest users, read [Distribute Power BI content to external guest users with Microsoft Entra B2B](/power-bi/enterprise/service-admin-azure-ad-b2b).

## Users can see guest users in lists of suggested people

This setting allows Microsoft Entra B2B guest users to have full access to the browsing experience using the left-hand navigation pane in the organization. Guest users who have been assigned workspace roles or specific item permissions continue to have those roles and/or permissions, even if this setting is disabled.

To learn more about sending Fabric content to Microsoft Entra B2B guest users, read [Distribute Power BI content to external guest users with Microsoft Entra B2B](/power-bi/enterprise/service-admin-azure-ad-b2b).

## Show Microsoft Entra guests in lists of suggested people

This setting helps organizations limit visibility of external users in sharing experiences. When disabled, Microsoft Entra guest users aren't shown in people picker suggested users lists. This helps prevent accidental sharing to external users and seeing which external users have been added to your organization through Power BI sharing UIs.

> [!IMPORTANT]
> When the setting is set to disabled, you can still give permission to a guest user by providing their full email address in people pickers.
  
## Publish to web

People in your organization can publish public reports on the web. Publicly published reports don't require authentication to view them.

Only admins can allow the creation of new publish-to-web embed codes. Go to [Embed codes](service-admin-portal-embed-codes.md) in the admin portal to review and manage public embed codes. If any of the codes contain private or confidential content remove them. Review embed codes regularly to make sure no confidential information is live on the web.

The **Publish to web** setting in the admin portal gives options for which users can create embed codes. Admins can set **Publish to web** to **Enabled** and **Choose how embed codes work** to **Allow only existing embed codes**. In that case, users can create embed codes, but they have to contact the admin to allow them to do so.

Users see different options in the UI based on the **Publish to web** setting.

|Feature |Enabled for entire organization |Disabled for entire organization |Specific security groups   |
|---------|---------|---------|---------|
|**Publish to web** under report **More options (...)** menu|Enabled for all|Not visible for all|Only visible for authorized users or groups.|
|**Manage embed codes** under **Settings**|Enabled for all|Enabled for all|Enabled for all<br><br>- **Delete** option only for authorized users or groups.<br>- **Get codes** enabled for all.|
|**Embed codes** within admin portal|Status has one of the following values:<br>- Active<br>- Not supported<br>- Blocked|Status displays **Disabled**|Status has one of the following values:<br>- Active<br>- Not supported<br>- Blocked<br><br>If a user isn't authorized based on the tenant setting, status displays **infringed**.|
|Existing published reports|All enabled|All disabled|Reports continue to render for all.|

Learn more about [publishing to the web](/power-bi/collaborate-share/service-publish-to-web).

## Copy and paste visuals

Turn on this setting to allow users in the organization to copy visuals from a tile or report visual and paste them as static images into external applications.

## Export to Excel

Users in the organization can export the data from a visualization to an Excel file.

To learn more, see [Export the data that was used to create a visualization](/power-bi/visuals/power-bi-visualization-export-data).

> [!NOTE]
> Fabric automatically [applies a sensitivity label](/power-bi/enterprise/service-security-sensitivity-label-overview#sensitivity-labels-and-protection-on-exported-data) on the exported file and protects it according to the label's file encryption settings.

## Export to .csv

Users in the organization can export data from a tile, visualization, or paginated report to a *.csv* file.

To turn this setting on or off:

1. Still in the **Export and sharing settings** section of the **Tenant Settings**, find the setting called **Export to .csv**.
1. Turn the switch on or off.
1. Under **Apply to**, select the scope of users that the setting will affect.
1. Select **Apply** to save your changes.

## Download reports

Users in the organization can download .pbix files and paginated reports.

To learn more, see [Download a report from the Power BI service to Power BI Desktop](/power-bi/create-reports/service-export-to-pbix).

## Users can work with Power BI semantic models in Excel using a live connection

Turn this setting on to allow users to export data to Microsoft Excel from a Power BI visual or semantic model, or export a semantic model to an Excel workbook with Analyze in Excel, both options with a live connection to the XMLA endpoint.

To learn more, see [Create Excel workbooks with refreshable Power BI data](/power-bi/collaborate-share/service-analyze-in-excel).

## Export reports as PowerPoint presentations or PDF documents

This setting lets users export reports as PowerPoint presentations or PDF documents.

- Learn how to [export PowerPoint presentations](/power-bi/collaborate-share/end-user-powerpoint).
- Learn how to [export PDF documents](/power-bi/collaborate-share/end-user-pdf).

## Export reports as MHTML documents

Users in the organization can export paginated reports as MHTML documents when this setting is turned on.

## Export reports as Word documents

This setting lets users in the organization export paginated reports as Microsoft Word documents.

To learn more, see [Export Power BI paginated report to Microsoft Word](/power-bi/paginated-reports/report-builder/export-microsoft-word-report-builder).

## Export reports as XML documents

This setting lets users in the organization export paginated reports as XML documents.

To learn more, see [Export Power BI paginated report to XML](/power-bi/paginated-reports/report-builder/export-xml-report-builder).

## Export reports as image files

Users in the organization can use the *export report to file* API to export reports as image files.

To learn more, see [Export Power BI paginated report to an Image File](/power-bi/paginated-reports/report-builder/export-image-file-report-builder).

## Print dashboards and reports

This setting lets users in the organization print dashboards and reports.

To learn more, see [Print from the Power BI service](/power-bi/consumer/end-user-print).

## Certification

Choose whether people in your organization or specific security groups can certify items like apps, reports, or datamarts as trusted sources for the wider organization.

> [!IMPORTANT]
> When a user certifies an item, their contact details are visible along with the certification badge.

Read [Enable content certification](/power-bi/admin/service-admin-setup-certification) for more details.

## Users can set up email subscriptions

This setting lets users create email subscriptions to reports and dashboards. Read [Email subscriptions for reports and dashboards in the Power BI service](/power-bi/collaborate-share/end-user-subscribe) to learn more.

## B2B guest users can set up and be subscribed to email subscriptions

There may be instances that admin may want B2B guest users to receive email subscriptions but not other external users. Use this setting to allow B2B guest users to set up and subscribe themselves to email subscriptions.

If this setting is off, only users in your organization can create and receive email subscriptions.

> [!IMPORTANT]
> The **Allow email subscriptions to be sent to external users** switch will be automatically turned off if the **B2B guest users can set up and be subscribed to email subscriptions** switch is turned off. This is because B2B users are external users that have been granted elevated permissions to get content. Since B2B guest users have higher permissions than other external users, if they can't get the email subscription neither can the other external users.

## Users can send email subscriptions to guest users

Users can send email subscriptions to guest users. With this setting off, users in your organization can't subscribe guest users to subscription emails.

## Featured content

This setting lets you enable or disable the ability of users in your organization to promote their published content to the **Featured** section of the Power BI Home page. By default, anyone with the Admin, Member, or Contributor role in a workspace in your organization can feature content on Power BI Home.

To learn more, see [Feature content on colleagues' Power BI Home page](/power-bi/collaborate-share/service-featured-content).

You can also manage featured content on the **Featured content** page in the Admin portal. Go to [Manage featured content](service-admin-portal-featured-content.md) for more details.

## Allow connections to featured tables

This setting lets Fabric admins control who in the organization can use featured tables in the Excel Data Types Gallery. Read more about [Power BI featured tables in Excel](/power-bi/collaborate-share/service-excel-featured-tables).

> [!NOTE]
> Connections to featured tables are also disabled if the **Allow live connections** setting is set to Disabled.

## Allow shareable links to grant access to everyone in your organization

This tenant setting is available for admins looking to disable creating shareable links to **People in your organization**.

If this setting is turned off for a user with permissions to share a report, that user can only share the report via link to **Specific people** or **People with existing access**. The following image shows what that user sees if they attempt to share the report via link:

:::image type="content" source="media/tenant-settings/admin-share-option-disabled.png" alt-text="Screenshot showing share option disabled.":::

To learn more, see [Link settings](/power-bi/collaborate-share/service-share-dashboards#link-settings).

## Enable Microsoft Teams integration

This setting allows organizations to access features that work with Microsoft Teams and the Power BI service. These features include launching Teams experiences from Power BI like chats, the Power BI app for Teams, and getting Power BI notifications from Teams. To completely enable or disable Teams integration, work with your Teams admin.

Read more about [collaborating in Microsoft Teams with Power BI](/power-bi/collaborate-share/service-collaborate-microsoft-teams).

## Install Power BI app for Microsoft Teams automatically

Automatic installation makes it easier to install the Power BI app for Microsoft Teams, without needing to change Microsoft Teams app setup policies. This change speeds up the installation and removes admin hassles of configuring and maintaining infrastructure needed by an app setup policy.

When the app is installed, users receive notifications in Teams and can more easily discover and collaborate with colleagues. The Power BI app for Teams provides users with the ability to open all Fabric content.

Automatic installation happens for a user under the following conditions:

- The Power BI app for Microsoft Teams is set to **Allowed** in the Microsoft Teams admin portal.
- The Power BI tenant setting **Install Power BI app for Microsoft Teams automatically** is **Enabled**.
- The user has a Microsoft Teams license.
- The user opens [the Power BI service](https://app.powerbi.com) in a web browser.

When the app is installed, users receive notifications in Teams and can more easily discover and collaborate with colleagues. The Power BI app for Teams provides users with the ability to open all Fabric content.

To learn more, see [Add the Power BI app to Microsoft Teams](/power-bi/collaborate-share/service-microsoft-teams-app).

## Enable Power BI add-in for PowerPoint

The Power BI add-in for PowerPoint makes it possible for users to add live, interactive data from Power BI to a PowerPoint presentation. See [About the Power BI add-in for PowerPoint](/power-bi/collaborate-share/service-power-bi-powerpoint-add-in-about) for more detail.

When this setting is on (default), entry points for opening a new PowerPoint presentation with the add-in already loaded are available in Power BI. When this setting is off, the entry points in Power BI are unavailable.

This integration requires that your organization's Microsoft Office admin has enabled support for add-ins.

>[!NOTE]
> If you turn this setting off, that doesn't prevent people from using the add-in starting from PowerPoint. To completely block adding live Power BI report pages to PowerPoint slides using the add-in, the add-in must be turned off in both Power BI and PowerPoint.

## Allow DirectQuery connections to Power BI semantic models

When this setting is turned on (default), users can use DirectQuery to connect to Azure Analysis Services or Power BI datasets.

To learn more about DirectQuery, see [Use DirectQuery in Power BI Desktop](/power-bi/connect-data/desktop-use-directquery).

If you turn this switch off, it effectively stops users from publishing new composite models on Power BI semantic models to the service. Existing reports that leverage a composite model on a Power BI semantic model continue to work, and users are still able to create composite models using Desktop, but they can't publish to the service.

To learn more about composite models, see [Use composite models in Power BI Desktop](/power-bi/transform-model/desktop-composite-models).

>[!NOTE]
> Live connections to Power BI semantic models aren't affected by this switch, nor are live or DirectQuery connections to Azure Analysis Services. These continue to work regardless of whether the setting is on or off. In addition, any published reports that leverage a composite model on a Power BI semantic model continue to work even if the setting has been turned off after they were published.

## Guest users can work with shared semantic models in their own tenants

When this setting is turned on, Microsoft Entra B2B guest users of semantic models shared with them by users in your organization can access and build on those semantic models in their own tenant.

This setting is off by default for customers. If this setting is disabled, a guest user can still access the semantic model in the provider tenant but not in their own tenant.

## Allow specific users to turn on external data sharing

As a Fabric admin, you can specify which users or user groups in your organization can share semantic models externally with guests from a different tenant through the in-place mechanism. Authorized guest users can then discover, connect to, and work with these shared semantic models in their own tenants.

Disabling this setting prevents any user from sharing semantic models externally by blocking the ability of users to turn on external sharing for semantic models they own or manage.

> [!NOTE]
> This setting relates to sharing Power BI semantic models via Entra B2B capabilities. It is unrelated to the **External data sharing (preview)** and **Users can accept external data shares (preview)** tenant settings, which control the [external data sharing feature](../governance/external-data-sharing-overview.md). The external data sharigin feature enables sharing data from an organization's OneLake storage locations to external Fabric tenants, and uses secure Fabric-to-Fabric communication channels rather than Entra B2B.

## Users can deliver reports to OneDrive and SharePoint in Power BI

Users can deliver reports to OneDrive or SharePoint. If the **Users can set up subscriptions** setting is also turned on, users can use subscriptions to schedule delivery of these reports to OneDrive or SharePoint.

## Related content

* [About tenant settings](tenant-settings-index.md)