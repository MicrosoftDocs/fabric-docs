---
title: "Iceberg table API samples"
description: "Quickstart and client configuration for using the OneLake REST API endpoint with Apache Iceberg REST Catalog (IRC) APIs in Microsoft Fabric."
ms.reviewer: mahi # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.date: 10/09/2026
ms.topic: how-to
ai-usage: ai-assisted
#customer intent: As a OneLake user, I want to learn how to quickly configure my tools and applications to connect to OneLake table APIs using the Apache Iceberg REST Catalog standard, so that I can access, explore, and interact with my Fabric data using familiar open-source clients and libraries.
---

# Iceberg table API samples

OneLake offers a REST API endpoint for interacting with tables in Fabric. The API supports reads, writes, and credential vending for Apache Iceberg tables and is compatible with [the Iceberg REST Catalog (IRC) API open standard](https://iceberg.apache.org/rest-catalog-spec/).

## Prerequisites

Learn more about the [Iceberg metadata API](./iceberg-table-apis-overview.md) and make sure to review the [prerequisite information](./table-apis-overview.md#prerequisites).

## Client quickstart examples

Review these samples to learn how to configure Iceberg REST Catalog (IRC) clients for OneLake reads, writes, and credential vending.

The write samples create native Iceberg tables. For the distinction between native tables and virtualized Delta Lake metadata, see [How write operations work](./iceberg-table-apis-overview.md#how-write-operations-work).

> [!CAUTION]
> These samples create, write to, and drop tables. Use a test data item and table names that don't already exist.

### PyIceberg

Use the following Python sample to configure [PyIceberg](https://py.iceberg.apache.org/) with OneLake credential vending. The sample lists schemas and tables, creates and writes a table, reads the committed rows, and drops the example table.

This code assumes there's a default `AzureCredential` available for a currently signed-in user. Alternatively, you can use the [Microsoft Authentication Python library](/entra/msal/python/) to obtain a token.

The sample uses PyIceberg 0.12.0. Install the dependencies before running it:

```bash
python -m pip install "pyiceberg[pyarrow]>=0.12.0" adlfs azure-identity
```

OneLake returns HTTPS credential prefixes and ABFS table locations. The sample requests vended credentials explicitly, selects credentials for the equivalent HTTPS storage location, and configures the OneLake storage host instead of using the default Azure Storage host.

```python
from urllib.parse import urlsplit

import pyarrow as pa

from pyiceberg.catalog import load_catalog
from pyiceberg.io import load_file_io
from azure.identity import DefaultAzureCredential

# Iceberg base URL at the OneLake table API endpoint
table_api_url = "https://onelake.table.fabric.microsoft.com/iceberg"

# Entra ID token
credential = DefaultAzureCredential()
token = credential.get_token("https://storage.azure.com/.default").token

# Client configuration options
fabric_workspace_id = "12345678-abcd-4fbd-9e50-3937d8eb1915"
fabric_data_item_id = "98765432-dcba-4209-8ac2-0821c7f8bd91"
warehouse = f"{fabric_workspace_id}/{fabric_data_item_id}"

# Configure the catalog to request temporary OneLake storage credentials
catalog = load_catalog("onelake_catalog", **{
    "uri": table_api_url,
    "token": token,
    "warehouse": warehouse,
    "header.X-Iceberg-Access-Delegation": "vended-credentials",
})

# List schemas and tables within a data item
schemas = catalog.list_namespaces()
print(schemas)
for schema in schemas:
    tables = catalog.list_tables(schema)
    print(tables)

source_identifier = ("dbo", "irc_write_example")
data = pa.Table.from_pylist([
    {"id": 1, "name": "first row"},
    {"id": 2, "name": "second row"},
])

# Create the table through the catalog API
catalog.create_table(
    identifier=source_identifier,
    schema=data.schema,
)

table = catalog.load_table(source_identifier)
location = urlsplit(table.location())
if location.scheme not in ("abfs", "abfss") or not location.username or not location.hostname:
    raise ValueError("Expected a OneLake ABFS table location.")

storage_location = f"https://{location.hostname}/{location.username}{location.path}"
storage_config = catalog.load_credentials(source_identifier, storage_location)
if not any(key.startswith("adls.sas-token.") for key in storage_config):
    raise RuntimeError("OneLake didn't return a matching ADLS SAS credential.")

table.io = load_file_io(
    {
        **table.io.properties,
        **storage_config,
        "adls.account-name": location.hostname.split(".")[0],
        "adls.account-host": location.hostname.replace(".dfs.", ".blob.", 1),
    },
    location=table.location(),
)

# PyIceberg writes the data and metadata files to OneLake, then commits the
# new snapshot through the catalog API
table.append(data)
print(table.scan().to_arrow())

catalog.drop_table(source_identifier)
```

Treat vended SAS values as secrets. `load_credentials` selects the credential with the most specific matching `prefix`. Before the returned `expiration-time`, retrieve fresh credentials and rebuild the table's FileIO with the updated configuration.

### Snowflake

Use the following sample to configure a Snowflake [catalog integration](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration-rest) that requests [catalog-vended credentials](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration-vended-credentials). The catalog-linked database automatically discovers schemas and tables in the Fabric data item. The sample reads an existing table, creates and writes an Iceberg table, reads the new rows, and drops the example table.

Before running the sample, complete the [Snowflake and OneLake prerequisites](../onelake-iceberg-snowflake.md#prerequisite), including the tenant settings that allow service principals to call Fabric APIs and apps running outside Fabric to access OneLake. Snowflake requires public network access to OneLake and doesn't support workspaces protected by private link or other network restrictions.

For Snowflake on Azure writes, make sure the Fabric capacity for your target workspace and your Snowflake instance are in the same Azure region, as described in the [Snowflake write setup](../onelake-iceberg-snowflake.md#write-an-iceberg-table-to-onelake-using-snowflake-on-azure).

```sql
-- Create a catalog integration that uses OneLake-vended credentials
CREATE CATALOG INTEGRATION IRC_CATINT
    CATALOG_SOURCE = ICEBERG_REST
    TABLE_FORMAT = ICEBERG
    REST_CONFIG = (
        CATALOG_URI = 'https://onelake.table.fabric.microsoft.com/iceberg'
        CATALOG_NAME = '12345678-abcd-4fbd-9e50-3937d8eb1915/98765432-dcba-4209-8ac2-0821c7f8bd91'
        ACCESS_DELEGATION_MODE = VENDED_CREDENTIALS
    )
    REST_AUTHENTICATION = (
        TYPE = OAUTH
        OAUTH_TOKEN_URI = 'https://login.microsoftonline.com/11122233-1122-4138-8485-a47dc5d60435/oauth2/v2.0/token'
        OAUTH_CLIENT_ID = '44332211-aabb-4d12-aef5-de09732c24b1'
        OAUTH_CLIENT_SECRET = '[secret]'
        OAUTH_ALLOWED_SCOPES = ('https://storage.azure.com/.default')
    )
    ENABLED = TRUE;

-- Create a catalog-linked database and confirm that synchronization succeeds
CREATE DATABASE IRC_CATALOG_LINKED
    LINKED_CATALOG = (
        CATALOG = 'IRC_CATINT'
    );

SELECT SYSTEM$CATALOG_LINK_STATUS('IRC_CATALOG_LINKED');

-- Read a table that already exists in the Fabric data item
SELECT * FROM IRC_CATALOG_LINKED."dbo"."sentiment" LIMIT 10;

-- Create and write an Iceberg table through the OneLake catalog
USE DATABASE IRC_CATALOG_LINKED;
USE SCHEMA "dbo";

CREATE ICEBERG TABLE "irc_write_example" (
    id INTEGER,
    name STRING
);

INSERT INTO "irc_write_example"
VALUES
    (1, 'first row'),
    (2, 'second row');

UPDATE "irc_write_example"
SET name = 'updated row'
WHERE id = 2;

-- Read the rows committed through the catalog
SELECT * FROM "irc_write_example" ORDER BY id;

-- Drop the example table from Snowflake and the remote catalog
DROP ICEBERG TABLE "irc_write_example";
```

Snowflake uses the temporary SAS values returned by OneLake for storage access and commits table changes to the OneLake catalog. The identity configured in `REST_AUTHENTICATION` must have write permission on the target Fabric data item.

Use an existing schema and wait for catalog synchronization before querying an existing table. Replace `sentiment` with a table in your data item, and use new names for the sample catalog integration and catalog-linked database.

### DuckDB

Use the following Python sample to configure [DuckDB](https://duckdb.org/docs/stable/clients/python/overview.html) with OneLake credential vending. The sample lists existing tables, creates and writes a table, reads the committed rows, and drops the example table.

This code assumes there's a default `AzureCredential` available for a currently signed-in user. Alternatively, you can use the [MSAL Python library](/entra/msal/python/) to obtain a token.

<!--
Validated create, insert, select, drop, and OneLake Azure SAS credential vending with DuckDB 1.5.6.
Revalidate with the target release and update STAGE_CREATE_TABLES and DISABLE_MULTI_TABLE_COMMIT as needed.
-->

The sample uses DuckDB 1.5.6. Install the dependencies before running it:

```bash
python -m pip install "duckdb>=1.5.6" azure-identity
```

```python
import duckdb
from azure.identity import DefaultAzureCredential

# Iceberg API base URL at the OneLake table API endpoint
table_api_url = "https://onelake.table.fabric.microsoft.com/iceberg"

# Entra ID token
credential = DefaultAzureCredential()
token = credential.get_token("https://storage.azure.com/.default").token

# Client configuration options
fabric_workspace_id = "12345678-abcd-4fbd-9e50-3937d8eb1915"
fabric_data_item_id = "98765432-dcba-4209-8ac2-0821c7f8bd91"
warehouse = f"{fabric_workspace_id}/{fabric_data_item_id}"

# Connect to DuckDB
con = duckdb.connect()

# Install and load the Iceberg and storage extensions
con.execute("INSTALL iceberg; LOAD iceberg;")
con.execute("INSTALL azure; LOAD azure;")
con.execute("INSTALL httpfs; LOAD httpfs;")

# Store the bearer token used to authenticate to the catalog
con.execute("""
CREATE OR REPLACE SECRET onelake_catalog (
    TYPE ICEBERG,
    TOKEN ?
);
""", [token])

# Attach the catalog and request temporary OneLake storage credentials
con.execute(f"""
ATTACH '{warehouse}' AS onelake (
    TYPE ICEBERG,
    SECRET onelake_catalog,
    ENDPOINT '{table_api_url}',
    ACCESS_DELEGATION_MODE 'vended_credentials',
    STAGE_CREATE_TABLES false,
    DISABLE_MULTI_TABLE_COMMIT true
);
""")

# Read catalog metadata
print(con.execute("SHOW ALL TABLES").fetchall())

# Create and write an Iceberg table through the attached catalog
con.execute("""
CREATE TABLE onelake.dbo.irc_write_example (
    id INTEGER,
    name VARCHAR
)
""")
con.execute("""
INSERT INTO onelake.dbo.irc_write_example
VALUES
    (1, 'first row'),
    (2, 'second row')
""")

# Read the rows committed through the catalog
print(con.execute("""
SELECT * FROM onelake.dbo.irc_write_example ORDER BY id
""").fetchall())

# Drop the example table
con.execute("DROP TABLE onelake.dbo.irc_write_example")
```

DuckDB uses the vended SAS value for OneLake storage access and commits table changes through the attached catalog. The signed-in identity must have write permission on the target Fabric data item.

## Example requests and responses

These example requests and responses illustrate the use of the Iceberg REST Catalog (IRC) operations currently supported at the OneLake table API endpoint. For more information about IRC, see [the open standard specification](https://iceberg.apache.org/rest-catalog-spec/).

For each of these operations:
- `<BaseUrl>` is `https://onelake.table.fabric.microsoft.com/iceberg`.
- `<Warehouse>` is `<Workspace>/<DataItem>`, which can be:
    - `<WorkspaceID>/<DataItemID>`, such as `12345678-abcd-4fbd-9e50-3937d8eb1915/98765432-dcba-4209-8ac2-0821c7f8bd91`.
    - `<WorkspaceName>/<DataItemName>.<DataItemType>`, such as `MyWorkspace/MyItem.Lakehouse`, as long as both names don't contain special characters.
- `<Prefix>` is returned by the Get configuration call, and its value is usually the same as `<Warehouse>`.
- `<Token>` is the access token value returned by Entra ID upon successful authentication.

### Get configuration

List Iceberg catalog configuration settings.

- **Request**

    ```
    GET <BaseUrl>/v1/config?warehouse=<Warehouse>
    Authorization: Bearer <Token>
    ```

- **Response**

    `200 OK`

    ```json
    {
        "defaults": {},
        "endpoints": [
            "GET /v1/{prefix}/namespaces",
            "GET /v1/{prefix}/namespaces/{namespace}",
            "HEAD /v1/{prefix}/namespaces/{namespace}",
            "GET /v1/{prefix}/namespaces/{namespace}/tables",
            "GET /v1/{prefix}/namespaces/{namespace}/tables/{table}",
            "HEAD /v1/{prefix}/namespaces/{namespace}/tables/{table}",
            "POST /v1/{prefix}/namespaces/{namespace}/tables",
            "POST /v1/{prefix}/namespaces/{namespace}/tables/{table}",
            "DELETE /v1/{prefix}/namespaces/{namespace}/tables/{table}",
            "GET /v1/{prefix}/namespaces/{namespace}/tables/{table}/credentials"
        ],
        "overrides": {
            "prefix": "<Prefix>"
        }
    }
    ```

### List schemas

List schemas within a Fabric data item.

- **Request**

    ```
    GET <BaseUrl>/v1/<Prefix>/namespaces
    Authorization: Bearer <Token>
    ```

- **Response**

    `200 OK`

    ```json
    {
        "namespaces": [
            [
                "dbo"
            ]
        ],
        "next-page-token": null
    }
    ```

### Get schema

Get schema details for a given schema.

- **Request**

    ```
    GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>
    Authorization: Bearer <Token>
    ```

- **Response**

    `200 OK`

    ```json
    {
        "namespace": [
            "dbo"
        ],
        "properties": {
            "location": "d892007b-3216-424a-a339-f3dca61335aa/40ef140a-8542-4f4c-baf2-0f8127fd59c8/Tables/dbo"
        }
    }
    ```

### Check schema

Check whether a schema exists. The response doesn't contain a body.

- **Request**

    ```
    HEAD <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>
    Authorization: Bearer <Token>
    ```

- **Response when the schema exists**

    ```
    204 No Content
    ```

If the schema doesn't exist, OneLake returns `404 Not Found`.

### List tables

List tables within a given schema.

- **Request**

    ```
    GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables
    Authorization: Bearer <Token>
    ```

- **Response**

    `200 OK`

    ```json
    {
        "identifiers": [
            {
                "namespace": [
                    "dbo"
                ],
                "name": "DIM_TestTime"
            },
            {
                "namespace": [
                    "dbo"
                ],
                "name": "DIM_TestTable"
            }
        ],
        "next-page-token": null
    }
    ```

### Get table

Get table details for a given table.

- **Request**

    ```
    GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>
    Authorization: Bearer <Token>
    ```

- **Response**

    `200 OK`

    ```json
    {
        "metadata-location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/v3.metadata.json",
        "metadata": {
            "format-version": 2,
            "table-uuid": "...",
            "location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime",
            "last-sequence-number": 2,
            "last-updated-ms": 1759768029062,
            "last-column-id": 4,
            "current-schema-id": 0,
            "schemas": [
                {
                    "type": "struct",
                    "schema-id": 0,
                    "fields": [
                        {
                            "id": 1,
                            "name": "id",
                            "required": false,
                            "type": "int"
                        },
                        {
                            "id": 2,
                            "name": "name",
                            "required": false,
                            "type": "string"
                        },
                        {
                            "id": 3,
                            "name": "age",
                            "required": false,
                            "type": "int"
                        },
                        {
                            "id": 4,
                            "name": "i",
                            "required": false,
                            "type": "boolean"
                        }
                    ]
                }
            ],
            "default-spec-id": 0,
            "partition-specs": [
                {
                    "spec-id": 0,
                    "fields": []
                }
            ],
            "last-partition-id": 999,
            "default-sort-order-id": 0,
            "sort-orders": [
                {
                    "order-id": 0,
                    "fields": []
                }
            ],
            "properties": {
                "schema.name-mapping.default": "[ {\n  \"field-id\" : 1,\n  \"names\" : [ \"id\" ]\n}, {\n  \"field-id\" : 2,\n  \"names\" : [ \"name\" ]\n}, {\n  \"field-id\" : 3,\n  \"names\" : [ \"age\" ]\n}, {\n  \"field-id\" : 4,\n  \"names\" : [ \"i\" ]\n} ]",
                "write.metadata.delete-after-commit.enabled": "true",
                "write.data.path": "abfs://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime",
                "XTABLE_METADATA": "{\"lastInstantSynced\":\"...\",\"instantsToConsiderForNextSync\":[],\"version\":0,\"sourceTableFormat\":\"DELTA\",\"sourceIdentifier\":\"3\"}",
                "write.parquet.compression-codec": "zstd"
            },
            "current-snapshot-id": 2,
            "refs": {
                "main": {
                    "snapshot-id": 2,
                    "type": "branch"
                }
            },
            "snapshots": [
                {
                    "sequence-number": 2,
                    "snapshot-id": 2,
                    "parent-snapshot-id": 1,
                    "timestamp-ms": 1759768029062,
                    "summary": {
                        "operation": "overwrite",
                        "XTABLE_METADATA": "{\"lastInstantSynced\":\"...\",\"instantsToConsiderForNextSync\":[],\"version\":0,\"sourceTableFormat\":\"DELTA\",\"sourceIdentifier\":\"3\"}",
                        "added-data-files": "1",
                        "deleted-data-files": "1",
                        "added-records": "1",
                        "deleted-records": "1",
                        "added-files-size": "2073",
                        "removed-files-size": "2046",
                        "changed-partition-count": "1",
                        "total-records": "6",
                        "total-files-size": "4187",
                        "total-data-files": "2",
                        "total-delete-files": "0",
                        "total-position-deletes": "0",
                        "total-equality-deletes": "0"
                    },
                    "manifest-list": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/snap-....avro",
                    "schema-id": 0
                }
            ],
            "statistics": [],
            "snapshot-log": [
                {
                    "timestamp-ms": 1759768029062,
                    "snapshot-id": 2
                }
            ],
            "metadata-log": [
                {
                    "timestamp-ms": 1759768000000,
                    "metadata-file": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/v1.metadata.json"
                },
                {
                    "timestamp-ms": 1759768029062,
                    "metadata-file": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/v2.metadata.json"
                }
            ]
        }
    }
    ```

To request temporary storage credentials while loading a table, include the `X-Iceberg-Access-Delegation` header. The header tells the server that the client can use vended credentials. Treat returned SAS values as secrets, and refresh credentials before the returned `expiration-time`.

Each returned credential includes a `prefix` that identifies the storage location where the credential applies. If a client receives multiple credentials of the same type, it should use the most specific matching `prefix`.

The following response excerpt shows selected fields from the full table metadata response.

- **Request with vended credentials**

    ```
    GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>
    Authorization: Bearer <Token>
    X-Iceberg-Access-Delegation: vended-credentials
    ```

- **Response with vended credentials**

    `200 OK`

    ```json
    {
        "metadata-location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/dbo/DIM_TestTime/metadata/v3.metadata.json",
        "metadata": {
            "format-version": 2,
            "table-uuid": "<TableUuid>",
            "location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/dbo/DIM_TestTime"
        },
        "storage-credentials": [
            {
                "prefix": "https://<OneLakeDfsHost>/<WorkspaceID>/<DataItemID>/Tables/dbo/DIM_TestTime",
                "config": {
                    "expiration-time": "<EpochMilliseconds>",
                    "adls.sas-token.<OneLakeDfsHost>": "<SasToken>"
                }
            }
        ]
    }
    ```

### Check table

Check whether a table exists. The response doesn't contain a body.

- **Request**

    ```
    HEAD <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>
    Authorization: Bearer <Token>
    ```

- **Response when the table exists**

    ```
    204 No Content
    ```

If the table doesn't exist, OneLake returns `404 Not Found`.

### Load table credentials

Load temporary storage credentials for an existing table without loading the table metadata in the same response. If the table doesn't exist, the service returns `404 NoSuchTableException`.

- **Request**

    ```
    GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>/credentials
    Authorization: Bearer <Token>
    ```

- **Response**

    `200 OK`

    ```json
    {
        "storage-credentials": [
            {
                "prefix": "https://<OneLakeDfsHost>/<WorkspaceID>/<DataItemID>/Tables/dbo/DIM_TestTime",
                "config": {
                    "expiration-time": "<EpochMilliseconds>",
                    "adls.sas-token.<OneLakeDfsHost>": "<SasToken>"
                }
            }
        ]
    }
    ```

Applications that call the credentials endpoint directly must select the credential with the longest `prefix` that matches the target storage location.

Install the dependencies before running the example:

```bash
python -m pip install azure-identity requests azure-storage-file-datalake
```

The following Python example retrieves a credential and configures an Azure Data Lake Storage client without logging the SAS value:

```python
from urllib.parse import urlsplit

import requests
from azure.identity import DefaultAzureCredential
from azure.storage.filedatalake import DataLakeServiceClient

table_api_url = "https://onelake.table.fabric.microsoft.com/iceberg"
fabric_workspace_id = "<WorkspaceID>"
fabric_data_item_id = "<DataItemID>"
warehouse = f"{fabric_workspace_id}/{fabric_data_item_id}"
token = DefaultAzureCredential().get_token("https://storage.azure.com/.default").token
headers = {"Authorization": f"Bearer {token}"}
config_response = requests.get(
    f"{table_api_url}/v1/config",
    params={"warehouse": warehouse},
    headers=headers,
    timeout=30,
)
config_response.raise_for_status()
prefix = config_response.json()["overrides"]["prefix"]

table_url = (
    f"{table_api_url}/v1/{prefix}/namespaces/dbo/"
    "tables/DIM_TestTime"
)
table_response = requests.get(table_url, headers=headers, timeout=30)
table_response.raise_for_status()
location = urlsplit(table_response.json()["metadata"]["location"])
if location.scheme not in ("abfs", "abfss") or not location.username or not location.hostname:
    raise ValueError("Expected a OneLake ABFS table location.")
target_location = f"https://{location.hostname}/{location.username}{location.path}"

response = requests.get(
    f"{table_url}/credentials",
    headers=headers,
    timeout=30,
)
response.raise_for_status()

matches = [
    item
    for item in response.json()["storage-credentials"]
    if target_location.rstrip("/") == item["prefix"].rstrip("/")
    or target_location.startswith(item["prefix"].rstrip("/") + "/")
]
if not matches:
    raise RuntimeError("OneLake didn't return a credential for the table location.")

credential = max(matches, key=lambda item: len(item["prefix"]))
sas_key = next(
    key
    for key in credential["config"]
    if key.startswith("adls.sas-token.")
)
account_host = sas_key.removeprefix("adls.sas-token.")
storage_client = DataLakeServiceClient(
    account_url=f"https://{account_host}",
    credential=credential["config"][sas_key],
)
```

Use `storage_client` only for paths covered by the returned `prefix`, and request a new credential before `expiration-time`.

### Create table

Create a native Iceberg table in a schema. The request body uses the IRC `CreateTableRequest` shape.

The response example shows selected metadata fields. The service returns the full table metadata.

- **Request**

    ```
    POST <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables
    Authorization: Bearer <Token>
    Content-Type: application/json

    {
        "name": "DIM_TestTime",
        "schema": {
            "type": "struct",
            "schema-id": 0,
            "fields": [
                {
                    "id": 1,
                    "name": "id",
                    "required": false,
                    "type": "int"
                }
            ]
        },
        "properties": {
            "write.parquet.compression-codec": "zstd"
        }
    }
    ```

- **Response**

    `200 OK`

    ```json
    {
        "metadata-location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/dbo/DIM_TestTime/metadata/v1.metadata.json",
        "metadata": {
            "format-version": 2,
            "table-uuid": "<TableUuid>",
            "location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/dbo/DIM_TestTime"
        }
    }
    ```

If the table already exists, OneLake returns a `409` conflict with an `AlreadyExistsException` error.

### Commit table updates

Commit metadata updates to an existing native Iceberg table. The request body uses the IRC `CommitTableRequest` shape and contains both `requirements` and `updates`. You can't commit updates for table shortcuts or virtual Iceberg metadata generated for Delta Lake tables.

The response example shows selected metadata fields. The service returns the full table metadata.

- **Request**

    ```
    POST <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>
    Authorization: Bearer <Token>
    Content-Type: application/json

    {
        "requirements": [
            {
                "type": "assert-table-uuid",
                "uuid": "<TableUuid>"
            }
        ],
        "updates": [
            {
                "action": "set-properties",
                "updates": {
                    "example-property": "example-value"
                }
            }
        ]
    }
    ```

- **Response**

    `200 OK`

    ```json
    {
        "metadata-location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/dbo/DIM_TestTime/metadata/v4.metadata.json",
        "metadata": {
            "format-version": 2,
            "table-uuid": "<TableUuid>",
            "location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/dbo/DIM_TestTime"
        }
    }
    ```

If the table doesn't exist, OneLake returns `404 NoSuchTableException`. If a commit requirement fails, OneLake returns a `409` conflict. If the request includes unknown requirements or updates, OneLake returns a `400` bad request.

### Drop table

Drop a table from the catalog.

> [!CAUTION]
> This operation deletes the table directory in OneLake, including its data and metadata. Don't use it to remove only virtual Iceberg metadata from a Delta Lake table.

- **Request**

    ```
    DELETE <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables/<TableName>
    Authorization: Bearer <Token>
    ```

- **Response**

    ```http
    HTTP/1.1 204 No Content
    ```

If the table doesn't exist, OneLake returns `404 NoSuchTableException`.

### Error responses

An IRC-formatted error response uses the `IcebergErrorResponse` shape, with a top-level `error` object that contains `message`, `type`, and `code` fields. The following example illustrates this format:

`404 Not Found`

```json
{
    "error": {
        "message": "<ErrorMessage>",
        "type": "NoSuchTableException",
        "code": 404
    }
}
```

Some environments return OneLake-formatted errors instead, with a string `code` and a `message` rather than the IRC `type` and numeric `code`. Inspect both the HTTP status and the error body instead of assuming that every error uses the IRC format.

All operations might also return `401 Unauthorized` when the access token isn't valid or `403 Forbidden` when the identity doesn't have permission for the requested operation. `HEAD` operations return only an HTTP status and don't include an error response body.

## Related content

- Learn more about [OneLake table APIs](./table-apis-overview.md).
- Learn more about the [Iceberg metadata API](./iceberg-table-apis-overview.md).
- [Read OneLake table data](./read-table-data-rest-api.md).
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).
