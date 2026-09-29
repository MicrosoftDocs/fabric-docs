---
title: Add a Microsoft SQL database to the Database Hub (preview)
description: Learn how to enable a Microsoft SQL database in a variety of platforms to the Database Hub in the Microsoft Fabric portal.
ms.reviewer: amapatil, lancewright
ms.date: 09/18/2026
ms.topic: how-to
ai-usage: ai-assisted
---
# Add a Microsoft SQL database to the Database Hub (preview)

This article covers the configuration needed for Microsoft SQL databases to appear in [Database Hub](https://powerbi.com/workloads/fdh/databaseHub) and participate in supported performance monitoring.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

- To enable performance monitoring for an Azure SQL Database, add an extended property to each user database you want to monitor. Add this extended property by selecting the **Enable Performance Monitoring** option on a resource in the Estate page of Database Hub or by running the [T-SQL scripts provided in this article](#add-metadata-to-a-user-database-to-enable-azure-sql-database-in-the-performance-page-of-the-database-hub). To apply the metadata to multiple servers at once, consider [multiserver queries in SQL Server Management Studio (SSMS)](/ssms/register-servers/execute-statements-against-multiple-servers-simultaneously).

You can view Microsoft SQL resources in the Database Hub from Azure, Fabric, and on-premises, including Azure SQL Database, SQL database in Fabric, Azure SQL Elastic pools, Azure SQL Managed Instance, SQL Server enabled by Azure Arc, and SQL Server instances in Azure VMs.

Currently, the following database resource types are visible in the Database Hub but aren't currently supported in the **Performance** tab: Azure SQL Elastic pools, Azure SQL Managed Instance, SQL database in Fabric, and SQL Server instances in Azure VMs.

## Add an Azure resource provider to enable the Database Hub

Register the `Microsoft.AzureArcData` resource provider in each subscription that contains resources you want to monitor. Database Hub requires this resource provider to view the performance monitoring data. For more information, see [az provider register](/cli/azure/provider#az-provider-register). Use Azure CLI:

   ```azurecli
   az provider register --namespace Microsoft.AzureArcData
   ```
   
## Add metadata to a user database to enable Azure SQL Database in the Performance page of the Database Hub

1. For Azure SQL Database, add the `MS_EnablePerformanceMonitoringPreview` extended property to each *user* database you want to monitor.

   > [!TIP]
   > Run the script on each *user* database you want to monitor. Don't run it on the `master` database. 

   ```sql
    IF EXISTS ( 
        SELECT 1 
        FROM sys.extended_properties 
        WHERE class = 0 
          AND name = N'MS_EnablePerformanceMonitoringPreview' 
    ) 
    BEGIN 
        EXEC sys.sp_updateextendedproperty 
            @name = N'MS_EnablePerformanceMonitoringPreview', 
            @value = N'true'; 
    END 
    ELSE 
    BEGIN 
        EXEC sys.sp_addextendedproperty 
            @name = N'MS_EnablePerformanceMonitoringPreview', 
            @value = N'true'; 
    END; 
    GO 
    ```

To stop performance data collection for a user database, change `@value = N'true'` to `@value = N'false'` in both procedure calls, and then rerun the T-SQL script.

## Next step

> [!div class="nextstepaction"]
> [Monitor a Microsoft SQL database in the Database Hub (preview)](monitor-sql.md)

## Related content

- [What is the Database Hub?](overview.md)
- [SQL Server enabled by Azure Arc](/sql/sql-server/azure-arc/overview)
