import styled from '@emotion/styled';
import Footer from '../components/section/Footer';
import Header from '../components/section/Header';
import Text from '../components/shared/Typography';
import Header2 from '../components/section/Header2';
const HeaderContainer = styled.div`
  background: #4aa398;
  color: #ffffff;
  box-shadow: inset 0px 3px 20px #00000029;
  padding: 54px 0;
  display: flex;
  flex-direction: column;
  min-height: 19rem;
`;
const MyContainer = styled.div`
  height: 80rem;
  width: 80%;

  background: white;
  border-radius: 20px;
  position: absolute;
  top: 13rem;
  left: 11rem;
`;
const MainDiv = styled.div`
  background: #ededed;
  height: 100rem;
`;
const ActualCon = styled.div`
  height: 92%;
  width: 85%;
  margin: 50px 87px;
`;
function Privacy() {
  return (
    <>
      <Header2 />
      <MainDiv>
        <HeaderContainer></HeaderContainer>
        <MyContainer>
          <ActualCon>
            <Text color="red" size="xl" font="bold">
              Privacy Policy
            </Text>
            <p style={{ color: '#525252', fontSize: '15px' }}>
              INFORMATION GATHERED BY HINYN.COM. This is HINYN.COM’s online
              privacy policy. This policy applies only to activities HINYN.COM
              engages in on its website and does not apply to HINYN.COM
              activities that are "offline" or unrelated to the website.
            </p>
            <p style={{ color: '#525252', fontSize: '15px' }}>
              HINYN.COM collects certain anonymous data regarding the usage of
              the website. This information does not personally identify users,
              by itself or in combination with other information, and is
              gathered to improve the performance of the website. The anonymous
              data collected by the HINYN.COM website can include information
              such as the type of browser you are using, and the length of the
              visit to the website. You may also be asked to provide personally
              identifiable information on the HINYN.COM website, which may
              include your name, address, telephone number and e-mail address.
              This information can be gathered when feedback or e-mails are sent
              to HINYN.COM, when you register for services, or make purchases
              via the website. In all such cases you have the option of
              providing us with personally identifiable information.
            </p>
            <p style={{ color: '#525252', fontSize: '15px' }}>
              1. USE AND DISCLOSURE OF INFORMATION. Except as otherwise stated
              below, we do not sell, trade or rent your personally identifiable
              information collected on the site to others. The information
              collected by our site is used to process orders, to keep you
              informed about your order status, to notify you of products or
              special offers that may be of interest to you, and for statistical
              purposes for improving our site. We will disclose your Delivery
              information to third parties for order tracking purposes or
              process your check or money order, as appropriate, fill your
              order, improve the functionality of our site, perform statistical
              and data analyses deliver your order and deliver promotional
              emails to you from us. For example, we must release your mailing
              address information to the delivery service to deliver products
              that you ordered.
            </p>
            <p style={{ color: '#525252', fontSize: '15px' }}>
              2. All credit/debit cards’ details and personally identifiable
              information will NOT be stored, sold, shared, rented or leased to
              any third parties
            </p>
            <p style={{ color: '#525252', fontSize: '15px' }}>
              COOKIES. Cookies are small bits of data cached in a user’s
              browser. HINYN.COM utilizes cookies to determine whether or not
              you have visited the home page in the past. However, no other user
              information is gathered.
            </p>{' '}
            <p style={{ color: '#525252', fontSize: '15px' }}>
              HINYN.COM may use non-personal "aggregated data" to enhance the
              operation of our website, or analyze interest in the areas of our
              website. Additionally, if you provide HINYN.COM with content for
              publishing or feedback, we may publish your user name or other
              identifying data with your permission.
            </p>{' '}
            <p style={{ color: '#525252', fontSize: '15px' }}>
              HINYN.COM may also disclose personally identifiable information in
              order to respond to a subpoena, court order or other such request.
              HINYN.COM may also provide such personally identifiable
              information in response to a law enforcement agencies request or
              as otherwise required by law. Your personally identifiable
              information may be provided to a party if HINYN.COM files for
              bankruptcy, or there is a transfer of the assets or ownership of
              HINYN.COM in connection with proposed or consummated corporate
              reorganizations, such as mergers or acquisitions.
            </p>{' '}
            <p style={{ color: '#525252', fontSize: '15px' }}>
              3. SECURITY. HINYN.COM takes appropriate steps to ensure data
              privacy and security including through various hardware and
              software methodologies. However, HINYN.COM cannot guarantee the
              security of any information that is disclosed online.
            </p>{' '}
            <p style={{ color: '#525252', fontSize: '15px' }}>
              4. OTHER WEBSITES. HINYN.COM is not responsible for the privacy
              policies of websites to which it links. If you provide any
              information to such third parties different rules regarding the
              collection and use of your personal information may apply. We
              strongly suggest you review such third party’s privacy policies
              before providing any data to them. We are not responsible for the
              policies or practices of third parties. Please be aware that our
              sites may contain links to other sites on the Internet that are
              owned and operated by third parties. The information practices of
              those Web sites linked to our site is not covered by this Policy.
              These other sites may send their own cookies or clear GIFs to
              users, collect data or solicit personally identifiable
              information. We cannot control this collection of information. You
              should contact these entities directly if you have any questions
              about their use of the information that they collect.
            </p>{' '}
            <p style={{ color: '#525252', fontSize: '15px' }}>
              MINORS. HINYN.COM does not knowingly collect personal information
              from minors under the age of 18. Minors are not permitted to use
              the HINYN.COM website or services, and HINYN.COM requests that
              minors under the age of 18 not submit any personal information to
              the website. Since information regarding minors under the age of
              18 is not collected, HINYN.COM does not knowingly distribute
              personal information regarding minors under the age of 18.
            </p>{' '}
            <p style={{ color: '#525252', fontSize: '15px' }}>
              5. MODIFICATIONS OF THE PRIVACY POLICY. HINYN.COM. The Website
              Policies and Terms & Conditions would be changed or updated
              occasionally to meet the requirements and standards. Therefore the
              Customers’ are encouraged to frequently visit these sections in
              order to be updated about the changes on the website.
              Modifications will be effective on the day they are posted”.
            </p>{' '}
          </ActualCon>
        </MyContainer>
      </MainDiv>
      <Footer />
    </>
  );
}

export default Privacy;
