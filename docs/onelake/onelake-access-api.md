---
title: How do I connect to OneLake?
description: Microsoft OneLake provides open access to your files and folders through the same APIs and SDKs as ADLS Gen2.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Connecting to Microsoft OneLake

Microsoft OneLake provides open access to all of your Fabric items through existing Azure Data Lake Storage (ADLS) Gen2 APIs and SDKs. You can access your data in OneLake through any API, SDK, or tool compatible with ADLS Gen2 just by using a OneLake URI instead. You can upload data to a lakehouse through Azure Storage Explorer, or read a delta table through a shortcut from Azure Databricks.

As OneLake is software as a service (SaaS), some operations, such as managing permissions or updating items, must be done through Fabric experiences instead of the ADLS Gen2 APIs. For a full list of changes to these APIs, see [OneLake API parity](onelake-api-parity.md).

## URI Syntax

Because OneLake exists across your entire Microsoft Fabric tenant, you can refer to anything in your tenant by its workspace, item, and path:

```http
https://onelake.dfs.fabric.microsoft.com/<workspace>/<item>.<itemtype>/<path>/<fileName>
```

   > [!NOTE]
   > Because you can reuse item names across multiple item types, you must specify the item type in the extension. For example, `.lakehouse` for a lakehouse and `.datawarehouse` for a warehouse.

OneLake also supports referencing workspaces and items with globally unique identifiers (GUIDs). OneLake assigns GUIDs and GUIDs don't change, even if the workspace or item name changes. You can find the associated GUID for your workspace or item in the URL on the Fabric portal. You must use GUIDs for both the workspace and the item, and don't need the item type.

```http
https://onelake.dfs.fabric.microsoft.com/<workspaceGUID>/<itemGUID>/<path>/<fileName>
```

When adopting a tool for use over OneLake instead of ADLS Gen2, use the following mapping:

- The account name is always `onelake`.
- The container name is your workspace name.
- The data path starts at the item. For example: `/mylakehouse.lakehouse/Files/`.

OneLake also supports the [Azure Blob Filesystem driver](/azure/storage/blobs/data-lake-storage-abfs-driver) (ABFS) for more compatibility with ADLS Gen2 and Azure Blob Storage. The ABFS driver uses its own scheme identifier `abfs` and a different URI format to address files and directories in ADLS Gen2 accounts. To use this URI format over OneLake, swap workspace for filesystem and include the item and item type.

```http
abfs[s]://<workspace>@onelake.dfs.fabric.microsoft.com/<item>.<itemtype>/<path>/<fileName>
```

## Authorization

You can authenticate OneLake APIs using Microsoft Entra ID by passing through an authorization header. If a tool supports logging into your Azure account to enable token passthrough, you can select any subscription. OneLake only requires your user token and doesn't care about your Azure subscription.

When calling OneLake via DFS APIs directly, you can authenticate with a bearer token for your Microsoft Entra account. To learn more about requesting and managing bearer tokens for your organization, check out the [Microsoft Authentication Library](/entra/identity-platform/msal-overview).  

For quick, ad-hoc testing of OneLake using direct API calls, here's a simple example using PowerShell to sign in to your Azure account, retrieve a storage-scoped token, and copy it to your clipboard for easy use elsewhere. For more information about retrieving access tokens using PowerShell, see [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken).

   > [!NOTE]
   > OneLake only supports tokens in the `Storage` audience. In the following example, we set the audience through the `ResourceTypeName` parameter.

  ```powershell
  az login --allow-no-subscriptions
  $bearerToken = Get-AzAccessToken -ResourceTypeName Storage
  $testToken.Token | Set-Clipboard
  ```

## Data residency

OneLake doesn't currently guarantee data residency in a particular region when using the global endpoint (`https://onelake.dfs.fabric.microsoft.com`). When you query data in a region different than your workspace's region, there's a possibility that data could leave your region during the endpoint resolution process. If you're concerned about data residency, using the correct regional endpoint for your workspace ensures your data stays within its current region and doesn't cross any regional boundaries. You can discover the correct regional endpoint by checking the region of the capacity that the workspace is attached to.

OneLake regional endpoints all follow the same format: `https://<region>-onelake.dfs.fabric.microsoft.com`. For example, a workspace attached to a capacity in the West US 2 region would be accessible through the regional endpoint `https://westus-onelake.dfs.fabric.microsoft.com`.

## Common issues

If a tool or package compatible with ADLS Gen2 isn't working over OneLake, the most common issue is URL validation. As OneLake uses a different endpoint (`dfs.fabric.microsoft.com`) than ADLS Gen2 (`dfs.core.windows.net`), some tools don't recognize the OneLake endpoint and block it. Some tools allow you to use custom endpoints (such as PowerShell). Otherwise, it's often a simple fix to add OneLake's endpoint as a supported endpoint. If you find a URL validation issue or have any other issues connecting to OneLake, [let us know](https://ideas.fabric.microsoft.com/).

## Samples

Create file

| **Request** | **PUT `https://onelake.dfs.fabric.microsoft.com/{workspace}/{item}.{itemtype}/Files/sample?resource=file`** |
|---|---|
| **Headers** | `Authorization: Bearer <userAADToken>` |
| **Response** | **ResponseCode:** `201 Created`<br>**Headers:**<br>`x-ms-version : 2021-06-08`<br>`x-ms-request-id : 272526c7-0995-4cc4-b04a-8ea3477bc67b`<br>`x-ms-content-crc64 : OAJ6r0dQWP0=`<br>`x-ms-request-server-encrypted : true`<br>`ETag : 0x8DA58EE365`<br>**Body:** |

## Related content

- [OneLake parity and integration](onelake-api-parity.md)
- [Connect to OneLake with Python](onelake-access-python.md)
- [OneLake integration with Azure Synapse Analytics](onelake-azure-synapse-analytics.md)
