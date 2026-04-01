---
title: Azure Event Grid connector - prerequisites
description: The include file has prerequisites for using an Azure Event Grid connector for Fabric eventstreams and real-time hub.
ms.topic: include
ms.date: 04/01/2026
---

## Prerequisites

- Create or have an Event Grid namespace with [managed identity](/azure/event-grid/event-grid-namespace-managed-identity) enabled.
- A workspace that's not **My workspace**, operating in a Fabric capacity or trial license mode, is required.
- If you have Member (or higher) permissions, no extra setup is needed. If you don't have Member permissions, ask a colleague with Member access to assign Contributor access to the Event Grid service principal before you add the source:

  1. In the workspace, open the [Manage access](../../../../fundamentals/give-access-workspaces.md) pane.
  1. Select **Add people or groups**.
  1. Enter the Event Grid namespace name and choose the matching service principal.
  1. Assign the Contributor role and select **Add**.

## Configure portal settings

To ensure that the managed identity of the Event Grid namespace has the required permissions, configure settings in the admin portal:

1. In the upper-right corner, select **Settings** (gear icon).

1. In the **Governance and insights** section, select **Admin portal**.

    :::image type="content" source="./media/azure-event-grid-source-connector/admin-portal-link.png" alt-text="Screenshot of the link for the admin portal in Power BI settings." lightbox="./media/azure-event-grid-source-connector/admin-portal-link.png":::

1. On the **Tenant settings** page, go to the **Developer settings** section.

1. To grant the service principal access to Fabric APIs for creating workspaces, connections, or deployment pipelines:

   1. Expand the **Service principals can use Fabric APIs** option.
   1. Set the toggle to **Enabled**.
   1. Under **Apply to**, select **The entire organization**.
   1. Select **Apply**.

   :::image type="content" source="./media/azure-event-grid-source-connector/developer-settings.png" alt-text="Screenshot that shows developer settings." lightbox="./media/azure-event-grid-source-connector/developer-settings.png":::

   To access all other APIs (enabled by default for new tenants):

   1. Expand the **Allow service principals to create and use profiles** option.
   1. Set the toggle to **Enabled**.
   1. Under **Apply to**, select **The entire organization**.
   1. Select **Apply**.
