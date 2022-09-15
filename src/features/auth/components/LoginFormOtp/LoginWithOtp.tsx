import React, { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import qs from "query-string";
import Router, { useRouter } from 'next/router'
import classNames from "classnames";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { ErrorLabel } from "src/features/bite/components";
import { getGqlClient, getGqlClientAsync } from "src/features/bite";
import dotObject from '@muft/dot'
import { mutate_authLoginSendOtp, mutate_authLoginVerifyOtp } from "./query"
import { message } from "antd";
import { useSpinner } from 'src/features/bite/components'
import objGetPath from "packages/string-fns/objGetPath";
import { useAuth } from "src/features/auth";

export default function LoginWithOtp(props : {onSubmit?: Function}) {
  const { onSubmit } = props
	const { login } = useAuth()
  // const loadingEl = useRef<LoadingElement>();
	const router = useRouter()
	// console.log(router.query)

	const [step, setStep] = useState(1);
	const [phone, setPhone] = useState(null);

  const spinner = useSpinner()

	const onOtpSendFormSubmit = (data: any, resend=false) => {
		// console.log(data)
    setPhone(data.phone);
		
		sendOtpRequest(data.phone, false, () => {
			setStep(2)
		})
	};

	const sendOtpRequest = async (phone: any, resend=false, callback=(res: any) => {}) => {
		spinner?.show();

		const gqlClient = await getGqlClientAsync({captcha: true});

		gqlClient
		.request(mutate_authLoginSendOtp, {
			input: {
				phone: phone,
				companyId: process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID,
				resend,
				referralId: router.query?.refid
			},
		})
		.then((res) => {
			// const message = objGetPath(res, 'data.authOtpSend.message', 'We have sent OTP on your phone.')
      message.success('We have sent OTP on your phone.')
			if (typeof callback == "function") {
				callback(res)
			}
		})
		.catch((err) => {
			console.log(err);
			const msg = gqlErrorFirstMessage(err, {
				capitalize: true,
			});
			message.error(msg);
		})
		.finally(() => {
			spinner?.hide()
		});
	}

	const onOtpAuthenticateFormSubmit = async (data: any) => {
    // console.log(data);

		const gqlClient = await getGqlClientAsync({captcha: true});
		spinner?.show();
		gqlClient
		.request(mutate_authLoginVerifyOtp, {
			input: {
				phone: phone,
        otp: data.otp,
				companyId: process.env.NEXT_PUBLIC_DEFAULT_COMPANY_ID
			},
		})
		.then((res) => {
			// console.log(res);
		  const token = objGetPath(res, 'authLoginVerifyOtp.token')
			// console.log(token);
			if (!token) {
				message.error("Cannot login.");
				return
			}
			login(token);
      if (typeof onSubmit == "function") {
        onSubmit(data)
      }
		})
		.catch((err) => {
			// console.log(err);
			const msg = gqlErrorFirstMessage(err, {
				capitalize: true,
			});
			message.error(msg);
		})
		.finally(() => {
			spinner?.hide()
		});
   
	};

	const onPhoneChangeClick = () => {
		setStep(1);
  };
  
  const onResendOtpClick = () => {
		// onOtpSendFormSubmit(phone, true)
		sendOtpRequest(phone, true)
  }

	const step1Class = step == 1 ? "d-block" : "d-none";
	const step2Class = step == 2 ? "d-block" : "d-none";

	return (
		<div className="mw-500">
      {/* <Loading ref={loadingEl} overlay /> */}
			<OtpSendForm onSubmit={onOtpSendFormSubmit} className={step1Class} />
			<OtpAutenticateForm
				onSubmit={onOtpAuthenticateFormSubmit}
				className={step2Class}
        onPhoneChangeClick={onPhoneChangeClick}
        onResendOtpClick={onResendOtpClick}
        phone={phone}
			/>
		
		</div>
	);
};

const OtpSendForm = (props: { onSubmit?: Function; className?: string, hideFooter?: boolean, redirectLink?: string }) => {
	const { onSubmit, className, hideFooter, redirectLink="/" } = props;
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit_ = (data: any) => {
		if (typeof onSubmit == "function") {
			onSubmit(data);
		}
	};

	const cssClassNames = classNames("uform uform-vertical", className);

	return (
		<form onSubmit={handleSubmit(onSubmit_)} className={cssClassNames}>
			<div className="inner">
				<h3>Welcome to Gamerapp</h3>
				<div className="mb-3">
					<label className="form-label">Please enter your phone number:</label>
					<input
						type="text"
						className="form-control"
						placeholder=""
						{...register("phone", { required: true, minLength: 10, maxLength: 10 })}
            maxLength={10}
						pattern="[0-9]*"
					/>
					<ErrorLabel field={errors.phone} />
				</div>

				<div className="d-grid">
					<input
						type="submit"
						className="btn btn-main btn-block mt-2 trackClick"
						value="Continue"
						data-name="sendOtp" 
						data-location="loginWithOtpForm"
					/>
				</div>
			</div>
		</form>
	);
};

const OtpAutenticateForm = (props: {
  phone: any,
	onSubmit?: Function;
  onPhoneChangeClick?: () => void;
  onResendOtpClick?: () => void;
	className?: string;
}) => {
	const { phone, onSubmit, onPhoneChangeClick, onResendOtpClick, className } = props;
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit_ = (data: any) => {
    // console.log(data)
		if (typeof onSubmit == "function") {
			onSubmit(data);
		}
	};

	const cssClassNames = classNames("uform uform-vertical", className);

	return (
		<form onSubmit={handleSubmit(onSubmit_)} className={cssClassNames}>
			<div className="inner">
				<h3>Enter OTP or Login PIN</h3>
				<div>
					We’ve sent an OTP on {phone}
					<button type="button" className="btn btn-link trackClick" onClick={onPhoneChangeClick}
						data-name="changePhone" 
						data-location="loginWithOtpForm"
					>
						Change
					</button>
				</div>
				<div className="">
					{/* <label className="form-label">OTP:</label> */}
					<input
						type="text"
						// name="otp"
						className="form-control"
						placeholder="Enter OTP or Login PIN"
						{...register("otp", { required: true, minLength: 6, maxLength: 6 })}
            maxLength={6}
						pattern="[0-9]*"
					/>
					<div className="note">If you do not recieve the OTP then use the Login PIN provided by your parent.</div>
					<ErrorLabel field={errors.otp} />
				</div>
        <div className="text-end mb-3">
          <button type="button" className="btn btn-link p-0 fs-14 trackClick" onClick={onResendOtpClick}
						data-name="resendOtp" 
						data-location="loginWithOtpForm"
					>
						Resend OTP
					</button>
        </div>

				<div className="d-grid">
					<input
						type="submit"
						className="btn btn-main btn-block mt-2 trackClick"
						value="Verify OTP"
						data-name="verifyOtp" 
						data-location="loginWithOtpForm"
					/>
				</div>
			</div>
		</form>
	);
};
