DEV MODE:
npm run build:live

PROD MODE:
npm run build

React Extension

folder structure explanation (some folders are not nested properly, and some are deleted, this is just for "code review", extension is not startable):

assets/icons - all svgs are wrapped inside component that returns it

assets/img and assets/style - ignoreable

core - each "feature" that communicate with backend has 2 layers, service layer / repository layer + query "layer"

database - ignorable

dist - ignorable

helper - (some dummy functions, that doesnt do much, very few lines of code)

internationalization - i18 setup

locales - i18 translations json

public - ignorable

realtime - supabase listeting for changes in specific table then do something after it triggers (currently for notifications feature)

test-utils - vitest setup

ui/components - components (file structure could be better...)

ui/ features - Dashboard.tsx and SignIn.tsx are the "finished features"

icons - ignorable

utils - (a more complicated than helper functions, maybe when it depends on another helper function or more, or its just a more complicated)
