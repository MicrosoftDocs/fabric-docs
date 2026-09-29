---
title: Add an SAP Datasphere source to an eventstream
description: Learn how to add the dedicated SAP Datasphere source to a Fabric eventstream and configure an SAP Replication Flow to send data.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 09/18/2026
ms.search.form: Source and Destination
ai-usage: ai-assisted
---

# Add an SAP Datasphere source to an eventstream

The dedicated SAP Datasphere source creates an eventstream source and a Kafka endpoint for receiving replicated data from SAP Datasphere. You use the endpoint properties to configure an Apache Kafka connection and Replication Flow in SAP Datasphere.

This article shows you how to add the SAP Datasphere source, configure SAP Datasphere to send data, and verify the incoming events.

## Prerequisites

Before you begin, make sure you have:

- Access to a workspace assigned to a Fabric capacity or trial capacity.
- Contributor or higher permissions in the workspace.
- An SAP Datasphere account with Premium Outbound Integration enabled.
- Access to an SAP Datasphere space and a supported source connection for the data that you want to replicate.

## Add SAP Datasphere as a source

1. In Fabric, open **Real-Time hub**.
1. Select **Add data** under **Streaming data**.
1. Search for **SAP Datasphere**.
1. On the **SAP Datasphere** tile, select **Connect**.

   :::image type="content" source="./media/add-source-sap-datasphere/select-sap-datasphere-source.png" alt-text="Screenshot of the Real-Time hub Add data page showing the Connect option for the SAP Datasphere source." lightbox="./media/add-source-sap-datasphere/select-sap-datasphere-source.png":::

1. On the **Configure connection settings** page, enter a name for the source.
1. Under **Stream details**, select the workspace and enter a name for the eventstream. Then select **Next**.

   :::image type="content" source="./media/add-source-sap-datasphere/configure-sap-datasphere-source.png" alt-text="Screenshot of the SAP Datasphere Configure connection settings page showing the source name, workspace, eventstream name, and stream name." lightbox="./media/add-source-sap-datasphere/configure-sap-datasphere-source.png":::

1. On the **Review + connect** page, confirm that the eventstream and source were created successfully. Select **Open Eventstream**.

   :::image type="content" source="./media/add-source-sap-datasphere/review-and-connect-source.png" alt-text="Screenshot of the SAP Datasphere Review and connect page showing successful eventstream and source creation and the Open Eventstream button." lightbox="./media/add-source-sap-datasphere/review-and-connect-source.png":::

## Get the Kafka connection properties

The SAP Datasphere source provides a Kafka endpoint for SAP Datasphere Replication Flow. Retrieve its properties after you create the source.

1. In the eventstream live view, select the SAP Datasphere source.
1. In the **Details** pane, copy these values:

   - **Kafka broker**
   - **Topic name**
   - **Kafka SASL password-primary** or **Kafka SASL password-secondary**

1. Note the displayed **Security protocol** and SASL mechanism. The connection uses `SASL_SSL` with the `PLAIN` mechanism.

   :::image type="content" source="./media/add-source-sap-datasphere/kafka-connection-properties.png" alt-text="Screenshot of an SAP Datasphere source in an eventstream showing the Kafka broker, topic name, security protocol, and SASL password properties." lightbox="./media/add-source-sap-datasphere/kafka-connection-properties.png":::

Keep these values available when you create the Apache Kafka connection in SAP Datasphere.

## Create an Apache Kafka connection in SAP Datasphere

1. In the connection management page of your SAP Datasphere space, create a connection.
1. Select **Apache Kafka** as the connection type.

   :::image type="content" source="./media/replicate-data-with-replication-flow/select-apache-kafka.png" alt-text="Screenshot of the SAP Datasphere connection creation page with Apache Kafka selected." lightbox="./media/replicate-data-with-replication-flow/select-apache-kafka.png":::

1. Configure these connection properties:

   | Property | Value |
   | --- | --- |
   | **Kafka Brokers** | Enter the **Kafka broker** value from the SAP Datasphere source in Eventstream. |
   | **Authentication Type** | Select **User Name And Password**. |
   | **Kafka SASL User Name** | Enter `$ConnectionString`. |
   | **Kafka SASL Password** | Enter the primary or secondary Kafka SASL password from the SAP Datasphere source. |
   | **Replication Flows** | Select **Enable**. |

1. Select **Save**.

   :::image type="content" source="./media/replicate-data-with-replication-flow/connection-properties.png" alt-text="Screenshot of the SAP Datasphere Apache Kafka connection properties used for a Replication Flow." lightbox="./media/replicate-data-with-replication-flow/connection-properties.png":::

## Create a replication flow

Use the Apache Kafka connection as the target of an SAP Datasphere replication flow. For more information, see [Create a Replication Flow](https://help.sap.com/docs/SAP_DATASPHERE/c8a54ee704e94e15926551293243fd1d/25e2bd7a70d44ac5b05e844f9e913471.html) in the SAP documentation.

1. In SAP Datasphere, select **Data Builder**.
1. Select **New Replication Flow**.

   :::image type="content" source="./media/replicate-data-with-replication-flow/create-data-builder.png" alt-text="Screenshot of the SAP Datasphere Data Builder page showing the option to create a Replication Flow." lightbox="./media/replicate-data-with-replication-flow/create-data-builder.png":::

1. Select a source connection and source container, and then add the source objects to replicate.

   :::image type="content" source="./media/replicate-data-with-replication-flow/create-replication-flow.png" alt-text="Screenshot of an SAP Datasphere Replication Flow showing the selected source connection, container, and source objects." lightbox="./media/replicate-data-with-replication-flow/create-replication-flow.png":::

1. For the target connection, select the Apache Kafka connection that you created.

   :::image type="content" source="./media/replicate-data-with-replication-flow/target-connection.png" alt-text="Screenshot of an SAP Datasphere Replication Flow with an Apache Kafka target connection selected." lightbox="./media/replicate-data-with-replication-flow/target-connection.png":::

1. Change the target object name to the **Topic name** from the SAP Datasphere source in Eventstream.

   :::image type="content" source="./media/replicate-data-with-replication-flow/target-object-name.png" alt-text="Screenshot of an SAP Datasphere Replication Flow showing the target object name configured with the Eventstream topic name." lightbox="./media/replicate-data-with-replication-flow/target-object-name.png":::

   > [!IMPORTANT]
   > The target object name must match the Eventstream topic name. SAP Datasphere assigns the source object name by default, so change it before you deploy the flow.

1. Make sure **Delete All Before Loading** isn't selected in the target object settings.

   > [!NOTE]
   > The Eventstream Kafka endpoint doesn't allow SAP Datasphere to delete its topic. If you select **Delete All Before Loading**, target setup fails with an authorization error.

   :::image type="content" source="./media/replicate-data-with-replication-flow/delete-all-before-loading.png" alt-text="Screenshot of SAP Datasphere target object settings showing the Delete All Before Loading option cleared." lightbox="./media/replicate-data-with-replication-flow/delete-all-before-loading.png":::

## Deploy and verify the replication flow

1. In SAP Datasphere, deploy and activate the replication flow.
1. Open the SAP Datasphere monitoring page and confirm that the flow is running without errors.

   :::image type="content" source="./media/replicate-data-with-replication-flow/status.png" alt-text="Screenshot of the SAP Datasphere monitoring page showing the status of a Replication Flow." lightbox="./media/replicate-data-with-replication-flow/status.png":::

1. In Fabric, open the eventstream that contains the SAP Datasphere source.
1. Select the default stream, and then verify that replicated events appear in the data preview.

   :::image type="content" source="./media/add-source-sap-datasphere/eventstream-getting-events-from-sap-datasphere.png" alt-text="Screenshot of an active SAP Datasphere source with replicated sales records in the Eventstream data preview." lightbox="./media/add-source-sap-datasphere/eventstream-getting-events-from-sap-datasphere.png":::

## Related content

- [Add and manage an eventstream source](add-manage-eventstream-sources.md)
- [Create and manage an eventstream](create-manage-an-eventstream.md)
- [Preview data in an eventstream](preview-data.md)
- [Replicate SAP Datasphere data by using a custom endpoint](replicate-data-with-replication-flow.md)
