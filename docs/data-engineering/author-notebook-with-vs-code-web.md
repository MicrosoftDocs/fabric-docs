---
title: Create and manage Fabric notebooks from VS Code for the Web
description: Learn about the VS Code extension for Synapse under the VS Code web experience, which supports a pro-developer authoring experience.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ms.search.form: VSCodeExtension
---

# Create and manage Microsoft Fabric notebooks inside Visual Studio Code for the web

Visual Studio (VS) Code for the web offers a free, browser-based experience with no installation required. It enables quick and secure browsing of code repositories and lightweight edits. To get started, visit the [VS Code Dev site](https://vscode.dev).

The Fabric Data Engineering VS Code extension can also be used in the VS Code for the Web experience. The extension supports the create, read, update, and delete (CRUD) notebook experience in Fabric. The changes from the VS Code for the Web experience are applied to the workspace immediately. The extension also supports running notebooks in the VS Code for the web experience.

> [!IMPORTANT]
> The Fabric Data Engineering VS Code extension is currently in preview.

## Install the Fabric Data Engineering VS Code extension for the Web

1. Go to https://insider.vscode.dev from your browser.
1. Select the **Extensions** icon in the left navigation bar.
1. Search for **Fabric Data Engineering** and select the **Fabric Data Engineering VS Code - Remotes** extension
1. Select **Install**.

   :::image type="content" source="media\vscode\install-vs-code-web.png" alt-text="Screenshot that shows installation of Fabric Data Engineering VS Code extension web.":::

## Open a notebook with the Fabric Data Engineering VS Code extension for the Web

To open a notebook in the VS Code for the Web experience:
1. Select the **Open in VS Code (Web)** button on the notebook authoring page in the Fabric portal. 

    :::image type="content" source="media\vscode\open-notebook-in-vs-code-web.png" alt-text="Screenshot showing how to open notebook in VS Code for the Web." lightbox="media\vscode\open-notebook-in-vs-code-web.png":::

1. After you select the button, a separate browser tab is opened with the VS Code for the web experience. The extension is automatically installed and activated, and the notebook is opened.

## Manage notebooks and notebook file system

The notebook tree node lists all of the notebook items in the current workspace. For each notebook item, you can perform the following actions:

- Open a notebook
- Delete a notebook
- Add new resource file
- Add new resource folder

You can also delete any existing file/folder in the notebook file system.

:::image type="content" source="media\vscode\manage-notebook-vs-code-web.png" alt-text="Screenshot showing the notebook tree node.":::

## Run and debug notebooks in the VS Code web experience

You can run a notebook in the VS Code for the web experience by selecting the **Run** button in the notebook editor. 

Before you run the notebook, make sure you select the correct kernel and language environment for the notebook.

1. **Select the kernel:** In the notebook interface, choose the kernel option. Select Microsoft Fabric Runtime as your kernel to enable Fabric-specific features.
    :::image type="content" source="media\vscode\select-microsoft-fabric-runtime.png" alt-text="Screenshot showing how to select Microsoft Fabric Runtime.":::

1. **Choose your language environment:** Next, select either Spark / Python 3 or Python as your language environment, depending on your requirements and the compute you're using.
    :::image type="content" source="media\vscode\select-microsoft-fabric-spark.png" alt-text="Screenshot showing how to select PySpark.":::

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
> It might take 2-5 minutes to finish the configuration. For each live session, you only need to run this setup once. This feature only available for Spark notebooks.

After you run this configuration, you can set breakpoints in the notebook editor and run the notebook in debug mode. When the debug session starts, a notification is shown in bottom right corner of the editor to indicate that the debug session is initiated.

:::image type="content" source="media\vscode\debug-notebook-vs-code-notification.png" alt-text="Screenshot showing debug session notification.":::

This debug session runs on the remote compute, requiring network traffic to sync debug information like breakpoint status. During the sync process, you can track the synchronization progress in the notebook editor's status bar.

:::image type="content" source="media\vscode\debug-notebook-vs-code-status-bar.png" alt-text="Screenshot showing debug session status bar.":::

> [!IMPORTANT]
> Wait for the synchronization to finish before you continue the debug operation.

## Update Python Version from VS Code side

For Python Notebook, you can check and update the Python version from the VS Code side. You can find the python version in the bottom right corner of the status bar. If you want to update the Python version, you can select the version number in the status bar. You can pick the Python version from the list of available Python versions. The selected Python version is used for the following notebook run.

:::image type="content" source="media\vscode\python-version-status-bar.png" alt-text="Screenshot showing Python version in the status bar.":::

:::image type="content" source="media\vscode\select-python-version.png" alt-text="Screenshot showing how to select Python version.":::

> [!IMPORTANT]
> To make sure the version you selected is saved in the remote workspace, save the notebook after you select the Python version.

## Related content

- [Create and manage Microsoft Fabric notebooks in Visual Studio Code](author-notebook-with-vs-code.md)
