---
title: Pause and resume in Synapse Data Warehouse
description: Learn more about the pause and resume capacity for data warehousing in Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sosivara
ms.date: 04/24/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.custom:
  - ignite-2023
---

# Pause and resume in Fabric data warehousing

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Microsoft Fabric capacity can be paused to enable cost savings for your organization. Similar to other workloads, Synapse Data Warehouse in [!INCLUDE [product-name](../includes/product-name.md)] is affected when the Fabric capacity is paused.

A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)] cannot be paused individually. To learn more about how to pause and resume your Fabric capacity, visit [Pause and resume your capacity](../enterprise/pause-resume.md).

### Effect on user requests

An administrator can pause an active Fabric capacity at any time, even while SQL statements are executing. Users can expect the following behavior when a capacity is paused:

- New requests: Once a capacity is paused, users cannot execute new SQL statements or queries. This also includes activity on the Fabric portal like create operations, loading data grid, opening model view, opening visual query editor. Any new activity attempted after capacity is paused returns the following error message `Unable to complete the action because this Fabric capacity is currently paused.`
    - In client application tools like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio), users signing in to a paused capacity will get the same error text with SQL error code: 24800.
    - In client application tools like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio), users attempting to run a new TSQL query on an existing connection when capacity is paused will see the same error text with SQL error code: 24802.
- In-flight requests: Any open requests, like SQL statements in execution, or activity on [the SQL Query Editor](sql-query-editor.md), [visual query editor](visual-query-editor.md), or modeling view, are canceled with an error message like `Unable to complete the action because this Fabric capacity is currently paused.`
- User transactions: When a capacity gets paused in the middle of a user transaction like `BEGIN TRAN` and `COMMIT TRAN`, the transactions roll back.

> [!NOTE]
> The user experience of rejecting new requests and canceling in-flight requests is consistent across both Fabric portal and client applications like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio).

### Effect on system background tasks

Like user-initiated tasks, system background tasks that are in-flight are canceled when capacity is paused. Examples of system-generated statements include metadata synchronous activities and other background tasks that are run to enable faster query execution.

Some cleanup activity might be affected when compute is paused. For example, historical data older than the current data retention settings is not removed while the capacity is paused. The activities catch up once the capacity resumes.

### Effect on cache and performance

When a Fabric capacity is paused, warehouse compute resources are shut down gracefully. For best performance, caches need to be kept warm all the time. In such scenarios, it's not recommended to pause the underlying capacity.

When a Fabric capacity is resumed, it restarts the warehouse compute resources with a clean cache, it will take a few runs to add relevant data to cache. During this time after a resume operation, there could be perceived performance slowdowns.

> [!TIP]
> Make a trade-off between performance and cost before deciding to pause the underlying Fabric capacity.

### Effect on billing

- When capacity is manually paused, it effectively pauses the compute billing meters for all Microsoft Fabric workloads, including Warehouse.
- Data warehouses do not report compute usage once pause workflow is initiated.
- The OneLake storage billing meter is not paused. You continue to pay for storage when compute is paused.

Learn more about billing implications here: [Understand your Fabric capacity Azure bill](../enterprise/azure-billing.md).

### Considerations and limitations

- In the event of pause, in-flight requests in client application tools like [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio) receive generic error messages that do not indicate the intent behind cancellation. A few sample error messages in this case would be (not limited to):
    - `An existing connection was forcibly closed by the remote host`
    - `Internal error. Unable to properly update physical metadata. Please try the operation again and contact Customer Support Services if this persists.`
    - `A severe error occurred on the current command.  The results, if any, should be discarded.`
- Once the capacity resumes, it might take a couple of minutes to start accepting new requests.
- Background cleanup activity might be affected when compute is paused. The activities catch up once the capacity resumes.

## Related content

- [Scale your capacity](../enterprise/scale-capacity.md)
- [Workload management](workload-management.md)

## Next step

> [!div class="nextstepaction"]
> [Pause and resume your capacity](../enterprise/pause-resume.md)
