import styled from '@emotion/styled';
import Link from 'next/link';

const FooterContainer = styled.div`
  flex-direction: column;
  align-items: center;
  color: #555555;
  height: 4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px 3px 30px #00000029;
  background: #fdfdfd;
  margin: ${(props) => (props.margin === 'top' ? '20px ' : '')};
  padding: 20px 0;
  display: none;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    height: 4rem;
    display: flex;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: none;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 60%;
    display: flex;
  }
`;

const Item = styled.li`
  list-style-type: none;
  position: relative;
  margin-bottom: 10px;

  &:hover {
    color: #eb4c60;
    cursor: pointer;
  }

  &::before {
    content: '•'; /* Bullet character */
    color: #333; /* Bullet color */
    font-size: 1.2em; /* Adjust the size as needed */
    position: absolute;
    left: -1.5em; /* Adjust the distance from the text */
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const footerData = [
  {
    name: 'Privacy',
    link: '/Privacy',
  },
  {
    name: 'Terms and Conditions',
    link: '/TermsAndConditions',
  },
  {
    name: 'User Agreement',
    link: '/UserAgreement',
  },
  {
    name: 'Why HINYN',
    link: '/whyHinyn',
  },
  {
    name: 'Contact Us',
    link: '/contactUs',
  },
];

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <FooterContainer>
      <div>@{currentYear} Hey I Need You Now</div>
      <List>
        {footerData.map((item, idx) => (
          <Link href={item.link} key={idx} passHref legacyBehavior>
            <a>
              <Item>{item.name}</Item>
            </a>
          </Link>
        ))}
      </List>
    </FooterContainer>
  );
}

export default Footer;
