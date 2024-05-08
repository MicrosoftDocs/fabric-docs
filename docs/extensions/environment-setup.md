    ---
title: Set up your extensibility Microsoft Fabric environment
description: Learn how to set up your Microsoft Fabric extensibility environmet so that you can start developing your workloads.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: how to
ms.custom:
ms.date: 12/27/2023
---

# Set up your environment



## Prerequisites
Before we dive into the guide, there are a few prerequisites that you need to have installed on your system. These tools will be used throughout the guide, so it’s important to ensure that you have them set up correctly.

### [Git](https://git-scm.com/downloads)
A distributed version control system that we’ll use to manage and track changes to our project.

### [NPM (Node Package Manager)](https://www.npmjs.com/get-npm)
This is the default package manager for Node.js and it’s used to manage and share the packages that you use in your project.

### [Node.js](https://nodejs.org/en/download/)
An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. We’ll use this to run our server-side JavaScript code.

### [Webpack](https://webpack.js.org/guides/installation/)
A static module bundler for modern JavaScript applications. It helps to bundle JavaScript files for usage in a browser.

### [Webpack CLI](https://webpack.js.org/api/cli/)
The command line interface for Webpack. This allows us to use Webpack from the command line.

## Web app
Could mode workload deployment requiers setting up Web app domain for the Frontend (FE) and Backend (BE). These must be subdomains of the resource id with a maximum of one additional segment. The Reply URL host domain should be the same as the FE host domain. for more information, please see the [Web App cloud deployment](Web app deployment 1st half.md   
)
### Setting up a Fabric development tenant
In the context of executing the workload SDK sample and building a workload, it is strongly recommended to employ a dedicated development tenant. This practice ensures an isolated environment, minimizing the risk of inadvertent disruptions or modifications to production systems. Moreover, it provides an additional layer of security, safeguarding production data from potential exposure or compromise. Adherence to this recommendation aligns with industry best practices and contributes to a robust, reliable, and secure development lifecycle.

#### Tenant setting
TODO
A prerequisite for using custom workloads in Fabric is enabling this feature in Admin Portal by the Tenant Administrator.
This is done by enabling the switch 'Workload extensions (preview)' - either for the entire organization, or for specific groups within the organization.

![Workloads tenant switch](TBD)

## Related content
* [Quickstart quide](quickstart-sample.md)


