---
title: Set up your Google BigQuery connection
description: This article provides information about how to create a Google BigQuery connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/04/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Google BigQuery connection

This article outlines the steps to create a Google BigQuery connection.


<a id="supported-authentication-types"></a>

## Summary

The Google BigQuery connector supports the following authentication types for copy and dataflow Gen2 respectively.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service Account Login| √ | √ |
|Organizational account| n/a | √ |

## Set up your connection for dataflow Gen2
You can connect dataflow Gen2 in Fabric to Google BigQuery by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Google BigQuery](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Google BigQuery data](#connect-to-google-bigquery-data).

## Prerequisites

[!INCLUDE [google-bigquery-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [google-bigquery-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-google-bigquery-data"></a>

### Connection instructions

[!INCLUDE [google-bigquery-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/connect-online.md)]

## Use Google BigQuery as a data destination (preview)

Use Google BigQuery as a Dataflow Gen2 data destination to write transformed query results to a BigQuery table. Your connection needs write access to the target dataset and table, and permission to create a table if you select a new target.

> [!IMPORTANT]
> To use Google BigQuery as a Dataflow Gen2 data destination through an on-premises data gateway, you need the November 2026 gateway release (version **3000.342.0**) or later. For update instructions, see [Update an on-premises data gateway](/data-integration/gateway/service-gateway-update).

1. Open your Dataflow Gen2 in the Power Query editor and select the query whose results you want to load.
1. Select **Add data destination** > **Google BigQuery**.
1. Select an existing connection or create one by using the [connection settings](#connection-settings).
1. Select the target project and dataset, and then create a new table or select an existing table.
1. Review the column mapping and the destination settings offered for the selected table. Finish the destination setup.
1. Select **Save & run**. After the refresh completes, check the results in the target BigQuery table.

For more information, see [Dataflow Gen2 data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md) and [View refresh history and monitor your dataflows](dataflows-gen2-monitor.md).

## Limitations and considerations

[!INCLUDE [google-bigquery-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/google-bigquery/limitations.md)]

### Dataflow Gen2 destination performance (preview)

Writing data to Google BigQuery from Dataflow Gen2 can be slower than expected during preview. This performance issue is known, and performance improvements are planned during the preview phase. Evaluate refresh times with a representative dataset when planning your workflow.

### Empty query results in the Dataflow Gen2 destination (preview)

During preview, loading an empty table (a query result with no rows) to a Google BigQuery destination fails. The refresh can return an error that doesn't clearly identify the empty result as the cause.

When investigating this error, check whether the query returns any rows after filtering and other transformations. There isn't a validated workaround for loading an empty result.

## Related content

- [For more information about this connector, see the Google BigQuery connector documentation.](/power-query/connectors/google-bigquery)
