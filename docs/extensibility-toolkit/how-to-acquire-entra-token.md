---
title: Quick start - Acquire Microsoft Entra tokens
description: Quick start guide to acquire Microsoft Entra tokens in your Fabric extension for API access
ms.reviewer: gesaur
ms.topic: quickstart
ms.date: 12/15/2025
---
# How-To: Acquire Microsoft Entra tokens

This quick start guide shows you how to acquire Microsoft Entra tokens in your Fabric extension to access APIs. For comprehensive API reference and advanced scenarios, see the [Authentication JavaScript API](./authentication-javascript-api.md) documentation.

## Prerequisites

- A Fabric extension project set up with the Extensibility Toolkit
- Basic understanding of JavaScript/TypeScript

## Basic token acquisition

The simplest way to get a token for Fabric APIs:

```javascript
// Get a token for Fabric APIs
const token = await workloadClient.auth.acquireFrontendAccessToken({ scopes: [] });

// Use the token to call Fabric APIs
const response = await fetch('https://api.fabric.microsoft.com/v1/workspaces', {
  headers: {
    'Authorization': `Bearer ${token.token}`,
    'Content-Type': 'application/json'
  }
});
```

## Get tokens for specific services

For Azure services or custom applications, specify the required scopes:

```javascript
// Get token for Azure Storage
const storageToken = await workloadClient.auth.acquireFrontendAccessToken({
  scopes: ['https://storage.azure.com/user_impersonation']
});

// Get token for Microsoft Graph
const graphToken = await workloadClient.auth.acquireFrontendAccessToken({
  scopes: ['https://graph.microsoft.com/User.Read']
});
```

## Error handling

Handle common authentication errors:

```javascript
try {
  const token = await workloadClient.auth.acquireFrontendAccessToken({ scopes: [] });
  // Use token...
} catch (error) {
  console.error('Authentication failed:', error.message);
  // Handle error appropriately
}
```

## Next steps

- For comprehensive API reference and advanced scenarios, see [Authentication JavaScript API](authentication-javascript-api.md)
- Learn how to [Access Fabric APIs](how-to-access-fabric-apis.md) with pre-built wrappers
- Review [Authentication guidelines](authentication-guidelines.md) for best practices
- Explore the [Starter Kit examples](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/app/playground/ClientSDKPlayground/ApiAuthentication.tsx) for complete implementations

## Related content

- [Authentication overview](authentication-overview.md)
- [Key concepts and features](key-concepts.md)
