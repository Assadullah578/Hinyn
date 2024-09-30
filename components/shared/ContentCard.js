import styled from "@emotion/styled";

const Container = styled.div`
    background-color: #F8F8F8;
    box-shadow: 0px 3px 20px #0000003C;
    border-radius: 20px;
    width:100%;
    padding: 30px;
`

const ContentCard =({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
}

export default ContentCard