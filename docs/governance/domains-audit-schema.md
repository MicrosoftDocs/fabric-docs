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

Whenever a domain is created, edited, or deleted, that activity is recorded in the audit log for Fabric. You can track these activities using [Microsoft Purview Audit](https://compliance.microsoft.com/auditlogsearch).

This article explains the information in the Fabric auditing schema that's specific to domains. This information is recorded in the OperationProperties section of the details side pane that opens when you select a domain-related activity on the Audit search page.

On the Audit search page:

1. Search for activities by their operation names.
1. When the search finishes, select the search to open the search results page.
1. On the search results page, select one of the search results to open the side pane that displays the record details.

For domains, the domain-specific details are found under the **OperationProperties** section of the side pane, in json format.

| Field | Type | Must appear in the schema | Value |
|---|---|---|---|
| OperationName | Edm.Enum | Yes | Activity name as described in the following table. |
| OperationProperties | Edm.Enum | Yes | Per the properties described in the table below. |

| Activity flow | Activity friendly name | Activity operation name | Properties |
|:---|:---|:---|:---|
| Create domain/sub-domain | InsertDataDomainAsAdmin | **operationName**:<br>- InsertDataDomainAsAdmin <br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\>|
| Delete domain/sub-domain | DeleteDataDomainAsAdmin | **operationName**:<br>- DeleteDataDomainAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\>|
| Update domain/sub-domain | UpdateDataDomainAsAdmin | **operationName**:<br>- UpdateDataDomainAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: <DataDomainObjectId><br>- ParentObjectId?: \<guid\>|
| Assign/Unassign workspace to the domain | UpdateDataDomainFoldersRelationsAsAdmin | **operationName**:<br>- UpdateDataDomainFoldersRelationsAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- FoldersToSetCounter?: \<long\><br>- FoldersToUnsetCount?: \<long\>|
| Unassign all workspaces to the domain | DeleteAllDataDomainFoldersRelationsAsAdmin | **operationName**:<br>- DeleteAllDataDomainFoldersRelationsAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\>|
| Assign/Unassign workspaces to the domain as contributor | UpdateDataDomainFoldersRelationsAsContributor | **operationName**:<br>- UpdateDataDomainFoldersRelationsAsContributor<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- FoldersToSetCounter?: \<long\><br>- FoldersToUnsetCount?: \<long\>|
| Remove domain from workspace settings as workspace owner | DeleteDataDomainFolderRelationsAsFolderOwner | **operationName**:<br>- DeleteDataDomainFoldersRelationsAsFolderOwner<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- FolderId?: \<long\>|
| Initiate/Process bulk assign domain by workspace owners | BulkAssignDataDomainByWsOwnersAsAdmin? | |
| Initiate/Process bulk assign domain by capacities | BulkAssignDataDomainByCapacitiesAsAdmin? | |
| Add/Delete/Update domain access | UpdateDataDomainAccessAsAdmin | **operationName**:<br>- UpdateDataDomainAccessAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- Value: \<long\> //Admin/Contributor<br>- UsersToSetCounter?: \<long\><br>- UsersToUnsetCounter?: \<long\><br>- GroupsToSetCounter?: \<long\><br>- GroupsToUnsetCounter?:  \<long\>|
| Add/Delete/Update default domain | UpdateDefaultDataDomainAsAdmin | **operationName**:<br>- UpdateDefaultDataDomainAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- UsersToSetCounter?: \<long\><br>- UsersToUnsetCounter?: \<long\><br>- GroupsToSetCounter?: \<long\><br>- GroupsToUnsetCounter?:  \<long\>|
| Add/Delete/Update contributors | UpdateDataDomainContributorsScopeAsAdmin | **operationName**:<br>- UpdateDataDomainContributorsScopeAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- Value: \<long\> //contribution scope |
| Set/Remove domain branding | UpdateDataDomainBrandingAsAdmin | **operationName**:<br>- UpdateDataDomainBrandingAsAdmin<br>**operationProperties**:<br>- DataDomainObjectId: \<guid\><br>- DataDomainDisplayName: \<string\><br>- ParentObjectId?: \<guid\><br>- Value: \<long\> // Branding ID |
| Updated delegation at domain level | UpdateDomainTenantSettingDelegation | |
| Deleted override at domain level | | |

## Related content

* [Domains](./domains.md)
* [Domains management tenant settings](../admin/service-admin-portal-domain-management-settings.md)
* [Microsoft Fabric REST Admin APIs for domains](/rest/api/fabric/admin/domains)
* [Track user activities in Fabric](../admin/track-user-activities.md)