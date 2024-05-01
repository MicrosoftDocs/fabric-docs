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

* •	DLP policies for Fabric are defined in the [Microsoft Purview compliance portal](https://go.microsoft.com/fwlink/p/?linkid=2077149).

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

## Related content

* [Configure a DLP policy for Power BI](./data-loss-prevention-configure.md).
* [Respond to DLP policy violation in Power BI](./data-loss-prevention-respond.md).
* [Learn about data loss prevention](/microsoft-365/compliance/dlp-learn-about-dlp)