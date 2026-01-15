---
title: Create and manage a set of tags
description: "Learn how to create and manage a set of tags in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 09/04/2025

#customer intent: As a Fabric admin, I want to create and manage a set of tags so that data creators and data consumers can use them to better manage and find data.

---

# Create and manage a set of tags

This article describes how to create and manage a set of tags in Microsoft Fabric. The target audience is Fabric and domain administrators who want to define and manage tags within their organization or specific domains. Up to 10,000 tags of all types can be created in a tenant.

For more information about tags, see [Tags in Microsoft Fabric](./tags-overview.md).

As a Fabric or domain administrator, you can:

* **Create a set of tags** that users in your organization or domain can use to categorize their Fabric items.
  * **Rename tags.** If desired or necessary, you can rename a tag. When you rename a tag, its name changes wherever the tag is applied.
  * **Delete a tag.** If you decide that a tag isn't needed, you can delete it from the set of tags you defined. When you delete a tag from the set of defined tags, the tag is removed from all items where it was previously applied.

## Prerequisites

You must have a **Fabric administrator** role to create and manage tenant-level tags.

You must have a **Fabric administrator** or **Domain administrator** role to create and manage domain-level tags within your assigned domains.

## Create tenant-level tags

This section shows how Fabric administrators create a set of tenant-level tags. These tags are available across the entire Fabric tenant. 

1.  Open the [admin portal](../admin/admin-center.md%23how-to-get-to-the-admin-portal) and select **Tags**.
    The **Tags** tab opens. All currently defined tenant-level tags are listed on the tab.
    
1.  Select **+ New tag**. If no tags are defined yet, select **Add your first tags**.
   
1. In the dialog that appears, provide names for your new tags. Use comma-separated names to create more than one tag at a time. Tag names can be up to 40 characters long and can contain letters, numbers, spaces (not at the beginning), and special characters (must also contain letters and/or numbers).

    :::image type="content" source="./media/tags-define/create-tags.png" alt-text="Screenshot showing how to create two new tags.":::

1.  When done, select **Create**. The new tags are added to the set of tags.


## Create domain-level tags

This section shows how [domain](./domains.md) administrators create and manage tags specific to their assigned domains. These tags are only available for items within workspaces assigned to that domain and subdomains under it.

### Tag uniqueness rules

When creating domain-level tags, consider the following uniqueness rules:

* A tag created at the tenant level can't be duplicated at the domain level and vice-versa. If you attempt to create a tag that duplicates an existing one at a different scope (tenant or domain), an error message indicates the existing tag and its scope.

    :::image type="content" source="./media/tags-define/duplicate-tags.png" alt-text="Screenshot showing the error that appears when a tag already exists.":::

* You can create the same tag name in different domains. For example, you can add a tag named "FY2025" separately in both the "Sales" and "Marketing" domains.
* If you reassign a workspace from one domain to another, any domain-specific tags already applied to items in that workspace remain on those items. This approach maintains continuity and helps prevent confusion about previous tagging. However, you can't reapply tags from a previous domain to items if the workspace is no longer associated with that domain.
    
### Steps to create domain-level tags

1.  Open the [admin portal](../admin/admin-center.md%23how-to-get-to-the-admin-portal).
2.  In the admin portal, select **Domains**.
3.  Choose the specific domain for which you want to create or manage tags.
4.  In the domain settings, select **Tags** to display all currently defined domain-level tags for that domain.
5.  To create a new domain tag, select **+ New tag** or **Add your first tags** if none exists.
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

    The tag is deleted from the set of defined tags and is removed from all items where it was previously applied.

## Create and manage tags programmatically

All actions related to creating and managing tags can be performed programmatically via APIs. In addition, tags are included in Metadata Scanning (Scanner) APIs so that governance and discovery solutions can harvest tag assignments at scale.

### Tags REST APIs

Use the Fabric REST Admin APIs for tags to programmatically create, list, rename and delete tenant and domain-level tags, allowing you to automate tag lifecycle and governance workflows.
For more information, see [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags).  

### Tags in metadata scanning (scanner) APIs

The Scanner APIs include applied tags for each scanned item. For every applicable item returned in a scan, the payload includes a `tags` field containing a list of applied tag UUIDs. To resolve tag IDs to tag names, use the [List Tags Admin REST API](/rest/api/fabric/admin/tags/list-tags).

For more information, see [Metadata scanning overview](./metadata-scanning-overview.md).


## Related content

* [Tags overview](tags-overview.md)
* [Apply tags to items](tags-apply.md)
* [Fabric REST Admin APIs for tags](/rest/api/fabric/admin/tags)

