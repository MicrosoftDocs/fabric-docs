---
title: Build a Sample Automation in PowerTable
description: Create a sample automation in PowerTable to process customer orders end to end. Follow this walkthrough to add triggers, conditions, and record actions.
#customer intent: As a PowerTable user, I want to build an automation workflow from an end-to-end example so that I can apply the same pattern to my own tables.
ms.date: 07/31/2026
ms.topic: how-to
---

# Build a sample automation

This article extends the [Configure automation workflows](./how-to-configure-automation-workflows.md) how-to guide by showing how to create an automation workflow by using a sample customer order processing scenario.

> [!NOTE]
> To learn more about the concept of automation and how to set up the different triggers and actions, see [Automation](../powertable-concept-automation.md) and [Configure automation workflows](./how-to-configure-automation-workflows.md).

## Sample scenario

For this example, consider the following tables in PowerTable:

1. An **Order Requests** table to store customer order requests submitted through a form.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/powertable-order-requests-table.png" alt-text="Screenshot of PowerTable showing the Order Requests table with two rows of customer name, product, quantity, and stock data." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/powertable-order-requests-table.png":::

1. An **Orders** table to store processed orders.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/powertable-order-table.png" alt-text="Screenshot of PowerTable showing the Orders table with 10 rows of order date, order number, customer, product key, quantity, status, stock, and product name." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/powertable-order-table.png":::

1. An **Inventory** table that contains product information and available stock quantities.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/powertable-inventory-table.png" alt-text="Screenshot of PowerTable showing the Inventory table with 10 rows of ProductKey, Stock, Warehouse, LastUpdated, Restock, and Product Name columns." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/powertable-inventory-table.png":::

1. A [form](../powertable-how-to-generate-forms.md) that stores customer order requests in the **Order Requests** table.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/order-request-form.png" alt-text="Screenshot of Form collecting customer name, phone, product name, and quantity for order requests.":::

## Workflow overview

When a customer submits an order request through the form, the workflow verifies inventory for the requested product and then performs the appropriate actions based on stock availability.

The workflow retrieves the product details from the **Inventory** table, checks whether sufficient stock is available, and either creates an order and updates inventory or marks the product for restocking.

The workflow performs the following tasks:

1. A customer submits an order request through the form.
1. The **When a form is submitted** trigger starts the workflow.
1. The **Find Record(s)** action retrieves the requested product details from the **Inventory** table.
1. The workflow compares the requested quantity with the available stock quantity.
1. If sufficient stock is available, the workflow:
   * Creates an order record in the **Orders** table.
   * Sets the order status to **Processing**.
   * Updates the inventory by subtracting the requested quantity from the available stock.
1. Otherwise, the workflow updates the **Restock** status in the **Inventory** table to indicate that additional stock is required.

## Create the workflow and add trigger

1. Open the **Order Requests** table.
1. Create a new automation workflow by using **Setup** > **Automations**. To learn more, see [Create an automation flow](./how-to-configure-automation-workflows.md#create-an-automation-flow).
1. Select **When a form is submitted** as the trigger.
1. [Configure the trigger](./how-to-configure-automation-workflows.md#add-trigger) to run only when the required customer details are present in the **Properties** pane. The trigger starts only when the *Customer Phone*, *Product Name*, and *Quantity* **are not empty**.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/configure-trigger-sample.png" alt-text="Screenshot of the Automations Properties pane with trigger conditions requiring Customer Phone, Product Name, and Quantity to be not empty." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/configure-trigger-sample.png":::

## Retrieve the product details

1. Select **Add Action** > **Find Record(s)**.
1. Select the schema. In **Table**, select **Inventory**.
1. Select **Single Record** to fetch the single matching product record.
1. [Configure the action](./how-to-configure-automation-workflows.md#find-records) to find the product that matches the product requested in the submitted form. Use *ProductName* to find the matching product since the form has only the product name.
1. Return the **Product Key**, **Product Name**, and **Stock Quantity** fields by selecting them in **Select columns**.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/configure-find-records-action-inventory.png" alt-text="Screenshot of the Find Record(s) action Properties pane with Inventory table, Single Record fetch type, selected columns, and a Product Name rule." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/configure-find-records-action-inventory.png":::

The workflow uses the retrieved product details to validate stock inventory and populate the order record.

## Add a condition

1. Add a **Conditional Group**.
1. Configure the **If** condition to check if the requested quantity is less than the available stock quantity.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/configure-condition-quantity-less-than-stock.png" alt-text="Screenshot of Properties pane Conditions section with Rules field set to Quantity < Stock next to the workflow trigger and actions." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/configure-condition-quantity-less-than-stock.png":::

## Configure the If branch

If sufficient stock is available, create a record in the **orders** table.

1. Add a [**Create Record**](./how-to-configure-automation-workflows.md#create-record) action.
1. Select the schema and select ***Orders1*** in **Table**.
1. Select **Add Field** to add the fields for the record.&#x20;
1. For field values, select **+** and map the customer&#x20;
1. details from the **Order Requests** table, sourced from the form.
1. For product-related fields, map the product details from the **Find Record(s)** action. For example, retrieve the *Product Key* from **Inventory** table fetched by using **Find Record(s)**.
1. Set the **Status** field to *Processing*.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/create-record-orders-field-mapped.png" alt-text="Screenshot of Properties pane for Create Record in Orders1, mapping ProductKey, Quantity, Status, and CustomerName fields." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/create-record-orders-field-mapped.png":::

Next, update the stock in inventory.

1. Add an [**Update Record**](./how-to-configure-automation-workflows.md#update-record) action.
1. Select the schema and select **Inventory** table.
1. Select **Single Update** to update a single record.
1. Use the *ProductKey* in **Rules** to identify the corresponding product.
1. **Select** **Replace Value** and **Subtract**. Then, select the *Stock* and *Quantity* fields to update the inventory record by subtracting the requested quantity from the available stock.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/update-record-inventory-stock-subtract.png" alt-text="Screenshot of Properties pane for Update Record in Inventory, subtracting Quantity from Stock using a ProductKey rule." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/update-record-inventory-stock-subtract.png":::

## Add Otherwise branch

1. Select **Add Condition** to add another condition branch.
1. Select **If no other condition are met** to make it a final branch.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/otherwise-branch-no-other-conditions-met.png" alt-text="Screenshot of Properties pane Configuration Details with If no other conditions are met selected for the new condition branch." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/otherwise-branch-no-other-conditions-met.png":::

## Configure the Otherwise branch

If sufficient stock isn't available, update the restock field in the **Inventory** table to *Yes*.

1. Add an **Update Record** action.
1. Select the schema and select **Inventory** table.
1. Select **Single Update** to update a single record.
1. Use the *ProductKey* in **Rules** to identify the corresponding product.
1. Update the corresponding inventory record.
1. Set the **Restock** field to **Yes** and update the last updated date.

    :::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/update-record-inventory-restock-yes.png" alt-text="Screenshot of the Update Record action Properties panel with Single Update selected, ProductKey rule, and Restock set to Yes." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/update-record-inventory-restock-yes.png":::

The flow is complete.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/get-order-automation-complete-flow-overview.png" alt-text="Screenshot of the Get Order automation flow with form trigger, Find Records, and an If Quantity < Stock condition with Create Record and Update Record actions.":::

Consider a user submits the form as shown in the following image.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/order-form-submission-filled-customer-details.png" alt-text="Screenshot of a submitted form showing Quinn Anderson, phone number, Water Bottle, and quantity 20, with Submit highlighted.":::

The orders table is updated. The stock inventory is also updated from 60 to 40 as seen in the *Stock* reference column.

:::image type="content" source="../media/powertable-how-to-create-automation/how-to-create-sample-automation/orders-table-new-row.png" alt-text="Screenshot of the orders table with a highlighted new row for Quinn Anderson, Water Bottle, quantity 20, Processing status, and Stock 40." lightbox="../media/powertable-how-to-create-automation/how-to-create-sample-automation/orders-table-new-row.png":::
