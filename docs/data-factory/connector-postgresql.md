---
title: Set up your PostgreSQL database connection
description: This article provides information about how to create a PostgreSQL database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 10/27/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your PostgreSQL database connection

This article outlines the steps to create a PostgreSQL database connection.


<a id="supported-authentication-types"></a>

## Summary

The PostgreSQL database connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect a dataflow Gen2 in Fabric to a PostgreSQL database by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for PostgreSQL database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a PostgreSQL database](#connect-to-a-postgresql-database).

## Prerequisites

[!INCLUDE [postgresql-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/postgresql/prerequisites.md)]

> [!IMPORTANT]
> To use PostgreSQL as a Dataflow Gen2 data destination through an on-premises data gateway, install the [June 2026 gateway update (version 3000.322)](/data-integration/gateway/service-gateway-monthly-updates#june-2026-update-3000322) or later.

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [postgresql-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/postgresql/capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-a-postgresql-database"></a>

### Connection instructions

[!INCLUDE [postgresql-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/postgresql/connect-online.md)]

## Use PostgreSQL as a Dataflow Gen2 data destination

PostgreSQL destination support in Dataflow Gen2 is generally available. Prepare your data with Power Query, and then configure a PostgreSQL destination on the query whose results you want to load.

1. Select the prepared query in the Power Query editor.
1. Select **Add data destination** > **PostgreSQL database**.
1. Select or create a PostgreSQL connection with write access to the target database and table.
1. Choose a new or existing destination table, and then review the column mapping and destination settings.
1. Finish the setup, and then select **Save & run**.
1. Review the refresh status and check the results in PostgreSQL.

:::image type="content" source="media/connector-postgresql/destination-connector.png" alt-text="Screenshot of the PostgreSQL database connector tile in Dataflow Gen2.":::

If you use an on-premises data gateway, the [June 2026 gateway update (version 3000.322)](/data-integration/gateway/service-gateway-monthly-updates#june-2026-update-3000322) or later is required for PostgreSQL destinations.

For more information, see [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md) and [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md).

## Related content

- [For more information about this connector, see the PostgreSQL database connector documentation.](/power-query/connectors/postgresql)
