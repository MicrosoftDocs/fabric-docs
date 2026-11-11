---
title: CI/CD workflow options in Fabric
description: Learn about different options for building and using deployment pipelines based on customer experiences. 
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 10/18/2026
ai-usage: ai-assisted
#customer intent: As a developer, I want to learn how to use deployment pipelines in Fabric so that I can manage my development process efficiently.
---

# Choose the best Fabric CI/CD workflow option for you

This article presents Fabric developers with different options for building CI/CD processes in Fabric, based on common customer scenarios. This article focuses more on the *continuous deployment* (CD) of the CI/CD process. For a discussion on the *continuous integration* (CI) part, see [Development process in Microsoft Fabric](./git-integration/manage-branches.md).

While this article outlines several distinct options, many organizations take a hybrid approach.

## Prerequisites

To build a CI/CD process using the options in this article, you need:

* A [Microsoft Fabric subscription](../enterprise/licenses.md)

* A Fabric [workspace](../fundamentals/create-workspaces.md) (you must be a workspace admin to configure deployment)

* For Git-based options (1, 2, and 4), a supported Git provider (Azure DevOps or GitHub) connected through [Git integration](./git-integration/intro-to-git-integration.md)

> [!NOTE]
> Option 3 uses Fabric deployment pipelines. To use that option, you also need access to the [deployment pipelines](./deployment-pipelines/intro-to-deployment-pipelines.md) feature and permission to create and manage a pipeline.

## Development process

The development process is the same in all deployment scenarios, and is independent of how to release new updates into production. When developers work with source control, they need to work in an isolated environment. In Fabric, that environment can either be an IDE on your local machine (such as Power BI Desktop, or VS Code), or a different workspace in Fabric. You can find information about the different considerations for the development process in [Development process in Microsoft Fabric](./git-integration/manage-branches.md).

:::image type="content" source="./media/manage-deployment/development-process.png" alt-text="Diagram showing centered feature and dev workspace boxes, bidirectional Git sync with their branches, branch-out with an optional deployment plan, and a feature-to-dev PR." lightbox="./media/manage-deployment/development-process.png":::

Git sync supports both committing workspace changes to Git and updating a
workspace from Git. The PR arrow shows the direction in which you merge feature
changes into the shared development branch, not a bidirectional sync operation.

## Release process

The release process starts once new updates are complete and the pull request (PR) merged into the team’s shared branch (such as *Main*, *Dev* etc.). From this point, there are different options to build a release process in Fabric.

The following table summarizes the options to help you choose. Many teams combine more than one.

| Option | Source of truth | What each stage deploys | Deployment mechanism | Per-stage configuration | Best for |
|---|---|---|---|---|---|
| [1 - Per-stage Git branches](#option-1---definition-based-deployments-from-per-stage-git-branches) | Git | The stage's own primary branch | [Git integration](./git-integration/intro-to-git-integration.md), [fabric-cicd](https://microsoft.github.io/fabric-cicd), or [Fabric Items APIs](/rest/api/fabric/core/items) | Stage-specific definitions, fabric-cicd parameterization, or Variable Library value sets | Teams that promote changes through a separate branch for each stage |
| [2 - Shared release commit](#option-2---definition-based-deployments-from-a-shared-release-commit) | Git (*Dev* for ongoing work, *Main* for releases)¹ | The same release tag on *Main*, first in *Test*, then in *Prod* after validation and approval | [fabric-cicd](https://microsoft.github.io/fabric-cicd) or [Bulk Import Item Definitions API](/rest/api/fabric/core/items/bulk-import-item-definitions) | fabric-cicd parameterization, custom scripts, and Variable Library value sets | Teams that deploy a shared release version to Test and Prod rather than maintaining a branch per stage |
| [3 - Deployment pipelines](#option-3---deploy-using-fabric-deployment-pipelines) | Fabric workspace (Git only through *dev*) | The content of the previous stage's workspace | [Fabric UI](./deployment-pipelines/get-started-with-deployment-pipelines.md) or [Deployment pipelines APIs](/rest/api/fabric/core/deployment-pipelines) | Deployment rules and autobinding | Teams that prefer a Fabric-native, low-code deployment between workspaces |
| [4 - CI/CD for ISVs](#option-4---cicd-for-isvs-in-fabric-managing-multiple-customerssolutions) | Git (*Dev* for ongoing work, *Main* for releases) | The same release tag on *Main*, first in shared *Test*, then in each customer's *Prod* workspace after validation and approval | [fabric-cicd](https://microsoft.github.io/fabric-cicd) or [Bulk Import Item Definitions API](/rest/api/fabric/core/items/bulk-import-item-definitions) (per customer workspace) | Per-customer release parameters | ISVs that manage many per-customer workspaces |

¹ In option 2, only the *Dev* workspace is connected to Git. The *Test* and *Prod*
workspaces aren't connected to Git. Pushing a release tag on *Main* triggers a
pipeline that deploys that version to *Test*. After successful validation and
approval, the pipeline deploys the same tag and commit SHA to *Prod*.

These options don't require a specific branching strategy, such as Gitflow or trunk-based development. What matters is that each stage deploys a known, versioned commit, and that *Prod* receives the same content that you tested.

Options 1 and 2 differ in how you organize and promote releases, not in an
exclusive choice of tools. Both options can use fabric-cicd or Fabric Items APIs and
environment-specific parameterization. Option 1 promotes changes through separate
stage branches. Option 2 uses a release tag on *Main* to trigger deployment of the
same commit to *Test* and, after validation and approval, to *Prod*.

A [deployment plan](./deployment-plan/deployment-plan-overview.md) isn't a separate
workflow option. You can use a plan with supported Git operations in option 1, with
deployment pipelines in option 3, or by calling the
[Bulk Import Item Definitions API](./deployment-plan/deployment-plan-automation.md)
directly in options 1, 2, and 4. The `fabric-cicd` library doesn't support deployment
plans, including when you use its bulk import mode. The plan controls deployment
order, dependencies, and actions, while the selected workflow continues to define
the source of truth, what each stage deploys, and stage configuration.

<a id="option-1---definition-based-deployments-using-git-integration"></a>

### Option 1 - Definition-based deployments from per-stage Git branches

:::image type="content" source="./media/manage-deployment/git-based-deployment.png" alt-text="Diagram with separate workspace and Git branch rows. PRs promote changes from feature to dev, test, and prod branches, and each stage deploys its own branch using Git integration or Item APIs." lightbox="./media/manage-deployment/git-based-deployment.png":::

With this option, all deployments originate from Git. Each stage has a dedicated
primary branch: *Dev*, *Test*, and *Prod* in this example. PRs promote changes
between those branches, and each workspace receives the definitions from its
stage's branch. You can deploy with Git integration, fabric-cicd, or Fabric Items
APIs. When you use fabric-cicd or Items APIs, the target workspace doesn't need a
Git connection. The defining feature is the separate branch for each stage, not
the deployment tool.

Once a PR to the *Dev* branch is approved and merged:

1. Update the *Dev* workspace from the *Dev* branch, for example with Git
   integration. Run unit tests and any required post-deployment operations.
1. Create a PR to the *Test* branch with the changes you want to promote. You can
   use a release branch to cherry-pick those changes. Apply your team's review
   and approval processes.
1. Deploy a specific commit from the *Test* branch to the *Test* workspace by
   using Git integration, fabric-cicd, or Fabric Items APIs. Apply stage-specific
   configuration and run automated or manual tests.
1. Create a PR to the *Prod* branch that promotes the validated changes. Review
   the resulting definitions to ensure that they match the tested release,
   except for intentional stage-specific configuration. If you add other changes,
   validate them in *Test* before promotion.
1. After approval, deploy the *Prod* branch to the *Prod* workspace by using your
   selected deployment tool. Run the required post-deployment checks and data
   ingestion operations.

Some item dependencies bind automatically through logical IDs. Others need
parameterization or post-deployment updates. For details, see
[Understand dependency binding in cross-workspace deployment](./cross-workspace-dependency-binding.md).

#### Which components can be used to implement option #1?

* [Git integration](./git-integration/intro-to-git-integration.md): Connect each
  workspace to its stage branch. Update it through the Fabric UI or automate
  updates with the [Fabric Git APIs](/rest/api/fabric/core/git/update-from-git).
* [fabric-cicd](https://microsoft.github.io/fabric-cicd): Check out the stage's
  branch and publish its item definitions with environment-specific parameters.
  The target workspace doesn't need a Git connection.
* [Fabric Items APIs](/rest/api/fabric/core/items): Deploy definitions from the
  stage's branch by calling Create item and Update item definition, or the
  [Bulk Import Item Definitions API](/rest/api/fabric/core/items/bulk-import-item-definitions).
  When you call APIs directly, your automation prepares the definitions and
  stage-specific configuration.

For implementation examples, see the
[fabric-cicd and Azure DevOps tutorial](./tutorial-fabric-cicd-azure-devops.md)
or [Fabric CI/CD with Bulk Import Item Definitions API](./tutorial-bulkapi-cicd.md).

#### When should you consider using option #1?

* When you want to use your Git repo as the single source of truth, and the origin of all deployments.
* When you want a separate primary branch for each stage, with PR-based review
  and promotion between stages.
* When you want to manage stage-specific definitions in Git, or apply
  environment-specific configuration with your selected deployment tool.

<a id="option-2---definition-based-deployments-using-fabric-items-apis"></a>

### Option 2 - Definition-based deployments from a shared release commit

:::image type="content" source="./media/manage-deployment/git-build.png" alt-text="Diagram showing a release tag on main triggering deployment to Test, with successful tests and approval gating deployment of the same tag and commit SHA to Prod through Item APIs." lightbox="./media/manage-deployment/git-build.png":::

With this option, developers work on a *Dev* branch that's connected to the *Dev*
workspace. The *Main* branch is the release branch: it contains only the changes
that you choose to release. The *Test* and *Prod* workspaces aren't connected to Git.
Pushing a release tag on *Main* triggers a GitHub Actions workflow or Azure DevOps
pipeline. It deploys the tagged version to *Test*, runs validation, and waits for
production approval before deploying the same tag and commit SHA to *Prod*. The
pipeline might use a build environment to run unit tests and adjust item definitions
before uploading them. For example, you might change data source connections, references
to other items, or parameter values for the target stage. Not all item dependencies
require these changes. Some bind automatically through logical IDs when deployed
to a new workspace. For details, see
[Understand dependency binding in cross-workspace deployment](./cross-workspace-dependency-binding.md).

The release flow works as follows:

1. Developers merge approved PRs into the *Dev* branch, and the *Dev* workspace is updated from Git.
1. To prepare a release, create a PR that cherry-picks the changes you want to release from *Dev* into *Main*. The PR should include the same review and approval processes as any other PR in your team or organization.
1. Create a release tag on the chosen commit on *Main*, for example `v1.5.0`.
   Push the tag to trigger a GitHub Actions workflow or Azure DevOps pipeline
   configured for release tags.
1. The pipeline resolves the tag to a commit SHA, records both, checks out that
   commit, runs unit tests, and adjusts the configuration for *Test*. It uploads
   those item definitions into the *Test* workspace by using
   [fabric-cicd](https://microsoft.github.io/fabric-cicd) or the
   [Bulk Import Item Definitions API](/rest/api/fabric/core/items/bulk-import-item-definitions).
   For details, see
   [Which components can be used to implement option #2?](#which-components-can-be-used-to-implement-option-2).
   Run automated or manual tests after deployment. If validation fails, stop
   promotion to *Prod*.
1. After validation succeeds, the pipeline waits at a configured production
   approval gate. Use a GitHub environment approval or an Azure DevOps environment
   approval check.
1. After approval, deploy the same release tag and recorded commit SHA to *Prod*.
   Only per-stage configuration, such as Variable Library value sets or parameter
   files, differs from *Test*. Run production-specific checks and trigger any data
   ingestion that the change requires to minimize unavailability for consumers.

> [!IMPORTANT]
> Deploy to *Prod* the exact commit that you tested in *Test*. Reuse the recorded
> commit SHA, even if *Main* advances. Don't move or reuse a release tag to point
> to a different commit.

If validation fails, make the fix in *Dev* first, and then cherry-pick it into
*Main*. Create a new release tag and repeat the pipeline, including Test
validation. This approach also ensures that future releases from *Dev* include the fix.

For traceability, configure deployment jobs to target the corresponding GitHub
or Azure DevOps environments. Include the release tag and resolved commit SHA in
each deployment record so you can identify which version reached *Test* and
*Prod*. A Git tag alone doesn't record where a version was deployed.

#### Which components can be used to implement option #2?
* [Fabric-cicd](https://microsoft.github.io/fabric-cicd) - a Python library designed for use with Microsoft Fabric workspaces. This library supports code-first Continuous Integration / Continuous Deployment (CI/CD) automations to seamlessly integrate workspaces into a deployment framework. For a complete end-to-end example follow our [fabric-cicd and Azure DevOps tutorial](tutorial-fabric-cicd-azure-devops.md). fabric-cicd supports two publish modes:
  * **Item definition APIs (default)**: Publishes items one at a time by using the Fabric [Create item](/rest/api/fabric/core/items/create-item) and [Update item definition](/rest/api/fabric/core/items/update-item-definition) APIs.
  * **Bulk import (experimental)**: Publishes all items in a single call by using the [Bulk Import Item Definitions API](/rest/api/fabric/core/items/bulk-import-item-definitions). To use this mode, enable the `enable_experimental_features` and `enable_bulk_publish` feature flags. For more information, see [fabric-cicd bulk publish](https://microsoft.github.io/fabric-cicd/latest/how_to/optional_feature/#bulk-publish).
* [Bulk-Import-Item-Definitions-API](/rest/api/fabric/core/items/bulk-import-item-definitions) - The API supports both creating new items and updating existing ones in place, while relying on Fabric’s built‑in dependency handling to ensure items are deployed in the correct order. This enables consistent, repeatable deployments into test and production environments without manual intervention. For a sample tutorial follow our [Fabric CI/CD with Bulk Import Item Definitions API](tutorial-bulkapi-cicd.md).

#### When should you consider using option #2?

* When you need environment-specific parameterization of item definitions before
  deployment. The
  [fabric-cicd parameterization](https://microsoft.github.io/fabric-cicd/latest/how_to/parameterization/)
  feature uses a `parameter.yml` file to replace values for each target environment,
  including connection IDs and lakehouse IDs, without maintaining separate item
  definitions for each stage. It supports find-and-replace operations, replacement
  of values selected by JSON paths, and dynamic resolution of target workspace
  item IDs. This capability is also available in option 1 when you use fabric-cicd.
  Git integration alone doesn't provide this deployment-time substitution.
* When you want to use Git as your single source of truth, and the origin of all deployments.
* When you want to choose which changes go into each release, and deploy a tagged, tested version to *Prod*.

### Option 3 - Deploy using Fabric deployment pipelines

:::image type="content" source="./media/manage-deployment/deployment-pipelines.png" alt-text="Diagram with separate workspace and Git rows. Feature and dev workspaces sync with Git branches, while deployment pipelines promote workspace content from Dev to Test to Prod without Test or Prod branches." lightbox="./media/manage-deployment/deployment-pipelines.png":::

With this option, Git is connected only until the *dev* stage. From the *dev* stage, deployments happen directly between the workspaces of *Dev/Test/Prod*, using Fabric deployment pipelines. You can deploy between stages directly from the [Fabric UI](./deployment-pipelines/deploy-content.md), or use the [deployment pipelines APIs](/rest/api/fabric/core/deployment-pipelines) to orchestrate the deployment as part of your Azure release pipeline, or a GitHub workflow. These APIs enable the team to build a similar *build* and *release* process as in other options, by using automated tests (that can be done in the workspace itself, or before *dev* stage), approvals etc.

When the deployment requires a specific order, related items, or actions, you can [attach a deployment plan](./deployment-plan/deployment-plan-attach.md) to a deployment between stages. Deployment rules and autobinding continue to manage stage-specific configuration.

When you approve and merge a PR to the branch connected to the *Dev* workspace:

1. Update the *Dev* workspace from Git by using the Fabric UI or the
   [Fabric Git APIs](/rest/api/fabric/core/git/update-from-git?tabs=HTTP).
   Run any required post-update operations and tests.
1. Deploy the changes from *Dev* to *Test* by using Fabric deployment pipelines,
   either from the Fabric UI or through the deployment pipelines APIs. Run
   automated or manual tests in *Test* before promoting the changes to *Prod*.
1. After tests pass and the release manager approves, deploy the validated content
   from *Test* to *Prod*. Don't update the selected content in *Test* between
   validation and deployment to *Prod* without testing it again.

You can perform these steps from the Fabric UI or automate them with APIs in Azure
Pipelines or GitHub Actions. You don't need external build and release pipelines
for the UI-based workflow.

#### When should you consider using option #3?

* When your team prefers Fabric's built-in deployment experience and its
  capabilities meet your deployment needs. You can deploy between workspaces from
  the Fabric UI without maintaining external release pipelines, and use APIs for
  automation when needed. This approach can also suit teams with limited
  experience with DevOps tools, such as Azure Pipelines or GitHub Actions.
* When you're using source control only for development purposes, and prefer to deploy changes directly between stages of the release pipeline.
* When deployment rules, autobinding and other available APIs are sufficient to manage the configurations between the stages of the release pipeline.
* When you want to use other functionalities of Fabric deployment pipelines, such as viewing changes in Fabric, deployment history etc.
* Consider also that deployments in Fabric deployment pipelines have a linear structure, and require other permissions to create and manage the pipeline.

### Option 4 - CI/CD for ISVs in Fabric (managing multiple customers/solutions)

:::image type="content" source="./media/manage-deployment/software-vendors.png" alt-text="Diagram showing a release tag triggering shared Test deployment, followed by validation and approval before deploying the same tag and SHA to multiple customer Prod workspaces with customer-specific parameters." lightbox="./media/manage-deployment/software-vendors.png":::

This option is different from the others. It's most relevant for Independent Software Vendors (ISV) who build SaaS applications for their customers on top of Fabric. ISVs usually have a separate workspace for each customer and can have as many as several hundred or thousands of workspaces. When the structure of the analytics provided to each customer is similar and out-of-the-box, we recommend having a centralized development and testing process that splits off to each customer only in the *Prod* stage.

This option is based on [option #2](#option-2---definition-based-deployments-using-fabric-items-apis):

1. Developers work on the *Dev* branch and *Dev* workspace, and cherry-pick the changes they want to release from *Dev* into *Main*, as described in option #2.
1. Create and push a release tag on the chosen commit on *Main*, for example
   `v1.5.0`. The tag triggers a GitHub Actions workflow or Azure DevOps pipeline.
1. The pipeline resolves the tag to a commit SHA, records both, runs unit tests,
   and adjusts the tagged definitions for shared *Test*. It deploys them by using
   [fabric-cicd](https://microsoft.github.io/fabric-cicd) or the
   [Bulk Import Item Definitions API](/rest/api/fabric/core/items/bulk-import-item-definitions),
   as described in [option #2](#which-components-can-be-used-to-implement-option-2).
   Run automated or manual tests after deployment. If validation fails, stop
   promotion, fix the issue in *Dev*, bring the fix into *Main*, and create a new
   tag for another run.
1. After validation succeeds and the configured production approval is granted,
   deploy the same tag and recorded commit SHA to each customer's *Prod* workspace.
   Apply customer-specific parameters and connections before deployment or
   through post-deployment APIs. Independent customer deployments can run in
   parallel. Record the tag, commit SHA, and customer target in the environment
   deployment history so each customer's deployed version is traceable.

#### When should you consider using option #4?

* You're an ISV building applications on top of Fabric.
* You're using different workspaces for each customer to manage the multi-tenancy of your application
* For more separation, or for specific tests for different customers, you might want to have multi-tenancy in earlier stages of *dev* or *test*. In that case, consider that with multi-tenancy the number of workspaces required grows significantly.

## Summary

This article summarizes the main CI/CD options for a team who wants to build an automated CI/CD process in Fabric. While we outline four options, the real-life constraints and solution architecture might lend themselves to hybrid options, or completely different ones. You can use this article to guide you through different options and how to build them, but you're not forced to choose only one of the options.

Some scenarios or specific items might have [limitations in place](./deployment-pipelines/understand-the-deployment-process.md#considerations-and-limitations) that can keep you from adopting any of these scenarios.

The same goes for tooling. While we mention different tools here, you might choose other tools that can provide same level of functionality. Consider that Fabric has better integration with some tools, so choosing others result in more limitations that need different workarounds.

## Related content

* [Development process in Microsoft Fabric](./git-integration/manage-branches.md)
* [Automate Git integration by using APIs and Azure DevOps](./git-integration/git-automation.md)
* [Automate deployment pipeline by using Fabric APIs](./deployment-pipelines/pipeline-automation-fabric.md)
* [Understand dependency binding in cross-workspace deployment](./cross-workspace-dependency-binding.md)
* [What is a deployment plan in Microsoft Fabric?](./deployment-plan/deployment-plan-overview.md)
