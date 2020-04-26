import styled from 'styled-components'

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  @media screen and (max-width: 1024px){
    flex-direction: column;
    max-width: 100%;
  }
`
export const Content = styled.div`
  display: block;
  width: 50%;
  @media screen and (max-width: 1024px){
    width: 100%;
    margin-top: 50px;
  }
`

export const Header = styled.header`
  width: 100%;
  height: 200px;
  justify-content: center;
  display: flex;
  background-color: 
`
export const Center = styled.div`
  display: block;
  text-align: center;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
`