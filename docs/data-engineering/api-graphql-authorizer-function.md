---
title: Custom authorization with functions for API for GraphQL
description: Learn how to use user data functions to enble custom authorization for API for GraphQL
author: mksuni
ms.author: sumuth
ms.date: 05/01/2026
ms.topic: concept-article
ms.search.form: how to use user data functions to enble custom authorization for API for GraphQL
---
# Use an Authorizer UDF to control access to a GraphQL API

Authorizer User-Defined Functions (UDFs) let you execute custom authorization logic **before a GraphQL API request is processed**. This capability enables API owners to enforce business-specific access rules that go beyond static role assignments. With an Authorizer UDF, you can evaluate information from the authenticated request—such as claims in a JSON Web Token (JWT) token—and decide whether the request should be allowed. The logic is implemented as a function and invoked automatically for incoming API calls.

## Use-cases

Use an authorizer user data function when you need to:

- Apply custom business logic before API execution
- Restrict access based on user identity or token claims
- Validate service principal separately from user accounts

## How authorization feature works

When custom authorization is enabled with a user data function:

- A function runs before the GraphQL API executes.
- It receives context from the authenticated request.
- Custom logic checks authorization.
- The API request proceeds is the authorization is successful, otherwise it is denied.
- The result is achieved faster for future requests.

## Create a user data function

A authorizer function within a Fabric user data function requires a specific format. 

1. The function name can be user defined. It does not have any GraphQL-specific restrictions and should be defined based on the user data function constraints.
2. The function argument/parameter name should be request and it should be of type dictionary. When the GraphQL service invokes a function, it sends a payload containing a dictionary called request with the following fields:
   - **tokenClaims (dictionary):** key-value pairs containing token claims extracted from the incoming user token.
   - **query(string):** the query string passed when the GraphQL API is called.
   - **variables(dictionary):** key-value pairs containing variables passed when the GraphQL API is called.
   - **Return type(dictionary):** The function send back `isAuthorized`.
   
**Example**

Create a user data functions in [Fabric portal](https://app.fabric.microsoft.com).Update the function code with this sample authorizer function.

```python
from typing import TYPE_CHECKING
import fabric.functions as fn
import logging

user data function = fn.UserDataFunctions()

@user data function.function()
def invokeauthudf(request: dict) -> dict:
    
    token_claims: dict = request.get("tokenClaims", {})
    query: str = request.get("query", "")
    variables: dict = request.get("variables", {})
    domain = "onmicrosoft.com"
    spn = "59f4323d-c886-4eaf-b686-1219c4f380ab"

    # Extract claims from token_claims dictionary
    tid_claim = token_claims.get("tid")
    upn_claim = token_claims.get("upn")
    appid_claim = token_claims.get("appid")
    logging.info(f"Query: {query}");
    logging.info(f"Claims: {token_claims}");
    logging.info(f"Tenant: {tid_claim}");
    logging.info(f"UPN: {upn_claim}");
    logging.info(f"SPN: {appid_claim}");

    # Authorization logic
    ## Optional: Do role-based access check
    roles = []

    if upn_claim is not None:
        is_authorized = domain in upn_claim
        roles = ["Default"]
    else:
        is_authorized =  spn in appid_claim
        roles = ["SPN"]

    logging.info(f"Authorized: {is_authorized}")
    logging.info(f"Roles: {roles}")
    logging.info(f"SPN: {spn}")
    logging.info(f"App ID: {appid_claim}")
    return {

            "isAuthorized": is_authorized,
            "roles": roles
    }
```

### What does this function do?

- This Authorizer user data function runs before a GraphQL request executes, reads identity claims (UPN, app ID) from the caller’s JSON Web Token (JWT) token, and logs request details.
- It authorizes users by checking if their email (UPN) belongs to a specific domain, and authorizes service principals by matching a known app ID.
- Based on the result, it returns isAuthorized. 

## Add a connection to the User data function

Before enabling the feature, you need to add a connection for a user data function type. 

1. Under **settings** , select **Manage connections and gateways**.
2. On the **Connections** tab, select **New**.
3. In the **New connection** page, select **Cloud**, provide a name for your connection and select **User Data Function** as the connection type. Use **OAUth** method and update the credentials to authenticate. You don’t need to check "Allow this connection to be utilized with either on-premises data gateways or VNet data gateways" when creating this connection.

## Enable the authorization feature

Enable the authorization feature once the function and the connection for this user data function type has been set up. You need write permissions to enable or disable this feature.

1.	Open the API for GraphQL item and select **Settings**. 
2.	Select **Authorization (Preview)** and enable the feature. 
3.	Provide the user data function item and the auth function you want to use. 


## Limitations and behaviors

| Category               | Details                                                     |
| ---------------------- | ----------------------------------------------------------- |
| Authentication         | Only OAuth is supported                                     |
| B2B support            | Not available for guest users due to connection limitations |
| Permissions            | Write required for config; Execute required for API calls   |
| Unsupported configs    | SPN with object identifier object identifier (OID) not supported |
| Caching                | Changes may take up to 15 minutes to apply                  |
| Region dependency      | UDF and GraphQL must be in same region                      |
| Private link           | Not supported with blocked public access                    |
| Authorization failures | Occur when isAuthorized = false or roles mismatch           |

## Next steps

- [Connect to an application](./connect-apps-api-graphql.md)
- [Develop in VS Code](./api-graphql-develop-vs-code)
