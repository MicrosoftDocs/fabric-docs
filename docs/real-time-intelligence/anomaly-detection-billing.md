---
title: Anomaly Detector Capacity Usage and Billing in Real-Time Intelligence
description: Learn about capacity usage and billing for Anomaly Detector in Real-Time Intelligence.
ms.reviewer: tessarhurr
ms.author: v-hzargari
author: hzargari-ms
ms.topic: concept-article
ms.custom: 
ms.date: 12/10/2025
ms.search.form: Anomaly detector billing
---

# Anomaly detector capacity usage and billing in Real-Time Intelligence

Anomaly Detector in Microsoft Fabric Real-Time Intelligence automatically identifies unusual patterns in your data from Eventhouse tables. It empowers you to monitor anomalies in real-time, without requiring data science expertise, by using no-code tools for setup and continuous monitoring. This article explains how Real-Time Intelligence measures, bills, and reports Anomaly Detector usage.

## Key concepts

- **Capacity Units (CUs)**: All operations in Fabric consume CUs. Anomaly Detector usage is billed based on the number of queries executed during analysis and continuous monitoring.
- **Eventhouse Dependency**: Both model recommendations and anomaly monitoring rely on Eventhouse queries. These queries drive CU consumption.
- **Preview Status**: Anomaly Detector is currently in public preview. Billing starts December 2025.

## How Real-Time Intelligence measures Anomaly Detector usage

Anomaly Detector operations include:

- **Interactive Analysis**
    - When you initiate anomaly detection from the Real-Time hub or Eventhouse table, the system runs queries to analyze historical data and recommend models.
    - Each analysis session consumes CUs based on query complexity and data size. 
- **Continuous Monitoring**
    - After deploying a model for monitoring, the system routinely queries Eventhouse to detect anomalies in the incoming data.
    - Each monitoring cycle incurs CU consumption based on the check frequency and data volume, which determines the associated billing.
    > [!IMPORTANT]
    > Billing is tied to query execution and not to the volume of data processed.

## Billing meter

Anomaly Detector uses one dedicated billing meter:

- Meter Name: Anomaly Detector Queries Capacity Usage CU
- Operation Name: Anomaly Detector Run Queries

This single meter tracks all CU consumption for both interactive analysis and continuous monitoring. You can find the detailed usage reports in the Microsoft Fabric Capacity Metrics app or through the Azure billing system.

## Reporting and visibility

- The Microsoft Fabric Capacity Metrics app receives usage events, so capacity admins can monitor Anomaly Detector CU consumption.
- Customers can view CU consumption per operation, helping them understand costs associated with anomaly detection activities.

## Best practices

- Monitor CU usage regularly to manage costs effectively and avoid unexpected charges.
- Use grouping and filtering options to optimize query efficiency.

## Related articles

- [Anomaly Detection in Real-Time Intelligence](anomaly-detection.md)
- [Anomaly Detection Models](anomaly-detection-models.md)
- [Troubleshoot Anomaly Detection](troubleshoot-anomaly-detection.md)