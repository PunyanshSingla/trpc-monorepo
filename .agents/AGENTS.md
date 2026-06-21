# AGENTS.md

## Project Overview

CodeToShip AI is an AI-assisted product delivery platform that helps teams move features from idea to production through a structured workflow.

## IMPORTANT : I AM BUILDING THIS PRODUCT FOR HACKATHON WHOSE DESCRIPTION LIES AT ./HACKATHON_ABOUT.md , KEEP ONE THING MORE IN MIND THAT CODE QUALITY SHOULD BE EXCELLENT AND CODE SHOULD BE MODULAR , MAINTAINABLE , I CAN'T COMPROMISE WITH CODE QUALITY AT ANY COST 

Workflow:

Request → Product Thinking → PRD → Tasks → Implementation → Review → Fixes → Approval → Release

This repository is a Turborepo monorepo.

---

# Monorepo Structure

apps/
├── web/
├── api/

packages/
├── auth/
├── database/
├── services/
├── ui/
├── shared/
├── ai/

---

# Package Responsibilities

## apps/web

Contains:

* UI
* Pages
* App Router
* Server Components
* Client Components
* Route Handlers

Must NOT contain:

* Business logic
* Direct database queries
* Payment logic
* AI orchestration logic

Use services instead.

---

## apps/api

Contains:

* tRPC routers
* Express routes
* Middleware
* API composition

Must NOT contain:

* Business logic
* Drizzle queries

Use services.

---

## packages/database

Contains:

* Drizzle schema
* Drizzle client
* Database helpers

Only this package should directly access Drizzle.

Example:

```ts
import { db } from "@repo/db";
```

---

## packages/auth

Contains:

* Better Auth configuration
* Session helpers
* Role definitions
* Permission definitions
* Auth middleware

Example:

```ts
import { auth } from "@repo/auth";
```

Do not place business logic here.

---

## packages/services

Contains application business logic.

Examples:

* Create Project
* Generate PRD
* Create Tasks
* Assign Reviewers
* Publish Release
* Billing Operations
* User Onboarding

Services may use:

* db
* auth
* ai

Services must never depend on UI.

---

## packages/ai

Contains:

* AI providers
* Prompt templates
* Tool definitions
* Agent workflows
* Embedding logic

Do not call AI providers directly from pages.

Use this package.

---

## packages/ui

Reusable UI components only.

No business logic.

---

## packages/shared

Contains:

* Types
* Constants
* Enums
* Validation schemas
* Utility functions

---

# Architecture Rules

## Rule 1

Pages must call services.

Bad:

web → Drizzle

Good:

web → services → db

---

## Rule 2

API routes must call services.

Bad:

api → Drizzle

Good:

api → services → db

---

## Rule 3

Business logic belongs in services.

Never place business logic inside:

* Pages
* Components
* Route Handlers
* tRPC routers

---

## Rule 4

Drizzle queries belong in db or services.

Never place raw Drizzle queries in UI code.

---

## Rule 5

AI provider calls belong in ai package.

Bad:

page.tsx → OpenAI

Good:

page.tsx → service → ai

---

## Rule 6

Authentication configuration belongs in auth package.

Business onboarding logic belongs in services.

Example:

Signup:

* Better Auth creates user
* services/auth/onboard-user creates workspace

---

# Code Standards

* TypeScript strict mode
* No any
* Prefer server components
* Validate inputs using Zod
* Reuse existing services before creating new ones
* Keep files focused and small
* Prefer composition over duplication

---

# Database Rules

* Use Drizzle only
* All schema changes require migrations
* Never bypass Drizzle
* Use transactions for multi-step writes

---

# AI Agent Instructions

Before creating new files:

1. Search for existing implementation
2. Reuse existing service if possible
3. Avoid duplicate business logic
4. Follow package boundaries
5. Preserve architecture

When uncertain:

Choose consistency with existing architecture over introducing new patterns.

The goal is long-term maintainability, not shortest implementation.
