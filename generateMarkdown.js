// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

var license_url;
var license_badge;

function renderLicenseLink(license) {
  if(license === 'GNU General Public License v3.0'){
    license_url = 'https://choosealicense.com/licenses/gpl-3.0/'
  }else if(license === 'Boost Software License 1.0'){
    license_url = 'https://choosealicense.com/licenses/bsl-1.0/'
  }else if(license === 'MIT License'){
    license_url = 'https://choosealicense.com/licenses/mit/'
  }else if(license === 'The Unlicense'){
    license_url = 'https://choosealicense.com/licenses/unlicense/'
  }else if(license === 'none'){
    license_url = 'www.google.com'
  }
}

function renderLicenseBadge(license) {
  if(license === 'GNU General Public License v3.0' ){
    license_badge = `[![Generic badge](https://img.shields.io/badge/License-GeneralPublic-<COLOR>.svg)](${license_url})`
  }else if(license === 'Boost Software License 1.0' ){
    license_badge = `[![Generic badge](https://img.shields.io/badge/License-BoostSoftware-<COLOR>.svg)](${license_url})`
  }else if(license === 'MIT License' ){
    license_badge = `[![Generic badge](https://img.shields.io/badge/License-MIT-<COLOR>.svg)](${license_url})`
  }else if(license === 'The Unlicense' ){
    license_badge = `[![Generic badge](https://img.shields.io/badge/License-TheUnlicense-<COLOR>.svg)](${license_url})`
  }else if(license === 'none'){
    license_badge = `![Generic badge](https://img.shields.io/badge/License-none-red.svg)`
  }
}


function generateMarkdown({Project_Title, Info, Table_selections, Table_inputs, License, Github, Email, Image_path, Alt_Text}) {
  renderLicenseLink(License);
  renderLicenseBadge(License);

  return `

# ${Project_Title}

${license_badge}

## Description

${Info}

## Table of Contents 

- [${Table_selections[0]}](#installation})
- [${Table_selections[1]}](#usage})
- [License](#license)
- [${Table_selections[2]}](#features)
- [${Table_selections[3]}](#contributing)
- [${Table_selections[4]}](#tests)
- [${Table_selections[5]}](#questions)

## ${Table_selections[0]}

${Table_inputs[0]}

## ${Table_selections[1]}

${Table_inputs[1]}

![${Alt_Text}](${Image_path})

## License

${license_badge}

## ${Table_selections[2]}

${Table_inputs[2]}    

## ${Table_selections[3]}

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

${Table_inputs[3]}    

## ${Table_selections[4]}

${Table_inputs[4]}    

## ${Table_selections[5]}

${Table_inputs[5]}    

## Contact Info

![Generic badge](https://img.shields.io/badge/Email-${Email}-blue.svg)

[![Generic badge](https://img.shields.io/badge/Github-blue.svg)](${Github})

`
}

module.exports = generateMarkdown;
