---
title: OneLake security integrations overview
description: Learn how to ingrate your own query engine or application with OneLake security.
ms.reviewer: aamerril # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.topic: how-to
ms.custom:
ms.date: 03/03/2026
#customer intent: As a Fabric user, I want to learn how to create and manage OneLake security so that I can control access to specific folders in my lakehouse and ensure data security.
---

# OneLake security integrations overview (preview)

This article describes how to use the **authorized engine** model to allow any engine or application to integrate with OneLake secured data.

OneLake security provides fine-grained access control on data in OneLake, and enforces it everywhere that the data is accessed. OneLake security is designed around a centralized policy definition with controlled, distributed enforcement. Security policies such as role-based permissions, row-level security (RLS), and column-level security (CLS) are authored and stored once in OneLake. Enforcement happens at query time inside the engine that's reading the data. However, not all engines understand how to enforce the access control policies that are defined in OneLake. As a result, OneLake blocks access to data with RLS or CLS policies set on it if the user isn't allowed to see all the data. To allow your own engine or application to enforce OneLake security, configure it as an authorized engine.

## Set up an authorized engine

Authorized engines are configured by a workspace Admin or Member by granting the engine identity the necessary privileges in Fabric. For each engine you want to authorize, use the following steps:

- Consult the documentation for your engine to locate the identity used by the engine to query data from external sources. Note that only Microsoft Entra identities are supported in Fabric.
- Add the engine identity to the Member role through [workspace permissions.](../../fundamentals/roles-workspaces.md) Authorized engine access is scoped to specific workspaces. This step gives the identity the necessary privileges to read OneLake security role metadata and read the physical data files from OneLake. You can revoke the identity's access at any time by removing it from the workspace role.

## Related content

* [OneLake security integrations reference](./onelake-security-integrations-reference.md)
* [OneLake security integrations guide](./onelake-security-integrations-external-engines.md)
* [OneLake security data access control model](./data-access-control-model.md)
