---
title: Troubleshoot the Data Warehouse connector
description: Learn how to troubleshoot issues with the Data Warehouse connector in Data Factory in Microsoft Fabric.
ms.reviewer: jianleishen
ms.topic: troubleshooting
ms.date: 01/09/2026
ms.custom: connectors
---

# Troubleshoot the Data Warehouse connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Data Warehouse connector in Data Factory in Microsoft Fabric.

## A transport-level error has occurred when receiving results from the server

- **Message**: `A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - An existing connection was forcibly closed by the remote host.) An existing connection was forcibly closed by the remote host`

- **Cause**: The server terminates the connection unexpectedly, usually due to network instability, timeout, or server-side resource limits.

- **Recommendation**: Check server logs and network stability. Split the copy into partitions instead of a long‑running copy.

## Error code: DWCopyCommandOperationFailed

- **Message**: `ErrorCode=DWCopyCommandOperationFailed,'Type=Microsoft.DataTransfer.Common.Shared.HybridDeliveryException,Message='DataWarehouse' Copy Command operation failed with error 'A transport-level error has occurred when receiving results from the server. (provider: TCP Provider, error: 0 - A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond.)'.`

- **Cause**: The server terminates the connection unexpectedly, usually due to network instability, timeout, or server-side resource limits.

- **Recommendation**: Check server logs and network stability. Split the copy into partitions instead of a long‑running copy.

## SHUTDOWN is in progress

- **Message**: `SHUTDOWN is in progress.`

- **Causes**: The server is unavailable due to a SHUTDOWN operation is in progress.

- **Recommendation**: Check the server logs to confirm whether a shutdown has been initiated and ensure the server is fully available.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)