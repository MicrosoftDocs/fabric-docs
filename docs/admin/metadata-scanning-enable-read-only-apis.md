---
title: Enable service principal authentication for read-only admin APIs
description: Learn how to enable service principal authentication to permit use of read-only admin APIs.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/27/2023
---

# Enable service principal authentication for read-only admin APIs

Service principal is an authentication method that can be used to let a Microsoft Entra application access Microsoft Fabric content and APIs.

When you create a Microsoft Entra app, a [service principal object](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) is created. The service principal object, also known simply as the service principal, allows Microsoft Entra ID to authenticate your app. Once authenticated, the app can access Microsoft Entra tenant resources.

## Method

To enable service principal authentication for Power BI read-only APIs, follow these steps:

1. [Create a Microsoft Entra app](/entra/identity-platform/howto-create-service-principal-portal). You can skip this step if you already have a Microsoft Entra app you want to use. Take note of the App-Id for later steps.

    >[!IMPORTANT]
    > Make sure the app you use doesn't have any admin-consent required permissions for Power BI set on it in the Azure portal. [See how to check whether your app has any such permissions](#how-to-check-if-your-app-has-admin-consent-required-permissions).
    
1. Create a new Microsoft Entra **Security Group**. [Read more about how to create a basic group and add members using Microsoft Entra](/entra/fundamentals/how-to-manage-groups). You can skip this step if you already have a Microsoft Entra security group you would like to use.
    Make sure to select **Security** as the Group type.

    :::image type="content" source="media/enable-read-only-apis/azure-portal-new-group-dialog.png" alt-text="Screenshot of new group creation dialog in Azure portal.":::

3. Add your App-Id as a member of the security group you created. To do so:
    1. Navigate to **Azure portal > Microsoft Entra ID > Groups**, and choose the security group you created in Step 2.
    1. Select **Add Members**.

    > [!IMPORTANT]
    > Make sure the app doesn't have any admin-consent required permissions for Power BI set on it in the Azure portal. [See how to check whether your app has any such permissions](#how-to-check-if-your-app-has-admin-consent-required-permissions).

4. Enable the Fabric admin settings:
    1. Log in to the Fabric admin portal. You need to be a Fabric admin to see the tenant settings page.
    1. Under **Admin API settings**, you'll see **Service principals can access read-only admin APIs**. Set the toggle to Enabled, and then select the **Specific security groups** radio button and add the security group you created in Step 2 in the text field that appears below it.

        :::image type="content" source="media/enable-read-only-apis/allow-service-principals-tenant-setting.png" alt-text="Screenshot of allow service principals tenant setting.":::

 5. Start using the read-only admin APIs. See the list of supported APIs below.

>[!IMPORTANT]
>An app using service principal authentication that calls read-only admin APIs **must not** have any admin-consent required permissions for Power BI set on it in the Azure portal. [See how to check whether your app has any such permissions](#how-to-check-if-your-app-has-admin-consent-required-permissions).

## Supported APIs

Service principal authentication is currently supported for the following read-only admin APIs.

* [GetGroupsAsAdmin](/rest/api/power-bi/admin/groups_getgroupsasadmin) with $expand for dashboards, semantic models, reports, and dataflows 
* [GetGroupUsersAsAdmin](/rest/api/power-bi/admin/groups-get-group-users-as-admin)
* [GetDashboardsAsAdmin](/rest/api/power-bi/admin/dashboards_getdashboardsasadmin) with $expand tiles
* [GetDashboardUsersAsAdmin](/rest/api/power-bi/admin/dashboards-get-dashboard-users-as-admin)
* [GetAppsAsAdmin](/rest/api/power-bi/admin/apps-get-apps-as-admin)
* [GetAppUsersAsAdmin](/rest/api/power-bi/admin/apps-get-app-users-as-admin)
* [GetDatasourcesAsAdmin](/rest/api/power-bi/admin/datasets_getdatasourcesasadmin) 
* [GetDatasetToDataflowsLinksAsAdmin](/rest/api/power-bi/admin/datasets_getdatasettodataflowslinksingroupasadmin)
* [GetDataflowDatasourcesAsAdmin](/rest/api/power-bi/admin/dataflows_getdataflowdatasourcesasadmin) 
* [GetDataflowUpstreamDataflowsAsAdmin](/rest/api/power-bi/admin/dataflows_getupstreamdataflowsingroupasadmin) 
* [GetCapacitiesAsAdmin](/rest/api/power-bi/admin/getcapacitiesasadmin)
* [GetCapacityUsersAsAdmin](/rest/api/power-bi/admin/capacities-get-capacity-users-as-admin)
* [GetActivityLog](/rest/api/power-bi/admin/getactivityevents)
* [GetModifiedWorkspaces](/rest/api/power-bi/admin/workspace-info-get-modified-workspaces)
* [WorkspaceGetInfo](/rest/api/power-bi/admin/workspace-info-post-workspace-info)
* [WorkspaceScanStatus](/rest/api/power-bi/admin/workspace-info-get-scan-status)
* [WorkspaceScanResult](/rest/api/power-bi/admin/workspace-info-get-scan-result)
* [GetDashboardsInGroupAsAdmin](/rest/api/power-bi/admin/dashboards_getdashboardsasadmin)
* [GetTilesAsAdmin](/rest/api/power-bi/admin/dashboards_gettilesasadmin)
* [ExportDataflowAsAdmin](/rest/api/power-bi/admin/dataflows_exportdataflowasadmin)
* [GetDataflowsAsAdmin](/rest/api/power-bi/admin/dataflows_getdataflowsasadmin)
* [GetDataflowUsersAsAdmin](/rest/api/power-bi/admin/dataflows-get-dataflow-users-as-admin)
* [GetDataflowsInGroupAsAdmin](/rest/api/power-bi/admin/dataflows_getdataflowsingroupasadmin)
* [GetDatasetsAsAdmin](/rest/api/power-bi/admin/datasets_getdatasetsasadmin)
* [GetDatasetUsersAsAdmin](/rest/api/power-bi/admin/datasets-get-dataset-users-as-admin)
* [GetDatasetsInGroupAsAdmin](/rest/api/power-bi/admin/datasets_getdatasetsingroupasadmin)
* [Get Power BI Encryption Keys](/rest/api/power-bi/admin/getpowerbiencryptionkeys)
* [Get Refreshable For Capacity](/rest/api/power-bi/admin/getrefreshableforcapacity)
* [Get Refreshables](/rest/api/power-bi/admin/getrefreshables)
* [Get Refreshables For Capacity](/rest/api/power-bi/admin/getrefreshablesforcapacity)
* [GetImportsAsAdmin](/rest/api/power-bi/admin/imports_getimportsasadmin)
* [GetReportsAsAdmin](/rest/api/power-bi/admin/reports_getreportsasadmin)
* [GetReportUsersAsAdmin](/rest/api/power-bi/admin/reports-get-report-users-as-admin)
* [GetReportsInGroupAsAdmin](/rest/api/power-bi/admin/reports_getreportsingroupasadmin)

## How to check if your app has admin-consent required permissions

An app using service principal authentication that calls read-only admin APIs **must not** have any admin-consent required permissions for Power BI set on it in the Azure portal. To check the assigned permissions:

1. Sign into the **Azure portal** as a Global Administrator, an Application Administrator, or a Cloud Application Administrator.
1. Select **Microsoft Entra ID**, then **Enterprise applications**.
1. Select the application you want to grant access to Power BI.
1. Select **Permissions**. There must be no admin-consent required permissions of type Application registered for the app.

## Considerations and limitations

* The service principal can make rest API calls, but you can't open Fabric with service principal credentials.
* Fabric admin rights are required to enable service principal in the Admin API settings in the Fabric admin portal.

## Related content

* [Metadata scanning overview](../governance/metadata-scanning-overview.md)
* [Set up metadata scanning](./metadata-scanning-setup.md)
* [Run metadata scanning](../governance/metadata-scanning-run.md)
