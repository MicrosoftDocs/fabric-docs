---
title: Service interruption notifications
description: Learn about how to receive email notifications when there's a Power BI service disruption or outage.
author: KesemSharabi
ms.author: kesharab
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - ignite-2023
ms.topic: troubleshooting
ms.date: 03/17/2024
---

# Service interruption notifications

It's important to have insight into the availability of your mission-critical business applications. Microsoft Fabric incident notification so you can optionally receive emails if there's a service disruption or degradation.

At this time, emails are sent for the following *reliability scenarios*:

- Open report reliability
- Model refresh reliability
- Query refresh reliability

Notifications are sent when there's an *extended delay* in operations like opening reports, semantic model refresh, or query executions. After an incident is resolved, you receive a follow-up email.

## Enable notifications for service outages or incidents

A Fabric admin can enable notifications for service outages or incidents in the admin portal:

1. Identify or create an email-enabled security group that should receive notifications.

1. In the admin portal, select **Tenant settings**. Under **Help and support settings**, expand **Receive email notifications for service outages or incidents**.

1. Enable notifications, enter a security group, and select **Apply**.

## Service health in Microsoft 365

This article describes how to receive service notifications through Fabric. You can also monitor Power BI service health through Microsoft 365. Opt in to receive email notifications about service health from Microsoft 365. Learn more in [How to check Microsoft 365 service health](/microsoft-365/enterprise/view-service-health).
