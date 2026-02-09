---
title: Functions activity
description: Learn how to add a functions activity to a pipeline and use it to run Fabric user data functions or Azure Functions.
ms.reviewer: shaween18, abnarain
ms.topic: how-to
ms.custom: 
  - pipelines
  - Build-2025
ms.date: 12/08/2025
---

# Use the Functions activity to run Fabric user data functions or Azure Functions

The Functions activity in Data Factory for Microsoft Fabric allows you to run custom code as part of your data pipeline. When you add a Functions activity, you choose which type of function to run:

- **[Fabric user data functions](../data-engineering/user-data-functions/user-data-functions-overview.md)**: Reusable Python functions that you create and manage within Microsoft Fabric. Use Fabric user data functions when you want to centralize business logic that can be invoked from pipelines, notebooks, Activator rules, or external applications. User data functions are ideal for data transformations, validation rules, and business logic that needs to be consistent across your Fabric workloads.

- **[Azure Functions](/azure/azure-functions/functions-overview)**: Serverless functions hosted in Azure. Use Azure Functions when you need capabilities beyond what Fabric user data functions provide, such as different language runtimes or integration with Azure services outside of Fabric.

This article shows you how to add a Functions activity to a pipeline and configure it for either type of function.

## Prerequisites

To get started, you must complete the following prerequisites:

[!INCLUDE[basic-prerequisites](includes/basic-prerequisites.md)]

## Add a Functions activity to a pipeline

The steps in this section apply whether you're configuring the activity to run Fabric user data functions or Azure Functions. After you add the activity and configure general settings, you choose which type of function to run.

To add a Functions activity to your pipeline:

1. In your workspace, select **+ New item**.
1. In the **New item** dialog, search for **Pipeline** and select it.
1. In the **New pipeline** dialog, enter a name for the pipeline and select **Create**.
1. On the pipeline home page, select the **Activities** tab.
1. In the Activities ribbon, select the **...** (ellipsis) icon to see more activities.
1. Search for **Functions** in the list of activities under **Orchestrate**, then select it to add the functions activity to the pipeline canvas.

   :::image type="content" source="media/functions-activity/add-functions-activity-to-pipeline.png" alt-text="Screenshot of the Fabric UI with the Activities pane and Functions activity highlighted.":::

### Configure general settings

The general settings apply to both Fabric user data functions and Azure Functions activities.

1. Select the Functions activity on the pipeline editor canvas if it isn't already selected.
1. Select the **General** tab.

   :::image type="content" source="media/functions-activity/functions-activity-general-settings.png" alt-text="Screenshot showing the General settings tab of the Functions activity.":::

1. Enter a **Name** for the activity.
1. Optionally, configure retry settings and specify whether you're passing secure input or output.

For more information, see the [General settings](activity-overview.md#general-settings) guidance.

## Configure the activity for user data functions

To run Fabric user data functions, configure the activity settings as follows:

1. Select the **Settings** tab.
1. Select **Fabric user data functions** as the **Type**.

    :::image type="content" source="media/functions-activity/fabric-user-data-functions-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Fabric user data functions activity.":::

1. In the **Connection** dropdown, select a connection that you want to use. If you don't see the connection you want, select **Browse all**.
1. In the **Choose a data source to get started** dialog, search for **User Data Functions** and select it. You should see it listed under **New sources**.
1. In the **Connect to data source** dialog, you can keep the default connection name and credentials. Make sure you're signed in, then select **Connect**.

   > [!NOTE]
   > If you already have a connection, it might be preselected in the dialog. You can keep the existing connection or select **Create new connection** from the dropdown to create a new one.

1. Back on the activity settings, select **UserDataFunctions** from the **Connection** dropdown. This connection is the connection you just created.
1. Select the **Workspace** containing your user data functions item.
1. Select the **User data functions** item name.
1. Select the **Function** that you want to invoke.
1. Provide input parameters for your selected function. You can use static values or dynamic content from pipeline expressions.

> [!TIP]
> To enter dynamic content, select the field you want to populate, then press **Alt+Shift+D** to open the expression builder.

For more information about creating and running user data functions in pipelines, see [Create and run user data functions activity in pipelines](../data-engineering/user-data-functions/create-functions-activity-data-pipelines.md) in the Data Engineering documentation.

## Configure the activity for Azure Functions

Instead of choosing **Fabric user data functions**, you can choose **Azure function** as the **Type** to run Azure Functions from your pipeline.

To configure the activity for Azure Functions:

1. Select the **Settings** tab.
1. Select **Azure function** as the **Type**.

    :::image type="content" source="media/functions-activity/azure-function-activity-settings.png" alt-text="Screenshot showing the Settings tab of the Azure Function activity.":::

1. Select an existing **Azure Function connection** or create a new one.
1. Provide a **Function relative URL** that points to the relative path to the Azure App function within the Azure Function connection.
1. Select an HTTP **Method** to be submitted to the URL.
1. Optionally, specify extra **Headers** as required for the function you're executing.

## Use an on-premises or virtual network data gateway for Azure Functions

If your Azure Function App is secured behind a firewall or private network, you can use a data gateway to establish a secure connection. Data gateways act as a bridge between Fabric and resources that aren't publicly accessible:

- **On-premises data gateway (OPDG)**: Installed on a server within your network. It allows Fabric to connect to your Azure Functions through a secure channel without opening inbound ports.
- **Virtual network (VNET) data gateway**: A managed service that connects to Azure resources within a virtual network, without requiring an on-premises installation.

> [!NOTE]
> Data gateway support is available for **Azure Functions only**. Fabric user data functions don't currently support on-premises or VNET data gateways.

For guidance on creating and configuring your OPDG, see [How to create on-premises data gateway](how-to-access-on-premises-data.md). If you want to use a VNET gateway, see [How to create a VNET data gateway](/data-integration/vnet/create-data-gateways).

Once you successfully created and configured your gateway, it appears under the **Data Gateway** dropdown in the Azure Function connection dialog.

:::image type="content" source="media/functions-activity/create-new-connection-with-data-gateway-azure-function.png" alt-text="Screenshot showing the data gateway connection dialog for the Azure Function activity.":::

## Save and run or schedule the pipeline

[!INCLUDE[save-run-schedule-pipeline](includes/save-run-schedule-pipeline.md)]

## Related content

- [Activity overview](activity-overview.md)
- [How to monitor pipeline runs](monitor-pipeline-runs.md)
- [Create and run user data functions in pipelines](../data-engineering/user-data-functions/create-functions-activity-data-pipelines.md)
