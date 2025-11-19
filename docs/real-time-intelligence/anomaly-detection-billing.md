---
title: Anomaly Detector Capacity Usage and Billing in Real-Time Intelligence
description: Learn about capacity usage and billing for Anomaly Detector in Real-Time Intelligence.
ms.reviewer: tessarhurr
ms.author: v-hzargari
author: hzargari-ms
ms.topic: conceptual
ms.custom: 
ms.date: 11/19/2025
ms.search.form: Anomaly detector billing
---

# Anomaly Detector Capacity Usage and Billing in Real-Time Intelligence

Anommaly detector in Microsoft Fabric Real-Time Intelligence helps you automatically identify unusual patterns in your data from Eventhouse tables. It empowers you to monitor anomalies in real-time, without requiring data science expertise, using no-code tools for setup and continuous monitoring. This article explains how Anomaly Detector usage is measured, billed, and reported in Real-Time Intelligence.

## Key concepts

- **Capacity Units (CUs)**: All operations in Fabric consume CUs. Anomaly Detector usage is billed based on the number of queries executed during analysis and continuous monitoring.
- **Eventhouse Dependency**: Both model recommendations and anomaly monitoring rely on Eventhouse queries. These queries drive CU consumption.
- **Preview Status**: Anomaly Detector is currently in Public Preview. Billing starts on Dec 8, 2025.

## How Anomaly Detector usage is measured

Anomaly Detector operations include:

1. Interactive Analysis
    1. When you initiate anomaly detection from the Real-Time hub or Eventhouse table, the system runs queries to analyze historical data and recommend models.
    1. Each analysis session consumes CUs based on query complexity and data size. 
1. Continuous Monitoring
    1. Once a model is deployed for monitoring, the system periodically queries Eventhouse to check for anomalies in incoming data.
    1. Each monitoring cycle consumes CUs based on the frequency of checks and the volume of data processed, and are billed accordingly.

> [!important]
> [Billing is tied to query execution and not to the volume of data processed.]

## Biling meter

Anomaly Detector uses one dedicated billing meter:

- Meter Name: Anomaly Detector Queries Capacity Usage CU
- Operation Name: Anomaly Detector Run Queries

This single meter tracks all CU consumption for both interactive analysis and continuous monitoring. Usage is reported to the Microsoft Fabric Capacity Metrics app and Azure billing system.

## Reporting and visibility

- Usage events are emitted to the Microsoft Fabric Capacity Metrics app, allowing capacity admins to monitor Anomaly Detector CU consumption.
- Customer can view CU consumption per operation, helping them understand costs associated with anomaly detection activities.
- Integration with MWC dashboards ensures transparency for anomaly detection workloads.

## Best practices

- Monitor CU usage regularly to manage costs effectively and avoid unexpected charges.
- Use grouping and filtering options to optimize query efficiency.

## Related articles

- [Anomaly Detection in Real-Time Intelligence](anomaly-detection.md)
- [Anomaly Detection Models](anomaly-detection-models.md)
