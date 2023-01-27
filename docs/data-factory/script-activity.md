---
title: How to use Script activity
description: Learn how to use Script activity.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: how-to 
ms.date: 01/27/2023
---

# How to use Script activity (Preview)

In this guide, you'll learn how to add a new Script activity, add a new connection, and configure script content.

## Prerequisites

To get started, you must complete the following prerequisites:  

- A tenant account with an active subscription. Create an account for free.
- A workspace is created.

## Step 1: Add a new Script activity in Pipeline canvas

1. Open an existing data pipeline or create a new data pipeline.
1. Choose **Script** activity.

   :::image type="content" source="media/script-activity/add-script-activity-1.png" alt-text="Screenshot showing where to select Script.":::

## Step 2: Add a new connection for SQL

1. Go to the **Settings** page and click the **New** button to create a new connection.

   :::image type="content" source="media/script-activity/script-activity-settings-2.png" alt-text="Screenshot showing where to select New.":::

2. In the new popup window, choose the target SQL source.

   :::image type="content" source="media/script-activity/new-connection-3.png" alt-text="Screenshot showing where to choose the target source.":::

3. Create a new connection for the SQL source.

   :::image type="content" source="media/script-activity/new-connection-details-4.png" alt-text="Screenshot showing the details on the New connection screen.":::

## Step 3: Configure script content

1. Choose the connection you created in the previous step.

   :::image type="content" source="media/script-activity/select-new-connection-5.png" alt-text="Screenshot showing where to select the connection.":::

2. You can choose either **Query** to get data result to **NonQuery** for any catalog operations.
1. Input the script content in the input box.
1. You can also define parameters for your script.

   :::image type="content" source="media/script-activity/new-sql-connection-details-6.png" alt-text="Screenshot showing where to add script parameters.":::

5. The Script activity is successfully created and you can run it directly.
