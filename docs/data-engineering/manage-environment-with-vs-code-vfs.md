---
title: Manage Spark environments in VS Code under VFS mode
description: Explore, edit, and publish Spark environment configurations in VS Code using VFS mode with the Fabric Data Engineering extension.
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 03/23/2026
ms.search.form: VSCodeExtension
ai-usage: ai-assisted
---

# Manage Spark environments in VS Code under VFS mode

The Fabric Data Engineering VS Code extension supports managing your environments in VFS (Virtual File System) mode. With this mode, you can explore the environments in your workspace, inspect their details, update the configuration, and publish your changes—all inside VS Code.

To explore environments, expand the **Environments** section to see the list of environments in the workspace. To inspect the details of an environment, right-click the environment and select **Inspect Environment**. This opens the environment details as a read-only .yml file in the VS Code editor. 

:::image type="content" source="media\vscode\inspect-environment.png" alt-text="Screenshot showing how to inspect an environment in VS Code." lightbox="media\vscode\inspect-environment.png":::

To change the environment configuration, right-click the environment and select **Edit Environment**. This opens an editable .yml file in the VS Code editor. A staging file named *<environment_name>*(staging).yml is generated to hold your unpublished changes.

:::image type="content" source="media\vscode\edit-environment.png" alt-text="Screenshot showing how to edit an environment in VS Code." lightbox="media\vscode\edit-environment.png":::

In the staging file, you can upload custom libraries by selecting the **Add customLibraries** code-lens link, switch the pool used by the environment by selecting the **Select Pool** code-lens link, and update other Spark configuration settings. 

:::image type="content" source="media\vscode\code-lens-link-environment.png" alt-text="Screenshot showing the code-lens links for editing an environment in VS Code." lightbox="media\vscode\code-lens-link-environment.png":::

To publish your changes, right-click inside the editor and select **Publish Environment**. This publishes the changes to the remote environment. After the publish succeeds, the staging .yml file is deleted automatically.

:::image type="content" source="media\vscode\publish-environment.png" alt-text="Screenshot showing how to publish an environment in VS Code." lightbox="media\vscode\publish-environment.png":::

## Related content

- [Manage Fabric workspace with VS Code under VFS mode](manage-workspace-with-vs-code-vfs.md)
- [Develop Fabric notebooks in VS Code with VFS mode](author-notebook-with-vs-code-vfs.md)
