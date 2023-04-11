---
title: Domains (preview)
description: Learn how domains can be used to organize your organization's Fabric data into logical groupings.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 04/08/2023
---

# Domains (preview)

Today, organizations are facing massive growth in data, and there is an increasing need to be able to organize and manage that data in a logical way that facilitates more targeted and efficient use and governance.

To meet this challenge, organizations are shifting from traditional IT centric data architectures, where the data is governed and managed centrally, to more federated models organized according to business needs. This federated data architecture is called data mesh. A data mesh is a decentralized data architecture that organizes data by specific business domains, such as marketing, sales, human resources, etc.

For public preview, Microsoft Fabric's data mesh architecture primarily supports organizing data into domains and enabling data consumers to be able to filter and find content by domain. Future releases will enable federated governance, which means that some of the governance currently controlled at the tenant level will move to domain-level control, enabling each business unit/department to define its own rules and restrictions according to its specific business needs.

## What are Fabric domains?

In Fabric, a domain is a way of logically grouping together all the data in an organization that is relevant to a particular area or field. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

To group data into domains, workspaces are associated with domains. When a workspace is associated with a domain, all the items in the workspace are also associated with the domain, and they receive a domain attribute as part of their metadata. During the Fabric public preview, the association of workspaces and the items included within them with domains primarily enables a better consumption experience. For instance, in the OneLake data hub, users can filter content by domain in order find content that is relevant to them. Going forward, capabilities for managing and governing data at the domain level will be added.

The basic flow for getting started with domains in Fabric is as follows:

1. In the admin portal, a Power BI administrator or above (hereafter referred to as the tenant admin) creates a domain and specifies a domain admin. A domain admin ideally is the business owner who is familiar with the data in their area and the regulations and restrictions that are relevant to it.

1. In the admin portal, the domain admin and/or tenant admin designates domain contributors. Domain contributors are workspace admins who will be authorized to associate the workspaces they are admins of with domains.

    The domain admin and tenant admin can associate workspaces with the domain, either individually or in bulk, and they can specify a domain image to make it easier to identify the domain context in the OneLake data hub. 

    The tenant admin will be able to delgate some settings to domain admins, domain admin will be able to override tenant settings in their specific domain. 

1. Domain contributors associate their workspaces with domains in workspace settings.

1. Data consumers filter by domain in the data hub in order to see only the data items that are relevant to their department.


## Next steps

* placeholder