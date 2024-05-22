---
title: Overview of data connectors
description: Learn about the available data integrations.
ms.reviewer: aksdi
ms.author: shsagir
author: shsagir
ms.topic: conceptual
ms.date: 01/23/2024
# CustomerIntent: As a data ingestor, I want to know what data connectors and tools are available, so that I can choose the right one for my use case.
---
# Data connectors overview

Data ingestion is the process used to load data from one or more sources into a Real-Time Intelligence KQL database in Microsoft Fabric. Once ingested, the data becomes available for [query](/azure/data-explorer/kusto/query/index?context=/fabric/context/context-rti&pivots=fabric). Real-Time Intelligence provides several connectors for data ingestion.

The following table summarizes the available data connectors, tools, and integrations.

| Name | Functionality | Supports streaming? | Type | Use cases |
|--|--|:-:|--|--|
| [Apache Flink](#apache-flink) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/Azure/flink-connector-kusto/) | Telemetry |
| [Apache Kafka](#apache-kafka) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/Azure/kafka-sink-azure-kusto/) | Logs, Telemetry, Time series |
| [Apache Log4J 2](#apache-log4j-2) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/Azure/azure-kusto-log4j) | Logs |
| [Apache Spark](#apache-spark) | **Export**<br />**Ingestion** |  | [Open source](https://github.com/Azure/azure-kusto-spark/) | Telemetry |
| [Apache Spark for Azure Synapse Analytics](#apache-spark-for-azure-synapse-analytics) | **Export**<br />**Ingestion** |  | First party | Telemetry |
| [Azure Data Factory](#azure-data-factory) | **Export**<br />**Ingestion** |  | First party | Data orchestration |
| [Azure Event Hubs](#azure-event-hubs) | **Ingestion** | :heavy_check_mark: | First party | Messaging |
| [Azure Functions](#azure-functions) | **Export**<br />**Ingestion** |  | First party | Workflow integrations |
| [Azure Stream Analytics](#azure-stream-analytics) | **Ingestion** | :heavy_check_mark: | First party | Event processing |
| [Logstash](#logstash) | **Ingestion** |  | [Open source](https://github.com/Azure/logstash-output-kusto/) | Logs |
| [NLog](#nlog) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/Azure/azure-kusto-nlog-sink) | Telemetry, Logs, Metrics |
| [Open Telemetry](#open-telemetry) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/azuredataexplorerexporter) | Traces, Metrics, Logs |
| [Power Automate](#power-automate) | **Export**<br />**Ingestion** |  | First party | Data orchestration |
| [Serilog](#serilog) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/Azure/serilog-sinks-azuredataexplorer) | Logs |
| [Splunk](#splunk) | **Ingestion** |  | [Open source](https://github.com/Azure/azure-kusto-splunk/tree/main/splunk-adx-alert-addon) | Logs |
| [Splunk Universal Forwarder](#splunk-universal-forwarder) | **Ingestion** |  | [Open source](https://github.com/Azure/azure-kusto-splunk) | Logs |
| [Telegraf](#telegraf) | **Ingestion** | :heavy_check_mark: | [Open source](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/azure_data_explorer) | Metrics, Logs |

The following table summarizes the available connectors and their capabilities:

### Apache Flink

[Apache Flink](https://flink.apache.org/) is a framework and distributed processing engine for stateful computations over unbounded and bounded data streams. The connector implements data sink for moving data across Azure Data Explorer and Flink clusters. Using Azure Data Explorer and Apache Flink, you can build fast and scalable applications targeting data driven scenarios. For example, machine learning (ML), Extract-Transform-Load (ETL), and Log Analytics.

* **Functionality:** Ingestion
* **Ingestion type supported:** Streaming
* **Use cases:** Telemetry
* **Underlying SDK:** [Java](/azure/data-explorer/kusto/api/java/kusto-java-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/flink-connector-kusto/
* **Documentation:** [Get data from Apache Flink](/azure/data-explorer/ingest-data-flink?context=/fabric/context/context-rti&pivots=fabric)

### Apache Kafka

[Apache Kafka](https://kafka.apache.org/documentation/) is a distributed streaming platform for building real-time streaming data pipelines that reliably move data between systems or applications. Kafka Connect is a tool for scalable and reliable streaming of data between Apache Kafka and other data systems. The Kafka Sink serves as the connector from Kafka and doesn't require using code. This is gold certified by Confluent - has gone through comprehensive review and testing for quality, feature completeness, compliance with standards, and for performance.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Logs, Telemetry, Time series
* **Underlying SDK:** [Java](/azure/data-explorer/kusto/api/java/kusto-java-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/kafka-sink-azure-kusto/
* **Documentation:** [Get data from Apache Kafka](/azure/data-explorer/ingest-data-kafka?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Kafka ingestion into Azure Data Explorer](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/kafka-ingestion-into-azure-data-explorer-part-1/ba-p/1452439)

### Apache Log4J 2

[Log4J](https://logging.apache.org/log4j/2.x/)  is a popular logging framework for Java applications maintained by the Apache Foundation. Log4j allows developers to control which log statements are output with arbitrary granularity based on the logger's name, logger level, and message pattern. The Apache Log4J 2 sink allows you to stream your log data to your database, where you can analyze and visualize your logs in real time.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Logs
* **Underlying SDK:** [Java](/azure/data-explorer/kusto/api/java/kusto-java-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/azure-kusto-log4j
* **Documentation:** [Get data with the Apache Log4J 2 connector](/azure/data-explorer/apache-log4j2-connector?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Getting started with Apache Log4J and Azure Data Explorer](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/getting-started-with-apache-log4j-and-azure-data-explorer/ba-p/3705242)

### Apache Spark

[Apache Spark](https://spark.apache.org/) is a unified analytics engine for large-scale data processing. The [Spark connector](/azure/data-explorer/spark-connector?context=/fabric/context/context-rti&pivots=fabric) is an open source project that can run on any Spark cluster. It implements data source and data sink for moving data to or from Spark clusters. Using the Apache Spark connector, you can build fast and scalable applications targeting data driven scenarios. For example, machine learning (ML), Extract-Transform-Load (ETL), and Log Analytics. With the connector, your database becomes a valid data store for standard Spark source and sink operations, such as read, write, and writeStream.

* **Functionality:** Ingestion, Export
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Telemetry
* **Underlying SDK:** [Java](/azure/data-explorer/kusto/api/java/kusto-java-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/azure-kusto-spark/
* **Documentation:** [Apache Spark connector](/azure/data-explorer/spark-connector?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Data preprocessing for Azure Data Explorer for Azure Data Explorer with Apache Spark](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/data-pre-processing-for-azure-data-explorer-with-apache-spark/ba-p/2727993/)

### Apache Spark for Azure Synapse Analytics

[Apache Spark](https://spark.apache.org/) is a parallel processing framework that supports in-memory processing to boost the performance of big data analytic applications. [Apache Spark in Azure Synapse](/azure/synapse-analytics/spark/apache-spark-overview) Analytics is one of Microsoft's implementations of Apache Spark in the cloud. You can access a database from [Synapse Studio](/azure/synapse-analytics/) with Apache Spark for Azure Synapse Analytics.

* **Functionality:** Ingestion, Export
* **Ingestion type supported:** Batching
* **Use cases:** Telemetry
* **Underlying SDK:** [Java](/azure/data-explorer/kusto/api/java/kusto-java-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Documentation:** [Connect to an Azure Synapse workspace](/azure/synapse-analytics/quickstart-connect-azure-data-explorer)

### Azure Data Factory

[Azure Data Factory](/azure/data-factory) (ADF) is a cloud-based data integration service that allows you to integrate different data stores and perform activities on the data.

* **Functionality:** Ingestion, Export
* **Ingestion type supported:** Batching
* **Use cases:** Data orchestration
* **Documentation:** [Copy data to your database by using Azure Data Factory](/azure/data-explorer/data-factory-load-data?context=/fabric/context/context-rti&pivots=fabric)

### Azure Event Hubs

[Azure Event Hubs](/azure/event-hubs/event-hubs-about) is a big data streaming platform and event ingestion service. You can configure continuous ingestion from customer-managed Event Hubs.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Documentation:** [Azure Event Hubs data connection](/azure/data-explorer/ingest-data-event-hub-overview?context=/fabric/context/context-rti&pivots=fabric)

### Azure Functions

[Azure Functions](/azure/azure-functions/functions-overview) allow you to run serverless code in the cloud on a schedule or in response to an event. With input and output bindings for Azure Functions, you can integrate your database into your workflows to ingest data and run queries against your database.

* **Functionality:** Ingestion, Export
* **Ingestion type supported:** Batching
* **Use cases:** Workflow integrations
* **Documentation:** [Integrating Azure Functions using input and output bindings (preview)](/azure/data-explorer/integrate-azure-functions?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Azure Data Explorer (Kusto) Bindings for Azure Functions](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/azure-data-explorer-kusto-bindings-for-azure-functions-public/ba-p/3828472)

### Azure Stream Analytics

[Azure Stream Analytics](/azure/stream-analytics/stream-analytics-introduction) is a real-time analytics and complex event-processing engine that's designed to process high volumes of fast streaming data from multiple sources simultaneously.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Event processing
* **Documentation:** [Get data from Azure Stream Analytics](/azure/data-explorer/stream-analytics-connector?context=/fabric/context/context-rti&pivots=fabric)

### Logstash

[The Logstash plugin](/azure/data-explorer/ingest-data-logstash?context=/fabric/context/context-rti&pivots=fabric) enables you to process events from Logstash into an Azure Data Explorer database for later analysis.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching
* **Use cases:** Logs
* **Underlying SDK:** [Java](/azure/data-explorer/kusto/api/java/kusto-java-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/logstash-output-kusto/
* **Documentation:** [Get data from Logstash](/azure/data-explorer/ingest-data-logstash?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [How to migrate from Elasticsearch to Azure Data Explorer](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/how-to-migrate-from-elasticsearch-to-azure-data-explorer/ba-p/1621539/)

### NLog

NLog is a flexible and free logging platform for various .NET platforms, including .NET standard. NLog allows you to write to several targets, such as a database, file, or console. With NLog you can change the logging configuration on-the-fly. The NLog sink is a target for NLog that allows you to send your log messages to your database. The plugin provides an efficient way to sink your logs to your cluster.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Telemetry, Logs, Metrics
* **Underlying SDK:** [.NET](/azure/data-explorer/kusto/api/netfx/about-the-sdk?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/azure-kusto-nlog-sink
* **Documentation:** [Get data with the NLog sink](/azure/data-explorer/nlog-sink?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Getting started with NLog sink and Azure Data Explorer](https://aka.ms/adx-docs-nlog-blog)

### Open Telemetry

[The OpenTelemetry connector](/azure/data-explorer/open-telemetry-connector?context=/fabric/context/context-rti&pivots=fabric) supports ingestion of data from many receivers into your database. It works as a bridge to ingest data generated by Open telemetry to your database by customizing the format of the exported data according to your needs.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Traces, Metrics, Logs
* **Underlying SDK:** [Go](/azure/data-explorer/kusto/api/golang/kusto-golang-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Open Telemetry - https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/azuredataexplorerexporter
* **Documentation:** [Get data from OpenTelemetry](/azure/data-explorer/open-telemetry-connector?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Getting started with Open Telemetry and Azure Data Explorer](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/getting-started-with-open-telemetry-and-azure-data-explorer/ba-p/3675708)

### Power Automate

[Power Automate](/power-automate/getting-started) is an orchestration service used to automate business processes. The :::no-loc text="Power Automate"::: (previously Microsoft Flow) connector enables you to orchestrate and schedule flows, send notifications, and alerts, as part of a scheduled or triggered task.

* **Functionality:** Ingestion, Export
* **Ingestion type supported:** Batching
* **Use cases:** Data orchestration
* **Documentation:** [Microsoft Power Automate connector](/azure/data-explorer/flow?context=/fabric/context/context-rti&pivots=fabric)

### Serilog

Serilog is a popular logging framework for .NET applications. Serilog allows developers to control which log statements are output with arbitrary granularity based on the logger's name, logger level, and message pattern. The Serilog sink, also known as an appender, streams your log data to your database, where you can analyze and visualize your logs in real time.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Logs
* **Underlying SDK:** [.NET](/azure/data-explorer/kusto/api/netfx/about-the-sdk?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/serilog-sinks-azuredataexplorer
* **Documentation:** [Get data with the Serilog sink](/azure/data-explorer/serilog-sink?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Getting started with Serilog sink and Azure Data Explorer](https://go.microsoft.com/fwlink/p/?linkid=2227749)

### Splunk

[Splunk Enterprise](https://www.splunk.com/en_us/products/splunk-enterprise.html) is a software platform that allows you to ingest data from many sources simultaneously.The [Azure Data Explorer add-on](https://splunkbase.splunk.com/app/6979) sends data from Splunk to a table in your cluster.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching
* **Use cases:** Logs
* **Underlying SDK:** [Python](/azure/data-explorer/kusto/api/python/kusto-python-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** Microsoft Azure - https://github.com/Azure/azure-kusto-splunk/tree/main/splunk-adx-alert-addon
* **Documentation:** [Get data from Splunk](/azure/data-explorer/ingest-data-splunk?context=/fabric/context/context-rti&pivots=fabric)
* **Splunk Base:** [Microsoft Fabric Add-On for Splunk](https://classic.splunkbase.splunk.com/app/7069/)
* **Community Blog:** [Getting started with Microsoft Azure Data Explorer Add-On for Splunk](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/getting-started-with-microsoft-azure-data-explorer-add-on-for/ba-p/3917176)

### Splunk Universal Forwarder

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching
* **Use cases:** Logs
* **Repository:** Microsoft Azure - https://github.com/Azure/azure-kusto-splunk
* **Documentation:** [Get data from Splunk Universal Forwarder to Azure Data Explorer](/azure/data-explorer/ingest-data-splunk-uf?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:** [Get data using Splunk Universal forwarder into Azure Data Explorer](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/ingest-data-using-splunk-universal-forwarder-into-azure-data/ba-p/3964043)

### Telegraf

Telegraf is an open source, lightweight, minimal memory foot print agent for collecting, processing and writing telemetry data including logs, metrics, and IoT data. Telegraf supports hundreds of input and output plugins. It's widely used and well supported by the open source community. The output plugin serves as the connector from Telegraf and supports ingestion of data from many types of input plugins into your database.

* **Functionality:** Ingestion
* **Ingestion type supported:** Batching, Streaming
* **Use cases:** Telemetry, Logs, Metrics
* **Underlying SDK:** [Go](/azure/data-explorer/kusto/api/golang/kusto-golang-client-library?context=/fabric/context/context-rti&pivots=fabric)
* **Repository:** InfluxData - https://github.com/influxdata/telegraf/tree/master/plugins/outputs/azure_data_explorer
* **Documentation:** [Get data from Telegraf](/azure/data-explorer/ingest-data-telegraf?context=/fabric/context/context-rti&pivots=fabric)
* **Community Blog:**  [New Azure Data Explorer output plugin for Telegraf enables SQL monitoring at huge scale](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/new-azure-data-explorer-output-plugin-for-telegraf-enables-sql/ba-p/2829444)
