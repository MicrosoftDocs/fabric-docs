---
title: Authenticate Remote Endpoints
description: Learn how to implement authentication and authorization for remote endpoints in your Fabric workload using SubjectAndAppToken format and OAuth 2.0 flows.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 02/12/2026
ai-usage: ai-assisted
---

# Authenticate Remote Endpoints

Remote endpoints in Microsoft Fabric workloads use a specialized authentication mechanism that provides both user context and application identity. This article explains how to implement authentication for remote endpoints that handle jobs, lifecycle notifications, and other backend operations.

## Authentication Flows Overview

Fabric workloads involve three primary authentication flows:

1. **Fabric to Workload** - Fabric calls your remote endpoint with SubjectAndAppToken format
2. **Workload to Fabric** - Your workload calls Fabric APIs with SubjectAndAppToken or Bearer tokens
3. **Workload Frontend to Backend** - Your frontend calls your backend with Bearer tokens

This article focuses on authenticating requests from Fabric to your workload and making authenticated calls back to Fabric.

## SubjectAndAppToken Format

When Fabric calls your remote endpoint (for jobs, lifecycle notifications, or other operations), it uses a dual-token authentication format called SubjectAndAppToken.

### Authorization Header Structure

```
SubjectAndAppToken1.0 subjectToken="<user-delegated-token>", appToken="<app-only-token>"
```

This format includes two distinct tokens:

- **`subjectToken`** - A delegated token representing the user on whose behalf the operation is being performed
- **`appToken`** - An app-only token from the Fabric application, proving the request originated from Fabric

### Why Dual Tokens?

The dual-token approach provides three key benefits:

1. **Validation** - Verify that the request originated from Fabric by validating the appToken
2. **User Context** - The subjectToken provides user context for the action being performed
3. **Inter-Service Communication** - Use the subjectToken to acquire On-Behalf-Of (OBO) tokens for calling other services with user context

## Parsing SubjectAndAppToken

Your remote endpoint must parse the Authorization header to extract both tokens.

### JavaScript Example

```javascript
/**
 * Parse SubjectAndAppToken from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {object|null} Parsed tokens or null if invalid format
 */
function parseSubjectAndAppToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('SubjectAndAppToken1.0 ')) {
    return null;
  }

  const tokenPart = authHeader.substring('SubjectAndAppToken1.0 '.length);
  const tokens = {};
  
  const parts = tokenPart.split(',');

  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key && value) {
      // Remove surrounding quotes from the token value
      const cleanValue = value.trim().replace(/^"(.*)"$/, '$1');
      tokens[key.trim()] = cleanValue;
    }
  }

  return {
    subjectToken: tokens.subjectToken || null,
    appToken: tokens.appToken || null
  };
}
```

### Usage Example

```javascript
const authHeader = req.headers['authorization'];
const tokens = parseSubjectAndAppToken(authHeader);

if (!tokens || !tokens.appToken) {
  return res.status(401).json({ error: 'Invalid authorization header' });
}

// Now you have access to:
// - tokens.subjectToken (user-delegated token)
// - tokens.appToken (Fabric app token)
```

## Token Validation

Both tokens must be validated to ensure authenticity and proper claims.

### App Token Validation

The `appToken` is an app-only token from Fabric. Validate:

- **Token signature** - Verify against Azure AD signing keys
- **Token lifetime** - Check `nbf` (not before) and `exp` (expiration) claims
- **Audience** - Must match your workload's app registration
- **Issuer** - Must be from Azure AD with correct tenant
- **`idtyp` claim** - Must be `"app"` for app-only tokens
- **No `scp` claim** - App-only tokens don't have scope claims
- **Tenant ID** - Must match your publisher tenant ID

Sample appToken claims:

```json
{
  "aud": "api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/123",
  "iss": "https://sts.windows.net/12345678-77f3-4fcc-bdaa-487b920cb7ee/",
  "iat": 1700047232,
  "nbf": 1700047232,
  "exp": 1700133932,
  "appid": "11112222-bbbb-3333-cccc-4444dddd5555",
  "appidacr": "2",
  "idtyp": "app",
  "oid": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
  "tid": "bbbbcccc-1111-dddd-2222-eeee3333ffff",
  "ver": "1.0"
}
```

### Subject Token Validation

The `subjectToken` is a user-delegated token. Validate:

- **Token signature** - Verify against Azure AD signing keys
- **Token lifetime** - Check `nbf` and `exp` claims
- **Audience** - Must match your workload's app registration
- **Issuer** - Must be from Azure AD with correct tenant
- **`scp` claim** - Must include `"FabricWorkloadControl"` scope
- **No `idtyp` claim** - Delegated tokens don't have this claim
- **`appid` must match** - Should be the same as in appToken

Sample subjectToken claims:

```json
{
  "aud": "api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/123",
  "iss": "https://sts.windows.net/12345678-77f3-4fcc-bdaa-487b920cb7ee/",
  "iat": 1700050446,
  "nbf": 1700050446,
  "exp": 1700054558,
  "appid": "11112222-bbbb-3333-cccc-4444dddd5555",
  "scp": "FabricWorkloadControl",
  "name": "john doe",
  "oid": "bbbbbbbb-1111-2222-3333-cccccccccccc",
  "upn": "user1@contoso.com",
  "tid": "bbbbcccc-1111-dddd-2222-eeee3333ffff",
  "ver": "1.0"
}
```

### JavaScript Token Validation Example

```javascript
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

/**
 * Validate Azure AD token
 * @param {string} token - JWT token to validate
 * @param {object} options - Validation options
 * @returns {Promise<object>} Validated token claims
 */
async function validateAadToken(token, options = {}) {
  const { isAppOnly = false, tenantId = null, audience = null } = options;

  // Decode token to get header and tenant
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) {
    throw new Error('Invalid token format');
  }

  const { header, payload } = decoded;
  const tokenTenantId = payload.tid;

  // Get signing key from Azure AD
  const client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${tokenTenantId}/discovery/v2.0/keys`,
    cache: true,
    cacheMaxAge: 86400000 // 24 hours
  });

  const signingKey = await new Promise((resolve, reject) => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) reject(err);
      else resolve(key.getPublicKey());
    });
  });

  // Verify token signature and claims
  const verifyOptions = {
    algorithms: ['RS256'],
    audience: audience,
    clockTolerance: 60 // 1 minute clock skew
  };

  const verified = jwt.verify(token, signingKey, verifyOptions);

  // Validate app-only vs delegated token
  if (isAppOnly) {
    if (verified.idtyp !== 'app') {
      throw new Error('Expected app-only token');
    }
    if (verified.scp) {
      throw new Error('App-only token should not have scp claim');
    }
  } else {
    if (verified.idtyp) {
      throw new Error('Expected delegated token');
    }
    if (!verified.scp || !verified.scp.includes('FabricWorkloadControl')) {
      throw new Error('Missing required FabricWorkloadControl scope');
    }
  }

  // Validate tenant if required
  if (tenantId && verified.tid !== tenantId) {
    throw new Error(`Token tenant mismatch: expected ${tenantId}, got ${verified.tid}`);
  }

  return verified;
}
```

## Authentication Middleware

Implement middleware to authenticate incoming requests from Fabric.

### Complete Authentication Flow

```javascript
/**
 * Authentication middleware that validates control plane calls from Fabric
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<boolean>} True if authenticated successfully
 */
async function authenticateControlPlaneCall(req, res) {
  try {
    // Extract and parse authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const tokens = parseSubjectAndAppToken(authHeader);
    if (!tokens || !tokens.appToken) {
      return res.status(401).json({ error: 'Invalid Authorization header format' });
    }

    // Get tenant ID from header
    const tenantId = req.headers['ms-client-tenant-id'];
    if (!tenantId) {
      return res.status(400).json({ error: 'Missing ms-client-tenant-id header' });
    }

    // Get configuration
    const publisherTenantId = process.env.TENANT_ID;
    const audience = process.env.BACKEND_AUDIENCE;
    const fabricBackendAppId = '00000009-0000-0000-c000-000000000000';

    // Validate app token (from Fabric)
    const appTokenClaims = await validateAadToken(tokens.appToken, {
      isAppOnly: true,
      audience: audience
    });

    // Verify app token is from Fabric
    const appTokenAppId = appTokenClaims.appid || appTokenClaims.azp;
    if (appTokenAppId !== fabricBackendAppId) {
      return res.status(401).json({ error: 'App token not from Fabric' });
    }

    // Verify app token is in publisher's tenant
    if (publisherTenantId && appTokenClaims.tid !== publisherTenantId) {
      return res.status(401).json({ error: 'App token tenant mismatch' });
    }

    // Validate subject token if present
    let subjectTokenClaims = null;
    if (tokens.subjectToken) {
      subjectTokenClaims = await validateAadToken(tokens.subjectToken, {
        isAppOnly: false,
        audience: audience,
        tenantId: tenantId
      });

      // Verify subject token has same appid as app token
      const subjectAppId = subjectTokenClaims.appid || subjectTokenClaims.azp;
      if (subjectAppId !== appTokenAppId) {
        return res.status(401).json({ error: 'Token appid mismatch' });
      }
    }

    // Store authentication context in request
    req.authContext = {
      subjectToken: tokens.subjectToken,
      appToken: tokens.appToken,
      tenantId: tenantId,
      appTokenClaims: appTokenClaims,
      subjectTokenClaims: subjectTokenClaims,
      userId: subjectTokenClaims?.oid || subjectTokenClaims?.sub,
      userName: subjectTokenClaims?.name || subjectTokenClaims?.upn
    };

    return true; // Authentication successful

  } catch (error) {
    console.error('Authentication failed:', error.message);
    res.status(401).json({ error: 'Authentication failed' });
    return false;
  }
}
```

### Using the Middleware

```javascript
app.post('/api/jobs/execute', async (req, res) => {
  // Authenticate the request
  const authenticated = await authenticateControlPlaneCall(req, res);
  if (!authenticated) {
    return; // Response already sent by middleware
  }

  // Access authentication context
  const { userId, userName, tenantId, subjectToken } = req.authContext;
  
  console.log(`Executing job for user: ${userName} (${userId})`);
  
  // Execute job logic...
});
```

## Token Exchange - On-Behalf-Of (OBO) Flow

To call Fabric APIs or access OneLake from your remote endpoint, you need to exchange the user's subjectToken for resource-specific tokens using the OAuth 2.0 On-Behalf-Of flow.

### Token Exchange Service

```javascript
const https = require('https');
const { URL } = require('url');

const AAD_LOGIN_URL = 'https://login.microsoftonline.com';
const ONELAKE_SCOPE = 'https://storage.azure.com/.default';
const FABRIC_SCOPE = 'https://analysis.windows.net/powerbi/api/.default';

/**
 * Get token for any scope using OBO flow
 * @param {string} userToken - User's access token (subjectToken)
 * @param {string} tenantId - User's tenant ID
 * @param {string} scope - Target resource scope
 * @returns {Promise<string>} Access token for the requested scope
 */
async function getTokenForScope(userToken, tenantId, scope) {
  const clientId = process.env.BACKEND_APPID;
  const clientSecret = process.env.BACKEND_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('BACKEND_APPID and BACKEND_CLIENT_SECRET required');
  }

  const tokenEndpoint = `${AAD_LOGIN_URL}/${tenantId}/oauth2/v2.0/token`;
  const requestBody = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    client_id: clientId,
    client_secret: clientSecret,
    assertion: userToken,
    scope: scope,
    requested_token_use: 'on_behalf_of'
  }).toString();

  const response = await makeTokenRequest(tokenEndpoint, requestBody);

  if (!response.access_token) {
    throw new Error('Token exchange failed: missing access_token');
  }

  return response.access_token;
}

/**
 * Get OneLake access token
 * @param {string} userToken - User's access token from authContext
 * @param {string} tenantId - User's tenant ID
 * @returns {Promise<string>} OneLake access token
 */
async function getOneLakeToken(userToken, tenantId) {
  return getTokenForScope(userToken, tenantId, ONELAKE_SCOPE);
}

/**
 * Get Fabric OBO token for calling Fabric APIs
 * @param {string} userToken - User's access token
 * @param {string} tenantId - User's tenant ID
 * @returns {Promise<string>} Fabric OBO token
 */
async function getFabricOboToken(userToken, tenantId) {
  return getTokenForScope(userToken, tenantId, FABRIC_SCOPE);
}

/**
 * Make HTTPS request to token endpoint
 */
function makeTokenRequest(url, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => {
        const parsed = JSON.parse(responseBody);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(parsed);
        } else {
          const error = parsed.error_description || parsed.error || `HTTP ${res.statusCode}`;
          reject(new Error(error));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
```

### Using Token Exchange

```javascript
// In your job or lifecycle notification handler
async function handleJobExecution(req, res) {
  const authenticated = await authenticateControlPlaneCall(req, res);
  if (!authenticated) return;

  const { subjectToken, tenantId } = req.authContext;

  try {
    // Get OneLake token to access item data
    const oneLakeToken = await getOneLakeToken(subjectToken, tenantId);
    
    // Use OneLake token to read/write data
    const data = await readFromOneLake(oneLakeToken, workspaceId, itemId);
    
    // Process data...
    
    res.status(200).json({ status: 'completed' });
  } catch (error) {
    console.error('Job execution failed:', error);
    res.status(500).json({ error: 'Job execution failed' });
  }
}
```

## Calling Fabric APIs

To call Fabric workload control APIs, you need to construct a SubjectAndAppToken with both OBO and S2S tokens.

### Service-to-Service (S2S) Token

In addition to the OBO token, you need an app-only S2S token for the appToken part.

```javascript
/**
 * Get S2S (Service-to-Service) token using client credentials flow
 * @param {string} tenantId - Publisher's tenant ID
 * @param {string} scope - Target resource scope
 * @returns {Promise<string>} S2S access token
 */
async function getS2STokenForScope(tenantId, scope) {
  const clientId = process.env.BACKEND_APPID;
  const clientSecret = process.env.BACKEND_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('BACKEND_APPID and BACKEND_CLIENT_SECRET required');
  }

  const tokenEndpoint = `${AAD_LOGIN_URL}/${tenantId}/oauth2/v2.0/token`;
  const requestBody = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope
  }).toString();

  const response = await makeTokenRequest(tokenEndpoint, requestBody);

  if (!response.access_token) {
    throw new Error('S2S token acquisition failed');
  }

  return response.access_token;
}

/**
 * Get Fabric S2S token
 * @param {string} publisherTenantId - Publisher's tenant ID
 * @returns {Promise<string>} Fabric S2S access token
 */
async function getFabricS2SToken(publisherTenantId) {
  return getS2STokenForScope(publisherTenantId, FABRIC_SCOPE);
}
```

### Building Composite Token for Fabric APIs

```javascript
/**
 * Build composite token for Fabric API calls
 * @param {object} authContext - Authentication context
 * @returns {Promise<string>} SubjectAndAppToken formatted header value
 */
async function buildCompositeToken(authContext) {
  const { subjectToken, tenantId } = authContext;
  const publisherTenantId = process.env.TENANT_ID;

  if (!subjectToken) {
    throw new Error('Subject token is required');
  }

  // Exchange user's subject token for Fabric OBO token
  const fabricOboToken = await getFabricOboToken(subjectToken, tenantId);

  // Acquire S2S token using publisher tenant
  const fabricS2SToken = await getFabricS2SToken(publisherTenantId);

  // Combine into SubjectAndAppToken format
  return `SubjectAndAppToken1.0 subjectToken="${fabricOboToken}", appToken="${fabricS2SToken}"`;
}
```

### Calling Fabric APIs Example

```javascript
const axios = require('axios');

/**
 * Call Fabric workload control API
 */
async function callFabricApi(authContext, workspaceId, itemId) {
  // Build composite token
  const authHeader = await buildCompositeToken(authContext);

  // Call Fabric API
  const response = await axios.get(
    `https://api.fabric.microsoft.com/v1/workspaces/${workspaceId}/items/${itemId}`,
    {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
}
```

## Complete Example: Job Execution with Authentication

Here's a complete example of a job execution endpoint with authentication:

```javascript
const express = require('express');
const app = express();

app.post('/api/jobs/:jobType/instances/:instanceId', async (req, res) => {
  // Authenticate the request from Fabric
  const authenticated = await authenticateControlPlaneCall(req, res);
  if (!authenticated) {
    return; // Response already sent
  }

  const { jobType, instanceId } = req.params;
  const { workspaceId, itemId } = req.body;
  const { subjectToken, tenantId, userId } = req.authContext;

  console.log(`Starting job ${jobType} for user ${userId}`);

  try {
    // Get OneLake token to access item data
    const oneLakeToken = await getOneLakeToken(subjectToken, tenantId);

    // Read data from OneLake
    const itemData = await readItemData(oneLakeToken, workspaceId, itemId);

    // Process the job
    const result = await processJob(jobType, itemData);

    // Write results back to OneLake
    await writeResults(oneLakeToken, workspaceId, itemId, result);

    // Return success
    res.status(202).json({
      status: 'InProgress',
      instanceId: instanceId,
      message: 'Job started successfully'
    });

  } catch (error) {
    console.error(`Job ${instanceId} failed:`, error);
    res.status(500).json({
      status: 'Failed',
      instanceId: instanceId,
      error: error.message
    });
  }
});
```

## Long-Running Operations

For long-running operations like jobs, tokens may expire before completion. Implement token refresh logic:

```javascript
// Store refresh tokens securely
const tokenCache = new Map();

/**
 * Get cached token or acquire new one
 */
async function getOrRefreshToken(userToken, tenantId, scope, cacheKey) {
  const cached = tokenCache.get(cacheKey);
  
  // Check if cached token is still valid (with 5 min buffer)
  if (cached && cached.expiresAt > Date.now() + 300000) {
    return cached.token;
  }

  // Acquire new token
  const response = await getTokenForScopeWithRefresh(userToken, tenantId, scope);
  
  // Cache the token
  tokenCache.set(cacheKey, {
    token: response.access_token,
    expiresAt: Date.now() + (response.expires_in * 1000)
  });

  return response.access_token;
}
```

For more information about handling long-running OBO processes, see [Long-running OBO processes](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#long-running-obo-processes).

## Security Best Practices

### Token Storage

- Never log complete tokens - only log last 4 characters for debugging
- Store tokens securely in memory only
- Clear tokens from memory after use
- Don't persist tokens to disk or databases

### Token Validation

- Always validate both tokens in SubjectAndAppToken format
- Verify token signatures against Azure AD keys
- Check token expiration and not-before times
- Validate issuer, audience, and tenant claims
- Verify required claims (scp, idtyp, etc.)

### Environment Configuration

```javascript
// Required environment variables
const requiredEnvVars = [
  'BACKEND_APPID',           // Your workload's app registration ID
  'BACKEND_CLIENT_SECRET',   // Your app's client secret
  'TENANT_ID',               // Your publisher tenant ID
  'BACKEND_AUDIENCE'         // Expected token audience
];

// Validate on startup
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});
```

### Error Handling

```javascript
// Handle consent required errors
try {
  const token = await getTokenForScope(userToken, tenantId, scope);
} catch (error) {
  if (error.message.includes('AADSTS65001')) {
    // User consent required
    return res.status(403).json({
      error: 'ConsentRequired',
      message: 'User must consent to access this resource',
      consentUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?...`
    });
  }
  throw error;
}
```

## Troubleshooting

### Common Authentication Issues

**Error: "Invalid token format"**
- Verify the Authorization header starts with `SubjectAndAppToken1.0`
- Check that both subjectToken and appToken are present
- Ensure tokens are properly quoted in the header

**Error: "Token validation failed"**
- Verify BACKEND_APPID matches your app registration
- Check that BACKEND_AUDIENCE is correctly configured
- Ensure tokens haven't expired
- Verify issuer matches your Azure AD tenant

**Error: "Token exchange failed: AADSTS65001"**
- User consent is required for the requested scope
- Ensure your app registration has the necessary API permissions
- Verify admin consent has been granted if required

**Error: "App token not from Fabric"**
- Verify the appToken's `appid` claim matches Fabric's app ID
- Check that you're testing in the correct environment (dev/production)

## Related Content

- [Enable Remote Endpoints](how-to-enable-remote-endpoint.md)
- [Enable Remote Jobs](how-to-enable-remote-jobs.md)
- [Enable Item Lifecycle Notifications](how-to-enable-remote-item-lifecycle.md)
- [Use Endpoint Resolution Service](how-to-use-endpoint-resolution-service.md)
- [Long-running OBO processes](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#long-running-obo-processes)
- [Fabric Workload Development Sample](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample)
