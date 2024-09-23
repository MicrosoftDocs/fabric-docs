---
title: "Respond to a DLP policy violation in Fabric and Power BI"
description: "Learn how to respond to a DLP policy violation in Fabric and Power BI."
author: paulinbar
ms.author: painbar
manager: kfollis
ms.service: fabric
ms.subservice: governance
ms.topic: how-to #Don't change
ms.date: 09/23/2024

#customer intent: As an owner of a Fabric lakehouse or Power BI semantic model, I want to understand how to deal with DLP policy violations on those items.

---

# Respond to a DLP policy violation in Fabric and Power BI

When a [supported item type](./data-loss-prevention-overview.md#supported-item-types) you own violates a DLP policy, you may see a violation warning icon on the item in the OneLake data hub or workspace list view. If you go to the semantic model details page, you'll see a DLP policy tip banner that informs you about the violation. To view and respond to the policy violation, select the **View** button on the policy tip. The **View** button opens a side pain that displays the details of your semantic model's DLP policy violations and provides option for responding to them. This article describes the information you see on the side pane and the actions you can take regarding the violations.

## View an item's DLP violations

The data loss prevention side pane lists the name of the item and all the DLP policy issues detected by a content scan of that item. You can select the items's name if you want to view the items's details.

Each DLP policy issue is shown on a card. The card shows you the policy tip, indicates what kind of sensitive data was detected, and offers actions you can take if you believe the data was falsely identified.

![Screenshot of D L P policies side pane](./media/dlp-policies-for-fabric-respond/fabric-dlp-override-pane.png)

## Take action on the violation

The action or combination of actions you see may vary depending on the policy configuration. The possible actions are described below.

* **Report an issue**: Report the issue as a false positive (that is, report that the policy has mistakenly identified non-sensitive data as sensitive).
* **Override**: Override the policy. Overriding a policy means that this policy will no longer check this item for sensitive data. Depending on the policy configuration, you may be required to provide a justification for the override.
* **Report and override**: Report the issue as a false positive and override the policy.

>[!NOTE]
> Any action you take will be recorded in the audit log where it can be reviewed by security admins.
>
> The purpose of the policy tip is to flag sensitive information found in your item. If you own this data and determine that it shouldn't be in the item, when you remove the data from the item, the next time the item is evaluated, the policy tip will be removed, since the sensitive data will no longer be found.

## Related content

* [Data loss prevention policies for Fabric and Power BI](./data-loss-prevention-overview.md).
* [Configure a DLP policy for Fabric and Power BI](./data-loss-prevention-configure.md).
* [Learn about data loss prevention](/microsoft-365/compliance/dlp-learn-about-dlp)