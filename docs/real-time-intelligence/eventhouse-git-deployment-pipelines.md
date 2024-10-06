---
title: Eventhouse and KQL database pipelines and git integration
description: Learn about the Microsoft Fabric Eventhouse and KQL database deployment pipelines and git integration, including what is tracked in a git-connected workspace.
ms.reviewer: bwatts
ms.author: shsagir
author: shsagir
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 10/06/2024
ms.search.form: Eventhouse,KQL database, Overview (//TODO Ask Yael about this)
# customer intent: I want to understand the integration of Eventhouse and KQL database with Microsoft Fabric's deployment pipelines and git, and how to configure and manage them in the ALM system.
---

# Eventhouse and KQL database pipelines and git integration (Preview)

Microsoft Fabric's lifecycle management tools ([ALM](../cicd/cicd-overview.md)) provide a standardized system for communication and collaboration between all members of the development team throughout the life of the product. This functionality is delivered via [git integration](../cicd/git-integration/intro-to-git-integration.md) and [deployment pipelines](../cicd/deployment-pipelines/intro-to-deployment-pipelines.md). Eventhouse and KQL databases are supported in Microsoft Fabric ALM allowing you to automate your deployment via Github or deployment pipelines.

Below we will outline what is configurable via Microsoft Fabric ALM for both Eventhouse and KQL database.

## Platform Integration

This is configuration that is set on the Microsoft Fabric platform level or control plan level.
Eventhouse

- Name
- Etc..
KQL database
- Name
- Retention Policy

## Data Plane Integration

Data plane integration is set via KQL scripts. Not all commands supported in a KQL script are supported in Microsoft Fabric ALM. Below outlines specifically what is supported

### Eventhouse

- [MS] Currently None
{In the future will include cluster level data plane command such as workload}

### KQL database

- Table Creation and Alter .create-merge table command - Kusto | Microsoft Learn
- Function creation and Alter .create-or-alter function command - Kusto | Microsoft Learn
- Table policy update .alter table policy update command - Kusto | Microsoft Learn
- Column encoding policy .alter column policy encoding command - Kusto | Microsoft Learn
- Metalized view create and alter .create-or-alter materialized view - Kusto | Microsoft Learn
- Martialized view alter Alter materialized view - Kusto | Microsoft Learn
- Table Ingestion maaping create and update .create-or-alter ingestion mapping command - Kusto | Microsoft Learn
.create ingestion mapping command - Kusto | Microsoft Learn
- {additional entities will be released in the future}

## Github File Format

<I think we should outline here how the folder and files are arranged in Github>