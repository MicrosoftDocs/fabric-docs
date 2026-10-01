---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/mysql-database/mysql-database-limitations-and-considerations.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

The following limitations apply to the Power Query MySQL database connector.

### MySQL connections can't be used with personal gateways

If the MySQL database isn't accessible from the cloud, configure MySQL on-premises connections by upgrading to a standard mode on-premises data gateway instead of using a personal on-premises data gateway. For cloud-based MySQL servers, a gateway isn't required.

### It isn't possible to mashup MySQL on-premises data with R and Python

For cases where Python or R is used with a MySQL database on-premises connection, use one of the following methods:

* Make the MySQL server database accessible from the cloud.
* Move the MySQL on-premises data to a different dataset and use the Enterprise Gateway exclusively for that purpose. 

### Unsupported regions

The MySQL connector doesn't support China Cloud for Power Apps, Power Automate and Logic Apps. Refer to [MySQL connector](/connectors/mysql) for those products.
