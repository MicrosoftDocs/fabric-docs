---
title: Authentication JavaScript API reference
description: Comprehensive reference for JavaScript authentication APIs in the Fabric Extensibility Toolkit.
ms.reviewer: gesaur
ms.topic: reference
ms.date: 12/15/2025
---

# Authentication JavaScript API reference

The Fabric Extensibility Toolkit provides a JavaScript API for acquiring authentication tokens that can be used to access Fabric APIs, Azure services, and any Entra-secured application. This article provides comprehensive API reference and usage examples.

> [!TIP]
> For a quick start guide, see [Acquire Microsoft Entra tokens](./how-to-acquire-entra-token.md).

## API reference

```javascript
acquireFrontendAccessToken(params: AcquireFrontendAccessTokenParams): Promise<AccessToken>;

export interface AcquireFrontendAccessTokenParams {
    scopes: string[];
}

export interface AccessToken {
    token: string;
}
```

> [!NOTE]
> The current extensibility toolkit implementation supports basic token acquisition with scopes. Advanced features like full consent prompting and conditional access handling are not yet available but may be added in future releases.

The API returns an `AccessToken` object that contains:

* **token**: The JWT token string to use in Authorization headers

## Basic usage

### Simple token acquisition

```javascript
// Acquire a token with default Fabric permissions
const token = await workloadClient.auth.acquireFrontendAccessToken({ scopes: [] });

// Use the token in API calls
const response = await fetch('https://api.fabric.microsoft.com/v1/workspaces', {
  headers: {
    'Authorization': `Bearer ${token.token}`,
    'Content-Type': 'application/json'
  }
});
```

### Token with specific scopes

```javascript
// Request specific scopes for Azure Storage
const token = await workloadClient.auth.acquireFrontendAccessToken({
  scopes: ['https://storage.azure.com/user_impersonation']
});
```

## Token usage examples

### Fabric API access

The token can be used directly with Fabric REST APIs:

```javascript
async function listWorkspaces() {
  const token = await workloadClient.auth.acquireFrontendAccessToken({ scopes: [] });
  
  const response = await fetch('https://api.fabric.microsoft.com/v1/workspaces', {
    headers: {
      'Authorization': `Bearer ${token.token}`
    }
  });
  
  return await response.json();
}
```

### Azure service access

Use scopes to specify the Azure services you need access to:

```javascript
async function readFromStorage(accountName, containerName, blobName) {
  const token = await workloadClient.auth.acquireFrontendAccessToken({
    scopes: ['https://storage.azure.com/user_impersonation']
  });
  
  const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token.token}`,
      'x-ms-version': '2021-12-02'
    }
  });
  
  return await response.text();
}
```

### Custom application access

Access your own Entra-secured applications:

```javascript
async function callCustomAPI() {
  const token = await workloadClient.auth.acquireFrontendAccessToken({
    scopes: ['https://myapp.contoso.com/data.read']
  });
  
  const response = await fetch('https://myapp.contoso.com/api/data', {
    headers: {
      'Authorization': `Bearer ${token.token}`
    }
  });
  
  return await response.json();
}
```

## Parameter reference

### scopes

An array of scope strings that specify the permissions your token needs.

**Common Azure service scopes:**

* `https://storage.azure.com/user_impersonation` - Azure Storage
* `https://vault.azure.net/user_impersonation` - Azure Key Vault
* `https://management.azure.com/user_impersonation` - Azure Resource Manager
* `https://graph.microsoft.com/User.Read` - Microsoft Graph

**Usage example:**

```javascript
const token = await workloadClient.auth.acquireFrontendAccessToken({
  scopes: [
    'https://storage.azure.com/user_impersonation'
  ]
});
```

**Empty scopes array:**
Use an empty array to get a token with default Fabric permissions:

```javascript
const token = await workloadClient.auth.acquireFrontendAccessToken({ scopes: [] });
```

## Consent management

### Automatic consent flow

The Extensibility Toolkit automatically handles consent workflows:

- **Initial request**: If consent is missing, a popup window opens
- **User interaction**: User grants or denies permissions
- **Automatic closure**: Popup closes automatically after user action
- **Token delivery**: If successful, the token is returned to your application

### Consent popup handling

The toolkit manages consent popups automatically, but you can customize the redirect URI behavior. Create a redirect page that handles the consent response:

```javascript
// redirect.js - Handle consent redirect
const redirectUriPath = '/close';
const url = new URL(window.location.href);

if (url.pathname?.startsWith(redirectUriPath)) {
  // Handle consent errors
  if (url?.hash?.includes("error")) {
    // Extract error information
    const errorMatch = url.hash.match(/error=([^&]+)/);
    const errorDescription = url.hash.match(/error_description=([^&]+)/);
    
    // Handle specific errors
    if (url.hash.includes("AADSTS650052")) {
      console.error("Service principal not configured");
    } else if (url.hash.includes("AADSTS65004")) {
      console.error("User declined consent");
    }
  }
  
  // Always close the popup immediately
  window.close();
}
```

### Cross-tenant consent

For accessing resources across different tenants:

```javascript
// Request consent for cross-tenant access
const token = await workloadClient.auth.acquireAccessToken({
  additionalScopesToConsent: ['https://api.partner-app.com/data.read']
});
```

## Error handling

### Common error scenarios

```javascript
async function robustTokenAcquisition() {
  try {
    return await workloadClient.auth.acquireAccessToken();
  } catch (error) {
    switch (error.code) {
      case 'user_cancelled':
        console.log('User cancelled the consent dialog');
        break;
      case 'consent_required':
        console.log('Additional consent required');
        break;
      case 'interaction_required':
        console.log('User interaction required');
        break;
      default:
        console.error('Authentication error:', error.message);
    }
    throw error;
  }
}
```

### Token expiration handling

```javascript
class TokenManager {
  private currentToken: AccessToken | null = null;
  
  async getValidToken(): Promise<AccessToken> {
    if (!this.currentToken || this.isTokenExpired(this.currentToken)) {
      this.currentToken = await workloadClient.auth.acquireAccessToken();
    }
    return this.currentToken;
  }
  
  private isTokenExpired(token: AccessToken): boolean {
    // Add buffer time to prevent requests with almost-expired tokens
    const bufferMinutes = 5;
    const expirationWithBuffer = new Date(token.expiresOn.getTime() - (bufferMinutes * 60 * 1000));
    return new Date() >= expirationWithBuffer;
  }
}
```

## Best practices

### Token caching and reuse

* **Cache tokens**: Store tokens in memory until expiration
* **Automatic refresh**: Implement automatic token refresh before expiration
* **Secure storage**: Never persist tokens to local storage or cookies

### Scope management

* **Minimal scopes**: Request only the permissions you need
* **Progressive consent**: Request additional scopes as features are used
* **Scope validation**: Verify tokens include required scopes before API calls

### Advanced error handling

* **Graceful degradation**: Provide fallback functionality when authentication fails
* **User messaging**: Clearly explain why permissions are needed
* **Retry logic**: Implement appropriate retry mechanisms for transient failures

### Performance optimization

* **Parallel requests**: Acquire tokens for multiple services in parallel when possible
* **Batch operations**: Group API calls to minimize token acquisition overhead
* **Cache management**: Implement efficient token caching strategies

## Related content

* [Quick start: Acquire Microsoft Entra tokens](./how-to-acquire-entra-token.md) - Simple getting started guide
* [Authentication overview](authentication-overview.md) - High-level authentication concepts
* [Authentication guidelines](authentication-guidelines.md) - Best practices and recommendations
* [Access Fabric APIs](./how-to-access-fabric-apis.md) - Pre-built API wrappers
