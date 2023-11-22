---
title: Authentication settings
description: Learn about the switch that enables third party single sign-in authentication.
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to
ms.custom:
ms.date: 11/02/2023
---

# Authentication API Admin Setting

The SSO Authentication API enables visuals to obtain Microsoft Entra ID (formally known as Azure AD) access tokens for signed-in users, facilitating single sign-on authentication.

Fabric admins can enable or disable the API through a global switch. The default setting is Off. 

The API applies to AppSource visuals only, and provides enhanced security and control. You can test Visuals that are under development in debug mode before publishing.

It's important to note that uncertified visuals can use the API, and certified visuals can't make external calls.

## Enable the Authentication API tenant setting

The Authentication API tenant admin settings is configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

:::image type="content" source="./media/authentication-admin-settings/authentication-setting.png" alt-text="Screenshot of authentication switch.":::

To learn more, see [Introduction to Git integration](/power-bi/developer/visuals/authentication-api.md).

## Considerations and limitations

Authentication is blocked if any of the following conditions apply:​

* The tenant switch is turned off.

* The user isn't signed in (in Desktop).

* The admin or user hasn't given consent.

* The ISV has not preauthorized the Power BI application.

* The format of the AADAuthentication Privilege parameter is invalid.

* The visual is not publicly approved and is not in Debug Visual mode.

Authentication is supported in the following scenarios:

* Web
* Desktop
* RS Desktop
* Mobile

Authentication is not supported in the following scenarios:

* Sovereign Clouds
* RS Service
* Embed
* Teams (Microsoft Entra ID dialogs aren't supported)
