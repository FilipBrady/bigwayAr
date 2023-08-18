import RootNavigation from './components/RootNavigation';
import Container from './components/container/Container';

export default function Page() {
  return <Container>{params => <RootNavigation />}</Container>;
}
