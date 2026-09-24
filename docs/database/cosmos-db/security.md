---
title: Secure Your Cosmos DB Database
description: Learn how to secure Cosmos DB in Microsoft Fabric, with best practices for protecting your database and its data.
author: msmbaldwin
ms.author: mbaldwin
ms.reviewer: mjbrown
ms.topic: best-practice
ms.date: 08/13/2026
ms.custom: horz-security
ms.search.form: Cosmos DB database security
ai-usage: ai-assisted
---

# Secure your Cosmos DB in Microsoft Fabric database

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database that's automatically configured for typical development needs and offers a simplified management experience. Fabric provides built-in security, access control, and monitoring for Cosmos DB in Fabric. While Fabric offers built-in security features to protect your data, follow these best practices to further enhance the security of your database, its data, and your access configurations.

This article provides guidance on how to best secure your Cosmos DB in Fabric deployment.

[!INCLUDE [Security horizontal Zero Trust statement](~/../reusable-content/ce-skilling/azure/includes/security/zero-trust-security-horizontal.md)]

## Network security

Cosmos DB in Fabric relies on Microsoft Fabric's platform-level network controls. Isolate access at the tenant and workspace tier, because item-level network isolation options are limited today.

- **Route tenant traffic through private links**: Enable Fabric tenant-level private links so traffic to the workspaces that host your Cosmos DB databases travels over the Microsoft private backbone instead of the public internet. For more information, see [Private links for secure access to Fabric](/fabric/security/security-private-links-overview).

- **Plan for item-level networking limitations**: Private Link isn't currently supported at the Cosmos DB database level, so design network isolation around the Fabric tenant and workspace boundary rather than the individual database. For more information, see [Limitations in Cosmos DB in Microsoft Fabric](limitations.md).

## Identity and access management

- **Use managed identities to access your database from other Azure services**: Managed identities eliminate the need to manage credentials by providing an automatically managed identity in Microsoft Entra ID. Use managed identities to securely access Cosmos DB from other Azure services without embedding credentials in your code. While Cosmos DB in Fabric supports multiple identity types (service principals), managed identities are the preferred choice as they don't require your solution to handle credentials directly. For more information, see [authenticate from Azure host services](how-to-authenticate.md).

- **Use Entra authentication to query, create, and access items within a container while developing solutions**: Access items within Cosmos DB containers by using your human identity and Microsoft Entra authentication. Enforce least privilege access for querying, creating, and other operations. For more information, see [connect securely from your development environment](how-to-authenticate.md).

- **Separate the Azure identities used for data and control plane access**: Use distinct Azure identities for control plane and data plane operations to reduce the risk of privilege escalation and ensure better access control. This separation enhances security by limiting the scope of each identity. For more information, see [configure authorization](authorization.md).

- **Configure least-permissive Fabric workspace access**: Fabric enforces user permissions based on the current level of workspace access. If you remove a user from the Fabric workspace, they also automatically lose access to the associated Cosmos DB database and underlying data. For more information, see [Fabric permission model](../../security/permission-model.md).

- **Understand notebook execution identity**: When working with notebooks in Fabric workspaces, be aware that the identity a notebook runs under depends on how it's triggered. An interactive run uses the security context of the current user, a pipeline activity runs under the pipeline's last modified user, and a scheduled run uses the identity of the user who created or last updated the schedule. Because data access permissions and audit trails reflect that identity, plan your notebook creation, sharing, and scheduling strategy accordingly. For more information, see [Security context of running notebook](../../data-engineering/how-to-use-notebook.md#security-context-of-running-notebook).

- **Plan for workspace identity limitations**: Currently, Fabric doesn't support `run-as` functionality with Workspace Identity. Operations execute with the triggering user's identity rather than a shared workspace identity. Consider this limitation when you design multi-user scenarios, and confirm that the appropriate users trigger artifacts shared within the workspace. For more information, see [Limitations in Cosmos DB in Microsoft Fabric](limitations.md#support-for-run-as-using-workspace-identity).

## Data protection

Cosmos DB in Fabric automatically encrypts all data at rest and in transit with Microsoft-managed keys, so you don't need to configure any encryption settings. Customer-managed keys aren't currently available. You can configure data protection for the OneLake copy of your data.

- **Secure the automatic OneLake copy of your data**: Fabric automatically mirrors every Cosmos DB in Fabric database into OneLake in the open Delta Lake format, with no setup required. Protect that analytical copy with the same workspace access controls and least-privilege roles you apply to the database. For more information, see [Mirror OneLake in Cosmos DB in Microsoft Fabric](mirror-onelake.md).

- **Plan around customer-managed key limitations**: Customer-managed key (CMK) encryption isn't currently available for Cosmos DB in Fabric. If your compliance requirements mandate CMK, account for this limitation before you store regulated data. For more information, see [Limitations in Cosmos DB in Microsoft Fabric](limitations.md).

## Logging and monitoring

Track access to your Cosmos DB databases and watch for anomalous usage that might indicate a security problem.

- **Audit user and admin activity with the Fabric audit log**: Review the Fabric audit log to see who accessed or changed your Cosmos DB databases and when, which supports incident investigation and access reviews. For more information, see [Track user activities in Microsoft Fabric](/fabric/admin/track-user-activities).

- **Monitor database metrics for anomalies**: Use the Metrics Summary to review request, storage, and throughput usage, and investigate unexpected spikes that can signal misuse. For more information, see [Monitor Cosmos DB in Microsoft Fabric](how-to-monitor.md).

## Compliance and governance

Use Microsoft Fabric's platform governance capabilities to classify, endorse, and trace your Cosmos DB data.

- **Apply sensitivity labels to classify and protect data**: Use Microsoft Purview Information Protection sensitivity labels to classify your Cosmos DB items so that protection travels with the data across Fabric and OneLake. For more information, see [Information protection in Microsoft Fabric](/fabric/governance/information-protection).

- **Endorse trusted databases**: Promote or certify Cosmos DB databases through content endorsement so users can distinguish authoritative data from unvetted items. For more information, see [Endorsement in Microsoft Fabric](/fabric/governance/endorsement-overview).

- **Trace data flows with lineage**: Use lineage to understand how data moves between your Cosmos DB databases and downstream Fabric items, which aids impact analysis and compliance verification. For more information, see [Lineage in Microsoft Fabric](/fabric/governance/lineage).

## Backup and recovery

Cosmos DB in Fabric doesn't currently offer a customer-configurable backup or point-in-time restore for the transactional database. To plan for recovery, rely on Fabric's platform resilience and source-control your item definitions.

- **Rely on Fabric platform resilience**: Understand the availability and recovery guarantees that Microsoft Fabric provides for your capacity so you can set realistic recovery expectations. For more information, see [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric).

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Authenticate using Microsoft Entra ID to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
- [Manage authorization in Cosmos DB in Microsoft Fabric](authorization.md)
