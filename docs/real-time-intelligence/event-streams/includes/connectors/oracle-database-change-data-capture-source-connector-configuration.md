---
title: Oracle Database CDC connector for Fabric event streams
description: This include file has the common content for configuring an Oracle Database Change Data Capture (CDC) connector for Fabric event streams and Real-Time hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.custom: sfi-image-nochange
ms.date: 05/25/2026
---

1. On the **Connect** page, in **Server**, enter your Oracle endpoint.

   You can provide only the host name, or include host, port, and service/SID in a single value.
   For example: `your-oracle-host.example.com:1521/ORCL`.

1. Under **Connection credentials**, select an existing connection or create a new one:

   - To create a new connection, select **New connection** and enter:
      - **Connection name**: A name for this connection.
      - **Username**: The Oracle database user with CDC permissions.
      - **Password**: The password for the database user.

1. Select **Connect**.

   :::image type="content" source="./media/oracle-cdc-configuration/connect.png" alt-text="Screenshot of the new connection page." lightbox="./media/oracle-cdc-configuration/connect.png":::

1. After the connection is established, choose the tables to capture by selecting **All tables** or **Enter table name(s)**. If you choose **Enter table name(s)**, enter an optional comma-separated list of full table identifiers (`schemaName.tableName`) for the Oracle database tables to monitor.

1. You can expand **Advanced settings** to access more configuration options for the Oracle Database CDC source:
   - **Snapshot locking mode**: Controls whether and for how long the connector holds a table lock. Table locks prevent certain types of table operations from occurring while the connector performs a snapshot.
      - `Shared` (default): Enables concurrent access to the table, but prevents any session from acquiring an exclusive table lock. The connector acquires a ROW SHARE level lock while it captures table schema.
      - `None`: Prevents the connector from acquiring any table locks during the snapshot. Use this setting only if no schema changes might occur during snapshot creation.
   - **Decimal handling mode**: Specifies how the connector should handle floating-point values for `NUMBER`, `DECIMAL`, and `NUMERIC` columns. You can set one of the following options:
      - `Precise` (default): Represents values precisely by using `java.math.BigDecimal` values represented in change events in binary form.
      - `Double`: Represents values by using double values. Using double values is easier, but can result in a loss of precision.
      - `String`: Encodes values as formatted strings. Using the `String` option is easier to consume, but results in a loss of semantic information about the real type.
   - **Snapshot mode**: Specifies the mode that the connector uses to take snapshots of a captured table.
      - `Initial` (default): The snapshot includes the structure and data of the captured tables. Specify this value to populate topics with a complete representation of the data from the captured tables. If the snapshot completes successfully, the connector doesn't run the snapshot again at the next start.
      - `InitialOnly`: The snapshot includes the structure and data of the captured tables. The connector performs an initial snapshot and then stops, without processing any subsequent changes.
      - `NoData`: The snapshot includes only the structure of captured tables. Specify this value if you want the connector to capture data only for changes that occur after the snapshot.

1. Select **Next** to continue.

   :::image type="content" source="./media/oracle-cdc-configuration/next.png" alt-text="Screenshot of the Oracle CDC source Advanced settings page." lightbox="./media/oracle-cdc-configuration/next.png":::

1. On **Review + connect**, review your settings.

1. Select **Add** (Eventstream) or **Connect** (Real-Time hub). 

   :::image type="content" source="./media/oracle-cdc-configuration/add.png" alt-text="Screenshot of the Oracle CDC source Review + connect page." lightbox="./media/oracle-cdc-configuration/add.png":::


