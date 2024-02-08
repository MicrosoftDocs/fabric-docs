---
title: Lockbox for Microsoft Fabric
description: Customer Lockbox for Microsoft Fabric is a service that allows customers to control how Microsoft engineers access their data.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 01/07/2024
---

# Customer Lockbox for Microsoft Fabric

Use [Customer Lockbox for Microsoft Azure](/azure/security/fundamentals/customer-lockbox-overview) to control how Microsoft engineers access your data. In this article you'll learn how Customer Lockbox requests are initiated, tracked, and stored for later reviews and audits.

Typically, Customer Lockbox is used to help Microsoft engineers troubleshoot a [!INCLUDE [product-name](../includes/product-name.md)] service support request. Customer Lockbox can also be used when Microsoft identifies a problem, and a Microsoft-initiated event is opened to investigate the issue.

## Enable Customer Lockbox for Microsoft Fabric

To enable Customer Lockbox for [!INCLUDE [product-name](../includes/product-name.md)], you must be a Microsoft Entra Global Administrator. To assign roles in Microsoft Entra ID, see [Assign Microsoft Entra roles to users](/entra/identity/role-based-access-control/manage-roles-portal).

1. Open the Azure portal.

2. Go to **Customer Lockbox for Microsoft Azure**.

3. In the **Administration** tab, select **Enabled**.

    :::image type="content" source="media/security-lockbox/enable-lockbox.png" alt-text="Screenshot of enabling Customer Lockbox for Microsoft Azure in the Customer Lockbox for Microsoft Azure administration tab." lightbox="media/security-lockbox/enable-lockbox.png":::

## Microsoft access request

In cases where the Microsoft engineer can't troubleshoot your issue by using standard tools, elevated permissions are requested using the [Just-In-Time](/azure/azure-resource-manager/managed-applications/request-just-in-time-access) (JIT) access service. The request can come from the original support engineer, or from a different engineer.

After the access request is submitted, the JIT service evaluates the request, considering factors such as:

* The scope of the resource

* Whether the requester is an isolated identity or using multi-factor authentication

* Permissions levels

Based on the JIT role, the request may also include an approval from internal Microsoft approvers. For example, the approver might be the customer support lead or the DevOps Manager.

When the request requires direct access to customer data, a Customer Lockbox request is initiated. For example, in cases where remote desktop access to a customer's virtual machine is needed. Once the Customer Lockbox request is made, it awaits customer's approval before access is granted.

These steps describe a Microsoft initiated Customer Lockbox request, for [!INCLUDE [product-name](../includes/product-name.md)] service.

1. The Microsoft Entra Global Administrator receives a pending access request notification email from Microsoft. The admin who received the email, becomes the designated approver.

    :::image type="content" source="media/security-lockbox/email-example.png" alt-text="Screenshot of pending access request notification email from Microsoft." lightbox="media/security-lockbox/email-example.png":::

2. The email provides a link to Customer Lockbox in the Azure Administration module. Using the link, the designated approver signs in to the Azure portal to view any pending Customer Lockbox requests. The request remains in the customer queue for four days. After that, the access request automatically expires and no access is granted to Microsoft engineers.

3. To get the details of the pending request, the designated approver can select the Customer Lockbox request from the **Pending Requests** menu option.

4. After reviewing the request, the designated approver enters a justification and selects one of the options below. For auditing purposes, the actions are logged in the Customer Lockbox [logs](#logs).

    * **Approve** - Access is granted to the Microsoft engineer for a default period of eight hours.

    * **Deny** - The access request by the Microsoft engineer is rejected and no further action is taken.

    :::image type="content" source="media/security-lockbox/customer-lockbox-approve.png" alt-text="Screenshot of the approve and deny buttons of a pending Customer Lockbox for Microsoft Azure request." lightbox="media/security-lockbox/customer-lockbox-approval.png":::

## Logs

Customer Lockbox has two type of logs:

* **Activity logs** - Available from the [Azure Monitor activity log](/azure/azure-monitor/essentials/activity-log?tabs=powershell).

    The following activity logs are available for Customer Lockbox:
    * Deny Lockbox Request
    * Create Lockbox Request
    * Approve Lockbox Request
    * Lockbox Request Expiry

    To access the activity logs, in the Azure portal, select *Activity Log*. You can filter the results for specific actions.

    :::image type="content" source="media/security-lockbox/customer-lockbox-activity-logs-thumbnail.png" alt-text="Screenshot of the activity logs in Customer Lockbox for Microsoft Azure." lightbox="media/security-lockbox/customer-lockbox-activity-logs.png":::

* **Audit logs** - Available from the Microsoft Purview compliance portal. You can see the audit logs in the [admin portal](/power-bi/admin/service-admin-portal-audit-logs).

    Customer Lockbox for [!INCLUDE [product-name](../includes/product-name.md)] has four [audit logs](/power-bi/admin/service-admin-auditing):

    |Audit log                             |Friendly name                               |
    |--------------------------------------|--------------------------------------------|
    |GetRefreshHistoryViaLockbox           |Get refresh history via lockbox             |
    |DeleteAdminUsageDashboardsViaLockbox  |Delete admin usage dashboards via lockbox   |
    |DeleteUsageMetricsv2PackageViaLockbox |Delete usage metrics v2 package via lockbox |
    |DeleteAdminMonitoringFolderViaLockbox |Delete admin monitoring folder via lockbox  |

## Exclusions

Customer Lockbox requests aren't triggered in the following engineering support scenarios:

* Emergency scenarios that fall outside of standard operating procedures. For example, a major service outage requires immediate attention to recover or restore services in an unexpected scenario. These events are rare and usually don't require access to customer data.

* A Microsoft engineer accesses the Azure platform as part of troubleshooting, and is accidentally exposed to customer data. For example, during troubleshooting the Azure Network Team captures a packet on a network device. Such scenarios don't usually result in access to meaningful customer data.

* External legal demands for data. For details, see [government requests for data](https://www.microsoft.com/trust-center/?rtc=1) on the Microsoft Trust Center.

## Data access

Access to data varies according to the Microsoft Fabric experience your request is for. This section lists which data the Microsoft engineer can access, after you approve a Customer Lockbox request.

* **Power BI** - When running the operations listed below, the Microsoft engineer will have access to a few tables linked to your request. Each operation the Microsoft engineer uses, is reflected in the audit logs.
    * Get refresh history
    * Delete admin usage dashboard
    * Delete usage metrics v2 package
    * Delete admin monitoring folder

* **Real-Time Analytics** - The Real-Time Analytics engineer will have access to the data in the KQL database that's linked to your request.

* **Data Engineering** - The Data Engineering engineer will have access to the following Spark logs linked to your request:
    * Driver logs
    * Event logs
    * Executor logs
 
* **Data Factory** - The Data Factory engineer will have access to pipeline definitions linked to your request, only if permission is granted.

## Related content

* [Microsoft Purview Customer Lockbox](/microsoft-365/compliance/customer-lockbox-requests)

* [Microsoft 365 guidance for security & compliance](/office365/servicedescriptions/microsoft-365-service-descriptions/microsoft-365-tenantlevel-services-licensing-guidance/microsoft-365-security-compliance-licensing-guidance#microsoft-purview-customer-lockbox)

* [Security overview](security-overview.md)
