---
title: Spark monitoring APIs to get Spark application details 
description: Learn more about monitoring API to retrieve key information about a single Spark application.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 03/31/2025
---

# Monitor Spark applications using Spark monitoring APIs

This overview summarizes the Spark monitoring APIs available in Microsoft Fabric. It is intended for developers and data engineers who require robust monitoring and diagnostic capabilities for Spark applications.

## Fabric Spark Monitoring APIs 

Fabric provides APIs to monitor Spark applications at both the workspace and item levels, as well as detailed diagnostics for individual Spark applications. 

**Workspace and Item-Level APIs**

| APIs  | Description |
| ----- | ----------- |
| [Spark applications in a workspace](/rest/api/fabric/spark/livy-sessions/list-livy-sessions) | Retrieve a list of Spark applications in the workspace.|
| [Spark applications for a notebook](/rest/api/fabric/notebook/livy-sessions/list-livy-sessions) | Retrieve a list of Spark applications associated with a notebook. |
| [Spark applications for a Spark Job Definition](/rest/api/fabric/sparkjobdefinition/livy-sessions/list-livy-sessions) | Retrieve a list of Spark applications associated with a Spark Job Definition. |
| [Spark applications for a Lakehouse](/rest/api/fabric/lakehouse/livy-sessions/list-livy-sessions) | Retrieve a list of Spark applications associated with a Lakehouse. |

**Single Spark Application APIs**

These APIs are used for deep-dive diagnostics, providing comprehensive details, metrics, and logs for individual Spark applications. 

| APIs  | Description |
| ----- | ----------- |
| [Notebook Run](/rest/api/fabric/notebook/livy-sessions/get-livy-session) | Retrieve detailed information for the Spark application that executed a specific notebook run. |
| [Spark Job Definition Submission](/rest/api/fabric/sparkjobdefinition/livy-sessions/get-livy-session) | Retrieve detailed information for Spark applications initiated via Spark Job Definitions. |
| [Lakehouse Operation](/rest/api/fabric/lakehouse/livy-sessions/get-livy-session) | Retrieve detailed information for the Spark application triggered by a Lakehouse operation. |
| [Spark Open-source metrics APIs](../data-engineering/open-source-apis.md) | Fully aligned with the Spark History Server APIs for collecting Spark metrics. |
| [Livy Log](../data-engineering/livy-log.md) | Retrieve Spark Livy logs for detailed session-level information. |
| [Driver Log](../data-engineering/driver-log.md) | Access driver logs for debugging application-level issues. |
| [Executor Log](../data-engineering/executor-log.md) | Retrieve executor logs for troubleshooting distributed execution issues. |
| [Resource usage APIs](../data-engineering/resource-usage-apis.md) | Monitor Spark resource usage information. |

## Next steps

Use the following resources to quickly access APIs for listing Livy sessions and detailed diagnostics for Spark applications: 

1. **Workspace and ItemLevel APIs**

*List all completed and active Livy sessions.*

- Workspace - [List Sessions (Spark)](/rest/api/fabric/spark/livy-sessions/list-livy-sessions)
- Notebook -  [List Sessions (Notebook)](/rest/api/fabric/notebook/livy-sessions/list-livy-sessions) 
- Spark Job Definition -  [List Sessions (Spark Job Definition)](/rest/api/fabric/sparkjobdefinition/livy-sessions/list-livy-sessions) 
- Lakehouse -  [List Sessions (Lakehouse)](/rest/api/fabric/lakehouse/livy-sessions/list-livy-sessions)

2. **Single Spark Application APIs**

    a. **Get application details** 

    - Notebook -  [Get Livy Session (Notebook)](/rest/api/fabric/notebook/livy-sessions/get-livy-session)
    - Spark Job Definition - [Get Livy Session (SparkJobDefinition)](/rest/api/fabric/sparkjobdefinition/livy-sessions/get-livy-session)
    - Lakehouse - [Get Livy Session (Lakehouse)](/rest/api/fabric/lakehouse/livy-sessions/get-livy-session)

    b. **Retrieve logs and metrics** 

    - [Open-Source APIs](../data-engineering/open-source-apis.md)
    - [Livy Log APIs](../data-engineering/livy-log.md)
    - [Driver log APIs](../data-engineering/driver-log.md)
    - [Executor Log APIs](../data-engineering/executor-log.md)
    - [Resource usage APIs](../data-engineering/resource-usage-apis.md)
