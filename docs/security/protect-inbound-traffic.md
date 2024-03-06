---
title: Protect inbound traffic
description: Understand the difference between private links and Microsoft Entra Conditional and decide which is best for your organization.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
ms.date: 03/04/2024
---

# Protect inbound traffic

Inbound traffic is traffic coming into Fabric from the internet. This article explains the differences between the two ways to protect inbound traffic in Microsoft Fabric. Use this article to decide which method is best for your organization.

* **Entra Conditional Access** - When a user authenticates access is determined based on a set of policies that might include IP address, location, and managed devices.

* **Private links** - Fabric uses a private IP address from your virtual network. The endpoint allows users in your network to communicate with Fabric over the private IP address using private links.

Once traffic enters Fabric, it gets authenticated by Microsoft Entra ID, which is the same authentication method used by Microsoft 365, OneDrive, and Dynamics 365. Entra ID authentication allows users to securely connect to cloud applications from any device and any network, whether they’re at home, remote, or in their corporate office.

The Fabric backend platform is protected by a virtual network and isn't directly accessible from the public internet other than through secure endpoints. To understand how traffic is protected in Fabric, review Fabric's [Architectural diagram](security-fundamentals.md#architectural-diagram).

By default, Fabric communicates between [experiences](../get-started/microsoft-fabric-overview.md#components-of-microsoft-fabric) using the internal Microsoft backbone network. When a Power BI report loads data from [OneLake](../onelake/onelake-overview.md), the data goes through the internal Microsoft network. This configuration is different from having to set up multiple Platform as a Service (PaaS) services to connect to each other over a private network. Inbound communication between clients such as your browser or SQL Server Management Studio (SSMS) and Fabric, uses the TLS 1.2 protocol and negotiates to TLS 1.3 when possible.

Fabric's default security settings include:

* [Entra ID](/entra/fundamentals/whatis) which is used to authenticate every request.

* Upon successful authentication, requests are routed to the appropriate backend service through secure Microsoft managed endpoints.

* Internal traffic between experiences in Fabric is routed over the Microsoft backbone.

* Traffic between clients and Fabric is encrypted using at least the Transport Layer Security (TLS) 1.2 protocol.

## Entra Conditional Access

Every interaction with Fabric is authenticated with Entra ID. Entra ID is based upon the [Zero Trust](/azure/security/fundamentals/zero-trust) security model, which assumes that you're not fully protected within your organization's network perimeter. Instead of looking at your network as a security boundary, Zero Trust looks at identity as the primary perimeter for security.

To determine access at the time of authentication you can define and enforce [conditional access policies](/entra/identity/conditional-access/overview) based on your users' identity, device context, location, network, and application sensitivity. For example, you can require multifactor authentication, device compliance, or approved apps for accessing your data and resources in Fabric. You can also block or limit access from risky locations, devices, or networks.

Conditional access policies help you protect your data and applications without compromising user productivity and experience. Here are a few examples of access restrictions you can enforce using conditional access.

* Define a list of IPs for inbound connectivity to Fabric.

* Use Multifactor Authentication (MFA).

* Restrict traffic based on parameters such as country of origin or device type.

Fabric doesn't support other authentication methods such as account keys or SQL authentication, which rely on usernames and passwords.

### Configure conditional access

To [configure conditional access in Fabric](security-conditional-access.md#configure-conditional-access-for-fabric), you need to select several Fabric related Azure services such as Power BI, Azure Data Explorer, Azure SQL Database, and Azure Storage.

>[!NOTE]
>This can be considered too broad for some customers as any policy will be applied to Fabric and these related Azure services.

### Licensing

Conditional access requires Microsoft Entra ID P1 licenses. Often these licenses are already available in your organization because they're shared with other Microsoft products such as Microsoft 365. To find the right license for your requirements, see [License requirements](/entra/identity/conditional-access/overview#license-requirements).

### Trusted access

Fabric doesn't need to reside in your private network, even when you have your data stored inside one. With PaaS services, it's common to put the compute in the same private network as the storage account. However, with Fabric this isn't needed. To enable trusted access into Fabric, you can use features such as [on-premise Data gateways](/power-bi/connect-data/service-gateway-onprem), [Trusted workspace access](security-trusted-workspace-access.md) and [managed private endpoints](/azure/private-link/manage-private-endpoint). For more information, see [Security in Microsoft Fabric](security-overview.md).

## Private links

With private endpoints your service is assigned a private IP address from your virtual network. The endpoint allows other resources in the network to communicate with the service over the private IP address.

Using Private links, a tunnel from the service into one of your subnets creates a private channel. Communication from external devices travels from their IP address, to a private endpoint in that subnet, through the tunnel and into the service.

When implementing private links, Fabric is no longer accessible through the public internet. To access Fabric, all users have to connect through the private network. The private network is required for all communications with Fabric, including viewing a Power BI report in the browser and using SQL Server Management Studio (SSMS) to connect to an SQL endpoint.

### On-premises networks

If you're using on-premises networks, you can extend them to the Azure Virtual Network (VNet) using an ExpressRoute circuit, or a site-to-site VPN, to access Fabric using private connections.

### Bandwidth

With private links, all traffic to Fabric travels through the private endpoint, causing potential bandwidth issues. Users are no longer able to load global distributed nondata related resources such as images .css and .html files used by Fabric, from their region. These resources are loaded from the location of the private endpoint. For example, for Australian users with a US private endpoint, traffic travels to the US first. This increases load times and might reduce performance.

### Cost

The [cost of private links](https://azure.microsoft.com/pricing/details/private-link/) and the increase of the [ExpressRoute](/azure/expressroute/expressroute-introduction) bandwidth to allow private connectivity from your network, might add costs to your organization.

### Considerations and limitations

With private links you're closing off Fabric to the public internet. As a result, there are many [considerations and limitations](security-private-links-overview.md#other-considerations-and-limitations) you need to take into account.

## Related content

* [Private links for secure access to Fabric](security-private-links-overview.md)

* [Conditional access in Fabric](security-conditional-access.md)
