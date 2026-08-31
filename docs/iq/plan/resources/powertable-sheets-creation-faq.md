---
title: PowerTable Sheets Creation FAQ
description: Learn how connections, new and existing tables, identity columns, and SCD tracking work in PowerTable.
ms.topic: faq
ms.date: 07/31/2026
---

# PowerTable sheets creation FAQ

This article provides answers to frequently asked questions about creating PowerTable sheets in planning. Review these common scenarios to understand connection setup, table creation, supported data sources, and configuration options.

## What is the difference between **Explore PowerTable** and **Create a New App** on the welcome screen?

* **Explore PowerTable** loads sample data into a Fabric SQL database and you can explore prebuilt PowerTable sheets that are already configured.
* **Create a New App** lets you choose your own data source and work with your own data instead of sample data. You can:
  * Import data from an Excel or CSV file.
  * Connect to an existing database table.

Unlike **Explore PowerTable**, the sheet isn't preconfigured, so you set up all items from scratch.

## Why does the **Set up connection** banner appear only once, and what does it enable?

The **Set up connection** process runs only once for each plan item, not for each PowerTable sheet.

When you set up the connection,

* Plan item connects to the app or the system database.
* Users with the **Viewer** workspace role can use and work with the plan item.

If you dismiss the banner without completing the setup, the Viewer capability remains unconfigured.

## What does the Authentication kind set to "Organizational account" mean? Can I connect as someone else?

The **Organizational account** authentication kind authenticates the connection by using your signed-in Microsoft Entra identity instead of stored database credentials.

The **Create New Connection** dialog uses your currently signed-in account by default. If you want to use a different account, select **Switch account**.

## Do I need to create a new connection for every PowerTable sheet?

No. You only need to create a connection once.

You can reuse the same connection for any PowerTable sheet that connects to a Fabric SQL database within your client. You don't need to create a new connection for each sheet.

## Is a PowerTable sheet the same as the SQL table that it points to?

No. A PowerTable sheet is a view and editing surface over a table in the Fabric SQL database. The sheet and the SQL table have separate names.

The sheet that you create is bound to the table that you create or connect to during setup. This separation keeps edits pending in the sheet until you select **Save to Database**.

## When should I choose an existing table instead of a new table? Can I use a schema other than dbo?

Choose **Existing Table** when you want to connect the PowerTable sheet to a table that already exists in the Fabric SQL database.

Choose **New Table** when you want to create a new table by importing data from:

* An Excel file.
* A CSV file.
* A semantic model.

## What does the 'Exclude records and import table structure only' checkbox do?

This option creates the table by using the spreadsheet's columns and data types without importing any rows.

Use this option when you want to create an empty table and bulk import or manually insert data later.

## What happens when I select Identity Column? Can I change it later?

When you select **Identity Column** while configuring a table, you create an identity constraint in the database. The selected column becomes an auto-incrementing column. When you add new rows to the table, the value in the identity column increments automatically.

When you select a column as an identity column during the table configuration, you can't change it later. To change it, you need to import the data and configure the table again.

## What file types can I upload during table creation?

When you create a new table, you can import data from:

* An Excel file.
* A CSV file.

You can also connect to a semantic model in your tenant.

## What other types of databases can I connect to by using PowerTable?

Currently, PowerTable supports connections only to Fabric SQL databases.

To use data from other sources, consider mirroring or copying the data into a Fabric SQL database before connecting PowerTable.

## What does the 'Enable support for Slowly Changing Dimensions (SCD)' toggle do?

When you enable support for SCD, you can configure a table with **SCD Type II** or **SCD Type III** tracking.

Depending on the option that you choose, you can maintain the history of:

* Changes to each row.
* Changes to specific columns.

Before you configure SCD Type II or Type III tracking, ensure that your table meets the required prerequisites. For more information, see the Microsoft documentation on [Slowly Changing Dimensions](../powertable-how-to-create-slowly-changing-dimension.md).
