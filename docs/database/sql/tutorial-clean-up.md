---
title: SQL database tutorial - Clean up resources
description: In this last tutorial step, learn how to clean up resources by removing the test workspace.

ms.date: 10/24/2024
ms.topic: tutorial
---

# Clean up resources

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

You can now remove the assets you have been using.

## Remove the workspace

As an admin for a workspace, you can delete it. When you delete the workspace, everything contained within the workspace is deleted for all group members, and the associated app is also removed from AppSource.

1. In the Workspace settings pane, select **Other** > **Remove this workspace**.

    :::image type="content" source="media/tutorial-clean-up/remove-this-workspace.png" alt-text="Screenshot shows the dialogue for removing a workspace." lightbox="media/tutorial-clean-up/remove-this-workspace.png":::

   > [!WARNING]
   > If the workspace you're deleting has a workspace identity, that workspace identity will be irretrievably lost. In some scenarios this could cause Fabric items relying on the workspace identity for trusted workspace access or authentication to break. For more information, see [Delete a workspace identity](../../security/workspace-identity.md#deleting-the-identity).

1. You have now completed the tutorial.

## Next step

> [!div class="nextstepaction"]
> [Create a SQL database in the Fabric portal](create.md)
