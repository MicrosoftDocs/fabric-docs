---
title: Spark Job Definition deployment pipeline support
description: Learn about Spark job definition deployment pipeline integration, including how to set up a deploy SJD cross different stages.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: conceptual
ms.date: 03/31/2025
ms.search.form: Spark Job Definition deployment pipeline
---

# Spark job definition deployment pipeline integration (Preview)

This article explains how deployment pipeline integration works for Spark Job Definitions (SJD) in Microsoft Fabric. Learn how to use Deployment pipelines to deploy your Spark job definitions across different environments/workspaces and synchronize changes 
between them.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Deploy a spark job definition

Use the following steps to deploy Spark Job Definitions using deployment pipelines:

1. Sign into the [Fabric portal](https://app.fabric.microsoft.com/).

1. Create a new deployment pipeline or open an existing one. For more information, see [Get started with deployment pipeline](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

1. [Assign workspaces to different stages](../cicd/deployment-pipelines/assign-pipeline.md) based on your deployment needs.

1. Select items to deploy, including Spark Job Definitions. Use the **Compared to source** column to identify differences between source and target stages.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-view.png" alt-text="Screenshot of deployment pipeline view." :::

1. Select **Deploy** to deploy selected items to the target stage.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deploy.png" alt-text="Screenshot of run deployment." :::

1. Optionally. You can create deployment rule to overwrite the default bindings between Spark Job Definition and other items in the target stage.

   * If all the items are deployed, the bindings between Spark Job Definition and other items are automatically created in the target stage. However if the lakehouse isn't deployed, the Spark Job Definition links to the source stage lakehouse. To modify this behavior, create a new deployment rule. Select **Deployment rules** and then select the Spark Job Definition item to create a rule.

      :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule.png" alt-text="Screenshot of deployment rule." :::

    * You can create separate deployment rule for the default lakehouse and additional lakehouse. Choose from the three options: **Same as source Lakehouse**, **N/A (No lakehouse)**, or **other** to manually enter the lakehouse information.

      :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-type.png" alt-text="Screenshot of deployment rule type." :::

      :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-options.png" alt-text="Screenshot of deployment rule options." :::

    * To overwrite the default binding, provide the **LakehouseId**, **LakehouseName**, and the **WorkspaceId** where the target Lakehouse belong to. Make sure the **LakehouseId**, **LakehouseName**, and **LakehouseWorksapceId** correspond to each other. You can get the Lakehouse ID and Lakehouse workspace ID from the item URL link.

      :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-detail.png" alt-text="Screenshot of deployment rule detail." :::

1. Once the deployment rule is updated, rerun the deployment to apply the changes


## Related content

* [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
