---
title: Automate deployment pipeline by using Fabric APIs
description: Learn how to automate your deployment pipeline, the Microsoft Fabric Application lifecycle management (ALM) tool, by using Fabric APIs.
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.date: 05/09/2024
#customer intent: As a developer, I want to automate my deployment pipeline using Fabric APIs so that I can streamline the release process.
---

# Automate your deployment pipeline with Fabric APIs

The Microsoft Fabric [deployment pipelines](intro-to-deployment-pipelines.md) tool enables teams to build an efficient and reusable release process for their Fabric content.

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

Use the [deployment pipelines Fabric REST APIs](/rest/api/fabric/core/deployment-pipelines) to integrate Fabric into your organization's automation process. Here are a few examples of what can be done by using the APIs:

* Integrate Fabric into familiar DevOps tools such as Azure DevOps or GitHub Actions.

* Schedule pipeline deployments to happen automatically at a specific time.

* Deploy multiple pipelines at the same time.

* Cascade depending on pipeline deployments. If you have content connected across pipelines, you can make sure some pipelines are deployed before others.

## Prerequisites

To work with deployment pipeline APIs, you need the following prerequisites:

* The same [prerequisites you need to use deployment pipelines](./get-started-with-deployment-pipelines.md#prerequisites).
* A Microsoft Entra token for Fabric service. Use that token in the authorization header of the API call. For information about how to get a token, see Fabric API quickstart.

You can use the REST APIs without PowerShell, but the scripts in this article use PowerShell. To run the scripts, you need to install the following programs:

* [PowerShell](/powershell/scripting/install/installing-powershell)
* [Azure PowerShell Az module](/powershell/azure/install-azure-powershell)

## Deployment pipelines API functions

The [deployment pipelines Fabric REST APIs](/rest/api/fabric/core/deployment-pipelines) allow you to perform the following functions:

* [Get Deployment Pipeline](/rest/api/fabric/core/deployment-pipelines/get-deployment-pipeline): Returns information about the specified deployment pipeline.
* [List Deployment Pipelines](/rest/api/fabric/core/deployment-pipelines/list-deployment-pipelines): Returns a list of deployment pipelines that the user has access to.
* [Get Deployment Pipeline Stages](/rest/api/fabric/core/deployment-pipelines/get-deployment-pipeline-stages): Returns the stages of the specified deployment, including its ID, display name, description, and whether the stage is public or not.
* [Get Deployment Pipeline Stage Items](/rest/api/fabric/core/deployment-pipelines/get-deployment-pipeline-stage-items): Returns the supported items from the workspace assigned to the specified stage of the specified deployment pipeline.
* [Deploy Stage Content](/rest/api/fabric/core/deployment-pipelines/deploy-stage-content): Deploys items from the specified stage of the specified deployment pipeline.

  * Use this API to deploy all items or to select specific items to deploy. If no specific items are selected, all items are deployed.
  * To find the relevant stage ID to deploy, use the [Get Deployment Pipeline Stages](/rest/api/fabric/core/deployment-pipelines/get-deployment-pipeline-stages) API.
  * This API is integrated with the [Long Running Operations APIs](/rest/api/fabric/core/long-running-operations) to monitor the deployment status.

    * Get the operation state to see if the operation is complete with the [Get Long Running  - Get Operation state](/rest/api/fabric/core/long-running-operations/get-operation-state) API.
    * For 24 hours after the deployment is completed, the extended deployment information is available in the[Get Operation Result](/rest/api/fabric/core/long-running-operations/get-operation-result) API.

You can also use other [Fabric REST API](/rest/api/fabric/) calls, to complete related operations.

## PowerShell examples

You can use the following PowerShell scripts to understand how to perform several automation processes. To view or copy the text in a PowerShell sample, use the links in this section.

* [Deploy all](https://github.com/microsoft/fabric-samples/blob/main/features-samples/fabric-apis/DeploymentPipelines-DeployAll.ps1)

  Provide the following information:

  * Pipeline name
  * Source stage name
  * Target stage name
  * Deployment notes (optional)

* [Selective deploy](https://github.com/microsoft/fabric-samples/blob/main/features-samples/fabric-apis/DeploymentPipelines-SelectiveDeploy.ps1)

  Provide the following information:

  * Pipeline name
  * Source stage name
  * Target stage name
  * Items to deploy (items display name and item type)
  * Deployment notes (optional)

## Considerations and limitations

When using the deployment pipelines APIs, consider the following limitations:

* All limitations that apply for deployment pipeline, apply when using the APIs. For more information, see [Deployment pipelines best practices](./understand-the-deployment-process.md#considerations-and-limitations).
* *Dataflows* are currently not supported. Customers using dataflows can use the [Power BI APIs](./pipeline-automation.md).
* Service principals are only supported for Power BI items.
* Not all deployment options available in the Power BI APIs are available in Fabric. The following APIs *aren't* available in Fabric's Deploy stage content API:

  * allowPurgeData
  * allowTakeOver
  * allowSkipTilesWithMissingPrerequisites

  If you need one of these APIs, use the [Power BI API](./pipeline-automation.md) to deploy. However, these APIs only work for Power BI items.

## Related content

* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
* [Deployment pipelines best practices](../best-practices-cicd.md)
* [Troubleshooting deployment pipelines](../troubleshoot-cicd.md)
