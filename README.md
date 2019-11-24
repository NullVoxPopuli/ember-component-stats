# ember-component-stats

View info about component usage in your app

```
npx ember-component-stats
```

## Install

Choose your favorite
```
volta install ember-component-stats
yarn add --global ember-component-stats
npm install --global ember-component-stats
```

## Usage

```
cd /to/your/app/repo

ember-component-stats

# or

ember-component-stats --path to/app/dir
# (app/ is default)
```



Note:
This currently only works on apps that use:
- pods for components
- nested co-located components

See src/gather.ts for potentially adding support for:
- classic structure
- non-nested co-located components

PRs welcome ;)
