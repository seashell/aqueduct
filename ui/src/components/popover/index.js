import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import PropTypes from 'prop-types'
import 'tippy.js/dist/tippy.css'

const StyledTippy = styled(Tippy)`
  background: transparent;
  border: ${props => props.theme.borders.discrete};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 0;

  width: max-content;
  height: max-content;

  .tippy-content {
    padding: 0;
  }

  &[data-placement^='${props => props.placement}'] > .tippy-arrow {
    :before {
      content: '';
      position: absolute;
      ${props => props.placement === 'bottom' && 'top: -9px'};
      ${props => props.placement === 'top' && 'top: 9px'};
      left: 0;
      border: 8px solid transparent;
      border-${props => props.placement}-color: ${props => props.theme.colors.neutralLighter};
      transform-origin: center ${props => props.placement};
      ${props => props.placement === 'bottom' && 'transform: translateY(-50%)'};
      ${props => props.placement === 'top' && 'transform: translateY(50%)'};
      width: 0;
      height:0;
    }
    :after {
      content: '';
      position: absolute;
      ${props => props.placement === 'bottom' && 'top: -7px'};
      ${props => props.placement === 'top' && 'top: 7px'};
      left: 0;
      border: 8px solid transparent;
      border-${props => props.placement}-color: ${props => props.theme.colors.white};
      transform-origin: center ${props => props.placement};
      ${props => props.placement === 'bottom' && 'transform: translateY(-50%)'};
      ${props => props.placement === 'top' && 'transform: translateY(50%)'};
      width: 0;
      height:0;
  }
`

const Popover = ({
  trigger,
  arrow,
  hideOnClick,
  duration,
  delay,
  sticky,
  touchHold,
  interactive,
  boundary,
  children,
  content,
  placement,
  ...props
}) => (
  <StyledTippy
    trigger={trigger}
    content={content}
    delay={delay}
    duration={duration}
    arrow={arrow}
    placement={placement}
    sticky={sticky}
    hideOnClick={hideOnClick}
    touchHold={touchHold}
    interactive={interactive}
    boundary={boundary}
    {...props}
  >
    <div style={{ cursor: 'pointer' }}>{children}</div>
  </StyledTippy>
)

Popover.propTypes = {
  trigger: PropTypes.string,
  duration: PropTypes.arrayOf(PropTypes.number),
  delay: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  arrow: PropTypes.bool,
  placement: PropTypes.string,
  sticky: PropTypes.bool,
  hideOnClick: PropTypes.bool,
  touchHold: PropTypes.bool,
  interactive: PropTypes.bool,
  boundary: PropTypes.string,
}

Popover.defaultProps = {
  trigger: 'click',
  hideOnClick: true,
  duration: [500, 200],
  placement: 'bottom',
  delay: [100, 10],
  arrow: true,
  sticky: true,
  touchHold: true,
  interactive: true,
  boundary: 'viewport',
}

export default Popover
