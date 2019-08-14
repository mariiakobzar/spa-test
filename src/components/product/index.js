import Handlebars from 'handlebars';
import './helpers/test';
import Data from '../../assets/fixtures/products.json';
import RootTemplate from './template.hbs';
import './styles.scss';

const Root = () => {
  const id = window.sessionStorage.getItem('id');
  let currentProduct;
  Data.products.forEach((element) => {
    if (id === element.id) {
      currentProduct = element;
    }
  });
  const template = Handlebars.compile(RootTemplate);
  return template(currentProduct);
};

export default Root;
