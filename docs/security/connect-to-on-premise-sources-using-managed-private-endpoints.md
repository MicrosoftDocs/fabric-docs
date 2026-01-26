---
title: Connect on-premises data sources to Microsoft Fabric using managed private endpoints
description: Learn how to securely connect on-premises or custom-hosted data sources to Microsoft Fabric using managed private endpoints and private link services.
author: msmimart
ms.author: mimart
ms.reviewer: saravi
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 10/07/2025
---

# Connect to external sources or on-premises data sources to Microsoft Fabric using managed private endpoints

With managed private endpoints, you can securely connect Microsoft Fabric workloads such as Spark or Data Pipelines to your **on-premises** or **custom-hosted data sources** through an approved private link setup.  
This approach ensures that traffic flows through the Microsoft backbone network instead of the public internet — maintaining end-to-end data privacy and compliance.

Common use cases include accessing:
- Data sources like SAP, Oracle databases, Elastic, Non Native Azure Sources like Confluent Kafka, Elasticsearch or Datasources hosted in on-premises environments.
- Data sources on Azure VMs
- Custom APIs or services hosted in virtual networks or self-managed data centers.
- Secure corporate data stores without exposing public endpoints.

---

## Overview

Fabric Managed Private Endpoints (MPEs) allow Fabric to establish **outbound** connections to approved data sources using **Private Link Services (PLS)**.  
The setup involves three main steps:

1. The data source owner or administrator configures an Azure Private Link Service (PLS) for the resource that’s fronted by a private IP address.
2. A Fabric workspace admin creates a **Managed Private Endpoint (MPE)** referencing the fully qualified domain name (FQDN) with the resource ID of the Private Link Service.
3. The data source owner or administrator reviews and approves the connection request in Azure.

Once approved, all Fabric Data Engineering workloads (like Notebooks, Spark Job Definitions, Materialized Lakeviews, Livy Endpoints) can securely connect to the approved resource.

---

## Prerequisites

Before you begin:

- A Microsoft Fabric workspace with workspace admin role.
- The Azure subscription must have the **Microsoft.Network** resource provider registered.
- Have data sources or services running behind a Standard Load Balancer which is reachable by a Private Link Service. [Learn more on about Private Link Service](/azure/private-link/private-link-service-overview)

---

## Step 1: [Optional if your load balancer doesn't have a Private Link Service Setup] Create a Private Link Service for your on-premises resource

To expose your on-premises or custom-hosted data source (like SQL Server) to Fabric, you must first create a **Private Link Service (PLS)** in Azure.

1. Sign in to the [Azure portal](https://portal.azure.com).
2. In the search bar, enter **Private Link Service** and select **Create**.
3. Specify:
   - **Subscription** and **Resource group**
   - **Region**
   - **Name** of your private link service
4. Under **Frontend IP configuration**, associate the load balancer that routes traffic to your on-premises or virtual machine.
5. Define **Auto-approval subscription IDs** to automatically approve connection requests from trusted Fabric tenants.

> [!TIP]
> If your data source is hosted on-premises, use Azure VPN Gateway or Azure ExpressRoute to connect your local network to Azure before configuring your PLS.

---

## Step 2: Create a Managed Private Endpoint using the Fabric REST API

Once your private link service is ready, create a Managed Private Endpoint (MPE) in Fabric by calling the **Managed Private Endpoints REST API**. The current supported endpoint shape uses the path:

`POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/managedPrivateEndpoints`

Use this when you are targeting either:
- A Private Link Service (use `targetPrivateLinkResourceId` + optionally `targetSubresourceType`), and/or
- One or more fully qualified domain names (`targetFQDNs`) you want Fabric to resolve privately after approval.

You can use any REST API client such as **Bruno**, **Insomnia**, or **Postman** to send the request.

### Step 2.1: Get an authentication token

Before calling the Fabric REST API, obtain a **Bearer token** using your Azure Active Directory (Entra ID) credentials.

You can do this using Azure CLI:

```bash
az login
az account get-access-token --resource https://api.fabric.microsoft.com
```

This command returns a JSON object containing the access token.
Copy the value of "accessToken" to use as your Authorization header.

### Step 2.2: Construct the API request
Use the following endpoint and payload structure to create a managed private endpoint. Adjust fields based on whether you are binding to a Private Link Service, providing FQDNs, or both.

Request

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/managedPrivateEndpoints
```
Headers

Key | Value
--- | ---
Authorization | Bearer <access_token>
Content-Type | application/json

Body (example targeting a Private Link Service + FQDN)

```json
{
   "name": "onprem-sql-endpoint",
   "targetPrivateLinkResourceId": "/subscriptions/<subId>/resourceGroups/<rg>/providers/Microsoft.Network/privateLinkServices/<plsName>",
   "targetSubresourceType": "sql", 
   "targetFQDNs": ["sqlserver.corp.contoso.com"],
   "requestMessage": "Private connection request from Fabric to on-premises SQL"
}
```
Body field reference:

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| name | Yes | string | <= 64 chars. Unique within workspace. |
| targetPrivateLinkResourceId | Yes* | string | Resource ID of Private Link Service or other supported private-link resource (*required unless only FQDN workflow is supported in future variants—consult current docs). |
| requestMessage | No | string | <= 140 chars. Shown to approver. |
| targetFQDNs | No | string[] | Up to 20 FQDNs to associate for private resolution. |
| targetSubresourceType | No | string | Sub-resource group (e.g., `sql`, `blob`, service-specific). |

Execution steps:
1. Open your REST client.
2. Set method to POST and paste the endpoint URL (replace `{workspaceId}`).
3. Add Authorization header with the bearer token from Step 2.1.
4. Paste the JSON body and adjust values.
5. Send the request.

### Step 2.3: Verify the connection request
An example (simplified) successful response payload may look like:

```json
{
   "id": "f2cbd8d1-23f1-4b9a-9db2-23ad1e7b5129",
   "name": "onprem-sql-endpoint",
   "targetPrivateLinkResourceId": "/subscriptions/<subId>/resourceGroups/<rg>/providers/Microsoft.Network/privateLinkServices/<plsName>",
   "targetFQDNs": ["sqlserver.corp.contoso.com"],
   "targetSubresourceType": "sql",
   "provisioningState": "PendingApproval",
   "createdBy": "user@contoso.com",
   "createdDateTime": "2025-10-14T10:12:37Z"
}
```
Field names can evolve; if a field you expect is missing, re-check the latest official documentation.
At this point, the private connection request has been sent to the target data source administrator (for example, the owner of your Private Link Service in Azure).
Once they approve the connection, the provisioning state updates to Approved, and you can begin accessing your on-premises data securely from Fabric.

> Example: Using Bruno or Insomnia
>
> You can also create and test the endpoint directly in **Bruno** or **Insomnia**:
>
> 1. Set the request type to **POST**.
> 2. Paste the **Fabric REST API endpoint**.
> 3. In **Auth**, select **Bearer Token**, and paste the token retrieved earlier.
> 4. In **Body**, paste the JSON payload.
> 5. Click **Send**.
>
> The API will respond with the managed private endpoint details and connection status.

After you send the request, Fabric will attempt to initiate a private connection.

Your network administrator will see this **pending connection request** in the Azure portal under:

**Private Link Service → Private endpoint connections** blade.



## Step 3: Approve the private endpoint connection request

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Navigate to your **Private Link Service** resource.
3. Select **Private endpoint connections** under the **Networking** section.
4. Review the pending connection request from Microsoft Fabric.
5. Choose **Approve** and provide an optional justification.

## Step 4: Access your on-premises SQL Server from Fabric notebooks

After approval, your managed private endpoint becomes active and can be used from Spark notebooks or Data Pipelines.

> Example using PySpark to connect to an on-premises SQL Server:
>
> ```python
> serverName = "sqlserver.corp.contoso.com"
> database = "SalesDB"
> dbPort = 1433
> dbUserName = "<username>"
> dbPassword = "<password or Key Vault reference>"
>
> jdbcURL = f"jdbc:sqlserver://{serverName}:{dbPort};database={database}"
> connectionProps = {
>     "user": dbUserName,
>     "password": dbPassword,
>     "driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver"
> }
>
> df = spark.read.jdbc(url=jdbcURL, table="dbo.Customers", properties=connectionProps)
> display(df)
>
> # Write back to your Fabric Lakehouse
> df.write.mode("overwrite").format("delta").saveAsTable("Customers")
> ```


## Step 5: Validate and troubleshoot your private connection

Once the connection is approved, it’s important to confirm that Fabric traffic flows privately and that no public endpoint is used.

### Verify the endpoint status in Fabric

1. In your Fabric workspace, navigate to **Settings → Network security**.  
2. Under **Managed private endpoints**, verify that the connection **Status** shows **Approved**.  
3. Select the endpoint name to view details such as:
   - **FQDN**
   - **Connection state**
   - **Approval date**
   - **Private link resource ID**

If the status shows **Pending** or **Failed**, check that:
- The Azure administrator has approved the request in the linked Private Link Service.  
- DNS resolution for the FQDN points to the private endpoint IP address.  
- The private link and Fabric region are within the same Azure geography.

### Validate DNS routing

Run the following command from a Fabric Notebook or a connected VM within the same virtual network:

```bash
nslookup sqlserver.corp.contoso.com
```

Confirm that the IP address returned is a 10.x.x.x or 172.x.x.x private IP, not a public IP.
This confirms that Fabric is resolving the FQDN through the private link route.

[!TIP]
If the DNS still resolves to a public IP, update your private DNS zone in Azure to include an A record for the FQDN that maps to the private endpoint.

### Common issues and resolutions

| **Issue** | **Possible cause** | **Resolution** |
|------------|--------------------|----------------|
| `ProvisioningState = Failed` | The on-premises administrator rejected or deleted the Private Link Service (PLS). | Re-create the Managed Private Endpoint (MPE) and verify that the PLS still exists and is reachable. |
| DNS resolves to a public IP address | The DNS zone isn't linked to the Fabric private DNS zone. | Add or link a private DNS zone to your workspace virtual network and create an **A record** for the FQDN pointing to the private IP. |
| Connection timeout from Spark or Data Pipelines | Network ACLs or firewalls are blocking the Fabric subnet. | Open required ports (for example, **1433** for SQL Server, **1521** for Oracle) and ensure outbound access to the Private Link endpoint is allowed. |
| Approval request not visible in Azure | The Private Link Service owner didn’t enable **“auto-approval”** or the Fabric tenant ID isn’t listed. | Ask the network admin to review pending connections under **Private Link Service → Private endpoint connections** in the Azure portal. |
| Endpoint deleted unexpectedly | The Fabric workspace or capacity was reassigned, or permissions changed. | Recreate the MPE and verify Fabric workspace ownership and network settings. |
| Data connection still failing after approval | DNS or routing mismatch between Azure and on-premises network. | Validate routing tables and use `nslookup` or `Test-NetConnection` to confirm the private IP path. |


To maintain secure and compliant access:

* Use **Azure Key Vault** for storing credentials and connection secrets instead of hardcoding passwords.
* Limit network exposure by approving only required endpoints in the Private Link Service.
* Monitor **Fabric audit logs** for endpoint creation, approval, or deletion activities.
* Enable **Customer-Managed Keys (CMK)** for encryption-at-rest when connecting from Spark workloads.
* Restrict outbound access using Fabric’s **Outbound Access Protection (OAP)** to ensure workloads can reach only approved private endpoints.
* Rotate credentials and review endpoint approvals periodically.


## End-to-end setup: Connecting Fabric to an on-premises SQL Server or any external data source

If you **don’t have a Private Link Service setup yet**, follow the steps below to build the entire topology — from the network layer to Fabric integration.

---

### Prerequisites

* **Azure subscription** — [Create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account).
* **Virtual Network (VNet)** — [Create a virtual network in the Azure portal](/azure/virtual-network/quick-create-portal)  
* **Connectivity between Azure and on-premises** — via [ExpressRoute](/azure/expressroute/expressroute-howto-linkvnet-portal-resource-manager) or [VPN Gateway](/azure/vpn-gateway/tutorial-site-to-site-portal)
  You can also simulate on-premises using a private subnet with Azure VMs and a Private Link Service.


---

## Alternative Option: Use Private Link Service Direct Connect (Preview)

If you already know the **destination IP address** of your on-premises or privately hosted resource, you can now use the new **Private Link Service Direct Connect** feature — currently in **public preview**.  
This feature allows you to connect your Private Link Service **directly to a privately routable IP address**, without requiring a load balancer or IP-forwarding virtual machine.

> [!NOTE]
> **Private Link Service Direct Connect** is currently in **Public Preview** and available in select regions.  
> Learn more in the [official Azure documentation](/azure/private-link/configure-private-link-service-direct-connect?tabs=powershell%2Cpowershell-pe%2Cverify-powershell%2Ccleanup-powershell).


## When to use Direct Connect

Use this option if:
- You already have a **static private IP address** for your data source (for example, `10.0.1.50` for an on-premises database or application).
- You don’t need load balancing or NAT forwarding in Azure.
- You want to simplify network topology and reduce latency.

Common scenarios include:
- Direct connection to on-premises databases or servers via ExpressRoute or VPN.
- Access to third-party SaaS or network appliances reachable through private IPs.
- Legacy applications that depend on IP-based routing instead of DNS.

## Key Benefits

| **Benefit** | **Description** |
|--------------|-----------------|
| **Simplified setup** | No need to create or maintain an internal load balancer or forwarding VMs. |
| **Lower latency** | Directly routes traffic to the destination IP without intermediate hops. |
| **Supports IP-based workloads** | Ideal for applications requiring static IP connections. |
| **Reduced Azure cost footprint** | Eliminates VM and load balancer costs for simple connectivity patterns. |

## Important Considerations

- Requires at least **2 IP configurations** (in multiples of 2) for high availability.
- Supports **static destination IP addresses only**.
- Source Private Endpoint, Private Link Service, and Fabric workspace must reside in the **same region** (cross-region is not yet supported).
- Available only in select regions during preview: *North Central US, East US 2, Central US, South Central US, West US, West US 2, West US 3, Southeast Asia, Australia East, Spain Central*.
- You must enable the feature flag `Microsoft.Network/AllowPrivateLinkserviceUDR` in your Azure subscription.

## Example: Creating a Private Link Service Direct Connect (PowerShell)

The example below creates a Private Link Service Direct Connect pointing directly to a destination IP address `10.0.1.100`.

```powershell
# Variables
$resourceGroupName = "rg-pls-directconnect"
$location = "westus"
$vnetName = "pls-vnet"
$subnetName = "pls-subnet"
$plsName = "pls-directconnect"
$destinationIP = "10.0.1.100"

# Create resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create VNet and subnet
$subnet = New-AzVirtualNetworkSubnetConfig -Name $subnetName -AddressPrefix "10.0.1.0/24" -PrivateLinkServiceNetworkPoliciesFlag "Disabled"
$vnet = New-AzVirtualNetwork -Name $vnetName -ResourceGroupName $resourceGroupName -Location $location -AddressPrefix "10.0.0.0/16" -Subnet $subnet

# Create IP configurations (minimum 2)
$subnet = Get-AzVirtualNetworkSubnetConfig -VirtualNetwork $vnet -Name $subnetName
$ipConfig1 = @{ Name = "ipconfig1"; PrivateIpAllocationMethod = "Dynamic"; Subnet = $subnet; Primary = $true }
$ipConfig2 = @{ Name = "ipconfig2"; PrivateIpAllocationMethod = "Dynamic"; Subnet = $subnet; Primary = $false }

# Create Private Link Service Direct Connect
New-AzPrivateLinkService `
    -Name $plsName `
    -ResourceGroupName $resourceGroupName `
    -Location $location `
    -IpConfiguration @($ipConfig1, $ipConfig2) `
    -DestinationIPAddress $destinationIP
```

Once created, you can **use this new Private Link Service ID** (`/subscriptions/.../providers/Microsoft.Network/privateLinkServices/pls-directconnect`)  
in your **Fabric Managed Private Endpoint** setup, as documented in **Step 2: Create a Managed Private Endpoint using the Fabric REST API** above.

> [!TIP]
> From Fabric’s perspective, the process is identical — you still create an MPE referencing the PLS resource ID,  
> but the underlying Azure resource now routes **directly to your destination IP** instead of through a load balancer.

## Comparison: Standard vs. Direct Connect

| **Aspect** | **Standard Private Link Service** | **Private Link Service Direct Connect (Preview)** |
|-------------|-----------------------------------|--------------------------------------------------|
| **Target type** | Load balancer frontend IP | Static private destination IP |
| **Typical use** | Applications or databases fronted by a load balancer or forwarder VMs | Databases or custom services with fixed IPs |
| **Setup complexity** | Requires Load Balancer + optional NAT forwarding | Simple: directly specify target IP |
| **Availability** | Generally available | Public Preview (limited regions) |
| **Fabric integration** | Supported | Supported via same MPE API flow |
| **Ideal for** | Multi-VM or high-availability services | Single-node private IP workloads |

**In summary:**  
If your environment already exposes a **static private IP address** that Fabric needs to reach, use **Private Link Service Direct Connect (Preview)** to simplify your setup and reduce networking overhead.  
Otherwise, follow the **standard Private Link Service + Load Balancer** pattern already covered in this documentation.


### Step 1: Create subnets for resources

| Subnet | Description |
|:--- |:--- |
| **be-subnet** | Backend subnet hosting IP forwarder VMs |
| **fe-subnet** | Frontend subnet for internal Load Balancer |
| **pls-subnet** | Subnet for hosting Private Link Service |


---

### Step 2: Create a Standard Internal Load Balancer

1. Go to **Create a resource > Networking > Load Balancer**.
2. Configure:
   - Type: **Internal**
   - SKU: **Standard**
   - Subnet: **fe-subnet**
   - IP assignment: **Dynamic**
3. Create backend pool, health probe (TCP 22 or 1433), and rule (TCP 1433 → 1433).


---

### Step 3: Create backend forwarding VMs

Create one or more lightweight Ubuntu VMs in `be-subnet`.
During creation, associate them with your Load Balancer backend pool (`myBackendPool`).

Once provisioned, enable IP forwarding and create NAT rules to your on-premises SQL Server IP (e.g., `10.0.0.47`) by following these steps:

1. Enable IP forwarding on the VM.
2. Create a DNAT rule to forward traffic from the load balancer on port **1433** to the on-premises SQL Server IP (e.g., **10.0.0.47**) on port **1433**.
3. Create a **MASQUERADE** rule for NAT.

You can execute the following commands on the VM:

```bash
sudo sysctl -w net.ipv4.ip_forward=1
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 1433 -j DNAT --to-destination 10.0.0.47:1433
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
```

> [!TIP]
> You can automate this using the [ip_fwd.sh](https://github.com/sajitsasi/az-ip-fwd/blob/main/ip_fwd.sh) helper script.

---

### Step 4: Create a Private Link Service (PLS)

1. Go to **Private Link Center → Create private link service**.
2. Under *Outbound settings*:
   - **Load balancer:** select your internal load balancer
   - **Frontend IP:** LoadBalancerFrontEnd
   - **Source NAT subnet:** `pls-subnet`
3. Leave defaults and select **Create**.

This service now exposes your internal SQL Server through a private link endpoint.

---

### Step 5: Connect Fabric using REST API

Once your Private Link Service is created and active, return to Step 2 in the above guide to create the **Managed Private Endpoint (MPE)** in Fabric.

---

### Step 6 – Create the Managed Private Endpoint

Use the REST API already documented in Step 2 of the main guide. In the JSON body, set `targetPrivateLinkResourceId` to the PLS resource ID and (optionally) include an FQDN in `targetFQDNs` that you’ll use in Spark code.

### Step 7 – Approve and test

Approve the pending connection in the PLS (Azure portal → Private endpoint connections). Then run a Spark JDBC read using the FQDN to confirm private connectivity.


## ARM Template Example (Optional)

Use the template below as a starting point to deploy your network components.

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "subscriptionId": { "type": "string", "defaultValue": "<subscriptionId>" },
    "resourceGroupName": { "type": "string", "defaultValue": "<resourceGroupName>" },
    "location": { "type": "string", "defaultValue": "eastus" },
    "vnetName": { "type": "string", "defaultValue": "fabric-onprem-vnet" }
  },
  "resources": [
    {
      "type": "Microsoft.Network/virtualNetworks",
      "apiVersion": "2023-09-01",
      "name": "[parameters('vnetName')]",
      "location": "[parameters('location')]",
      "properties": {
        "addressSpace": { "addressPrefixes": ["192.168.0.0/16"] },
        "subnets": [
          { "name": "be-subnet", "properties": { "addressPrefix": "192.168.1.0/24" } },
          { "name": "fe-subnet", "properties": { "addressPrefix": "192.168.2.0/24" } },
          { "name": "pls-subnet", "properties": { "addressPrefix": "192.168.3.0/24" } }
        ]
      }
    },
    {
      "type": "Microsoft.Network/loadBalancers",
      "apiVersion": "2023-09-01",
      "name": "myLoadBalancer",
      "location": "[parameters('location')]",
      "sku": { "name": "Standard" },
      "properties": {
        "frontendIPConfigurations": [
          {
            "name": "LoadBalancerFrontEnd",
            "properties": { "subnet": { "id": "[concat(resourceId('Microsoft.Network/virtualNetworks', parameters('vnetName')), '/subnets/fe-subnet')]" } }
          }
        ]
      }
    }
  ]
}
```

You can extend this template to include VM deployment and Private Link Service definitions.

### Common advanced pattern notes

| Consideration | Guidance |
|---------------|----------|
| Health probe port | Use a consistently reachable port (22 or a lightweight TCP listener) so LB sees backend healthy. |
| Windows Firewall | Ensure there there is no Windows Firewall blocking the ports where the traffic is being forwarded to | 
| NAT VM sizing | A small VM is usually enough; monitor if high concurrent sessions are expected. |
| High availability | For production, use multiple forwarder VMs in an availability set / zone with LB distributing. |
| Connectivity | Ensure your have established the connectivity between the IP fowarding VM and the data source using a name or the ip address. |
| Security | Restrict NSGs to only required inbound (1433 to forwarder) and management ports (22) from trusted ranges. |

## Learn more

* [About managed private endpoints in Fabric](./security-managed-private-endpoints-overview.md)
* [About private links in Fabric](./security-private-links-overview.md)
* [Overview of managed virtual networks in Fabric](./security-managed-vnets-fabric-overview.md)

