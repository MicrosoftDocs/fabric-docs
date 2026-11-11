---
title: "Limitations in Microsoft Fabric catalog mirroring for Dremio"
description: Learn about limitations for Dremio catalog mirroring in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 11/10/2026
ms.topic: limits-and-quotas
ai-usage: ai-assisted
---

# Limitations in Microsoft Fabric catalog mirroring for Dremio

This article lists current limitations and considerations with Dremio catalog mirroring in Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Limitations and considerations

- Catalog mirroring requires public internet access to the Dremio project and the storage location of all Iceberg tables. Catalog mirroring doesn't support source firewall rules or other source-network restrictions. Mirrored catalogs support [workspace outbound access protection in Fabric](../../security/workspace-outbound-access-protection-mirrored-catalogs-snowflake-database.md).
- The maximum number of tables that can be mirrored at once is 500. This limit applies to both individually selected tables and any tables that are automatically mirrored.
- The tables mirrored from Dremio are in the Apache Iceberg table format. These tables will be automatically converted from Iceberg to Delta Lake for use in Fabric. This conversion is subject to the [limitations of the Iceberg to Delta Lake conversion feature](../../onelake/onelake-iceberg-tables.md#limitations-and-considerations).
- Dremio Iceberg tables that share names with previously dropped tables aren't mirrored. This behavior is due to the way the table's storage folder is reused across deletion/recreation of tables. Dremio is working on addressing this limitation. 

## Related content

- [Tutorial: Configure Microsoft Fabric mirrored databases from Dremio](dremio-tutorial.md)
- [Mirroring Dremio Catalog](dremio.md)
