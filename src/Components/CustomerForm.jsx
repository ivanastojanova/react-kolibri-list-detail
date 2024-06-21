import { Field, useFormikContext } from 'formik';
import React, { useRef } from 'react';

import { KolButton, KolForm, KolHeading, KolInputEmail, KolInputText, KolSelect } from '@public-ui/react';

function createErrorList(formikErrors) {
	return Object.keys(formikErrors).map((fieldName) => ({
		message: formikErrors[fieldName],
		selector: `#field-${fieldName}`,
	}));
}

function focusErrorList(formikRef) {
	formikRef.current?.focusErrorList().catch(console.warn);
}

export function CustomerForm() {
	const form = useFormikContext();
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
						setSectionSubmitted(true);
						focusErrorList(formikRef);
					},
				}}
			>
				<Field name="companyName">
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('companyName', true);
								}}
								id="field-companyName"
								_label="Vor- und Zuname"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.companyName || '',
								}}
								_touched={form.touched.name}
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
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('contact', true);
								}}
								id="field-contact"
								_label="Vor- und Zuname"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.contact || '',
								}}
								_touched={form.touched.name}
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
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('phoneNumber', true);
								}}
								id="field-phoneNumber"
								_label="Vor- und Zuname"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.phoneNumber || '',
								}}
								_touched={form.touched.name}
								_required
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
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('addressLine1', true);
								}}
								id="field-addressLine1"
								_label="Vor- und Zuname"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.addressLine1 || '',
								}}
								_touched={form.touched.name}
								_required
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
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('addressLine2', true);
								}}
								id="field-addressLine2"
								_label="Vor- und Zuname"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.addressLine2 || '',
								}}
								_touched={form.touched.name}
								_required
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
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								onBlur={() => {
									void form.setFieldTouched('addressLine3', true);
								}}
								id="field-addressLine3"
								_label="Vor- und Zuname"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.addressLine3 || '',
								}}
								_touched={form.touched.name}
								_required
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
					{({ field }) => (
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
								_required
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

				<Field name="phoneNumber">
					{({ field }) => (
						<div className="block mt-2">
							<KolInputText
								id="field-phoneNumber"
								_type="tel"
								_label="Telefonnumer"
								_value={field.value}
								_msg={{
									_type: 'error',
									_description: form.errors.phoneNumber || '',
								}}
								_touched={form.touched.phoneNumber}
								_on={{
									onChange: (event, value) => {
										if (event.target) {
											void form.setFieldTouched('phone', true);
											void form.setFieldValue('phone', value, true);
										}
									},
								}}
							/>
						</div>
					)}
				</Field>

				<KolButton _label="Weiter" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}