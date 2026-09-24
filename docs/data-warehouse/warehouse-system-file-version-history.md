---
title: Fabric Data Warehouse System File Version History
description: See a history of the warehouse item's system file version history.
ms.reviewer: pvenkat
ms.date: 07/30/2026
ms.topic: release-notes
---

# Release notes for Fabric Data Warehouse system file

This article contains release notes for each version of the warehouse item's internal system file.

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Each version introduces a specific set of changes. Review the changes for your target version before you apply and commit a system update. As Fabric releases new system file versions in the future, the changes for those versions are added to this section.

> [!TIP]
> For a step-by-step guide to upgrade your warehouse, see [Upgrade the system file version of a warehouse in a Git integrated Fabric workspace](upgrade-warehouse.md).

## Version 2.0

Version `2.0` of the warehouse item definition uses an updated DacFx integration and introduces the following changes:

- The `Microsoft.Build.Sql` SDK reference in the `.sqlproj` file is updated to version `2.3.0-preview.1`.

   - An SDK version that's behind the current [Microsoft.Build.Sql package version](https://www.nuget.org/packages/Microsoft.Build.Sql) indicates an out-of-date project file. For more information, see [Microsoft.Build.Sql and Templates Releases](https://github.com/microsoft/DacFx/tree/main/release-notes/Microsoft.Build.Sql). For more information and steps to resolve, see [Troubleshoot Git integration for Fabric warehouse development](troubleshoot-git-integration.md#out-of-date-sqlproj-in-the-git-repository).

- System references are added to the `.sqlproj` file.
- All shared queries move to a `.sharedqueries` folder at the root of the database project. The `.sharedqueries` folder isn't visible by default on macOS and Linux, because folder names that start with a period are treated as hidden. Configure your file explorer or terminal to show hidden files to see the folder.
- The `XMLA.json` file is excluded from Git integration and is no longer tracked.
- A `.gitignore` file is added at the warehouse project level.
- All object definitions are re-extracted to support constraints, identity columns, clustering, and consistent modeling and formatting. This re-extraction ensures that subsequent Git commits produce clean, minimal differences instead of large, unresolved changes.

## Version 1.0

General availability. 

## Next step

> [!div class="nextstepaction"]
> [Upgrade the system file version of a warehouse in a Git integrated Fabric workspace](upgrade-warehouse.md)

## Related content

- [Git Integration for Fabric Warehouse Development](git-integration.md)
- [Development and deployment overview in Fabric Data Warehouse](development-deployment.md)
- [How to use Git integration for warehouse development and deployment](how-to-git-integration.md)
