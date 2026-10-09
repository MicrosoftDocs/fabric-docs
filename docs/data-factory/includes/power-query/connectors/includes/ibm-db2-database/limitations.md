---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/ibm-db2-database/ibm-db2-database-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

### Driver limitations

The Microsoft driver is the same one used in Microsoft Host Integration Server, called the "ADO.NET Provider for DB2." The IBM driver is the IBM Db/2 driver that works with .NET. The name of this driver changes from time to time, so be sure it's the one that works with .NET, which is different from the IBM Db2 drivers that work with OLE/DB, ODBC, or JDBC.

You can choose to use either the Microsoft driver (default) or the IBM driver if you're using Power Query Desktop. Currently, Power Query Online only uses the Microsoft driver. Each driver has its limitations.

* Microsoft driver
  * Supports Transport Layer Security (TLS) only with the December 2024 release of Power BI Desktop or later
* IBM driver
  * The IBM Db2 database connector, when using the IBM Db2 driver for .NET, doesn't work with Mainframe or IBM i systems
  * Doesn't support DirectQuery

Microsoft provides support for the Microsoft driver, but not for the IBM driver. However, if your IT department has already set it up and configured on your machines, your IT department should know how to troubleshoot the IBM driver.

### Native queries not supported in DirectQuery

When you select DirectQuery as the data connectivity mode in Power Query Desktop, the SQL statement text box in the advanced options is disabled. The box is disabled because the Power Query IBM Db2 connector doesn't currently support query push down on top of a native database query.
