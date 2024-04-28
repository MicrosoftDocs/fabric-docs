---
title: "Query text storage in Microsoft Fabric"
description: "This article describes query text storage for support purposes and its implications for data security and privacy."
author: paulinbar
ms.author: painbar
ms.service: Fabric
ms.topic: concept-article #Don't change
ms.date: 04/28/2024
#customer intent: As a Fabric administrator or as a security or governance admin, I want to know about query text storage and its implications for data privacy and security.
---

# Query text storage

This article describes query text storage in Fabric. Its target audience is Fabric administrators, who control the feature, and others (for example, security and compliance teams) who want to learn about the feature and its implications for data privacy and security.

## Overview

To improve support and provide more effective troubleshooting, Microsoft might store the query text generated when users use Fabric items such as reports and dashboards. This data is sometimes necessary for debugging and resolving complex issues related to the performance and functionality of Fabric Items such as semantic models.

## What is stored query text

*Query text* refers the text of the queries/commands (for example, DAX, MDX, TMSL, XMLA, etc.) that Fabric executes when users use Fabric items such as reports and dashboards, as well as external applications such as Excel, SQL Server Management Studio, etc. This information helps the Fabric support team understand the context and specifics of any issues that arise, thereby facilitating a quicker and more precise resolution.

## Privacy and security

Stored query text is securely handled within the service boundary in compliance with Microsoft's stringent data protection standards and retained for a limited period (less than 30 days) . The data is used for approved investigations only. To prevent unauthorized use, access is strictly controlled and monitored. If [Customer Lockbox for Microsoft Azure](../security/security-lockbox.md) is enabled, the stored content will also be protected by this feature.

## Enabling and disabling query text storage

Fabric admins can enable and disable query text storage using the tenant setting **Microsoft can store query text to aid in support investigation**. This setting is enabled by default, which means that unless a Fabric admin changes this setting, Microsoft stores the query text associated with the use of some Fabric items in the organization. The availability of stored query text enables high-quality support without any additional configuration on the part of Fabric administrators.

If there are organizational requirements that don't permit the storage of query text, or if you wish to opt out of this feature for any other reason, you can turn off this setting as described in the following steps:

1. Go to the **Admin Portal**.

1. Navigate to the **Tenant Settings**.

1. Locate the setting entitled **Microsoft can store query text to aid in support investigation**.

1. Toggle the setting to **Off.** Microsoft will no longer store query text.

### Implications of turning off this setting

Turning off this setting stops the storage of new query text data. This might adversely affect Fabric support’s ability to provide swift, efficient support should issues arise with your organization’s reports or dashboards. Without access to the recent history of query text content, diagnosing and resolving problems might take longer, and it might not be possible to identify a root cause for some complex issues.

## Further support

Contact Fabric support for further assistance regarding the query text storage feature.

