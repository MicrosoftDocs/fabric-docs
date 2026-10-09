---
title: Troubleshoot the SQL database in Fabric connector
description: Learn how to troubleshoot issues with the SQL database in Fabric connector in Fabric Data Factory.
ms.reviewer: wiassaf, anthosubasak, niball, antho
ms.topic: troubleshooting
ms.date: 04/07/2026
ms.custom: connectors
---

# Troubleshoot the SQL database in Fabric connector in Fabric Data Factory

This article provides suggestions to troubleshoot common problems with the SQL database in Fabric connector in Data Factory.

## Error code: Failed

- **Message**: `Operation on target CopyJobActivityLoop failed: Activity failed because an inner activity failed; Inner activity name: CopyData_final, Error: The activity was running on gateway, but some cloud connections are incompatible with it. To ensure compatibility, enable the option "Allow this connection to be used with gateways."`

- **Cause**: The SQL database in Fabric connection must be enabled for gateway usage.

- **Recommendation**: To resolve the issue, try these steps:

1. In the Fabric portal, select **Settings**.

1. Select **Manage connections and gateways**, and select the connection with the **SQL database in Fabric** connection type.

1. Under **Authentication settings**, select **Allow this connection to be utilized with either on-premises data gateways or VNet data gateways**. This setting is required because copy operations run through a gateway runtime. If you don't enable the SQL database in Fabric connection for gateway usage, data copy operations fail.

1. Select **Save** to save the connection.

For more information on creating Fabric SQL connections that work with on-premises data gateways, see [Migrate to SQL database in Fabric with the Migration Assistant by using DACPAC](../database/sql/migrate-with-migration-assistant-using-dacpac.md#create-a-sql-database-in-fabric-connection).

## Related content

For more troubleshooting help, try these resources:

- [Fabric blog](https://community.fabric.microsoft.com/category/fabricupdatesblogs/blog/fbc_fabricupdatesblogs)
- [Data Factory forums | Fabric Community](https://community.fabric.microsoft.com/category/datafactory)
- [Data Factory feature requests](https://ideas.fabric.microsoft.com/)
