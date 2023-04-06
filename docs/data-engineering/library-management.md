---
title: Library management
description: Learn how to manage and use built-in libraries, and how to include other libraries.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.date: 02/24/2023
---

# Library management

[!INCLUDE [preview-note](../includes/preview-note.md)]

Libraries provide reusable code that Apache Spark developers may want to include in their Spark application.

Each workspace comes with a pre-installed set of libraries available in the Spark run-time and available to be used immediately in the notebook or Spark job definition. We refer to these as built-in libraries.

Based on the user scenarios and specific needs, you can include other libraries. There are two types of libraries you may want to include:

- **Feed library**: Feed libraries refer to the ones residing in public sources or repositories. We currently support Python feed libraries from PyPI and Conda, one can specify the source in Library Management portals.

- **Custom library**: Custom libraries are the code built by you or your organization. *.whl* and *.jar* can be managed through Library Management portals.

## Summary of library management and best practices

You can manage all the previously mentioned types of libraries via two different entry points: library management in workspace settings and in-line installation.

1. [**Workspace library management**](#library-management-in-workspace-setting): Workspace library settings define the working environment for the entire Workspace. The libraries installed on a Workspace level are available for all Notebooks and Spark job definitions under that workspace. Update the workspace libraries when you want to set up the shared environment for all items in a workspace.

   > [!IMPORTANT]
   > Only Workspace admin has access to update the Workspace level settings.

1. [**In-line installation**](#in-line-installation): In-line installation allows you to manage libraries for your Notebook session. It's the best approach when you want to have a fast but not persist experience. For example, you may want to test your locally built package quickly or want to have some extra packages on your Notebooks session for one-time use. Currently, Python packages and R packages can be managed in-line.

   > [!NOTE]
   > In-line installation affects the current Notebook session only, which means a new session will not include the packages installed in previous sessions.
   >
   > We recommend placing all the in-line commands that add, delete, or update the Python packages in the first cell of your Notebook. The change of Python packages will be effective after you restart the Python interpreter. The variables defined before running the command cell will be lost.

Summarizing all library management behaviors currently available in [!INCLUDE [product-name](../includes/product-name.md)]:

| **Library name** | **Workspace update** | **In-line installation** |
|---|---|---|
| **Python Feed (PyPI & Conda)** | Supported | Supported |
| **Python Custom** | Supported | Supported |
| **R Feed (CRAN)** | Not Supported | Supported |
| **Jar** | Supported | Not Supported |

## Library Management in Workspace setting

Under the **Workspace settings**, you find the Workspace level library management portal: **Workspace setting** > **Data engineering** > **Library management**.

### Manage feed library in Workspace setting

In this section, we introduce how to manage feed library, which resides in PyPI or Conda, through Workspace library management portal.

- **View and search feed library**: The installed library list appears when you open the **library management portal**. You can view the name, version, and dependencies of the library. Use the search box on the upper right corner to find the library if you want to retrieve the information quickly.
- **Add new feed library**: The default source for installing the Python feed library is PyPI. You can also choose "Conda" by choosing from the drop-down button next to the add button. Once the installation source is selected, you can select the **+** button and a new line appears. Enter the library name, select or specify the version in the new line, and you're good to go.

  Except for adding new feed library one by one, you can upload a .yml file to install the required feed libraries in a batch.
- **Remove existing feed library**: Select the Trash button on the line of the library you want to remove, and this package is removed from your environment.
- **Update the version of existing feed** **library**: If the current version of the installed library is no longer satisfying your needs, choose another version in the drop-down box.
- **Review and apply** **changes**: Once you have made all your changes, you can review them if you go to the "Pending changes" panel. If anything is incorrect, you can remove one library specification by selecting the **X** button, or discard all changes by selecting the **Discard** button at the bottom of the page. After reviewing all the pending changes, select **Apply** to generate a new library snapshot.

### Manage custom libraries in Workspace setting

In this section, we show how to manage your custom packages, like *.jar* and *.whl*, in the Workspace library management portal.

- **Upload new custom library**: If you want to bring your custom codes in [!INCLUDE [product-name](../includes/product-name.md)] runtime, uploading them as custom packages through the portal is a good option. The library management module helps you handle potential conflicts and required dependencies in your custom libraries.

  Under the **Custom libraries** panel, you see the **Upload** button. Select it and upload the packages through a local directory.
- **Remove existing custom library**: If the custom libraries are no longer useful for your Spark applications, you can use the trash button to remove it from Spark runtime under the **Custom libraries** panel.
- **Review and apply changes**: Same as feed libraries, you can go to the **Pending changes** panel to review the changes you made for the updates of custom libraries and apply these changes to your [!INCLUDE [product-name](../includes/product-name.md)] Spark environment of the Workspace or Notebook.

## In-line installation

When you have an interactive Notebook and want to use some extra packages for a quick test, in-line installation would be your best choice.

### Manage Python feed libraries through in-line installation

> [!NOTE]
> When installing new Python libraries, the *%conda install* command normally takes more time than *%pip install* since it will check the full dependencies to detect conflicts. You may want to use *%conda install* when you want to avoid potential issues. Use *%pip install_ when you are certain about the library you are trying to install has no conflict with the pre-installed libraries in runtime environment.

> [!TIP]
> All available Python in-line commands and its clarifications can be found: [%pip commands](https://pip.pypa.io/en/stable/cli/) and [%conda commands](https://docs.conda.io/projects/conda/en/latest/commands.html)

Here's an example to walk you through the library management abilities using in-line commands. Let's assume you want to use *altair*, a powerful visualization library commonly used by Python developers, for your one-time data exploration. And let's assume the library isn't installed on Workspace or on Notebook. In the following example, we use conda commands to demonstrate the steps.

Now, you can use inline commands to help you enable *altair* on your Notebook session without interrupting other sessions of the Notebook or other items.

1. Run the following commands in a Notebook code cell to install the *altair* library and *vega_datasets*, which contains dataset you can use to visualize:

   ```python
   %conda install altair          # install latest version through conda command
   %conda install vega_datasets   # install latest version through conda command
   ```

   The log in the cell output indicates the result of installation.

1. Import the package and dataset by running the following codes in another Notebook cell:

   ```python
   import altair as alt
   from vega_datasets import data
   ```

1. Now you can play around with the session-scoped *altair* library:

   ```python
   # load a simple dataset as a pandas DataFrame
   cars = data.cars()
   alt.Chart(cars).mark_point().encode(
   x='Horsepower',
   y='Miles_per_Gallon',
   color='Origin',
   ).interactive()
   ```

### Manage Python custom libraries through in-line installation

You can upload your Python custom libraries to the Notebook-attached Lakehouse **File** folder. Navigate to your Lakehouse, select **…** on the **File** folder, then upload the custom library.

After uploading, you can use the following command to install the custom library to your Notebook session:

```python
# install the .whl through pip command
%pip install /lakehouse/default/Files/wheel_file_name.whl             
```

### Manage R feed libraries through in-line installation

[!INCLUDE [product-name](../includes/product-name.md)] supports *install.packages()*, *remove.packages()* and *devtools::* commands to manage R libraries.

> [!TIP]
> All available R in-line commands and its clarifications can be found: [install.packages command](https://www.rdocumentation.org/packages/utils/versions/3.6.2/topics/install.packages), [remove.package command](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/remove.packages.html) and [devtools commands](https://www.r-project.org/nosvn/pandoc/devtools.html).

Follow this example to walk through the steps of installing an R feed library:

1. Switch working language to “SparkR(R)” in Notebook ribbon.

1. Run the following command in a Notebook cell to install *caesar* library:

   ```python
   install.packages("caesar")
   ```

1. Now you can play around with the session-scoped *caesar* library with Spark job

   ```python
   library(SparkR)
   sparkR.session()

   hello <- function(x) {
   library(caesar)
   caesar(x)
   }
   spark.lapply(c("hello world", "good morning", "good evening"), hello)
   ```

## Next steps

- [Apache Spark workspace administration settings](spark-workspace-admin-settings.md)
