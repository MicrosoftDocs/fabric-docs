---
title: Include file the copy job supported connectors table for CDC replication
description: Include file copy job supported connectors table for CDC replication
ms.reviewer: ukchrist
ms.date: 09/15/2026
ms.topic: include
---

| Connector | CDC Source | CDC Destination | Write - SCD Type 2 |
| --- | --- | --- | --- |
| Azure SQL DB | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| Azure SQL Managed Instance | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| Fabric Data Warehouse | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| Fabric Lakehouse table | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| Google BigQuery | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| On-premises SQL Server | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| Oracle | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| SAP Datasphere Outbound for ADLS Gen2 | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: |
| SAP Datasphere Outbound for AWS S3 | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: |
| SAP Datasphere Outbound for Google CloudStorage | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: |
| Snowflake | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| SQL database in Fabric | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |
| Synapse Data Warehouse | <!--CDC Source-->:::image type="icon" source="../media/data-pipeline-support/no.png"::: | <!--CDC Destination-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: | <!--SCD2-->:::image type="icon" source="../media/data-pipeline-support/yes.png"::: |

> [!NOTE]
> SCD Type 2 in Copy job is currently in preview.
> When you do CDC replication from Oracle sources, SCD Type 2 isn't supported yet.
> If you create the schema in your destination database, SCD2 isn't supported.
