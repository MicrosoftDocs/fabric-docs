---
title: Get data from Apache Flink
description: Learn how to get data from Apache Flink in a KQL database in Real-Time Analytics.
ms.reviewer: akshayd
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.date: 02/15/2024
---
# Get data from Apache Flink

[!INCLUDE [ingest-data-flink](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-flink-1.md)]

## Authenticate

You can authenticate from Flink to using a Microsoft Entra ID application.

[!INCLUDE [ingest-data-flink](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-flink-2.md)]

## Write data from Flink

To write data from Flink:

1. Import the required options:

    ```java
    import com.microsoft.azure.flink.config.KustoConnectionOptions;
    import com.microsoft.azure.flink.config.KustoWriteOptions;
    ```

1. Use your application to Authenticate.

    ```java
    KustoConnectionOptions kustoConnectionOptions = KustoConnectionOptions.builder()
    .setAppId("<Application ID>")
    .setAppKey("<Application key>")
    .setTenantId("<Tenant ID>")
    .setClusterUrl("<Cluster URI>").build();
    ```

[!INCLUDE [ingest-data-flink](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-flink-3.md)]

## Related content

* Use [Apache Flink on Azure HDInsight on AKS](/azure/hdinsight-aks/flink/integration-of-azure-data-explorer)