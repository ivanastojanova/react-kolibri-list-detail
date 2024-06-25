import { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { CustomerForm } from '../Components/CustomerForm';

import { KolInputEmail, KolForm, KolSpin, KolButton, KolInputText } from '@public-ui/react';
import type { FormikHelpers, FormikProps } from 'formik';


export interface FormValues {
  companyName: string,
  contact: string,
  phoneNumber: string,
  email: string,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  city: string,
  stateProvince: string,
  postalCode: string,
  country: string,
}

const customersSchema = {
  companyName: Yup.string().required('Please enter'),
  contact: Yup.string().required('Please enter'),
  phoneNumber: Yup.string(),
  email: Yup.string(),
  addressLine1: Yup.string(),
  addressLine2: Yup.string(),
  addressLine3: Yup.string(),
  city: Yup.string(),
  stateProvince: Yup.string(),
  postalCode: Yup.string(),
  country: Yup.string(),
};


const apiUrl = import.meta.env.VITE_API_URL;

const fetchCustomersDetails = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/customers/${id}`);
    return await response.json();
  } catch (e: any) {
    throw new Error(e);
  }
};

export default function AddCustomer() {
    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        register,
      } = useForm();

      const { slug } = useParams();
      const navigate = useNavigate();

      const formikRef = useRef<FormikProps<FormValues>>(null);

      const validationSchema = Yup.object().shape({...customersSchema});

      const [defaultValues, setDefaultValues] = useState<FormValues>({
        companyName: '',
        contact: '',
        phoneNumber: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
      });
    

        
      useEffect(() => {
        if (slug) {
          fetchCustomersDetails(slug).then((results) => {
              // console.log(results)
            setDefaultValues({...results});
          });
        }
      }, [slug]);

      useEffect(() => {
          reset(defaultValues);
      }, [defaultValues, reset]);

      const onSubmit = (data: any) => {
        console.log(data);

        const requestOptions = {
            method: slug ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch(`${apiUrl}/customers/${slug ? slug : ''}`, requestOptions)
            .then(response => response.json())
            .then((customer) => {
                console.log(customer);
                navigate(`/customers/${customer.id}`)
            })
      }

      const handleSubmitFormik = async (_values: FormValues, formik: FormikHelpers<FormValues>) => {
        // console.log(_values);
        await formik.setTouched({});
        const requestOptions = {
          method: slug ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(_values)
      };

      fetch(`${apiUrl}/customers/${slug ? slug : ''}`, requestOptions)
          .then(response => response.json())
          .then((customer) => {
              console.log(customer);
              navigate(`/customers/${customer.id}`)
          })
      };

      // const handleResetFormik = async (_values: FormValues, formik: FormikHelpers<FormValues>) => {
      //   // console.log(_values);
      //   await formik.setTouched({});
      //   const requestOptions = {
      //     method: slug ? 'PUT' : 'POST',
      //     headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      //     body: JSON.stringify(_values)
      // };

      // fetch(`${apiUrl}/customers/${slug ? slug : ''}`, requestOptions)
      //     .then(response => response.json())
      //     .then((customer) => {
      //         console.log(customer);
      //         navigate(`/customers/${customer.id}`)
      //     })
      // };

	return (
	<>  
  		<Formik<FormValues> innerRef={formikRef} enableReinitialize initialValues={defaultValues} validationSchema={validationSchema} onSubmit={handleSubmitFormik}>
				<div>
					<CustomerForm />
				</div>
		  </Formik>
        
        <KolSpin _show />
        <KolForm _requiredText="Sternchen heißt Pflichtfeld." _on={{
          onReset: () => {
            reset();
          },
          onSubmit: () => {handleSubmit(onSubmit)},
        }}>
            <KolInputText {...register('companyName')} _label="Company name" _required={true} _on={{
              onChange: (_event, value) =>
                setValue('companyName', value),
            }} _value={watch('companyName')}></KolInputText>
            <KolInputText _label="Contact" _on={{
              onChange: (_event, value) =>
                setValue('contact', value),
            }} _value={watch('contact')}></KolInputText>
            <KolInputText _label="Address Line 1" _value={watch('addressLine1')} _on={{
              onChange: (_event, value) =>
                setValue('addressLine1', value),
            }}></KolInputText>
            <KolInputText _label="Address Line 2" _on={{
              onChange: (_event, value) =>
                setValue('addressLine2', value),
            }} _value={watch('addressLine2')}></KolInputText>
            <KolInputText _label="Address Line 3" _on={{
              onChange: (_event, value) =>
                setValue('addressLine3', value),
            }} _value={watch('addressLine3')}></KolInputText>
            <KolInputText _label="City" _on={{
              onChange: (_event, value) =>
                setValue('city', value),
            }} _value={watch('city')}></KolInputText>
            <KolInputText _label="Postal Code" _on={{
                onChange: (_event, value) =>
                  setValue('postalCode', value),
              }} _value={watch('postalCode')}></KolInputText>
            <KolInputText _label="State/Province" _on={{
                onChange: (_event, value) =>
                  setValue('stateProvince', value),
              }} _value={watch('stateProvince')}></KolInputText>
            <KolInputText _label="Country" _on={{
                onChange: (_event, value) =>
                  setValue('country', value),
              }} _value={watch('country')}></KolInputText>
            <KolInputText _label="Phone number" _on={{
                onChange: (_event, value) =>
                  setValue('phoneNumber', value),
              }} _value={watch('phoneNumber')}></KolInputText>
            <KolInputEmail _label="Email"_on={{
                onChange: (_event, value) =>
                  setValue('email', value),
              }} _value={watch('email')} {...register('email')}></KolInputEmail>
            <div>
                <KolButton _label="Add" _type="submit" />
                <KolButton _label="Reset" _type="reset" _variant="danger" />
            </div>
        </KolForm>

    </>
	);
}