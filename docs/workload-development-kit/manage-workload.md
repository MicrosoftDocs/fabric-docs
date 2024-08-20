---
title: Upload and manage a workload (preview)
description: How to deploy and manage a workload solution in the Fabric service to improve performance and user engagement.
author: KesemSharabi
ms.author: kesharab
ms.service: fabric
ms.topic: how-to
ms.date: 05/21/2024

#customer intent: As an ISV, I want upload my Fabric extension workload in order to integrating my app into the Fabric framework.
---

# Manage a workload in Fabric (preview)

This article describes how to upload and manage a workload to the Fabric service. Workloads enhance the usability of your service within a familiar workspace, eliminating the need to leave the Fabric environment. Fabric workloads increase user engagement and improve your application’s discoverability in the Fabric store. The Fabric workspace includes various components, known as Fabric items, which handle the storage, analysis, and presentation of your data.

## Prerequisites

Before you can deploy a workload, you must have the following prerequisites:

* A Fabric account with the *Admin* permissions.
* The [NuGet package](https://www.nuget.org/) workload solution that you want to deploy. For information about creating a workload solution, see [QuickStart: Run a workload sample](quickstart-sample.md).

> [!NOTE]
> When a DevGateway is connected to Fabric backend, the developer workload takes precedence over the workload activated in the tenant. If you try to create an item in a workspace associated with the same capacity as the one registered in the DevGateway configuration, Fabric backend calls your local workload instead of the activated one. 

## Upload a workload

To upload a workload to the Fabric service, follow these steps:

1. Log into [Fabric](https://powerbi.com) with an *Admin* account.

   :::image type="content" source="./media/manage-workload/sign-in.png" alt-text="Screenshot of Microsoft Fabric sign in screen.":::

1. From **Settings**, go to the **Admin portal**.

   :::image type="content" source="./media/manage-workload/settings-admin-portal.png" alt-text="Screenshot showing how to get to the Fabric Admin portal.":::

1. From **Workloads**, select **Upload workload**.

   :::image type="content" source="./media/manage-workload/upload-workload.png" alt-text="Screenshot showing how to upload a workload.":::

1. Browse to the nugget package you want to upload, and select **Open**.

   :::image type="content" source="./media/manage-workload/browse-nuget-package.png" alt-text="Screenshot showing how to browse to the NuGet package.":::

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

You can't delete the active version of a workload. To delete the active version, first [deactivate](#deactivate-a-workload) it.

### Deactivate a workload

To deactivate a workload, follow these steps:

1. From **Workloads** in the **Admin portal** select the workload you want to deactivate.
1. From the *Add* tab, select **Deactivate**.

   :::image type="content" source="./media/manage-workload/deactivate.png" alt-text="Screenshot showing how to deactivate a workload.":::

## Related content

* [QuickStart: Run a workload sample](quickstart-sample.md)
