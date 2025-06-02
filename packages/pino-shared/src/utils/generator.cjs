const path = require('node:path')
const { postinstall } = require('~pino-shared/helpers/postinstall.cjs')

function generateTemplate({
  moduleName,
  dirName,
  template,
  searchPlaces,
  parallel = true, // 文件拷贝是否并行
  ...restOptions
} = {}) {
  const finalTemplate = template || `template/${moduleName}rc.js`
  const finalDirName = dirName
  let promise = {}
  if (Array.isArray(finalTemplate)) {
    if (parallel) {
      const promiseFactories = finalTemplate.map(template => {
        const filename = path.basename(template)
        return postinstall({
          moduleName,
          dirName: finalDirName,
          filename,
          template,
          searchPlaces,
          ...restOptions
        })
      })
      promise = Promise.all(promiseFactories)
    } else {
      promise = finalTemplate.reduce(async (prev, template) => {
        const filename = path.basename(template)
        const results = await prev
        const result = await postinstall({
          moduleName,
          dirName: finalDirName,
          filename,
          template,
          searchPlaces,
          ...restOptions
        })
        results.push(result)
        return results
      }, Promise.resolve([]))
    }
  } else {
    const filename = path.basename(finalTemplate)
    promise = postinstall({
      moduleName,
      dirName: finalDirName,
      filename,
      template: finalTemplate,
      searchPlaces,
      ...restOptions
    })
  }
  return promise.then(async result => {
    return result
  })
}

module.exports = {
  generateTemplate
}
