@echo off

REM Create the main folders
mkdir src\components\AddDiagnosticModal
mkdir src\components\Dashboard
mkdir src\components\DiagnosticTable
mkdir src\components\FusionTrendGraph
mkdir src\hooks
mkdir src\models
mkdir src\presenters
mkdir src\repositories
mkdir src\store

REM Create the files
type nul > src\components\AddDiagnosticModal\AddDiagnosticModal.tsx
type nul > src\components\AddDiagnosticModal\AddDiagnosticModal.module.scss
type nul > src\components\Dashboard\Dashboard.tsx
type nul > src\components\Dashboard\Dashboard.module.scss
type nul > src\components\DiagnosticTable\DiagnosticTable.tsx
type nul > src\components\DiagnosticTable\DiagnosticTable.module.scss
type nul > src\components\DiagnosticTable\TableHeader.tsx
type nul > src\components\DiagnosticTable\TableRow.tsx
type nul > src\components\FusionTrendGraph\FusionTrendGraph.tsx
type nul > src\components\FusionTrendGraph\FusionTrendGraph.module.scss
type nul > src\hooks\useRedux.ts
type nul > src\models\Diagnostic.ts
type nul > src\models\Insight.ts
type nul > src\presenters\InsightPresenter.ts
type nul > src\repositories\InsightRepository.ts
type nul > src\store\actions.ts
type nul > src\store\reducers.ts
type nul > src\store\store.ts

echo Project structure has been created successfully.
