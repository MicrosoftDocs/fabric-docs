---
title: Enable service principal authentication for admin APIs
description: Learn how to enable service principal authentication to permit use of read-only and update admin APIs.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.date: 03/03/2026

#customer intent: As a developer, learn how to enable service principal authentication to permit use of read-only and update admin APIs.
---

# Enable service principal authentication for admin APIs

This article shows how to enable service principal authentication for [Power BI *read-only* admin APIs](#supported-power-bi-admin-apis-for-read-only) and [Microsoft Fabric *update* admin APIs](#supported-fabric-admin-apis-for-updates).

Service principal is an authentication method that can be used to let a Microsoft Entra application access Microsoft Fabric content and APIs.

When you create a Microsoft Entra app, a [service principal object](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) is created. The service principal object, also known simply as the service principal, allows Microsoft Entra ID to authenticate your app. Once authenticated, the app can access Microsoft Entra tenant resources.

## Enable service principal authentication

To enable service principal authentication for Fabric APIs, follow these steps:

1. [Create a Microsoft Entra app](/entra/identity-platform/howto-create-service-principal-portal). You can skip this step if you already have a Microsoft Entra app you want to use. Take note of the app ID, which you need in later steps.

    >[!IMPORTANT]
    > Make sure the app you use doesn't have any admin-consent required permissions for Fabric set on it in the Azure portal. [See how to check whether your app has any such permissions](#how-to-check-if-your-app-has-admin-consent-required-permissions).

1. Create a new Microsoft Entra [Security Group](/entra/fundamentals/how-to-manage-groups) and make sure to select **Security** as the Group type. You can skip this step if you already have a Microsoft Entra security group you'd like to use.

1. Add your app ID as a member of the security group you created. To do so:
    1. Navigate to **Azure portal > Microsoft Entra ID > Groups**, and choose the security group you created in *Step 2*.
    2. Select **Add Members**.

1. Enable the Fabric admin settings:
    1. Sign in to the Fabric admin portal. You need to be a Fabric admin to see the tenant settings page.
    2. Under **Admin API settings**, select the switch for the type of admin APIs you want to enable:
        * **Service principals can access read-only admin APIs** (see [supported Power BI admin APIs](#supported-power-bi-admin-apis-for-read-only))
        * **Service principals can access admin APIs used for updates** (see [supported Fabric admin APIs](#supported-fabric-admin-apis-for-updates))

1. Set the toggle to **Enabled**.

1. Select the **Specific security groups** radio button. In the text field that appears below it, add the security group you created in *Step 2*.

1. Select **Apply**.

## Supported Power BI admin APIs for read-only

The following read-only admin APIs support service principal authentication. This list may not be exhaustive; for the latest information about APIs not listed here, refer to the [Power BI REST API documentation](/rest/api/power-bi/admin).

* [Apps GetAppsAsAdmin](/rest/api/power-bi/admin/apps-get-apps-as-admin)
* [Apps GetAppUsersAsAdmin](/rest/api/power-bi/admin/apps-get-app-users-as-admin)
* [Dashboards GetDashboardsAsAdmin](/rest/api/power-bi/admin/dashboards-get-dashboards-as-admin)
* [Dashboards GetDashboardsInGroupAsAdmin](/rest/api/power-bi/admin/dashboards-get-dashboards-in-group-as-admin)
* [Dashboards GetDashboardSubscriptionsAsAdmin](/rest/api/power-bi/admin/dashboards-get-dashboard-subscriptions-as-admin)
* [Dashboards GetDashboardUsersAsAdmin](/rest/api/power-bi/admin/dashboards-get-dashboard-users-as-admin)
* [Dashboards GetTilesAsAdmin](/rest/api/power-bi/admin/dashboards-get-tiles-as-admin)
* [Dataflows ExportDataflowAsAdmin](/rest/api/power-bi/admin/dataflows-export-dataflow-as-admin)
* [Dataflows GetDataflowDatasourcesAsAdmin](/rest/api/power-bi/admin/dataflows-get-dataflow-datasources-as-admin)
* [Dataflows GetDataflowsAsAdmin](/rest/api/power-bi/admin/dataflows-get-dataflows-as-admin)
* [Dataflows GetDataflowsInGroupAsAdmin](/rest/api/power-bi/admin/dataflows-get-dataflows-in-group-as-admin)
* [Dataflows GetDataflowUsersAsAdmin](/rest/api/power-bi/admin/dataflows-get-dataflow-users-as-admin)
* [Dataflows GetUpstreamDataflowsInGroupAsAdmin](/rest/api/power-bi/admin/dataflows-get-upstream-dataflows-in-group-as-admin)
* [Datasets GetDatasetsAsAdmin](/rest/api/power-bi/admin/datasets-get-datasets-as-admin)
* [Datasets GetDatasetsInGroupAsAdmin](/rest/api/power-bi/admin/datasets-get-datasets-in-group-as-admin)
* [Datasets GetDatasetToDataflowsLinksInGroupAsAdmin](/rest/api/power-bi/admin/datasets-get-dataset-to-dataflows-links-in-group-as-admin)
* [Datasets GetDatasetUsersAsAdmin](/rest/api/power-bi/admin/datasets-get-dataset-users-as-admin)
* [Datasets GetDatasourcesAsAdmin](/rest/api/power-bi/admin/datasets-get-datasources-as-admin)
* [Get Activity Events](/rest/api/power-bi/admin/get-activity-events)
* [Get Capacities As Admin](/rest/api/power-bi/admin/get-capacities-as-admin)
* [Get Power BI Encryption Keys](/rest/api/power-bi/admin/get-power-bi-encryption-keys)
* [Get Refreshable For Capacity](/rest/api/power-bi/admin/get-refreshable-for-capacity)
* [Get Refreshables For Capacity](/rest/api/power-bi/admin/get-refreshables-for-capacity)
* [Get Refreshables](/rest/api/power-bi/admin/get-refreshables)
* [Groups GetGroupAsAdmin](/rest/api/power-bi/admin/groups-get-group-as-admin)
* [Groups GetGroupsAsAdmin](/rest/api/power-bi/admin/groups-get-groups-as-admin)
* [Groups GetGroupUsersAsAdmin](/rest/api/power-bi/admin/groups-get-group-users-as-admin)
* [Groups GetUnusedArtifactsAsAdmin](/rest/api/power-bi/admin/groups-get-unused-artifacts-as-admin)
* [Imports GetImportsAsAdmin](/rest/api/power-bi/admin/imports-get-imports-as-admin)
* [Pipelines GetPipelinesAsAdmin](/rest/api/power-bi/admin/pipelines-get-pipelines-as-admin)
* [Pipelines GetPipelineUsersAsAdmin](/rest/api/power-bi/admin/pipelines-get-pipeline-users-as-admin)
* [Profiles GetProfilesAsAdmin](/rest/api/power-bi/admin/profiles-get-profiles-as-admin)
* [Reports GetReportsAsAdmin](/rest/api/power-bi/admin/reports-get-reports-as-admin)
* [Reports GetReportsInGroupAsAdmin](/rest/api/power-bi/admin/reports-get-reports-in-group-as-admin)
* [Reports GetReportSubscriptionsAsAdmin](/rest/api/power-bi/admin/reports-get-report-subscriptions-as-admin)
* [Reports GetReportUsersAsAdmin](/rest/api/power-bi/admin/reports-get-report-users-as-admin)
* [Users GetUserArtifactAccessAsAdmin](/rest/api/power-bi/admin/users-get-user-artifact-access-as-admin)
* [Users GetUserSubscriptionsAsAdmin](/rest/api/power-bi/admin/users-get-user-subscriptions-as-admin)
* [WidelySharedArtifacts LinksSharedToWholeOrganization](/rest/api/power-bi/admin/widely-shared-artifacts-links-shared-to-whole-organization)
* [WidelySharedArtifacts PublishedToWeb](/rest/api/power-bi/admin/widely-shared-artifacts-published-to-web)
* [WorkspaceInfo GetModifiedWorkspaces](/rest/api/power-bi/admin/workspace-info-get-modified-workspaces)
* [WorkspaceInfo GetScanResult](/rest/api/power-bi/admin/workspace-info-get-scan-result)
* [WorkspaceInfo GetScanStatus](/rest/api/power-bi/admin/workspace-info-get-scan-status)
* [WorkspaceInfo PostWorkspaceInfo](/rest/api/power-bi/admin/workspace-info-post-workspace-info)

### How to check if your app has admin-consent required permissions

An app using service principal authentication that calls read-only admin APIs **must not** have any admin-consent required permissions for Power BI set on it in the Azure portal. To check the assigned permissions:

1. Sign into the **Azure portal**.

2. Select **Microsoft Entra ID**, then **Enterprise applications**.

3. Select the application you want to grant access to Power BI.

4. Select **Permissions**. There must be no admin-consent required permissions of type Application registered for the app.

## Supported Fabric admin APIs for updates

The **Service principals can access admin APIs used for updates** setting applies to Fabric admin APIs, such as the [Workspaces - Restore Workspace API](/rest/api/fabric/admin/workspaces/restore-workspace?tabs=HTTP). 

To find out if a specific Fabric admin API supports service principal authentication, check the API's documentation in the [Fabric REST API reference](/rest/api/fabric/articles/using-fabric-apis). Look for the "Microsoft Entra supported identities" section, which indicates whether service principal authentication is supported.

## Considerations and limitations

* The service principal can make rest API calls, but you can't open Fabric with service principal credentials.

* Fabric admin rights are required to enable service principal in the Admin API settings in the Fabric admin portal.

## Related content

* [Fabric REST API reference](/rest/api/fabric/articles/using-fabric-apis)
* [Metadata scanning overview](../governance/metadata-scanning-overview.md)
* [Set up metadata scanning](./metadata-scanning-setup.md)
* [Run metadata scanning](../governance/metadata-scanning-run.md)