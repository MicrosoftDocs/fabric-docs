---
title: Reliability in Fabric #Required; Must be "Resiliency in *your official service name*"
description: Find out about reliability in [TODO-service-name] #Required; 
author: paulinbar #Required; your GitHub user alias, with correct capitalization.
ms.author: painbar #Required; Microsoft alias of author; optional team alias.
ms.topic: reliability-article
ms.custom: subject-reliability, references_regions
ms.date: 05/23/2023 #Required; mm/dd/yyyy format.
---

<!--#Customer intent: As a < type of user >, I want to understand reliability support for [TODO-service-name] so that I can respond to and/or avoid failures in order to minimize downtime and data loss. -->

<!--

Template for the main reliability article for Azure services. 
Keep the required sections and add/modify any content for any information specific to your service. 
This article should live in the reliability content area of azure-docs-pr.
This article should be linked to in your TOC. Under a Reliability node or similar. The name of this page should be *reliability-[TODO-service-name].md* and the TOC title should be "Reliability in [TODO-service-name]". 
Keep the headings in this order. 

This template uses comment pseudo code to indicate where you must choose between two options or more. 

Conditions are used in this document in the following manner and can be easily searched for: 
-->

<!-- IF (AZ SUPPORTED) -->
<!-- some text -->
<!-- END IF (AZ SUPPORTED)-->

<!-- BEGIN IF (SLA INCREASE) -->
<!-- some text -->
<!-- END IF (SLA INCREASE) -->

<!-- IF (SERVICE IS ZONAL) -->
<!-- some text -->
<!-- END IF (SERVICE IS ZONAL) -->

<!-- IF (SERVICE IS ZONE REDUNDANT) -->
<!-- some text -->
<!-- END IF (SERVICE IS ZONAL) -->

<!--

IMPORTANT: 
- Do a search and replace of TODO-service-name  with the name of your service. That will make the template easier to read.
- ALL sections are required unless noted otherwise.
- MAKE SURE YOU REMOVE ALL COMMENTS BEFORE PUBLISH!!!!!!!!

-->

<!-- 1. H1 -----------------------------------------------------------------------------
Required: Uses the format "Reliability in X"
The "X" part should identify the product or service.
-->

# Reliability in 'TODO-service-name'

TODO: Add your heading

<!-- 2. Introductory paragraph ---------------------------------------------------------
Required: Provide an introduction. Use the following placeholder as a suggestion, but elaborate.
-->

This article describes reliability support in [TODO-service-name], and covers <!-- IF (AZ SUPPORTED) --> both regional resiliency with availability zones and <!-- END IF (AZ SUPPORTED)--> cross-region resiliency with disaster recovery. For a more detailed overview of reliability in Azure, see [Azure reliability](/azure/architecture/framework/resiliency/overview).

[Introduction]
TODO: Add your introduction

## Availability zone support
<!-- IF (AZ SUPPORTED) -->

TODO: Add your availability zone support

<!-- 3. Availability zone support ------------------------------------------------------
Azure availability zones are at least three physically separate groups of datacenters within each Azure region. Datacenters within each zone are equipped with independent power, cooling, and networking infrastructure. In the case of a local zone failure, availability zones are designed so that if the one zone is affected, regional services, capacity, and high availability are supported by the remaining two zones.  Failures can range from software and hardware failures to events such as earthquakes, floods, and fires. Tolerance to failures is achieved with redundancy and logical isolation of Azure services. For more detailed information on availability zones in Azure, see [Regions and availability zones](/azure/availability-zones/az-overview.md).

Azure availability zones-enabled services are designed to provide the right level of reliability and flexibility. They can be configured in two ways. They can be either zone redundant, with automatic replication across zones, or zonal, with instances pinned to a specific zone. You can also combine these approaches. For more information on zonal vs. zone-redundant architecture, see [Build solutions with availability zones](/azure/architecture/high-availability/building-solutions-for-high-availability).

Provide how this product supports availability zones; and whether or not it is zone-redundant or zonal or both.

Indicate who is responsible for setup (Microsoft or Customer)? Reference any AZ readiness docs. Reference AZ enablement if relevant.
-->

### Prerequisites

TODO: Add your prerequisites

<!-- 3A. Prerequisites -----------------------------------------------------------------
List any specific SKUs that are supported. If all are supported or if the service has only one default SKU, mention this.

List regions that support availability zones, or regions that don't support availability zones (whichever is less).

List any regional support here, in the form of: 
| Americas         | Europe               | Middle East   | Africa             | Asia Pacific   |
|------------------|----------------------|---------------|--------------------|----------------|
| Brazil South     | France Central       | Qatar Central |                    | Australia East |
| Canada Central   | Germany West Central |               |                    | Central India  |
| Central US       | North Europe         |               |                    | China North 3  |
| East US          | Sweden Central       |               |                    | East Asia      |
| East US 2        | UK South             |               |                    | Japan East     |
| South Central US | West Europe          |               |                    | Southeast Asia |
| West US 2        |                      |               |                    |                |
| West US 3        |                      |               |                    |                | 

Indicate any workflows or scenarios that aren't supported or ones that are, whichever is less. Provide links to any relevant information.
-->

### SLA improvements

TODO: Add your SLA improvements

<!-- 3B. SLA improvements --------------------------------------------------------------
To comply with legal requirements, DO NOT provide specific information about the SLAs here in this article.
-->

<!-- IF (SLA INCREASE) -->
Because availability zones are physically separate and provide distinct power source, network, and cooling, SLAs (Service-level agreements) increase. To see the increased SLA for [TODO-service-name], see [TODO-replace-with-link-to-SLA-documentation-for-service].
<!-- ELSE -->
There are no increased SLAs for [TODO-service-namee]. For more information on the [TODO-service-name] SLAs, see [TODO-replace-with-link-to-SLA-documentation-for-service].
<!-- END IF (SLA INCREASE) -->

#### Create a resource with availability zone enabled
TODO: Add your description

<!-- 3C. Create a resource with availability zone enabled ------------------------------
Provide a link to a document or describe inline in this document how to create a resource or instance with availability zone enabled. Provide examples using CLI, portal, and PowerShell.
-->

### Zonal failover support
TODO: Add your zonal failover support

<!-- 3D. Zonal failover support --------------------------------------------------------
-->

<!-- IF (SERVICE IS ZONAL) -->

<!-- Indicate here whether the customer can set up resources of the service to failover to another zone. If they can set up failover resources, provide a link to documentation for this procedure. If such documentation doesn’t exist, create the document, and then link to it from here. -->

<!-- END IF (SERVICE IS ZONAL) -->

### Fault tolerance
TODO: Add your fault tolerance

<!-- 3E. Fault tolerance ---------------------------------------------------------------
To prepare for availability zone failure, customers should over-provision capacity of service to ensure that the solution can tolerate ⅓ loss of capacity and continue to function without degraded performance during zone-wide outages. Provide any information as to how customers should achieve this.
-->

### Zone down experience
TODO: Add your zone down experience

<!-- IF (SERVICE IS ZONE REDUNDANT) -->

<!-- 3F. Zone down experience ----------------------------------------------------------
Select the scenario that best describes customer experience or combine/provide your own description:

- During a zone-wide outage, no action is required during zone recovery, Offering will self-heal and re-balance itself to take advantage of the healthy zone automatically. 
    
- During a zone-wide outage, the customer should expect brief degradation of performance, until the service self-healing re-balances underlying capacity to adjust to healthy zones. This is not dependent on zone restoration; it is expected that the Microsoft-managed service self-healing state will compensate for a lost zone, leveraging capacity from other zones. 
  
- In a zone-wide outage scenario, users should experience no impact on provisioned resources in a zone-redundant deployment. During a zone-wide outage , customers should be prepared to experience brief interruption for communication to provisioned resources; typically, this is manifested by client receiving 409 error code; this prompts re-try logic with appropriate intervals. New requests will be directed to healthy nodes with zero impact on user. During zone-wide outages, users will be able to create new offering resources and successfully scale existing ones. 
 
The table may contain:

- CRUD and Scale-out operations (Create Read Update Delete)
- Application communication scenarios – data plane operations (for example, insert/update/delete for a database).

| Operation name | Outage  | Availability Impact | Durability Impact | Error code |What to do |
|--|--|--|--|--|

The table below lists all error codes that may be thrown by the [TODO-service-name] and resources of that service during zone down outages.

List the following:

- CRUD and Scale-out operations (Create Read Update Delete)
- Application communication scenarios – data plane operations (for example, insert/update/delete for a database).

| Error code | Operation | Description |
|---|---|---|
-->
<!-- END IF (SERVICE IS ZONE REDUNDANT) -->

#### Zone outage preparation and recovery
TODO: Add your zone outage preparation and recovery

<!-- 3G. Zone outage preparation and recovery ------------------------------------------
The table below lists alerts that can trigger an action to compensate for a loss of capacity or a state for your resources. It also provides information regarding actions for recovery, as well as how to prepare for such alerts prior to the outage.

| Alert type | Actions for recovery | How to prepare prior to outage |
|--|--|--|
-->

### Low-latency design
TODO: Add your low-latency design

<!-- 3H. Low-latency design ------------------------------------------------------------
-->

<!-- IF (SERVICE IS ZONE REDUNDANT AND ZONAL) -->

<!-- Describe scenarios in which the customer will opt for zonal vs. zone-redundant version of your offering.-->

<!-- Microsoft guarantees communication between zones of < 2ms. In scenarios in which your solution is sensitive to such spikes, you should configure all components of the solution to align to a zone. This section is intended to explain how your service enables low-latency design, including which SKUs of the service support it. -->

<!-- OPTIONAL SECTION. If your service supports active-passive model, share an approach to control active component to a desired zone and align passive component with next zone. Make an explicit call-out for functionality where a resource is flagged as zone redundant but offers active-passive/primary-replica model of functionality-->

<!-- END IF (SERVICE IS ZONE REDUNDANT AND ZONAL) -->

>[!IMPORTANT]
>By opting out of zone-aware deployment, you forego protection from isolation of underlying faults. Use of SKUs that don't support availability zones or opting out from availability zone configuration forces reliance on resources that don't obey zone placement and separation (including underlying dependencies of these resources). These resources shouldn't be expected to survive zone-down scenarios. Solutions that leverage such resources should define a disaster recovery strategy and configure a recovery of the solution in another region.

### Safe deployment techniques
TODO: Add your safe deployment techniques

<!-- 3I. Safe deployment techniques ----------------------------------------------------
If application safe deployment is not relevant for this resource type, explain why and how the service manages availability zones for the customer behind the scenes.
-->

When you opt for availability zones isolation, you should utilize safe deployment techniques for application code, as well as application upgrades. Describe techniques that the customer should use to target one-zone-at-a-time for deployment and upgrades (for example, virtual machine scale sets). If something is strictly recommended, call it out below.

<!-- List health signals that the customer should monitor, before proceeding with upgrading next set of nodes in another zone, to contain a potential impact of an unhealthy deployment. -->
[Health signals]
TODO: Add your health signals

### Availability zone redeployment and migration
TODO: Add your availability zone redeployment and migration

<!-- 3J. Availability zone redeployment and migration ----------------------------------------------------
Link to a document that provides step-by-step procedures, using Portal, ARM, CLI, for migrating existing resources to a zone redundant configuration. If such a document doesn’t exist, please start the process of creating that document. The template for AZ migration is:

` [!INCLUDE [AZ migration template](az-migration-template.md)] `
-->
<!-- END IF (AZ SUPPORTED)-->

## Disaster recovery: cross-region failover
TODO: Add your disaster recovery: cross-region failover

<!-- 4. Disaster recovery: cross-region failover ---------------------------------------
Required. In the case of a region-wide disaster, Azure can provide protection from regional or large geography disasters with disaster recovery by making use of another region. For more information on Azure disaster recovery architecture, see [Azure to Azure disaster recovery architecture](/azure/site-recovery/azure-to-azure-architecture.md).

Give a high-level overview of how cross-region failover works for your service

If cross-region failover depends on region type (for example paired region vs. 3+0), provide detailed explanation and refer to the 3+0 or other subsection.

Explain whether items are Microsoft responsible or customer responsible for setup and execution.

If specific responsibilities differ based on region type (for example, paired region vs. 3+0), provide detailed explanation and refer to the 3+0 or other subsection. 

If Microsoft responsible for DR, indicate how long DR takes for loss of region to alternate region. 

If customer responsible for DR, indicate how long DR can take (Immediate – if Active-Active; or if manual and recommended recovery time, etc.)  

Provide details on how customer can minimize failover downtime (if due to Microsoft responsible).  
-->


### Cross-region disaster recovery in multi-region geography
TODO: Add your cross-region disaster recovery in multi-region geography

<!-- 4A. Cross-region disaster recovery in multi-region geography ----------------------
Provide an overview here of who is responsible for outage detection, notifications, and support for outage scenarios.
-->

#### Outage detection, notification, and management
TODO: Add your outage detection, notification, and management

<!-- IF NOT(MICROSOFT 100% RESPONSIBLE) -->

<!-- 4C. Set up disaster recovery and outage detection ---------------------------------
In cases where Microsoft shares responsibility with the customer for outage detection and management, the customer will need to do the following:

- Provide comprehensive How to for setup of DR, including prerequisite, recipe, format, instructions, diagrams, tools, and so on.  

- Define customer Recovery Time Objective (RTO) and Recovery Point Objective (RPO) expectations for optimal setup. 

- Explain how customer detects outages. 

- Specify whether recovery is automated or manual. 

- Specify Active-Active or Active-Passive 

This can be provided in another document, located under the Resiliency node in your TOC. Provide the link here.
-->

<!-- END IF NOT(MICROSOFT 100% RESPONSIBLE) -->

#### Set up disaster recovery and outage detection
TODO: Add your disaster recovery and outage detection setup


<!-- If (MICROSOFT 100% RESPONSIBLE) -->

<!-- 4B. Outage detection, notification, and management --------------------------------
- Explain how Microsoft detects and handles outages for this offering. 

- Explain when the offering will be failed to another region (decision guidance). 

- If service is deployed geographically, explain how this works. 

- Specify whether the offering runs Active-Active with auto-failover or Active-Passive. 

- Explain how customer is notified or how customer can check service health. 

- Explain how customer storage is handled, how much data loss occurs and whether R/W or only R/O for 00:__ (duration).

- If this single offering fails over, indicate whether it continues to support primary region or only secondary region. 

- Provide all other guidance of what the customer can expect in region loss scenario. 

- Describe service SLA and high availability. 

- Define RTO and RPO expectations.
-->

<!-- END IF (MICROSOFT 100% RESPONSIBLE) -->

### Single-region geography disaster recovery
TODO: Add your single-region geography disaster recovery


<!-- 4D. Single-region geography disaster recovery -------------------------------------
Explain how offering supports single-region geography and how it differs from other multi-regions geography (for example, if offering is in a multi-region geography, DR is Microsoft-responsible; if in a single-region geography, DR is customer-responsible.)  

If DR is the identical for single-region and multi-region geographies, state this explicitly. (for example, CEDR for both 3+1 and 3+0.) 

If single-region DR is customer-responsible, can both data plane and control plane be configured by customers or only data plane?  

Clarify customer implication when recovery classification is CEDR: Is customer losing data/features/functions when recovery classification is CEDR in region-down scenario?  

Specify SLA and availability consideration in this configuration? 

Specify RTO and RPO expectations in 3+0 scenario. 

Provide instructions on setup for cross-region/outside geography DR. 

Provide instructions to set up and execute DR using Portal, Azure CLI, PowerShell. Does documentation provide options to configure DR via portal, CLI, PowerShell? 

Provide instructions to test DR plan and failover to simulate disaster.  

Provide detailed instructions for customer to clean up DR setup to free up resources. 
-->

### Capacity and proactive disaster recovery resiliency
TODO: Add your capacity and proactive disaster recovery resiliency

<!-- 4E. Capacity and proactive disaster recovery resiliency ---------------------------
Microsoft and its customers operate under the Shared responsibility model. This means that for customer-enabled DR (customer-responsible services), the customer must address DR for any service they deploy and control. To ensure that recovery is proactive, customers should always pre-deploy secondaries because there is no guarantee of capacity at time of impact for those who have not pre-allocated. 

In this section, provide details of customer knowledge required re: capacity planning and proactive deployments.
-->

## Additional guidance
TODO: Add your additional guidance

<!-- 5. Additional guidance ------------------------------------------------------------
Provide any additional guidance here.
-->

## Next steps

<!-- 6. Next steps ---------------------------------------------------------------------
Required: Include a Next steps H2 that points to a relevant task to accomplish,
or to a related topic. Use the blue box format for links.
-->


> [!div class="nextstepaction"]
> [Resiliency in Azure](/azure/availability-zones/overview.md)