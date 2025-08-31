---
title: Set up your Microsoft Fabric development environment
description: Learn how to set up your Microsoft Fabric Workload Development Kit environment so that you can start developing your workloads.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 04/09/2025
---

# Set up your environment

This article is aimed at developers who are looking to build a workload using the Microsoft Fabric Workload Development Kit. The article guides you through the process of setting up your development environment so that you can start building your workload.

## Platform requirements

To develop a new workload, your [Microsoft Fabric](https://app.powerbi.com) subscription needs to have a [capacity](../enterprise/licenses.md#capacity) with an F or P SKU. Fabric [trial capacities](../fundamentals/fabric-trial.md) are also supported.

## Configure Fabric

To start developing workloads, you need to be granted permissions in the Fabric service. You might need to contact other teams in your organization to get the necessary permissions.

### Ensure you have admin access on the workspace you plan to work with

To begin development and connect your local machine to a Fabric [workspace](../enterprise/licenses.md#workspace), you can either create a new workspace or ask to be added as an admin on an existing one. Developers must have admin permissions on the workspace to register their workload.

### Enable the development tenant setting

To begin development, the *Workspace admins can develop partner workloads* [tenant](../enterprise/licenses.md#tenant) setting needs to be enabled. If you're not an admin on the tenant that has the capacity you're planning to use for development, ask your [organization's admin](../admin/roles.md) to enable this setting.

To enable the *Workspace admins can develop partner workloads* tenant setting, follow these steps:

1. In Fabric, go to **Settings > Admin portal > Tenant settings**.

2. In the tenant settings, go to the **Additional workloads** section.

3. Enable the **Workspace admins can develop partner workloads** tenant setting.

### Enable developer mode

Next, enable the *Fabric Developer Mode* setting.

1. In Fabric, go to **Settings > Developer settings**.

2. Enable the **Fabric Developer Mode** setting.

## DevGateway

The DevGateway is a workload development component for communicating between your on-premises workload development box and Fabric. Download the [DevGateway](https://go.microsoft.com/fwlink/?linkid=2272516) and extract the folder in your local machine.

## Required tools

Download and install these tools before you start developing your workload.

* [Git](https://git-scm.com/downloads) - A distributed version control system that we use to manage and track project changes.

* [Node.js](https://nodejs.org/en/download) - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. Used to run the server-side JavaScript code.

   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - Install as part of the Nodes.js installation. npm is the default package manager for Node.js, which is used to manage and share the packages that you use in your project.

* [Visual Studio](https://visualstudio.microsoft.com/vs/) - An integrated development environment (IDE).

* [Webpack](https://webpack.js.org/guides/installation/) - A static module bundler for modern JavaScript applications. It helps to bundle JavaScript files for usage in a browser.

* [Webpack CLI](https://webpack.js.org/guides/installation) - A command line interface for Webpack.

## Recommended tools

[Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview).

>[!TIP]
>If you're not a Windows user, after installing Visual Studio Code, install the *C# Dev Kit* extension so that you can work with *.NET*.

## Related content

* * [Quickstart - Run a workload sample](quickstart-sample.md)
* [Authentication overview](./authentication-concept.md)
