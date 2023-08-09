---
title: Develop, execute, and debug notebook in VS Code
description: Learn about the VS Code extension for Synapse, which enable a pro-developer authoring experience, including editing file in the Notebook resource folder.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom: build-2023
ms.date: 00/09/2023
ms.search.form: VSCodeExtension
---

# Microsoft Fabric notebook resource in VS Code

Microsoft Fabric notebook now support a new feature as "Notebook Resources". With this feature, user can store code-modules in .py format and other data file such as .csv or image file in this resource folder. All these resource files can be accessed from the notebook as local file system. This doc will show you how to use this feature in VS Code.

[!INCLUDE [preview-note](../includes/preview-note.md)]


## Open Notebook resource 

After the notebook artifact content has been downloaded to local, user can click the **Open Notebook Folder** button to open the notebook folder with the VS Code Explorer. The notebook folder contains the notebook artifact file and the resource folder. The resource folder contains all the resource files that are uploaded to the notebook resource.

:::image type="content" source="media\vscode\open-nb-folder.png" alt-text="Open notebook folder in VS Code.":::

Once the notebook folder is opened, user can start to edit the notebook artifact file and the resource files. The resource files should be stored under the pre-defined **builtin** folder. If user need to create a new file or subfolder, they should be all created under the **builtin** folder. Any other files or folders created outside the **builtin** folder will not be uploaded to the notebook resource.

:::image type="content" source="media\vscode\nb-folder-sample.png" alt-text="Notebook resource folder in VS Code.":::

From the above screenshot, there is a **localLib** folder created under the **builtin** folder. This folder contains a **util.py** file. This file can be imported in the notebook artifact file as a local module, as shown in the following sample code. Once imported, the functions defined in the **util.py** file can be called in the notebook artifact file.

```python

import builtin.localLib.util as util  
util.func1()

```

## Upload Notebook Resource

After the notebook artifact file and the resource files are edited, user can click the **Publish Resource Folder** button to upload the notebook resource to the remote workspace. The upload process will upload all the files and subfolders under the **builtin** folder to the notebook resource. The upload process will overwrite the version of the resource files in the remote workspace, including deleting the resource files that are deleted in the local side.

:::image type="content" source="media\vscode\publish-nb-resource.png" alt-text="Upload notebook resource in VS Code.":::

## Download Notebook Resource

User can click the **Update Resource Folder** button to download the notebook resource from the remote workspace. The download process will download all the files and subfolders under the **builtin** folder to the local notebook folder. The download process will overwrite the version of the resource files in the local side. For the files which is no longer existing in the remote workspace, the download process will move them to a **_backup** subfolder under its original parent folder.

:::image type="content" source="media\vscode\update-nb-resource.png" alt-text="Download notebook resource in VS Code.":::

In the below screenshot, the **util.py** file is moved to the **_backup** subfolder under the **localLib** folder because it is deleted in the remote workspace.

:::image type="content" source="media\vscode\update-nb-resource-sample.png" alt-text="Download notebook resource in VS Code.":::