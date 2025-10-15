---
title: Create a OneLake Shared Access Signature (SAS)
description: Learn how to create a OneLake shared access signature to provide short-term, delegated access to OneLake.
author: mabasile-MSFT
ms.author: mabasile
ms.topic: concept-article
ms.date: 04/10/2025

#CustomerIntent: As a data engineer, I want to generate a OneLake SAS to integrate new applications into my Fabric environment.
---

# Create a OneLake shared access signature

You can create a OneLake shared access signature (SAS) to provide short-term, delegated access to a folder or file in OneLake backed by your Microsoft Entra credentials. A OneLake SAS can provide temporary access to applications that don't support Microsoft Entra. These applications can then load data or serve as proxies between other customer applications or software development companies.  

To create a OneLake SAS, request a user delegation key by calling the [Get User Delegation Key](/rest/api/storageservices/get-user-delegation-key) operation. Then, use the key to sign the SAS.

A OneLake SAS can grant access to files and folders within data items only. You can't use it for management operations such as creating or deleting workspaces or items.

Creating a OneLake SAS is similar to creating an [Azure Storage user-delegated SAS](/rest/api/storageservices/create-user-delegation-sas). You use the same parameters for compatibility with tools and applications that work with Azure Storage.

## Required permissions

Requesting a user delegation key is a tenant-level operation in Microsoft Fabric. The user or security principal who requests a user delegation key must have at least read permissions in one workspace in the Fabric tenant. The requesting user's identity is used to authenticate the SAS, so the user must have permission to the data that they grant the SAS access to.  

## Acquire an OAuth 2.0 token

To get the user delegation key, first request an OAuth 2.0 token from Microsoft Entra ID. Authorize the call to the `Get User Delegation Key` operation by providing the [bearer token](/entra/identity-platform/v2-protocols#tokens). For more information about requesting an OAuth token from Microsoft Entra ID, see the [article about authentication flows and application scenarios](/entra/identity-platform/authentication-flows-app-scenarios).

## Request the user delegation key

Calling the `Get User Delegation Key` operation returns the key as a set of values that are used as parameters on the user delegation SAS token. These parameters are described in the [Get User Delegation Key](/rest/api/storageservices/get-user-delegation-key) reference and in the next section.

> [!NOTE]
> Calling the `Get User Delegation Key` operation by using a Fabric workload, such as a Python notebook, requires the [regional endpoint](onelake-access-api.md#data-residency) for OneLake. The capacity region determines this endpoint. Otherwise, the received response is `200 Healthy` instead of the delegation key.

When a client requests a user delegation key by using an OAuth 2.0 token, OneLake returns the key on behalf of the client. A SAS created with this user delegation key is granted, at most, the permissions granted to the client. But they're scoped down to the permissions explicitly granted in the SAS.

You can create any number of OneLake SAS tokens for the lifetime of the user delegation key. However, a OneLake SAS and user delegation keys can be valid for no more than one hour. They can't exceed the lifetime of the token that requested them. These lifetime restrictions are shorter than the maximum lifetime of an Azure Storage user delegation SAS.  

## Construct a user delegation SAS

The following table summarizes the fields that are supported for a OneLake SAS token. Subsequent sections provide more details about these parameters and how they differ from Azure Storage SAS tokens. OneLake doesn't support every optional parameter that Azure Storage supports. A OneLake SAS constructed with an unsupported parameter will be rejected.

| SAS field name  | SAS token parameter  | Status  | Description  |
|---------|---------|---------|---------|
|`signedVersion`|`sv`| Required | This field indicates the version of the storage service that's used to construct the signature field. OneLake supports version `2020-02-10` and earlier, or version `2020-12-06` and later. |
|`signedResource`|`sr`|Required|This field specifies which resources are accessible via the shared access signature. Only blob (`b`) and directory (`d`) are applicable to OneLake.|
|`signedStart`|`st`|Optional|This field specifies the time when the shared access signature becomes valid. It's in ISO 8601 UTC format.|
|`signedExpiry`|`se`|Required|This field specifies the time when the shared access signature expires.|
|`signedPermissions`|`sp`|Required|This field indicates which operations the SAS can perform on the resource. For more information, see the [Specify permissions](#specify-permissions) section.|
|`signedObjectId`|`skoid`|Required|This field identifies a Microsoft Entra security principal.|
|`signedtenantId`|`sktid`|Required|This field specifies the Microsoft Entra tenant in which a security principal is defined.|
|`signedKeyStartTime`|`skt`|Required|This field specifies the time in UTC when the signing key starts. The `Get User Delegation Key` operation returns it.|
|`signedKeyExpiryTime`|`ske`|Required|This field specifies the time in UTC when the signing key ends. The `Get User Delegation Key` operation returns it.|
|`signedKeyVersion`|`skv`|Required|This field specifies the storage service version that's used to get the user delegation key. The `Get User Delegation Key` operation returns it. OneLake supports version `2020-02-10` and earlier, or version `2020-12-06` and later. |
|`signedKeyService`|`sks`|Required|This field indicates the valid service for the user delegation key. OneLake supports only Azure Blob Storage (`sks=b`).|
|`signature`|`sig`|Required|The signature is a hash-based message authentication code (HMAC) computed over the string-to-sign and key by using the SHA256 algorithm, and then encoded by using Base64 encoding.|
|`signedDirectoryDepth`|`sdd`|Optional|This field indicates the number of directories within the root folder of the directory specified in the `canonicalizedResource` field of the string-to-sign. It's supported only when `sr=d`.|
|`signedProtocol`|`spr`|Optional|OneLake supports only HTTPS requests.|
|`signedAuthorizedObjectId`|`saoid`|Unsupported|A OneLake SAS doesn't support this feature.|
|`signedUnauthorizedObjectId`|`suoid`|Unsupported|A OneLake SAS doesn't support this feature.|
|`signedCorrelationId`|`suoid`|Unsupported|A OneLake SAS doesn't support this parameter.|
|`signedEncryptionScope`|`ses`|Unsupported|A OneLake SAS doesn't currently support custom encryption scopes.|
|`signedIP`|`sip`|Unsupported|A OneLake SAS doesn't currently support IP filtering.|
|`Cache-Control` response header|`rscc`|Unsupported|A OneLake SAS doesn't support this parameter.|
|`Content-Disposition` response header|`rscd`|Unsupported|A OneLake SAS doesn't support this parameter.|
|`Content-Encoding` response header|`rsce`|Unsupported|A OneLake SAS doesn't support this parameter.|
|`Content-Language` response header|`rscl`|Unsupported|A OneLake SAS doesn't support this parameter.|
|`Content Type` response header|`rsct`|Unsupported|A OneLake SAS doesn't support this parameter.|

## Specify permissions

The permissions specified in the `signedPermissions` (`sp`) field on the SAS token indicate which operations a client that possesses the SAS can perform on the resource.

Permissions can be combined to permit a client to perform multiple operations with the same SAS. When you construct the SAS, you must include permissions in the following order: `racwdxyltmeopi`.

Examples of valid permission settings include `rw`, `rd`, `rl`, `wd`, `wl`, and `rl`. You can't specify a permission more than once.

To ensure parity with existing Azure Storage tools, OneLake uses the same permission format as Azure Storage. OneLake evaluates the permissions granted to a SAS in `signedPermissions`, the permissions of the signing identity in Fabric, and any [OneLake security roles](./security/get-started-onelake-security.md), if applicable.

Remember that some operations, such as setting permissions or deleting workspaces, generally aren't permitted on OneLake via Azure Storage APIs. Granting that permission (`sp=op`) doesn't allow a OneLake SAS to perform those operations.

|Permission  |URI symbol  |Resource  |Allowed operations  |
|---------|---------|---------|---------|
|Read|`r`|Directory, blob|Read the content, blocklist, properties, and metadata of any blob in the container or directory. Use a blob as the source of a copy operation. |
|Add|`a`|Directory, blob|Add a block to an append blob.|
|Create|`c`|Directory, blob|Write a new blob, snapshot a blob, or copy a blob to a new blob.|
|Write|`w`|Directory, blob|Create or write content, properties, metadata, or a blocklist. Snapshot or lease the blob. Use the blob as the destination of a copy operation.|
|Delete|`d`|Directory, blob|Delete a blob.|
|Delete version|`x`|Blob|Delete a blob version.|
|Permanent delete|`y`|Blob|Permanently delete a blob snapshot or version.|
|List|`l`|Directory|List blobs nonrecursively.|
|Tags|`t`|Blob|Read or write the tags on a blob.|
|Move|`m`|Directory, blob|Move a blob or a directory and its contents to a new location. |
|Execute|`e`|Directory, blob|Get the system properties. If the hierarchical namespace is enabled for the storage account, get the POSIX access control list of a blob.|
|Ownership|`o`|Directory, blob|Set the owner or owning group. This operation is unsupported in OneLake.|
|Permissions|`p`|Directory, blob|Set the permissions. This operation is unsupported in OneLake.|
|Set immutability policy|`i`|Blob|Set or delete the immutability policy or legal hold on a blob.|

## Specify the signature

The `signature` (`sig`) field is used to authorize a request that a client made with the shared access signature. The string-to-sign is a unique string that's constructed from the fields that must be verified to authorize the request. The signature is an HMAC that's computed over the string-to-sign and key by using the SHA256 algorithm, and then encoded by using Base64 encoding.

To construct the signature string of a user delegation SAS:

1. Create the string-to-sign from the fields that the request made.
1. Encode the string as UTF-8.
1. Compute the signature by using the HMAC SHA256 algorithm.

The fields that are included in the string-to-sign must be URL decoded. The required fields depend on the service version that's used for the authorization (`sv`) field. The following sections describe the string-to-sign configurations for versions that support OneLake SASs.

### Version 2020-12-06 and later

```http
StringToSign =  signedPermissions + "\n" +
                signedStart + "\n" +
                signedExpiry + "\n" +
                canonicalizedResource + "\n" +
                signedKeyObjectId + "\n" +
                signedKeyTenantId + "\n" +
                signedKeyStart + "\n" +
                signedKeyExpiry  + "\n" +
                signedKeyService + "\n" +
                signedKeyVersion + "\n" +
                signedAuthorizedUserObjectId + "\n" +
                signedUnauthorizedUserObjectId + "\n" +
                signedCorrelationId + "\n" +
                signedIP + "\n" +
                signedProtocol + "\n" +
                signedVersion + "\n" +
                signedResource + "\n" +
                signedSnapshotTime + "\n" +
                signedEncryptionScope + "\n" +
                rscc + "\n" +
                rscd + "\n" +
                rsce + "\n" +
                rscl + "\n" +
                rsct
```

### Version 2020-02-10 and earlier

This configuration applies to version 2020-02-10 and earlier, except for version 2020-01-10 (which the next section describes).

```http
StringToSign =  signedPermissions + "\n" +  
                signedStart + "\n" +  
                signedExpiry + "\n" +  
                canonicalizedResource + "\n" +  
                signedKeyObjectId + "\n" +
                signedKeyTenantId + "\n" +
                signedKeyStart + "\n" +
                signedKeyExpiry  + "\n" +
                signedKeyService + "\n" +
                signedKeyVersion + "\n" +
                signedAuthorizedUserObjectId + "\n" +
                signedUnauthorizedUserObjectId + "\n" +
                signedCorrelationId + "\n" +
                signedIP + "\n" +  
                signedProtocol + "\n" +  
                signedVersion + "\n" +  
                signedResource + "\n" +
                rscc + "\n" +
                rscd + "\n" +  
                rsce + "\n" +  
                rscl + "\n" +  
                rsct
```

### Version 2020-01-10

```HTTP
StringToSign =  signedPermissions + "\n" +
                signedStart + "\n" +
                signedExpiry + "\n" +
                canonicalizedResource + "\n" +
                signedKeyObjectId + "\n" +
                signedKeyTenantId + "\n" +
                signedKeyStart + "\n" +
                signedKeyExpiry  + "\n" +
                signedKeyService + "\n" +
                signedKeyVersion + "\n" +
                signedAuthorizedUserObjectId + "\n" +
                signedUnauthorizedUserObjectId + "\n" +
                signedCorrelationId + "\n" +
                signedIP + "\n" +
                signedProtocol + "\n" +
                signedVersion + "\n" +
                signedResource + "\n" +
                signedSnapshotTime + "\n" +
                rscc + "\n" +
                rscd + "\n" +
                rsce + "\n" +
                rscl + "\n" +
                rsct
```

### Canonicalized resource

The `canonicalizedResource` portion of the string is a canonical path to the resource. It must include the OneLake endpoint and the resource name, and it must be URL decoded. A OneLake path must include its workspace. A directory path must include the number of subdirectories that correspond to the `sdd` parameter.
  
The following examples show how to convert your OneLake URL to the corresponding canonicalized resource. Remember that OneLake supports both Distributed File System (DFS) and blob operations and endpoints. The account name for OneLake is always `onelake`.

#### Blob file

```http
URL = https://onelake.blob.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/sales.csv
canonicalizedResource = "/blob/onelake/myWorkspace/myLakehouse.Lakehouse/Files/sales.csv"
```

#### DFS directory

```http
URL = https://onelake.dfs.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/
canonicalizedResource = "/blob/onelake/myWorkspace/myLakehouse.Lakehouse/Files/"
```

## OneLake SAS example

The following example shows a OneLake SAS URI with a OneLake SAS token appended to it. The SAS token provides read and write permissions to the `Files` folder in the lakehouse.

```HTTP
https://onelake.blob.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/?sp=rw&st=2023-05-24T01:13:55Z&se=2023-05-24T09:13:55Z&skoid=<object-id>&sktid=<tenant-id>&skt=2023-05-24T01:13:55Z&ske=2023-05-24T09:13:55Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=d&sig=<signature>
```

## Related content

- [Create a user delegation SAS](/rest/api/storageservices/create-user-delegation-sas)
- [Request a user delegation key](/rest/api/storageservices/get-user-delegation-key)
- [Get started with OneLake data access roles](security/get-started-onelake-security.md)
