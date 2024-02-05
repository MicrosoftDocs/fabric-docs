---
title: Python library management in Fabric
description: Overview of library management for Python.
ms.reviewer: mopeakande
author: midesa
ms.author: midesa
ms.topic: overview 
ms.custom: build-2023
ms.date: 04/24/2023
ms.search.form: Python Language
---

# Manage Python libraries in Microsoft Fabric

Libraries provide reusable code that you might want to include in your programs or projects. Each workspace comes with a pre-installed set of libraries available in the Spark run-time and available to be used immediately in the notebook or Spark job definition. We refer to these as built-in libraries. However, you might find that you need to include additional libraries for your machine learning scenario. This document describes how you can use Microsoft Fabric to install Python libraries for your data science workflows.

## Python libraries in Microsoft Fabric

Within Fabric, there are 2 methods to add additional Python libraries.

- **Feed library**: Feed libraries refer to the ones residing in public sources or repositories. We currently support Python feed libraries from PyPI and Conda, one can specify the source in Library Management portals.

- **Custom library**: Custom libraries are the code built by you or your organization. *.whl* and *.jar* can be managed through Library Management portals.

You can learn more about feed and custom libraries by going to the [manage libraries in Fabric documentation](../../data-engineering/library-management.md).

## Install workspace libraries

Workspace level libraries allow data scientists to standardize the sets of libraries and versions across all users in their workspace. Workspace library settings define the working environment for the entire workspace. The libraries installed on a workspace level are available for all notebooks and Spark job definitions under that workspace. Because these libraries are made available across sessions, it is best to use workspace libraries when you want to set up a shared environment for all sessions in a workspace.

   > [!IMPORTANT]
   > Only Workspace admin has access to update the Workspace level settings.

To install libraries in your workspace:

1. Select **Workspaces** from the left navigation pane to find and select your workspace. This workspace becomes your current workspace.
1. Select **Workspace settings** for your current workspace.
1. Select **Data Engineering/Science** to open the dropdown.
1. Select **Library management**.

:::image type="content" source="../media/python-library-management/library-management-page.png" alt-text="Screenshot showing the library management page for a workspace." lightbox="../media/python-library-management/library-management-page.png":::

You can use the workspace settings to install both Python feed and custom libraries. To learn more, you can visit [manage libraries in Fabric](../../data-engineering/library-management.md).

### Use workspace settings to manage feed libraries

In some cases, you may want to pre-install certain Python feed libraries from PyPI or Conda across all your notebook sessions. To do this, you can navigate to your workspace and manage these libraries through the [Python workspace settings](../../data-engineering/library-management.md#library-management-in-workspace-setting).

From the Workspace setting, you can do the following:

- **View and search feed library**. The installed library list appears when you open the **library management panel**. From this view, you can see the library name, version, and related dependencies. You can also search to quickly find a library from this list.
- **Add new feed library**. You can add a new Python feed library from PyPI or Conda. For example, if you're installing from PyPI:

   1. Select **+ Add from PyPI**. A new line appears for you to add the library.
   1. Start typing the desired library name, and select it from the list that shows up, to fill in the name and version. For example, you can select `imblearn` and its corresponding version. You can add more libraries to this page.
   1. When you're done, select **Apply** to install all selected libraries into the workspace.

   :::image type="content" source="../media/python-library-management/install-library-into-workspace.png" alt-text="Screenshot showing how to install a library directly into the workspace." lightbox="../media/python-library-management/install-library-into-workspace.png":::

   To upload a list of libraries at the same time, you can also upload a ```.yml``` file containing the required dependencies.

### Use workspace settings to manage custom libraries

Using the Workspace setting, you can also make custom Python ```.whl``` files available for all notebooks in your workspace. Once the changes are saved, Fabric will install your custom libraries and their related dependencies.  

## In-line installation

When developing a machine learning model or doing ad-hoc data analysis, you may need to quickly install a library for your Apache Spark session. To do this, you can use the in-line installation capabilities to quickly get started with new libraries.  

   > [!NOTE]
   > In-line installation affects the current notebook session only. This means a new session will not include the packages installed in previous sessions.
   >
   > We recommend placing all the in-line commands that add, delete, or update the Python packages in the first cell of your Notebook. The change of Python packages will be effective after you restart the Python interpreter. The variables defined before running the command cell will be lost.

### Install Python feed libraries within a notebook

The ```%pip``` command in Microsoft Fabric is equivalent to the commonly used [pip](https://pip.pypa.io/en/stable/user_guide/) command in many data science workflows. The following section show examples of how you can use ```%pip``` commands to install feed libraries directly into your notebook.

1. Run the following commands in a Notebook code cell to install the *altair* library and *vega_datasets*:

   ```python
   %pip install altair          # install latest version through pip command
   %pip install vega_datasets   # install latest version through pip command
   ```

   The log in the cell output indicates the result of installation.

1. Import the package and dataset by running the following codes in another Notebook cell:

   ```python
   import altair as alt
   from vega_datasets import data
   ```

> [!NOTE]
> When installing new Python libraries, the *%conda install* command normally takes more time than *%pip install* since it will check the full dependencies to detect conflicts. You may want to use *%conda install* when you want to avoid potential issues. Use *%pip install* when you are certain about the library you are trying to install has no conflict with the pre-installed libraries in runtime environment.

> [!TIP]
> All available Python in-line commands and its clarifications can be found: [%pip commands](https://pip.pypa.io/en/stable/cli/) and [%conda commands](https://docs.conda.io/projects/conda/en/latest/commands.html)

### Manage custom Python libraries through in-line installation

In some cases, you may have a custom library that you want to quickly install for a notebook session. To do this, you can upload your custom Python library into your notebook-attached Lakehouse **File** folder.

To do this:

1. Navigate to your Lakehouse and select **…** on the **File** folder.
1. Then, upload your custom Python ```jar``` or ```wheel``` library.
1. After uploading the file, you can use the following command to install the custom library to your notebook session:

    ```python
    # install the .whl through pip command
    %pip install /lakehouse/default/Files/wheel_file_name.whl             
    ```

## Related content

- Manage workspace settings: [Apache Spark workspace administration settings](../../data-engineering/workspace-admin-settings.md)
- Manage libraries in Fabric: [Manage libraries in Fabric documentation](../../data-engineering/library-management.md)
