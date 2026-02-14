---
title: Custom authorization with functions for API for GraphQL
description: Learn how to use user data functions to enble custom authorization for API for GraphQL
author: mksuni
ms.author: sumuth
ms.date: 03/20/2026
ms.topic: concept-article
ms.search.form: how to use user data functions to enble custom authorization for API for GraphQL
---
# Use an Authorizer UDF to control access to a GraphQL API

## Overview

Authorizer User-Defined Functions (UDFs) let you execute custom authorization logic **before a GraphQL API request is processed**. This capability enables API owners to enforce business-specific access rules that go beyond static role assignments.

With an Authorizer UDF, you can evaluate information from the authenticated request—such as claims in a JWT token—and decide whether the request should be allowed. The logic is implemented as a function and invoked automatically for incoming API calls.

## When to use an Authorizer UDF

Use an Authorizer UDF when you need to:

- Apply custom business logic before API execution
- Restrict access based on user identity or token claims
- Validate service principals separately from user accounts
- Combine dynamic authorization logic with RBAC and row-level security

This approach is useful when static role definitions alone are not sufficient.

## How Authorizer UDFs work

When the Authorizer UDF feature is enabled:

1. A function is invoked **before** the GraphQL API executes.
2. The function receives context from the authenticated request.
3. Custom logic determines whether the request is authorized.
4. If authorization succeeds, the API request continues.
5. If authorization fails, the request is denied.

The result of the function invocation is cached, so subsequent requests execute faster after the initial evaluation.

## Enable the Authorizer UDF feature

To use an Authorizer UDF, you must enable the feature on your GraphQL API and provide the required function details.

Once enabled, the API invokes the configured Authorizer UDF automatically for incoming requests.

## Implement authorization logic in the function

The Authorizer UDF contains custom logic written by the API owner. The function can:

- Inspect claims from the JWT token of the authenticated caller
- Validate user principal names (UPNs) or email domains
- Evaluate application IDs for service principals
- Call external systems or APIs if needed
- Query data sources to validate access

In the demo, the function checks whether the authenticated user belongs to a specific email domain (for example, a company-owned domain) and only allows access if the condition is met. 

## Example: Restrict access by user domain

In this scenario:

- The Authorizer UDF checks the authenticated user’s UPN.
- The function validates whether the email domain matches an allowed domain.
- Only users from the allowed domain can access the GraphQL API.

This pattern is useful when you want to restrict access to employees from a specific tenant or organization. 

## Supporting service principal access

Authorizer UDFs can also distinguish between **user-based access** and **service principal (SPN) access**.

In the demo:

- A local application authenticates using a service principal.
- The Authorizer UDF checks the application ID claim in the token.
- Access is granted only if the application ID matches the expected value.

This allows secure, programmatic access to the API while applying different rules than those used for human users. 

## Integrating with RBAC and row-level security

Authorizer UDFs work together with RBAC features:

- Role-based access determines **which data types and operations** are allowed.
- Row-level and column-level controls restrict **which data rows and fields** can be accessed.
- The Authorizer UDF controls **who is allowed to proceed** before those rules are applied.


## Next steps

[Connect to an application](../data-engineering/connect-apps-api-graphql.md)
[Develop in VS Code](../data-engineering/api-graphql-develop-vs-code)
