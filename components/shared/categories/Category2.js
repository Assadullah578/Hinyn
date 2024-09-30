import styled from '@emotion/styled';
import Image from 'next/image';

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 9px;

  color: ${(props) => (props.isSelected ? '#EB4C60' : '#939393')};
  align-items: center;
  border-bottom: ${(props) => (props.isSelected ? '1px solid #EB4C60' : '')};
  user-select: none;

  .icon-img-box img {
    filter: ${(props) =>
      props.isSelected
        ? 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)'
        : ''};
  }

  &:hover .icon-img-box img {
    filter: ${(props) =>
      props.isSelected
        ? 'grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)'
        : 'grayscale(100%) brightness(40%)'};
  }

  &:hover {
    color: ${(props) => (props.isSelected ? '#EB4C60' : '#525252')};
  }
`;
const Label = styled.span`
  text-align: center;
  font-size: 12px;
  margin-bottom: 4px;
  margin-left: 10px;
`;
const ImageContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
`;

function Category2({ data, isSelected }) {
  // const imgsrc = '/assets/img/categories/' + data.img;
  return (
    <IconContainer isSelected={isSelected}>
      <ImageContainer className="icon-img-box">
        <Image
          src={data.img}
          layout="fill"
          className="icon-img"
          alt="icon-img"
        />
      </ImageContainer>

      <Label>{data.title}</Label>
    </IconContainer>
  );
}

export default Category2;
