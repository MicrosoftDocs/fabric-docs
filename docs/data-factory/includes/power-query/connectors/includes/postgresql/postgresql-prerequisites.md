---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/postgresql/postgresql-prerequisites.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

Power BI Desktop has included the Npgsql provider for PostgreSQL connector since December 2019, eliminating the need for more installations. Starting with the October 2024 version, it incorporates Npgsql version 4.0.17. Separate Npgsql GAC installation overrides this default version.

The PostgreSQL connector is supported for cloud connection and via virtual network data gateway or on-premises data gateway. Since the June 2025 release, the on-premises data gateway includes the Npgsql provider, so no extra installation is needed. Separate Npgsql GAC installation overrides this default version.

For Power BI Desktop versions released before December 2019 and on-premises data gateway released before June 2025, you must install the Npgsql provider on your local machine to use the PostgreSQL connector. To install the Npgsql provider, go to the [releases page](https://github.com/npgsql/npgsql/releases/tag/v4.0.17) for version 4.0.17, download, and run the .msi file. The provider architecture (32-bit or 64-bit) needs to match the architecture of the product where you intend to use the connector. When installing, make sure that you select Npgsql GAC Installation to ensure Npgsql itself is added to your machine. Npgsql 4.1 and up aren't supported due to .NET version incompatibilities.

:::image type="content" source="../../media/postgresql/installer-global-assembly-cache.png" alt-text="Screenshot of the Npgsql installer with GAC Installation selected.":::

