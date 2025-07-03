---
title: Stream and consume events to and from Real-Time Intelligence using the Apache Kafka endpoint in an eventstream
description: Learn how to stream and consume events to and from Real-Time Intelligence by using the Apache Kafka endpoint in an eventstream.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom: sfi-image-nochange, sfi-ropc-blocked
ms.date: 10/30/2024
ms.search.form: Eventstreams Tutorials
---

# Tutorial: Stream and consume events to and from Real-Time Intelligence by using an Apache Kafka endpoint in an eventstream

In this tutorial, you learn how to use the Apache Kafka endpoint provided by a custom endpoint source in the enhanced capabilities of Microsoft Fabric event streams to stream events to Real-Time Intelligence. (A custom endpoint is called a *custom app* in the standard capabilities of Fabric event streams.) You also learn how to consume these streaming events by using the Apache Kafka endpoint from an eventstream's custom endpoint destination.

In this tutorial, you:

> [!div class="checklist"]
>
> - Create an eventstream.
> - Get the Kafka endpoint from a custom endpoint source.
> - Send events with a Kafka application.
> - Get the Kafka endpoint from a custom endpoint destination.
> - Consume events with a Kafka application.

## Prerequisites

- Get access to a workspace with Contributor or higher permissions where your eventstream is located.
- Get a Windows machine and install the following components:
  - [Java Development Kit (JDK) 1.7+](/azure/developer/java/fundamentals/java-support-on-azure)
  - A Maven binary archive ([download](https://maven.apache.org/download.cgi) and [install](https://maven.apache.org/install.html))
  - [Git](https://www.git-scm.com/)

## Create an eventstream in Microsoft Fabric
[!INCLUDE [create-an-eventstream](./includes/create-an-eventstream.md)]

## Retrieve the Kafka endpoint from an added custom endpoint source

To get a Kafka topic endpoint, add a custom endpoint source to your eventstream. The Kafka connection endpoint is then readily available and exposed within the custom endpoint source.

To add a custom endpoint source to your eventstream:

1. On your eventstream home page, select **Use custom endpoint** if it's an empty eventstream.

   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/use-custom-endpoint.png" alt-text="Screenshot that shows selecting the option of using a custom endpoint.":::

   Or, on the ribbon, select **Add source** > **Custom endpoint**.

   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/add-source-custom-endpoint.png" alt-text="Screenshot of selecting a custom endpoint as a source for an eventstream." lightbox="media/stream-consume-events-using-kafka-endpoint/add-source-custom-endpoint.png":::
2. Enter a **Source name** value for the custom endpoint, and then select **Add**.

   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/add-custom-endpoint-name.png" alt-text="Screenshot of entering custom endpoint name.":::
3. Check that the custom endpoint source appears on the eventstream's canvas in edit mode, and then select **Publish**.

   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/custom-endpoint-edit-mode.png" alt-text="Screenshot that shows an added custom endpoint in edit mode." lightbox="media/stream-consume-events-using-kafka-endpoint/custom-endpoint-edit-mode.png":::

4. After you successfully publish the eventstream, you can retrieve its details, including information about Kafka endpoint. Select the custom endpoint source tile on the canvas. Then, in the bottom pane of the custom endpoint source node, select the **Kafka** tab.

   On the **SAS Key Authentication** page, you can get the following important Kafka endpoint information:

   - `bootstrap.servers={YOUR.BOOTSTRAP.SERVER}`
   - `security.protocol=SASL_SSL`
   - `sasl.mechanism=PLAIN`
   - `sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="$ConnectionString" password="{YOUR.CONNECTION.STRING}";`

   `{YOUR.BOOTSTRAP.SERVER}` is the **Bootstrap server** value on the **SAS Key Authentication** page. `{YOUR.CONNECTION.STRING}` can be either the **Connection string-primary key** value or the **Connection string-secondary key** value. Choose one to use.

   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/kafka-keys-sample-code.png" lightbox="media/stream-consume-events-using-kafka-endpoint/kafka-keys-sample-code.png" alt-text="Screenshot that shows Kafka keys and sample code.":::

   For more information about the **SAS Key Authentication** and **Sample code** pages, see [Kafka endpoint details](./add-source-custom-app.md?pivots=enhanced-capabilities#kafka).

## Send events with a Kafka application

With the important Kafka information that you obtained from the preceding step, you can replace the connection configurations in your existing Kafka application. Then you can send the events to your eventstream.

Here's one application based on the Azure Event Hubs SDK written in Java by following the Kafka protocol. To use this application to stream events to your eventstream, use the following steps to replace the Kafka endpoint information and execute it properly:

1. Clone the [Azure Event Hubs for Kafka repository](https://github.com/Azure/azure-event-hubs-for-kafka).
1. Go to *azure-event-hubs-for-kafka/quickstart/java/producer*.
1. Update the configuration details for the producer in *src/main/resources/producer.config* as follows:

   - `bootstrap.servers={YOUR.BOOTSTRAP.SERVER}`
   - `security.protocol=SASL_SSL`
   - `sasl.mechanism=PLAIN`
   - `sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="$ConnectionString" password="{YOUR.CONNECTION.STRING}";`
  
   Replace `{YOUR.BOOTSTRAP.SERVER}` with the **Bootstrap server** value.
   Replace `{YOUR.CONNECTION.STRING}` with either the **Connection string-primary key** value or the **Connection string-secondary key** value. Choose one to use.
1. Update the topic name with the new topic name in `src/main/java/TestProducer.java` as follows: `private final static String TOPIC = "{YOUR.TOPIC.NAME}";`.

   You can find the `{YOUR.TOPIC.NAME}` value on the **SAS Key Authentication** page under the **Kafka** tab.
1. Run the producer code and stream events into the eventstream:

   - `mvn clean package`
   - `mvn exec:java -Dexec.mainClass="TestProducer"`
  
   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/kafka-producer-code.png" alt-text="Screenshot that shows producer code.":::

1. Preview the data that you sent with this Kafka application. Select the eventstream node, which is the middle node that displays your eventstream name.

   Select the data format **CSV with delimiter comma without header**. This choice matches the format in which the application streamed the event data.

   :::image type="content" source="media/stream-consume-events-using-kafka-endpoint/kafka-data-preview.png" alt-text="Screenshot that shows a Kafka data preview.":::

## Get the Kafka endpoint from an added custom endpoint destination

You can add a custom endpoint destination to get the Kafka connection endpoint details for consuming events from your eventstream. After you add the destination, you can get the information from the destination's **Details** pane in the live view.

From the **Basic** page, you can get the **Consumer group** value. You need this value to configure the Kafka consumer application later.

From the **SAS Key Authentication** page, you can get the important Kafka endpoint information:

- `bootstrap.servers={YOUR.BOOTSTRAP.SERVER}`
- `security.protocol=SASL_SSL`
- `sasl.mechanism=PLAIN`
- `sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="$ConnectionString" password="{YOUR.CONNECTION.STRING}";`

`{YOUR.BOOTSTRAP.SERVER}` is the **Bootstrap server** value. `{YOUR.CONNECTION.STRING}` can be either the **Connection string-primary key** value or the **Connection string-secondary key** value. Choose one to use.

## Consume events with a Kafka application

Now you can use another application in the [Azure Event Hubs for Kafka repository](https://github.com/Azure/azure-event-hubs-for-kafka) to consume the events from your eventstream. To use this application for consuming events from your eventstream, follow these steps to replace the Kafka endpoint details and run it appropriately:

1. Clone the [Azure Event Hubs for Kafka repository](https://github.com/Azure/azure-event-hubs-for-kafka).
1. Go to *azure-event-hubs-for-kafka/quickstart/java/consumer*.
1. Update the configuration details for the consumer in *src/main/resources/consumer.config* as follows:

   - `bootstrap.servers={YOUR.BOOTSTRAP.SERVER}`
   - `group.id={YOUR.EVENTHUBS.CONSUMER.GROUP}`
   - `security.protocol=SASL_SSL`
   - `sasl.mechanism=PLAIN`
   - `sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule required username="$ConnectionString"`
   - `password="{YOUR.CONNECTION.STRING}";`

   Replace `{YOUR.BOOTSTRAP.SERVER}` with the **Bootstrap server** value. You can get the `{YOUR.EVENTHUBS.CONSUMER.GROUP}` value from the **Basic** page on the **Details** pane for the custom endpoint destination. Replace `{YOUR.CONNECTION.STRING}` with either the **Connection string-primary key** value or the **Connection string-secondary key** value. Choose one to use.

1. Update the topic name with the new topic name on the **SAS Key Authentication** page in *src/main/java/TestConsumer.java* as follows: `private final static String TOPIC = "{YOUR.TOPIC.NAME}";`.

   You can find the `{YOUR.TOPIC.NAME}` value on the **SAS Key Authentication** page under the **Kafka** tab.
1. Run the consumer code and stream events into the eventstream:

   - `mvn clean package`
   - `mvn exec:java -Dexec.mainClass="TestConsumer"`

If your eventstream has incoming events (for example, your previous producer application is still running), verify that the consumer is now receiving events from your eventstream topic.

:::image type="content" source="media/stream-consume-events-using-kafka-endpoint/kafka-incoming-events.png" alt-text="Screenshot that shows Kafka incoming events.":::

By default, Kafka consumers read from the end of the stream rather than the beginning. A Kafka consumer doesn't read any events that are queued before you begin running the consumer. If you start your consumer but it isn't receiving any events, try running your producer again while your consumer is polling.

## Conclusion

Congratulations. You learned how to use the Kafka endpoint exposed from your eventstream to stream and consume the events within your eventstream. If you already have an application that's sending or consuming from a Kafka topic, you can use the same application to send or consume the events within your eventstream without any code changes. Just change the connection's configuration information.
