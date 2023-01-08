
  import styled from "styled-components";

  import {FaFacebook,FaInstagram,FaGithub, FaTwitter,FaPhone,FaRestroom} from 'react-icons/fa'
  
 import {MdMail} from 'react-icons/md'
  const FooterV2 = () => {
    return (
      <Container>
        <Left>
          <Logo>d-Com</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon color="224B0C">
              <FaGithub />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <FaRestroom style={{marginRight:"10px"}}/> Dhanbad, Jharkhand
          </ContactItem>
          <ContactItem>
            <FaPhone style={{marginRight:"10px"}}/> +9874547500
          </ContactItem>
          <ContactItem>
            <MdMail style={{marginRight:"10px"}} /> contact@d-com.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default FooterV2;





const Container = styled.div`
  display: flex;
  background-color: #182334;
  color: #fff;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  margin-left: auto;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
 
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  &:hover{
    color: #3120E0;
    transition:all 0.3s ease;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;
