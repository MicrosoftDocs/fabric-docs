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
By sharing users grant other user or a group of users access to a lakehouse without granting access to the workspace and the rest of items in it. Shared lakehouse can be found through Data Hub or Shared with Me section in Microsoft Fabrics.

When someone shares a lakehouse they also grant access to SQL endpoint and default dataset associated with the lakehouse.

Sharing dialog can be started by clicking Share button next to lakehouse name in Workspace view.

## Sharing and permissions
Lakehouse sharing by default grants users Read permission on shared lakehouse, associated SQL endpoint, and default dataset. In addition to default permission the users can receive:
- ReadData permission on SQL endpoint to access data without SQL policy.
- ReadAll permission on Lakehouse to access all data using Apache Spark.
- Build permission on default dataset to allow building Power BI reports on top of the dataset.

## Managing permissions
Once the item is shared or users got a role assigned in the workspace, then they appear in permission management. Permission management dialog can be started clicking More(...) next to the item in workspace view and selecting Permission Management. There users can get:
- access granted
- access removed
- custom permissions added
- custom permissions removed

## Next steps


