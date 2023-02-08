---
title: How to configure HTTP in copy activity
description: This article explains how to copy data using HTTP.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 02/08/2023
ms.custom: template-how-to 
---

# How to configure HTTP in copy activity

This article outlines how to use the copy activity in data pipeline to copy data from and to HTTP.

## Supported format

HTTP supports the following file formats.

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Settings](#settings)

### General

For **General** tab configuration, see General.

### Source

The following properties are supported for HTTP under **Source** tab of a copy activity.

:::image type="content" source="./media/connector-http/source.png" alt-text="Screenshot showing source tab.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an HTTP connection from the connection list.
- **Connection type**: Select **HTTP**.
- **Relative URL**: A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the linked service definition is used. The HTTP connector copies data from the combined URL: `[URL specified in linked service]/[relative URL specified in dataset]`.
- **File settings**: Click on **File settings** to configure the file format. For settings of different file formats, refer to articles in [Supported format](#supported-format) for detailed information.

Under **Advanced**, you can specify the following fields:

- **Request method**: The HTTP method. Allowed values are Get (default) and Post.
- **Additional headers**: Additional HTTP request headers.
- **Request body**: The request body for the HTTP request.
- **Request timeout**: The timeout (the TimeSpan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.
- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Settings

For **Settings** tab configuration, see Settings

## Table summary

To learn more information about copy activity in HTTP, see the following table.

### Source

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|-**Workspace**<br> -**External**<br>  -**Sample dataset**<br>|Yes|type|
|**Connection** |Your connection to the source data store.|< your connection> |Yes|connection|
|**Connection type** | The connection of your source data.|< connection of your source >|Yes |connection type|
|**Relative URL** |A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the linked service definition is used. The HTTP connector copies data from the combined URL: `[URL specified in linked service]/[relative URL specified in dataset]`.| < your relative url > |No |relativeUrl|
|**Request method** |The HTTP method. Allowed values are **Get** (default) and **Post**.|-**GET**<br> -**POST**|No |requestMethod|
|**Additional headers** |Additional HTTP request headers.| \<max concurrent connections\>|No |additionalHeaders|
|**Request body** |The request body for the HTTP request.| \<$$COLUMN:\>|No |requestBody|
|**Request timeout** |The timeout (the TimeSpan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.| TimeSpan |No |requestTimeout|
|**Max concurrent connections** |The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|\<max concurrent connections\> |No |maxConcurrentConnections|

## Next Steps

[How to create HTTP connection](connector-http.md)