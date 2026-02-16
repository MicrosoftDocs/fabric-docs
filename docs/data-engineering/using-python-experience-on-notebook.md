---
title: Use Python experience on Notebook
description: Learn how to work with pure Python notebooks for data exploration, visualization, and machine learning.
ms.reviewer: jingzh
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.custom:
ms.search.form: Create and use notebooks
ms.date: 03/31/2025
---

# Use Python experience on Notebook


The Python notebook is a new experience built on top of Fabric notebook. It is a versatile and interactive tool designed for data analysis, visualization, and machine learning. It provides a seamless developing experience for writing and executing Python code. This capability makes it an essential tool for data scientists, analysts, and BI developers, especially for exploration tasks that don't require big data and distributed computing.

With a Python notebook, you can get:

- **Multiple built-in python kernels**: Python notebooks offer a pure Python coding environment without Spark, with two versions of Python kernel - Python 3.10 and 3.11 available by default, and the native ipython features supported such as iPyWidget, magic commands.

- **Cost effective**: The new Python notebook offers cost-saving benefits by running on a single node cluster with 2vCores/16GB memory by default. This setup ensures efficient resource utilization for data exploration projects with smaller data size.

- **Lakehouse & Resources are natively available**: The Fabric Lakehouse together with Notebook built-in Resources full functionality are available in Python notebook. This feature enables users to easily bring the data to python notebook, just try drag & drop to get the code snippet.  

- **Mix programming with T-SQL**: Python notebook offers an easy way to interact with Data Warehouse and SQL endpoints in explorer, by using notebookutils data connector, you can easily execute the T-SQL scripts under the context of python.  

- **Support for Popular Data Analytic libraries**: Python notebooks come with pre-installed libraries such as DuckDB, Polars, and Scikit-learn, providing a comprehensive toolkit for data manipulation, analysis, and machine learning.

- **Advanced intellisense**: Python notebook is adopting Pylance as the intellisense engine, together with other Fabric customized language service, aiming to provide state of art coding experience for notebook developers.

- **NotebookUtils & Semantic link**: Powerful API toolkits empower you easily use Fabric and Power BI capabilities with code-first experience. 

- **Rich Visualization Capabilities**: Except for the popular rich dataframe preview 'Table' function and 'Chart' function, we also support popular visualization libraries like Matplotlib, Seaborn, and Plotly. The PowerBIClient also supports these libraries to help users better understanding data patterns and insights. 

- **Common Capabilities for Fabric Notebook**: All the Notebook level features are naturally applicable for Python notebook, such as editing features, AutoSave, collaboration, sharing and permission management, Git integration, import/export, etc. 

- **Full stack Data Science Capabilities**: The advanced low-code toolkit Data Wrangler, the machine learning framework MLFlow, and powerful Copilot are all available on Python notebook.

## How to access Python Notebook

After opening a Fabric Notebook, you can switch to *Python* in the language dropdown menu at **Home** tab and convert the entire notebook set-up to Python. 

   :::image type="content" source="media\use-python-experience-on-notebook\switch-from-notebook-language-menu.png" alt-text="Screenshot showing switch to Python from notebook language menu." lightbox="media\use-python-experience-on-notebook\switch-from-notebook-language-menu.png":::

Most of the common features are supported as a notebook level, you can refer the [How to use Microsoft Fabric notebooks](./how-to-use-notebook.md) and [Develop, execute, and manage Microsoft Fabric notebooks](./author-execute-notebook.md) to learn the detailed usage. Here we list some key capabilities specific for Python scenarios.

## Run Python notebooks

Python notebook supports multiple job execution ways:

- **Interactive run**: You can run a Python notebook interactively like a native Jupyter notebook.
- **Schedule run**: You can use the light-weighted scheduler experience on the notebook settings page to run Python notebook as a batch job.
- **Pipeline run**: You can orchestrate Python notebooks as notebook activities in [Pipeline](../data-factory/notebook-activity.md). Snapshot will be generated after the job execution.
- **Reference run**: You can use `notebookutils.notebook.run()` or `notebookutils.notebook.runMultiple()` to reference run Python notebooks in another Python notebook as batch job. Snapshot will be generated after the reference run finished.
- **Public API run**: You can schedule your python notebook run with the [notebook run public API](notebook-public-api.md#run-a-notebook-on-demand), make sure the language and kernel properties in notebook metadata of the public API payload are set properly.

You can monitor the Python notebook job run details on the ribbon tab **Run** -> **View all runs**.

## Data interaction

You can interact with Lakehouse, Warehouses, SQL endpoints, and built-in resources folders on Python notebook.

 > [!NOTE]
 > - The Python Notebook runtime comes pre-installed with [delta‑rs](https://delta-io.github.io/delta-rs/) and [duckdb](https://duckdb.org/) libraries to support both reading and writing Delta Lake data. However, note that some Delta Lake features may not be fully supported at this time. For more details and the latest updates, kindly refer to the official [delta‑rs](https://github.com/delta-io/delta-rs) and [duckdb](https://duckdb.org/docs/stable/extensions/delta.html) websites.
 > - We currently do not support deltalake(delta-rs) version 1.0.0 or above. Stay tuned.

### Lakehouse interaction

You can set a Lakehouse as the default, or you can also add multiple Lakehouses to explore and use them in notebooks.

If you are not familiar with reading the data objects like *delta table*, try drag and drop the file and delta table to the notebook canvas, or use the *Load data* in the object's dropdown menu. Notebook automatically inserts code snippet into code cell and generating code for reading the target data object.

 > [!NOTE]
 > If you encounter OOM when loading large volume of data, try using DuckDB, Polars or PyArrow dataframe instead of pandas.

You can find the write Lakehouse operation in **Browse code snippet** -> **Write data to delta table**.

   :::image type="content" source="media\use-python-experience-on-notebook\write-data-to-delta-table.png" alt-text="Screenshot showing write lakehouse operation." lightbox="media\use-python-experience-on-notebook\write-data-to-delta-table.png":::

### Warehouse interaction and mix programming with T-SQL

You can add Data Warehouses or SQL endpoints from the Warehouse explorer of Notebook. Similarly, you can drag and drop the tables into the notebook canvas, or use the shortcut operations in the table dropdown menu. Notebook automatically generates code snippet for you. You can use the [`notebookutils.data` utilities](#data-utilities) to establish a connection with Warehouses and query the data using T-SQL statement in the context of Python.

   :::image type="content" source="media\use-python-experience-on-notebook\warehouse-shortcuts.png" alt-text="Screenshot showing warehouse table shortcuts." lightbox="media\use-python-experience-on-notebook\warehouse-shortcuts.png":::

> [!NOTE]
> SQL endpoints are read-only here.

### Notebook resources folder

The [Notebook resources](how-to-use-notebook.md#notebook-resources) built-in resources folder is natively available on Python Notebook. You can easily interact with the files in built-in resources folder using Python code as if you are working with your local file system. Currently, the Environment resource folder is not supported.

## Kernel operations

Python notebook support two built-in kernels right now, they are *Python 3.10* and *Python 3.11*, the default selected kernel is *Python 3.11*. you can easily switch between them.

You can interrupt, restart, or switch kernel on the **Home** tab of the ribbon. Interrupting kernel in Python notebooks is same as canceling cell in Spark notebook.

   :::image type="content" source="media\use-python-experience-on-notebook\kernel-operations.png" alt-text="Screenshot showing kernel operations." lightbox="media\use-python-experience-on-notebook\kernel-operations.png":::

Abnormal kernel exit causes code execution to be interrupted and losing variables, but it doesn't stop the notebook session.  

There are commands that can lead to kernel died. For example, *quit()*, *exit()*.

## Library management

You can use *%pip* and *%conda* commands for inline installations, the commands support both public libraries and customized libraries.  

For customized libraries, you can upload the lib files to the [**Built-in resources**](#notebook-resources-folder) folder. We support multiple types of libraries, including formats such as Wheel (*.whl*), JAR (*.jar*), DLL (*.dll*), and Python (*.py*). Just try drag&drop to the file and the code snippet is generated automatically.

You may need to restart the kernel to use the updated packages.


To better understand and use similar commands clearly, refer to the table below.

| **Command/Syntax** | **Main purpose** | **How it works in Jupyter Notebook** | **Typical use case** | **Notes**|
|---|---|---|---|---|
| ```%pip install package``` | Install Python packages | Runs pip in the notebook’s Python kernel | Recommended way to install packages | In Python Notebook, same as ```!pip```; does **not** restart kernel automatically |
| ```!pip install package``` | Install Python packages via shell | Runs pip as a shell command | Alternative way to install packages | In Python Notebook, same as ```%pip```; does **not** restart kernel automatically |
| ```import sys; sys.exit(0)``` | Restart the notebook kernel | Immediately restarts the kernel | Programmatically restart the kernel | Clears all variables and states; **not recommended** to use directly |
| ```notebookutils.session.restartPython()``` | Restart the notebook kernel | Calls ```sys.exit(0)``` internally | Recommended way to restart the kernel | Official API, safer and more compatible than using ```sys.exit(0)``` directly |


> [!NOTE]
> - In Python Notebook, ```%pip``` and ```!pip``` have the **same behavior**: both install packages into the current kernel’s environment, and neither will automatically restart the kernel after installation.
> - If you need to restart the kernel (for example, after installing certain packages), it is **recommended** to use ```notebookutils.session.restartPython()``` instead of ```import sys; sys.exit(0)```.
>   - ```notebookutils.session.restartPython()``` is an official API that wraps ```sys.exit(0)``` , and it is safer and more compatible in notebook environments.
> - It is **not recommended** to use ```sys.exit(0)``` directly unless necessary.

## Python notebook real-time resource usage monitoring
 
[!INCLUDE [preview-note](../includes/feature-preview-note.md)]
 
With the resource monitor pane, you can track critical runtime information such as session duration, compute type, and real-time resource metrics, including CPU and memory consumption, directly within your notebook. This feature provides an immediate overview of your active session and the resources being used.
 
The resource monitor improves visibility into how Python workloads utilize system resources. It helps you optimize performance, manage costs, and reduce the risk of out-of-memory (OOM) errors. By monitoring metrics in real time, you can identify resource-intensive operations, analyze usage patterns, and make informed decisions about scaling or modifying code.
 
To start using it, set your notebook language to **Python** and start a session. You can then open the monitor either by clicking the compute resources in the notebook status bar or by selecting **View resource usage** from the toolbar. The resource monitor pane will appear automatically, providing an integrated monitoring experience for Python code in Fabric notebooks.
 
   :::image type="content" source="media\use-python-experience-on-notebook\python-resource-usage-monitoring.gif" alt-text="Screenshot showing Python notebook real-time resource usage monitoring." lightbox="media\use-python-experience-on-notebook\python-resource-usage-monitoring.gif":::

## Session configuration magic command

Similar with personalizing a [Spark session configuration](author-execute-notebook.md#spark-session-configuration-magic-command) in notebook, you can also use **%%configure** in Python notebook too. Python notebook supports customizing compute node size, mount points and default lakehouse of the notebook session. They can be used in both interactive notebook and pipeline notebook activities. We recommend using %%configure command at the beginning of your notebook, or you must restart the notebook session to make the settings take effect.

Here are the supported properties in Python notebook **%%configure**:

```JSON
%%configure -f
{
    "vCores": 4, // Recommended values: [4, 8, 16, 32, 64], Fabric will allocate matched memory according to the specified vCores.
    "defaultLakehouse": {  
        // Will overwrites the default lakehouse for current session
        "name": "<lakehouse-name>",
        "id": "<(optional) lakehouse-id>",
        "workspaceId": "<(optional) workspace-id-that-contains-the-lakehouse>" // Add workspace ID if it's from another workspace
    },
    "mountPoints": [
        {
            "mountPoint": "/myMountPoint",
            "source": "abfs[s]://<file_system>@<account_name>.dfs.core.windows.net/<path>"
        },
        {
            "mountPoint": "/myMountPoint1",
            "source": "abfs[s]://<file_system>@<account_name>.dfs.core.windows.net/<path1>"
        },
    ],
}
```

You can view the compute resources update on notebook status bar, and monitor the CPU and Memory usage of the compute node in real-time.

   :::image type="content" source="media\use-python-experience-on-notebook\compute-resources-usage.png" alt-text="Screenshot showing compute resources update." lightbox="media\use-python-experience-on-notebook\compute-resources-usage.png":::

## NotebookUtils

Notebook Utilities (NotebookUtils) is a built-in package to help you easily perform common tasks in Fabric Notebook. It is pre-installed on Python runtime. You can use NotebookUtils to work with file systems, to get environment variables, to chain notebooks together, to access external storage, and to work with secrets.  

You can use ```notebookutils.help()``` to list available APIs and also get help with methods, or referencing the doc [NotebookUtils](notebook-utilities.md).

### Data utilities

> [!NOTE]
> Currently, the feature is in preview.

You can use `notebookutils.data` utilities to establish a connection with provided data source and then read and query data using T-SQL statement.

Run the following command to get an overview of the available methods:

```python
notebookutils.data.help()
```

Output:

```console
Help on module notebookutils.data in notebookutils:

NAME
    notebookutils.data - Utility for read/query data from connected data sources in Fabric

FUNCTIONS
    connect_to_artifact(artifact: str, workspace: str = '', artifact_type: str = '', **kwargs)
        Establishes and returns an ODBC connection to a specified artifact within a workspace 
        for subsequent data queries using T-SQL.
        
        :param artifact: The name or ID of the artifact to connect to.
        :param workspace:  Optional; The workspace in which the provided artifact is located, if not provided,
                             use the workspace where the current notebook is located.
        :param artifactType: Optional; The type of the artifact, Currently supported type are Lakehouse, Warehouse and MirroredDatabase. 
                                If not provided, the method will try to determine the type automatically.
        :param **kwargs Optional: Additional optional configuration. Supported keys include:
            - tds_endpoint : Allow user to specify a custom TDS endpoint to use for connection.
        :return: A connection object to the specified artifact.
        
        :raises UnsupportedArtifactException: If the specified artifact type is not supported to connect.
        :raises ArtifactNotFoundException: If the specified artifact is not found within the workspace.
        
        Examples:
            sql_query = "SELECT DB_NAME()"
            with notebookutils.data.connect_to_artifact("ARTIFACT_NAME_OR_ID", "WORKSPACE_ID", "ARTIFACT_TYPE") as conn:
                df = conn.query(sql_query)
                display(df)
    
    help(method_name: str = '') -> None
        Provides help for the notebookutils.data module or the specified method.
        
        Examples:
        notebookutils.data.help()
        notebookutils.data.help("connect_to_artifact")
        :param method_name: The name of the method to get help with.

DATA
    __all__ = ['help', 'connect_to_artifact']

FILE
    /home/trusted-service-user/jupyter-env/python3.10/lib/python3.10/site-packages/notebookutils/data.py
```

#### Query data from Lakehouse

```python
conn = notebookutils.data.connect_to_artifact("lakehouse_name_or_id", "optional_workspace_id", "optional_lakehouse_type")
df = conn.query("SELECT * FROM sys.schemas;")
```

#### Query data from Warehouse

```python
conn = notebookutils.data.connect_to_artifact("warehouse_name_or_id", "optional_workspace_id", "optional_warehouse_type")
df = conn.query("SELECT * FROM sys.schemas;")
```

#### Query data from SQL database

```python
conn = notebookutils.data.connect_to_artifact("sqldb_name_or_id", "optional_workspace_id", "optional_sqldatabase_type") 
df = conn.query("SELECT * FROM sys.schemas;")
```

> [!NOTE]
> The Data utilities in NotebookUtils are only available on Python notebook for now.

## Browse code snippets

You can find useful python code snippets on **Edit** tab-> **Browse code snippet**, new Python samples are now available. You can learn from the Python code snippet to start exploring the notebook.

   :::image type="content" source="media\use-python-experience-on-notebook\browse-python-code-snippets.png" alt-text="Screenshot showing where to browse python code snippets." lightbox="media\use-python-experience-on-notebook\browse-python-code-snippets.png":::

## Semantic link

Semantic link is a feature that allows you to establish a connection between [semantic models](/power-bi/connect-data/service-datasets-understand) and Synapse Data Science in Microsoft Fabric. It is natively supported on Python notebook. BI engineers and Power BI developers can use Semantic link connect and manage semantic model easily. Read the [public document](../data-science/semantic-link-overview.md) to learn more about Semantic link.

## Visualization

In addition to drawing charts with libraries, the [built-in visualization](notebook-visualization.md) function allows you to turn DataFrames into rich format data visualizations. You can use the *display()* function on dataframes to produce the rich dataframe table view and chart view.

   :::image type="content" source="media\use-python-experience-on-notebook\display-in-python.png" alt-text="Screenshot showing visualization experience in Python notebook." lightbox="media\use-python-experience-on-notebook\display-in-python.png":::

> [!NOTE]
> The chart configurations will be persisted in Python notebook, which means after rerunning the code cell, if the target dataframe schema hasn't change, the saved charts are still persisted.

## Code intelliSense

Python notebook also uses Pylance as the language server. For more information, see [enhance Python Development with Pylance](./author-execute-notebook.md#ide-style-intellisense).

## Data science capabilities

Visit [Data Science documentations in Microsoft Fabric](/fabric/data-science/) to learn more data science and AI experience in Fabric. Here we list a few key data science features that are natively supported on Python notebook.

- **Data Wrangler**: Data Wrangler is a notebook-based tool that provides an immersive interface for exploration data analysis. This feature combines a grid-like data display with dynamic summary statistics, built-in visualizations, and a library of common data cleaning operations. It provides data cleaning, data transformation, and integration, which accelerates data preparation with Data Wrangler.

- **MLflow**: A machine learning experiment is the primary unit of organization and control for all related machine learning runs. A run corresponds to a single execution of model code.

- **Fabric Auto Logging**: Synapse Data Science in Microsoft Fabric includes autologging, which significantly reduces the amount of code required to automatically log the parameters, metrics, and items of a machine learning model during training.  

   Autologging extends MLflow Tracking capabilities. Autologging can capture various metrics, including accuracy, loss, F1 score, and custom metrics you define. By using autologging, developers and data scientists can easily track and compare the performance of different models and experiments without manual tracking.

- **Copilot**: Copilot for Data Science and Data Engineering notebooks is an AI assistant that helps you analyze and visualize data. It works with lakehouse tables, Power BI Datasets, and pandas/spark dataframes, providing answers and code snippets directly in the notebook. You can use the Copilot chat panel and Char-magics in notebook, and the AI provides responses or code to copy into your notebook.

## Known limitations

- Live pool experience is not guaranteed for every python notebook run. The session start time may take up to 3 minutes if the notebook run does not hit the live pool. As Python notebook usage grows, our intelligent pooling methods gradually increase the live pool allocation to meet the demand.

- Environment integration is not available on Python notebook.

- Set session timeout is not available for now.

- Copilot may generate Spark statement, which may not executable in Python notebook.

- Currently, Copilot on Python notebook is not fully supported in several regions. The deployment process is still ongoing stay tuned as we continue to roll out support in more regions.

## Related content

- [How to use Microsoft Fabric notebooks](how-to-use-notebook.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Introduction of Fabric NotebookUtils](notebook-utilities.md)