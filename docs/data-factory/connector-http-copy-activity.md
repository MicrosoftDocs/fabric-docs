---
title: Configure HTTP in a copy activity
description: This article explains how to copy data using HTTP.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure HTTP in a copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to HTTP.

## Supported format

HTTP supports the following file formats. Refer to each article for format-based settings.

- [Avro format](format-avro.md)
- [Binary format](format-binary.md)
- [Delimited text format](format-delimited-text.md)
- [Excel format](format-excel.md)
- [JSON format](format-json.md)
- [ORC format](format-orc.md)
- [Parquet format](format-parquet.md)
- [XML format](format-xml.md)

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

>[!Note]
>Destination isn't supported in the HTTP connector.

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for HTTP under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-http/source.png" alt-text="Screenshot showing source tab and the list of properties." lightbox="./media/connector-http/source.png":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an HTTP connection from the connection list. If no connection exists, then create a new HTTP connection by selecting **New**.
- **Connection type**: Select **HTTP**.
- **Relative URL**: A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the connection definition is used. The HTTP connector copies data from the combined URL: `/[relative URL specified]`.
- **File settings**: Select **File settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Request method**: The HTTP method. Allowed values are **Get** (default) and **Post**.
- **Additional headers**: Additional HTTP request headers.
- **Request body**: The request body for the HTTP request.
- **Request timeout**: The timeout (the timespan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.
- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.
- **Skip line count**: The number of non-empty rows to skip when reading data from input files.
- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-http/additional-columns.png" alt-text="Screenshot showing additional columns." lightbox="./media/connector-http/additional-columns.png":::

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping will not be supported.

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following table contains more information about the copy activity in HTTP.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|**External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Connection type** | The connection of your source data.|\<connection of your source>|Yes |/|
|**Relative URL** |A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the connection definition is used. The HTTP connector copies data from the combined URL: `/[relative URL specified]`.| \<your relative url> |No |relativeUrl|
|**Request method** |The HTTP method. Allowed values are **Get** (default) and **Post**.|•**GET**<br> •**POST**|No |requestMethod|
|**Additional headers** |Additional HTTP request headers.| \<your additional headers\>|No |additionalHeaders|
|**Request body** |The request body for the HTTP request.| \<body for POST HTTP request\>|No |requestBody|
|**Request timeout** |The timeout (the timespan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.| timespan |No |requestTimeout|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\> |No |maxConcurrentConnections|
|**Skip line count** |The number of non-empty rows to skip when reading data from input files.| \<your skip line count> |No |skipLineCount|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.|• Name<br>• Value|No |additionalColumns:<br>• name<br>• value |

## Related content

- [Set up your HTTP connection](connector-http.md)
