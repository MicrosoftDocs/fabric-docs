---
title: Fabric workload communication (preview)
description: Learn how to create communication between the backend and the frontend for a Microsoft Fabric extension.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how communication between a Microsoft Fabric backend and frontend works so that I can create customized user experiences.
---

# Workload communication (preview)

This article describes how the communication between a Microsoft Fabric [frontend](./extensibility-front-end.md) and [backend](./extensibility-back-end.md) works and key considerations.

## Frontend-to-backend communication

Authentication between your frontend and the backend happens over a secure and authenticated channel. To have a token available in your backend that you can use to communicate with other services, you can use the Fabric frontend to pass the communication to the backend.

## Error handling

To propagate any errors that occur in the workload backend to the workload frontend when you work with control plane APIs (CRUD operations and jobs, except for `GetItemJobInstanceStateAsync`), the workload backend should return an error status code. The response body content should be a serialized JSON file of the class `ErrorResponse` that is a part of the contracts in the workload backend.

Here's an example:

```csharp
    var errorResponse = new ErrorResponse
    {
        ErrorCode = ErrorCode,
        Message = ErrorMessage,
        MessageParameters = _messageParameters.Any() ? _messageParameters : null,
        Source = ErrorSource,
        IsPermanent = IsPermanent,
        MoreDetails = Details,
    };
    
    
    return new ContentResult
    {
        StatusCode = (int)HttpStatusCode,
        Content = JsonSerializer.Serialize(errorResponse),
        ContentType = MediaTypeNames.Application.Json,
    };
```
