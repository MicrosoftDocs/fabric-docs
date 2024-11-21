---
title: What's new in Real-Time hub
description: Learn what is new with Fabric Real-Time hub, such as the latest release notes, known issues, bug fixes, deprecated functionality, and upcoming changes.
ms.topic: overview
ms.date: 11/18/2024
author: spelluru
ms.author: spelluru
---

# What's new in Fabric Real-Time hub?

Fabric Real-Time hub receives improvements on an ongoing basis. To stay up to date with the most recent developments, this article provides you with information about the features that are added or updated in a release. 

## November 2024

- **Simplified Azure Event Hubs source connection**: We simplified the experience for connecting to an existing Azure event hub. For users with the right permission to access the available event hubs, a single click is all it takes for Fabric to automatically establish the connection to the source
- **New sources**: Azure Service Bus, Apache Kafka, Change Data Capture (CDC) from SQL Server on virtual machine (VM) database (DB) and CDC from Azure SQL Managed Instance are added to the **Connect data source** wizard.
- **Rich sample scenarios**: For users who are new to Fabric Real-Time Intelligence, we provide three streaming data samples for you to get started.
- **Streams and KQL tables with read (or higher) permission**: Users can discover streams and Kusto Query Language (KQL) tables that they have read (or higher) access to within Real-Time Hub, which allows them to discover more data streams shared with them.
- **Real-time Dashboards (preview)**: Users can now quickly and automatically create real-time dashboards by selecting **Create Real-Time dashboards** on KQL tables. This Co-Pilot assisted feature can take users input to generate the most common real-time dashboards within seconds.
- **Job events & OneLake events**: You can now build event-driven applications, trigger Notebooks and workflows, send emails, or send a message on Teams when OneLake files/tables are created, deleted, or renamed (**OneLake events**) and Jobs are started or completed (**Job Events**).

    For more information, see [Accelerating Insights with Fabric Real-Time Hub (generally available)](https://blog.fabric.microsoft.com/blog/accelerating-insights-with-fabric-real-time-hub-now-generally-available).

## Next steps
For an overview of Fabric Real-Time hub, see [Introduction to Fabric Real-Time hub](real-time-hub-overview.md).
