---
title: Use the Starter-Kit to get up and running
description: How you can get started fast with the Starter-Kit repository.
author: gsaurer
ms.author: billmath
ms.topic: quickstart
ms.custom:
ms.date: 12/15/2025
---

# Use the Starter-Kit to get up and running

Use this quickstart to run the HelloWorld workload and light it up in Fabric. It’s based on the best practices and streamlines the steps to get you coding quickly.

> [!IMPORTANT]
> Ensure you have access to a Fabric workspace and your tenant allows developer features. You enable Fabric Developer Mode before testing.

## 1. Clone the repo

Start by forking the [Starter-Kit Repo](https://aka.ms/fabric-extensibility-starter-kit) repository and then clone it to your local machine.

```pwsh
git clone https://github.com/<your-account>/fabric-extensibility-toolkit.git
cd fabric-extensibility-toolkit
```

## 2. Run the setup script

The setup script automates most configuration (app registration, defaults, etc.).

```pwsh
# From the repo root
pwsh ./scripts/Setup/Setup.ps1 -WorkloadName "Org.MyWorkload"
```

- WorkloadName must follow the pattern Organization.WorkloadName. For development, use `Org.[YourWorkloadName]`.
- If reusing an existing Microsoft Entra app, ensure SPA redirect URIs are configured as described in the repositories manual setup guide.
- On macOS/Linux, use `pwsh` to run scripts.

## 3. Start the development environment

Run the dev server (front end + APIs) and register your local instance with Fabric via DevGateway.

```pwsh
# Terminal 1: start local dev server
pwsh ./scripts/Run/StartDevServer.ps1

# Terminal 2: start DevGateway to register your local instance with Fabric
pwsh ./scripts/Run/StartDevGateway.ps1
```

## 4. Enable developer features in Fabric

In the Fabric portal:

- In Admin Portal, ensure tenant developer settings required by the toolkit are enabled.
- In Developer Settings, turn on Fabric Developer Mode for your account.

## 5. Test the HelloWorld item

You can access the workload from the Workload Hub (look for your workload name) or navigate directly. Then create a Hello World item.

Steps:

1. Open Fabric Workload Hub, locate your workload (for example, `Org.MyWorkload`).
2. Select the Hello World item type and choose your development workspace.
3. The editor opens; confirm the item works as expected.

## 6. Start coding

Change the HelloWorld item or create a new one:

- Update the editor: `Workload/app/items/HelloWorldItem/HelloWorldItemEditor.tsx`
- Or scaffold a new item with the script: `./scripts/Setup/CreateNewItem.ps1`

## Troubleshooting

- PowerShell policy: Temporarily relax execution policy if scripts won’t start.
- Latest PowerShell: Install/update PowerShell if you see setup errors.
- Unblock scripts: If prompted, allow running `.ps1` files.
- Existing Microsoft Entra app: Configure SPA redirect URIs per the manual guide in the repository.
- macOS/Linux: Use `pwsh` to execute the scripts.

## Related links

- [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit)
- Toolkit docs: [Build your workload](build-your-workload.md), [Workload manifest](manifest-workload.md), [Publish your workload](publish-workload-flow.md)
