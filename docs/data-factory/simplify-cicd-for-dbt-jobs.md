---
title: Configure CI/CD for dbt Jobs Using Variable Library
description: Learn how to deploy a dbt job across development, test, and production workspaces by using Variable Library in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: meghasony
ms.service: fabric
ms.subservice: data-factory
ms.topic: how-to
ms.date: 09/04/2026
ai-usage: ai-assisted
---

# Configure CI/CD for dbt jobs using Variable Library

Organizations often use separate development, test, and production environments to support continuous integration and continuous delivery (CI/CD) for dbt workloads. Although the dbt project remains unchanged, its adapter configuration must reference the resources available in each environment.

Variable Library separates environment-specific adapter values from the dbt job definition. After the initial configuration, the active value set in each workspace resolves the appropriate adapter settings. You can deploy the same dbt job across environments without reconfiguring supported fields after each deployment.

This article uses the Jaffle Shop sample project and the Microsoft Fabric Data Warehouse adapter. Variable Library-enabled fields differ by adapter.

## Prerequisites

Before you begin, ensure you have:

- Permission to create Fabric items.
- Access to [Fabric deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md).
- Permission to create and modify workspaces, warehouses, variable libraries, and dbt jobs.

## Create the workspaces and warehouses

1. Create three Fabric workspaces:

   - `dbt-vl-dev`
   - `dbt-vl-test`
   - `dbt-vl-prod`

1. In each workspace, create a Fabric Data Warehouse named `jaffle_wh`.
1. In each warehouse, use the same schema name. This article uses the `dbo` schema.

> [!IMPORTANT]
> The connection name and schema name aren't variable-enabled. Use the same connection name and schema name across development, test, and production.

## Collect the warehouse values

For each warehouse, collect the values that identify it in its workspace:

1. Open the warehouse.
1. From the browser URL, copy the workspace ID, which follows `/groups/`.
1. From the same URL, copy the warehouse ID, which follows `/warehouses/`.
1. In the lower-left corner of the warehouse page, select **Copy SQL connection string**.

   :::image type="content" source="media/simplify-cicd-for-dbt-jobs/warehouse-resource-identifiers.png" alt-text="Screenshot of a Fabric Data Warehouse with workspace and Warehouse IDs highlighted in the URL and Copy SQL connection string highlighted." lightbox="media/simplify-cicd-for-dbt-jobs/warehouse-resource-identifiers.png":::

Retain the three values for each environment so that you can add them to Variable Library.

## Create the Variable Library

1. In the `dbt-vl-dev` workspace, select **+ New item**.
1. Search for and select **Variable library**.
1. Create a Variable Library named `dbt_job_cicd_variables`.
1. Create the following String variables and enter the development environment values as their default values:

   | Variable | Default value |
   | --- | --- |
   | `workspaceID` | Development workspace ID |
   | `artifactID` | Development Warehouse ID |
   | `sqlEndpoint` | Development SQL connection string |

1. Create an alternative value set named `Test`, and enter the test environment values for all three variables.
1. Create another alternative value set named `Production`, and enter the production environment values for all three variables.
1. Save the Variable Library.

   :::image type="content" source="media/simplify-cicd-for-dbt-jobs/variable-library-value-sets.png" alt-text="Screenshot of a Variable Library with workspaceID, artifactID, and sqlEndpoint variables in Default, Test, and Production value sets." lightbox="media/simplify-cicd-for-dbt-jobs/variable-library-value-sets.png":::

For more information about creating variables and value sets, see [Variable Library value sets](../cicd/variable-library/value-sets.md).

## Create the dbt job

Create the dbt job in the development workspace and connect it to the development warehouse before you assign variable library references.

1. In the `dbt-vl-dev` workspace, select **+ New item**.
1. Search for **dbt job**, enter a name, and select **Create**.
1. Select **Practice with Sample Project**.
1. Select the **Jaffle Shop (Classic)** sample project.
1. Select **Select a Profile**.
1. Select the development warehouse named `jaffle_wh`.
1. For the schema, enter `dbo`.
1. Select **Connect**.

For more information about the sample, see [Practice with a sample dbt project](dbt-job-sample-tutorial.md).

## Assign the Variable Library references

1. After you create the dbt project, select **Adapter settings**.
1. Locate the warehouse adapter connection, and select **Edit connection**.

   :::image type="content" source="media/simplify-cicd-for-dbt-jobs/edit-warehouse-adapter-connection.png" alt-text="Screenshot of dbt Adapter settings with the Edit connection menu showing variables for the workspace ID, Warehouse ID, and SQL connection string." lightbox="media/simplify-cicd-for-dbt-jobs/edit-warehouse-adapter-connection.png":::

1. Assign the following Variable Library references:

   | Adapter field | Variable Library reference |
   | --- | --- |
   | **Workspace ID** | `workspaceID` |
   | **Warehouse ID** | `artifactID` |
   | **SQL connection string** | `sqlEndpoint` |

1. Keep the connection name as `jaffle_wh` and the schema as `dbo`.
1. Save the configuration.

   :::image type="content" source="media/simplify-cicd-for-dbt-jobs/assign-variable-library-references.png" alt-text="Screenshot of dbt adapter settings with variable library references assigned to the three warehouse connection fields." lightbox="media/simplify-cicd-for-dbt-jobs/assign-variable-library-references.png":::

## Verify the dbt job in development

1. Run the dbt job with the default **Build** command.
1. Confirm that the run succeeds.
1. In the `jaffle_wh` warehouse, confirm that the Jaffle Shop models are created in the `dbo` schema.

## Deploy the dbt job to test

1. Create a deployment pipeline with **Development**, **Test**, and **Production** stages.
1. Assign the workspaces to the corresponding stages:

   | Stage | Workspace |
   | --- | --- |
   | **Development** | `dbt-vl-dev` |
   | **Test** | `dbt-vl-test` |
   | **Production** | `dbt-vl-prod` |

1. Deploy the dbt job and Variable Library from **Development** to **Test**.

   :::image type="content" source="media/simplify-cicd-for-dbt-jobs/deploy-dbt-job-and-variable-library.png" alt-text="Screenshot of a Fabric deployment pipeline with the dbt job and Variable Library selected for deployment from Development to Test." lightbox="media/simplify-cicd-for-dbt-jobs/deploy-dbt-job-and-variable-library.png":::

1. In `dbt-vl-test`, open the deployed Variable Library.
1. Set `Test` as the active value set.
1. Run the deployed dbt job.
1. Confirm that the Jaffle Shop models are created in the test warehouse.

The workspace ID, Warehouse ID, and SQL connection string resolve from the active `Test` value set.

## Deploy the dbt job to production

1. Deploy the dbt job and Variable Library from **Test** to **Production**.
1. In `dbt-vl-prod`, open the deployed Variable Library.
1. Set `Production` as the active value set.
1. Run the deployed dbt job.
1. Confirm that the Jaffle Shop models are created in the production warehouse.

All value sets deploy to every stage, but only one value set is active in each workspace. A newly deployed Variable Library initially uses its default value set. Later deployments don't overwrite the active value-set selection in the target workspace.

## Deploy a dbt job activity across environments
 
When you deploy a pipeline and its referenced dbt job together, the dbt job activity can use a relative reference to resolve the corresponding dbt job in the target workspace. You don't need to maintain environment-specific workspace or dbt job IDs for this scenario.
 
1. In the development workspace, create a pipeline and add a **dbt job** activity.
1. Configure the activity to use the dbt job in the development workspace.
1. Deploy the pipeline and the referenced dbt job together from **Development** to **Test**.
1. In the test workspace, open the deployed pipeline and verify that the dbt job activity references the corresponding dbt job in the test workspace.
1. Run the pipeline and confirm that the dbt job completes successfully.
1. Repeat the deployment from **Test** to **Production**.

The pipeline-to-dbt job reference resolves in the target workspace through relative reference. The deployed dbt job then uses the active Variable Library value set to resolve the environment-specific adapter configuration.
## Limitations

- Assign Variable Library references through **Edit connection**. During the initial dbt project setup, select the development warehouse and complete the connection first.
- The connection name and schema name aren't variable-enabled. Use the same values across all deployment environments.

## Related content

- [What is a variable library?](../cicd/variable-library/variable-library-overview.md)
- [Tutorial: Use variable libraries to customize and share item configurations](../cicd/variable-library/tutorial-variable-library.md)
- [Variable library CI/CD](../cicd/variable-library/variable-library-cicd.md)
- [Introduction to deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
- [Configure a dbt job in Microsoft Fabric](dbt-job-configure.md)
- [Variable library integration with pipelines](variable-library-integration-with-data-pipelines.md)
