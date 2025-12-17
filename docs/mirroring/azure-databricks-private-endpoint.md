---
title: "Mirrored Azure Databricks behind a private endpoint"
description: Learn how to connect to mirrored databases behind a private endpoint from Azure Databricks in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.reviewer: whhender, preshah
ms.date: 12/17/2025
ms.topic: how-to
---

# Connect to Azure Databricks workspaces behind a private endpoint

The mirrored Azure Databricks catalog item can connect to Azure Databricks workspaces behind a private endpoint. You can connect securely to such workspaces through a virtual network (VNet) data gateway, ensuring seamless and compliant access over private network paths.

The virtual network data gateway securely routes traffic between the mirrored Azure Databricks catalog item and the Azure Databricks workspace through a private endpoint within the your virtual network, leveraging Azure backbone connectivity. This ensures all communication remains isolated within private IP spaces, avoiding public network exposure. For more information, see [What is a virtual network (VNet) data gateway?](/data-integration/vnet/overview)

You can also connect to your ADLS storage accounts that are behind a private endpoint. For more information, see [Enable network security access for your Azure Data Lake Storage Gen2 account](azure-databricks-tutorial.md#enable-network-security-access-for-your-azure-data-lake-storage-gen2-account).

## Prerequisites

* Microsoft Fabric capacity
* To complete the steps in the [Create a Databrics connection](#create-a-databricks-connection) section, you must be either a user or an admin of the Azure Databricks workspace.

## Limitations

* Only newly created mirrored Azure Databricks catalog items support this feature.
* A virtual network data gateway can be associated with only one Azure Databricks workspace.
* Managed virtual network Azure Databricks workspaces aren't supported. Only virtual network injected workspaces are supported.
* Accessing Azure Databricks workspaces through an on-premises data gateway isn't supported. Only virtual network data gateway is supported.
* Connection creation using the virtual network data gateway is supported only through the Manage Connections experience and not within the connection creation flow of the mirrored Azure Databricks catalog item.

## Configure an Azure Databricks workspace

Create a Databricks workspace and configure it to use a private endpoint.

1. Create a Databricks workspace deployed in a virtual network. Follow the instructions in [Deploy Azure Databricks in your Azure virtual netowrk (VNet injection)](/azure/databricks/security/network/classic/vnet-inject).

2. Configure private connectivity for your workspace. Follow the instructions in [Configure private connectivity for an existing workspace](/azure/databricks/security/network/front-end/front-end-private-connect#-configure-private-connectivity-for-an-existing-workspace).

## Create a virtual network data gateway

Create a virtual network data gateway to enable the connection between your Fabric workspace and your private Azure Databricks workspace.

1. Create a virtual network data gateway. Follow the instructions in [Create virtual network data gateways](/data-integration/vnet/create-data-gateways).

   Create the data gateway with the following required configurations:

   * Create the virtual network data gateway in the same region as your Azure Databricks workspace.

   * Use the same capacity to create the virtual network data gateway as your Fabric workspace.

   * Deploy the virtual network data gateway in the same virtual network where the private endpoint was created.

## Create a Databricks connection

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

Create a mirrored Azure Databricks catalog item that can access the private Databricks workspace through the virtual network data gateway.

1. Create a mirrored Azure Databricks catalog item. Follow the instructions in [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks](./azure-databricks-tutorial.md).

   When you select a connection for the catalog item, choose the Databricks connection that you created in the previous section.