---
title: Module 3 - Automate and send notifications with Data Factory
description: This module covers integration and orchestration of tasks with your data pipeline, as part of an end-to-end data integration tutorial to complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Module 3: Automate and send notifications with Data Factory

You'll complete this module in 10 minutes to send an email notifying you when all the jobs in a pipeline are complete, and configure it to run on a scheduled basis.

In this module you learn how to:
- Add an Office 365 Outlook activity to send the output of a Copy activity by email.
- Add schedule to run the pipeline.
- _(Optional)_ Add a dataflow activity into the same pipeline.

## Add an Office 365 Outlook activity to your pipeline

We use the pipeline you created in [Module 1: Create a pipeline in Data Factory](tutorial-end-to-end-pipeline.md).

1. Select the **Activities** tab in the pipeline editor and find the Office Outlook activity.

   :::image type="content" source="media/tutorial-end-to-end-integration/add-office-outlook-activity.png" alt-text="Screenshot showing the selection of the Office 365 Outlook activity from the Activities toolbar on the pipeline editor menu.":::

1. Select **OK** to grant consent to use your email address.

   :::image type="content" source="media/tutorial-end-to-end-integration/grant-email-consent.png" alt-text="Screenshot showing the Grant consent dialog requesting permission to use your email address.":::

1. Select the email address you want to use.

   :::image type="content" source="media/tutorial-end-to-end-integration/pick-your-email-account.png" alt-text="Screenshot showing the Pick an account dialog.":::

   > [!NOTE]
   > The service doesn't currently support personal email. You must use an enterprise email address.

1. Select **Allow access** to confirm.

   :::image type="content" source="media/tutorial-end-to-end-integration/confirm-email-access.png" alt-text="Screenshot showing the Confirmation required dialog to allow access to Office 365 Outlook.":::

1. Select and drag the **On success** path (a green checkbox on the top right side of the activity in the pipeline canvas) from your Copy activity to your new Office 365 Outlook activity.

   :::image type="content" source="media/tutorial-end-to-end-integration/connect-copy-activity-to-outlook.png" alt-text="Screenshot showing the connection of the success output from the Copy activity to the new Office 365 Outlook activity.":::

1. Select the Office 365 Outlook activity from the pipeline canvas, then select the **Settings** tab of the property area below the canvas to configure the email.

   - Enter your email address in the **To** section. If you want to use several addresses, use **;** to separate them. 
   - For the **Subject**, select the field so that the **Add dynamic content** option appears, and then select it to display the pipeline expression builder canvas. 
   
   :::image type="content" source="media/tutorial-end-to-end-integration/configure-email-settings.png" alt-text="Screenshot showing the configuration of the Office 365 Outlook email settings tab.":::

1. The **Pipeline expression builder** dialog appears. Enter the following expression, then select **OK**:
     
   _@concat('DI in an Hour Pipeline Succeeded with Pipeline Run Id', pipeline().RunId)_

   :::image type="content" source="media/tutorial-end-to-end-integration/pipeline-expression-builder.png" alt-text="Screenshot showing the pipeline expression builder with the expression provided for the Subject line of the email.":::

1. For the **Body**, select the field again and choose the **Add dynamic content** option when it appears below the text area. Add the following expression again in the **Pipeline expression builder** dialog that appears, then select **OK**:

   *@concat('RunID =  ', pipeline().RunId, ' ; ', 'Copied rows ', activity('Copy data1').output.rowsCopied, ' ; ','Throughput ', activity('Copy data1').output.throughput)*

   > [!NOTE]
   > Replace **Copy data1** with the name of your own pipeline copy activity.

1. Finally select the **Home** tab at the top of the pipeline editor, and choose **Run**. Then select **Save and run** again on the confirmation dialog to execute these activities.

   :::image type="content" source="media/tutorial-end-to-end-integration/run-pipeline.png" alt-text="Screenshot showing the pipeline editor window with the Run button highlighted on the menu.":::

1. After the pipeline runs successfully, check your email to find the confirmation email sent from the pipeline.

   :::image type="content" source="media/tutorial-end-to-end-integration/pipeline-success-status.png" alt-text="Screenshot showing the pipeline status after having successfully executed.":::

   :::image type="content" source="media/tutorial-end-to-end-integration/email-output.png" alt-text="Screenshot showing the email generated by the pipeline.":::
   
## Schedule pipeline execution

Once you finish developing and testing your pipeline, you can schedule it to execute automatically.

1. On the **Home** tab of the pipeline editor window, select **Schedule**.

   :::image type="content" source="media/tutorial-end-to-end-integration/schedule-button.png" alt-text="A screenshot of the Schedule button on the menu of the Home tab in the pipeline editor.":::

1. Configure the schedule as required. The example here schedules the pipeline to execute daily at 8:00 PM until the end of the year.

   :::image type="content" source="media/tutorial-end-to-end-integration/schedule-configuration.png" alt-text="Screenshot showing the schedule configuration for a pipeline to run daily at 8:00 PM until the end of the year.":::

## _(Optional)_ Add a Dataflow activity to the pipeline

You can also add the dataflow you created in [Module 2: Create a dataflow in Data Factory](tutorial-end-to-end-dataflow.md) into the pipeline.

1. Hover over the green line connecting the Copy activity and the Office 365 Outlook activity on your pipeline canvas, and select the **+** button to insert a new activity.

   :::image type="content" source="media/tutorial-end-to-end-integration/insert-activity-button.png" alt-text="Screenshot showing the insert activity button for the connection between the Copy activity and the Office 365 Outlook activity on the pipeline canvas.":::

1. Choose **Dataflow** from the menu that appears.

   :::image type="content" source="media/tutorial-end-to-end-integration/insert-dataflow-activity.png" alt-text="Screenshot showing the selection of Dataflow from the insert activity menu on the pipeline canvas.":::

1. The newly created Dataflow activity is inserted between the Copy activity and the Office 365 Outlook activity, and selected automatically, showing its properties in the area below the canvas. Select the **Settings** tab on the properties area, and then select your dataflow created in [Module 2: Create a dataflow in Data Factory](tutorial-end-to-end-dataflow.md).

   :::image type="content" source="media/tutorial-end-to-end-integration/choose-dataflow-settings.png" alt-text="Screenshot showing the Settings tab of the Dataflow activity.":::

## Related content

In this third module to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned how to:

> [!div class="checklist"]
> - Use a Copy activity to ingest raw data from a source store into a table in a data Lakehouse.
> - Use a Dataflow activity to process the data and move it into a new table in the Lakehouse.
> - Use an Office 365 Outlook activity to send an email notifying you once all the jobs are complete.
> - Configure the pipeline to run on a scheduled basis.
> - _(Optional)_ Insert a Dataflow activity in an existing pipeline flow.

Now that you completed the tutorial, learn more about how to monitor pipeline runs:

> [!div class="nextstepaction"]
> [Monitor pipeline runs](monitor-pipeline-runs.md)
