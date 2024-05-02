---
title: "Data loss prevention policies in Microsoft Fabric"
description: "Learn about how Microsooft Purview data loss prevention policies work in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.topic: concept-article #Don't change
ms.date: 05/01/2024

#customer intent: As a Fabric administrator, security or compliance admin, or data owner, I want to understand how Microsoft Purview data loss prevention policies work in Microsoft Fabric.

---

# Data loss prevention policies in Fabric

This article describes Microsoft Purview data loss prevention (DLP) policies in Fabric. The target audience is Fabric administrators, security and compliance teams, and Fabric data owners.

## Overview

To help organizations detect and protect their sensitive data, Fabric supports [Microsoft Purview Data Loss Prevention (DLP) polices](/microsoft-365/compliance/dlp-learn-about-dlp). When a DLP policy for Fabric detects a semantic model or lakehouse containing sensitive information, a policy tip can be attached to the item that explains the nature of the sensitive content, and an alert can be registered on the data loss prevention **Alerts** page in the Microsoft Purview compliance portal for monitoring and management by administrators. In addition, email alerts can be sent to administrators and specified users.

This article describes how DLP in Fabric works, lists considerations and limitations as well as licensing and permissions requirements, and explains how DLP CPU usage is metered. For further information, see:
 
* [Configure a DLP policy for Fabric](./data-loss-prevention-configure.md) to see how to configure DLP policies for Fabric.
* [Respond to a DLP policy violation in Fabric](./data-loss-prevention-respond.md) to see how to respond when a policy tip tells you your lakehouse or semantic model has a DLP policy violation.

## Considerations and limitations

* DLP policies for Fabric are defined in the [Microsoft Purview compliance portal](https://go.microsoft.com/fwlink/p/?linkid=2077149).

* DLP policies apply to workspaces. Only workspaces hosted in Fabric or  [Premium capacities](./service-premium-what-is.md) are supported.

* DLP semantic model evaluation workloads impact capacity. See [CPU metering for DLP policy evaluation](#cpu-metering-for-dlp-policy-evaluation) for more information.

* DLP policy templates aren't yet supported for Fabric DLP policies. When creating a DLP policy for Fabric, choose the "custom policy" option.
* Fabric DLP policy rules currently support sensitivity labels and sensitive info types as conditions.

* DLP policies for Fabric aren't supported for sample semantic models, [streaming datasets](../connect-data/service-real-time-streaming.md), or semantic models that connect to their data source via [DirectQuery](../connect-data/desktop-use-directquery.md) or [live connection](../connect-data/desktop-directquery-about.md#live-connections). This includes semantic models with mixed storage, where some of the data comes via import-mode and some comes via DirectQuery.

* DLP policies for Fabric apply only on data in Lakehouse Tables/ folder stored in Delta format.

* DLP policies for Fabric support all the primitive Delta types except timestamp_ntz.

* DLP policies for Fabric aren’t supported for the following Delta Parquet data types:
    * Binary, timestamp_ntz, Struct, Array, List, Map, Json, Enum, Interval, Void.
    * Data encoded with RLE and Bit_RLE.
    * Data with LZ4, Zstd and Gzip compression codecs.

* [Exact data match (EDM) classifiers](/microsoft-365/compliance/sit-learn-about-exact-data-match-based-sits) and [trainable classifiers](/microsoft-365/compliance/classifier-learn-about) aren't supported by DLP for Fabric. If you select an EDM or trainable classifier in the condition of a policy, the policy will yield no results even if the semantic model or lakehouse does in fact contain data that satisfies the EDM or trainable classifier. Other classifiers specified in the policy will return results, if any.

* DLP policies for Fabric aren't supported in the China North region. See [How to find the default region for your organization](../admin/service-admin-where-is-my-tenant-located.md#how-to-find-the-default-region-for-your-organization) to learn how to find your organization's default data region.

## Licensing and permissions

### SKU/subscriptions licensing

Before you get started with DLP for Power BI [SHOULD THIS BE FABRIC???], you should confirm your [Microsoft 365 subscription](https://www.microsoft.com/microsoft-365/compare-microsoft-365-enterprise-plans?rtc=1). The admin account that sets up the DLP rules must be assigned one of the following licenses:

* Microsoft 365 E5
* Microsoft 365 E5 Compliance
* Microsoft 365 E5 Information Protection & Governance
* Purview capacities

### Permissions

Data from DLP for Fabric can be viewed in [Activity explorer](/microsoft-365/compliance/data-classification-activity-explorer). There are four roles that grant permission to activity explorer; the account you use for accessing the data must be a member of any one of them.

* Global administrator
* Compliance administrator
* Security administrator
* Compliance data administrator

## CPU metering for DLP policy evaluation

DLP policy evaluation uses CPU from the premium capacity associated with the workspace where the semantic model being evaluated is located. CPU consumption of the evaluation is calculated as 30% of the CPU consumed by the action that triggered the evaluation. For example, if a refresh action costs 30 milliseconds of CPU, the DLP scan will cost another 9 milliseconds. This fixed 30% additional CPU consumption for DLP evaluation helps you predict the impact of DLP policies on your overall Capacity CPU utilization, and perform capacity planning when rolling out DLP policies in your organization.

Use the Power BI Premium Capacity Metrics App [DOES THIS NEED TO BE CHANGED???] to monitor the CPU usage of your DLP policies. For more information, see [Use the Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app).

>[!NOTE]
>Users with Power BI PPU licenses do not incur the DLP policy evaluation costs described above, as these costs are covered for them up front by their PPU license.

## How do DLP policies for Fabric work

You define a DLP policy in the data loss prevention section of the compliance portal. In the policy, you specify the sensitivity labels and/or sensitive info types you want to detect. You also specify the actions that will happen when the policy detects a semantic model that contains sensitive data of the kind you specified. DLP policies for Fabric support two actions:

* User notification via policy tips.
* Alerts. Alerts can be sent by email to administrators and users. Additionally, administrators can monitor and manage alerts on the **Alerts** tab in the compliance portal.

When a semantic model or lakehouse is evaluated by DLP policies, if it matches the conditions specified in a DLP policy, the actions specified in the policy occur. DLP policies are initiated by the following actions:

**Semantic model**:

* Publish
* Republish
* On-demand refresh
* Scheduled refresh

>[!NOTE]
> DLP evaluation of the semantic model does not occur if either of the following is true:
> * The initiator of the event (publish, republish, on-demand refresh, scheduled refresh) is an account using service principal authentication.
> * The semantic model owner is a service principal.

**Lakehouse**:

* When the data within a lakehouse undergoes a change, such as getting new data, connecting a new source, adding or updating existing tables, and more.

## What happens when an item is flagged by a Fabric DLP policy

When a DLP policy detects an issue with an item:

* If "user notification" is enabled in the policy, the item will be marked in Fabric with an icon that indicates that a DLP policy has detected an issue with the item. Selecting the icon brings up a hover card that provides an option to see more details in a side panel.

    :::image type="content" source="./media/data-loss-prevention-overview/policy-tip-on-dataset.png" alt-text="Screenshot of policy tip badge on semantic model in lists.":::

    For semantic models, opening the details page will show a policy tip that explains the policy violation and how the type of sensitive information detected should be handled. Selecting **View all** opens a side panel with all the policy details.

    :::image type="content" source="./media/data-loss-prevention-overview/policy-tip-in-dataset-details.png" alt-text="Screenshot of policy tip on semantic model details page.":::

    >[!NOTE]
    > If you hide the policy tip, it doesn’t get deleted. It will appear the next time you visit the page.

* For lakehouses, the indication will appear in the header in edit mode, and opening the fly out make it possible to see more details about the policy tips affecting the lakehouse, which can also be seen in the side panel.

* If alerts are enabled in the policy, an alert will be recorded on the data loss prevention **Alerts** page in the compliance portal, and (if configured) an email will be sent to administrators and/or specified users. The following image shows the **Alerts** page in the data loss prevention section of the compliance portal. To get to the **Alerts** page, in the compliance portal, expand the **Data loss prevention** solution and choose **Alerts**.

    :::image type="content" source="./media/data-loss-prevention-overview/alerts-tab.png" alt-text="Screenshot of Alerts tab in the compliance portal.":::

## Monitor and manage policy alerts

Log into the [Microsoft Purview compliance portal](https://go.microsoft.com/fwlink/p/?linkid=2077149), expand the **Data loss prevention** solution, and choose **Alerts**.

:::image type="content" source="./media/data-loss-prevention-overview/alerts-tab.png" alt-text="Screenshot of D L P Alerts tab.":::

Select an alert to start drilling down to its details and to see management options.

## Related content

* [Configure a DLP policy for Fabric](./data-loss-prevention-configure.md).
* [Respond to DLP policy violation in Fabric](./data-loss-prevention-respond.md).
* [Learn about data loss prevention](/purview/dlp-learn-about-dlp)