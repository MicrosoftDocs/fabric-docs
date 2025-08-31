---
title: Moving data with OneLake and AzCopy
description: AzCopy makes it easy to quickly move data into, out of, and around OneLake.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: how-to
ms.custom:
ms.date: 08/12/2025
#customer intent: As a data engineer, I want to understand how I can use AzCopy to copy data in or out of OneLake easily and with the best performance, from a variety of sources.
---

# AzCopy

AzCopy is a powerful command-line utility designed to facilitate the transfer of data between Azure Storage accounts. Because Microsoft OneLake supports the same APIs, SDKs, and tools as Azure Storage, you can also use AzCopy to load data to and from OneLake. This article helps you use AzCopy with OneLake, from copying data between artifacts to uploading or downloading data.  

## Why use AzCopy and OneLake?

AzCopy is optimized for data plane operations at scale and large scale data movement. When you copy data between storage accounts (including OneLake), data moves directly from storage server to storage server, minimizing performance bottlenecks. AzCopy is also easy-to-use and reliable, with built-in mechanisms to handle network interruptions and retries. With AzCopy, it's easy to upload data to OneLake, or load data from existing sources directly into your items in Fabric!  

## Trusted workspace access and AzCopy

Trusted workspace access lets you access firewall-enabled Azure Storage accounts securely by configuring a resource instance rule on an Azure Storage account. This rule lets your specific Fabric workspace access the storage account's firewall from select Fabric experiences, like shortcuts, pipelines, and AzCopy. By configuring trusted workspace access, AzCopy can copy data from a firewall-enabled Azure Storage account into OneLake without affecting the firewall protections. Learn more at [trusted workspace access](/fabric/security/security-trusted-workspace-access).  

## Getting Started

If you're new to AzCopy, you can learn how to download and get started with AzCopy at [Get started with AzCopy](/azure/storage/common/storage-use-azcopy-v10).

When you use AzCopy with OneLake, there's a few key points to remember:

1. Add "fabric.microsoft.com" as a trusted domain using the--trusted-microsoft-suffixes parameter.  
2. Select the subscription of your source Azure Storage account when logging in with your Microsoft Entra ID, as OneLake only cares about the tenant.  
3. Use double quotes when using AzCopy in the command prompt, and single quotes when in PowerShell.  

The samples in this article also assume that your Microsoft Entra ID has appropriate permissions to access both the source and destinations.  

Finally, you need at least one source and destination for your data movement - the samples in this page use two Fabric lakehouses and one ADLS account.  

## Sample: Copying data between Fabric workspaces

Use this sample to copy a file from a lakehouse in one workspace to a different workspace by using the [azcopy copy](https://github.com/Azure/azure-storage-azcopy/wiki/azcopy_copy) command. Remember to authenticate first by running `azcopy login ` first.

Syntax

```azcopy

azcopy copy "https://onelake.dfs.fabric.microsoft.com/<source-workspace-name>/<source-item-name>/Files/<source-file-path>" "https://onelake.dfs.fabric.microsoft.com/<destination-workspace-name>/<destination-item-name>/Files/<destination-file-path>" --trusted-microsoft-suffixes "fabric.microsoft.com" 

```

The copy operation is synchronous so when the command returns, all files are copied.  

## Sample: Copying data from ADLS to OneLake with a shared access signatures (SAS)

A shared access signature (SAS) provides short-term, delegated access to Azure Storage and OneLake, and is a great option to provide tools or users temporary access to storage for one-time upload or downloads. A SAS is also a great option if the Azure Storage account is in a different tenant than your OneLake, as Entra authorization will not work if the tenants are different.  

This sample uses a unique SAS token to authenticate to both Azure Storage and OneLake. To learn more about generating and using SAS tokens with Azure Storage and OneLake, check out the following pages:
* [How to create a OneLake shared access signature (SAS)](how-to-create-a-onelake-shared-access-signature.md)
* [Grant limited access to Azure storage resources using shared access signatures (SAS)](/azure/storage/common/storage-sas-overview)

> [!Note]
> When using a SAS token to authenticate to OneLake in AzCopy, you must set the '``-s2s-preserve-access-tier' parameter to false.
  
```azcopy copy

azcopy copy "https://<account-name>.blob.core.windows.net/<source-container-name>/<source-file-path>?<blob-sas-token>" "https://onelake.dfs.fabric.microsoft.com/<destination-workspace-name>/<destination-item-name>/Files/<destination-file-path>?<onelake-sas-token>" --trusted-microsoft-suffixes "fabric.microsoft.com" --s2s-preserve-access-tier=false

```

## Limitations

Since OneLake is a managed data lake, some operations aren't supported with AzCopy. For example, you can't use AzCopy to move or copy entire items or workspaces. Instead, create the new item in your destination location using a Fabric experience (like the portal), and then use AzCopy to move the contents of the existing item into the new item.  

### Cross-tenant operations

When attempting to perform operations directly between two Fabric tenants, you must use [external data sharing](/fabric/governance/external-data-sharing-overview).  This means you cannot currently use AzCopy to directly load data between two Fabric tenants, as that results in a direct cross-tenant operation.  Other methods to load data, such as downloading the data locally or to a Spark cluster and then re-uploading the data to the new tenant, will function.  

## Related content

* [Copy blobs between Azure Storage accounts by using AzCopy](/azure/storage/common/storage-use-azcopy-blobs-copy)
