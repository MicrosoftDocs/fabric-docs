---
title: Fabric command line interface
description: This article provides an overview of the Microsoft Fabric command line interface (CLI) and lists some of its use cases.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 04/09/2025

# Customer intent: As a Fabric developer, I want to know how to use the Fabric command line interface (CLI) to log into Fabric and see a list of available commands.
---

# Fabric command line interface (preview)

Microsoft Fabric has a command line interface (CLI) that you can use for a range of Fabric tasks. This article shows how to get the CLI and use it to log into Fabric.

Any Fabric user can use the CLI. The CLI is useful for admins and developers who are comfortable working in a command line interface. You can also use the CLI as a [service principal](/entra/identity-platform/app-objects-and-service-principals#service-principal-object) for automation tasks.

To review the Fabric CLI GitHub pages, go to [fabric-cli](https://aka.ms/FabricCLI).

## Prerequisites

You need to have Python 3.10 or higher installed.

## Get the CLI

Open *Command Prompt* (cmd) and run the following command to install the CLI.

```python
pip install ms-fabric-cli
```

## Log into Fabric

To log into Fabric, follow these steps:

1. Open *Command Prompt* (cmd).

2. Run the command:

    ```python
    fab auth login
    ```

3. Select the login method using the arrow keys, and then press **Enter**.

    * **Interactive with web browser** - Use this method to log in as a user. You'll be prompted to log in using your browser.
    * **Service principal authentication with secret** - Use this method to log in as a service principal. You'll be prompted to enter your service principal credentials.
    * **Service principal authentication with certificate** - Use this method to log in as a service principal with a certificate. You'll be prompted to select your certificate.
    * **Managed identity authentication**​ - Use this method to log in using a managed identity.

Once you're logged in, you'll be working in a command line mode in the Command Prompt.

## Log out of Fabric

To log out of Fabric, run the command:

```python
fab auth logout
```

## Commands

To see a list of available commands, run the command `help`.

To see the flags a command has, use the `--help` flag. For example, to see the flags for the `open` command, run the command `open --help`.

## Related content

* [What is lifecycle management in Microsoft Fabric?](../cicd/cicd-overview.md)

* [Microsoft Fabric REST API](/rest/api/fabric/articles/)
