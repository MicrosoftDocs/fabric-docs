---
title: Git integration and deployment pipelines for ML artifacts
description: Learn how Microsoft Fabric tracks machine learning experiment and model metadata through Git integration and deployment pipelines.
ms.author: scottpolly
ms.topic: concept-article
ms.service: fabric
ms.reviewer: scottpolly
reviewer: s-polly
ms.date: 09/02/2026
ms.search.form: ml model, ml experiment, Git deployment pipelines alm ci cd
ai-usage: ai-assisted
---

# Git integration and deployment pipelines for machine learning experiments and models (preview)

Machine learning experiments and models in Microsoft Fabric integrate with Git integration and deployment pipelines. These capabilities track and promote experiment and model metadata, while experiment runs and model versions remain in workspace storage and aren't versioned or promoted.

For an overview of the broader release process, see [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]


## Machine learning experiments and models Git integration

Machine learning (ML) experiments and models contain both metadata and data. ML experiments contain `runs`, while ML models contain `model versions`. From a development workflow perspective, [notebooks](../data-engineering/how-to-use-notebook.md) might reference an ML experiment or model.

Data isn't stored in Git; only artifact metadata is tracked. By default, manage ML experiments and models through the Git sync and update process, but `experiment runs` and `model versions` aren't tracked or versioned in Git. Their data remains in workspace storage. Supported dependency references might bind across workspaces when Fabric represents them with portable logical IDs. Binding behavior depends on the item type and reference format.

### Lifecycle flow

1. Git integration serializes experiment and model metadata so it can be synchronized and versioned.
1. Git synchronization applies metadata changes between the connected repository and workspace.
1. Deployment pipelines promote supported artifact metadata between development, test, and production workspaces.
1. Experiment runs and model versions remain in workspace storage and aren't included in either synchronization path.

### Git representation
A Git-connected workspace for machine learning experiments and models serializes and tracks the following information:
* __Display name__.
* __Version__. The `version` field identifies the source-control system-file format version. It isn't the version of an ML model.
* __Logical ID__. The `logicalId` value is an automatically generated cross-workspace identifier that Fabric uses to associate an item with its source-control representation. For more information, see [Logical ID in Fabric](../cicd/git-integration/source-code-format.md#platform-file).
* __Dependencies__. Supported dependency references might bind across Git-connected workspaces. Binding depends on the item type and reference format. References that retain workspace-specific IDs might require manual updates or parameterization.

> [!IMPORTANT]
> Only machine learning experiment and model artifact metadata is tracked in Git in the current experience. __Experiment runs__ and __model versions__ (the run outputs and model data) are not stored or versioned in Git; their data remains in workspace storage.

### Git integration capabilities
The following capabilities are available:

* Serialize ML experiment and model artifact metadata into a Git-tracked JSON representation.
* Support multiple workspaces linked to the same Git branch, enabling tracked metadata to sync across workspaces. Each workspace can connect to only one branch at a time.
* Allow updates to be applied directly or controlled via pull requests to manage changes between upstream and downstream workspaces/branches.
* Track renames of experiments and models in Git to preserve identity across workspaces.
* No actions are taken on `experiment runs` or `model versions`; their data is preserved in workspace storage and isn't stored or overwritten by Git.


## Machine learning experiments and models in deployment pipelines
Microsoft Fabric deployment pipelines support machine learning (ML) experiments and models. They help you segment development, test, and production environments. For guidance, see [best practices for lifecycle management](../cicd/best-practices-cicd.md).

> [!IMPORTANT]
> Deployment pipelines currently deploy only supported metadata for machine learning experiments and models. __Experiment runs__ and __model versions__ aren't deployment-pipeline payloads. Metadata deployment doesn't synchronize or overwrite their data.

ML experiments and models deployment pipelines integration capabilities:

* Support for deploying ML experiments and models across development, test, and production workspaces.
* Deployments synchronize only supported artifact metadata. `experiment runs` and `model versions` aren't synchronized between workspaces.
* Renames of experiments and models are propagated across workspaces when included in a deployment pipeline.
* Supported dependency references between notebooks, experiments, and models might bind across workspaces during pipeline deployments. Binding depends on the item type and reference format.

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
