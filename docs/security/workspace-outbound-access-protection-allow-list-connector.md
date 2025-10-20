---
title: Create an allowlist using data connection rules
description: "Learn how to create an allowlist using data connection rules on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 10/20/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection and create an allowlist using data connection rules so that I can control and secure how my workspace resources connect to external networks.

---

# Create an allowlist using data connection rules

When outbound access protection is enabled for a workspace, all outbound connections are blocked by default. To permit access to external data sources through specific cloud connections or data gateways, you can create an allowlist by configuring data connection rules. This article describes how to use data connection rules in the workspace settings to allow cloud connections and data gateways.

Data connection rules apply to Data Factory workloads. For Data Engineering or OneLake, use [managed private endpoints](./workspace-outbound-access-protection-allow-list-endpoint.md) to allow outbound access.

## Prerequisites

* [Enable outbound access protection](workspace-outbound-access-protection-set-up.md) for the workspace.

* Before you can allow or block specific cloud connections or data gateways, ensure they have already been created, for example through the **Manage connections and gateways** experience.
   * To create a data gateway, see [Add or remove a gateway data source](/power-bi/connect-data/service-gateway-data-sources).
   * To create a cloud connection, see [Data Factory data source management](/fabric/data-factory/data-source-management).

## Allow or block cloud and data gateway connections

After you enable outbound access protection, all data connections with external sources are blocked by default. You can allow specific cloud connectors and data gateways by using the Fabric portal or REST API to create data connection rules.

### [Fabric portal](#tab/fabric-portal-2)

In the **Data connection rules** settings, you can enable or block cloud connections or data gateways.

1. Sign in to Fabric as a workspace admin.

1. Go to **Workspace** > **Workspace settings** > **Outbound networking**.

1. Scroll to the **Data connection rules (preview)** section. After you enable outbound access protection, all cloud connections and gateway connections are blocked by default.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-connector/data-connection-rules.png" alt-text="Screenshot of data connection rules configuration listing allowed and blocked connection types." lightbox="media/workspace-outbound-access-protection-allow-list-connector/data-connection-rules.png":::

1. To enable a cloud connection:
   1. Under **Cloud connection policies**, find the connection type you want to enable and switch its toggle to **Allowed**.
   1. If the connection type isn't listed, select **Add new cloud connection rule**, find the data source type, and select **Add**. When the connection type appears under **Cloud connection policies**, set its toggle to **Allowed**.
      > [!NOTE]
      > If the data source type isn't listed, you can add it by following the steps in [Data Factory data source management](/fabric/data-factory/data-source-management). Then return to these steps.

   1. Select **Save**.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-connector/cloud-connection-policies.png" alt-text="Screenshot of cloud connection policies showing two types of allowed connection types." lightbox="media/workspace-outbound-access-protection-allow-list-connector/cloud-connection-policies.png":::

1. To enable a data gateway:
   1. Expand **Virtual network and On-premises data gateways**. This list contains data gateways that have already been created.
   1. Find the gateway you want to enable in the list and switch its toggle to **Allowed**.
      > [!NOTE]
      > If the data gateway isn't listed, you can create it by following the steps in [Add or remove a gateway data source](/power-bi/connect-data/service-gateway-data-sources). Then return to these steps.

### [API](#tab/api-2)

Call the following APIs to view/update the Data Connection rules (Cloud Connections).

Refer to the [Workspaces - Get Network Communication Policy](/rest/api/fabric/core/workspaces/get-network-communication-policy) and [Workspaces - Set Network Communication Policy](/rest/api/fabric/core/workspaces/set-network-communication-policy) APIs.

Call the following APIs to view/update the Data Connection rules (Gateways).

Refer to the [Workspaces - Get Gateway Connection Policy](/rest/api/fabric/core/workspaces/get-gateway-connection-policy) and [Workspaces - Set Gateway Connection Policy](/rest/api/fabric/core/workspaces/set-gateway-connection-policy) APIs.

---

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
