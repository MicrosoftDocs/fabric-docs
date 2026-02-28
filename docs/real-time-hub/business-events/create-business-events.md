---
title: Create Business Events in Fabric Real-Time Hub
description: Learn how to create and publish business events in Microsoft Fabric Real-Time hub to enable event-driven automation and streamline your workflows.
#customer intent: As a data engineer, I want to create a new business event schema in Microsoft Fabric so that I can define custom event properties.
ms.date: 02/27/2026
ms.topic: how-to
---

# Create and manage business events in Fabric Real-Time hub

This article shows you how to create and manage business events in Microsoft Fabric Real-Time hub. Business events are custom events that you can define, publish, and consume within the Microsoft Fabric ecosystem. By creating business events, you can enable event-driven automation and integration scenarios across your data estate. For more information about business events, see [Business events in Microsoft Fabric](business-events-overview.md).

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

## Create a business event from a new schema

1. Go to **Business events** in Real-Time hub.

1. Select **+ New business event** and then select **Create new schema**.

    :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/new-business-event-button.png" alt-text="Screenshot of the Business events page with + New Business event selected." lightbox="./media/tutorial-business-events-user-data-function-activation-email/new-business-event-button.png":::

1. Define the business event schema. 
    
    1. For **Name**, enter `OrderPlaced`.
    
    1. In the right pane, for **Event schema set**, select **Create**. 

        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/create-schema-set-menu.png" alt-text="Screenshot of the Define business event page." lightbox="./media/tutorial-business-events-user-data-function-activation-email/create-schema-set-menu.png":::
    
    1.  Enter `Orders` for the schema set name.

        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/schema-set-name.png" alt-text="Screenshot of the name of the event schema set." lightbox="./media/tutorial-business-events-user-data-function-activation-email/schema-set-name.png":::    
    
    1. Select **Add row** in the middle plane. 
    
        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/add-row-button.png" alt-text="Screenshot of the selection of the Add row button." lightbox="./media/tutorial-business-events-user-data-function-activation-email/add-row-button.png":::    

    1. Select **string** for **event type**, and enter `OrderID` for the **name**. 

        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/event-property-configuration.png" alt-text="Screenshot of the configuration of the business event property." lightbox="./media/tutorial-business-events-user-data-function-activation-email/event-property-configuration.png":::
    1. Repeat the previous step to add the following properties: `CustomerID` (string), `Quantity` (string), `OrderTotal` (string), `Status` (string), `DiscountApplied` (string).

        :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/define-business-event-schema.png" alt-text="Screenshot of the business event schema properties configuration." lightbox="media/tutorial-business-events-user-data-function-activation-email/define-business-event-schema.png":::

    1. Select **Next** to continue.

1. Review and confirm the configuration, and then select **Create** to create your business event.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/review-business-event-configuration.png" alt-text="Screenshot of the review and confirm page for creating a business event." lightbox="media/tutorial-business-events-user-data-function-activation-email/review-business-event-configuration.png":::

1. Confirm that you see the business event in the list of business events in Real-Time hub.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/business-event-list.png" alt-text="Screenshot of the list of business events in Real-Time hub." lightbox="media/tutorial-business-events-user-data-function-activation-email/business-event-list.png":::

## Create a business event from an existing schema

1. Go to **Business events** in Real-Time hub.

1. Select **+ New business event** and then select **Create from existing schema**.

    :::image type="content" source="media/create-business-events/create-from-existing-schema-menu.png" alt-text="Screenshot of the selection of New business event -> Create from existing schema menu." lightbox="media/create-business-events/create-from-existing-schema-menu.png":::    

1. On the **Choose existing schema** page, select the existing schema that you want to use for your business event. Use schemas that are already registered in the Schema Registry. After selecting the schema, select **Next**.

    :::image type="content" source="media/create-business-events/choose-existing-schema.png" alt-text="Screenshot of the Choose existing schema page." lightbox="media/create-business-events/choose-existing-schema.png":::

1. On the **Define business event** page, confirm that the schema details are correct, enter a **name** for your business event, and then select **Next**.

    :::image type="content" source="media/create-business-events/business-event-name.png" alt-text="Screenshot of the Define business event page with an existing schema." lightbox="media/create-business-events/business-event-name.png":::

1. On the **Review and create** page, review the configuration, and then select **Create** to create your business event.

    :::image type="content" source="media/create-business-events/review-create-business-event.png" alt-text="Screenshot of the Review and create page for creating a business event from an existing schema." lightbox="media/create-business-events/review-create-business-event.png":::

    After you create your business event, you can manage its properties, assign roles and permissions, and monitor its usage from the Real-Time hub. 

## Manage business event schema in Real-Time hub

To manage a business event from the Real-Time hub, follow these steps: 

1. Hover the mouse over the business event you want to manage, select the **ellipsis (...)** menu, and then select **Manage event schema**.

    :::image type="content" source="./media/create-business-events/manage-event-schema-menu.png" alt-text="Screenshot of the Business events page with Manage event schema menu for a business event." lightbox="./media/create-business-events/manage-event-schema-menu.png":::
 
1. To update the schema as your business requirements change, follow steps from [Update an event schema](../../real-time-intelligence/schema-sets/create-manage-event-schemas.md#update-an-event-schema) . 

## Manage business event schema in Schema Registry

In addition to the Real-Time hub, you can also manage business events through the **Schema Registry**. The Schema Registry acts as a centralized repository for all schemas used across your events and pipelines. 

In the Schema Registry, you can create new schemas, update existing ones, and deprecate outdated definitions. Changes in the registry are reflected across all associated business events, making it easy to maintain consistency and compliance across your data ecosystem. 

For more information about how to manage schemas in the Schema Registry, see [Manage event schemas in Schema Registry](../../real-time-intelligence/schema-sets/create-manage-event-schemas.md#update-an-event-schema).

## Delete a business event

1. Go to Real-Time hub.

1. Select **Business events** under the **Subscribe to** category.

1. Hover the mouse over the business event you want to delete, select the **ellipsis (...)** menu, and then select **Delete**.

    :::image type="content" source="./media/create-business-events/delete-business-event.png" alt-text="Screenshot of the Business events page with Delete menu for a business event." lightbox="./media/create-business-events/delete-business-event.png":::

1. On the **Delete business event** confirmation dialog, select **Delete** to confirm the deletion.

    :::image type="content" source="./media/create-business-events/delete-confirmation.png" alt-text="Screenshot of the Delete business event confirmation dialog." lightbox="./media/create-business-events/delete-confirmation.png":::

You can also delete a business event from the **Details** page for the business event. 

1. In the **Business events** page of Real-Time hub, select the business event from the list to go to the **Details** page.

1. Select **Delete** on the ribbon at the top of the **Details** page.

    :::image type="content" source="./media/create-business-events/delete-from-detail-page.png" alt-text="Screenshot of the Details page for a business event with Delete button selected." lightbox="./media/create-business-events/delete-from-detail-page.png":::

1. Confirm the deletion on the confirmation dialog by selecting **Delete**.

    :::image type="content" source="./media/create-business-events/delete-confirmation.png" alt-text="Screenshot of the Delete business event confirmation dialog." lightbox="./media/create-business-events/delete-confirmation.png":::

## Related content

See the following end-to-end tutorials:

  - [Publish business events using Notebook and react using Activator](tutorial-business-events-notebook-user-data-function-activator.md)
  - [Publish business events using User Data Function and react using Activator](tutorial-business-events-user-data-function-activation-email.md)
  - [Publish business events using Eventstream and react using Activator](tutorial-business-events-event-stream-user-data-function-activator.md)