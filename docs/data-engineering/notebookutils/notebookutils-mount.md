---
title: NotebookUtils file mount and unmount for Fabric
description: Use NotebookUtils mount and unmount utilities to attach remote storage to Spark nodes in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
---

# NotebookUtils file mount and unmount for Fabric

NotebookUtils supports file mount and unmount operations through the Microsoft Spark Utilities package. You can use the `mount`, `unmount`, `getMountPath()`, and `mounts()` APIs to attach remote storage (ADLS Gen2, Azure Blob Storage, OneLake) to all working nodes (driver node and worker nodes). After the storage mount point is in place, use the local file API to access data as if it's stored in the local file system.

Mount operations are particularly useful when you:

- Work with libraries that expect local file paths.
- Need consistent file system semantics across cloud storage.
- Access OneLake shortcuts (S3/GCS) efficiently.
- Build portable code that works with multiple storage backends.

## API reference

The following table summarizes the available mount APIs:

| Method | Signature | Description |
|---|---|---|
| `mount` | `mount(source: String, mountPoint: String, extraConfigs: Map[String, Any] = None): Boolean` | Mounts remote storage at the specified mount point. |
| `unmount` | `unmount(mountPoint: String, extraConfigs: Map[String, Any] = None): Boolean` | Unmounts and removes a mount point. |
| `mounts` | `mounts(extraOptions: Map[String, Any] = None): Array[MountPointInfo]` | Lists all existing mount points with details. |
| `getMountPath` | `getMountPath(mountPoint: String, scope: String = ""): String` | Gets the local file system path for a mount point. |

## Authentication methods

Mount operations support several authentication methods. Choose the method based on your storage type and security requirements.

### Microsoft Entra token (default and recommended)

Microsoft Entra token authentication uses the identity of the notebook executor (user or service principal). It doesn't require any explicit credentials in the mount call, making it the most secure option. This method is required for Lakehouse mounting and works seamlessly with Fabric workspace storage.

```python
# Mount using Microsoft Entra token (no credentials needed)
notebookutils.fs.mount(
    "abfss://mycontainer@mystorageaccount.dfs.core.windows.net",
    "/mydata"
)
```

> [!TIP]
> Use Microsoft Entra token authentication whenever possible. It eliminates credential exposure risk and requires no additional setup for Fabric workspace storage.

### Account key

Use an account key when the storage account doesn't support Microsoft Entra authentication, or when you access external or third-party storage. Store account keys in Azure Key Vault and retrieve them with the `notebookutils.credentials.getSecret` API.

```python
# Retrieve account key from Azure Key Vault
accountKey = notebookutils.credentials.getSecret("<vaultURI>", "<secretName>")
notebookutils.fs.mount(
    "abfss://mycontainer@<accountname>.dfs.core.windows.net",
    "/test",
    {"accountKey": accountKey}
)
```

### Shared access signature (SAS) token

Use a [shared access signature (SAS)](/azure/storage/common/storage-sas-overview) token for time-limited, permission-scoped access. This method is useful for granting temporary access to external parties. Store SAS tokens in Azure Key Vault for security.

```python
# Retrieve SAS token from Azure Key Vault
sasToken = notebookutils.credentials.getSecret("<vaultURI>", "<secretName>")
notebookutils.fs.mount(
    "abfss://mycontainer@<accountname>.dfs.core.windows.net",
    "/test",
    {"sasToken": sasToken}
)
```

> [!IMPORTANT]
> For security purposes, avoid embedding credentials directly in code. Any secrets displayed in notebook outputs are automatically redacted. For more information, see [Secret redaction](../author-execute-notebook.md#secret-redaction).

## Mount an ADLS Gen2 account

The following example illustrates how to mount Azure Data Lake Storage Gen2. Mounting Blob Storage and Azure File Share works similarly.

This example assumes that you have one Data Lake Storage Gen2 account named *storegen2*, which has a container named *mycontainer* that you want to mount to */test* in your notebook Spark session.

:::image type="content" source="../media/notebook-utilities/mount-container-example.png" alt-text="Screenshot showing where to select a container to mount." lightbox="../media/notebook-utilities/mount-container-example.png":::

To mount the container called *mycontainer*, NotebookUtils first needs to check whether you have the permission to access the container. Currently, Fabric supports three authentication methods for the trigger mount operation: *Microsoft Entra token* (default), *accountKey*, and *sastoken*.

For security reasons, store account keys or SAS tokens in Azure Key Vault (as the following screenshot shows). You can then retrieve them by using the `notebookutils.credentials.getSecret` API. For more information about Azure Key Vault, see [About Azure Key Vault managed storage account keys](/azure/key-vault/secrets/about-managed-storage-account-keys).

:::image type="content" source="../media/notebook-utilities/use-azure-key-vault.png" alt-text="Screenshot showing where secrets are stored in an Azure Key Vault." lightbox="../media/notebook-utilities/use-azure-key-vault.png":::

Sample code for the *accountKey* method:

```python
# get access token for keyvault resource
# you can also use full audience here like https://vault.azure.net
accountKey = notebookutils.credentials.getSecret("<vaultURI>", "<secretName>")
notebookutils.fs.mount(  
    "abfss://mycontainer@<accountname>.dfs.core.windows.net",  
    "/test",  
    {"accountKey":accountKey}
)
```

Sample code for *sastoken*:

```python
# get access token for keyvault resource
# you can also use full audience here like https://vault.azure.net
sasToken = notebookutils.credentials.getSecret("<vaultURI>", "<secretName>")
notebookutils.fs.mount(  
    "abfss://mycontainer@<accountname>.dfs.core.windows.net",  
    "/test",  
    {"sasToken":sasToken}
)
```

## Mount parameters

You can tune mount behavior with the following optional parameters in the `extraConfigs` map:

- **fileCacheTimeout**: Blobs are cached in the local temp folder for 120 seconds by default. During this time, blobfuse doesn't check whether the file is up to date. You can set this parameter to change the default timeout time. When multiple clients modify files at the same time, to avoid inconsistencies between local and remote files, shorten the cache time or set it to 0 to always get the latest files from the server.
- **timeout**: The mount operation timeout is 120 seconds by default. You can set this parameter to change the default timeout time. When there are too many executors or when mount times out, increase the value.

You can use these parameters like this:

```python
notebookutils.fs.mount(
   "abfss://mycontainer@<accountname>.dfs.core.windows.net",
   "/test",
   {"fileCacheTimeout": 120, "timeout": 120}
)
```

### Cache configuration recommendations

Choose a cache timeout value based on your access pattern:

| Scenario | Recommended `fileCacheTimeout` | Notes |
|---|---|---|
| Read-heavy, single client | `120` (default) | Good balance of performance and freshness. |
| Moderate multi-client access | `30`–`60` | Reduces risk of stale data. |
| Multiple clients modifying files | `0` | Always fetches the latest from the server. |
| Files rarely change | `300`+ | Optimizes read performance. |

#### Zero-cache pattern

When multiple clients modify files simultaneously, use a zero-cache configuration to always fetch the latest version from the server:

```python
# For scenarios with multiple clients modifying files
notebookutils.fs.mount(
    "abfss://shared@account.dfs.core.windows.net",
    "/shared_data",
    {"fileCacheTimeout": 0}
)
```

> [!NOTE]
> Increase the `timeout` parameter when mounting with many executors or when you experience timeout errors.

## Mount a Lakehouse

Lakehouse mounting only supports Microsoft Entra token authentication. Sample code for mounting a Lakehouse to */<mount_name>*:

```python
notebookutils.fs.mount( 
 "abfss://<workspace_name>@onelake.dfs.fabric.microsoft.com/<lakehouse_name>.Lakehouse", 
 "/<mount_name>"
)
```

## Access files under the mount point by using the notebookutils fs API

The main purpose of the mount operation is to let you access the data stored in a remote storage account with a local file system API. You can also access the data by using the `notebookutils fs` API with a mounted path as a parameter. This path format is a little different.

Assume that you mounted the Data Lake Storage Gen2 container *mycontainer* to */test* by using the mount API. When you access the data with a local file system API, the path format is like this:

```python
/synfs/notebook/{sessionId}/test/{filename}
```

When you want to access the data by using the `notebookutils fs` API, use `getMountPath()` to get the accurate path:

```python
path = notebookutils.fs.getMountPath("/test")
```

- List directories:

   ```python
   notebookutils.fs.ls(f"file://{notebookutils.fs.getMountPath('/test')}")
   ```

- Read file content:

   ```python
   notebookutils.fs.head(f"file://{notebookutils.fs.getMountPath('/test')}/myFile.txt")
   ```

- Create a directory:

   ```python
   notebookutils.fs.mkdirs(f"file://{notebookutils.fs.getMountPath('/test')}/newdir")
   ```

## Access files under the mount point via local path

You can read and write the files in a mount point by using the standard file system. Here's a Python example:

```python
#File read
with open(notebookutils.fs.getMountPath('/test2') + "/myFile.txt", "r") as f:
    print(f.read())
#File write
with open(notebookutils.fs.getMountPath('/test2') + "/myFile.txt", "w") as f:
    print(f.write("dummy data"))
```

## Check existing mount points

Use the `notebookutils.fs.mounts()` API to check all existing mount point info:

```python
notebookutils.fs.mounts()
```

> [!TIP]
> Always check existing mounts with `mounts()` before creating new mount points to avoid conflicts.

### Check if a mount exists before mounting

```python
existing_mounts = notebookutils.fs.mounts()
mount_point = "/mydata"

if any(m.mountPoint == mount_point for m in existing_mounts):
    print(f"Mount point {mount_point} already exists")
else:
    notebookutils.fs.mount(
        "abfss://container@account.dfs.core.windows.net",
        mount_point
    )
    print("Mount created successfully")
```

## Unmount the mount point

Use the following code to unmount your mount point (*/test* in this example):

```python
notebookutils.fs.unmount("/test")
```

> [!IMPORTANT]
> The unmount mechanism isn't automatically applied. When the application run finishes, to unmount the mount point and release the disk space, you need to explicitly call an unmount API in your code. Otherwise, the mount point still exists in the node after the application run finishes.

## Mount-process-unmount workflow

For reliable resource management, wrap mount operations in a `try`/`finally` block to ensure cleanup happens even if an error occurs:

```python
def process_with_mount(source_uri, mount_point):
    """Complete workflow: mount, process, unmount."""
    
    try:
        # Step 1: Check if already mounted
        existing = notebookutils.fs.mounts()
        if any(m.mountPoint == mount_point for m in existing):
            print(f"Already mounted at {mount_point}")
        else:
            notebookutils.fs.mount(source_uri, mount_point)
            print(f"Mounted {source_uri} at {mount_point}")
        
        # Step 2: Process data using local file system
        mount_path = notebookutils.fs.getMountPath(mount_point)
        
        with open(f"{mount_path}/data/input.txt", "r") as f:
            data = f.read()
        
        processed = data.upper()
        
        with open(f"{mount_path}/output/result.txt", "w") as f:
            f.write(processed)
        
        print("Processing complete")
        
    finally:
        # Step 3: Always unmount to release resources
        notebookutils.fs.unmount(mount_point)
        print(f"Unmounted {mount_point}")

process_with_mount(
    "abfss://mycontainer@mystorage.dfs.core.windows.net",
    "/temp_mount"
)
```

## Known limitations

- The current mount is a job-level configuration; we recommend you use the `mounts` API to check if a mount point exists or isn't available.
- The unmount mechanism isn't automatically applied. When the application run finishes, to unmount the mount point and release the disk space, you need to explicitly call an unmount API in your code. Otherwise, the mount point still exists in the node after the application run finishes.
- Mounting an ADLS Gen1 storage account isn't supported.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
- [NotebookUtils file system utilities](notebookutils-file-system.md)
