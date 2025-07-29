---
title: Create alerts for pipeline runs
description: Explanation of how to generate alerts for pipeline runs
ms.reviewer: whhender
ms.author: makromer
ms.topic: conceptual
ms.custom: pipelines
ms.date: 07/24/2025
---

# Concept: Create alerts for pipeline runs

Operationalizing your Fabric Data Factory pipelines means more than scheduling or setting trigger events to invoke your pipelines. A well-run operationalized data integration project includes proactive monitoring and alerting upon pipeline events, mainly succeed and failed. This allows you to actively monitor the health of your pipelines both at the activity level and the pipeline level.

> [!VIDEO [<embedded_video_source>](https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=3410e513-faef-4b15-8a46-7487a8086f85)]

## Activity level alerts

Let's start at the pipeline activity level. To create alerts at the activity level, you'll add either an Outlook (to send email) or a Teams (to send a Teams message) activity after the activity that you wish to actively monitor.

:::image type="content" source="media/create-alerts/pipeline-outlook.png" alt-text="Screenshot showing an activity activity pipeline run with an alert.":::

## Pipeline level alerts



## On-demand data pipeline run


> [!TIP]
> when scheduling a data pipeline, the interface requires specifying both a start and an end date. This design ensures that all scheduled pipelines have a defined execution period.  Currently, there's no built-in option to set a schedule without an end date.
> To maintain an ongoing schedule, you can set the end date far into the future, such as several years ahead. for example **2099-01-01** This approach effectively keeps the pipeline running indefinitely, allowing you to manage or adjust the schedule as needed over time.


## Related content

- [How to monitor data pipeline runs in [!INCLUDE [product-name](../includes/product-name.md)]](monitor-pipeline-runs.md)
- [Quickstart: Create your first data pipeline to copy data](create-first-pipeline-with-sample-data.md)
