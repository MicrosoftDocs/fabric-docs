---
title: Known Limitations in Plan (Preview)
description: This article lists known issues and limitations present in plan (preview).
ms.topic: concept-article
ms.date: 07/02/2026
#customer intent: As a user, I want to know the limitations present in plan.
---

# Known limitations in plan (preview)

Review the following known issues and limitations before you begin working with plan (preview).

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## B2B user support

Plan doesn't support Microsoft Entra B2B IDs.

## Private link support

Plan items aren’t supported in workspaces or tenants that use [private links](../../security/security-private-links-overview.md#what-is-a-private-endpoint).

## Semantic model

* You must have *Admin* or *Build* permissions on the semantic model.
* Semantic models in Direct Lake mode require [additional configuration](planning-how-to-create-semantic-model-connection.md#connect-to-a-direct-lake-semantic-model).
* Semantic model connections only support OAuth-based and service principal-based authentication. 
* Semantic models published in *My workspace* aren't supported.

## Capacities supported

Power BI Pro and Power BI Premium Per User (PPU) aren't supported for Plan scenarios that use XMLA endpoints and embed tokens. Similarly, lower-capacity SKUs that do not support XMLA endpoints are also unsupported.

## Workspace permissions

* Users with the *Contributor* role can't create or share cloud connections.
* Users with lower-level workspace roles, such as *Contributor*, can't create Plan artifacts that require embed token generation.

## Database-level Row-Level Security (RLS) support

PowerTable does not support user-specific database-level Row-Level Security (RLS) when connecting to Fabric SQL tables through a database connection. As a result, users might see rows that differ from the expected RLS-filtered results. This limitation exists because PowerTable executes all database queries using the identity associated with the database connection configured by the user during sheet creation, rather than the identity of the signed-in PowerTable user.
