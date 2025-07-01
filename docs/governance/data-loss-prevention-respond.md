---
title: "Respond to a Microsoft Purview Data Loss Prevention (DLP) policy violation in Fabric and Power BI"
description: "Learn how to respond to a DLP policy violation in Fabric and Power BI."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subservice: governance
ms.custom:
ms.topic: how-to #Don't change
ms.date: 11/07/2024
#customer intent: As an owner of a Fabric lakehouse or Power BI semantic model, I want to understand how to deal with DLP policy violations on those items.
---

# Respond to a DLP policy violation in Fabric and Power BI

When a [supported item type](/purview/dlp-powerbi-get-started#supported-item-types) you own violates a DLP policy for Fabric and Power BI, a violation icon on the item in the OneLake data hub or workspace list view appears. Hover over the icon and select **Show full details** to display a side panel that displays the details of your item's DLP policy violations and provides options for responding to them. Alternatively:

* From a semantic model details page, select the **View all** button on the policy tip.

* In a lakehouse's edit mode, select the policy violation notice in the header and then select **View all** in the policy violation section of the flyout that appears.

This article describes the information you see on the side pane and the actions you can take regarding the violations.

## View an item's DLP violations

The data loss prevention side pane lists the name of the item and all the DLP policy issues detected by a content scan of that item. You can select the item's name if you want to view the item's details.

Each DLP policy issue is shown on a card. The card shows you the policy tip, indicates what kind of sensitive data was detected, and offers actions you can take if you believe the data was falsely identified.

Violations of policies configured with the restrict access action are indicated in red and indicate who access is restricted to.  

:::image type="content" border="true" source="./media/data-loss-prevention-respond/purview-dlp-override-pane.png" alt-text="Screenshot of DLP policies side pane.":::

## Take action on the violation

The action or combination of actions you see might vary depending on the policy configuration. The possible actions are:

* **Report an issue**: Report the issue as a false positive (that is, report that the policy has mistakenly identified nonsensitive data as sensitive).
* **Override**: Override the policy. Overriding a policy means that this policy will no longer check this item for sensitive data. Depending on the policy configuration, you might be required to provide a justification for the override.
* **Report and override**: Report the issue as a false positive and override the policy.

>[!NOTE]
> Any action you take will be recorded in the audit log where it can be reviewed by security admins.
>
> The purpose of the policy tip is to flag sensitive information found in your item. If you own this data and determine that it shouldn't be in the item, when you remove the data from the item, the next time the item is evaluated, the policy tip will be removed, since the sensitive data will no longer be found.

## Related content

* [Get started with Data loss prevention policies for Fabric and Power BI](/purview/dlp-powerbi-get-started)
* [Configure a DLP policy for Fabric and Power BI](./data-loss-prevention-configure.md)
* [Monitor and manage DLP policy violations](./data-loss-prevention-monitor.md)
* [Learn about data loss prevention](/microsoft-365/compliance/dlp-learn-about-dlp)
