---
title: Cloud Shell Item
description: Learn about the Cloud Shell Item, which demonstrates how to interact with Spark Livy API in a Fabric workload.
author: gsaurer
ms.author: billmath
ms.topic: sample
ms.custom:
ms.date: 12/20/2025
---

# Cloud Shell Item

The Cloud Shell Item provides an interactive terminal interface for executing Cloud Shell commands, including full support for the [Fabric CLI](https://microsoft.github.io/fabric-cli), and Python scripts through Spark Livy sessions within Microsoft Fabric. This integration lets you run Fabric CLI commands in your browser to manage and automate Fabric resources, with command history and script management.

## Overview

The Cloud Shell Item sample demonstrates several key capabilities of the Fabric Extensibility Toolkit:

* **Fabric CLI Integration**: Run [Fabric CLI](https://microsoft.github.io/fabric-cli) commands interactively for easy management and automation of Fabric resources.
* **Interactive Terminal** for Cloud Shell commands.
* **Python Script Management** with parameterized execution.
* **Batch Job Execution** for scripts with monitoring.
* **Session Management** with automatic reuse.
* **Execute Cloud Shell commands** through an integrated terminal interface.
* **Create and manage Python scripts** with parameter support.
* **Run scripts as batch jobs** with Spark configuration.
* **Manage Spark sessions** with automatic reuse and validation.
* **Select lakehouse and environment** for command execution context.
* **Track command history** with arrow key navigation.

### Advanced Features (optional)

* **Switch execution modes** to run Python code or Bash commands.
* **Execute Python directly** in Spark sessions for data processing.
* **Run shell commands** with subprocess support.
* **Parameterized scripts** with type-safe parameter injection.

## Reference

For detailed documentation, see the [Cloud Shell Item documentation on GitHub](https://github.com/microsoft/Microsoft-Fabric-tools-workload/tree/main/Workload/app/items/CloudShellItem).

For more information about the Fabric CLI, visit the [Fabric CLI website](https://microsoft.github.io/fabric-cli).

For details about the Spark Livy API, see the [Apache Livy REST API documentation](https://livy.apache.org/docs/latest/rest-api.html).
