---
title: Configure Power BI Premium capacity notifications
description: Learn how you can configure email notifications for your Power BI Premium capacities in the admin portal.
author: KesemSharabi
ms.author: kesharab
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-premium
ms.custom:
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Premium
---

# Configure notifications

Power BI Premium allows you to configure email notifications for your capacity. The emails are sent to the people you specify in the notifications settings.

To calculate when to send emails, Power BI checks the capacity every 15 minutes. During the check, the last 15 to 30 minutes of capacity activity are examined.

>[!NOTE]
>To configure email notifications, you must be a capacity administrator.

## Configure capacity notifications

To configure the capacity notification emails, follow these steps:

1. In the Power BI service, go to **Settings** > **Settings** > **Admin portal**.

    :::image type="content" source="media/service-admin-premium-capacity-notifications/admin-portal.png" alt-text="Screenshot showing the Power BI settings menu, with the settings option expanded and the admin portal selection highlighted.":::

2. In the *Admin portal*, select **Capacity settings**.

3. Select the capacity you want to configure notifications for.

4. Expand the **Notifications** section.

    :::image type="content" source="media/service-admin-premium-capacity-notifications/admin-portal-notifications.png" alt-text="Screenshot showing the notifications section in the admin portal.":::

5. In the section **Send notifications when**, configure your required notifications as follows:

    * **You're using ___% of your available capacity** - A notification is sent after the capacity reaches the threshold you enter.

    * **You've exceeded your available capacity and might experience slowdowns** - A notification is sent after you reach your capacity limit. After the limit is reached, if you have [autoscale](/power-bi/enterprise/service-premium-auto-scale) enabled, autoscale starts. If you don't have autoscale enabled, throttling is applied to your capacity.

    * **An Autoscale v-core has been added** - A notification is sent after autoscale starts and every time a v-core is added.

    * **You've reached your Autoscale maximum** - A notification is sent when all the autoscale v-cores are fully utilized. Throttling is applied to your capacity if it continues to be overloaded.

6. In the section **Send notifications to**, select who you want the notifications to be emailed to:

    * **Capacity admins** - Email notifications are sent to all the admins of this capacity.

    * **These contacts** - Enter the emails of the contacts you want to receive notifications.

7. Select **Apply**.

## Considerations and limitations

* Timestamps aren't included in notification emails.

* Notification emails don't list by how much a threshold was crossed.

* After a notification is sent, there's a three hour period in which new notifications won't be sent, even if your capacity crosses thresholds that are set to trigger these notifications. For example, if you configure your capacity to send a notification after you cross the 75% usage threshold, after that threshold is met you'll receive a notification. If the capacity goes below this threshold to 60%, and then right back over it in the next hour, you won't get another notification for crossing the 75% mark. If you have the autoscale notification turned on, and your capacity crosses the 100% threshold during these three hours, you get a notification that autoscale started.

* A 30-seconds window is applied to calculate your capacity usage. Due to a less granular calculation, capacity usage might appear differently in the [Power BI Premium utilization and metrics](/power-bi/enterprise/service-premium-metrics-app) app. As a result, you might not see the event your notification points to in the app. For example, a short spike in capacity activity that triggers a notification might not be seen at all in the Power BI Premium utilization and metrics app.

## Related content

- [What is Power BI Premium?](/power-bi/enterprise/service-premium-what-is)
- [What is Microsoft Fabric admin?](microsoft-fabric-admin.md)
