---
title: Authentication guidelines for Microsoft Fabric Extensibility Toolkit
description: This article provides guidelines and best practices for implementing authentication in Fabric extensibility toolkit workloads.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# Authentication guidelines for Microsoft Fabric Extensibility Toolkit

This article provides guidelines on how to work with authentication when building Microsoft Fabric extensibility toolkit workloads. It includes information about working with tokens, consents, and accessing various services from your frontend application.

Before you begin, make sure you're familiar with the concepts in [Authentication overview](./authentication-overview.md).

## Frontend-only authentication model

The Extensibility Toolkit uses a frontend-only architecture that simplifies authentication compared to traditional workloads:

* **Direct API calls**: Your frontend directly calls Fabric APIs, Azure services, and external applications
* **Token reuse**: A single token can be used to authenticate against multiple Entra-secured services
* **Simplified consent**: Consent management is handled by the platform with automatic prompting

## Microsoft Entra application configuration

### Expose an API tab

Configure scopes for your workload application:

* **Fabric integration scopes**: Preauthorize Microsoft Power BI with application ID `871c010f-5e61-4fb1-83ac-98610a7e9110`
* **Custom API scopes**: Add scopes for any custom APIs your workload exposes
* **Granular permissions**: Use different scopes for read vs. write operations

For example, if your workload exposes data APIs:
* Add `data.read` scope for read operations
* Add `data.write` scope for write operations
* Validate appropriate scopes in your API handlers

### API permissions tab

Configure permissions for external services your workload needs to access:

* **Required**: `Fabric.Extend` under Power BI Service (mandatory for Fabric integration)
* **Azure services**: Add scopes for Azure services like `https://storage.azure.com/user_impersonation`
* **Custom applications**: Add scopes for your own Entra-secured applications
* **Third-party services**: Include any external services that support Entra authentication

## Token usage patterns

### Using tokens for multiple services

The frontend token acquired through the Extensibility Toolkit can be used to authenticate against:

#### Fabric APIs
```typescript
// Token automatically includes required Fabric scopes
const response = await fetch('https://api.fabric.microsoft.com/v1/workspaces', {
  headers: {
    'Authorization': `Bearer ${token.accessToken}`
  }
});
```

#### Azure services
```typescript
// Same token works for Azure services
const response = await fetch('https://management.azure.com/subscriptions', {
  headers: {
    'Authorization': `Bearer ${token.accessToken}`
  }
});
```

#### Custom applications
```typescript
// Token works for your own Entra-secured applications
const response = await fetch('https://myapp.contoso.com/api/data', {
  headers: {
    'Authorization': `Bearer ${token.accessToken}`
  }
});
```

### Scope management

The Extensibility Toolkit abstracts scope management for common scenarios:

* **Fabric client libraries**: Automatically include required Fabric scopes
* **Azure client libraries**: Handle Azure service scopes transparently
* **Custom scopes**: Specify additional scopes when needed

## Working with consents

### Initial token acquisition

Start by acquiring a token to establish the authentication context:

```typescript
const token = await workloadClient.auth.acquireFrontendAccessToken({ scopes: [] });
```

This call may result in:

* **Consent prompt**: If the user hasn't consented to your application
* **Silent acquisition**: If consent was previously granted

### Handling additional service access

When your workload needs to access additional services, specify the required scopes:

```typescript
try {
  // Request token with specific scopes for Azure Storage
  const token = await workloadClient.auth.acquireFrontendAccessToken({
    scopes: ['https://storage.azure.com/user_impersonation']
  });
  
  // Use token to access Azure Storage
  const response = await fetch('https://mystorageaccount.blob.core.windows.net/', {
    headers: { 'Authorization': `Bearer ${token.token}` }
  });
} catch (error) {
  // Handle authentication or authorization errors
  console.error('Access failed:', error.message);
}
```

## Example scenarios

### Scenario 1: Accessing Fabric and Azure services

Your workload needs to:
* List Fabric workspaces
* Read from Azure Storage
* Write to Azure Key Vault

**Implementation**:
1. Configure API permissions for required services
2. Acquire initial token
3. Use token for all service calls
4. Handle consent prompts as needed

### Scenario 2: Custom application integration

Your workload integrates with your own backend service:

1. **Configure your backend**: Ensure it accepts Entra tokens
2. **Add API permissions**: Include your backend's scopes in the workload application
3. **Use standard authentication**: The same token pattern works for your custom services

### Scenario 3: Third-party service integration

Integrating with external Entra-enabled services:

1. **Service registration**: Register your workload with the third-party service
2. **Scope configuration**: Add the service's scopes to your API permissions
3. **Token usage**: Use the same authentication pattern for external services

## Error handling and troubleshooting

### Common authentication errors

* **Consent required**: User hasn't granted permission for a specific scope
* **Conditional access**: Additional authentication requirements (e.g., MFA)
* **Token expiration**: Token has expired and needs refresh
* **Invalid scope**: Requested scope isn't configured or available

### Error handling patterns

```typescript
async function handleAuthenticatedRequest(url: string, requiredScopes: string[] = []) {
  try {
    const token = await workloadClient.auth.acquireFrontendAccessToken({ 
      scopes: requiredScopes 
    });
    return await makeRequest(url, token);
  } catch (error) {
    if (error.code === 'consent_required') {
      // User needs to grant consent for the requested scopes
      console.error('Consent required for scopes:', requiredScopes);
    }
    throw error;
  }
}
```

### Redirect URI handling

The extensibility toolkit includes built-in redirect URI handling for authentication consent popups. This is implemented in the main `index.ts` file and handles consent redirects automatically.

**The toolkit handles:**
* **Automatic window closure**: Consent popups close automatically after user interaction
* **Error handling**: Specific error codes are detected and handled appropriately
* **Error display**: Failed consent attempts show user-friendly error messages

**Current implementation in the toolkit:**
```typescript
const redirectUriPath = '/close';
const url = new URL(window.location.href);
if (url.pathname?.startsWith(redirectUriPath)) {
  // Handle errors
  if (url?.hash?.includes("error")) {
    if (url.hash.includes("AADSTS650052")) {
      // Handle missing service principal error
      printFormattedAADErrorMessage(url?.hash);
    } else if (url.hash.includes("AADSTS65004")) {
      // Handle user declined consent error
      printFormattedAADErrorMessage(url?.hash);
    } else {
      window.close();
    }
  } else {
    // Close window on successful consent
    window.close();
  }
}
```

> [!NOTE]
> The redirect URI handling is automatically included in the extensibility toolkit template. You don't need to implement this yourself unless you want to customize the error handling behavior.

## Best practices

### Token management
* **Cache tokens**: Reuse tokens until they expire
* **Handle refresh**: Implement automatic token refresh logic
* **Secure storage**: Store tokens securely in browser memory

### Consent management
* **Minimal permissions**: Request only the scopes you actually need
* **Progressive consent**: Request additional permissions as features are used
* **Clear messaging**: Explain to users why permissions are needed

### Error handling
* **Graceful degradation**: Provide fallback functionality when possible
* **User feedback**: Clearly communicate authentication requirements
* **Retry logic**: Implement appropriate retry mechanisms for transient failures

## Related content

* [Authentication overview](./authentication-overview.md)
* [Authentication JavaScript API](./authentication-javascript-api.md)
