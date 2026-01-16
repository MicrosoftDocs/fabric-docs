---
title: Lakehouse deployment pipelines and git integration
description: Learn about the Microsoft Fabric lakehouse deployment pipelines and git integration, including what is tracked in a git-connected workspace.
ms.reviewer: dacoelho
ms.author: eur
author: eric-urban
ms.topic: concept-article
ms.custom:
ms.date: 12/17/2025
ms.search.form: lakehouse git deployment pipelines alm ci cd
---

# Lakehouse deployment pipelines and git integration

The [Lakehouse](lakehouse-overview.md) integrates with the lifecycle management capabilities in Microsoft Fabric, providing a standardized collaboration between all development team members throughout the product's life. Lifecycle management facilitates an effective product versioning and release process by continuously delivering features and bug fixes into multiple environments. To learn more, see [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md).

## What is tracked in git and deployment pipelines?

The following table summarizes the Lakehouse item and subitems and their support in git-connected workspaces and deployment pipelines.

| Item/Subitem | Git | Deployment Pipelines | Release Status | Notes |
|---------------|-----|---------------------|----------------|-------|
| Lakehouse metadata (display name, description, logical GUID) | ✅ Tracked | ✅ Tracked | GA | Cross-workspace identifier for source control |
| OneLake Shortcuts metadata | ✅ Tracked | ✅ Tracked | GA | Stored in shortcuts.metadata.json file |
| External shortcuts: ADLS Gen2, S3, Dataverse, and Google Cloud Storage | ✅ Tracked | ✅ Synced across stages | GA | Same targets across all stages, unless remapped using Variable Library |
| External shortcuts: SharePoint, Azure blob storage, OneDrive | ❌ Not tracked | ❌ Not overwritten | Not supported | Data always preserved during operations |
| Internal OneLake Shortcuts | ✅ Tracked | ✅ Automatically remapped across stages | GA | Requires valid targets in workspace to become usable |
| OneLake Security Data Access Roles metadata | ✅ Tracked | ✅ Tracked | Preview | Stored in data-access-roles.json file |
| Tables (Delta and non-Delta) | ❌ Not tracked | ❌ Not overwritten | Not supported | Data always preserved during operations |
| Spark Views | ❌ Not tracked | ❌ Not overwritten | Not supported | Data always preserved during operations |
| Folders in Files section | ❌ Not tracked | ❌ Not overwritten | Not supported | Data always preserved during operations |

## Opt-In experience for object types

Lakehouse offers an opt-in experience that enables or disables the tracking object types in git and deployment pipelines. To enable the experience, go to Lakehouse settings and enable the desired object types to be tracked.

This feature provides the following benefits for two reasons:
- Provide flexibility to development teams to choose which object types are tracked in git and deployment pipelines based on their specific needs and workflows. Teams might want to orchestrate object types via external tools or scripts. Also, some object types might not be relevant for all stages in a deployment pipeline.
- Gradually introduce new object types for tracking, allowing teams to adapt existing workflows and automations before opting in to more object types. This safeguards against potential disruptions to existing workflows and automations.

:::image type="content" source="./media/lakehouse-git-deployment-pipelines/lakehouse-settings-opt-in.png" alt-text="Screenshot of lakehouse settings opt-in experience." lightbox="./media/lakehouse-git-deployment-pipelines/lakehouse-settings-opt-in.png":::

The following behaviors are applied when opting in or out of object types tracking:

- After opting in to track an object type that wasn't tracked before and syncing changes to git, the current metadata state of that object type is serialized and stored in git. Future changes to that object type are tracked and synchronized across workspaces in deployment pipelines.
- After opting out of tracking an object type that was tracked before, the object type metadata is no longer serialized or stored in git. Future changes to that object type won't be tracked or synchronized across workspaces in deployment pipelines. The existing metadata in git is removed.
- New lakehouses are created with all object types opted in by default, except the ones in Preview state.
- Existing lakehouses retain their current object types tracking state unless changed by the user.

The ALM tracking definitions are stored in a file named ```alm.settings.json``` under the lakehouse folder in git. Those configurations can be changed and versioned directly in the git repository by changing the ```alm.settings.json``` file, then applying those changes back to the workspace.

## Lakehouse git integration

The Lakehouse is an item that contains both metadata and data that is referenced in multiple objects in the workspace. Lakehouse contains references to tables, folders, and shortcuts as primary manageable data container items. From a development workflow perspective, the following dependent objects might reference a Lakehouse:

* [Dataflows](../data-factory/create-first-dataflow-gen2.md) and [Pipelines](../data-factory/create-first-pipeline-with-sample-data.md)
* [Spark Job Definitions](spark-job-definition.md)
* [Notebooks](how-to-use-notebook.md)
* Semantic models and Power BI

The SQL analytics endpoint metadata are related to a Lakehouse and managed by the git update process by default. As a principle __data is not tracked in git__, only metadata is tracked.

### Git representation

The following lakehouse information is serialized and tracked in a git connected workspace:

* Display name
* Description
* Logical guid

> [!NOTE]
> The tracked logical guid is an automatically generated cross-workspace identifier representing an item and its source control representation.

> [!IMPORTANT]
> Only the Lakehouse container artifact and the items referenced in the first section of this article are tracked in git in the current experience. __Tables (Delta and non-Delta) and Folders in the Files section aren't tracked and versioned in git__.

### Lakehouse artifact git and deployment pipelines integration capabilities

The following capabilities are available:

* Serialization of the Lakehouse artifact object metadata to a git JSON representation.
* Apply changes directly or use pull request to control changes to upstream or downstream workspaces and branches.
* Renaming lakehouses are tracked in git. Updating a renamed lakehouse also renames the SQL Analytics endpoint.
* __No action is applied to tables and folders metadata__, and data of those items is always preserved.
* __OneLake Shortcuts metadata__ is preserved in git.

The Lakehouse is supported in Microsoft Fabric lifecycle management deployment pipelines. It enables environment segmentation [best-practices](../cicd/best-practices-cicd.md).

Lakehouse deployment pipelines integration capabilities:

* Deployment across dev, test, and production workspaces.
* Lakehouse can be removed as a dependent object upon deployment. Mapping different Lakehouses within the deployment pipeline context is also supported.
  * If nothing is specified during deployment pipeline configuration, a new empty Lakehouse object with same name is created in the target workspace. Notebook and Spark Job Definitions are remapped to reference the new Lakehouse object in the new workspace.

  * If the Lakehouse dependency is configured to reference a different Lakehouse during deployment pipeline configuration time, such as the upstream Lakehouse, a new empty Lakehouse object with same name still is created in the target workspace, __but Notebooks and Spark Job Definitions references are preserved to a different Lakehouse as requested__.

  * SQL Analytics endpoints and semantic models are provisioned as part of the Lakehouse deployment.
* Updates to Lakehouse name can be synchronized across workspaces in a deployment pipeline context.

### OneLake Shortcuts git and deployment pipelines integration capabilities

When using __git integration__ with Lakehouse, OneLake Shortcuts metadata is tracked in git. The following capabilities are available for git integration:

* Shortcuts definitions in both the Tables and Files section are stored in a file named ```shortcuts.metadata.json``` under the lakehouse folder in git.
* The following operations are supported and tracked automatically: __addition, deletion and updates__ of Shortcuts.
* The operations can be performed directly in the Fabric user interface or in the git repository by changing the ```shortcuts.metadata.json``` file.
* Shortcuts with internal targets (OneLake Shortcuts) are automatically updated during git synchronization. In order for the Shortcut to be valid, those references need to be valid targets in the workspace. If the targets are invalid for Shortcuts defined in the lakehouse tables section, those Shortcuts are moved to the ```Unidentified``` section until references are resolved.

> [!IMPORTANT]
> Use caution when changing OneLake Shortcut properties directly in the ```shortcuts.metadata.json``` file. Incorrect changes to the properties, specially GUIDs, can render the OneLake Shortcut invalid when updates are applied back to the workspace.

> [!IMPORTANT]
> An update from git overrides the state of shortcuts in the workspace. All the Shortcuts in the workspace are created, updated or deleted based on the incoming state from git.

When using __deployment pipelines__ with Lakehouse, OneLake Shortcuts metadata is deployed across stages in the pipeline. The following capabilities are available for deployment pipelines:

* Shortcuts definitions are synced across stages in the deployment pipelines.
* Shortcuts with external targets (ADLS Gen2, S3, etc.) are the same across all stages after deployment.
* Shortcuts with internal targets (OneLake Shortcuts) in the same workspace are automatically remapped across stages. Shortcuts that target Data Warehouse and Semantic Models are not remapped during deployment. Tables, Folders and Files are not created in the target workspace. In order for the Shortcut to be valid, those references need to be created in the target workspace after deployment.
* On the scenario that the same Shortcut needs to target different locations on different stages. For example, in Development point to a specific Folder in Amazon S3, and in Production a different folder in ADLS Gen2. The recommended approach is to use variables in the Shortcut definition. To learn more about variable library and how to effectively use it in Microsoft Fabric, read the [What is a Variable library? (preview)](../cicd/variable-library/variable-library-overview.md) article. Another option is; after the deployment, manually update the OneLake Shortcut definition in Lakehouse or directly using OneLake APIs.

> [!IMPORTANT]
> A deployment overrides the state of shortcuts in the target workspace. All the Shortcuts in the target lakehouse are updated or deleted based on the state in the source lakehouse. New shortcuts are created in the target lakehouse. Always select "review changes" to understand the changes that are deployed between source and target workspaces.

### OneLake Security Data Access Roles capabilities

* OneLake Security Data Access Roles definitions are stored in a file named ```data-access-roles.json``` under the lakehouse folder in git. Changes can be made directly in the git repository by changing the ```data-access-roles.json``` file, then applying those changes back to the workspace.
* The following operations are supported and tracked automatically: __addition, deletion and updates__ of Data Access Roles.
* Only users with Admin or Member roles can synchronize Security Role definitions to git.

The following table describes the behavior of OneLake Security Data Access Roles during git synchronization and deployment pipeline operations based on the source and target workspace configurations:

| Source Workspace | Target Workspace | Git Integration | Deployment Pipeline | Description |
|------------------|------------------|-----------------|-------------------|-------------|
| DAR + Opt-In enabled | New target (no lakehouse) | ✅ Enable DAR tracking on target | ✅ Enable DAR tracking on target | Target workspace automatically gets DAR tracking enabled |
| DAR + Opt-In enabled | DAR tracking disabled | ✅ Enable both DAR tracking and Opt-In on target | ✅ Enable both DAR tracking and Opt-In on target | Target workspace gets both features enabled automatically |
| DAR + Opt-In enabled | DAR enabled, Opt-In disabled | ⚠️ Prompt user to enable Opt-In and DAR (override or cancel) | ❌ Show error | Git integration allows user choice; Deployment pipeline requires manual target configuration |
| DAR + Opt-In enabled | DAR + Opt-In enabled | ✅ Normal sync (create/update/delete as needed) | ✅ Normal sync (create/update/delete as needed) | Standard operation with full synchronization |

> [!NOTE]
> When deployment pipeline shows an error, customers must manually enable DAR tracking on the target workspace and reconcile the roles to ensure there are no conflicts in data access roles before proceeding with deployment.
> [!IMPORTANT]
> Use caution when changing OneLake Security. Only users with Admin or Member roles can synchronize Security Role definitions to git or deployment pipelines.
> [!IMPORTANT]
> Microsoft Entra member IDs are not tracked in git due to security reasons. During git updates and deployment pipelines operations, members are preserved between workspaces only if role names match exactly. Caution is advised when renaming roles that have members assigned to them.

## Related content

* [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
* [Tutorial: Lifecycle management in Fabric](../cicd/cicd-tutorial.md)
* [Introduction to Git integration](../cicd/git-integration/intro-to-git-integration.md)
* [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
