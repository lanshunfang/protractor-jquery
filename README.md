# Protractor E2E Test for Non-Angular Website (jQuery-based)

## Videos

### YouTube
<a href="http://www.youtube.com/watch?feature=player_embedded&v=Zhp6vUWyQ0g" target="_blank"><img src="http://img.youtube.com/vi/Zhp6vUWyQ0g/0.jpg" alt="YouTube Video clip for usage of Protractor for Non-Angular" width="240" height="180" border="10" /></a>

### YouKu (China)

<a href="http://player.youku.com/embed/XMTYyMjI3NTc4OA==" target="_blank"><img src="http://r3.ykimg.com/0542040857708A896A0A4E04E3A87D85" alt="优酷视频 - 使用 Google Protractor 测试非 Angular 页面" width="240" height="180" border="10" /></a>

## Why

Google invented Protractor over WebDriverJs Protocol with crispy designs on real world testing scenarios. It's originally for AngularJS and people like it.

But what if you want to use it as an E2E framework for Non-Angular websites? 

Say Paul is working on a project over Microsfot KnockoutJs. And I would like to have my team get the most out of Google's hard and smart work.

That is the reason why I made this Protractor-jQuery, the utility to have Protractor running over jQuery-based websites (Non-Angular), as an End-To-End testing framework.

## How to use it?

### Install
```bash
git clone https://github.com/lanshunfang/protractor-jquery.git
cd protractor-jquery
npm install
```

### Start Mock Server
```bash
npm run serve
```

### Run Cases
```bash
npm run e2e
```

### Add Your Own Test Case
Create new suite under test/spec-e2e/pages/, refer them in test/cfg/protractor-config.js,#under "suites:"

I have already provided a demo suites "test/spec-e2e/pages/home" for you to get started. Just duplicate the folder and tweak it.

### Debug A Test Case
```bash
# CASE_TITLE_SUBSTRING is the title of your case, could be substring of your case.
# Say npm run e2e "tech" is going to only run test cases that has title including string "tech"
npm run e2e "CASE_TITLE_SUBSTRING"
```

## Technical consideration

The main idea to tweak Protractor for Non-Angular websites, is to rewrite
```javascript
browser.waitForAngular
```
Which is how Protractor handle all asynchronised requests. If any jQuery.ajax request is pending, then we wait until it's done.

## Screenshots

![Protractor is running](https://raw.githubusercontent.com/lanshunfang/protractor-jquery/master/test/demo-screenshots/protractor-is-running.png "Protractor is running")
![Console Output](https://raw.githubusercontent.com/lanshunfang/protractor-jquery/master/test/demo-screenshots/console-output.png "Console Output")
