---
title: How to configure Microsoft 365 in copy activity
description: This article explains how to copy data using Microsoft 365.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 03/06/2023
ms.custom: template-how-to 
---

# How to configure Microsoft 365 in copy activity

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article outlines how to use the copy activity in data pipeline to copy data from and to Microsoft 365.

## Prerequisites

To copy and transform data from Microsoft 365 into Azure, you need to complete the following prerequisite steps:

- Your Microsoft 365 tenant admin must complete on-boarding actions as described [here](/events/build-may-2021/microsoft-365-teams/breakouts/od483/).
- Create and configure an Azure AD web application in Azure Active Directory. For instructions, see [Create an Azure AD application](/azure/active-directory/develop/howto-create-service-principal-portal#register-an-application-with-azure-ad-and-create-a-service-principal).
- Make note of the following values, which you will use to define the linked service for Microsoft 365:
Tenant ID. For instructions, see [Get tenant ID](/azure/active-directory/develop/howto-create-service-principal-portal#sign-in-to-the-application).
- Application ID and Application key. For instructions, see [Get application ID and authentication key](/azure/active-directory/develop/howto-create-service-principal-portal#sign-in-to-the-application).
Add the user identity who will be making the data access request as the owner of the Azure AD web application (from the Azure AD web application > Settings > Owners > Add owner).
- The user identity must be in the Microsoft 365 organization you are getting data from and must not be a Guest user.

## Approving new data access requests

If this is the first time you are requesting data for this context (a combination of which data table is being access, which destination account is the data being loaded into, and which user identity is making the data access request), you will see the copy activity status as "In Progress", and only when you click into ["Details" link under Actions](/azure/data-factory/copy-activity-overview#monitoring) will you see the status as "RequestingConsent". A member of the data access approver group needs to approve the request in the Privileged Access Management before the data extraction can proceed.

Refer [here](/graph/data-connect-faq#how-can-i-approve-pam-requests-via-microsoft-365-admin-portal) on how the approver can approve the data access request, and refer [here](/graph/data-connect-pam) for an explanation on the overall integration with Privileged Access Management, including how to set up the data access approver group.

## Supported format

For now, within a single copy activity, you can only ingest data from Microsoft 365 into **Azure Blob Storage**, **Azure Data Lake Storage Gen1**, and **Azure Data Lake Storage Gen2** in **Binary** format.

Microsoft 365 supports the following file formats. Refer to each article for format-based settings.

- Binary format

## Supported configuration

For the configuration of each tab under copy activity, see the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Microsoft 365 under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-microsoft-365/source.png" alt-text="Screenshot showing source tab.":::

The following some properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select an **Microsoft 365** connection from the connection list. If no connection exists, then create a new Microsoft 365 connection by selecting **New**.
- **Table**: Name of the dataset to extract from **Microsoft 365**.

Under **Advanced**, you can specify the following fields:

- **Scope**: When `allowedGroups` property is not specified, you can use a predicate expression that is applied on the entire tenant to filter the specific rows to extract from Microsoft 365. The predicate format should match the query format of Microsoft Graph APIs, e.g. `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.

- **Date filter**: Name of the DateTime filter column. Use this property to limit the time range for which Microsoft 365 data is extracted.

:::image type="content" source="./media/connector-microsoft-365/data-filter.png" alt-text="Screenshot showing data filter.":::

- **Output columns**: Array of the columns to copy to destination.

:::image type="content" source="./media/connector-microsoft-365/output-columns.png" alt-text="Screenshot showing output columns.":::

### Settings

For **Settings** tab configuration, see Settings

## Table summary

The following tables contain more information about the copy activity in Microsoft 365.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Table**|Name of the dataset to extract from Microsoft 365.|\<table>|Yes|table|
|**Scope**|When `allowedGroups` property is not specified, you can use a predicate expression that is applied on the entire tenant to filter the specific rows to extract from Microsoft 365. The predicate format should match the query format of Microsoft Graph APIs, e.g. `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.|\<your scope>|Yes|scope|
|**Date filter**|Name of the DateTime filter column. Use this property to limit the time range for which Microsoft 365 data is extracted.|\<date filter>|Yes|dateFilter|
|**Output columns**|Array of the columns to copy to sink.|\<output columns>|Yes|outputColumns|

## Next steps

[How to create Microsoft 365 connection](connector-microsoft-365.md)