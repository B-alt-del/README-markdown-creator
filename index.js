const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        name: 'Project_Title',
        message: '\nWhat is the Title of the Project?\n\n'
    },
    {
        type: 'input',
        name: 'Description',
        name: '\n\nProvide a short description explaining the what, why, and how of your project.\n     - What was your motivation?\n     - Why did you build this project?\n     - What problem does it solve?\n     - What did you learn?\n\n'
    },
    {
        type: 'confirm',
        name: 'wants_table',
        message: '\n\nWould you like a Table of Contents? (recommended for large projects with a large README file)\n\n'
    },
    {
        type: 'checkbox',
        name: 'Table_selections',
        message: '\n\nType in Table of contents\n\n',
        when: (response) => response.wants_table === true,
        choices: ['Installation', 'Usage', 'Features', 'Contributing', 'Tests', 'Questions', 'License'],
        default: ['Installation', 'Usage', 'Contributing', 'Tests', 'Questions', 'License']
    },
    {
        type: 'input',
        name: 'Table_inputs[0]',
        message: (data)=> {
            if(data.Table_selections[0] === 'Installation'){ return 'Installation: \nWhat are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.'}
            if(data.Table_selections[0] === 'Usage'){ return 'Usgage:\nProvide instructions and examples for use. Include screenshots as needed.'}
            if(data.Table_selections[0] === 'License'){ return 'License\nEnter a license: If you need help choosing a license, refer to [https://choosealicense.com/]'}
            if(data.Table_selections[0] === 'Features'){ return 'Features:\nIf your project has a lot of features, list them here.'}
            if(data.Table_selections[0] === 'Contributing'){ return 'Contributions:\nIf you created an application or package and would like other developers to contribute it'}
            if(data.Table_selections[0] === 'Tests'){ return 'Tests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.'}
            if(data.Table_selections[0] === 'Questions'){ return 'Questions:\nThis section is intended for a way for future users to contact you regarding questions about the application'}},
        when: (data) => data.Table_selections[0] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[1]',
        message: (data)=> {
            if(data.Table_selections[1] === 'Usage'){ return 'Usgage:\nProvide instructions and examples for use. Include screenshots as needed.'}
            if(data.Table_selections[1] === 'Features'){ return 'Features:\nIf your project has a lot of features, list them here.'}
            if(data.Table_selections[1] === 'Contributing'){ return 'Contributions:\nIf you created an application or package and would like other developers to contribute it'}
            if(data.Table_selections[1] === 'Tests'){ return 'Tests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.'}
            if(data.Table_selections[1] === 'Questions'){ return 'Questions:\nThis section is intended for a way for future users to contact you regarding questions about the application'}
            if(data.Table_selections[1] === 'License'){ return 'License\nEnter a license: If you need help choosing a license, refer to [https://choosealicense.com/]'}},
        when: (data) => data.Table_selections[1] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[2]',
        message: (data)=> {
            if(data.Table_selections[2] === 'Features'){ return 'Features:\nIf your project has a lot of features, list them here.'}
            if(data.Table_selections[2] === 'Contributing'){ return 'Contributions:\nIf you created an application or package and would like other developers to contribute it'}
            if(data.Table_selections[2] === 'Tests'){ return 'Tests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.'}
            if(data.Table_selections[2] === 'Questions'){ return 'Questions:\nThis section is intended for a way for future users to contact you regarding questions about the application'}
            if(data.Table_selections[2] === 'License'){ return 'License\nEnter a license: If you need help choosing a license, refer to [https://choosealicense.com/]'}},
        when: (data) => data.Table_selections[2] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[3]',
        message: (data)=> {
            if(data.Table_selections[3] === 'Contributing'){ return 'Contributions:\nIf you created an application or package and would like other developers to contribute it'}
            if(data.Table_selections[3] === 'Tests'){ return 'Tests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.'}
            if(data.Table_selections[3] === 'Questions'){ return 'Questions:\nThis section is intended for a way for future users to contact you regarding questions about the application'}
            if(data.Table_selections[3] === 'License'){ return 'License\nEnter a license: If you need help choosing a license, refer to [https://choosealicense.com/]'}},
        when: (data) => data.Table_selections[3] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[4]',
        message: (data)=> {
            if(data.Table_selections[4] === 'Tests'){ return 'Tests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.'}
            if(data.Table_selections[4] === 'Questions'){ return 'Questions:\nThis section is intended for a way for future users to contact you regarding questions about the application'}
            if(data.Table_selections[4] === 'License'){ return 'License\nEnter a license: If you need help choosing a license, refer to [https://choosealicense.com/]'}},
        when: (data) => data.Table_selections[4] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[5]',
        message: (data)=> {
            if(data.Table_selections[5] === 'Questions'){ return 'Questions:\nThis section is intended for a way for future users to contact you regarding questions about the application'}
            if(data.Table_selections[5] === 'License'){ return 'License\nEnter a license: If you need help choosing a license, refer to [https://choosealicense.com/]'}},
        when: (data) => data.Table_selections[5] != undefined
    },
    {
        type: 'list',
        name: 'License',
        message: 'Choose a license to add to your project from the following:',
        choices: ['frog', 'time', 'lalapalooza'],
        when: (data) => (data.Table_selections[0] === 'License' || data.Table_selections[1] === 'License' || data.Table_selections[2] === 'License' || data.Table_selections[3] === 'License' || data.Table_selections[4] === 'License' || data.Table_selections[5] === 'License' || data.Table_selections[6] === 'License')

    },  
    {
        type: 'input',
        name: 'Github',
        message: '\nWhat is your Github username?\n\n',
        when: (data) => (data.Table_selections[0] === 'Questions' || data.Table_selections[1] === 'Questions' || data.Table_selections[2] === 'Questions' || data.Table_selections[3] === 'Questions' || data.Table_selections[4] === 'Questions' || data.Table_selections[5] === 'Questions' || data.Table_selections[6] === 'Questions')
    },
    {
        type: 'input',
        name: 'Email',
        message: '\nWhat is an email address you can be reached at for questions?\n\n',
        when: (data) => (data.Table_selections[0] === 'Questions' || data.Table_selections[1] === 'Questions' || data.Table_selections[2] === 'Questions' || data.Table_selections[3] === 'Questions' || data.Table_selections[4] === 'Questions' || data.Table_selections[5] === 'Questions' || data.Table_selections[6] === 'Questions')
    }
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {


}

function init() {
    inquirer.prompt(questions).then((data)=>{
        console.log(data);
    })
}

init();


