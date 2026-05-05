---
title: How to consume workloads in Microsoft Fabric
description: Learn how to add and manage workloads at the tenant, capacity, or workspace level in Microsoft Fabric.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# How to consume workloads in Microsoft Fabric

This guide explains how to add workloads in Microsoft Fabric through the Workload Hub at different organizational levels.

## Overview

Microsoft Fabric allows you to extend its capabilities by adding workloads at three different organizational levels. All workload assignments and management are done through the **Workload Hub**, where customers can discover, evaluate, and manage workloads:

- **Tenant level**: Available to all users across the organization
- **Capacity level**: Available to all workspaces assigned to specific capacities
- **Workspace level**: Available only within specific workspaces

> [!NOTE]
> All workload consumption and management activities are centralized in the Workload Hub, providing a unified experience regardless of the organizational level.

## Prerequisites

Before consuming workloads, ensure you have:

- Appropriate permissions at the intended level (tenant admin, capacity admin, or workspace admin)
- Access to Microsoft Fabric with the necessary licensing

## Adding workloads through the Workload Hub

### Tenant-level assignment

**Who can do this**: Tenant administrators

1. Navigate to the Fabric Workload Hub
2. Browse workloads and select "Add to Tenant" 
3. Review permissions and confirm enablement for the entire organization

**Result**: Workload becomes available to all users across the organization.

### Capacity-level assignment

**Who can do this**: Capacity administrators

1. Access the Workload Hub with capacity administrator credentials
2. Select "Add to Capacity" for your chosen workload
3. Choose the target capacity from your managed capacities

**Result**: Workload becomes available to all workspaces assigned to that capacity.

### Workspace-level assignment

**Who can do this**: Workspace administrators

1. Navigate to the Workload Hub from your workspace
2. Select the desired workload and choose "Add to Workspace"
3. Follow the installation and configuration process

**Result**: Workload becomes available only within that specific workspace.

## Finding workloads

The Workload Hub provides a central marketplace where you can:

- **Browse by category**: Data engineering, analytics, visualization, industry-specific solutions
- **Search and filter**: Find workloads by functionality, vendor, or requirements
- **Review details**: Capabilities, documentation, ratings, and vendor information

## Managing workloads

### Monitoring usage
- Track workload performance and resource consumption
- Review usage patterns and user adoption

### Updates and maintenance
- Enable automatic updates where appropriate
- Test updates in non-production environments first

### Removing workloads
- Review dependencies before removal
- Communicate changes to affected users

## Best practices

- **Start small**: Begin with workspace-level assignments to test workloads
- **Plan capacity**: Consider resource requirements during capacity planning
- **Govern access**: Establish clear policies for workload approval
- **Monitor performance**: Track resource consumption and user adoption
- **Document usage**: Maintain records of workload purposes and owners

## Troubleshooting

**Workload not available**: Verify permissions and check if enabled at higher levels (tenant/capacity)

**Permission errors**: Ensure you have administrator rights at the appropriate level

**Performance issues**: Review resource consumption and consider capacity scaling

## Next steps

Once you've added workloads:

- Explore workload-specific documentation and tutorials
- Train your team on new capabilities
- Set up monitoring and governance processes

For custom workload development, see [Getting Started with Fabric Extensibility Toolkit](get-started.md).
