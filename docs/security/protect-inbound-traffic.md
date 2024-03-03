---
title: Protect inbound traffic
description: Understand the difference between private links and Microsoft Entra Conditional and decide which is best for your organization.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
ms.date: 03/03/2024
---

# Protect inbound traffic

Inbound traffic is traffic coming into Fabric from the internet. This article explains the differences between the two ways to protect inbound traffic in Microsoft Fabric. Use this article to decide which method is best for your organization.

* **Entra ID Conditional Access** - When a user authenticates access is granted based on a set of policies that might include IP address, location, and managed devices.

* **Private links** - Fabric uses a private IP address from your virtual network. The endpoint allows users in your network to communicate with Fabric over the private IP address using private links.

Once traffic enters Fabric, it's secure. The Fabric backend platform is protected behind virtual networks and isn't directly accessible from the public internet other than through secure endpoints. To understand how traffic is protected in Fabric, review Fabric's [Architectural diagram](security-fundamentals.md#architectural-diagram).

Fabric's default security settings include:

* [Entra ID](/entra/fundamentals/whatis).

* Request are routed to the appropriate backend service through secure endpoints, after being authenticated by Entra ID.

* Internal traffic in Fabric is secure.

* Fabric encrypts traffic using the Transport Layer Security (TLS) 1.2 protocol

## Microsoft Entra ID Conditional Access

Fabric, like Microsoft 365, OneDrive and Dynamics 365 uses Microsoft [Entra ID](/entra/fundamentals/whatis) as its authentication provider. Entra ID allows users to securely connect to cloud applications from any device and any network, whether they’re at home, remote, or in their corporate office.

Every interaction with Fabric is authenticated with Entra ID. Entra ID uses the [Zero Trust](/azure/security/fundamentals/zero-trust) security model, which assumes that you're not fully protected within your organization's network perimeter. Instead of looking at your network as a security boundary, Zero Trust looks at identity as the primary perimeter for security.

Fabric uses Microsoft Entra ID, allowing you to define and enforce [conditional access policies](/entra/identity/conditional-access/overview) based on your users identity, device context, location, network, and application sensitivity. For example, you can require multifactor authentication, device compliance, or approved apps for accessing your data and resources in Fabric. You can also block or limit access from risky locations, devices, or networks.

Conditional access policies help you protect your data and applications without compromising user productivity and experience. Here are a few examples of access restrictions you can enforce using conditional access.

* Define a list of IPs for inbound connectivity to Fabric.

* Use Multifactor Authentication (MFA).

* Restrict traffic based on parameters such as country of origin or device type.

Fabric doesn't support other authentication methods such as account keys or SQL authentication, which relies on usernames and passwords.

### Configure conditional access

To [configure conditional access in Fabric](security-conditional-access.md#configure-conditional-access-for-fabric), you need to select several Fabric related Azure services such as Power BI Service, Azure Data Explorer, Azure SQL Database, and Azure Storage.

### Licensing

Conditional access requires Microsoft Entra ID P1 licenses. Often these licenses are already available in your organization because they're shared with other Microsoft products such as Office. To find the right license for your requirements, see [License requirements](/entra/identity/conditional-access/overview#license-requirements).

## Private links

With private endpoints your service is assigned a private IP address from your virtual network. The endpoint allows other resources in the network to communicate with the service over the private IP address.

Using Private links, a tunnel from the service into one of your subnets creates a private channel. Communication from external devices, travels from their IP address, to a private endpoint in that subnet, through the tunnel and into the service.

When implementing private links, Fabric is no longer accessible through the public internet. To access Fabric, users have to connect through the private network. The private network is required for all communications with Fabric, including viewing a Power BI report in the browser and using SQL Server Management Studio (SSMS) to connect to an SQL endpoint.

### On-premises networks

If you're using on-premises networks, you can extend them to the Azure Virtual Network (VNet) using an ExpressRoute circuit, or a site-to-site VPN, to access Fabric using private connections.

### Bandwidth

With private links, all traffic to Fabric travels through the private endpoint, causing potential bandwidth issues. For example, for Australian users with a US private endpoint, traffic travels to the US first. This increases load times and might reduce performance.

### Price

The [cost of private links](https://azure.microsoft.com/pricing/details/private-link/) and the increase of the [ExpressRoute](/azure/expressroute/expressroute-introduction) bandwidth when using on-premises networks, might add costs to your organization.

### Unsupported features

These Fabric features aren't supported when using private endpoints.

* On Premises Data gateways

* Export to PDF.

* Global distributed nondata related resources such as images, .css  and .html files can't be accessed through private endpoints.

## Related content

* [Private links for secure access to Fabric](security-private-links-overview.md)

* [Conditional access in Fabric](security-conditional-access.md)
