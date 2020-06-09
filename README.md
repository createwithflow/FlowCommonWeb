# Common Files for Web
**When you export a Flow project to HTML, React, or anything Web-related, Flow includes a set of helper classes and extensions that help manage and control your animations. This page provides and overview and a link to each of these files.**

A major goal behind our efforts here at Flow is to produce the cleanest code possible. For any platform, this means conforming to industry standards. For Web, in particular, it means staying away from 3rd party libraries and adopting the future of natively supported cross-browser animations - a.k.a the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (WAAPI).

> Flow's React exports also use these files.

## Why WAAPI?
There are a lot of reasons for adopting WAAPI. Primarily, it is on-track to being the only cross-browser API and even though portions of the API aren't fully supported by every browser, there is a polyfill that covers 99.9% of the gaps. Also, WAAPI is indcredibly performant. 

## Overview
Working with WAAPI can be difficult, so to make things as clean as possible, Flow requires a few light weight classes for organizing and automating the construction of native web-animations.

Within FlowCommon - Web are the following classes:

* Player – a class for controlling playback of a Timeline.

As Flow matures and new exports are added, this list will continue to grow.

## Installation
There are a few easy ways to include these files in your site.

### CDN
Use our cdn to link a minified version of FlowCommon-Web. 

Include the following link in your `<head>`:

```
https://createwithflow-flowcommonweb.s3-us-west-2.amazonaws.com/1.8.3/flowCommonWeb.min.js
```

### Minified FlowCommon
Simply add include our single file into your site, and link it in the `<head>` of any page that contains a Flow animation.

Here's a link to the minified version: [flowCommonWeb.min.js]()

### Raw Files
If you prefer raw files, so you can see / modify as you go, you can add them to your project and then include them all.

We use the following technique to add files manually:

Add a `flowCommon.js` file to your project:

```js
function createCommonScripts(commonFolderPath) {
  let sources = [
    `${commonFolderPath}/Player.js`,
    //optionally add a local version of web-animations
    `${commonFolderPath}/web-animations.min.js`,
    //optionally add any other files you might want to include
    `${commonFolderPath}/YourCustomizedDriver.js`
  ];
  loadScripts(sources);
}
createCommonScripts(commonFolderPath);
```

Then, on any page where you want to run a Flow animation, add the following script

```js
<script>
  function loadScripts(sources) {
    sources.forEach(src => {
      let script = document.createElement("script");
      script.src = src;
      script.async = false;
      document.head.appendChild(script);
    });
  }
  let commonFolderPath = "./FlowCommon"
  let flowCommonScript = [`${commonFolderPath}/flowCommon.js`];
  loadScripts(flowCommonScript)
</script>
```

You will have to modify the `commonFolderPath` to suit your needs.

## Classes
There are 3 core classes to the FlowCommon-Web package. 

### Player
An Player is an object used to manage the playback of a Timeline created from Flow. You can reuse the player instance by changing its `timeline`.

Check out our documentation here: [Player Class (Web)](https://createwithflow.com/api/flowcommon/web/player/)
