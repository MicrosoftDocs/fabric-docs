---
title: "Getting started with OneLake table APIs for Delta"
description: "Quickstart for using the OneLake REST API endpoint with Delta APIs in Microsoft Fabric."
ms.reviewer: preshah
ms.author: preshah
author: mspreshah
ms.date: 10/23/2025
ms.topic: how-to
#customer intent: As a OneLake user, I want to learn how to quickly configure my tools and applications to connect to OneLake table APIs using the Delta standard, so that I can access, explore, and interact with my Fabric data using familiar open-source clients and libraries.
---

# Getting started with OneLake table APIs for Delta

OneLake offers a REST API endpoint for interacting with tables in Microsoft Fabric. This endpoint supports read-only metadata operations for Delta tables in Fabric. These operations are compatible with [Unity Catalog API open standard.](https://github.com/unitycatalog/unitycatalog/tree/main/api)

## Example requests and responses

These example requests and responses illustrate the use of the Delta API operations currently supported at the OneLake table API endpoint. 

For each of these operations:
- `<BaseUrl>` is `https://onelake.table.fabric.microsoft.com/delta`
- `<Workspace>/DataItem`> can be:
    - `<WorkspaceID>/<DataItemID>`, such as `12345678-abcd-4fbd-9e50-3937d8eb1915/98765432-dcba-4209-8ac2-0821c7f8bd91`
    - `<WorkspaceName>/<DataItemName>.<DataItemType>`, such as `MyWorkspace/MyItem.Lakehouse`, as long as both names do not contain special  
       characters.
- `<Token>` is the access token value returned by Microsoft Entra ID upon successful authentication.

### List schemas

List schemas within a Fabric data item.

- **Request**

```bash
curl -X GET \
  "<BaseUrl>/<Workspace>/testlh.Lakehouse/api/2.1/unity-catalog/schemas?catalog_name=testlh.Lakehouse" \
  -H "Authorization: Bearer <Token>" \
  -H "Content-Type: application/json"
```

- **Response**

```json
200 OK
{
"schemas": [
	{
		"name": "dbo",
		"catalog_name": "testlh.Lakehouse",
        "full_name": "testlh.Lakehouse.dbo",
		"created_at": 1759768029062,
		"updated_at": 1759768029062,
		"comment": null,
		"properties": null,
		"owner": null,
		"created_by": null,
		"updated_by": null,
		"schema_id": null
	}
],
"next_page_token": null
}
```
### List tables

List tables within a given schema.

- **Request**

```bash
curl -X GET \
  "<BaseUrl>/<Workspace>/testlh.Lakehouse/api/2.1/unity-catalog/tables?catalog_name=testlh.Lakehouse&schema_name=dbo" \
  -H "Authorization: Bearer <Token>" \
  -H "Content-Type: application/json"
```

- **Response**

```json
200 OK
{
"tables": [
    {
        "name": "product_table",
        "catalog_name": "testlh.Lakehouse",
        "schema_name": "dbo",
        "table_type": null,
        "data_source_format": "DELTA",
        "columns": null,
        "storage_location": "https://onelake.dfs.fabric.microsoft.com/.../.../Tables/product_table",
        "comment": null,
        "properties": null,
        "owner": null,
        "created_at": null,
        "created_by": null,
        "updated_at": null,
        "updated_by": null,
        "table_id": null
    }
],
"next_page_token": null
}
```

### Get table

Get table details for a given table. 

**Request**

```bash
curl -X GET \
  "<BaseUrl>/<Workspace>/testlh.Lakehouse/api/2.1/unity-catalog/tables/testlh.Lakehouse.dbo.product_table" \
  -H "Authorization: Bearer <Token>" \
  -H "Content-Type: application/json"
```

**Response**

```json
    200 OK
    {
	"name": "product_table",
	"catalog_name": "testlh.Lakehouse",
	"schema_name": "dbo",
	"table_type": null,
	"data_source_format": "DELTA",
	"columns": [
		{
			"name": "product_id",
			"type_text": null,
			"type_json": null,
			"type_name": "string",
			"type_precision": 0,
			"type_scale": 0,
			"type_interval_type": null,
			"comment": null,
			"partition_index": 0,
			"position": 0,
			"nullable": true
		},
		{
			"name": "product_name",
			"type_text": null,
			"type_json": null,
			"type_name": "string",
			"type_precision": 0,
			"type_scale": 0,
			"type_interval_type": null,
			"comment": null,
			"partition_index": 0,
			"position": 1,
			"nullable": true
		},
		{
			"name": "category",
			"type_text": null,
			"type_json": null,
			"type_name": "string",
			"type_precision": 0,
			"type_scale": 0,
			"type_interval_type": null,
			"comment": null,
			"partition_index": 0,
			"position": 2,
			"nullable": true
		},
		{
			"name": "brand",
			"type_text": null,
			"type_json": null,
			"type_name": "string",
			"type_precision": 0,
			"type_scale": 0,
			"type_interval_type": null,
			"comment": null,
			"partition_index": 0,
			"position": 3,
			"nullable": true
		},
		{
			"name": "price",
			"type_text": null,
			"type_json": null,
			"type_name": "double",
			"type_precision": 0,
			"type_scale": 0,
			"type_interval_type": null,
			"comment": null,
			"partition_index": 0,
			"position": 4,
			"nullable": true
		},
		{
			"name": "launch_date",
			"type_text": null,
			"type_json": null,
			"type_name": "date",
			"type_precision": 0,
			"type_scale": 0,
			"type_interval_type": null,
			"comment": null,
			"partition_index": 0,
			"position": 5,
			"nullable": true
		}
	],
	"storage_location": "https://onelake.dfs.fabric.microsoft.com/.../.../Tables/product_table",
	"comment": null,
	"properties": null,
	"owner": null,
	"created_at": 1759703452000,
	"created_by": null,
	"updated_at": 1759703452000,
	"updated_by": null,
	"table_id": "df2b3038-c21a-429d-90b8-f3bbf2d3db5d"
    }
```

## Related content

- Learn more about [OneLake table APIs](./table-apis-overview.md). 
- Learn more about [OneLake table APIs for Delta](./delta-table-apis-overview.md).
