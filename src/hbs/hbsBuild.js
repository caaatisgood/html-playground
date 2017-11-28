import { JSDOM } from 'jsdom'
const fs = require('fs')
const path = require('path')

const srcFileName = 'index.html'
const srcFilePath = path.join(__dirname, srcFileName)
const buildFileName = 'index.html'
const buildDir = path.join(__dirname, 'build')
const buildFilePath = path.join(buildDir, buildFileName)

const log = (...args) => console.log('  ->', args.join(' '))

log('Start Building hbs template')
log('Reading html')

const rawHtml = fs.readFileSync(srcFilePath, 'utf8')

const { document } = (new JSDOM(rawHtml)).window

const rootWrap = document.getElementById('hbsTemplate')

rootWrap.outerHTML = rootWrap.innerHTML

document.getElementById('hbsLib').remove()
document.getElementById('hbsScript').remove()

try {

  log('Building hbs raw template')

  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir)
  }

  fs.writeFileSync(path.join(__dirname, 'build', buildFileName), document.documentElement.outerHTML, 'utf8')

  log('Input File  :', srcFilePath)
  log('Output File :', buildFilePath)
  log('Done')

} catch (err) {

  log('Error at writing files')
  log(err)

}
