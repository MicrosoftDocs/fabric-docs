---
title: Configure Dynamics AX in a copy activity
description: This article explains how to copy data using Dynamics AX.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 04/24/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Dynamics AX in a copy activity

This article outlines how to use the copy activity in Data pipeline to copy data from Dynamics AX.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for Dynamics AX under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-dynamics-ax/source.png" alt-text="Screenshot showing source tab.":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a Dynamics AX connection from the connection list. If no connection exists, then create a new Dynamics AX connection by selecting **New**.
- **Connection type**: Select **Dynamics AX**.
- **Use query**: Specify way to read data. Select **Path** to read data from the specified path or select **Query** to read data using queries.
    - If you select **Path**:
      - **Path**: Specify the path to the Dynamics AX OData entity.

        :::image type="content" source="./media/connector-dynamics-ax/use-query-path.png" alt-text="Screenshot showing Use query - Path." :::

    - If you select **Query**:
      - **Path**: Specify the path to the Dynamics AX OData entity.
      - **Query**: Specify the OData query options for filtering data. For example, `"?$select=Name,Description&$top=5"`.
      
      > [!Note]
      > The connector copies data from the combined URL: `[URL specified in linked service]/[path specified in dataset][query specified in copy activity source]`. For more information, see [OData URL components](https://www.odata.org/documentation/odata-version-3-0/url-conventions/).

        :::image type="content" source="./media/connector-dynamics-ax/use-query-query.png" alt-text="Screenshot showing Use query - Query." :::

Under **Advanced**, you can specify the following fields:

- **Request timeout**: Specify the timeout (the **TimeSpan** value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. If not specified, the default value is 00:05:00 (5 minutes).
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Dynamics AX.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
| **Data store type** |Your data store type.| **External** |Yes|/|
| **Connection** |Your connection to the source data store.|\<your Dynamics AX connection> |Yes|connection|
| **Connection type** |Select a type for your connection.|**Dynamics AX**|Yes|/|
| **Use query** |The way to read data from Dynamics AX. Apply **Path** to read data from the specified path or apply **Query** to read data using queries.|• **Path** <br>• **Query** |Yes |/|
| **Path** | The path to the Dynamics AX OData entity. | < your path > | Yes | path |
| **Query** | OData query options for filtering data. For example, `"?$select=Name,Description&$top=5"`. <br/><br/>**Note**: The connector copies data from the combined URL: `[URL specified in linked service]/[path specified in dataset][query specified in copy activity source]`. For more information, see [OData URL components](https://www.odata.org/documentation/odata-version-3-0/url-conventions/).  | < your query > | No | query |
| **Request timeout** |The timeout (the **TimeSpan** value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data.| timespan<br>(the default is **00:05:00** - 5 minutes) |No|httpRequestTimeout|
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |

## Related content

- [Dynamics AX overview](connector-dynamics-ax-overview.md)
