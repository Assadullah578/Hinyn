import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styled from '@emotion/styled';

const StyledLinearProgress = styled(LinearProgress)`
  border-radius: 20px;
  height: ${(props) => (props.bg === 'red' ? '15px' : '8px')};
  // margin: 1rem 0;
  background-color: ${(props) => (props.bg === 'red' ? '#DEDEDE' : '#f0f0f0')};
  border-radius: ${(props) => (props.bg === 'red' ? '8px' : '0')};

  .MuiLinearProgress-bar {
    border-radius: 20px;
    background: ${(props) =>
      props.bg === 'red'
        ? '#EB4C60'
        : 'linear-gradient(90deg, #4AA398 0%, #207C70 100%) 0% 0% no-repeat padding-box'};
  }
`;

export default function LinearDeterminate({ progress, color }) {
  return (
    <Box sx={{ width: '100%' }}>
      <StyledLinearProgress variant="determinate" value={progress} bg={color} />
    </Box>
  );
}
