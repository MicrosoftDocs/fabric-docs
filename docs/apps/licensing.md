---
title: Choose a licensing option for Fabric Apps
description: Determine which licensing option you need to create Fabric apps based on your existing licenses, app requirements, and billing model.
ms.topic: concept-article
ms.reviewer: mksuni
ms.date: 10/25/2026
ai-usage: ai-generated
---

# Choose a licensing option for Fabric Apps

The license or billing option you use determines whether you can create a Fabric app, which capabilities are available, and how app usage is funded. A Fabric (Free) license alone doesn't let you create Fabric apps.

Use this article to identify an option that meets your requirements. For charges associated with apps deployed to Fabric capacity, see [Pricing and capacity usage for Fabric Apps](pricing.md).

## Compare available options

| Option | Entry point | Can you create an app? |
| --- | --- | --- |
| Fabric (Free) | Power BI or Fabric portal | No; access and consumption only |
| Power BI Pro | Power BI portal | Yes, within Power BI Pro limits |
| Fabric capacity or Fabric Free Trial | Fabric portal | Yes |

## Fabric (Free)

With a Fabric (Free) license, you can share and use Fabric app items in a workspace with supported Fabric-enabled capacity when you have the required permissions. Power BI dependencies have separate licensing requirements when users access them through delegated authentication. See [Share an app and access its dependencies](#share-an-app-and-access-its-dependencies).

This license alone doesn't provide the entitlement to create Fabric apps. To create an app, you need one of the other options in the comparison table. Using a Fabric (Free) license with a workspace assigned to trial or paid Fabric capacity is a separate option from using the free license alone.

## Power BI Pro

A Power BI Pro license lets you create and publish Fabric apps from the Power BI portal on Microsoft-managed capacity, subject to the limits in this section.

To create an app with Pro, sign in to the Power BI portal and use a Pro workspace. You don't need to assign Fabric capacity. Follow [Create an app from the portal](create-app.md#create-an-app-from-portal) for the workspace selection and app creation steps.

This creation option doesn't make Pro a baseline requirement for sharing or consuming the Fabric app item. For item sharing, capacity, and recipient access requirements, see [Share an app and access its dependencies](#share-an-app-and-access-its-dependencies).

> [!NOTE]
> If your Microsoft 365 E5 subscription includes Power BI Pro, you can use that entitlement for Fabric Apps.
> Power BI Pro is included in eligible E5 plans, so you don't need a separate Pro license for the same user.
> The app limits stay the same as for standalone Power BI Pro.

### Power BI Pro limits

These limits apply to both standalone Power BI Pro and Power BI Pro included in an eligible Microsoft 365 E5 subscription.

| Capability | Limit or support |
| --- | --- |
| App database | PostgreSQL, with a maximum database size of 1 GB |
| Rayfin functions | Not supported |
| File storage | Not supported |
| Anonymous data access | Not supported; authenticated callers required |
| Public sites | Not supported; authentication required for static sites |
| Connectors | Supported for semantic models and data connectors to a lakehouse, warehouse, and SQL database in Fabric |

## Fabric capacity and trial

With a Fabric license and a workspace assigned to trial or paid Fabric capacity, you can create, publish, share, and manage Fabric apps in the Fabric portal. For paid capacity, app operations consume capacity units from the capacity assigned to your workspace.

You can share a capacity-backed Fabric app with another user who has a Fabric license, including Fabric (Free), in the same tenant and the required item permissions. Check any Power BI dependency licensing separately when the app accesses that dependency on behalf of the user.

Use the trial for evaluation within its duration and feature restrictions. If you need to continue using capacity-backed apps after the trial, assign the workspace to paid Fabric capacity. Review [capacity usage and billing](pricing.md) when planning this option.

For trial and capacity details, see [Try Microsoft Fabric for free](../fundamentals/fabric-trial.md).

## Share an app and access its dependencies

Fabric apps are Fabric items. A Fabric (Free) license is sufficient to share or use the Fabric app item in the same tenant when its workspace has supported Fabric-enabled capacity. You need authority to share the app, and recipients need the appropriate item permissions. Licensing doesn't grant those permissions.

Supported capacity includes Fabric (F) capacity, Fabric trial capacity, and existing Power BI Premium (P) capacity with Fabric enabled. Power BI Pro or Premium Per User (PPU) licenses alone don't provide Fabric capacity. The F64 threshold for viewing Power BI content with a Free license isn't a minimum capacity size for sharing the Fabric app item.

Recipients don't need to purchase their own capacity or have Pro solely to use the Fabric app item. The app uses the capacity assigned to its workspace. See [Microsoft Fabric licenses and capacity](../enterprise/licenses.md#per-user-or-individual-licenses) for the general Fabric item licensing rules.

### Check dependency licensing separately

For delegated authentication, users need the permissions and licenses required to access each dependency. Current semantic model connectors support delegated authentication only. For example, a user who accesses a semantic model in a Pro workspace on their own behalf needs an appropriate Power BI entitlement and permission to access that model. These requirements are for the dependency, not for the Fabric app item itself.

Supported SQL connectors can use application authentication. For those connections, review the app identity's access and the applicable licensing requirements rather than assuming each user needs a direct source grant. Application authentication isn't an alternative for semantic model connectors. See [Choose the source identity](connectors.md#choose-the-source-identity).

Sharing can grant permissions on selected related items, but it doesn't replace licensing requirements or grant access to items left unshared. For the authentication distinction and sharing authority checks, see [Share a Fabric app](share-app.md).

## Related content

- [Pricing and capacity usage for Fabric Apps](pricing.md)
- [Try Microsoft Fabric for free](../fundamentals/fabric-trial.md)
- [Create your first Fabric Apps project](create-app.md)
- [Deploy a Fabric Apps project to Fabric](deploy-app.md)
