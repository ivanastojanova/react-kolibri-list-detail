import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';

import { KolForm } from '@public-ui/react';
import { KolSpin } from '@public-ui/react';
import { KolButton } from '@public-ui/react';
import { KolInputText } from '@public-ui/react';
import { KolInputEmail } from '@public-ui/react';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchCustomersDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/customers/${id}`);
    return await response.json();
  } catch (e) {
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

      const [defaultValues, setDefaultValues] = useState([]);
    

        
      useEffect(() => {
        if (slug) {
          fetchCustomersDetails(slug).then((results) => {
              // console.log(results)
            setDefaultValues({...results});
          });
        } else {
          setDefaultValues({ 
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
        }
      }, [slug]);

      useEffect(() => {
          reset(defaultValues);
      }, [defaultValues, reset]);

      const onSubmit = (data) => {
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

	return (
	<>  
        <KolSpin _show />
        <KolForm _requiredText="Sternchen heißt Pflichtfeld." _on={{
          onReset: () => {
            reset();
            // reset((formValues) => ({
            //   ...formValues
            // }))
            // console.log(data);
            // reset({ 
            //   id: defaultValues.id || null,
            //   contact: defaultValues.contact || '',
            //   companyName: defaultValues.companyName || '',
            //   phoneNumber: defaultValues.phoneNumber || '',
            //   email: defaultValues.email || '',
            //   addressLine1: defaultValues.addressLine1 || '',
            //   addressLine2: defaultValues.addressLine2 || '',
            //   addressLine3: defaultValues.addressLine3 || '',
            //   city: defaultValues.city || '',
            //   stateProvince: defaultValues.stateProvince || '',
            //   postalCode: defaultValues.postalCode || '',
            //   country: defaultValues.country || '',
            // });
          },
          onSubmit: handleSubmit(onSubmit),
        }}>
            <KolInputText {...register('companyName')} _label="Company name" _required="true" _on={{
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