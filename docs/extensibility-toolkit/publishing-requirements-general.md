---
title: General Publishing Requirements
description: Learn about the general requirements for publishing Fabric Extensibility Toolkit workloads, including infrastructure, hosting, and authentication setup.
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 12/15/2025
---

# General publishing requirements

> [!IMPORTANT]
> These requirements apply to ALL publishing scenarios (both internal and cross-tenant publishing)

General requirements for all Microsoft Fabric Extensibility Toolkit workloads:

- **Microsoft Entra custom domain verification**: Required for Entra App verification and proper resource ID configuration
- **Complete workload development**: Your workload must be fully developed and tested
- **Manifest configuration**: Prepare your workload manifest according to Fabric specifications  
- **Authentication setup**: Configure Microsoft Entra application registration for your workload
- **Infrastructure and hosting**: Meet hosting, security, and performance requirements

## Microsoft Entra Requirements

### Custom Domain Verification

You must have a verified custom domain in your Entra tenant for Entra App verification and resource ID configuration.

- **Requirement**: Verified custom domain (e.g., `contoso.com`)
- **Frontend domain**: Must be a subdomain of your verified Entra domain
- **Restrictions**: No `*.onmicrosoft` subdomains

### Resource ID Format

```http
https://<verified-domain>/<frontend>/<backend>/<workload-id>/<optional>
```

**Example**: `https://datafactory.contoso.com/feserver/beserver/Fabric.WorkloadSample/123`

### Application Registration

- **Type**: Web application
- **Tenant support**: Multitenant (required for cross-tenant publishing)
- **Redirect URI**: `{frontend-url}/close`
- **Application ID URI**: Must match verified domain
- **Permissions**: Microsoft Fabric APIs

### Domain Configuration

> [!IMPORTANT]
> The frontend domain must **always** be a subdomain of your verified Entra domain.

Frontend and backend URLs must be subdomains of the `resourceId` value:

- **Frontend domain requirement**: Must be a subdomain of your verified Entra domain
- **Domain relationship**: Maximum of one extra segment beyond the verified domain
- **Reply URL domain**: Must match the frontend host domain
- **HTTPS requirement**: All endpoints must use HTTPS

**Example Configuration:**
- Resource ID: `https://datafactory.contoso.com/feserver/beserver/Fabric.WorkloadSample/123`
- Frontend: `https://feserver.datafactory.contoso.com`
- Backend: `https://beserver.datafactory.contoso.com/workload`
- Redirect URI: `https://feserver.datafactory.contoso.com/close`

## Workload Development Requirements

### Complete Development and Testing

- **Functional completeness**: All planned features implemented and working
- **Integration testing**: Tested within Fabric environment using the dev gateway
- **Error handling**: Proper error handling and user feedback mechanisms

### Manifest Configuration


Endpoint values in your manifest are typically set using placeholders such as `{{FRONTEND_URL}}`, which are replaced with values from your `.env` file during the build process. Update the `.env` file to set the correct URLs for your deployment environment.

Configure the workload endpoints in your manifest:

```xml
<CloudServiceConfiguration>
    <Cloud>Public</Cloud>
    <Endpoints>
        <ServiceEndpoint>
        <Name>Frontend</Name>
        <Url>https://feserver.datafactory.contoso.com</Url>
        </ServiceEndpoint>
    </Endpoints>
</CloudServiceConfiguration>
```

Under the `AADApp` section in `WorkloadManifest.xml`:
- **AppId**: Your Microsoft Entra application ID
- **redirectUri**: Frontend URL with `/close` suffix
- **ResourceId**: The properly formatted resource ID URI

## Infrastructure Requirements

### Hosting Requirements

- **HTTPS**: All endpoints must use HTTPS with valid SSL certificates
- **Availability**: Minimum 99.9% uptime SLA
- **Performance**: Page load times under 3 seconds
- **CORS**: Configure CORS to allow Fabric domains (`*.powerbi.com`, `*.fabric.microsoft.com`)

### Content Security Policy (CSP)

Configure CSP headers to ensure compatibility with Fabric:
- **Frame ancestors**: Allow Fabric domains to embed your workload
- **Script and style sources**: Configure safe sources for your application

### Configuration

**Frontend Configuration**:
- **WORKLOAD_NAME**: Your workload identifier
- **WORKLOAD_VERSION**: The version of your workload
- **FRONTEND_URL**: The frontend URL for your workload (typically set as `{{FRONTEND_URL}}` in the manifest and replaced from the .env file)
- **FRONTEND_APPID**: The frontend application ID (typically set as `{{FRONTEND_APPID}}` in the manifest and replaced from the .env file)

**Backend Configuration** (if applicable):
Backend configurations are currently not supported.

## Security Requirements

### Authentication and Authorization

- **OAuth 2.0 compliance**: Use standard OAuth 2.0 flows
- **Token validation**: Proper validation of access tokens
- **Permission validation**: Verify user permissions before allowing access

### Data Protection

- **Data encryption**: Encrypt data in transit and at rest
- **Input validation**: Validate and sanitize all user inputs
- **Security headers**: Implement appropriate security headers

## Next steps

- [Publishing Overview](./publishing-overview.md)
- [Authentication Guidelines](./authentication-guidelines.md)
- [Tutorial: Host Workload in Azure](./tutorial-host-workload-in-azure.md)
