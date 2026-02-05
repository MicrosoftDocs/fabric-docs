---
title: "Mirroring Oracle limitations in Microsoft Fabric"
description: Learn about the limitations when mirroring Oracle databases in Microsoft Fabric.
ms.reviewer: sbahadur
ms.date: 08/22/2025
ms.topic: limits-and-quotas
ms.custom: references_regions
ai-usage: ai-assisted
---

# Mirroring Oracle limitations in Microsoft Fabric

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

This article outlines the current limits when mirroring [Oracle databases in Microsoft Fabric](overview.md). These limits could change as we continue to improve the service.

>[!NOTE]
>We currently support Mirroring for Oracle for On-Premises Data Gateway (OPDG). Utilize version 3000.282.5 or greater.

## Scale Limits

Here's what you can expect for database scale:

* Currently, mirrored database supports up to **500 tables**
* In each workspace, you can have:
  * One Oracle server
  * One On-Premises Data Gateway (OPDG) instance
  * One Oracle mirror artifact

## Supported Environments

We support these Oracle Server environments:

* Oracle versions 10 and above with LogMiner enabled
* Oracle on-premises (VM, Azure VM)
* Oracle Cloud Infrastructure (OCI)
* Oracle Database@Azure
* Oracle Exadata

>[!NOTE]
>* LogMiner needs to be enabled on your Oracle server. This tool helps track changes in your Oracle database for real-time mirroring.
>* Oracle Autonomous Database isn't supported in this preview.

## Mirroring prerequisites

Here's what you need for your database setup:

* A Microsoft Fabric workspace with [Trial](../fundamentals/fabric-trial.md) or Premium Fabric capacity
* Install the latest On-Premises Data Gateway (August 2025). Learn how to [install and register a gateway](/data-integration/gateway/service-gateway-install#download-and-install-a-standard-gateway) and [connect the gateway to your Fabric workspace](../data-factory/how-to-access-on-premises-data.md)

## Data Types and Schema Support

These Oracle data types are supported:

* VARCHAR2
* NVARCHAR2
* NUMBER
* FLOAT
* DATE
* BINARY_FLOAT
* BINARY_DOUBLE
* RAW
* ROWID
* CHAR
* NCHAR
* TIMESTAMP WITH LOCAL TIME ZONE
* INTERVAL DAY TO SECOND
* INTERVAL YEAR TO MONTH

For schema (DDL) changes, we currently support:

* Column changes (partial support):
  * Add columns
  * Delete columns
  * Rename columns

> [!NOTE]
> Column data type updates aren't supported

We also support mirroring tables that have a partitioning - if your source tables are partitioned, then we can mirror those tables over.

Tables that don't have a Primary Key (PK) are supported - if you have a unique index in your tables, then we can support mirroring those tables. If your tables doesn't have a Primary Key (PK) or a unique index, we won't support mirroring those tables over.

We can't support table names that have a length greater than or equal to 30.

## Required Permissions

Your sync user needs these permissions:

   ```sql
   GRANT CREATE SESSION TO user;
   GRANT SELECT_CATALOG_ROLE TO user;
   GRANT CONNECT, RESOURCE TO user;
   GRANT EXECUTE_CATALOG_ROLE TO user;
   GRANT FLASHBACK ANY TABLE TO user;
   GRANT SELECT ANY DICTIONARY TO user;
   GRANT SELECT ANY TABLE TO user;
   GRANT LOGMINING TO user;
   ```

## Configuration Requirements

### Archive Log Settings

Your database needs these archive log settings:

* ARCHIVELOG mode enabled
* Keep archive log mode on during mirroring
* Redo log file archiving enabled by the database admin

### Logging Configuration

If your Oracle user doesn't have direct ALTER DATABASE and ALTER TABLE permissions, ask your DBA to run these commands:

1. Enable supplemental logging for the database:

   ```sql
   ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
   ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY, UNIQUE) COLUMNS;
   ```

1. Enable supplemental logging for each table you want to mirror:

   ```sql
   ALTER TABLE {schemaName}.{tableName} ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
   ```

## Set up your gateway

Currently, we only support connecting to Oracle using an On-Premises Data Gateway (OPDG). You need to install and configure the gateway on a machine that can connect to your Oracle server.

For machine requirements and setup instructions to install and register your gateway, see the [On-premises Data Gateway installation guide](/data-integration/gateway/service-gateway-install#download-and-install-a-standard-gateway).
>[!NOTE]
>* To ensure that you have the latest performance enhancements and updates, make sure that you have the upgraded to the latest version of the [On-Premises Data Gateway](oracle-tutorial.md#install-the-on-premises-data-gateway). To review recent updates, refer to the [Currently supported monthly updates](/data-integration/gateway/service-gateway-monthly-updates).

## Related Content

* [Mirror Oracle databases in Microsoft Fabric](overview.md)
* [Set up Oracle database mirroring](oracle.md)
