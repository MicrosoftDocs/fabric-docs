---
title: Develop, execute and debug Spark Job Definition in VS Code
description: VS Code extension for Synapse supports pro-dev authoring experience of Spark Job Definition.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.date: 05/08/2023
ms.search.form: VSCodeExtension
---

# Spark Job Definition experience in VS Code

The full CURD (create/update/read/delete) experience of Spark Job Definition is supported by this extension. After the SJD is created, you can upload more referenced lib, submit the request to run the SJD and check the run history.

[!INCLUDE [preview-note](../includes/preview-note.md)]

### Create Spark Job Definition in VS Code
By clicking the “Create Spark Job Definition” button, you can start to create a new SJD artifact. The initial inputs required are: name, referenced lakehouse and the default lakehouse.

:::image type="content" source="media\vscode\create-sjd.png" alt-text="Screenshot showing create sjd button.":::

After the request is processed, the name of the newly created SJD will appear under the Spark Job Definition root node. After expanding the SJD name node, there are three sub-nodes are listed

- **Files**:List the main definition file and other referenced lib. Users can upload new files from here.
- **Lakehouse**: List all the referenced Lakehouse by this SJD, one of them is marked as default lakehouse which could be accessed via the relative path (Files/…, Tables/…).
- **Run**: List the run history of this SJD and the job status of each run

### Upload Main Def / Referenced lib 
By clicking “Add Main File” button, you can upload/overwrite the main definition file.

:::image type="content" source="media\vscode\upload-main-def.png" alt-text="Screenshot showing upload main def button.":::

By clicking the “Add Lib File”, you can upload library file which is referenced in the main definition file

:::image type="content" source="media\vscode\upload-lib.png" alt-text="Screenshot showing upload lib button.":::

After the file is uploaded, users can also override it by clicking the “Update File” and upload a new file, or just delete via the “Delete” button.

:::image type="content" source="media\vscode\update-file.png" alt-text="Screenshot showing update file button.":::

### Submit Run request
You can directly submit a request to run the SJD from VSCode side by click the “Run Spark Job” button at the toolbar of the source SJD

:::image type="content" source="media\vscode\submit-sjd-run.png" alt-text="Screenshot showing submit run button.":::

Once the request is submitted, in the “Runs” node, a new entry will be created to indicate a new Spark Application is created based on the current SJD setup. You can also cancel the running job by clicking the “Cancel Spark Job” button.

:::image type="content" source="media\vscode\cancel-sjd-run.png" alt-text="Screenshot showing cancel run button.":::

### Open SJD in Trident Portal
You can open the SJD authoring page in the Trident portal by clicking the “Open in Browser” button, for a completed run, user can also directly open the detail monitor page of that run by clicking the button at the Run level.

:::image type="content" source="media\vscode\open-sjd-in-browser.png" alt-text="Screenshot showing open in browser button.":::

### Debug SJD source code(Python)

If the SJD is created with PySpark(Python), you can download the .py script of the main definition file and the referenced file and debug the source script in the VS Code.

By clicking the “Debug” button, user can trigger the download of the source code. Once the download is finished, the folder of the source code will be automatically open.

:::image type="content" source="media\vscode\download-sjd-source.png" alt-text="Screenshot showing download source button.":::

The first time when the folder is open, in order to debug/run the source script, you should choose to “trust the authors” option, detail context can be found here[Visual Studio Code Workspace Trust security](https://code.visualstudio.com/docs/editor/workspace-trust)

If the source code had been downloaded before, you will be required to confirm if the local version should be overwritten by the new download.

In the root folder of the source script, there is sub-folder named **conf** created by the system. Within this folder, the file named lighter-config.json contains some system meta-data needed for the remote run, please make sure do NOT change it. Another file named sparkconf.py contains code snippet which is needed to set up the SparkConf object. To enable the remote debug, please make sure the SparkConf object is set up properly. In the below sample, it is the original version of the source code.

:::image type="content" source="media\vscode\original-sjd-source.png" alt-text="Screenshot showing source code before change.":::

After copy&paste the snippet, below is the updated version of the source code.

:::image type="content" source="media\vscode\updated-sjd-source.png" alt-text="Screenshot showing source code after change.":::

After the source code is updated with the needed conf, the very last step is to pick the right Python Interpreter. Please make sure to select the one installed from the **synapse-spark-kernel** conda environment.

### Edit Spark Job Definition properties

You can edit the detail property of the Spark Job Definition, such as command line arguments. You can click the “Update SJD Property” button to open a settings.yml file. The content of this file is populated by the existing properties. After updating and saving the .yml file, you should  click the **Publish SJD Property** button at the top right corner to sync the change back to the remote workspace.

:::image type="content" source="media\vscode\edit-sjd-property.png" alt-text="Screenshot showing edit sjd property button.":::

:::image type="content" source="media\vscode\push-sjd-property.png" alt-text="Screenshot showing push sjd property button.":::
