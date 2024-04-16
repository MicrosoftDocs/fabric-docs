---
title: Upload and manage a workload
description: How to deploy and manage a workload solution in the Fabric service to improve performance and user engagement.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.topic: how-to
ms.date: 04/16/2024

#customer intent: As an ISV, I want upload my Fabric extension workload in order to integrating my app into the Fabric framework.
---

# Deploy a workload in Fabric

This article describes how to upload and manage a workload to the Fabric service. Workloads enhance the usability of your service within a familiar workspace, eliminating the need to leave the Fabric environment. Fabric workloads increase user engagement and improve your application’s discoverability in the Fabric store, supporting compelling business models. The Fabric workspace includes various components, known as Fabric items, which handle the storage, analysis, and presentation of your data.

## Prerequisites

Before you can deploy a workload, you must have the following:

* A Fabric account with the *Admin* permissions.
* The [nuget package](https://www.nuget.org/) workload solution that you want to deploy. For information about creating a workload solution, see [Create a workload solution](create-workload.md).

## Upload a workload

To upload a workload to the Fabric service, follow these steps:

1. Log into [Fabric](https://powerbi.com) with an *Admin* account.

   :::image type="content" source="./media/manage-workload/sign-in.png" alt-text="Screenshot of Microsoft Fabric log in screen.":::

1. From **Settings**, go to the **Admin portal**.

   :::image type="content" source="./media/manage-workload/settings-admin-portal.png" alt-text="Screenshot showing how to get to the Fabric Admin portal.":::

1. From **Workloads**, select **Upload workload**.

   :::image type="content" source="./media/manage-workload/manage-workload.png" alt-text="Screenshot showing how to upload a workload.":::

1. Browse to the nugget package you want to upload, and select **Open**.

   :::image type="content" source="./media/manage-workload/browse-nuget-package.png" alt-text="Screenshot showing how to browse to the nuget package.":::

1. Select workload.
1. Select uploaded version

   :::image type="content" source="./media/manage-workload/select-version.png" alt-text="Screenshot showing how to select the workload.":::

1. Select **Add**.

Notice that the version number is now listed and **Status** is *Active in tenant*.

   :::image type="content" source="./media/manage-workload/active-version.png" alt-text="Screenshot showing the active version of the workload.":::

## Manage a workload

Once you have a workload uploaded, you can manage it by performing the following actions:

* [Update](#update-a-workload)
* [Delete](#delete-a-workload)  
* [Deactivate](#deactivate-a-workload)  

### Update a workload

To change to a different active version of a workload, follow these steps:

1. From **Workloads** in the **Admin portal** select the workload you want to deactivate.
1. From the *Add* tab, select **Edit**.

   :::image type="content" source="./media/manage-workload/edit-workload.png" alt-text="Screenshot showing how to update a workload.":::

1. Select the version you want to activate and select **Add**.

   :::image type="content" source="./media/manage-workload/select-version.png" alt-text="Screenshot showing how to select the version of the workload to activate.":::

1. Select Add again to confirm the change.

   :::image type="content" source="./media/manage-workload/confirm-change.png" alt-text="Screenshot showing how to confirm the change.":::

Notice that the new version number is now listed and **Status** is *Active in tenant*.

### Delete a workload

To delete a workload, follow these steps:

1. From **Workloads** in the **Admin portal** select the workload you want to delete.
1. From the Uploads tab, select delete icon next to the version you want to delete.

   :::image type="content" source="./media/manage-workload/delete-workload.png" alt-text="Screenshot showing how to delete a workload.":::

Note that you can't delete the active version of a workload. To delete the active version, first [deactivate](#deactivate-a-workload) it.

### Deactivate a workload

To deactivate a workload, follow these steps:

1. From **Workloads** in the **Admin portal** select the workload you want to deactivate.
1. From the *Add* tab, select **Deactivate**.

   :::image type="content" source="./media/manage-workload/deactivate.png" alt-text="Screenshot showing how to deactivate a workload.":::

## Related content

* [Related article title](link.md)
