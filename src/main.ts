import { anotherFunc } from "./ExportedFunction/exportedFunction";

//TypeScript never complains about this, unless "isolatedModules" is enabled
//or the file is removed from "include" in tsconfig.
const foobar = new Foo("bar");
//VSCode / TS language server even suggests methods!
foobar.log();

const notDetectedAsError = aFunc();

//This would be detected and throw an Error:

//const detectedAsError = bFunc();

//regular import to make this a module.
anotherFunc();
