---
title: Service details and limitations 
description: Overview of service properties and limitations
ms.reviewer: luisbosquez
ms.topic: overview
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Service limits
---


# Service details and limitations of Fabric user data functions

This article describes the service details and current limitations of user data functions in Microsoft Fabric.

## Capacity reporting
The Microsoft Fabric Capacity Metrics application reports the usage of Fabric user data functions. The capacity reports account for the creation, publishing, execution, and storage of Fabric user data functions. To learn more about the meters reported in the Microsoft Fabric Capacity Metrics app, see [Fabric operations](../../enterprise/fabric-operations.md#fabric-user-data-functions).

## Network security requirements
For Fabric user data functions to work correctly, your network must allow `multipart/form-data` requests and file uploads to Fabric endpoints. If you don't allow these requests, the following requests might result in a Cross-origin Resource Sharing (CORS) error: publishing functions and uploading custom libraries.

## Limitations

The following limitations currently apply to Fabric user data functions:

- **Only the owner can edit functions**: Currently, only the owner of the user data functions item can modify and publish the functions code. For instructions on how to transfer ownership of Fabric items, see [Take ownership of Fabric items](../../fundamentals/item-ownership-take-over.md).

- **Functions publish cooldown period**: After publishing your functions, you need to wait at least two minutes before publishing again. This cooldown period applies when publishing from the Functions in-browser portal, the user data functions Visual Studio Code extension, the GIT import action, or by using deployment pipelines.

- **"Manage connections" only supports Fabric data sources**: The "Manage connections" feature only supports connecting to Fabric-native data sources at this moment. To learn more, visit [Connect to data sources](./connect-to-data-sources.md).

- **"Manage connections" can't connect to resources that have special characters in their names**: Fabric resources, such as databases, that have special characters in their names, such as curly braces or non-ASCII characters, aren't compatible with the Manage Connections experience in user data functions. To learn more, see [Connect to data sources](./connect-to-data-sources.md).

- **Regional limitations for user data functions**: User data functions aren't available in a subset of Fabric regions. For an updated list of regions where Fabric user data functions are available, see [Fabric region availability](../../admin/region-availability.md). If your Home Tenant is in an unsupported region, you can create a Capacity in a supported region to use user data functions. For more information, see [Manage your Fabric capacity](../../admin/capacity-settings.md).

- **Regional limitations for Test feature in Develop mode**: The test functionality in Develop mode is not available in the following Fabric regions: Brazil South, Israel Central, and Mexico Central. You can still test your functions by publishing them and running them, or by using the [VS Code extension](./create-user-data-functions-vs-code.md) to test them locally.

- **Service principal support**: Accessing Fabric items or data sources by using a service principal isn't currently supported through connections managed by UDF. For example, Fabric user data functions can't use managed identity or workspace identity to connect to UDF supported connections.

## Service limits
The following list details the service limits for user data functions items.

| Limit | Value | Description |
|-------|-------------|----|
| Request payload length | 4 MB | The maximum size of all request parameters combined. |
| Request execution timeout | 240 seconds | The maximum amount of time a function can run for. |
| Public function endpoint invocation timeout | 100 seconds | The maximum amount of time a function can run for when invoked through a public function endpoint. |
| Response size limit | 30 MB | The maximum size of the response's return value of a function. | 
| Log retention | 30 days | The number of days that historical invocation logs are retained for by default. | 
| Private library max size | 28.6 MB | The maximum size of a `.whl` file uploaded to the Library Management experience as a private library. | 
| Test in portal timeout | 15 minutes | The amount of time the test session is active for until a new request is processed. The session is extended by 15 minutes when a new request is received within the timeout period. |
| Python version (Run capability) | 3.11 | The Python version used for published functions in Run only mode. | 
| Python version (Test capability) | 3.12 | The Python version used for the [test capability](./test-user-data-functions.md#test-your-functions-in-develop-mode) in Develop mode. |

## Next steps
- [Create a new user data functions item from the Fabric portal](./create-user-data-functions-portal.md) or by using [the VS Code extension](./create-user-data-functions-vs-code.md).
- [Learn about User data functions programming model](./python-programming-model.md)

