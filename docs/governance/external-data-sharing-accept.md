---
title: Accept an external data share
description: Learn about sharing data with external users.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/19/2024
---

# Accept an external data share

## Prerequisites

Before you can get started with creating or accepting shares, the private preview must be enabled in your tenant. To enable the private preview, you will need:

1. Microsoft tenant with at least one [Fabric enabled capacity](../admin/fabric-switch.md). 
1. Fabric admin with permission to enable tenant switch.
1. Lakehouse or KQL Database with at least one folder or table.

## Accept Share

To accept a share, click the share link or paste the URL in a browser. This will navigate to a dialog that displays the name of the share and the data provider’s tenant details.

:::image type="content" source="./media/external-data-sharing-accept/image7.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

Click “Accept and select a location”. This will navigate to the OneLake data hub. Select a Lakehouse, click “Next”, select the table or folder location in which to create the incoming share shortcut, and then click “Apply”.

:::image type="content" source="./media/external-data-sharing-accept/image8.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

The share has now been created in the consumer’s OneLake location. The data within this share location can be consumed using any Fabric workload.

## Security considerations

See [Security considerations](./external-data-sharing-overview.md#security-considerations)

## Related content

* [External data sharing overview](./external-data-sharing-overview.md)
* [Create and manage external data shares](./external-data-sharing-create.md)
