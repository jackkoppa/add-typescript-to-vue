# add-typescript-to-vue

[![Build Status](https://travis-ci.org/jackkoppa/add-typescript-to-vue.svg?branch=master)](https://travis-ci.org/jackkoppa/add-typescript-to-vue)

## Setup

To run the project locally, clone the repo, install dependencies, and then serve the app
```
git clone https://github.com/jackkoppa/add-typescript-to-vue.git
cd add-typescript-to-vue
npm install
npm run serve
```

And you're all set! The project should now be running at http://localhost:8080/

**Note:** if you'd rather not use Git, that's fine too. Here's where you can download the current state of the project as a ZIP file: 

https://github.com/jackkoppa/add-typescript-to-vue/archive/master.zip. 

Extract that ZIP, and from the directory, run the `install` and `serve` commands in your terminal.

## Adding TypeScript

We'll do this part together, at the [Vue DC Meetup on 12.12.18](https://www.meetup.com/Vue-DC/events/256706623/) 

The first step is adding TypeScript through the Vue CLI:

```shell
npm install @vue/cli -g
vue add @vue/typescript
```

Then try it out
```shell
npm run build 
```

There will be errors! That's what we'll work through; feel free to start trying them out yourself.

## Editor configuration & Linting

On a team project, it's very important to get linting & editor configurations consistent for all developers. For an individual project, it's much less important. 

Because linting & editor configuration *can* be an issue for teams, this repo has been set up in a way that points to that. From the standard Vue "Hello, World" app, the following changes have been made:

1. Custom rules added to `package.json > eslintConfig > rules`; some of these, like single quotes over double quotes, are specifically *not* the Vue default
2. Included workspace settings for VS Code, that helps make auto-formatting work, in `.vscode > settings.json`
3. Included recommended extensions for VS Code, so that a user is prompted to consider using them

Note that, because Vue comes with linting built-in, you can always accomplish the same things formatting extensions do by running 

```shell
npm run lint
```

If you'd like the default Vue editing experience (perhaps, for example, you don't want your code to auto-format on save. Or you want spaces rather than tabs), you can do that easily:
1. Remove all rules from `package.json > eslintConfig > rules`
2. Remove all content from `.vscode > settings.json`
3. Uninstall any VS Code extensions that you want to
4. Run the following, to revert back to Vue's original linting recommendations:

```shell
npm run lint
```