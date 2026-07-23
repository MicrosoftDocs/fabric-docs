---
title: Secure and manage OneLake shortcuts
description: Understand security for OneLake shortcuts and the permissions required for shortcut creation and data access.
ms.reviewer: aamerril # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.search.form: Shortcuts
ms.topic: concept-article
ms.date: 06/02/2026
#customer intent: As a security engineer, I want to understand security for OneLake shortcuts so that I can secure access to my data using roles and permissions.
---

# OneLake shortcut security

Shortcuts in OneLake serve as pointers to data residing in various storage accounts, whether within OneLake itself or in external systems like Azure Data Lake Storage (ADLS). This article explains the permissions required to create shortcuts and access data by using them.

To ensure clarity around the components of a shortcut, this article uses the following terms:

* Target path: The location that a shortcut points to.
* Shortcut path: The location where the shortcut appears.

## Create and delete shortcuts

To create a shortcut, you need Write permission on the Fabric item where you create the shortcut. In addition, you need Read access to the data the shortcut points to. Shortcuts to external sources might require certain permissions in the external system. The [What are shortcuts?](./onelake-shortcuts.md) article has the full list of shortcut types and required permissions.

| **Capability** | **Permission on shortcut path** | **Permission on target path** |
|---|---|---|---|---|
| **Create a shortcut** | Item Write permission or OneLake security ReadWrite | OneLake security Read<sup>1</sup>  |
| **Delete a shortcut** | Item Write permission or OneLake security ReadWrite | N/A |

<sup>1</sup> For items that don't support OneLake security yet, this permission is the item ReadAll permission.

## Accessing shortcuts

A combination of the permissions in the shortcut path and the target path governs the permissions for shortcuts. When a user accesses a shortcut, the most restrictive permission of the two locations is applied. Therefore, a user who has read and write permissions in the lakehouse but only read permissions in the target path can't write to the target path. Likewise, a user who only has read permissions in the lakehouse but read and write permissions in the target path also can't write to the target path.

This table shows the permissions needed for each shortcut action.

| **Capability** | **Permission on shortcut path** | **Permission on target path** |
|---|---|---|---|---|
| **Read file or folder content of shortcut** | OneLake security Read<sup>1</sup> | OneLake security Read<sup>1, 2</sup> |
| **Write to shortcut target location** | Item Write permission or OneLake security ReadWrite | Item Write permission or OneLake security ReadWrite |

<sup>1</sup> For items that don't support OneLake security yet, this permission is the item ReadAll permission.

> [!IMPORTANT]
> <sup>2</sup> **Exception to identity passthrough:** While OneLake security typically passes through the calling user's identity to enforce permissions, certain query engines operate differently. When accessing shortcut data through **Power BI semantic models using DirectLake over SQL** or **T-SQL engines configured for Delegated identity mode**, these engines don't pass through the calling user's identity to the shortcut target. Instead, they use the **item owner's identity** to access the data, and then apply OneLake security roles to filter what the calling user can see.
>
> This condition means:
>
> * The shortcut target is accessed using the item owner's permissions (not the end user's)
> * OneLake security roles still determine what data the end user can read
> * Any permissions configured directly at the shortcut target path for the end user are bypassed

## OneLake security

[OneLake security](./security/get-started-onelake-security.md) enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific tables and folders within a Fabric item, and assign them to users or groups. The access permissions determine what users can do across all engines in Fabric, ensuring consistent access control.

Users in the Admin, Member, and Contributor roles have full access to read data from a shortcut regardless of the defined OneLake data access roles. However, they still need access on both the shortcut path and target path as mentioned in [Workspace roles](./security/get-started-security.md#workspace-permissions).

Users in the Viewer role or users that had a lakehouse shared with them directly have access restricted based on if the user has access through a OneLake data access role. For more information on the access control model with shortcuts, see [Data access control model in OneLake.](./security/data-access-control-model.md#shortcuts)

Users in Viewer roles can create shortcuts if they have ReadWrite permissions on the path where the shortcut is created.

The following table illustrates the necessary permissions to perform shortcut operations.

| **Shortcut operation** | **Permission on shortcut path** | **Permission on target path** |
|---|---|---|---|---|
| **Create** | Fabric Read *and* OneLake security ReadWrite | OneLake security Read  |
| **Read (GET/LIST shortcuts)** | Fabric Read *and* OneLake security Read | N/A |
| **Update** | Fabric Read *and* OneLake security ReadWrite | OneLake security Read (on the new target) |
| **Delete** | Fabric Read *and* OneLake security ReadWrite | N/A |

## <span id="shortcut-auth-models"></span> Shortcut authentication models

OneLake shortcuts use two authentication models: passthrough and delegated. The model depends on the type of shortcut.

| Shortcut type | Authentication model | Details |
|---|---|---|
| **OneLake to OneLake** | Passthrough or delegated | Passthrough is the default. To use delegated authentication instead, choose **Delegated identity** as the connection method when [creating the shortcut](shortcuts/create-onelake-shortcut.md#authentication). |
| **External (multicloud)** | Delegated only | Users can access external data without direct access to the external system. Configure OneLake security on the shortcut to control what data in the external system can be accessed. |

### Passthrough authentication

In the passthrough model, the shortcut accesses data in the target location by passing the user's identity to the target system. Any user accessing the shortcut can only see data they have access to in the target. The source system retains full control over its data, and there's no need to replicate or redefine access controls.

:::image type="content" source=".\media\onelake-shortcut-security\passthrough-mode.png" alt-text="Diagram showing the user identity getting passed along the shortcut to the target path." lightbox=".\media\onelake-shortcut-security\passthrough-mode.png":::

### Delegated authentication

In the delegated model, the shortcut accesses data by using an intermediate credential, such as another user's identity, a service principal, or an account key. Delegated shortcuts allow permission management to be separated or "delegated" to another team or downstream user to manage. All delegated shortcuts in OneLake can have OneLake security roles defined for them.

Shortcuts to external systems like Amazon S3 or Google Cloud Storage always use delegated authentication. Shortcuts to internal OneLake targets can use delegated authentication if it's configured at the time of shortcut creation.

:::image type="content" source=".\media\onelake-shortcut-security\delegated-mode.png" alt-text="Diagram showing the delegated identity used to access the data in the shortcut target." lightbox=".\media\onelake-shortcut-security\delegated-mode.png":::

#### Delegated OneLake shortcuts

Delegated OneLake shortcuts use a configured connection identity instead of the signed-in user's identity. When accessing a delegated shortcut, the calling user sees the intersection of their security and the security that applies to the delegated identity. The following table outlines example scenarios.

| **Permission on shortcut path (consumer)** | **Permission on target path (producer)** | **Resulting access** |
|---|---|---|
| Full access | Full access | Full access  |
| Full access | CLS - only columns C1, C2 | CLS - only columns C1, C2 |
| CLS - only column C1 | CLS - only columns C1, C2 | CLS - only column C1 |

The following security considerations apply to delegated shortcuts:

- A user can only be in a single OneLake security role with CLS on the consumer side, if the producer side also has RLS.
- Column-level security (CLS) is supported for both the producer and consumer of a delegated shortcut.
- Row-level security (RLS) is supported for the producer side of a delegated shortcut, but cannot be set on the consumer side.
- In addition to OneLake security access to the producer path, accessing external shortcuts via Spark or direct API calls also requires read permissions on the item containing the external shortcut path.

## Related content

* [What are shortcuts?](./onelake-shortcuts.md)
* [Create a OneLake shortcut](shortcuts/create-onelake-shortcut.md)
* [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
* [Data Access Control Model in OneLake.](./security/data-access-control-model.md#shortcuts)
