---
title: Manage Objects in Your Fabric Data Warehouse
description: Learn about the object explorer in Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pvenkat
ms.date: 04/06/2025
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.search.form: Query editor # This article's title should not change. If so, contact engineering.
---
# Manage objects in your data warehouse

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

This article describes warehouse management tasks you can accomplish in the **Explorer** in the [!INCLUDE [product-name](../includes/product-name.md)] portal. 

- You can organize, explore, and manage warehouse objects in the object explorer, and execute queries in the [SQL query editor](sql-query-editor.md).
- You can also [query the data](query-warehouse.md) in your warehouse with multiple tools with a [SQL connection string](connectivity.md).
- You can build queries graphically with the [Visual query editor](visual-query-editor.md).
- You can quickly [view data in the Data preview](data-preview.md).

The **Explorer** provides a hierarchical view of the warehouse objects, including schemas, tables, views, stored procedures, and more. The objects are organized by schema then object type.

:::image type="content" source="media/manage-objects/explorer-new-table.png" alt-text="Screenshot from the Fabric portal of the Explorer window of a warehouse." lightbox="media/manage-objects/explorer-new-table.png":::

## Search and filter objects in the explorer

The search and filter features in Fabric Data Warehouse are designed for ease of discovery. 

The search function quickly highlights matching objects and highlights the results within the object explorer for the user.

:::image type="content" source="media/manage-objects/search-button.png" alt-text="Screenshot of the search button in the Explorer.":::

When dealing with numerous objects, such as schemas, tables, or stored procedures, finding specific items can be challenging. Use the filter options for object selection based on object type or created date.

:::image type="content" source="media/manage-objects/filter-options.png" alt-text="Screenshot showing how objects are filtered in object explorer.":::

## Script out warehouse objects in the explorer

Use **Explorer** to create, alter, and drop objects using T-SQL templates. You can also alter or drop objects using context menu options on each object. Each context menu option results in a new T-SQL query that you can execute to manage any object in the warehouse. To script out a T-SQL command for a database object, select the context menu.

:::image type="content" source="media/manage-objects/create-table-script.png" alt-text="Screenshot from the Fabric portal showing how to script out the T-SQL of a database object.":::

### Manage objects in other tools

You can manage your warehouse objects in other tools, including [Connect using SQL Server Management Studio (SSMS)](how-to-connect.md#connect-using-sql-server-management-studio-ssms) or the [SQL Database Projects extension](/sql/azure-data-studio/extensions/sql-database-project-extension?view=fabric&preserve-view=true) in [Visual Studio Code](https://visualstudio.microsoft.com/downloads/). The SQL Projects extension enables capabilities for source control, database testing, and schema validation. To connect to your warehouse, see [Connectivity to data warehousing in Microsoft Fabric](connectivity.md).

For more information on source control for warehouses in Microsoft Fabric, including Git integration and deployment pipelines, see [Source control with Warehouse](source-control.md).

## Queries

Users can manage their queries efficiently under "My Queries" and "Shared Queries" sections.

- **My Queries** is a personal space where users can save and organize their own queries. 

- **Shared Queries** is a collaborative space where users can share their queries with team members to access, review, and execute shared queries. Anyone with Contributor and higher permissions at a workspace level can view and edit shared queries.

## Related content

- [Tutorial: Create a cross-warehouse query in Warehouse](tutorial-sql-cross-warehouse-query-editor.md)
- [Query using the visual query editor](visual-query-editor.md)
- [Query using the SQL query editor](sql-query-editor.md)
- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)