---
title: Create deployment rules for Fabric's ALM
description: Learn how to create rules to simplify deploying content with Fabric's Application lifecycle management (ALM) tool.
author: billmath
ms.author: billmath
ms.service: fabric
ms.subservice: cicd
ms.topic: concept-article
ms.custom:
ms.date: 10/27/2024
ms.search.form: Deployment rules
#customer intent: As a developer, I want to learn how to create deployment rules in Fabric's Application lifecycle management (ALM) tool so that I can simplify deploying content between stages in my deployment pipeline.
---

# Create deployment rules

When you're working in a deployment pipeline, different stages might have different configurations. For example, each stage can have different databases or different query parameters. The development stage might query sample data from the database, while the test and production stages query the entire database.

When you deploy content between pipeline stages, you can configure deployment rules to change the content while keeping some settings intact. For example, you can define a rule for semantic model in a production stage to point to a production database instead of one in the test stage. The rule is defined in the production stage, under the appropriate semantic model. Once the rule is defined, content deployed from test to production inherits the value as defined in the deployment rule. This rule always applies as long as it's unchanged and valid.

> [!NOTE]
> The new Deployment pipeline user interface is currently in **preview**. To turn on or use the new UI, see [Begin using the new UI](./deployment-pipelines-new-ui.md#begin-using-the-new-ui).

You can configure data source rules, parameter rules, and default lakehouse rules. The following table lists the type of items you can configure rules for, and the type of rule you can configure for each one.

|Item |Data source rule  |Parameter rule  |Default lakehouse rule |Details  |
|---------|:-------:|:---------:|:--------:|------|
|**Dataflow gen1**         |✅ |✅ |❌ |Use to determine the values of the data sources or parameters for a specific dataflow gen1. |
|**Semantic model**          |✅ |✅ |❌ |Use to determine the values of the data sources or parameters for a specific semantic model.         |
|**Datamart**         |✅ |✅ |❌ |Use to determine the values of the data sources or parameters for a specific datamart.         |
|**Paginated report** |✅ |❌ |❌ |Defined for the data sources of each paginated report. Use to determine the data sources of the paginated report. |
|**Mirrored database** |✅ |❌ |❌ |Defined for the data sources of each mirrored database. |
|**Notebook** |❌ |❌ |✅ |Use to determine the default lakehouse for a specific notebook. |

>[!NOTE]
> Data source rules only work when you change data sources from the same type.

## Create a deployment rule

To create a deployment rule, follow the steps in this section. After you create all the deployment rules you need, deploy the semantic models with the newly created rules from the source stage to the target stage where the rules were created. Your rules don't apply until you deploy the semantic models from the source to the target stage.

### [Create a deployment rule in the new UI](#tab/new-ui)

1. In the pipeline stage you want to create a deployment rule for, select **Deployment rules**.

    :::image type="content" source="media/create-rules/deployment-settings-screenshot-new.png" alt-text="A screenshot of the deployment rules button, located in the deployment stage menu.":::

1. A list of items you can set rules for appear in the window. Not all items in the pipeline are listed. Only items of a type that you can create rules for are listed (dataflows gen1, semantic model, datamarts, notebooks, and paginated reports). To find the item you want to set a rule for, use the search or filter functionalities.

    :::image type="content" source="media/create-rules/deployment-rules-new.png" alt-text="A screenshot of the deployment rules pane in the new UI, showing that you can set rules for dataflows gen1, datasets, datamarts, and paginated reports.":::

1. Select the item you want to create a rule for. The types of rules you can create for that item are displayed. So, for example, if you're creating a rule for a dataflow gen1, you can create a data source rule or a parameter rule. If you're creating a rule for a notebook, you can create a default lakehouse rule.

1. Select the type of rule you want to create, expand the list, and then select **Add rule**. There are two types of rules you can create:

    :::image type="content" source="media/create-rules/deployment-rule-types-new.png" alt-text="A screenshot of the new deployment rules pane. It shows a selected dataset and the two rule types, data source and parameter, you can configure for it.":::

    * **Data source rules**

        From the data source list, select a data source name to be updated. Use one of the following methods to select a value to replace the one from the source stage:

        * Select from a list.

        * Select *Other* and manually add the new data source. You can only change to a data source from the same type.

        >[!NOTE]
        >
        >* *Data source rules* will be grayed out if you're not the owner of the item you're creating a rule for, or if your item doesn't contain any data sources.
        >* For *dataflows gen1*, *semantic models* and *paginated reports*, the data source list is taken from the source pipeline stage.
        >* You can’t use the same data source in more than one rule.

    * **Parameter rules**
         Select a parameter from the list of parameters; the current value is shown. Edit the value to the value you want to take effect after each deployment.

    * **Default lakehouse rules**
         This rule only applies to notebooks. Select a lakehouse to connect to the notebook in the target stage and set it as its default. For more information, see [Notebook in deployment pipelines](../../data-engineering/notebook-source-control-deployment.md#notebook-in-deployment-pipelines).

### [Create a deployment rule in the original UI](#tab/old-ui)

1. In the pipeline stage you want to create a deployment rule for, select **Deployment rules**.

    :::image type="content" source="media/create-rules/deployment-settings-screenshot.png" alt-text="A screenshot of the deployment rules button, located in the deployment rules.":::

1. A list of items you can set rules for appear in the window. Not all items in the pipeline are listed. Only items of a type that you can create rules for are listed (dataflows gen1, semantic model, datamarts, notebooks, and paginated reports). To find the item you want to set a rule for, use the search or filter functionalities.

    :::image type="content" source="media/create-rules/deployment-rules.png" alt-text="A screenshot of the deployment rules pane, showing that you can set rules for dataflows gen1, datasets, datamarts, and paginated reports.":::

1. Select the item you want to create a rule for. The types of rules you can create for that item are displayed. So, for example, if you're creating a rule for a dataflow gen1, you can create a data source rule or a parameter rule. If you're creating a rule for a notebook, you can create a default lakehouse rule.

1. Select the type of rule you want to create, expand the list, and then select **Add rule**. There are two types of rules you can create:

    :::image type="content" source="media/create-rules/deployment-rule-types.png" alt-text="A screenshot of the deployment rules pane. It shows a selected dataset and the two rule types, data source and parameter, you can configure for it.":::

    * **Data source rules**

        From the data source list, select a data source name to be updated. Use one of the following methods to select a value to replace the one from the source stage:

        * Select from a list.

        * Select *Other* and manually add the new data source. You can only change to a data source from the same type.

        >[!NOTE]
        >
        >* *Data source rules* will be grayed out if you're not the owner of the item you're creating a rule for, or if your item doesn't contain any data sources.
        >* For *dataflows gen1*, *semantic models* and *paginated reports*, the data source list is taken from the source pipeline stage.
        >* You can’t use the same data source in more than one rule.

    * **Parameter rules**
         Select a parameter from the list of parameters; the current value is shown. Edit the value to the value you want to take effect after each deployment.

    * **Default lakehouse rules**
         This rule only applies to notebooks. Select a lakehouse to connect to the notebook in the target stage and set it as its default. For more information, see [Notebook in deployment pipelines](../../data-engineering/notebook-source-control-deployment.md#notebook-in-deployment-pipelines).

---

## Supported data sources for dataflow gen1 and semantic model rules

Data source rules can be defined for the following data sources:

* Azure Analysis Services (AAS)
* Azure Synapse
* SQL Server Analysis Services (SSAS)
* Azure SQL Server
* SQL server
* Odata Feed
* Oracle
* SapHana (import mode only; not direct query mode)
* SharePoint
* Teradata

For other data sources, we recommend [using parameters to configure your data source](../best-practices-cicd.md#use-parameters-for-configurations-that-will-change-between-stages).

## Considerations and limitations

This section lists the limitations for the deployment rules.

* To create a deployment rule, you must be the owner of the item you're creating a rule for.

* Deployment rules can't be created in the development stage.

* When an item is removed or deleted, its rules are deleted too. These rules can't be restored.

* When you unassign and reassign a workspace to [reestablish connections](../troubleshoot-cicd.md#lost-connections-after-deployment), rules for that workspace are lost. To use these rules again, reconfigure them.

* If the data source or parameter defined in a rule is changed or removed from the item it points to in the source stage, the rule isn't valid anymore, and deployment fails.

* After you deploy a paginated report with a data source rule, you can't open the report using [Power BI Report Builder](/power-bi/paginated-reports/report-builder-power-bi).

* Deployment rules only take effect the next time you deploy to that stage. However, if you create rules and then compare the stages before you deploy, the comparison is done based on the rules that were created even though they didn't take effect yet.

* The following scenarios aren't supported:

  * Data source rules for dataflows gen1 that have other dataflows as sources.
  * Data source rules for common data model (CDM) folders in a dataflow gen1.
  * Data source rules for semantic models that use dataflows gen1 as their source.
  * Creating data source rules on a semantic model that uses Native query and DirectQuery together.
  * Parameter rules aren't supported for paginated reports.
  * Adding data source rules for semantic models and dataflows gen1 on data sources which are parametrized.

## Related content

* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
* [Automate your deployment pipeline using APIs and DevOps](pipeline-automation.md)
