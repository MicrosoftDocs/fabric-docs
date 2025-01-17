---
title: Create and manage Fabric notebooks from VS Code for the Web
description: Learn about the VS Code extension for Synapse under the VS Code web experience, which supports a pro-developer authoring experience.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: VSCodeExtension
---

# Create and manage Microsoft Fabric notebooks inside Visual Studio Code for the web

Visual Studio Code for the web offers a free, browser-based experience with no installation required. It enables quick and secure browsing of code repositories and lightweight edits. To get started, visit the [VS Code Dev site](https://vscode.dev).

The Synapse VS Code extension can also be used in the VS Code for the Web experience. The extension supports the CRUD (create, read, update, and delete) notebook experience in Fabric. The changes from the VS Code for the Web experience are applied to the workspace immediately. The extension also supports running notebooks in the VS Code for the web experience.

> [!IMPORTANT]
> The Synapse VS Code Remote extension is currently in preview.

## Install the Synapse VS Code extension for the Web

1. Go to https://insider.vscode.dev from your browser.
1. Select the **Extensions** icon in the left navigation bar.
1. Search for **Synapse** and select the **Synapse VS Code - Remotes** extension
1. click **Install**.
   :::image type="content" source="media\vscode\install-vs-code-web.png" alt-text="Screenshot that shows installation of Synapse VS Code extension web.":::

## Open a notebook with the Synapse VS Code extension for the Web

You can open a notebook in the VS Code for the Web experience by clicking the **Open in VS Code(Web)** button on the notebook authoring page in the Fabric portal. After you select the button, a separate browser tab is opened with the VS Code for the web experience. If you haven't already installed the extension, it is automatically installed, and activated, and the notebook is opened.

:::image type="content" source="media\vscode\open-notebook-in-vs-code-web.png" alt-text="Screenshot showing how to open notebook in VS Code for the Web." lightbox="media\vscode\open-notebook-in-vs-code-web.png":::

## Manage notebooks and notebook file system

The notebook tree node lists all of the notebook items in the current workspace. For each notebook item, you can perform the following actions:

- Open a notebook
- Delete a notebook
- Add new resource file
- Add new resource folder

You can also delete any existing file/folder in the notebook file system.

:::image type="content" source="media\vscode\manage-notebook-vs-code-web.png" alt-text="Screenshot showing the notebook tree node.":::

## Run and debug notebooks in the VS Code web experience

You can run a notebook in the VS Code for the web experience by selecting the **Run** button in the notebook editor. Before you run the notebook, make sure to select the **Synapse VS Code -Remote** as the kernel. You can select it at the top right corner of the notebook editor.

:::image type="content" source="media\vscode\select-synapse-kernel.png" alt-text="Screenshot showing how to run notebook in VS Code for the Web.":::

Besides running the notebook, you can also debug the notebook in the VS Code web experience. Before you start the debug session, run the following code in the notebook to enable this feature.

```python
%%configure -f  
{  
    "conf": {  
        "livy.rsc.repl.session.debug-notebook.enabled": "true"  
    } 
} 
```

> [!NOTE]
> * It might take 2-5 minutes to finish the configuration. For each livy session, you only need to run this setup once.

After you run this configuration, you can set breakpoints in the notebook editor and run the notebook in debug mode. When the debug session starts, a notification is shown in bottom right corner of the editor to indicate that the debug session is initiated.

:::image type="content" source="media\vscode\debug-notebook-vs-code-notification.png" alt-text="Screenshot showing debug session notification.":::

This debug session runs on the remote compute, requiring network traffic to sync debug information like breakpoint status. During the sync process, you can track the synchronization progress in the notebook editor's status bar.

:::image type="content" source="media\vscode\debug-notebook-vs-code-status-bar.png" alt-text="Screenshot showing debug session status bar.":::

> [!IMPORTANT]
> Please wait for the synchronization to finish before you continue the debug operation.

## Related content

- [Create and manage Microsoft Fabric notebooks in Visual Studio Code](author-notebook-with-vs-code.md)
