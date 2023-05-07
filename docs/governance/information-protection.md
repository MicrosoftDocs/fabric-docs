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

This article describes Fabric's information protection [capabilities](#capabilities), outlines the [steps](#deploy-information-protection-in-your-tenant) you need to take to implement information protection in your organization, and provides links to relevant documentation.

>[!NOTE]
> Information protection in Fabric is based on information protection in Power BI. Currently, information protection in Fabric is more fully supported for Power BI items than other Fabric items. Information protection in Power BI has additional capabilities, many of which will be coming to Fabric in the months ahead.

## Capabilities

The following table summarizes the information protection capabilities in Fabric that help you achieve maximum coverage of the sensitive information in your organization.

|Capability|Scenario|Public preview support|
|:----------|:---------|:----------|
|[Manual labeling](#manual-labeling)| Users can manually apply sensitive labels to Fabric items|Supported for all Fabric items.|
|[Default labeling](#default-labeling)| When a item is created or edited, it gets a default sensitivity label unless a label is applied through other means.|Supported for all Fabric items, with limitations. |
|[Mandatory labeling](#mandatory-labeling)| Users can't save items unless a sensitivity label is applied to the item. This means they can't remove a label either.| Currently fully supported for Power BI items only. Supported for some non-Power BI Fabric items, with limitations. |
|[Programmatic labeling](#programmatic-labeling)| Sensitivity labels can be added, changed, or deleted programmatically via Power BI admin REST APIs.|Supported for all Fabric items.|
|[Downstream inheritance](#downstream-inheritance)| When a sensitivity label is applied to an item, the label filters down to all dependent items. |Supported for all Fabric items, with limitations. |
|[Inheritance upon creation](#inheritance-upon-creation)| When you create new item by copying an existing one, the new item takes the label of the existing item.| Supported for all Fabric items, with limitations.|
|[Inheritance from data sources](#inheritance-from-data-sources)| When a Fabric item ingests data from a data source that has a sensitivity label, that label is applied to the Fabric item. The label then filters down to the child items of that Fabric item via downstream inheritance.| Currently supported for Power BI datasets only.|
|[Export](#export)| When a user exports data from an item that has a sensitivity label, the sensitivity label moves with it to the exported format. |Currently supported for Power BI items in supported export paths. |

### Manual labeling

When you enable sensitivity labels on your tenant, you specify which users can apply sensitivity labels. While the other information protection capabilities described in this article can ensure that most items get labeled without someone having to manually apply a label, manual labeling makes it possible for users to change labels on items. For more information about how to manually apply sensitivity labels to Fabric items, see [How to apply sensitivity labels](../get-started/apply-sensitivity-labels.md).

> [!NOTE]
> For a user to be able to apply sensitivity labels to Fabric items, it is not enough just to include the user in the list of specified users. The sensitivity label must also be published to the user as part of the label's policy definitions in the Microsoft Purview compliance center. For more information, see [Create and configure sensitivity labels and their policies](/microsoft-365/compliance/create-sensitivity-labels).

### Default labeling

As part of the strategy to apply sensitivity labels to all of your organization's Fabric items, you can define a default label policy in the Microsoft Purview compliance center. With a default label policy, when a item is created or edited, it gets a default sensitivity label unless a label is applied through other means. Default labeling is fully supported in Power BI and is described in [Default label policy for Power BI](/power-bi/enterprise/service-security-sensitivity-label-default-label-policy). In Fabric, there are some limitations.

* When a non-Power BI Fabric item is created, if there is a clear, substantive create dialog, the default sensitivity label will be applied to the item if the user does not choose a label. If the item is created in a process where there is no clear create dialog, the default label **won't** be applied.

* When a Fabric item that has no label is updated, if the item is a Power BI item, a change to any of its attributes will cause the default label to be applied if the user does not apply a label. If the item is a non-Power BI Fabric item, only changes to certain attributes, such as name, description, etc., will cause the default label to be applied. And this is only if the change is made in the item's flyout menu. Default labeling in the case of changes made in the workload interface is not currently supported.

### Mandatory labeling

Currently supported for Power BI items only. Not enforced in Flyout Lakehouse, Pipeline: if mandatory is on, and default is off. And MIP enabled. Data Warehouse – same show label section through dialog.

[Mandatory label policy for Power BI](/power-bi/enterprise/service-security-sensitivity-label-mandatory-label-policy)

### Programmatic labeling

Supported for all Fabric items. For more information, see XXX.

[Set or remove sensitivity labels using Power BI REST admin APIs](/power-bi/enterprise/service-security-sensitivity-label-inheritance-set-remove-api)

### Downstream inheritance

Limitation: a label set on a dataset won't propagate downstream to non-Power BI Fabric items.

Supported:
* Power BI item to Power BI item
* Fabric item to Fabric item
* Fabric item to Power BI item

Not supported:

* Power BI item to Fabric item

Auto-generated items from Lakehouse or Data Warehouse get their label from the Lakehouse or Data Data Warehouse. They don't inherit the label from items further upstream.

[Sensitivity label downstream inheritance](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance)

### Inheritance upon creation

 If you try to create a pipeline or notebook from lakehouse, it will get the sensitivity label of the lakehouse.

[Sensitivity label inheritance upon creation of new content](/power-bi/enterprise/service-security-sensitivity-label-overview#sensitivity-label-inheritance-upon-creation-of-new-content)

### Inheritance from data sources

Currently supported for PBI datasets only. For more information, see [Sensitivity label inheritance from data sources (preview)](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources).

### Export

Currently supported for Power BI items in supported export paths. Currently no other Fabric experience uses an export method that transfers the sensitivity label to the exported output. However, if they do export an item that has a sensitivity label, a warning is issued.

[Supported export paths in Power BI](/power-bi/enterprise/service-security-sensitivity-label-overview#supported-export-paths)

## Deploy information protection in your tenant

| Step | Activity | References | 
|:---|:------|:------------|
|1| Define your sensitivity labels and policies that will protect your organization's data. | [Learn about sensitivity labels](/microsoft-365/compliance/sensitivity-labels)<br>[Get started with sensitivity labels](/microsoft-365/compliance/sensitivity-labels)<br>[Create and configure sensitivity labels and their policies](/microsoft-365/compliance/create-sensitivity-labels)
|2| Enable sensitivity labels in Fabric. | [Set up information protection in your tenant](../admin/information-protection-setup.md)|
|3| Apply labeling to your organization's sensitive data. | [Apply labeling to your organization’s sensitive data](../admin/information-protection-setup.md) |
|4| Monitor your sensitive data and get insights. | [Microsoft Purview hub](./use-microsoft-purview-hub.md) |

### Define your sensitivity labels and policies

### Set up information protection

### Apply labeling to the data in your tenant

* Define the users who will be allowed to apply sensitivity labels. [Set up information protection in Fabric](../admin/information-protection-setup.md)

* Define a default label policy that will cause a default label to be applied to an item when it is created or edited if no label is otherwise applied. That way no item can be saved without a label. [Default label policy for Power BI](/power-bi/enterprise/service-security-sensitivity-label-default-label-policy).

* Define a mandatory label policy that will require users to apply a label when they try to save an unlabeled item. A mandatory label policy also ensures that no item can be saved without a label. [Mandatory label policy for Power BI](/power-bi/enterprise/service-security-sensitivity-label-mandatory-label-policy).

* Enable downstream inheritance. Downstream inheritance helps make sure that changes made to certain items are reflected on their dependent items. [Sensitivity label downstream inheritance](/power-bi/enterprise/service-security-sensitivity-label-downstream-inheritance)

* Programmatically apply labels to unlabeled items. Using [Power BI admin REST APIs](/power-bi/enterprise/service-security-sensitivity-label-inheritance-set-remove-api) you can label apply labels to entire sections of your data estate to get started governing and protecting your data with Microsoft Purview governance and compliance.

* Allow sensitivity lables to be inherited from data sources. [Sensitivity label inheritance from data sources (preview)](/power-bi/enterprise/service-security-sensitivity-label-inheritance-from-data-sources). 

### Monitor your sensitive data

## Next steps

* [Admin overview](../admin/admin-overview.md)