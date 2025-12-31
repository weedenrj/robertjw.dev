---
description: List all available skills
allowed-tools: Read, Glob
---

List all available skills in the project.

## Instructions

1. Find all skill directories in `.claude/skills/`
2. For each skill, read the `SKILL.md` file
3. Extract the `name` and `description` from the YAML frontmatter
4. Present each skill in this format:

```
**[Skill Name](file:///absolute/path/to/.claude/skills/skill-name/SKILL.md)**
Description from the frontmatter

---
```

5. Keep output concise and scannable
6. Use absolute file paths for hyperlinks
7. Skip duplicates (only show `.claude/skills/` version, not `.cursor/skills/`)

## Output Format

Present a clean list with clickable links to each skill's SKILL.md file.
