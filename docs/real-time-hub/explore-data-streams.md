---
title: Explore data streams in Fabric Real-Time hub
description: This article shows how to explore data streams in Fabric Real-Time hub. It provides details on the three tabs in the Real-time Hub user interface.
author: ajetasin
ms.author: ajetasi
ms.topic: how-to
ms.date: 04/03/2024
---

# Explore streams in Fabric Real-Time hub
When you navigate to Real-Time hub in Fabric, you can view all the data streams that are present in Fabric. There are three tabs in the hub:

<<< SCREENSHOT >>>


| Tab | Description |
| --- | ----------- | 
| Data streams | You see all data streams that are actively running in Fabric that you have access to. It includes the following artifacts: <ul><li>Streams from Fabric eventstreams</li><li>KQL tables from KQL databases</li></ul> | 
| Microsoft sources | You see all Microsoft sources that you have access to and connect to Fabric. The current supported Microsoft sources are: <ul><li>Azure Event Hubs</li><li>Azure IoT Hub</li><li>Azure SQL DB Change Data Capture (CDC)</li><li>Azure Cosmos DB CDC</li><li>PostgreSQL DB CDC</li></ul> |
| Fabric events | You can monitor and react to the following events: <ul><li>Fabric Workspace Item events</li><li>Azure Blob Storage events</li></ul><p>These events can be used to trigger other actions or workflows, such as invoking a data pipeline or sending a notification via email. You can also send these events to other destinations via eventstreams.</p> |

## Data streams tab

<<< SCREENTSHOT>>>

### Columns
The Data streams tab has the following columns: 

| Column | Description |
| ------ | ----------- | 
| Name | Name of the stream or KQL table. |
| Item | Name of the parent artifact. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. |
| Owner | Name of owner of the parent artifact. |
| Location | Name of workspace where the parent artifact is located. |
| Endorsement | Endorsement status of the parent artifact. |
| Sensitivity | Sensitivity status of the parent artifact. |

### Filters
The following filters are available at the top for you to narrow down easily to the desired stream: 

| Filter | Description | 
| ------ | --------- | 
| Owner | You can filter on the name of the owner of the parent artifact. For a stream, it's the owner of the parent eventstream. For a KQL table, it's owner of the parent KQL database. |
| Item | You can filter on the desired parent artifact name. For a stream, it's the name of the eventstream. For a KQL table, it's the name of the KQL database. | 
| Location | You can filter on the desired workspace name. |

### Search
You can also search your streams/events using the search bar by typing in the name of stream. 

### Actions 
Here are the actions available on streams from eventstreams in the Data streams tab.

<<< SCREENSHOT >>>

| Action | Description |
| ------ | ----------- |
| Preview this data | Preview the data in the stream or derived stream. |
| Open eventstream | Open parent eventstream of the stream. |
| Endorse | Endorse parent eventstream of the stream. |

Here are the actions available on KQL table in the Data streams tab.

<<< SCREENSHOT >>>

| Action | Description |
| ------ | ----------- |
| Open KQL Database | Open parent KQL Database of the KQL table. |
| Endorse | Endorse parent KQL Database of the KQL table. |

## Microsoft sources tab

<<< SCREENSHOT >>>

### Columns

| Column | Description | 
| ------ | ----------- | 
| Name | Name of the Microsoft resource. |
| Source | Name of type of source. For example: Name of an Azure event hub, Azure IoT hub, Azure SQL Database CDC feed, Azure SQL Database CDC feed, PostgreSQL Database CDC feed, Azure Cosmos DB CDC feed. |
| Subscription | Name of the Azure subscription that contains the Azure resource. |
| Resource group | Name of the Azure resource group that has the Azure resource. | 
| Region | Region name of Azure resource. |

### Filters
The following filters are available at the top for you to narrow down easily to the desired Microsoft resource: 

| Filter | Description | 
| ------ | ----------- | 
| Source | You can filter on the desired type of Microsoft source. |
| Subscription |  You can filter on the desired Azure subscription name. |
| Resource group | You can filter on the desired Azure resource group name. |
| Region | You can filter on the desired region name. |

### Search
You can also search your Microsoft resource using the search bar by typing in the name of the source. 

### Actions
Here are the actions available on resources in the Microsoft sources tab.

<<< SCREENSHOT >>>

| Action | Description |
| ------ | ----------- | 
| Connect | Connect Fabric to your Microsoft resource. |


## Fabric events tab

### Columns
Fabric events have the following columns: 

| Column | Description | 
| ------ | ----------- | 
| Name | Name of event type group. There are two types of event groups: <ul><li>Azure blob storage events</li><li>Fabric workspace item events</li></ul>|
| Description | Description of event type group. |

### Actions
Here are the actions available on each event type group:  

| Action | Description | 
| ------ | ----------- | 
| Create eventstream | This action creates an eventstream on the selected event type group with all Event types selected. |
| Set alert | This action sets an alert on the selected event type group. |

## Related content

- [View data stream details](view-data-stream-details.md)
- [Preview] data streams](preview-data-streams.md)
- [Endorse data streams](endorse-data-streams.md)
- [Explore fabric events](explore-fabric-events.md)