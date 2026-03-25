---
title: Getting started with High Concurrency with Livy Endpoint
description: Learn about acquiring High Concurrency Spark Session for the Microsoft Fabric Livy API
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.search.form: Get started with High Concurrency with the Livy API for Data Engineering
ms.date: 02/26/2026
---
# Get started with the Livy API for Fabric High Concurrency Sessions

**Applies to:** ✅ Fabric Data Engineering and Data Science

Learn how to acquire Spark High Concurrency (HC) sessions, demonstrate **session packing**, execute statements in parallel, and verify **REPL isolation** using the Livy API for Fabric Data Engineering.

## Prerequisites

- [Fabric Premium or Trial capacity](https://learn.microsoft.com/en-us/fabric/fundamentals/fabric-trial) with a Lakehouse
- A remote client such as [Visual Studio Code](https://code.visualstudio.com/) with [PySpark](https://code.visualstudio.com/docs/python/python-quick-start) and Python 3.10+
- A Microsoft Entra service principal (SPN) with workspace access. [Register an application with the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- A client secret for the service principal. [Add and manage application credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials?tabs=client-secret)

Replace the placeholders `{Entra_TenantID}`, `{Entra_ClientID}`, `{Entra_ClientSecret}`, `{Fabric_WorkspaceID}`, and `{Fabric_LakehouseID}` with your values when following the examples in this article.

## What are High Concurrency sessions?

High Concurrency (HC) sessions allow multiple users or processes to share a single Spark session. Each caller gets an isolated **REPL** (Read-Eval-Print Loop) within the shared session, so statements from different callers don't interfere with each other.

### Session packing

When two HC sessions are created with the same **`sessionTag`**, the Fabric API packs them onto the **same underlying Livy session**. Each HC session gets its own REPL, providing:

- **Resource efficiency** — Multiple users share one Spark session instead of each spinning up their own.
- **REPL isolation** — Variables and state in one REPL are not visible to others.
- **Parallel execution** — Statements on different REPLs can run concurrently.

### Key IDs

| ID | Unique per… | Used for |
|----|------------|----------|
| HC session `id` | HC session | Poll status, delete session |
| `sessionId` | Livy session (**shared** when packed!) | Statement URLs |
| `replId` | REPL (isolated context) | Statement URLs |

> **Important:** The `sessionId` and `replId` are only available once the HC session reaches the `Idle` state.

### How HC sessions differ from regular Livy sessions

| Aspect | Regular Livy Session | HC Session |
|--------|---------------------|------------|
| **Endpoint** | `.../sessions` | `.../highConcurrencySessions` |
| **Statements** | Submitted directly to the session | Submitted through a **REPL** (`/repls/{replId}/statements`) |
| **Acquisition** | Session becomes `idle` directly | `NotStarted` → `AcquiringHighConcurrencySession` → `Idle` |
| **Session packing** | Not applicable | Optional `sessionTag` to share underlying Spark sessions |

## Get started with Livy API HC Session

### 1. Authenticate with Microsoft Entra
Acquire an access token using the SPN client-credentials flow. Replace the placeholder values below with your actual credentials.

```python
from msal import ConfidentialClientApplication

# Configuration — Replace with your actual values
tenant_id = "{Entra_TenantID}"       # Microsoft Entra tenant ID
client_id = "{Entra_ClientID}"       # Service principal application ID
client_secret = "{Entra_ClientSecret}"  # Service principal client secret

# OAuth settings
authority = f"https://login.microsoftonline.com/{tenant_id}"
scope = "https://analysis.windows.net/powerbi/api/.default"

app = ConfidentialClientApplication(
    client_id=client_id,
    authority=authority,
    client_credential=client_secret,
)

result = app.acquire_token_for_client(scopes=[scope])

if "access_token" in result:
    token = result["access_token"]
    print("Access token acquired successfully.")
else:
    raise RuntimeError(
        f"Failed to acquire token: {result.get('error_description', 'unknown error')}"
    )
```

### 2. Create two HC sessions with the same session tag
We create two HC sessions using `sessionTag: "demo-tag"`. Because they share the same tag, the Fabric API will pack them onto the **same underlying Livy session**, giving each one its own isolated REPL.

```python
import json
import requests

# Fabric resource IDs — Replace with your actual values
workspace_id = "{Fabric_WorkspaceID}"
lakehouse_id = "{Fabric_LakehouseID}"

# Construct the HC session endpoint URL
livy_base_url = (
    f"https://api.fabric.microsoft.com/v1"
    f"/workspaces/{workspace_id}"
    f"/lakehouses/{lakehouse_id}"
    f"/livyapi/versions/2023-12-01"
    f"/highConcurrencySessions"
)

headers = {"Authorization": f"Bearer {token}"}
session_tag = "demo-tag"

print(f"HC session endpoint: {livy_base_url}")
print(f"Session tag: {session_tag}")
print()

# Create HC Session A
print("Creating HC Session A...")
resp_a = requests.post(livy_base_url, headers=headers, json={"sessionTag": session_tag})
assert resp_a.status_code == 202, f"Failed: {resp_a.status_code} — {resp_a.text}"
session_a = resp_a.json()
hc_id_a = session_a["id"]
print(f"  HC session A id: {hc_id_a}  state: {session_a['state']}")

# Create HC Session B
print("Creating HC Session B...")
resp_b = requests.post(livy_base_url, headers=headers, json={"sessionTag": session_tag})
assert resp_b.status_code == 202, f"Failed: {resp_b.status_code} — {resp_b.text}"
session_b = resp_b.json()
hc_id_b = session_b["id"]
print(f"  HC session B id: {hc_id_b}  state: {session_b['state']}")

session_url_a = f"{livy_base_url}/{hc_id_a}"
session_url_b = f"{livy_base_url}/{hc_id_b}"
```

### 3. Poll both sessions until ready and verify session packing

Each session transitions: `NotStarted` → `AcquiringHighConcurrencySession` → `Idle`.

Once both are `Idle`, we verify:
- `hc_id_a ≠ hc_id_b` — different HC sessions
- `sessionId_a == sessionId_b` — **same** underlying Livy session (packing!)
- `replId_a ≠ replId_b` — different isolated REPLs

```python
import time

ACQUIRING_STATES = {"NotStarted", "starting", "AcquiringHighConcurrencySession"}
POLL_INTERVAL = 5

def poll_until_ready(url, label):
    """Poll an HC session until it leaves the acquisition states."""
    print(f"[{label}] Polling...")
    while True:
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        state = data.get("state", "unknown")
        print(f"  [{label}] state={state}  sessionId={data.get('sessionId', 'N/A')}  replId={data.get('replId', 'N/A')}")
        if state in ("Dead", "Killed", "Failed"):
            raise RuntimeError(f"[{label}] Session failed: {state}")
        if state not in ACQUIRING_STATES:
            return data
        time.sleep(POLL_INTERVAL)

ready_a = poll_until_ready(session_url_a, "A")
ready_b = poll_until_ready(session_url_b, "B")

livy_session_id_a = ready_a["sessionId"]
livy_session_id_b = ready_b["sessionId"]
repl_id_a = ready_a["replId"]
repl_id_b = ready_b["replId"]

print()
print("═" * 50)
print("SESSION PACKING VERIFICATION")
print("═" * 50)
print(f"HC session A id:    {hc_id_a}")
print(f"HC session B id:    {hc_id_b}")
print(f"HC IDs differ:      {hc_id_a != hc_id_b}")
print()
print(f"Livy sessionId A:   {livy_session_id_a}")
print(f"Livy sessionId B:   {livy_session_id_b}")
print(f"Same Livy session:  {livy_session_id_a == livy_session_id_b}  ← session packing!")
print()
print(f"REPL A:             {repl_id_a}")
print(f"REPL B:             {repl_id_b}")
print(f"REPLs differ:       {repl_id_a != repl_id_b}")
```

### 4. Submit statements to both REPLs in parallel

We fire two POST requests (one per REPL) before polling either for results. Because the REPLs share the same Spark session, both statements can execute concurrently.

```python
# Build statement URLs for each REPL
stmts_url_a = f"{livy_base_url}/{livy_session_id_a}/repls/{repl_id_a}/statements"
stmts_url_b = f"{livy_base_url}/{livy_session_id_b}/repls/{repl_id_b}/statements"

# Fire both statement POSTs before polling
print("Submitting to REPL A: print('Hello from REPL A')")
resp_a = requests.post(stmts_url_a, headers=headers, json={"code": "print('Hello from REPL A')", "kind": "pyspark"})
assert resp_a.status_code in (200, 201), f"Failed: {resp_a.text}"
stmt_a = resp_a.json()
stmt_url_a = f"{stmts_url_a}/{stmt_a['id']}"

print("Submitting to REPL B: print('Hello from REPL B')")
resp_b = requests.post(stmts_url_b, headers=headers, json={"code": "print('Hello from REPL B')", "kind": "pyspark"})
assert resp_b.status_code in (200, 201), f"Failed: {resp_b.text}"
stmt_b = resp_b.json()
stmt_url_b = f"{stmts_url_b}/{stmt_b['id']}"

print("Both statements submitted — polling for results...")

# Poll both statements
def poll_statement(url, label):
    while True:
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()
        if data.get("state") not in ("waiting", "running"):
            return data
        time.sleep(5)

result_a = poll_statement(stmt_url_a, "A")
result_b = poll_statement(stmt_url_b, "B")

output_a = result_a.get("output", {}).get("data", {}).get("text/plain", "")
output_b = result_b.get("output", {}).get("data", {}).get("text/plain", "")

print()
print("═" * 50)
print("PARALLEL EXECUTION RESULTS")
print("═" * 50)
print(f"REPL A output: {output_a}")
print(f"REPL B output: {output_b}")
```

### 5. Demonstrate REPL isolation

Set a variable `x = 42` in REPL A, then try to access it from REPL B. This proves that even though both REPLs share the same Spark session, their **variables are isolated**.

```python
# Set x = 42 in REPL A
print("[A] Setting x = 42...")
resp = requests.post(stmts_url_a, headers=headers, json={"code": "x = 42; print(x)", "kind": "pyspark"})
stmt_url = f"{stmts_url_a}/{resp.json()['id']}"
result_a = poll_statement(stmt_url, "A")
output_a = result_a.get("output", {}).get("data", {}).get("text/plain", "")
print(f"[A] Output: {output_a}")

# Try to read x from REPL B — should get NameError
print("\n[B] Trying to read x (expect NameError)...")
code_b = "try:\n    print(x)\nexcept NameError as e:\n    print(f'NameError: {e}')"
resp = requests.post(stmts_url_b, headers=headers, json={"code": code_b, "kind": "pyspark"})
stmt_url = f"{stmts_url_b}/{resp.json()['id']}"
result_b = poll_statement(stmt_url, "B")
output_b = result_b.get("output", {}).get("data", {}).get("text/plain", "")
print(f"[B] Output: {output_b}")

print()
print("═" * 50)
print("REPL ISOLATION RESULTS")
print("═" * 50)
print(f"REPL A (x = 42): {output_a}")
print(f"REPL B (print(x)): {output_b}  ← variable not shared!")
```

### 6. Clean up both HC sessions

Delete both HC sessions to release resources. Use the HC session `id` (not the underlying `sessionId`).

```python
for label, url in [("A", session_url_a), ("B", session_url_b)]:
    print(f"[{label}] Deleting HC session...")
    resp = requests.delete(url, headers=headers)
    if resp.status_code in (200, 204):
        print(f"[{label}] Deleted successfully.")
    elif resp.status_code == 404:
        print(f"[{label}] Already deleted.")
    else:
        print(f"[{label}] Unexpected response: {resp.status_code} — {resp.text}")
```

## View your jobs in the Monitoring hub

1. Navigate to **Monitor** in the left-side navigation.
2. Select the most recent activity name to view session details.
3. You'll see both HC sessions sharing the same underlying Spark session.

## API endpoints reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create HC session | `POST` | `/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/livyapi/versions/2023-12-01/highConcurrencySessions` |
| Get HC session | `GET` | `…/highConcurrencySessions/{highConcurrencySessionId}` |
| Delete HC session | `DELETE` | `…/highConcurrencySessions/{highConcurrencySessionId}` |
| Submit statement | `POST` | `…/highConcurrencySessions/{sessionId}/repls/{replId}/statements` |
| Get statement | `GET` | `…/highConcurrencySessions/{sessionId}/repls/{replId}/statements/{statementId}` |
| Cancel statement | `POST` | `…/highConcurrencySessions/{sessionId}/repls/{replId}/statements/{statementId}/cancel` |


> **Note:** Create, Get, and Delete operations use the HC session `id`. Statement operations use the underlying Livy `sessionId`.


## Related content

- [Get started with Livy API session (regular)](https://learn.microsoft.com/en-us/fabric/data-engineering/get-started-api-livy-session)
- [Submit Spark batch jobs using the Livy API](https://learn.microsoft.com/en-us/fabric/data-engineering/get-started-api-livy-batch)
- [Apache Spark monitoring overview](https://learn.microsoft.com/en-us/fabric/data-engineering/spark-monitoring-overview)
- [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
