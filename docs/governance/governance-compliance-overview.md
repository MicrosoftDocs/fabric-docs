---
title: What is Microsoft Fabric governance and compliance?
description: This article provides an overview of the governance and compliance in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: overview
ms.service: azure
ms.date: 05/23/2023
---

# What is Microsoft Fabric governance and compliance?

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric governance and compliance is a set of capabilities that help you manage, protect, and monitor your organization's sensitive information. This article briefly describes the basic building blocks of Fabric governance and compliance and provides links for more information.

## Information protection

Fabric information protection is powered by sensitivity labels from Microsoft Purview Information Protection. For more information, see [Information protection in Fabric](./information-protection.md).

## Data loss prevention (DLP)

Data loss prevention policies help organizations detect and protect their sensitive data. DLP is currently supported for Power BI datasets only. For more information, see [Data loss prevention policies for Power BI](/power-bi/enterprise/service-security-dlp-policies-for-power-bi-overview).

## Endorsement

Endorsement is a way to make it easier for users to find the high-quality items they need. For more information, see [Endorsement](./endorsement-overview.md).

## Metadata scanning

Metadata scanning facilitates governance of your organization's Microsoft Fabric data by making it possible to catalog and report on all the metadata of your organization's Fabric items. It accomplishes this using a set of Admin REST APIs that are collectively known as the *scanner APIs*. For more information, see [Metadata scanning](./metadata-scanning-overview.md).

## Lineage

Lineage helps users understand the flow of data from data source to destination. This capability is critical to understanding how changes to an item might impact other items connected to it downstream. For more information, see [Lineage](./lineage.md).

## Microsoft Purview hub

The Microsoft Purview hub is the gateway to Microsoft Purview, where Fabric users can use Purview's powerful capabilities to gain insights about their Fabric data estate. For more information, see [Microsoft Purview hub](./use-microsoft-purview-hub.md)

## Next steps

* [WEhat is Microsoft Fabric](../get-started/microsoft-fabric-overview.md)