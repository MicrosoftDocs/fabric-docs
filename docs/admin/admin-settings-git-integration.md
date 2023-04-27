---
title: Git integration admin settings
description: This article explains what the feature switches affecting git integration do and how to use them.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.date: 05/23/2023
---

# Tenant admin settings for git integration

The git integration tenant admin settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

:::image type="content" source="./media/admin-settings-git-integration/workspace-settings.png" alt-text="Screenshot of the Admin portal with the workspace settings shown." lightbox="./media/admin-settings-git-integration/workspace-settings.png":::

These settings are only visible to the tenant admin.
There are three settings relating to git integration:

* Enable the git integration feature (link)
* Enable cross geo support for git integration (link)
* Enable export of sensitivity labels (link)

## Enable git integration feature

Enable this setting to allow users to synchronize a workspace with their git repositories using the git integration feature. They can then edit their workspace and seamlessly update their git repo.

:::image type="content" source="./media/admin-settings-git-integration/enable-git-integration-switch.png" alt-text="Screenshot of the Admin portal tenant switch that enables git integration." lightbox="./media/admin-settings-git-integration/enable-git-integration-switch.png":::

Learn more about [git integration](../CICD/git-integration/git-get-started.md).

## Enable cross geo support for git integration

Cross-geo support helps multinational customers address regional, industry-specific, or organizational data residency requirements. If a workspace capacity is in one geographic location (for example, Central US) while the Azure DevOps repo is in another location (for example, West Europe), admins can decide whether to allow users to deploy data to other geographical locations. Only the metadata of the items is exported. Item data and user related information are not exported. Enable this setting to allow users to export their workspace content to other geographical locations.

:::image type="content" source="./media/admin-settings-git-integration/multi-geo-switch.png" alt-text="Screenshot of the Admin portal tenant switch that enables exporting items to other geographical locations." lightbox="./media/admin-settings-git-integration/multi-geo-switch.png":::

Learn more about Multi-Geo support.

## Enable export of content with sensitivity labels into a git repository

The admin can decide whether or not to export sensitivity labels into the git repository when connecting to a workspace. Enable this setting to export sensitivity labels.

:::image type="content" source="./media/admin-settings-git-integration/git-integration-sensitivity-labels-switch.png" alt-text="Screenshot of the Admin portal tenant switch that enables exporting sensitivity labels." source="./media/admin-settings-git-integration/git-integration-sensitivity-labels-switch.png":::

Learn more about sensitivity labels.

## Next steps

* [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings)
* [About git integration](../CICD/git-integration/intro-to-git-integration.md)
