import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
`

function Container({ children }) {
    return (
        <Div>
            {children}
        </Div>
    )
}

export default Container