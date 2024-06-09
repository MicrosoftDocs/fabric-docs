---
title: Include file for GitHub prereqs
description: Include file for the GitHub prereqs. This include file will be referenced in this repo and also in an article in the Power BI repo.
author: maggiesMSFT
ms.author: maggies
ms.topic: include
ms.custom: 
ms.date: 12/20/2023
---

To integrate Git with your Microsoft Fabric workspace, you need to set up the following prerequisites for both Fabric and Git.

### Fabric prerequisites

To access the Git integration feature, you need one of the following:

- [Power BI Premium license](/power-bi/enterprise/service-premium-what-is). A Power BI premium license supports all Power BI items only.
- [Fabric capacity](/fabric/enterprise/licenses#capacity-and-skus). A Fabric capacity is required to use all supported Fabric items.

In addition, your organization’s administrator has to [enable the **Users can create Fabric items** tenant switch](/fabric/admin/about-tenant-settings#how-to-get-to-the-tenant-settings) from the Admin portal.

:::image type="content" source="/fabric/includes/media/github-prereqs/fabric-switch.png" alt-text="Screenshot of Fabric switch enabled.":::

## Git prerequisites

Git integration is currently supported for Azure DevOps and GitHub. To use Git integration with your Fabric workspace, you need the following in either Azure DevOps or GitHub:

### [Azure DevOps](#tab/azure-devops)

- An active Azure account registered to the same user that is using the Fabric workspace. [Create a free account](https://azure.microsoft.com/products/devops/).
- Access to an existing repository.

### [GitHub](#tab/github)

- An active GitHub account. [Create a GitHub account](https://docs.github.com)
- *One* of the following [personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens):

  - A [fine-grained token](https://github.com/settings/personal-access-tokens/new) (recommended) with **Contents** read and write permission under the repository permissions:
  
    :::image type="content" source="/fabric/includes/media/github-prereqs/fine-grained-token.png" alt-text="Screenshot of GitHub token permissions.":::

  - A [classic token](https://github.com/settings/tokens/new) with repo scopes enabled:

    :::image type="content" source="/fabric/includes/media/github-prereqs/classic-token.png" alt-text="Screenshot of GitHub classic token scopes.":::

---
