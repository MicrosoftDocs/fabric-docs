---
title: Service details and limitations 
description: Overview of service properties and limitations
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Service limits
---


# Service details and limitations of Fabric User Data Functions

This article details the service details and current limitations of Fabric User Data Functions. 

## Capacity reporting
The usage of Fabric User Data Functions is reported in the Fabric Capacity Metrics application. The capacity reports account for the creation, publishing, execution, and storage of Fabric User Data Functions. To learn more about the meters reported in the Fabric Capacity Metrics app, visit [Fabric operations](../../enterprise/fabric-operations.md#fabric-user-data-functions).

## Network security requirements
In order for Fabric User Data Functions to work correctly, your network must allow "multipart/form-data" requests and file uploads to Fabric endpoints. If this requirement is not in place, the following requests may result in a Cross-origin Resource Sharing (CORS) error: publishing functions and uploading custom libraries.

## Limitations

The following are current limitations for Fabric User Data Functions:

- **Functions are editable by the owner only**: At this moment, only the owner of the User Data Functions item can modify and publish the functions code. For instructions on how to transfer ownership of Fabric items, see [Take ownership of Fabric items](../../fundamentals/item-ownership-take-over.md).

- **Functions publish cooldown period**: After publishing your functions, you need to wait at least 2 minutes before publishing again. This cooldown period is applicable when publishing from the Functions in-browser portal, the User Data Functions Visual Studio Code extension, the GIT import action or by using deployment pipelines.

- **"Manage connections" only supports Fabric data sources**: The "Manage connections" feature only supports connecting to Fabric-native data sources at this moment. To learn more, visit [Connect to data sources](./connect-to-data-sources.md).

- **"Manage connections" cannot connect to resources that have special characters in their names**: Fabric resources, such as databases, that have special characters in their names, such as curly braces or non-ASCII characters, are not compatible with the Manage Connections experience in User Data Functions. To learn more, visit [Connect to data sources](./connect-to-data-sources.md).

- **Regional limitations for User Data Functions**: User Data Functions is not available in a subset of Fabric regions. For an updated list of regions where Fabric User Data Functions is available, see [Fabric region availability](../../admin/region-availability.md). If your Home Tenant is in an unsupported region, you can create a Capacity in a supported region to use User Data Functions. For more information, see [Manage your Fabric capacity](../../admin/capacity-settings.md).

- **Regional limitations for Test feature in Develop mode**: The test functionality in Develop mode is not available in the following Fabric regions: Brazil South, Israel Central, and Mexico Central. You can still test your functions by publishing them and running them, or by using the [VS Code extension](./create-user-data-functions-vs-code.md) to test them locally.

- **Service principal support**: Accessing Fabric items or data sources using a Service Principal is not currently supported. For example, you cannot use Fabric User Data Functions as a managed identity or workspace identity.

## Service limits
The following list details the service limits for User Data Functions items. 

| Limit | Value | Description |
|-------|-------------|----|
| Request payload length | 4 MB | The maximum size of all request parameters combined. |
| Request execution timeout | 240 seconds | The maximum amount of time a function can run for. |
| Response size limit | 30 MB | The maximum size of the response's return value of a function. | 
| Log retention | 30 days | The number of days that historical invocation logs are retained for by default. | 
| Private library max size | 28.6 MB | The maximum size of a `.whl` file uploaded to the Library Management experience as a private library. | 
| Test in portal timeout | 15 minutes | The amount of time the test session is active for until a new request is processed. The session is extended by 15 minutes when a new request is received within the timeout period. |
| Python version (Run capability) | 3.11 | The Python version used for published functions in Run only mode. | 
| Python version (Test capability) | 3.12 | The Python version used for the [test capability](./test-user-data-functions.md#test-your-functions-in-develop-mode) in Develop mode. |

## Next steps
- [Create a new User Data Functions item from the Fabric portal](./create-user-data-functions-portal.md) or by using [the VS Code extension](./create-user-data-functions-vs-code.md).
- [Learn about User data functions programming model](./python-programming-model.md)
