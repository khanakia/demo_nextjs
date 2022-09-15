import React from "react";
import { useForm } from "react-hook-form";
import { message } from "antd";
import Link from "next/link";
import { ErrorLabel } from "src/features/bite/components";
import gqlErrorFirstMessage from "packages/string-fns/gqlErrorFirstMessage";
import { getGqlClientAsync} from "src/features/bite";
import { login } from "src/features/auth/utils/client";
import objGetPath from "packages/string-fns/objGetPath";
import { authRegisterMutation } from "./query";
import styles from "./RegisterForm.module.scss";
import { useSpinner } from 'src/features/bite/components'

type RegisterFormProps = {
  onRegister?: () => void;
};

export default function RegisterForm(props: RegisterFormProps) {
  const { onRegister } = props;
  // const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      yourName: "",
      // lastName: "",
      company: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const spinner = useSpinner()

  const onSubmit_ = async (formData: any) => {
    spinner?.show({overlay: true});
    const gqlClient = await getGqlClientAsync({captcha: true});
    gqlClient
      .request(authRegisterMutation, {
        input: {
          email: formData.email,
          yourName: formData.yourName,
          // lastName: formData.lastName,
          company: formData.company,
          password: formData.password,
        },
      })
      .then((res) => {
        // console.log(res);
        const token = objGetPath(res, "authRegister.token");
        // console.log("token", token);
        if (!token) {
          message.error("Cannot register.");
          return;
        }
        login(token);
        message.success("You have been registered successfully.");
        if (onRegister !== undefined) {
          onRegister();
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
          {/* <h2 className='heading'>Sign Up</h2> */}
          <h2 className="card-title mb-2 fw-normal">Adventure starts here 🚀</h2>
          <p className="card-text mb-4 fw-light">Make your doc management easy and fun!</p>

          <div className='form-group mb-3'>
            <label>Email</label>
            <input
              type='email'
              {...register("email", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.email} />
          </div>

          <div className='form-group mb-3'>
            <label>Your Name</label>
            <input
              type='text'
              {...register("yourName", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.yourName} />
          </div>

          {/* <div className='form-group mb-3'>
            <label>Last Name</label>
            <input
              type='text'
              {...register("lastName", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.lastName} />
          </div> */}

          <div className='form-group mb-3'>
            <label>Company</label>
            <input
              type='text'
              {...register("company", { required: true })}
              className='form-control'
            />
            <ErrorLabel field={errors.company} />
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

          <div className='form-group mb-3'>
            <label>Confirm Password</label>
            <input
              type='password'
              {...register("passwordConfirm", {
                required: true,
                validate: (value) => {
                  return value === watch("password");
                },
              })}
              className='form-control'
            />
            <ErrorLabel
              field={errors.passwordConfirm}
              message="The passwords didn't match."
            />
          </div>

          <input
            type='submit'
            className='btn btn-main w-100 mt-2'
            value='Create Account'
          />
          <div className={styles.ActionLinks}>
          Already have an account?
            <Link href={"/auth/login"}>
              <a>Sign In</a>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
