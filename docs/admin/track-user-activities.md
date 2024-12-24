---
title: Track user activities in Microsoft Fabric
description: Learn how to track user activities in Microsoft Fabric using the audit log.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
ms.date: 12/22/2024
---

# Track user activities in Microsoft Fabric

Knowing who is taking what action on which item in Microsoft Fabric, can be critical in helping your organization fulfill requirements such as meeting regulatory compliance and records management. This article discusses tracking user activities using the [audit log](/purview/audit-log-activities).

## Prerequisites

You must be assigned the Audit Logs role in Exchange Online to access the audit log. By default, the Compliance Management and Organization Management role groups have roles assigned on the **Admin roles** page in the Exchange admin center. For more information about the roles that can view audit logs, see [Requirements to search the audit log](/purview/audit-search#before-you-search-the-audit-log).

## Access

To access the audit logs, in Fabric go to the [admin portal](../admin/admin-center.md), select **Audit logs**, and then select **Go to Microsoft 365 Admin Center**.

Audit logs are also available directly through [Microsoft Purview](https://compliance.microsoft.com/auditlogsearch).

### Search the audit logs

You can search the audit logs using the filters in the following list. When you combine filters, the search results show only items that match all of the filter criteria.

* **Activities** - Your search returns the selected activities.

* **Date and time range** - Search the logs by date range using the *Start date* and *End date* fields. The default selection is the past seven days. The display presents the date and time in UTC format. The maximum date range that you can specify is 90 days.

* **Users** - Search for activities performed by specific users. Enter one or more user names in the *Users* field. User names appear in email address format. Leave blank to return entries for all users (and service accounts) in your organization.

* **File, folder, or site** - Search by file name, folder name, or URL.

You can also use PowerShell to view audit logs. TO use PowerShell, [Connect to Exchange Online PowerShell](/powershell/exchange/connect-to-exchange-online-powershell). You can also use the blog post [Using Power BI Audit Log and PowerShell to assign Power BI Pro licenses](https://powerbi.microsoft.com/blog/using-power-bi-audit-log-and-powershell-to-assign-power-bi-pro-licenses/) as a reference.

## Audit log list

[Operation list](operation-list.md) includes a list of all the audit log entries.

## Considerations and limitations

When capacity ID and capacity name aren't available in the audit logs, you can view them in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

## Related content

* [Operation list](operation-list.md)
