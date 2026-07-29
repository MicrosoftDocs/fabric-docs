---
title: Python notebook runtime and kernel lifecycle in Fabric
description: Learn the support lifecycle for selectable Python kernels in Fabric Python notebooks, including lifecycle stages, current kernel status, and migration guidance.
ms.reviewer: jingzh
ms.topic: overview
ms.date: 07/24/2026
---

# Python notebook runtime and kernel lifecycle in Fabric

Fabric Python notebooks let you choose a Python kernel version. Each version follows a support lifecycle that tracks the upstream Python community. When a version reaches end of support, you switch to a newer kernel and your notebooks keep running.

> [!NOTE]
> This article covers the lifecycle of Python notebook kernels. It doesn't cover Apache Spark runtimes, which follow a separate lifecycle. For the Spark runtime lifecycle, see [Lifecycle of Apache Spark runtimes in Fabric](./lifecycle.md).

## How Python notebook kernels differ from Spark runtimes

Python notebook kernels are Jupyter notebook kernels and differ from Spark runtimes. A Spark runtime includes a specific Python version as part of a larger component set. A Python notebook kernel is a standalone Python version you select for pure Python notebooks. The two are versioned and supported separately. Choosing a Spark runtime doesn't change your Python notebook kernel, and choosing a Python notebook kernel doesn't change your Spark runtime.

## Current kernel support

Fabric Python notebooks offer Python 3.10, Python 3.11, and Python 3.12. Python 3.12 is the default kernel.

The following table lists each selectable kernel, its upstream end-of-life date, and its current stage. Fabric follows upstream Python community support dates unless Microsoft defines a stricter milestone.

| Python version | End of life | Stage | Notes |
|----------------|-------------|-------|-------|
| Python 3.10 | October 2026 | Security updates | End of support announced for October 2026. Migrate to Python 3.11 or Python 3.12. |
| Python 3.11 | October 2027 | Security updates | Migration target for Python 3.10 workloads. |
| Python 3.12 | October 2028 | Security updates | Default kernel. Latest supported migration target for Python 3.10 workloads. |

## Lifecycle stages

Each Python kernel version moves through these stages.

| Stage | Description |
|-------|-------------|
| Public preview | The version is available for evaluation under preview terms, not for production. The Microsoft Azure Preview terms apply. See [Preview terms of use](../fundamentals/preview.md). |
| General availability | The version is generally available and production-ready. |
| Security updates | The version is fully supported and selectable. The upstream Python community ships security fixes only. All current kernels are in this stage. |
| Deprecated | On the published end-of-support date, the version becomes unsupported. New notebook creation with this version is blocked. Existing notebooks continue to run for a limited period at your own risk. |
| Removed | The version is removed as a selectable kernel a defined period after end of support. |

## What each stage means for your notebooks

- **Security updates.** You can select the version and run notebooks with full support.
- **Deprecated.** You can't create new notebooks with the version. Existing notebooks continue to run for a limited period at your own risk. Migrate to a supported version.
- **Removed.** The version no longer appears as a selectable kernel. Open your notebooks with a supported kernel.

## Version deprecations in progress

This section lists the Python kernel versions approaching end of support. Migrate any notebook that uses a listed version before its end-of-support date.

**Python 3.10.** Python 3.10 reaches end of support in October 2026, aligned with its upstream end of life. Migrate your Python 3.10 notebooks to Python 3.11 or Python 3.12 before that date. After the end-of-support date, existing Python 3.10 notebooks run for a limited period before Python 3.10 is removed.

End of support for one Python version doesn't affect support for Python notebooks or for other kernel versions.

## Migrate between Python kernel versions

1. Open the notebook and select a supported kernel, Python 3.11 or Python 3.12, from the kernel menu. For kernel selection steps, see [Use Python experience on Notebook](./using-python-experience-on-notebook.md).
1. Review your code for version-specific behavior. Most pure-Python code runs unchanged across Python 3.10, 3.11, and 3.12.
1. Reinstall packages that pin a Python version, and then rerun the notebook to confirm results.

Switching the Python notebook kernel doesn't change your Spark runtime or any Spark notebooks. You select Python notebook kernels and Spark runtimes independently.

## Frequently asked questions

### Will my existing Python 3.10 notebooks stop running in October 2026?

Not on that date. When Python 3.10 reaches end of support, it moves to the Deprecated stage: you can't create new notebooks on Python 3.10, and existing notebooks keep running for a limited period at your own risk, without security updates. Switch them to Python 3.11 or Python 3.12 before Python 3.10 is removed.

### What happens to my scheduled and pipeline runs on Python 3.10?

Scheduled runs and pipeline notebook activities use the notebook's selected kernel. During the Deprecated stage, your existing Python 3.10 scheduled runs and pipeline activities keep running for a limited period at your own risk. After Python 3.10 is removed, runs pinned to Python 3.10 fail to start. Set the kernel to Python 3.11 or Python 3.12 before removal, and then rerun your schedules and pipelines to confirm results.

### How do I tell which kernel a notebook uses?

The selected kernel appears on the notebook **Home** ribbon and in the status bar. You change it from the kernel menu. For steps, see [Use Python experience on Notebook](./using-python-experience-on-notebook.md).

### Do I need to change my code to move from Python 3.10 to Python 3.12?

Most pure-Python code runs unchanged. Review any code that relies on modules or syntax removed after Python 3.10, reinstall packages that pin a Python version, and test the notebook after you switch kernels.

### Is the Python notebook kernel the same as the Spark runtime Python version?

No. A Spark runtime includes a Python version for Spark workloads, and a Python notebook kernel is a standalone version you select for pure Python notebooks. The two are versioned and supported separately. For Spark runtimes, see [Apache Spark runtime in Fabric](./runtime.md).

### Does end of support for Python 3.10 end support for Python notebooks?

No. Python notebooks remain a supported Fabric capability. Only the individual Python version reaches end of support. Select a newer kernel to continue.

## Related content

- [Use Python experience on Notebook](./using-python-experience-on-notebook.md)
- [Lifecycle of Apache Spark runtimes in Fabric](./lifecycle.md)
- [Apache Spark runtime in Fabric](./runtime.md)
