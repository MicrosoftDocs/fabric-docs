---
title: "Manage Fabric identities"
description: "Learn how to view, understand info, and manage Fabric identities as a Fabric administrator."
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.date: 09/01/2026
ai-usage: ai-assisted
#customer intent: As a Fabric administrator, I want to understand the Fabric identities page so that I can manage all the Fabric identities in my organization.
---

# Manage Fabric identities

As a Fabric administrator, you can manage your organization's Fabric identities from **Fabric identities** in the [Govern section of the OneLake catalog](../governance/onelake-catalog-govern.md).

In the **OneLake catalog**, select **Govern** > **Configurations** > **Fabric identities**. The **Fabric identities** page lists all the Fabric identities in your tenant.

<!-- Placeholder: Fabric identities page in OneLake catalog > Govern > Configurations. -->

The columns of the list of identities are described in following table.

| Column | Description |
| --------- | --------- |
| **Name** | The name of the identity. |
| **Service principal ID** | The object ID of the Enterprise application that is associated with the identity in Microsoft Entra. |
| **State** | The state of the identity. See [workspace identity state values](../security/workspace-identity.md#identity-details).|
| **Workspace** | The workspace ID. |

## View identity details

1. Select the identity that you want to view.

1. Select **Details** on the command bar. The **Details** side pane opens and displays the identity's details.

| Field                             | Description                                                                                               |
|:----------------------------------|:----------------------------------------------------------------------------------------------------------|
| **Workspace name**                | The name of the workspace the identity is associated with.                                                |
| **State**                         | The state of the identity.                                                                                |
| **State changed date**            | The date of the last change of state of the identity.                                                     |
| **Service principal ID**          | The object ID of the Enterprise application that is associated with the identity in Microsoft Entra.      |
| **Application ID**                | The application ID of the Enterprise application that is associated with the identity in Microsoft Entra. |
| **Tenant ID**                     | The ID of the tenant the identity is defined in.                                                          |
| **Role**                          | The workspace role the identity has been assigned.                                                        |

## Delete an identity

> [!CAUTION]
> Deleting a workspace identity breaks any Fabric item relying on that identity for trusted workspace access or authentication. Deleted identities can't be restored.

To delete an identity:

1. Select the identity you want to delete.

1. Select **Delete** on the command bar.

## Refresh the identities list

Select **Refresh** on the command bar to refresh the list of identities.

## Export the identities list as a .csv file

Select **Export** on the command bar to download the list of identities as a *.csv* file.

## Related content

* [Workspace identity](../security/workspace-identity.md)
