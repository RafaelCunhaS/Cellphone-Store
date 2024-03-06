import { MdCheck, MdModeEdit, MdOutlineColorLens } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import styles from './styles.module.scss';
import CustomInput from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string } from 'yup';
import { Link } from 'react-router-dom';

const schema = object({
  name: string().required('Name required'),
  brand: string().required('Brand required'),
  model: string().required('Model required'),
  price: number().required('Price required').typeError('Price must be a number'),
  color: string().required('Color required'),
}).required();

export function AddCellphone() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(dataForm) {
    try {
      const { status } = await api.post('/cellphone', dataForm);
      if (status === 201) {
        toast.success('Cellphone added successfully');
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off" autoCapitalize="off">
        <h2>Add Cellphone</h2>

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

        <Button title="Add" icon={<MdCheck />} type="submit" />
        <Link className={styles.link} to="/home">
          <span>
            <GoArrowLeft />
          </span>{' '}
          Home
        </Link>
      </form>
    </div>
  );
}
