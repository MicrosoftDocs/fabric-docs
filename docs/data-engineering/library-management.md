---
title: Manage Apache Spark libraries
description: Learn how to manage and use Python, R, and Java libraries in Microsoft Fabric, including best practices for environments and inline installation.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 03/25/2026
#customer intent: As a user, I want to learn about the mechanisms that Microsoft Fabric offers to manage libraries in order to make use of prewritten code.
---

# Manage Apache Spark libraries in Microsoft Fabric

A library is a reusable package of code — such as a Python package from PyPI, an R package from CRAN, or a Java JAR — that you can import into your notebooks and Spark job definitions to add functionality without writing it from scratch. Microsoft Fabric provides multiple mechanisms to help you manage and use libraries.

- **Built-in libraries**: Each Fabric Spark runtime provides a rich set of popular preinstalled libraries. You can find the full built-in library list in [Fabric Spark Runtime](runtime.md).
- **Public libraries**: Public libraries are sourced from repositories such as PyPI and Conda, which are currently supported.
- **Custom libraries**: Custom libraries refer to code that you or your organization build. Fabric supports them in the *.whl*, *.jar*, and *.tar.gz* formats. Fabric supports *.tar.gz* only for the R language. For Python custom libraries, use the *.whl* format.

## Summary of library management best practices

The following scenarios describe best practices when using libraries in Microsoft Fabric.

### Scenario 1: Admin sets default libraries for the workspace

To set default libraries, you have to be the administrator of the workspace. As admin, you can perform these tasks:

1. [Create a new environment](create-and-use-environment.md#create-an-environment-from-a-workspace)
1. [Install the required libraries in the environment](environment-manage-library.md)
1. [Attach this environment as the workspace default](create-and-use-environment.md#attach-an-environment-as-a-workspace-default)

When your notebooks and Spark job definitions are attached to the **Workspace settings**, they start sessions with the libraries installed in the workspace's default environment.

### Scenario 2: Persist library specifications for one or multiple code items

If you have common libraries for different code items and don't need to update them frequently, [install the libraries in an environment](environment-manage-library.md) and [attach it to the code items](create-and-use-environment.md#attach-an-environment-to-a-notebook-or-a-spark-job-definition).

Publishing takes 5 to 15 minutes, depending on the complexity of the libraries. During this process, the system resolves potential conflicts and downloads required dependencies.

The benefit of this approach is that successfully installed libraries are guaranteed to be available when a Spark session starts with the environment attached. It saves the effort of maintaining common libraries for your projects and is recommended for pipeline scenarios because of its stability.

### Scenario 3: Inline installation in interactive run

If you're writing code interactively in a notebook, [inline installation](#inline-installation) is the best approach for adding PyPI or conda libraries or validating custom libraries for one-time use. Inline commands make a library available in the current notebook Spark session only — they allow quick installation, but the installed library doesn't persist across sessions.

Because `%pip install` can generate different dependency trees from run to run, which might lead to library conflicts, inline commands are turned off by default in pipeline runs and aren't recommended for pipelines.

## Summary of supported library types

| **Library type** | **Environment library management** | **Inline installation** |
|---|---|---|
| **Python Public (PyPI & Conda)** | Supported | Supported |
| **Python Custom (.whl)** | Supported | Supported |
| **R Public (CRAN)** | Not supported | Supported |
| **R custom (.tar.gz)** | Supported as custom library| Supported |
| **Jar** | Supported as custom library | Supported |

<a id="in-line-installation"></a>
## Inline installation

Inline commands let you manage libraries within individual notebook sessions.

<a id="python-in-line-installation"></a>
### Python inline installation

The system restarts the Python interpreter to apply library changes. Any variables defined before you run the command cell are lost. Put all commands for adding, deleting, or updating Python packages **at the beginning of your notebook**.

Inline commands for managing Python libraries are disabled in notebook pipeline runs by default. To enable `%pip install` for a pipeline, add `_inlineInstallationEnabled` as a boolean parameter set to `True` in the notebook activity parameters.

:::image type="content" source="media\environment-library-management\library-management-enable-pip-in-pipeline.png" alt-text="Screenshot showing the configuration of enabling pip install for notebook pipeline run." lightbox="media/environment-library-management/library-management-enable-pip-in-pipeline.png":::

> [!NOTE]
>
> The `%pip install` command can produce inconsistent results from run to run. Install libraries in an environment and use the environment in a pipeline instead.
> The `%pip install` command isn't supported in High Concurrency mode.
> In notebook reference runs, inline commands for managing Python libraries aren't supported. Remove these inline commands from the referenced notebook to ensure correct execution.

Use `%pip` instead of `!pip`. The `!pip` command is an IPython built-in shell command with the following limitations:

- `!pip` installs a package only on the driver node, not on executor nodes.
- Packages installed through `!pip` don't account for conflicts with built-in packages or packages already imported in a notebook.

`%pip` handles these scenarios. Libraries installed through `%pip` are available on both driver and executor nodes and take effect even if the library is already imported.

> [!TIP]
>
> The `%conda install` command usually takes longer than the `%pip install` command to install new Python libraries. It checks the full dependencies and resolves conflicts.
>
> Use `%conda install` for more reliability and stability. Use `%pip install` if you're sure that the library you want to install doesn't conflict with the preinstalled libraries in the runtime environment.

For all available Python inline commands and clarifications, see [%pip commands](https://pip.pypa.io/en/stable/cli/) and [%conda commands](https://docs.conda.io/projects/conda/en/latest/commands.html).

#### Manage Python public libraries through inline installation

This example shows how to use inline commands to manage libraries. Suppose you want to use *altair*, a powerful visualization library for Python, for a one-time data exploration, and the library isn't installed in your workspace. The following example uses conda commands to illustrate the steps.

You can use inline commands to enable *altair* on your notebook session without affecting other sessions of the notebook or other items.

1. Run the following commands in a notebook code cell. The first command installs the *altair* library. Also, install *vega_datasets*, which contains a semantic model you can use to visualize.

   ```python
   %conda install altair          # install latest version through conda command
   %conda install vega_datasets   # install latest version through conda command
   ```

   The output of the cell indicates the result of the installation.

2. Import the package and semantic model by running the following code in another notebook cell.

   ```python
   import altair as alt
   from vega_datasets import data
   ```

3. Now you can play around with the session-scoped *altair* library.

   ```python
   # load a simple dataset as a pandas DataFrame
   cars = data.cars()
   alt.Chart(cars).mark_point().encode(
   x='Horsepower',
   y='Miles_per_Gallon',
   color='Origin',
   ).interactive()
   ```

#### Manage Python custom libraries through inline installation

You can upload your Python custom libraries to the resources folder of your notebook or the attached environment. The resources folder is a built-in file system provided by each notebook and environment. See [Notebook resources](./how-to-use-notebook.md#notebook-resources) for more details.
After you upload a library, you can drag and drop it into a code cell to automatically generate the install command. Or you can run the following command:

```python
# install the .whl through pip command from the notebook built-in folder
%pip install "builtin/wheel_file_name.whl"             
```

### R inline installation

To manage R libraries, Fabric supports the `install.packages()`, `remove.packages()`, and `devtools::` commands. For all available R inline commands and clarifications, see [install.packages command](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/install.packages.html) and [remove.package command](https://stat.ethz.ch/R-manual/R-devel/library/utils/html/remove.packages.html).

#### Manage R public libraries through inline installation

Follow this example to walk through the steps of installing an R public library.

To install an R feed library:

1. Switch the working language to **SparkR (R)** in the notebook ribbon.

2. Install the *caesar* library by running the following command in a notebook cell.

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

### Manage Jar libraries through inline installation

You can add *.jar* files to notebook sessions with the following command.

```Scala
%%configure -f
{
    "conf": {
        "spark.jars": "abfss://<<Lakehouse prefix>>.dfs.fabric.microsoft.com/<<path to JAR file>>/<<JAR file name>>.jar",
    }
}        
```

The preceding code cell uses lakehouse storage as an example. In the notebook explorer, you can copy the full ABFS path of the file and replace it in the code.
:::image type="content" source="media\environment-library-management\library-management-get-path-abfs.png" alt-text="Screenshot of the menu commands to get the ABFS path." lightbox="media\environment-library-management\library-management-get-path-abfs.png":::

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md)
