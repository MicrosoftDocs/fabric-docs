---
title: OneLake access and APIs
description: Microsoft OneLake supports a subset of Azure Data Lake Storage (ADLS) Gen 2 and Blob Storage APIs. Learn about the differences.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.date: 03/24/2023
---

# OneLake access and APIs

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft OneLake supports a subset of Azure Data Lake Storage (ADLS) Gen 2 and Blob Storage APIs, with some differences in functionality. As OneLake is software as a service (SAAS), it handles some functionality that therefore can't be edited. A full list of changes to these APIs can be found in the following sections. Otherwise, you can continue to use the same distributed file system (DFS) APIs, but now pointed at the new OneLake endpoint: `https://onelake.dfs.fabric.microsoft.com`. Because OneLake exists across your entire Microsoft Fabric tenant, you can refer to anything in your tenant just by its workspace, artifact, and path. For example, a file named **test** located in lakehouse **foo** and workspace **bar** has the following path:

```http
https://onelake.dfs.fabric.microsoft.com/bar/foo/Files/test.csv
```

## OneLake endpoints

OneLake’s global endpoint (`https://onelake.dfs.fabric.microsoft.com`) doesn't currently guarantee data residency in a particular region. When you query data in a region different than your workspace's region, there's a possibility that data could leave your region during the endpoint resolution process. If you're concerned about data residency, using the matching regional endpoint for your workspace ensures your data stays within its current region and doesn't cross any regional boundaries. You can discover the correct regional endpoint by checking the region of the capacity that the workspace is attached to.

OneLake regional endpoints:

| **Region** | **Endpoint** |
|---|---|
| **CanadaCentral** | `https://canadacentral-onelake.dfs.fabric.microsoft.com` |
| **NorthCentralUS** | `https://northcentralus-onelake.dfs.fabric.microsoft.com` |
| **AustraliaSoutheast** | `https://australiasoutheast-onelake.dfs.fabric.microsoft.com` |
| **EastUS** | `https://eastus-onelake.dfs.fabric.microsoft.com` |
| **EastUS2** | `https://eastus2-onelake.dfs.fabric.microsoft.com` |
| **WestUS** | `https://westus-onelake.dfs.fabric.microsoft.com` |
| **NorthEurope** | `https://northeurope-onelake.dfs.fabric.microsoft.com` |
| **WestEurope** | `https://westeurope-onelake.dfs.fabric.microsoft.com` |

## Supported API operations

Fabric OneLake supports all ADLS Gen 2 Path APIs. Currently, OneLake doesn't support any filesystem-level operations, and you must perform any operations on workspaces via Fabric interfaces. OneLake also doesn't support any account-level operations, as you must make changes to the Fabric tenant in the Fabric administration portal.

OneLake does enforce the Fabric artifact structure, meaning you can't perform create, read, update, and delete (CRUD) operations on certain folders, even if you're the artifact or workspace owner. You must perform CRUD operations on artifacts and their managed folders via the Fabric experiences, such as the Fabric portal or Fabric management APIs. Artifact-managed folders include the top-level folder (for example, */MyLakehouse*) and the first level of folders within it (for example, */MyLakehouse/Files* and */MyLakehouse/Tables*).

You can perform CRUD operations on any folder or file created within these artifact-managed folders.

### Unsupported request headers and parameters

You can’t use ADLS Gen 2 or Blob Storage APIs to perform certain operations or behaviors in OneLake. To prevent these blocked behaviors, OneLake rejects or ignores an API call if it uses a disallowed header or parameter value. If the header or parameter value changes the behavior of the call to a disallowed behavior, OneLake rejects the call. If the header doesn't change the behavior of the call, then OneLake simply ignores the disallowed header. OneLake doesn’t allow the following behaviors and their associated request headers and URI parameters:

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

## Authorization

You can authenticate OneLake APIs using Microsoft Azure Active Directory (Azure AD) by passing through an authorization header.

## Samples

Create file

| **Request** | **PUT `https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{artifactId}/Files/sample?resource=file`** |
|---|---|
| **Headers** | `Authorization: Bearer <userAADToken>` |
| **Response** | **ResponseCode:** `201 Created`<br>**Headers:**<br>`x-ms-version : 2021-06-08`<br>`x-ms-request-id : 272526c7-0995-4cc4-b04a-8ea3477bc67b`<br>`x-ms-content-crc64 : OAJ6r0dQWP0=`<br>`x-ms-request-server-encrypted : true`<br>`ETag : 0x8DA58EE365`<br>**Body:** |

## Next steps

- [OneLake integration with Azure Synapse Analytics](onelake-azure-synapse-analytics)
