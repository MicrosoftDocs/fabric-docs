---
title: Create and manage a set of tags
description: "Learn how to create and manage a set of tags in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 03/31/2025

#customer intent: As a Fabric admin, I want to create and manage a set of tags so that data creators and data consumers can use them to better manage and find data.

---

# Create and manage a set of tags

This article describes how to create and manage a set of tags in Microsoft Fabric. The target audience is Fabric administrators who want to create and manage such a set in their organization.

For more information about tags, see [Tags in Microsoft Fabric](./tags-overview.md).

As a Fabric administrator, you can:

* [Create a set of tags](#create-a-set-of-tags) that users in your organization can use to categorize their Fabric items.

* [Rename tags](#rename-a-tag). If desired or necessary, you can rename a tag. When you rename a tag, its name changes wherever it has been applied.

* [Delete a tag](#delete-a-tag-from-the-set-of-tags) If you decide that a tag isn't needed, you can delete it from the set of tags you defined. When you delete a tag from the set of defined tags, the tag is removed from all the items it's been applied to.

## Prerequisites

You must have a Fabric administrator role or higher to be able to create, rename, or delete tags.

## Create a set of tags

This section shows how to create a set of one or more tags.

1. Open the [admin portal](../admin/admin-center.md#how-to-get-to-the-admin-portal) and select **Tags**.

    The **Tags** tab opens. All currently defined tags are listed on the tab.

1. Select **+ New tag**. If no tags have been defined yet, select **Add your first tags**.

1. In the dialog that appears, provide names for your new tags. Use comma-separated names to create more than one tag at a time. Up to 10,000 tags can be created in a tenant.

    :::image type="content" source="./media/tags-define/create-tags.png" alt-text="Screenshot showing how to create two new tags.":::

    Tag names can contain:
    * Letters
    * Numbers
    * Spaces (not at the beginning of the tag)
    * Special characters (the name can't consist solely of special characters; it must also contain letters and/or numbers)

1. When done, select **Create**. The new tags are added to the set of tags.

## Rename a tag

1. Open the [admin portal](../admin/admin-center.md#how-to-get-to-the-admin-portal) and select **Tags**.

1. Open the options menu of the tag you want to rename and select **Rename**.

    :::image type="content" source="./media/tags-define/rename-tag.png" alt-text="Screenshot showing how to rename a tag.":::

1. Change the name as desired and then select **Rename**. The new name is reflected wherever the tag is applied.

## Delete a tag from the set of tags

1. Open the [admin portal](../admin/admin-center.md#how-to-get-to-the-admin-portal) and select **Tags**.

1. Open the options menu of the tag you want to rename and select **Delete**.

    :::image type="content" source="./media/tags-define/delete-tag.png" alt-text="Screenshot showing how to delete a tag from the set of tags.":::

    The tag is deleted from the set of defined tags, and is removed from all items it's applied to.

## Related content

* [Tags overview](tags-overview.md)
* [Apply tags to items](tags-apply.md)