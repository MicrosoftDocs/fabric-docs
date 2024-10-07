---
title: Fabric workload development kit backend to frontend communication (preview)
description: Learn about building the communication between the backend and the frontend for a Fabric extension.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how communication between backend and frontend is working so that I can create customized user experiences.
---

# Workload communication guide (preview)

This article describes how the communication between [Frontend](./extensibility-front-end.md) and [Backend](./extensibility-back-end.md) works and what needs to be taken into account.

## Frontend-Backend communication

Authentication between your Frontend and the backend happens over a secure and authenticated channel. To have a token available in your Backend that, you can use to communicate with other services, you can use the Fabric Frontend to pass the communication to the Backend.

## Error handling

To propagate any errors that occur in the workload backend to the workload frontend when working with control plane APIs (CRUD/Jobs except for `GetItemJobInstanceStateAsync`), the workload backend should return an error status code and the response body content should be a serialized JSON of the class `ErrorResponse` that is a part of the contracts in the workload backend.

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
