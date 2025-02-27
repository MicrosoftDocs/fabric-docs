---
title: Spark Job Definition Deployment Pipeline Support
description: Learn about Spark job definition Deployment Pipeline integration, including how to set up a deploy SJD cross different stages.
ms.reviewer: snehagunda
ms.author: qixwang
author: qixwang
ms.topic: conceptual
ms.date: 02/21/2025
ms.search.form: Spark Job Definition deployment pipeline
---

# spark job definition deployment pipeline integration 

This article explains how Deployment pipeline integration for Spark Job Definitions (SJD) in Microsoft Fabric works. Learn how to use Deployment pipelines to deploy your Spark job definitions across different environments/workspaces and synchronize changes between them.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Detail steps to deploy spark job definition

 Follow the steps to deploy your Spark job definitions via Deployment pipelines.

1. Create a Deployment pipeline or open an existing one. For more information, see [Get started with deployment pipeline](../cicd/deployment-pipelines/get-started-with-deployment-pipelines.md).

2. Assign workspaces to different stages according to your deployment goals.

3. Select the items including Spark job definitions you want to deploy in the source stage, you can easily identify the differences between the source and target stages with the column **Compared to source**.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-view.png" alt-text="Screenshot of deployment pipeline view." :::

4. Click **Deploy** to deploy the selected items such as Spark job definitions to the target stage.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deploy.png" alt-text="Screenshot of run deployment." :::

5. (Optional) You can create Deployment rule to overwrite the default bindings between Spark Job Definition and other items in the target stage.
    By default, if all the items are deployed, in the target stage, the bindings between Spark Job Definition and other items are automatically created. If Lakehouse isn't deployed, in the target stage, the Spark Job Definition item is associated with the Lakehouse in the source stage. Click **Deployment rules** to create a Deployment rule.

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule.png" alt-text="Screenshot of deployment rule." :::

    You can create separate Deployment rule for default Lakehouse and Additional Lakehouse.Three options are available: Same with source Lakehouse, N/A(No Lakehouse), and other Lakehouse

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-type.png" alt-text="Screenshot of deployment rule type." :::

    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-options.png" alt-text="Screenshot of deployment rule options." :::

    To overwrite the default binding, provide the Lakehouse ID, Lakehouse name, and the workspace ID where the target Lakehouse belong to.
    :::image type="content" source="media\spark-job-definition-deployment-pipeline\spark-job-definition-deployment-rule-detail.png" alt-text="Screenshot of deployment rule detail." :::

    After the deployment rule is updated, you need to run the deployment again to see the effect.

    > [!NOTE]
    > Make sure the **Lakehouse ID**, **Lakehouse Name**, and **LakehouseWorksapce ID** should match with each other. You can get the Lakehouse ID and Lakehouse workspace ID from the item URL link.

## Related content

- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
