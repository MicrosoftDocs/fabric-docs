---
title: "Authentication in Microsoft Fabric HorizonDB"
description: Learn how Microsoft Entra authentication works for users and applications that connect to Fabric HorizonDB.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: concept-article
ms.search.form: Fabric HorizonDB authentication, PostgreSQL Microsoft Entra
ai-usage: ai-assisted
---
# Authentication in Microsoft Fabric HorizonDB

Fabric HorizonDB uses Microsoft Entra authentication for PostgreSQL connections. The calling principal determines the effective PostgreSQL identity.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Only the Microsoft Entra identity that created the database can connect. Other users and principals can't connect, even if they can open the Fabric item. Use connection details from your own database. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Authentication and authorization are different

Authentication verifies the identity. Authorization determines what that identity can do.

A successful sign-in doesn't by itself grant:

- Access to the Fabric workspace or item.
- PostgreSQL `CONNECT` privilege.
- Schema `USAGE`.
- Table, sequence, function, or DDL privileges.
- Access to a federation source, Copy job source, or SQL analytics endpoint.

For authorization, see [Authorization](authorization.md).

## Supported identity patterns

Sign in as the database creator for the Fabric SQL editor, Visual Studio Code, application exercises, and Copy job destination connection. Microsoft Entra groups, service principals, managed identities, and other Microsoft Entra users aren't supported for PostgreSQL connections in the current preview.

## Interactive clients

For the Fabric SQL editor, the service uses your signed-in Fabric context. The calling principal determines the effective PostgreSQL identity.

For Visual Studio Code:

1. Install the Microsoft PostgreSQL extension, version 1.34.0 or later. If you upgrade the extension, restart the Visual Studio Code window before connecting.
1. Select **Visual Studio Code** in the Fabric HorizonDB toolbar, and then select **Open in VS Code** in the connection pane.
1. Select **Entra Auth**.
1. Sign in to the correct tenant as the database creator.
1. Verify the host, database, user format, and TLS configuration.
1. Run:

   ```sql
   SELECT
       current_database(),
       current_user,
       clock_timestamp();
   ```

## Application authentication

An application should:

1. Load nonsensitive connection coordinates from configuration.
1. Use the database creator's Microsoft Entra identity for the preview exercise.
1. Request a token using the audience or scope specified for your preview connection.
1. Open a TLS-protected PostgreSQL connection and provide the token as the password-equivalent credential.
1. Set a finite connection timeout and a nonsensitive application name.
1. Discard the token when no longer needed.

Don't substitute a service principal or managed identity for the creator. For a local Python exercise, use Psycopg 3 and an explicit interactive credential. See [Connect with Python](connect-python.md).

## Token and pool lifecycle

Token validation occurs when a physical connection is established. An existing session isn't automatically reauthenticated before every statement.

- Acquire a fresh token for each new physical connection or pool refresh.
- Replace pooled connections before token expiry.
- Validate borrowed connections after pause, scaling, or maintenance.
- Bound retry and never retry an invalid or expired credential indefinitely.

Changing Fabric item permissions doesn't enable additional PostgreSQL identities in the current preview.

## Validate the authenticated identity

Run:

```sql
SELECT
    current_database() AS database_name,
    current_user AS current_role,
    session_user AS session_role,
    pg_backend_pid() AS session_id,
    clock_timestamp() AS checked_at;
```

Confirm that the returned identity represents the database creator or its mapped database identity. Don't create PostgreSQL login roles to bypass the preview restriction.

## Troubleshoot authentication

| Symptom | Check |
|---|---|
| Token acquisition fails | Credential configuration, tenant selection, conditional access, and local sign-in state. |
| PostgreSQL rejects the credential | Token scope or audience, expiry, tenant, user format, server clock, and endpoint. |
| Portal works but application fails | Compare the identity, database, user format, token flow, TLS mode, and effective database access. |
| Another user can't connect | Expected in the current preview. Reconnect as the database creator; sharing the item doesn't enable another PostgreSQL identity. |
| Authentication works but query is denied | Verify the current database, object ownership, and whether the operation is supported. |
| Database is paused | Use bounded connection retry while an authorized connection starts resume. |

Capture the sanitized error category, UTC timestamp, client and driver version, and correlation ID. Never send the token or complete connection string.

## Limitations

- Password authentication isn't documented as the public preview identity model.
- Customer superuser and host authentication configuration aren't available.
- Only the database creator can connect; additional users and application principals aren't supported.
- Sharing isn't a workaround for the creator-only restriction.
- Don't assume SQL role administration or granular multiuser access is available.
- TLS and endpoint values aren't interchangeable with another service.

## Related content

- [Connect to Fabric HorizonDB](connect.md).
- [Authorization](authorization.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
- [Security overview](security-overview.md).
