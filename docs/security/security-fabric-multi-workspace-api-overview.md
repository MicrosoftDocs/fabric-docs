---
title: Microsoft Fabric multi-workspace API 
description: "This article describes what Fabric multi-workspace APIs are and kinds of information they retrieve."
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: overview
ms.custom:
ms.date: 08/13/2025

#customer intent: As a data platform administrator, I want to use multi-workspace APIs to aggregate and manage metadata across multiple workspaces so that I can enable unified governance, discovery, and compliance within Microsoft Fabric.

---

# Microsoft Fabric multi-workspace APIs

Microsoft Fabric supports multi-workspace scenarios such as Data Hub, Favorites, Lineage, Search, OneLake Catalog, and other governance and discovery features through multi-workspace APIs. These APIs enable users to access lightweight metadata from multiple workspaces that they have access to outside of the workspaces’ network configurations, supporting unified search, organization, and navigation across the platform without exposing the underlying data content.

Multi-workspace APIs aren't always exposed as standalone REST endpoints. In many cases, these APIs may be invoked indirectly, for example, as part of a broader REST call, a background process, or a portal operation (such as loading a page in the Fabric UI). Regardless of how they're triggered, they're carefully scoped to ensure they return only metadata a user is authorized to see.

## Overview of multi-workspace APIs

Multi-workspace APIs fall into two categories, each serving specific scenarios and enforcing access control in distinct ways:

* **Read-only unfiltered multi-workspace APIs**

   * Designed to return metadata across all accessible workspaces for the user.
   * Don't enforce network-based access restrictions.
   * Read-only by design and not supported over Workspace Private Endpoint connections.
   * Typically used in global aggregation scenarios such as platform-wide indexing or cataloging.

* **Filtered multi-workspace APIs**

   * Enforce access control based on the network origin of the API request.
   * Support secure usage from Workspace Private Link, Tenant Private Link, and Public network configurations.
   * Return metadata only for the workspaces that are reachable based on the network context of the request.

These APIs are designed to support metadata aggregation at scale and are categorized based on how they handle access control and network security. The following table summarizes how different types of APIs in a multi-workspace environment return metadata based on the type of network connection used.

| API Type                  | Inbound Network Connection | Metadata Returned                          |
|---------------------------|----------------------------|--------------------------------------------|
| Read-Only Unfiltered API  | Public internet / Tenant PE| All workspaces the user has access to      |
| Filtered multi-workspace API  | Public internet / Tenant PE| Workspaces not secured using WS PE         |
| Filtered multi-workspace API  | Workspace Private Endpoint | Only the workspace associated with that WS PE|

Let’s assume a user has access to five Fabric workspaces: Workspace 1 and Workspace 2 are secured with Workspace Private Endpoints WS PE 1, WS PE 1 respectively, while Workspaces 3, 4, and 5 are accessible over Public network or Tenant Private Link.

:::image type="content" source="media/security-fabric-multi-workspace-api-overview/fabric-multi-workspace-scenarios.png" alt-text="Diagram showing multi workspace scenarios." lightbox="./media/security-fabric-multi-workspace-api-overview/fabric-multi-workspace-scenarios.png" border="false":::

**Sample Scenario:** Calling `Get Workspace` API Across Different Network Configurations

The `Get Workspace` API is a read-only unfiltered aggregation API that allows users to retrieve metadata about all workspaces they have access to. This section outlines how the behavior of this API changes (or remains consistent) across different network configurations in Microsoft Fabric.
When the user calls the `Get Workspace` (unfiltered) API:

* From the public network: The API returns all five workspaces. No network restrictions are enforced and access is based purely on user permissions.
* From a tenant Private Link: Behavior is the same as public, all five workspaces are returned. Tenant PL doesn't impose workspace-level restrictions on unfiltered APIs.
* From Workspace Private Endpoint: The API call fails. Unfiltered APIs aren't supported over WS PL, as these isolated networks are designed to prevent cross-workspace data exposure.

This scenario illustrates how unfiltered aggregation APIs behave consistently across open networks but are intentionally blocked within workspace-scoped private environments for security.


### Data in scope and usage

* **Permissions, ownership, and creator information**: Includes metadata fields that identify who owns or manages the item, who created or last modified it, and what level of access different principals have. Examples include Artifact.CurrentPrincipalPermissions, Artifact.OwnerOrContact, Workspace.PrincipalPermissions, and Workspace.OwnerOrContact.
* **Access and modification details**: Captures when and by whom an item or workspace was created, last accessed, or modified. It includes metadata like Artifact.CreateAccessModifyTime, Artifact.CreateAccessModifyUser, Workspace.CreateAccessModifyTime, and related fields under JobSchedule and InformationProtection.
* **Identifiers, types, and descriptive attributes**: Covers unique identifiers, display names, artifact types, connection information, and URLs used to locate or classify items. Fields might include Artifact.Id, Artifact.TypeOrSubtype, Artifact.NameOrDisplayName, Artifact.UrlOrConnectionString, Workspace.TypeOrSubtype, and Workspace.NameOrDisplayName.
* **Data classification, labeling, and tags**: Includes metadata used for governance and compliance purposes such as information protection labels, classification states, content tags, and security restrictions. Examples include Artifact.ContentTag, Artifact.InformationProtection.StateOrStatus, Artifact.InformationProtection.Restrictions, and Tenant.MipLabel.
* **Organizational and Platform level attributes**: Reflects where the item resides within the broader platform or tenant structure, including domain, capacity, region, and platform metadata. Fields might include Tenant.Domain, Tenant.Capacity, Workspace.StorageInfo, and Workspace.SecuritySettings.
* **Relationships and hierarchies**: Metadata indicating how an item or workspace relates to other objects—parent-child relationships, subartifacts, job lineage, and grouped entities. It might include fields such as Artifact.RelationToArtifactParentChild, Artifact.SubArtifact, Workspace.RelationToWorkspaceParentChild, Workspace.Subfolder, and Tenant.Group.

This metadata access is read-only, restricted in scope, and doesn't involve access to the underlying data content or user-generated payloads within the artifacts. It's intended to support centralized discovery and governance capabilities across Fabric experiences.