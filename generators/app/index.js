'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cool ' + chalk.red('generator-fusion-library') + ' generator!'
    ));

    const prompts = [{
			type: 'input',
			name: 'projectName',
			message: 'What is the name of your project? (for package.json etc.)',
			default: 'my-simple-project'
		},{
      type: 'input',
      name: 'version',
      message: 'What is the version?',
      default: '1.0.0'
    },{
      type: 'input',
      name: 'authorName',
      message: 'What is your name? (for copyright notice, etc.)'
    },{
      type: 'input',
      name: 'projectDesc',
      message: 'Brief us about the project!',
      default: ''
    }],
    done = this.async();

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.packageName = _.kebabCase(_.deburr(this.props.projectName));
      const projectPrompts = [{
        type: 'input',
        name: 'ghUser',
        message: 'What is your GitHub Username?',
        default: _.capitalize(_.camelCase(this.props.authorName))
      },{
        type: 'input',
        name: 'ghRepo',
        message: 'What is the name of the GitHub repo this will be published to?',
        default: this.props.packageName
      },{
        type: 'confirm',
        name: 'createDir',
        message: 'Would you like to create a new directory for your project?',
        default: true
      }];
      this.prompt(projectPrompts).then(props => {
        _.extend(this.props, props);
        if (props.createDir) {
          console.log(this.props);
          this.destinationRoot(this.props.projectName);
        }
        done();
      });
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js'),{
        packageName: this.props.projectName
      }
    );
    this.fs.copy(
      this.templatePath('_karma.conf.js'),
      this.destinationPath('karma.conf.js')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),{
        packageName: this.props.projectName,
        version: this.props.version,
        projectDesc: this.props.projectDesc,
        authorName: this.props.authorName,
        ghUser: this.props.ghUser,
        ghRepo: this.props.ghRepo
      }
    );
    this.fs.copy(
      this.templatePath('_test.webpack.js'),
      this.destinationPath('test.webpack.js')
    );
    this.fs.copy(
      this.templatePath('flowconfig'),
      this.destinationPath('.flowconfig')
    );
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('jsdoc.conf.json'),
      this.destinationPath('jsdoc.conf.json')
    );
    this.fs.copy(
      this.templatePath('src/_sum.js'),
      this.destinationPath('src/sum.js')
    );
    this.fs.copy(
      this.templatePath('src/_sum.spec.js'),
      this.destinationPath('src/sum.spec.js')
    );
    this.fs.copy(
      this.templatePath('_index.js'),
      this.destinationPath('index.js')
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),{
        packageName: this.props.projectName
      }
    );

    // Example
    this.fs.copy(
      this.templatePath('example/css/bootstrap.min.css'),
      this.destinationPath('example/css/bootstrap.min.css')
    );
    this.fs.copy(
      this.templatePath('example/js/bootstrap.min.js'),
      this.destinationPath('example/js/bootstrap.min.js')
    );
    this.fs.copy(
      this.templatePath('example/js/jquery.min.js'),
      this.destinationPath('example/js/jquery.min.js')
    );
    this.fs.copyTpl(
      this.templatePath('example/index.html'),
      this.destinationPath('example/index.html'),{
        packageName: this.props.packageName
      }
    );
  }

  install() {
    this.npmInstall();
  }

  end() {
		this.log(
			'\n' + chalk.green.underline('Your new project is ready!')
    );
	}
};
