---
title: Include file for GitHub prereqs
description: Include file for the GitHub prereqs. This include file will be referenced in this repo and also in an article in the Power BI repo.
author: maggiesMSFT
ms.author: maggies
ms.topic: include
ms.custom: 
ms.date: 12/20/2023
---
To integrate Git with your Microsoft Fabric workspace, you need to set up the following prerequisites in both Azure DevOps and Fabric.

### Azure DevOps prerequisites

- An active Azure account registered to the same user that is using the Fabric workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
- Access to an existing repository.

### Fabric prerequisites

To access the Git integration feature, you need one of the following:

- [Power BI Premium license](/power-bi/enterprise/service-premium-what-is). A Power BI premium license supports all Power BI items only.
- [Fabric capacity](/fabric/enterprise/licenses#capacity-and-skus). A Fabric capacity is required to use all supported Fabric items.

In addition, your organization’s administrator has to [enable the **Users can create Fabric items** tenant switch](/fabric/admin/about-tenant-settings#how-to-get-to-the-tenant-settings) from the Admin portal.

:::image type="content" source="/fabric/includes/media/github-prereqs/fabric-switch.png" alt-text="Screenshot of Fabric switch enabled.":::
