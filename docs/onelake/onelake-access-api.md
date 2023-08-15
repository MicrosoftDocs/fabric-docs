---
title: How do I connect to OneLake?
description: Microsoft OneLake provides open access to your files and folders through the same APIs and SDKs as ADLS Gen2.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.custom: build-2023
ms.date: 05/23/2023
---

# Connecting to Microsoft OneLake

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft OneLake provides open access to all of your Fabric items through existing ADLS Gen2 APIs and SDKs. You can access your data in OneLake through any API, SDK, or tool compatible with ADLS Gen2 just by using a OneLake URI instead.  You can upload data to a lakehouse through Azure Storage Explorer, or read a delta table through a shortcut from Azure Databricks.  

As OneLake is software as a service (SaaS), some operations, such as managing permissions or updating items, must be done through Fabric experiences, and can't be done via ADLS Gen2 APIs. A full list of changes to these APIs can be found at [OneLake API parity](onelake-api-parity.md).

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
- The data path starts at the item.  For example: '/mylakehouse.lakehouse/Files/'.

## Authorization

You can authenticate OneLake APIs using Microsoft Azure Active Directory (Azure AD) by passing through an authorization header.  If a tool supports logging into your Azure account to enable Azure AD passthrough, you can select any subscription - OneLake only requires your Azure AD token and doesn't care about your Azure subscription.

When calling OneLake via the DFS APIs directly, you can authenticate with a bearer token for your Azure AD account.  While there are multiple ways to get this token, here's quick example using PowerShell - log in to your Azure account, retrieve a storage-scoped token, and copy it to your clipboard for easy use elsewhere.  For more information about retrieving access tokens using PowerShell, see [Get-AzAccessToken](/powershell/module/az.accounts/get-azaccesstoken).

   > [!NOTE]
   > OneLake only supports tokens in the 'Storage' audience.  In this example, we set the audience through the 'ResourceTypeName' parameter.

  ```powershell
  az login --allow-no-subscriptions
  $bearerToken = Get-AzAccessToken -ResourceTypeName Storage
  $testToken.Token | Set-Clipboard
  ```

## Data residency

OneLake doesn't currently guarantee data residency in a particular region when using the global endpoint ('https://onelake.dfs.fabric.microsoft.com'). When you query data in a region different than your workspace's region, there's a possibility that data could leave your region during the endpoint resolution process. If you're concerned about data residency, using the correct regional endpoint for your workspace ensures your data stays within its current region and doesn't cross any regional boundaries. You can discover the correct regional endpoint by checking the region of the capacity that the workspace is attached to.

OneLake regional endpoints all follow the same format: 'https://\<region\>-onelake.dfs.fabric.microsoft.com'. For example, a workspace attached to a capacity in the West US 2 region would be accessible through the regional endpoint 'https://westus-onelake.dfs.fabric.microsoft.com.

## Common issues

If a tool or package you've used over ADLS Gen2 is not working over OneLake, the most common issue is URL validation. As OneLake uses a different endpoint (dfs.fabric.microsoft.com) than ADLS Gen2 (dfs.core.windows.net), some tools don't recognize the OneLake endpoint and block it.  Some tools will allow you to use custom endpoints (such as PowerShell).  Otherwise, it's often a simple fix to add OneLake's endpoint as a supported endpoint.  If you find a URL validation issue or have any other issues connecting to OneLake, please [let us know](https://ideas.fabric.microsoft.com/).

## Samples

Create file

| **Request** | **PUT `https://onelake.dfs.fabric.microsoft.com/{workspace}/{item}.{itemtype}/Files/sample?resource=file`** |
|---|---|
| **Headers** | `Authorization: Bearer <userAADToken>` |
| **Response** | **ResponseCode:** `201 Created`<br>**Headers:**<br>`x-ms-version : 2021-06-08`<br>`x-ms-request-id : 272526c7-0995-4cc4-b04a-8ea3477bc67b`<br>`x-ms-content-crc64 : OAJ6r0dQWP0=`<br>`x-ms-request-server-encrypted : true`<br>`ETag : 0x8DA58EE365`<br>**Body:** |

## Next steps

- [OneLake API parity](onelake-api-parity.md)
- [Connect to OneLake with Python](onelake-access-python.md)
- [OneLake integration with Azure Synapse Analytics](onelake-azure-synapse-analytics.md)
