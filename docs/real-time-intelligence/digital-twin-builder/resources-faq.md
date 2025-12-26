---
title: Digital twin builder (preview) frequently asked questions
description: This article contains answers to commonly asked questions about digital twin builder (preview).
author: baanders
ms.author: baanders
ms.date: 04/24/2025
ms.topic: concept-article
---

# Digital twin builder (preview) frequently asked questions

This article contains answers to commonly asked questions about digital twin builder (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## How can I use my data from Azure Data Lake Storage in digital twin builder? 

To make your [Azure Data Lake Storage Gen2](/azure/storage/blobs/data-lake-storage-introduction) data available in digital twin builder (preview), you can create a [shortcut](../../onelake/create-adls-shortcut.md) for your data from Azure Data Lake Storage into a Fabric lakehouse. The digital twin builder mapping process can access that lakehouse.

## Does digital twin builder support Eventstream?

Currently, you can store the data from [Fabric Eventstream](../event-streams/overview.md?tabs=enhancedcapabilities) in a lakehouse or eventhouse to use it in digital twin builder (preview). 