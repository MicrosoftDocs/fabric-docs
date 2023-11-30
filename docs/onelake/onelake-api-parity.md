---
title: OneLake parity and integration
description: Microsoft OneLake supports ADLS Gen2 APIs, with a few differences.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# OneLake and Azure Data Lake Storage (ADLS) Gen2 API parity

OneLake supports the same APIs as Azure Data Lake Storage (ADLS) Gen2, enabling users to read, write, and manage their data in OneLake with the tools they already use today. Because OneLake is a managed, logical data lake, some features are managed differently than in Azure Storage, and not all behaviors are supported over OneLake. This page details these differences, including OneLake managed folders, API differences, and open source compatibility.

## Managed OneLake folders

The workspaces and data items in your Fabric tenant define the structure of OneLake. Managing workspaces and items is done through Fabric experiences - OneLake doesn't support creating, updating, or deleting workspaces or items through the ADLS Gen2 APIs. OneLake only allows HEAD calls at the workspace (container) level and tenant (account) level, as you must make changes to the tenant and workspaces in the Fabric administration portal.

OneLake also enforces a folder structure for Fabric items, protecting items and their managed subfolders from creation, deletion, or renaming through ADLS Gen2 APIs. Fabric-managed folders include the top-level folder in an item (for example, */MyLakehouse.lakehouse*) and the first level of folders within it (for example, */MyLakehouse.lakehouse/Files* and */MyLakehouse.lakehouse/Tables*).

You can perform CRUD operations on any folder or file created within these managed folders, and perform read-only operations on workspace and item folders.

## Unsupported request headers and parameters

Even in user-created files and folders, OneLake restricts some Fabric management operations through ADLS Gen2 APIs. You must use Fabric experiences to update permissions or edit items and workspaces, and Fabric manages other options such as access tiers.

OneLake accepts almost all of the same headers as ADLS Gen2, ignoring only some headers that relate to unpermitted actions on OneLake. Since these headers don't alter the behavior of the entire call, OneLake ignores the banned headers,  returns them in a new 'x-ms-rejected-headers' response header, and permits the rest of the call. For example, OneLake ignores the 'x-ms-owner' parameter in a PUT call since Fabric and OneLake don't have the same concept of owning users as Azure Storage.  

OneLake rejects requests containing unallowed query parameters since query parameters change the behavior of the entire call.  For example, UPDATE calls with the 'setAccessControl' parameter are blocked since OneLake never supports setting access control via Azure Storage APIs.  

OneLake doesn’t allow the following behaviors and their associated request headers and URI parameters:

- Set access control
  - URI Parameter:
    - action: setAccessControl (Request rejected)
    - action: setAccessControlRecursive (Request rejected)
  - Request headers:
    - x-ms-owner (Header ignored)
    - x-ms-group (Header ignored)
    - x-ms-permissions (Header ignored)
    - x-ms-group (Header ignored)
    - x-ms-acls (Header ignored)
- Set encryption scope
  - Request headers:
    - x-ms-encryption-key (Header ignored)
    - x-ms-encryption-key (Header ignored)
    - x-ms-encryption-algorithm:AES256 (Header ignored)
- Set access tier
  - Request headers:
    - x-ms-access-tier (Header ignored)

## Response header differences

Since OneLake uses a different permission model than ADLS Gen2, response headers related to permissions are handled differently:

- 'x-ms-owner' and 'x-ms-group' always returns '$superuser' as OneLake doesn't have owning users or groups
- 'x-ms-permissions' always returns '---------' as OneLake doesn't have owning users, groups, or public access permissions
- 'x-ms-acl' returns the Fabric permissions for the calling user converted to a POSIX access control list (ACL), in the form 'rwx'

## Open Source Integration

Since OneLake supports the same APIs as ADLS Gen2, many open source libraries and packages compatible with ADLS Gen2 work seamlessly with OneLake. Other libraries may require small updates to accommodate OneLake endpoints or other compatibility issues. The following libraries are confirmed to be compatible with OneLake due to recent changes. This list isn't exhaustive:

- [Delta-RS](https://github.com/delta-io/delta-rs)
- [Rust Object Store](https://crates.io/crates/object_store/0.7.0)

## Examples

### List items within a workspace

```http
GET https://onelake.dfs.fabric.microsoft.com/myWorkspace?resource=filesystem&recursive=false
```

### Create a folder within a lakehouse

```http
PUT https://onelake.dfs.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/newFolder/?resource=directory
```

## Related content

- [Connect to OneLake using Python](onelake-access-python.md)
- [Use Azure Storage Explorer to manage OneLake](onelake-azure-storage-explorer.md)
