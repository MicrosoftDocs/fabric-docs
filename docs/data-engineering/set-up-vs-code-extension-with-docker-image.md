---
title: VS Code extension with Docker support
description: Learn how Docker integration works with Data Engineering VS Code extension. It gives a containerized environment with all dependencies installed, configured.
ms.reviewer: qixwang
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom:
ms.date: 07/03/2025
ms.search.form: VSCodeExtension
---

# Use Docker containers with Fabric Data Engineering Visual Studio Code extension

To use the Fabric Data Engineering Visual Studio (VS) Code extension, certain prerequisites, such as a ready JDK environment, must be met. To simplify the setup process, we developed a new feature that integrates with the [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/containers). This feature enables you to open the Data Engineering VS Code extension in a container with all necessary prerequisites already installed, making it easier for users to get started.

The Data Engineering VS Code extension seamlessly integrates with Docker containers, providing a consistent development environment across different platforms. This feature allows you to work with supported Fabric items, such as notebooks, within a containerized environment that is isolated from your local machine. The containerized environment ensures that all necessary dependencies are installed and configured correctly. It allows you to focus on developing your notebooks without concerns about the environment setup.

Synapse provides a Docker image to support the VS Code extension. The Docker image includes all the necessary dependencies like the Java Development Kit (JDK), Conda, and the Jupyter extension for VS Code. This image is hosted on the [Microsoft Artifact Registry](https://mcr.microsoft.com/product/msfabric/synapsevscode/fabric-synapse-vscode/about). To help you get started quickly, a sample with the [devcontainer.json](https://github.com/microsoft/SynapseVSCode/blob/main/samples/.devcontainer/devcontainer.json) file can be used to open the Data Engineering VS Code extension in a container as described in the next sections.

## Prerequisites

The following prerequisites should be met to use the Docker containers with the Data Engineering VS Code extension:

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop).
- Install the [VS Code Remote Development pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).

## Getting started

1. Clone the [Synapse VS Code Dev Container sample](https://github.com/microsoft/SynapseVSCode/tree/main/samples/.devcontainer).

1. Open the sample folder in VS Code, and you'll see a prompt asking you to reopen the folder in a container. Select the **Reopen in Container** button.

1. The VS Code Remote Development extension starts building the Docker image and container. This may take a few minutes to complete.

1. Once the container is up and running, the **Extensions** view will have a separate section for the extensions running in the container. You can see the **Fabric Data Engineering VS Code extension** running in the container. You can now start working with the extension as you would on your local machine.
   :::image type="content" source="media\vscode\extension-list-with-dev-container.png" alt-text="Screenshot of extension list with Dev Container running.":::

1. You can either create a new notebook or open an existing one to start running code cells. The notebook operates within a containerized environment, separate from your local machine. You can install other Python packages using the Conda package manager, which will only affect the container environment and not your local system. To check the current runtime environment, open a terminal in VS Code and run the command `cat /etc/os-release`. The output displays the OS version and other relevant information.

1. To stop the container, select the green icon in the bottom left corner of the VS Code window and select **Remote-Containers: Reopen Locally**. This stops the container and return you to your local machine.

1. You can also customize the *devcontainer.json* file to add other dependencies or configurations to the container. For more information on customizing the *devcontainer.json* file, see the [VS Code Dev Container documentation](https://code.visualstudio.com/docs/remote/containers).

## Related content

- [Access and manage Microsoft Fabric notebook resources in Visual Studio Code](author-notebook-resource-with-vs-code.md)
- [Create and manage Microsoft Fabric notebooks in Visual Studio Code](author-notebook-with-vs-code.md)
