import React, { useEffect } from "react";
import cx from "classnames";
import { useForm } from "react-hook-form";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { ErrorLabel } from "src/features/bite/components";
import { getGqlClientAsync} from "src/features/bite";
import { login } from "src/features/auth/utils/client";
import objGetPath from "packages/string-fns/objGetPath";
import stylelogin from "./ResetPasswordForm.module.scss";
import { authResetPasswordMutation } from "./query";
import { useSpinner } from 'src/features/bite/components'

type ResetPasswordFormProps = {
  onResetPassword?: () => void;
};

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { onResetPassword } = props;
  const router = useRouter();
  const { token } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { token: "", password: "" } });

  const spinner = useSpinner()

  const onSubmit_ = async (formData: any) => {
    spinner?.show({overlay: true});
    const gqlClient = await getGqlClientAsync({captcha: true});
    gqlClient
      .request(authResetPasswordMutation, {
        token: formData.token,
        password: formData.password,
      })
      .then((res) => {
        // console.log(res);
        const token = objGetPath(res, "authResetPassword.token");
        // console.log("token", token);
        if (token) {
          login(token);
        }
        if (onResetPassword !== undefined) {
          onResetPassword();
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

  useEffect(() => {
    setValue("token", token as any);
  }, [token, setValue]);

  // console.log(token)
  const hideTokenGroup = token !== undefined;
  // console.log(hideTokenGroup)

  const showTokenGroupClass = cx("form-group mb-3", {
    "d-none": hideTokenGroup,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit_)} className='uform1 uform-vertical1'>
        <div className={"inner"}>
          {/* <h2 className='heading'>Reset Password</h2> */}
          <h2 className="card-title mb-2 fw-normal">Reset Password 🔒</h2>
          <p className="card-text mb-4 fw-light">Your new password must be different from previously used passwords!</p>

          <div className={showTokenGroupClass}>
            <label>Enter Reset Token</label>
            <input
              type='text'
              {...register("token", { required: true })}
              className='form-control'
            />

            <div className='note mt-2'>
              Please enter the token you received on your email.
            </div>

            <ErrorLabel field={errors.token} />
          </div>

          <div className='form-group mb-3'>
            <label>New Password</label>
            <input
              type='password'
              {...register("password", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.password} />
          </div>

          <input
            type='submit'
            className='btn btn-main w-100 mt-2'
            value='Submit'
          />

          <div className={stylelogin.ActionLinks}>
            <Link href={"/auth/login"}>
              <a>Sign In?</a>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
