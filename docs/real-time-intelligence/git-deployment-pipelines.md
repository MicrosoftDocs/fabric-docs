---
title: Git integration and deployment pipelines
description: Learn about Microsoft Fabric Real-Time Intelligence Git integration and deployment pipelines, including what's tracked in a Git-connected workspace.
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 06/09/2026
ai-usage: ai-assisted
ms.search.form: Eventhouse, KQL database, Overview
#customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and Git, and how to configure and manage them in the ALM system.
---

# Git integration and deployment pipelines

Real-Time Intelligence integrates with the [lifecycle management capabilities](../cicd/cicd-overview.md) in Microsoft Fabric so your team can collaborate consistently throughout the product lifecycle.

Microsoft Fabric offers Git integration and deployment pipelines for different scenarios:

- Use [Git integration](../cicd/git-integration/intro-to-git-integration.md) to sync a workspace to a Git repo and manage incremental changes, team collaboration, and commit history.
- Use [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) to deploy a workspace across development, test, and production environments.

## Git integration

Real-Time Intelligence supports Git integration for Eventstreams, eventhouses, KQL databases, KQL querysets, real-time dashboards, and Activator. Use Git integration to track changes to these items in a Git-connected workspace and manage versioning, branching, and merging.

For details on setting up Git integration, see [Get started with Git integration](../cicd/git-integration/git-get-started.md).

### Supported items

- [Eventstream](git-eventstream.md)
- [Eventhouse and KQL database](git-eventhouse-kql-database.md)
- [KQL querysets](git-kql-queryset.md)
- [Real-time dashboards](git-real-time-dashboard.md)
- [Activator](git-activator.md) *(preview)*

## Deployment pipelines

Real-Time Intelligence supports deployment pipelines for Eventstreams, eventhouses, KQL databases, KQL querysets, real-time dashboards, and Activator. Use deployment pipelines to promote workspace content across development, test, and production stages in Fabric.

For details on setting up deployment pipelines, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

## Limitations

- Git integration and deployment pipelines offer limited support for cross-workspace scenarios. To avoid problems, keep all Eventstream destinations in the same workspace. Cross-workspace deployments might not work as expected.
- If an Eventstream includes an eventhouse destination that uses **Direct Ingestion** mode, you need to manually reconfigure the connection after you import or deploy it to a new workspace.
- Use connection reference items (Variable Library) to centralize and rebind connections when you deploy Eventstream items across workspaces. This approach reduces manual reconfiguration when Eventhouse destinations use Direct Ingestion.

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
