---
title: OneLake access and APIs
description: Microsoft OneLake supports a subset of Azure Data Lake Storage (ADLS) Gen2 and Blob Storage APIs. Learn about the differences.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.date: 05/23/2023
---

# OneLake access and APIs

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Overview

Microsoft OneLake provides open access to all of your Fabric items through existing ADLS Gen2 APIs and SDKs. You can access your data in OneLake through any tool compatible with ADLS Gen2 just by using a OneLake URI instead.  You can upload data to a lakehouse through Azure Storage Explorer, or read a delta table through a shortcut from Azure Databricks.  

As OneLake is software as a service (SaaS), some operations, such as managing permissions or updating artifacts, must be done through Fabric experiences, and can't be done via ADLS Gen2 APIs. A full list of changes to these APIs can be found in the 'Supported API operations' section.

## URI Syntax

Because OneLake exists across your entire Microsoft Fabric tenant, you can refer to anything in your tenant by its workspace, item, and path:

```http
https://onelake.dfs.fabric.microsoft.com/<workspace>/<item>.<itemtype>/<path>/<fileName>
```

   > [!NOTE]
   > Since item names can be reused across multiple item types, you must specify the item type in the extension. For example, ".lakehouse" for a lakehouse and ".datawarehouse" for a warehouse.

OneLake also supports referencing workspaces and items with GUIDs. OneLake assigns GUIDs and GUIDs don't change, even if the workspace or item name changes. You can find the associated GUID for your workspace or item in the URL on the Fabric portal.  You must use GUIDs for both the workspace and the item, and don't need the item type.

```http
https://onelake.dfs.fabric.microsoft.com/<workspaceGUID>/<itemGUID>/Files/test.csv
```

When adopting a tool for use over OneLake instead of ADLS Gen2, use the following mapping:

- The account name is always 'onelake'.
- The container name is your workspace name.
- The data path starts at the item.  For example: '/mylakehouse/Files/'.

## OneLake and ADLS Gen2 Parity

While OneLake matches all ADLS Gen2 behavior wherever possible, not every concept in ADLS Gen2 has a direct correlation to OneLake. The following sections describe how OneLake differs from ADLS Gen2, from unsupported request headers to changes in response headers.  For more information on ADLS Gen2 APIs, see [Azure Data Lake Storage Gen2 REST APIs](https://learn.microsoft.com/en-us/rest/api/storageservices/data-lake-storage-gen2).

### Protected OneLake folders

OneLake doesn't support creating, updating, or deleting workspaces or items through the ADLS Gen2 APIs. Only HEAD calls are supported at the workspace level and account level, as you must make changes to the Fabric tenant and Fabric workspaces in the Fabric administration portal.

OneLake does enforce the Fabric item structure, meaning you can't perform create, read, update, and delete (CRUD) operations on certain folders, even if you're the item or workspace owner. You must perform these operations via Fabric experiences, such as the Fabric portal or Fabric management APIs. Fabric-managed folders include the top-level folder in an item (for example, */MyLakehouse*) and the first level of folders within it (for example, */MyLakehouse/Files* and */MyLakehouse/Tables*).

You can perform CRUD operations on any folder or file created within these managed folders.

### Unsupported request headers and parameters

Even in user-created and owned files and folders, OneLake restricts some management operations through ADLS Gen2 APIs. You cannot update permissions, edit artifacts or workspaces, or set access tiers, as these operations must be managed through Fabric.

OneLake will reject or ignore an API call if it contains a disallowed header or parameter value. OneLake ignores headers if the header doesn't change the behavior of the call, and returns the rejected header in a new 'x-ms-rejected-headers' response header.  OneLake rejects requests containing unallowed query parameters.  OneLake doesn’t allow the following behaviors and their associated request headers and URI parameters:

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

### Response header differences

Since OneLake uses a different permission model than ADLS Gen2, there are changes to the response headers related to permissions:

- 'x-ms-owner' and 'x-ms-group' always returns '$superuser', as OneLake doesn't have owning users or groups.
- 'x-ms-permissions' always returns '---------], as OneLake doesn't have owning users, groups, or public access permissions.
- 'x-ms-acl' returns the Fabric permissions for the calling user converted to a POSIX access control list (ACL), in the form 'rwx'

## Authorization

You can authenticate OneLake APIs using Microsoft Azure Active Directory (Azure AD) by passing through an authorization header.  If a tool supports logging into your Azure account to enable AAD passthrough, you can select any subscription - OneLake only requires your AAD token and doesn't care about your Azure subscription.

## Data residency

OneLake doesn't currently guarantee data residency in a particular region when using the global endpoint ('https://onelake.dfs.fabric.microsoft.com'). When you query data in a region different than your workspace's region, there's a possibility that data could leave your region during the endpoint resolution process. If you're concerned about data residency, using the correct regional endpoint for your workspace ensures your data stays within its current region and doesn't cross any regional boundaries. You can discover the correct regional endpoint by checking the region of the capacity that the workspace is attached to.

OneLake regional endpoints all follow the same format: 'https://\<region\>-onelake.dfs.fabric.microsoft.com'. For example, a workspace attached to a capacity in the West US 2 region would be accessible through the regional endpoint 'https://westus-onelake.dfs.fabric.microsoft.com.

## Samples

Create file

| **Request** | **PUT `https://onelake.dfs.fabric.microsoft.com/{workspace}/{item}.{itemtype}/Files/sample?resource=file`** |
|---|---|
| **Headers** | `Authorization: Bearer <userAADToken>` |
| **Response** | **ResponseCode:** `201 Created`<br>**Headers:**<br>`x-ms-version : 2021-06-08`<br>`x-ms-request-id : 272526c7-0995-4cc4-b04a-8ea3477bc67b`<br>`x-ms-content-crc64 : OAJ6r0dQWP0=`<br>`x-ms-request-server-encrypted : true`<br>`ETag : 0x8DA58EE365`<br>**Body:** |

## Next steps

- OneLake integration with Azure Synapse Analytics