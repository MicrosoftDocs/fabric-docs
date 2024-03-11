---
title: Configure Microsoft 365 in a copy activity
description: This article explains how to copy data using Microsoft 365.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Microsoft 365 in a copy activity

Microsoft Fabric Data pipelines integrate with [Microsoft Graph data connect](/graph/data-connect-concept-overview), allowing you to bring the rich organizational data in your Microsoft 365 tenant into Fabric and Azure in a scalable way and build analytics applications and extract insights based on these valuable data assets. Integration with Privileged Access Management provides secured access control for the valuable curated data in Microsoft 365. Please refer to [this link](/graph/data-connect-concept-overview) for an overview of Microsoft Graph data connect.

This article outlines how to use the copy activity in a data pipeline to copy data from Microsoft 365. For now, within a single copy activity, you can ingest data from Microsoft 365 into Microsoft Fabric Lakehouse Table, Azure Blob Storage, Azure Data Lake Storage Gen1, and Azure Data Lake Storage Gen2. The supported data format is Avro, Delimited text, JSON, ORC and Parquet format.

## Prerequisites

To copy data from Microsoft 365, you need to complete the following prerequisite steps:

- Your Microsoft 365 tenant admin must complete on-boarding actions as described [here](/events/build-may-2021/microsoft-365-teams/breakouts/od483/).
- Create and configure a Microsoft Entra web application in Microsoft Entra ID. For instructions, go to [Create a Microsoft Entra application](/entra/identity-platform/howto-create-service-principal-portal#register-an-application-with-microsoft-entra-id-and-create-a-service-principal).
- Make note of the following values, which you use to define the connection for Microsoft 365:
Tenant ID. For instructions, go to [Get tenant ID](/entra/identity-platform/howto-create-service-principal-portal#sign-in-to-the-application).
- Application ID and Application key. For instructions, go to [Get application ID and authentication key](/entra/identity-platform/howto-create-service-principal-portal#sign-in-to-the-application).
Add the user identity who will be making the data access request as the owner of the Microsoft Entra web application (from the Microsoft Entra web application > **Settings** > **Owners** > **Add owner**).
- The user identity must be in the Microsoft 365 organization you're getting data from and must not be a Guest user.

## Approving new data access requests

If you're requesting data for this context for the first time (a combination of which data table is being accessed, which destination account is the data being loaded into, and which user identity is making the data access request), the copy activity status is displayed as **In Progress**. Only when you select the [**Details** link under **Actions**](/azure/data-factory/copy-activity-overview#monitoring) will the status be displayed as **RequestingConsent**. A member of the data access approver group needs to approve the request in the Privileged Access Management before the data extraction can proceed.

Refer to the [frequently asked questions](/graph/data-connect-faq#how-can-i-approve-pam-requests-via-the-microsoft-365-admin-center) on how the approver can approve the data access request. Refer to the [data connect integration with PAM](/graph/data-connect-pam) article for an explanation of the overall integration with Privileged Access Management, including how to set up the data access approver group.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For the **General** tab configuration, go to [General](activity-overview.md#general-settings).

### Source

The following properties are supported for Microsoft 365 under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-microsoft-365/source.png" alt-text="Screenshot showing source tab." lightbox="./media/connector-microsoft-365/source.png":::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**:  Select a **Microsoft 365** connection from the connection list. If no connection exists, then create a new Microsoft 365 connection by selecting **New**.
- **Table**: Name of the table to extract from **Microsoft 365**. You can preview the sample data by selecting **Preview sample data**.

Under **Advanced**, you can specify the following fields:

- **Scope**: You can select **All users or groups in the Microsoft 365 tenant** or **Select groups from the Microsoft 365 tenant**

  If you select **All users or groups in the Microsoft 365 tenant**, the scope filter is displayed.

  :::image type="content" source="./media/connector-microsoft-365/scope-filter.png" alt-text="Screenshot showing scope filter." lightbox="./media/connector-microsoft-365/scope-filter.png":::

  - **Scope filter**: You can use a predicate expression that's applied on the entire tenant to filter the specific rows to extract from Microsoft 365. The predicate format should match the query format of Microsoft Graph APIs, for example `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.

  If you select **Select groups from the Microsoft 365 tenant**, you can select **Add user groups** to select groups from the Microsoft 365 tenant. Use this property to select up to 10 user groups for whom the data is retrieved. If no groups are specified, then data is returned for the entire organization.

  :::image type="content" source="./media/connector-microsoft-365/group-details.png" alt-text="Screenshot showing group details." lightbox="./media/connector-microsoft-365/group-details.png":::

- **Date filter**: Specify the name of the DateTime filter column. Use this property to limit the time range for which Microsoft 365 data is extracted. If your dataset has one or more DateTime columns, you need to specify a column here. Refer to [Filtering](/graph/data-connect-filtering#filtering) for a list of datasets that require this DateTime filter.

  Specify the **Start time (UTC)** and **End time (UTC)** to filter on when you select a DateTime filter column.

  :::image type="content" source="./media/connector-microsoft-365/data-filter.png" alt-text="Screenshot showing data filter." lightbox="./media/connector-microsoft-365/data-filter.png":::

### Mapping

For the **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in Microsoft 365.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.| **External**|Yes|/|
|**Connection** |Your connection to the source data store.|\<your connection> |Yes|connection|
|**Table**|Name of the table to extract from **Microsoft 365**.|\<table>|Yes|table|
|**Scope**|When the user group isn't specified, you can use a predicate expression that's applied on the entire tenant to filter the specific rows to extract from Microsoft 365. The predicate format should match the query format of Microsoft Graph APIs, for example `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.|\<your scope>|Yes|scope|
|**Scope filter**|When the `allowedGroups` property isn't specified, you can use a predicate expression that's applied on the entire tenant to filter the specific rows to extract from Microsoft 365. The predicate format should match the query format of Microsoft Graph APIs, for example `https://graph.microsoft.com/v1.0/users?$filter=Department eq 'Finance'`.|\<scope filter>|No|userScopeFilterUri|
|**Group ID**|Group selection predicate. Use this property to select up to 10 user groups for whom the data is retrieved. If no groups are specified, then data is returned for the entire organization.|\<group id>|No|allowedGroups|
|**Date filter<br>(Column name)**|Name of the DateTime filter column. Use this property to limit the time range for which Microsoft 365 data is extracted.|\<your DateTime filter column>|Yes if data has one or more DateTime columns.|dateFilterColumn|
|**Start time (UTC)**|Start DateTime value to filter on.|\<start time>|Yes if `dateFilterColumn` is specified|startTime|
|**End time (UTC)**|End DateTime value to filter on.|\<end time>|Yes if `dateFilterColumn` is specified|endTime|

## Related content

- [How to create a Microsoft 365 connection](connector-microsoft-365.md)
