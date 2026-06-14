---
title: Git integration and deployment pipelines
description: Learn about Microsoft Fabric Real-Time Intelligence Git integration and deployment pipelines, including what's tracked in a Git-connected workspace.
ms.reviewer: bwatts
ms.topic: concept-article
ms.date: 06/10/2026
ms.search.form: Eventhouse, KQL database, Overview
#customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and Git, and how to configure and manage them in the ALM system.
---

# Git integration and deployment pipelines

Git integration and deployment pipelines are lifecycle management features in Microsoft Fabric that help you version, collaborate on, and deploy Real-Time Intelligence items across environments. If your team needs source control for eventhouses, KQL databases, or dashboards—or a structured way to promote changes from development to production—these tools can help.

Fabric platform offers Git integration and Deployment pipelines for different scenarios:

* Use [Git integration](../cicd/git-integration/intro-to-git-integration.md) to sync a workspace to a git repo, and manage incremental change, team collaboration, commit history.
* Use [Deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) to deploy a workspace to different development, test, and production environments.

## Git integration

Real-Time Intelligence supports Git integration for Eventstreams, Eventhouses, KQL databases, KQL querysets, Real-Time dashboards, and Activator. Git integration lets you track changes to these items in a Git-connected workspace. The integration provides a way to manage the lifecycle of these items, including versioning, branching, and merging.

For details on setting up Git integration, see [Get started with Git integration](../cicd/git-integration/git-get-started.md).

### Supported items 

- [Eventstream](git-eventstream.md)
- [Eventhouse and KQL database](git-eventhouse-kql-database.md)
- [KQL querysets](git-kql-queryset.md)
- [Real-Time dashboards](git-real-time-dashboard.md)
- [Activator](git-activator.md)

## Deployment pipelines

Real-Time Intelligence supports deployment pipelines for Eventstreams, Eventhouses, KQL databases, KQL querysets, Real-Time dashboards, and Activator. Microsoft Fabric's deployment pipelines tool gives content creators a production environment where they can collaborate with others to manage the lifecycle of organizational content. Deployment pipelines enable creators to develop and test content in the service before it reaches users.

For details on setting up deployment pipelines, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

## Limitations

- **Git integration** and **Deployment pipelines** have limited support for cross-workspace scenarios. To avoid issues, ensure all Eventstream destinations are within the same workspace. Cross-workspace deployment might not work as expected.
- If an Eventstream includes an Eventhouse destination using **Direct Ingestion** mode, you must manually reconfigure the connection after importing or deploying it to a new workspace.


## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)