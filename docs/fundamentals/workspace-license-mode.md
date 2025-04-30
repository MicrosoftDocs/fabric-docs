---
title: Workspace license modes
description: This article explains the meanings of the workspace license modes, and the implications they have for data residency requirements.
ms.reviewer: liud
ms.author: painbar
author: paulinbar
ms.topic: concept
ms.date: 04/29/2025
#customer intent: As workspace admin, I want to understand what the workspace license mode options are and when impact they have on data residency, the items that can be in the workspace, etc.
---
# Workspace license modes

Upon creation, workspaces are assigned to a capacity. Later, they can be reassigned to a different capacity. The workspace license type dictates what kind of capacity the workspace can be hosted on. User capabilities in the workspace are determined by the workspace license mode.

This article describes workspace license modes, how they are related to capacity assignment, and how the license mode and capacity assignment impact workspace migration to other regions and what items the workspace can include.

## Overview of licenses and capacities

Broadly, there are two types of licenses: per user licenses and capacity licenses.

* Per user licenses allow users to work in Fabric. The options are *Fabric* (Free), *Pro*, and *Premium Per User* (PPU). Per user licenses, allow users to work in the Power BI service with a system reserved capacity.
•	Capacity license - An organizational license that provides a pool of resources for Fabric operations. Capacity licenses are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs) which are used to calculate the capacity's compute power. Fabric capacities are available for purchase and for trial.

There are different capacity types in Fabric
•	Power BI Premium - A capacity that was bought as part of a Power BI Premium subscription. These capacities use P SKUs.
Note: Power BI capacities are transitioning to Fabric. For more information, see Power BI Premium transition to Microsoft Fabric.
•	Power BI Embedded - A capacity that was bought as part of a Power BI Embedded subscription. These capacities use A or EM SKUs.
•	Trial - A Microsoft Fabric trial capacity. These capacities use Trial SKUs.
•	Fabric capacity - A Microsoft Fabric capacity. These capacities use F SKUs
Configure license type and assign capacity in workspace settings

To Configure a license type and assign a new capacity to the workspace, you can go to Workspace settings -> License info. Clicking on Edit , you can see a list of available licenses types 


## Related content