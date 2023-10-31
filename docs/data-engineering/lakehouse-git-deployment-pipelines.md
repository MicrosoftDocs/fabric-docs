---
title: Lakehouse deployment pipelines and git integration
description: Learn about the Lakehouse git integration and deployment pipelines.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.date: 10/31/2023
ms.search.form: lakehouse git deployment pipelines alm ci cd
---

# Lakehouse deployment pipelines and git integration (Preview)

The [Lakehouse](lakehouse-overview.md) integrates with the lifecycle management capabilities in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life. Lifecycle management facilitates an effective product versioning and release process by continuously delivering features and bug fixes into multiple environments. To learn more, read [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md).

## Lakehouse git integration

The Lakehouse is a data artifact that contains both metadata and data that is referenced in multiple objects in the workspace. Lakehouse contain tables, folders, and shortcuts as primary manageable data container items. From a development workflow perspective, the following dependent objects may reference a Lakehouse artifact:

* [Dataflows](../data-factory/create-first-dataflow-gen2.md) and [Data Pipelines](../data-factory/create-first-pipeline-with-sample-data.md)
* [Spark Job Definitions](spark-job-definition.md)
* [Notebooks](how-to-use-notebook.md)
* Semantic models and PowerBI

The default semantic model and SQL Analytics Endpoint metadata are related to a Lakehouse and managed by the git update process by default.

As a principle __no data is tracked in git__, only metadata.

### Git representation

The following Lakehouse information is serialized and tracked in a git connected workspace:

* Display name
* Description
* Logical guid

> [!NOTE]
> The tracked logical id is an automatically generated cross-workspace identifier representing an item and its source control representation.

### Lakehouse git integration capabilities

The following capabilities are available:

* Serialization of the Lakehouse object metadata to a git JSON representation.
* Apply changes directly or use pull request to control changes to upstream or downstream workspaces and branches.
* Renaming of Lakehouses are tracked in git. Update of renamed Lakehouse also renames the default semantic data model and SQL Analytics endpoint.
* No action is applied to tables, folders and shortcuts, metadata and data of those items is always preserved.

## Lakehouse in deployment pipelines

The Lakehouse artifact is supported in Microsoft Fabric lifecycle management deployment pipelines, enabling environment segmentation [best-practices](../cicd/best-practices-cicd.md).

Lakehouse deployment pipelines integration capabilities:

* Deployment across Dev-Test-Production workspaces.
* Lakehouse can be removed as a dependent object upon deployment. Mapping different Lakehouses within the deployment pipeline context is also supported.
  * If nothing is specified during deployment pipeline configuration, a new Lakehouse object with same name, is created in the target workspace. Notebook and Spark Job Definitions are remapped to reference the new Lakehouse object in the new workspace.
  * If the Lakehouse dependency is configured to reference a different Lakehouse during deployment pipeline configuration time, such as the upstream Lakehouse, a new Lakehouse object with same name, is created in the target workspace, __but Notebooks and Spark Job Definitions references are preserved as requested__.
  * SQL Analytics endpoints and semantic models are provisioned as part of the Lakehouse deployment.
* No object inside the Lakehouse is overwritten.
* Updates to Lakehouse name can be synchronized across workspaces in a deployment pipeline context.

## Next steps

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
