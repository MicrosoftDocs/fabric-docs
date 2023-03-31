---
title: How to create an Amazon S3 connection
description: This article provides information about how to create an Amazon S3 connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 02/23/2023
ms.custom: template-how-to
---

# How to create an Amazon S3 connection

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This article outlines the steps to create an Amazon S3 connection.

## Supported authentication types

This Amazon S3 connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √| |

>[!Note]
>For the Amazon S3 connection of Dataflow Gen2, see this article.

## Prerequisites

To get started, you must complete the following prerequisites:

- Create a tenant account with an active subscription. Create an account for free.

- Create a workspace that isn't the default My Workspace.

## Create a connection

1. From the page header in the Data Factory service, select **Settings** ![Settings gear icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHoSURBVDhPfVI9SEJRFH5q9idRghhRBoH5hgz62QyKRAqHhiZraqogMBoKgiyQnLK1IYPWFCopIY20JbSWTNOh1xL0clAqK7A0M/ue91kG0ccZzvnud+4959wjyOfzVBEBJuEI3Nw+pJyzWoTD1uNmmcSgadHQciIAfhKs+1F36G5CRyNNragDE2WfIAU/qVOBJzIKCQT+q/jC1jmcp1RGadyGwUFo3Dw7CLIFCQcuYWUv4mfiONaaPYQtRb/ZHbl9xHU2L4NQNDA6ZfMx6ffcqiuKd9UKKf90ERVikWU3nM7m7IGbHlouwIsodETTwp9TlMke9IRicPSdTcuGTkICSEB7wiibPGUSz6/vhIX65S3rWxqEgUTHhIfPy1AWekCLhYLz370SlPLrR1dwhMiurRaTa/4H+/CKF0RhSW/m49M+01cpFoFNPKcPQzFUDx/lYQZadQP8sT6lOxSz7F4KFTIJmq6tLucuoSjLSFdNlbh73gUjIeEhgEzf0SjAgE2OYA9djwmM61Sl4yLAcDa811C7L+6cc1q+afwlfgd/VOjwF0DiUmII/16N1ukdGBkXyNLVKOMf5lYtif9qb5b6mcTsUBuYRccFKgGJnSUa4Nd6I8fmvWbvU1ytmMzaCXqd0Kl+9oWivgAsYHfccfep7QAAAABJRU5ErkJggg==) > **Manage connections and gateways**

   :::image type="content" source="media/connector-common/manage-connections-gateways.png" alt-text="Screenshot showing how to open manage gateway.":::

2. Select **New** at the top of the ribbon to add a new data source.

    :::image type="content" source="./media/connector-common/add-new-connection.png" alt-text="Screenshot showing the '+ new' page.":::
    
    The **New connection** pane will show up on the left side of the page.
       
    :::image type="content" source="./media/connector-common/new-connection-pane.png" alt-text="Screenshot showing the 'New connection pane.":::

## Set up the connection

### Step 1: Specify the new connection name, type, data source path

   :::image type="content" source="media/connector-amazon-s3/connection-details.png" alt-text="Screenshot showing how to set new connection.":::

In the **New connection** pane, choose **Cloud**, and then specify the following fields:

- **Connection name**: Specify a name for your connection.
- **Connection type**: Select **Amazon S3** for your connection type.
- **Data source path**: Enter your account endpoint URL of your Amazon S3 data.

### Step 2:  Select and set your authentication

Under **Authentication method**, select your authentication method from the drop-down list and complete the related configuration. This Amazon S3 connector supports the following authentication types:

- [Basic](#basic-authentication)

:::image type="content" source="media/connector-amazon-s3/authentication-method.png" alt-text="Screenshot showing the authentication method for Amazon S3.":::

#### Basic authentication

- **Username**: The user name to use to access the Amazon S3 endpoint.
- **Password**: The password for the specified username.

:::image type="content" source="media/connector-amazon-s3/basic-authentication.png" alt-text="Screenshot showing the basic authentication method for Amazon S3.":::

### Step 3: Specify the privacy level that you want to apply

In the **General** tab, under **Privacy level**, select the privacy level that you want apply. Three privacy levels are supported. For more information, go to privacy levels.

### Step 4: Create your connection

Select **Create**. Your creation will be successfully tested and saved if all the credentials are correct. If the credentials aren't correct, the creation will fail with errors.

:::image type="content" source="./media/connector-amazon-s3/connection.png" alt-text="Screenshot showing connection page.":::

## Table summary

The following table contains connector properties that are supported in pipeline copy and Dataflow Gen2:

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Connection name**|A name for your connection.|Yes||✓/|
|**Connection type**|Select **Amazon S3** for your connection type.|Yes||✓/|
|**Data source path**|Enter your account endpoint URL of your Amazon S3.|Yes||✓/|
|**Authentication**|See [Authentication](#authentication) |Yes|See Authentication|See [Authentication](#authentication)|

### Authentication

The following table contains properties for the supported authentication type.

|Name|Description|Required|Property|Copy/Dataflow Gen2|
|:---|:---|:---|:---|:---|
|**Basic**||||✓/|
|- Username|The user name to use to access the Amazon S3 endpoint.|Yes |||
|- Password|The password for specified username.|Yes |||

## Next steps

- [How to create Amazon S3 connection](connector-amazon-s3.md)
