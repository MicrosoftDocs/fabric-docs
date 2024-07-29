---
title: VS Code extension with docker support
description:  Learn about the integration with docker image support in Synapse VSCode extension
ms.reviewer: sngun
ms.author: qixwang
author: qixwang
ms.topic: overview
ms.custom:
ms.date: 06/12/2024
ms.search.form: VSCodeExtension
---

# Integration with VS Code Dev Container

Before you start to use the Synapse VS Code extension, there are several prerequisites steps need to be followed, such as having the JDK environment be ready. we keep getting feedback that all these prerequisites are too much for users to follow. To make it easier for users to get started, we are working on a new feature to integrate with the [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/containers). This feature will allow users to open the Synapse VS Code extension in a container with all the prerequisites installed. This will make it easier for users to get started with the Synapse VS Code extension.

The Synapse VS Code extension provides a seamless integration with Docker containers to enable a consistent development environment across different platforms. This feature allows you to work with supported Fabric item such as Notebook in a containerized environment, which is isolated from your local machine. The containerized environment ensures that all the required dependencies are installed and configured correctly, so you can focus on developing your notebooks without worrying about the environment setup.

A docker image is provided by Synapse to support the VS Code extension. The docker image contains all the required dependencies to run the Synapse VS Code extension, including the Java Development Kit (JDK), Conda, and the Jupyter extension for VS Code. This image is hosed on the [Microsoft Artifact Registry](https://mcr.microsoft.com/en-us/product/msfabric/synapsevscode/fabric-synapse-vscode/about) and can be pulled from the following location: mcr.microsoft.com/msfabric/synapsevscode/fabric-synapse-vscode:latest. To make it easier for users to get started, we have created a sample with devcontainer.json file that you can use to open the Synapse VS Code extension in a container. Please follow the steps below to get started.

## Prerequisites

Prerequisites for the Synapse VS Code extension:

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Install [VS Code Remote Development pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

## Getting Started

1. Clone the [Synapse VS Code Dev Container sample](https://github.com/microsoft/SynapseVSCode/tree/main/samples/.devcontainer) from the Synapse VS Code GitHub repository.
1. Open the sample folder in VS Code, and you will see a prompt asking you to reopen the folder in a container. Click on the "Reopen in Container" button.
1. The VS Code Remote Development extension will start building the Docker image and container. This may take a few minutes to complete.
1. Once the container is up and running, the Extensions view will have a separate section for the extensions running in the container. You will see the Synapse VS Code extension running in the container. You can now start working with the extension as you would on your local machine.
:::image type="content" source="media\vscode\extension-list-with-dev-container.png" alt-text="Screenshot of extension list with Dev Container running.":::
1. You can open a new or existing notebook and start running code cells. The notebook will run in the containerized environment, which is isolated from your local machine. You can also install additional Python packages using the Conda package manager. The packages will be installed in the container and will not affect your local machine. To verify the current runtime environment, you can open a terminal in VS Code and run the following command: `cat /etc/os-release`, from the output you can see the OS version and other information.
1. To stop the container, click on the green icon in the bottom left corner of the VS Code window and select "Remote-Containers: Reopen Locally". This will stop the container and return you to your local machine.
1. You can also customize the devcontainer.json file to add additional dependencies or configurations to the container. For more information on customizing the devcontainer.json file, please refer to the [VS Code Dev Container documentation](https://code.visualstudio.com/docs/remote/containers).

