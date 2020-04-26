import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin: 0;
  height: 100vh;
  @media screen and (min-width: 1024px){
    flex-direction: row 
  }
  background: white;
`
