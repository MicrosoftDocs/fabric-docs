---
title: Integrate a third-party engine with OneLake security (preview)
description: Learn how to integrate your own query engine or application with OneLake security to enforce row-level and column-level access control.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: how-to
ms.custom:
ms.date: 03/03/2026
ai-usage: ai-assisted
#customer intent: As a third-party engine developer, I want to integrate my query engine with OneLake security so that I can enforce row-level and column-level security when querying data stored in OneLake.
---

# Integrate a third-party engine with OneLake security (preview)

This article describes how third-party engine developers can integrate with OneLake security to query data from OneLake while enforcing row-level security (RLS) and column-level security (CLS). The integration uses the **authorized engine model**, where your engine reads data directly from OneLake and enforces security policies in its own compute layer.

> [!NOTE]
> This feature is part of a Preview release and is provided for evaluation and development purposes only. It may change based on feedback and is not recommended for production use.

## Overview

OneLake security defines fine-grained access control policies&mdash;including table-level, row-level, and column-level security&mdash;once in OneLake. Microsoft Fabric engines like Spark and the SQL analytics endpoint enforce these policies at query time. However, OneLake security guarantees enforcement of fine-grained access control policies regardless of how the data is accessed. As a result, unauthorized external requests to read files from OneLake are blocked to ensure data isn't leaked.

The **authorized engine model** solves this problem. You register a dedicated identity (service principal or managed identity) that has full read access to the data and can also read the security metadata. Your engine uses this identity to:

1. Read the raw data files from OneLake.
1. Fetch the effective security policies for a given user by calling the [Get authorized access for a principal](./authorized-access-for-principal-reference.md) API.
1. Apply the returned row and column filters in its own query execution layer.
1. Return only the permitted data to the end user.

This approach gives your engine full control over query planning and caching while keeping security enforcement consistent with what Fabric engines provide and putting the control of **authorization** in the user's hands.

## Prerequisites

Before you start integrating, make sure you have the following:

- A **Microsoft Entra service principal or managed identity** that your engine uses to access OneLake. Only Microsoft Entra identities are supported.
- **Workspace Member** (or higher) role for the engine identity in the target workspace. This grants the identity the necessary privileges to read data files and security metadata from OneLake.
- A **Fabric item** (lakehouse, mirrored database, or mirrored catalog) with [OneLake security enabled](./get-started-onelake-security.md).
- OneLake security roles [configured](./create-manage-roles.md) on the item with any RLS or CLS policies you want to enforce.
- The engine identity must have **unrestricted Read access** to the tables it reads. If RLS or CLS policies apply to the engine identity itself, API calls return errors.

## Architecture

The following diagram shows the high-level authorization flow for an authorized engine integration.

```
┌──────────────┐       ┌──────────────────┐       ┌───────────┐
│  End user    │──1──▶│  3rd-party engine │──2──▶│  OneLake  │
│  (query)     │       │(service principal)│◀──3──│  (data +  │
│              │◀──6──│                   │──4──▶│  security)│
└──────────────┘       └──────────────────┘       └───────────┘
```

1. The end user submits a query to the third-party engine.
1. The engine identity authenticates to OneLake and reads the raw data files (Delta parquet) using OneLake APIs.
1. OneLake returns the requested data.
1. The engine calls the `principalAccess` API, passing the end user's Microsoft Entra object ID, to get the user's effective access.
1. The engine applies the returned access filters (table access, RLS predicates, CLS column lists) to the data in its own compute layer.
1. The engine returns only the filtered, permitted results to the end user.

## Step 1: Set up the engine identity

Your engine needs a Microsoft Entra identity that OneLake recognizes and trusts. This identity reads data files and security metadata on behalf of your engine.

1. **Create or identify a service principal or managed identity** in Microsoft Entra ID for your engine. For more information, see [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals).

1. **Add the identity to the workspace Member role.** In the Fabric portal, go to the workspace settings and add the service principal to the **Member** role. This grants the identity:
   - Read access to all data files in OneLake for items in that workspace.
   - Access to read OneLake security role metadata through the authorized engine APIs.

   For more information on workspace roles, see [Roles in workspaces](../../fundamentals/roles-workspaces.md).

1. **Ensure the identity has unrestricted access.** The engine identity must have full Read access to each table it queries. If any OneLake security role applies RLS or CLS restrictions to the engine identity, data reads and API calls fail. The best practice is to not add the engine identity to any OneLake security roles that contain RLS or CLS constraints.

> [!IMPORTANT]
> You can revoke the engine's access at any time by removing it from the workspace role. Revoking access takes effect within approximately 2 minutes.

## Step 2: Read data from OneLake

With the engine identity configured, your engine can read data files directly from OneLake using the standard Azure Data Lake Storage (ADLS) Gen2 compatible APIs.

OneLake data is accessible at:

```
https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{itemId}/Tables/{schema}/{tableName}/
```

Your engine authenticates using a bearer token obtained through the Microsoft Entra OAuth 2.0 client credentials flow. Use the OneLake resource scope `https://storage.azure.com/.default` when requesting the token.

### Sample: Authenticate and read data (Python)

```python
from azure.identity import ClientSecretCredential
from azure.storage.filedatalake import DataLakeServiceClient

tenant_id = "<your-tenant-id>"
client_id = "<your-service-principal-client-id>"
client_secret = "<your-service-principal-secret>"

credential = ClientSecretCredential(tenant_id, client_id, client_secret)

service_client = DataLakeServiceClient(
    account_url="https://onelake.dfs.fabric.microsoft.com",
    credential=credential
)

# Access a specific item in a workspace
file_system_client = service_client.get_file_system_client("<workspace-id>")
directory_client = file_system_client.get_directory_client("<item-id>/Tables/dbo/Customers")

# List and read Delta parquet files
for path in directory_client.get_paths():
    if path.name.endswith(".parquet"):
        file_client = file_system_client.get_file_client(path.name)
        downloaded = file_client.download_file()
        data = downloaded.readall()
        # Process the parquet data with your engine
```

For more information on OneLake APIs, see [OneLake access with APIs](../onelake-access-api.md).

## Step 3: Fetch the user's effective access

After reading the raw data, your engine must determine what the querying user is allowed to see. Call the **Get authorized access for a principal** API to get the user's effective access for the item.

### API endpoint

```http
GET https://onelake.dfs.fabric.microsoft.com/v1.0/workspaces/{workspaceId}/artifacts/{artifactId}/securityPolicy/principalAccess
```

### Request body

```json
{
  "aadObjectId": "<end-user-entra-object-id>",
  "inputPath": "Tables",
  "maxResults": 500 //optional, default is 500
}
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| aadObjectId | string | Yes | The Microsoft Entra object ID of the end user whose access you want to check. |
| inputPath | string | Yes | Either `Tables` or `Files`. Returns the user's access for the specified section of the item. For most query engines the inputPath will be `Tables`. |
| continuationToken | string | No | Used to fetch continued results when the result set exceeds `maxResults`. |
| maxResults | integer | No | Maximum items per page. Default is 500. |

### Sample response (RLS only)

```json
{
  "identityETag": "3fc4dc476ded773e4cf43936190bf20fa9480a077b25edc0b4bbe247112542f6",
  "metadataETag": "\"eyJhciI6IlwiMHg4R...\"",
  "value": [
    {
      "path": "Tables/dbo/Customers",
      "access": ["Read"],
      "rows": "SELECT * FROM [dbo].[Customers] WHERE [customerId] = '123'",
      "effect": "Permit"
    },
    {
      "path": "Tables/dbo/Employees",
      "access": ["Read"],
      "rows": "SELECT * FROM [dbo].[Employees] WHERE [address] = '123'",
      "effect": "Permit"
    },
    {
      "path": "Tables/dbo/EmployeeTerritories",
      "access": ["Read"],
      "effect": "Permit"
    }
  ]
}
```

### Sample response (RLS and CLS)

When column-level security is configured on a table, the response includes a `columns` array that lists only the columns the user is permitted to access. Columns not present in this array are hidden from the user.

```json
{
  "identityETag": "79372bc169b00882d9abec3d404032131e96bc406e15c6766514723021e153eb",
  "metadataETag": "\"eyJhciI6IlwiMHg4R...\"",
  "value": [
    {
      "path": "Tables/dbo/Customers",
      "access": ["Read"],
      "columns": [
        {
          "name": "address",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "city",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "contactTitle",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "country",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "fax",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "phone",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "postalCode",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        },
        {
          "name": "region",
          "columnEffect": "Permit",
          "columnAction": ["Read"]
        }
      ],
      "rows": "SELECT * FROM [dbo].[Customers] WHERE [customerID] = 'ALFKI'",
      "effect": "Permit"
    },
    {
      "path": "Tables/dbo/Employees",
      "access": ["Read"],
      "rows": "SELECT * FROM [dbo].[Employees] WHERE [address] = '123'",
      "effect": "Permit"
    }
  ]
}
```

### Understanding the response

The response contains an array of `PrincipalAccessEntry` objects, each representing a table the user has access to. Tables not present in the response aren't accessible to the user.

| Field | Type | Description |
| --- | --- | --- |
| `path` | string | The path to the table the user can access, for example `Tables/dbo/Customers`. |
| `access` | string[] | The array of access types granted. Currently only `Read` is supported. |
| `columns` | object[] | An array of column objects the user is permitted to access. Each object contains `name` (column name), `columnEffect` (`Permit`), and `columnAction` (`["Read"]`). If this field is absent, no CLS applies and all columns are permitted. If present, **only** the listed columns should be returned. |
| `rows` | string | A T-SQL `SELECT` statement representing the row-level security filter. Only rows matching this predicate should be returned to the user. If this field is absent, no RLS applies and all rows are permitted. |
| `effect` | string | The effect type. Currently always `Permit`. |

> [!IMPORTANT]
> The `rows` field contains a T-SQL expression that your engine must parse and apply as a filter predicate. The expression uses a `SELECT * FROM [schema].[table] WHERE ...` format. Your engine must extract the `WHERE` clause and apply it to the data being returned.

### ETags for caching

The response includes two ETag values that enable efficient caching:

- **`identityETag`**: Represents the current state of the user's identity and group memberships. Cache the user's access result and reuse it until this ETag changes.
- **`metadataETag`**: Represents the current state of the item's security configuration. Cache role metadata and reuse it until this ETag changes.

Use these ETags with the `If-None-Match` request header to avoid re-fetching unchanged data. This improves performance for multi-user caches.

### Sample: Fetch effective access (Python)

```python
import requests

# Get a token for the OneLake DFS endpoint
token = credential.get_token("https://storage.azure.com/.default").token

workspace_id = "<workspace-id>"
artifact_id = "<artifact-id>"
user_object_id = "<end-user-entra-object-id>"

url = (
    f"https://onelake.dfs.fabric.microsoft.com/v1.0/"
    f"workspaces/{workspace_id}/artifacts/{artifact_id}/"
    f"securityPolicy/principalAccess"
)

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

body = {
    "aadObjectId": user_object_id,
    "inputPath": "Tables"
}

response = requests.get(url, headers=headers, json=body)
access_data = response.json()

# The response contains the user's effective access
for entry in access_data["value"]:
    print(f"Table: {entry['path']}, Access: {entry['access']}")
    if "columns" in entry:
        col_names = [col["name"] for col in entry["columns"]]
        print(f"  CLS permitted columns: {col_names}")
    if "rows" in entry:
        print(f"  RLS filter: {entry['rows']}")
```

## Step 4: Apply security filters

After fetching the user's effective access, your engine must apply the security policies to the data before returning results. This step is critical&mdash;your engine is responsible for correctly enforcing the policies.

### Table-level filtering

Only return data from tables that appear in the `principalAccess` response. If a table isn't listed, the user has no access to it and no data should be returned.

```python
# Build a set of accessible tables for the user
accessible_tables = {entry["path"] for entry in access_data["value"]}

# Before returning query results, verify the table is accessible
def is_table_accessible(table_path: str) -> bool:
    return table_path in accessible_tables
```

### Row-level security filtering

When a `rows` field is present in an access entry, your engine must parse the T-SQL predicate and apply it as a filter to the table's data. The `rows` value is a `SELECT` statement with a `WHERE` clause that defines which rows the user can see.

> [!IMPORTANT]
> If your engine cannot parse SQL statements, then queries against tables with a non-null `rows` property should fail with an error and return no data. This ensures that users are given access to only what they are allowed to see.

For example, the following RLS filter:

```sql
SELECT * FROM [dbo].[Customers] WHERE [customerId] = '123' UNION SELECT * FROM [dbo].[Customers] WHERE [customerID] = 'ALFKI'
```

Your engine should extract the predicates and apply them to filter the data:

```python
import sqlparse

def extract_rls_predicates(rls_expression: str) -> list:
    """
    Parse the RLS T-SQL expression and extract WHERE clause predicates.
    The expression may contain UNION of multiple SELECT statements.
    """
    predicates = []
    statements = rls_expression.split(" UNION ")
    for stmt in statements:
        parsed = sqlparse.parse(stmt)[0]
        where_seen = False
        where_clause = []
        for token in parsed.tokens:
            if where_seen:
                where_clause.append(str(token).strip())
            if token.ttype is sqlparse.tokens.Keyword and token.value.upper() == "WHERE":
                where_seen = True
        if where_clause:
            predicates.append(" ".join(where_clause))
    return predicates


def apply_rls_filter(dataframe, access_entry: dict):
    """Apply RLS filtering to a dataframe based on the access entry."""
    if "rows" not in access_entry:
        return dataframe  # No RLS, return all rows

    predicates = extract_rls_predicates(access_entry["rows"])
    # Combine predicates with OR (UNION semantic)
    combined_filter = " OR ".join(f"({p})" for p in predicates)
    return dataframe.filter(combined_filter)
```

> [!IMPORTANT]
> When the `rows` field is absent from an access entry, no RLS applies to that table and all rows should be returned. When the field is present, your engine must filter the data. Returning unfiltered data for a table with RLS is a security violation.

### Column-level security filtering

When CLS is configured on a table, the `principalAccess` response includes a `columns` array that explicitly lists the columns the user is permitted to access. Each column object contains:

| Property | Type | Description |
| --- | --- | --- |
| `name` | string | The column name (case-sensitive). |
| `columnEffect` | string | The effect applied to the column. Currently always `Permit`. |
| `columnAction` | string[] | The actions permitted on the column. Currently only `Read` is supported. |

If the `columns` field is **absent** from an access entry, no CLS applies and all columns in the table are permitted. If the `columns` field is **present**, your engine must return only the listed columns.

```python
def get_permitted_columns(access_entry: dict) -> list | None:
    """
    Return the list of permitted column names for a table.
    Returns None if no CLS applies (all columns are permitted).
    """
    if "columns" not in access_entry:
        return None  # No CLS, all columns are permitted

    return [
        col["name"]
        for col in access_entry["columns"]
        if col.get("columnEffect") == "Permit"
        and "Read" in col.get("columnAction", [])
    ]


def apply_cls_filter(dataframe, access_entry: dict):
    """Apply CLS filtering to a dataframe based on the access entry."""
    permitted_columns = get_permitted_columns(access_entry)
    if permitted_columns is None:
        return dataframe  # No CLS, return all columns

    # Only keep columns that are in the permitted list
    return dataframe.select(permitted_columns)
```

> [!IMPORTANT]
> When the `columns` field is absent from an access entry, no CLS applies and all columns should be returned. When the field is present, your engine must only return the listed columns. Returning hidden columns is a security violation.

### Handling tables with no access

If a user queries a table that doesn't appear in the `principalAccess` response, your engine must deny access. Don't fall back to returning unfiltered data.

```python
def query_table(table_path: str, user_access: dict):
    """Query a table with OneLake security enforcement."""
    # Find the user's access entry for this table
    entry = next(
        (e for e in user_access["value"] if e["path"] == table_path),
        None
    )

    if entry is None:
        raise PermissionError(
            f"Access denied: user doesn't have permission to access {table_path}"
        )

    # Read the data from OneLake
    data = read_table_from_onelake(table_path)

    # Apply column-level security
    data = apply_cls_filter(data, entry)

    # Apply row-level security
    data = apply_rls_filter(data, entry)

    return data
```

## Step 5: Handle caching and change detection

For production-grade integrations, especially engines with multi-user data caches, you need to handle changes to security policies and user group memberships.

### Cache security metadata

Use the `identityETag` and `metadataETag` values from the `principalAccess` response to determine when cached security information is stale:

- **`identityETag`**: Changes when the user's group memberships or identity properties are updated. Cache the user's effective access keyed on `(userId, identityETag)`.
- **`metadataETag`**: Changes when the OneLake security roles or policies on the item are updated. Cache role definitions keyed on `(artifactId, metadataETag)`.

### Polling for changes

Poll the `principalAccess` API periodically to detect changes. The API should be polled before query execution to ensure nothing has changed, rather than directly serving results from the cache. Use the `If-None-Match` header with the previously received `ETag` to minimize bandwidth:

```python
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
    "If-None-Match": f'"{cached_etag}"'
}

response = requests.get(url, headers=headers, json=body)

if response.status_code == 304:
    # Security hasn't changed, use cached data
    pass
elif response.status_code == 200:
    # Security has changed, update cache
    new_access_data = response.json()
    update_cache(user_id, new_access_data)
```

### Latency considerations

- Changes to OneLake security role definitions take approximately **5 minutes** to propagate.
- Changes to user group memberships in Microsoft Entra ID take approximately **1 hour** to reflect in OneLake.
- Some Fabric engines have their own caching layer, so might require extra time.

Design your polling interval and cache TTL accordingly. A recommended approach is to poll every 5 minutes for security metadata changes and refresh user-specific access on each query or at a shorter interval.

## Step 6: Handle pagination

The `principalAccess` API supports pagination for items with many tables. When the response includes more entries than `maxResults`, the response contains a `continuationToken`.

```python
all_entries = []
continuation_token = None

while True:
    body = {
        "aadObjectId": user_object_id,
        "inputPath": "Tables",
        "maxResults": 500
    }
    if continuation_token:
        body["continuationToken"] = continuation_token

    response = requests.get(url, headers=headers, json=body)
    data = response.json()
    all_entries.extend(data["value"])

    # Check for continuation token in response
    continuation_token = data.get("continuationToken")
    if not continuation_token:
        break
```

## Error handling

Handle the following error scenarios in your integration:

| HTTP status | Error code | Description | Recommended action |
| --- | --- | --- | --- |
| 200 | - | Success. | Process the response. |
| 404 | ItemNotFound | The workspace or item doesn't exist, or the engine identity doesn't have access. | Verify the workspace ID and artifact ID. Confirm the engine identity has workspace Member access. |
| 412 | PreconditionFailed | The provided ETag in `If-Match` doesn't match the current resource ETag. | Re-fetch the resource without the `If-Match` header to get the latest ETag. |
| 429 | - | Rate limit exceeded. | Wait for the duration specified in the `Retry-After` header before retrying. |

## Security best practices

Follow these best practices to ensure a secure integration:

- **Protect the engine identity credentials.** The service principal has elevated access to data in OneLake. Store credentials securely using services like Azure Key Vault.
- **Don't expose raw data to end users.** Always apply the security filters returned by the `principalAccess` API before returning any data. Skipping enforcement is a security violation.
- **Validate RLS predicates carefully.** Parse and apply the T-SQL `WHERE` clause predicates accurately. Incorrect parsing can lead to data leakage. If parsing errors or unsure syntax mapping occurs, fail the query with an RLS parsing error rather than showing partial or insecure results to the user.
- **Handle missing tables as access denied.** If a table isn't present in the API response, the user doesn't have access. Never fall back to unfiltered data, OneLake security always uses deny by default.
- **Audit access.** Log which users access which tables and what security policies were applied for compliance and troubleshooting.
- **Poll for security changes.** Use ETags to detect changes and refresh cached policies promptly.

## Limitations

- The `principalAccess` API is in preview and may change based on feedback.
- Only the `Read` access type and `Permit` effect are supported today.
- The engine identity must have unrestricted root-level access. If RLS or CLS applies to the engine identity, API calls fail.
- RLS predicates use T-SQL syntax. Your engine is responsible for parsing and applying the predicates correctly.
- Security policy changes take approximately 5 minutes to propagate. User group membership changes take approximately 1 hour.

## Related content

- [Get authorized access for a principal API reference](./authorized-access-for-principal-reference.md)
- [OneLake security integrations overview](./onelake-security-integrations-overview.md)
- [OneLake security integrations reference](./onelake-security-integrations-reference.md)
- [OneLake security access control model](./data-access-control-model.md)
- [Row-level security in OneLake](./row-level-security.md)
- [Column-level security in OneLake](./column-level-security.md)
- [Get started with OneLake security](./get-started-onelake-security.md)
