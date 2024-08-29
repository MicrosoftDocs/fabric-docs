---
title: Fabric Notebook known limitation
description: Learn about known limitations of fabric notebook.
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.search.form: Develop and run notebooks
ms.date: 08/29/2024
---

# Fabric Notebook known limitation

This document outlines the known limitations of Fabric notebooks to help you understand the constraints and optimize your notebook usage effectively and avoid common issues. 

## Notebook sizing

- You can manually save notebooks up to **32 MB**.
- The maximum notebook size for revision snapshots autosaving, import, export, and cloning is **32 MB**.
- Individual notebook cells have an input limit of **500 KB** and output limit of **50 MB**.
- The maximum resource storage for both resources folder and environment is **500 MB**, with a single file cap of **100 MB**.

## Output table

- Rich dataframe table view are limited to **10K** rows or **5 MB**.

## Other Specific Limitations

- **256** code cells could be executed for each notebook at most.
- The upper limit for notebook activities or concurrent notebooks is **50**.
- The statement depth for ```%run``` is up to **5**, with a total of **1000** referenced cells.
- Notebook job history is retained for **60 days**.
- To personalize your Spark session in ```%%configure```, set the same value for "DriverMemory" and "ExecutorMemory". The "driverCores" and "executorCores" values should also be the same. Choose an executor size from the following options: **(4, 28g)**, **(8, 56g)**, **(16, 112g)**, **(32, 224g)** or **(64, 400g)**. Furthermore, use this formula to make sure capacity stays within limits: (NumExecutors + 1) * ExecutorCores.
