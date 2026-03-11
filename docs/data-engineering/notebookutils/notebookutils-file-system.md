---
title: NotebookUtils file system utilities for Fabric
description: Use NotebookUtils file system utilities to work with files and directories in Azure Data Lake Storage, Azure Blob Storage, and lakehouse storage.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils file system utilities for Fabric

`notebookutils.fs` provides utilities for working with various file systems, including Azure Data Lake Storage (ADLS) Gen2 and Azure Blob Storage. Make sure you configure access to [Azure Data Lake Storage Gen2](/azure/storage/blobs/data-lake-storage-introduction) and [Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction) appropriately.

Run the following commands for an overview of the available methods:

```python
notebookutils.fs.help()
```

The following table lists the available file system methods:

| Method | Signature | Description |
|---|---|---|
| `ls` | `ls(path: String): Array` | Lists the contents of a directory. |
| `mkdirs` | `mkdirs(path: String): Boolean` | Creates the given directory if it doesn't exist, also creating any necessary parent directories. |
| `cp` | `cp(src: String, dest: String, recurse: Boolean = false): Boolean` | Copies a file or directory, possibly across file systems. |
| `fastcp` | `fastcp(src: String, dest: String, recurse: Boolean = true, extraConfigs: Map = None): Boolean` | Copies a file or directory via azcopy for better performance with large data volumes. |
| `mv` | `mv(src: String, dest: String, create_path: Boolean = false, overwrite: Boolean = false): Boolean` | Moves a file or directory, possibly across file systems. |
| `put` | `put(file: String, content: String, overwrite: Boolean = false): Boolean` | Writes the given string out to a file, encoded in UTF-8. |
| `head` | `head(file: String, max_bytes: int = 1024 * 100): String` | Returns up to the first `max_bytes` bytes of the given file as a String encoded in UTF-8. |
| `append` | `append(file: String, content: String, createFileIfNotExists: Boolean = false): Boolean` | Appends the content to a file. |
| `rm` | `rm(path: String, recurse: Boolean = false): Boolean` | Removes a file or directory. |
| `exists` | `exists(path: String): Boolean` | Checks if a file or directory exists. |
| `getProperties` | `getProperties(path: String): Map` | Gets the properties of the given path. Available in Python notebooks only (not supported in PySpark, Scala, or R). |

> [!NOTE]
> All file system methods are available in Python, PySpark, Scala, and R notebooks unless otherwise noted. Scala uses camelCase parameter names (for example, `createPath` instead of `create_path`, `maxBytes` instead of `max_bytes`).

For mount and unmount operations, see [File mount and unmount](notebookutils-mount.md).

> [!NOTE]
> Keep the following constraints and considerations in mind when you work with `notebookutils.fs`:
>
> - **Path behavior varies by notebook type**: In Spark notebooks, relative paths resolve to the default Lakehouse ABFSS path. In Python notebooks, relative paths resolve to the local file system working directory (`/home/trusted-service-user/work`).
> - **Concurrent write limitations**: `notebookutils.fs.append()` and `notebookutils.fs.put()` don't support concurrent writes to the same file due to a lack of atomicity guarantees.
> - **Append loop delay**: When using `notebookutils.fs.append()` in loops, add 0.5-1 second sleep between writes for data integrity.
> - **OneLake shortcut limitations**: For S3/GCS type shortcuts, use mounted paths instead of ABFS paths for `cp()` and `fastcp()` operations.
> - **Cross-region limitations**: `fastcp()` doesn't support copying files in OneLake across regions. Use `cp()` instead.
> - **Runtime version**: NotebookUtils is designed to work with Spark 3.4 (Runtime v1.2) and above.
> - **`cp()` behavior in Python notebooks**: In Python notebooks, `cp()` internally uses the same azcopy-based mechanism as `fastcp()`, so both methods behave identically.

NotebookUtils works with the file system in the same way as Spark APIs. Take `notebookutils.fs.mkdirs()` and Lakehouse usage for example:

| **Usage** | **Relative path from HDFS root** | **Absolute path for ABFS file system** | **Absolute path for local file system in driver node** |
|---|---|---|---|
| Non-default Lakehouse | Not supported |  `notebookutils.fs.mkdirs("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<new_dir>")` | `notebookutils.fs.mkdirs("file:/<new_dir>")` |
| Default Lakehouse | Directory under 'Files' or 'Tables': `notebookutils.fs.mkdirs("Files/<new_dir>")` | `notebookutils.fs.mkdirs("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<new_dir>")` | `notebookutils.fs.mkdirs("file:/<new_dir>")` |

- For the default Lakehouse, file paths are mounted in your notebook with a default file cache timeout of 120 seconds. This means that files are cached in the notebook's local temporary folder for 120 seconds, even if they're removed from the Lakehouse. If you want to change the timeout rule, you can unmount the default Lakehouse file paths and mount them again with a different `fileCacheTimeout` value.

- For non-default Lakehouse configurations, you can set the appropriate `fileCacheTimeout` parameter during the mounting of the Lakehouse paths. Setting the timeout to 0 ensures that the latest file is fetched from the Lakehouse server.

## List files

To list the content of a directory, use `notebookutils.fs.ls('Your directory path')`. For example:

```python
notebookutils.fs.ls("Files/tmp") # Relative path works with different base paths depending on notebook type
notebookutils.fs.ls("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<path>")  # Absolute path using ABFS file system
notebookutils.fs.ls("file:/tmp")  # Full path of the local file system of driver node
```

The `notebookutils.fs.ls()` API behaves differently when using a relative path, depending on the type of notebook.

- **In a Spark notebook**: The relative path is relative to the default Lakehouse's ABFSS path. For example, `notebookutils.fs.ls("Files")` points to the `Files` directory in the default Lakehouse.

    For example:

    ```python
    notebookutils.fs.ls("Files/sample_datasets/public_holidays.parquet")
    ```

- **In a Python notebook**: The relative path is relative to the local file system's working directory, which by default is `/home/trusted-service-user/work`. Therefore, you should use the full path instead of a relative path `notebookutils.fs.ls("/lakehouse/default/Files")` to access the `Files` directory in the default Lakehouse.

    For example:

    ```python
    notebookutils.fs.ls("/lakehouse/default/Files/sample_datasets/public_holidays.parquet")
    ```

## View file properties

Use `notebookutils.fs.ls()` to inspect file properties such as file name, file path, file size, and whether an item is a file or directory.

```python
files = notebookutils.fs.ls('Your directory path')
for file in files:
    print(file.name, file.isDir, file.isFile, file.path, file.size)
```

Use f-strings if you want more readable output:

```python
files = notebookutils.fs.ls("Files/data")
for file in files:
    print(f"Name: {file.name}, Size: {file.size}, IsDir: {file.isDir}, Path: {file.path}")
```

## Create new directory

Create a directory if it doesn't exist, including any necessary parent directories.

```python
notebookutils.fs.mkdirs('new directory name')  
notebookutils.fs.mkdirs("Files/<new_dir>")  # Works with the default Lakehouse files using relative path 
notebookutils.fs.mkdirs("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<new_dir>")  # Based on ABFS file system 
notebookutils.fs.mkdirs("file:/<new_dir>")  # Based on local file system of driver node 
```

## Copy file

Copy a file or directory across file systems. Set `recurse=True` to copy directories recursively.

```python
notebookutils.fs.cp('source file or directory', 'destination file or directory', recurse=True)
```

> [!NOTE]
>
> **Python notebook note**: In Python notebooks, `cp()` internally uses the same azcopy-based mechanism as `fastcp()`, providing efficient performance for both methods.
> Due to the [limitations of OneLake shortcut](../onelake/onelake-shortcuts.md#limitations-and-considerations), when you need to use `notebookutils.fs.cp()` to copy data from S3/GCS type shortcut, it's recommended to use a mounted path instead of an abfss path.

> [!TIP]
> Always check the Boolean return value to verify whether the operation succeeded. Use `notebookutils.fs.exists()` to verify the source path before you start a copy operation.

The following example shows a cross-storage copy from the default Lakehouse to an ADLS Gen2 account:

```python
notebookutils.fs.cp(
    "Files/local_data",
    "abfss://<container>@<account>.dfs.core.windows.net/remote_data",
    recurse=True
)
```

## Performant copy file

Use `fastcp` for more efficient copy operations, especially with large data volumes. The `recurse` parameter defaults to `True`.

```python
notebookutils.fs.fastcp('source file or directory', 'destination file or directory', recurse=True)
```

> [!TIP]
> Use `fastcp()` instead of `cp()` for large data transfers. The `fastcp` method uses azcopy under the hood, which provides significantly better throughput for bulk file operations. In Python notebooks, both `cp()` and `fastcp()` use the same underlying mechanism.

Keep these considerations in mind:

- `notebookutils.fs.fastcp()` doesn't support copying files in OneLake across regions. In this case, you can use `notebookutils.fs.cp()` instead.
- Due to the [limitations of OneLake shortcut](../onelake/onelake-shortcuts.md#limitations-and-considerations), when you need to use `notebookutils.fs.fastcp()` to copy data from S3/GCS type shortcut, it's recommended to use a mounted path instead of an abfss path.

## Preview file content

Return up to the first `max_bytes` bytes of a file as a UTF-8 string.

```python
notebookutils.fs.head('file path', max_bytes)
```

> [!TIP]
> For large files, use `head()` with an appropriate `max_bytes` value to avoid memory issues. The default value is 100 KB (`1024 * 100`).

The following example reads the first 1,000 bytes of a file:

```python
content = notebookutils.fs.head("Files/data/sample.txt", 1000)
print(content)
```

> [!NOTE]
> The default value for `max_bytes` differs across languages: Python and Scala notebooks use `102400` (100 KB), while R notebooks use `65535` (64 KB). In Scala, this parameter is named `maxBytes`.

## Move file

Move a file or directory across file systems.

```python
notebookutils.fs.mv('source file or directory', 'destination directory', create_path=True, overwrite=True)
```

> [!IMPORTANT]
> The `create_path` parameter default varies by runtime:
>
> - **Spark notebooks** (PySpark, Scala, R): defaults to `False` (`false` in Scala, `FALSE` in R). The parent directory must exist before the move operation.
> - **Python notebooks**: defaults to `True`. The parent directory is automatically created if it doesn't exist.
>
> To ensure consistent behavior across runtimes, explicitly set the `create_path` parameter in your code. In Scala, this parameter is named `createPath`.

Use named parameters if you want clearer code:

```python
notebookutils.fs.mv("Files/source.csv", "Files/new_folder/dest.csv", create_path=True, overwrite=True)
```

## Write file

Write a UTF-8 string to a file.

```python
notebookutils.fs.put("file path", "content to write", True) # Set the last parameter as True to overwrite the file if it already exists
```

## Append content to a file

Append a UTF-8 string to a file.

```python
notebookutils.fs.append("file path", "content to append", True) # Set the last parameter as True to create the file if it doesn't exist
```

> [!IMPORTANT]
> `notebookutils.fs.append()` and `notebookutils.fs.put()` don't support concurrent writing to the same file due to a lack of atomicity guarantees.

When using the `notebookutils.fs.append` API in a `for` loop to write to the same file, add a `sleep` statement of about 0.5 to 1 second between the recurring writes. This recommendation is because the `notebookutils.fs.append` API's internal `flush` operation is asynchronous, so a short delay helps ensure data integrity.

```python
import time

for i in range(100):
    notebookutils.fs.append("Files/output/data.txt", f"Line {i}\n", True)
    time.sleep(0.5)  # Prevent data integrity issues
```

## Delete file or directory

Remove a file or directory. Set `recurse=True` to remove directories recursively.

```python
notebookutils.fs.rm('file path', recurse=True) 
```

## Check if a file or directory exists

Check whether a file or directory exists at the specified path. It returns `True` if the path exists; otherwise, it returns `False`.

```python
notebookutils.fs.exists("Files/data/input.csv")
```

> [!TIP]
> Use `exists()` before performing file operations to prevent errors. For example, check that a source file exists before you try to copy or move it.

```python
if notebookutils.fs.exists("Files/data/input.csv"):
    notebookutils.fs.cp("Files/data/input.csv", "Files/backup/input.csv")
    print("File copied successfully.")
else:
    print("Source file not found.")
```

## Get file properties

Get properties for a path as a map of name-value pairs. It's only supported for Azure Blob Storage paths.

> [!NOTE]
> The `getProperties` method is available only in Python notebooks. It isn't supported in Spark notebooks (PySpark, Scala, or R).

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `path` | String | Yes | ABFS path to the file or directory. |

**Returns:** A dictionary (map) containing metadata properties such as file size, creation time, last modified time, and content type.

```python
properties = notebookutils.fs.getProperties("abfss://<container_name>@<storage_account_name>.dfs.core.windows.net/<path>")
print(properties)
```

## Related content

- [NotebookUtils overview](../notebook-utilities.md)
- [Mount and unmount storage with NotebookUtils](notebookutils-mount.md)
