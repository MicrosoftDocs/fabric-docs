---
title: Service details and limitations 
description: Overview of the User data functions programming model for Python
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 03/31/2025
ms.search.form: Service limits
---


# Service details and limitations of Fabric User Data Functions

This article details the service details and current limitations of Fabric User Data Functions. 

## Capacity reporting
The usage of Fabric User Data Functions is reported in the Fabric Capacity Metrics application. The capacity reports account for the creation, publishing, execution, and storage of Fabric User Data Functions. To learn more about the meters reported in the Fabric Capacity Metrics app, visit [Fabric operations](../../enterprise/fabric-operations.md#fabric-user-data-functions).

## Limitations

The following are current limitations for Fabric User Data Functions (preview):

- **Regional limitations**: User Data Functions is only available in a subset of Fabric regions. For an updated list of regions where Fabric User Data Functions is available, see [Fabric region availability](../../admin/region-availability.md). If your Home Tenant is in an unsupported region, you can create a Capacity in a supported region to use User Data Functions. For more information, see [Manage your Fabric capacity](../../admin/capacity-settings.md).

- **Functions are editable by the owner only**: At this moment, the code in a User Data Functions item can only be modified and published by the user who is the owner of the User Data Functions Fabric item. For instructions on how to transfer ownership of Fabric items, see [Take ownership of Fabric items](../../fundamentals/item-ownership-take-over.md).

- **Reserved Python keywords in Fabric User Data Functions**: In addition to reserved keywords from the Python language, Fabric User Data Functions also uses the following keywords: `req`, `context` and `reqInvocationId`. Reserved keywords can't be used as parameter names or function names.

- **"Manage connections" only supports Fabric data sources**: The "Manage connections" feature only supports connecting to Fabric-native data sources at this moment. To learn more, visit [Connect to data sources](./connect-to-data-sources.md).

- **Service principals**: Using Fabric User Data Functions as a service principal to access other items and resources is not currently supported. For example, you cannot use Fabric User Data Functions as a managed identity or workspace identity.

## Service limits
The following list details the service limits for User Data Functions items. 

| Limit | Value | Description |
|-------|-------------|----|
| Request payload length | 4 MB | The maximum size of all request parameters combined. |
| Request execution timeout | 240 seconds | The maximum amount of time a function can run for. |
| Response size limit | 30 MB | The maximum size of the response's return value of a function. | 
| Log retention | 30 days | The number of days that historical invocation logs are retained for by default. | 
| Private library max size | 28.6 MB | The maximum size of a `.whl` file uploaded to the Library Management experience as a private library. | 

## Next steps
- [Create a new User Data Functions item from the Fabric portal](./create-user-data-functions-portal.md) or by using [the VS Code extension](./create-user-data-functions-vs-code.md).
- [Learn about User data functions programming model](./python-programming-model.md)
