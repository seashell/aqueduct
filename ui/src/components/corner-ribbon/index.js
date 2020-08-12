import styled from 'styled-components'

const Ribbon = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;

  span {
    font-size: 10px;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    line-height: 20px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    width: 100px;
    display: block;
    background: #79a70a;
    background: linear-gradient(#00a1ff 0%, #00a1ff 100%);
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
    position: absolute;
    top: 19px;
    right: -21px;
  }
  span::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 100%;
    z-index: -1;
    border-left: 3px solid #3b6bcc;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #3b6bcc;
  }
  span::after {
    content: '';
    position: absolute;
    right: 0px;
    top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    border-right: 3px solid #3b6bcc;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #3b6bcc;
  }
`

export default Ribbon
