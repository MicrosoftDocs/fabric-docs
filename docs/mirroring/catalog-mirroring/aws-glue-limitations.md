---
title: "Limitations in Microsoft Fabric catalog mirroring for AWS Glue"
description: Learn about limitations for AWS Glue catalog mirroring in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: mahi
ms.date: 07/28/2026
ms.topic: limits-and-quotas
ai-usage: ai-assisted
---

# Limitations in Microsoft Fabric catalog mirroring for AWS Glue

This article lists current limitations and considerations with AWS Glue catalog mirroring in Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

## Limitations and considerations

- You can only mirror tables in the Apache Iceberg table format from AWS Glue. If you select a non-Iceberg table (for example, a Hive, CSV, JSON, or plain Parquet table cataloged in AWS Glue), the process doesn't mirror that table, and you might see an error in your mirrored item. Make sure the tables you select are Iceberg tables.
- The tables mirrored from AWS Glue are in the Apache Iceberg table format. OneLake automatically converts these tables from Iceberg to Delta Lake for use in Fabric. This conversion is subject to the [limitations of the Iceberg to Delta Lake conversion feature](../../onelake/onelake-iceberg-tables.md#limitations-and-considerations).
- You must reach the AWS Glue Iceberg REST catalog endpoint and the storage location of all Iceberg tables through the public internet. Catalog mirroring doesn't currently support firewall rules or other network restrictions. Microsoft plans to address this limitation.
- You can mirror up to 500 tables at once. This limit applies to both individually selected tables and any tables that are automatically mirrored.
- Mirrored AWS Glue catalog data is read-only in Fabric. You can't write back to the source AWS Glue tables through the mirrored item.
- Fine-grained access permissions defined in AWS Lake Formation, such as column-level, row-level, and cell-level filters, aren't enforced on the mirrored item in Fabric. Grant access to the mirrored item through [OneLake security](../../onelake/security/get-started-onelake-security.md), and review the mirrored item as its own access surface.
- Mirroring uses the IAM credential you supply when you create the connection. If you rotate, disable, or delete that access key, or if you revoke its AWS Glue or Amazon S3 permissions, metadata sync stops until you update the connection with a valid credential.

## Related content

- [Tutorial: Configure Microsoft Fabric mirrored AWS Glue catalog](aws-glue-tutorial.md)
- [AWS Glue catalog mirroring](aws-glue.md)
