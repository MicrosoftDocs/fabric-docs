---
title: Information protection in Fabric
description: Learn about information protection in Fabric.
author: paulinbar
ms.author: painbar
ms.topic: how-to
ms.service: azure
ms.date: 05/23/2023
---

# Information protection in Microsoft Fabric

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric information protection provides capabilities that enable you to classify, protect, and monitor your organization’s sensitive data. With Fabric’s information protection capabilities, sensitive data remains safe end-to-end, from the time it enters Fabric from data sources to when it leaves Fabric via supported export paths.

Information protection in Microsoft Fabric leverages sensitivity labels to from Microsoft Purview Information Protection. Once your sensitive data is labeled, you can monitor and analyze it, either in Fabric's Microsoft Purview hub, or in the Purview portal itself. Purview’s powerful analytic capabilities enable you to get a detailed, comprehensive picture of the state of your organization’s sensitive data, and to drill down into details to obtain actionable insights.

This article describes Fabric's information protection [capabilities](#capabilities) and lists [considerations and limitations](#considerations-and-limitations).

>[!NOTE]
> Information protection in Fabric is based on information protection in Power BI. Currently, information protection in Fabric is more fully supported for Power BI items than other Fabric items. Information protection in Power BI has additional capabilities, many of which will be coming to Fabric in the months ahead.

## Capabilities

The following table summarizes the information protection capabilities in Fabric that help you achieve maximum coverage of the sensitive information in your organization. Fabric support is indicated in the third column. See the sections under [Considerations and limitations](#considerations-and-limitations) for details.

|Capability|Scenario|Public preview support|
|:----------|:---------|:----------|
|[Manual labeling](#manual-labeling)| Users can manually apply sensitive labels to Fabric items|Supported for all Fabric items.|
|[Default labeling](#default-labeling)| When an item is created or edited, it gets a default sensitivity label unless a label is applied through other means.|Supported for all Fabric items, with limitations. |
|[Mandatory labeling](#mandatory-labeling)| Users can't save items unless a sensitivity label is applied to the item. This means they can't remove a label either.| Currently fully supported for Power BI items only. Supported for some non-Power BI Fabric items, with limitations. |
|[Programmatic labeling](#programmatic-labeling)| Sensitivity labels can be added, changed, or deleted programmatically via Power BI admin REST APIs.|Supported for all Fabric items.|
|[Downstream inheritance](#downstream-inheritance)| When a sensitivity label is applied to an item, the label filters down to all dependent items. |Supported for all Fabric items, with limitations. |
|[Inheritance upon creation](#inheritance-upon-creation)| When you create new item by copying an existing one, the new item takes the label of the existing item.| Supported for all Fabric items, with limitations.|
|[Inheritance from data sources](#inheritance-from-data-sources)| When a Fabric item ingests data from a data source that has a sensitivity label, that label is applied to the Fabric item. The label then filters down to the child items of that Fabric item via downstream inheritance.| Currently supported for Power BI datasets only.|
|[Export](#export)| When a user exports data from an item that has a sensitivity label, the sensitivity label moves with it to the exported format. |Currently supported for Power BI items in supported export paths. |

## Considerations and limitations

### Manual labeling

When you enable sensitivity labels on your tenant, you specify which users can apply sensitivity labels. While the other information protection capabilities described in this article can ensure that most items get labeled without someone having to manually apply a label, manual labeling makes it possible for users to change labels on items. For more information about how to manually apply sensitivity labels to Fabric items, see [How to apply sensitivity labels](../get-started/apply-sensitivity-labels.md).

> [!NOTE]
> For a user to be able to apply sensitivity labels to Fabric items, it is not enough just to include the user in the list of specified users. The sensitivity label must also be published to the user as part of the label's policy definitions in the Microsoft Purview compliance center. For more information, see [Create and configure sensitivity labels and their policies](/microsoft-365/compliance/create-sensitivity-labels).

### Default labeling

As part of the strategy to apply sensitivity labels to all of your organization's Fabric items, you can define a default label policy in the Microsoft Purview compliance center. With a default label policy, when an item is created or edited, it gets a default sensitivity label unless a label is applied through other means. Default labeling is fully supported in Power BI and is described in [Default label policy for Power BI](/power-bi/enterprise/service-security-sensitivity-label-default-label-policy). In Fabric, there are some limitations.

* When a non-Power BI Fabric item is created, if there's a clear, substantive create dialog, the default sensitivity label will be applied to the item if the user doesn't choose a label. If the item is created in a process where there's no clear create dialog, the default label **won't** be applied.

* When a Fabric item that has no label is updated, if the item is a Power BI item, a change to any of its attributes will cause the default label to be applied if the user doesn't apply a label. If the item is a non-Power BI Fabric item, only changes to certain attributes, such as name, description, etc., will cause the default label to be applied. And this is only if the change is made in the item's flyout menu. Default labeling in the case of changes made in the workload interface isn't currently supported.

### Mandatory labeling

When there is a mandatory label policy in effect, users can't save items unless a sensitivity label is applied to the item. They can't remove a label either. Mandatory labeling is currently supported for Power BI items only. Mandatory labeling policies aren't enforced in if changes are made via the flyout menu.Flyout Lakehouse, Pipeline: if mandatory is on, and default is off. And MIP enabled. Data Warehouse – same show label section through dialog.

For more information about mandatory labeling, see [Mandatory label policy for Power BI](/power-bi/enterprise/service-security-sensitivity-label-mandatory-label-policy).

### Programmatic labeling

Supported for all Fabric items. For more information, see [Set or remove sensitivity labels using Power BI REST admin APIs](/power-bi/enterprise/service-security-sensitivity-label-inheritance-set-remove-api).

### Downstream inheritance

When downstream inheritance is enabled, when a sensitivity label is applied to an item, the label filters down to all dependent items. It is on by default.

Downstream interitance support in Fabric is as follows:

Supported:

* Power BI item to Power BI item
* Fabric item to Fabric item
* Fabric item to Power BI item

Not supported:

* Power BI item to Fabric item

Auto-generated items from Lakehouse or Data Warehouse take their sensitivity label from their parent Lakehouse or Data Warehouse. They don't inherit the label from items further upstream.

For further information about downstream inheritance, see [Sensitivity label downstream inheritance](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance).

### Inheritance upon creation

When you create new item from an existing one, the new item takes the label of the existing item. Inheritance upon creation is supported for all Fabric items with the following consideration:

* If you try to create a Pipeline or Notebook from a Lakehouse, it will get the sensitivity label of the Lakehouse.

For further information about downstream inheritance, see [Sensitivity label inheritance upon creation of new content](/power-bi/enterprise/service-security-sensitivity-label-overview#sensitivity-label-inheritance-upon-creation-of-new-content).

### Inheritance from data sources

When a Fabric item ingests data from a data source that has a sensitivity label, that label is applied to the Fabric item.

Inheritance from data sources is currently supported for PBI datasets only. For more information, see [Sensitivity label inheritance from data sources (preview)](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources).

### Export

When a user exports data from an item that has a sensitivity label, the sensitivity label moves with it to the exported format.

Sensitivity label inheritance upon export is supported for Power BI items only in supported export paths. Currently no other Fabric experience uses an export method that transfers the sensitivity label to the exported output. However, if they do export an item that has a sensitivity label, a warning is issued.

To see the supported export paths for Power BI items, see [Supported export paths in Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview#supported-export-paths).

## Next steps

* [Admin overview](../admin/admin-overview.md)
