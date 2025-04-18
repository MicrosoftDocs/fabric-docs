---
title: Known issue - Spark job submission failure with Library Management error
description: A known issue is posted where a Spark job submission failure with Library Management error
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/09/2025
ms.custom: known-issue-1085
---

# Known issue - Spark job submission failure with Library Management error

You can submit a Spark job using a Notebook or Spark Job Definition that uses custom libraries or packages. The submission fails with a Library Management error.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

The Spark job session fails to start with an error. The error code is similar to: `LM_LibraryManagementPersonalizationStatement_Error`.

## Solutions and workarounds

To work around the issue, following one of these approaches:

- Recreate a new Environment and attach the same libraries. Select **Publish**, and wait for the publish to complete. Attach the new Environment to your Notebook and submit your job.
- Remove all libraries from your existing Environment. Select **Publish**, and wait for the publish to complete. Then, reattach your libraries to the Environment again. Select **Publish**, and wait for the publish to complete. Attach the Environment to your Notebook and submit your job.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
