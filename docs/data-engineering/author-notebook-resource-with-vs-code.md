---
title: Work with notebook resources in Visual Studio Code
description: Learn about the VS Code extension for Synapse, which enables a pro-developer authoring experience, including editing file in the notebook resource folder.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 08/09/2023
ms.search.form: VSCodeExtension
---

# Access and manage Microsoft Fabric notebook resources in Visual Studio Code

Microsoft Fabric notebooks now support a feature called *notebook resources*. With this feature, you can store code modules in .py format and other data files, such as .csv or image files, in a resource folder. You can access all these resource files from the notebook as a local file system. This article shows you how to use this feature in Visual Studio (VS) Code, with the VS Code extension for Synapse.

For information about the extension, including how to install it, see [What is the Synapse Visual Studio Code extension?](setup-vs-code-extension.md)

## Open the notebook resource folder

1. After you have installed the extension and downloaded your notebook content locally, open VS Code.

1. Select the **Open Notebook Folder** button to open the notebook folder in the VS Code Explorer. The notebook folder contains the notebook file and the resource folder, where you find all the resource files that you uploaded to the notebook resource.

   :::image type="content" source="media\vscode\open-nb-folder.png" alt-text="Screenshot of open notebook folder in VS Code.":::

1. You can now edit the notebook file and the resource files. The resource files appear under the predefined **builtin** folder. If you need to create a new file or subfolder, you must create them under the **builtin** folder. (Any files or folders created outside the **builtin** folder aren't uploaded to the notebook resource.)

   :::image type="content" source="media\vscode\nb-folder-sample.png" alt-text="Screenshot of notebook resource folder in VS Code.":::

The previous screenshot shows a **localLib** folder created under the **builtin** folder. This folder contains a **util.py** file. You can import this file into the notebook file as a local module, as shown in the following sample code. Once imported, you can call the functions defined in the **util.py** file from within the notebook file.

```python
import builtin.localLib.util as util  
util.func1()
```

## Upload notebook resource files

After you edit the notebook file and the resource files, you can upload the notebook resource to the remote workspace by selecting the **Publish Resource Folder** option. The upload process uploads all the files and subfolders under the **builtin** folder to the notebook resource. The upload process overwrites the version of the resource files in the remote workspace, including deleting the resource files that you deleted locally.

:::image type="content" source="media\vscode\publish-nb-resource.png" alt-text="Screenshot of upload notebook resource in VS Code.":::

## Download notebook resource files

To download the notebook resource from the remote workspace, select the **Update Resource Folder** option. The download process downloads all the files and subfolders under the **builtin** folder to the local notebook folder. The download process overwrites the local version of the resource files. For any files that no longer exist in the remote workspace, the download process moves them to a **_backup** subfolder under its original parent folder.

:::image type="content" source="media\vscode\update-nb-resource.png" alt-text="Screenshot of download notebook resource in VS Code.":::

The following screenshot shows the **util.py** file moved to the **_backup** subfolder under the **localLib** folder because someone deleted it in the remote workspace.

:::image type="content" source="media\vscode\update-nb-resource-sample.png" alt-text="Screenshot showing a deleted file moved into a backup subfolder.":::

## Related content

- [Microsoft Fabric notebook experience in VS Code](author-notebook-with-vs-code.md)
- [Spark job definition experience in VS Code](author-sjd-with-vs-code.md)
- [Explore Microsoft Fabric lakehouses in Visual Studio Code](explore-lakehouse-with-vs-code.md)
