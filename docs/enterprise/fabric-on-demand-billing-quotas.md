---
title: View and increase on-demand billing quotas
description: Learn how Microsoft Fabric on-demand billing quotas work and how to request a quota increase in the Azure portal.
author: harieswar7
ms.author: harieswar
ms.topic: how-to
ms.date: 11/06/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand and increase on-demand billing quotas so that my workloads have sufficient capacity.
---

# View and increase on-demand billing quotas

Microsoft Fabric quotas define consumption limits for a subscription and region. Initial quota availability depends on the region.

You aren't charged for an assigned quota. Charges are based on capacity or on-demand usage.

## Understand Fabric quota scopes

Capacity quota and on-demand billing quota have different scopes.

| Quota type | Configured for | How the quota applies |
| --- | --- | --- |
| **Capacity quota** | Subscription and region | The quota is shared across applicable capacities in the subscription and region. Creating or resizing a capacity uses part of the same shared quota. |
| **On-demand billing quota** | Billing category, subscription, and region | The configured category limit applies independently to each capacity where the category is enabled. |
| **On-demand billing-enabled capacity quota** | Subscription and region | The default limit is 20 F0 and hybrid capacities that use on-demand billing. |

Each workload operation maps to one on-demand billing category. The same operation name can appear in more than one category when Fabric emits it from different workload contexts. A capacity can have multiple categories enabled. The quota configured for a category, subscription, and region applies separately to every capacity where that category is enabled.

The per-capacity on-demand quota model applies to:

- F0 capacities, where all supported billing categories use on-demand billing.
- Hybrid capacities, where one or more billing categories are enabled for on-demand billing.

The default daily quota for an on-demand billing category is calculated as follows:

> **On-demand CU-hour quota = capacity quota in CUs × 24 hours**

For example, a capacity quota of 16 CUs results in a default on-demand quota of 384 CU-hours per day for each category. Each capacity in that subscription and region where the category is enabled receives an independent 384-CU-hour quota, which is the maximum configurable spend limit for that category. The capacities don't share a single 384-CU-hour allowance. In-progress operations can continue after the spend limit is reached, so actual consumption and charges can exceed the configured limit. The OneLake category is an exception and has a 100,000-CU-hour daily quota.

In contrast, `CapacityQuota` is shared by all applicable capacities in the subscription and region. For example, if the `CapacityQuota` limit is 10,000 CUs, creating or resizing a capacity uses part of the same shared 10,000-CU quota.

Fabric also limits the number of capacities that can use on-demand billing. The default limit is 20 on-demand billing-enabled capacities per subscription and region. Both F0 capacities and hybrid capacities count toward this limit.

> [!NOTE]
> On-demand Billing for Apache Spark is a distinct on-demand billing scenario, but it doesn't have a separate entry on the **Quotas** page. It continues to use the shared **capacity quota** rather than the per-capacity, per-category on-demand billing quota model.

For general Fabric capacity quota information, see [Microsoft Fabric quotas](fabric-quotas.md?tabs=Azure).

## Prerequisites

To view quotas, you need an Azure account with the Contributor role or another role that includes Contributor access.

To request or manage quota increases, you need the permissions included in the [Quota Request Operator role](/azure/role-based-access-control/built-in-roles/management-and-governance#quota-request-operator).

## View an on-demand billing quota

1. Sign in to the [Azure portal](https://portal.azure.com).
1. In the search box, enter **Quotas**, and then select **Quotas**.
1. On the **Overview** page, select **Microsoft Fabric**.
1. On the **My quotas** page, set the following filters:
   - **Subscription**: Select the subscription that contains the capacity.
   - **Region**: Select the region where the capacity is located.
   - **Usage**: Select **Show all**.
1. Locate the on-demand billing category whose quota you want to view.

Quota names identify the corresponding on-demand billing category. On-demand quotas are measured in CU-hours per day.

## Request a quota increase

All on-demand billing quota increase requests require Microsoft review. You can start the request from the **Quotas** page or create a support request directly. Both routes create a support request for review.

### Request an increase from Azure quotas

1. In the Azure portal, search for **Quotas**, and then select **Quotas**.
1. On the **Overview** page, select **Microsoft Fabric**.
1. On the **My quotas** page, select the subscription that contains the capacity and the region where the capacity is located.
1. Select the on-demand billing quota, and then select **New Quota Request**.
1. Select **Enter a new limit**, enter the requested limit, and then select **Submit**.

### Create a support request directly

1. In the Azure portal, open **Help + support**, and then select **Create a support request**.
1. For the issue type, select **Service and subscription limits (quotas)**.
1. Select the subscription that contains the capacity and the **Microsoft Fabric** quota type.
1. In the quota details, select the on-demand billing category and enter the requested limit.
1. Complete the remaining request details, review the request, and then submit it.

Submitting a request doesn't immediately change the assigned quota or guarantee approval. Microsoft reviews the request and notifies you of the outcome. Allow up to 24 hours for an approved quota increase to appear.

> [!IMPORTANT]
> An approved quota increase doesn't change an existing spend limit for the on-demand billing category. Update the category's spend limit separately if you want it to use the increased quota.

## Regional review considerations

> [!NOTE]
> Regional availability can override the calculated default quota and set the limit to 0 CU-hours. Submit a quota increase request for review if the quota displays a limit of 0 CU-hours. Approval depends on regional availability and isn't guaranteed.

## Related content

- [Microsoft Fabric quotas](fabric-quotas.md?tabs=Azure)
- [Create an Azure support request](/azure/azure-portal/supportability/how-to-create-azure-support-request)
- [Understand on-demand billing meters and multipliers](on-demand-billing-meters-multipliers.md)
