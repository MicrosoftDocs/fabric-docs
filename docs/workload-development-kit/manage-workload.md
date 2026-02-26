---
title: Upload and manage a workload
description: Learn how to deploy and manage a workload solution in Microsoft Fabric to improve performance and user engagement.
ms.topic: how-to
ms.date: 05/21/2024

#customer intent: As an independent software vendor (ISV), I want know how to upload my Microsoft Fabric extension workload to integrate my app into the Fabric framework.
---

# Upload and manage a workload

This article describes how to upload and manage a workload to Microsoft Fabric. Workloads enhance the usability of your service within a familiar workspace, eliminating the need to leave the Fabric environment. Fabric workloads increase user engagement and improve your application’s discoverability in the Fabric marketplace. The Fabric workspace includes various components, known as Fabric items, which handle storage, analysis, and presentation of your data.

## Prerequisites

To deploy a workload, you must have the following prerequisites:

* A Fabric account with admin permissions.
* The [NuGet package](https://www.nuget.org/) workload solution that you want to deploy. For information about creating a workload solution, see [QuickStart: Run a workload sample](quickstart-sample.md).

> [!NOTE]
> When DevGateway is connected to the Fabric backend, the developer workload takes precedence over the workload that's activated in the tenant. If you try to create an item in a workspace that's registered in the DevGateway configuration,, the Fabric backend calls your local workload instead of the activated workload.

## Upload a workload

To upload a workload to Microsoft Fabric:

1. Sign in to [Fabric](https://powerbi.com) with an admin account.

   :::image type="content" source="./media/manage-workload/sign-in.png" alt-text="Screenshot of Microsoft Fabric sign-in page.":::

1. In **Settings**, go to **Admin portal**.

   :::image type="content" source="./media/manage-workload/settings-admin-portal.png" alt-text="Screenshot showing how to get to the Microsoft Fabric admin portal.":::

1. On **Workloads**, select **Upload workload**.

   :::image type="content" source="./media/manage-workload/upload-workload.png" alt-text="Screenshot showing how to upload a workload.":::

1. Go to the NuGet package you want to upload and select **Open**.

   :::image type="content" source="./media/manage-workload/browse-nuget-package.png" alt-text="Screenshot showing how to browse to the NuGet package.":::

1. Select the workload.
1. Select the uploaded version.

   :::image type="content" source="./media/manage-workload/select-version.png" alt-text="Screenshot showing how to select the workload.":::

1. Select **Add**.

   The version number is now listed, and **Status** is **Active in tenant**.

   :::image type="content" source="./media/manage-workload/active-version.png" alt-text="Screenshot showing the active version of the workload.":::

## Manage a workload

After a workload is added, you can update, delete, or deactivate the workload.

### Update a workload

To change to a different active version of a workload:

1. In the **Admin portal**, on the **Workloads** pane, select a workload to activate.
1. On the **Add** tab, select **Edit**.

   :::image type="content" source="./media/manage-workload/edit-workload.png" alt-text="Screenshot showing how to update a workload.":::

1. Select the version you want to activate and select **Add**.

   :::image type="content" source="./media/manage-workload/select-version.png" alt-text="Screenshot showing how to select the version of the workload to activate.":::

1. Select **Add** again to confirm the change.

   :::image type="content" source="./media/manage-workload/confirm-change.png" alt-text="Screenshot showing how to confirm the change.":::

The new version number is now listed, and **Status** is **Active in tenant**.

### Delete a workload

To delete a workload:

1. In the **Admin portal**, on the **Workloads** pane, select the workload to delete.
1. On the **Uploads** tab, next to the version you want to delete, select the **Delete** icon.

   :::image type="content" source="./media/manage-workload/delete-workload.png" alt-text="Screenshot showing how to delete a workload.":::

You can't delete the active version of a workload. To delete an active version of a workload, first [deactivate](#deactivate-a-workload) the workload.

### Deactivate a workload

To deactivate a workload:

1. In the **Admin portal**, on the **Workloads** pane, select the workload to deactivate.
1. On the **Add** tab, select **Deactivate**.

   :::image type="content" source="./media/manage-workload/deactivate.png" alt-text="Screenshot showing how to deactivate a workload.":::

## Related content

* [Quickstart: Run a workload sample](quickstart-sample.md)

