---
title: Get started with high concurrency with the Livy endpoint
description: Learn about acquiring high concurrency Spark sessions for the Microsoft Fabric Livy API.
ms.reviewer: avinandac
ms.topic: how-to
ms.search.form: Get started with high concurrency with the Livy API for Data Engineering
ms.date: 04/10/2026
ai-usage: ai-assisted
---
# Get started with the Livy API for Fabric high concurrency sessions

**Applies to:** ✅ Fabric Data Engineering and Data Science

High concurrency (HC) sessions let multiple callers share a single Spark session without interfering with each other. Instead of provisioning a separate session for every workload, you acquire an HC session and the Fabric API assigns it an isolated REPL within a shared underlying session.

In this article, you use the Fabric Livy API to acquire HC sessions, verify session packing, run statements in parallel, and confirm REPL isolation.

## Prerequisites

- [Fabric Premium or Trial capacity](../fundamentals/fabric-trial.md) with a Lakehouse.
- A remote client such as [Visual Studio Code](https://code.visualstudio.com/) with [PySpark](https://code.visualstudio.com/docs/python/python-quick-start) and Python 3.10+.
- A Microsoft Entra service principal (SPN) with workspace access. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).
- A client secret for the service principal. [Add and manage application credentials](/entra/identity-platform/how-to-add-credentials?tabs=client-secret).

Replace the placeholders `{Entra_TenantID}`, `{Entra_ClientID}`, `{Entra_ClientSecret}`, `{Fabric_WorkspaceID}`, and `{Fabric_LakehouseID}` with your values when following the examples in this article.

## What are high concurrency sessions?

High concurrency (HC) sessions let multiple users or processes share a single Spark session. Each caller gets an isolated REPL (Read-Eval-Print Loop) within the shared session. Statements from different callers don't interfere with each other.

### Session packing

When you create two HC sessions with the same **`sessionTag`**, the Fabric API packs them onto the **same underlying Livy session**. Each HC session gets its own REPL, which provides:

- **Resource efficiency**: Multiple users share one Spark session instead of each creating their own.
- **REPL isolation**: Variables and state in one REPL aren't visible to others.
- **Parallel execution**: Statements on different REPLs can run concurrently.

### Key IDs

| ID | Unique per | Used for |
|----|------------|----------|
| HC session `id` | HC session | Poll status, delete session |
| `sessionId` | Livy session (**shared** when packed) | Statement URLs |
| `replId` | REPL (isolated context) | Statement URLs |

> [!IMPORTANT]
> The `sessionId` and `replId` are only available once the HC session reaches the `Idle` state.

### How HC sessions differ from regular Livy sessions

| Aspect | Regular Livy session | HC session |
|--------|---------------------|------------|
| **Endpoint** | `.../sessions` | `.../highConcurrencySessions` |
| **Statements** | Submitted directly to the session | Submitted through a **REPL** (`/repls/{replId}/statements`) |
| **Acquisition** | Session becomes `idle` directly | `NotStarted` then `AcquiringHighConcurrencySession` then `Idle` |
| **Session packing** | Not applicable | Optional `sessionTag` to share underlying Spark sessions |

## Step-by-step walkthrough

### 1. Authenticate with Microsoft Entra

Acquire an access token using the SPN client-credentials flow. Replace the placeholder values with your actual credentials.

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

Create two HC sessions using `sessionTag: "demo-tag"`. Because they share the same tag, the Fabric API packs them onto the **same underlying Livy session**. Each session gets its own isolated REPL.

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

Each session transitions through these states: `NotStarted`, `AcquiringHighConcurrencySession`, and then `Idle`.

Once both sessions are `Idle`, the output confirms the following details about session packing:

- The two HC session IDs (`hc_id_a` and `hc_id_b`) are different, confirming that each "acquire" call returned a distinct HC session.
- The underlying Livy session IDs (`sessionId_a` and `sessionId_b`) match, confirming that both HC sessions were packed onto the **same** Livy session.
- The REPL IDs (`replId_a` and `replId_b`) are different, confirming that each HC session has its own isolated execution context.

The following code polls both sessions until they're ready and prints the verification output:

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
print("=" * 50)
print("SESSION PACKING VERIFICATION")
print("=" * 50)
print(f"HC session A id:    {hc_id_a}")
print(f"HC session B id:    {hc_id_b}")
print(f"HC IDs differ:      {hc_id_a != hc_id_b}")
print()
print(f"Livy sessionId A:   {livy_session_id_a}")
print(f"Livy sessionId B:   {livy_session_id_b}")
print(f"Same Livy session:  {livy_session_id_a == livy_session_id_b}")
print()
print(f"REPL A:             {repl_id_a}")
print(f"REPL B:             {repl_id_b}")
print(f"REPLs differ:       {repl_id_a != repl_id_b}")
```

### 4. Submit statements to both REPLs in parallel

Submit two POST requests (one per REPL) before polling either for results. Because the REPLs share the same Spark session, both statements can run concurrently. This code also defines the `poll_statement` helper function used in the remaining steps.

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

print("Both statements submitted. Polling for results...")

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
print("=" * 50)
print("PARALLEL EXECUTION RESULTS")
print("=" * 50)
print(f"REPL A output: {output_a}")
print(f"REPL B output: {output_b}")
```

### 5. Verify REPL isolation

Set a variable `x = 42` in REPL A, then try to access it from REPL B. Even though both REPLs share the same Spark session, their **variables are isolated**.

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
print("=" * 50)
print("REPL ISOLATION RESULTS")
print("=" * 50)
print(f"REPL A (x = 42): {output_a}")
print(f"REPL B (print(x)): {output_b}")
```

### 6. Clean up both HC sessions

Delete both HC sessions to release resources. Use the HC session `id`, not the underlying `sessionId`.

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

## View your jobs in the monitoring hub

1. Navigate to **Monitor** in the left-side navigation.
1. Select the most recent activity name to view session details.
1. Notice that both HC sessions share the same underlying Spark session, which confirms session packing.

## API endpoints reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create HC session | `POST` | `/v1/workspaces/{workspaceId}/lakehouses/{lakehouseId}/livyapi/versions/2023-12-01/highConcurrencySessions` |
| Get HC session | `GET` | `.../highConcurrencySessions/{highConcurrencySessionId}` |
| Delete HC session | `DELETE` | `.../highConcurrencySessions/{highConcurrencySessionId}` |
| Submit statement | `POST` | `.../highConcurrencySessions/{sessionId}/repls/{replId}/statements` |
| Get statement | `GET` | `.../highConcurrencySessions/{sessionId}/repls/{replId}/statements/{statementId}` |
| Cancel statement | `POST` | `.../highConcurrencySessions/{sessionId}/repls/{replId}/statements/{statementId}/cancel` |

> [!NOTE]
> Create, Get, and Delete operations use the HC session `id`. Statement operations use the underlying Livy `sessionId`.

## Related content

- [Submit Livy API session jobs](get-started-api-livy-session.md)
- [Submit Spark batch jobs using the Livy API](get-started-api-livy-batch.md)
- [Apache Spark monitoring overview](spark-monitoring-overview.md)
