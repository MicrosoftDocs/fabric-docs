---
title: Lakehouse sharing and permission management
description: Learn how to share a lakehouse and assign permissions.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Lakehouse Sharing Permissions
---

# How lakehouse sharing works?
By sharing, users grant other users or a group of users access to a lakehouse without giving access to the workspace and the rest of its items. Shared lakehouse can be found through Data Hub or the Shared with Me section in Microsoft Fabrics.

When someone shares a lakehouse, they also grant access to the SQL endpoint and associated default dataset.

Sharing dialog can be started by clicking the Share button next to the lakehouse name in the Workspace view.

## Sharing and permissions
Lakehouse sharing by default grants users Read permission on shared lakehouse, associated SQL endpoint, and default dataset. In addition to default permission, the users can receive the following:
- ReadData permission on SQL endpoint to access data without SQL policy.
- ReadAll permission on the lakehouse to access all data using Apache Spark.
- Build permission on the default dataset to allow building Power BI reports on top of the dataset.

## Managing permissions
Once the item is shared or users get a role assigned in the workspace, they appear in permission management. The permission management dialog can be started by clicking More(...) next to the item in the workspace view and selecting Permission Management. The users can get the following:
- access granted;
- access removed;
- custom permissions added;
- custom permissions removed.

## Next steps


