---
title: Fabric command linke interface
description: This article provides an overview of the Microsoft Fabric command line interface (CLI) and lists some of its use cases.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 03/17/2025
---

# Fabric command line interface

Microsoft Fabric has a command line interface (CLI) that you can use for a range of Fabric tasks. This article shows how to get the CLI and use it to log into Fabric.

Any Fabric user can use the CLI. The CLI is useful for admins and developers who are comfortable working in a command line interface. You can also use the CLI as a [service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) for automation tasks.

## Prerequisites

You need to have Python 3.10 or higher installed.

## Get the CLI

Open *Command Prompt* (cmd) and run the following command to install the CLI.

```python
pip install fabric
```

## Log into Fabric

To log into Fabric, follow these steps:

1. Open *Command Prompt* (cmd).

2. Run the command:

    ```python
    fab auth login
    ```

3. Select the login method using the arrow keys, and then press **Enter**.

    * **Interactive with web browser** - Use this method to login as a user. You'll be prompted to login using your browser.
    * **Service principal authentication** - Use this method to login as a service principal. You'll be prompted to enter your service principal credentials.

Once you're logged in, you'll be working in a Fabric CLI shell in the Command Prompt.

## Log out of Fabric

To log out of Fabric, run the command:

```python
exit
```

## Commands

To see a list of available commands, run the command `help`. For a full list of commands, see the Fabric SLI [cheatsheet](https://github.com/microsoft/fabric-cli/blob/main/docs/cheatsheet.md).

To see the flags a command has, use the `--help` flag. For example, to see the flags for the `open` command, run the command `open --help`.

## Examples

You can view examples for ways to use the Fabric CLI in the GitHub [examples](https://github.com/microsoft/fabric-cli/tree/main/docs/examples) folder.

## Related content

* [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)
* [Microsoft Fabric Workload Development Kit](../workload-development-kit/development-kit-overview.md)
* [What is the Microsoft Fabric Capacity Metrics app?](../enterprise/metrics-app.md)
