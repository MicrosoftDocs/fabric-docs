---
title: Choosing Between Python and PySpark Notebooks in Microsoft Fabric
description: Learn more about choosing between python and pyspark notebooks in Microsoft Fabric.
author: jejiang
ms.author: jejiang
ms.reviewer: whhender
ms.topic: tutorial
ms.date: 05/26/2025
---

# Choosing between Python and PySpark Notebooks in Microsoft Fabric

With the introduction of lightweight Python Notebooks in Microsoft Fabric, customers now have two robust options for building and scaling analytics workflows: Python Notebooks and PySpark Notebooks. While both provide a familiar Notebook interface, they differ significantly in how they manage compute resources, scalability, and cost-efficiency. 
 
Fabric simplifies the process of selecting or transitioning between notebook types, enabling data professionals to optimize for agility, performance, and budget. This guide is designed to help you evaluate which Notebook is best suited for your current needs-and how to evolve your approach as your workloads grow in complexity and scale. The 'starter pool' provides a pre-warmed compute container that enables near-instant startup for Python or PySpark notebooks. 

## Quick Decision Matrix - Choose Fast

Best for quick selection based on workload type. 

Use this high-level reference to quickly determine the most suitable notebook type for common workload patterns. This table is best for early-stage planning and architecture reviews. 

| Scenario | Recommended Notebook |
|--- |---|
| Includes pre-installed DuckDB and Polars libraries | Python Notebooks |
| Small to medium data (fits in memory)  | Python Notebooks (or PySpark on single-node Spark cluster) |
| Rapid exploration & prototyping | Python Notebooks (or PySpark on single-node Spark cluster) |
| Large datasets (10GB+) exceeding memory | PySpark Notebooks |
| Complex data workflows or ETL pipelines | PySpark Notebooks |
| High-concurrency or parallel execution | PySpark Notebooks |
| Needs Spark-native APIs (MLlib, SQL, Streaming) | PySpark Notebooks |

## Quick Summary of Key Scenarios - Compare Deeply

Use this structured comparison table to understand the architectural and operational trade-offs between notebook types. Best suited for engineering evaluations or implementation planning. 

### **Execution & Performance**

| Scenario | Python Notebooks (2-core VM) | PySpark Notebooks (Spark Compute) |
| --- | --- | --- |
| Startup Time | The built-in starter pool initializes in approximately 5 seconds, while the on-demand pool takes around 3 minutes. | Start-up ranges from ~5 seconds (starter pool) to several minutes (on-demand Spark clusters). |
| Quick Transformations & API Calls | Ideal for small to medium sized datasets (up to 1GB) | Optimized for large datasets using vectorized execution. |
| Moderate Workloads | Not optimized for data sizes nearing memory saturation | Efficient at scaling via distributed compute. |
| Handling of Large Datasets | Limited by single-node memory. May struggle with scaling. | Distributed processing ensures scalable handling of multi-GB to TB workloads. |
| High-Concurrency Execution | Manual FIFO-style parallelism per notebook | System-managed concurrency with support for parallel execution. |
| Resource Customization & Scaling | Fixed compute (2-core VM); does not auto scale. Users can manually scale out using %%config within the notebook. | Flexible resource allocation; supports autoscaling and custom Spark configurations. |

### **Workflow & Orchestration**

| Scenario | Python Notebooks (2-core VM) | PySpark Notebooks (Spark Compute) |
| --- | --- | --- |
| API Orchestration | Effective for lightweight orchestration and control flows, especially REST/gRPC-based integrations | Less optimal for basic orchestration tasks due to longer start-up and distributed overhead. |
| Complex ETL DAGs | Limited to sequential (FlFO) task execution on a single node, lacking support for parallel processing. | Supports concurrent task execution within DAGs using FlFO or FAlR scheduling, enabling efficient parallel processing for complex ETL workflows. |

### **Platform & Library Support**

| Scenario | Python Notebooks (2-core VM) | PySpark Notebooks (Spark Compute) |
| --- | --- | --- |
|  Library Access | Strong Python library support across multiple runtimes; however, limited access to Spark-native libraries may require manual integration. | Fully supports MLlib, Spark SQL, PySpark, and Spark Streaming. |
| Delta Lake Handling | The Python Notebook runtime comes with pre-installed [deltas](https://delta-io.github.io/delta-rs/) and [duckdb](https://duckdb.org/) libraries, enabling both reading and writing of Delta Lake data. However, some Delta Lake features may still be unsupported. | Fully supported with native compatibility. |

### **Production & Enterprise Readiness**

| Scenario | Python Notebooks (2-core VM) | PySpark Notebooks (Spark Compute) |
| --- | --- | --- |
| Production Management | Limited production features; Does not support environment vars. | Support for production workflows with environment variables, library management through environment items, and item-based deployment. |

### **Cost Considerations**

| Scenario | Python Notebooks (2-core VM) | PySpark Notebooks (Spark Compute) |
| --- | --- | --- |
| Cost Profile | Lower initial cost (minimum 2 vCores); best suited for lightweight, ad hoc workloads. | Higher initial cost (minimum 4 vCores); designed for scalable, enterprise-grade workloads. Autoscaling can reduce costs, potentially resulting in a lower total cost of ownership (TCO). |

## When to Use Python vs. PySpark Notebooks

Fabric Notebooks offer flexibility for a wide range of users and workloads. This section helps you assess which notebook type aligns best with your current and future needs. 

Use **Python Notebooks** for fast iteration, cost-effective analysis, and interactive development. They are ideal for smaller datasets and include native support for libraries like DuckDB and Polars. 

Use **PySpark Notebooks** for distributed computing, production-grade ETL workflows, or scenarios where high concurrency and Spark-native APIs are essential. 

### **Choose Python Notebooks When:**

- You need fast start-up (typically within seconds) on a lightweight 2-core container. 
- If minimizing compute cost is a priority - for interactive analysis or scheduled micro-jobs. 
- You want immediate access to pip-installable libraries and pre-installed DuckDB and Polars. 
- You need to test across different Python runtime versions. 
- Your data comfortably fits in the memory of a single node. 

### **Choose PySpark Notebooks When:**

- Your workloads exceed the memory or compute limits of a single node. 
- You require high-concurrency pools to run parallel jobs across Notebooks. 
- You're orchestrating complex ETL pipelines with FAIR or FIFO scheduling. 
- You rely on Spark-native APIs such as MLlib, Spark SQL, or Spark Streaming. 
- You need production-grade features like environment variables and item-based library management. 

## Key Differences at a glance - reference concisely

See Glossary at the end of this guide for definitions of terms like VORDER, NEE, and Items-Based Library Management. 

This section provides a quick reference for the fundamental technical and architectural differences between Python and PySpark Notebooks. 

| Category | Python Notebooks | PySpark Notebooks |
| -------- | ---------------- | ----------------- |
| Compute Runtime | Lightweight container (2-core VM) | Spark cluster (single-node or high-concurrency pool) |
| Start-up Time  | Instant start-up (seconds via starter pool) | Start-up ranges from ~5 seconds (via starter pool) to several minutes (when using on-demand Spark clusters). |
| Cost Profile | Lower cost; ideal for short tasks and prototyping | Higher cost; suited for scalable, long-running workloads |
| Python/Spark Versioning | Multiple Python versions available | Tied to specific Spark runtime version |
| Custom Libraries | pip install + resource folders | pip install + resource folders + environments item |
| Fabric Spark Capabilities | Limited access to Spark engine features | Full access: NEE, Autotune, VORDER, Vegas Cache |
| Delta Lake Compatibility | Partially compatible; potential performance issues | Fully supported and optimized |

## Evolving your workload: from Python to PySpark

Fabric Notebooks are designed to grow with your workload complexity. This section outlines how you can scale your Notebook strategy from simple exploration to distributed data processing. 

| Stage | Recommended Notebook | Trigger Condition |
| -------- | ---------------- | ----------------- |
| **Start** | Python Notebooks (2-core) | Small, interactive workloads |
| **Scale Up** | Python Notebooks _(Manual switch to larger VM)_ | Approaching memory or CPU limits  |
| **Scale Out** | PySpark Notebooks _(Manual switch to Spark pool)_ | Need for distributed compute or parallel execution |

> [!TIP] 
> As you transition to PySpark, ensure your code uses Spark-compatible syntax. Validate your workloads in the Spark environment before deploying to production.

## Summary

Python Notebooks support kernel operations such as interrupting and restarting the kernel, which accelerates interactive development. They are ideal for rapid, cost-efficient analysis of small to medium-sized datasets and excel at prototyping, experimentation, and lightweight scheduled tasks.  

As data volume and complexity increase, PySpark Notebooks offer the distributed computing power and production-grade features needed for large-scale enterprise analytics. Choosing the right Notebook is an evolving process. Start with the simplest option that meets your current needs and scale as your data landscape grows. 

Refer to the Glossary on the final page for explanations of terms such as NEE, VORDER, and Vegas Cache. 

## Glossary of terms

- Item-Based Library Management: Manages versioned packages and production libraries within the Environment item. 
- Delta Lake Compatibility: Cross-environment support for Delta tables; fully supported in PySpark. 
- FAIR Scheduling: A scheduling policy that allocates resources fairly across concurrent Spark jobs. 
- FIFO Scheduling: First-In-First-Out execution order for job scheduling. 
- NEE (Native Execution Engine): An optimized query engine unique to Fabric Spark. 
- Spark Pool: A shared compute resource for running distributed Spark workloads. 
- VORDER: Fabric optimization for vectorized query execution paths. 
- Vectorized Acceleration: Processes data in batches using vector operations for faster performance. 
- Vegas Cache: An in-memory cache that speeds up repeated Spark data access. 

## Related content

- [How to use Microsoft Fabric notebooks](how-to-use-notebook.md)
- [Use Python experience on Notebook](using-python-experience-on-notebook.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
- [Introduction of Fabric NotebookUtils](notebook-utilities.md)