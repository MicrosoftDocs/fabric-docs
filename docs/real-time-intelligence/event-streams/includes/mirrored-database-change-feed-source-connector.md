---
title: Mirrored Database Change Feed connector for Fabric event streams
description: The include file has the common content for configuring a Mirrored Database (Change Feed) connector for Fabric event streams and Real-Time hub.
ms.reviewer: zhenxilin
ms.topic: include
ms.date: 03/23/2026
---

Ingest [change feed](/fabric/mirroring/extended-capabilities) events into an Eventstream from a Fabric Mirrored Database of your choice

1. On the **Connect** page, select a mirrored database to connect to.

   1. For **Workspace**, browse to and select the Fabric workspace that contains the mirrored database.
   1. For **Mirrored database**, select the mirrored database from the list of available databases in the selected workspace.

      <!-- Screenshot of workspace and mirrored database picker -->
      :::image type="content" source="./media/mirrored-database-change-feed-source-connector/select-mirrored-database.png" alt-text="Screenshot that shows the workspace and mirrored database picker on the Connect page." lightbox="./media/mirrored-database-change-feed-source-connector/select-mirrored-database.png":::

1. Select **All tables**, or **Enter table name(s)** to specify which tables to monitor for changes. If you select the latter, specify tables using a comma-separated list of full table identifiers (`schemaName.tableName`) or valid regular expressions. For example:

   - Use `dbo.Orders.*` to select all tables whose names start with `dbo.Orders`.
   - Use `dbo\.(Orders|Customers)` to select `dbo.Orders` and `dbo.Customers`.

   You can mix both formats using commas. The total character limit for the entire entry is **102,400** characters.

   > [!NOTE]
   > In the current Preview release, only the **All tables** option is available.

1. On the **Review + connect** page, review the summary of settings, and then select **Add**.

      <!-- Screenshot of review + connect page -->
      :::image type="content" source="./media/mirrored-database-change-feed-source-connector/review-connect.png" alt-text="Screenshot that shows the Review + connect page for the Mirrored Database Change Feed source." lightbox="./media/mirrored-database-change-feed-source-connector/review-connect.png":::

1. You can see the Mirrored Database (Change Feed) source added to your eventstream while still in **Edit mode**.
