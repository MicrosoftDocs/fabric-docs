---
title: What is Real-Time Intelligence
description: Learn about Real-Time Intelligence in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: overview
ms.custom:
  - build-2024
ms.date: 04/24/2024
ms.search.form: Overview
---
# What is Real-Time Intelligence?

Real-Time Intelligence is a powerful service that empowers everyone in
your organization to extract insights and visualize their data in
motion. It offers an end-to-end solution for event-driven scenarios,
streaming data, and data logs. Whether dealing with gigabytes or
petabytes, all organizational data in motion converges in the Real-Time
Hub. It seamlessly connects time-based data from various sources using
no-code connectors, enabling immediate visual insights, geospatial
analysis, and trigger-based reactions that are all part of an
organization-wide data catalog.

Once you seamlessly connect any stream of data, the entire SaaS solution
becomes accessible. Real-Time Intelligence handles data ingestion,
transformation, storage, analytics, visualization, tracking, AI, and
real-time actions. Your data remains protected, governed, and integrated
across your organization, seamlessly aligning with all Fabric offerings.
Real-Time Intelligence transforms your data into a dynamic, actionable
resource that drives value across the entire organization.

## Can Real-Time Intelligence help me?

Real-Time Intelligence can be used for data analysis, immediate visual
insights, centralization of data in motion for an organization, actions
on data, efficient querying, transformation, and storage of large
volumes of structured or unstructured data. Whether you need to evaluate
data from IoT systems, system logs, free text, semi structured data, or
contribute data for consumption by others in your organization,
Real-Time Intelligence provides a versatile solution.

Even though it's called "real-time," your data doesn't have to be
flowing at high rates and volumes. Real-Time Intelligence gives you
event-driven, rather than schedule-driven solutions. The Real-Time
Intelligence components are built on trusted, core Microsoft services,
and together they extend the overall Fabric capabilities to provide
event-driven solutions.

Real-Time Intelligence applications span a wide variety of business
scenarios, such as automotive, manufacturing, IoT, fraud detection,
business operations management, and anomaly detection.

## How do I use Real-Time Intelligence?

Real-Time Intelligence in Microsoft Fabric offers capabilities that, in
combination, enable the creation of Real-Time Intelligence solutions in
support of business and engineering processes.

:::image type="content" source="media/overview/overview-schematic.png" alt-text="Diagram of the architecture of Real-Time Intelligence in Microsoft Fabric." lightbox="media/overview/overview-schematic.png" border="none":::

-   The Real-time hub serves as a centralized catalog within your organization. It facilitates easy access, addition, exploration, and data sharing. By expanding the range of data sources, it enables broader insights and visual clarity across various domains. Importantly, this hub ensures that data is not only available but also accessible to all, promoting quick decision-making and informed action. The sharing of streaming data from diverse sources unlocks the potential to build comprehensive business intelligence across your organization.

-   Once you select a stream from your organization or connected to
    outside or internal sources, you can use the data consumption tools
    in Real-Time Intelligence to explore your data. The data consumption
    tools use visual data exploration process and drill down on data
    insights. You can access data that's new to you and easily
    understand the data structure, patterns, anomalies, and forecasting
    quantities and rates of data and act or make smart decision on top
    of your data. Real-Time dashboards come equipped with out-of-the-box
    interactions that simplify the process of understanding data, making
    it accessible to anyone who wants to make decision based on data in
    motion using visual tools, Natural Language and Copilot.

-   These insights can be turned into actions with Data Activator, as
    you set up Reflex alerts from various parts of Fabric to react to
    data patterns or conditions in real-time.

##  How do you interact with the components of Real-Time Intelligence?

### Discover streaming data

The Real-time hub is used to discover and manage your streaming data.
Real-time hub events is a catalog of data in motion, and contains:

-   **Data streams:** All data streams that are actively running in
    Fabric, which you have access to.

-   **Microsoft sources:** Easily discover streaming sources that you
    have and quickly configure ingestion of those sources into Fabric,
    for example: Azure Event Hubs, Azure IoT Hub, Azure SQL DB Change
    Data Capture (CDC), Azure Cosmos DB CDC, PostgreSQL DB CDC.

-   **Fabric events**: Fabric workloads raise their own events, called
    system events, that let you react to changes or new items having
    been created. All system events that you can subscribe to from
    Real-time hub, including Fabric system events and external
    system events brought in from Azure, Microsoft 365, or other clouds.

This data is all presented in a readily consumable format and is
available to all Fabric workloads.

### Connect to streaming data

Event streams are the Fabric platform way to capture, transform, and
route high volumes of real-time events to various destinations with a
no-code experience. Event streams support multiple data sources and data
destinations, including a wide range of connectors to external sources,
for example: Apache Kafka clusters, database change data capture feeds,
AWS streaming sources (Kinesis), and Google (GCP Pub/Sub).

### Process data streams

By using the event processing capabilities in Event streams, you can do
filtering, data cleansing, transformation, windowed aggregations, and
dupe detection, to land the data in the shape you want. You can also use
the content-based routing capabilities to send data to different
destinations based on filters. Another feature, derived event streams,
lets you construct new streams as a result of transformations and/or
aggregations that can be shared to consumers in Real-time hub.

### Store and analyze data

While all Fabric data stores are compatible with Real-time hub, Event
houses are the ideal storage solution for streaming data in Fabric. They're tailored to time-based, streaming events with
structured, semi structured, and unstructured data. This data is
automatically indexed and partitioned based on ingestion time, giving
you incredibly fast and complex analytic querying capabilities on
high-granularity data. Data stored in Event houses can be made available
in OneLake for consumption by other Fabric experiences.

The indexed, partitioned data stored in Event houses is ready for
lightning-fast query using various code, low-code, or no-code
options in Fabric. Data can be queried in native KQL (Kusto Query
Language) or using T-SQL in the KQL queryset. The Kusto copilot, along
with the no-code query exploration experience, streamlines the process
of analyzing data for both experienced KQL users and citizen data
scientists. KQL is a simple, yet powerful language to query structured,
semi-structured, and unstructured data. The language is expressive, easy
to read and understand the query intent, and optimized for authoring
experiences.

### Visualize data insights

These data insights can be visualized in KQL querysets, Real-Time
dashboards and Power BI reports, with seconds from data ingestion to
insights. Visualization options range from no-code to fully specialized
experiences, giving value to both the novice and expert insights
explorer to visualize their data as charts and tables. You can use
visual cues to perform filtering and aggregation operations on query
results and using a rich list of built-in visualizations. These insights
can be viewed in Power BI Reports and Real-Time Dashboards, both of
which can have alerts built upon the data insights.

### Trigger actions

Alerts monitor changing data and automatically take actions when
patterns or conditions are detected. The data can be flowing in
Real-time hub, or observed from a Kusto query or Power BI report. When
certain conditions or logic is met, an action is then taken, such as
alerting users, executing Fabric job items like a pipeline, or kicking
off Power Automate workflows. The logic can be either a simply defined
threshold, a pattern such as events happening repeatedly over a time
period, or the results of complex logic defined by a KQL query. Data
Activator turns your event-driven insights into actionable business
advantages.

## Integrate with other Fabric experiences 

-   Route events from Event streams to Fabric item destinations
-   Emit events from Fabric items into Real-time hub
-   Data in OneLake can be accessed by Real-Time Intelligence in several
    ways:
    -   Data from OneLake can be queried from Real-Time Intelligence as
        a shortcut.
    -   Data from OneLake can be loaded into Real-Time Intelligence.
    -   Data loaded into Real-Time Intelligence is reflected in OneLake
        as one logical copy.
-   Data loaded into Real-Time Intelligence can be used as the
    underlying data for visualization in a Power BI report.
-   Data loaded into Real-Time Intelligence can be used for analysis in
    Fabric Notebooks in Data Engineering.
-   Trigger data pipeline actions in Data Factory
-   Trigger data loading events using Dataflows
-   Trigger actions from Power BI reports
-   Trigger actions from Fabric notebooks

##  Related content

-   Tutorial
-   What is Real-time hub
-   What is Event streams
-   User flows
