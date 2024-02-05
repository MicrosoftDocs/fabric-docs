---
title: Develop, execute, and debug Apache Spark job definitions in VS Code
description: Learn about the VS Code extension for Synapse, which supports a pro-developer experience for creating, running, and debugging Spark job definitions.
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 05/08/2023
ms.search.form: VSCodeExtension
---

# Create and manage Apache Spark job definitions in Visual Studio Code

The Visual Studio (VS) Code extension for Synapse fully supports the CURD (create, update, read, and delete) Spark job definition experience in Fabric. After you create a Spark job definition, you can upload more referenced libraries, submit a request to run the Spark job definition, and check the run history.

## Create a Spark job definition

To create a new Spark job definition:

1. In the VS Code Explorer, select the **Create Spark Job Definition** option.

   :::image type="content" source="media\vscode\create-sjd.png" alt-text="Screenshot of VS Code Explorer, showing where to select the Create Spark Job Definition option.":::

1. Enter the initial required fields: name, referenced lakehouse, and default lakehouse.

1. The request processes and the name of your newly created Spark job definition appears under the **Spark Job Definition** root node in VS Code Explorer. Under the Spark job definition name node, you see three subnodes:

   - **Files**: List of the main definition file and other referenced libraries. You can upload new files from this list.
   - **Lakehouse**: List of all lakehouses referenced by this Spark job definition. The default lakehouse is marked in the list, and you can access it via the relative path `Files/…, Tables/…`.
   - **Run**: List of the run history of this Spark job definition and the job status of each run.

## Upload a main definition file to a referenced library

To upload or overwrite the main definition file, select the **Add Main File** option.

   :::image type="content" source="media\vscode\upload-main-def.png" alt-text="Screenshot of VS Code Explorer, showing where to select the Add Main File option.":::

To upload the library file that the main definition file references, select the **Add Lib File** option.

   :::image type="content" source="media\vscode\upload-lib.png" alt-text="Screenshot showing upload lib button.":::

After you have uploaded a file, you can override it by clicking the **Update File** option and uploading a new file, or you can delete the file via the **Delete** option.

  :::image type="content" source="media\vscode\update-file.png" alt-text="Screenshot of VS Code Explorer, showing where to find the Update File and Delete options.":::

## Submit a run request

To submit a request to run the Spark job definition from VS Code:

1. From the options to the right of the name of the Spark job definition you want to run, select the **Run Spark Job** option.

   :::image type="content" source="media\vscode\submit-sjd-run.png" alt-text="Screenshot of VS Code Explorer, showing where to select Run Spark Job.":::

1. After you submit the request, a new Spark Application appears in the **Runs** node in the Explorer list. You can cancel the running job by selecting the **Cancel Spark Job** option.

   :::image type="content" source="media\vscode\cancel-sjd-run.png" alt-text="Screenshot of VS Code Explorer with the new Spark application listed under the Runs node, and showing where to find the Cancel Spark Job option.":::

## Open a Spark job definition in the Fabric portal

You can open the Spark job definition authoring page in the Fabric portal by selecting the **Open in Browser** option.

You can also select **Open in Browser** next to a completed run to see the detail monitor page of that run.

:::image type="content" source="media\vscode\open-sjd-in-browser.png" alt-text="Screenshot of VS Code Explorer, showing where to select the Open in Browser option.":::

## Debug Spark job definition source code (Python)

If the Spark job definition is created with PySpark (Python), you can download the .py script of the main definition file and the referenced file, and debug the source script in VS Code.

1. To download the source code, select the **Debug Spark Job Definition** option to the right of the Spark job definition.

   :::image type="content" source="media\vscode\download-sjd-source.png" alt-text="Screenshot showing download source button.":::

1. After the download completes, the folder of the source code automatically opens.

1. Select the **Trust the authors** option when prompted. (This option only appears the first time you open the folder. If you don't select this option, you can't debug or run the source script. For more information, see [Visual Studio Code Workspace Trust security](https://code.visualstudio.com/docs/editor/workspace-trust).)

1. If you have downloaded the source code before, you're prompted to confirm that you want to overwrite the local version with the new download.

   > [!NOTE]
   > In the root folder of the source script, the system creates a subfolder named **conf**. Within this folder, a file named **lighter-config.json** contains some system metadata needed for the remote run. Do NOT make any changes to it.

1. The file named **sparkconf.py** contains a code snippet that you need to add to set up the **SparkConf** object. To enable the remote debug, make sure the **SparkConf** object is set up properly. The following image shows the original version of the source code.

   :::image type="content" source="media\vscode\original-sjd-source.png" alt-text="Screenshot of a code sample, showing the source code before the change.":::

   The next image is the updated source code after you copy and paste the snippet.

   :::image type="content" source="media\vscode\updated-sjd-source.png" alt-text="Screenshot of a code sample, showing the source code after the change.":::

1. After you have updated the source code with the necessary conf, you must pick the right Python Interpreter. Make sure to select the one installed from the **synapse-spark-kernel** conda environment.

## Edit Spark job definition properties

You can edit the detail properties of Spark job definitions, such as command-line arguments.

1. Select the **Update SJD Configuration** option to open a **settings.yml** file. The existing properties populate the contents of this file.

   :::image type="content" source="media\vscode\edit-sjd-property.png" alt-text="Screenshot showing where to select the Update SJD Configuration option for a Spark job definition.":::

1. Update and save the .yml file.

1. Select the **Publish SJD Property** option at the top right corner to sync the change back to the remote workspace.

   :::image type="content" source="media\vscode\push-sjd-property.png" alt-text="Screenshot showing where to select the Publish SJD Property option for a Spark job definition.":::

## Related content

- [Explore lakehouse in VS Code](explore-lakehouse-with-vs-code.md)
- [Notebook experience in VS Code](author-notebook-with-vs-code.md)
