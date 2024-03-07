import { MdAdd, MdCheck, MdModeEdit, MdOutlineColorLens, MdRemove } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import styles from './styles.module.scss';
import CustomInput from '../../components/Input';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string, array } from 'yup';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import Footer from '../../components/Footer';

const cellphoneSchema = object({
  name: string().required('Name required'),
  brand: string().required('Brand required'),
  model: string().required('Model required'),
  data: array().of(
    object({
      price: number().required('Price required').typeError('Price must be a number'),
      color: string().required('Color required'),
    })
  ),
}).required();

const schema = object({
  cellphones: array().of(cellphoneSchema),
}).required();

export function AddMultipleCellphones() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cellphones: [{ name: '', brand: '', model: '', data: [{ price: '', color: '' }] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cellphones',
  });

  async function onSubmit(dataForm) {
    console.log(dataForm);
    try {
      const { status } = await api.post('/cellphone', dataForm.cellphones);
      if (status === 201) {
        toast.success('Cellphones added successfully');
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response?.data?.message || 'Error adding cellphones');
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off" autoCapitalize="off">
        <h2>Add Cellphones</h2>

        {fields.map((cellphone, index) => (
          <div key={cellphone.id} className={styles.cellphoneContainer}>
            <CustomInput
              label={`Name ${index + 1}`}
              Icon={MdModeEdit}
              {...register(`cellphones.${index}.name`)}
              error={errors?.cellphones?.[index]?.name}
            />
            <CustomInput
              label={`Brand ${index + 1}`}
              Icon={MdModeEdit}
              {...register(`cellphones.${index}.brand`)}
              error={errors?.cellphones?.[index]?.brand}
            />
            <CustomInput
              label={`Model ${index + 1}`}
              Icon={MdModeEdit}
              {...register(`cellphones.${index}.model`)}
              error={errors?.cellphones?.[index]?.model}
            />

            {cellphone.data.map((data, dataIndex) => (
              <div key={data.id} className={styles.cellphoneDataContainer}>
                <CustomInput
                  label={`Price ${dataIndex + 1}`}
                  Icon={FaDollarSign}
                  {...register(`cellphones.${index}.data.${dataIndex}.price`)}
                  error={errors?.cellphones?.[index]?.data?.[dataIndex]?.price}
                />
                <CustomInput
                  label={`Color ${dataIndex + 1}`}
                  Icon={MdOutlineColorLens}
                  {...register(`cellphones.${index}.data.${dataIndex}.color`)}
                  error={errors?.cellphones?.[index]?.data?.[dataIndex]?.color}
                />
              </div>
            ))}

            {index > 0 && <Button title="Remove" icon={<MdRemove />} type="button" onClick={() => remove(index)} />}
          </div>
        ))}

        <div className={styles.addFinishButtons}>
          <Button
            title="Add"
            icon={<MdAdd />}
            type="button"
            onClick={() => {
              const lastCellphone = fields[fields.length - 1];
              // eslint-disable-next-line no-unused-vars
              const { id, ...rest } = lastCellphone;
              append({ ...rest, data: [{ price: '', color: '' }] });
            }}
          />
          <Button title="Finish" icon={<MdCheck />} type="submit" />
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
