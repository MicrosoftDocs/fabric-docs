---
title: Troubleshoot the SQL database in Fabric connector
description: Learn how to troubleshoot issues with the SQL database in Fabric connector in Data Factory in Microsoft Fabric.
ms.reviewer: antho
ms.topic: troubleshooting
ms.date: 03/13/2026
ms.custom: connectors
---

# Troubleshoot the SQL database in Fabric connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the SQL database in Fabric connector in Data Factory in Microsoft Fabric.

## Error code: Failed

- **Message**: `Operation on target CopyJobActivityLoop failed: Activity failed because an inner activity failed; Inner activity name: CopyData_final, Error: The activity was running on gateway, but some cloud connections are incompatible with it. To ensure compatibility, enable the option "Allow this connection to be used with gateways."`

- **Cause**: the SQL Database in Fabric connection must be enabled for gateway usage.

- **Recommendation**: To resolve the issue, try these steps:

1. In the Microsoft Fabric portal, select **Settings**.

1. Select **Manage connections and gateways**, and select the connection with the **SQL database in Fabric** connection type.

1. Under **Authentication settings**, select **Allow this connection to be utilized with either on-premises data gateways or VNet data gateways**. This setting is required because copy operations run through a gateway runtime. If the SQL Database in Fabric connection isn't enabled for gateway usage, data copy operations fail.

1. Select **Save** to save the connection.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests](https://ideas.fabric.microsoft.com/)
