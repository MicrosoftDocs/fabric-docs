---
title: How to configure REST in copy activity
description: This article explains how to copy data using REST.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 02/07/2023
ms.custom: template-how-to 
---

# How to configure REST in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to a REST endpoint.

Specifically, this generic REST connector supports:

- Copying data from a REST endpoint by using the **GET** or **POST** methods and copying data to a REST endpoint by using the **POST**, **PUT** or **PATCH** methods.
- **Pagination** in the REST APIs.
- For REST as source, copying the REST JSON response as-is or parse it by using schema mapping. Only response payload in **JSON** is supported.

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Settings](#settings)

### General

For **General** tab configuration, go to General.

### Source

The following properties are supported for REST under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-rest/source.png" alt-text="Screenshot showing source tab and the list of properties.":::

The following some properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an **REST** connection from the connection list. If no connection exists, then create a new REST connection by selecting **New**.
- **Connection type**: Select **REST**.
- **Relative URL**: A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the linked service definition is used. The HTTP connector copies data from the combined URL: `[URL specified in linked service]/[relative URL specified]`.

Under **Advanced**, you can specify the following fields:

- **Request method**: The HTTP method. Allowed values are Get (default) and Post.

    :::image type="content" source="./media/connector-rest/request-method.png" alt-text="Screenshot showing request method.":::

- **Request timeout**: The timeout (the timespan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.
- **Request interval (ms)**: The interval time between different requests for multiple pages in milliseconds. Request interval value should be a number between [10, 60000].
- **Additional headers**: Additional HTTP request headers.

    :::image type="content" source="./media/connector-rest/additional-headers.png" alt-text="Screenshot showing additional headers.":::

- **Pagination rules**: The pagination rules to compose next page requests. Refer to [pagination](/azure/data-factory/connector-rest?tabs=data-factory#pagination-support) support section on details.

    :::image type="content" source="./media/connector-rest/pagination-rules.png" alt-text="Screenshot showing pagination rules.":::

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

    :::image type="content" source="./media/connector-rest/additional-columns.png" alt-text="Screenshot showing additional columns.":::

## Destination

The following some properties are supported for REST under the **Destination** tab of a copy activity.

:::image type="content" source="./media/connector-rest/destination.png" alt-text="Screenshot showing destination tab.":::

The following three properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an **REST** connection from the connection list. If no connection exists, then create a new REST connection by selecting **New**.
- **Connection type**: Select REST.
- **Relative URL**: A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the linked service definition is used. The HTTP connector copies data from the combined URL: `[URL specified in linked service]/[relative URL specified]`.

Under **Advanced**, you can specify the following fields:

- **Request method**: The HTTP method. Allowed values are **POST** (default), **PUT**, and **PATCH**.
- **Request timeout**: The timeout (the timespan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to write the data. The default value is 00:01:40.
- **Request interval (ms)**: The interval time between different requests for multiple pages in milliseconds. Request interval value should be a number between [10, 60000].
- **Write batch size**: Number of records to write to the REST sink per batch. The default value is 10000.
- **Http Compression type**: HTTP compression type to use while sending data with Optimal Compression Level. Allowed values are **None** and **GZip**.
- **Additional headers**: Additional HTTP request headers.

    :::image type="content" source="./media/connector-rest/additional-headers.png" alt-text="Screenshot showing additional headers.":::

### Settings

For **Settings** tab configuration, see Settings

## Table summary

The following tables contain more information about the copy activity in REST.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|•**Workspace**<br> •**External**<br>  •**Sample dataset**<br>|Yes|type|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Connection type** | Your connection type. Select **REST**.|**REST**|Yes |type:<br>RestResource|
|**Relative URL** |A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the linked service definition is used. The HTTP connector copies data from the combined URL: `[URL specified in linked service]/[relative URL specified]`.| \<your relative url> |No |relativeUrl|
|**Request method** |The HTTP method. Allowed values are **Get** (default) and **Post**.|•**GET**<br> •**POST**|No |requestMethod|
|**Request timeout** |The timeout (the timespan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.| timespan |No |httpRequestTimeout|
|**Request interval (ms)** |The interval time between different requests for multiple pages in milliseconds. Request interval value should be a number between [10, 60000].| [10, 60000]|No |requestInterval|
|**Additional headers** |Additional HTTP request headers.| \<your additional headers\>|No |additionalHeaders|
|**Pagination rules** |The pagination rules to compose next page requests. Refer to [pagination](/azure/data-factory/connector-rest?tabs=data-factory#pagination-support) support section on details.| Go to [pagination](/azure/data-factory/connector-rest?tabs=data-factory#pagination-support)|No |paginationRules|
|**Additional columns** |Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.| - Name<br>- Value|No |additionalColumns:<br>- name<br>- value |

### Destination information

|Name |Description |Value |Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|•**Workspace**<br> •**External** |Yes|type|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Connection type** | Your connection type. Select **REST**.|**REST**|Yes |type:<br>RestResource|
|**Relative URL** |A relative URL to the resource that contains the data. When this property isn't specified, only the URL that's specified in the linked service definition is used. The HTTP connector copies data from the combined URL: `[URL specified in linked service]/[relative URL specified]`.|\<your relative url> |No |relativeUrl|
|**Request method** |The HTTP method. Allowed values are **POST** (default), **PUT**, and **PATCH**.|  •**POST**<br> •**GET**<br> •**PATCH**|No |requestMethod|
|**Request timeout** |The timeout (the timespan value) for the HTTP request to get a response. This value is the timeout to get a response, not the timeout to read response data. The default value is 00:01:40.|timespan |No |httpRequestTimeout|
|**Request interval (ms)** |The interval time between different requests for multiple pages in milliseconds. Request interval value should be a number between [10, 60000].| [10, 60000] |No |requestInterval|
|**Write batch size** |Number of records to write to the REST sink per batch. The default value is 10000.| \<number of rows><br>(integer)  |No |writeBatchSize|
|**Http Compression type** |HTTP compression type to use while sending data with Optimal Compression Level. Allowed values are **None** and **GZip**.| • **None**<br> • **GZip**|No |httpCompressionType|
|**Additional headers** |Additional HTTP request headers.| \<your additional headers\>|No |additionalHeaders|

## Next steps

[How to create REST connection](connector-rest.md)