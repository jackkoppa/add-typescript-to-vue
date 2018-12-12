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
