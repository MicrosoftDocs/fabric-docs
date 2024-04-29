---
title: "Diagnostic query text storage in Microsoft Fabric"
description: "This article describes diagnostic query text storage in Fabric and its implications for data security and privacy."
author: paulinbar
ms.author: painbar
ms.service: fabric
ms.topic: concept-article #Don't change
ms.date: 04/29/2024
#customer intent: As a Fabric administrator or as a security or governance admin, I want to know what diagnostic query text storage is and what its implications are for data privacy and security.
---

# Query text storage

Diagnostic query text storage is a Fabric feature that stores query text content for a limited period to help Fabric support teams to resolve issues that might arise from the use of some Fabric items. The feature is on by default. This article describes feature and how to disable it, if necessary or desired. Its target audience is Fabric administrators and others (for example, security and compliance teams) who want to understand the feature and its implications for data privacy and security.

## Overview

To improve support and provide more effective troubleshooting, Microsoft might store the query text generated when users use Fabric items such as reports and dashboards. This data is sometimes necessary for debugging and resolving complex issues related to the performance and functionality of Fabric items such as semantic models.

## What is stored query text

*Query text* refers to the text of the queries/commands (for example, DAX, MDX, TMSL, XMLA, etc.) that Fabric executes when users use Fabric items such as reports and dashboards, as well as external applications such as Excel, SQL Server Management Studio, etc. This information helps Fabric support teams understand the context and specific details of issues that arise, and facilitates quicker, more precise resolution.

## Privacy and security

In compliance with Microsoft's stringent data protection standards, stored query text is securely handled within Fabric and retained for a limited period (less than 30 days). The data is used for approved investigations only. To prevent unauthorized use, access is strictly controlled and monitored. It is also be protected by [Customer Lockbox for Microsoft Azure](../security/security-lockbox.md) if that feature is enabled.

## Disabling diagnostic query text storage

Diagnositic query text storage controlled by the tenant setting **Microsoft can store query text to aid in support investigation**, and is on by default. This means that unless a Fabric admin changes the setting, Microsoft stores the query text associated with the use of some Fabric items in the organization.

If there are organizational requirements that don't permit the storage of query text, or if you wish to opt out of this feature for any other reason, you can turn the feature off. [Go to the tenant settings](./about-tenant-settings.md#how-to-get-to-the-tenant-settings), find the setting, and set the toggle to **Disabled**.

> [!NOTE]
> The availability of stored query text enables high-quality support without any additional configuration on the part of Fabric administrators. It is thus not recommended to disable diagnostic query text storage unless there is a specific reason for doing so.

## Implications of turning off diagnostic query text storage

Turning off diagnostic query text storage stops the storage of new query text data. This might adversely affect the ability of Fabric support teams to provide swift, efficient support should issues arise with your organization's reports or dashboards. Without access to the recent history of query text content, diagnosing and resolving problems might take longer, and it might not be possible to identify a root cause for some complex issues.

## Further support

Contact [Fabric support](https://support.fabric.microsoft.com/) for further assistance regarding the query text storage feature.