import { JSDOM } from 'jsdom'
const fs = require('fs')
const path = require('path')

const srcFileName = 'hbs-index.html'
const srcFilePath = path.join(__dirname, srcFileName)
const buildFileName = 'hbs-index.html'
const buildDir = path.join(__dirname, 'build')
const buildFilePath = path.join(buildDir, buildFileName)

const log = (...args) => console.log('  ->', args.join(' '))

log('Start Building hbs template')
log('Reading html')

const rawHtml = fs.readFileSync(srcFilePath, 'utf8')

const { document } = (new JSDOM(rawHtml)).window

const templateDOM = document.querySelector('#hbsTemplate')

if (!templateDOM) throw new Error('hbs template not found. You should add an id "hbsTemplate" to the hbs script tag')

const rawTemplate = templateDOM.innerHTML

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

  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir)
  }

  fs.writeFileSync(path.join(__dirname, 'build', buildFileName), content, 'utf8')

  log('Input File  :', srcFilePath)
  log('Output File :', buildFilePath)
  log('Done')

} catch (err) {

  log('Error at writing files')
  log(err)

}
