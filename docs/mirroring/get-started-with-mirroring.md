---
title: Get Started with Mirroring in Fabric
description: New to Mirroring in Microsoft Fabric? Start here to learn the basics, find your source, and see where to go next.
ms.reviewer: sbahadur, maprycem, tinglee
ms.topic: overview
ms.date: 07/20/2026
ms.subservice: mirroring
ms.search.form: Get started
ai-usage: ai-assisted
#customer intent: As someone new to Mirroring in Fabric, I want a short starting point that tells me the basics and points me to what to read next, so that I can begin without having to absorb the full overview article first.
---

# Get started with mirroring in Fabric

Mirroring makes data from another system available in OneLake, up-to-date in near real time. No extract, transform, and load (ETL) pipelines. No scheduled refreshes. Once you set up mirroring, you can analyze the data by using Power BI, Spark, notebooks, and any other Fabric tool that reads OneLake.

This article walks you through the mirroring lifecycle: setting up your first mirror and operating it after it's running. For deeper technical detail, including [the three types of mirroring](overview.md#types-of-mirroring), [replication timing](overview.md#near-real-time-replication), and [the cost model](overview.md#cost-of-mirroring), see [What is Mirroring in Fabric?](overview.md)

## The mirroring lifecycle

Most mirrored sources move through the same stages. This article follows the stages in order:

- **[Set up your mirror](#set-up-your-mirror)** - Pick your source and follow its tutorial.
- **[Explore your mirrored data](#explore-your-mirrored-data)** - Query and analyze the data now sitting in OneLake.
- **[Monitor and manage your mirror](#monitor-and-manage-your-mirror)** - Watch replication health, control access, and secure sensitive content.
- **[Troubleshoot mirroring](#troubleshoot-mirroring)** - Diagnose replication issues when they come up.
- **[Extend and automate](#extend-and-automate)** - Use advanced capabilities, and manage mirrors as code with the REST API and CI/CD.

> [!TIP]  
> Fabric SQL database is an exception: mirroring is configured automatically, so you can skip ahead to exploring the data.

## Set up your mirror

Find your source in the following table and follow the tutorial. Each tutorial covers source-specific prerequisites at the top. The **Type of mirroring** column tells you whether your source is replicated into OneLake or referenced through shortcuts.

Sources marked **(preview)** are in [public preview](../fundamentals/preview.md); all other sources are generally available.

[!INCLUDE [Mirrored data sources](includes/mirrored-sources-table.md)]

> [!TIP]  
> If your source isn't listed, use [open mirroring](open-mirroring.md) to build your own connector, or check the [open mirroring partners ecosystem](open-mirroring-partners-ecosystem.md) for existing third-party integrations.

## Explore your mirrored data

After your mirror is running, you can query and analyze the data through the SQL analytics endpoint that Fabric creates automatically. You can also use the data directly in lakehouses, notebooks, Power BI reports, and Copilot.

- [Explore your mirrored database](explore.md) - start with the query editor in Fabric.
- [Explore mirrored data directly in OneLake](explore-data-directly.md) - connect to the Delta tables from external tools.
- [Explore mirrored data with notebooks](explore-onelake-shortcut.md) - use OneLake shortcuts to combine mirrored data with other lakehouse content.

## Monitor and manage your mirror

Keep an eye on replication health, control access, and secure sensitive content.

- [Monitor mirrored databases](monitor.md) - see status, latency, and errors.
- [Mirrored database logs](monitor-logs.md) - dig into detailed replication events.
- [Share and manage permissions](share-and-manage-permissions.md) - control who can query or manage the mirrored item.

## Troubleshoot mirroring

If mirroring isn't working the way you expected, start with [Troubleshoot Mirroring](troubleshooting.md) for common issues and diagnostic steps. Each connector also has its own troubleshooting article, linked from the connector's overview.

## Extend and automate

For advanced scenarios, use extended capabilities to shape the mirrored data. Use the REST API and CI/CD support to manage mirrors as code.

- [Extended capabilities](extended-capabilities.md) - Delta change data feed, mirroring views, and their pricing implications.
- [Mirroring REST API](mirrored-database-rest-api.md) - create and manage mirrored items programmatically.
- [CI/CD for mirrored databases](mirrored-database-cicd.md) - deploy mirrors through source control and deployment pipelines.

## Related content

- [What is Mirroring in Fabric?](overview.md)
- [Cost of mirroring](overview.md#cost-of-mirroring)
- [Share your mirrored database and manage permissions](share-and-manage-permissions.md)
- [Open mirroring in Microsoft Fabric](open-mirroring.md)
- [OneLake shortcuts](../onelake/onelake-shortcuts.md)
