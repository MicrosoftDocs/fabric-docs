---
title: Confluent Cloud for Apache Kafka Source in Fabric Eventstream
description: Provides information on adding a Confluent Cloud for Apache Kafka source to an eventstream in Microsoft Fabric along with limitations.
ms.reviewer: zhenxilin
ms.topic: how-to
ms.date: 04/02/2026
author: spelluru
ms.author: spelluru
ms.search.form: Source and Destination
#Customer intent: I want to learn how to bring events from a Confluent Cloud for Apache Kafka source into Microsoft Fabric.
---

# Add Confluent Cloud for Apache Kafka source to an eventstream
This article shows you how to add Confluent Cloud for Apache Kafka source to an eventstream. 

[!INCLUDE [confluent-kafka-source-description-prerequisites](./includes/connectors/confluent-kafka-source-description-prerequisites.md)]

## Launch the Select a data source wizard
[!INCLUDE [launch-connect-external-source](./includes/launch-connect-external-source.md)]

## Configure and connect to Confluent Cloud for Apache Kafka

[!INCLUDE [confluent-kafka-connector-configuration](./includes/connectors/confluent-kafka-source-connector-configuration.md)]

You see that the Confluent Cloud for Apache Kafka source is added to your eventstream on the canvas in **Edit mode**. To implement this newly added Confluent Cloud for Apache Kafka source, select **Publish** on the ribbon. 

:::image type="content" source="./media/add-source-confluent-kafka/edit-view.png" alt-text="Screenshot that shows Confluent Cloud for Apache Kafka source in Edit view." lightbox="./media/add-source-confluent-kafka/edit-view.png":::

After you complete these steps, the Confluent Cloud for Apache Kafka source is available for visualization in **Live view**.

:::image type="content" source="./media/add-source-confluent-kafka/live-view.png" alt-text="Screenshot that shows Confluent Cloud for Apache Kafka source in Live view." lightbox="./media/add-source-confluent-kafka/live-view.png":::

> [!NOTE]
> To preview events from this Confluent Cloud for Apache Kafka source, ensure that the API key used to create the cloud connection has **read permission** for consumer groups prefixed with **"preview-"**. If the API key was created using a **user account**, no extra steps are required, as this type of key already has full access to your Confluent Cloud for Apache Kafka resources, including read permission for consumer groups prefixed with **"preview-"**. However, if the key was created using a **service account**, you need to manually **grant read permission** to consumer groups prefixed with **"preview-"** in order to preview events.
>
> For Confluent Cloud for Apache Kafka sources, preview is supported for messages in Confluent **AVRO** format when the data is encoded using Confluent Schema Registry. If the data isn't encoded using Confluent Schema Registry, only **JSON** formatted messages can be previewed.

:::image type="content" source="./media/add-source-confluent-kafka/data-preview.png" alt-text="Screenshot that shows Confluent Cloud for Apache Kafka source data preview." lightbox="./media/add-source-confluent-kafka/data-preview.png":::

## Related content

A few other connectors:

- [Amazon Kinesis Data Streams](add-source-amazon-kinesis-data-streams.md)
- [Google Cloud Pub/Sub](add-source-google-cloud-pub-sub.md) 
- [Sample data](add-source-sample-data.md)


