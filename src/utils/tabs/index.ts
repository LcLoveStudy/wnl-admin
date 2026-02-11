/** 生成缓存key */
export const generateCacheKey = (
  name: string,
  params?: Record<string, unknown>,
  query?: Record<string, unknown>,
) => {
  return `${name}-${JSON.stringify(params)}-${JSON.stringify(query)}`
}

/** 解析缓存key */
export const parseCacheKey = (cacheKey: string) => {
  const [name, paramsStr, queryStr] = cacheKey.split('-')
  if (!name || !paramsStr || !queryStr) return null
  const params = JSON.parse(paramsStr)
  const query = JSON.parse(queryStr)
  return { name, params, query }
}
