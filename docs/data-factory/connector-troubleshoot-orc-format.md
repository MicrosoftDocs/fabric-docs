---
title: Troubleshoot the ORC format connector
description: Learn how to troubleshoot issues with the ORC format connector in Data Factory in Microsoft Fabric.
ms.reviewer: jburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: troubleshooting
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 10/23/2024
---

# Troubleshoot the ORC format connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the ORC format connector in Data Factory in Microsoft Fabric.

## Error code: OrcJavaInvocationException

- **Message**: `An error occurred when invoking Java, message: %javaException;.`

- **Cause**: If the error message contains the string `SQLSTATE=51002 SQLCODE=-805`, a required package is missing for the user.

- **Causes and recommendations**: Different causes may lead to this error. Check below list for possible cause analysis and related recommendation.

  | Cause analysis                                               | Recommendation                                               |
  | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | When the error message contains the strings "java.lang.OutOfMemory", "Java heap space", and "doubleCapacity", it's usually a memory management issue in an old version of integration runtime. | If you're using Self-hosted Integration Runtime, we recommend that you upgrade to the latest version. |
  | When the error message contains the string "java.lang.OutOfMemory", the integration runtime doesn't have enough resources to process the files. | Limit the concurrent runs on the integration runtime. For Self-hosted IR, scale up to a powerful machine with memory equal to or larger than 8 GB. |
  |When the error message contains the string "NullPointerReference", the cause might be a transient error. | Retry the operation. If the problem persists, contact support. |
  | When the error message contains the string "BufferOverflowException", the cause might be a transient error. | Retry the operation. If the problem persists, contact support. |
  | When the error message contains the string "java.lang.ClassCastException:org.apache.hadoop.hive.serde2.io.HiveCharWritable can't be cast to org.apache.hadoop.io.Text", the cause might be a type conversion issue inside Java Runtime. Usually, it means that the source data can't be handled well in Java Runtime. | This is a data issue. Try to use a string instead of char or varchar in ORC format data. |

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/en-us/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
