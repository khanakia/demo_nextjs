import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";
import Link from "next/link";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { ErrorLabel } from "src/features/bite/components";
import { getGqlClientAsync} from "src/features/bite";
import objGetPath from "packages/string-fns/objGetPath";
import { authForgotPasswordMutation } from "./query";
import stylelogin from "./ForgotPasswordForm.module.scss";
import { useSpinner } from 'src/features/bite/components'

type ForgotPasswordFormProps = {
  onForgotPassword?: () => void;
};

export default function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { onForgotPassword } = props;
  useEffect(() => {
    if (typeof window !== undefined) {
      (window as any).message = message;
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "" } });

  const spinner = useSpinner()

  const onSubmit_ = async (formData: any) => {
    spinner?.show({overlay: true});
    const gqlClient = await getGqlClientAsync({captcha: true});
    gqlClient
      .request(authForgotPasswordMutation, {
        userName: formData.username,
      })
      .then((res) => {
        const didForget = objGetPath(res, "authForgotPassword");
        // console.log("token", token)
        if (!didForget) {
          message.error("Cannot forgot password.");
          return;
        }

        message.success("We have sent you reset token on your email.");
        if (onForgotPassword !== undefined) {
          onForgotPassword();
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit_)} className='uform1 uform-vertical1'>
        <div className={"inner"}>
          {/* <h2 className='heading'>Forgot Password</h2> */}
          <h2 className="card-title mb-2 fw-normal">Forgot Password? 🔒</h2>
          <p className="card-text mb-4 fw-light">Enter your email and we&apos;ll send you instructions to reset your password</p>

          <div className='form-group mb-3'>
            <label>Email</label>
            <input
              type='email'
              {...register("username", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.username} />
          </div>

          <input
            type='submit'
            className='btn btn-main w-100 mt-2'
            value='Submit'
          />

          <div className={stylelogin.ActionLinks}>
            Remember your password? 
            <Link href={"/auth/login"}>
              <a>Sign In</a>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
