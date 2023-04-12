import { createReadStream } from 'node:fs'
import { parse } from 'node:url'
import { normalize } from 'node:path'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { Cache } from '@raycast/api'

export const parseUrl = (path: string) => {
  const url = decodeURIComponent(parse(path).pathname as string)

  return normalize(url as string)
}

export const uploadImg =  async (path: string): Promise<any> => {
  const cache = new Cache()
  const cookie = cache.get('cookie') as string
  const csrf = cache.get('csrf') as string
  const https = 'https://api.bilibili.com/x/dynamic/feed/draw/upload_bfs'

  const file = createReadStream(parseUrl(path))
    
  const formData = new FormData()
  formData.append('file_up', file)
  formData.append('biz', 'new_dyn')
  formData.append('category', 'daily')
  formData.append('csrf', csrf)

  const response = await fetch(https, {
    method: 'POST',
    body: formData,
    headers: {
      cookie,
      ...formData.getHeaders(),
    },
  })

  return response.json()

}
