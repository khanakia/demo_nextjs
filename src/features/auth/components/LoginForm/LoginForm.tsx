import React from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";
import Link from "next/link";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { ErrorLabel } from "src/features/bite/components";
import { getGqlClient, getGqlClientAsync } from "src/features/bite";
import { useAuth } from "src/features/auth";
import objGetPath from "packages/string-fns/objGetPath";
import { authLoginMutation } from "./query";
import stylelogin from "./LoginForm.module.scss";
import { useSpinner } from 'src/features/bite/components'

type LoginFormProps = {
  onLogin?: () => void;
};

export default function LoginForm(props: LoginFormProps) {
  const { onLogin } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  const { login } = useAuth()
  
  const spinner = useSpinner()

  const onSubmit_ = async (formData: any) => {
    spinner?.show({overlay: true});

    const gqlClient = await getGqlClientAsync({captcha: true});

    gqlClient
      .request(authLoginMutation, {
        input: {
          userName: formData.username,
          password: formData.password,
        },
      })
      .then((res) => {
        // console.log(res);
        const token = objGetPath(res, "authLogin.token");
        // console.log("token", token);
        if (!token) {
          message.error("Cannot login.");
        }
        login(token);
        if (onLogin !== undefined) {
          onLogin();
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
          <h2 className="card-title mb-2 fw-normal">Welcome to Gamerapp!</h2>
          <p className="card-text mb-4 fw-light">Please sign-in and start your adventure!</p>

          <div className='form-group mb-3'>
            <label>Email</label>
            <input
              type='email'
              {...register("username", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.username} />
          </div>

          <div className='form-group mb-3'>
            <label>Password</label>
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
            value='Sign In'
          />
{/* 
          <p className="text-center mt-4"><span className="me-2">New on our platform?</span><Link href={"/auth/register"}>
              <a>Create an account</a>
            </Link></p> */}

          <div className={stylelogin.ActionLinks}>
            <Link href={"/auth/register"}>
              <a>Create an account?</a>
            </Link>
            <Link href={"/auth/forgot-password"}>
              <a className='login-form-forgot'>Forgot Password?</a>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
