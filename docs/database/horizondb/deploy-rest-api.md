---
title: "Manage Microsoft Fabric HorizonDB with the REST API"
description: Confirm an applicable Fabric HorizonDB REST contract before automating preview management operations.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: how-to
ms.search.form: Fabric HorizonDB REST API, PostgreSQL database deployment
ai-usage: ai-assisted
---
# Manage Microsoft Fabric HorizonDB with the REST API

The current preview onboarding procedure creates Fabric HorizonDB databases in the portal. It doesn't establish support for REST management operations. Before automating, confirm that a current Microsoft Fabric REST API reference explicitly supports the HorizonDB operation in your preview.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- An eligible Fabric workspace assigned to active capacity.
- Fabric HorizonDB availability in the workspace region.
- A Microsoft Entra identity with the workspace role and API permissions listed for the released Fabric HorizonDB operation.
- The workspace ID.
- A client that can acquire and protect a token for the Fabric API.

## Use the released contract

Before you write automation:

1. Open the [Fabric REST API reference](/rest/api/fabric/articles/).
1. Confirm that the operation explicitly applies to Fabric HorizonDB.
1. Use the documented path, API version, authentication requirements, permissions, headers, request body, response body, and status handling.
1. Follow any referenced Microsoft Fabric guidance for asynchronous operations, errors, throttling, and retries.
1. Test the operation in a nonproduction workspace before you add it to managed automation.

Don't copy an endpoint, payload, item type, or property from another Fabric database product. During public preview, the supported contract can change, so validate automation against the current reference before deployment.

Include only properties that an applicable HorizonDB schema identifies as writable. If no applicable contract is available, use the [portal creation procedure](create.md) instead of inferring an API from another Fabric item.

## Acquire a Fabric API token

Use a supported Microsoft Entra authentication library or Azure CLI to acquire an access token for the Fabric API. The public Fabric resource is:

```text
https://api.fabric.microsoft.com
```

For OAuth libraries that require a scope, use the scope documented in the current [Fabric REST API authentication guidance](/rest/api/fabric/articles/get-started/fabric-api-quickstart). Don't put the token in a URL, log, committed file, or command transcript.

Send the token as documented over HTTPS. Grant the calling identity only the permissions required for the operation.

## Send and validate a request

1. Build the request from the current Fabric HorizonDB API reference.
1. Include only documented values and writable properties.
1. Submit the request, and process the response exactly as the operation reference specifies.
1. Save nonsensitive resource, request, operation, and correlation identifiers returned by the service for troubleshooting.
1. After the management operation succeeds, read the item again and confirm the effective configuration.
1. For creation, connect as the database creator and run:

   ```sql
   SELECT
       current_database() AS database_name,
       current_user AS signed_in_user,
       current_setting('server_version') AS server_version,
       clock_timestamp() AS validated_at;
   ```

Only the Microsoft Entra identity that created the database can connect to PostgreSQL in the current preview. A management API permission doesn't enable service-principal or managed-identity PostgreSQL connections.

## Handle errors safely

- Treat the documented response and error contract as authoritative.
- Correct validation and authorization failures before retrying.
- Use bounded retries only when the released operation guidance identifies the request as safe to retry.
- Don't log access tokens, authorization headers, request bodies that contain sensitive values, or unreviewed service responses.
- Preserve correlation information before contacting support.
- Before deletion, review dependencies. Treat deletion as irreversible during public preview.

## Related content

- [Creation options](create-options.md).
- [Fabric REST API authentication](/rest/api/fabric/articles/get-started/fabric-api-quickstart).
- [Troubleshoot Fabric HorizonDB](troubleshoot.md).
