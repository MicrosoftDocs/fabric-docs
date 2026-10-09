---
title: Insert Button Columns in PowerTable Sheet
description: Button columns add interactive elements to your table that open URLs or run automations. Learn how to add and configure button columns in PowerTable.
#customer intent: As a PowerTable user, I want to insert a button column so that I can let users open a URL or run an automation directly from my table.
ms.date: 07/11/2026
ms.topic: how-to
---

# Insert button columns in PowerTable

A button column is an interactive [visual column](how-to-insert-visual-columns.md) that you can add to your table and configure to open a URL or run an automation.

This article explains how to add a button column to your table.

## Insert the button column

1. Go to **PowerTable** > **Insert Column** > **Add Visual Column** > **Add Button Column**.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/insert-button-column.png" alt-text="Screenshot of PowerTable Insert Column menu with Visual Column and Add Button Column options highlighted.":::

1. Configure the column details:

    * **Column Name:** Enter a name for the column.
    * **Label:** The default button label is *Click Here*. You can change the label if you want.
    * **Action:** Select the action to perform when you select the button. You can either open a URL or run an automation workflow.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/add-action.png" alt-text="Screenshot of Button Column configuration displaying Label, Action dropdown, and URL fields.":::

## Add URL

1. To open a URL when users select the button, select **Open Url** in **Action**.

1. Select **Static** to enter a static URL, or **Formula** to enter a formula that generates a dynamic URL based on data.

    In the following image, a formula specifies a dynamic URL that changes depending on the product name. When you select a button, PowerTable opens the URL associated with the selected product.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/add-url.png" alt-text="Screenshot of Button Column configuration showing Open Url action and dynamic URL formula field." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/add-url.png":::

1. Select **Save**. PowerTable adds the button column as shown in the following image:

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/button-column-inserted.png" alt-text="Screenshot of PowerTable sheet with a new Product Details column containing Know more buttons in each row that opens URL dynamically based on the product name." lightbox="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/button-column-inserted.png":::

## Run an automation workflow

1. To trigger an automation workflow when you select the button, select **Execute an Automation** under **Action**.

1. Select an existing automation workflow from the list. If the required workflow doesn't exist, select **Create Automation** to open the automation window and create a new workflow.

    :::image type="content" source="../media/powertable-how-to-insert-columns/how-to-insert-button-columns/create-new-automation-for-button.png" alt-text="Screenshot of Add Button Column General tab with no automation available and Create Automation button highlighted.":::

1. After selecting or creating the automation workflow, select **Save**.
