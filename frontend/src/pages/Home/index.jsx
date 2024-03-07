import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import styles from './styles.module.scss';
import CustomInput from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../../components/Loading';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';
import { Pagination } from '../../components/Pagination';

export function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('name');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  async function getProducts() {
    setIsLoading(true);
    try {
      const { data } = await api.get(
        `/cellphone?category=${category}&search=${search}&sort=${sort}&page=${currentPage - 1}`
      );
      setTotalPages(data.totalPages);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
      toast.warning(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, sort]);

  function handleSelect(e) {
    setCategory(e.currentTarget.value);
  }

  function handleSort(e) {
    setSort(e.currentTarget.value);
  }

  function handleSearch(e) {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <div>
            <label htmlFor="search" className="">
              Filter by:
            </label>
            <select className="" name="search" id="search" onChange={handleSelect}>
              <option defaultChecked value="name">
                Name
              </option>
              <option value="brand">Brand</option>
              <option value="model">Model</option>
              <option value="color">Color</option>
            </select>
          </div>

          <div className={styles.searchInput}>
            <CustomInput Icon={FiSearch} autoComplete="off" onChange={handleSearch} />
          </div>
        </div>

        <div>
          <label htmlFor="sort" className="">
            Sort price by:
          </label>
          <select className="" name="sort" id="sort" onChange={handleSort}>
            <option defaultChecked value="">
              None
            </option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      <div className={styles.addButtons}>
        <div className={styles.addButton}>
          <Button
            title="Add Cellphone"
            icon={<MdOutlinePhoneIphone />}
            type="button"
            onClick={() => navigate('/cellphones/add')}
          />
        </div>

        <div className={styles.addButton}>
          <Button
            title="Add Multiple Cellphones"
            icon={<MdOutlinePhoneIphone />}
            type="button"
            onClick={() => navigate('/cellphones/add-multiple')}
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
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
          <Pagination
            setCurrentPage={(page) => setCurrentPage(page)}
            totalPages={totalPages}
            currentPage={currentPage}
          />
          <Footer />
        </div>
      )}
    </div>
  );
}
