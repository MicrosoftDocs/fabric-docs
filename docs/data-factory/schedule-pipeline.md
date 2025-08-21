---
title: Schedule pipeline
description: Explanation of how to automate your pipeline by using a schedule
ms.reviewer: whhender
ms.author: makromer
author: kromerm
ms.topic: conceptual
ms.custom: pipelines
ms.date: 08/14/2025
---

# Concept: Schedule pipeline

With Data Factory pipelines, once you've completed designing your logic and testing your pipelines with manual runs, you'll next want to automate the execution of your pipeline logic. We provide several options to do this including scheduling and triggering based on events. In this article, will introduce you to the concept of scheduling your pipelines via a wall-clock scheduler. Scheduling pipelines in Data Factory ensures that your workflows run automatically, reliably, and at the right time without manual intervention. By setting up schedules, you can align data movement, data processing, and data transformation with business requirements—such as refreshing reports before the start of the workday, syncing systems during off-peak hours, or meeting compliance deadlines. Automated scheduling reduces operational overhead, minimizes the risk of missed or delayed runs, and enables consistent, predictable data delivery.

## Create and manage your schedules

In Fabric Data Factory, each pipeline contains the schedules inside the pipeline definition. Open your pipeline designer and you'll see Schedule button on the Home ribbon.

:::image type="content" source="media/schedule-pipeline/toolbar.png" alt-text="Screenshot showing where to select Schedule on the Home ribbon.":::

The schedules screen will open as a fly-in on the right-hand side of your pipeline canvas. Now you can create a new schedule, add as many different schedules as you need, and manage or edit your existing schedules here.

:::image type="content" source="media/schedule-pipeline/schedules.png" alt-text="Screenshot showing how to edit schedules.":::

After your changes are saved, your pipeline will run at each scheduled date and time that you've set. You can view the progress of each run from the "View run history" ribbon button.

:::image type="content" source="media/schedule-pipeline/monitor.png" alt-text="Screenshot showing a scheduled pipeline run.":::


## Related content


- [How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
- [Concepts: Pipeline runs](pipeline-runs.md)
