---
title: Amazon Kinesis Data Streams connector for Fabric event streams
description: This include file has the common content for configuring an Amazon Kinesis Data Streams connector for Fabric event streams and Real-Time hub.
ms.author: xujiang1
author: xujxu 
ms.topic: include
ms.custom:
  - build-2024
ms.date: 04/24/2024
---

1. On the **Select a data source** screen, select **Kinesis Data Streams**.

   ![A screenshot of selecting Kinesis Data Streams.](media/amazon-kinesis-data-streams-connector/select-external-source.png)

1. On the **Connect** screen, enter the **Connection settings** and **Connection credentials** for your AWS Kinesis Data Stream.

   ![A screenshot of the Connect screen.](media/amazon-kinesis-data-streams-connector/connect.png)

   - For **Data Stream Name**, enter the data stream name from AWS Kinesis as shown in the following screenshot.

     ![A screenshot of the AWS Kinesis data stream screen.](media/amazon-kinesis-data-streams-connector/data-stream-name.png)

   - For **Connection name**, enter a name for this cloud connection.

   - For **API Key** and **API Secret**, enter the credentials you use to access your Kinesis Data Stream. Go to the Amazon IAM console and select **Security credentials**. Copy an **Access Key ID** from the **Access keys** screen and paste it into **API Key** and **API Secret**.

     ![A screenshot of how to access the AWS Kinesis security credentials.](media/amazon-kinesis-data-streams-connector/data-stream-name.png)

1. For **Source name**, enter a source name for this new eventstream source.

1. Scroll down, and under **Configure Amazon Kinesis data source**, enter a **Region** for the data source. You can find the Amazon region code such as **us-west-2** from the Kinesis **Data stream summary**.

   ![A screenshot of the Region field for Configure Amazon Kinesis data source.](media/amazon-kinesis-data-streams-connector/source-name-region.png)

1. Select **Connect**.

1. Select **Next**. On the **Review and create** screen, review the summary and then select **Add**. You can see the Amazon Kinesis Data Stream source added to your eventstream in the editor.

