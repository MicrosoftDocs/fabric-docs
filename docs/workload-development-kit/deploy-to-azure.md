---
title: Deploy a Fabric Workload to Azure
description: Learn about the components of a proposed architecture for deploying a Microsoft Fabric workload to Azure.
author: tasdevani21
ms.author: tadevani
ms.topic: how-to
ms.custom:
ms.date: 03/14/2025
---

# Deploy a Fabric workload to Azure

This article describes a proposal for a workload deployment architecture that uses Azure components and services. The deployment pattern is based on the following architecture diagram.

:::image type="content" source="./media/deploy-to-azure/fabric-workload-azure-deployment.png" alt-text="Diagram of an Azure deployment architecture." lightbox="./media/deploy-to-azure/fabric-workload-azure-deployment.png":::

## Architecture overview

The preceding diagram illustrates how the components in the architecture interact to deliver a seamless and integrated experience.

Azure Front Door acts as the global entry point. It routes user traffic to the stateless Microsoft Fabric workload front end. The front end is served via an Azure Blob Storage static website, which helps ensure high availability and low latency for users.

The Fabric workload back end uses create, read, update, and delete (CRUD) operations to create workload items and metadata. It's containerized and stored in Azure Container Registry for efficient version control and deployment. The container is deployed as an Azure web app, which provides automatic scaling and load balancing.

Additional services like Azure Key Vault manage secrets, while a managed identity provides secure access to Azure resources without embedding credentials in the code. Together, these components form a cohesive architecture that supports the development, deployment, and operation of custom Fabric workloads.

## Architecture components

### Azure Front Door

[Azure Front Door](/azure/frontdoor/scenario-storage-blobs) is a cloud-based content delivery network and application delivery service. As a solution for optimizing and protecting web applications, it offers global load balancing, dynamic site acceleration, Secure Sockets Layer (SSL) offloading, and a web application firewall (WAF).

You can use Azure Front Door to route traffic to the static website hosted on Azure Blob Storage. This pattern helps ensure high availability and low latency, because Azure Front Door can cache static content at edge locations around the world.

The SSL termination, WAF capabilities, and health monitoring that Azure Front Door provides help ensure both secure and reliable access to the front end of the application.

### Azure storage account

An [Azure storage account](/azure/storage/blobs/storage-blob-static-website) is a scalable storage solution that supports various data types, including blobs, files, queues, and tables. For the Fabric workload front end, you can use Azure Blob Storage to host static assets like HTML, JavaScript, CSS, and images.

This pattern allows static content to come directly from the storage account, for cost-effectiveness and ease of management. When you enable the static website feature on the storage account, you can generate a website URL that users can access to view your application. This approach also simplifies the deployment process, because uploading new versions of your static assets to the storage account requires no downtime.

### Azure Container Registry

You can deploy the Fabric workload back end as a web app on Azure App Service. You can store and manage the back-end image by using [Azure Container Registry](/azure/container-registry/container-registry-intro), so that containerized applications can be easily pulled and deployed on Azure App Service.

Azure Container Registry serves as a private registry for storing Docker container images, to simplify automation of the process for building, testing, and deploying the back-end application. This containerized approach allows for consistent and scalable deployments, with the added benefit of version control for the back-end images.

### Azure App Service and Web App for Containers

You can use [Azure App Service](/azure/app-service/configure-custom-container) to deploy and manage containerized applications on a fully managed platform. This service provides built-in automatic scaling, load balancing, and streamlined CI/CD integration with Docker Hub, Azure Container Registry, and GitHub.

You can use Azure App Service to deploy the workload back-end application as a container. The Docker image for this application is stored in Azure Container Registry. App Service pulls it during deployment.

This pattern helps ensure a consistent and reliable deployment process, because the platform takes care of OS patching, capacity provisioning, and load balancing. App Service supports both Linux and Windows containers, so you have the flexibility to choose the best environment for the workload.

### Additional services and features

- [Azure Key Vault](/azure/key-vault/general/basic-concepts) for managing secrets and sensitive information
- [Managed identities](/azure/app-service/overview-managed-identity) for secure access to Azure resources without the need for credentials in code
