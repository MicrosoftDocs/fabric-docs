---
title: Overview of Fabric Workload Development Kit authentication (preview)
description: This article describes how to use tokens to authenticate and validate for a customized Fabric workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how to authenticate a customized Fabric workload so that I can create customized user experiences.
---

# Authentication overview (preview)

Fabric workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization.

All interactions between workloads and other Fabric or Azure components must be accompanied by proper authentication support for requests received or sent. Tokens sent out must be generated properly, and tokens received must be validated properly as well.  

It's recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It's also recommended to go over [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist).

## Flows

<!--:::image type="content" source="./media/authentication-concept/authentication-diagram.png" alt-text="Screenshot showing the Workload Development Kit authentication flow.":::
-->

* From workload front-end to workload back-end

   An example of such communication is any data plane API. This communication is done with a Subject token (Delegated token).

   For information on how to acquire a token in the workload FE, read [Authentication API](./authentication-javascript-api.md). In addition, make sure you go over token validation in the [Back-end authentication and authorization overview](back-end-authentication.md).

* From Fabric back-end to workload back-end

   An example of such communication is Create workload item. This communication is done with a SubjectAndApp token, which is a special token that includes an app token and a subject token combined (see the [Back-end authentication and authorization overview](back-end-authentication.md) to learn more about this token).

   For this communication to work, the user using this communication must give consent to the Microsoft Entra application.

* From workload back-end to Fabric back-end

   This is done with a SubjectAndApp token for workload control APIs (for example, ResolveItemPermissions), or with a Subject token (for other Fabric APIs).

* From workload back-end to external services

   An example of such communication is writing to a Lakehouse file. This is done with Subject token or an App token, depending on the API.

   If you plan on communicating with services using a Subject token, make sure you're familiar with [On behalf of flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

   Refer to [Authentication tutorial](./authentication-tutorial.md) to set up your environment to work with authentication.

## Related content

* [Back-end authentication and authorization overview](./back-end-authentication.md)
* [Authentication JavaScript API](./authentication-javascript-api.md)
* [Authentication setup](./authentication-tutorial.md)
