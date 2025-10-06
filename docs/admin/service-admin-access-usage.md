---
title: Find users who have signed in
description: Learn how to see who has signed into Power BI, and how to use the Microsoft Entra ID access and usage reports.
author: msmimart
ms.author: mimart
ms.reviewer: ''
ms.custom: sfi-image-nochange
ms.topic: how-to
ms.date: 10/06/2025
LocalizationGroup: Administration
---

# Find users who have signed in

If you're an admin for your organization, and want to see who has signed into Fabric, use [Microsoft Entra access and usage reports](/entra/identity/monitoring-health/concept-sign-ins), which are also known as the sign-in logs.

> [!NOTE]
> The *Sign-in logs* report provides useful information, but it doesn't identify the type of license for each user. Use the Microsoft 365 admin center to view licenses.

## Requirements

Any user can view a report of their own sign-ins. To see a report for all users, you must have a Fabric administrator role.

<a name='use-the-azure-ad-admin-center-to-view-sign-ins'></a>

## Use the Microsoft Entra admin center to view sign-ins

To view sign-in activity, follow these steps:

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/#view/Microsoft_AAD_IAM/TenantOverview.ReactView), and then expand **Entra ID** from the left navigation pane.

1. From the resource menu under **Entra ID**, select **Monitoring & health** > **Sign-in logs**.

    :::image type="content" source="media/service-admin-access-usage/azure-portal-sign-ins.png" alt-text="Screenshot of the Microsoft Entra admin center with the sign-in logs menu highlighted." lightbox="media/service-admin-access-usage/azure-portal-sign-ins.png":::

    By default, all sign-ins from the last 24 hours for all users and all applications are shown. 

1. To select a different time period, select **Date** in the working pane and choose from the available time intervals. For more information about available time intervals, see [data retention](#data-retention).

1. To see only sign-ins to specific applications, add filters. 
1. Select **Add filter** and then select **Application** as the field to filter by.

    :::image type="content" source="media/service-admin-access-usage/sign-in-add-filter.png" alt-text="Screenshot of the sign-in filter being added." lightbox="media/service-admin-access-usage/sign-in-add-filter.png":::

    - To see only sign-in activity that's related to Power BI service, enter **Microsoft Power BI**
        
    - To see only sign-in activity that's specific to the on-premises data gateway, enter **Power BI Gateway**

1. Select **Apply**.

## Export the data

You can [download a sign-in report](/entra/identity/monitoring-health/howto-download-logs) in either of two formats: a CSV file, or a JSON file. Use the following steps to download your report:

1. From the command bar for the **Sign-in events** page, select **Download** and then select one of the following options:

   - **Download JSON** to download a JSON file for the currently filtered data.

   - **Download CSV** to download a CSV file for the currently filtered data.

2. Decide what type of sign-ins you want to export, and then select **Download**.

    :::image type="content" source="media/service-admin-access-usage/download-sign-in-data-csv.png" alt-text="Screenshot of the data export with the Download option highlighted." lightbox="media/service-admin-access-usage/download-sign-in-data-csv.png":::

> [!NOTE] 
> You can download up to a maximum of 100,000 records per file. For example, if you are downloading the interactive and non-interactive sign-ins files, you will get 100,000 rows for each file. If you want to download more, use our reporting APIs or export to a storage account, SIEM or Log Analytics through **Export Data Settings**.

## Data retention

Sign-in-related data is available for up to seven days, unless your organization has a Microsoft Entra ID P1 or P2 license. If you use Microsoft Entra ID P1 or Microsoft Entra ID P2, you can see data for the past 30 days. For more information, see [How long does Microsoft Entra ID store reporting data?](/entra/identity/monitoring-health/reference-reports-data-retention).

## Related content

- [Use the Monitoring hub](monitoring-hub.md)
