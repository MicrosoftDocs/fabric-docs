---
title: HowTo - Use Endpoint Resolution Service
description: Learn how to configure and use the Endpoint Resolution Service for dynamic endpoint routing in your custom Fabric workload.

ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 02/12/2026
ai-usage: ai-assisted
---

# How-To: Use Endpoint Resolution Service

The Endpoint Resolution Service provides dynamic endpoint routing for your custom workload, allowing you to configure where Fabric sends job execution requests and lifecycle notifications without hardcoding endpoint URLs in your manifest.

## What is Endpoint Resolution Service?

The Endpoint Resolution Service is a flexible mechanism that resolves the actual endpoint URL at runtime based on your workload configuration. Instead of specifying a fixed endpoint URL in your WorkloadManifest, you can use the Endpoint Resolution Service to:

- Route requests to different endpoints based on environment (Dev, Test, Prod)
- Update endpoint URLs without redeploying your workload manifest
- Implement blue-green deployments or A/B testing
- Manage multiple backend services for different regions or tenants

## When to use Endpoint Resolution Service

Use the Endpoint Resolution Service when you need:

- **Environment-specific routing** - Different endpoints for development, testing, and production
- **Dynamic endpoint updates** - Change backend services without updating the manifest
- **Multi-region deployments** - Route requests to region-specific endpoints
- **Flexible backend architecture** - Switch between different backend implementations

## How it works

When Fabric needs to call your remote endpoint for job execution or lifecycle notifications:

1. Fabric queries the Endpoint Resolution Service with your workload identifier
1. The service returns the appropriate endpoint URL based on your configuration
1. Fabric sends the request to the resolved endpoint
1. Your backend service processes the request and responds

This indirection layer allows you to change your backend infrastructure without modifying the workload manifest.

## Configuration

### Define the Endpoint Resolution Service in WorkloadManifest

Configure the service endpoint with the Endpoint Resolution Service flag in your WorkloadManifest:

```xml
<ServiceEndpoint>
  <Name>Backend</Name>
  <Url>https://your-resolution-service.azurewebsites.net</Url>
  <IsEndpointResolutionService>true</IsEndpointResolutionService>
</ServiceEndpoint>
```

When `<IsEndpointResolutionService>` is set to `true`, Fabric treats the URL as an endpoint resolution service rather than a direct backend endpoint. Fabric will call this service to resolve the actual endpoint URL for each request.

For comparison, a direct endpoint configuration would look like:

```xml
<ServiceEndpoint>
  <Name>Backend</Name>
  <Url>https://your-backend.azurewebsites.net/api</Url>
  <IsEndpointResolutionService>false</IsEndpointResolutionService>
</ServiceEndpoint>
```

### Implement the resolution service

Your Endpoint Resolution Service must implement the required contract to respond to resolution requests from Fabric. The service should:

1. **Authenticate requests** - Verify that requests come from Fabric
1. **Resolve endpoint URLs** - Return the appropriate backend endpoint URL
1. **Handle errors** - Provide fallback behavior for resolution failures
1. **Log resolutions** - Track which endpoints are being used

Example resolution service implementation:

```javascript
const express = require('express');
const { authenticateControlPlaneCall } = require('./authentication');

const router = express.Router();

/**
 * POST /resolve-endpoint
 * Resolve endpoint based on context
 * Uses relaxed authentication: app token required, but subject token and tenant ID header optional
 */
router.post('/resolve-endpoint', async (req, res) => {
  // Apply relaxed authentication (subject token not required for resolution)
  const authResult = await authenticateControlPlaneCall(req, res, {
    requireSubjectToken: false,
    requireTenantIdHeader: false
  });
  if (!authResult) return; // Auth failed, response already sent

  // Parse resolution request from Fabric
  const { workloadId, environment, requestType } = req.body;
  
  // Determine the appropriate endpoint based on configuration
  const endpoint = await resolveEndpoint(workloadId, environment, requestType);
  
  console.log(`Resolved endpoint: ${endpoint}`);
  
  const response = {
    url: endpoint,
    ttlInMinutes: 60 // Cache for 60 minutes
  };
  
  res.status(200).json(response);
});

async function resolveEndpoint(workloadId, environment, requestType) {
  // Implement your resolution logic here
  // This could query a database, configuration store, etc.
  
  if (environment === 'Production') {
    return 'https://prod-backend.azurewebsites.net/api';
  } else if (environment === 'Test') {
    return 'https://test-backend.azurewebsites.net/api';
  } else {
    return 'https://dev-backend.azurewebsites.net/api';
  }
}

module.exports = router;
```

## Resolution caching

Fabric caches resolved endpoints to reduce the load on your resolution service. You can control the cache duration by returning a `ttlInMinutes` value in your resolution response:

```javascript
const response = {
  url: 'https://prod-backend.azurewebsites.net/api',
  ttlInMinutes: 60 // Cache for 60 minutes
};
```

Recommended TTL values:

- **Short TTL (5-15 minutes)** - Use for frequently changing endpoints or active deployments
- **Medium TTL (30-60 minutes)** - Use for stable environments with occasional updates
- **Long TTL (120+ minutes)** - Use for production environments that rarely change
- **No TTL or 0** - Resolve on every request (not recommended for production)

## Best practices

### Reliability
- Implement redundancy for your resolution service
- Provide default/fallback endpoints for resolution failures
- Monitor resolution service health and performance

### Security
- Authenticate all resolution requests from Fabric
- Use HTTPS for all communication
- Validate and sanitize resolution inputs
- Don't expose sensitive configuration in resolution responses

### Performance
- Use appropriate cache TTLs to balance freshness and performance
- Implement efficient resolution logic (avoid slow database queries)
- Consider geographic distribution of your resolution service

### Monitoring
- Log all resolution requests and responses
- Track resolution failures and fallback usage
- Monitor cache hit rates and TTL effectiveness
- Set up alerts for resolution service failures

## Example scenarios

### Blue-green deployment

Use the Endpoint Resolution Service to switch between blue and green deployments:

```javascript
async function resolveEndpoint(workloadId) {
  const activeDeployment = await getActiveDeployment(workloadId);
  
  if (activeDeployment === 'Blue') {
    return 'https://blue-backend.azurewebsites.net/api';
  } else {
    return 'https://green-backend.azurewebsites.net/api';
  }
}
```

### Region-specific routing

Route requests to region-specific endpoints:

```javascript
async function resolveEndpoint(workloadId, region) {
  switch (region) {
    case 'WestUS':
      return 'https://westus-backend.azurewebsites.net/api';
    case 'EastUS':
      return 'https://eastus-backend.azurewebsites.net/api';
    case 'WestEurope':
      return 'https://westeu-backend.azurewebsites.net/api';
    default:
      return 'https://global-backend.azurewebsites.net/api';
  }
}
```

### Environment-based routing

Route based on environment:

```javascript
async function resolveEndpoint(environment) {
  if (environment === 'Production') {
    return 'https://prod-backend.azurewebsites.net/api';
  } else if (environment === 'Staging') {
    return 'https://staging-backend.azurewebsites.net/api';
  } else if (environment === 'Test') {
    return 'https://test-backend.azurewebsites.net/api';
  } else {
    return 'https://dev-backend.azurewebsites.net/api';
  }
}
```

## Troubleshooting

### Resolution failures

If endpoint resolution fails:

1. Check resolution service logs for errors
1. Verify authentication configuration
1. Test resolution service endpoint directly
1. Check network connectivity from Fabric to your service
1. Verify SSL/TLS certificate validity

### Incorrect endpoint routing

If requests go to the wrong endpoint:

1. Check resolution logic and configuration
1. Verify cache TTL settings
1. Check for stale cached entries
1. Review resolution service logs for the specific request

## Related content

- [Enable Remote Endpoints for Custom Items](how-to-enable-remote-endpoint.md)
- [Define Jobs for Your Workload](how-to-enable-remote-jobs.md)
- [Enable Item Lifecycle Notifications](how-to-enable-remote-item-lifecycle.md)
- [Manifest Overview](manifest-overview.md)
