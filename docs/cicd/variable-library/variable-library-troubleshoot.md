---
title: Troubleshoot Variable libraries
description: "[Article description]."
author: mberdugo
ms.author: monaberdugo
ms.service: fabric
ms.topic: troubleshooting-problem-resolution #Don't change.
ms.date: 02/16/2025

#customer intent: As a developer, I want to learn how to troubleshoot Variable libraries, so that I can manage my content lifecycle.

---

# Troubleshoot Variable libraries

This article describes common errors and issues that you might encounter when working with Variable libraries and provides solutions to help you resolve them.

## Error message: Value set not found

**Description of problem**: Selected active value set in the target stage is missing in the deployed Variable library.
**Cause**: If you removed or renamed the active value set in the source stage or in Git.  
**Solution**: Change the active value set in the target stage manually (through the UI) or using the Update API, or update from Git.

## Error message: Variable not found

**Description of problem**: I added a variable to the Variable library, but I can't find it in the data pipeline.
**Cause**: You might have forgotten to save the variable in the Variable library.  
**Solution**: Create the variable again and save select save.

## Active value set not changed

**Description of problem**: I added a variable to the Variable library, but I can't find it in the data pipeline.
**Cause**: You might have forgotten to save the variable in the Variable library.  
**Solution**: Create the variable again and save select save.

## Related content

- [Related article title](link.md)
- [Related article title](link.md)
- [Related article title](link.md)
