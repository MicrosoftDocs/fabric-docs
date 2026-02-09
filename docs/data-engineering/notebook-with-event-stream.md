---
title: Query Microsoft Fabric Eventstream from a notebook with Spark Structured Streaming
description: Learn about integrating Microsoft Fabric Eventstream with notebooks using Spark Structured Streaming for real-time data processing.
ms.reviewer: spelluru
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
ms.date: 01/27/2026
ms.search.form: SparkStructuredStreaming Eventstream Notebook
---

# Query Microsoft Fabric Eventstream from a notebook with Spark Structured Streaming

Microsoft Fabric Eventstream is a fully managed event ingestion and streaming service that enables real-time data processing and analytics. You can integrate Eventstream with Microsoft Fabric notebooks using Spark Structured Streaming to process and analyze streaming data in real time.

This integration allows you to explore Eventstreams and other real-time sources through the Real-Time hub, right from within your Fabric notebooks. You can also create new Eventstreams and start ingesting data from nearly 30 (and growing) streaming sources including CDC-enabled databases, message brokers, streaming services and public feeds. The new programming model allows you to easily connect to Eventstream, read streaming data, and perform real-time analytics using familiar Spark APIs without any connection strings or credentials, making it more secure to build real-time applications

## Prerequisites
Before you begin, ensure you have the following prerequisites in place:
- A Microsoft Fabric workspace with Eventstream enabled.
- A notebook environment set up in Microsoft Fabric.
- Basic knowledge of Spark Structured Streaming and PySpark or Scala.

## Steps to Query Eventstream from a Notebook

1. **Discover and add eventstream into Notebook**:
    1. Open your Microsoft Fabric notebook.
    1. Select on **Add data items** under the **Data items** tab, then select **From Real-Time hub** from the dropdown menu.
    1. In the Real-Time hub dialog, locate the target eventstream you want to query with different search and filter options.
    1. Add the eventstream to your notebook environment.

        :::image type="content" source="media\notebook-with-event-stream\open-real-time-hub.png" alt-text="Screenshot showing how to discover eventstream in the Real-Time hub." lightbox="media\notebook-with-event-stream\open-real-time-hub.png":::

        After the eventstream item is added, it will appear under the **Real-Time hub** node in your notebook object explorer with the item name, after expanding the node, you'll see the default or derived stream within the eventstream item.

        :::image type="content" source="media\notebook-with-event-stream\event-stream-in-notebook.png" alt-text="Screenshot showing the added eventstream in the notebook object explorer." lightbox="media\notebook-with-event-stream\event-stream-in-notebook.png":::
2. **Read streaming data from eventstream**:
    1. From the context menu of the eventstream item in the object explorer, select **Read with Spark** to create a preconfigured code cell to read from the selected eventstream.
    
        :::image type="content" source="media\notebook-with-event-stream\read-event-stream-with-spark.png" alt-text="Screenshot showing how to read eventstream with Spark from the context menu." lightbox="media\notebook-with-event-stream\read-event-stream-with-spark.png":::
    1. In the newly created code cell, you can use the following PySpark code snippet to read streaming data from the eventstream:

        ```python
        from pyspark.sql import SparkSession
        from pyspark.sql.functions import col
        from pyspark.sql.types import StringType
        from pyspark.sql.dataframe import DataFrame
    
        eventstream_options = {
            "eventstream.itemid": __in_eventstream_item_id,
            "eventstream.datasourceid": __in_eventstream_datasource_id
        }
    
        # Read from Kafka using the config map
        df_raw = spark.readStream.format("kafka").options(**eventstream_options).load()
    
        decoded_df = df_raw.select(
            col("key").cast(StringType()).alias("key"),
            col("value").cast(StringType()).alias("value"),
            col("partition"),
            col("offset")
        )
    
        def showDf(x:DataFrame, y:int):
            x.show()
    
        # Print messages to the console
        query = decoded_df.writeStream.foreachBatch(showDf).outputMode("append").start()
        query.awaitTermination()
        ```

        The value of the `eventstream.itemid` and `eventstream.datasourceid` options are automatically populated in the parameter code cell above this code cell.
        
        > [!NOTE]
        > For each select on **Read with Spark**, a new code cell is generated with the necessary parameters automatically filled in, and a new Notebook destination is created for the Eventstream item, where the `eventstream.datasourceid` is unique for each Notebook destination. For one notebook item, we recommend that you set it once as destination for one Eventstream item to avoid creating multiple destinations.
        
        Before running any job, you can also preview the streaming data by clicking on the **Preview data** button in the context menu of the Eventstream item. A side panel opens to show a snapshot of the streaming data beside the notebook.
        
        :::image type="content" source="media\notebook-with-event-stream\preview-event-stream-data.png" alt-text="Screenshot showing how to preview Eventstream data from the context menu." lightbox="media\notebook-with-event-stream\preview-event-stream-data.png":::
        
3. **Add notebook as destination**:
You can also add the notebook as a destination for the Eventstream to start ingesting data into the Eventstream from within the notebook. For more information, see [Add a Spark Notebook destination to an eventstream](../real-time-intelligence/event-streams/add-destination-spark-notebook.md).


## Conclusion
Integrating Microsoft Fabric Eventstream with notebooks using Spark Structured Streaming enables you to process and analyze real-time data seamlessly. By following the steps outlined in this article, you can easily connect to Eventstream, read streaming data, and perform real-time analytics using familiar Spark APIs. This integration opens up new possibilities for building real-time applications and gaining insights from streaming data within the Microsoft Fabric ecosystem.

## Related content
To learn more about working with Eventstreams and notebooks in Microsoft Fabric, check out the following resources
- [Create and manage an Eventstream](../real-time-intelligence/event-streams/create-manage-an-eventstream.md)
- [Add a Spark Notebook destination to an eventstream](../real-time-intelligence/event-streams/add-destination-spark-notebook.md)
- [Spark Structured Streaming guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)