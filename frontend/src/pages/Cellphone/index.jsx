import { MdModeEdit, MdOutlineColorLens } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { IoMdTrash } from 'react-icons/io';
import styles from './styles.module.scss';
import CustomInput from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string } from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

const schema = object({
  name: string().required('Name required'),
  brand: string().required('Brand required'),
  model: string().required('Model required'),
  price: number().required('Price required').typeError('Price must be a number'),
  color: string().required('Color required'),
}).required();

export function Cellphone() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function getProduct() {
    const product = await api.get(`/cellphone/${id}`);
    setProduct(product.data);
  }

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      name: product?.name || '',
      brand: product?.brand || '',
      model: product?.model || '',
      price: product?.price || '',
      color: product?.color || '',
    },
  });

  async function onSubmit(dataForm) {
    try {
      const { status } = await api.put(`/cellphone/${id}`, dataForm);
      if (status === 204) {
        toast.success('Cellphone modified successfully');
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message);
    }
  }

  async function handleRemove() {
    try {
      const { status } = await api.delete(`/cellphone/${id}`);
      if (status === 204) {
        toast.success('Cellphone removed!');
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off" autoCapitalize="off">
        <h2>Edit Cellphone</h2>

        <CustomInput
          className={styles.input}
          label="Name"
          Icon={MdModeEdit}
          {...register('name')}
          error={errors.name}
        />
        <CustomInput
          className={styles.input}
          label="Brand"
          Icon={MdModeEdit}
          {...register('brand')}
          error={errors.brand}
        />
        <CustomInput
          className={styles.input}
          label="Model"
          Icon={MdModeEdit}
          {...register('model')}
          error={errors.model}
        />
        <CustomInput
          className={styles.input}
          label="Price"
          Icon={FaDollarSign}
          {...register('price')}
          error={errors.price}
        />
        <CustomInput
          className={styles.input}
          label="Color"
          Icon={MdOutlineColorLens}
          {...register('color')}
          error={errors.color}
        />

        <div className={styles.buttonsContainer}>
          <Button title="Edit" icon={<MdModeEdit />} type="submit" />
          <Button title="Remove" icon={<IoMdTrash />} type="button" onClick={handleRemove} />
        </div>

        <Link className={styles.link} to="/home">
          <span>
            <GoArrowLeft />
          </span>{' '}
          Home
        </Link>
      </form>
      <Footer />
    </div>
  );
}
