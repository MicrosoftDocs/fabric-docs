---
title: Overview of Real-time Analytics in Microsoft Fabric
description: Learn about Real-time Analytics in Microsoft Fabric
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: conceptual
ms.date: 02/28/2023
ms.search.form: product-kusto
---
# Unlimited scale

Real-time Analytics delivers high performance with an increasing volume of data or queries. You can begin with datasets as small as a few gigabytes and grow to as large as several petabytes. The Real-time Analytics service automatically scales your resources as your needs grow.

Some of the growth dimensions that can scale with you are:

* Concurrent queries
* Concurrent users
* Data storage
* Total queries

In general, scaling occurs in the background and does not affect performance. However, there is one stage where you may notice momentary suspension of the ability to create new items or get new data. If you're using streaming ingestion at this time, you may need to retry transient errors after resource scaling completes.

