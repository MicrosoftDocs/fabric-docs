---
title: Secure Your Cosmos DB Database (Preview)
titleSuffix: Microsoft Fabric
description: Review the fundamentals of securing Cosmos DB in Microsoft Fabric from the perspective of data security.
author: seesharprun
ms.author: sidandrews
ms.topic: best-practice
ms.date: 06/06/2025
ms.custom: security-horizontal-2025
ai-usage: ai-generated
---

# Secure your Cosmos DB database in Microsoft Fabric (preview)

[!INCLUDE[Feature preview note](../../includes/feature-preview-note.md)]

Cosmos DB in Microsoft Fabric is an AI-optimized NoSQL database automatically configured for typical development needs with a simplified management experience. While Cosmos DB provides built-in security features to protect your data, it's essential to follow best practices to further enhance the security of your account, data, and networking configurations.

This article provides guidance on how to best secure your Cosmos DB in Fabric deployment.

## Identity management

- **Use managed identities to access your account from other Azure services**: Managed identities eliminate the need to manage credentials by providing an automatically managed identity in Microsoft Entra ID. Use managed identities to securely access Cosmos DB from other Azure services without embedding credentials in your code. For more information, see [Authenticate from Azure host services](how-to-authenticate-azure.md).

- **Use Entra authentication to query, create, and access items within a container while developing solutions**: Access items within Cosmos DB containers using your human identity and Microsoft Entra authentication. Enforce least privilege access for querying, creating, and other operations. This control helps secure your data operations. For more information, see [Connect securely from your development environment](how-to-connect-development.md).

- **Separate the Azure identities used for data and control plane access**: Use distinct Azure identities for control plane and data plane operations to reduce the risk of privilege escalation and ensure better access control. This separation enhances security by limiting the scope of each identity. For more information, see [How to configure authorization to items](how-to-configure-authorization.md).

## SECTION 2

- **RECOMMENDATION** EXPLANATION. For more information, see TODO.

- **RECOMMENDATION** EXPLANATION. For more information, see TODO.

## SECTION 3

- **RECOMMENDATION** EXPLANATION. For more information, see TODO.

- **RECOMMENDATION** EXPLANATION. For more information, see TODO.

## SECTION 4

- **RECOMMENDATION** EXPLANATION. For more information, see TODO.

- **RECOMMENDATION** EXPLANATION. For more information, see [How to share items](how-to-share-items.md).

## Related content

- [Overview of Cosmos DB in Microsoft Fabric](overview.md)
- [Connect from your local development environment to Cosmos DB in Microsoft Fabric](how-to-connect-development.md)
- [Authenticate from Azure host services](how-to-authenticate-azure.md)
- [How to share items](how-to-share-items.md)
