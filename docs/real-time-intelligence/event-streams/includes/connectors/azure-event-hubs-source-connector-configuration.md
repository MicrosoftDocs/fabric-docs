---
title: Azure Event Hubs connector for Fabric eventstreams
description: This file has the common content for configuring an Azure Event Hubs connector for Fabric eventstreams and real-time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 04/01/2026
---

::: zone pivot="basic-features"  

1. On **Configure connection settings**, confirm that **Basic** is selected for the feature level, and then select **New connection**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/new-connection-button.png" alt-text="Screenshot that shows the page for configuring a connection setting, with the link for a new connection highlighted." lightbox="./media/azure-event-hubs-source-connector/new-connection-button.png":::

    If there's an existing connection to your event hub, select that existing connection. Then, move on to configuring the data format in the following steps.

    :::image type="content" source="./media/azure-event-hubs-source-connector/existing-connection.png" alt-text="Screenshot that shows the Connect page with an existing connection to an Azure event hub." lightbox="./media/azure-event-hubs-source-connector/existing-connection.png":::

1. In the **Connection settings** section, follow these steps:

    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

    :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::

1. In the **Connection credentials** section, follow these steps:

    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key. For instructions on getting an access key, see [Get an Azure Event Hubs connection string](/azure/event-hubs/event-hubs-get-connection-string#azure-portal).
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows entered credentials for an Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

1. For **Consumer group**, enter the name of the consumer group. The default consumer group for the event hub is **$Default**.

1. For **Data format**, select a data format for the incoming real-time events that you want to get from your Azure event hub. You can select from JSON, Avro, and CSV (with header) data formats.  

    :::image type="content" source="./media/azure-event-hubs-source-connector/consumer-group.png" alt-text="Screenshot that shows the area for entering a consumer group and data format." lightbox="./media/azure-event-hubs-source-connector/consumer-group.png":::

1. On the **Source details** pane to the right, select the pencil icon next to the source name, and then enter a name for the source. This step is optional.

    :::image type="content" source="./media/azure-event-hubs-source-connector/source-name.png" alt-text="Screenshot that shows the pencil icon for the source name on the pane for source details." lightbox="./media/azure-event-hubs-source-connector/source-name.png":::

1. Select **Next** at the bottom of the page.

    :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-2.png" alt-text="Screenshot that shows the Next button on the page for configuring connection settings." lightbox="./media/azure-event-hubs-source-connector/connect-page-2.png":::

1. On the **Review + connect** page, review the settings, and then select **Add**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/review-create-page.png" alt-text="Screenshot that shows the page for reviewing settings and creating an Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/review-create-page.png":::

::: zone-end

::: zone pivot="extended-features"

1. On **Configure connection settings**, for **Choose feature level**, select **Extended features**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-connect.png" alt-text="Screenshot that shows the page for configuring connection settings, with the option for extended features selected." lightbox="./media/azure-event-hubs-source-connector/extended-connect.png":::

    If there's an existing connection to your event hub, select that existing connection. Then, move on to configuring the data format in the following steps.

1. In the **Connection settings** section, follow these steps:

    1. Enter the name of the Event Hubs namespace.
    1. Enter the name of the event hub.

        :::image type="content" source="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png" alt-text="Screenshot that shows the connection settings with the Event Hubs namespace and the event hub specified." lightbox="./media/azure-event-hubs-source-connector/select-namespace-event-hub.png":::

1. In the **Connection credentials** section, follow these steps:

    Select the appropriate tab below and follow the steps for your required **Authentication kind**.

    #### [Shared access key](#tab/shared-access-key)

    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Authentication kind**, confirm that **Shared Access Key** is selected.
    1. For **Shared Access Key Name**, enter the name of the shared access key. For instructions on getting an access key, see [Get an Azure Event Hubs connection string](/azure/event-hubs/event-hubs-get-connection-string#azure-portal).
    1. For **Shared Access Key**, enter the value of the shared access key.
    1. Select **Connect**.

        :::image type="content" source="./media/azure-event-hubs-source-connector/connect-page-1.png" alt-text="Screenshot that shows entered credentials for an Azure Event Hubs connector." lightbox="./media/azure-event-hubs-source-connector/connect-page-1.png":::

    #### [Workspace identity](#tab/workspace-identity)
    
    If you want to use **workspace identity** for authentication, complete the following steps before configuring the connection:

    1. Check whether your workspace has workspace identity enabled. If not, go to **Workspace settings > Workspace identity**, and enable Workspace identity.

        :::image type="content" source="../../media/streaming-connector-virtual-network-on-premises-support/enable-workspace-identity.png" alt-text="Screenshot of showing where to enable workspace identity." lightbox="../../media/streaming-connector-virtual-network-on-premises-support/enable-workspace-identity.png":::

    1. Copy the workspace identity **ID** from **Workspace settings → Workspace identity**.

        :::image type="content" source="../../media/streaming-connector-virtual-network-on-premises-support/copy.png" alt-text="Screenshot of showing where to copy workspace identity ID." lightbox="../../media/streaming-connector-virtual-network-on-premises-support/copy.png":::

    1. In your Azure Event Hub, open **Access control (IAM)** and select **Add role assignment**.

        :::image type="content" source="./media/azure-event-hubs-source-connector/add-role-assignment.png" alt-text="Screenshot that shows where to add a role assignment in Azure Event Hub access control." lightbox="./media/azure-event-hubs-source-connector/add-role-assignment.png":::
    
    1. Search for and select the **Azure Event Hubs Data Receiver** role, then select **Next**.

        :::image type="content" source="./media/azure-event-hubs-source-connector/data-receiver.png" alt-text="Screenshot that shows selecting the Azure Event Hubs Data Receiver role and choosing Next." lightbox="./media/azure-event-hubs-source-connector/data-receiver.png":::

    1. Under **Assign access to**, choose **User, group, or service principal**.
    1. Select **Members**, and then enter your workspace name or paste the **ID** you copied to find your workspace. Select **Next**.

        :::image type="content" source="./media/azure-event-hubs-source-connector/add-members.png" alt-text="Screenshot that shows selecting Members and locating the workspace by name or ID." lightbox="./media/azure-event-hubs-source-connector/add-members.png":::

    After completing these steps, return to the connection configuration page and continue:

    1. For **Connection name**, enter a name for the connection to the event hub.
    1. For **Data gateway**, select the appropriate option based on your Event Hub network configuration:
        - If your event hub is public, select **none**.
        - If your event hub is under a private network and you want to connect through a streaming virtual network data gateway, select the streaming vNet data gateway (prefixed with **[Streaming VNET]**). You can select the refresh icon to get the newly created gateway listed.

        > [!NOTE]
        > If a data gateway is selected, skip the test connection step in this connection creation wizard.
    1. For **Authentication kind**, confirm that **workspace identity** is selected.

        :::image type="content" source="./media/azure-event-hubs-source-connector/workspace-identity.png" alt-text="Screenshot that shows entered credentials for an Azure Event Hubs connector via workspace identity." lightbox="./media/azure-event-hubs-source-connector/workspace-identity.png":::

    ---

1. For **Consumer group**, enter the name of the consumer group. The default consumer group for the event hub is **$Default**.

    :::image type="content" source="./media/azure-event-hubs-source-connector/extended-consumer-group.png" alt-text="Screenshot that shows the area for entering a consumer group for extended features." lightbox="./media/azure-event-hubs-source-connector/extended-consumer-group.png":::

### Stream or source details

[!INCLUDE [stream-source-details](./stream-source-details.md)]

[!INCLUDE [azure-event-hubs-schema-review-connect](./azure-event-hubs-schema-review-connect.md)]
::: zone-end
