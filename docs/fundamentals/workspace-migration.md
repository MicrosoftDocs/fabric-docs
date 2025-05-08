---
title: Moving workspaces to other capacities
description: This describes how moving a workspace from one capacity to another impacts the items in the workspace.
ms.reviewer: haydnr
ms.author: painbar
author: paulinbar
ms.topic: overview
ms.date: 05/08/2025
#customer intent: As Fabric admin or a workspace admin, I want to understand the implications of moving a workspace from one capacity to another.
---
# Moving workspaces to other capacities

Workspace migration refers to reassigning a workspace to a different capacity. When you reassign a workspace, you first select a license mode for the workspace, and then you choose between the capacities where that license mode is available. Some of those capacities might be in the same region as the currently assigned capacity, while others might reside in other regions.

When you move a workspace, all jobs related to items in the workspace get cancelled.

The ability to change the license mode of a workspace depends on the types of items in the workspace.
Workspaces with Fabric items (such as lakehouses and notebooks) can't move from Premium or Fabric license mode to Pro or Premium Per User license mode.


The ability to reassign the workspace to a capacity in another region also depends on the types of items in the workspace - only migratable items can be in the workspace. See the table in XXX to see which types of items can be migrated. If the workspace contains non-migratable items, they must be removed before you can reassign the workspace to the capacity in the other region.



When you reassignReassigning a workspace to a different capacity can have implications for the items in the workspaceWorkspaces and the data they contain reside on capacities, and can be moved around by assigning them to different capacities via the workspace license mode. Such movement might be between capacities in different regions.

When you reassign a workspace, you first select a license mode, and then choose between the capacities where that license mode is avaiable. a capacity where that license mode is availReassigning a workspace to a different capactity can impact what items you can have in the workspace, due to the license mode of the capacity.
Detail:

Reassigning a workspace to a capacity that resides in a different region.
When the capacity you want to reassign the workspace to is located in a different region, there are futher implications - migrating to a capacity in a different region will succeed/be possible only if only migratable items are present in the workspace. If the workspace contains non-migratable items, they must be removed before the workspace can be reassigned to the capacity in a different region.

Migratable items

The migratable items are most Power BI items. Non-migratable Power BI items, and all other item types, are not migratable, and must be removed before a workspace can be reassiged to a capacity in a different region.

The following table lists all the Power BI items and indicates which can be migrated and which cannot.

| Artifact               | Migratable |
|------------------------|------------|
| Report                | Yes        |
| Semantic Model (Small)| Yes        |
| Semantic Model (Large)| No         |
| Dashboard             | Yes        |
| Organization App      | No         |
| Dataflow Gen 1        | Yes        |
| Paginated Report      | Yes        |
| Metric                | Yes        |
| Exploration           | No         |
| Datamart              | Yes        |
| Scorecard             | Yes        |








 before you will be able to migrate it to the capacity.

Moving workspaces from one capacity to another, has the following restrictions:

When you move a workspace, all jobs related to items in the workspace get cancelled.

Workspaces with Fabric items (such as lakehouses and notebooks) can't move from Premium or Fabric license mode to Pro or Premium Per User license mode.

Fabric items can't move between regions.

This means the following:

Moving a workspace from one capacity to another within the same region

If the workspace has Fabric items (such as lakehouses or notebooks), you can only move it from one Premium or Fabric capacity to another Premium or Fabric capacity. If you want to move the workspace from Premium or Fabric license mode to Pro or Premium Per User license mode, you won't be able to do so unless you delete all Fabric items first.

If the workspace has no Fabric items (that is, it has only Power BI items) moving the workspace from Premium or Fabric license mode to Pro or Premium Per User license mode is supported.

Moving a workspace from one capacity to a capacity in a different region

If the workspace has no Fabric items (that is, it has only Power BI items) then moving the workspace to another capacity in a different region is supported.

If you want to move a workspace that contains Fabric items, you must delete all the Fabric items first. After the workspace is migrated to a different region, it can take up to an hour before you can create new Fabric items.


## Related content

* [Fabric licenses](/power-bi/enterprise/service-admin-licensing-organization#fabric-licenses)