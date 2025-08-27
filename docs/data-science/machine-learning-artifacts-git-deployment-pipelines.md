---
title: Machine learning experiment and model git integration and deployment pipelines
description: Learn about the Microsoft Fabric Machine learning artifacts deployment pipelines and git integration, including what is tracked in a git-connected workspace.
ms.reviewer: 
reviewer: 
ms.author: ruxu
author: ruixinxu
ms.topic: conceptual
ms.custom:
ms.date: 8/27/2025
ms.search.form: ml model, ml experiment, git deployment pipelines alm ci cd
---

# Machine learning experiments and models git integration and deployment pipelines (Preview)

The [Machine learning experiments](machine-learning-experiment.md) and [models](machine-learning-model.md) integrate with the lifecycle management capabilities in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life. Lifecycle management facilitates an effective product versioning and release process by continuously delivering features and bug fixes into multiple environments. To learn more, see [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md).

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Machine learning experiments and models git integration

Machine learning (ML) experiments and models contain both metadata and data. ML experiments contain `runs` while ML models contains `model versions`. From a development workflow perspective, [Notebooks](../data-engineering/how-to-use-notebook.md) might reference a ML experiment or a ML model.

As a principle, __data is not stored in Git—only artifact metadata is tracked__. By default, ML experiments and models are managed through the Git sync/update process, but `experiment runs` and `model versions` aren't tracked or versioned in Git and their data is preserved in workspace storage. Lineage between notebooks, experiments, and models is inherited from the Git-connected workspace.

### Git representation
The following information is serialized and tracked in a git connected workspace for machine learning experiment and models:
* Display name
* Version 
* Logical guid
* Dependencies

> [!NOTE]
> The tracked logical guid is an automatically generated cross-workspace identifier representing an item and its source control representation.

> [!IMPORTANT]
> Only the Machine learning experiments and models artifact is tracked in git in the current experience. __`Experiment runs` and `Model versions` aren't tracked and versioned in git__.

### Git integration capabilities
The following capabilities are available:

* Serialize ML experiment and model artifact metadata into a Git-tracked JSON representation.
* Support multiple workspaces linked to the same Git branch, enabling tracked metadata to sync across workspaces.
* Allow updates to be applied directly or controlled via pull requests to manage changes between upstream and downstream workspaces/branches.
* Track renames of experiments and models in Git to preserve identity across workspaces.
* No actions are taken on `experiment runs` or `model versions`; their data is preserved in workspace storage and isn't stored or overwritten by Git.


## Machine learning experiments and models in deployment pipelines
Machine learning (ML) experiments and models are supported in Microsoft Fabric lifecycle management deployment pipelines. It enables environment segmentation [best-practices](../cicd/best-practices-cicd.md).

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