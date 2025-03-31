---
title: Connect to Azure resources securely using managed private endpoints
description: Learn how to set up managed private endpoints in Fabric network security and stream data securely from Azure Event Hubs or IoT Hub to Eventstream. 
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.date: 3/11/2025
ms.search.form: fabric's manage private endpoints
ms.custom: reference_regions
---

# Connect to Azure resources securely using managed private endpoints (Public Preview)

Managed Private Endpoint is a network security feature of the Fabric platform that allows Fabric items to securely access data sources behind a firewall or not accessible from the public internet. By integrating Eventstream with the Managed Private Endpoint, a managed virtual network is automatically created for Eventstream, allowing you to securely connect to your Azure resources within a private network. This feature ensures that your data is securely transmitted over a private network.

The following diagram shows a sample architecture for connecting Eventstream to Azure event hub within a virtual network:

:::image type="content" source="media/set-up-private-endpoint/private-network-architecture.png" alt-text="A screenshot of the Eventstream private network architecture." lightbox="media/set-up-private-endpoint/private-network-architecture.png":::

## Supported data sources and regions

* **Supported data sources**: In alignment with the Managed Private Endpoints in Fabric, Eventstream only supports private connections for the following Azure resources:
  * **Azure Event Hubs**
  * **Azure IoT Hub**

* **Supported regions for Eventstream managed virtual network**: The table blow lists regions where Eventstream managed virtual network are available.

    | Americas                     | Europe                     | Middle East | Africa             | Asia Pacific                    |
    |:-----------------------------|:---------------------------|:------------|:-------------------|:--------------------------------|
    | Brazil South                 | North Europe               | UAE North   | South Africa North | Australia East                  |
    | Canada Central               | West Europe                |             |                    | Australia Southeast             |
    | Central US                   | France Central             |             |                    | Central India                   |
    | East US                      | Germany West Central       |             |                    | Japan East                      |
    | East US 2                    | Sweden Central             |             |                    | Southeast Asia                  |
    | North Central US             | UK South                   |             |                    | Korea Central                   |
    | West US                      |                            |             |                    |                                 |
    | West US 2                    |                            |             |                    |                                 |

To learn more about the Managed Private Endpoints and supported data sources, visit [Managed Private Endpoints for Fabric](/fabric/security/security-managed-private-endpoints-overview).

## Connect to Azure Event Hubs using a managed private endpoint

Setting up a private connection in Eventstream is straightforward. Follow these steps to create a managed private endpoint for an Azure event hub and stream data to Eventstream over private network.  

### Prerequisites

* Managed private endpoints are supported for **Fabric trial** and **all Fabric F SKU** capacities.
* Only users with **Workspace Admin** permissions can create Managed Private Endpoints
* An Azure event hub with public access disabled, and its **Resource ID** ready for creating a private endpoint.
* A Fabric tenant region that supports managed virtual network (VNet) for Eventstream.

### Step 1: Create an eventstream
[!INCLUDE [create-an-eventstream](./includes/create-an-eventstream.md)]

### Step 2: Create a private endpoint

* In the Fabric workspace, go to the **Workspace settings** and navigate to the **Network security** section.
* Select **Create** to add a new private endpoint.
* For the **Resource identifier**, enter the resource ID of your Azure Event Hubs such as `/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/my-resourcegroup/providers/Microsoft.EventHub/namespaces/my-eh-namespace`.
* For **Target Sub-resource**, select **Azure Event Hub**.
* Select **Create** to finalize the private endpoint creation.

:::image type="content" source="media/set-up-private-endpoint/step-2-create-private-endpoint.png" alt-text="A screenshot of the creating a private endpoint." lightbox="media/set-up-private-endpoint/step-2-create-private-endpoint.png":::

### Step 3: Approve the private endpoint in Azure Event Hubs

* Go to the Azure portal and open your Azure event hub.
* In the **Networking** section, navigate to the **Private endpoint connections** tab.
* Locate the private endpoint request from your Fabric workspace and approve it.
* Once approved, the managed private endpoint status updates to **Approved**.

:::image type="content" source="media/set-up-private-endpoint/step-3-approve-in-azure.png" alt-text="A screenshot of approving private endpoint in Azure portal." lightbox="media/set-up-private-endpoint/step-3-approve-in-azure.png":::

### Step 4: Add an Azure Event Hubs source to Eventstream

* Go back to the eventstream you created in Fabric.
* Select **Azure Event Hubs** and add it as a source to your Eventstream.
* When creating a new connection to your Azure event hub, uncheck the **Test connection** option if your event hub isn't publicly accessible.
* Manually enter the **Consumer group**.

:::image type="content" source="media/set-up-private-endpoint/step-4-add-event-hub.png" alt-text="A screenshot of adding Azure Event Hubs to Eventstream." lightbox="media/set-up-private-endpoint/step-4-add-event-hub.png":::

Once added, Eventstream starts pulling data from your Azure event hub over the private network.

:::image type="content" source="media/set-up-private-endpoint/step-5-add-event-hub-succeeded.png" alt-text="A screenshot of successfully adding Azure Event Hubs to Eventstream." lightbox="media/set-up-private-endpoint/step-5-add-event-hub-succeeded.png":::

By following these steps, you have a fully operational Eventstream running over a secure private network, using the managed private endpoint to ensure secure data streaming.

## Limitations

* The **Data Preview** feature may not be available for data sources that aren't publicly accessible when connected through a managed private endpoint. However, the data is securely transmitted and flows correctly to the Eventstream.

## Related content
- [Network security in Fabric](/fabric/security/security-overview)
- [Managed Private Endpoints](/fabric/security/security-managed-private-endpoints-overview)
- [Create Managed Private Endpoints](/fabric/security/security-managed-private-endpoints-create)
