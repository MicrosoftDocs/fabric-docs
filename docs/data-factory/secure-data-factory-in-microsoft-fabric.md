---
title: Secure Your Data Factory in Microsoft Fabric Deployment
description: Learn how to secure Data Factory in Microsoft Fabric, with best practices for protecting your deployment.
author: msmbaldwin
ms.author: mbaldwin
ms.topic: best-practice
ms.custom: horz-security
ms.date: 08/13/2026
ai-usage: ai-assisted
---

# Secure your Data Factory in Microsoft Fabric deployment

Data Factory in Microsoft Fabric provides capabilities to ingest, prepare, and transform data from various sources. When deploying this service, it's important to follow security best practices to protect data, configurations, and infrastructure.

This article provides guidance on how to best secure your Data Factory in Microsoft Fabric deployment.

[!INCLUDE [Security horizontal Zero Trust statement](~/../reusable-content/ce-skilling/azure/includes/security/zero-trust-security-horizontal.md)]

## Network security

Data Factory in Microsoft Fabric requires secure network configurations to protect your data as it moves between various sources and destinations.

- **Configure on-premises data gateway**: Set up the on-premises data gateway to securely connect Data Factory to your on-premises data sources, enabling encrypted communication through firewalls without exposing your network. See [connect to on-premises data](how-to-access-on-premises-data.md) or the [on-premises data gateway documentation](/data-integration/gateway/service-gateway-install?toc=/fabric/data-factory/toc.json).

- **Implement VNet data gateway**: For Azure data sources behind private endpoints, use the VNet data gateway to securely connect without the overhead of managing gateway infrastructure. See [Virtual network data gateway](/data-integration/vnet/overview?toc=/fabric/data-factory/toc.json).

- **Implement service tags**: Use Azure service tags to enable secure connectivity to data sources in Azure virtual networks without configuring data gateways. Service tags simplify network security rule management while maintaining secure access. See [Service tags](/fabric/security/security-service-tags).

- **Configure private links for Fabric access**: Enable private links at the tenant level so traffic to your Fabric resources travels through Microsoft's private network backbone instead of the public internet. Private links add an extra layer of security for accessing your Data Factory. See [Private links for secure access to Fabric](/fabric/security/security-private-links-overview).

## Identity and access management

Properly managing identities and access controls is essential for securing your Data Factory deployment in Microsoft Fabric.

- **Implement workspace roles**: Assign appropriate workspace roles based on the principle of least privilege, ensuring users have only the permissions needed for their specific responsibilities. See [Workspace roles](/fabric/fundamentals/roles-workspaces).

- **Configure Microsoft Entra conditional access**: Set up conditional access policies to control access to your Data Factory resources based on identity, location, device compliance, and risk detection. Conditional access adds a security layer beyond standard authentication. See [Microsoft Entra conditional access](/fabric/security/security-conditional-access).

- **Enforce multifactor authentication**: Require multifactor authentication for all users who access Data Factory in Microsoft Fabric to block access through compromised credentials. See [plan a conditional access deployment](/entra/identity/conditional-access/plan-conditional-access).

- **Use workspace identities for trusted access**: Configure workspace identities to establish secure connections between Data Factory and its connections with firewall rules. Workspace identities enable access to firewall-protected data sources without compromising security. See [workspace identity overview](../security/workspace-identity.md) and [trusted workspace access](/fabric/security/security-trusted-workspace-access).

- **Manage data-source access**: After you add a cloud data source, review and restrict its access list so that only intended users can use the data source in items that include its data. See [Data source management](/fabric/data-factory/data-source-management#manage-users).

- **Separate workloads across workspaces**: Separate different workloads between workspaces and use roles like **Member** and **Viewer** to control access based on least privilege. For example, create a workspace for data engineering that prepares data and a separate workspace for reporting or AI training. By using the Viewer role, consumers can access data from the data engineering workspace without the ability to modify it. See [Roles in workspaces](../fundamentals/roles-workspaces.md).

## Data protection

Protecting data throughout its lifecycle in Data Factory is crucial for maintaining confidentiality and integrity.

- **Apply sensitivity labels**: Use Microsoft Purview Information Protection sensitivity labels to classify and protect sensitive data in your Data Factory items. See [Information protection labels](/fabric/governance/information-protection).

- **Secure credentials in Azure Key Vault**: Store data source credentials in Azure Key Vault instead of embedding them directly in connection strings or pipeline configurations. Azure Key Vault centralizes and secures sensitive connection information. See [Azure Key Vault reference](azure-key-vault-reference-configure.md).

## Logging and monitoring

Comprehensive logging and monitoring are essential for maintaining visibility into Data Factory operations and detecting potential security issues.

- **Configure audit logging**: Enable and regularly review audit logs to track user activities, including pipeline creation, modification, and execution. Audit logs give you visibility into who accesses your Data Factory resources and what they change. See [Track user activities](/fabric/admin/track-user-activities) and [Manage audit log retention policies](/purview/audit-log-retention-policies).

- **Monitor pipeline executions**: Use the Monitoring hub to track pipeline executions, confirm data flows work as expected, and identify failures or security anomalies that might indicate compromise. See [Monitor pipeline runs](/fabric/data-factory/monitor-pipeline-runs).

- **Set up notifications**: Send notifications from your pipelines through Outlook or Teams activities to inform stakeholders of critical events, such as pipeline failures. See [Outlook activity](/fabric/data-factory/outlook-activity) and [Teams activity](/fabric/data-factory/teams-activity).

## Compliance and governance

Ensuring compliance and proper governance for your Data Factory deployment helps maintain security and meet regulatory requirements.

- **Govern your items with the OneLake catalog**: Use the Govern tab in the OneLake catalog to assess governance status, sensitivity label coverage, and endorsement across your Data Factory items, so you can identify unprotected or noncompliant content. See [Govern your Fabric data with the OneLake catalog](/fabric/governance/onelake-catalog-govern).

- **Use content endorsement**: Implement content endorsement to clearly identify trusted and validated Data Factory items, reducing the risk of using unofficial or unsecured resources. See [Content endorsement](/fabric/governance/endorsement-overview).

- **Implement data lineage tracking**: Enable data lineage tracking to understand data flows and dependencies across your Data Factory pipelines, aiding in impact analysis and compliance verification. See [Data lineage](/fabric/governance/lineage).

## Backup and recovery

Back up your pipeline definitions and plan for recovery to maintain business continuity and data availability.

- **Integrate Git to manage pipeline and dataflow development**: Use Git source control to track changes to your pipeline JSON definitions and collaborate with others in a centralized repository. See [Git integration with Data Factory pipelines](cicd-pipelines.md#git-integration-with-data-factory-pipelines) and [Git integration with Dataflow Gen2](dataflow-gen2-cicd-and-git-integration.md).

- **Plan for disaster recovery**: Develop and test disaster recovery procedures specific to your Data Factory deployment, and review Fabric's platform resilience so you can set realistic recovery expectations. See [Experience-specific disaster recovery guidance](/fabric/security/experience-specific-guidance#data-factory) and [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric).

## Related content

- [Security in Microsoft Fabric](/fabric/security/security-overview)
- [Microsoft Fabric end-to-end security scenario](/fabric/security/security-scenario)
- [Data Factory in Microsoft Fabric](/fabric/data-factory/data-factory-overview)