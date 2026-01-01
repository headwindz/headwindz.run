import { readFileSync } from 'fs'
import { join } from 'path'
import Pre from 'pliny/ui/Pre'
import ArrayIndexAsKey from '@/demos/react-key-practices/array-index-as-key'
import StableKeyDemo from '@/demos/react-key-practices/stable-key-demo'
import KeyUnmountDemo from '@/demos/react-key-practices/key-unmount-demo'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'

interface LiveDemoProps {
  code?: string
  demoPath?: string
}

// Component registry
const demoComponents: Record<string, React.ComponentType> = {
  'react-key-practices/array-index-as-key.tsx': ArrayIndexAsKey,
  'react-key-practices/stable-key-demo.tsx': StableKeyDemo,
  'react-key-practices/key-unmount-demo.tsx': KeyUnmountDemo,
}

const LiveDemo = async ({ code: initialCode, demoPath }: LiveDemoProps) => {
  let code = initialCode || ''
  let Component: React.ComponentType | null = null

  // Load code and component from disk
  if (demoPath) {
    try {
      if (!code) {
        const filePath = join(process.cwd(), 'demos', demoPath)
        code = readFileSync(filePath, 'utf-8')
      }

      // Remove 'use client' directive from displayed code
      code = code.replace(/^['"]use client['"]\s*\n\s*\n?/m, '')

      // Get component from registry
      Component = demoComponents[demoPath] as any
    } catch (err) {
      console.error('Failed to load demo:', err)
    }
  }

  // Highlight code using rehype-prism-plus (same as contentlayer)
  let highlightedCode = ''
  if (code) {
    try {
      // Escape HTML entities in the code
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypePrismPlus, { defaultLanguage: 'tsx', ignoreMissing: true })
        .use(rehypeStringify)
        .process(`<pre><code class="language-tsx">${escapedCode}</code></pre>`)

      // Extract just the inner code content, remove the outer pre/code tags
      const html = String(file)
      const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/)
      highlightedCode = match ? match[1] : html
    } catch (err) {
      console.error('Failed to highlight code:', err)
      highlightedCode = code
    }
  }

  return (
    <div className="react-demo my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Preview Section */}
      <div className="border-b border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        {Component ? <Component /> : null}
      </div>

      {/* Code Section */}
      <Pre>
        <code className="language-tsx" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </Pre>
    </div>
  )
}

export default LiveDemo
