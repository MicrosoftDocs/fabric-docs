---
title: Domains (preview)
description: Learn how domains can be used to organize your organization's Fabric data into logical groupings.
author: paulinbar
ms.author: painbar
ms.topic: concept
ms.date: 04/23/2023
---

# Domains (preview)

Today, organizations are facing massive growth in data, and there's an increasing need to be able to organize and manage that data in a logical way that facilitates more targeted and efficient use and governance.

To meet this challenge, organizations are shifting from traditional IT centric data architectures, where the data is governed and managed centrally, to more federated models organized according to business needs. This federated data architecture is called data mesh. A data mesh is a decentralized data architecture that organizes data by specific business domains, such as marketing, sales, human resources, etc.

For public preview, Microsoft Fabric's data mesh architecture primarily supports organizing data into domains and enabling data consumers to be able to filter and find content by domain. Future releases will enable federated governance, which means that some of the governance currently controlled at the tenant level will move to domain-level control, enabling each business unit/department to define its own rules and restrictions according to its specific business needs.

## What are Fabric domains?

In Fabric, a domain is a way of logically grouping together all the data in an organization that is relevant to a particular area or field. One of the most common uses for domains is to group data by business department, making it possible for departments to manage their data according to their specific regulations, restrictions, and needs.

To group data into domains, workspaces are associated with domains. When a workspace is associated with a domain, all the items in the workspace are also associated with the domain, and they receive a domain attribute as part of their metadata. During the Fabric public preview, the association of workspaces and the items included within them with domains primarily enables a better consumption experience. For instance, in the OneLake data hub, users can filter content by domain in order find content that is relevant to them. Going forward, capabilities for managing and governing data at the domain level will be added.

## Getting started with domains in Fabric: basic flow

1. In the admin portal, a Power BI administrator or above (hereafter referred to as the tenant admin) creates a domain and specifies a domain administrator. A domain admin ideally is the business owner who is familiar with the data in their area and the regulations and restrictions that are relevant to it.

1. In the admin portal, the domain admin and/or tenant admin designates domain contributors. Domain contributors are workspace admins who will be authorized to associate the workspaces they're admins of with a domain.

    The domain admin and tenant admin can associate workspaces with the domain, either individually or in bulk, and they can specify a domain image to make it easier to identify the domain context in the OneLake data hub. 

    The tenant admin can delegate some settings to the domain admin. This enables the domain admin to override tenant settings in their own specific domain.

1. Domain contributors associate their workspaces with domains in workspace settings.

1. Data consumers filter by domain in the data hub in order to see only the data items that are relevant to their department.

## Domain roles

There are three roles involved in domains:

* **Tenant admin** (Power BI admin or higher): Tenant admins can create and edit domains, specify domain admins and domain contributors, and associate workspaces with domains. Tenant admins can also see all the defined domains on the Domains page in the admin portal, and they can edit and delete domains.

* **Domain admin**: Ideally, the domain admins of a domain are the business owners or designated experts. They should be familiar with the data in their area and the regulations and restrictions that are relevant to it.

    Domain admins have access to the **Domains** page in the admin portal, but they can only see and edit the domains they're admins of. Domain admins can update the domain description, define/update domain contributors, and associate workspaces with the domain. They also can define and update the domain image and override tenant settings for any specific settings the tenant admin has delegated to the domain level. They can't delete the domain, change the domain name, or add/delete other domain admins.

* **Domain contributor**: Domain contributors are [workspace admins](../get-started/roles-workspaces.md) who have been authorized by the domain or tenant admins to associate the workspaces they're the admins of to a domain, or to change the current domain association.

    Domain contributors associate the workspaces they're an admin of in the settings of the workspace itself. They don’t have access to the **Domains** page in the admin portal.
    
    > [!NOTE]
    > Remember, to be able to associate a their workspace to a domain, a domain contributor must be a workspace admin (that is, have the [Admin role](../get-started/roles-workspaces.md) in the workspace).

## Next steps

* Tenant admins: [Create a domain in Microsoft Fabric (preview)](./domains-create.md)
* Domain admins: [Manage a domain in Microsoft Fabric (preview)](./domains-manage.md)
* Domain contributors: [Specify a domain in a workspace](../get-started/create-workspaces.md#specify-a-domain)