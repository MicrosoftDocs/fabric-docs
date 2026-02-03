---
title: "Mirror Oracle Databases in Microsoft Fabric (Preview)"
description: Learn how to mirror your Oracle databases in Microsoft Fabric for analytics.
author: shaween18
ms.author: sbahadur
ms.reviewer: whhender
ms.date: 08/22/2025
ms.topic: overview
ms.search.form: Oracle overview
ai-usage: ai-assisted
---

# Mirroring Oracle Databases (Preview)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

[Mirroring in Fabric](overview.md) lets you mirror your Oracle databases into a unified analytics platform. When you mirror your Oracle data, you can analyze it together with data from other sources in near real-time with minimal latency and cost.

## Oracle environments we support

We support these Oracle Server environments:

* Oracle versions 10 and above with LogMiner enabled
* Oracle on-premises (VM, Azure VM)
* Oracle Cloud Infrastructure (OCI)
* Oracle Database@Azure
* Oracle Exadata

>[!NOTE]
>* LogMiner needs to be enabled on your Oracle server. This tool helps track changes in your Oracle database for real-time mirroring.
>* Oracle Autonomous Database isn't supported in this preview.

## Built-in analytics features

When you mirror an Oracle database, Fabric creates:

* A mirrored database in [OneLake](../onelake/onelake-overview.md) that handles data replication
* A [SQL analytics endpoint](../data-warehouse/get-started-lakehouse-sql-analytics-endpoint.md) for data analysis

The SQL analytics endpoint lets you:

* Browse your tables
* Build queries without code
* Create SQL views, inline table functions, and stored procedures
* Control access to your data
* Connect to data in other Warehouses and Lakehouses in your workspace

You can work with your data using tools you know:

* [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms)
* [VS Code with the MSSQL extension](/sql/tools/visual-studio-code/mssql-extensions)
* Fabric's SQL query editor

## Prerequisites

Before you set up Oracle mirroring, you need:

* A [supported Oracle server](#oracle-environments-we-support)
* LogMiner enabled
* [Archive log mode](oracle-tutorial.md#set-up-archive-of-redo-log-files) enabled
* [Supplemental logging](oracle-tutorial.md#set-up-oracle-permissions-and-enable-supplemental-logging) configured
* [On-Premises Data Gateway](oracle-tutorial.md#install-the-on-premises-data-gateway) installed and set up
* [Required user permissions](oracle-limitations.md#required-permissions)

>[!NOTE]
>* To ensure that you have the latest performance enhancements and updates, make sure that you have the upgraded to the latest version of the [On-Premises Data Gateway](oracle-tutorial.md#install-the-on-premises-data-gateway). To review recent updates, refer to the [Currently supported monthly updates](/data-integration/gateway/service-gateway-monthly-updates).

For complete setup instructions and requirements, see:

* [Oracle mirroring setup guide](oracle-tutorial.md)
* [Oracle mirroring limitations](oracle-limitations.md)

## Cost overview

There's no charge for these components:

* The compute used to replicate your data to OneLake
* OneLake storage based on capacity size

You only pay for the compute you use when querying data through SQL, Power BI, or Spark, based on your Fabric Capacity.

Learn more about [mirroring costs](overview.md#cost-of-mirroring) and [OneLake pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Next steps

* [Set up Oracle mirroring](oracle-tutorial.md)
* [Review Oracle mirroring limitations](oracle-limitations.md)
