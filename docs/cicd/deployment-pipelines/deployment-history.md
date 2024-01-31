---
title: Fabric Application lifecycle management (ALM) deployment pipelines history
description: Learn how the history feature works in the deployment pipelines, the Fabric Application lifecycle management (ALM) tool.
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual
ms.custom:
  - contperf-fy21q1
  - build-2023
  - ignite-2023
ms.date: 05/23/2023
ms.search.form: Deployment history
---

# Deployment history

Deployment history is a deployment pipelines feature that enables reviewing the past deployments in your pipeline. The feature is designed as a log that lists all the past deployments in the pipeline.

You can use the deployment history log, to check the health of your pipeline, and to troubleshoot problems that occurred during previous deployments.

When you perform a deployment, you can use the built-in option to [leave notes](deploy-content.md#review-your-deployment-and-leave-a-note), to add additional information to each deployment. Later, when you look back at your deployment history, the notes can help you understand what happened during each deployment.

:::image type="content" source="media/deployment-history/deployment-history.png" alt-text="A screenshot of the deployment pipelines history pane.":::

## Deployment information

To view the pipeline's deployment history, select **Deployment history**.

:::image type="content" source="media/deployment-history/deployment-history-button.png" alt-text="A screenshot of the deployment pipelines history button.":::

The deployment history log is formatted as a table. Each row represents a single deployment, and the columns list the following information per deployment:

* **Deployed to** - The target stage of the deployment.

* **Date and time** - The date and time of the end of the deployment.

* **Deployed by** - The person (or service principal) who performed the deployment.

* **Items** - The *items* column indicates the differences between the items in the source and target stage. All labels except *failed deployment*, refer to the items in the target stage before the deployment takes place. These labels show the number of items from that category that were deployed. You can select the label to view a list of all the items in that category. If a label isn't showing, no deployed items fit that category.

    | Label | Name            | Description | Expanded view |
    |-------|-----------------|-------------|---------------|
    | :::image type="content" source="media/deployment-history/new-item.png" alt-text="A screenshot of the deployment pipelines history new item icon.":::    | New items       | A new item that was deployed | :::image type="content" source="media/deployment-history/expanded-new-itemS.png" alt-text="A screenshot of the deployment pipelines history new item icon selected, with the list of new items for this deployment expanded."::: |
    | :::image type="content" source="media/deployment-history/different-item.png" alt-text="A screenshot of the deployment pipelines history different item icon.":::      | Different items | A deployed item that's different in the source and target stages | :::image type="content" source="media/deployment-history/expanded-different-items.png" alt-text="A screenshot of the deployment pipelines history different item icon selected, with the list of different items for this deployment expanded."::: |
    | :::image type="content" source="media/deployment-history/unchanged-item.png" alt-text="A screenshot of the deployment pipelines history unchanged item icon.":::      | Unchanged items | A deployment item that's identical to the one in the target stage | :::image type="content" source="media/deployment-history/expanded-unchanged-items.png" alt-text="A screenshot of the deployment pipelines history unchanged item icon selected, with the list of unchanged items for this deployment expanded."::: |
    | :::image type="content" source="media/deployment-history/failed-deployment.png" alt-text="A screenshot of the deployment pipelines history failed deployment icon."::: | Items failed to deploy            | Indicates a failed deployment | :::image type="content" source="media/deployment-history/expanded-failed-deployment.png" alt-text="A screenshot of the deployment pipelines history failed deployment icon selected."::: |

* **Note** - A note, if exists. Select the note's icon to display its content.

    :::image type="content" source="media/deployment-history/expanded-note.png" alt-text="A screenshot of the deployment pipelines history note icon selected, with the expanded note displayed.":::

* **ID** - The deployment ID. Use as a reference when troubleshooting your latest deployment if it fails.

* **Status** - The status of the deployment.

    | Icon     | Deployment status |
    |----------|-------------------|
    | :::image type="content" source="media/deployment-history/successful-deployment.png" alt-text="A screenshot of the deployment pipelines history successful deployment status icon.":::         | Successful        |
    | :::image type="content" source="media/deployment-history/unsuccessful-deployment.png" alt-text="A screenshot of the deployment pipelines history unsuccessful deployment status icon.":::         | Unsuccessful      |

You can choose to see the deployment history of a specific stage, or of all stages.

## Considerations and limitations

The following section lists the deployment history limitations.

* Detailed information is displayed from June 2022. Prior to this date, summarized information is displayed.

* Deployment history displays the name of the item during deployment. When you change an item's name, deployment history treats it as a new item. In such cases, the item with the changed name will appear in the log for the first time, after it's deployed.

## Related content

* [Get started with deployment pipelines](get-started-with-deployment-pipelines.md)
* [Create deployment rules](create-rules.md)
