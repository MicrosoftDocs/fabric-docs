---
title: OneLake Data Access Permissions (Preview)
description: Apache Spark in Fabric provides various built-in options for visualizing your data, including notebook charts and access to popular open-source libraries.
ms.reviewer: tvilutis, aamerril
ms.author: turchiny
author: turchiny
ms.topic: how-to
ms.custom:
ms.search.form: OneLake Access Control
ms.date: 01/04/2024
---

# What is OneLake data access permissions (Preview)?

OneLake data access permissions (Preview) allow users to create custom roles within a lakehouse and to grant read permissions only to the specified folders when accessing OneLake. OneLake folder security is inheritable for all subfolders. For each OneLake role, users can assign users, security groups or grant an automatic assignment based on the workspace role.

:::image type="content" source="../onelake\security\media\folder-level-security.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

Learn more about [OneLake Data Access Control Model](../onelake/security/data-access-control-model.md) and [Get Started with Data Access](../onelake/security/get-started-data-access-roles.md).

## Creating OneLake Data Access Roles

Open the lakehouse where you want to define the roles. Select **Manage OneLake data access (preview)** and confirm enabling OneLake Data Access (Preview) for this lakehouse.
- Step 1. Create a new role by selecting **New Role**. If you want to have this role apply to all the folders in this lakehouse, Select the **All folders**. if you want to only have this role apply to selected folders, select **Selected Folders** along with the Folders you need.
- Step 2: Assign the Role membership by selecting "Assign Role". Add people, groups, or email addresses to the **Add people or groups** control.

## Related content

- [Learn more about Fabric and OneLake Security](../onelake/security/fabric-and-onelake-security.md)
- [Learn more about OneLake Data Access Control Model](../onelake/security/data-access-control-model.md) 
- [Learn more about Get Started with OneLake Data Access Roles](../onelake/security/get-started-data-access-roles.md)
