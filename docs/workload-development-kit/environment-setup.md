---
title: Set up your Microsoft Fabric development environment
description: Learn how to set up your Microsoft Fabric Workload Development Kit environment so that you can start developing your workloads.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 07/16/2024
---

# Set up your environment (preview)

This article is aimed at developers who are looking to build a workload using the Microsoft Fabric Workload Development Kit. The article guides you through the process of setting up your development environment so that you can start building your workload.

## Configure Fabric

To start developing workloads, you need to be granted permissions in the Fabric service. You might need to contact other people in your organization to get the necessary permissions.

### Become an admin on the capacity associated with your workspace

To begin development and connect your local machine to a Fabric [capacity](../enterprise/licenses.md#capacity), you need to be an admin on the capacity associated with the workspace you're using for development. Only developers with admin permissions on the capacity linked to the workspace can register their workload on that workspace. If you're not an admin on the capacity linked to the workspace you want to use for development, ask someone in your organization who's an admin on the capacity to add you as an admin. To add admins to a capacity, follow the instructions in [Add and remove admins](../admin/capacity-settings.md#add-and-remove-admins).

### Enable the development tenant setting

To begin development, the *Capacity admins can develop additional workloads* [tenant](../enterprise/licenses.md#tenant) setting needs to be enabled. If you're not an admin on the tenant that has the capacity you're planning to use for development, ask your [organization's admin](../admin/roles.md) to enable this setting.

To enable the *Capacity admins can develop additional workloads* tenant setting, follow these steps:

1. In Fabric, go to **Settings > Admin portal**.

2. In the tenant settings, go to the **Additional workloads** section.

3. Enable the **Capacity admins can develop additional workloads** tenant setting.

### Enable developer mode

After the *Capacity admins can develop additional workloads* tenant setting is enabled, you need to enable the *Fabric Developer Mode* setting.

1. In Fabric, go to **Settings > Developer settings**.

2. Enable the **Fabric Developer Mode** setting.

## Required tools

Download and install these tools before you start developing your workload.

* [.NET 6.0 Runtime](https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-6.0.31-windows-x64-installer) - You'll use .NET to build your workload.

* [ASP.NET Core Runtime 6.0](https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-aspnetcore-6.0.31-windows-x64-installer) - You'll use ASP.NET Core to build your workload.

* [Azure CLI on Windows](/cli/azure/install-azure-cli-windows?tabs=azure-cli) - You'll use the [Azure Command-Line Interface (CLI)](/cli/azure/what-is-azure-cli) to run scripts that connect to Azure and run admin commands.

* [Fabric Workload DevGateway](https://go.microsoft.com/fwlink/?linkid=2272516) - Sends API calls directly from the workload to Fabric.

* [Git](https://git-scm.com/downloads) - A distributed version control system that we use to manage and track project changes.

* [DevGateway](https://go.microsoft.com/fwlink/?linkid=2272516) - A workload development component for communicating between your on-premises workload development box and Fabric.

* [Node.js](https://nodejs.org/en/download/) - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. Used to run the server-side JavaScript code.

   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - Install as part of the Nodes.js installation. npm is the default package manager for Node.js, which is used to manage and share the packages that you use in your project.

* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) - An integrated development environment (IDE).

* [Webpack](https://webpack.js.org/guides/installation/) - A static module bundler for modern JavaScript applications. It helps to bundle JavaScript files for usage in a browser.

* [Webpack CLI](https://webpack.js.org/guides/installation) - A command line interface for Webpack.

## Related content

* [Quick start guide](quickstart-sample.md)
* [Authentication overview](./authentication-concept.md)