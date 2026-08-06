---
title: Troubleshoot Spark storage, file, and authentication errors
description: Diagnose and resolve Spark storage, file, and authentication errors in Microsoft Fabric, including ABFS and JDBC failures, missing files, and token errors.
ms.topic: troubleshooting-error-codes
ms.date: 07/27/2026
ms.reviewer: jejiang
ai-usage: ai-assisted
---

# Troubleshoot Spark storage, file, and authentication errors

Use this guide to diagnose and resolve storage, connectivity, file access, and authentication errors in Microsoft Fabric Spark jobs, including ABFS and JDBC failures, mounted path failures, missing files, unsupported encodings, and token errors. For other Spark job errors, see [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md).

## Storage and connectivity errors

### ABFS StorageAccountDoesNotExist

**Error:** `Spark_Ambiguous_ABFS_StorageAccountDoesNotExist`

**Why it happens:** The specified Azure storage account doesn't exist or isn't accessible.

**What to do:**

- Verify the storage account name is spelled correctly:

```text
abfss://<container>@<storage_account>.dfs.core.windows.net/<path>
```

- Confirm the storage account exists in the Azure portal (it might have been deleted or renamed).

- Check that the storage account isn't behind a firewall that blocks your Spark cluster.

- Verify you have the correct permissions (Storage Blob Data Reader/Contributor) on the account.

### ABFS storage operation failed

**Error:** `Spark_System_ABFS_OperationFailed`

**What it means:** An Azure Blob File System (ABFS) storage operation failed. This typically points to a storage connectivity, permission, or networking issue rather than a Spark code error.

#### Scenario 1 — InvalidPrivateLink

**Why it happens:** Your request was denied because it didn't comply with private link settings. This occurs when Spark tries to access storage through a private endpoint that isn't properly configured.

**What to do:**

- Verify that your workspace's private link and managed virtual network settings are correctly configured.

- Ensure the private endpoint DNS records are intact and resolving correctly.

- If you use a managed virtual network, confirm Data Exfiltration Protection (DEP) is enabled consistently.

#### Scenario 2 — 403 authorization / SAS failure

**Why it happens:** The generated SAS token or authorization header is invalid or expired, causing a 403 Forbidden error.

Example error messages:

- "Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly."

- "AuthorizationPermissionMismatch" with HTTP 403

**What to do:**

- If the storage account recently changed keys or access policies, ensure the Fabric workspace connection is updated.

- Verify that the lakehouse or warehouse shortcut has valid credentials.

- If you use a service principal, confirm it has the Storage Blob Data Contributor role on the target storage account.

- Retry—token generation issues can be transient.

If the error includes "AccessDeniedException" on system staging paths (for example, _system/artifacts/), this is typically a platform-level issue. Retry first; if it persists, contact support.

#### Scenario 3 — Storage account connectivity

**Why it happens:** The Spark cluster can't reach the storage account due to firewall rules, virtual network restrictions, or the storage account being in a different region.

**What to do:**

- Check that the storage account firewall allows access from "Trusted Microsoft services".

- If you use private endpoints, verify DNS resolution from within the workspace's virtual network.

- Confirm the storage account exists and hasn't been deleted or renamed.

### JDBC connection failed

**Error:** `Spark_Ambiguous_JDBC_ConnectionFailed`

**Why it happens:** The JDBC connection to the external database failed.

**What to do:**

- Verify connection parameters: host, port, database name, username, password.

- Test connectivity from outside Spark (for example, Python pyodbc) to isolate whether it's a Spark or network issue.

- Check firewall rules — does the database allow connections from your Spark cluster's IP range?

- Verify the database server is running and accepting connections.

- Check JDBC driver version compatibility.

### JDBC SQLServerException

**Error:** `Spark_Ambiguous_JDBC_SQLServerException`

**Why it happens:** A SQL Server-specific error occurred during a JDBC operation.

**What to do:**

- Read the SQL Server error code in the stack trace.

| Error code | Meaning             | Fix                                     |
|------------|---------------------|-----------------------------------------|
| 18456      | Login failed        | Check username/password                 |
| 233        | Connection closed   | Check firewall, server availability     |
| 1205       | Deadlock victim     | Retry the operation; reduce parallelism |
| 8115       | Arithmetic overflow | Check data types and values             |

- Verify SQL Server permissions—your login needs appropriate rights.

- For timeout errors, increase the query timeout:

```python
df = spark.read.format("jdbc") \
    .option("queryTimeout", "300") \
    .option("url", url) \
    .load()
```

## Mounted path failure

**Error code:** `Spark_Ambiguous_MsSparkUtils_UseMountedPathFailure`

### What does this error mean?

A mounted path can't be accessed. The session registers the mount point, but the underlying target - a storage account, container, or lakehouse - is unreachable, was deleted, or the credentials used to create the mount are no longer valid.

### Error messages to look for

```text
Spark_Ambiguous_MsSparkUtils_UseMountedPathFailure
Mount point not found
Unable to access mounted path
```

### Resolution steps

1. List active mounts to confirm the mount point is registered in the current session.

   ```python
   notebookutils.fs.mounts()
   ```

1. Verify the mount target (storage account and container) still exists and is reachable from the workspace.

1. Check whether the credentials used to create the mount (SAS token or service principal secret) expired, and rotate them if so.

1. Unmount and remount to refresh the mount with current credentials.

   ```python
   notebookutils.fs.unmount("/mnt/my_mount")
   notebookutils.fs.mount(
       "abfss://container@account.dfs.core.windows.net",
       "/mnt/my_mount"
   )
   ```

### Common pitfalls

- Mounts are session-scoped. A mount created in one notebook session doesn't exist in a new session. Remount at the top of each notebook or in a shared initialization cell.
- In high concurrency mode, verify that mount creation ran in the session your code is executing in.
- If the mount target is behind a private endpoint, confirm managed virtual network and DNS configuration. For more information, see [Storage and connectivity errors](#storage-and-connectivity-errors).

### Quick-reference troubleshooting table

| Symptom | Likely cause | First action |
|----|----|----|
| `Mount point not found` | Mount isn't registered in the current session | List active mounts and remount |
| `Unable to access mounted path` | Mount target deleted or unreachable | Verify the target exists and is reachable |
| Worked before, now fails | Mount credentials expired | Rotate credentials, then unmount and remount |

## File and path errors

### FileInput — FileNotFound

#### What does this error mean?

The error code `Spark_User_FileInput_FileNotFound` means your Spark job tried to read a file or directory that doesn't exist at the specified path. This is a user error — the path you provided is either incorrect, the file was deleted, or it hasn't been created yet.

#### Error messages to look for

```text
org.apache.spark.sql.AnalysisException: Path does not exist: abfss://...

java.io.FileNotFoundException: No such file or directory

Input path does not exist: abfss://container@account.dfs.core.windows.net/...
```

#### Common causes and fixes

##### Incorrect path or typographical error

- Double-check the container name, storage account, and file path for typographical errors.

- Verify the path exists by using NotebookUtils:

```python
notebookutils.fs.ls("abfss://container@account.dfs.core.windows.net/folder/")
```

##### File not yet created by upstream job

- If your notebook depends on output from another pipeline or job, ensure the upstream job completed successfully before this job runs.

- Add a dependency or checkpoint in your pipeline to wait for the file.

##### File was deleted or moved

- Check if a retention policy, cleanup job, or another user deleted the file.

- For Delta tables, check the transaction log to see if files were removed by VACUUM.

##### Partition path does not exist

- When reading partitioned data, ensure the partition filter matches existing partitions:

```python
df = spark.read.parquet("abfss://.../data/").where("date = '2024-01-15'")
```

- List available partitions:

```python
notebookutils.fs.ls("abfss://.../data/")
```

##### Case sensitivity

- ABFS paths are case-sensitive. Ensure the casing matches exactly.

### SQL — PathDoesNotExist

#### What does this error mean?

The error code `Spark_User_SQL_PathDoesNotExist` means a Spark SQL query referenced a path (table location, view, or external data source) that can't be found. This typically occurs when a table's underlying storage path has changed or been removed.

#### Common causes and fixes

##### Table's underlying storage was deleted or moved

- The table metadata points to a path that no longer exists. Recreate the table or update its LOCATION.

```sql
-- Check the table location  
DESCRIBE EXTENDED schema_name.table_name

-- Recreate pointing to correct path  
CREATE TABLE schema_name.table_name USING DELTA LOCATION "abfss://..."
```

##### Workspace or lakehouse was renamed

- Renaming a workspace can break paths that were hardcoded. Use relative paths or notebookutils.fs to resolve paths dynamically.

> [!IMPORTANT]
> This is a common real-world trap specific to Fabric. If you recently renamed your workspace and tables stopped working, this is likely the cause.

##### Cross-workspace access without correct path

- When accessing tables in another workspace, use the full ABFS path:

```python
spark.read.format("delta").load("abfss://container@account.dfs.core.windows.net/Tables/tablename")
```

##### Shortcut or mount point broken

- If you use OneLake shortcuts, verify the shortcut target still exists and the connection is valid.

### WASB — NoCredentials

> [!IMPORTANT]
> WASB (Windows Azure Storage Blob) is a legacy protocol. The primary fix is to migrate to ABFS (Azure Blob File System) paths by using the `abfss://` scheme, which is the modern and supported approach in Fabric. Use the following steps only if migration isn't immediately possible.

#### Error messages to look for

```text
Spark_User_WASB_NoCredentials

No credentials found for account <storage_account>.blob.core.windows.net

WASB authorization failed
```

#### Resolution steps

**Migrate to ABFS (recommended)**

- Convert your paths from `wasb[s]://` to `abfss://`:

```text
# Old (WASB): wasbs://container@account.blob.core.windows.net/path

# New (ABFS): abfss://container@account.dfs.core.windows.net/path
```

**If migration isn't possible, configure the storage account key**

```python
spark.conf.set("fs.azure.account.key.<account>.blob.core.windows.net", "<key>")
```

> [!IMPORTANT]
> Storing account keys in notebook code is a security risk. Use Fabric connections or Azure Key Vault instead.

## Unsupported encoding

**Error code:** `Spark_User_UnsupportedOperations_UnsupportedEncoding`

### What does this error mean?

Spark encounters a file with a character encoding it can't automatically handle, or the file contains byte sequences that aren't valid in the expected encoding. By default, Spark assumes UTF-8 for text sources such as CSV and JSON. Files exported from legacy systems, Windows applications, or non-English locales frequently use other encodings.

### Error messages to look for

```text
Spark_User_UnsupportedOperations_UnsupportedEncoding
UnsupportedEncodingException
MalformedInputException
Invalid UTF-8 start byte
```

### Resolution steps

1. Specify the encoding explicitly when reading the file.

   ```python
   df = spark.read.option("encoding", "UTF-8").csv("abfss://path")
   ```

1. If UTF-8 fails, try the encodings most common for your data source:

   | Encoding | Typical source |
   |----|----|
   | UTF-8 | Modern systems, default assumption |
   | ISO-8859-1 (Latin-1) | Legacy Unix or mainframe exports, Western European text |
   | Windows-1252 | Files exported from Excel or legacy Windows applications |
   | Shift_JIS | Japanese-language systems |

1. For binary files or mixed-encoding data, read as binary and decode in code.

   ```python
   df = spark.read.format("binaryFile").load("abfss://path")
   # then decode df["content"] with the correct codec in a user-defined function (UDF) or in pandas
   ```

1. To identify an unknown encoding, inspect the first bytes of the file.

   ```python
   raw = notebookutils.fs.head("abfss://path/file.csv", 1024)
   print(raw)  # mojibake patterns often reveal the source encoding
   ```

> [!TIP]
> A UTF-8 byte-order mark (BOM) at the start of a file can also cause Spark to misread the first column name. If your first column appears with a stray character prefix, re-export the file without a BOM or strip it before reading.

### Quick-reference troubleshooting table

| Symptom | Likely cause | First action |
|----|----|----|
| `MalformedInputException` or `Invalid UTF-8 start byte` | File uses a non-UTF-8 encoding | Set the `encoding` option when reading |
| Garbled text (mojibake) in the output | Wrong encoding for the data source | Try ISO-8859-1, Windows-1252, or Shift_JIS |
| Stray character prefix on the first column name | UTF-8 byte-order mark (BOM) | Re-export or strip the BOM before reading |

## Authentication and token errors

### CustomTokenProvider Unauthorized

**Error:** `Spark_Ambiguous_CustomTokenProvider_Unauthorized`

**Why it happens:** The custom token provider encountered an authorization failure.

**What to do:**

- Verify that authentication credentials are correct and not expired.

- Check that the service principal / managed identity has the required role assignments.

- Ensure OAuth tokens haven't expired (long-running jobs might outlast token lifetimes).

- Review Microsoft Entra audit logs for specific authorization failures.

### Unable to generate session token

**Error:** `UNABLE_TO_GENERATE_SESSION_TOKEN_WITH_TOKEN_PROVIDER`

**What it means:** Fabric couldn't generate the authentication token required to start your Spark session. The session fails before any user code executes.

**What to do:**

- Verify that your Fabric workspace capacity is active and not paused.

- Check that your Microsoft Entra tenant isn't experiencing authentication issues.

- If you're using a service principal or managed identity, confirm it has the correct role assignments on the workspace.

- Try opening a new browser session or clearing cached credentials.

- If the error is intermittent, retry—token generation can have transient failures.

- If persistent, check the Fabric admin portal for any capacity or tenant-level issues, then contact support.

### ABFS unauthorized (403)

#### What does this error mean?

The error code `Spark_User_ABFS_Unauthorized` means your Spark job received a 403 Forbidden response when trying to access Azure Blob File System (ABFS) storage. Your identity or service principal doesn't have the required permissions.

#### Error messages to look for

```text
Operation failed: "This request is not authorized to perform this operation using this permission."

StatusCode=403, ErrorCode=AuthorizationPermissionMismatch

StorageRequestFailedException: Status code: 403
```

#### Common causes and fixes

##### Missing Storage Blob Data role

- Your Fabric identity needs at least Storage Blob Data Reader (for reads) or Storage Blob Data Contributor (for writes) on the storage account.

- In the Azure portal, go to your storage account, select **Access Control (IAM)**, and then select **Add role assignment**.

##### SAS token expired or insufficient permissions

- If you use a SAS token, check the expiry date and ensure it has the correct permissions (read, write, list).

##### Firewall or Private Endpoint blocking access

- If the storage account has firewall rules, ensure the Fabric workspace IP ranges are allowed.

- For Private Link, ensure the private endpoint is correctly configured and approved.

##### OneLake access not properly configured

- For cross-tenant or cross-workspace access, verify sharing settings and permissions in Fabric admin.

### Token provider user error

#### What does this error mean?

The error code `TOKEN_PROVIDER_USER_ERROR` means the token provider configured for your Spark session returned an error when trying to obtain an access token. This prevents your job from authenticating to downstream services.

#### Common causes and fixes

##### Service principal credentials expired

- If using a service principal, check that the client secret hasn't expired.

- Renew the secret in Microsoft Entra ID and update the configuration in Fabric.

##### Incorrect tenant, client ID, or client secret

- Verify the values in your token provider configuration match the Microsoft Entra ID app registration.

##### Consent not granted

- Ensure the service principal has been granted the required API permissions and admin consent has been provided.

##### Linked service or connection misconfigured

- If using a Fabric connection or linked service, recreate it and test the connection.

## Related content

- [Spark errors overview in Microsoft Fabric](troubleshoot-spark.md)
- [Troubleshoot permissions and capacity errors](troubleshoot-permissions-capacity.md)
