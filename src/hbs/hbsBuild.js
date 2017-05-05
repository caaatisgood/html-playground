import { JSDOM } from 'jsdom'
const fs = require('fs')
const path = require('path')

const srcFileName = 'hbs-index.html'
const buildFileName = 'hbs-index.html'
const srcFilePath = path.join(__dirname, srcFileName)
const buildDir = path.join(__dirname, 'build')

const log = (...args) => console.log('  ->', args.join(' '))

log('Reading html from', srcFilePath)

const rawHtml = fs.readFileSync(srcFilePath, 'utf8')

const { document } = (new JSDOM(rawHtml)).window

let rawTemplate = document.querySelector('#hbsTemplate').innerHTML

if (!rawTemplate) throw new Error('hbs template not found. You should add an id "hbsTemplate" to the hbs script tag')

try {

  log('Building hbs raw template')

  const content =
`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>hbs template</title>
</head>
<body>
  ${rawTemplate}
</body>
</html>
`

  if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir)
  }

  fs.writeFileSync(path.join(__dirname, 'build', buildFileName), content,'utf8')

  log('Done')

} catch (err) {

  log('Error at writing files')
  log(err)

}
