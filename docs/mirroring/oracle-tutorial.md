---
title: "Tutorial: Set up Oracle database mirroring in Microsoft Fabric (Preview)"
description: Learn how to mirror your Oracle database in Microsoft Fabric for near real-time data replication.
author: shaween18
ms.author: sbahadur
ms.reviewer: whhender
ms.date: 08/22/2025
ms.topic: tutorial
ai-usage: ai-assisted
---

# Tutorial: Set up Oracle database mirroring in Microsoft Fabric (Preview)

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

[Database mirroring in Microsoft Fabric](overview.md) is a cloud-based, zero-ETL solution that creates a mirror of your Oracle database. When you set up mirroring, you'll get a read-only copy of your Oracle data in OneLake that updates in near real-time.

## Prerequisites

You need:

* A Microsoft Fabric workspace with [Trial](../fundamentals/fabric-trial.md) or Premium Fabric capacity
* An Oracle server that's one of these types, version 10 or above with LogMiner enabled:
  * Oracle on-premises (VM, Azure VM, etc.)
  * Oracle OCI
  * Oracle Database@Azure
  * Exadata
  * Note: Oracle Autonomous Database isn't supported in this preview

>[!NOTE]
>* LogMiner needs to be enabled on your Oracle server. This tool helps track changes in your Oracle database for real-time mirroring.
>* Oracle Autonomous Database isn't supported in this preview.

## Set up archive of redo log files

If archive mode isn't enabled on your Oracle database, follow these steps. If it's already enabled, you can move to the next section.

1. Connect Oracle Recovery Manager (RMAN) to your database. See [Connecting to the Target Database Using RMAN](https://docs.oracle.com/database/121/ADMQS/GUID-7ACCA8DF-537B-4DA9-A7C7-306FBFC9D903.htm).

1. Shut down the database:

   ```sql
   SHUTDOWN IMMEDIATE;
   ```

1. Back up your database. This safeguards your data before making changes. See [Performing a Whole Database Backup](https://docs.oracle.com/database/121/ADMQS/GUID-E6AB87FC-DE6E-433C-AB61-F2055B6CC547.htm).

1. Start and mount the database (don't open):

   ```sql
   STARTUP MOUNT;
   ```

   > [!NOTE]
   > Keep the database mounted but not open to enable archiving.

1. Set up your archive log destinations:

   ```sql
   ALTER SYSTEM SET LOG_ARCHIVE_DEST_1 = 'LOCATION=/u02/oracle/logfiles';
   ```

   > [!NOTE]
   > Make sure this directory exists on your system.

   You can optionally set a second archive location:

   ```sql
   ALTER SYSTEM SET LOG_ARCHIVE_DEST_2 = 'LOCATION=/u03/oracle/logfiles';
   ```

1. Turn on archive log mode and open the database:

   ```sql
   ALTER DATABASE ARCHIVELOG;
   ALTER DATABASE OPEN;
   ```

1. Shut down the database again to ensure all changes are applied:

   ```sql
   SHUTDOWN IMMEDIATE;
   ```

1. Create another backup. This is needed because enabling archive log mode changes the control file. See [Performing a Whole Database Backup](https://docs.oracle.com/database/121/ADMQS/GUID-E6AB87FC-DE6E-433C-AB61-F2055B6CC547.htm).

1. Start the database:

   ```sql
   STARTUP;
   ```

1. Check that archive log mode is enabled:

   ```sql
   SELECT LOG_MODE FROM V$DATABASE;
   ```

>[!TIP]
> As a best practice for Mirroring for Oracle, our recommendation is to clean archive logs on a regular cadence to ensure optimal performance and stability

## Set up Oracle permissions and enable supplemental logging

Your Oracle database needs supplemental logging enabled. If your user doesn't have the required permissions, ask your database administrator (DBA) to run these commands:

1. Enable supplemental logging for the database:

   ```sql
   ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
   ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY, UNIQUE) COLUMNS;
   ```

1. Enable supplemental logging for each table you want to mirror:

   ```sql
   ALTER TABLE {schemaName}.{tableName} ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;
   ```

1. Grant these permissions to your sync user:

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

## Install the On-Premises Data Gateway

1. Install the latest On-Premises Data Gateway. [Follow this link to learn about the machine requirements and how to install and register a gateway](/data-integration/gateway/service-gateway-install#download-and-install-a-standard-gateway).

    >[!TIP]
    > You might need to alter the cloud firewall to allow mirroring to connect to the Oracle instance. We support mirroring for Oracle for OPDG version 3000.282.5 or greater. Any OPDG instance before that will not support Exadata and the limited DDL support that we have. 
    >
    > We also recommend updating the OPDG instance every month for updates that we release related to Mirroring for Oracle. Latest OPDG releases can be found [here](https://go.microsoft.com/fwlink/?LinkId=2116849&clcid=0x409).

1. [Connect the gateway to your Fabric workspace](../data-factory/how-to-access-on-premises-data.md)

## Set up database mirroring

1. Open your Fabric workspace and check that it has a Trial or Premium Fabric capacity

1. Select **New** > **Mirrored Oracle (preview)**

   :::image type="content" source="media/oracle/microsoft-fabric-oracle-mirroring.png" alt-text="Screenshot of Microsoft Fabric workspace showing the Mirrored Oracle (preview) option selected to create a new artifact." lightbox="media/oracle/microsoft-fabric-oracle-mirroring.png":::

1. Select **Oracle Database**

   :::image type="content" source="media/oracle/select-oracle-database.png" alt-text="Screenshot of the database connection screen, with the oracle database option highlighted under New sources.":::

1. In the connection dialog, enter your database details:

   :::image type="content" source="media/oracle/specify-oracle-server-details.png" alt-text="Screenshot of Oracle connection setup screen showing fields for server, connection name, and data gateway configuration.":::

1. Specify the server, connection, connection name, and data gateway

   * **Server**: Specify the location of your Oracle database using one of these methods:

     | Method | Example |
     |--------|----------|
     | [Oracle Net Services Name (TNS Alias)](https://docs.oracle.com/en/database/oracle/oracle-database/23/netrf/local-naming-parameters-in-tns-ora-file.html#GUID-12C94B15-2CE1-4B98-9D0C-8226A9DDF4CB) | `sales` |
     | [Connect Descriptor](https://docs.oracle.com/en/database/oracle/oracle-database/23/netag/identifying-and-accessing-database.html#GUID-8D28E91B-CB72-4DC8-AEFC-F5D583626CF6) | `(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=sales-server)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=sales.us.acme.com)))` |
     | [Easy Connect (Plus) Naming](https://download.oracle.com/ocomdocs/global/Oracle-Net-Easy-Connect-Plus.pdf) | `salesserver1:1521/sales.us.example.com` |

   * **Connection**: Select Create new connection
   * **Connection name**: Enter a name for your connection
   * **Data gateway**: Select your on-premises data gateway
   * **Authentication**:
     * Under Authentication kind, select Basic authentication
     * Username: Enter your Oracle database username
     * Password: Enter your Oracle database password

1. Select **Connect** to test the connection

1. Choose how to select tables for mirroring:
   * **Auto mode**: Let Fabric select 500 random tables
   * **Manual**: Pick up to 500 tables yourself

   :::image type="content" source="media/oracle/choose-data.png" alt-text="Screenshot of the interface prompting the user to select the data they want to be mirrored before connecting.":::

1. Finish the setup:
   * Select **Connect**
   * Name your mirror
   * Select **Create mirrored database**

   :::image type="content" source="media/oracle/rows-replicated.png" alt-text="Screenshot of the mirrored database creation interface showing the connect button, mirror name field, and Create button after table selection.":::

1. Watch the replication progress. After a few minutes, you'll see the number of rows replicated and can view your data in the data warehouse.

   :::image type="content" source="media/oracle/monitor-replication.png" alt-text="Screenshot of the interface showing Rows Replicated status and data visible in the data warehouse view after mirror creation.":::

Your Oracle database is now connected to Microsoft Fabric and will stay in sync automatically.

## Monitor Fabric mirroring

Once mirroring is configured, you're directed to the **Mirroring Status** page. Here, you can monitor the current state of replication. For more information and details on the replication states, see [Monitor Fabric mirrored database replication](../mirroring/monitor.md).

## Related content

* [Learn more about Oracle mirroring](oracle.md)
* [Limitations in Microsoft Fabric mirrored databases from Oracle](oracle-limitations.md)
