---
title: "Metadata passed from Microsoft Fabric to Microsoft Graph"
description: Learn about sharing Fabric metadata with Microsoft 365 services.
author: msmimart
ms.author: mimart
ms.reviewer: 'jadelynray'

ms.custom:
ms.topic: conceptual
ms.date: 11/02/2023
LocalizationGroup: Admin
Customer intent: As a Fabric admin, I need to know what information is passed from Fabric and Microsoft Graph to Microsoft 365.
---

# Share data with your Microsoft 365 services

This article is aimed at Fabric administrators and decision makers who need to know how and where Fabric metadata is being used.

Fabric metadata sharing with Microsoft 365 services is a feature that allows metadata from Fabric to be shared with Microsoft 365 services (typically via [Microsoft Graph](/graph/overview)) and combined with data from across Microsoft 365, Windows, and Enterprise Mobility + Security (EMS) to build apps for organizations and consumers that interact with millions of users. The feature is enabled by default.

When shared with Microsoft 365 services, Fabric content will be listed in the Quick Access list on the Office.com home page. The Fabric content affected includes reports, dashboards, apps, workbooks, paginated reports, and workspaces. The information required by the Quick Access functionality includes:

* The display name of the content
* When the content was last accessed
* The type of content that was accessed (report, app, dashboard, scorecard, etc.)

See [the complete list of Fabric metadata that is shared with Microsoft 365 services](#data-that-is-shared-with-microsoft-365).

## Data residency

Fabric and Microsoft 365 are distinct and separately operated Microsoft cloud services, each deployed according to its own service-specific data center alignment rules, even when purchased together. As a result, it's possible that your Microsoft 365 Services and your Fabric service are not deployed in the same geographic region.

By default, Fabric metadata is available only in the region where the Fabric tenant is located. However, you can allow Fabric to share metadata across regions by turning on a toggle switch in the **Users can see Microsoft Fabric metadata in Microsoft 365** tenant setting. For more information, see [How to turn sharing with Microsoft 365 services on and off](#how-to-turn-sharing-with-microsoft-365-services-on-and-off).

### Where is Fabric data stored?

For more information about data storage locations, see [Find the default region for your organization](/power-bi/admin/service-admin-where-is-my-tenant-located) and [Product Availability by Geography](https://powerplatform.microsoft.com/availability-reports/).

### Where is Microsoft 365 data stored?

For more information about data storage for Microsoft 365, see [Where your Microsoft 365 customer data is stored](/microsoft-365/enterprise/o365-data-locations) and [Multi-Geo Capabilities in Microsoft 365](https://www.microsoft.com/microsoft-365/business/multi-geo-capabilities).

## How to turn sharing with Microsoft 365 services on and off

Sharing metadata with Microsoft 365 services is controlled by the **Users can see Microsoft Fabric metadata in Microsoft 365** tenant setting. The setting is **Enabled** by default. To turn off the feature, or to turn it on again after it's been turned off, go to **Admin portal** > **Tenant settings** > **Users can see Microsoft Fabric metadata in Microsoft 365** and set the toggle as appropriate. Once the setting is enabled or disabled, it may take up to 24 hours for you to see changes.

By default, Fabric metadata is available only in the region where the Fabric tenant is located. To allow Fabric to share metadata across regions, set the second toggle switch to **Enabled**. When you enable the second toggle, you acknowledge that Fabric metadata may flow outside the geographic region it's stored in.

> [!NOTE]
> The second toggle is visible only when the main sharing toggle is enabled.

:::image type="content" source="media/tenant-settings/fabric-share-metadata-microsoft-365-services-tenant-setting.png" alt-text="Screenshot of Users can see Microsoft Fabric metadata in Microsoft 365 tenant setting.":::

## Data that is shared with Microsoft 365

The tables below list the data that is shared with Microsoft 365 services.

**Item metadata that is mainly used when using the "search" mechanism to look for Fabric content within your Microsoft 365 services**

|Property|What is Shared|Example|
|---------|---------|---------|---------|
|TenantID|Microsoft Entra tenant Identifier|aaaabbbb-0000-cccc-1111-dddd2222eeee|
|ArtifactID|Identifier for the Content Item (report, app, dashboard, scorecard, etc.)|aaaabbbb-0000-cccc-1111-dddd2222eeee|
|ACL|Access Control List with permissions and Microsoft Entra user, Security Group and Distribution List Identifiers|{"accessType": "grant", "id" : "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "type" : "read" }|
|DisplayName|Display name for the report, app, dashboard, scorecard, etc.|Retail Analysis Sample|
|WorkspaceName|Workspace name as per [Create a workspace](/power-bi/collaborate-share/service-create-the-new-workspaces)|Retail workspace|
|WorkspaceURL|Workspace URL|https://powerbi-df.analysis-df.windows.net/groups/8b5ac04e-89c1-4fc6-a364-e8411dfd8d17|
|WorkspaceID|Workspace identifier|8b5ac04e-89c1-4fc6-a364-e8411dfd8d17|
|URL|Content Item URL for the report, app, dashboard, scorecard, etc.|https://powerbi-df.analysis-df.windows.net/groups/8b5ac04e-89c1-4fc6-a364-e8411dfd8d17/reports/aaaabbbb-0000-cccc-1111-dddd2222eeee/ReportSection2|
|SharingLinksURL|Sharing Link as per [Share a report using a link](/power-bi/collaborate-share/service-share-dashboards#share-a-report-via-link)|["https://app.powerbi.com/links/xyz123"]|
|IconURL||cdn.com/report.png|
|Description|Content description as per [Report settings](/power-bi/create-reports/power-bi-report-settings?tabs=powerbi-desktop)|Sample containing retail sales data|
|Owner/Creator|Microsoft Entra user principal name of the User that Created the Content as per [Microsoft Entra user principal name](/entra/identity/hybrid/connect/plan-connect-userprincipalname)|user1@griffin1.org|
|CreatedDate|Date the content was created|2011-06-30T23:32:46Z|
|LastModifiedDate|Last modified date for the content|2011-06-30T23:32:46Z|
|LastModifiedUser|Microsoft Entra user principal name for the last person who modified the content|user1@griffin1.org|

**User activity that is leveraged for showing Fabric content within your "Recents" and "Recommended" sections at Office.com**

|Property|What is Shared|Example|
|---------|---------|---------|---------|
|LastRefreshDate|Last refresh date for the content|2011-06-30T23:32:46Z|
|UserID|Microsoft Entra user principal name for the user who acted on the content|user1@griffin1.org|
|SignalType|The type of action the user took on the content (Viewed, Modified)|Viewed|
|ActorID|Users Microsoft Entra ID for the user who acted on the content|aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee|
|StartTime/EndTime|Date/Time the user performed the action on the content|2011-06-30T23:32:46Z|

## Related content

- [About tenant settings](tenant-settings-index.md)
