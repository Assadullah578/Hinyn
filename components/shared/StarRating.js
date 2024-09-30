import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from '@emotion/styled';

const FilledStar = styled(AiFillStar)`
  color: #E96E3F;
  font-size: ${props => props.sz==="lg" ? '16px' : (props.sz === 'xl' ? '25px' : '10px')};
`
const OutlinedStar = styled(AiOutlineStar)`
  color: #E96E3F;
  font-size: ${props => props.sz==="lg" ? '16px' : (props.sz === 'xl' ? '25px' : '10px')};
`
const StarContainer = styled.div`
  display: flex;
  column-gap: 5px;
`
const MAX_STARS =  5;

function StarRating({data,sz}) {
  const remaining = MAX_STARS - data;
  return (
    <StarContainer>
    { [...Array(data)].map((elem, i) => ( 
        <FilledStar key={i} sz={sz}/>
      ))
    }
    {remaining > 0 ? 
      [...Array(remaining)].map((elem, i) => ( 
        <OutlinedStar key={i} sz={sz}/>
      )) 
      :
      null
    }
  </StarContainer>
  )
}

export default StarRating