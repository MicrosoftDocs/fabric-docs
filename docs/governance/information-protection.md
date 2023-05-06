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

This article describes Fabric's information protection capabilities, outlines the steps you need to take to implement information protection in your organization, and provides links to relevant documentation.

>[!NOTE]
> Information protection in Fabric is based on information protection in Power BI. Currently, information protection in Fabric is more fully supported for Power BI items than other Fabric items. Information protection in Power BI has additional capabilities, many of which will be coming to Fabric in the months ahead.

## Capabilities

The following table summarizes the information protection capabilities in Fabric that help you achieve maximum coverage of the sensitive information in your organization.

|Capability|Scenario|Public preview support|
|:----------|:---------|:----------|
|Manual labeling|Users can manually apply sensitive labels to Fabric items|Supported for all Fabric items.|
|Default labeling creation|When a new item is created, it gets a default sensitivity label unless a label is applied through other means.|Supported for all Fabric items, with limitations. |
|Default labeling update scenario|When an item is edited, it gets a default sensitivity label unless a label is applied through other means.| Supported for all Fabric items, with limitations. |
|Mandatory labeling|Users can't save items unless a sensitivity label is applied to the item. Can't remove label either.|Currently fully supported for Power BI items only. Supported for some non-Power BI Fabric items, with limitations. |
|Programmatic labeling|Sensitivity labels can be added, changed, or deleted programmatically via Power BI admin REST APIs.|Supported for all Fabric items.|
|Downstream inheritance|When a sensitivity label is applied to an item, the label is propagated down to all dependent items. |Supported for all Fabric items, with limitations. |
|Inheritance upon creation|When you create new item by copying an existing one, the new item takes the label of the existing item.| Supported for all Fabric items (with limitations?).|
|Inheritance from data sources|When a Fabric item ingests data from a data source that has a sensitivity label, that label is applied to the Fabric item. The label then filters down to the child items of that Fabric item via downstream inheritance.|Currently supported for PBI datasets only.|
|Export|When a user exports data from an item that has a sensitivity label, the sensitivity label moves with it to the exported format. |Currently supported for Power BI items in supported export paths. |

## Deploying Information protection in your tenant

| Step | Description | 
|:------|:------------|
| Define your sensitivity labels and policies that will protect your organization's data. | Get started with sensitivity labels<br>Create and configure sensitivity labels and their policies.
| Enable sensitivity labels in Fabric| How to set up information protection in your tenant.|
| Apply labeling to your organization's sensitive data | Apply labeling to your organization’s sensitive data |
| Monitor your sensitive data and get insights | Purview hub |

## Default labeling

Creation scenario: When there's a clear substantive create dialog. experienceNot

Update scenario: If an article doesn’t have an artifact, label gets applied.|Limitations: Power BI – change to any other attributes, will get applied. Fabric – only certain attributes. name, description, etc. And through flyout. workload editing: making a change to an item in the workload interface – not supported currently.

## Mandatory labeling

Currently supported for Power BI items only. Not enforced in Flyout Lakehouse, Pipeline: if mandatory is on, and default is off. And MIP enabled. Data Warehouse – same show label section through dialog.

## Programmatic labeling

Supported for all Fabric items. For more information, see XXX.

## Downstream inheritance

Limitation: a label set on a dataset won't propagate downstream to non-Power BI Fabric items.

Supported:
* Power BI item to Power BI item
* Fabric item to Fabric item
* Fabric item to Power BI item

Not supported:

* Power BI item to Fabric item

Auto-generated items from Lakehouse or Data Warehouse get their label from the Lakehouse or Data Data Warehouse. They don't inherit the label from items further upstream.

## Inheritance upon creation

 If you try to create a pipeline or notebook from lakehouse, it will get the sensitivity label of the lakehouse.

## Inheritance from data sources

Currently supported for PBI datasets only. For more information, see XXX.

## Export

Currently supported for Power BI items in supported export paths. Currently no other Fabric experience uses an export method that transfers the sensitivity label to the exported output. However, if they do export an item that has a sensitivity label, a warning is issued.

## Next steps

* [Admin overview](../admin/admin-overview.md)