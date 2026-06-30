/** 生成缓存key */
export const generateCacheKey = (
  name: string,
  params?: Record<string, unknown>,
  query?: Record<string, unknown>,
) => {
  // 使用一种不太可能出现在 JSON 字符串中的分隔符
  return `${name}_|_${JSON.stringify(params)}_|_${JSON.stringify(query)}`
}

/** 解析缓存key */
export const parseCacheKey = (cacheKey: string) => {
  const parts = cacheKey.split('_|_')
  if (parts.length < 3) return null
  const [name, paramsStr, queryStr] = parts
  if (!name || !paramsStr || !queryStr) return null
  try {
    const params = JSON.parse(paramsStr)
    const query = JSON.parse(queryStr)
    return { name, params, query }
  } catch (error) {
    console.error('Failed to parse cache key:', cacheKey, error)
    return null
  }
}
