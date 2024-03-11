import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import propTypes from 'prop-types';

export function CellphoneCard({ products }) {
  return (
    <div className={styles.cardsContainer}>
      {products &&
        products.map((product) => (
          <Link key={product.id} className={styles.cellphoneCard} to={`/cellphone/${product.id}`}>
            <h3>{product.name}</h3>
            <hr />
            <p>Brand: {product.brand}</p>
            <p>Model: {product.model}</p>
            <p>Price: ${product.price}</p>
            <p>Color: {product.color}</p>
          </Link>
        ))}
    </div>
  );
}

CellphoneCard.propTypes = {
  products: propTypes.array,
};
