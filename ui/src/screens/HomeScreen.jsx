import Hero from '../components/Hero';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo? null: <Hero />;
};
export default HomeScreen;
