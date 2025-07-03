---
title: Role-based access control in digital twin builder (preview)
description: Learn how Fabric roles control data access in digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 05/01/2025
ms.topic: concept-article
---

# Role-based access control in digital twin builder (preview)

As an item in Microsoft Fabric, digital twin builder (preview) uses Fabric's permission model to control data access. Through the assignment of Fabric roles, you can control access to your [workspace](../../fundamentals/roles-workspaces.md) and [individual items](../../security/permission-model.md#item-permissions).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

For more information about roles and data access in Fabric, see [Permission model](../../security/permission-model.md) in the Fabric documentation.

## Permissions acquired by workspace role

A user's role in a workspace implicitly grants them permissions on the data in the workspace, as described in the following table.

| Permission | Admin | Member | Contributor | Viewer |
|---|--|---|--|---|
| Read | &#9989; | &#9989; | &#9989; | &#9989; |
| Write | &#9989; | &#9989; | &#9989; |  &#10060; |
  

## Permissions for digital twin builder (preview)

The following table describes what actions can be performed with the Read and Write permissions in digital twin builder (preview). The descriptions are organized by controller.

| Permission | Description | 
| --- | --- | 
| Read | **Mapping**<br>Allows user to list the digital twin builder mapping operations. <br><br>**Digital twin builder flow**<br>Allows user to list the digital twin builder operations.<br>Allows user to list the digital twin builder operation runs.<br>Allows user to retrieve a digital twin builder operation schedule. <br><br>**Contextualization**<br>Allows user to list the approved digital twin builder contextualization matches.<br>Allows user to list the digital twin builder contextualization operations.<br>Allows user to list the rejected digital twin builder contextualization matches.<br>Allows user to list the digital twin builder contextualization results.<br>Allows user to retrieve the distinct column values of a digital twin builder contextualization operation. <br><br>**Domain projection**<br> Allows user to retrieve a digital twin builder domain projection operation (by querying the SQL endpoint). <br><br>**Entity instance**<br>Allows user to list the properties of a digital twin builder entity instance.<br>Allows user to retrieve the property of a digital twin builder entity instance by ID. <br><br>**Entity type**<br>Allows user to list the digital twin builder entity types. <br><br>**Entity type relationship**<br>Allows user to retrieve expanded relationship type information for a digital twin builder entity type.<br>Allows user to list the digital twin builder entity relationship types.<br>Allows user to list the names of the digital twin builder entity relationship types. <br><br>**Query**<br>Allows user to query the digital twin builder entity instances and properties.<br>Allows user to list the digital twin builder entity instances and properties. <br><br>**Relationship instances**<br>Allows user to list the relationship instances of a digital twin builder entity instance. <br><br>**Time series**<br>Allows user to view the aggregated time series charts associated with a digital twin builder entity instance.|
| Write | **Mapping**<br>Allows user to create, update, or delete a digital twin builder mapping operation. <br><br>**Digital twin builder flow**<br>Allows user to assign a digital twin builder operation to a schedule.<br>Allows user to remove a digital twin builder operation from a schedule. <br><br>**Contextualization**<br>Allows user to approve digital twin builder contextualization matches.<br>Allows user to roll back the approved digital twin builder contextualization matches.<br>Allows user to create a digital twin builder contextualization operation.<br>Allows user to delete a digital twin builder contextualization operation.<br>Allows user to update a digital twin builder contextualization operation.<br>Allows user to approve manual digital twin builder contextualization matches.<br>Allows user to reject digital twin builder contextualization matches.<br>Allows user to roll back the rejected digital twin builder contextualization matches. <br><br>**Domain projection**<br>*None* <br><br>**Entity instance**<br>*None* <br><br>**Entity type**<br>Allows user to create, update, or delete a digital twin builder entity type. <br><br>**Entity type relationship**<br>Allows user to create, update, or delete a digital twin builder entity relationship type. <br><br>**Query**<br>*None* <br><br>**Relationship instances**<br>*None* <br><br>**Time series**<br>*None*|

## Related content

For more information about related Fabric components, see these resources:
* [Components of Microsoft Fabric](../../fundamentals/microsoft-fabric-overview.md#components-of-microsoft-fabric)
* [Microsoft Fabric Workspace](../../fundamentals/workspaces.md)
* [Microsoft OneLake](../../onelake/onelake-overview.md)
* [What is a Lakehouse in Microsoft Fabric](../../data-engineering/lakehouse-overview.md)

For more information about Fabric security, see these resources:
* [Roles in Workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md)
* [Microsoft Entra ID](/entra/fundamentals/whatis)
* [Identity and Access Management Fundamental Concepts](/entra/fundamentals/identity-fundamental-concepts)
* [Azure Data Security and Encryption Best Practices](/azure/security/fundamentals/data-encryption-best-practices)