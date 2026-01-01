import { visit } from 'unist-util-visit'
import fs from 'fs'
import path from 'path'

/**
 * Remark plugin to transform demo:// links into LiveDemo components
 * Usage in MDX: [Button Demo](demo://button-demo.tsx)
 */
export default function remarkDemo() {
  return (tree, file) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      // Check if this paragraph contains a demo:// link
      let hasDemoLink = false
      let linkIndex = -1

      node.children.forEach((child, i) => {
        if (child.type === 'link' && child.url && child.url.startsWith('demo://')) {
          hasDemoLink = true
          linkIndex = i
        }
      })

      if (hasDemoLink && parent) {
        const linkNode = node.children[linkIndex]
        const demoPath = linkNode.url.replace('demo://', '')
        const fullPath = path.join(process.cwd(), 'demos', demoPath)

        try {
          // Verify the file exists
          fs.accessSync(fullPath, fs.constants.R_OK)

          // Create a JSX node for LiveDemo component with demoPath
          const liveDemoNode = {
            type: 'mdxJsxFlowElement',
            name: 'LiveDemo',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'demoPath',
                value: demoPath,
              },
            ],
            children: [],
          }

          // Split the paragraph if needed
          const beforeLink = node.children.slice(0, linkIndex)
          const afterLink = node.children.slice(linkIndex + 1)

          const newNodes = []

          // Add paragraph with content before link (if any)
          if (beforeLink.length > 0) {
            newNodes.push({
              type: 'paragraph',
              children: beforeLink,
            })
          }

          // Add the LiveDemo component
          newNodes.push(liveDemoNode)

          // Add paragraph with content after link (if any)
          if (afterLink.length > 0) {
            newNodes.push({
              type: 'paragraph',
              children: afterLink,
            })
          }

          // Replace the paragraph with the new nodes
          parent.children.splice(index, 1, ...newNodes)

          // Return the number of nodes we added to adjust the visit index
          return index + newNodes.length
        } catch (error) {
          console.error(`Failed to load demo file: ${fullPath}`, error)
          // Keep the original paragraph if file not found
        }
      }
    })
  }
}
