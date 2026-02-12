---
title: Track user activities in Microsoft Fabric
description: Learn how to track user activities in Microsoft Fabric using the audit log.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 02/04/2025
---

# Track user activities in Microsoft Fabric

Knowing who is taking what action on which item in Microsoft Fabric, can be critical in helping your organization fulfill requirements such as meeting regulatory compliance and records management. This article discusses tracking user activities using the [audit log](/purview/audit-log-activities).

## Prerequisites

You must be assigned the Audit Logs role in Exchange Online to access the audit log. By default, the Compliance Management and Organization Management role groups have roles assigned on the **Admin roles** page in the Exchange admin center. For more information about the roles that can view audit logs, see [Requirements to search the audit log](/purview/audit-search#before-you-search-the-audit-log).

## Access

To access the audit logs, go to [Microsoft Purview](https://compliance.microsoft.com/auditlogsearch).

### Search the audit logs

You can search the audit logs using the Microsoft Purview filters. When you combine filters, the search results show only items that match all of the filter criteria. This section lists some of the available filters. For more information, review the [Microsoft Purview documentation](/purview).

* **Date and time range** - Search the logs by date range using the *Start date* and *End date* fields. The default selection is the past seven days. The display presents the date and time in UTC format. For the maximum date range supported, please visit [Microsoft Purview documentation](https://aka.ms/PurviewAuditRetentionPolicies).

* **Activities** - Your search returns the selected activities.

* **Users** - Search for activities performed by specific users. Enter one or more user names in the *Users* field. User names appear in email address format. Leave blank to return entries for all users (and service accounts) in your organization.

* **File, folder, or site** - Search by file name, folder name, or URL.

You can also use PowerShell to view audit logs. TO use PowerShell, [Connect to Exchange Online PowerShell](/powershell/exchange/connect-to-exchange-online-powershell). You can also use the blog post [Using Power BI Audit Log and PowerShell to assign Power BI Pro workspace types](https://powerbi.microsoft.com/blog/using-power-bi-audit-log-and-powershell-to-assign-power-bi-pro-licenses/) as a reference.

## Audit log list

[Operation list](operation-list.md) includes a list of all the audit log entries.

## Considerations and limitations

When capacity ID and capacity name aren't available in the audit logs, you can view them in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

## Related content

* [Operation list](operation-list.md)
