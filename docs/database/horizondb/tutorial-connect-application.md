---
title: "Tutorial: Connect a PostgreSQL application to Fabric HorizonDB"
description: Query federated warehouse signals and loaded local signals through a parameterized Python application.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Tutorial: Connect a PostgreSQL application to Fabric HorizonDB

In this tutorial step, you connect a local Python application to the PostgreSQL endpoint. You query one view that reads warehouse signals through federation and another that reads signals loaded into PostgreSQL by the Copy job.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Only the Microsoft Entra identity that created the database can connect. Run this local exercise as the creator; service principals and managed identities can't connect in the current preview.

## Prerequisites

- Complete [Analyze mirrored data in a notebook](tutorial-perform-data-analysis.md).
- Keep `fabric_sales.customer_signals` from the federation step and `analytics_ops.customer_signals` from the Copy job step.
- Install Python 3.10 or later.
- Configure the connection values described in [Connect with Python](connect-python.md#configure-the-connection), including the tenant and preview token scope.

Use the PostgreSQL host from the `contoso-orders-db` item's connection pane and database name `postgres`. Don't use the Fabric item display name or the SQL analytics endpoint.

## Create application views

Run this SQL in the HorizonDB PostgreSQL editor:

```sql
CREATE OR REPLACE VIEW horizon_sample.customer_analytics AS
SELECT
    customer.customer_id,
    customer.customer_name,
    signal.risk_score,
    signal.recommended_action,
    signal.calculated_at
FROM horizon_sample.customers AS customer
JOIN fabric_sales.customer_signals AS signal
  ON signal.customer_id = customer.customer_id;

CREATE OR REPLACE VIEW horizon_sample.customer_operational_insights AS
SELECT
    customer.customer_id,
    customer.customer_name,
    signal.risk_score,
    signal.recommended_action,
    signal.calculated_at
FROM horizon_sample.customers AS customer
JOIN analytics_ops.customer_signals AS signal
  ON signal.customer_id = customer.customer_id;
```

The first view has a remote warehouse dependency at query time. The second reads only local PostgreSQL tables; its freshness depends on the last successful load and publish step. These views organize application queries; they don't enable additional PostgreSQL users.

## Create the application

Create a folder named `contoso-orders-app`, create and activate a virtual environment, and install:

```console
python -m pip install "psycopg[binary]" azure-identity
```

Create `app.py`:

```python
import os
import sys

import psycopg
from azure.identity import InteractiveBrowserCredential


customer_id = int(sys.argv[1])

with InteractiveBrowserCredential(
    tenant_id=os.environ["HORIZONDB_TENANT_ID"]
) as credential:
    token = credential.get_token(
        os.environ["HORIZONDB_TOKEN_SCOPE"]
    ).token

    with psycopg.connect(
        host=os.environ["HORIZONDB_HOST"],
        port=int(os.environ["HORIZONDB_PORT"]),
        dbname=os.environ["HORIZONDB_DATABASE"],
        user=os.environ["HORIZONDB_USER"],
        password=token,
        sslmode=os.environ["HORIZONDB_SSLMODE"],
        connect_timeout=30,
        application_name="contoso-orders-app",
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute("SET statement_timeout = '30s'")
            cursor.execute(
                """
                SELECT customer_name, risk_score,
                       recommended_action, calculated_at
                FROM horizon_sample.customer_analytics
                WHERE customer_id = %s
                """,
                (customer_id,),
            )
            print("Federated result:", cursor.fetchall())

            cursor.execute(
                """
                SELECT customer_name, risk_score,
                       recommended_action, calculated_at
                FROM horizon_sample.customer_operational_insights
                WHERE customer_id = %s
                """,
                (customer_id,),
            )
            print("Loaded local result:", cursor.fetchall())
```

The driver binds the customer ID as a parameter. Don't concatenate user input into SQL, print the token, or store credentials in source code.

## Run and validate

Load the connection environment values, then run the application with an actual customer ID from `horizon_sample.customers`. For example:

```console
python app.py 1
```

Sign in as the database creator in the browser. Confirm that both results match the selected customer's source data. If a federated query fails, investigate source permissions, capacity, and metadata separately from local PostgreSQL health. The example surfaces errors rather than silently falling back to older local data.

Use bounded retries only for safe, transient connection failures. Don't retry authentication or permission errors without correcting them, and don't replay an uncertain write transaction.

## Expected outcome

The application uses one PostgreSQL connection to query federated analytical signals and loaded operational signals. Their values can differ if the warehouse changed after the Copy job.

## Next step

> [!div class="nextstepaction"]
> [Clean up the tutorial resources](tutorial-clean-up.md)

## Related content

- [Connect with Python](connect-python.md).
- [Query Fabric data](query-fabric-data.md).
- [Load Fabric data with a Copy job](load-fabric-data-copy-job.md).
