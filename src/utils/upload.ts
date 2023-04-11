import { createReadStream } from 'node:fs'
import { parse } from 'node:url'
import { normalize } from 'node:path'
import fetch from 'node-fetch'
import FormData from 'form-data'

export const parseUrl = (path: string) => {
  const url = decodeURIComponent(parse(path).pathname as string)

  return normalize(url as string)
}

export const uploadImg =  async (path: string): Promise<any> => {
  const cookie = 'buvid3=B88B18FC-979E-BAF0-AF91-BDE8A9CF621152056infoc; _uuid=BC26109106-FEC9-10C8D-4264-58A389B1935E52665infoc; buvid_fp_plain=undefined; CURRENT_BLACKGAP=0; hit-dyn-v2=1; LIVE_BUVID=AUTO7016599630935042; nostalgia_conf=-1; b_nut=100; PVID=2; i-wanna-go-back=-1; CURRENT_FNVAL=4048; hit-new-style-dyn=0; rpdid=|(RlRkuJkRR0J\'uYY)YmluYm; fingerprint=0cfc713de7a958865de27d536dfccc0f; buvid_fp=B88B18FC-979E-BAF0-AF91-BDE8A9CF621152056infoc; is-2022-channel=1; buvid4=6F4EB17F-6A7D-18A4-DD9A-A91FCA8A380953106-022080820-J%2F%2BVHq%2B0wvR5NzqeQ7BFuQ%3D%3D; SESSDATA=ba258b17%2C1689246152%2C7c8ea%2A12; bili_jct=149512706d6d2b63f681ef2c1a0c59db; DedeUserID=398576552; DedeUserID__ckMd5=5e21dc363600d90c; b_ut=5; header_theme_version=CLOSE; home_feed_column=5; sid=6t2mr67r; CURRENT_QUALITY=80; bp_video_offset_398576552=769584270505148400; _dfcaptcha=a01eb28448b8cd1071cf76db689cb5d9; innersign=1'
  const csrf = '149512706d6d2b63f681ef2c1a0c59db'
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
