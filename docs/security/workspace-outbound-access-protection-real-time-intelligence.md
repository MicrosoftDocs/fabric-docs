---
title: Workspace outbound access protection for Real-Time Intelligence
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Real-Time Intelligence artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 04/07/2026
ms.topic: how-to
---

# Workspace outbound access protection for Real-Time Intelligence (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Real-Time Intelligence items in your workspace to external data sources. When this feature is enabled, [Eventhouses](#supported-real-time-intelligence-item-types) are restricted from making outbound connections unless access is explicitly granted through approved data connection rules. 

## Understanding outbound access protection with Real-Time Intelligence

The workspace admin first enables outbound access protection for the workspace, which blocks all outbound connections from Eventhouses by default.  

Next, the workspace admin configures data connection rules for cloud or gateway connection policies. These rules specify which external sources are allowed, such as SQL Server and Azure Data Lake Storage (ADLS) Gen2 Storage. Once policies are set, Evenhouses can connect only to the approved destinations (in this example, SQL Server and ADLS Gen2 Storage), while all other outbound connections remain blocked.

:::image type="content" source="media/workspace-outbound-access-protection-real-time-intelligence/block-and-allow-small.png" alt-text="Screenshot of connections showing allowed connections to SQL Server and ADLS G2 Storage." lightbox="media/workspace-outbound-access-protection-real-time-intelligence/block-and-allow.png" border="false":::

## Configuring outbound access protection for Real-Time Intelligence

You can only create an allow list using data connection rules; managed private endpoints aren't supported for Real-Time Intelligence workloads. To configure outbound access protection for Real-Time Intelligence:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md). 

1. After enabling outbound access protection, you can set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow outbound access to other workspaces or external resources as needed.

Once configured, Real-Time Intelligence items can connect only to the approved destinations specified in the data connection rules, while all other outbound connections remain blocked.

## Supported Real-Time Intelligence item types

The following Real-Time Intelligence item types are supported with outbound access protection:

- Eventhouses

## Next steps
