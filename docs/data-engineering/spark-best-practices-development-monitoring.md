---
title: Development and Monitoring
description: Standardize Spark development with runtime selection, high concurrency sessions, variable libraries, and comprehensive monitoring strategies.
ms.reviewer: anuve
ms.topic: concept-article
ms.custom:
  - best-spark-on-azure
ms.date: 10/23/2025
---

# Development and Monitoring

Learn how to establish a repeatable path from exploratory development to production deployment with parameterization, shared sessions, and effective observability practices.

## Development Best Practices

##### Scenario: You need to know which runtime to use for development.

Begin with the latest available Fabric Runtime to take advantage of recent enhancements and performance optimizations. Currently, Fabric Runtime 1.3 is the most up-to-date version, featuring Spark 3.5, Java 11, and Python 3.11. This version introduces key improvements such as the Native Execution Engine, which significantly boosts performance by executing Spark code on the Velox C++ engine instead of the traditional Java Virtual Machine (JVM).

##### Scenario: You have custom JARs uploaded in the environment and they're taking longer to publish. How can you reduce the environment publishing time?

Store the Java Archive (JAR) files in the Lakehouse and pass the path via spark.jars. Alternatively, if the package is in a Maven repository, pass it via `spark.jars.packages`.

##### Scenario: When to run on High Concurrency Mode?

- You're doing development of 5 different Spark applications in 5 Notebooks. You find waiting for session to be started in each of the Notebooks is impacting your productivity. To run multiple Notebooks having same Lakehouse and environment, run in High Concurrency mode to optimize costs and reduce the startup time of subsequent Notebooks.

- You're running a pipeline with Notebooks in foreach, session start-up time of each of the Notebook executions is leading to longer execution time. To minimize cumulative session startup times for Notebooks sharing the same environment and default Lakehouse in a pipeline, enable High Concurrency mode at the workspace level and add session tags to share the same session. 

- When using High Concurrency sessions:
    - To share variables across Notebooks in the same session, use global temp views: `df.createOrReplaceGlobalTempView("global_view")`.
    - To access the view from another Notebook in the same High Concurrency (HC) session, use: `spark.sql("SELECT * FROM global_temp.global_view")`.

##### Scenario: How to organize Materialized Lake Views (MLVs)?

- **Centralize Materialized Lake Views (MLVs):** Create all Materialized Lake Views (MLVs) for a workspace within a single Lakehouse to ensure a consolidated and clear representation in the Directed Acyclic Graph (DAG) view.

- **Handling Schema-less Tables for MLV Creation:** If your Lakehouse contains tables without a defined schema and you intend to create MLVs on those tables, follow this approach:

  1. Create a new Lakehouse that includes a schema.

  1. Use a Notebook to define MLVs that reference the original schema-less or schema-enabled Lakehouse tables.

    Here's the sample code:
    
    ```sql
    CREATE MATERIALIZED LAKE VIEW IF NOT EXISTS <old_workspace>.<old_lakehouse>.dbo.mlv_test_scot
    AS SELECT employee_id, first_name
    FROM <some_other_workspace>.<some_other_lakehouse>.dbo.manag1_delta
    LIMIT 10;
    ```

##### Scenario: How to centralize observability for Spark workloads across workspace?

To monitor all Spark applications across workspaces, configure the Fabric Apache Spark Diagnostic Emitter library within the environment. Attach this environment to the Notebooks running Spark applications. The emitter can send event logs and metrics to multiple destinations, including Azure Log Analytics, Azure Storage, and Azure Event Hubs for querying and analysis.

##### Scenario: You're a developer and looking for inline AI tools in Notebook to suggest code completions.

For lightweight inline AI assistance without starting a Spark session, enable Copilot Completions and type your query as a comment using the "#" symbol. Queries typed as comments (for example, `# write a sample pyspark code` triggers Copilot responses if completions are enabled).

##### Scenario: You have SparkR workloads running on runtime 1.3.

Since Spark 4.0 deprecates SparkR, migrate these workloads to Python or PySpark.

## CI/CD Flow

##### Scenario: How to replace parameters in CI/CD flow

In Continuous Integration/Continuous Deployment (CI/CD) pipelines, notebooks often need to adapt to different environments (for example, dev, test, prod). The variable library utilities in notebookutils allow you to inject environment-specific values dynamically—such as lakehouse names, mount points, and configuration flags—without hardcoding them.

You can use `notebookutils.variableLibrary.help()` to find out the detailed API usage.

**Example:** **Dynamically interacting Lakehouses**

1. Create a variable library and define the workspace name and lakehouse name inside the variable library. You can define multiple value sets, for example, Development, Test, Prod, and activate one of them according to your current environment.

    :::image type="content" source="media/spark-best-practices/variable-library.png" alt-text="Screenshot of alternate value sets creation." lightbox="media/spark-best-practices/variable-library.png":::

1. Retrieve the Variable Library and Assign Lakehouse Name.

    ```python
    # Retrieve the variable library named "MyVL"
    myvl = notebookutils.variableLibrary.getLibrary("MyVL")
    # Assign lakehouse name to a user-defined variable to avoid throttling
    lakehouse_name = myvl.customerInfoLHname
    # Use the lakehouse name in your logic
    print(f"Lakehouse Name: {lakehouse_name}")
    ```

1. Consume the lakehouse absolute path, you can construct a File path and use them in your notebook code.

    ```python
    workspace_name = myvl.Workspace_name
    lakehouse_name = myvl.customerInfoLHname
    
    # Construct the file path dynamically
    file_path = f"abfss://{workspace_name}@onelake.dfs.fabric.microsoft.com/{lakehouse_name}.Lakehouse/Files/\<FileName\>.csv"
    
    # Load and display the file
    df = spark.read.format("csv").option("header", "true").load(file_path)
    display(df)
    ```

    Alternatively, you can access Lakehouse Name via Direct Reference

    ```python
    lakehouse_name = notebookutils.variableLibrary.get("\$(/\*\*/MyVL/customerInfoLHname)")
    
    # Use it in your logic
    print(f"Lakehouse Name (via reference): {lakehouse_name}")
    ```


**Example: Dynamically setting default lakehouse**

You can use `%%configure` to customize your session while using the variable library to pass the values dynamically, such as default lakehouse, then you don't need to construct the lakehouse file path in the code anymore, you can just use the lakehouse relative path to interact with the data.

Sample code:

```config
%%configure
{
  "defaultLakehouse": {
    "name": { "variableName": "$(//myVL/LHname)" },
    "id": { "variableName": "$(//myVL/customerInfoLHname)" }
  }
}
```

Here are some important tips when using the variable library in your notebooks:

- To avoid experience throttling, always assign variable values to local variables before using them, and avoid inline usage of notebookutils.variableLibrary.get() inside logic blocks. If throttling happens when you have multiple variableLibrary request, add wait statement in the middle to reduce the concurrency.

- Place configuration logic (`%%configure`) at the top of your notebook for early session setup.

- Use descriptive variable names and document your variable library structure.

## Notebook Session Configuration

##### Scenario: Customize session configuration in the Notebook

[%%configure](/fabric/data-engineering/author-execute-notebook#spark-session-configuration-magic-command) is a powerful magic command in Microsoft Fabric notebooks. With `%%configure`, you can programmatically define Spark session properties, including default lakehouse, attached environment, runtime settings, and compute configurations.

**Interactive Development Phase**

**Use Case**: Exploratory data analysis, debugging, prototyping.

- **Place %%configure in the first cell**: It's a good habit to always put %%configure in the first cell. It takes effect when it becomes the first executed cell, so that Spark initializes the session with the desired configuration before any other code runs. If you execute it as the first cell, changes don't take effect unless you restart the session.

- **Avoid GUI dependency**: Configuring via code ensures reproducibility and avoids issues with GUI-based lineage tracking, which might not reflect programmatic changes. The system applies %%configure at session level (unlike GUI functions that apply at item level), giving it precedence over the GUI in terms of execution flow.

**Pipeline Execution Phase**

**Use Case**: Orchestrate in pipelines, CI/CD workflows, production data processing.

- **Parameterize your configuration**: Define the parameters in the parameter cell, use parameterized session configuration to dynamically assign lakehouse names, IDs, and workspace IDs, compute settings, etc. This is especially helpful when switching between environments or testing multiple setups.

    Example:
    
    ```config
    %%configure
    {
      "defaultLakehouse": {
        "name": { "parameterName": "defaultLakehouseName", "defaultValue": "TestLakehouse" },
        "id": { "parameterName": "defaultLakehouseId", "defaultValue": "abc123" }
      }
    }
    ```

- **Use variable library to customize the session**: While different teams have varying CI/CD architecture designs, but %%configure and the variable library, as part of a pure code experience, are highly flexible and enable diverse CI/CD needs. You can request the variable library within %%configure to dynamically adjust session settings—such as the default lakehouse, mount points, and attached environments. By activating different sets of variable library values based on the environment, notebook runs can adaptively consume the correct dependencies as the CI/CD environment changes.

    Example:
    
    - myVL is the name of Variable Library item.
    
    - LHname and LHid are variable keys defined in the variable library.
    
    ```config
    %%configure
    {
      "defaultLakehouse": {
        "name": {
          "variableName": "$(/**/myVL/LHname)" 
        },
        "id": {
          "variableName": "$(/**/myVL/LHid)"
        },
        "workspaceId": "<(optional) workspace-id-that-contains-the-lakehouse>"
      }
    }
    ```

## Monitoring Best Practices

##### Scenario: You want to analyze your Spark Application for skews and handle them.

- **What is Data Skew:** Data skew occurs when one or more partitions contain significantly more data than others, leading to imbalanced workloads. Similarly, time skew arises when certain tasks take substantially longer to complete, often due to data skew or differences in computational complexity. 

- **What are Partitions:** Partitions are the fundamental units of parallelism in Apache Spark and play a crucial role in performance optimization. When you partition 1 GB of data into 100 partitions, Spark attempts to process these 100 partitions concurrently as separate tasks—up to the number of available CPU cores in the cluster (assuming spark.task.cpus=1). 
    - For optimal performance, it's important that data is evenly distributed across partitions.
    - However, having too many partitions can introduce overhead from task scheduling and shuffle operations. It's important to profile and benchmark your workload to determine the appropriate number of partitions based on your data volume and the transformations. 

To analyze if there are skews: 

- *Jobs UI in Spark Monitoring* shows if there's skew, mean, and max metrics as shown here: 

    :::image type="content" source="media/spark-best-practices/spark-job-monitoring.png" alt-text="Screenshot of a Spark job UI showing skew, mean, and max metrics." lightbox="media/spark-best-practices/spark-job-monitoring.png":::

- Check *Spark UI* task aggregation metrics. If a significant gap exists between median, 75th percentile and max metrics, skew could exist. If that stage takes significant amount of time and skew is significant, handle the skew to optimize performance.  

    :::image type="content" source="media/spark-best-practices/spark-task-aggregation.png" alt-text="Screenshot of Spark UI task aggregation metrics." lightbox="media/spark-best-practices/spark-task-aggregation.png":::

Various reasons can cause skew. The most common reasons result from Join or group by operations. For example: Uneven distribution of data for unique values of the grouping columns can result in data skew. This might result in straggling tasks. To handle such skews: 

- Check whether you enabled Adaptive Query Execution (AQE), as it uses runtime statistics to optimize performance. It adjusts post-shuffle partitions through coalescing, converts sort merge joins into broadcast joins and applies skew join optimization. 

- Use repartition or coalesce to redistribute data. Coalesce vs Repartition: Use repartition to increase or decrease partitions. Repartition is an expensive operation as it shuffles the data, but it results in almost equal sized partitions. Coalesce only reduces partitions and avoids shuffles. Finding the optimal number of partitions often involves experimentation and tuning (and this changes with data volume and shape, thus can evolve) 

##### Scenario: You have Fabric Spark Notebooks deployed in a production workspace, but you don't have direct access to it. The production support team reports that a Fabric Spark job failed in the production workspace, and you need to analyze the logs to troubleshoot the issue.

In production workspaces, don't grant developers or non-privileged users direct access. Instead, grant read-only access only to privileged users such as Site Reliability Engineers (SREs) and production support engineers to retrieve Spark logs.

If any Spark Notebook or Spark Job Definition (SJD) in the production workspace requires investigation, production support engineers can download the logs from the Spark UI and share them with developers for further analysis. This approach follows the principle of least privileged access for ensuring security.:::image type="content" source="media/spark-best-practices/send-event-logs-flow.png" alt-text="Diagram of the event logs flow from support to developers." lightbox="media/spark-best-practices/send-event-logs-flow.png":::

Developers who don't have access to the workspace can set up a Spark History Server locally to view all the event logs and investigate. 

## Spark Session Configurations

##### Scenario: You developed a Spark application in Fabric and you want to optimize further.

Spark Session configs and Delta table feature flags exist so that you can custom tailor Spark to the needs of your specific workload. 

- **Enable Native Execution Engine (NEE)** in the environment and run the Spark applications for better performance. To enable NEE in the session level, here are the Spark configs: 

    ```PySpark / Scala
    spark.conf.set("spark.native.enabled", "true")
    ```
    
    ```SparkSQL
    spark.sql("SET spark.native.enabled = True")
    ```

- If you're not using the NEE, and thus operating on the traditional Spark JVM-based execution engine, you miss huge performance gains. We're talking 2x–5x improvements in many cases. 

- **Read Optimization**: Spark determines the number of partitions based on input file sizes. Tune `spark.sql.files.maxPartitionBytes` and benchmark for your workload to optimize partition sizing.

- **Shuffle Optimization**: Tweak `spark.sql.shuffle.partitions` (default is 200) to optimize the number of partitions when shuffling large data.

- **Task Parallelism (spark.task.cpus):**

  - Controls the number of CPU cores allocated per Spark task. Default is 1.

  - If tasks are CPU-bound but don't require significant memory: reduce spark.task.cpus (e.g: 0.5) to allow more tasks to run in parallel.

  - If tasks are memory-intensive and cause executor Out of Memory (OOM) errors: increase spark.task.cpus (e.g: 2) to allocate more memory per task and benchmark performance.

- **Write Optimization:** 

  - Enable Auto Compaction for ingestion pipelines with frequent small writes on new tables, we recommend using auto compaction instead of scheduling OPTIMIZE jobs for compaction:

  `spark.conf.set('spark.databricks.delta.autoCompact.enabled', True)`

  - You can use predefined Spark resource profiles to optimize Spark configurations based on use cases. Refer to this documentation for more details: [Configure Resource Profile Configurations in Microsoft Fabric](/fabric/data-engineering/configure-resource-profile-configurations). Here are the Spark configurations you can set based on the use cases:

    | Profile | Use Case | Configuration Property |
    |---|---|---|
    | readHeavyForSpark | Optimized for Spark workloads with frequent reads | `spark.fabric.resourceProfile = readHeavyForSpark` |
    | readHeavyForPBI | Optimized for Power BI queries on Delta tables | `spark.fabric.resourceProfile = readHeavyForPBI` |
    | writeHeavy | Optimized for high-frequency ingestion & writes | `spark.fabric.resourceProfile = writeHeavy` |
    | custom | Fully user-defined configuration | `spark.fabric.resourceProfile = custom` |

    By default, Microsoft Fabric defaults to the `writeHeavy` profile with the Spark Configuration: `spark.fabric.resourceProfile = writeHeavy`.
    
    The `writeHeavy` profile has the following configurations:
    ```config
    spark.sql.parquet.vorder.default": "false", "spark.databricks.delta.optimizeWrite.enabled": "false", "spark.databricks.delta.optimizeWrite.binSize": "128", "spark.databricks.delta.optimizeWrite.partitioned.enabled": "true", "spark.databricks.delta.stats.collect": "false"
    ```


## Related content

- [Fabric Spark Best Practices Overview](./spark-best-practices-overview.md)
- [Fabric Spark Capacity and Cluster Planning](spark-best-practices-capacity-planning.md)
- [Fabric Spark Security](spark-best-practices-security.md)
