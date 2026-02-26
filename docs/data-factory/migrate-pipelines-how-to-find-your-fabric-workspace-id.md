---
title: Find your Microsoft Fabric Workspace ID
description: This article outlines the steps to find you Fabric Workspace ID.
ms.reviewer: ssrinivasara
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/16/2025
ai-usage: ai-assisted
---

# Find your Microsoft Fabric workspace ID

Before you upgrade a pipeline in Microsoft Fabric, have your **Workspace ID** ready. To find your **Workspace ID** steps differ depending on whether you're in **My Workspace** or another workspace.

## Find your workspace ID (not "My Workspace")

If you're in a Fabric workspace other than "My Workspace":

1. Open **Fabric UX** in your browser and navigate to the **Data Factory** experience for your workspace.
1. Look at the browser URL for a segment like `/groups/{GUID}/`.
1. That **GUID** is your **Workspace ID**.

For example:

`https://msit.powerbi.com/groups/d3d3d3d3-eeee-ffff-aaaa-b4b4b4b4b4b4/list?ctid=00001111-aaaa-2222-bbbb-3333cccc4444&experience=fabric-developer`

The **Workspace ID** in this example is `d3d3d3d3-eeee-ffff-aaaa-b4b4b4b4b4b4`.

## Find the workspace ID for "My Workspace"

If you're in **My Workspace**, use the browser's developer tools to get the workspace ID from a network response.

1. Open **Fabric UX** and go to the **Data Factory** experience.
1. Press **F12**, or in your browser select **Settings** and then **Developer tools** (may be under **More tools**) to open the browser's developer tools.
1. Select the **Network** tab.
1. In the filter field, enter:

   `metadata/artifacts`

   > [!IMPORTANT]
   > Make sure the method is GET.

1. Select one of your pipelines.
1. When the pipeline loads, you see a few network entries, mostly GUIDs.
1. Select one of those entries and open the **Response** tab.
1. Find the property named `folderObjectId`.
1. That value is your **Workspace ID**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/my-workspace-get-workspace-id.png" alt-text="Screenshot of the network response that shows folderObjectId for My Workspace.":::
