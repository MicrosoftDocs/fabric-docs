---
title: "Open Mirroring Partner Ecosystem"
description: Learn about the open mirrored databases partner ecosystem in Microsoft Fabric.
author: whhender
ms.author: whhender
ms.reviewer: tinglee, sbahadur, ulrichchrist, maraki-ketema
ms.date: 12/10/2025
ms.topic: partner-tools
ms.search.form: Fabric Mirroring
ai-usage: ai-assisted
no-loc: [Copilot]
---

# Open mirroring partner ecosystem

[Open mirroring in Microsoft Fabric](../mirroring/open-mirroring.md) is designed to be extensible, customizable, and open. It's a powerful feature that extends Mirroring in Fabric based on open Delta Lake table format. This capability enables any data providers to write change data directly into a mirrored database item in Microsoft Fabric.

The following are the open mirroring partners who have solutions ready to integrate with Microsoft Fabric.

## AecorSoft

AecorSoft Data Integrator is an SAP-certified data integration tool which supports data replication from SAP systems into Microsoft Fabric via open mirroring. For more information, see [AecorSoft Data Integrator](https://aka.ms/mirroring/aecorsoft-mirroring-overview).

## ASAPIO

The ASAPIO Integration Add-on is an SAP-certified solution that connects SAP systems directly to Microsoft Fabric. It supports open mirroring to enable change data capture to Microsoft Fabric and comes with a data catalog of predefined data products for real-time and scheduled data replication.

For more information, see [ASAPIO Integration Add-on, Fabric Connector](https://aka.ms/mirroring/asapio-mirroring-overview).

## CData

CData Sync brings Open Mirroring support to over 150 enterprise data sources with minimal configuration, for both on-premises and in the cloud. Open Mirroring with Sync helps organizations reflect data changes from critical sources like SAP, NetSuite, Salesforce, and SQL Server directly into Fabric for immediate analysis.

For more information, see [CData Sync's Open Mirroring release blog](https://www.cdata.com/blog/sync-expands-ms-fabric-support-open-mirroring). 

## CluedIn

CluedIn is a Master Data Management and data quality platform that enables enterprises to unify, clean, and govern their data at scale. By integrating with Open Mirroring, CluedIn streamlines the ingestion and harmonization of enterprise data, ensuring it remains accurate, consistent, and ready for analytics in Fabric.

For more information on CluedIn for Microsoft Fabric, see [Microsoft Fabric & CluedIn](https://aka.ms/mirroring/cluedin).

## Cloud Services

Cloud Services help customers build data warehouse solutions that are robust and easy to maintain and scale. In their latest innovation, the Open Mirroring solution for Salesforce offers customers a powerful, scalable, and cost-effective way to bring CRM data into Fabric. 

For more information on Cloud Services, see [Seamless Salesforce Integration with Open Mirroring](https://cs-worldwide.com/seamless-salesforce-integration-with-microsoft-fabric-open-mirroring-in-action/). 

## dab

dab Nexus is an SAP-certified solution for data extraction from SAP ECC and SAP S/4HANA (on-premises and Private Cloud Edition). It integrates with open mirroring to support near real-time analytics on SAP data in Microsoft Fabric.
For an overview of dab Nexus, see [Effortless SAP Data Integration in Microsoft Fabric](https://aka.ms/mirroring/dab-mirroring-overview).

For the technical documentation of dab Nexus, see [Quickstart Guide Managed App - dab:Help](https://aka.ms/mirroring/dab-mirroring-doc).

## MongoDB

MongoDB integrated with open mirroring for a solution to bring operational data from MongoDB Atlas to Microsoft Fabric for Big data analytics, AI and BI, combining it with the rest of the data estate of the enterprise. Once mirroring is enabled for a MongoDB Atlas collection, the corresponding table in OneLake is kept in sync with the changes in source MongoDB Atlas collection, unlocking opportunities of varied analytics and AI and BI in near real-time.

For more information, see [MongoDB integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/mongodb-docs).

## Oracle GoldenGate 23ai

Oracle GoldenGate 23ai integration into Microsoft Fabric via open mirroring. Any supported Oracle GoldenGate source including Oracle Database@Azure can replicate data into a Mirrored Database in Microsoft Fabric. This powerful combination unlocks real-time data integration, continuously synchronizing data across your hybrid and multicloud environments. Mirrored Database in Microsoft Fabric as a destination is available through the GoldenGate for Distributed Applications and Analytics 23ai product.

For more information, see [Oracle GoldenGate 23ai integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/oracle-goldengate-23ai-docs).

## Qlik

Qlik Replicate provides log-based Change Data Capture (CDC) for over 40 heterogeneous source systems, including SAP, DB2 z/OS, Teradata, Oracle, and cloud databases like Amazon Aurora. By continuously streaming data changes directly to Fabric's open mirroring landing zone, Qlik Replicate removes the need for complex ETL pipelines while minimizing impact on your operational systems. The Fabric mirroring engine automatically processes these changes and merges them into analytics-ready Delta Lake tables in OneLake.

For more information, see [Qlik + Microsoft Fabric Open Mirroring](https://www.qlik.com/blog/qlik-microsoft-fabric-open-mirroring-the-fast-track-to-real-time-data).

## Quadrant Technologies

QMigrator is a data migration and data replication tool that enables enterprises to move data from many sources to many targets, including Fabric. QMigrator's Fabric integration solution enables clients to replicate the data from operation database like DB2, Oracle, MySQL, and SQL Server to Fabric using Open Mirroring.

For more information about QMigrator, see [QMigrator and Fabric](https://qmigrator.ai/Fabric).

## Simplement

Simplement Roundhouse is an SAP-certified solution for data extraction from various SAP source systems. It supports near real-time data integration into Microsoft Fabric via open mirroring.

For more information, see [Simplement integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/simplement-overview).

## SNP

SNP Glue is a data integration solution certified for various SAP source systems including SAP S/4HANA (on-premises and Private Cloud Edition). With release 2502, it supports open mirroring for near real-time data integration into Microsoft Fabric. For more information, see [SNP Glue release note](https://aka.ms/mirroring/snp-mirroring-doc).

For more information on SNP Glue, see the [SNP Glue documentation](https://aka.ms/mirroring/snp-overview).

## Striim

All supported Striim sources including Oracle, SQL Server, and many others can be replicated in real-time into a Mirrored Database in Microsoft Fabric via open mirroring. Striim's streaming platform enables customers to unify data across databases, applications, and clouds in real time. Mirrored Database in Microsoft Fabric is supported as a destination through the Striim Cloud Enterprise and Striim SQL2Fabric-X products.

For more information, see [Striim integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/striim-docs).

## Tessell

Tessell is a multicloud DBaaS unifying operational and analytical data within a seamless data ecosystem. Leveraging open mirroring in Microsoft Fabric Tessell enables customers to stream changes from Tessell managed Oracle databases directly into Microsoft OneLake.

## Theobald

Theobald Xtract Universal is an SAP-certified data integration solution supporting all standard SAP applications like SAP S/4HANA, SAP ECC, and SAP BW. Starting with version 2025.3.26.15 it now supports open mirroring for [change data capture from SAP into Microsoft Fabric](https://aka.ms/mirroring/theobald-mirroring-overview).

For more information on Theobald Xtract Universal, see [Theobald Xtract Universal](https://aka.ms/mirroring/theobald-xtract-universal-overview).

## Related content

- [Tutorial: Configure Microsoft Fabric open mirrored databases](../mirroring/open-mirroring-tutorial.md)
