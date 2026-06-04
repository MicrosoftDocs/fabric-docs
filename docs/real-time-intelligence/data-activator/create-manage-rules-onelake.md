---
title: Create and manage rules for OneLake items
description: Learn how to create and manage Fabric Activator rules for OneLake items.
ms.topic: how-to
ms.date: 05/14/2026
---

# Create and manage Activator rules for OneLake items

In the Fabric portal, you can create and manage Activator rules for OneLake items using Fabric Activator. These rules allow you to automate actions based on specific events or conditions related to OneLake items, such as when a file is created, or deleted. You can also create rules based on the status of processes that interact with OneLake items, such as pipelines, Spark jobs, and notebooks.

Use these templates to create a rule that sends a notification when a process run fails, succeeds, or when a specific event happens during the process run. For example, you can create a rule to send an email notification to the data engineering team when a pipeline run fails, or to trigger an Azure Function when a Spark job succeeds.

For a list of all supported actions for an Activator rule, see [Supported actions for Activator rules](rule-actions.md).

## Create and manage rules for a process

Fabric Activator supports templates for the following Fabric processes in OneLake so that you can easily create alerts from the OneLake user interface: 

- Pipelines
- Spark jobs
- Notebooks

The supported templates for these processes are:

- Automate action when a process fails.
- Automate action when a process succeeds.
- Automate action when a specific event happens in a process.

Use these templates to automate actions based on the status of the process run or specific events that occur during the process run. For example, you can create a rule to send an email notification to the data engineering team when a pipeline run fails, or to trigger an Azure Function when a Spark job succeeds.

To create a rule for a process, follow these steps: 

1. Hover over the process (pipeline, Spark job, or notebook) that you want to create a rule for, select **...**, and then select **Create and manage rules**. The following screenshot shows an example of how to create and manage rules for a pipeline in OneLake. 

    :::image type="content" source="./media/create-manage-rules-onelake/pipeline-create-manage-rules.png" alt-text="Screenshot that shows how to create and manage rules for a pipeline in OneLake." lightbox="./media/create-manage-rules-onelake/pipeline-create-manage-rules.png":::
1. In the **Rules pane**, select **Add rule** at the bottom of the pane. 

    :::image type="content" source="./media/create-manage-rules-onelake/rules-pane-add-rule-button.png" alt-text="Screenshot that shows the Add rule button in the Rules pane." lightbox="./media/create-manage-rules-onelake/rules-pane-add-rule-button.png":::
1. Select a template that fits your needs. For example, select the template to automate an action when a process run fails.
    
    :::image type="content" source="./media/create-manage-rules-onelake/select-process-activator-template.png" alt-text="Screenshot that shows Activator templates for a process." lightbox="./media/create-manage-rules-onelake/select-process-activator-template.png":::    
1. The **Details**, **Monitor**, **Condition**, **Action**, and **Save location** sections of the **Add rule** page are automatically populated based on the template you select. 

    :::image type="content" source="./media/create-manage-rules-onelake/add-rule-process.png" alt-text="Screenshot that shows the Add rule page for a process." lightbox="./media/create-manage-rules-onelake/add-rule-process.png":::        
1. Notice that **Source** is set to **Job events**. Select **Job events**. You see that `Microsoft.Fabric.JobEvents.ItemJobFailed` is selected as the event that triggers the rule. You also see that the **Item** is set to the pipeline that you selected to create the rule for. 

    :::image type="content" source="./media/create-manage-rules-onelake/pipeline-connection-settings.png" alt-text="Screenshot that shows the connection settings for a pipeline." lightbox="./media/create-manage-rules-onelake/pipeline-connection-settings.png":::
1. Select **X** in the top-right corner to close the connection settings pane. 
1. You can customize the **Action** section based on your needs. For example, in the **Action** section, you can specify the email address to send the notification to, or the Azure Function to trigger when the rule is activated. For more information about the available actions, see [Supported actions for Activator rules](rule-actions.md).
1. In the **Save location** section, select an existing Activator item to save the rule to, or create a new Activator item by selecting **+ Create new item**. An Activator item is a container for rules that share the same context and scope. For example, you can create an Activator item for all rules related to a specific project or team. 
1. On the **Add rule** page, select **Create** to create the rule. To learn more about creating an Activator rule, see [Create an Activator rule](activator-create-activators.md). See the [Rules](#rules-pane) section for instructions on how to manage the rule in the **Rules** pane.

## Create and manage rules for data stores

Fabric Activator supports templates for the following Fabric data stores in OneLake, so you can easily create alerts from the OneLake user interface: 

- Lakehouse
- Warehouse
- KQL Database
- SQL Database
- Mirrored Database

The supported templates for these data stores are:

- Automate action when a file or folder is created in OneLake
- Automate action when a file or folder is deleted in OneLake

Use these templates to automate actions based on specific events or conditions related to these data stores. For example, you can create a rule to send an email notification to the data engineering team when a file is created in a Lakehouse, or to trigger an Azure Function when a file is deleted from OneLake.

To create a rule for a data store, follow these steps:

1. Hover over the data store (Lakehouse, Warehouse, KQL Database, SQL Database, or Mirrored Database) that you want to create a rule for, select **...**, and then select **Create and manage rules**. The following screenshot shows an example of how to create and manage rules for a Lakehouse in OneLake. 

    :::image type="content" source="./media/create-manage-rules-onelake/lakehouse-create-manage-rules.png" alt-text="Screenshot that shows how to create and manage rules for a Lakehouse in OneLake." lightbox="./media/create-manage-rules-onelake/lakehouse-create-manage-rules.png":::
1. In the **Rules pane**, select **Add rule** at the bottom of the pane.

    :::image type="content" source="./media/create-manage-rules-onelake/rules-pane-add-rule-button.png" alt-text="Screenshot that shows the Add rule button in the Rules pane." lightbox="./media/create-manage-rules-onelake/rules-pane-add-rule-button.png":::
1. Select a template that fits your needs. For example, select the template to automate an action when a file or folder is created in OneLake. 

    :::image type="content" source="./media/create-manage-rules-onelake/select-data-store-activator-template.png" alt-text="Screenshot that shows Activator templates for a data store." lightbox="./media/create-manage-rules-onelake/select-data-store-activator-template.png":::
1. The **Details**, **Monitor**, **Condition**, **Action**, and **Save location** sections of the **Add rule** page are automatically populated based on the template you select. 

    :::image type="content" source="./media/create-manage-rules-onelake/add-rule-data-store.png" alt-text="Screenshot that shows the Add rule page for a data store." lightbox="./media/create-manage-rules-onelake/add-rule-data-store.png":::        
1. Notice that **Source** is set to **OneLake events**. Select **OneLake events**. You see that `Microsoft.Fabric.JobEvents.ItemJobFailed` is selected as the event that triggers the rule. You also see that the **Item** is set to the pipeline that you selected to create the rule for. 

    :::image type="content" source="./media/create-manage-rules-onelake/data-store-connection-settings.png" alt-text="Screenshot that shows the connection settings for a data store." lightbox="./media/create-manage-rules-onelake/data-store-connection-settings.png":::
1. Select **X** in the top-right corner to close the connection settings pane. Then, select **Yes. Cancel** in the confirmation dialog to confirm that you want to close the connection settings pane. 
1. You can customize the **Action** section based on your needs. For example, in the **Action** section, you can specify the email address to send the notification to, or the Azure Function to trigger when the rule is activated. For more information about the available actions, see [Supported actions for Activator rules](rule-actions.md).
1. In the **Save location** section, select an existing Activator item to save the rule to, or create a new Activator item by selecting **+ Create new item**. An Activator item is a container for rules that share the same context and scope. For example, you can create an Activator item for all rules related to a specific project or team. 
1. On the **Add rule** page, select **Create** to create the rule. To learn more about creating an Activator rule, see [Create an Activator rule](activator-create-activators.md). See the [Rules](#rules-pane) section for instructions on how to manage the rule in the **Rules** pane.

[!INCLUDE [rules-pane](./includes/rules-pane.md)]

## Related content
- [Create an Activator rule](activator-create-activators.md)
- [Supported actions for Activator rules](rule-actions.md)