---
title: OneLake and ADLS Gen2 API parity
description: Microsoft OneLake supports ADLS Gen2 APIs, with a few differences.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.custom: build-2023
ms.date: 09/27/2023
---

# OneLake and Azure Data Lake Storage (ADLS) Gen2 API parity

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake supports the same APIs as Azure Data Lake Storage (ADLS) Gen2, enabling users to read, write, and manage their data in OneLake. However, not all functionality in ADLS Gen2 maps directly to OneLake. OneLake also enforces a set folder structure to support Fabric workspaces and items. This page details the changes between ADLS Gen2 and OneLake when calling DFS APIs, and other differences between the two services. For more information on ADLS Gen2 APIs, see [Azure Data Lake Storage Gen2 REST APIs](/rest/api/storageservices/data-lake-storage-gen2).

## Protected OneLake folders

OneLake doesn't support creating, updating, or deleting workspaces or items through the ADLS Gen2 APIs. Only HEAD calls are supported at the workspace level and account level, as you must make changes to the Fabric tenant and Fabric workspaces in the Fabric administration portal.

OneLake also enforces a folder structure for Fabric items, protecting items and their managed subfolders from creation, deletion, or renaming through ADLS Gen2 APIs. You must perform these operations via Fabric experiences, such as the Fabric portal. Fabric-managed folders include the top-level folder in an item (for example, */MyLakehouse.lakehouse*) and the first level of folders within it (for example, */MyLakehouse.lakehouse/Files* and */MyLakehouse.lakehouse/Tables*).

You can perform CRUD operations on any folder or file created within these managed folders, and perform read-only operations on workspace and item folders.

## Unsupported request headers and parameters

Even in user-created files and folders, OneLake restricts some Fabric management operations through ADLS Gen2 APIs. You can't update permissions, edit items or workspaces, or set access tiers.

OneLake rejects or ignores an API call if it contains a disallowed header or parameter value. OneLake ignores headers if the header doesn't change the behavior of the call, and returns the rejected header in a new 'x-ms-rejected-headers' response header. OneLake rejects requests containing unallowed query parameters. OneLake doesn’t allow the following behaviors and their associated request headers and URI parameters:

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

## Examples

### List items within a workspace

```http
GET https://onelake.dfs.fabric.microsoft.com/myWorkspace?resource=filesystem&recursive=false
```

### Create a folder within a lakehouse

```http
PUT https://onelake.dfs.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/newFolder/?resource=directory
```

## Next steps

- [Connect to OneLake using Python](onelake-access-python.md)
- [Use Azure Storage Explorer to manage OneLake](onelake-azure-storage-explorer.md)
