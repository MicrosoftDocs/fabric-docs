---
title: Amazon Kinesis Data Streams connector for Fabric event streams
description: This file has the common content for configuring an Amazon Kinesis Data Streams connector for Fabric event streams and Real-Time hub.
ms.reviewer: xujiang1
ms.topic: include
ms.date: 03/31/2026
---


1. On **Connect**, select **New connection** to create a connection.

    :::image type="content" source="./media/amazon-kinesis-data-streams-connector-configuration/new-connection-link.png" alt-text="Screenshot that shows the Connect page with the New connection highlighted.":::
1. In **Connection settings**, enter the data stream name from Amazon Kinesis for **Data Stream name**.

    :::image type="content" border="true" source="media/amazon-kinesis-data-streams-connector-configuration/data-stream-name.png" alt-text="A screenshot of the Amazon Kinesis data stream screen.":::
1. In **Connection credentials**, complete the following steps:
    1. Enter a name for this cloud connection in **Connection name**.
    1. Confirm that **Kinesis key** is selected for **Authentication kind**. 
    1. Enter the credentials you use to access your Kinesis Data Stream for **API Key** and **API Secret**. Go to the Amazon Identity and Access Management (IAM) console and select **Security credentials**. Copy an **Access Key ID** from the **Access keys** screen and paste it into **API Key** and **API Secret**.

    :::image type="content" source="./media/amazon-kinesis-data-streams-connector-configuration/credentials.png" alt-text="A screenshot of how to access the Amazon Web Services (AWS) Kinesis security credentials.":::
1. Select **Connect**. 

    :::image type="content" source="./media/amazon-kinesis-data-streams-connector-configuration/connect.png" alt-text="A screenshot of the Connect screen.":::

1. On **Connect**, enter a source name for this new eventstream source in **Source name**.
1. Scroll down, and under **Configure Amazon Kinesis data source**, enter a **Region** for the data source. You can find the Amazon region code such as **us-west-2** from the Kinesis **Data stream summary**.

    :::image type="content" source="./media/amazon-kinesis-data-streams-connector-configuration/source-name-region.png" alt-text="A screenshot of the Region field for Configure Amazon Kinesis data source.":::
    
[!INCLUDE [stream-source-details](./stream-source-details.md)]




