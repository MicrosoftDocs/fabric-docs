---
title: Microsoft Fabric Multi-Workspace APIs
description: "This article describes what Fabric multi-workspace APIs are and the kinds of information that they retrieve."
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: overview
ms.custom:
ms.date: 08/13/2025

#customer intent: As a data platform administrator, I want to use multi-workspace APIs to aggregate and manage metadata across multiple workspaces so that I can enable unified governance, discovery, and compliance within Microsoft Fabric.

---

# Microsoft Fabric multi-workspace APIs

Microsoft Fabric supports multi-workspace scenarios such as data hub, favorites, lineage, search, OneLake catalog, and other governance and discovery features through multi-workspace APIs. These APIs enable users to access lightweight metadata from multiple workspaces that they can access outside the workspaces' network configurations. The APIs support unified search, organization, and navigation across the platform without exposing the underlying data content.

Multi-workspace APIs aren't always exposed as standalone REST endpoints. In many cases, these APIs are invoked indirectly. For example, they might be invoked as part of a broader REST call, a background process, or a portal operation (such as loading a page in the Fabric UI). Regardless of how they're triggered, they're carefully scoped to ensure that they return only metadata that a user is authorized to access.

## Categories of multi-workspace APIs

Multi-workspace APIs fall into the following two categories. Each serves specific scenarios and enforces access control in distinct ways.

* **Read-only, unfiltered multi-workspace APIs**

  * Designed to return metadata across all accessible workspaces for the user.
  * Don't enforce network-based access restrictions.
  * Read-only by design and not supported over workspace private endpoint connections.
  * Typically used in global aggregation scenarios such as platform-wide indexing or cataloging.

* **Filtered multi-workspace APIs**

  * Enforce access control based on the network origin of the API request.
  * Support secure usage from workspace private link, tenant private link, and public network configurations.
  * Return metadata only for the workspaces that are reachable based on the network context of the request.

These APIs support metadata aggregation at scale and are categorized based on how they handle access control and network security. The following table summarizes how different types of APIs in a multi-workspace environment return metadata based on the type of network connection.

| Multi-workspace API type | Inbound network connection | Returned metadata |
| -------- | -------------------------- | ----------------- |
| Read-only, unfiltered | Public internet, tenant private endpoint | All workspaces that the user can access |
| Filtered | Public internet, tenant private endpoint | Workspaces not secured via workspace private endpoint |
| Filtered | Workspace private endpoint | Only the workspace associated with that workspace private endpoint |

## Example scenario

Assume that a user has access to five Fabric workspaces:

* Workspace 1 and Workspace 2 are secured with workspace private endpoints WSPE 1 and WSPE 2, respectively.
* Workspaces 3, 4, and 5 are accessible over a public network or tenant private link.

:::image type="content" source="media/security-fabric-multi-workspace-api-overview/fabric-multi-workspace-scenarios.png" alt-text="Diagram that shows multi-workspace scenarios." lightbox="./media/security-fabric-multi-workspace-api-overview/fabric-multi-workspace-scenarios.png" border="false":::

In this example scenario, the user wants to call the Get Workspace API across various network configurations. The Get Workspace API is a read-only, unfiltered aggregation API that allows users to retrieve metadata about all workspaces that they can access. The behavior of this API can change (or remain consistent) across network configurations in Microsoft Fabric.

When the user calls the Get Workspace (unfiltered) API:

* From a public network: The API returns all five workspaces. No network restrictions are enforced, and access is based purely on user permissions.
* From a tenant private link: Behavior is the same as for a public network. All five workspaces are returned. A tenant private link doesn't impose workspace-level restrictions on unfiltered APIs.
* From a workspace private endpoint: The API call fails. Unfiltered APIs aren't supported over a workspace private link, because these isolated networks are designed to prevent cross-workspace data exposure.

This scenario illustrates how unfiltered aggregation APIs behave consistently across open networks but are intentionally blocked within workspace-scoped private environments for security.

## Data in scope and usage

* **Permissions, ownership, and creator information**: Metadata that includes fields that identify who owns or manages the item, who created or last modified it, and what level of access different principals have. Examples include `Artifact.CurrentPrincipalPermissions`, `Artifact.OwnerOrContact`, `Workspace.PrincipalPermissions`, and `Workspace.OwnerOrContact`.
* **Access and modification details**: Metadata that captures when and by whom an item or workspace was created, last accessed, or modified. Examples include `Artifact.CreateAccessModifyTime`, `Artifact.CreateAccessModifyUser`, `Workspace.CreateAccessModifyTime`, and related fields under `JobSchedule` and `InformationProtection`.
* **Identifiers, types, and descriptive attributes**: Metadata that covers unique identifiers, display names, artifact types, connection information, and URLs for locating or classifying items. Fields might include `Artifact.Id`, `Artifact.TypeOrSubtype`, `Artifact.NameOrDisplayName`, `Artifact.UrlOrConnectionString`, `Workspace.TypeOrSubtype`, and `Workspace.NameOrDisplayName`.
* **Data classification, labeling, and tags**: Metadata that includes fields used for governance and compliance purposes, such as information protection labels, classification states, content tags, and security restrictions. Examples include `Artifact.ContentTag`, `Artifact.InformationProtection.StateOrStatus`, `Artifact.InformationProtection.Restrictions`, and `Tenant.MipLabel`.
* **Organizational and platform-level attributes**: Metadata that reflects where the item resides within the broader platform or tenant structure, including domain, capacity, region, and platform metadata. Fields might include `Tenant.Domain`, `Tenant.Capacity`, `Workspace.StorageInfo`, and `Workspace.SecuritySettings`.
* **Relationships and hierarchies**: Metadata that indicates how an item or workspace relates to other objects (parent/child relationships, subartifacts, job lineage, and grouped entities). It might include fields such as `Artifact.RelationToArtifactParentChild`, `Artifact.SubArtifact`, `Workspace.RelationToWorkspaceParentChild`, `Workspace.Subfolder`, and `Tenant.Group`.

This metadata access is read-only and is restricted in scope. It doesn't involve access to the underlying data content or user-generated payloads within the artifacts. It's intended to support centralized discovery and governance capabilities across Fabric experiences.
