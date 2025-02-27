---
title: "Open Mirroring (Preview) Partner Ecosystem"
description: Learn about the open mirrored databases partner ecosystem in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: tinglee, sbahadur, ulrichchrist
ms.date: 01/15/2025
ms.topic: conceptual
ms.search.form: Fabric Mirroring
no-loc: [Copilot]
---

# Open mirroring (preview) partner ecosystem

[Open mirroring in Microsoft Fabric (Preview)](open-mirroring.md) is designed to be extensible, customizable, and open. It's a powerful feature that extends Mirroring in Fabric based on open Delta Lake table format. This capability enables any data providers to write change data directly into a mirrored database item in Microsoft Fabric.

The following are the open mirroring partners who have already built solutions to integrate with Microsoft Fabric.

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

This page is updated during the current preview.

## Oracle GoldenGate 23ai

Oracle GoldenGate 23ai integration into Microsoft Fabric via open mirroring. Any supported Oracle GoldenGate source including Oracle Database@Azure can replicate data into Mirrored Database in Microsoft Fabric. This powerful combination unlocks real-time data integration, continuously synchronizing data across your hybrid and multicloud environments. Mirrored Database in Microsoft Fabric as a destination is available through the GoldenGate for Distributed Applications and Analytics 23ai product.

For more information, see [Oracle GoldenGate 23ai integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/oracle-goldengate-23ai-docs).

## Striim

SQL2Fabric-Mirroring is a Striim solution that reads data from SQL Server and writes it to Microsoft Fabric's mirroring landing zone in Delta-Parquet format. Microsoft's Fabric replication service frequently picks up these files and replicates the file contents into Fabric data warehouse tables.

For more information, see [Striim integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/striim-docs).

## MongoDB

MongoDB integrated with open mirroring for a solution to bring operational data from MongoDB Atlas to Microsoft Fabric for Big data analytics, AI and BI, combining it with the rest of the data estate of the enterprise. Once mirroring is enabled for a MongoDB Atlas collection, the corresponding table in OneLake is kept in sync with the changes in source MongoDB Atlas collection, unlocking opportunities of varied analytics and AI and BI in near real-time.

For more information, see [MongoDB integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/mongodb-docs).

## dab

dab Nexus is an SAP-certified solution for data extraction from SAP ECC and SAP S/4HANA (on-premises and Private Cloud Edition). It integrates with open mirroring to support near real-time analytics on SAP data in Microsoft Fabric.
For an overview of dab Nexus, see [Effortless SAP Data Integration in Microsoft Fabric](https://aka.ms/mirroring/dab-mirroring-overview).
For the technical documentation of dab Nexus, see [Quickstart Guide Managed App - dab:Help](https://aka.ms/mirroring/dab-mirroring-doc).

## Simplement

Simplement Roundhouse is an SAP-certified solution for data extraction from various SAP source systems. It supports near real-time data integration into Microsoft Fabric via open mirroring.
For more information, see [Simplement integration into open mirroring in Microsoft Fabric](https://aka.ms/mirroring/simplement-overview).

## Related content

- [Tutorial: Configure Microsoft Fabric open mirrored databases](open-mirroring-tutorial.md)
