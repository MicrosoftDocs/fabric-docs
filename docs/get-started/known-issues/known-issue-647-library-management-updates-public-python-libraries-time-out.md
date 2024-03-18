---
title: Known issue - Library management updates with public python libraries time-out
description: A known issue is posted where library management updates with public python libraries time-out.
author: mihart
ms.author: mihart
ms.topic: troubleshooting  
ms.date: 03/14/2024
ms.custom: known-issue-647
---

# Known issue - Library management updates with public python libraries time-out

If you update your environment with python libraries from the conda channel or provide an env.yml file with libraries from conda channel, the environment publish hangs and eventually times out.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

You see the environment publish hang and time out if you have one of the following scenarios:

- public python libraries specified with feed/source selected as conda
- libraries specified under 'dependencies' in an env.yml file

## Solutions and workarounds

To work around the issue, you can install the same library using the PyPI feed or move the library under the pip section in the env.yml file.
If you're using a Notebook, to work around the issue, you can install the same library from conda using and [in-line session install, example %conda install](/fabric/data-engineering/library-management#in-line-installation).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
