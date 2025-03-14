---
title: Deploy a Fabric Workload to Azure
description: Learn how to deploy a Microsoft Fabric Workload to Azure.
author: tasdevani21
ms.author: tadevani
ms.topic: how-to
ms.custom:
ms.date: 03/14/2025
---

# Deploy a Fabric Workload to Azure

This document describes a deployment pattern for the Fabric Workload on Azure.
The deployment pattern is based on the following architecture diagram:

:::image type="content" source="./media/deploy-to-azure/fabric-workload-azure-deployment.png" alt-text="Screenshot of Azure Deployment." lightbox="./media/deploy-to-azure/fabric-workload-azure-deployment.png":::


## Components

The architecture consists of the following components/azure services that interact with each other to provide a complete solution for deploying the Fabric Workload on Azure.

### Azure Front Door

[Azure Front Door](/azure/frontdoor/scenario-storage-blobs) is a cloud-based Content Delivery Network (CDN) and application delivery service.
It offers global load balancing, dynamic site acceleration, SSL offloading, and a web application firewall (WAF), making it an ideal solution for optimizing and protecting web applications.
Azure Front Door can be used to route traffic to our static website hosted on Azure Blob Storage.

This pattern ensures high availability and low latency for our users, as Azure Front Door can cache static content at edge locations around the world. Additionally, Azure Front Door provides SSL termination, web application firewall (WAF) capabilities, and health monitoring, ensuring both secure and reliable access to the frontend of the application.

### Azure Storage Account

[Azure Storage Account](/azure/storage/blobs/storage-blob-static-website) is a scalable and secure storage solution that supports various data types, including blobs, files, queues, and tables.
For the Fabric frontend, Azure Blob Storage can be leveraged to host static assets like HTML, JavaScript, CSS, and images.

This pattern allows us to serve static content directly from the storage account, which is cost-effective and easy to manage.
By enabling the static website feature on the storage account, you can generate a website URL that users can access to view your application.
This approach also simplifies the deployment process, as we can upload new versions of your static assets to the storage account without downtime.

### Azure Container Registry

The backend of the Fabric Workload can be deployed as a web app on Azure App Service.
The backend image can be stored and managed using [Azure Container Registry (ACR)](/azure/container-registry/container-registry-intro), ensuring that containerized applications could be easily pulled and deployed on Azure App Service.

The ACR serves as a private registry for storing Docker container images, making it simple to automate the process of building, testing, and deploying the backend application.
This containerized approach allows for consistent and scalable deployments, with the added benefit of version control for the backend images.

### App Service with Container
[Azure App Service](/azure/app-service/configure-custom-container) with Container allows you to deploy and manage containerized applications on a fully managed platform.
This service provides built-in auto-scaling, load balancing, and streamlined CI/CD integration with Docker Hub, Azure Container Registry, and GitHub.

The Azure App Service can be used to deploy the Fabric backend C# application as a container.
The Docker image for this application is stored in [Azure Container Registry](#azure-container-registry) and is pulled by the App Service during deployment.

This pattern ensures a consistent and reliable deployment process, as the platform takes care of OS patching, capacity provisioning, and load balancing.
Additionally, App Service supports both Linux and Windows containers, giving the flexibility to choose the best environment for the workload.

### Additional Services

- [Azure Key Vault](/azure/key-vault/general/basic-concepts) for managing secrets and sensitive information.
- [Managed Identity](/azure/app-service/overview-managed-identity) for secure access to Azure resources without the need for credentials in code.
