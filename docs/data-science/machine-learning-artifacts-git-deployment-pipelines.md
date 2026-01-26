---
title: Machine learning experiment and model Git integration and deployment pipelines
description: Learn about the Microsoft Fabric Machine learning artifacts deployment pipelines and Git integration, including what is tracked in a Git-connected workspace.
ms.reviewer: 
reviewer: 
ms.author: ruxu
author: ruixinxu
ms.topic: concept-article
ms.custom:
ms.date: 8/27/2025
ms.search.form: ml model, ml experiment, Git deployment pipelines alm ci cd
---

# Machine learning experiments and models Git integration and deployment pipelines (Preview)

The [Machine learning experiments](machine-learning-experiment.md) and [models](machine-learning-model.md) integrate with the lifecycle management capabilities in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life. Lifecycle management facilitates an effective product versioning and release process by continuously delivering features and bug fixes into multiple environments. To learn more, see [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md).

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Machine learning experiments and models Git integration

Machine learning (ML) experiments and models contain both metadata and data. ML experiments contain `runs` while ML models contains `model versions`. From a development workflow perspective, [Notebooks](../data-engineering/how-to-use-notebook.md) might reference an ML experiment or an ML model.

As a principle, __data is not stored in Git—only artifact metadata is tracked__. By default, ML experiments and models are managed through the Git sync/update process, but `experiment runs` and `model versions` aren't tracked or versioned in Git and their data is preserved in workspace storage. Lineage between notebooks, experiments, and models is inherited from the Git-connected workspace.

### Git representation
The following information is serialized and tracked in a Git connected workspace for machine learning experiment and models:
* __Display name__.
* __Version__.
* __Logical guid__. The tracked logical guid is an automatically generated cross-workspace identifier representing an item and its source control representation.
* __Dependencies__. Lineage between notebooks, experiments, and models are preserved across Git-connected workspaces, maintaining clear traceability among related artifacts.

> [!IMPORTANT]
> Only machine learning experiment and model artifact metadata is tracked in Git in the current experience. __Experiment runs__ and __model versions__ (the run outputs and model data) are not stored or versioned in Git; their data remains in workspace storage.

### Git integration capabilities
The following capabilities are available:

* Serialize ML experiment and model artifact metadata into a Git-tracked JSON representation.
* Support multiple workspaces linked to the same Git branch, enabling tracked metadata to sync across workspaces.
* Allow updates to be applied directly or controlled via pull requests to manage changes between upstream and downstream workspaces/branches.
* Track renames of experiments and models in Git to preserve identity across workspaces.
* No actions are taken on `experiment runs` or `model versions`; their data is preserved in workspace storage and isn't stored or overwritten by Git.


## Machine learning experiments and models in deployment pipelines
Machine learning (ML) experiments and models are supported in Microsoft Fabric lifecycle management deployment pipelines. It enables environment segmentation [best-practices](../cicd/best-practices-cicd.md).

> [!IMPORTANT]
> Only machine learning experiment and model artifacts are tracked in deployment pipelines in the current experience. __Experiment runs__ and __model versions__ aren't tracked or versioned by pipelines; their data remains in workspace storage.

ML experiments and models deployment pipelines integration capabilities:

* Support for deploying ML experiments and models across development, test, and production workspaces.
* Deployments synchronize only artifact metadata; `experiment runs` and `model versions` (their data) are preserved and aren't overwritten.
* Renames of experiments and models are propagated across workspaces when included in a deployment pipeline.
* Lineage between notebooks, experiments, and models is maintained across workspaces during pipeline deployments, preserving traceability between related artifacts.

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)