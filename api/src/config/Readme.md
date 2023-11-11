## Keys Introduction

We are creating separate environment variables and keys in different files and 
importing them in a single keys.ts file. The reason why we do that is so that
we only have to import one single file called keys.ts in our whole app and
not care if we are in production or development

## Keys Setup

**dev keys** should be located in dev.ts and 
**prod keys** are located in prod.ts

IF dev.ts ARE NON EXISTANT SUCH A FILE MUST BE CREATED

Note that you dont have to add any keys in prod.ts only create a file 
and export some empty object 

Once you've created your files and loaded all the necessary keys in dev.ts that's it

## Keys Important!!!

Whenever you want to import keys import keys.ts do not import any other file

**DO NOT CHANGE ANYTHING IN ROOT .gitignore FILE REGARDING THE KEYS**