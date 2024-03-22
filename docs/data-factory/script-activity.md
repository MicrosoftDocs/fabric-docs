---
title: How to use Script activity
description: Learn how to use Script activity.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# How to use Script activity

In this article, you learn how to add a new Script activity, add a new connection, and configure script content.

## Prerequisites

To get started, you must complete the following prerequisites:  

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.

## Step 1: Add a new Script activity in Pipeline canvas

1. Open an existing data pipeline or create a new data pipeline.
1. Select the **Script** activity.

   :::image type="content" source="media/script-activity/add-script-activity.png" alt-text="Screenshot showing where to select the Script activity." lightbox="media/script-activity/add-script-activity.png":::

## Step 2: Add a new connection for SQL

1. Select the **Settings** tab. Select **New** to create a new connection.

   :::image type="content" source="media/script-activity/script-activity-settings.png" alt-text="Screenshot showing where to select New in the settings tab." lightbox="media/script-activity/script-activity-settings.png":::

2. In the new popup window, choose the target SQL source.

   :::image type="content" source="media/script-activity/new-connection.png" alt-text="Screenshot showing where to choose the target source." lightbox="media/script-activity/new-connection.png":::

3. Create a new connection for the SQL source.

   :::image type="content" source="media/script-activity/new-connection-details.png" alt-text="Screenshot showing the details on the New connection screen.":::

## Step 3: Configure script content

1. Select the connection you created in the previous step.

   :::image type="content" source="media/script-activity/select-new-connection.png" alt-text="Screenshot showing where to select the connection." lightbox="media/script-activity/select-new-connection.png":::

2. You can choose either **Query** to get a data result or **NonQuery** for any catalog operations.

3. Input the script content in the input box.

4. You can also define parameters for your script. Output parameters will be included in the output from the Script activity, and can be referenced by [parameterization of dynamic expressions](parameters.md) from subsequent activities.

   :::image type="content" source="media/script-activity/new-sql-connection-details.png" alt-text="Screenshot showing where to add script parameters." lightbox="media/script-activity/new-sql-connection-details.png":::

5. The Script activity is successfully created and you can run it directly.

## Related content

- [Monitor pipeline runs](monitor-pipeline-runs.md)
