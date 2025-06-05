---
title: Create and manage a set of tags
description: "Learn how to create and manage a set of tags in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.reviewer: nschachter
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 05/06/2025
#customer intent: As a Fabric admin, I want to create and manage a set of tags so that data creators and data consumers can use them to better manage and find data.

---

# Create and manage a set of tags

This article describes how to create and manage a set of tags in Microsoft Fabric. The target audience is Fabric and domain administrators who want to define and manage tags within their organization or specific domains.

For more information about tags, see [Tags in Microsoft Fabric](./tags-overview.md).

As a Fabric or domain administrator, you can:

  * **Create a set of tags** that users in your organization or domain can use to categorize their Fabric items.
  * **Rename tags.** If desired or necessary, you can rename a tag. When you rename a tag, its name changes wherever it has been applied.
  * **Delete a tag.** If you decide that a tag isn't needed, you can delete it from the set of tags you defined. When you delete a tag from the set of defined tags, the tag is removed from all the items it's been applied to.

## Prerequisites

You must have a **Fabric administrator** role to create and manage tenant-level tags.

You must have a **Domain administrator** role to create and manage domain-level tags within your assigned domains.

## Create tenant-level tags

This section shows how Fabric administrators create a set of tenant-level tags. These tags are available across the entire Fabric tenant. Up to 10,000 tags can be created in a tenant.

1.  Open the [admin portal](../admin/admin-center.md%23how-to-get-to-the-admin-portal) and select **Tags**.
    The **Tags** tab opens. All currently defined tenant-level tags are listed on the tab.
    
1.  Select **+ New tag**. If no tags have been defined yet, select **Add your first tags**.
   
1.  In the dialog that appears, provide names for your new tags. Use comma-separated names to create more than one tag at a time. Tag names can contain letters, numbers, spaces (not at the beginning), and special characters (must also contain letters and/or numbers).

    :::image type="content" source="./media/tags-define/create-tags.png" alt-text="Screenshot showing how to create two new tags.":::

1.  When done, select **Create**. The new tags are added to the set of tags.


## Create domain-level tags

This section shows how [domain](./domains.md) administrators create and manage tags specific to their assigned domains. These tags are only available for items within workspaces assigned to that domain and sub-domains under it.

### Tag Uniqueness Rules

When creating domain-level tags, consider the following uniqueness rules:

  1. A tag created at the tenant level cannot be duplicated at the domain level and vice-versa. If you attempt to create a tag that duplicates an existing one at a different scope (tenant or domain), an error message will indicates the existing tag and its scope.
  1. The same tag name can be created in different domains. For example, a tag named "FY2025" can exist independently within "Sales" and "Marketing" domains.
  1. If a workspace is reassigned from one domain to another, any domain-specific tags previously applied to items within that workspace persist on the items. This ensures continuity and avoids confusion regarding past tagging classifications. However, tags from a previous domain cannot be reapplied to items if the workspace is no longer associated with that domain.
    
    ![image](https://github.com/user-attachments/assets/15dda2b3-8980-4651-ad2c-cafbd7704e23)


### Steps to Create Domain-Level Tags

1.  Open the [admin portal](../admin/admin-center.md%23how-to-get-to-the-admin-portal).
2.  In the admin portal, select **Domains**.
3.  Choose the specific domain for which you want to create or manage tags.
4.  In the domain settings, select **Tags**. This displays all currently defined domain-level tags for that domain.
5.  To create a new domain tag, select **+ New tag** or **Add your first tags** if none exist.
6.  In the dialog, provide names for your new tags. You can use comma-separated names to create multiple tags simultaneously.
7.  Tag names can contain letters, numbers, spaces (not at the beginning), and special characters (must also contain letters and/or numbers).
8.  Select **Create** to add the new tags to the domain's set of tags.

## Rename a tag

You can rename both tenant-level and domain-level tags.

1.  Open the [admin portal](../admin/admin-center.md%23how-to-get-to-the-admin-portal) and select **Tags** (for tenant-level tags) or navigate to **Domains** and then **Tags** within your specific domain (for domain-level tags).

2.  Open the options menu of the tag you want to rename and select **Rename**.

    :::image type="content" source="./media/tags-define/rename-tag.png" alt-text="Screenshot showing how to rename a tag.":::

3.  Change the name as desired and then select **Rename**. The new name is reflected wherever the tag is applied.


## Delete a tag from the set of tags

You can delete both tenant-level and domain-level tags.

1.  Open the [admin portal](../admin/admin-center.md%23how-to-get-to-the-admin-portal) and select **Tags** (for tenant-level tags) or navigate to **Domains** and then **Tags** within your specific domain (for domain-level tags).

2.  Open the options menu of the tag you want to delete and select **Delete**.

    :::image type="content" source="./media/tags-define/delete-tag.png" alt-text="Screenshot showing how to delete a tag from the set of tags.":::

    The tag is deleted from the set of defined tags and is removed from all items it's applied to.


## Create and manage tags programmatically using APIs

All of the actions described in this article for creating and managing tags in the UI can be performed programmatically via APIs. For more information, see [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags).


## Related content

* [Tags overview](tags-overview.md)
* [Apply tags to items](tags-apply.md)
* [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags)
