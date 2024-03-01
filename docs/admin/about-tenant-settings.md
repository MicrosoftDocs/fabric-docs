---
title: About tenant settings
description: Learn how to enable and disable Fabric tenant settings.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/21/2023
---

# About tenant settings

**Tenant settings** enable fine-grained control over the features that are made available to your organization. If you have concerns around sensitive data, some of our features might not be right for your organization, or you might only want a particular feature to be available to a specific group.

Tenant settings that control the availability of features in the Power BI user interface can help to establish governance policies, but they're not a security measure. For example, the **Export data** setting doesn't restrict the permissions of a Power BI user on a semantic model. Power BI users with read access to a semantic model have the permission to query this semantic model and might be able to persist the results without using the **Export data** feature in the Power BI user interface.

For a list and brief description of all the tenant settings, see the [tenant settings index](tenant-settings-index.md).

> [!NOTE]
> It can take up to 15 minutes for a setting change to take effect for everyone in your organization.

## New tenant settings

To help you quickly identify changes and respond, a message at the top of the tenant settings page appears when there's a change. The message lists new tenant settings and changes to existing ones.

You can identify new settings according to their *new* icon.  

## How to get to the tenant settings

Go to the admin portal and select **Tenant settings**.

:::image type="content" source="media/tenant-settings-index/admin-portal-tenant-settings.png" alt-text="Screenshot of how to get to the tenant settings.":::

## How to use the tenant settings

Many of the settings can have one of three states:

* **Disabled for the entire organization**: No one in your organization can use this feature.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-disabled-all.png" alt-text="Screenshot of disabled all state tenant setting.":::

* **Enabled for the entire organization**: Everyone in your organization can use this feature.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-all.png" alt-text="Screenshot of enabled all state tenant setting.":::

* **Enabled for the entire organization except for certain groups**: Everyone in your organization can use this feature except for users who belong to the specified groups.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-all-except.png" alt-text="Screenshot of enabled all except state tenant setting.":::

* **Enabled for a subset of the organization**: Specific security groups in your organization are allowed to use this feature.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-specific.png" alt-text="Screenshot of enabled subset state tenant setting.":::

* **Enabled for specific groups except for certain groups**: Members of the specified security groups are allowed to use this feature, unless they also belong to an excluded group. This approach ensures that certain users don't have access to the feature even if they're in the allowed group. The most restrictive setting for a user applies.

    :::image type="content" source="media/tenant-settings-index/fabric-admin-tenant-settings-enabled-specific-except.png" alt-text="Screenshot of enabled except state tenant setting.":::

## Related content

- [What is the admin portal?](admin-center.md)
- [Tenant settings index](tenant-settings-index.md)
