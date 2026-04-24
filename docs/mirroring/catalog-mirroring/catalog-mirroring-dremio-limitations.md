---
title: "Limitations in Microsoft Fabric catalog mirroring for Dremio"
description: Learn about limitations for Dremio catalog mirroring in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 04/27/2026
ms.topic: limits-and-quotas
---

# Limitations in Microsoft Fabric catalog mirroring for Dremio

This article lists current limitations and considerations with Dremio catalog mirroring in Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Limitations and considerations

- The connected Dremio project must be reachable via the public internet. Catalog mirroring doesn't currently support firewall rules or other network restrictions. Microsoft plans to address this limitation.
- Dremio Iceberg tables that share names with previously dropped tables aren't mirrored. This behavior is due to the way the table's storage folder is reused across deletion/recreation of tables. Dremio is working on addressing this limitation. 

## Related content

- [Tutorial: Configure Microsoft Fabric mirrored databases from Dremio](catalog-mirroring-dremio-tutorial.md)
- [Mirroring Dremio Catalog](catalog-mirroring-dremio.md)
