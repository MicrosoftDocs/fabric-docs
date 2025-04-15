---
title: What is a OneLake shared access signature (SAS)
description: Learn how OneLake SAS can provide short-term, delegated access to OneLake
author: mabasile-MSFT
ms.author: mabasile
ms.topic: concept-article 
ms.date: 04/10/2025

#CustomerIntent: As a data engineer, I want to generate a OneLake SAS to integrate new applications into my Fabric environment.
---

# What is a OneLake shared access signature (SAS)?

A OneLake shared access signature (SAS) provides secure, short-term, and delegated access to resources in your OneLake. With a OneLake SAS, you have granular control over how a client can access your data. For example:

- What resources the client can access.
- What permissions they have to the resources.
- How long the SAS is valid.

Every OneLake SAS (and user delegation key) is always backed by a Microsoft Entra identity, has a maximum lifetime of 1 hour, and can only grant access to folders and files within a data item, like a lakehouse.

## How a shared access signature works

A shared access signature is a token appended to the URI for a OneLake resource. The token contains a special set of query parameters that indicate how the client can access the resource. One of the query parameters is the signature. It's constructed from the SAS parameters and signed with the key that was used to create the SAS. OneLake uses this signature to authorize access to the folder or file in OneLake. OneLake SAS uses the same format and properties as [Azure Storage user-delegated SAS](/rest/api/storageservices/create-user-delegation-sas), but with more security restrictions on the lifetime and scope. 

A OneLake SAS is signed with a user delegation key (UDK), which is backed by a Microsoft Entra credential. You can request a user delegation key with the [Get User Delegation Key](/rest/api/storageservices/get-user-delegation-key) operation. Then, you use this key (while it's still valid) to build the OneLake SAS. The permissions of that Microsoft Entra credential, along with the permissions explicitly granted to the SAS, determine the client's access to the resource.

## Authorizing a OneLake SAS

When a client or application accesses OneLake with a OneLake SAS, the request is authorized using the Microsoft Entra credentials that requested the UDK used to create the SAS. Therefore, all OneLake permissions granted to that Microsoft Entra identity apply to the SAS, meaning a SAS can never exceed the permissions of the user creating it. Furthermore, when creating a SAS you explicitly grant permissions, letting you provide even more scoped-down permissions to the SAS. Between the Microsoft Entra identity, the explicitly granted permissions, and the short-lifetime, OneLake follows security best practices for providing delegated access to your data.

## When to use a OneLake SAS

OneLake SAS delegates secure and temporary access to OneLake, backed by a Microsoft Entra identity. Applications without native Microsoft Entra support can use a OneLake SAS to gain temporary access to load data without complicated set-up and integration work.

OneLake SAS also supports applications serving as proxies between users and their data. For example, some independent software vendors (ISVs) run between users and their Fabric workspace, providing extra functionality and possibly a different authentication model. By delegating access with a OneLake SAS, these ISVs can manage access to the underlying data and provide direct access to data, even if their users don't have Microsoft Entra identities.

## Managing OneLake SAS

Two settings in your Fabric tenant manage the use of OneLake SAS.

The first setting is a tenant-level setting, **Use short-lived user-delegated SAS tokens**, which manages the generation of user delegation keys. Because user delegation keys are generated at the tenant-level, they're controlled by a tenant setting. This setting is turned on by default, since these user delegation keys have equivalent permissions to the Microsoft Entra identity requesting them and are always short-lived.

> [!NOTE]
> Turning off this feature prevents all workspaces from using OneLake SAS, as all users will be unable to generate user delegation keys.

The second setting is a delegated workspace setting, **Authenticate with OneLake user-delegated SAS tokens**, which controls whether a workspace accepts OneLake SAS. This setting is turned off by default. A workspace admin can turn on this setting to allow authentication with OneLake SAS in their workspace. A tenant admin can turn this setting on for all workspaces via the tenant setting, or leave it to workspace admins to turn on.

You can also monitor the creation of user delegation keys in the Microsoft Purview portal. To view all keys generated in your tenant, search for the operation name **generateonelakeudk**. Because creating a SAS is a client-side operation, you can't monitor or limit the creation of a OneLake SAS, only the generation of a UDK.

## Best practices with OneLake SAS

- Always use HTTPS to create or distribute a SAS to protect against man-in-the-middle attacks seeking to intercept the SAS.
- Track your, key, and SAS token expiry times. OneLake user delegation keys and SAS tokens have a maximum lifetime of 1 hour. Attempting to request a UDK or build a SAS with a lifetime longer than 1 hour causes the request to fail. To prevent SAS being used to extend the lifetime of expiring OAuth tokens, the lifetime of the token must also be longer than the expiry time of the user delegation key and the SAS.
- Be careful with a SAS token's start time. Setting the start time for a SAS as the current time might cause failures for the first few minutes, due to differing start times between machines (clock skew). Setting the start time to be a few minutes in the past helps protect against these errors.
- Grant the least possible privileges to the SAS. Providing the minimum required privileges to the fewest possible resources is a security best-practice and lessens the impact if a SAS is compromised.
- Monitor the generation of user delegation keys. You can audit the creation of user delegation keys in the Microsoft Purview portal. Search for the operation name **generateonelakeudk** to view keys generated in your tenant.
- Understand the limitations of OneLake SAS. Because OneLake SAS tokens can't have workspace-level permissions, they aren't compatible with some Azure Storage tools which expect container-level permissions to traverse data, like Azure Storage Explorer.

## Related content

* [How to create a OneLake SAS](how-to-create-a-onelake-shared-access-signature.md)
* [Generate a user delegation key](/rest/api/storageservices/get-user-delegation-key)
* [Fabric and OneLake data security](security/data-access-control-model.md)
* [Create a user delegation SAS for a blob with Python](/azure/storage/blobs/storage-blob-user-delegation-sas-create-python)
