---
title: Secure your Data Factory in Microsoft Fabric deployment
description: Learn how to secure Data Factory in Microsoft Fabric, with best practices for protecting your deployment.
author: whhender
ms.author: whhender
ms.topic: concept-article
ms.custom: horz-security
ms.date: 08/12/2025
ai-usage: ai-assisted
---

# Secure your Data Factory in Microsoft Fabric deployment

Data Factory in Microsoft Fabric provides capabilities to ingest, prepare, and transform data from various sources. When deploying this service, it's important to follow security best practices to protect data, configurations, and infrastructure.

This article provides guidance on how to best secure your Data Factory in Microsoft Fabric deployment.

## Network security

Data Factory in Microsoft Fabric requires secure network configurations to protect your data as it moves between various sources and destinations.

- **Configure on-premises data gateway**: Set up the on-premises data gateway to securely connect Data Factory to your on-premises data sources, enabling encrypted communication through firewalls without exposing your network. See [connect to on-premises data](how-to-access-on-premises-data.md) or the [on-premises data gateway documentation](/data-integration/gateway/service-gateway-install?toc=/fabric/data-factory/toc.json).

- **Implement VNet data gateway**: For Azure data sources behind private endpoints, use the VNet data gateway to securely connect without the overhead of managing gateway infrastructure. See [Virtual network data gateway](/data-integration/vnet/overview?toc=/fabric/data-factory/toc.json).

- **Use managed private endpoints**: Create managed private endpoints in your Fabric workspace to securely connect to Azure data sources that have public network access disabled. This eliminates exposure to the public internet when accessing protected resources. See [Managed private endpoints](/fabric/security/security-managed-private-endpoints-overview).

- **Implement service tags**: Use Azure service tags to enable secure connectivity to data sources in Azure virtual networks without configuring data gateways. This simplifies network security rule management while maintaining secure access. See [Service tags](/fabric/security/security-service-tags).

- **Configure private links for Fabric access**: Enable private links at the tenant level to ensure traffic to your Fabric resources travels through Microsoft's private network backbone instead of the public internet. This provides an extra layer of security for accessing your Data Factory. See [Private links for secure access to Fabric](/fabric/security/security-private-links-overview).

## Identity and access management

Properly managing identities and access controls is essential for securing your Data Factory deployment in Microsoft Fabric.

- **Implement workspace roles**: Assign appropriate workspace roles based on the principle of least privilege, ensuring users have only the permissions needed for their specific responsibilities. See [Workspace roles](/fabric/fundamentals/roles-workspaces).

- **Configure Microsoft Entra conditional access**: Set up conditional access policies to control access to your Data Factory resources based on identity, location, device compliance, and risk detection. This adds an extra security layer beyond standard authentication. See [Microsoft Entra conditional access](/fabric/security/security-conditional-access).

- **Enforce multi-factor authentication**: Require multifactor authentication for all users accessing Data Factory in Microsoft Fabric to prevent unauthorized access through compromised credentials. See [Microsoft Entra conditional access](/fabric/security/security-conditional-access).

- **Use workspace identities for trusted access**: Configure workspace identities to establish secure connections between Data Factory and Azure storage resources with firewall rules. This enables access to firewall-protected data sources without compromising security. See [Trusted workspace access](/fabric/security/security-trusted-workspace-access).

- **Implement row-level security**: Apply row-level security to control data access at a granular level when exposing data through DirectLake datasets, ensuring users can only view data relevant to their role. See [Row-level security](/fabric/security/service-admin-row-level-security).

## Data protection

Protecting data throughout its lifecycle in Data Factory is crucial for maintaining confidentiality and integrity.

- **Enable encryption in transit**: Ensure all data transfers between Data Factory and data sources use secure communication channels with TLS 1.2 or higher, preventing interception of sensitive data. See [Security in Microsoft Fabric](/fabric/security/security-overview).

- **Apply sensitivity labels**: Use Microsoft Purview Information Protection sensitivity labels to classify and protect sensitive data as it flows through Data Factory pipelines. These labels persist with the data even when exported to supported formats. See [Information protection labels](/fabric/governance/information-protection).

- **Configure data loss prevention**: Implement data loss prevention policies to identify, monitor, and protect sensitive data in your Data Factory pipelines. This helps prevent inadvertent sharing or exfiltration of sensitive information. See [Data loss prevention](/purview/dlp-powerbi-get-started).

- **Secure credentials in Azure Key Vault**: Store data source credentials in Azure Key Vault instead of embedding them directly in connection strings or pipeline configurations. This centralizes and secures sensitive connection information. See [Microsoft Purview integration](/fabric/governance/use-microsoft-purview-hub).

- **Implement column-level security**: Apply column-level security when exposing data through datasets to restrict access to sensitive columns based on user roles and permissions. See [Column-level security](/fabric/data-warehouse/column-level-security).

## Logging and monitoring

Comprehensive logging and monitoring are essential for maintaining visibility into Data Factory operations and detecting potential security issues.

- **Configure audit logging**: Enable and regularly review audit logs to track user activities, including pipeline creation, modification, and execution. This provides visibility into who is accessing your Data Factory resources and what changes are being made. See [Track user activities](/fabric/admin/track-user-activities).

- **Monitor pipeline executions**: Use the Monitoring hub to track pipeline executions, ensuring data flows are working as expected and identifying any failures or security anomalies that might indicate compromise. See [Monitor data pipeline runs](/fabric/data-factory/monitor-pipeline-runs).

- **Set up alerting for suspicious activities**: Configure alerts for unusual patterns or unauthorized access attempts to quickly identify and respond to potential security threats in your Data Factory environment. See [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app).

- **Enable diagnostic logging**: Capture detailed diagnostic logs for Data Factory operations to provide in-depth information for troubleshooting issues and investigating security incidents. See [Operation list](/fabric/admin/operation-list).

- **Implement log retention policies**: Configure log retention policies according to your organization's compliance requirements and security needs to ensure historical data is available for security analysis and auditing. See [Manage audit log retention policies](/purview/audit-log-retention-policies).

## Compliance and governance

Ensuring compliance and proper governance for your Data Factory deployment helps maintain security and meet regulatory requirements.

- **Implement information protection**: Use Microsoft Purview Information Protection to classify, label, and protect sensitive data as it moves through your Data Factory pipelines. This ensures data is handled according to its sensitivity level. See [Information protection labels](/fabric/governance/information-protection).

- **Integrate with Microsoft Defender for Cloud Apps**: Configure integration with Microsoft Defender for Cloud Apps to gain enhanced visibility and control over Data Factory operations, helping detect and respond to threats. See [Microsoft Defender for Cloud Apps controls](/fabric/governance/service-security-using-defender-for-cloud-apps-controls).

- **Use content endorsement**: Implement content endorsement to clearly identify trusted and validated Data Factory artifacts, reducing the risk of using unofficial or unsecured resources. See [Content endorsement](/fabric/governance/endorsement-overview).

- **Monitor regulatory compliance**: Regularly assess your Data Factory deployment against relevant compliance standards and implement required controls to maintain compliance. See [Governance and compliance in Microsoft Fabric](/fabric/governance/governance-compliance-overview).

- **Implement data lineage tracking**: Enable data lineage tracking to understand data flows and dependencies across your Data Factory pipelines, aiding in impact analysis and compliance verification. See [Data lineage](/fabric/governance/lineage).

## Backup and recovery

Implementing robust backup and recovery procedures ensures business continuity and data availability.

- **Document pipeline configurations**: Maintain documentation of your Data Factory pipeline configurations to enable quick reconstruction if there's a disaster or significant issues. See [What is Data Factory in Microsoft Fabric?](/fabric/data-factory/data-factory-overview).

- **Implement version control for pipelines**: Use source control for Data Factory pipeline definitions to track changes and enable rollback to previous versions if necessary. See [Data Factory in Microsoft Fabric FAQ](/fabric/data-factory/frequently-asked-questions).

- **Verify data resilience**: Understand Microsoft Fabric's data resilience capabilities to ensure your data remains available during service disruptions. See [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric).

- **Plan for disaster recovery**: Develop and test disaster recovery procedures specific to your Data Factory deployment to minimize downtime and data loss if there's a significant outage. See [Security in Microsoft Fabric](/fabric/security/security-overview).

- **Monitor capacity metrics**: Use the Microsoft Fabric Capacity Metrics app to track resource utilization and ensure sufficient capacity for recovery operations. See [Microsoft Fabric Capacity Metrics app](/fabric/enterprise/metrics-app).

## Service-specific security

Data Factory in Microsoft Fabric has unique security considerations related to its data integration and transformation capabilities.

- **Use Trusted workspace access**: Configure Trusted workspace access to securely connect to firewall-enabled Azure Data Lake Storage Gen2 accounts using workspace identities, ensuring secure data access without compromising security controls. See [Trusted workspace access](/fabric/security/security-trusted-workspace-access).

- **Secure event-based triggers**: Implement proper security for Azure Blob storage event triggers using Fabric Reflex alerts and eventstreams, ensuring triggers aren't accessible to unauthorized users. See [Pipeline event triggers](/fabric/data-factory/pipeline-storage-event-triggers).

- **Secure Apache Airflow workflows**: If using Data workflows (powered by Apache Airflow), implement proper authentication and authorization controls to protect Python-based data processes. See [Quickstart: Create a Data workflow](/fabric/data-factory/create-data-workflows).

- **Secure connections to Azure resources**: Use the modern Get Data experience to securely browse and connect to your Azure resources, ensuring proper authentication and access controls are applied. See [Modern Get Data experience](/fabric/data-factory/modern-get-data-experience-pipeline).

- **Implement secure copy operations**: Configure Data Factory copy operations to use secure connections and credentials, especially when moving data between different security domains. See [How to monitor a copy job](/fabric/data-factory/monitor-copy-job).

## Learn more

- [Security in Microsoft Fabric](/fabric/security/security-overview)
- [Microsoft Fabric end-to-end security scenario](/fabric/security/security-scenario)
- [Microsoft Cloud Security Benchmark – Microsoft Fabric](/security/benchmark/azure/baselines/fabric-security-baseline)
- [Data Factory in Microsoft Fabric](/fabric/data-factory/data-factory-overview)
  See also: [Azure Security Documentation](/azure/security/).