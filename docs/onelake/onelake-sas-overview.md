---
title: What are OneLake shared access signatures (SAS) (Preview)
description: Learn how OneLake SAS can provide short-term, delegated access to OneLake
author: mabasile-MSFT
ms.author: mabasile
ms.topic: overview 
ms.date: 09/24/2024

#CustomerIntent: As a data engineer, I want to generate OneLake SAS to integrate new applications into my Fabric environment.
---

# What are OneLake Shared Access Signatures (SAS)? (Preview)

OneLake shared access signatures (SAS) provides secure, short-term, and delegated access to resources in your OneLake. With a SAS, you have granular control over how a client can access your data. For example:

- What resources the client may access.
- What permissions they have to those reosurces.
- How long the SAS is valid.

OneLake SAS use the same format and properties as [Azure Storage user-delegated SAS](/rest/api/storageservices/create-user-delegation-sas), but instead provide access to files and folders within OneLake only.  Furthermore, OneLake SAS (and user delegation keys) have a maximum lifetime of 1 hour, and only grant access to folders and files within a data item, like a lakehouse.

[!INCLUDE feature-preview-note]

## How a shared access signature works

A shared access signature is a token appended to the URI for a OneLake resource. The token contains a special set of query parameters that indicate how the resources may be accessed by the client.  One of the query parameters is the signature. It's constructed from the SAS parameters and signed with the key that was used to create the SAS.  OneLake uses this signature to authorize access to the folder or file in OneLake.

All OneLake SAS are signed with user delegation keys (UDKs), which are backed by Microsoft Entra credentials. You can request a user delegation key with the [Get User Delegation Key](/rest/api/storageservices/get-user-delegation-key) operation. Then, you use this key (while it is still valid) to build the OneLake SAS.  The permissions granted to the SAS are the intersection of the permissions of the signing user and the permissions explicitly granted to the SAS, so you can grant the fewest required permissions for any operation.

## Authorizing a OneLake SAS

When a client or application accesses OneLake with a OneLake SAS, the request is authorized using the Microsoft Entra credentials that requested the UDK used to create the SAS.  Therefore, all OneLake permissions granted to that Microsoft Entra identity apply to the SAS, meaning a SAS can never exceed the permissions of the user creating it.  Furthermore, when creating a SAS you explicitly grant permissions, letting you provide even more scoped-down permissions to the SAS.  Between the Entra identity, the explicitly granted permissions, and the short-lifetime, OneLake SAS follow security best practices for providing delegated access to your data.

## When to use a OneLake SAS

OneLake SAS delegate secure and temporary access to OneLake, backed by an Entra identity.  SAS are often used by applications without native Microsoft Entra support, allowing them temporary access to load data into OneLake without complicated set-up and integration work.

OneLake SAS are also used by applications which serve as a proxy between users and their application.  For example, some ISVs exist between users and their Fabric workspace, providing additional functionality and possibly a different authentication model.  By using OneLake SAS, these ISVs can manage access to the underlying data and provide direct access to data, even if their users do not have Microsoft Entra identies.

## Managing OneLake SAS

The use of OneLake SAS is managed by two settings in your Fabric tenant.  The first is a tenant-level setting, **Use short-lived user-delegated SAS tokens**, which manages the generation of user delegation keys. User delegation keys are generated at the tenant-level, and therefore are managed by this tenant setting.  This setting is turned on by default, since these user delegation keys have equivalent permissions to the Entra identity requesting them and are always short-lived.

[!NOTE]
Turning this feature off will prevent all workspaces from making use of OneLake SAS, as all users will be unable to generate user delegation keys.

The second setting is a delegated workspace setting, **Authenticate with OneLake user-delegated SAS tokens**, which controls whether a workspace will accept OneLake SAS.  This setting is turned off by default and can be turned on by a workspace admin who wants to allow the use of OneLake SAS in their workspace.  A tenant admin can turn this setting on for all workspaces via the tenant setting, or leave it to workspace admins to turn on.  
  
You can also monitor the creation of user delegation keys via the Microsoft Purview compliance portal. You can search for the operation name **generateonelakeudk** to view all keys generated in your tenant.  Because creating a SAS is a client-side operation, you cannot monitor or limit the creation of OneLake SAS, only the generation of UDKs, and whether your workspace accepts SAS as an authentication method.

## Best practices with OneLake SAS

- Always use HTTPS to create or distribute a SAS.  This protects against man-in-the-middle attacks seeing to intercept the SAS.
- Track your token, key, and SAS expiry times.  OneLake user delegation keys and SAS have a maximum lifetime of 1 hour. Attempting to request a UDK or build a SAS with a lifetime longer than 1 hour will cause the request to fail.  To prevent SAS being used to extend the lifetime of expiring OAuth tokens, the lifetime of the token must also be longer than the expiry time of the user delegation key and SAS.
- Be careful with SAS start times.  Setting the start time for a SAS as the current time may cause failures for the first few minutes, due to differing start times between machines (clock skew).  Setting the start time to be a few minutes in the past will help protect against this.
- Grant the least possible privileges to the SAS.  Providing the minimum required privileges to the fewest possible resources is a security best-practice.  This lessens the impact if a SAS is compromised.
- Audit the generation of user delegation keys.  You can audit the creation of user delegation keys in the Microsoft Purview compliance portal.  Search for the operation name 'generateonelakeudk' to view keys generated in your tenant.
- OneLake SAS cannot have workspace-level permissions, which may affect compatibility with some Azure Storage tools which expect at least container-level permissions to traverse OneLake, such as Azure Storage Explorer.

## Related content

> [!div class="nextstepaction"]
> [How to create a OneLake SAS](how-to-create-onelake-sas.md)
> [Generate a user delegation key](/rest/api/storageservices/get-user-delegation-key)
> [Fabric and OneLake data security](security/data-access-control-model.md)
> [Create a user delegation SAS for a blob with Python](/azure/storage/blobs/storage-blob-user-delegation-sas-create-python)
