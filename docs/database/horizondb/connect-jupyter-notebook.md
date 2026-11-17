---
title: "Quickstart: Connect to Microsoft Fabric HorizonDB from a Jupyter notebook"
description: Query Fabric HorizonDB from a Jupyter notebook with Psycopg 3 and Microsoft Entra authentication.
ms.reviewer: scoriani
ms.date: 11/06/2026
ms.topic: quickstart-sdk
ai-usage: ai-assisted
---
# Quickstart: Connect to Microsoft Fabric HorizonDB from a Jupyter notebook

This quickstart connects a local Jupyter notebook to Fabric HorizonDB by using Psycopg 3 and a Microsoft Entra access token. It queries the sample schema and creates a chart without displaying credentials.

> [!IMPORTANT]
> Fabric HorizonDB is in public preview. Capabilities, limits, and behavior might change before general availability. For more information, see [Microsoft Fabric preview features](../../fundamentals/preview.md).

## Prerequisites

- Python 3.10 or later and Visual Studio Code with the Python and Jupyter extensions, or another local Jupyter environment.
- A HorizonDB database and the sample data from [Load sample data](load-sample-data.md).
- Sign-in as the Microsoft Entra user who created the database. Other users and application principals can't connect in the current preview.
- The released Fabric HorizonDB host, port, database, user format, token scope, and TLS mode.
- A browser for interactive Microsoft Entra sign-in.

This procedure doesn't assume that a hosted Fabric notebook identity or outbound network path can connect to Fabric HorizonDB. Use that path only when it is explicitly documented for the release.

## Create the notebook environment

Create and activate a virtual environment, and then install:

```console
python -m pip install "psycopg[binary]" azure-identity pandas matplotlib ipykernel
```

Create a notebook named `horizondb-quickstart.ipynb` and select the virtual environment as its kernel.

## Configure connection values

Set connection coordinates outside the notebook, for example in the environment that launches Visual Studio Code:

```text
HORIZONDB_HOST=<postgresql-endpoint>
HORIZONDB_PORT=<port>
HORIZONDB_DATABASE=postgres
HORIZONDB_USER=<entra-identity>
HORIZONDB_TENANT_ID=<your-tenant-id>
HORIZONDB_SSLMODE=<documented-mode>
HORIZONDB_TOKEN_SCOPE=<released-token-scope>
```

Don't put a token, complete connection string, or secret in a notebook cell. Don't print `os.environ` or a credential object.

## Import packages

In the first cell, run:

```python
import os

import matplotlib.pyplot as plt
import pandas as pd
import psycopg
from azure.identity import InteractiveBrowserCredential
```

## Connect and validate

Create a fresh token and connection in one cell:

```python
credential = InteractiveBrowserCredential(
    tenant_id=os.environ["HORIZONDB_TENANT_ID"]
)
access_token = credential.get_token(
    os.environ["HORIZONDB_TOKEN_SCOPE"]
).token

connection = psycopg.connect(
    host=os.environ["HORIZONDB_HOST"],
    port=int(os.environ["HORIZONDB_PORT"]),
    dbname=os.environ["HORIZONDB_DATABASE"],
    user=os.environ["HORIZONDB_USER"],
    password=access_token,
    sslmode=os.environ["HORIZONDB_SSLMODE"],
    connect_timeout=30,
    application_name="horizondb-jupyter-quickstart",
    autocommit=True,
)
```

Validate the session without displaying the token or connection string:

```python
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
    print(cursor.fetchone())
```

Sign in as the creator in the browser. Expected output contains the database name from the connection pane (`postgres` in the current preview), the effective identity, engine version, and connection time.

## Query sample data

Use parameters for values:

```python
query = """
    SELECT
        customer.segment,
        count(order_row.order_id) AS order_count,
        coalesce(sum(order_row.total), 0) AS order_total
    FROM horizon_sample.customers AS customer
    LEFT JOIN horizon_sample.orders AS order_row
      ON order_row.customer_id = customer.customer_id
    WHERE order_row.status <> %s
    GROUP BY customer.segment
    ORDER BY customer.segment
"""

with connection.cursor() as cursor:
    cursor.execute(query, ("cancelled",))
    rows = cursor.fetchall()
    columns = [column.name for column in cursor.description]

results = pd.DataFrame(rows, columns=columns)
results["order_total"] = pd.to_numeric(results["order_total"])
results
```

The result contains one row per customer segment. Rerunning the cell doesn't modify data.

## Create a chart

```python
axis = results.plot.bar(
    x="segment",
    y="order_total",
    legend=False,
    title="Order total by customer segment",
)
axis.set_xlabel("Segment")
axis.set_ylabel("Order total")
plt.tight_layout()
plt.show()
```

## Close the connection

Run this cell before stopping the kernel:

```python
connection.close()
credential.close()
```

Acquire a fresh token and create a new connection if the notebook remains open long enough for the credential to expire, or after Fabric HorizonDB pauses or a disruptive transition occurs.

## Make notebook reruns predictable

- Keep setup, authentication, query, visualization, and cleanup in separate cells.
- Use read-only queries unless the notebook explicitly demonstrates a transaction.
- Use `CREATE ... IF NOT EXISTS` and conflict handling for rerunnable setup.
- Parameterize values.
- Close stale connections before recreating them.
- Clear outputs before sharing the notebook if they include real data, endpoints, user names, item IDs, or errors that can contain credentials.

## Troubleshoot

| Symptom | Resolution |
|---|---|
| Kernel can't import a package | Select the environment where you installed the packages and restart the kernel. |
| Credential acquisition fails | Sign in through a supported local credential and verify the tenant. |
| Authentication fails | Verify the released token scope, user format, token freshness, and system time. |
| Connection times out | The database might be resuming. Recreate the connection with bounded retry. |
| Permission denied | Confirm that you're the database creator, inspect object ownership, and verify that the operation is supported. |
| Chart is empty | Display `results`, verify the filter, and confirm the sample data exists. |
| A rerun reports a closed connection | Rerun the connection cell to acquire a fresh token and session. |

## Related content

- [Connect with Python](connect-python.md).
- [Connect to Fabric HorizonDB](connect.md).
- [Query Fabric HorizonDB](query.md).
- [Validate PostgreSQL access](configure-postgresql-access-controls.md).
