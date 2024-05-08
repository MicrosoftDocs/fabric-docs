---
title: Set up your Microsoft Fabric development environment
description: Learn how to set up your Microsoft Fabric extensibility environment so that you can start developing your workloads.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: how to
ms.custom:
ms.date: 12/27/2023
---

# Set up your environment

## Prerequisites
The following steps are required before getting started with workload development.

### [Git](https://git-scm.com/downloads)
A distributed version control system that we use to manage and track changes to our project.

### [npm (Node Package Manager)](https://www.npmjs.com/get-npm)
Default package manager for Node.js used to manage and share the packages that you use in your project.

### [Node.js](https://nodejs.org/en/download/)
An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. We’ll use this to run our server-side JavaScript code.

### [Webpack](https://webpack.js.org/guides/installation/)
A static module bundler for modern JavaScript applications. It helps to bundle JavaScript files for usage in a browser.

### [Webpack CLI](https://webpack.js.org/api/cli/)
The command line interface for Webpack. This allows us to use Webpack from the command line.

### Create 


## Web app
Cloud mode (in conjunction to local machine mode) workload deployment require setting up Web app domain for the Frontend (FE) and Backend (BE). These must be subdomains of the resource ID with a maximum of one more segment. The Reply URL host domain should be the same as the FE host domain. For more information, please see the 
![Web App cloud deployment](web-app-deployment.md)

### Setting up a Fabric development tenant
In the context of executing the workload SDK sample and building a workload, it's recommended to employ a dedicated development tenant. This practice ensures an isolated environment, minimizing the risk of inadvertent disruptions or modifications to production systems. Moreover, it provides an more layer of security, safeguarding production data from potential exposure or compromise. Adherence to this recommendation aligns with industry best practices and contributes to a robust, reliable, and secure development lifecycle.

#### Tenant setting and development settings
1. Fabric admins permission is required to be able to begin development and connect with your local machine to a Fabric capacity. Only developers with capacity admin permission can connect and register their workload on to a capacity. Frontend development doesn't require capacity admin permissions. 
To enable a user to begin development include them under More Workloads->users can develop more workloads setting.
:::image type="content" source="./media/environment-setup/environment-setup-ts.png" alt-text="Tenant settings":::
1. After user is granted permission in the previous step **each** user can enable development mode for the development settings area under Fabric developer mode.
:::image type="content" source="./media/environment-setup/environment-setup-devmode.png" alt-text="Tenant settings":::

## Related content
* [Quickstart guide](quickstart-sample.md)


