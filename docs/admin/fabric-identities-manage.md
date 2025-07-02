---
title: "Manage Fabric identities"
description: "Learn how to view, understand info, and manage Fabric identities as a Fabric administrator."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 06/21/2024

ms.custom: sfi-image-nochange
#customer intent: As a Fabric administrator, I want understand what's on the Fabric identities tab so that I can monitor and govern all the Fabric identities in my organization.
---

# Manage Fabric identities

As a Fabric administrator, you can govern the Fabric identities that exist in your organization on the **Fabric identities** tab in the admin portal. For information about how to get to and use the admin portal, see [How to get to the admin portal](./admin-center.md#how-to-get-to-the-admin-portal).

On the **Fabric identities** tab, you see a list of all the Fabric identities in your tenant.

:::image type="content" source="./media/fabric-identities-manage/fabric-identities-tab.png" alt-text="Screenshot showing the Fabric identities tab in the Fabric admin portal." lightbox="./media/fabric-identities-manage/fabric-identities-tab.png":::

The columns of the list of identities are described in following table.

| Column | Description |
| --------- | --------- |
| **Name** | The name of the identity. |
| **Service principal ID** | The object ID of the Enterprise application that is associated with the identity in Microsoft Entra. |
| **State** | The state of the identity. See [workspace identity state values](../security/workspace-identity.md#identity-details).|
| **Workspace** | The workspace ID. |

## View identity details

1. Select the radio button of the identity whose details you wish to view.

1. Select **Details** on the ribbon that appears. The **Details** side pane opens displaying the identity's details.

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

1. Select the radio button of the identity you want to delete.

1. Select **Delete** on the ribbon that appears.

## Refresh the identities list

Select **Refresh** in the ribbon to refresh the list of identities.

## Export the identities list as a .csv file

Select **Export** on the ribbon to download the list of identities as a *.csv* file.

## Related content

* [Workspace identity](../security/workspace-identity.md)
