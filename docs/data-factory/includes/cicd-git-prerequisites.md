---
title: CI/CD Git integration prerequisites include
description: Shared prerequisites for Git integration in Fabric Data Factory CI/CD articles.
author: whhender
ms.author: whhender
ms.topic: include
ms.date: 06/10/2025
---

- You need a [Power BI Premium license](/power-bi/enterprise/service-premium-what-is) or [Fabric capacity](../../enterprise/licenses.md#capacity).
- Make sure these admin settings are turned on:
   - [Users can create Fabric items](../../admin/fabric-switch.md)
   - [Users can sync workspace items with their Git repositories](../../admin/git-integration-admin-settings.md#users-can-synchronize-workspace-items-with-their-git-repositories)
   - (For GitHub users) [Users can sync workspace items with GitHub repositories](../../admin/git-integration-admin-settings.md#users-can-sync-workspace-items-with-github-repositories)
- You need either an Azure DevOps organization or a GitHub account.
   - For Azure DevOps:
      - Sign up for a free [Azure account](https://azure.microsoft.com/products/devops/) if you don't have one.
      - Make sure you have access to a repository.
   - For GitHub:
      - Sign up for a free [GitHub account](https://github.com/) if you don't have one.
      - You need a [fine-grained token](https://github.com/settings/personal-access-tokens/new) with _read_ and _write_ permissions for _Contents_, or a [GitHub classic token](https://github.com/settings/tokens/new) with repo scopes enabled.
