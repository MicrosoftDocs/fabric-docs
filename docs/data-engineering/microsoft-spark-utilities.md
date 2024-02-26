---
title: Microsoft Spark Utilities (MSSparkUtils) for Fabric
description: Use Microsoft Spark Utilities, a built-in package, to work with file systems, get environment variables, chain notebooks together, and work with secrets.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.search.form: Microsoft Spark utilities
ms.date: 11/15/2023
---

# Microsoft Spark Utilities (MSSparkUtils) for Fabric

Microsoft Spark Utilities (MSSparkUtils) is a built-in package to help you easily perform common tasks. You can use MSSparkUtils to work with file systems, to get environment variables, to chain notebooks together, and to work with secrets. The MSSparkUtils package is available in PySpark (Python) Scala, SparkR notebooks, and Fabric pipelines.

## File system utilities

*mssparkutils.fs* provides utilities for working with various file systems, including Azure Data Lake Storage (ADLS) Gen2 and Azure Blob Storage. Make sure you configure access to [Azure Data Lake Storage Gen2](/azure/storage/blobs/data-lake-storage-introduction) and [Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction) appropriately.

Run the following commands for an overview of the available methods:

```python
from notebookutils import mssparkutils
mssparkutils.fs.help()
```

**Output**

```console
mssparkutils.fs provides utilities for working with various FileSystems.

Below is overview about the available methods:

cp(from: String, to: String, recurse: Boolean = false): Boolean -> Copies a file or directory, possibly across FileSystems
mv(from: String, to: String, recurse: Boolean = false): Boolean -> Moves a file or directory, possibly across FileSystems
ls(dir: String): Array -> Lists the contents of a directory
mkdirs(dir: String): Boolean -> Creates the given directory if it does not exist, also creating any necessary parent directories
put(file: String, contents: String, overwrite: Boolean = false): Boolean -> Writes the given String out to a file, encoded in UTF-8
head(file: String, maxBytes: int = 1024 * 100): String -> Returns up to the first 'maxBytes' bytes of the given file as a String encoded in UTF-8
append(file: String, content: String, createFileIfNotExists: Boolean): Boolean -> Append the content to a file
rm(dir: String, recurse: Boolean = false): Boolean -> Removes a file or directory
exists(file: String): Boolean -> Check if a file or directory exists
mount(source: String, mountPoint: String, extraConfigs: Map[String, Any]): Boolean -> Mounts the given remote storage directory at the given mount point
unmount(mountPoint: String): Boolean -> Deletes a mount point
mounts(): Array[MountPointInfo] -> Show information about what is mounted
getMountPath(mountPoint: String, scope: String = ""): String -> Gets the local path of the mount point

Use mssparkutils.fs.help("methodName") for more info about a method.
```

MSSparkUtils works with the file system in the same way as Spark APIs. Take *mssparkuitls.fs.mkdirs()* and Fabric lakehouse usage for example:

| **Usage** | **Relative path from HDFS root** | **Absolute path for ABFS file system** |**Absolute path for local file system in driver node** |
|---|---|---|---|
| Nondefault lakehouse | Not supported | *mssparkutils.fs.mkdirs("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<new_dir>")* | *mssparkutils.fs.mkdirs("file:/<new_dir>")* |
| Default lakehouse | Directory under “Files” or “Tables”: *mssparkutils.fs.mkdirs("Files/<new_dir>")* | *mssparkutils.fs.mkdirs("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<new_dir>")* |*mssparkutils.fs.mkdirs("file:/<new_dir>")*|

### List files

To list the content of a directory, use *mssparkutils.fs.ls('Your directory path')*. For example:

```python
mssparkutils.fs.ls("Files/tmp") # works with the default lakehouse files using relative path 
mssparkutils.fs.ls("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<path>")  # based on ABFS file system 
mssparkutils.fs.ls("file:/tmp")  # based on local file system of driver node 
```

### View file properties

This method returns file properties including file name, file path, file size, and whether it's a directory and a file.

```python
files = mssparkutils.fs.ls('Your directory path')
for file in files:
    print(file.name, file.isDir, file.isFile, file.path, file.size)
```

### Create new directory

This method creates the given directory if it doesn't exist, and creates any necessary parent directories.

```python
mssparkutils.fs.mkdirs('new directory name')  
mssparkutils.fs. mkdirs("Files/<new_dir>")  # works with the default lakehouse files using relative path 
mssparkutils.fs.ls("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<new_dir>")  # based on ABFS file system 
mssparkutils.fs.ls("file:/<new_dir>")  # based on local file system of driver node 
```

### Copy file

This method copies a file or directory, and supports copy activity across file systems.

```python
mssparkutils.fs.cp('source file or directory', 'destination file or directory', True)# Set the third parameter as True to copy all files and directories recursively
```

### Performant copy file

This method provides a faster way of copying or moving files, especially large volumes of data.

```python
mssparkutils.fs.fastcp('source file or directory', 'destination file or directory', True)# Set the third parameter as True to copy all files and directories recursively
```

### Preview file content

This method returns up to the first 'maxBytes' bytes of the given file as a String encoded in UTF-8.

```python
mssparkutils.fs.head('file path', maxBytes to read)
```

### Move file

This method moves a file or directory, and supports moves across file systems.

```python
mssparkutils.fs.mv('source file or directory', 'destination directory', True) # Set the last parameter as True to firstly create the parent directory if it does not exist
```

### Write file

This method writes the given string out to a file, encoded in UTF-8.

```python
mssparkutils.fs.put("file path", "content to write", True) # Set the last parameter as True to overwrite the file if it existed already
```

### Append content to a file

This method appends the given string to a file, encoded in UTF-8.

```python
mssparkutils.fs.append("file path", "content to append", True) # Set the last parameter as True to create the file if it does not exist
```

### Delete file or directory

This method removes a file or directory.

```python
mssparkutils.fs.rm('file path', True) # Set the last parameter as True to remove all files and directories recursively
```

### Mount/unmount directory

Find  more information about detailed usage in [File mount and unmount](#file-mount-and-unmount).

## Notebook utilities

Use the MSSparkUtils Notebook Utilities to run a notebook or exit a notebook with a value. Run the following command to get an overview of the available methods:

```python
mssparkutils.notebook.help()
```

**Output:**

```console

exit(value: String): void -> This method lets you exit a notebook with a value.
run(path: String, timeoutSeconds: int, arguments: Map): String -> This method runs a notebook and returns its exit value.
```

> [!NOTE]
> Notebook utilities aren't applicable for Apache Spark job definitions (SJD).

### Reference a notebook

This method references a notebook and returns its exit value. You can run nesting function calls in a notebook interactively or in a pipeline. The notebook being referenced runs on the Spark pool of the notebook that calls this function.

```python
mssparkutils.notebook.run("notebook name", <timeoutSeconds>, <parameterMap>)
```

For example:

```python
mssparkutils.notebook.run("Sample1", 90, {"input": 20 })
```

You can open the snapshot link of the reference run in the cell output. The snapshot captures the code run results and allows you to easily debug a reference run.

:::image type="content" source="media\microsoft-spark-utilities\reference-run.png" alt-text="Screenshot of reference run result." lightbox="media\microsoft-spark-utilities\reference-run.png":::

:::image type="content" source="media\microsoft-spark-utilities\run-snapshot.png" alt-text="Screenshot of a snapshot example." lightbox="media\microsoft-spark-utilities\run-snapshot.png":::

> [!NOTE]
>
> - Currently, Fabric notebook only supports referencing notebooks within a workspace.
> - If you use the files under [Notebook Resource](how-to-use-notebook.md#notebook-resources), use `mssparkutils.nbResPath` in the referenced notebook to make sure it points to the same folder as the interactive run.

### Reference run multiple notebooks in parallel

The method `mssparkutils.notebook.runMultiple()` allows you to run multiple notebooks in parallel or with a predefined topological structure. The API is using a multi-thread implementation mechanism within a spark session, which means the compute resources are shared by the reference notebook runs.

With `mssparkutils.notebook.runMultiple()`, you can:

- Execute multiple notebooks simultaneously, without waiting for each one to finish.

- Specify the dependencies and order of execution for your notebooks, using a simple JSON format.

- Optimize the use of Spark compute resources and reduce the cost of your Fabric projects.

- View the Snapshots of each notebook run record in the output, and debug/monitor your notebook tasks conveniently.

- Get the exit value of each executive activity and use them in downstream tasks.

You can also try to run the mssparkutils.notebook.help("runMultiple") to find the example and detailed usage.

Here's a simple example of running a list of notebooks in parallel using this method:

```python

mssparkutils.notebook.runMultiple(["NotebookSimple", "NotebookSimple2"])

```

The execution result from the root notebook is as follows:

:::image type="content" source="media\microsoft-spark-utilities\reference-notebook-list.png" alt-text="Screenshot of reference a list of notebooks." lightbox="media\microsoft-spark-utilities\reference-notebook-list.png":::

The following is an example of running notebooks with topological structure using `mssparkutils.notebook.runMultiple()`. Use this method to easily orchestrate notebooks through a code experience.

```python
# run multiple notebooks with parameters
DAG = {
    "activities": [
        {
            "name": "NotebookSimple", # activity name, must be unique
            "path": "NotebookSimple", # notebook path
            "timeoutPerCellInSeconds": 90, # max timeout for each cell, default to 90 seconds
            "args": {"p1": "changed value", "p2": 100}, # notebook parameters
        },
        {
            "name": "NotebookSimple2",
            "path": "NotebookSimple2",
            "timeoutPerCellInSeconds": 120,
            "args": {"p1": "changed value 2", "p2": 200}
        },
        {
            "name": "NotebookSimple2.2",
            "path": "NotebookSimple2",
            "timeoutPerCellInSeconds": 120,
            "args": {"p1": "changed value 3", "p2": 300},
            "retry": 1,
            "retryIntervalInSeconds": 10,
            "dependencies": ["NotebookSimple"] # list of activity names that this activity depends on
        }
    ]
}
mssparkutils.notebook.runMultiple(DAG)

```

> [!NOTE]
> The parallelism degree of the multiple notebook run is restricted to the total available compute resource of a Spark session.

### Exit a notebook

This method exits a notebook with a value. You can run nesting function calls in a notebook interactively or in a pipeline.

- When you call an *exit()* function from a notebook interactively, the Fabric notebook throws an exception, skips running subsequent cells, and keeps the Spark session alive.

- When you orchestrate a notebook in a pipeline that calls an *exit()* function, the notebook activity returns with an exit value, completes the pipeline run, and stops the Spark session.

- When you call an *exit()* function in a notebook that is being referenced, Fabric Spark will stop the further execution of the referenced notebook, and continue to run the next cells in the main notebook that calls the *run()* function. For example: Notebook1 has three cells and calls an *exit()* function in the second cell. Notebook2 has five cells and calls *run(notebook1)* in the third cell. When you run Notebook2, Notebook1 stops at the second cell when hitting the *exit()* function. Notebook2 continues to run its fourth cell and fifth cell.

```python
mssparkutils.notebook.exit("value string")
```

For example:

**Sample1** notebook with following two cells:

- Cell 1 defines an **input** parameter with default value set to 10.

- Cell 2 exits the notebook with **input** as exit value.

:::image type="content" source="media\microsoft-spark-utilities\input-exit-value.png" alt-text="Screenshot showing a sample notebook of exit function." lightbox="media\microsoft-spark-utilities\input-exit-value.png":::

You can run the **Sample1** in another notebook with default values:

```python
exitVal = mssparkutils.notebook.run("Sample1")
print (exitVal)
```

**Output:**

```console
Notebook executed successfully with exit value 10
```

You can run the **Sample1** in another notebook and set the **input** value as 20:

```python
exitVal = mssparkutils.notebook.run("Sample1", 90, {"input": 20 })
print (exitVal)
```

**Output:**

```console
Notebook executed successfully with exit value 20
```
<!---
## Session management

### Stop an interactive session

Instead of manually selecting stop, sometimes it's more convenient to stop an interactive session by calling an API in the code. For such cases, we provide an API *mssparkutils.session.stop()* to support stopping the interactive session via code. It's available for Scala and Python.

```python
mssparkutils.session.stop()
```

The *mssparkutils.session.stop()* API stops the current interactive session asynchronously in the background. It stops the Spark session and release resources occupied by the session so they're available to other sessions in the same pool.

> [!NOTE]
> We don't recommend calling language built-in APIs like *sys.exit* in Scala or *sys.exit()* in Python in your code, because such APIs kill the interpreter process, leaving the Spark session alive and the resources not released.
--->

## Credentials utilities

You can use the MSSparkUtils Credentials Utilities to get access tokens and manage secrets in an Azure Key Vault.

Run the following command to get an overview of the available methods:

```python
mssparkutils.credentials.help()
```

**Output:**

```console
getToken(audience, name): returns AAD token for a given audience, name (optional)
getSecret(keyvault_endpoint, secret_name): returns secret for a given Key Vault and secret name
```

### Get token

getToken returns a Microsoft Entra token for a given audience and name (optional). The following list shows the currently available audience keys:

- **Storage Audience Resource**: "storage"
- **Power BI Resource**: "pbi"
- **Azure Key Vault Resource**: "keyvault"
- **Synapse RTA KQL DB Resource**: "kusto"

Run the following command to get the token:

```python
mssparkutils.credentials.getToken('audience Key')
```

### Get secret using user credentials

getSecret returns an Azure Key Vault secret for a given Azure Key Vault endpoint and secret name using user credentials.

```python
mssparkutils.credentials.getSecret('https://<name>.vault.azure.net/', 'secret name')
```

## File mount and unmount

Fabric supports the following mount scenarios in the Microsoft Spark Utilities package. You can use the *mount*, *unmount*, *getMountPath()*, and *mounts()* APIs to attach remote storage (ADLS Gen2) to all working nodes (driver node and worker nodes). After the storage mount point is in place, use the local file API to access data as if it's stored in the local file system.

### How to mount an ADLS Gen2 account

The following example illustrates how to mount Azure Data Lake Storage Gen2. Mounting Blob Storage works similarly.

This example assumes that you have one Data Lake Storage Gen2 account named *storegen2*, and the account has one container named *mycontainer* that you want to mount to */test* into your notebook Spark session.

:::image type="content" source="media\microsoft-spark-utilities\mount-container-example.png" alt-text="Screenshot showing where to select a container to mount." lightbox="media\microsoft-spark-utilities\mount-container-example.png":::

To mount the container called *mycontainer*, *mssparkutils* first needs to check whether you have the permission to access the container. Currently, Fabric supports two authentication methods for the trigger mount operation: *accountKey* and *sastoken*.

### Mount via shared access signature token or account key

MSSparkUtils supports explicitly passing an account key or [Shared access signature (SAS)](/azure/storage/common/storage-sas-overview) token as a parameter to mount the target.

For security reasons, we recommend that you store account keys or SAS tokens in Azure Key Vault (as the following screenshot shows). You can then retrieve them by using the *mssparkutils.credentials.getSecret* API. For more information about Azure Key Vault, see [About Azure Key Vault managed storage account keys](/azure/key-vault/secrets/about-managed-storage-account-keys).

:::image type="content" source="media\microsoft-spark-utilities\use-azure-key-vault.png" alt-text="Screenshot showing where secrets are stored in an Azure Key Vault." lightbox="media\microsoft-spark-utilities\use-azure-key-vault.png":::

Sample code for the *accountKey* method:

```python
from notebookutils import mssparkutils  
# get access token for keyvault resource
# you can also use full audience here like https://vault.azure.net
accountKey = mssparkutils.credentials.getSecret("<vaultURI>", "<secretName>")
mssparkutils.fs.mount(  
    "abfss://mycontainer@<accountname>.dfs.core.windows.net",  
    "/test",  
    {"accountKey":accountKey}
)
```

Sample code for *sastoken*:

```python
from notebookutils import mssparkutils  
# get access token for keyvault resource
# you can also use full audience here like https://vault.azure.net
sasToken = mssparkutils.credentials.getSecret("<vaultURI>", "<secretName>")
mssparkutils.fs.mount(  
    "abfss://mycontainer@<accountname>.dfs.core.windows.net",  
    "/test",  
    {"sasToken":sasToken}
)
```

> [!NOTE]
> You might need to import `mssparkutils` if it's not available:
>
> ```python
> from notebookutils import mssparkutils
> ```
>
> Mount parameters:
>
> - fileCacheTimeout: Blobs will be cached in the local temp folder for 120 seconds by default. During this time, blobfuse will not check whether the file is up to date or not. The parameter could be set to change the default timeout time. When multiple clients modify files at the same time, in order to avoid inconsistencies between local and remote files, we recommend shortening the cache time, or even changing it to 0, and always getting the latest files from the server.
> - timeout: The mount operation timeout is 120 seconds by default. The parameter could be set to change the default timeout time. When there are too many executors or when mount times out, we recommend increasing the value.
>
> You can use these parameters like this:
>
> ```python
> mssparkutils.fs.mount(
>    "abfss://mycontainer@<accountname>.dfs.core.windows.net",
>    "/test",
>    {"fileCacheTimeout": 120, "timeout": 120}
> )
> ```
>
> For security reasons, we recommended you don't store credentials in code. To further protect your credentials, we will redact your secret in notebook output. For more information, see [Secret redaction](author-execute-notebook.md#secret-redaction).

### How to mount a lakehouse

Sample code for mounting a lakehouse to */test*:

```python
from notebookutils import mssparkutils 
mssparkutils.fs.mount( 
 "abfss://<workspace_id>@msit-onelake.dfs.fabric.microsoft.com/<lakehouse_id>", 
 "/test"
)
```

### Access files under the mount point by using the *mssparktuils fs* API

The main purpose of the mount operation is to let customers access the data stored in a remote storage account with a local file system API. You can also access the data by using the *mssparkutils fs* API with a mounted path as a parameter. This path format is a little different.

Assume that you mounted the Data Lake Storage Gen2 container *mycontainer* to */test* by using the mount API. When you access the data with a local file system API, the path format is like this:

```python
/synfs/notebook/{sessionId}/test/{filename}
```

When you want to access the data by using the mssparkutils fs API, we recommend using *getMountPath()* to get the accurate path:

```python
path = mssparkutils.fs.getMountPath("/test")
```

- List directories:

   ```python
   mssparkutils.fs.ls(f"file://{mssparkutils.fs.getMountPath('/test')}")
   ```

- Read file content:

   ```python
   mssparkutils.fs.head(f"file://{mssparkutils.fs.getMountPath('/test')}/myFile.txt")
   ```

- Create a directory:

   ```python
   mssparkutils.fs.mkdirs(f"file://{mssparkutils.fs.getMountPath('/test')}/newdir")
   ```

### Access files under the mount point via local path

You can easily read and write the files in mount point using the standard file system. Here's a Python example:

```python
#File read
with open(mssparkutils.fs.getMountPath('/test2') + "/myFile.txt", "r") as f:
    print(f.read())
#File write
with open(mssparkutils.fs.getMountPath('/test2') + "/myFile.txt", "w") as f:
    print(f.write("dummy data"))
```

### How to check existing mount points

You can use *mssparkutils.fs.mounts()* API to check all existing mount point info:

```python
mssparkutils.fs.mounts()
```

### How to unmount the mount point

Use the following code to unmount your mount point *(/test* in this example):

```python
mssparkutils.fs.unmount("/test")
```

### Known limitations

- The current mount is a job level configuration; we recommend you use the *mounts* API to check if a mount point exists or isn't available.

- The unmount mechanism isn't automatic. When the application run finishes, to unmount the mount point and release the disk space, you need to explicitly call an unmount API in your code. Otherwise, the mount point will still exist in the node after the application run finishes.

- Mounting an ADLS Gen1 storage account isn't supported.


## Lakehouse utilities

`mssparkutils.lakehouse` provides utilities specifically tailored for managing Lakehouse artifacts. These utilities empower users to create, retrieve, update, and delete Lakehouse artifacts effortlessly.

### Overview of Methods

Below is an overview of the available methods provided by `mssparkutils.lakehouse`:

```python
# Create a new Lakehouse artifact
create(name: String, description: String = "", workspaceId: String = ""): Artifact

# Retrieve a Lakehouse artifact
get(name: String, workspaceId: String = ""): Artifact

# Update an existing Lakehouse artifact
update(name: String, newName: String, description: String = "", workspaceId: String = ""): Artifact

# Delete a Lakehouse artifact
delete(name: String, workspaceId: String = ""): Boolean

# List all Lakehouse artifacts
list(workspaceId: String = ""): Array[Artifact]
```

### Usage Examples

To utilize these methods effectively, consider the following usage examples:

#### Creating a Lakehouse Artifact

```python
artifact = mssparkutils.lakehouse.create("artifact_name", "Description of the artifact", "optional_workspace_id")
```

#### Retrieving a Lakehouse Artifact
```python
artifact = mssparkutils.lakehouse.get("artifact_name", "optional_workspace_id")
```

#### Updating a Lakehouse Artifact
```python
updated_artifact = mssparkutils.lakehouse.update("old_name", "new_name", "Updated description", "optional_workspace_id")
```

#### Deleting a Lakehouse Artifact
```python
is_deleted = mssparkutils.lakehouse.delete("artifact_name", "optional_workspace_id")
```

#### Listing Lakehouse Artifacts
```python
artifacts_list = mssparkutils.lakehouse.list("optional_workspace_id")
```

### Additional Information

For more detailed information about each method and its parameters, utilize the `mssparkutils.lakehouse.help("methodName")` function.

With MSSparkUtils' Lakehouse utilities, managing your Lakehouse artifacts becomes more efficient and integrated into your Fabric pipelines, enhancing your overall data management experience.

Feel free to explore these utilities and incorporate them into your Fabric workflows for seamless Lakehouse artifact management.

## Related content

- [Library management](library-management.md)
