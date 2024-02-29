---
title: Track user activities in Microsoft Fabric
description: Learn how to track user activities in Microsoft Fabric using the audit log.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.custom:
ms.date: 02/29/2024
---

# Track user activities in Microsoft Fabric

Knowing who is taking what action on which item in Microsoft Fabric, can be critical in helping your organization fulfill requirements such as meeting regulatory compliance and records management. This article discusses tracking user activities using the [audit log](/purview/audit-log-activities).

## Prerequisites

* Enable the Fabric [Azure Log Analytics connections for workspace administrators](../admin/service-admin-portal-audit-usage.md#azure-log-analytics-connections-for-workspace-administrators) tenant setting. There might be up to a 48 hour delay between the time you enable auditing and when you can view audit data.

* You must either be a global administrator or assigned the Audit Logs role in Exchange Online to access the audit log. By default, the Compliance Management and Organization Management role groups have roles assigned on the **Admin roles** page in the Exchange admin center. For more information about the roles that can view audit logs, see [Requirements to search the audit log](/microsoft-365/compliance/search-the-audit-log-in-security-and-compliance#before-you-search-the-audit-log).

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

## Limitations

For some audit events, the capacity name and capacity ID aren't currently available in the logs.

## Related content

[Operation list](operation-list.md)
