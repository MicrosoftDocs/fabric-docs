---
title: Spark Job Definition deployment pipeline support
description: Learn about Spark job definition deployment pipeline integration, including how to set up and deploy SJDs across different stages.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.date: 03/31/2025
ms.search.form: Spark job definition deployment pipeline
---

# Spark job definition deployment pipeline integration (preview)

This article explains how deployment pipeline integration works for Spark job definitions (SJDs) in Microsoft Fabric. Learn how to use deployment pipelines to deploy your SJDs across different environments/workspaces and synchronize changes between them.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Deploy a Spark job definition

Complete the following steps to deploy SJDs using deployment pipelines:

1. Sign in to the [Fabric portal](https://app.fabric.microsoft.com/).

1. Create a new deployment pipeline or open an existing one. For more information, see [Get started with deployment pipelines](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

1. [Assign workspaces to different stages](../cicd/deployment-pipelines/assign-pipeline.md) based on your deployment needs.

1. Select items to deploy, including SJDs. Use the **Compared to source** column to identify differences between source and target stages.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-view.png" alt-text="Screenshot of deployment pipeline view." lightbox="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-view.png":::

1. Select **Deploy** to deploy selected items to the target stage.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deploy.png" alt-text="Screenshot of run deployment." lightbox="media\spark-job-definition-deployment-pipeline\spark-job-definition-deploy.png":::

1. Optionally, you can create a deployment rule to overwrite the default bindings between the SJD and other items in the target stage.

   * If all the items are deployed, the bindings between the SJD and other items are automatically created in the target stage. However, if the lakehouse isn't deployed, the SJD links to the source stage lakehouse. To modify this behavior, create a new deployment rule. Select **Deployment rules**, then select the SJD item to create a rule.

      :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule.png" alt-text="Screenshot of deployment rule." lightbox="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule.png":::

    * You can create separate deployment rules for the default lakehouse and additional lakehouses. Choose from the three options: **Same as source Lakehouse**, **N/A (No lakehouse)**, or **other** to manually enter the lakehouse information.

  :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-type.png" alt-text="Screenshot of deployment rule type." lightbox="media/spark-job-definition-deployment-pipeline/spark-job-definition-deployment-rule-type.png":::

  :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-options.png" alt-text="Screenshot of deployment rule options." lightbox="media/spark-job-definition-deployment-pipeline/spark-job-definition-deployment-rule-options.png":::

  * To overwrite the default binding, provide the **LakehouseId**, **LakehouseName**, and the **WorkspaceId** for the target lakehouse. Make sure the LakehouseId, LakehouseName, and LakehouseWorksapceId values correspond to each other. You can get the LakehouseId and LakehouseWorkspaceId values from the item URL link.

  :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-detail.png" alt-text="Screenshot of deployment rule detail." lightbox="media/spark-job-definition-deployment-pipeline/spark-job-definition-deployment-rule-detail.png":::

1. Once the deployment rule is updated, rerun the deployment to apply the changes.

## Related content

* [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
