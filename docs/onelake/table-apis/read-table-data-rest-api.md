---
title: "Read OneLake table data (preview)"
description: "Learn how to request table rows and retrieve Apache Arrow streams by using the OneLake table read API."
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.reviewer: aamerril
ms.date: 09/22/2026
ms.topic: how-to
ai-usage: ai-assisted
#customer intent: As an application developer, I want to use the table read API to securely retrieve every stream of rows from a OneLake table.
---

# Read OneLake table data (preview)

Use the OneLake table read API to read rows from a Delta Lake or Apache Iceberg table in OneLake.

To read table data, send one request to start a read session. The API returns one or more independent result streams based on the size of the data that needs to be returned. Your application can download these streams in parallel, which helps it read large volumes of table data more quickly. After downloading the streams, process their Apache Arrow record batches to assemble the complete result.

The API reads the table from a consistent point in time, so every result stream contains data from the same snapshot, even if the table changes while the read is in progress. It also enforces OneLake authorization, row-level security (RLS), and column-level security (CLS) for the authenticated caller. This means your application receives only the rows and columns that the caller is authorized to access, without needing to reproduce these security controls in its own code.

> [!IMPORTANT]
> The OneLake table read API is currently in **public preview**. Features and behavior might change before general availability.

## Prerequisites

- Complete the [shared table API prerequisites and authentication steps](./table-apis-overview.md#prerequisites).
- An HTTP client that can process an Apache Arrow IPC stream without buffering the complete response.

## 1. Send a request for table rows

Send a `POST` request to the table's `/read` route to start a read session.

1. Build the request URL by replacing the placeholders with the identifiers for the workspace, item, schema, and table that you want to read.

   ```http
   POST <TableReadBaseUrl>/v1.0/workspaces/<WorkspaceID>/items/<ItemID>/schemas/<SchemaName>/tables/<TableName>/read
   Authorization: Bearer <BearerToken>
   ```

1. Include the read options that your application requires in the request. Use the `columns` option to specify which columns to return.

1. Save every opaque stream identifier from the successful response. A large result might be split across multiple streams. You must retrieve every stream to receive all the rows.

The response starts a read session over a consistent snapshot of the table versions needed for your request. Every stream from this response uses the same snapshot.

## 2. Download every result stream

Use each stream identifier from the response to retrieve its corresponding part of the table read result.

A read session expires after 60 minutes. Retrieve every stream before the session expires. If you stop after retrieving only some streams, you won't receive the complete result.

1. For each stream identifier in the allocation response, send an authenticated `GET` request.

   ```http
   GET <TableReadBaseUrl>/v1.0/workspaces/<WorkspaceID>/items/<ItemID>/schemas/<SchemaName>/tables/<TableName>/readStream/<StreamID>
   Authorization: Bearer <BearerToken>
   ```

1. Open the response body with an Apache Arrow IPC stream reader.

1. Process the record batches as they arrive. Streaming the batches avoids loading the complete result into memory.

1. Repeat the request for every stream identifier and combine the results according to your application's processing model.

Each `/readStream` response is an independent Apache Arrow IPC stream. Use the Apache Arrow library for your application language to read the record batches from each response. For more information about the stream format, see [Serialization and interprocess communication (IPC)](https://arrow.apache.org/docs/format/Columnar.html#serialization-and-interprocess-communication-ipc).

The response body contains raw Apache Arrow IPC stream data, including the schema information needed to interpret the record batches. Don't rely on row order, or assume that the position of a stream in the response determines its position in the complete result.

## Understand OneLake security for table read API

The API enforces OneLake security by using the identity that your bearer token represents:

- If you don't have permission to view the table, the service returns a not-found response.
- If row-level security (RLS) filters out every row you can view, the request succeeds but returns an empty Arrow response.
- If you use a wildcard column projection, the response includes only columns that column-level security (CLS) allows you to view.
- If you explicitly request a column that you can't view, the service returns a not-found response.

Because unauthorized tables and columns return not-found responses, don't use a not-found response to determine whether a resource exists.

## Considerations and limitations

- The table read API doesn't support cross-region shortcuts.
- You're billed for the `POST /read` operation. Retrieving data by using `/readStream` doesn't emit a separate table read billing event. For more information, see [Table read API consumption](../onelake-consumption.md#table-read-api).
