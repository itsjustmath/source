import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import React from 'react'
import { Button } from '../button'

const defaultSpacerStyles = { width: '1px' }

export const ButtonGroup = props => {
  const { spacerStyles = defaultSpacerStyles, childComponent = Button } = props
  const childArr = React.Children.toArray(props.children)
  const otherProps = removeKeys(props, 'children', 'spacerStyles')
  return (
    <Box display="flex" direction="row" {...otherProps}>
      {childArr
        .filter(child => child.type === childComponent)
        .map((child, i, arr) => {
          const isFirst = i === 0
          const isLast = i === arr.length - 1
          const borderTopLeftRadius = isFirst ? 'l' : 'none'
          const borderBottomLeftRadius = isFirst ? 'l' : 'none'
          const borderTopRightRadius = isLast ? 'l' : 'none'
          const borderBottomRightRadius = isLast ? 'l' : 'none'
          const element = React.cloneElement(child, {
            borderRadius: 'none',
            borderTopLeftRadius,
            borderBottomLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
          })
          return (
            <React.Fragment key={`el-${i}`}>
              {element}
              {isLast ? null : <Box css={spacerStyles} />}
            </React.Fragment>
          )
        })}
    </Box>
  )
}
