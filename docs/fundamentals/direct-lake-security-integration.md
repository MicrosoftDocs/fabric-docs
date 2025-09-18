---
title: Integrate Direct Lake Security
description: Learn how to integrate Direct Lake security across OneLake and SQL endpoints, configure connections, and apply OLS/RLS to protect data.
#customer intent: As a Fabric user, I want to know how to integrate Direct Lake security.
author: JulCsc
ms.author: juliacawthra
ms.reviewer: kayu
ms.date: 09/18/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Integrate Direct Lake security

Direct Lake security ensures that only authorized users can query Delta tables in OneLake by combining workspace roles, item and compute permissions, and OneLake security. This article explains how to configure connections, choose single sign-on (SSO) or fixed identities, apply object-level security (OLS) and row-level security (RLS), and align permission models for governance and compliance goals. Learn more in [OneLake security overview](../onelake/security/get-started-security.md).

## Key concepts and terminology

This article assumes you're familiar with these concepts:

- Direct Lake uses shared M expressions in the semantic model metadata to reference data sources through Power Query data access functions: *AzureStorage.DataLake* for Direct Lake on OneLake and *Sql.Database* for Direct Lake on SQL endpoints. However, Direct Lake doesn't use these functions to read the source Delta tables. It reads the Delta tables directly through OneLake APIs.
- To ensure only authorized users query the data, Direct Lake checks the data access permissions of the effective identity. The effective identity depends on the data connection configuration. By default, Direct Lake uses SSO (Microsoft Entra ID) and uses the identity of the current user querying the semantic model. You can also bind a Direct Lake model to an explicit cloud connection to provide a fixed identity.
- If you grant data access permissions through workspace roles, only members of the Contributors role (or higher) can read data in OneLake. Workspace Viewers, however, don't have *read* permission in OneLake. Viewers and users who aren't members of a workspace role can get *read* access through a combination of item permissions, compute permissions, or OneLake security roles.
- OneLake security lets members of the Workspace Admin and Workspace Member roles define granular role-based security for users in the Viewer role. Specify the tables a Viewer or user with explicit *read* permission can access and exclude specific rows or columns. To learn more about OneLake security roles, see [Table security in OneLake](../onelake/security/table-folder-security.md), [Column-level security in OneLake](../onelake/security/column-level-security.md), and [RLS in OneLake](../onelake/security/row-level-security.md).

## Connection configuration

Configure data connections for a Direct Lake model the same way as other semantic model types. See [Connect to cloud data sources in the Power BI service](/power-bi/connect-data/service-connect-cloud-data-sources) for details.

Because Direct Lake connects only to Fabric data sources, the default SSO (Microsoft Entra ID) configuration usually works, so you don't need to bind semantic models to explicit data connections. This approach reduces configuration complexity and lowers management overhead.

With SSO (Microsoft Entra ID), Direct Lake checks that the current user querying the semantic model has *read* access to the data. Only users with *read* access can query the data. The following screenshot shows a Direct Lake model using the default SSO configuration.

:::image type="content" source="media/direct-lake-security-integration/direct-lake-model-connection-settings-enabled.png" lightbox="media/direct-lake-security-integration/direct-lake-model-connection-settings-enabled.png" alt-text="Screenshot of Direct Lake model connection settings showing default Microsoft Entra ID SSO enabled for data access.":::

When you use an explicit data connection with a fixed identity instead of SSO, Direct Lake doesn't require every user to have *read* permission on the underlying data. If Microsoft Entra SSO remains disabled in the data connection, the fixed identity's permissions determine what data Direct Lake can access.

:::image type="content" source="media/direct-lake-security-integration/direct-lake-model-connection-settings-disabled.png" lightbox="media/direct-lake-security-integration/direct-lake-model-connection-settings-disabled.png" alt-text="Screenshot of Direct Lake model connection settings with Microsoft Entra ID SSO disabled and a fixed identity selected.":::

> [!NOTE]
> You can configure a data connection to use both SSO and a fixed identity. Direct Lake checks the current user's permissions at query time and uses the fixed identity for framing and transcoding at refresh time. To use a fixed identity for both queries and refreshes, make sure SSO is disabled in the data connection configuration.

## Authentication requirements

Direct Lake models use Microsoft Entra ID authentication. In the data connection configuration, choose **OAuth 2.0**, **Service Principal**, or **Workspace Identity** as the authentication method. Other methods, like key or SAS authentication, might appear in the configuration UI but aren't supported for Direct Lake models.

## Permission requirements

The permission requirements differ between Direct Lake on SQL endpoints and Direct Lake on OneLake. This is because Direct Lake on SQL endpoints relies on the SQL Analytics Endpoint of the target data source, whereas Direct Lake on OneLake uses the OneLake APIs for permission checks.

### Direct Lake on SQL endpoints

Direct Lake on SQL endpoints performs permission checks via the SQL analytics endpoint to determine whether the effective identity attempting to access the data has the necessary data access permissions. Notably, the effective identity doesn't need permission to read Delta tables directly in OneLake. It's enough to have *read* access to the Fabric artifact, such as a lakehouse, and SELECT permission on a table through its SQL analytics endpoint. That's because Fabric grants the necessary permissions to the semantic model to read the Delta tables and associated Parquet files (to [**load column data**](direct-lake-overview.md#column-loading-transcoding) into memory). The semantic model has permission to periodically read the SQL analytics endpoint to check what data the querying user (or fixed identity) can access.

### Direct Lake on OneLake

Direct Lake on OneLake doesn't use a SQL analytics endpoint for permission checks. It uses OneLake Security. When OneLake Security is enabled, Direct Lake on OneLake uses the current user (or fixed identity) to resolve OneLake Security roles and enforce OLS and RLS on the target Fabric artifact. If OneLake Security isn't enabled, Direct Lake on OneLake requires the effective identity to have Read and ReadAll permissions on the target Fabric artifact to access its Delta tables in OneLake. For more information about Read and ReadAll permissions, see the [Item permissions section in the OneLake security overview article.](../onelake/security/get-started-security.md#item-permissions)

> [!NOTE]
> Contributors (or higher) have Read and ReadAll permissions in OneLake. Viewers and users who aren’t members of a workspace role must be granted Read and ReadAll permissions or added to a OneLake security group. For more information about managing OneLake security groups, see [OneLake data access control model](../onelake/security/data-access-control-model.md).

### Direct Lake users

The following scenarios list minimum permission requirements.

|Scenario  |Required permissions  |Comments  |
|---------|---------|---------|
|**Users can view reports**     |- *Read* permission on the semantic model<br>- If using Direct Lake on SQL endpoints with SSO, grant *Read* and *ReadData* on the lakehouse or warehouse<br>- If using Direct Lake on OneLake with SSO, grant *Read* and *ReadAll* on the Delta tables|Applies to interactive scenarios. Reports can be in a different workspace than the semantic model.For more information, see [Strategy for read-only consumers](/power-bi/guidance/powerbi-implementation-planning-security-report-consumer-planning). | 
|**Users can create reports** | - *Build* permission on the semantic model<br>- Same source-level permissions as above depending on Direct Lake mode and auth method | Required for content creators. For more information, see [Strategy for content creators](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning).   |
| **Users can view reports but are denied querying the lakehouse, SQL endpoint, or Delta tables** | - *Read* permission on the report<br>- *Read* permission on the semantic model<br>- **No source-level permissions** | Only valid when using **fixed identity** via SCC with **SSO disabled**. |
| **Manage the semantic model, including refresh settings** | - Must be the **semantic model owner** | Ownership is required to configure refresh and other model settings. For more information, see [Semantic model ownership](/power-bi/guidance/powerbi-implementation-planning-security-content-creator-planning).        |
| **Use Direct Lake with Power BI Embedded** | - *Read* or *Build* permission depending on scenario<br>- **Fixed identity SCC** required<br>- **V2 embed token** required | Applies to embedded scenarios. |
| **Create composite models using Direct Lake + Import/DirectQuery** | - *Build* permission on the semantic model<br>- Source-level permissions for all sources involved | Only supported via XMLA for Direct Lake on OneLake. |
| **Use Direct Lake with SQL-based RLS** | - *Read* and *ReadData* on SQL endpoint<br>- Validate fallback behavior | Queries may fall back to DirectQuery if RLS is enforced. |
| **Use Direct Lake with semantic model RLS or OLS** | - *Read* permission on the semantic model<br>- RLS/OLS defined in the semantic model<br>- Recommended: use **fixed identity** cloud connection | Applies to both Direct Lake modes. |
| **Use Direct Lake with shortcuts in lakehouse** | - *Read* and *ReadAll* on shortcut target tables<br>- *Read* on lakehouse containing the shortcut | Only supported for Direct Lake on SQL endpoints. |

> [!IMPORTANT]
> Always test permissions before releasing your semantic model and reports to production.

For more information, see [Semantic model permissions](/power-bi/connect-data/service-datasets-permissions).

### Direct Lake owners

In addition to the effective identity (current user or fixed identity), Direct Lake also requires the semantic model owner to have *read* access to the source tables so that Direct Lake can frame the semantic model as part of data refresh. No matter who refreshes a Direct Lake model, Direct Lake checks the owner’s permission to ensure the model is allowed to access the data. The owner’s data access permission requirements are the same as for users querying the model.

If the semantic model owner doesn't have the required data access permissions, Direct Lake raises the following error during framing: `We cannot refresh this semantic model because one or multiple source tables either do not exist or access was denied. Please contact a data source admin to verify that the tables exist and ensure that the owner of this semantic model does have read access to these tables. Some restricted tables including fully restricted and partially restricted (indicating column constraints): '\<list of tables\>'.`

## Shortcuts to source tables

Shortcuts are OneLake objects that you add to a Fabric lakehouse or other Fabric artifact to point to internal or external storage locations. In a Direct Lake model, Delta tables added through shortcuts appear as native in the connected Fabric artifact because shortcuts are transparent when you access data through the OneLake API.

When you access shortcuts through Direct Lake over SQL endpoints, Direct Lake first validates that the effective identity (current user or fixed identity) can access the table in the semantic model's data source. For internal shortcuts, after that check passes, Direct Lake uses the data source owner's identity to read the Delta table through the shortcut at the table's Fabric artifact. The data source owner must have access permission in the target OneLake location. For external shortcuts, the data source owner also needs Use permission on the cloud connection to the external system that hosts the Delta table. For more information, see [OneLake shortcuts](../onelake/onelake-shortcuts.md).

:::image type="content" source="media/direct-lake-security-integration/direct-lake-diagram.png" lightbox="media/direct-lake-security-integration/direct-lake-diagram.png" alt-text="Screenshot of diagram showing Direct Lake validating effective identity then using data source owner identity to access internal or external shortcut target.":::

Direct Lake over OneLake has different permission requirements because the SQL Analytics Endpoint isn't involved. When a user accesses data through an internal shortcut to another OneLake location, the effective identity (current user or fixed identity) must have permission in the target location. The effective identity must be a Contributor (or higher), have Read and ReadAll permissions, or be in a OneLake security role that grants *read* access.

## Object-level security (OLS) and row-level security (RLS)

Both OneLake Security and Direct Lake models support OLS and RLS. OLS enables artifact owners and admins to secure specific tables or columns. RLS can be used to restrict data access at the row level based on filters. You can define OLS and RLS in OneLake Security, in a Direct Lake model, or in both locations.

> [!IMPORTANT]
> Direct Lake doesn't support SQL Analytics Endpoint OLS/RLS. To return correct data, Direct Lake over SQL endpoints falls back to DirectQuery mode if a Fabric artifact uses OLS or RLS. If DirectQuery fallback is disabled, queries over SQL endpoints fail when OLS/RLS is defined at the SQL Analytics Endpoint. Direct Lake over OneLake avoids this limitation.

### Direct Lake on OneLake OLS/RLS with OneLake Security OLS/RLS

Direct Lake on OneLake evaluates access to OLS/RLS secured objects by resolving the effective identity's OneLake Security roles and applying the defined OLS/RLS rules. The OneLake Security roles are handled the same as Direct Lake roles. If the effective identity belongs to multiple roles in OneLake Security and Direct Lake, Direct Lake first unions the OneLake Security roles, then intersects the result with the Direct Lake roles.

This table lists common troubleshooting situations caused by conflicting OneLake Security and Direct Lake rules.

| Scenario | Comments |
|---|---|
| No rows returned due to RLS filtering | If the effective identity lacks row-level access permissions, queries can return empty results. This behavior is expected when RLS filters exclude all rows for the current user. |
| Can't find table<br/>Column can't be found<br/>Failed to resolve name<br/>Not a valid table, variable, or function name | These errors usually occur when object permissions are missing after applying OneLake Security roles. |

### OLS/RLS scope differences

Enforcing OLS and RLS in OneLake Security applies the rules across all compute engines and ensures unified access control for users. This means that, regardless of the compute engine—lakehouse, warehouse, semantic model, or other artifact—OneLake Security rules control the user's data access. In contrast, OLS/RLS defined within a Direct Lake semantic model only apply within the scope of that model. Other compute engines don't apply these Direct Lake security rules, which can produce different results when users access the data through other paths.

> [!IMPORTANT]
> When you use both OneLake Security OLS/RLS and Direct Lake OLS/RLS, users who have OneLake access can still retrieve and work with the data—even if Direct Lake model rules further restrict data—because model-level rules don't extend beyond the model. Use OneLake Security for comprehensive access control across all compute engines.

### OneLake OLS and semantic model metadata

Semantic model metadata includes definitions of tables, columns, relationships, and other schema elements. Users with *build* or higher permissions can view the model metadata via XML for Analysis (XMLA) and REST APIs. For more information, see [Semantic model permissions](/power-bi/connect-data/service-datasets-permissions).

To protect sensitive table and column names in OneLake with OneLake OLS, remember that OneLake Security applies only to members of the workspace Viewer role. OneLake OLS doesn't prevent members of the Contributor (or higher) workspace role from discovering secured tables or columns because they already have Write permission to all workspace artifacts. Members of the Viewer role with *build* or higher permissions on a Direct Lake model can discover sensitive schema information through the semantic model metadata. These higher privileged viewers still don't have data access, but they can see that the secured tables and columns exist.

A Direct Lake model might exist in the same workspace as the source artifact or in a separate workspace. Grant a viewer in the same workspace *build* (or higher) access to a Direct Lake model through item permissions. In a separate workspace, a user might be a Contributor (or higher) or have *build* (or higher) item permissions to access the model metadata.

### OneLake OLS and Git integration

Git integration enables developers to integrate their application lifecycle management (ALM) processes into the Fabric platform. The Git repository preserves the workspace structure, including all supported artifacts. Developers have full visibility to the metadata of all their items in the Git repository. Direct Lake model metadata lets them see that secured tables or columns exist even if they don't have access to the target data source in another workspace. For more information, see [What is Microsoft Fabric Git integration?](../cicd/git-integration/intro-to-git-integration.md)

## Considerations and limitations

Consider these Direct Lake security limitations.

> [!NOTE]
> The capabilities and features of Direct Lake semantic models and OneLake security evolve rapidly. Check back periodically for updates.

- Assign workspace viewers OneLake security roles that grant *read* access to the source Fabric artifacts. If a source artifact has shortcuts to another Fabric artifact, the user also needs *read* access to each shortcut’s target Fabric artifact.
- Use a fixed identity to isolate users from a source Fabric artifact. Bind the Direct Lake model to a cloud connection. Keep SSO disabled on the cloud connection to use the fixed identity for refreshes and queries.
- Direct Lake semantic models that rely on Fabric OneLake security on the source artifact don't support backup operations.
- Bidirectional relationships aren't supported in a Direct Lake model if the source Fabric artifact relies on OneLake security RLS.
- During public preview, OneLake security supports only static RLS on a single table.
- During public preview, OneLake security doesn't support dynamic definitions or complex role configurations, such as combining multiple OLS and RLS roles across related tables.
- Consolidate OneLake security RLS and OLS permissions into one role per user instead of assigning multiple roles.
- If the OneLake security configuration changes, such as due to shortcut changes in the target artifact, refresh Direct Lake on OneLake models that access that artifact. If autosync is enabled, the service usually refreshes them automatically. Otherwise, refresh the models manually.
