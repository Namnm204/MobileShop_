import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users } from "../../../interface/users";
import { LoginSchema } from "../../../validators/validatorsFrom";

interface Props {
  onSubmit: (data: Users) => void;
}

const Login = ({ onSubmit }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Users>({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <div className="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <hr />
        <h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            {...register("email")}
          ></input>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          ></input>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
