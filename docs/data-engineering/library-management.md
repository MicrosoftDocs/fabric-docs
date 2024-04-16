---
title: Manage Apache Spark libraries
description: Learn how to manage and use libraries following best practices.
ms.reviewer: snehagunda
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 03/20/2023
---

# Manage Apache Spark libraries in Microsoft Fabric

A library is a collection of pre-written code that can be imported to provide extra functionality. By using libraries, developers can save time and effort by not having to write code from scratch to perform common tasks. Instead, they can import the library and use its functions and classes to achieve their desired functionality. On Microsoft Fabric, multiple mechanisms are provided to help you manage and use the libraries.

- **Built-in** libraries: Each Fabric Spark runtime provides a rich set of popular preinstalled libraries. You can find the full built-in library list in [Fabric Spark Runtime](runtime.md)
- **Public library**: Public libraries are sourced from repositories such as PyPI and Conda, which are currently supported.
- **Custom library**: Custom libraries refer to code built by you or your organization, and are supported in the *.whl*, *.jar*, and *.tar.gz* formats. The *.tar.gz* format are only supported for R language. For Python custom libraries, use the *.whl* format.

## Library management in workspace setting

> [!IMPORTANT]
> Library management at the workspace setting is no longer supported. You can follow ["Migrate the workspace libraries and Spark properties to a default environment"](environment-workspace-migration.md) to migrate them to an environment and attach as workspace default.

## Summary of library management best practices

### Scenario 1: admin sets default libraries for the workspace

In order to set default libraries, you have to be the admin of the workspace. You can [create a new environment](create-and-use-environment.md#create-an-environment), [install the required libraries](environment-manage-library.md), and then [attach this environment as workspace default](create-and-use-environment.md#attach-an-environment-as-workspace-default) in workspace setting.

The notebooks and Spark job definitions in the workspace, which are attached to the *Workspace Settings*, start sessions with libraries installed in the workspace's default environment.

### Scenario 2: persist library specifications for one or multiple code items

You can [install the libraries in an environment](environment-manage-library.md) and [attach it to the code items](create-and-use-environment.md#attach-an-environment-to-a-notebook-or-a-spark-job-definition) if you want to persist the library specifications.

One benefit of doing so is that it saves duplicated effort if running the code requires common libraries all the time. Once successfully installed in the environment, they are effective in all Spark sessions if the environment is attached.

Another benefit is that library configuration granularity lower than the workspace level is supported. One environment can be attached to multiple code artifacts. If you have a subset of notebooks or Spark job definitions in one workspace that require the same libraries, attach them to the same environment. Admin, member, and contributor of the workspace can create, edit, and attach the environment.

### Scenario 3: in-line installation in interactive run

If you want to use a library that isn't installed for one-time use in an interactive notebook run, [in-line installation](library-management.md#in-line-installation) is the most convenient option. In-line commands in Fabric allow you to have the library effective in the current notebook Spark session but it doesn't persist across different sessions.

Users, who have the permission to run the notebook, can install extra libraries in the Spark session.

## Summary of supported library types

| **Library type** | **Environment library management** | **In-line installation** |
|---|---|---|
| **Python Public (PyPI & Conda)** | Supported | Supported |
| **Python Custom (.whl)** | Supported | Supported |
| **R Public (CRAN)** | Not supported | Supported |
| **R custom (.tar.gz)** | Supported | Supported |
| **Jar** | Supported as custom library | Not supported |

> [!IMPORTANT]
> We currently have limitations on the *.jar* library.
>
> - For Scala users, the *.jar* file, which overrides the built-in library with a different, can install successfully in environment but not effective for your Spark/Scala sessions. The new *.jar* works fine in the sessions.
> - For Python users, all *.jar* files are currently not supported in environment, they can install successfully in environment but doesn't effective in the PySpark sessions.
> - The *.jar* files can install at notebook [session level](library-management.md#manage-jar-libraries-through-in-line-installation) instead.

## In-line installation

In-line commands support Python libraries and R libraries.

### Python in-line installation

> [!IMPORTANT]
> The Python interpreter is restarted to apply the change of libraries. Any variables defined before running the command cell are lost. Therefore, we strongly recommend you to put all the commands for adding, deleting, or updating Python packages at the beginning of your notebook.
> *%pip* is recommended instead of *!pip*. *!pip* is a IPython built-in shell command which has following limitations:
>
> - *!pip* will only install package on driver node without executor nodes.
> - Packages that install through *!pip* will not affect when conflicts with built-in packages or when it's already imported in a notebook.
>
> However, *%pip* will handle all above mentioned scenarios. Libraries installed through *%pip* will be available on both driver and executor nodes and will be still effective even it's already imported.

> [!TIP]
>
> - The *%conda install* command usually takes longer than the *%pip install* command to install new Python libraries, because it checks the full dependencies and resolves conflicts. You may want to use *%conda install* for more reliability and stability. You can use *%pip install* if you are sure that the library you want to install does not conflict with the preinstalled libraries in the runtime environment.
> - All available Python in-line commands and its clarifications can be found: [%pip commands](https://pip.pypa.io/en/stable/cli/) and [%conda commands](https://docs.conda.io/projects/conda/en/latest/commands.html)

#### Manage Python public libraries through in-line installation

In this example, we show you how to use in-line commands to manage libraries. Suppose you want to use *altair*, a powerful visualization library for Python, for a one-time data exploration. And suppose the library isn't installed in your workspace. In the following example, we use conda commands to illustrate the steps.

You can use in-line commands to enable *altair* on your notebook session without affecting other sessions of the notebook or other items.

1. Run the following commands in a notebook code cell to install the *altair* library and *vega_datasets*, which contains semantic model you can use to visualize:

   ```python
   %conda install altair          # install latest version through conda command
   %conda install vega_datasets   # install latest version through conda command
   ```

   The output of the cell output indicates the result of installation.

2. Import the package and semantic model by running the following codes in another notebook cell:

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

#### Manage Python custom libraries through in-line installation

You can upload your Python custom libraries to the **File** folder of the lakehouse attached to your notebook. Go to your lakehouse, select the **…** icon on the **File** folder, and upload the custom library.

After uploading, you can use the following command to install the custom library to your notebook session:

```python
# install the .whl through pip command
%pip install /lakehouse/default/Files/wheel_file_name.whl             
```

### R in-line installation

Fabric supports *install.packages()*, *remove.packages()* and *devtools::* commands to manage R libraries.

> [!TIP]
> Find all available R in-line commands and clarifications in [install.packages command](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/install.packages.html) and [remove.package command](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/remove.packages.html).

#### Manage R public libraries through in-line installation

Follow this example to walk through the steps of installing an R public library:

To install an R feed library:

1. Switch the working language to “SparkR(R)” in the notebook ribbon.

2. install the *caesar* library by running the following command in a notebook cell.

   ```python
   install.packages("caesar")
   ```

3. Now you can play around with the session-scoped *caesar* library with a Spark job.

   ```python
   library(SparkR)
   sparkR.session()

   hello <- function(x) {
   library(caesar)
   caesar(x)
   }
   spark.lapply(c("hello world", "good morning", "good evening"), hello)
   ```

### Manage Jar libraries through in-line installation

The *.jar* files are support at notebook sessions with following command. The following code cell is using Notebook built-in folder as an example.

```Scala
%%configure -f
{
    "conf": {
        "spark.jars": "{mssparkutils.nbResPath}/builtin/jar_file_name.jar"
    }
}       
```

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).
