---
title: How to create a REST connection
description: This article provides information about how to do create a REST connection in Trident.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 02/07/2023
ms.custom: template-how-to
---

# How to create REST connection

This article outlines the steps to create REST connection.

## Supported authentication types

This REST connector supports the following authentication types for copy and dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √| |
|Basic| √| |

## Prerequisites

To get started, you must complete the following prerequisites:

- A tenant account with an active subscription. [Create an account for free](https://github.com/microsoft/trident-docs-private-preview/blob/main/docs/placeholder-update-later.md).

- A workspace is created and isn't the default My Workspace

## Go to Manage gateways to create connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHoSURBVDhPfVI9SEJRFH5q9idRghhRBoH5hgz62QyKRAqHhiZraqogMBoKgiyQnLK1IYPWFCopIY20JbSWTNOh1xL0clAqK7A0M/ue91kG0ccZzvnud+4959wjyOfzVBEBJuEI3Nw+pJyzWoTD1uNmmcSgadHQciIAfhKs+1F36G5CRyNNragDE2WfIAU/qVOBJzIKCQT+q/jC1jmcp1RGadyGwUFo3Dw7CLIFCQcuYWUv4mfiONaaPYQtRb/ZHbl9xHU2L4NQNDA6ZfMx6ffcqiuKd9UKKf90ERVikWU3nM7m7IGbHlouwIsodETTwp9TlMke9IRicPSdTcuGTkICSEB7wiibPGUSz6/vhIX65S3rWxqEgUTHhIfPy1AWekCLhYLz370SlPLrR1dwhMiurRaTa/4H+/CKF0RhSW/m49M+01cpFoFNPKcPQzFUDx/lYQZadQP8sT6lOxSz7F4KFTIJmq6tLucuoSjLSFdNlbh73gUjIeEhgEzf0SjAgE2OYA9djwmM61Sl4yLAcDa811C7L+6cc1q+afwlfgd/VOjwF0DiUmII/16N1ukdGBkXyNLVKOMf5lYtif9qb5b6mcTsUBuYRccFKgGJnSUa4Nd6I8fmvWbvU1ytmMzaCXqd0Kl+9oWivgAsYHfccfep7QAAAABJRU5ErkJggg==) > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection' pane.":::

## Setup your connection

### Step 1: Specify the new connection name, type, and URL.

   :::image type="content" source="media/connector-rest/connection-details.png" alt-text="Screenshot showing how to set new connection":::

In the **New connection** pane, choose **Cloud**, and specify the following field:

**Connection name**: Specify a name for your connection.<br>
**Connection type**: Select REST(Data pipeline) for your connection type.<br>
**URL**: The base URL of the REST service.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This REST connector supports the following authentication types.

[Anonymous](#anonymous-authentication)<br>
[Basic](#basic-authentication)

:::image type="content" source="media/connector-rest/authentication-method.png" alt-text="Screenshot showing that authentication method of REST":::

#### Anonymous authentication

Select **Anonymous** under **Authentication method**.

:::image type="content" source="./media/connector-rest/authentication-anonymous.png" alt-text="Screenshot showing Anonymous authentication.":::

#### Basic authentication

- **Username**: The user name to use to access the REST endpoint.
- **Password**: The password for the user (the userName value). Mark this field as a SecureString type to store it securely in Data Factory. You can also [reference a secret stored in Azure Key Vault](/azure/data-factory/store-credentials-in-key-vault).

:::image type="content" source="media/connector-rest/authentication-basic.png" alt-text="Screenshot showing that basic authentication method":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, under select the privacy level that you want apply in the **Privacy level** drop-down list. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connector-rest/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy and dataflow gen2:

|Name|Description|Required|Property|Copy/Dataflow gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓/|
|**Connection type**|Select a type for your connection. Select **REST**.|Yes||✓/|
|**URL**|The base URL of the REST service.|Yes||✓/|
|**Authentication**|Go to [Authentication](#authentication) |Yes|Go to Authentication|See [Authentication](#authentication)|
|**Privacy Level**|The privacy level that you want to apply. Allowed values are **Organizational**, **Privacy**, **Public**|Yes||✓/|

### Authentication

The following properties in the table are the supported authentication types.

|Name|Description|Required|Property|Copy/dataflow gen2|
|:---|:---|:---|:---|:---|
|**Anonymous**||||✓/|
|**Basic**||||✓/|
|- Username|The user name to use to access the REST endpoint.|Yes |||
|- Password|The password for the user (the userName value). Mark this field as a SecureString type to store it securely in Data Factory. You can also [reference a secret stored in Azure Key Vault](/azure/data-factory/store-credentials-in-key-vault).|Yes |||

## Next steps

- [How to create REST connection](connector-rest.md)