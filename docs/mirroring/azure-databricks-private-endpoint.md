---
title: "Mirrored Azure Databricks behind a private endpoint"
description: Learn how to connect a mirrored Azure Databricks catalog item in Microsoft Fabric to a workspace behind a private endpoint.
author: kgremban
ms.author: kgremban
ms.reviewer: whhender, preshah
ms.date: 01/28/2026
ms.topic: how-to
---

# Connect to Azure Databricks workspaces behind a private endpoint

The mirrored Azure Databricks catalog item can connect to Azure Databricks workspaces behind a private endpoint. You can connect securely to these workspaces through a virtual network (VNet) data gateway, ensuring seamless and compliant access over private network paths.

The virtual network data gateway securely routes traffic between the mirrored Azure Databricks catalog item and the Azure Databricks workspace. It uses a private endpoint within your virtual network and Azure backbone connectivity. This architecture ensures that all communication remains isolated within private IP spaces and avoids public network exposure. For more information, see [What is a virtual network (VNet) data gateway?](/data-integration/vnet/overview)

You can also connect to your ADLS storage accounts that are behind a private endpoint. For more information, see [Enable network security access for your Azure Data Lake Storage Gen2 account](azure-databricks-tutorial.md#enable-network-security-access-for-your-azure-data-lake-storage-gen2-account).

## Prerequisites

* Microsoft Fabric capacity
* An Azure Databricks workspace deployed in a virtual network. Follow the instructions in [Deploy Azure Databricks in your Azure virtual network (VNet injection)](/azure/databricks/security/network/classic/vnet-inject).
* Private connectivity for your Databricks workspace. Follow the instructions in [Configure private connectivity for an existing workspace](/azure/databricks/security/network/front-end/front-end-private-connect#-configure-private-connectivity-for-an-existing-workspace).

## Limitations

* You can't access Azure Databricks workspaces through an on-premises data gateway. Only virtual network data gateway is supported.
* You can create connections using the virtual network data gateway only through the Manage Connections experience. You can't create connections within the connection creation flow of the mirrored Azure Databricks catalog item.

## Create a virtual network data gateway

A virtual network data gateway enables the connection between your Fabric workspace and your private Azure Databricks workspace.

Follow the instructions in [Create virtual network data gateways](/data-integration/vnet/create-data-gateways). Create the data gateway with the following required configurations:

* Create the virtual network data gateway in the same region as your Azure Databricks workspace.

* Ensure that the virtual network data gateway can reach the private endpoint to the Azure Databricks workspace. One way to achieve this reachability is to deploy the virtual network data gateway in the same virtual network where you created the private endpoint.

If you encounter errors, refer to the [Virtual network (VNet) data gateway FAQs](/data-integration/vnet/data-gateway-faqs) for troubleshooting help.

## Create an Azure Databricks connection

Create a connection that uses the virtual network data gateway to provide access to your Databricks workspace.

1. In the Fabric portal, open **Settings** > **Manage connections and gateways**.

1. Select **New**.

1. Select the **Virtual network** connection type.

1. Provide the following information for the new connection:

   | Parameter | Value |
   | --------- | ----- |
   | Gateway cluster name | Select the virtual network data gateway that you created in the previous section. |
   | Connection name | Provide a name for the connection. |
   | Connection type | Select **Azure Databricks workspace**. |
   | URL | Provide the URL for your Databricks workspace. |
   | Authentication method | Select either organizational account or service principal authentication. |

1. Select **Create**.

## Create a mirrored Azure Databricks catalog item

Now that you have the Azure Databricks connection configured, your mirrored Azure Databricks catalog items can access your private Azure Databricks workspace through the virtual network data gateway.

Follow the instructions in [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks](./azure-databricks-tutorial.md). When you select a connection for the catalog item, choose the Azure Databricks connection that you created in the previous section.

## Related content

* [What is Mirroring in Fabric?](overview.md)
* [What is a virtual network (VNet) data gateway?](/data-integration/vnet/overview)
* [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks](azure-databricks-tutorial.md)

