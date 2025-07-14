---
title: Secure Your Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Review the fundamentals of securing Cosmos DB in Microsoft Fabric from the perspective of data security.
author: seesharprun
ms.author: sidandrews
ms.topic: best-practice
ms.date: 07/14/2025
ms.custom: security-horizontal-2025
ai-usage: ai-generated
appliesto:
- ✅ Cosmos DB in Fabric
---

# Secure your Cosmos DB in Microsoft Fabric database (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database automatically configured for typical development needs with a simplified management experience. Fabric provides built-in security, access control, and monitoring for Cosmos DB in Fabric. While Fabric provides built-in security features to protect your data, it's essential to follow best practices to further enhance the security of your account, data, and networking configurations.

This article provides guidance on how to best secure your Cosmos DB in Fabric deployment.

## Identity management

- **Use managed identities to access your account from other Azure services**: Managed identities eliminate the need to manage credentials by providing an automatically managed identity in Microsoft Entra ID. Use managed identities to securely access Cosmos DB from other Azure services without embedding credentials in your code. While Cosmos DB in Fabric supports multiple types of identity types (service principals), managed identities are the preferred choice as they don't require your solution to handle credentials directly. For more information, see [authenticate from Azure host services](how-to-authenticate.md).

- **Use Entra authentication to query, create, and access items within a container while developing solutions**: Access items within Cosmos DB containers using your human identity and Microsoft Entra authentication. Enforce least privilege access for querying, creating, and other operations. This control helps secure your data operations. For more information, see [connect securely from your development environment](how-to-authenticate.md).

- **Separate the Azure identities used for data and control plane access**: Use distinct Azure identities for control plane and data plane operations to reduce the risk of privilege escalation and ensure better access control. This separation enhances security by limiting the scope of each identity. For more information, see [configure authorization](authorization.md).

## User permissions

- **Configure least-permissive Fabric workspace access**: User permissions are enforced based on the current level of workspace access. If a user is removed from the Fabric workspace, they also automatically lose access to the associated Cosmos DB database and underlying data. For more information, see [Fabric permission model](../../security/permission-model.md).

- **Use private links to access your database**: Configure private access from a specific virtual network to the workspace that hosts your Cosmos DB database. This configuration ensures that data is only accessible to authorized applications and users within the defined network. For more information, see [use private links](../../security/protect-inbound-traffic.md#private-links).

## Data protection

- **Consider customer-managed keys for encryption at rest**: Cosmos DB database in Fabric automatically encrypts data at rest using service-managed keys. For an extra layer of security, use customer-managed keys to control encryption with your own keys. For more information, see [manage customer-managed keys](../../security/workspace-customer-managed-keys.md).

## Related content

- [Learn about Cosmos DB in Microsoft Fabric](overview.md)
- [Authenticate using Microsoft Entra ID to Cosmos DB in Microsoft Fabric](how-to-authenticate.md)
- [Manage authorization in Cosmos DB in Microsoft Fabric](authorization.md)
