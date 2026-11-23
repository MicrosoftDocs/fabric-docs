---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/parquet/parquet-limitations-and-considerations-include.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

The Power Query Parquet connector only supports reading files from the local filesystem, Azure Blob Storage, and Azure Data Lake Storage Gen2.

It might be possible to read small files from other sources using the [Binary.Buffer](/powerquery-m/binary-buffer) function to buffer the file in memory. However, if the file is too large you're likely to get the following error:

`Error: Parquet.Document cannot be used with streamed binary values.`

Using the `Binary.Buffer` function in this way may also affect performance.
