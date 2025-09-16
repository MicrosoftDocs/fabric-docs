---
title: Specifications of Anomaly Detection Models in Real-Time Intelligence
description: Learn about the specifications of anomaly detection models in Fabric Real-Time Intelligence.
ms.author: v-hzargari
author: hzargari-ms
ms.reviewer: tessarhurr
ms.topic: conceptual
ms.custom: 
ms.date: 09/15/2025
ms.search.form: Anomaly detection models specifications
---

# Specifications of anomaly detection models in Fabric (Preview)

This article provides an overview of the specifications and capabilities of the anomaly detection models available in Fabric Real-Time Intelligence. These models are designed to automatically identify unusual patterns and outliers in your data streams.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Supported models

| Model Name         | Description                                      | Package          |
|--------------|--------------------|--------------------------------------------------|------------------|
| Signal Watcher              | Analyzes the underlying signal to detect unusual behaviors, from subtle shifts to sharp spikes. | [TSB-AD](https://github.com/TheDatumOrg/TSB-AD) - Based on SR algorithm     |
| Signal Watcher (Seasonal)            | Detects a wide range of unusual behaviors, from subtle shifts to sharp spikes, by analyzing the underlying signal augmented with seasonality. | [TSB-AD](https://github.com/TheDatumOrg/TSB-AD) - Based on SR algorithm  |
| Signal Watcher (Enhanced Seasonal)   | Detects a wide range of unusual behaviors, from subtle shifts to sharp spikes, by analyzing the underlying signal, augmented with complex seasonality.    | [TSB-AD](https://github.com/TheDatumOrg/TSB-AD) - Based on SR algorithm     |
| Histogram Sentinel   | Identifies anomalies based on data distribution patterns, offering fast and scalable performance for large datasets.   | [TSB-AD](https://github.com/TheDatumOrg/TSB-AD) - Based on HBOS algorithm|
| Pattern Proximity | Uses k-nearest neighbors to detect anomalies based on the proximity of data points in the feature space. Ideal for local pattern shifts. | [TSB-AD](https://github.com/TheDatumOrg/TSB-AD) - Based on KNN algorithm |
| Core Pattern Finder | Reduces complex data to its most essential patterns, making it easier to detect subtle and hidden anomalies. | [TSB-AD](https://github.com/TheDatumOrg/TSB-AD) - Based on PCA algorithm |
| Change Spike Detector| Spots sharp, local changes by comparing how values evolve over time. | MS Developed |
| Rolling Change Tracker | Tracks moving trends to identify gradual shifts in data patterns. | MS Developed |
| Outlier Radar | Highlights data points that deviate significantly from the average, useful for spotting large and sudden outliers. | MS Developed |
| Robust Outlier Radar | Similar to Outlier Radar, this model uses the median for a more robust analysis of skewed data. It focuses on significant deviations while ignoring natural fluctuations. This makes it stable in noisy environments. | MS Developed |
| Robust Outlier Radar (Seasonal) | Handles complex data distributions and incorporates seasonal awareness, making it ideal for recurring patterns. | MS Developed |
| Deviation Pulse | Monitors signals for significant deviations, optimized for detecting standout events. | MS Developed |

## Related Content

* [Anomaly Detection Overview](anomaly-detection.md)
* [Anomaly Detection Troubleshoot](troubleshoot-anomaly-detection.md)
