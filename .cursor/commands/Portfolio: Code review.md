---
description: Review code changes for bugs and side effects
argument-hint: [linear-id|scope] [scope]
allowed-tools: Read, Glob, Grep, Task, Bash
---

Find "fix before ship" bugs - real bugs that will break existing features.
**IGNORE:** Style, imports, "why are these files changed together" (drive-by fixes are normal).
**Scope:** Parse $ARGUMENTS - supports issue ID (if applicable), `unstaged`, `staged`, `HEAD~N`, `main..HEAD`, branch names, file/directory paths.

## STEP 0: ISSUE CONTEXT (if provided)
If an issue ID is provided, fetch context from your issue tracking system (e.g., Linear, GitHub Issues).
Parse title, description, acceptance criteria - this tells you what the code is supposed to accomplish.

## STEP 1: UNDERSTAND INTENT
- Remote branch: `git fetch origin <branch>` → `git diff origin/main...origin/<branch>`
- Local: `git status --porcelain`, `git diff --cached`, `git log --oneline -10`

Read commit messages to understand the "why" - you can't assess correctness without knowing intent.

## STEP 2: ASSESS RISK
**HIGH RISK** → deep review: Core services (`*Service.ts`, `*Domain.ts`), models, business logic, money/booking/scheduling
**LOW RISK** → lighter review: New files that can't break existing systems, pure UI additions

File names and paths are self-documenting - use them to assess risk before diving in.

## STEP 3: INVESTIGATE
For each changed function/type/component:

1. **GREP USAGES**
   Search codebase for actual call sites, not just imports.
   Ask: "Who depends on this? What breaks if behavior changes?"

2. **REASON ABOUT EACH USAGE**
   Does this usage still work? Need updating? Already updated? What edge cases might this expose?

3. **TRACE DATA FLOW**
   Read related models and data structures. Follow: calculation → storage → display.
   Ask: "Where does this data come from? Where does it go?"

4. **VERIFY CORRECTNESS**
   - Edge cases: null/undefined/empty, missing optionals, default values
   - Business rules: Are they preserved? Check model definitions.
   - Data handling: Money, dates, timezones correct? Breaking changes?

5. **CROSS-CHECK CONSISTENCY**
   Grep for similar patterns elsewhere. Ask: "Is the same logic applied consistently?"
   Flag inconsistencies: "File A does X but File B does Y for the same concept"

6. **SCENARIO REASONING**
   Create a mental table of scenarios with concrete values.
   For each: What inputs flow through? What output is expected?
   Walk through with real numbers (e.g., "3 nights → offeringCount=3 → duration = 1440 + 2*1440 = 4320 mins")
   Check boundary cases: minimum, maximum, zero, one, empty

7. **TRACE RENDER PATH** (UI changes)
   Follow: props → local calculations → JSX render.
   Which conditional branch renders when? Verify calculations used in correct branches.

8. **MATHEMATICAL REASONING** (calculations)
   Write out the formula. Substitute real values and verify makes business sense.
   Cross-reference with docs if available. Check: off-by-one, division by zero, overflow

Follow threads wherever they lead. **Core principle:** Grep changed functions, reason about every usage, verify with concrete numbers and scenario-based reasoning.

## STEP 4: REPORT
```
## 📋 Context
What this code accomplishes (1-2 sentences)

## ⚡ Risk Level
High/Medium/Low

## 🔍 Investigation
- Functions grepped and usages examined
- Models and business logic checked
- Integration points verified

## Findings
### 🔴 Fix Before Ship
- **[file:line]** - Issue description and impact

### 🟡 Needs Verification
- **[file:line]** - Uncertain issue requiring validation

### ✅ Looking Good
- Positive observations

## Side Effects Summary
| Issue | Severity | Status | Blocking? |
|-------|----------|--------|-----------|
| Brief description | Low/Med/High | Needs fix / Acceptable / Minor quirk | Yes/No |
```

If nothing wrong, say so with ✅ and empty Side Effects Summary table.
