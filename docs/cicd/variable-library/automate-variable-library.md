---
title: Automate Variable library  APIs
description: Learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: concept-article
ms.date: 02/11/2025
#customer intent: As a developer, I want to learn how to automate Variable libraries in the Microsoft Fabric Application lifecycle management (ALM) tool, by using APIs, so that I can manage my content lifecycle.
---

# Automate Variable libraries by using APIs and Azure DevOps (preview)

You can use the [Microsoft Fabric REST APIs](/rest/api/fabric/articles/using-fabric-apis) to fully automate the Variable library management.

If you're using the APIs as part of your lifecycle management, permissions for item reference are checked during Git Update and deployment pipeline deployment.

The following table lists the APIs available for the variable library in Fabric.

| Scenario | Request | Action                          | URL  |
|----------|---------|---------------------------------|------|
| 1        | Create  | Create empty item               | POST<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/6b8e97f4-d26a-42cb-9083-55b70c599abf/VariableLibraries><br><br>Body:<br>{ "displayName": "VL_5", "description": "A VL description" }<br>** Important!! add in request header: Content-Type: application/json |
| 2        | Get     | Get item information            | GET<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/8789dc83-9968-4896-a037-dc63ad482d46/VariableLibraries/d01c3d05-48fe-473f-85ff-a13c5965836f> |
| 3        | Update  | Rename item                     | PATCH<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/6b8e97f4-d26a-42cb-9083-55b70c599abf/VariableLibraries/c1a1fb50-bd9f-465c-b0dd-cfc6d3551874><br><br>Body:<br><br>{ "displayName"<br>: "V5_New_Name", "<br>description"<br>: "A new description for VL." } |
| 4        | Delete  | Delete                          | DELETE<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/6b8e97f4-d26a-42cb-9083-55b70c599abf/VariableLibraries/8d53aea2-59c8-42ed-bc93-462c8c187922> |
| 5        | List items | Get variables list in workspace      | GET<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/05a748f5-3b62-48e8-8d54-44fee6a588ca/VariableLibraries> |
| 6        | Get item definition | Export              | POST<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/05a748f5-3b62-48e8-8d54-44fee6a588ca/VariableLibraries/285977f2-d3a2-40db-928a-b320b8539e58/getDefinition<br><br><br>DAILY:<br><https://dailyapi.fabric.microsoft.com/v1/workspaces/7569a44c-8d5f-4e62-9357-e88239bce4d5/items/9a2d616c-a2eb-4539-8e70-9967b6c2c0a0/getDefinition> |
| 7        | Location | Status Failed                  | GET<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/operations/b96cc629-e948-4cd1-b755-8f4c0a4fd9d6> (LOCATION) |
| 8        | Result   | Get result                     | GET (RESULT- location header)<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/operations/b96cc629-e948-4cd1-b755-8f4c0a4fd9d6/result> |
| 9        |          | Base64       | Payload- send TextWizard<br>delete payload=<br><br>Copy the definitions part for Import |
| 10       | Update Definition | Import                | POST<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/05a748f5-3b62-48e8-8d54-44fee6a588ca/VariableLibraries/285977f2-d3a2-40db-928a-b320b8539e58/updateDefinition><br><br>Request (from export results)<br>:::image type="content" source="./media/import.png" alt-text="Import code."::: |
| 11       |          | Import with change | Take the payload from 9 and change value<br>copy payload, and paste in import request |
| 12       | Get + active value set |                  | GET<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/8789dc83-9968-4896-a037-dc63ad482d46/VariableLibraries/d01c3d05-48fe-473f-85ff-a13c5965836f> |
| 13       | Set value set | Set/change active value set | PATCH<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/05a748f5-3b62-48e8-8d54-44fee6a588ca/VariableLibraries/ac4cba21-2252-4a8c-8d20-f2ac9bc96419><br><br>{ <br>"displayName": "V5_New_Name",<br> "description": "A new description for VL.",<br>"properties": {<br>"activeValueSetName": "set2" <br>} <br>}<br><br>For the default value set:<br><br>{<br>"displayName": "V5_New_Name",<br>"description": "A new description for VL.", <br>"properties": {<br>"activeValueSetName": null<br>}<br>} |
| 14       | Create with definition | create Variable Library with content (definition/ payloads) | POST<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/878c3e0c-b7d8-4222-9b45-f9d7d7010f64/VariableLibraries> |
| 15       |          | Test conflict name (already exist) | POST<br><https://biazure-int-edog-redirect.analysis-df.windows.net/v1/workspaces/05a748f5-3b62-48e8-8d54-44fee6a588ca/VariableLibraries><br><br>{<br>"definition": { <br>"parts": [ <br>{ <br>"path": "variables.json", <br>"payload": "XYZ", <br>"payloadType": "InlineBase64" },<br>{ <br>"path": "valueSets/ValueSet2.json",<br>"payload": "XYZ", <br>"payloadType": "InlineBase64" <br>}, <br>{ <br>"path": ".platform", <br>"payload": "XYZ", <br>"payloadType": "InlineBase64" <br>} <br>] <br>} <br>} |

The Variable library item REST APIs support service principle.

## Considerations and limitations

Item names and variable names are *not* case sensitive. Therefore, when a consumer item requests a variable’s value resolution, we return the value even if the case doesn't match.
