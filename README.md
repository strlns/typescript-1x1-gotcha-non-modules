# What is this?

A silly repository to remind myself of expected TypeScript behavior which confused me for a moment.

## The "problem"

TypeScript never complains about using code from non-module files in other files (module or not), when both are inside `"include"` in tsconfig.json.

TS language server will happily suggest functions, classes, methods etc. and provide intellisense without the functions / classes / literals being in scope, **as long as they are part of a non-module**.

`tsc` won't fail either, because as far at is concerned, the referenced objects / literals are part of a **non-module**, and included by the given `"includes"` configuration.

## Why is this expected behavior?

This totally makes sense when considering that the output files could, for example, be put into some shared scope by e.g. multiple script tags in the correct order.

Non-modules are not part of any dependency graph, so everything they declare is considered global, and the order of these declarations in the output is undefined.

**Putting everything inside `src` into `"includes"` just tells TypeScript to compile all these files.**

**Imports for declarations in non-module files will not be required by the compiler.**

Import/export statements for actual modules will not be touched by `tsc` as **TypeScript is not a bundler**.

A module can depend on a global without any additional warning or
type declaration, unless one of the solutions below is applied.

#  Solutions

Either:

- Use `"isolatedModules": true`, which will prevent TypeScript from compiling
  non-modules at all.

  or

- Use `"files"` with specific entry points instead of an overly broad `"include"`.

# Why did this confuse me?

I forgot to export a class in a project with an overly broad `"include"` configuration in `tsconfig.json`.
and without `"isolatedModules"`.

This config was copied over from some other scaffolded project.

Then I wondered why there's a runtime error but no TS error. 🤦‍♂️
