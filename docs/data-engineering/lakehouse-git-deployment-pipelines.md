---
title: Lakehouse deployment pipelines and git integration
description: Learn about the Microsoft Fabric lakehouse deployment pipelines and git integration, including what is tracked in a git-connected workspace.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.custom:
  - ignite-2023
  - ignite-2023-fabric
ms.date: 11/15/2023
ms.search.form: lakehouse git deployment pipelines alm ci cd
---

# Lakehouse deployment pipelines and git integration (Preview)

The [Lakehouse](lakehouse-overview.md) integrates with the lifecycle management capabilities in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life. Lifecycle management facilitates an effective product versioning and release process by continuously delivering features and bug fixes into multiple environments. To learn more, see [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md).

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Lakehouse git integration

The Lakehouse is an item that contains both metadata and data that is referenced in multiple objects in the workspace. Lakehouse contains tables, folders, and shortcuts as primary manageable data container items. From a development workflow perspective, the following dependent objects might reference a Lakehouse:

* [Dataflows](../data-factory/create-first-dataflow-gen2.md) and [Data Pipelines](../data-factory/create-first-pipeline-with-sample-data.md)
* [Spark Job Definitions](spark-job-definition.md)
* [Notebooks](how-to-use-notebook.md)
* Semantic models and Power BI

The default semantic model and SQL analytics endpoint metadata are related to a Lakehouse and managed by the git update process by default. As a principle __data is not tracked in git__, only metadata is tracked.

### Git representation

The following lakehouse information is serialized and tracked in a git connected workspace:

* Display name
* Description
* Logical guid

> [!NOTE]
> The tracked logical guid is an automatically generated cross-workspace identifier representing an item and its source control representation.

> [!IMPORTANT]
> Only the Lakehouse container artifact is tracked in git in the current experience. __Tables (Delta and non-Delta) and Folders in the Files section aren't tracked and versioned in git__.

### Lakehouse git integration capabilities

The following capabilities are available:

* Serialization of the Lakehouse object metadata to a git JSON representation.
* Apply changes directly or use pull request to control changes to upstream or downstream workspaces and branches.
* Renaming lakehouses are tracked in git. Updating a renamed lakehouse also renames the default semantic data model and SQL Analytics endpoint.
* __No action is applied to tables and folders metadata__, and data of those items is always preserved.
* __OneLake Shortcuts metadata__ is preserved in git. 

### OneLake Shortcuts git integration capabilities

* Shortcuts definitions in both the Tables and Files section are stored in a file named ```shortcuts.metadata.json``` under the lakehouse folder in git.
* The following operations are supported and tracked automatically: __addition, deletion and updates__ of Shortcuts. 
* The operations can be performed directly in the Fabric user interface or in the git repository by changing the ```shortcuts.metadata.json``` file.

> [!IMPORTANT]
> Use caution when changing OneLake Shortcut properties directly in the ```shortcuts.metadata.json``` file. Incorrect changes to the properties, specially GUIDs, can render the OneLake Shortcut invalid when updates are applied back to the workspace.

## Lakehouse in deployment pipelines

The Lakehouse is supported in Microsoft Fabric lifecycle management deployment pipelines. It enables environment segmentation [best-practices](../cicd/best-practices-cicd.md).

Lakehouse deployment pipelines integration capabilities:

* Deployment across dev, test, and production workspaces.

* Lakehouse can be removed as a dependent object upon deployment. Mapping different Lakehouses within the deployment pipeline context is also supported.
  * If nothing is specified during deployment pipeline configuration, a new empty Lakehouse object with same name is created in the target workspace. Notebook and Spark Job Definitions are remapped to reference the new Lakehouse object in the new workspace.

  * If the Lakehouse dependency is configured to reference a different Lakehouse during deployment pipeline configuration time, such as the upstream Lakehouse, a new empty Lakehouse object with same name still is created in the target workspace, __but Notebooks and Spark Job Definitions references are preserved to a different Lakehouse as requested__.

  * SQL Analytics endpoints and semantic models are provisioned as part of the Lakehouse deployment.

* No object inside the Lakehouse is overwritten.

* Updates to Lakehouse name can be synchronized across workspaces in a deployment pipeline context.

### OneLake Shortcuts in deployment pipelines

* Shortcuts definitions are synced across stages in the deployment pipelines.
* Shortcuts with external targets (ADLS Gen2, S3, etc) will be the same across all stages.
* Shortcuts with internal targets (OneLake Shortcuts) in the same workspace are automatically remapped across stages. Shortcuts targeting Data Warehouse and Semantic Models will not be remapped. Tables, Folders and Files will not be created in the target. In order for the Shortcut to be valid, those need to be created in the target workspace.
* On the scenario that the same Shortcut needs to target different locations on different stages. For example, in Development point to a specific Folder in Amazon S3, and in Production a different folder in ADLS Gen2. After the deployment, update the OneLake Shortcut definition in Lakehouse or directly using OneLake APIs.

> [!IMPORTANT]
> A deployment __will override the state of shortcuts in the target workspace__. All the Shortcuts in the target lakehouse will be updated or deleted based on the state in the source lakehouse. New shortcuts will be created in the target lakehouse.

## Related content

- [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
- [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
- [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
