---
title: Create a OneLake shared access signature (SAS)
description: Learn how to create a OneLake SAS to provide short-term, delegated access to OneLake
author: mabasile-MSFT
ms.author: mabasile
ms.topic: concept-article
ms.date: 04/10/2025

#CustomerIntent: #CustomerIntent: As a data engineer, I want to generate a OneLake SAS to integrate new applications into my Fabric environment.
---

# Create a OneLake shared access signature (SAS)

You can create a OneLake shared access signature (SAS) to provide short-term, delegated access to a folder or file in OneLake backed by your Microsoft Entra credentials. OneLake SAS can provide temporary access to applications that don't support Microsoft Entra, allowing them to load data or serve as proxies between other customer applications or independent software vendors (ISVs).  

To create a OneLake SAS, first request a user delegation key, then use the key to sign the SAS. To request a user delegation key, call the [Get User Delegation Key](/rest/api/storageservices/get-user-delegation-key) operation.

A OneLake SAS can grant access to files and folders within data items only. It can't be used for management operations such as creating or deleting workspaces or items.

Creating a OneLake SAS is similar to creating an [Azure Storage user-delegated SAS](/rest/api/storageservices/create-user-delegation-sas), using the same parameters for compatibility with tools and applications that work with Azure Storage.

## Required permissions

Requesting a user delegation key is a tenant-level operation in Fabric. To request a user delegation key, the user or security principal requesting the user delegation key must have at least read permissions in one workspace in the Fabric tenant. The requesting user's identity is used to authenticate the SAS, which means that the user must have permission to the data they grant the SAS access to.  

## Acquire an OAuth 2.0 token

To get the user delegation key, first request an OAuth 2.0 token from Microsoft Entra ID. Authorize the call to the **Get User Delegation Key** operation by providing the [bearer token](/entra/identity-platform/v2-protocols#tokens). For more information about requesting an OAuth token from Microsoft Entra ID, see [Authentication flows and application scenarios](/entra/identity-platform/authentication-flows-app-scenarios).

## Request the user delegation key

Calling the **Get User Delegation Key** operation returns the key as a set of values that are used as parameters on the user delegation SAS token. These parameters are described in the [Get User Delegation Key](/rest/api/storageservices/get-user-delegation-key) reference and in the next section.

When a client requests a user delegation key using an OAuth 2.0 token, OneLake returns a user delegation key on behalf of the client. A SAS created with this user delegation key is granted at most the permissions granted to the client, scoped down to the permissions explicitly granted in the SAS.

You can create any number of OneLake SAS tokens for the lifetime of the user delegation key. However, a OneLake SAS and user delegation keys can be valid for at most one hour, and can't exceed the lifetime of the token requesting them. These lifetime restrictions are shorter than the maximum lifetime of an Azure Storage user delegated SAS.  

## Construct a user delegation SAS

The following table summarizes the fields that are supported for a OneLake SAS token. Subsequent sections provide more details about these parameters and how they differ from Azure Storage SAS tokens. OneLake doesn't support every optional parameter supported by Azure Storage, and a OneLake SAS constructed with an unsupported parameter will be rejected.

| SAS field name  | SAS token parameter  | Status  | Description  |
|---------|---------|---------|---------|
|`signedVersion`|`sv`| Required | Indicates the version of the storage service used to construct the signature field. OneLake supports versions `2020-02-10` and older, or version `2020-12-06` and newer. |
|`signedResource`|`sr`|Required|Specifies which resources are accessible via the shared access signature. Only blob (`b`) and directory (`d`) are applicable to OneLake.|
|`signedStart`|`st`|Optional|The time when the shared access signature becomes valid. ISO 8601 UTC format.|
|`signedExpiry`|`se`|Required|The time when the shared access signature expires.|
|`signedPermissions`|`sp`|Required|Indicates which operations the SAS can perform on the resource. For more information, see the [Specify permissions](how-to-create-a-onelake-shared-access-signature.md#specify-permissions) section.|
|`signedObjectId`|`skoid`|Required|Identifies a Microsoft Entra security principal.|
|`signedtenantId`|`sktid`|Required|Specifies the Microsoft Entra tenant in which a security principal is defined.|
|`signedKeyStartTime`|`skt`|Optional|Time in UTC when the signing key starts. Returned by the **Get User Delegation Key** operation.|
|`signedKeyExpiryTime`|`ske`|Required|Time in UTC when the signing key ends. Returned by the **Get User Delegation Key** operation.|
|`signedKeyVersion`|`skv`|Required|The storage service version used to get the user delegation key. Returned by the **Get User Delegation Key** operation. OneLake supports versions `2020-02-10` and older, or version `2020-12-06` and newer. |
|`signedKeyService`|`sks`|Required|The valid service for the user delegation key. OneLake only supports Blob Storage (`sks=b`).|
|`signature`|`sig`|Required|The signature is a hash-based message authentication code (HMAC) computed over the string-to-sign and key by using the SHA256 algorithm, and then encoded with Base64 encoding.|
|`signedDirectoryDepth`|`sdd`|Optional|Indicates the number of directories within the root folder of the directory specified in the canonicalizedResource field of the string-to-sign. Supported only when `sr=d`.|
|`signedProtocol`|`spr`|Optional|OneLake only supports https requests.|
|`signedAuthorizedObjectId`|`saoid`|Unsupported|OneLake SAS doesn't support this feature.|
|`signedUnauthorizedObjectId`|`suoid`|Unsupported|OneLake SAS doesn't support this feature.|
|`signedCorrelationId`|`suoid`|Unsupported|OneLake SAS doesn't support this parameter.|
|`signedEncryptionScope`|`ses`|Unsupported|OneLake SAS doesn't currently support custom encryption scopes.|
|`signedIP`|`sip`|Unsupported|OneLake SAS doesn't currently support IP filtering.|
|`Cache-Control` response header|`rscc`|Unsupported|OneLake SAS doesn't support this parameter.|
|`Content-Disposition` response header|`rscd`|Unsupported|OneLake SAS doesn't support this parameter.|
|`Content-Encoding` response header|`rsce`|Unsupported|OneLake SAS doesn't support this parameter.|
|`Content-Language` response header|`rscl`|Unsupported|OneLake SAS doesn't support this parameter.|
|`Content Type` response header|`rsct`|Unsupported|OneLake SAS doesn't support this parameter.|

## Specify permissions

The permissions specified in the `signedPermissions` (`sp`) field on the SAS token indicate which operations a client possessing the SAS can perform on the resource.

Permissions can be combined to permit a client to perform multiple operations with the same SAS. When you construct the SAS, you must include permissions in the following order: `racwdxltmeop`.

Examples of valid permission settings include `rw`, `rd`, `rl`, `wd`, `wl`, and `rl`. You can't specify a permission more than once.

To ensure parity with existing Azure Storage tools, OneLake uses the same permission format as Azure Storage. OneLake evaluates the permissions granted to a SAS in `signedPermissions`, the permissions of the signing identity in Fabric, and any [OneLake data access roles](/fabric/onelake/security/get-started-data-access-roles), if applicable. Remember that some operations, such as setting permissions or deleting workspaces, aren't permitted on OneLake via Azure Storage APIs generally. Granting that permission (`sp=op`) doesn't allow a OneLake SAS to perform those operations.

|Permission  |URI symbol  |Resource  |Allowed operations  |
|---------|---------|---------|---------|
|Read|r|Directory, Blob|Read the content, blocklist, properties, and metadata of any blob in the container or directory. Use a blob as the source of a copy operation. |
|Add|a|Directory, Blob|Add a block to an append blob.|
|Create|c|Directory, Blob|Write a new blob, snapshot a blob, or copy a blob to a new blob.|
|Write|w|Directory, Blob|Create or write content, properties, metadata, or blocklist. Snapshot or lease the blob. Use the blob as the destination of a copy operation.|
|Delete|d|Directory, Blob|Delete a blob.|
|Delete version|x|Blob|Delete a blob version.|
|Permanent delete|y|Blob|Permanently delete a blob snapshot or version.|
|List|l|Directory|List blobs nonrecursively.|
|Tags|t|Blob|Read or write the tags on a blob.|
|Move|m|Directory, Blob|Move a blob or a directory and its contents to a new location. |
|Execute|e|Directory, Blob|Get the system properties and, if the hierarchical namespace is enabled for the storage account, get the POSIX ACL of a blob.|
|Ownership|o|Directory, Blob|Set the owner or owning group. Unsupported in OneLake.|
|Permissions|p|Directory, Blob|Set the permissions. Unsupported in OneLake.|
|Set Immutability Policy|i|Blob|Set or delete the immutability policy or legal hold on a blob.|

## Specify the signature

The `signature` (`sig`) field is used to authorize a request made by a client with the shared access signature. The string-to-sign is a unique string that's constructed from the fields that must be verified to authorize the request. The signature is an HMAC that's computed over the string-to-sign and key by using the SHA256 algorithm, and then encoded by using bBase65 encoding.

To construct the signature string of a user delegation SAS, create the string-to-sign from the fields made by the request, encode the string as UTF-8, and then compute the signature by using the HMAC-SHA256 algorithm. The fields that are included in the string-to-sign must be URL-decoded.

The fields required in the string-to-sign depend on the service version that's used for authorization (`sv`) field. The following section describes the string-to-sign configurations for versions that support OneLake SASs.

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

This configuration applies to version 2020-02-10 and earlier, except for version 2020-01-10 which is described in the following section.

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

The `canonicalizedResource` portion of the string is a canonical path to the resource. It must include the OneLake endpoint and the resource name, and must be URL decoded. A OneLake path must include its workspace, and a directory path must include the number of subdirectories that correspond to the `sdd` parameter.
  
The following examples show how to convert your OneLake URL to the corresponding canonicalized resource. Remember that OneLake supports both DFS and Blob operations and endpoints, and that the **account name** for your OneLake is always **onelake**.

#### Blob File

```http
URL = https://onelake.blob.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/sales.csv
canonicalizedResource = "/blob/onelake/myWorkspace/myLakehouse.Lakehouse/Files/sales.csv"
```

#### DFS Directory

```http
URL = https://onelake.dfs.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/
canonicalizedResource = "/blob/onelake/myWorkspace/myLakehouse.Lakehouse/Files/"
```

## OneLake SAS example

The following example shows a OneLake SAS URI with a OneLake SAS token appended to it. The SAS token provides read and write permissions to the Files folder in the lakehouse.

```HTTP
https://onelake.blob.fabric.microsoft.com/myWorkspace/myLakehouse.Lakehouse/Files/?sp=rw&st=2023-05-24T01:13:55Z&se=2023-05-24T09:13:55Z&skoid=<object-id>&sktid=<tenant-id>&skt=2023-05-24T01:13:55Z&ske=2023-05-24T09:13:55Z&sks=b&skv=2022-11-02&sv=2022-11-02&sr=d&sig=<signature>
```

## Related content

- [Create an Azure Storage user delegation SAS](/rest/api/storageservices/create-user-delegation-sas)
- [Request a user delegation key](/rest/api/storageservices/get-user-delegation-key)
- [Get started with OneLake data access roles](security/get-started-data-access-roles.md)
