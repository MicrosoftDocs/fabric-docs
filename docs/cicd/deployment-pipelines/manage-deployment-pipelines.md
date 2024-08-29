---
title: Manage deployment pipelines
description: Learn about different options for building and using deployment pipelines based on customer experiences. 
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 06/06/2024
ms.custom:
  - build-2023
  - ignite-2023
#customer intent: As a developer, I want to learn how to use deployment pipelines in Fabric so that I can manage my development process efficiently.
---

# Develop with deployment pipelines

The goal of this article is to present Fabric developers with different options for building CI/CD processes in Fabric, based on common customer scenarios. This article focuses more on the *continuous delivery* (CD) of the CI/CD process. For a discussion on the *continuous integration* (CI) part, see [Git integration workspaces](../git-integration/manage-branches.md).

While this article outlines several distinct options, many organizations take a hybrid approach.

## Prerequisites

To access the deployment pipelines feature, you must meet the following conditions:

* You have a [Microsoft Fabric subscription](../../enterprise/licenses.md)

* You're an admin of a Fabric [workspace](../../get-started/create-workspaces.md)

## Development process

The development process is the same in all deployment scenarios, and is independent of how to release new updates into production. When working with source control, developers need an isolated environment to work in. In Fabric, that environment can either be an IDE in your local machine (such as Power BI Desktop, or VSCode), or a different workspace in Fabric. You can find information about the different considerations for the development process in [Git integration workspaces](../git-integration/manage-branches.md)

:::image type="content" source="./media/manage-deployment-pipelines/development-process.png" alt-text="Diagram showing how the development process works.":::

## Release process

The release process starts once new updates are complete and the Pull Request merged into the team’s shared branch (such as *Main*, *Dev* etc.). From this point, there are different options to build a release process in Fabric.

### Scenario 1 - Git- based deployments

:::image type="content" source="./media/manage-deployment-pipelines/git-based-deployment.png" alt-text="Diagram showing how the git based deployment works.":::

In this scenario, all deployments originate from the git repository. Each stage in the release pipeline has a dedicated primary branch (in the diagram, these stages are *Dev*, *Test*, and *Prod*), which feeds the appropriate workspace in Fabric. 

Once When a PR to the *Dev* branch is approved and merged:

1. A release pipeline is triggered to update the content of the *Dev* workspace. This process also can include a *Build* pipeline to run unit tests, but the actual upload of files is done directly from the repo into the workspace, using Fabric Git APIs. You might need to call additional Fabric APIs for post-deployment operations that set specific configurations for this workspace, or ingest data.  
1. After the update of *Dev* is complete, a PR is created to the *Test* branch. In most cases, this is done using a release branch that can cherry pick the content to move into the next stage. The PR should include the same review and approval processes as any other in your team or organization.
1. An additional *Build* and *release* pipeline is triggered to update the *Test* workspace, using a process similar to the one described in step #1.
1. A PR is created to *Prod* branch, using a process similar to the one described in step #2.
1. An additional *Build* and *release* pipeline is triggered to update the *Prod* workspace, using a process similar to the one described in step #1.

**When should you consider this option?**

This is a great option in the following circumstances:

* When you want to use your git repo as the single source of truth, and the origin of all deployments.
* If your team follows *Gitflow* as the branching strategy, including multiple primary branches.

The upload from the repo will be directly into the workspace, as we don’t need/use ‘build environments’ to alter the files before deployments. You can change this by calling APIs or running items in the workspace after deployment.

### Scenario 2 - Git- based deployments using Build environments

:::image type="content" source="./media/manage-deployment-pipelines/git-build.png" alt-text="Diagram showing the flow of git based deployment using build environments.":::

In this scenario, all deployments originate from the same branch of the git repository (*Main*). Each stage in the release pipeline has a dedicated *build* and *Release* pipeline, that might use a *Build environment* to run unit tests and scripts that change some of the definitions in the items before they are uploaded to the workspace. For example, you might want to change the data source connection, the connections between items in the workspace, or the values of parameters to adjust configuration for the right stage.

Once a PR to the *dev* branch is approved and merged:

1. A *build* pipeline is triggered to spin up a new *Build environment* and run unit tests for the *dev* stage. Then, a *release* pipeline is triggered to upload the content to a *Build environment*, run scripts to change some of the configuration, adjust the configuration to *dev* stage, and use Fabric’s [Update item definition](/rest/api/fabric/core/items/update-item) APIs to upload the files into the Workspace.
1. After this process is complete, including ingesting data and approval from release managers, the next *build* and *release* pipelines for *test* stage can kick off in a process similar to that described in step #1. For *test* stage, additional automated or manual tests might be required after the deployment, to validate the changes are ready to be released to *Prod* stage.
1. After all automated and manual tests are complete, the release manager can approve and kick off the *build* and *release* pipelines to *Prod* stage. As the *Prod* stage usually has different configurations than *test/Dev* stages, it's important to also test out the changes after the deployment. Also, the deployment should trigger any additional ingestion of data, based on the change, to minimize potential non availability to consumers.

**When should you consider this option?**

* When you want to use git as your single source of truth, and the origin of all deployments.
* When your team follows *Trunk-based* workflow as its branching strategy.

You are applying scripts to change the files themselves before uploading it to each stage, so you upload it first to *Build environment*, and from there update the workspace.

### Scenario 3 - Deploy using Fabric deployment pipelines

:::image type="content" source="./media/manage-deployment-pipelines/deployment-pipelines.png" alt-text="Diagram showing the flow of git based deployment using deployment pipelines.":::

In this scenario, git is connected only until the *dev* stage. From the *dev* stage, deployments happen directly between the workspaces of *Dev/Test/Prod*, using Fabric deployment pipelines. While the tool itself is internal to Fabric, developers can leverage the deployment [pipelines APIs](rest/api/fabric) to orchestrate the deployment as part of their Azure release pipeline, or a GitHub workflow. This enables the team to build a similar *build* and *release* process as in other options, by using automated tests (that can happen in the workspace itself, or before *dev* stage), approvals etc.

Once the PR to the *main* branch is approved and merged:

1. A *build* pipeline is triggered that uploads the changes to the *dev* stage using Fabric Git APIs. If necessary, the pipeline can trigger additional APIs to start post-deployment operations/tests in the *dev* stage.
1. After the *dev* deployment is completed, a release pipeline kicks in to deploy the changes from *dev* stage to *test* stage. Automated and manual tests should take place after the deployment, to ensure that the changes are well-tested before reaching production.
1. After tests are completed and the release manager has approved the deployment to *Prod* stage, the release to *Prod* kicks in and completes the deployment.

**When should you consider this option?**

* When you're using source control only for development purposes, and prefer to deploy changes directly between stages of the release pipeline.
* When deployment rules, auto-binding and other available APIs are sufficient to manage the configurations between the stages of the release pipeline.
* When you want to use the additional functionalities of Fabric deployment pipelines, such as viewing changes in Fabric, deployment history etc.  

### Scenario 4 - CI/CD for ISVs in Fabric (managing multiple customers/solutions)

:::image type="content" source="./media/manage-deployment-pipelines/isv.png" alt-text="Diagram showing the flow of git based deployment for ISVs.":::

The last scenario is different from the others. |It's more relevant for Independent Software Vendors (ISV) that build SaaS applications for their customers on top of Fabric. ISVs usually they have a separate workspace for each customer and can have as many as several hundred or thousands of workspaces. When the structure of the analytics provided to each customer is similar and out-of-the-box, it is recommended to have a centralized development and testing process that diverges to each customer only in *Prod* stage. This scenario is based on scenario #2. Once the PR to *main* branch is approved and merged:

1. A *build* pipeline is triggered to spin up a new *Build environment* and run unit tests for *dev* stage. When tests are complete, a *release* pipeline is triggered to upload the content to a *Build environment*, run scripts to change some of the configuration, adjust the configuration to *dev* stage, and then use Fabric’s [Update item definition](/rest/api/fabric/core/items/update-item) APIs to upload the files into the Workspace.
1. After this process is complete, including ingesting data and approval from release managers, the next *build* and *release* pipelines for *test* stage can kick off, in a process similar to that described in step #1. For *test* stage, additional automated or manual tests might be required after the deployment, to validate the changes are ready to be release to *Prod* stage in high-quality.
1. Once all tests have passed and the approval process is complete, the deployment to *Prod* customers can start. Each customer has its own release with its own parameters, so that its specific configuration and data connection can take place in the relevant customer’s workspace. The configuration change can happen through scripts in a *build* environment, or using APIs post deployment. All releases can happen in parallel as they are not related nor dependent of each other.

**When should you consider this option?**

* You're an ISV building applications on top of Fabric.
* You're using different workspaces for each customer to manage the multi-tenancy of your application

For additional separation, or for specific tests for different customers, you might want to have multi-tenancy in earlier stages of *dev* or *test*. In that case, consider that the number of workspaces required will grow significantly.

## Summary

This article summarizes the main CI/CD scenarios for a team who wants to build an automated CI/CD process in Fabric. While we outline 4 options, the real-life constraints and solution architecture might define hybrid scenarios, or completely different ones. Please use this article to guide you through different options and how to build them, but not as a strict way to work with Fabric that forces you to choose one of the 4 options.
Same goes for tooling- while we mention different tools here, you might choose other tools that can provide same level of functionality. Consider that Fabric has better integration with some tools, so choosing others might bring up more limitations that needs different solutions.

## Related content

* [Git integration branches](../git-integration/manage-branches.md)
* [Automate Git integration by using APIs and Azure DevOps](../git-integration/git-automation.md)
* [Automate deployment pipeline by using Fabric APIs](./pipeline-automation-fabric.md)
* [Best practices for lifecycle management in Fabric](../best-practices-cicd.md)
* [Power BI implementation planning: Deploy content]
