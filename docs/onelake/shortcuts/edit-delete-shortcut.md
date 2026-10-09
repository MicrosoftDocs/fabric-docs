---
title: Edit or delete a shortcut
description: Learn how to edit the properties of an existing shortcut in OneLake or delete a shortcut you no longer need.
ms.reviewer: eloldag
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 06/29/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to edit or delete an existing OneLake shortcut so that I can keep my shortcuts up to date or remove shortcuts I no longer need.
---

# Edit or delete a shortcut

After you create a shortcut, you can update its properties or remove it. This article covers both options for shortcuts in a lakehouse or KQL database.

For an overview of shortcuts, see [shortcuts in OneLake](../onelake-shortcuts.md). To create a shortcut, see [Create an internal OneLake shortcut](create-onelake-shortcut.md).

## Prerequisites

Editing shortcuts requires write permission on the item you're editing. The admin, member, and contributor roles grant write permissions.

## Edit a shortcut

1. Right-click the shortcut and select **Manage shortcut**.

1. In the **Manage shortcut** view, you can edit the following fields:

   - **Name**

   - **Target connection**

     Not all shortcut types use the target connection feature.

   - **Target location** and **Target subpath**

     You can edit both fields by selecting the **Target location**.

   - **Shortcut location**

   :::image type="content" source="media/create-onelake-shortcut/manage-shortcut.png" alt-text="Screenshot that shows the Manage shortcut view.":::

You can also edit shortcuts by using the [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts).

## Delete a shortcut

To delete a shortcut, select the **...** icon next to the shortcut file or table and select **Delete**. To delete shortcuts programmatically, see [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts/delete-shortcut?tabs=HTTP).

## Related content

- [Shortcuts in OneLake](../onelake-shortcuts.md)
- [Create an internal OneLake shortcut](create-onelake-shortcut.md)
- [OneLake shortcut security](../onelake-shortcut-security.md)
- [Manage connections for shortcuts](../manage-shortcut-connections.md)
