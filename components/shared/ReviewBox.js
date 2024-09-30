import styled from '@emotion/styled';
import { Grid } from '@mui/material';

const Container = styled.div`
  background: #f7f5f5;
  border-left: 8px solid
    ${(props) => (props?.borderColor === 'green' ? '#4AA398' : '#E96E3F')};
  border-radius: 12px;
  padding: 23px 35px;
  color: #555555;
`;

const ReviewBox = ({ borderColor, children }) => {
  return (
    <Container borderColor={borderColor}>
      <Grid container>
        <Grid item xs={11}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewBox;
