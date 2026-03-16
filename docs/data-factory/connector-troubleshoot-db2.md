---
title: Troubleshoot the DB2 connector
description: Learn how to troubleshoot issues with the DB2 connector in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 10/23/2024
ms.custom: connectors
---

# Troubleshoot the DB2 connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the DB2 connector in Data Factory in Microsoft Fabric.

## Error code: DB2DriverRunFailed

- **Message**: `Error thrown from driver. Sql code: '%code;'`

- **Cause**: If the error message contains the string `SQLSTATE=51002 SQLCODE=-805`, a required package is missing for the user.

- **Recommendation**: By default, the service will try to create the package under the collection named as the user you used to connect to the DB2. Specify the package collection property to indicate under where you want the service to create the needed packages when querying the database. If you can't determine the package collection name, try to set _packageCollection_= `NULLID`.

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
