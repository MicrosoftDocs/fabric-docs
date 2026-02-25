---
title: Publish Business Events Using User Data Function
description: Learn how to publish business events using user data functions, and get notified through email by setting up an Activator rule in Microsoft Fabric.
#customer intent: As a data engineer, I want to create and publish a business event in Microsoft Fabric so that I can automate event-driven workflows.
ms.date: 02/24/2026
ms.topic: tutorial
---

# Publish business events using User Data Function (UDF) and get notified via email using Activator

This tutorial walks you through an end-to-end workflow for publishing business events using a user data function and setting up an Activator rule to react to those events with email notifications. The steps you follow are:

1. Create a business event and define its schema in Real-Time hub.
1. Create a user data function in your workspace that publishes a business event.
1. Validate the published events in Real-Time hub.
1. Create an Activator rule that listens for the business event and triggers an email notification when the event occurs.

## Create a new business event

1. Go to **Business events** in Real-Time hub.

1. Select **+ New business event** and then select **Create new schema**.

    :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/new-business-event-button.png" alt-text="Screenshot that shows the Business events page with + New Business event selected." lightbox="./media/tutorial-business-events-user-data-function-activation-email/new-business-event-button.png":::

1. Define the business event schema. 
    
    1. For **Name**, enter `OrderPlaced`.
    
    1. In the right pane, for **Event schema set**, select **Create**. 

        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/create-schema-set-menu.png" alt-text="Screenshot that shows the Define business event page." lightbox="./media/tutorial-business-events-user-data-function-activation-email/create-schema-set-menu.png":::
    
    1.  Enter `Orders` for the schema set name.

        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/schema-set-name.png" alt-text="Screenshot that shows the name of the event schema set." lightbox="./media/tutorial-business-events-user-data-function-activation-email/schema-set-name.png":::    
    
    1. Select **Add row** in the middle plane. 
    
        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/add-row-button.png" alt-text="Screenshot that shows the selection of the Add row button." lightbox="./media/tutorial-business-events-user-data-function-activation-email/add-row-button.png":::    

    1. Select **string** for **event type**, and enter `OrderID` for the **name**. 

        :::image type="content" source="./media/tutorial-business-events-user-data-function-activation-email/event-property-configuration.png" alt-text="Screenshot that shows the configuration of the business event property." lightbox="./media/tutorial-business-events-user-data-function-activation-email/event-property-configuration.png":::
    1. Repeat the previous step to add the following properties: `CustomerID` (string), `Quantity` (string), `OrderTotal` (string), `Status` (string), `DiscountApplied` (string)

        :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/define-business-event-schema.png" alt-text="Screenshot of the business event schema properties configuration." lightbox="media/tutorial-business-events-user-data-function-activation-email/define-business-event-schema.png":::

    1. Select **Next** to continue.

1. Review and confirm the configuration, and then select **Create** to create your business event.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/review-business-event-configuration.png" alt-text="Screenshot of the review and confirm page for creating a business event." lightbox="media/tutorial-business-events-user-data-function-activation-email/review-business-event-configuration.png":::

1. Confirm that you see the business event in the list of business events in Real-Time hub.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/business-event-list.png" alt-text="Screenshot of the list of business events in Real-Time hub." lightbox="media/tutorial-business-events-user-data-function-activation-email/business-event-list.png":::

## Configure user data function to publish business events

1. After creating the business event, open another tab in your web browser, and go to your workspace.

1. Select **+ New item** and then search for **User data functions** and select it.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/select-user-data-function-type.png" alt-text="Screenshot of the new user data function selection." lightbox="media/tutorial-business-events-user-data-function-activation-email/select-user-data-function-type.png":::

1. Enter `PublishOrderPlacedEvent` as the name for the user data function, and then select **Create**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/create-user-data-function.png" alt-text="Screenshot of creating a new user data function in the workspace." lightbox="media/tutorial-business-events-user-data-function-activation-email/create-user-data-function.png":::

1. Select **New function** to create a new function in the user data function item.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/create-new-function.png" alt-text="Screenshot of the new function button." lightbox="media/tutorial-business-events-user-data-function-activation-email/create-new-function.png":::

1. In the **Home** ribbon, select **Manage connections**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/manage-connections.png" alt-text="Screenshot of the Manage connections button in the Home ribbon." lightbox="media/tutorial-business-events-user-data-function-activation-email/manage-connections.png":::

1. In the **Connections** pane, select **+ Add connection**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/add-connection.png" alt-text="Screenshot of the Add connection button in the Connections pane." lightbox="media/tutorial-business-events-user-data-function-activation-email/add-connection.png":::

1. Search for **Orders**, select the schema set you created earlier, and then select **Connect**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/select-orders-schema-set.png" alt-text="Screenshot of selecting the business event schema set for the connection." lightbox="media/tutorial-business-events-user-data-function-activation-email/select-orders-schema-set.png"::: 

1. In the **Manage connection** pane, follow these steps:

    1. Confirm that the connection is listed under the Connected to this item section.
    
    1. Note down the alias for the connection, which is **Orders** by default. 
    
    1. Select **X** in the top-right corner to close the pane.

        :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/close-connections-pane.png" alt-text="Screenshot of Manage connections pane." lightbox="media/tutorial-business-events-user-data-function-activation-email/close-connections-pane.png":::         

1. Replace the existing code in the function with the following code.

    ```python
    import fabric.functions as fn 
    import logging 
    
    udf = fn.UserDataFunctions() 
    @udf.connection(argName="businessEventsClient", alias="Orders") 
    
    @udf.function() 
    def PublishOrders(businessEventsClient: fn.FabricBusinessEventsClient) -> str: 
        logging.info("PublishOrders invoked.") 
    
        # Prepare the event data payload 
    
        event_data = { 
            "OrderID": "12345",  
            "CustomerID": "C-10",
            "Quantity": "12",
            "OrderTotal": "23.21",
            "Status": "shipped",
            "DiscountApplied": "5%"
        } 
    
        # Generate the business event 
    
        businessEventsClient.PublishEvent( 
            type="OrderPlaced",  
            event_data=event_data,  
            data_version="v1" 
        ) 
    
        return "Event 'OrderPlaced' published successfully." 
 
    ```

1. In the **Functions explorer** pane, hover over the function you modified, select the ⋯ (three dots) menu, and then select **Test**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/test-function.png" alt-text="Screenshot of the Functions explorer with the Test option selected." lightbox="media/tutorial-business-events-user-data-function-activation-email/test-function.png":::

1. Before you can test or run the function, enable **Preview** features. 

    1. Select **Library management** on the ribbon.
    
    1. Switch to the **Settings** tab in the Library management pane.
    
    1. Enable the **Preview mode** by toggling the switch to On.
     
    1. Select **X** in the top-right corner to close the pane.
 
        :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/preview-mode.png" alt-text="Screenshot of the Library management pane with Preview mode enabled." lightbox="media/tutorial-business-events-user-data-function-activation-email/preview-mode.png":::
  
1. In the Test window, select **Test** to run the function, and confirm that it works as expected. You should see the output message **Event 'OrderPlaced' published successfully.** in the output pane.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/test-function-window.png" alt-text="Screenshot of the Test window for the user data function." lightbox="media/tutorial-business-events-user-data-function-activation-email/test-function-window.png":::


## Verify published business events

1. Switch to the tab with Real-Time hub page or select **Real-Time** on the left navigation pane. 

1. Go to **Business events** in Real-Time hub.

1. Select the `OrderPlaced` business event. 

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/select-business-event.png" alt-text="Screenshot of the Business events page with the event selected." lightbox="media/tutorial-business-events-user-data-function-activation-email/select-business-event.png":::

1. In the **Publisher** tab, confirm that you see an event and the **function** is listed in the publisher list. 

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/verify-published-event.png" alt-text="Screenshot of the OrderPlaced event page with a sample event and the publisher information." lightbox="media/tutorial-business-events-user-data-function-activation-email/verify-published-event.png":::    

1. Select the **Data preview** tab.

1. In the publisher filter, select the name of the function (**PublishOrderPlacedEvent**), which is a publisher.

1. Visualize the event in the preview table.


## Create an Activator trigger to consume events and send email notifications

1. Select the Real-Time hub icon in the left navigation pane of the Fabric portal.

1. In the Real-Time hub, select **Business events** under the **Subscribe to** category.

1. In the **Business events** list, locate `OrderPlaced` event. Select either the ⚡ lightning icon or the ⋯ (three dots) menu next to the event, and then select **Set alert**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/set-alert-business-event.png" alt-text="Screenshot of selecting the Set alert option for a business event." lightbox="media/tutorial-business-events-user-data-function-activation-email/set-alert-business-event.png":::

1. On the **Add rule** page, in the **Details** section, for **Rule name**, enter a name for the rule. For example, **OrderPlaced_Rule**. 

1. In the **Condition** section, for **Check**, select **On each event**.

1. In the **Action** section, select one of the following actions. To configure the alert to trigger a function when the condition is met, follow these steps:

    1. For **Select action**, select **Email**.
    
    1. For **To**, enter the email address where you want to receive the notification when the event occurs.
    
    1. For **Subject**, enter the subject of the email notification (for example, **Order Placed Event Detected**).
    
    1. For **Body**, enter the content of the email notification. While entering the content, enter `@` to access event properties to include in the email. You can also use dynamic content by selecting the icon next to each text box.

        :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/configure-email-action.png" alt-text="Screenshot of configuring the email action for the Activator rule." lightbox="media/tutorial-business-events-user-data-function-activation-email/configure-email-action.png":::

1. In the **Save location** section, for **Workspace**, select the workspace where you want to create the Fabric activator item.

1.  For **Item**, select the drop-down list, and then select **Create a new item**. 

1. For **New item name**, enter a name for the new Fabric activator item (for example, **OrderPlacedActivator**), and then select **Create**.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/create-rule-button.png" alt-text="Screenshot of the specifying a name for the activator item." lightbox="media/tutorial-business-events-user-data-function-activation-email/create-rule-button.png":::

1. You see the **Alert created** page with a link to open the rule in the Fabric activator user interface in a separate tab.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/alert-created-page.png" alt-text="Screenshot of the Alert created page." lightbox="media/tutorial-business-events-user-data-function-activation-email/alert-created-page.png":::

1. Select **Open** to open the rule in the Fabric Activator user interface.

## Test the solution 

### Publish another event

1. Switch to the tab with the user data function. 

1. Test the function again to publish another `OrderPlaced` event by selecting the **Test** button in the Test window.


### View business event in the Real-Time hub

#### Publishers tab

1. In the Real-Time hub, select **Business events** in the left menu.

1. Select **OrderPlaced** from the list of business events.

1. In the **Publisher** tab, confirm that you see the newly published event and the old event you published at the beginning of the tutorial. If you don't see the new event, select the refresh button to refresh the list of events. It might take a few seconds for the new event to appear in the list.
 
1. In the list of publishers, confirm that the function you used to publish the event is listed as a publisher.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/publishers-tab.png" alt-text="Screenshot of the Publishers tab of the business event page." lightbox="media/tutorial-business-events-user-data-function-activation-email/publishers-tab.png":::

#### Consumers tab

1. Switch to the **Consumers** tab. 

1. Confirm that you see an event was delivered within the last hour.

1. Confirm that the activator you created is listed as a consumer.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/consumers-tab.png" alt-text="Screenshot of the Consumers tab of the business event page." lightbox="media/tutorial-business-events-user-data-function-activation-email/consumers-tab.png":::

#### Data preview tab

1. Switch to the **Data preview** tab.

1. Confirm that you see the consumer filter with the activator you created.

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/data-preview-tab.png" alt-text="Screenshot of the consumer filter in the Data preview tab." lightbox="media/tutorial-business-events-user-data-function-activation-email/data-preview-tab.png":::
 
### View business event in the activator run history

1. Go to the workspace where you created the activator item, and open the activator item (for example, **OrderPlacedActivator**) if it's not already open.

1. In the activator item, select the **History** tab.

1. Confirm that you see one activation. In the **Activation details** pane at the bottom, you see the activation details that include context information you wanted to include in the email notification. 

    :::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/activator-rule-history.png" alt-text="Screenshot of the history tab for the Activator rule." lightbox="media/tutorial-business-events-user-data-function-activation-email/activator-rule-history.png":::

### Check your email for the notification

You should receive an email notification with the subject and content you configured in the email action of the activator rule. The email should also include the context information from the business event that you included in the email body.

:::image type="content" source="media/tutorial-business-events-user-data-function-activation-email/email-notification.png" alt-text="Screenshot of the email notification received." lightbox="media/tutorial-business-events-user-data-function-activation-email/email-notification.png":::