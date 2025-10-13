---
title: Connect on-premises data sources to Microsoft Fabric using managed private endpoints
description: Learn how to securely connect on-premises or custom-hosted data sources to Microsoft Fabric using managed private endpoints and private link services.
author: saravi
ms.author: saravi
ms.topic: how-to
ms.custom: sfi-image-nochange, sfi-ropc-nochange
ms.date: 10/07/2025
---

# Connect on-premises data sources to Microsoft Fabric using managed private endpoints

With managed private endpoints, you can securely connect Microsoft Fabric workloads such as Spark or Data Pipelines to your **on-premises** or **custom-hosted data sources** through an approved private link setup.  
This approach ensures that traffic flows through the Microsoft backbone network instead of the public internet — maintaining end-to-end data privacy and compliance.

Common use cases include accessing:
- SQL Server or Oracle databases hosted in on-premise environments.
- Custom APIs or services hosted in virtual networks or self-managed data centers.
- Secure corporate data stores without exposing public endpoints.

---

## Overview

Fabric Managed Private Endpoints (MPEs) allow Fabric to establish **outbound** connections to approved data sources using **Private Link Services (PLS)**.  
The setup involves three main steps:

1. The on-premises administrator exposes the data source through a **Private Link Service (PLS)** or Azure Private Endpoint-enabled resource.
2. A Fabric workspace admin creates a **Managed Private Endpoint (MPE)** referencing the fully qualified domain name (FQDN) or Azure resource ID.
3. The on-premises network admin reviews and approves the connection request in Azure.

Once approved, all Fabric workloads (like Spark, Notebooks, or Data Pipelines) can securely connect to the approved resource.

---

## Prerequisites

Before you begin:

- A Microsoft Fabric workspace with admin permissions.
- The Azure subscription must have the **Microsoft.Network** resource provider registered.
- The on-premises resource must be reachable via a Private Link Service endpoint or through a connected Azure Virtual Network.
- Ensure DNS resolution for your data source FQDN is configured to route via the private endpoint.

---

## Step 1: Create a Private Link Service for your on-premises resource

To expose your on-premises or custom-hosted data source (like SQL Server) to Fabric, you must first create a **Private Link Service (PLS)** in Azure.

1. Sign in to the [Azure portal](https://portal.azure.com).
2. In the search bar, enter **Private Link Service** and select **Create**.
3. Specify:
   - **Subscription** and **Resource group**
   - **Region**
   - **Name** of your private link service
4. Under **Frontend IP configuration**, associate the load balancer that routes traffic to your on-premises or virtual machine.
5. Define **Auto-approval subscription IDs** if you want to automatically approve connection requests from trusted Fabric tenants.

> [!TIP]
> If your data source is hosted on-premises, use Azure VPN Gateway or Azure ExpressRoute to connect your local network to Azure before configuring your PLS.

---

## Step 2: Create a Managed Private Endpoint using the Fabric REST API

Once your private link service is ready, you can configure Fabric to connect to your on-premises resource using a Fully Qualified Domain Name (FQDN) by invoking the **Fabric REST API**.

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

Step 2.2: Construct the API request
Use the following endpoint and payload to create a managed private endpoint:

Request

```bash
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/network/privateEndpoints
```
Headers

Key	Value
Authorization	Bearer <access_token>
Content-Type	application/json

Body

```json
{
  "name": "onprem-sql-endpoint",
  "type": "CustomFQDN",
  "fqdn": "sqlserver.corp.contoso.com",
  "description": "Private connection to on-prem SQL via Azure Private Link Service"
}
```
You can test this call directly from Bruno, Postman, or Insomnia:

Open your preferred REST API client.

Create a new POST request.

Paste the endpoint URL, replacing {workspaceId} with your Fabric workspace ID.

Add the headers and JSON body shown above.

Send the request.

Step 2.3: Verify the connection request
A successful API response returns the following JSON:

```json
{
  "id": "f2cbd8d1-23f1-4b9a-9db2-23ad1e7b5129",
  "name": "onprem-sql-endpoint",
  "type": "CustomFQDN",
  "fqdn": "sqlserver.corp.contoso.com",
  "provisioningState": "PendingApproval",
  "createdBy": "user@contoso.com"
}
```
At this point, the private connection request has been sent to the target data source administrator (for example, the owner of your Private Link Service in Azure).
Once they approve the connection, the provisioning state updates to Approved, and you can begin accessing your on-premises data securely from Fabric.

Example: Using Bruno or Insomnia
You can also create and test the endpoint directly in Bruno or Insomnia:

Set the Request type to POST.

Paste the Fabric REST API endpoint.

In Auth, select Bearer Token, and paste the token retrieved earlier.

In Body, paste the JSON payload.

Click Send.

The API will respond with the managed private endpoint details and connection status.

Fabric will attempt to initiate a private connection request.  
Your network administrator will see this pending request in the Azure portal under the associated **Private Link Service → Private endpoint connections** blade.



## Step 3: Approve the private endpoint connection request

1. Sign in to the [Azure portal](https://portal.azure.com).
2. Navigate to your **Private Link Service** resource.
3. Select **Private endpoint connections** under the **Networking** section.
4. Review the pending connection request from Microsoft Fabric.
5. Choose **Approve** and provide an optional justification.

   :::image type="content" source="./media/security-managed-private-endpoints-onpremise/private-endpoint-approval.png" alt-text="Screenshot showing approval of a private endpoint request in Azure portal.":::

Once approved, the connection status in Fabric changes to **Approved**. You can now securely connect to your on-premises data source.



## Step 4: Access your on-premises SQL Server from Fabric notebooks

After approval, your managed private endpoint becomes active and can be used from Spark notebooks or Data Pipelines.

Example using PySpark to connect to an on-premises SQL Server:

```python
serverName = "sqlserver.corp.contoso.com"
database = "SalesDB"
dbPort = 1433
dbUserName = "<username>"
dbPassword = "<password or Key Vault reference>"

jdbcURL = f"jdbc:sqlserver://{serverName}:{dbPort};database={database}"
connectionProps = {
    "user": dbUserName,
    "password": dbPassword,
    "driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver"
}

df = spark.read.jdbc(url=jdbcURL, table="dbo.Customers", properties=connectionProps)
display(df)

# Write back to your Fabric Lakehouse
df.write.mode("overwrite").format("delta").saveAsTable("Customers")
```



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

Use Azure Key Vault for storing credentials and connection secrets instead of hardcoding passwords.

Limit network exposure by approving only required endpoints in the Private Link Service.

Monitor Fabric audit logs for endpoint creation, approval, or deletion activities.

Enable Customer-Managed Keys (CMK) for encryption-at-rest when connecting from Spark workloads.

Restrict outbound access using Fabric’s Outbound Access Protection (OAP) to ensure workloads can reach only approved private endpoints.

Rotate credentials and review endpoint approvals periodically.

[!NOTE]
When a managed private endpoint is deleted in Fabric, the connection entry remains visible in Azure until manually cleaned up by the network administrator.

---

## Learn more

- [Managed private endpoints in Microsoft Fabric](https://learn.microsoft.com/fabric/security/managed-private-endpoints-overview)  
- [Create a Private Link Service in Azure](https://learn.microsoft.com/azure/private-link/private-link-service-overview)  
- [Azure Private Endpoint DNS configuration](https://learn.microsoft.com/azure/private-link/private-endpoint-dns)  
- [Outbound Access Protection (OAP) for Fabric Data Engineering](https://learn.microsoft.com/fabric/security/outbound-access-protection-overview)  
- [Use Azure Key Vault with Fabric Spark notebooks](https://learn.microsoft.com/fabric/data-engineering/use-key-vault-secrets)  
- [Customer-Managed Keys (CMK) for Fabric Data Engineering](https://learn.microsoft.com/fabric/security/customer-managed-keys-overview)

