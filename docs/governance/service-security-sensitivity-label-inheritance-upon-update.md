---
title: Sensitivity label inheritance upon update
description: Learn how sensitivity labels propagate and update when Fabric items are modified, connect to new data sources, or create new lineage relationships.
author: msmimart
ms.author: mimart
ms.topic: concept-article
ms.date: 07/13/2026
ai-usage: ai-assisted
LocalizationGroup: Data from files

#customer intent: As a Fabric administrator or data owner, I want to understand how sensitivity labels are inherited and updated when items change so that I can ensure consistent data protection.
---

# Sensitivity label inheritance upon update and relationship changes in Microsoft Fabric

When you modify existing items, connect them to new data sources, or establish new lineage relationships, Microsoft Fabric automatically reevaluates and updates their sensitivity labels to ensure consistent data protection across your environment.

This article explains when and how sensitivity labels are automatically updated as items change, so that you can ensure consistent protection across your Microsoft Fabric environment.

## How sensitivity label inheritance works for existing Microsoft Fabric items

When you create a new Microsoft Fabric item from a labeled item, the new item inherits the parent's sensitivity label at the moment of creation. If the relationship between items changes *after* creation, sensitivity labels continue to propagate in the following scenarios:

- **Item modification**: You update an existing item in a way that changes its data content or connections.
- **New data source connections**: You connect an existing item to a new, labeled data source.
- **New lineage relationships**: You establish a new lineage relationship for an existing item, such as when you connect a notebook to a lakehouse through the user interface (UI).

In each of these scenarios, Microsoft Fabric evaluates the sensitivity labels of the related items and applies the appropriate label to ensure consistent data protection.

> [!IMPORTANT]
> Label inheritance upon update follows the same core rules as other automatic labeling capabilities in Microsoft Fabric:
>
> - Automatically applied labels never overwrite labels that you manually applied.
> - A less restrictive label never overwrites a more restrictive label that is already applied.

## Sensitivity label behavior when you modify Fabric items

When you modify an existing Fabric item, the system reevaluates the item's sensitivity label based on its current relationships and any applicable label policies.

The following behaviors apply:

- **Default label application**: If you edit an unlabeled item and a [default label policy](sensitivity-label-default-label-policy.md) is active, Fabric applies the default label. For Power BI items, any change to the item's attributes triggers default labeling. For non-Power BI Fabric items, only changes to certain attributes, such as name and description, trigger default labeling.
- **Downstream propagation**: When you modify a labeled item and change its label, [downstream inheritance](service-security-sensitivity-label-downstream-inheritance.md) ensures the updated label propagates to dependent items, provided fully automated downstream inheritance is enabled or you consent to propagation.
- **Label reevaluation upon refresh**: When you refresh a semantic model and its data source has a sensitivity label, the system reevaluates and updates the semantic model's label if the data source label is more restrictive than the current label.

> [!NOTE]
> For non-Power BI Fabric items, default label application on update currently works only when you make changes via the item's [flyout menu](../fundamentals/apply-sensitivity-labels.md#apply-a-label). Changes made in the experience interface don't trigger default labeling.

## Sensitivity label inheritance when you establish new data source connections

When you connect a Power BI semantic model to sensitivity-labeled data in a supported data source, the item can inherit the data source's label. This behavior ensures that as Fabric items expand their data connections, they reflect the sensitivity classification of the most restrictive data they access.

The following behaviors apply when you establish a new data source connection:

- The item inherits the label of the newly connected data source if the data source label is more restrictive than the item's current label.
- If the item connects to multiple data sources with different sensitivity labels, Fabric applies the most restrictive label.
- If the data source label is less restrictive than the item's current label, the label doesn't change.
- You must publish the label for the item owner for Fabric to apply it.
- Label inheritance from data sources is currently supported for Power BI semantic models only. Connecting a non-Power BI Fabric item to a labeled data source doesn't trigger data source label inheritance.

For detailed requirements for data source label inheritance, including supported data sources and tenant settings, see [Sensitivity label inheritance from data sources](service-security-sensitivity-label-inheritance-from-data-sources.md).

## Sensitivity label inheritance when new lineage relationships are created

When an existing Microsoft Fabric item establishes a new lineage relationship, Microsoft Fabric evaluates sensitivity label inheritance based on the labels of the related items. This scenario covers cases such as:

- You connect a notebook to a lakehouse through the Microsoft Fabric UI.
- You configure a pipeline to read from a new data source item.

When you establish a new lineage relationship:

- The newly connected item evaluates the labels of its upstream items.
- If the upstream item has a more restrictive label, the downstream item inherits that label, provided the label wasn't manually applied by a user. For the full set of inheritance conditions, see [downstream inheritance](service-security-sensitivity-label-downstream-inheritance.md).
- If [fully automated downstream inheritance](../admin/service-admin-portal-information-protection.md) is enabled, the label propagates automatically. Otherwise, the user is prompted to consent to label propagation.

### Example: Notebook connected to a lakehouse

Consider a notebook with a *General* sensitivity label that you connect through the Microsoft Fabric UI to a lakehouse labeled *Confidential*. Because *Confidential* is more restrictive than *General*, the notebook inherits the *Confidential* label. Any items downstream of the notebook also receive the *Confidential* label through downstream inheritance.

## Sensitivity label propagation rules

The following rules govern how sensitivity labels propagate during update and relationship change scenarios in Microsoft Fabric:

| Rule | Description |
|---|---|
| More restrictive label wins | A label is applied only if it's more restrictive than the currently applied label. |
| Manual labels are preserved | Automatically inherited labels never overwrite a label that a user manually applied. |
| Owner must have label access | The label must be published for the item owner; otherwise, inheritance doesn't take place. |
| Downstream propagation | When a label is updated through inheritance, the change propagates downstream if [fully automated downstream inheritance](../admin/service-admin-portal-information-protection.md) is enabled. |
| Refresh triggers reevaluation | For semantic models, a data refresh reevaluates and potentially updates the label based on the current data source labels. |

## Considerations and limitations

Sensitivity label inheritance upon update has the following considerations and limitations:

- For non-Power BI Fabric items, label inheritance upon update is limited to changes made to attributes like name and description. You can only make these changes through certain UI paths, such as the item's flyout menu. For more information, see [Default labeling in Fabric](information-protection.md#default-labeling).
- Downstream inheritance is limited to 80 items. If the number of downstream items exceeds 80, downstream inheritance doesn't take place for any of the downstream items.
- Inheritance from data sources currently supports only Power BI semantic models.
- Label inheritance doesn't apply when you connect items through gateways or Azure Virtual Networks (VNets).
- [Relaxed label change enforcement](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement#relaxations-to-accommodate-automatic-labeling-scenarios) applies to accommodate automatic labeling scenarios where no user has all the required permissions to change a label.

## Related content

- [Information protection in Microsoft Fabric](information-protection.md)
- [Sensitivity label downstream inheritance](service-security-sensitivity-label-downstream-inheritance.md)
- [Sensitivity label inheritance from data sources](service-security-sensitivity-label-inheritance-from-data-sources.md)
- [Sensitivity labels in Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview)
- [Default label policy for Power BI](sensitivity-label-default-label-policy.md)
