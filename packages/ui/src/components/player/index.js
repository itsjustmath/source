import { css } from '@emotion/core'
import { Box } from '@mujo/box'
import { removeKeys } from '@mujo/box/dist/lib/remove-keys'
import { context } from '@mujo/plugins'
import React, { useContext } from 'react'
import { useTheme } from '../../hooks/use-theme'
import { HeaderL, HeaderS } from '../fonts'
import { useAnimations, transition } from './use-animations'

const fadeInGroup = css({
  transition: 'opacity 0.7s ease-in 0.7s',
  opacity: 0,
  ':not(:empty)': { opacity: 1 },
})

const textTranistions = css({
  transformOrigin: 'center',
  transition: 'all 0.1s ease-out 0s',
  opacity: 0,
  transform: 'scale(0.9)',
})

const fadeInText = css({
  transition: 'all 0.3s ease-in 0.5s',
  opacity: 1,
  transform: 'scale(1)',
})

export const Player = props => {
  const { extension } = useContext(context)
  const { i18n } = extension
  const { isOpen, label } = props
  const otherProps = removeKeys(
    props,
    'width',
    'height',
    'isOpen',
    'circleRatio',
    'onFinish',
    'label',
    'breathAmount'
  )
  const [{ animationProps, isBreathIn, iteration }] = useAnimations(
    props,
    isOpen
  )
  const { foreground, background, highlight } = useTheme()
  return (
    <Box
      data-testid="player"
      paddingTop={isOpen ? 'none' : 'm'}
      {...transition(props)}
      {...otherProps}
    >
      <Box
        Component="svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...animationProps.svg}
        css={{ pointerEvents: 'none' }}
      >
        <Box Component="rect" fill={background} {...animationProps.rect} />
        <Box Component="circle" fill={highlight} {...animationProps.circle2} />
        <Box Component="circle" fill={foreground} {...animationProps.circle} />
        <Box Component="g" {...fadeInGroup}>
          {isOpen ? (
            <>
              <HeaderL
                fill={background}
                Component="text"
                css={[textTranistions, isBreathIn ? fadeInText : {}]}
                {...animationProps.text}
              >
                {i18n.t('breathe-in')}
              </HeaderL>
              <HeaderL
                fill={background}
                Component="text"
                {...textTranistions}
                {...animationProps.text}
                css={[textTranistions, !isBreathIn ? fadeInText : {}]}
              >
                {i18n.t('breathe-out')}
              </HeaderL>
              <HeaderS
                Component="text"
                fill={foreground}
                css={[textTranistions, fadeInText]}
                {...animationProps.count}
              >
                {iteration}
              </HeaderS>
            </>
          ) : null}
          <HeaderL
            fill={background}
            Component="text"
            {...textTranistions}
            {...animationProps.text}
            {...css(textTranistions, !isOpen ? fadeInText : {})}
          >
            {label}
          </HeaderL>
        </Box>
      </Box>
    </Box>
  )
}

Player.defaultProps = { circleRatio: 0.2 }
