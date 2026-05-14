---
title: Prerequisites for Plan (Preview)
description: This article lists the prerequisites for using plan (preview).
ms.topic: overview
ms.date: 05/14/2026
ai-usage: ai-assisted
#customer intent: As a user, I want to know the prerequisites for using Plan.
---

# Prerequisites for plan (preview)

This article lists all the required prerequisites, tenant settings, and capacity settings that must be configured to use plan (preview).

## Tenant settings

[Fabric administrators](../../admin/roles.md) can grant access to these settings in the [admin portal](../../admin/admin-center.md) under [Tenant settings](../../admin/tenant-settings-index.md).

1. Enable **Users can create Plan (preview) items**. This setting is required to create plan (preview) items.

   :::image type="content" source="media/overview-prerequisites/enable-plan.png" alt-text="Screenshot of enabling plan for organizational users." lightbox="media/overview-prerequisites/enable-plan.png":::

1. Under [Integration settings](../../admin/tenant-settings-index.md#integration-settings), enable **Allow XMLA endpoints and Analyze in Excel with on-premises semantic models**.

   :::image type="content" source="media/overview-prerequisites/allow-xmla-endpoints.png" alt-text="Screenshot of enabling allow xmla endpoints and analyze in excel with on-premises semantic models":::

1. Under [Developer settings](../../admin/tenant-settings-index.md#developer-settings), enable **Embed content in apps**.

## Capacity settings

* Semantic models used in plan must be hosted on supported capacities, such as

   * **Power BI Premium capacities (P1, P2, and higher)**
   * **Microsoft Fabric capacities (F SKUs)**

* Plan scenarios that rely on XMLA endpoints and embed tokens require supported **Microsoft Fabric capacities (F SKUs)** or **Power BI Premium capacities (P1–P5)**. Power BI Pro and Power BI Premium Per User (PPU) aren't supported for these scenarios. Some lower-capacity SKUs can also have XMLA and memory limitations that prevent supported usage.

* In the Power BI Admin portal, under **Capacity settings**, ensure that the **XMLA Endpoint** setting is configured as **Read Only** or **Read Write**.

    :::image type="content" source="media/overview-prerequisites/set-xmla-read-only.png" alt-text="Screenshot of setting xmla endpoints as read only or read write":::

## Semantic model connection owner permissions

The shared cloud connection owner, whether a user account or service principal, must have a workspace **Member** or **Admin** role.

## Optional: Database connections

The following list contains optional database connections that you can configure to enable specific scenarios such as collaboration and writeback.

* Create and share a Fabric SQL database connection with report viewers so they can collaborate on the plan report. For more information, see [Create a database connection for collaboration](planning-how-to-create-database-connection.md).
* Create and configure a writeback destination if you want to write back the plan data. For more information, see [Create a writeback destination](planning-writeback/planning-how-to-persist-data.md#create-a-writeback-destination).

> [!NOTE]
> During plan (preview) item creation, a Fabric SQL database is automatically created in your workspace. This database stores your plan report's metadata.
