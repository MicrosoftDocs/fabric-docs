---
title: Notebook data export controls
description: Learn how to configure and manage data export controls for Microsoft Fabric notebooks to govern how data leaves your organization's boundaries.
ms.reviewer: saravi
ms.topic: how-to
ms.date: 03/18/2026
ms.search.form: Notebook Data Export Controls Security Governance
---

# Notebook data export controls in Microsoft Fabric (preview)

> [!NOTE]
> Notebook data export controls are currently in public preview. 

Notebook data export controls let administrators and workspace owners restrict how data leaves Fabric notebooks. Use these controls to enforce data residency, compliance, and security policies by limiting data movement from notebook code or interactive sessions.

Export controls operate at two levels:

- **Tenant level**: Fabric administrators enforce export restrictions across all notebooks in the organization.
- **Notebook level**: Notebook owners view applied policies and configure permitted export destinations where allowed.

## Prerequisites

- **To configure tenant-level export controls**: You need the **Fabric administrator** role to access tenant settings in the admin portal.
- **To create notebooks in a workspace**: You need the **Admin** or **Member** workspace role.

## Configure data export controls for notebooks

Fabric administrators configure export controls from the tenant settings in the admin portal. From there, you can enable or disable export restrictions and optionally delegate control to specific groups or users.

### Access export control settings

1. Go to the [Fabric portal](https://fabric.microsoft.com) and select the settings (gear) icon in the top-right corner.
1. Select **Admin portal** under **Governance and administration** and then go to the tenant settings.
1. Search for the data export in the **Search** and enable or disable the Data export control for notebooks.
1. In addition to just enabling, admins can also delegate these settings to a certain group or individual members who can be allowlisted to perform the export.

When export controls are disabled, the following restrictions apply:

- The options to download the notebook are disabled for all users.
- The options to download the data from the Dataframe preview are also disabled for all users.

## Related content

- [How to use Microsoft Fabric notebooks](how-to-use-notebook.md)
- [Develop and run notebooks](author-execute-notebook.md)
- [Workspace roles and permissions in lakehouse](workspace-roles-lakehouse.md)
- [Microsoft Fabric security overview](/fabric/security/security-overview)
