---
title: "Quickstart: Connect to Microsoft Fabric HorizonDB with Python and psycopg"
description: Connect a Python application to Fabric HorizonDB with Psycopg 3 and Microsoft Entra authentication.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: quickstart-sdk
ai-usage: ai-assisted
---
# Quickstart: Connect to Microsoft Fabric HorizonDB with Python and psycopg

This quickstart uses Psycopg 3 (`psycopg`) and `azure-identity` to connect to Fabric HorizonDB with a Microsoft Entra access token.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Python 3.10 or later.
- A Fabric HorizonDB database with the [sample schema and data](load-sample-data.md) loaded.
- Sign-in as the Microsoft Entra user who created the database. Other users, service principals, and managed identities can't connect in the current preview.
- The host, port, database, user format, token scope, and TLS mode shown by the released Fabric HorizonDB connection experience.
- A browser for interactive Microsoft Entra sign-in.

Don't copy a token or complete connection string into source code.

## Create the project

```console
mkdir horizondb-python
cd horizondb-python
python -m venv .venv
```

Activate the virtual environment for your shell, and then install the dependencies:

```console
python -m pip install "psycopg[binary]" azure-identity
```

For deployed applications, evaluate `psycopg` installation options and pin reviewed dependency versions.

## Configure the connection

Set these environment variables from the Fabric HorizonDB connection experience:

```text
HORIZONDB_HOST=<postgresql-endpoint>
HORIZONDB_PORT=<port>
HORIZONDB_DATABASE=postgres
HORIZONDB_USER=<entra-identity>
HORIZONDB_TENANT_ID=<your-tenant-id>
HORIZONDB_SSLMODE=<documented-mode>
HORIZONDB_TOKEN_SCOPE=<released-token-scope>
```

The token scope is service-specific. Confirm it for your preview rather than reusing a scope from another service. The database name is `postgres` in the current preview, even when the Fabric item has another display name.

## Create the application

Create `main.py`:

```python
import os
import psycopg
from azure.identity import InteractiveBrowserCredential


credential = InteractiveBrowserCredential(
    tenant_id=os.environ["HORIZONDB_TENANT_ID"]
)


def open_connection() -> psycopg.Connection:
    access_token = credential.get_token(
        os.environ["HORIZONDB_TOKEN_SCOPE"]
    ).token

    return psycopg.connect(
        host=os.environ["HORIZONDB_HOST"],
        port=int(os.environ["HORIZONDB_PORT"]),
        dbname=os.environ["HORIZONDB_DATABASE"],
        user=os.environ["HORIZONDB_USER"],
        password=access_token,
        sslmode=os.environ["HORIZONDB_SSLMODE"],
        connect_timeout=30,
        application_name="horizondb-python-quickstart",
    )


with open_connection() as connection:
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT
                current_database(),
                current_user,
                current_setting('server_version'),
                clock_timestamp()
            """
        )
        database_name, signed_in_user, server_version, connected_at = (
            cursor.fetchone()
        )
        print(database_name, signed_in_user, server_version, connected_at)

        cursor.execute(
            """
            SELECT
                customer.customer_name,
                count(order_row.order_id) AS order_count,
                coalesce(sum(order_row.total), 0) AS order_total
            FROM horizon_sample.customers AS customer
            LEFT JOIN horizon_sample.orders AS order_row
              ON order_row.customer_id = customer.customer_id
            WHERE customer.segment = %s
            GROUP BY customer.customer_id, customer.customer_name
            ORDER BY customer.customer_name
            """,
            ("Enterprise",),
        )

        for customer_name, order_count, order_total in cursor:
            print(customer_name, order_count, order_total)

credential.close()
```

Use query parameters for values. Don't interpolate user input with f-strings or string concatenation. This example uses interactive sign-in so that you can explicitly select the database creator rather than silently using a hosted workload identity.

## Run the application

Load the required environment variables in your current shell and run the application. In the browser, sign in as the database creator:

```console
python main.py
```

Expected output includes:

- The database name.
- The effective identity for your Microsoft Entra principal.
- The PostgreSQL version used by your preview database.
- The sample customer aggregates if you completed [Load sample data](load-sample-data.md).

The example surfaces connection and query errors. If the database is resuming, allow startup time and use bounded connection retries as described in [Connect to Fabric HorizonDB](connect.md#retry-safely-after-pause-or-a-transition). Don't retry authentication or permission failures without correcting their cause.

## Add safe transaction retry

Only retry a transaction when PostgreSQL reports a retryable transaction abort and your application can safely repeat the complete unit of work. Use a stable application-level idempotency key for operations that must not be applied twice.

Never blindly retry after a connection loss during `COMMIT`. The commit result can be indeterminate. Reconnect and reconcile the business operation before deciding whether to submit it again.

## Use connection pools

For a long-running application:

- Acquire a fresh token when the pool creates a new physical connection.
- Recycle connections before token expiry.
- Validate connections borrowed after pause, scaling, or maintenance.
- Bound the pool size and connection wait time.
- Recreate broken connections.
- Don't substitute another identity when refreshing a connection.

## Troubleshoot

| Error | Resolution |
|---|---|
| `KeyError` for an environment variable | Define every required setting from the Fabric HorizonDB connection experience. |
| Credential acquisition fails | Verify the tenant and sign in interactively as the database creator. |
| Authentication fails | Verify the released scope, tenant, user format, token freshness, and system clock. |
| TLS or certificate validation fails | Use the Fabric HorizonDB TLS guidance; don't weaken verification to hide a configuration error. |
| Connection times out after idle time | Allow bounded retries while the database resumes, and inspect item state. |
| `permission denied` | Confirm the creator's identity, object ownership, and supported operation. |
| Relation doesn't exist | Run [Load sample data](load-sample-data.md) or use your own schema and table names. |

## Clean up

Deactivate the virtual environment when you're finished. Remove local environment files that contain connection configuration, and don't commit them.

## Related content

- [Connect to Fabric HorizonDB](connect.md).
- [Authentication](authentication.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
- [Psycopg documentation](https://www.psycopg.org/psycopg3/docs/).
