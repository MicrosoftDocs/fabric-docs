---
title: "Metadata passed from Microsoft Fabric to Microsoft Graph"
description: Learn about sharing Fabric metadata with Microsoft 365 services.
author: msmimart
ms.author: mimart
ms.reviewer: jadelynray
ms.topic: concept-article
ms.date: 05/22/2026
LocalizationGroup: Admin
#customer intent: As a Fabric admin, I need to know what information is passed from Fabric and Microsoft Graph to Microsoft 365.
---

# Share data with your Microsoft 365 services

This article helps Fabric administrators and decision makers understand how and where Fabric metadata is used.

The **Share Fabric data with your Microsoft 365 services** tenant setting controls whether Power BI and Microsoft Fabric automatically send information about your organization's Fabric content to Microsoft 365. When an admin turns on this setting, Fabric sends details about your reports, dashboards, and other content to Microsoft 365 in the background. No user action is required for this sharing to occur. Microsoft 365 then uses this information to help users find and return to their Fabric content through search results, the Quick Access list on Office.com, and personalized recommendations.

This information flows through [Microsoft Graph](/graph/overview). The setting is turned on by default when your Fabric tenant and Microsoft 365 tenant are in the same geographic region.

### What information is shared

When this setting is turned on, Fabric sends the following information to Microsoft 365:

| Content type | What's shared |
|---|---|
| Power BI reports | Broad item context including the report name, description, web address, who has access, workspace, who created and last modified the report, dates of creation and last update, page names, chart titles, and column or measure names |
| Power BI workspace apps | Basic details only: name, web address, who has access, and workspace |
| Power BI dashboards | Basic details only: name, web address, who has access, and workspace |
| Power BI paginated reports (RDL) | Basic details only: name, web address, who has access, and workspace |

Power BI also shares information about how users interact with content when this setting is turned on. For example, Fabric reports which reports a user viewed. Microsoft 365 uses these signals to show recently accessed and recommended Fabric content on Office.com.

For the complete list of shared properties, see [Data that is shared with Microsoft 365](#data-that-is-shared-with-microsoft-365).

> [!NOTE]
> Power BI reports shared using organization-wide ("org-wide") links are not discoverable in Microsoft 365 experiences (such as search) for users who only have access through those links, even when this setting is enabled. Users can still access the report directly through the link, but the report doesn't appear in discovery surfaces unless it's shared using another access method.

### What this setting doesn't control

Turning off this setting doesn't block Fabric content from appearing in Microsoft 365. Users who have access to Fabric content can still take explicit action to use that content in Microsoft 365 products. The following experiences continue to work even when this setting is turned off, because they depend on a user actively doing something:

- **Excel pivot tables connected to Power BI semantic models:** In Excel, users can discover all the Power BI models they have access to and explore that data using PivotTables and other Excel capabilities. The Share Fabric data with Microsoft 365 tenant setting doesn't affect this behavior. Connecting Excel to Power BI models requires Fabric admin approval through a separate tenant setting. For more information, see [Power BI semantic model experience in Excel](/power-bi/collaborate-share/office-integration/service-connect-excel-power-bi-datasets).

- **Link previews in Teams and Outlook:** When a user pastes a link to a Power BI report in a Teams chat or Outlook email, people who have access to that report always see a preview with the report name and other metadata. The Share Fabric data with Microsoft 365 tenant setting doesn't affect this behavior. For more information, see [Power BI link previews in Teams](/power-bi/collaborate-share/office-integration/service-teams-link-preview).

- **Fabric data agents in the Microsoft 365 Agent Store:** If your organization publishes Fabric data agents to the Microsoft 365 Agent Store, users with access can chat with that agent in Microsoft 365. The Share Fabric data with Microsoft 365 tenant setting doesn't affect this behavior. For more information, see [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot).

- **[Frontier only] Asking Microsoft 365 Copilot about Power BI data:** Microsoft 365 Copilot can answer questions using Power BI reports and semantic models that the user has permission to view, regardless of this setting. Access to this feature requires Microsoft 365 admin approval. For more information, see [Fabric IQ in Microsoft 365 Copilot (Frontier)](/fabric/iq/connectors/microsoft-365-copilot-overview).

- **[Frontier only] Asking Microsoft 365 Cowork about Power BI data:** Power BI reports and semantic models that the user has permission to view can feed into Cowork workflows. Users can request emails or schedule meetings triggered by the latest metrics. Users can also produce deep analysis that combines Work IQ context (such as emails, Teams chats, and documents) with insights from Power BI data. The Share Fabric data with Microsoft 365 tenant setting doesn't affect this behavior. Microsoft 365 admins can disable access to the Cowork agent for their organization, and access to the Fabric IQ plugin requires Microsoft 365 admin approval. For more information, see [Fabric IQ in Cowork (Frontier)](/fabric/iq/connectors/cowork-overview).

All of these experiences rely on the user being signed in and having permission to the content. None of them rely on Fabric sending information to Microsoft 365 in the background.

## Data residency

Fabric and Microsoft 365 are separate cloud services that might be hosted in different geographic regions, even if you purchase them together.

By default, Fabric only shares information within the geography where your Fabric tenant is located. If your Microsoft 365 tenant is in a different geography, you need to allow cross-geography sharing for the integration to work. You can enable cross-geography sharing with a second toggle in the tenant setting. For more information, see [How to turn sharing with Microsoft 365 services on and off](#how-to-turn-sharing-with-microsoft-365-services-on-and-off).

### Where is Fabric data stored?

For more information about data storage locations, see [Find your Fabric home region](/power-bi/admin/service-admin-where-is-my-tenant-located) and [Product Availability by Geography](https://powerplatform.microsoft.com/availability-reports/).

### Where is Microsoft 365 data stored?

For more information about data storage for Microsoft 365, see [Where your Microsoft 365 customer data is stored](/microsoft-365/enterprise/o365-data-locations) and [Multi-Geo Capabilities in Microsoft 365](https://www.microsoft.com/microsoft-365/business/multi-geo-capabilities).

## How to turn sharing with Microsoft 365 services on and off

The **Share Fabric data with your Microsoft 365 services** tenant setting is turned on by default. To change this setting:

1. Go to **Admin portal** > **Tenant settings** > **Share Fabric data with your Microsoft 365 services**.
1. Set the toggle to **Enabled** or **Disabled** as needed.

Changes can take up to 24 hours to take effect.

To allow sharing across geographies when your Fabric and Microsoft 365 tenants are in different regions, set the second toggle to **Enabled**. Turning on this toggle means you acknowledge that Fabric data might flow outside its current geographic region.

> [!NOTE]
> The second toggle is visible only when the main sharing toggle is enabled.

![Screenshot of Share Fabric data with your Microsoft 365 services tenant setting.](media/admin-share-power-bi-metadata-microsoft-366.png)

## Data that is shared with Microsoft 365

The following tables show what specific information Fabric sends to Microsoft 365 when sharing is turned on.

**Item details (used for search and discovery in Microsoft 365)**

|Property|What is shared|Example|
|---------|---------|---------|
|TenantID|Microsoft Entra tenant identifier|aaaabbbb-0000-cccc-1111-dddd2222eeee|
|ItemType|Fabric category for the item|Report|
|DisplayName|Display name for the item|Retail Analysis Sample|
|Description|Content description in the service. See [Report settings](/power-bi/create-reports/power-bi-report-settings?tabs=powerbi-desktop) for more detail.|Sample containing retail sales data|
|URL|Content item URL|`https://powerbi-df.analysis-df.windows.net/groups/8b5ac04e-89c1-4fc6-a364-e8411dfd8d17/reports/aaaabbbb-0000-cccc-1111-dddd2222eeee/ReportSection2`|
|ACL|Access Control List (ACL) with permissions and Microsoft Entra user, security group, and distribution list identifiers|`{"accessType": "grant", "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "type": "read"}`|
|WorkspaceName|Workspace name. See [Create a workspace](/power-bi/collaborate-share/service-create-the-new-workspaces).|Retail workspace|
|WorkspaceURL|Link to the workspace in the service|`https://powerbi-df.analysis-df.windows.net/groups/8b5ac04e-89c1-4fc6-a364-e8411dfd8d17`|
|Creator|[Microsoft Entra user principal name (UPN)](/entra/identity/hybrid/connect/plan-connect-userprincipalname) of the person who created the content|user1@fourthcoffee.com|
|CreatedDate|Date the content was created|2011-06-30T23:32:46Z|
|LastModifiedUser|Microsoft Entra UPN of the last person who modified the content|user1@fourthcoffee.com|
|LastModifiedDate|Last modified date for the content|2011-06-30T23:32:46Z|
|PageNames|Display names for pages within the report|Sales Summary, Regional details, Returns|
|ChartTitles|Display names for visualizations in the report layout|Regional sales over time|
|FieldNames|Names of columns and measures used in the report|revenue, date, product_category|

**User activity (used to show recently accessed and recommended content on Office.com)**

|Property|What is shared|Example|
|---------|---------|---------|
|LastRefreshDate|Last refresh date for the content|2011-06-30T23:32:46Z|
|UserID|Microsoft Entra UPN of the user who acted on the item|user1@fourthcoffee.com|
|SignalType|The type of action the user took on the content|Viewed|
|ActorID|Microsoft Entra ID of the user who acted on the item|aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee|
|StartTime/EndTime|Date and time the user performed the action|2011-06-30T23:32:46Z|

## Related content

- [About tenant settings](tenant-settings-index.md)
