---
title: Get data from Fluentd
description: Learn how to get data from Fluentd into an Eventhouse table.
ms.reviewer: ramacg
ms.author: v-hzargari
author: hzargari-ms
ms.topic: article
ms.date: 01/07/2026
---

# Get data from Fluentd

Log ingestion is the process of collecting, transforming, and preparing log data from applications, servers, containers, and cloud services so you can store, analyze, and monitor it. 
Logs capture information such as errors, warnings, usage patterns, and system performance. Reliable log ingestion ensures that operational and security data is available in near real-time for troubleshooting and insights.

This article explains how to send logs from Fluentd to an Eventhouse table, including installation, configuration, and validation steps.

## Overview

### What is Fluentd?

Fluentd is an open-source data collector you can use to unify log collection and routing across multiple systems. It supports more than 1,000 plugins and provides flexible options for filtering, buffering, and transforming data. You can use Fluentd in cloud‑native and enterprise environments for centralized log aggregation and forwarding.

## Prerequisites

- Ruby installed on the node where logs have to be ingested. To install fluentd dependencies using gem package manager, see the [Ruby installation instructions](https://github.com/Azure/azure-kusto-fluentd/?tab=readme-ov-file#requirements).
- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
- A KQL database with ingestion permissions.

## How to get started with Fluentd and an Eventhouse table

1. **Install Fluentd** by using RubyGems:

    ```bash
    gem install fluentd
    ```

1. **Install the Fluentd Kusto plugin**:

    ```bash
    gem install fluent-plugin-kusto
    ```

1. **Configure Fluentd** by creating a configuration file (for example, `fluent.conf`) with the following content. Replace the placeholders with your details:

    ```xml
    <match <tag-from-source-logs>>
      @type kusto
      endpoint https://<your-cluster>.<region>.kusto.windows.net
      database_name <your-database>
      table_name <your-table>
      logger_path <your-fluentd-log-file-path>
    
      # Authentication options
      auth_type <your-authentication-type>
    
      # AAD authentication
      tenant_id <your-tenant-id>
      client_id <your-client-id>
      client_secret <your-client-secret>
    
      # Managed identity authentication (optional)
      managed_identity_client_id <your-managed-identity-client-id>
    
      # Workload identity authentication (optional)
      workload_identity_tenant_id <your-workload-identity-tenant-id>
      workload_identity_client_id <your-workload-identity-client-id>
    
      # Non-buffered mode
      buffered false
      delayed false
    
      # Buffered mode
      # buffered true
      # delayed <true/false>
    
      <buffer>
        @type memory
        timekey 1m
        flush_interval 10s
      </buffer>
    </match>
    ```

For more configuration and authentication details, see the [Fluentd Kusto plugin documentation](https://github.com/Azure/azure-kusto-fluentd/?tab=readme-ov-file#workload-identity-authentication).

1. **Prepare an Eventhouse table for ingestion**:
    1. Browse your query environment.
    1. Select the database where you'd like to create the target table.
    1. Create a table for log ingestion. For example:

    ```kusto
    .create table LogTable (
      tag:string,
      timestamp:datetime,
      record:dynamic
    )
    ```

1. **Run Fluentd** with the configuration file:

    ```bash
    fluentd -c fluent.conf
    ```

1. **Validate log ingestion** by:
    1. **Checking the Fluentd log file**, confirming there are no errors, and that the ingestion requests are sent successfully. 

        :::image type="content" source="media/ingest-fluentd/log-example.png" alt-text="Screenshot of Fluentd log file showing successful ingestion requests":::

    1. **Querying the table** to ensure logs are ingested correctly:

    ```kusto
    LogTable
    | take 10
    ```

1. **Ingestion mapping**: Use the pre-defined ingestion mappings in Kusto to transform data the default 3-column format into your desired schema. For more information, see [Ingestion mappings support](https://github.com/Azure/azure-kusto-fluentd/?tab=readme-ov-file#ingestion-mapping-support).

## Related content

- [Data connectors overview](event-house-connectors.md)
- [Query data in a KQL queryset](kusto-query-set.md?tabs=kql-database)
