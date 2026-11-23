---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/mysql-database/mysql-database-prerequisites.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

You need to install the [Oracle MySQL Connector/NET](https://dev.mysql.com/downloads/connector/net/) package before using this connector in Power BI Desktop. For Power Query Online (dataflows) or Power BI service, if your MySQL server isn't cloud accessible and an on-premises data gateway is needed, the component Oracle MySQL Connector/NET must also be correctly installed on the machine running the on-premises data gateway. To determine if the package is installed correctly, open a PowerShell window and run the following command:

`[System.Data.Common.DbProviderFactories]::GetFactoryClasses()|ogv`

If the package is installed correctly, the MySQL Data Provider is displayed in the resulting dialog. For example:

:::image type="content" source="../../media/mysql-database/data-provider.png" alt-text="Screenshot of the data provider dialog with the MySQL data provider emphasized." lightbox="../../media/mysql-database/data-provider.png":::

If the package doesn't install correctly, work with your MySQL support team or reach out to MySQL.

> [!NOTE]
> The MySQL connector isn't supported on the **Personal Mode** of the on-premises data gateway. It's only supported on the on-premises data gateway **(standard mode)**

