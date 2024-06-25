import { Field, useFormikContext } from 'formik';
import React, { useRef } from 'react';

import { KolButton, KolForm, KolHeading, KolInputEmail, KolInputText } from '@public-ui/react';

import type { FieldProps } from 'formik';
import type { FormValues } from '../Pages/AddCustomer';

import type { ErrorListPropType } from '@public-ui/components';

// helper (utils)
function createErrorList(formikErrors: Record<string, string>): ErrorListPropType[] {
	return Object.keys(formikErrors).map((fieldName) => ({
		message: formikErrors[fieldName],
		selector: `#field-${fieldName}`,
	}));
}

// helper (utils)
function focusErrorList(formikRef: React.RefObject<HTMLKolFormElement>) {
	formikRef.current?.focusErrorList().catch(console.warn);
}

export function CustomerForm() {
	const form = useFormikContext<FormValues>();
	const errorList = createErrorList(form.errors);
	const formikRef = useRef(null);

	return (
		<div className="p-2">
			<KolHeading _level={2} _label="Geben Sie Ihre Kontaktdaten ein"></KolHeading>
			<KolForm
				ref={formikRef}
				_errorList={errorList || []}
				_on={{
					onSubmit: () => {
						void form.submitForm();
						focusErrorList(formikRef);
					},
					onReset: () => {
						void form.resetForm();
					}
				}}
			>
				<Field name="companyName">
					{({ field }: FieldProps<FormValues['companyName']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('companyName', true);
								}}
								id="field-companyName"
								_label="Company name"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.companyName || '',
								}}
								_touched={form.touched.companyName}
								_required
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('companyName', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

                <Field name="contact">
					{({ field }: FieldProps<FormValues['contact']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('contact', true);
								}}
								id="field-contact"
								_label="Contact"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.contact || '',
								}}
								_touched={form.touched.contact}
								_required
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('contact', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

                <Field name="phoneNumber">
				{({ field }: FieldProps<FormValues['phoneNumber']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('phoneNumber', true);
								}}
								id="field-phoneNumber"
								_label="Phone Number"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.phoneNumber || '',
								}}
								_touched={form.touched.phoneNumber}
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('phoneNumber', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>
                
                <Field name="addressLine1">
				{({ field }: FieldProps<FormValues['addressLine1']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('addressLine1', true);
								}}
								id="field-addressLine1"
								_label="Address Line 1"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.addressLine1 || '',
								}}
								_touched={form.touched.addressLine1}
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('addressLine1', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

                <Field name="addressLine2">
				{({ field }: FieldProps<FormValues['addressLine2']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('addressLine2', true);
								}}
								id="field-addressLine2"
								_label="Address Line 2"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.addressLine2 || '',
								}}
								_touched={form.touched.addressLine2}
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('addressLine2', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

                <Field name="addressLine3">
				{({ field }: FieldProps<FormValues['addressLine3']>) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('addressLine3', true);
								}}
								id="field-addressLine3"
								_label="Address Line 3"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.addressLine3 || '',
								}}
								_touched={form.touched.addressLine3}
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('addressLine3', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

				<Field name="email">
				{({ field }: FieldProps<FormValues['email']>) => (
						<div className="block mt-2">
							<KolInputEmail
								onBlur={() => {
									void form.setFieldTouched('email', true);
								}}
								id="field-email"
								_label="E-Mail"
								_value={field.value}
								_error={form.errors.email || ''}
								_touched={form.touched.email}
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldValue('email', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

				<KolButton _label="Submit" _type="submit" className="mt-2 mr-2" />
				<KolButton _label="Reset" _type="reset" _variant="danger" className="mt-2" />
			</KolForm>
		</div>
	);
}