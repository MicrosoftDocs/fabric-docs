---
title: Accessing Data warehouse files in One Lake
description: Follow steps to get the OneLake path of Data warehouse files in Microsoft Fabric.
author: prlangad
ms.author: prlangad
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: how-to
ms.search.form: Warehouse in workspace overview # This article's title should not change. If so, contact engineering.
---
# Get workspace and OneLake path

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

In this tutorial, you learn how to find a [OneLake](../onelake/onelake-overview.md) file path from the [Warehouse](data-warehousing.md) experience. To maintain a single copy of data, Lakehouses and transactional Warehouses store data in OneLake.

## How to get OneLake path

The following steps detail how to get the OneLake path from a table in Warehouse:

1. Open Warehouse in your [!INCLUDE [product-name](../includes/product-name.md)] workspace.

1. In Object Explorer, you find more options **(...)** on a selected table in the **Tables** folder. Select the **Properties** menu.

   :::image type="content" source="media\get-workspace-onelake-path\select-properties.png" alt-text="Screenshot showing where to find the Properties option on a selected table." lightbox="media\get-workspace-onelake-path\select-properties.png":::

1. On selection, the right-side pane shows the following information:
   1. Name
   1. Format
   1. Type
   1. URL
   1. Relative path
   1. ABFS path ([Learn more](/azure/storage/blobs/data-lake-storage-introduction-abfs-uri))

   :::image type="content" source="media\get-workspace-onelake-path\properties-details.png" alt-text="Screenshot of the Properties pane." lightbox="media\get-workspace-onelake-path\properties-details.png":::


## Next steps

- [OneLake overview](../onelake/onelake-overview.md)
- [OneLake File Explorer](../onelake/onelake-file-explorer.md)
- [Delta Lake logs in Synapse Data Warehouse in Microsoft Fabric](query-delta-lake-logs.md)