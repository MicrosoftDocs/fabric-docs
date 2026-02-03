---
title: "Getting started with OneLake table APIs for Iceberg"
description: "Quickstart and client configuration for using the OneLake REST API endpoint with Apache Iceberg REST Catalog (IRC) APIs in Microsoft Fabric."
ms.reviewer: mahi
ms.author: mahi
author: matt1883
ms.date: 10/01/2025
ms.topic: how-to
#customer intent: As a OneLake user, I want to learn how to quickly configure my tools and applications to connect to OneLake table APIs using the Apache Iceberg REST Catalog standard, so that I can access, explore, and interact with my Fabric data using familiar open-source clients and libraries.
---

# Getting started with OneLake table APIs for Iceberg

OneLake offers a REST API endpoint for interacting with tables in Microsoft Fabric. This endpoint supports read-only metadata operations for Apache Iceberg tables in Fabric. These operations are compatible with [the Iceberg REST Catalog (IRC) API open standard](https://iceberg.apache.org/rest-catalog-spec/).

## Prerequisites

Learn more about [OneLake table APIs for Iceberg](./iceberg-table-apis-overview.md) and make sure to review the [prerequisite information](./table-apis-overview.md#prerequisites). 

## Client quickstart examples

Review these samples to learn how to set up existing Iceberg REST Catalog (IRC) clients or libraries for use with the new OneLake table endpoint.

### PyIceberg

Use the following sample Python code to configure [PyIceberg](https://py.iceberg.apache.org/) to use the OneLake table API endpoint. Then, list schemas and tables within a data item.

This code assumes there's a default AzureCredential available for a currently signed-in user. Alternatively, you can use the [Microsoft Authentication Python library](/entra/msal/python/) to obtain a token.

```python
from pyiceberg.catalog import load_catalog
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
account_name = "onelake"
account_host = f"{account_name}.blob.fabric.microsoft.com"

# Configure the catalog object for a specific data item
catalog = load_catalog("onelake_catalog", **{
    "uri": table_api_url,
    "token": token,
    "warehouse": warehouse,
    "adls.account-name": account_name,
    "adls.account-host": account_host,
    "adls.credential": credential,
})

# List schemas and tables within a data item
schemas = catalog.list_namespaces()
print(schemas)
for schema in schemas:
    tables = catalog.list_tables(schema)
    print(tables)
```

### Snowflake

Use the following sample code to create a new **catalog-linked database** in Snowflake. This database automatically includes any schemas and tables found within the connected Fabric data item. This involves the creation of a [catalog integration](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-catalog-integration-rest), an [external volume](https://docs.snowflake.com/en/user-guide/tables-iceberg-configure-external-volume-azure), and a [database](https://docs.snowflake.com/en/sql-reference/sql/create-database-catalog-linked).

```sql
-- Create catalog integration object
CREATE OR REPLACE CATALOG INTEGRATION IRC_CATINT
    CATALOG_SOURCE = ICEBERG_REST
    TABLE_FORMAT = ICEBERG
    REST_CONFIG = (
        CATALOG_URI = 'https://onelake.table.fabric.microsoft.com/iceberg' -- Iceberg base URL at the OneLake table endpoint
        CATALOG_NAME = '12345678-abcd-4fbd-9e50-3937d8eb1915/98765432-dcba-4209-8ac2-0821c7f8bd91' -- Fabric data item scope, in the form `workspaceID/dataItemID`
    )
    REST_AUTHENTICATION = (
        TYPE = OAUTH -- Entra auth
        OAUTH_TOKEN_URI = 'https://login.microsoftonline.com/11122233-1122-4138-8485-a47dc5d60435/oauth2/v2.0/token' -- Entra tenant ID
        OAUTH_CLIENT_ID = '44332211-aabb-4d12-aef5-de09732c24b1' -- Entra application client ID
        OAUTH_CLIENT_SECRET = '[secret]' -- Entra application client secret value
        OAUTH_ALLOWED_SCOPES = ('https://storage.azure.com/.default') -- Storage token audience
    )
    ENABLED = TRUE
;

-- Create external volume object
CREATE OR REPLACE EXTERNAL VOLUME IRC_EXVOL
    STORAGE_LOCATIONS =
    (
        (
            NAME = 'IRC_EXVOL'
            STORAGE_PROVIDER = 'AZURE'
            STORAGE_BASE_URL = 'azure://onelake.dfs.fabric.microsoft.com/12345678-abcd-4fbd-9e50-3937d8eb1915/98765432-dcba-4209-8ac2-0821c7f8bd91'
            AZURE_TENANT_ID='11122233-1122-4138-8485-a47dc5d60435' -- Entra tenant id
        )
    )
    ALLOW_WRITES = FALSE;
;

-- Describe the external volume
DESC EXTERNAL VOLUME IRC_EXVOL;
```

The response of `DESC EXTERNAL VOLUME` will return metadata about the external volume, including:
- `AZURE_CONSENT_URL`, which is the permissions request page that needs to be followed if it hasn’t yet been done for your tenant.
- `AZURE_MULTI_TENANT_APP_NAME`, which is the name of the Snowflake client application that needs access to the data item. Make sure to grant it access to the data item in order for Snowflake to be able to read table contents.

```sql
-- Create a Snowflake catalog linked database
CREATE OR REPLACE DATABASE IRC_CATALOG_LINKED
    LINKED_CATALOG = (
        CATALOG = 'IRC_CATINT'
    )
    EXTERNAL_VOLUME = 'IRC_EXVOL'
;

SELECT SYSTEM$CATALOG_LINK_STATUS('IRC_CATALOG_LINKED');

SELECT * FROM IRC_CATALOG_LINKED."dbo"."sentiment";
```

### DuckDB

Use the following sample Python code to configure [DuckDB](https://duckdb.org/docs/stable/clients/python/overview.html) to list schemas and tables within a data item.

This code assumes there's a default `AzureCredential` available for a currently signed-in user. Alternatively, you can use the [MSAL Python library](/entra/msal/python/) to obtain a token.

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

# Install & load extensions
con.execute("INSTALL iceberg; LOAD iceberg;")
con.execute("INSTALL azure; LOAD azure;")
con.execute("INSTALL httpfs; LOAD httpfs;")

# --- Auth & Catalog ---
# 1) Secret for the Iceberg REST Catalog (use existing bearer token)
con.execute("""
CREATE OR REPLACE SECRET onelake_catalog (
TYPE ICEBERG,
TOKEN ?
);
""", [token])

# 2) Secret for ADLS Gen2 / OneLake filesystem access via Azure extension
#    (access token audience must be https://storage.azure.com; account name is 'onelake')
con.execute("""
CREATE OR REPLACE SECRET onelake_storage (
TYPE AZURE,
PROVIDER ACCESS_TOKEN,
ACCESS_TOKEN ?,
ACCOUNT_NAME 'onelake'
);
""", [token])

# 3) Attach the Iceberg REST catalog
con.execute(f"""
ATTACH '{warehouse}' AS onelake (
TYPE ICEBERG,
SECRET onelake_catalog,
ENDPOINT '{table_api_url}'
);
""")

# --- Explore & Query ---
display(con.execute("SHOW ALL TABLES").fetchdf())
```

## Example requests and responses

These example requests and responses illustrate the use of the Iceberg REST Catalog (IRC) operations currently supported at the OneLake table API endpoint. For more information about IRC, see [the open standard specification](https://iceberg.apache.org/rest-catalog-spec/).

For each of these operations:
- `<BaseUrl>` is `https://onelake.table.fabric.microsoft.com/iceberg`
- `<Warehouse>` is `<Workspace>/<DataItem>`, which can be:
    - `<WorkspaceID>/<DataItemID>`, such as `12345678-abcd-4fbd-9e50-3937d8eb1915/98765432-dcba-4209-8ac2-0821c7f8bd91`
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

    ```json
    200 OK
    {
        "defaults": {},
        "endpoints": [
            "GET /v1/{prefix}/namespaces",
            "GET /v1/{prefix}/namespaces/{namespace}",
            "HEAD /v1/{prefix}/namespaces/{namespace}",
            "GET /v1/{prefix}/namespaces/{namespace}/tables",
            "GET /v1/{prefix}/namespaces/{namespace}/tables/{table}",
            "HEAD /v1/{prefix}/namespaces/{namespace}/tables/{table}"
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

        ```json
        200 OK
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

        ```json
        200 OK
        {
            "namespace": [
                "dbo"
            ],
            "properties": {
                "location": "d892007b-3216-424a-a339-f3dca61335aa/40ef140a-8542-4f4c-baf2-0f8127fd59c8/Tables/dbo"
            }
        }
        ```

    ### List tables

    List tables within a given schema.

    - **Request**

        ```
        GET <BaseUrl>/v1/<Prefix>/namespaces/<SchemaName>/tables
        Authorization: Bearer <Token>
        ```

    - **Response**

        ```json
        200 OK
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

        ```json
        200 OK
        {
            "metadata-location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/v3.metadata.json",
            "metadata": {
                "format-version": 2,
                "table-uuid": "...",
                "location": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime",
                "last-sequence-number": 2,
                "last-updated-ms": ...,
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
                "current-snapshot-id": ...,
                "refs": {
                    "main": {
                        "snapshot-id": ...,
                        "type": "branch"
                    }
                },
                "snapshots": [
                    {
                        "sequence-number": 2,
                        "snapshot-id": ...,
                        "parent-snapshot-id": ...,
                        "timestamp-ms": ...,
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
                        "timestamp-ms": ...,
                        "snapshot-id": ...
                    }
                ],
                "metadata-log": [
                    {
                        "timestamp-ms": ...,
                        "metadata-file": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/v1.metadata.json"
                    },
                    {
                        "timestamp-ms": ...,
                        "metadata-file": "abfss://...@onelake.dfs.fabric.microsoft.com/.../Tables/DIM_TestTime/metadata/v2.metadata.json"
                    }
                ]
            }
        }
        ```

## Related content

- Learn more about [OneLake table APIs](./table-apis-overview.md).
- Learn more about [OneLake table APIs for Iceberg](./iceberg-table-apis-overview.md).
- Set up [automatic Delta Lake to Iceberg format conversion](../onelake-iceberg-tables.md#virtualize-delta-lake-tables-as-iceberg).
