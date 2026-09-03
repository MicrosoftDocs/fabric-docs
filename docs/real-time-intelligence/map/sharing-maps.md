---
title: Sharing Microsoft Fabric Maps
description: Learn about sharing maps in Microsoft Fabric.
ms.reviewer: smunk, limingchen
ms.topic: concept-article
ms.date: 09/28/2026
ms.search.form: Share map 
---

# Sharing Microsoft Fabric Maps

You can share Microsoft Fabric Maps directly with individuals or groups, package them into Fabric org apps for broader governed distribution, or add them to a Real-Time Dashboard to provide spatial context alongside real-time metrics. This article helps you select the method that best fits your audience, collaboration needs, and reuse scenario.

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
    An org app can include maps as part of a packaged set of resources (maps, reports, notebooks, real-time dashboards, and other items) published to your organization. Users across the organization can discover and access org apps through the Apps experience in Fabric.
- **Access control**:
    Org apps permissions govern access to the app and its included map items. However, data sources maintain their own permission settings, so users must have the necessary access to those sources for the map to load completely.
- **User experience**:
    Users browse and launch org apps to access shared maps and related content. This method is scalable for large audiences and supports organizational governance.
- **Best for**:
    Broad distribution of maps and related resources to teams, departments, or the entire organization, with centralized management and discoverability.

For more information on how to share maps using org apps, see [How to share a map using org apps](./share-map-org-apps.md).

## Add a map to a real-time dashboard

Add a Fabric map to a new or existing real-time dashboard when you want to display the authored map alongside real-time metrics. The resulting Fabric Maps tile references the source map item and renders its existing data sources, queries, layers, and styling. Reload the dashboard page to display saved map configuration changes.

The Fabric Maps tile is view-only. Dashboard viewers can zoom, pan, hover, use basic tooltips, and interact with map-layer filters as they can in Fabric Maps view mode. They can add, modify, or remove unlocked filters, but they can't remove locked filters. Filter changes made in the dashboard are temporary and aren't saved to the source map item. Queries, data sources, layers, and styling remain authored in the source map and can't be edited from the dashboard. Real-Time Dashboard parameters don't filter or otherwise modify the Fabric Maps tile.

After saving the map, use the destination Real-Time Dashboard to choose the tile's page, rename it, and adjust its size. Saving a map that is already present in the dashboard creates another Fabric Maps tile.

Adding a map to a dashboard doesn't grant access to the dashboard, map item, or the map's underlying data sources. A viewer must have access to all three, and the viewer's identity and permissions are used for authorization.

For instructions, see [Save a Fabric map to a real-time dashboard](save-map-to-real-time-dashboard.md).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Compare map sharing and reuse methods

| Feature | Direct sharing | Org apps sharing | Real-Time Dashboard |
| --- | --- | --- | --- |
| **Best for** | Giving individuals or small groups direct access to a map | Distributing a curated collection of Fabric content to a broad audience | Combining a reusable map with real-time metrics |
| **Permissions** | Grants map access; users still need access to underlying data | App and item permissions apply; users still need access to underlying data | Doesn't grant access; viewers need dashboard, map, and underlying data-source access |
| **Experience** | Editable when permitted | Read-only and curated | View-only map tile in a dashboard |
| **Source updates** | Users open the current map item | App users see updates after the app content is updated | Reload the dashboard page to display saved map configuration changes |
| **Governance** | Access managed per user, group, or link | Audience managed through the org app | Dashboard access and map access are managed separately |

### Key points

- **Direct sharing** is best for targeted collaboration, allowing recipients to view or edit the map as permitted. Permissions for the map and related resources must be managed manually.
- **Org apps sharing** is ideal for distributing maps to larger audiences in a secure, read-only format. Org apps simplify permission management, support centralized governance, and automatically revoke access when the app is deleted or access is removed.
- **Real-Time Dashboard** is best for reusing an authored map alongside operational metrics. Saving a map to a dashboard doesn't share either item or change their permissions.

> [!TIP]
> Use direct sharing for flexible, small-team collaboration. Choose org apps for scalable, secure distribution and a consistent, noneditable user experience.

## Next steps

> [!div class="nextstepaction"]
> [Save a Fabric map to a Real-Time Dashboard](save-map-to-real-time-dashboard.md)

> [!div class="nextstepaction"]
> [Share a map through direct access](share-map-direct.md)

> [!div class="nextstepaction"]
> [Share a map using org apps](share-map-org-apps.md).
