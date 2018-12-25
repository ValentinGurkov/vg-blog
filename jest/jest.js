import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// mock router
import NextRouter from 'next/router';

configure({ adapter: new Adapter() });

const mockedNextRouter = {
  push: () => {},
  prefetch: () => {}
};
NextRouter.router = mockedNextRouter;
