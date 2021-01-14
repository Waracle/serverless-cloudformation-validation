# Serverless Framework Cloudformation Validation Plugin

![Build](https://github.com/actions/waracle/serverless-cloudformation-validation-plugin/workflows/build/badge.svg)

![Test Coverage](./coverage/badge-lines.svg)

![Typescript](https://img.shields.io/github/languages/top/waracle/serverless-cloudformation-validation-plugin)

![Version](https://img.shields.io/npm/v/waracle/serverless-cloudformation-validation-plugin)

This [Serverless] plugins validates the compiled [Cloudformation] template prior to deployment

## Installation

First, add Serverless Cloudformation Validation to your project:

npm install serverless-cloudformation-validation-plugin --save-dev

Then inside your project's serverless.yml file add following entry to the plugins section: serverless-cloudformation-validation-plugin.  
If there is no plugin section you will need to add it to the file.

_Note that the "plugin" section for serverless-cloudformation-validation-plugin must be at root level on serverless.yml._

It should look something like this:
```yaml
plugins:
- serverless-cloudformation-validation-plugin
``` 

  You can check whether you have successfully installed the plugin by running the serverless command line:

`serverless --verbose`

the console should display cloudformation-validation as one of the plugins now available in your Serverless project.

## Usage and command line options

None.  This plugin is invoked using events triggered by Serverless

## Building

Run `npm build` to transpile the TypeScript into JavaScript

## Testing

Run `npm test` to run the [Jest] unit test suite

## Linting

Run `npm run lint` to ensure the code is linted correctly.  

Running `npm run lint:fix` will instruct [eslint] to _attempt_ to fix the linting warnings/errors

## Committing

We attempt to follow the [Angular Commit Message format] for commit messages so [semantic-release].

[Husky] will run the linter on each commit  
Pass `--no-verify` to skip, eg `git commit --no-verify`

## Pushing

[Husky] will run the [Jest] test suite on each push, with test coverage and badge generation.  
Pass `--no-verify` to skip, eg `git push origin main --no-verify`

## Publishing

Handled by github actions, [semantic-release] will process the commits and determine the next version to publish to npm. 

## Inspiration

This plugin was initially an idea to prevent long deployments failing due to valid YAML but invalid Cloudformation resources.

## License

[MIT](./LICENSE)

## Contributing
Yes, thank you! This plugin is community-driven, most of its features are from different authors. Please update the docs and tests and add your name to the package.json file. We try to follow [Airbnb's JavaScript Style Guide].

[angular commit message format]:(https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
[Airbnb's JavaScript Style Guide]: https://github.com/airbnb/javascript
[cloudformation]: https://aws.amazon.com/cloudformation/
[eslint]: https://eslint.org/
[husky]:https://github.com/typicode/husky
[jest]: https://jestjs.io/
[semantic-release]: https://github.com/semantic-release/semantic-release
[serverless]: https://serverless.com
