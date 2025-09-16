# Upgrading a Pipeline? You’ll Need Your Fabric Workspace ID

Before upgrading a pipeline in Microsoft Fabric, make sure you have your **Workspace ID** ready. The steps vary depending on whether you're using **My Workspace** or another workspace.


## Find Your Workspace ID (Not "My Workspace")

If you're working in a Fabric Workspace other than "My Workspace":

1. Open **Fabric UX** in your browser and navigate to the **Data Factory** experience for your workspace.
1. Your browser URL will include a segment like `/groups/{GUID}/`.
1. That **GUID** is your **Workspace ID**.
---
## Find Your Workspace ID for "My Workspace"

If you're using **My Workspace**, follow these steps:

1. Open **Fabric UX** and go to the **Data Factory** experience.
1. Press **F12** to open the browser’s developer tools.
1. Select the **Network** tab.
1. In the filter field, enter:  
   `metadata/artifacts`  
   *(Make sure the method is GET)*
1. Click on one of your pipelines.
1. Once the pipeline loads, you’ll see a few network entries—mostly GUIDs.
1. Select one of those entries and open the **Response** tab.
1. Look for the property named `folderObjectId`.
1. That’s your **Workspace ID**.  

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/my-workspace-get-workspace-id.png" alt-text="Screenshot on how to get the workspace id for My Workspace.":::
