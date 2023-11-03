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

- **Public library**: Public libraries refer to the ones residing in public sources or repositories. We currently support Python public libraries from PyPI and Conda, one can specify the source in Library Management portals.

- **Custom library**: Custom libraries are the code built by you or your organization. *.whl* and *.jar* can be managed through Library Management portals.

You can learn more about public and custom libraries by going to the [manage libraries in Fabric documentation](../../data-engineering/library-management.md).

## Install workspace libraries

> [!IMPORTANT]
> Only Workspace admin has access to update the Workspace level settings.

Workspace level libraries allow data scientists to standardize the sets of libraries and versions across all users in their workspace. [Workspace default environment](../../data-engineering/library-management.md\#scenario-1-admin-sets-default-libraries-for-the-workspace) define the working environment for the entire workspace. The libraries installed on a default environment are available for all notebooks and Spark job definitions under that workspace. Because these libraries are made available across sessions, it is best to use default environment when you want to set up a shared environment for all sessions in a workspace.

## Install libraries for a group of or single code item

One Fabric environment can be attached to any code item in the workspace. The libraries installed in the Environment are made available across sessions once it's attached to the code item. It is the best to set up an environment for a group of notebooks or Spark job definitions that share the common library requirements.
You can learn more about setting up an environment by going to the [Environment 101: create, configure and use an environment](../../data-engineering/create-and-use-environment.md).

## In-line installation

When developing a machine learning model or doing ad-hoc data analysis, you may need to quickly install a library for your Apache Spark session. To do this, you can use the in-line installation capabilities to quickly get started with new libraries.  

   > [!NOTE]
   > In-line installation affects the current notebook session only. This means a new session will not include the packages installed in previous sessions.
   >
   > We recommend placing all the in-line commands that add, delete, or update the Python packages in the first cell of your Notebook. The change of Python packages will be effective after you restart the Python interpreter. The variables defined before running the command cell will be lost.

### Install Python public libraries within a notebook

The ```%pip``` command in Microsoft Fabric is equivalent to the commonly used [pip](https://pip.pypa.io/en/stable/user_guide/) command in many data science workflows. The following section show examples of how you can use ```%pip``` commands to install public libraries directly into your notebook.

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

## Next steps

- Manage workspace settings: [Apache Spark workspace administration settings](../../data-engineering/workspace-admin-settings.md)
- Manage libraries in Fabric: [Manage libraries in Fabric documentation](../../data-engineering/library-management.md)
- [Environment 101: create, configure and use an environment](../../data-engineering/create-and-use-environment.md)
