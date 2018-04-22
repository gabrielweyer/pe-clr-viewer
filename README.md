# Portable Executable CLR Viewer

I was reading through the second chapter of [Advanced .NET Debugging][advanced-dotnet-debugging-book] and didn't manage to find the entry point of an executable. I wrote this web application so that `a)` I could understand more about the [PE format][pe-format] and `b)` I wouldn't have to repeat the same basic math each time I wanted to inspect a `.NET` `DLL`.

> `Portable Executable CLR Viewer` is a hex viewer for `.NET` binaries.

At the moment it's fairly limited and only highlights:

- The bitness (`x86` vs `x64`)
- The entry point `Relative Virtual Address` (search for `RVA` in the [PE format][pe-format])

If you feel adventurous you can try the [hosted version][pe-clr-viewer].

**Fair warning**: this is probably the ugliest web app in the world :joy_cat:.

This is very much a **work in progress**. If I manage to motivate myself I'll work on the cards listed in this [public Trello board][trello-board].

## Running locally

If you would like to inspect a proprietary binary I advise you to run locally (the app is self-contained). You'll need:

- [Node.js][node-js]
- [Yarn][yarn]

Then run the following commands one by one:

```shell
yarn install
yarn start
```

## CI/CD

Each push to `master` triggers a build in `VSTS` and a deployment to `Azure Blob storage`. `VSTS` does not support anonymous browsing but the build pipeline is available as [YAML](.vsts-ci.yml).

[advanced-dotnet-debugging-book]: https://www.goodreads.com/book/show/7306509-advanced-net-debugging
[pe-format]: https://msdn.microsoft.com/library/windows/desktop/ms680547(v=vs.85).aspx
[pe-clr-viewer]: https://peclrviewer.azurewebsites.net/
[trello-board]: https://trello.com/b/7b21MQqD/pe-clr-viewer
[node-js]: https://nodejs.org/en/download/
[yarn]: https://yarnpkg.com/lang/en/docs/install/
