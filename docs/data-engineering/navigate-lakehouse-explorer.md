---
title: Navigating the Lakehouse explorer
description: Learn about the components of the Lakehouse explorer.
ms.reviewer: snehagunda
ms.author: avinandac
author: avinandaMS
ms.topic: conceptual
ms.date: 02/24/2023
---

# Navigating the Lakehouse explorer

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

The Lakehouse explorer is the main Lakehouse interaction page; you can use it to load data into your Lakehouse, browse through the data, preview them, and many other things. The page is divided into three sections: the object explorer, the main view, and the ribbon.

## Object explorer

The Lakehouse object explorer is a graphical interface that provides a focused view on a single Lakehouse for you to navigate, access, and take action on your folders, files, and tables.

The explorer has two main views: the **Lake** view and the **Table** view.

- **Lake** view:
  - Displays all folders and files in the Lakehouse and is the default view when you open the **Lakehouse editor** page.
  - The screen has two sections: the **Tables** section, which is the managed area and the **Files** section, which is the unmanaged area.
- **Table** view:
  - The main purpose of the **Table** section is to hold data files for all tables available in the table view, although it can also hold miscellaneous file types but this is strongly discouraged.
  - The **Files** section can hold any file types but no tables are stored there.
  - The main difference between these two sections is the auto-discovery feature. This feature ensures that any supported Delta file formats uploaded in the **Tables** section are immediately scanned and the system adds an entry into the metastore.
  - The **Table** view displays tables registered in the metastore in your Lakehouse. You can browse through the tables and preview the data.

## Main view area

The main view area of the Lakehouse page is the space where most of the data interaction occurs. The view changes depending on what you select. Since the object explorer only displays a folder level hierarchy of the lake, the main view area is what you use to navigate your files, preview files, and take action on them.

## Ribbon

The Lakehouse ribbon is a quick go-to action bar for you to quickly load data into your Lakehouse. You can quickly open a notebook or the pipeline experience to get started.

## Next steps

To get started with Lakehouse, see [Creating a Lakehouse](create-lakehouse.md).
