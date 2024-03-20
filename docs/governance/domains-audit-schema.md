---
title: Audit schema for domains in Fabric
description: Learn how changes to domains are recorded and logged so that you can track them in the unified audit log or Fabric activity log.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/20/2024
---

# Audit schema for domains in Fabric

Whenever a domain is created, edited or deleted, that activity is recorded in the audit log for Fabric. You can track these activities using [Microsoft Purview Audit](XXX).

On the Audit search page, search for activites by their friendly names or operation names. Select one of the search results. A side pane will display the record details. For domains, the domain-specific details are found in under the **OperationProperties** section, in json format.

This article explains the information in the Fabric auditing schema that's specific to domains. This information is recorded in the OperationProperties section of the details side pane that opens when you select a domain-related activity on the Audit search page.

| Field | Type | Must appear in the schema | Value |
|---|---|---|---|
| OperationName | Edm.Enum | Yes | Activity name as described in the table below. |
| OperationProperties | Edm.Enum | Yes | Per the properties described in the table below. |

| Activity flow | Activity name | Properties |
|---|---|---|
| Create domain/sub-domain | InsertDataDomainAsAdmin | operationName: InsertDataDomainAsAdmin,<br>operationProperties:<br>DataDomainObjectId: \<Guid\><br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>|
| Delete domain/sub-domain | DeleteDataDomainAsAdmin | operationName: "DeleteDataDomainAsAdmin",<br>operationProperties: {<br>- DataDomainObjectId: \<Guid\>,<br>- DataDomainDisplayName: \<String\><br>- ParentObjectId?: \<Guid\><br>} |
| Update domain/sub-domain | UpdateDataDomainAsAdmin | operationName: "UpdateDefaultDataDomainAsAdmin",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \< String \><br>ParentObjectId?: \<Guid\><br>UsersToSetCounter?: \<Long\>,<br>UsersToUnsetCounter?: \<Long\>,<br>GroupsToSetCounter?: \<Long\>,<br>GroupsToUnsetCounter?:  \<Long\><br>} |
| Assign/Unassign WS to the domain | UpdateDataDomainFoldersRelationsAsAdmin | operationName: "UpdateDataDomainFoldersRelationsAsAdmin",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>FoldersToSetCounter?: \<Long\><br>FoldersToUnsetCount?: \<Long\><br>} |
| Unassign all WS to the domain | DeleteAllDataDomainFoldersRelationsAsAdmin | operationName: "DeleteAllDataDomainFoldersRelationsAsAdmin",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>} |
| Assign/Unassign WS to the domain as contributor | UpdateDataDomainFoldersRelationsAsContributor | operationName: "UpdateDataDomainFoldersRelationsAsContributor",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>FoldersToSetCounter?: \<Long\><br>FoldersToUnsetCount?: \<Long\><br>} |
| Remove domain from WS settings as WS owner | DeleteDataDomainFolderRelationsAsFolderOwner | operationName: "DeleteDataDomainFoldersRelationsAsFolderOwner",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>FolderId?: \<Long\><br>} |
| Initiate/Process bulk assign domain by WS owners | BulkAssignDataDomainByWsOwnersAsAdmin? | |
| Initiate/Process bulk assign domain by capacities | BulkAssignDataDomainByCapacitiesAsAdmin? | |
| Add/Delete/Update domain access | UpdateDataDomainAccessAsAdmin | operationName: "UpdateDataDomainAccessAsAdmin",<br>operationProperties: [{ParentObjectId?: operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>Value: \<Long\>, //Admin/contributor<br>UsersToSetCounter?: \<Long\>,<br>UsersToUnsetCounter?: \<Long\>,<br>GroupsToSetCounter?: \<Long\>,<br>GroupsToUnsetCounter?:  \<Long\><br>} |
| Add/Delete/Update default domain | UpdateDefaultDataDomainAsAdmin | operationName: "UpdateDefaultDataDomainAsAdmin",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>UsersToSetCounter?: \<Long\>,<br>UsersToUnsetCounter?: \<Long\>,<br>GroupsToSetCounter?: \<Long\>,<br>GroupsToUnsetCounter?:  \<Long\><br>} |
| Add/Delete/Update contributors | UpdateDataDomainContributorsScopeAsAdmin | operationName: "UpdateDataDomainContributorsScopeAsAdmin",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>Value: \<Long\>, //contribution Scope<br>} |
| Set/Remove domain branding | UpdateDataDomainBrandingAsAdmin | operationName: "UpdateDataDomainBranding",<br>operationProperties: {<br>DataDomainObjectId: \<Guid\>,<br>DataDomainDisplayName: \<String\><br>ParentObjectId?: \<Guid\><br>Value: \<Long\>, //contribution Scope<br>} |

## Related content

* [Domains](./domains.md)
* [Domains management tenant settings](../admin/service-admin-portal-domain-management-settings.md)
* [Microsoft Fabric REST Admin APIs for domains](/rest/api/fabric/admin/domains)
* [Track user activities in Fabric](../admin/track-user-activities.md)