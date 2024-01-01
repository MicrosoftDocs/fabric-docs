---
title: Security in Microsoft Fabric
description: Learn how Microsoft Fabric security works, and what features are available.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 12/15/2023
---

# Security in Microsoft Fabric

[!INCLUDE [fabric-overview](../includes/fabric-overview.md)]

As a SaaS service, Fabric offers comprehensive security for the entire platform. It removes the cost and responsibility of maintaining your security solution, and transfers it to the cloud. With Fabric, you can leverage the expertise and resources of Microsoft to keep your data secure, patch vulnerabilities, monitor threats, and comply with regulations. Fabric also allows you to manage and control your security settings, in line with your changing needs and demands.

Fabric security is:

* Continues - Fabric security is always on. Because it's embedded in the cloud, it doesn't rely on a team of experts to keep it running.

* Configurable - You can configure Fabric security in accordance with your solution and organizational policies.

* Automated - Many of the Fabric security features are automated. Once configures, these features continue to work in the background.

* Getting better - Microsoft is constantly improving its Fabric security, by adding new features and controls.

## Authenticate

Every interaction with Fabric, including logging in, using the Power BI mobile app, running SQL queries through SQL Server Management Studio (SSMS), is authenticated using [Entra ID](/entra/verified-id/decentralized-identifier-overview).

With Entra ID you can set up a [Zero Trust](/security/zero-trust/zero-trust-overview) security solution for Fabric. Zero Trust assumes that you're not safe within the compound of your organization's network security. The Zero trust approach believes that your organization is constantly under attack, and that you face continues security breach threat. To combat this on-going threat, Fabric enforces the use of Entra ID authentication. Users can't use other authentication means such as account keys, shared access signatures (SAS), SQL authentication (usernames and passwords).

Entra ID provides Fabric with [Conditional Access](/entra/identity/conditional-access/overview) which allows you to secure access to your data. Here are a few examples of access restrictions you can enforce using Conditional Access.

* Define a list of IPs for inbound connectivity to Fabric.

* Use Multi-Factor Authentication (MFA).

* Restrict traffic based on parameters such as country of origin or device type. 

## Secure data

Fabric allows different people in your organization to consume data when and where they need it. An executive might look at a Power BI report on her mobile in a convention that's taking place in a foreign country. A data engineer can connect to a remote server from home. And a 

### Recover information

Data resiliency/disaster recovery

### Manage networks

How data moves

### Import and export

Your organization might store data in other locations that are not part of the Fabric platform. Fabric allows several ways to securely connect to data, for import and export purposes.

* [Service Tags](security-service-tags.md) - Use to ingest data without the use of data gateways, from data sources deployed in an Azure VNet, such as Azure SQL Virtual Machines (VMs), Azure SQL Managed Instance (MI) and EST APIs. You can also use service tags to get traffic from a virtual network or an Azure firewall. For example, service tags can allow outbound traffic to Fabric so that a user on a VM can connect to Fabric SQL endpoints from SSMS, while blocked from accessing other public internet resources.

## Capabilities

Review this section for a list of some of the security features available in Microsoft Fabric.

| Capability |Description |
|------------|------------|
| [Conditional access](security-conditional-access.md)  | Secure your apps by using Microsoft Entra ID |
| [Lockbox](security-lockbox.md)  | Control how Microsoft engineers access your data                   |
| [OneLake security](../onelake/onelake-security.md) | Learn how to secure your data in OneLake. |
| [Resiliency](az-resiliency.md) | Reliability and regional resiliency with Azure availability zones   |
| [Service tags](security-service-tags.md) | Enable an Azure SQL Managed Instance (MI) to allow incoming connections from Microsoft Fabric |

RLS and OLS

Permissions (workspace, item, roles)

Multi tenancy

## Related content

* [Security fundamentals](../security/security-fundamentals.md)

* [Admin overview](../admin/admin-overview.md)

* [Governance and compliance overview](../governance/governance-compliance-overview.md)

* [Microsoft Fabric licenses](../enterprise/licenses.md)












Security and reliability are key foundational features for every organization. In Microsoft Fabric, as you bring your data to the cloud and use it with various analytics experiences such as Power BI, Data Factory, and the next generation of Synapse,  Microsoft ensures that built-in security and reliability features secure your data at rest and transit. Microsoft also makes sure that your data is recoverable in cases of infrastructure failures or disasters. For more information on Fabric platform security, review [Microsoft Fabric security fundamentals](security-fundamentals.md).

## Security features


