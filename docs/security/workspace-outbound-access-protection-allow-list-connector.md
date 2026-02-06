---
title: Create an allow list using data connection rules
description: "Learn how to create an allow list using data connection rules on Microsoft Fabric workspaces."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: how-to
ms.date: 12/01/2025

#customer intent: As a data platform administrator, I want to set up outbound access protection and create an allow list using data connection rules so that I can control and secure how my workspace resources connect to external networks.

---

# Create an allow list using data connection rules

When outbound access protection is enabled for a workspace, all outbound connections are blocked by default. For Data Factory workloads, you can permit access to external data sources by configuring data connection rules. These rules let you allow or block specific cloud connections or data gateways: 

- **Cloud connections**: You can configure different types of cloud connections, such as lakehouses, databases, and SaaS services. Some connection types can only be fully allowed or fully blocked. Others let you block the connection type by default, but specify exceptions. For example, you can block the Lakehouse connection type for all workspaces except workspaces you explicitly allow.

- **Data gateways**: Data gateways let you securely connect to on-premises or virtual network resources. Only data gateways that were previously created can be allowed or blocked using data connection rules. One way to create a data gateway is by using the **Manage connections and gateways** feature; see [Add or remove a gateway data source](/power-bi/connect-data/service-gateway-data-sources) or [Manage Data Factory data sources](/fabric/data-factory/data-source-management).

This article describes how to use data connection rules in the workspace settings to allow cloud connections and data gateways.

> [!NOTE]
> Data connection rules are available for Data Factory workloads. For Data Engineering or OneLake, use [managed private endpoints](./workspace-outbound-access-protection-allow-list-endpoint.md) to allow outbound access.

## How to create an allow list using data connection rules

When you enable the **Block outbound public access** setting in the outbound access protection settings, all outbound connections are blocked by default. To allow cloud or gateway connections, configure data connection rules. You can use either the Fabric portal or the REST API.

### [Fabric portal](#tab/fabric-portal-2)

1. Sign in to Fabric as a workspace admin.

1. Go to **Workspace** > **Workspace settings** > **Outbound networking**.

1. Make sure the **Block outbound public access** toggle is enabled  so that the **Data connection rules (preview)** section appears.

   :::image type="content" source="media/workspace-outbound-access-protection-allow-list-connector/data-connection-rules.png" alt-text="Screenshot of data connection rules configuration listing allowed and blocked connection types." lightbox="media/workspace-outbound-access-protection-allow-list-connector/data-connection-rules.png":::

#### To enable a cloud connection

1. Select **Add new cloud connection rule**.

1. On the **New rule** page, under **Connection kind**, start typing the kind of connection you want to allow, and then select it in the list. Then follow one of these steps based on whether exceptions can be configured for the connection type:

   - If no exceptions can be configured for the connection type, select **Add**, and then set the toggle to **Allowed**. Select **Save**.

   - If the connection type allows you to configure exceptions (for example Lakehouse), use the drop-down to select the exception (for example, a workspace) you want to allow. Then select **Add**. Leave the toggle for the connection type set to **Blocked**, and select **Save**. This configuration blocks the connection type overall, but allows the exception you selected.

      > [!NOTE]
      > Exceptions can only be added one at a time. To add more exceptions (even to the same connection type), start again from step 1.

1. Select **Save**. 

1. Repeat for each cloud connection type or exception you want to allow.

#### To enable a data gateway

1. Under **Gateway connection policies**, expand **Virtual network and On-premises data gateways**. 

1. Expand the list under **Add allowed gateways**. This list shows all available data gateways.

1. Find the gateway you want to enable in the list and select it, and then select **Add**. Repeat for each data gateway you want to allow.

1. Select **Save**.

### [REST API](#tab/api-2)

To manage data connection rules using the REST API:

**Cloud connections**

- Use [Workspaces - Get Outbound Cloud Connection Rules](/rest/api/fabric/core/workspaces/get-outbound-cloud-connection-rules) to view current cloud connection rules.

- Use [Workspaces - Set Outbound Cloud Connection Rules](/rest/api/fabric/core/workspaces/set-outbound-cloud-connection-rules) to update cloud connection rules.
 
**Gateways**

- Use [Workspaces - Get Outbound Gateway Rules](/rest/api/fabric/core/workspaces/get-outbound-gateway-rules) to view current gateway rules.

- Use [Workspaces - Set Outbound Gateway Rules](/rest/api/fabric/core/workspaces/set-outbound-gateway-rules) to update gateway rules.

---

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)