---
title: Authentication overview for Microsoft Fabric Extensibility Toolkit
description: This article describes how to use tokens to authenticate for a Fabric extensibility toolkit workload.
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# FET Authentication overview

Fabric Extensibility Toolkit workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization. The toolkit uses a frontend-only architecture that simplifies the authentication flow compared to traditional workloads with separate backend components.

All interactions between your workload frontend and Fabric, Azure, or external services must be accompanied by proper authentication support. The toolkit handles token acquisition and management through JavaScript APIs that integrate seamlessly with the Fabric platform.

It's recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It's also recommended to go over [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist).

## Frontend-only authentication flow

The Extensibility Toolkit uses a simplified authentication model where your frontend application directly authenticates with various services:

* **Frontend to Fabric APIs**: Your workload frontend uses tokens to call Fabric REST APIs directly
* **Frontend to Azure services**: Use the same tokens to authenticate against Azure services like storage, Key Vault, and other Entra-secured applications
* **Frontend to external services**: Authenticate against any Entra-secured application using the acquired tokens

### Token versatility

The tokens acquired through the Extensibility Toolkit can be used to authenticate against:

* **Fabric APIs**: Access workspaces, items, and platform features
* **Azure services**: Storage accounts, Key Vault, databases, and other Azure resources  
* **Custom applications**: Any Entra-secured application you own or have been granted access to
* **Third-party services**: External services that support Entra ID authentication

### Scope abstraction

The Extensibility Toolkit provides abstracted authentication through client libraries:

* **Fabric scopes**: Required scopes for Fabric APIs are automatically managed by the toolkit's client libraries
* **Azure scopes**: Standard Azure service scopes are handled transparently
* **Custom scopes**: You can specify additional scopes for your own applications

## Authentication JavaScript API

The Fabric frontend offers a JavaScript API for Extensibility Toolkit workloads to acquire tokens for authentication. The API handles:

* Token acquisition for your workload
* Consent management for required permissions
* Token refresh and expiration handling
* Integration with Fabric's security context

For detailed information about using the authentication API, see [Authentication JavaScript API](./authentication-javascript-api.md).

To understand why consents are required, review [User and admin consent in Microsoft Entra ID](/entra/identity/enterprise-apps/user-admin-consent-overview).

#### How consents work in Extensibility Toolkit workloads

The Extensibility Toolkit simplifies consent management:

1. **Automatic consent prompting**: When your workload needs access to a service, the platform automatically prompts for consent
2. **Redirect handling**: The toolkit manages consent redirects and popup closure automatically
3. **Consent caching**: Once granted, consents are cached and reused for subsequent requests
4. **Granular permissions**: You can request specific scopes for different services as needed

## Authentication setup

Before using authentication in your workload:

- **Register your application** in Microsoft Entra ID
- **Configure redirect URIs** for your workload
- **Set required permissions** for Fabric and any external services
- **Test authentication flow** in your development environment

For step-by-step authentication setup instructions, see [Authentication guidelines](./authentication-guidelines.md).

## Related content

* [Authentication JavaScript API](./authentication-javascript-api.md)
* [Authentication guidelines](./authentication-guidelines.md)
