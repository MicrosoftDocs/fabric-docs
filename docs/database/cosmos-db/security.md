---
title: Secure Your Cosmos DB Database Preview
titleSuffix: Microsoft Fabric
description: Review the fundamentals of securing Cosmos DB in Microsoft Fabric from the perspective of data security.
author: seesharprun
ms.author: sidandrews
ms.topic: best-practice
ms.date: 05/20/2025
ms.custom: security-horizontal-2025
ai-usage: ai-generated
---

# Secure your Cosmos DB database in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database automatically configured for typical development needs with a simplified management experience. While Cosmos DB provides built-in security features to protect your data, it's essential to follow best practices to further enhance the security of your account, data, and networking configurations.

This article provides guidance on how to best secure your Cosmos DB in Fabric deployment.

## Identity management

- **Use managed identities to access your account from other Azure services**: Managed identities eliminate the need to manage credentials by providing an automatically managed identity in Microsoft Entra ID. Use managed identities to securely access Cosmos DB from other Azure services without embedding credentials in your code.

- **Use Entra authentication to query, create, and access items within a container**: Access items within Cosmos DB containers using your human identity and Microsoft Entra authentication. Enforce least privilege access for querying, creating, and other operations. This control helps secure your data operations.

- **Separate the Azure identities used for data and control plane access**: Use distinct Azure identities for control plane and data plane operations to reduce the risk of privilege escalation and ensure better access control. This separation enhances security by limiting the scope of each identity.

## Related content

- [Overview of Cosmos DB in Microsoft Fabric](overview.md)
- [Connect from your local development environment to Cosmos DB in Microsoft Fabric](how-to-connect-development.md)
