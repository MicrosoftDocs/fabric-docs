---
title: Architecture for Deploying a Fabric Workload to Azure
description: Learn about the components of a proposed architecture for deploying a Microsoft Fabric workload to Azure.
author: tasdevani21
ms.author: tadevani
ms.topic: concept-article
ms.custom:
ms.date: 03/14/2025
---

# Architecture for deploying a Fabric workload to Azure

This article describes a proposal for deploying an architecture for Microsoft Fabric workload deployment that uses Azure components and services. The deployment pattern is based on the following architecture diagram:

:::image type="content" source="./media/deploy-to-azure/fabric-workload-azure-deployment.png" alt-text="Diagram of an Azure deployment architecture." lightbox="./media/deploy-to-azure/fabric-workload-azure-deployment.png":::

## Architecture overview

The preceding architecture diagram illustrates how the components interact to deliver a seamless and integrated experience.

Azure Front Door acts as the global entry point. It routs user traffic to the stateless Fabric workload frontend. The frontend is served via an Azure Blob Storage static website, which helps ensure high availability and low latency for users.

The Fabric workload backend uses create, read, update, and delete (CRUD) operations to create workload items and metadata. It's containerized and stored in Azure Container Registry for efficient version control and deployment. The container is deployed as an Azure web app, which provides automatic scaling and load balancing.

Additional services like Azure Key Vault manage secrets, while a managed identity provides secure access to Azure resources without embedding credentials in the code. Together, these components form a cohesive architecture that supports the development, deployment, and operation of custom Fabric workloads.

## Architecture components

### Azure Front Door

[Azure Front Door](/azure/frontdoor/scenario-storage-blobs) is a cloud-based content delivery network and application delivery service. It offers global load balancing, dynamic site acceleration, SSL offloading, and a web application firewall (WAF), making it an ideal solution for optimizing and protecting web applications.
Azure Front Door can be used to route traffic to our static website hosted on Azure Blob Storage.

This pattern ensures high availability and low latency for our users, as Azure Front Door can cache static content at edge locations around the world. Additionally, Azure Front Door provides SSL termination, WAF capabilities, and health monitoring, ensuring both secure and reliable access to the frontend of the application.

### Azure storage account

An [Azure storage account](/azure/storage/blobs/storage-blob-static-website) is a scalable and secure storage solution that supports various data types, including blobs, files, queues, and tables.
For the Fabric workload frontend, you can use Azure Blob Storage to host static assets like HTML, JavaScript, CSS, and images.

This pattern allows us to serve static content directly from the storage account, which is cost-effective and easy to manage. By enabling the static website feature on the storage account, you can generate a website URL that users can access to view your application. This approach also simplifies the deployment process, as we can upload new versions of your static assets to the storage account without downtime.

### Azure Container Registry

You can deploy the Fabric workload backend as a web app on Azure App Service. You can store and manage the backend image by using [Azure Container Registry](/azure/container-registry/container-registry-intro), to ensure that containerized applications can be easily pulled and deployed on Azure App Service.

Azure Container Registry serves as a private registry for storing Docker container images, making it simple to automate the process of building, testing, and deploying the backend application. This containerized approach allows for consistent and scalable deployments, with the added benefit of version control for the backend images.

### Azure App Service: Web app for containers

[Azure App Service](/azure/app-service/configure-custom-container) allows you to deploy and manage containerized applications on a fully managed platform. This service provides built-in automatic scaling, load balancing, and streamlined continuous integration and continuous delivery (CI/CD) integration with Docker Hub, Azure Container Registry, and GitHub.

You can use Azure App Service to deploy the workload backend application as a container. The Docker image for this application is stored in [Azure Container Registry](#azure-container-registry). App Service pulls it during deployment.

This pattern ensures a consistent and reliable deployment process, as the platform takes care of OS patching, capacity provisioning, and load balancing. Additionally, App Service supports both Linux and Windows containers, so you have the flexibility to choose the best environment for the workload.

### Additional services and features

- [Azure Key Vault](/azure/key-vault/general/basic-concepts) for managing secrets and sensitive information.
- [Managed identity](/azure/app-service/overview-managed-identity) for secure access to Azure resources without the need for credentials in code.
