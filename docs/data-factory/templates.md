---
title: Templates
description: Learn about templates for Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.custom: pipelines
ms.date: 12/18/2024
ms.search.form: Pipeline Template
---

# Templates for Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

Templates are predefined pipelines that allow you to get started quickly with Data Factory. These templates help to reduce development time by providing an easy way to create pipelines for common data integration scenarios.  

:::image type="content" source="media/templates/templates-list.png" lightbox="media/templates/templates-list.png" alt-text="Screenshot showing the templates browser in [!INCLUDE [product-name](../includes/product-name.md)].":::

## How to build a pipeline from a template

You can build a Data Factory pipeline from a template in two ways: 
  - the Pipeline template gallery
  - import your own template 

### Pipeline template gallery

There are two ways to access the Pipeline template gallery. You can either start by using a template or choose to add a template to your pipeline solution. 

#### Get started with a template
1. To get started with a template, start by selecting **New** and then **Pipeline**.

   :::image type="content" source="media/templates/new-data-pipeline.png" alt-text="Screenshot showing the new pipeline button.":::

2. Set a name for your new pipeline and select **Create**. The pipeline editor window opens.
3. Select **Templates**.

   :::image type="content" source="media/templates/choose-template-to-start.png" alt-text="Screenshot showing the pipeline editor window with the Template button highlighted.":::

4. The template browser appears. Select the **Copy data from ADLS Gen2 to Lakehouse Table** template, and then select **Next**.

   :::image type="content" source="media/templates/templates-list-with-template-selected.png" lightbox="media/templates/templates-list-with-template-selected.png" alt-text="Screenshot showing the pipeline templates browser and the Copy data from ADLS Gen2 to Lakehouse Table template selected.":::

5. Select from the drop-down list your source and destination connections or use **+New** to create a new connection.

   :::image type="content" source="media/templates/source-destination-configuration-in-template.png" lightbox="media/templates/source-destination-configuration-in-template.png" alt-text="Screenshot showing the template source and destination connections configuration and the New button to create a new connection.":::

6. After making your selections or creating new connections, select the **Use this template** button to generate a new pipeline directly.
   
7. The pipeline is created using the connections you set.  You can view the newly created pipeline in the pipeline editor, where you can use the **Run** and **Schedule** buttons to control its execution.

   :::image type="content" source="media/templates/pipeline-editor.png" lightbox="media/templates/pipeline-editor.png" alt-text="Screenshot showing the pipeline editor with the Run and Schedule buttons highlighted in the toolbar of the Home tab.":::

8. Initially the new Copy activity is highlighted on the editor canvas, and its properties shown in the properties pane at the bottom of the editor.
   
9. When you select the background of the pipeline canvas, you can see the general pipeline properties in the properties pane, where you can add or edit existing parameters.

   :::image type="content" source="media/templates/pipeline-properties.png" alt-text="Screenshot showing the pipeline properties with the Parameters tab selected and several parameters added.":::

10. When you're done, save your edits by selecting the save button on the toolbar of the **Home** tab.

   :::image type="content" source="media/templates/save-button.png" alt-text="Screenshot of the Home tab of the pipeline editor with the Save button selected.":::

11. Now you can run your pipeline, providing values for any parameters as required.

   :::image type="content" source="media/templates/run-with-parameters.png" lightbox="media/templates/run-with-parameters.png" alt-text="Screenshot showing the Pipeline run dialog with parameters specified.":::


#### Add a template to your solution

You can also choose to add a template to your solution or get started with a template using the **Use a template** on the **Home** tab of your pipeline editor. 

1. Click **Use a template**.

   :::image type="content" source="media/templates/use-template-gallery-from-home-tab.png" lightbox="media/templates/use-template-gallery-from-home-tab.png" alt-text="Screenshot showing the Pipeline template gallery button on the Home tab of the pipeline editor.":::
   
3. The same template browser appears. Select the template you want to use and click **Next**.

   :::image type="content" source="media/templates/templates-list.png" lightbox="media/templates/templates-list.png" alt-text="Screenshot showing the Pipeline template gallery fly-out.":::

### Save your solution as a template

You can save a pipeline as a template by selecting the **Export** button on the **Home** tab of the pipeline editor. 

   :::image type="content" source="media/templates/export-pipeline-as-template.png" lightbox="media/templates/export-pipeline-as-template.png" alt-text="Screenshot showing the Export button on the Home Tab.":::

A pop-up appears. To continue, click **Export**. A .zip file with the name of your pipeline will be saved. 

### Import your solution as a template

You can import your own pipelines two different ways. 

#### Import from the **Home** tab
You can import a pipeline with the **Import** button on the **Home** tab. 

   :::image type="content" source="media/templates/import-template-from-home-tab.png" lightbox="media/templates/import-template-from-home-tab.png" alt-text="Screenshot showing the Import button on the Home Tab.":::

This pops up a file browser. Select your pipeline .zip file and click **Open**. Your template will be imported and a preview of the pipeline will show. 

Select your connections and click **Use this template** to finish importing your pipeline. 

#### Import from the Pipeline template gallery

You can also choose to import a pipeline from the Pipeline template gallery.

From the Pipeline template gallery, click **Import template**. 

   :::image type="content" source="media/templates/import-from-template-gallery.png" lightbox="media/templates/import-from-template-gallery.png" alt-text="Screenshot showing the Import template button from the Pipeline template gallery.":::

This opens a file browser and allow you to select your pipeline .zip file. Select your file and click **Open**. Your template will be imported and a preview will open. Once you've selected your connections and click **Use this template** to finish importing your pipeline. 

#### Semantic Model Refresh Templates 

In addition to the traditional pipeline templates, Data Factory also offers Semantic Model Refresh Templates to help you automate the refresh process for Power BI semantic models. The template gallery includes several refresh scenarios, such as:

* **Event-driven refreshes**: Set up an [event or action that will trigger a semantic model refresh](/fabric/data-factory/pipeline-storage-event-triggers). 
* **Refreshing a semantic model after a dataflow runs**: trigger a semantic model refresh after each [data flow activity](/fabric/data-factory/dataflow-activity). 
* **Scheduled refreshes**: Create a [schedule](/fabric/data-factory/pipeline-runs) to trigger a semantic model refresh, such as on a monthly or quarterly basis. 
* **Sequencing multiple semantic model refreshes**: trigger refreshes sequentially for different semantic models. 
Each template provides a guided setup to help you configure the refresh process within pipelines.

:::image type="content" source="media/templates/datapipeline-template-gallery.png" alt-text="Screen shot of the power bi semantic model refresh template gallery." lightbox="media/templates/datapipeline-template-gallery.png":::

   
## Related content

- [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
