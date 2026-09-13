---
title: progressBar
layout: default
---

# `progressBar`

> **Classe :** `ProgressBar`

## Classe : `ProgressBar`

Class to create a text progress bar with throttling

### Constructeur `new ProgressBar(total, size = 20, refreshRate = 1000)`

**Paramètres :**

| Paramètre | Type | Description |
| :-------- | :--- | :---------- |
| `total` | <span class="badge badge-type">number</span> |  |
| `size` | <span class="badge badge-type">number</span> |  |
| `refreshRate` | <span class="badge badge-type">number</span> | - Refresh rate in ms |

### Méthode `next()`

Updates the progress and returns the bar string if it should be displayed

**Retour :** <span class="badge badge-type">string|null</span> - 

