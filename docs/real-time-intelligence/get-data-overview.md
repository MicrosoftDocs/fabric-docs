---
title: Get data overview
description: Learn about available options to get data in an Eventhouse in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.subservice: rti-eventhouse
ms.date: 01/19/2026
# customer intent: As a customer, I want to learn about the different sources I can use to get data into an Eventhouse in Real-Time Intelligence.
---
# Get data overview

This article summarizes the methods available to ingest data directly into an [Eventhouse](eventhouse.md) by using the Get data experience.

:::image type="content" source="media/get-data-overview/get-data-types.png" alt-text="Screenshot of the available data types in the get data experience in Eventhouses in Real-Time Intelligence.":::

## Data sources

The following list shows data ingestion sources:

* [Local file](get-data-local-file.md)
* [OneLake](get-data-onelake.md)
* [Real-Time hub](get-data-real-time-hub.md)
* [Eventstream](get-data-eventstream.md)
* [Azure storage](get-data-azure-storage.md)
* [Azure Event Hubs](get-data-event-hub.md)
* [Amazon S3](get-data-amazon-s3.md)
* [Data Factory pipeline copy](../data-factory/connector-kql-database-copy-activity.md)
* [Data Factory dataflows](../data-factory/connector-azure-data-explorer.md)

Or get data from a wide range of data sources and connectors in the Real-Time Hub. Bring data into an Eventstream and later into your Eventhouse without leaving the get data workflow. In this case, select the [Connect more data sources](get-data-other-sources.md) option.

## Related content

* [Overview of connectors for data ingestion](event-house-connectors.md)
* [Data formats supported by Real-Time Intelligence](ingestion-supported-formats.md)
* [Sample Gallery](sample-gallery.md)
