import CloudFormation from 'aws-sdk/clients/cloudformation';
import Serverless from 'serverless';
import Plugin from 'serverless/classes/Plugin';
import chalk from 'chalk';

class ServerlessPlugin {
  private readonly _hooks: Plugin.Hooks;

  constructor(private _serverless: Serverless, private _options: Serverless.Options) {
    this._hooks = {
      'before:aws:deploy:deploy:validateTemplate': this.validateCloudformationTemplate.bind(this),
    };
  }

  get serverless(): Serverless {
    return this._serverless;
  }

  get options(): Serverless.Options {
    return this._options;
  }

  async validateCloudformationTemplate() {
    this.serverless.cli.log('Cloudformation Validation...');

    // @ts-ignore
    if (!this.serverless.providers.aws) {
      this.serverless.cli.log(chalk.yellow('Provider is not AWS.  Nothing to process'));
      return Promise.resolve();
    }

    const cloudformation = new CloudFormation({ region: this.serverless.service.provider.region });
    const { artifactDirectoryName, deploymentBucket } = this.serverless.service.package;

    if (!deploymentBucket) {
      const errorMessage = 'No Deployment bucket in serverless.yml';
      this.serverless.cli.log(chalk.red(errorMessage));
      return Promise.reject(errorMessage);
    }
    if (!artifactDirectoryName) {
      const errorMessage = 'No ArtifactDirectoryName defined to upload template to';
      this.serverless.cli.log(chalk.red(errorMessage));
      return Promise.reject(errorMessage);
    }

    // @ts-ignore
    const compiledTemplateFileName = this.serverless.providers?.aws?.naming?.getCompiledTemplateS3Suffix();

    // eslint-disable-next-line max-len
    const templateToValidate = `https://${deploymentBucket}.s3.amazonaws.com/${artifactDirectoryName}/${compiledTemplateFileName}`;
    this.serverless.cli.log(chalk.grey(`Validating template: ${templateToValidate}`));

    const params: CloudFormation.ValidateTemplateInput = {
      TemplateURL: templateToValidate,
    };

    try {
      await cloudformation.validateTemplate(params).promise();
      this.serverless.cli.log(chalk.green('Valid template'));
      return Promise.resolve();
    } catch (e) {
      this.serverless.cli.log(chalk.red(`Template is invalid. Error: ${e}`));
      return Promise.reject(e);
    }
  }
}

module.exports = ServerlessPlugin;
