---
title: Sharing Microsoft Fabric Maps
description: Learn about sharing maps in Microsoft Fabric.
ms.reviewer: smunk
author: deniseatmicrosoft
ms.author: limingchen
ms.topic: concept-article
ms.custom:
ms.date: 12/05/2025
ms.search.form: Share map 
---

# Sharing Microsoft Fabric Maps (preview)

Microsoft Fabric Maps can be shared either directly with individuals or groups, or by packaging them into Fabric org apps for broader, governed distribution. Direct sharing provides flexible access and editing capabilities, while org apps offer a curated, read-only experience with streamlined permission management. This article provides the information you need to select the sharing method that best fits your audience, collaboration needs, and governance requirements.

> [!IMPORTANT]
> Fabric Maps is currently in [preview](../../fundamentals/preview.md). Features and functionality may change.

## Direct sharing

- **How it works**:
    You share a map item in Microsoft Fabric by granting specific users or groups permission to view or edit the map. This is done through direct access or by generating a share link.
- **Access control**:
    Permissions are enforced for both the map and its underlying data sources (like Lakehouse or eventhouse), ensuring secure, role-based access. Users don't need full workspace-level permissions. Sharing a map only grants access to the map item itself. Recipients must already have the necessary permissions on the underlying data sources for the map to display properly.
- **User experience**:
    Recipients find shared maps under "Shared with me" in Fabric. They can interact with the map according to their assigned permissions.
- **Best for**:
    Sharing with individuals or small groups who need explicit access to a specific map, with granular control over who can view or edit.

### Direct sharing options

Microsoft Fabric Maps can be shared directly with others using either a *share link* or by granting *direct access*. Each method offers different levels of flexibility, control, and security. Use the following table to understand which option best fits your sharing scenario.

| Feature            | Share link                                   | Direct access                              |
|--------------------|----------------------------------------------|--------------------------------------------|
| **Audience**       | Broad, less-defined                          | Specific, explicitly added                 |
| **Access Management** | Via link; can be forwarded                | Directly assigned; managed per user/group  |
| **Permissions**    | Set when generating link                     | Set per user/group                         |
| **Security**       | Depends on link distribution                 | More secure; only added users have access  |
| **Revocation**     | Remove link to revoke access                 | Remove user/group from permissions         |
| **Data Dependencies** | Recipients must already have permission to the underlying data | Same                  |

### Direct sharing key points

- **Share link**  
  - Quickly generate a URL to grant view or edit access.
  - Suitable for sharing with a wider or less-defined audience.
  - Permissions are managed via the link; access can be revoked by deleting the link.
  - Recipients must have access to underlying data sources for full functionality.

- **Direct access**  
  - Explicitly add individuals or groups to the map's permissions.
  - Ideal for targeted, secure sharing with precise control.
  - Recipients see the map in their "Shared with me" section.
  - Permissions are managed per user/group and can be revoked individually.

> [!TIP]  
> Use **share link** for quick, flexible sharing. Use **direct access** for secure, targeted collaboration.

For information on how to share maps using *share link*, see [Share link](./share-map-direct.md#share-link) in the *How to share a map using Microsoft Fabric org apps* article.

For information on how to share maps using *direct access*, see [Direct access](./share-map-direct.md#direct-access) in the *How to share a map using Microsoft Fabric org apps* article.

## Org apps sharing

- **How it works**:
    Maps are shared as part of an org app, which is a packaged set of resources (maps, reports, notebooks, real-time dashboards etc.) published to your organization. org apps are discoverable and accessible to users across the organization through the Apps experience in Fabric.
- **Access control**:
    Org apps permissions govern access to the app and its included map items. However, data sources maintain their own permission settings, so users must have the necessary access to those sources for the map to load completely.
- **User experience**:
    Users browse and launch org apps to access shared maps and related content. This method is scalable for large audiences and supports organizational governance.
- **Best for**:
    Broad distribution of maps and related resources to teams, departments, or the entire organization, with centralized management and discoverability.

For more information on how to share maps using org apps, see [How to share a map using org apps](./share-map-org-apps.md).

## Comparison: Direct sharing vs. org apps sharing

| Feature        | Direct sharing                                      | Org apps sharing                                   |
|----------------|-----------------------------------------------------|----------------------------------------------------|
| **Audience**   | Individuals or small groups                         | Broad teams, org-wide, stakeholders                |
| **Permissions**| Permissions apply to the app and maps, but users still need data-source access. | Permissions apply to the app and maps, but users still need data-source access. |
| **Experience** | Editable (if allowed)                               | Read-only, curated, noneditable                   |
| **Resharing**  | Manual                                              | Controlled by app owner                            |
| **Governance** | Limited                                             | Centralized, scalable, secure                      |
| **Revocation** | Manual                                              | Automatic on app deletion/access removal           |

### Key points

- **Direct sharing** is best for targeted collaboration, allowing recipients to view or edit the map as permitted. Permissions for the map and related resources must be managed manually.
- **Org apps sharing** is ideal for distributing maps to larger audiences in a secure, read-only format. Org apps simplify permission management, support centralized governance, and automatically revoke access when the app is deleted or access is removed.

> [!TIP]
> Use direct sharing for flexible, small-team collaboration. Choose org apps for scalable, secure distribution and a consistent, noneditable user experience.

## Next steps

To learn more, please see:

> [!div class="nextstepaction"]
> [Share a map through direct access](share-map-direct.md)

> [!div class="nextstepaction"]
> [How to share a map using org apps](share-map-org-apps.md)
