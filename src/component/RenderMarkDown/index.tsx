

import { Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'

// import 'github-markdown-css/github-markdown-light.css'
// import 'github-markdown-css'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/github.css'

const plugins: any = [
  gfm(),
  highlight()
]

export default function Index(props: { content: string }) {
  const { content } = props
  return (
    <Viewer value={content} plugins={plugins} />
  )
}
