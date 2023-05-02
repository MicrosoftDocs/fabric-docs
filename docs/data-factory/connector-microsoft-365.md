---
title: How to create Microsoft 365 connection
description: This article provides information about how to do create Microsoft 365 connection in [!INCLUDE [product-name](../includes/product-name.md)].
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 04/21/2023
ms.custom: template-how-to
---

# How to create Microsoft 365 connection

This article outlines the steps to create Microsoft 365 connection.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Supported authentication types

This Microsoft 365 connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Service principal| √| |

>[!Note]
>For the Microsoft 365 connection of Dataflow Gen2, see this article.

## Prerequisites

To get started, you must complete the following prerequisites:

- A Microsoft Fabric tenant account with an active subscription. Create an account for free.

- Make sure you have a Microsoft Fabric enabled Workspace.

## Go to Manage gateways to create connection

1. From the page header in Data Integration service, select **Settings** ![Settings gear icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHoSURBVDhPfVI9SEJRFH5q9idRghhRBoH5hgz62QyKRAqHhiZraqogMBoKgiyQnLK1IYPWFCopIY20JbSWTNOh1xL0clAqK7A0M/ue91kG0ccZzvnud+4959wjyOfzVBEBJuEI3Nw+pJyzWoTD1uNmmcSgadHQciIAfhKs+1F36G5CRyNNragDE2WfIAU/qVOBJzIKCQT+q/jC1jmcp1RGadyGwUFo3Dw7CLIFCQcuYWUv4mfiONaaPYQtRb/ZHbl9xHU2L4NQNDA6ZfMx6ffcqiuKd9UKKf90ERVikWU3nM7m7IGbHlouwIsodETTwp9TlMke9IRicPSdTcuGTkICSEB7wiibPGUSz6/vhIX65S3rWxqEgUTHhIfPy1AWekCLhYLz370SlPLrR1dwhMiurRaTa/4H+/CKF0RhSW/m49M+01cpFoFNPKcPQzFUDx/lYQZadQP8sT6lOxSz7F4KFTIJmq6tLucuoSjLSFdNlbh73gUjIeEhgEzf0SjAgE2OYA9djwmM61Sl4yLAcDa811C7L+6cc1q+afwlfgd/VOjwF0DiUmII/16N1ukdGBkXyNLVKOMf5lYtif9qb5b6mcTsUBuYRccFKgGJnSUa4Nd6I8fmvWbvU1ytmMzaCXqd0Kl+9oWivgAsYHfccfep7QAAAABJRU5ErkJggg==) > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection pane.":::

## Setup connection

### Step 1: Specify the new connection name, type

   :::image type="content" source="media/connector-microsoft-365/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, choose **Cloud**, and specify the following field:

**Connection name**: Specify a name for your connection.<br>
**Connection type**: Select **Microsoft 365** for your connection type.<br>

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication from the drop-down list and complete the related configuration. This Microsoft 365 connector supports the following authentication types.

[Service Principal](#service-principal-authentication)

:::image type="content" source="media/connector-microsoft-365/authentication-method.png" alt-text="Screenshot showing that authentication method of Microsoft 365":::

#### Service Principal authentication

:::image type="content" source="media/connector-microsoft-365/service-pricipal-authentication.png" alt-text="Screenshot showing that Service Principal authentication method of Microsoft 365":::

* **Tenant Id**: Your service principal tenant ID. Specify the tenant information under which your Azure AD web application resides.
* **Service principal ID**: Specify the application's client ID.
* **Service principal key**: Specify the application's key.

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, under select the privacy level that you want apply in **Privacy level** drop-down list. Three privacy levels are supported. For more information, see privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If not correct, the creation will fail with errors.

:::image type="content" source="./media/connector-microsoft-365/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following connector properties in the table are supported in pipeline copy and Dataflow Gen2:

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓/|
|**Connection type**|Select **Microsoft-365** for your connection type.|Yes||✓/|
|**Authentication**|See [Authentication](#authentication) |Yes||See [Authentication](#authentication)|

### Authentication

The following properties in the table are the supported authentication type.

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Service Principal**||||✓/|
|- Tenant ID|Your service principal tenant ID. Specify the tenant information under which your Azure AD web application resides.|Yes |||
|- Service Principal ID|Specify the application's client ID.|Yes |||
|- Service Principal key|Specify the application's key.|Yes |||

## Next steps

- [How to create Microsoft 365 connection](connector-microsoft-365.md)