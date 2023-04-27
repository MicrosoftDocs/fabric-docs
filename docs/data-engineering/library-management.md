---
title: Manage Apache Spark libraries
description: Learn how to manage and use built-in libraries following best practices, and how to include other feed and custom libraries.
ms.reviewer: snehagunda
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.date: 04/24/2023

---

# Manage Apache Spark libraries in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Libraries** provide reusable code that Apache Spark developers may want to include in their Spark application.

Each workspace comes with a pre-installed set of libraries available in the Spark run-time and available to be used immediately in the notebook or Spark job definition. We refer to these as built-in libraries.

Based on the user scenarios and specific needs, you can include other libraries. There are two types of libraries you may want to include:

- **Feed library**: Feed libraries are the ones that come from public sources or repositories. You can install Python feed libraries from PyPI and Conda by specifying the source in the Library Management portals. You can also use a Conda environment specification *.yml* file to install libraries.

- **Custom library**: Custom libraries are the code built by you or your organization. *.whl*, *.jar* and *.tar.gz* can be managed through Library Management portals. Note that *.tar.gz* is only supported for R language, please use *.whl* for Python custom libraries.

## Summary of library management and best practices

You can manage all the previously mentioned types of libraries via two different entry points: library management in workspace settings and in-line installation.

1. [**Workspace library management**](#library-management-in-workspace-setting): Workspace library settings define the working environment for the entire Workspace. The libraries installed on a Workspace level are available for all Notebooks and Spark job definitions under that workspace. Update the workspace libraries when you want to set up the shared environment for all items in a workspace.

   > [!IMPORTANT]
   > Workspace library management is restricted to workspace admin only. Workspace member, contributor and viewer can view the libraries installed by the administrator.

2. [**In-line installation**](#in-line-installation): With in-line installation, you can install libraries for your Notebook session without affecting the global environment. This is a convenient option when you want a temporary and fast solution. For instance, you might want to try out a local package or use some additional packages for a single session. Currently, Python packages and R packages can be managed in-line.

   > [!IMPORTANT]
   > In-line installation is session-specific and does not persist across sessions.
   >
   > The Python interpreter will be restarted to apply the changes of library, any variables defined before running the command cell will be lost. Therefore, we strongly recommend you to put all the commands for adding, deleting, or updating Python packages at the beginning of your Notebook.

**Summarizing all library management behaviors currently available in [!INCLUDE [product-name](../includes/product-name.md)]:**

| **Library name** | **Workspace update** | **In-line installation** |
|---|---|---|
| **Python Feed (PyPI & Conda)** | Supported | Supported |
| **Python Custom (.whl)** | Supported | Supported |
| **R Feed (CRAN)** | Not Supported | Supported |
| **R custom (.tar.gz)** | Supported | Supported |
| **Jar** | Supported | Not Supported |

> [!IMPORTANT]
> We currently have limitations of *.jar* library.
>
> - If you upload a *.jar* file with different version of built-in library, it will not be effective on the Starter pool, since all *.jar* files are pre-imported in the Starter pool. Only the new *.jar* will be effective on the Starter pools. The custom spark pools has no such constraints, the custom *.jar* files uploaded with different version will override the built-in ones, and the new ones are also effective.
> - *%% configure* magic commands are not fully supported on Fabric at this moment. Please don't use it to bring *.jar* file to your Notebook session.

## Library Management in Workspace setting

Under the **Workspace settings**, you find the Workspace level library management portal: **Workspace setting** > **Data engineering** > **Library management**.

### Manage feed library in Workspace setting

In this section, we explain how to manage feed libraries from PyPI or Conda using the Workspace library management portal.

- **View and search feed library**: You can see the installed libraries and their name, version, and dependencies on the **library management portal**. You can also use the filter box on the upper right corner to find a installed library quickly.
- **Add new feed library**: The default source for installing Python feed libraries is PyPI. You can also select "Conda" from the drop-down button next to the add button. To add a new library, click on the **+** button and enter the library name and version in the new row.

   Alternatively, you can upload a .yml file to install multiple feed libraries at once.
- **Remove existing feed library**: To remove a library, click on the Trash button on its row.
- **Update the version of existing feed library**: To change the version of a library, select a different one from the drop-down box on its row.
- **Review and apply changes**: You can review your changes in the "Pending changes" panel. You can remove a change by clicking on the **X** button, or discard all changes by clicking on the **Discard** button at the bottom of the page. When you are satisfied with your changes, click on **Apply** to make these changes effective.

### Manage custom libraries in Workspace setting

In this section, we explain how to manage your custom packages, such as *.jar*, using the Workspace library management portal.

- **Upload new custom library**: You can upload your custom codes as packages to the [!INCLUDE [product-name](../includes/product-name.md)] runtime through the portal. The library management module will help you resolve potential conflicts and download dependencies in your custom libraries.

  To upload a package, click on the **Upload** button under the **Custom libraries** panel and select a local directory.

- **Remove existing custom library**: You can remove a custom library from the Spark runtime by clicking on the trash button under the **Custom libraries** panel.
- **Review and apply changes**: As with feed libraries, you can review your changes in the **Pending changes** panel and apply them to your [!INCLUDE [product-name](../includes/product-name.md)] Spark environment of the Workspace.

> [!NOTE]
> For *.whl* packages, the library installation process will download the dependencies from public sources automatically. However, this feature is not available for *.tar.gz* packages. You need to upload the dependent packages of the main *.tar.gz* package manually if there are any.

### Cancel update

The library update process may take some time to complete. You have the option to cancel the process and continue editing while it is updating. The **Cancel** button will appear during the process.

### Troubleshooting

If the library update process fails, you will receive a notification. You can click on the **View log** button to see the log details and troubleshoot the problem. If you encounter a system error, you can copy the root activity ID and report it to the support team.

## In-line installation

If you want to use some additional packages for a quick test in an interactive Notebook run, in-line installation is the most convenient option.

> [!IMPORTANT]
>
> *%pip* is recommended instead of *!pip*. *!pip* is a IPython built-in shell command which has following limitations:
>
> - *!pip* will only install package on driver node without executor nodes.
> - Packages that install through *!pip* will not effect when conflicts with built-in packages or when it's already imported in Notebook.
>
> However, *%pip* will handle all above mentioned scenarios. Libraries installed through *%pip* will be available on both driver & executor nodes and will be still effective even it's already imported.

> [!TIP]
>
> - The *%conda install* command usually takes longer than the *%pip install* command to install new Python libraries, because it checks the full dependencies and resolves conflicts. You may want to use *%conda install* for more reliability and stability. You can use *%pip install* if you are sure that the library you want to install does not conflict with the pre-installed libraries in the runtime environment.
> - All available Python in-line commands and its clarifications can be found: [%pip commands](https://pip.pypa.io/en/stable/cli/) and [%conda commands](https://docs.conda.io/projects/conda/en/latest/commands.html)

### Manage Python feed libraries through in-line installation

In this example, we show you how to use in-line commands to manage libraries. Suppose you want to use *altair*, a powerful visualization library for Python, for a one-time data exploration. And suppose the library is not installed on Workspace. In the following example, we use conda commands to illustrate the steps.

You can use in-line commands to enable *altair* on your Notebook session without affecting other sessions of the Notebook or other items.

1. Run the following commands in a Notebook code cell to install the *altair* library and *vega_datasets*, which contains dataset you can use to visualize:

   ```python
   %conda install altair          # install latest version through conda command
   %conda install vega_datasets   # install latest version through conda command
   ```

   The log in the cell output indicates the result of installation.

2. Import the package and dataset by running the following codes in another Notebook cell:

   ```python
   import altair as alt
   from vega_datasets import data
   ```

3. Now you can play around with the session-scoped *altair* library:

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

You can upload your Python custom libraries to the **File** folder of the lakehouse attached to your notebook. Go to your lakehouse, click on the **…** icon on the **File** folder, and upload the custom library.

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

2. Run the following command in a Notebook cell to install *caesar* library:

   ```python
   install.packages("caesar")
   ```

3. Now you can play around with the session-scoped *caesar* library with Spark job

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
