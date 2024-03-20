---
title: Information protection in Fabric
description: Learn about information protection in Fabric.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/12/2023
---

# Information protection in Microsoft Fabric

Information protection in Fabric is based on information protection in Power BI. However, it's currently less fully supported than in Power BI. This article describes Fabric's information protection [capabilities](#capabilities), and details current support in the [considerations and limitations](#considerations-and-limitations) section.

## Capabilities

The following table summarizes the information protection capabilities in Fabric that help you achieve maximum coverage of the sensitive information in your organization. Fabric support is indicated in the third column. See the sections under [Considerations and limitations](#considerations-and-limitations) for details.

|Capability|Scenario|Support status|
|:----------|:---------|:----------|
|Manual labeling| Users can manually apply sensitive labels to Fabric items|[Supported for all Fabric items](#manual-labeling).|
|Default labeling| When an item is created or edited, it gets a default sensitivity label unless a label is applied through other means.|[Supported for all Fabric items, with limitations](#default-labeling). |
|Mandatory labeling| Users can't save items unless a sensitivity label is applied to the item. This means they can't remove a label either.| [Currently fully supported for Power BI items only. Supported for some non-Power BI Fabric items, with limitations](#mandatory-labeling). |
|Programmatic labeling| Sensitivity labels can be added, changed, or deleted programmatically via Power BI admin REST APIs.|[Supported for all Fabric items](#programmatic-labeling).|
|Downstream inheritance| When a sensitivity label is applied to an item, the label propagates downstream to all dependent items. |[Supported for all Fabric items, with limitations](#downstream-inheritance). |
|Inheritance upon creation| When you create a new item from an existing item, the new item inherits the label of the existing item.| [Supported for all Power BI Fabric items. Supported for some non-Power BI Fabric items as described in the considerations and limitations](#inheritance-upon-creation).|
|Inheritance from data sources| When a Fabric item ingests data from a data source that has a sensitivity label, that label is applied to the Fabric item. The label then propagates downstream to the child items of that Fabric item via downstream inheritance.| [Currently supported for Power BI semantic models only](#inheritance-from-data-sources).|
|Export| When a user exports data from an item that has a sensitivity label, the sensitivity label moves with it to the exported format. |[Currently supported for Power BI items in supported export paths](#export). |

## Considerations and limitations

### Manual labeling

When you enable sensitivity labels on your tenant, you specify which users can apply sensitivity labels. While the other information protection capabilities described in this article can ensure that most items get labeled without someone having to manually apply a label, manual labeling makes it possible for users to change labels on items. For more information about how to manually apply sensitivity labels to Fabric items, see [How to apply sensitivity labels](../get-started/apply-sensitivity-labels.md).

> [!NOTE]
> For a user to be able to apply sensitivity labels to Fabric items, it's not enough just to include the user in the list of specified users. The sensitivity label must also be published to the user as part of the label's policy definitions in the Microsoft Purview compliance center. For more information, see [Create and configure sensitivity labels and their policies](/microsoft-365/compliance/create-sensitivity-labels).

### Default labeling

Default labeling is fully supported in Power BI and is described in [Default label policy for Power BI](service-security-sensitivity-label-default-label-policy.md). In Fabric, there are some limitations.

* When a non-Power BI Fabric item is created, if there's a clear, substantive create dialog, the default sensitivity label will be applied to the item if the user doesn't choose a label. If the item is created in a process where there's no clear create dialog, the default label **won't** be applied.

* When a Fabric item that has no label is updated, if the item is a Power BI item, a change to any of its attributes causes the default label to be applied if the user doesn't apply a label. If the item is a non-Power BI Fabric item, only changes to certain attributes, such as name and description, cause the default label to be applied. And this is only if the change is made in the item's [flyout menu](../get-started/apply-sensitivity-labels.md#apply-a-label). For changes made in the experience interface, default labeling isn't currently supported.

### Mandatory labeling

Mandatory labeling is currently supported for Power BI items only. Mandatory labeling isn’t enforced if changes are made via the [flyout menu](../get-started/apply-sensitivity-labels.md#apply-a-label).

For lakehouses, pipelines, and data warehouses: Assuming that information protection is enabled, if mandatory labeling is on and default labeling is off, it will be possible for the user to select a label. However, mandatory labeling logic isn't enforced. That means that the user can save the item without a label, unless the experience itself requires that a label be set.

For more information about mandatory labeling, see [Mandatory label policy for Power BI](service-security-sensitivity-label-mandatory-label-policy.md).

### Programmatic labeling

Programmatic labeling is supported for all Fabric items. For more information, see [Set or remove sensitivity labels using Power BI REST admin APIs](service-security-sensitivity-label-inheritance-set-remove-api.md).

### Downstream inheritance

Downstream inheritance is on by default. It's supported in Fabric as follows:

Supported:

* Power BI item to Power BI item
* Fabric item to Fabric item
* Fabric item to Power BI item

Not supported:

* Power BI item to Fabric item

Autogenerated items from a lakehouse or data warehouse take their sensitivity label from their parent lakehouse or data warehouse. They don't inherit the label from items further upstream.

For more information about downstream inheritance, see [Sensitivity label downstream inheritance](service-security-sensitivity-label-downstream-inheritance.md).

### Inheritance upon creation

Inheritance upon creation is supported for Power BI Fabric items and in other scenarios with non-Power BI items where one item is created from another item:

* A Pipeline created from a Lakehouse inherits the sensitivity label of the Lakehouse.
* A Notebook created from a Lakehouse inherits the sensitivity label of the Lakehouse.
* A Lakehouse shortcut created from a Lakehouse inherits the sensitivity label of the Lakehouse.
* A Pipeline created from a Notebook inherits the sensitivity label of the Notebook.
* A KQL Queryset created from a KQL Database inherits the sensitivity label of KQL Database.
* A Pipeline created from a KQL Database inherits the sensitivity label of KQL Database.

For more information about downstream inheritance, see [Sensitivity label inheritance upon creation of new content](/power-bi/enterprise/service-security-sensitivity-label-overview#sensitivity-label-inheritance-upon-creation-of-new-content).

### Inheritance from data sources

Inheritance from data sources is currently supported for Power BI semantic models only. For more information, see [Sensitivity label inheritance from data sources (preview)](service-security-sensitivity-label-inheritance-from-data-sources.md).

### Export

Sensitivity label inheritance upon export is supported for Power BI items only in supported export paths. Currently no other Fabric experience uses an export method that transfers the sensitivity label to the exported output. However, if they do export an item that has a sensitivity label, a warning is issued.

To see the supported export paths for Power BI items, see [Supported export paths in Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview#supported-export-paths).

## Related content

* [Sensitivity labels in Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview)
