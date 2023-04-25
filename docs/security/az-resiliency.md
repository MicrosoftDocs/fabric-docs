---
title: Reliability in Microsoft Fabric #Required;
description: Find out about reliability in Microsoft Fabric #Required; 
author: paulinbar #Required; your GitHub user alias, with correct capitalization.
ms.author: painbar #Required; Microsoft alias of author; optional team alias.
ms.topic: reliability-article
ms.custom: subject-reliability, references_regions
ms.date: 04/24/2023 #Required; mm/dd/yyyy format.
---

# Reliability in Microsoft Fabric

This article describes reliability support in Microsoft Fabric, and covers regional resiliency with availability zones. For a more detailed overview of reliability in Azure, see [Azure reliability](/azure/architecture/framework/resiliency/overview).

## Availability zone support
Azure availability zones are at least three physically separate groups of datacenters within each Azure region. Datacenters within each zone are equipped with independent power, cooling, and networking infrastructure. In the case of a local zone failure, availability zones are designed so that if the one zone is affected, regional services, capacity, and high availability are supported by the remaining two zones.  Failures can range from software and hardware failures to events such as earthquakes, floods, and fires. Tolerance to failures is achieved with redundancy and logical isolation of Azure services. For more detailed information on availability zones in Azure, see [Regions and availability zones](/azure/availability-zones/az-overview.md).

Azure availability zone-enabled services are designed to provide the right level of reliability and flexibility. They can be configured in two ways. They can be either zone redundant, with automatic replication across zones, or zonal, with instances pinned to a specific zone. You can also combine these approaches. For more information on zonal vs. zone-redundant architecture, see [Build solutions with availability zones](/azure/architecture/high-availability/building-solutions-for-high-availability).

Availability zones allow Fabric customers to run critical applications with higher availability and fault tolerance in the event of datacenter failures. Fabric supports zone-redundant availability zones, such that resources replicate across zones automatically, without any customer intervention.

[!Note]
At Public Preview, Fabric provides partial availability zone support in a limited number of regions. Data Factory, Data Engineering, Data Science, and Event Streams do not support availability zones.

Fabric provides availability zone support in various regions as follows:

|	Region	|	|		|		| 	|
|------------------|----------------------|---------------|--------------------|----------------|
|	**Americas**	|	**Power BI**	|	**Datamarts**	|	**Data Warehouses**	| **Real-Time Analytics**	|
|	Brazil South	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	Brazil South B	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	Canada Central	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	Central US	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	East US	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|			|
|	East US 2	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|			|
|	South Central US	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	West US 2	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|			|
|	West US 3	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	**Europe**	|	**Power BI**	|	**Datamarts**	|	**Data Warehouses**	| **Real-Time Analytics**	|
|	France Central	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|			|
|	Germany West Central	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	North Europe	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|			|
|	Sweden Central	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	UK South	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	West Europe	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|			|
|	Norway East	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	**Middle East**	|	**Power BI**	|	**Datamarts**	|	**Data Warehouses**	| **Real-Time Analytics**	|
|	Qatar Central	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	**Africa**	|	**Power BI**	|	**Datamarts**	|	**Data Warehouses**	| **Real-Time Analytics**	|
|	South Africa North	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	**Asia Pacific**	|	**Power BI**	|	**Datamarts**	|	**Data Warehouses**	| **Real-Time Analytics**	|
|	Australia East	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	Japan East	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|
|	**Southeast Asia**	|	**Power BI**	|	**Datamarts**	|	**Data Warehouses**	| **Real-Time Analytics**	|
|	Singapore	|	:::image type="icon" source="../media/yes-icon.svg" border="false":::	|		|			|

### Fault tolerance
To prepare for availability zone failure, customers should over-provision capacity of service to ensure that the solution can tolerate ⅓ loss of capacity and continue to function without degraded performance during zone-wide outages.

### Zone down experience
During a zone-wide outage, no action is required during zone recovery. The following Fabric capabilities in the regions indicated above will self-heal and re-balance automatically to take advantage of the healthy zone. 
- Power BI 
- Data Marts
- Data Warehouses
- Real-Time Analytics

> [Resiliency in Azure](/azure/availability-zones/overview.md)