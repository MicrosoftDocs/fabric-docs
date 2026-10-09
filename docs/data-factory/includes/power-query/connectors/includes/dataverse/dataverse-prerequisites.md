---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/dataverse/dataverse-prerequisites.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

You must have a Dataverse environment.

You must have read permissions to access data within tables.

To use the Dataverse connector, the **TDS endpoint** setting must be enabled in your environment. More information: [Manage feature settings](/power-platform/admin/settings-features) and [Troubleshooting connection problems using SQL to Query data](/power-apps/developer/data-platform/dataverse-sql-query#troubleshooting-connection-problems)

To use the Dataverse connector, one of TCP ports 1433 or 5558 need to be open to connect. Port 1433 is used automatically. However, if port 1433 is blocked, you can use port 5558 instead. To enable port 5558, you must append that port number to the Dataverse environment URL, such as *yourenvironmentid.crm.dynamics.com, 5558*. More information: [SQL Server connection issue due to closed ports](/power-query/connectors/dataverse#sql-server-connection-issue-due-to-closed-ports)

> [!NOTE]
> If you're using Power BI Desktop and need to use port 5558, you must create a source with the Dataverse environment URL, such as *yourenvironmentid.crm.dynamics.com,5558*, in Power Query M. More information: [Finding your Dataverse environment URL](/power-query/connectors/dataverse#finding-your-dataverse-environment-url)

