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
        choices: ['Installation', 'Usage', 'Features', 'Contributing', 'Tests', 'Questions'],
        default: ['Installation', 'Usage', 'Contributing', 'Tests', 'Questions']
    },
    {
        type: 'input',
        name: 'Table_inputs[0]',
        message: (data)=> {
            if(data.Table_selections[0] === 'Installation'){ return '\n\nInstallation: \nWhat are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.\n\n'}
            if(data.Table_selections[0] === 'Usage'){ return '\n\nUsgage:\nProvide instructions and examples for use. Include screenshots as needed.\n\n'}
            if(data.Table_selections[0] === 'Features'){ return '\n\nFeatures:\nIf your project has a lot of features, list them here.\n\n'}
            if(data.Table_selections[0] === 'Contributing'){ return '\n\nContributions:\nIf you created an application or package and would like other developers to contribute it\n\n'}
            if(data.Table_selections[0] === 'Tests'){ return '\n\nTests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.\n\n'}
            if(data.Table_selections[0] === 'Questions'){ return '\n\nQuestions:\nIn this section write if youd like users to contact you with questions and where to reach you\n\n'}},
        when: (data) => data.Table_selections[0] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[1]',
        message: (data)=> {
            if(data.Table_selections[1] === 'Usage'){ return '\n\nUsgage:\nProvide instructions and examples for use. Include screenshots as needed.\n\n'}
            if(data.Table_selections[1] === 'Features'){ return '\n\nFeatures:\nIf your project has a lot of features, list them here.\n\n'}
            if(data.Table_selections[1] === 'Contributing'){ return '\n\nContributions:\nIf you created an application or package and would like other developers to contribute it\n\n'}
            if(data.Table_selections[1] === 'Tests'){ return '\n\nTests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.\n\n'}
            if(data.Table_selections[1] === 'Questions'){ return '\n\nQuestions:\nIn this section write if youd like users to contact you with questions and where to reach you\n\n'}},
        when: (data) => data.Table_selections[1] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[2]',
        message: (data)=> {
            if(data.Table_selections[2] === 'Features'){ return '\n\nFeatures:\nIf your project has a lot of features, list them here.\n\n'}
            if(data.Table_selections[2] === 'Contributing'){ return '\n\nContributions:\nIf you created an application or package and would like other developers to contribute it\n\n'}
            if(data.Table_selections[2] === 'Tests'){ return '\n\nTests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.\n\n'}
            if(data.Table_selections[2] === 'Questions'){ return '\n\nQuestions:\nIn this section write if youd like users to contact you with questions and where to reach you\n\n'}},
        when: (data) => data.Table_selections[2] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[3]',
        message: (data)=> {
            if(data.Table_selections[3] === 'Contributing'){ return '\n\nContributions:\nIf you created an application or package and would like other developers to contribute it\n\n'}
            if(data.Table_selections[3] === 'Tests'){ return '\n\nTests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.\n\n'}
            if(data.Table_selections[3] === 'Questions'){ return '\n\nQuestions:\nIn this section write if youd like users to contact you with questions and where to reach you\n\n'}},
        when: (data) => data.Table_selections[3] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[4]',
        message: (data)=> {
            if(data.Table_selections[4] === 'Tests'){ return '\n\nTests:\nGo the extra mile and write tests for your application. Then provide examples on how to run them here.\n\n'}
            if(data.Table_selections[4] === 'Questions'){ return '\n\nQuestions:\nIn this section write if youd like users to contact you with questions and where to reach you\n\n'}},
        when: (data) => data.Table_selections[4] != undefined
    },
    {
        type: 'input',
        name: 'Table_inputs[5]',
        message: (data)=> {
            if(data.Table_selections[5] === 'Questions'){ return '\n\nQuestions:\nIn this section write if youd like users to contact you with questions and where to reach you\n\n'}},
        when: (data) => data.Table_selections[5] != undefined
    },
    {
        type: 'list',
        name: 'License',
        message: '\n\nChoose a license to add to your project from the following:',
        choices: ['frog', 'time', 'lalapalooza'],
    },  
    {
        type: 'input',
        name: 'Github',
        message: '\n\nWhat is your Github username?\n\n',
        when: (data) => (data.Table_selections[0] === 'Questions' || data.Table_selections[1] === 'Questions' || data.Table_selections[2] === 'Questions' || data.Table_selections[3] === 'Questions' || data.Table_selections[4] === 'Questions' || data.Table_selections[5] === 'Questions' || data.Table_selections[6] === 'Questions')
    },
    {
        type: 'input',
        name: 'Email',
        message: '\n\nWhat is an email address you can be reached at for questions?\n\n',
        when: (data) => (data.Table_selections[0] === 'Questions' || data.Table_selections[1] === 'Questions' || data.Table_selections[2] === 'Questions' || data.Table_selections[3] === 'Questions' || data.Table_selections[4] === 'Questions' || data.Table_selections[5] === 'Questions' || data.Table_selections[6] === 'Questions')
    },
    {
        type: 'input',
        name: 'Image_path',
        message: '\n\nEnter the file path to the screenshot:\n\n',
    },
    {
        type: 'input',
        name: 'Alt_text',
        message: '\n\nEnter the alternative text for the screenshot image\n\n',
    }
];


function init() {
    inquirer.prompt(questions).then(writeToFile)
}

init()


function writeToFile({Project_Title, Description, Table_selections, Table_inputs, License, Github, Email, Image_path, Alt_Text}) {

    fs.writeFile('README.md', 
    `
    # ${Project_Title}

    ## Description
    
    ${Description}
    
    ## Table of Contents 
    
    - [${Table_selections[0]}](#${Table_selections[0]})
    - [${Table_selections[1]}](#${Table_selections[1]})
    - [${License}](#${License})
    - [${Table_selections[2]}](#${Table_selections[2]})
    - [${Table_selections[3]}](#${Table_selections[3]})
    - [${Table_selections[4]}](#${Table_selections[4]})
    - [${Table_selections[5]}](#${Table_selections[5]})
    
    ## ${Table_selections[0]}
    
    ${Table_inputs[0]}
    
    ## ${Table_selections[1]}
    
    ${Table_inputs[1]}

    ![${Alt_Text}](${Image_path})
    
    
    ## ${License}
    
    ${License} 

    ## ${Table_selections[2]}
    
    ${Table_inputs[2]}    
    
    ## ${Table_selections[3]}
    
    ${Table_inputs[3]}    
    
    ## ${Table_selections[4]}
    
    ${Table_inputs[4]}    
    
    ## ${Table_selections[5]}
    
    ${Table_inputs[5]}    
    
    ## Contact Info

    Github: ${Github}

    Email: ${Email}
    `
    , (err) => {
        if (err) {
            console.log(err)
        }
    })
}





