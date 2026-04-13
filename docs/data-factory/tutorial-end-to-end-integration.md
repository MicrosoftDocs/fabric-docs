---
title: Module 3 - Orchestrate and Automate with a Pipeline in Data Factory
description: "This module covers creating a pipeline to orchestrate your Copy job and dataflow, send notifications, and schedule execution. It's part 3 of an end-to-end data integration tutorial with Data Factory in Microsoft Fabric."
ms.reviewer: xupzhou
ms.date: 04/13/2026
ms.topic: tutorial
ms.custom:
  - pipelines, sfi-image-nochange
---

# Module 3: Orchestrate and automate with a pipeline

You can complete this module in about 15 minutes. In this final part of the tutorial, you create a pipeline that orchestrates the Copy job and dataflow you built in Modules 1 and 2, send an email notification when all jobs complete, and schedule the pipeline to run automatically.

## Prerequisites

- [Module 1 of this tutorial series: Ingest data with a Copy job](tutorial-end-to-end-pipeline.md)
- [Module 2 of this tutorial series: Transform data with a dataflow](tutorial-end-to-end-dataflow.md)

## Create a pipeline

First, create a pipeline to orchestrate the Copy job and dataflow you already built.

1. From your workspace, select **+ New item**, then search for and choose **Pipeline**.

   <!-- TODO: Add screenshot of pipeline creation from workspace -->

1. Provide a pipeline name. Then select **Create**.

## Add a Copy job activity

<!-- TODO: Write steps for adding a Copy job activity to the pipeline and connecting it to the Copy job created in Module 1. Add screenshots. -->

1. On the pipeline canvas, select the **Activities** tab and add a **Copy job** activity.

1. Configure the Copy job activity to reference the Copy job you created in [Module 1](tutorial-end-to-end-pipeline.md).

## Add a Dataflow activity

1. Select the **Activities** tab in the pipeline editor and add a **Dataflow** activity.

1. Select and drag the **On success** path (a green checkbox on the top right side of the activity in the pipeline canvas) from your Copy job activity to the new Dataflow activity.

1. Select the Dataflow activity and choose its **Settings** tab. Select the dataflow you created in [Module 2: Transform data with a dataflow](tutorial-end-to-end-dataflow.md).

   <!-- TODO: Add screenshot of Dataflow activity settings -->

## Add an Office 365 Outlook activity

## Add an Office 365 Outlook activity

1. Select the **Activities** tab in the pipeline editor and find the Office 365 Email activity.

   :::image type="content" source="media/tutorial-end-to-end-integration/add-office-outlook-activity.png" alt-text="Screenshot showing the selection of the Office 365 Outlook activity from the Activities toolbar on the pipeline editor menu.":::

1. Select the new Office 365 Email activity and select its **Settings** tab.
1. Select the **Connection** dropdown list, and then select **Browse all**.
1. Select **Office 365 Email**.
1. Select **Sign in** to connect your Office 365 account.

   :::image type="content" source="media/tutorial-end-to-end-integration/pick-your-email-account.png" alt-text="Screenshot showing the Pick an account dialog.":::

   > [!NOTE]  
   > The service doesn't currently support personal email. You must use an enterprise email address.

1. Select **Connect**.
1. Select and drag the **On success** path (a green checkbox on the top right side of the activity in the pipeline canvas) from your Dataflow activity to your new Office 365 Email activity.

   <!-- TODO: Update screenshot to show Copy job → Dataflow → Email chain instead of just Copy → Email -->
   :::image type="content" source="media/tutorial-end-to-end-integration/connect-copy-activity-to-outlook.png" alt-text="Screenshot showing the connection of the success output from the Dataflow activity to the new Office 365 Outlook activity.":::

1. Select the Office 365 Email activity from the pipeline canvas, then select the **Settings** tab of the property area below the canvas to configure the email.

   - Enter your email address in the **To** section. If you want to use several addresses, use **;** to separate them.
   - For the **Subject**, select the field so that the **Add dynamic content** option appears, and then select it to display the pipeline expression builder canvas.

   :::image type="content" source="media/tutorial-end-to-end-integration/configure-email-settings.png" alt-text="Screenshot showing the configuration of the Office 365 Outlook email settings tab.":::

1. The **Pipeline expression builder** dialog appears. Enter the following expression, then select **OK**:

   ```@concat('DI in an Hour Pipeline Succeeded with Pipeline Run Id', pipeline().RunId)```
   :::image type="content" source="media/tutorial-end-to-end-integration/pipeline-expression-builder.png" alt-text="Screenshot showing the pipeline expression builder with the expression provided for the Subject line of the email.":::

1. For the **Body**, select the text field and choose the **View in expression builder** option when it appears below the text area. Add the following expression again (with your own copy job activity name) in the **Pipeline expression builder** dialog that appears, then select **OK**:
   ```@concat('RunID =  ', pipeline().RunId, ' ; ', 'Files written: ', activity('Copy job_1').output.value[0].output.filesWritten, ' ; ','Throughput: ', activity('Copy job_1').output.value[0].output.throughput,' ; ','Time to copy: ', activity('Copy job_1').output.executionDuration,' ; ','Time in queue: ', activity('Copy job_1').output.durationInQueue)```

   > [!IMPORTANT]  
   > Replace **Copy job_1** with the name of your own pipeline copy job activity.

1. Finally select the **Home** tab at the top of the pipeline editor, and choose **Run**. Then select **Save and run** again on the confirmation dialog to execute these activities.

   :::image type="content" source="media/tutorial-end-to-end-integration/run-pipeline.png" alt-text="Screenshot showing the pipeline editor window with the Run button highlighted on the menu.":::

1. After the pipeline runs successfully, check your email to find the confirmation email sent from the pipeline.

   :::image type="content" source="media/tutorial-end-to-end-integration/pipeline-success-status.png" alt-text="Screenshot showing the pipeline status once it's complete.":::

   :::image type="content" source="media/tutorial-end-to-end-integration/email-output.png" alt-text="Screenshot showing the email generated by the pipeline.":::

## Schedule pipeline execution

Once you finish developing and testing your pipeline, you can schedule it to execute automatically.

1. On the **Home** tab of the pipeline editor window, select **Schedule**.

   :::image type="content" source="media/tutorial-end-to-end-integration/schedule-button.png" alt-text="A screenshot of the Schedule button on the menu of the Home tab in the pipeline editor.":::

1. Select **+ Add schedule**
1. Configure the schedule as required. The example here schedules the pipeline to execute daily at 8:00 PM for a year.

   :::image type="content" source="media/tutorial-end-to-end-integration/schedule-configuration.png" alt-text="Screenshot showing the schedule configuration for a pipeline to run daily at 8:00 PM until the end of the year.":::

## Related content

- [How to monitor pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
