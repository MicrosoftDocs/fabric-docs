---
title: Fabric Notebook known limitation
description: Learn about known limitations of fabric notebook.
ms.reviewer: jingzh
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.search.form: Develop and run notebooks
ms.date: 08/29/2024
---

# Fabric Notebook known limitation

This document outlines the known limitations of Fabric notebooks to help you understand the constraints and optimize your notebook usage effectively and avoid common issues. 

## Notebook sizing

- Notebook content size is limited to **32 MB**.
- The notebook snapshot size is limited to **32 MB**.
- Rich dataframe table output is limited to **10K** rows and **5 MB** data size.
- The maximum Resource storages for both built-in folder and environment folder are **500 MB**, with a single file size up to **100 MB**.

## Output table

- Rich dataframe table view is limited to **10K** rows or **5 MB**.

## Other specific limitations

- **256** code cells could be executed for each notebook at most.
- **7 days** is the longest running job time.
- The upper limit for notebook activities or concurrent notebooks in ```notebookutils.notebook.runMultiple()``` is
**50**.
- The statement depth for ```%run``` is up to **5**, with a total of **1000** referenced cells.
- Notebook job history is retained for **60 days**.
- To personalize your Spark session in ```%%configure```, set the same value for "DriverMemory" and "ExecutorMemory". The "driverCores" and "executorCores" values should also be the same. Choose an executor size from the following options: **(4, 28g)**, **(8, 56g)**, **(16, 112g)**, **(32, 224g)** or **(64, 400g)**. Furthermore, use this formula to make sure capacity stays within limits: (NumExecutors + 1) * ExecutorCores.
