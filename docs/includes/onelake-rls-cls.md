---
title: Include file for OneLake security row-level and column-level security rules
description: Include file for OneLake security row-level and column-level security rules.
author: kgremban
ms.author: kgremban
ms.topic: include
ms.date: 03/20/2025
---

## Combine row-level and column-level security

Row-level and column-level security can be used together to restrict user access to a table. However, the two policies have to be applied using a single OneLake security role. In this scenario, access to data is restricted according to the rules that are set in the one role.

OneLake security doesn't support the combination of two or more roles where one contains RLS rules and another contains CLS rules. Users that try to access tables that are part of an unsupported role combination receive query errors.